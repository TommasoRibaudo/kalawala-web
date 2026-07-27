---
inclusion: auto
---

# Booking Engine Project Context

This workspace contains the kalawala-web project — a React (CRA) marketing site for vacation rental properties in Puerto Viejo, Costa Rica. A major upcoming feature is a custom booking engine built on top of the Smoobu API with PayPal and manual deposit payment flows.

## Key Documentation

All booking engine design, architecture, and task planning lives in:

- `docs/own_booking_engine/plan.md` — Full architectural plan: state machine, payment flows, security, analytics, AWS infrastructure, calendar pricing, language handling, styling standards, and PRD.
- `docs/own_booking_engine/tasks.md` — Detailed task checklist with effort estimates, API endpoint specs, data models, test cases, and implementation milestones.
- `docs/own_booking_engine/Introduction – Smoobu Api.pdf` — Official Smoobu API documentation (PDF). Covers endpoints for rates, availability, reservations, apartments, webhooks, and authentication. **Read this before implementing any Smoobu integration.**

Always consult these docs before making architectural decisions or implementing booking engine features.

## Architecture Decisions

- **Backend**: AWS (Lambda + API Gateway, or ECS Fargate), provisioned via **Terraform** scripts in `infra/`.
- **Database**: RDS PostgreSQL.
- **Cache**: ElastiCache Redis for availability/rates caching.
- **File storage**: S3 (private, pre-signed URLs for deposit receipt uploads).
- **Secrets**: AWS Secrets Manager (Smoobu API key, PayPal credentials, webhook secrets).
- **Frontend**: React (CRA) with React Bootstrap, SCSS modules, bilingual EN/ES.

## Codebase Patterns

- **Language handling**: URL suffix convention. English = `/Geco`, Spanish = `/GecoES`. Detection via `useLanguageDetection()` hook. The booking engine should use string maps (not component duplication) for i18n.
- **Routing**: Static routes per property in `src/Router/Router.tsx`. Property data in `src/utils/constants.ts` (`houseDataList`, `houseLangCode` field = URL slug).
- **Styling**: SCSS variables in `src/styles/_variables.scss` (colors: `$kalawala-darker-green: #0B3028`, `$kalawala-dark-green: #294F44`, `$kalawala-light-green: #8AA288`; font: `Urbanist`). Component-scoped `.style.scss` files. React Bootstrap grid. BEM-like class naming.
- **Analytics**: Consent-gated PostHog + GA4 + Meta Pixel. Consent service in `src/services/CookieConsent.service.ts`.

## Key Rules

- Smoobu API keys must **never** reach the browser. All Smoobu calls go through the backend proxy.
- Booking state transitions happen **server-side only**. The frontend cannot assert booking confirmation.
- PayPal webhook signatures must be verified before processing. Smoobu webhooks use a shared secret token.
- All file uploads (deposit receipts) must be validated server-side: MIME allowlist, size limits, virus scanning.
- Terraform state uses S3 + DynamoDB locking. Never commit `.tfstate` files.
- Available listings in search results open the existing listing page in a **new tab** with language-aware URLs.
- Calendar price dots use Smoobu `GET /api/rates` proxied through `GET /api/calendar/:apartmentSlug?month=YYYY-MM`, cached per (apartmentId, month).
