##############################################################################
# dynamodb.tf — shared TTL cache for the booking API.
#
# booking-api/src/memoryCache.ts's in-Lambda cache is scoped to a single
# execution environment: under concurrent traffic (a burst of guests
# browsing calendars around the same time), each concurrently warm Lambda
# instance has its own empty cache and independently re-fetches Smoobu on a
# miss, which is what was compounding into Smoobu 429s. This table gives
# every instance the same cache instead.
#
# On-demand billing rather than ElastiCache/Redis: this workload (a handful
# of properties x a dozen months of calendar rates, occasional availability
# lookups) is a few cents/month here versus a $12-25+/month always-on node,
# with no VPC networking or client library required. See
# booking-api/src/dynamoCacheAdapter.ts.
##############################################################################

resource "aws_dynamodb_table" "booking_cache" {
  name         = "${var.project}-${var.environment}-booking-cache"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "cache_key"

  attribute {
    name = "cache_key"
    type = "S"
  }

  # DynamoDB's TTL sweep is best-effort (AWS documents up to ~48h of lag), so
  # it only bounds storage growth — DynamoCacheAdapter checks expiry itself
  # on every read and never relies on the item having actually been deleted.
  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }

  tags = {
    Name = "${var.project}-${var.environment}-booking-cache"
  }
}

# Gateway endpoint: free, and keeps cache reads/writes (the hottest path in
# the API) off the fck-nat instance's link instead of adding load to the
# thing that's already the shared egress point for everything else.
resource "aws_vpc_endpoint" "dynamodb" {
  vpc_id            = aws_vpc.main.id
  service_name      = "com.amazonaws.${data.aws_region.current.name}.dynamodb"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.private.id]

  tags = {
    Name = "${var.project}-${var.environment}-dynamodb-endpoint"
  }
}

data "aws_iam_policy_document" "lambda_cache_access" {
  statement {
    sid    = "AllowBookingCacheReadWrite"
    effect = "Allow"

    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:Scan",
      "dynamodb:BatchWriteItem",
    ]

    resources = [aws_dynamodb_table.booking_cache.arn]
  }
}

resource "aws_iam_policy" "lambda_cache_access" {
  name        = "${var.project}-${var.environment}-lambda-cache-access"
  description = "Allows Lambda functions to read/write the shared booking-cache DynamoDB table."
  policy      = data.aws_iam_policy_document.lambda_cache_access.json

  tags = {
    Name = "${var.project}-${var.environment}-lambda-cache-access-policy"
  }
}

resource "aws_iam_role_policy_attachment" "lambda_cache_access" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_cache_access.arn
}
