# PaperWorks (argus-fake-app)

A deliberately-tiny Next.js 14 app used as a test fixture for **Argus** — the GitHub App that flags PRs touching revenue-critical surfaces.

## Why it exists

This repo is the controlled environment for developing and demoing Argus:
- It has every revenue-critical surface a real vibecoded SaaS would have.
- Two pre-staged branches (`feature/upcoming-products-page` and `break/remove-purchase-event`) give us the canonical green-vs-broken PR pair.
- It's small enough that the ground-truth map is obvious, so we can grade Argus's verdicts against reality.

## Layout

```
app/
├── layout.tsx                       # Meta Pixel loaded here
├── page.tsx                         # Landing — fires AddToCart on the buy CTA
├── checkout/page.tsx                # Calls /api/checkout, redirects to Stripe
├── order/success/page.tsx           # Fires Purchase event ← canonical conversion
├── api/
│   ├── checkout/route.ts            # Creates Stripe Checkout session
│   ├── stripe/webhook/route.ts      # Verifies stripe-signature ✅
│   ├── export-pdf/route.ts          # Paid feature, server-side gated ✅
│   └── generate/route.ts            # Paid feature, NO server-side gate ❌ (planted bug)
├── components/
│   ├── ExportButton.tsx             # Frontend gate matches the server gate
│   └── GenerateButton.tsx           # Frontend gate only
└── lib/
    └── auth.ts                      # requirePlan() helper used by export-pdf
```

## Ground-truth map (what Argus should infer / be told)

- **Conversion events**
  - `PageView`  — `app/layout.tsx`, all visits, Meta Pixel
  - `AddToCart` — `app/page.tsx`, on Buy CTA click, `value=19, currency=USD`
  - `Purchase`  — `app/order/success/page.tsx`, on success page mount, `value=19, currency=USD`
- **Webhook**
  - `/api/stripe/webhook` — verifies `stripe-signature` via `stripe.webhooks.constructEvent` ✅
- **Paid features**
  - `/api/export-pdf` — server gate via `requirePlan('pro')` ✅
  - `/api/generate`   — server gate **missing** ❌ (frontend-only)

## Branches

- `main` — baseline, all signals correct except the planted `/api/generate` bug.
- `feature/upcoming-products-page` — adds a benign `/products` route. **Should be ✅ by Argus** (no funnel files touched).
- `break/remove-purchase-event` — removes the `fbq('track', 'Purchase', …)` call from `app/order/success/page.tsx`. **Should be ⚠️ by Argus**.

## Running locally

```bash
pnpm install   # or npm / yarn
pnpm dev
```

Set up `.env.local` from `.env.example` if you want Stripe to actually run; without keys, the checkout API will throw but the static pages render fine.
