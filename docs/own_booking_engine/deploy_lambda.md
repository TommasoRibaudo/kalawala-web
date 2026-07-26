# Lambda Deployment

## Build

```powershell
cd booking-api; npx tsc -p tsconfig.json; cd ..
```

## Package

```powershell
Compress-Archive -Path booking-api\dist\*, booking-api\node_modules -DestinationPath booking-api-deploy.zip -Force
```

## Deploy all Lambdas

All three Lambdas share the same compiled code bundle. Each Lambda uses a
different `handler` entry point configured in Terraform:

| Lambda | Handler |
|---|---|
| `kalawala-staging-booking-api` | `index.handler` |
| `kalawala-staging-hold-expiry` | `holdExpiryHandler.handler` |
| `kalawala-staging-payment-reconciliation` | `paymentReconciliationHandler.handler` |

```powershell
# Booking API
aws lambda update-function-code --function-name kalawala-staging-booking-api --zip-file fileb://booking-api-deploy.zip --region us-east-1 --no-cli-pager --output text | Out-Null

# Hold expiry worker
aws lambda update-function-code --function-name kalawala-staging-hold-expiry --zip-file fileb://booking-api-deploy.zip --region us-east-1 --no-cli-pager --output text | Out-Null

# Payment reconciliation worker
aws lambda update-function-code --function-name kalawala-staging-payment-reconciliation --zip-file fileb://booking-api-deploy.zip --region us-east-1 --no-cli-pager --output text | Out-Null
```

## Cleanup

```powershell
Remove-Item booking-api-deploy.zip
```

## One-liner (all three)

```powershell
cd booking-api; npx tsc -p tsconfig.json; cd ..; Compress-Archive -Path booking-api\dist\*, booking-api\node_modules -DestinationPath booking-api-deploy.zip -Force; aws lambda update-function-code --function-name kalawala-staging-booking-api --zip-file fileb://booking-api-deploy.zip --region us-east-1 --no-cli-pager --output text | Out-Null; aws lambda update-function-code --function-name kalawala-staging-hold-expiry --zip-file fileb://booking-api-deploy.zip --region us-east-1 --no-cli-pager --output text | Out-Null; aws lambda update-function-code --function-name kalawala-staging-payment-reconciliation --zip-file fileb://booking-api-deploy.zip --region us-east-1 --no-cli-pager --output text | Out-Null; Remove-Item booking-api-deploy.zip
```
