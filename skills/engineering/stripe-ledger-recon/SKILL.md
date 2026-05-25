---
name: stripe-ledger-recon
description: "Stripe payment reconciliation for Sales Hub: webhook lifecycle (signature verification, idempotency, PII-redacted raw event storage, order linking, ledger projection, normalization queueing), fee allocation from balance transactions, refund/dispute handling, currency conversion via fx_rates_daily, GDPR erasure, and the gateway allocator registry. Covers stripe_events_raw, stripe_payments_raw, stripe_order_links, and the `stripe_balance_transactions` fee-allocation read path used by jobs. Use when reconciling Stripe charges against platform orders, allocating Stripe fees to order line items, handling refunds or disputes from Stripe, debugging stripe_order_links mismatches, implementing payment-to-order linkage, or building financial event views. Do NOT use for Shopify Payments fee allocation (use shopify / gateway-specific finance logic), full 8-component profit formula (use data-reconciliation skill), or subscription billing management (use billing-subscription)."
metadata:
  schema_version: 7
  type: capability
  version: "3.0.0"
  scope: codebase
  category: engineering
  eval_artifacts: present
  eval_state: passing
  routing_eval: present
  triggers: "[\"stripe-skill\",\"reconciliation-skill\",\"payment-skill\",\"stripe-fee-skill\",\"stripe-webhook-skill\",\"stripe-refund-skill\",\"stripe-dispute-skill\",\"payment-reconciliation-skill\"]"
  keywords: "[\"stripeEventMapper\",\"stripe-event-mapper\",\"stripe event mapper\",\"stripe webhook event\",\"stripe_order_links\",\"payout reconciliation\",\"payout matching\",\"balance transaction\"]"
  owner: claude
  freshness: "2026-05-18"
  drift_check:
    last_verified: "2026-05-18"
    truth_source_hashes: {}
  last_audited: "2026-05-18"
  structural_verdict: UNVERIFIED
  truth_verdict: UNVERIFIED
  comprehension_verdict: UNVERIFIED
  application_verdict: UNVERIFIED
  eval_score: "4"
  eval_failed_ids: ["6"]
  relations: "{\"related\":[\"deterministic\",\"data-reconciliation\",\"financial-allocation\",\"feature-gating\"],\"boundary\":[\"webhook-integration\",\"entity-resolution\",\"shopify\"],\"verify_with\":[\"feature-gating\"]}"
  grounding:
    domain_object: "Stripe payment reconciliation for Sales Hub: webhook lifecycle, signature verification, raw event storage, order linking, ledger projection, and fee allocation."
    grounding_mode: hybrid
    truth_sources:
      - path: "https://docs.stripe.com/webhooks/signatures"
        note: "Stripe webhook signature verification contract."
      - path: "https://docs.stripe.com/api/balance_transactions"
        note: "Stripe balance transaction contract for balance movement and payout evidence."
      - path: "sales-hub/apps/web/src/app/api/webhooks/stripe/route.ts"
        note: "Sales Hub webhook ingestion, redaction, idempotency, and processing implementation."
      - path: "sales-hub/packages/jobs/src/jobs/stripe_fee_allocate_from_balance.ts"
        note: "Sales Hub fee allocation read path for Stripe balance transactions."
    failure_modes:
      - stale_api_version
      - webhook_format_drift
      - fee_allocation_logic_change
    evidence_priority: equal
---

# Stripe Ledger Reconciliation

## Concept Card

**What it is:** Stripe ledger reconciliation is the accounting bridge between payment-processor events and an internal order ledger. It connects Stripe events, payments, refunds, disputes, balance transactions, payouts, and local order links so a seller can see payment fees, refunds, and chargebacks as part of per-order profit.

**Mental model:** Treat Stripe as three related streams: event delivery (`stripe_events_raw`), payment objects (`stripe_payments_raw`), and balance movement (`stripe_balance_transactions`). `stripe_order_links` ties Stripe IDs to commerce orders; views and allocators then project those events into revenue, fees, refunds, disputes, and payout evidence.

**Why it exists:** Stripe webhooks prove that something happened, but raw webhooks alone do not prove which order absorbed the cost or what reached the balance after fees. Reconciliation turns asynchronous payment facts into auditable order-level financial truth.

**What it is NOT:** Not full profit calculation, not Shopify Payments fee allocation, not subscription feature gating, and not generic webhook security. It owns Stripe payment-to-ledger truth only.

**Adjacent concepts:** Webhook integration, entity resolution, financial allocation, data reconciliation, payment lifecycle, GDPR redaction.

**One-line analogy:** Stripe reconciliation is bank statement matching for webhooks: every processor movement must land on the right order before profit can be trusted.

**Common misconception:** That a successful charge amount is enough. Fees, refunds, disputes, payout timing, currency, and order linkage all matter, and several arrive after the original charge.

> Type: Project-Specific
> Stripe payment reconciliation: webhook lifecycle, fee allocation, refund/dispute handling, currency conversion, GDPR compliance.

## Domain Context

**What is stripe-ledger-recon?** Stripe is a payment processing platform that handles charges, refunds, disputes, and payouts. "Ledger reconciliation" is the process of matching Stripe's financial events against an internal order ledger to compute accurate per-order profit, including fee allocation from balance transactions.

**Relation to Sales Hub:** Stripe is one of Sales Hub's primary payment gateways. The reconciliation pipeline ingests Stripe webhooks (40+ event types via `stripeEventMapper.ts`), stores redacted payloads in `stripe_events_raw`, links charges to orders via `stripe_order_links`, allocates fees proportionally from `stripe_balance_transactions` in the jobs package, handles refunds/disputes, converts currencies via `fx_rates_daily`, and projects results into `v_financial_events`. Stripe provides 3 of the 8 profit formula components: processing fees, refunds, and chargebacks.

**Evaluation lens:** Claims about Stripe API behavior (webhook signatures, event formats, balance transaction structure) must match Stripe's official documentation. Claims about Sales Hub's implementation (table schemas, mapper logic, fee allocation formulas, webhook handler behavior) must match the live source files. Both sources must agree; when they diverge, the Stripe docs define the external contract and the repo defines the internal behavior.


## Key Files

| File | Purpose |
|---|---|
| `sales-hub/apps/web/src/lib/stripe/client.ts` | Singleton Stripe SDK, `constructStripeEvent()`, `verifyWebhookSignature()` |
| `sales-hub/apps/web/src/lib/stripe/billing.ts` | Checkout, subscription sync, `reconcileOrganizationStripeSubscription()`, plan catalog |
| `sales-hub/apps/web/src/lib/stripe/index.ts` | Central re-exports for Stripe integration |
| `sales-hub/apps/web/src/app/api/webhooks/stripe/route.ts` | Main webhook endpoint — inline rate limit, HMAC, idempotency, PII redaction, raw storage, queueing, payment persistence, order linking, ledger, subscription tax, normalization, processed marking |
| `sales-hub/apps/web/src/lib/stripeEventMapper.ts` | Event type mapping + field extractors (order ID, amount, currency, status) |
| `sales-hub/apps/web/src/lib/linking/stripeOrderLinker.ts` | Stripe-specific payment-to-order linking with org_id scoping |
| `sales-hub/packages/jobs/src/jobs/stripe_fee_allocate_from_balance.ts` | Proportional fee allocation from balance transactions to line items |
| `sales-hub/packages/jobs/src/jobs/stripe_payouts_sync.ts` | Legacy/direct Stripe payout fee allocator path using `stripe_balance_transactions` |
| `sales-hub/packages/jobs/src/gateway_registry.ts` | Gateway allocator routing (stripe/shopify/paypal/none) |
| `sales-hub/apps/web/src/lib/integrations/stripe/registerWebhooks.ts` | Programmatic webhook endpoint registration |
| `sales-hub/apps/web/src/app/api/billing/reconcile/route.ts` | Org-initiated subscription reconciliation endpoint |
| `sales-hub/db/migrations/0051__stripe_tables.sql` | Core schema: stripe_events_raw, stripe_payments_raw, stripe_order_links |
| `sales-hub/db/migrations/20260310_add_org_id_to_payment_order_links.sql` | Adds org_id and composite uniqueness to `stripe_order_links` |

## Coverage

This skill covers the complete Stripe payment reconciliation pipeline in Sales Hub: the single-file webhook lifecycle in `sales-hub/apps/web/src/app/api/webhooks/stripe/route.ts`, event type mapping via `stripeEventMapper.ts` (40+ Stripe events to canonical ledger types), order linking through `stripe_order_links`, proportional fee allocation from `stripe_balance_transactions` to order line items, refund handling (`refund_events` table and `handleChargeRefunded()` in `lib/stripe/index.ts`), dispute/chargeback event processing, currency conversion via `fx_rates_daily`, the gateway allocator registry (`gateway_registry.ts` with Stripe/Shopify/PayPal routing), GDPR PII erasure for Stripe data, and the `v_financial_events` union view that aggregates Stripe events into the order financial picture. Stripe provides 3 of the 8 profit formula components: payment processing fees, refunds, and chargebacks.

## Philosophy

Stripe reconciliation exists because Stripe's raw webhook data does not directly answer the question sellers care about: "what is my real profit on this order?" Without this skill, agents make three critical mistakes: (1) they calculate fees from Stripe API charge amounts instead of `stripe_balance_transactions` (the authoritative source for what actually moved in the Stripe balance), leading to fee mismatches; (2) they allocate Stripe fees to Shopify Payments orders because Shopify uses Stripe infrastructure under the hood, double-counting or misattributing fees; (3) they mutate original currency amounts during FX conversion instead of treating conversion as a presentation concern. Each of these mistakes silently corrupts profit calculations in ways that are difficult to detect after the fact. This skill encodes the exact pipeline, table relationships, and anti-patterns discovered through production incidents so agents get it right the first time.

---

## 1. Core Concepts

Sales Hub reconciles Stripe payments at the **line-item level** via three raw tables and a linking table.

| Table | Purpose | PK / Unique |
|-------|---------|-------------|
| `stripe_events_raw` | Stores every webhook payload for audit | `stripe_event_id` (UNIQUE) |
| `stripe_payments_raw` | Payment intent/charge/refund/dispute data | `stripe_payment_id` (UNIQUE) |
| `stripe_order_links` | Maps stripe payments to platform orders | `(org_id, stripe_payment_id, platform_order_id)` |
| `stripe_balance_transactions` | Fee-allocation read path used by Stripe payout/fee jobs | job queries and order detail aggregation |

- **Linkage**: Maps a `stripe_payment_id` to a `platform_order_id` (e.g., Shopify Order GID).
- **Ledger Projection**: Stripe transaction fees are projected into the order ledger to calculate true net profit.
- **Provenance**: `stripe_balance_transactions` is the fee-allocation read surface used by the jobs package; `stripe_payments_raw` stores gross payment/refund/dispute objects. See §5 for fee allocation details.
- **Multi-tenant scoping**: `stripe_order_links` queries are scoped by `org_id` (added in `20260310_add_org_id_to_payment_order_links.sql`). The raw Stripe event/payment tables are system ingestion tables and do not currently carry `org_id`; callers must reach order-level truth through org-scoped links or authenticated erasure flows.

> **Source:** `sales-hub/db/migrations/0051__stripe_tables.sql`, `sales-hub/db/migrations/20260310_add_org_id_to_payment_order_links.sql`

## 2. Webhook Lifecycle (single-file route pipeline)

The live Stripe webhook handler is a single `route.ts` with inline helper functions. Do not assume the previously-planned split files exist.

```
route.ts: rate limit → raw body → HMAC/replay parse → idempotency → redaction → raw store → extract → optional Inngest queue → payment raw/link/ledger/tax → normalization → mark processed
```

### Stage 1: Verify (`route.ts`)
1. **Rate limit** -- IP-based, 300 req/min. Inngest replay requests bypass rate limit. Returns 429 if exceeded.
2. **Signature verification** -- `constructStripeEvent()` via Stripe SDK. Uses `STRIPE_WEBHOOK_SECRET`. Dev override: `STRIPE_SKIP_VERIFY=1`. Invalid signatures are quarantined.

### Stage 2: Prepare (`route.ts`)
3. **Idempotency check** -- `SELECT 1 FROM stripe_events_raw WHERE stripe_event_id = $1 AND processed_at IS NOT NULL`. Already-processed events return `{ skipped: true }`.
4. **PII redaction** -- inline `redactStripeWebhookPayload()` strips email, name, phone, address, billing_details, shipping, and payment_method_details before raw event storage, Inngest payload storage, normalization payload storage, and `stripe_payments_raw.raw_json` writes.
5. **Extract fields** -- Order ID, payment ID, amount (cents), currency, status, customer ID via `stripeEventMapper.ts` extractors.
6. **Resolve org** -- Attempts org resolution via inline order lookup (`resolveOrgIdForOrder`), then via Stripe customer ID (`findOrganizationIdByStripeCustomerId`).
7. **Store in `stripe_events_raw`** -- `ON CONFLICT (stripe_event_id) DO NOTHING`. Redacted JSON is preserved for audit. **DB errors re-throw for Stripe retry (SH-4600).**

### Stage 3: Queue (`route.ts`)
8. **Inngest queue** (if enabled and not a replay) -- Stores ingest event and sends `webhook/stripe.received` to Inngest for async processing. Returns early with `{ queued: true }`.

### Stage 4: Process (`route.ts`)
9. **Persist to `stripe_payments_raw`** -- Upsert for payment/charge/refund/payout events. `ON CONFLICT (stripe_payment_id) DO UPDATE SET status, raw_json, metadata`.
10. **Create order link** -- If order ID extracted, calls `linkStripePaymentToOrder()`. Updates `orders.payment_gateway` and `payment_status`.
11. **Persist to `order_events` ledger** -- Maps Stripe event type to canonical type via `mapStripeEventType()`, then calls `persistOrderEventExtended()`. Amount negated for refunds.
12. **Persist refund event** -- For `charge.refunded`: extracts refund_id, classifies full/partial, writes to `refund_events` table.
13. **Handle subscriptions** -- For `customer.subscription.*` events: calls `syncOrganizationSubscriptionFromStripe()`. For `checkout.session.completed` with mode=subscription: fetches and syncs subscription.
14. **Handle invoices** -- For `invoice.payment_succeeded`: extracts total_tax_amounts and persists as provider_cost (platform fee).
15. **Payout reconciliation** -- The route persists payout-like events to raw Stripe tables; fee allocation reads from `stripe_balance_transactions` through the jobs package (`stripe_fee_allocate_from_balance.ts` and legacy `stripe_payouts_sync.ts`).
16. **Enqueue normalization** -- Inserts into normalization_jobs for async processing.
17. **Mark processed** -- Updates `stripe_events_raw.processed_at = NOW()`. **DB errors re-throw for Stripe retry (SH-4600).**

> **Critical rule (SH-4600, supersedes SH-1669):** DB errors MUST return 500 so Stripe retries the event. The old SH-1669 "always return 200" policy caused silent data loss when DB writes failed. Non-critical handler failures (tax storage, normalization, connector freshness) are still caught and logged — only DB errors and `markEventProcessed()` failures re-throw.

> **Source:** `sales-hub/apps/web/src/app/api/webhooks/stripe/route.ts`

## 3. Event Type Mapping

`stripeEventMapper.ts` maps 40+ Stripe event types to canonical ledger types:

| Stripe Event | Canonical Type | Category |
|-------------|----------------|----------|
| `payment_intent.succeeded` | `payment.captured` | Payment |
| `payment_intent.payment_failed` | `payment.failed` | Payment |
| `charge.succeeded` | `payment.captured` | Payment (legacy) |
| `charge.refunded` | `payment.refunded` | Refund |
| `refund.created` | `payment.refunded` | Refund |
| `refund.failed` | `payment.refund_failed` | Refund |
| `charge.dispute.created` | `payment.disputed` | Dispute |
| `charge.dispute.funds_reinstated` | `payment.dispute_won` | Dispute |
| `charge.dispute.funds_withdrawn` | `payment.dispute_lost` | Dispute |
| `payout.paid` | `payout.completed` | Payout |
| `invoice.paid` | `payment.captured` | Invoice |

Boolean classifiers: `isSuccessfulPayment()`, `isFailedPayment()`, `isRefundEvent()`, `isDisputeEvent()`.

Order ID extraction checks 5 locations in priority order: `metadata.order_id` > `metadata.shopify_order_id` > charge description regex > invoice metadata > payment intent metadata > `client_reference_id`.

> **Source:** `sales-hub/apps/web/src/lib/stripeEventMapper.ts`

## 4. Order Linking

Found in `lib/linking/stripeOrderLinker.ts`. Four public functions:

| Function | Purpose |
|----------|---------|
| `linkStripePaymentToOrder()` | Upsert into `stripe_order_links` with `ON CONFLICT` on composite key |
| `findStripePaymentsForOrder()` | Reverse lookup: order -> payment IDs |
| `findOrdersForStripePayment()` | Forward lookup: payment -> order IDs + platforms |
| `isStripePaymentLinked()` | Boolean existence check |

All functions are `org_id`-scoped via `orgQuery()`. Default `order_origin_platform` is `'shopify'`. Metadata stores `linked_at`, `event_type`, and `linked_by` for provenance tracking.

> **Source:** `sales-hub/apps/web/src/lib/linking/stripeOrderLinker.ts`

## 5. Fee Allocation from Balance Transactions

The fee allocator job (`stripe_fee_allocate_from_balance.ts`) distributes Stripe fees to order line items:

1. **Build fee map** from `stripe_balance_transactions` -- keys by `source_id`, `raw_json.charge`, `raw_json.payment_intent`, `raw_json.id`.
2. **Load orders** from `order_items` with gateway metadata.
3. **Gateway gate** -- Only processes orders where `resolveGatewayConfig(gateway).allocator === 'stripe'`. Shopify Payments orders are skipped (handled by Shopify allocator).
4. **Extract Stripe keys** from `assumptions_json.payment` -- tries `stripe_charge_id`, `stripe_payment_intent_id`, `stripe_balance_transaction_id` (multiple naming conventions).
5. **Proportional allocation** -- `fee_per_item = round(total_fee * (item_revenue / order_revenue))`. Uses `coalesce(nullif(payment_fee_cents, 0), allocated)` to avoid stomping existing values on re-runs.
6. **Writes provenance** -- `fee_source: 'stripe_balance_transactions'`, `fee_cents_total`, `fee_cents_allocated`, `synced_at` into `assumptions_json.payment`.

Configuration: `STRIPE_FEE_ALLOC_DAYS=180`, `STRIPE_ALLOC_INCLUDE_TYPES=charge,payment`, `STRIPE_ALLOC_MIN_FEE_CENTS=1`.

> **Source:** `sales-hub/packages/jobs/src/jobs/stripe_fee_allocate_from_balance.ts`

### balance_transactions as the authoritative payout reconciliation source

`stripe_balance_transactions` is the single source of truth for what Stripe actually paid out. Use it — not `stripe_payments_raw` — when reconciling what hit your bank account.

**Why balance_transactions?**

- `stripe_payments_raw` records the gross charge amount (what the buyer paid)
- `stripe_balance_transactions` records the net amount after Stripe fees, refunds, and adjustments — this is what moves in your Stripe balance and eventually reaches your bank
- Every payout (`payout.paid` event) corresponds to one or more balance transaction entries that sum to the payout amount

**Payout reconciliation query pattern:**

```sql
-- Find all balance transactions contributing to a specific payout
SELECT
  sbt.source_id,          -- charge ID, refund ID, or dispute ID
  sbt.raw_json->>'type'   AS bt_type,      -- 'charge', 'refund', 'payout', 'adjustment'
  sbt.raw_json->>'amount' AS amount_cents,
  sbt.raw_json->>'fee'    AS fee_cents,
  sbt.raw_json->>'net'    AS net_cents,    -- amount minus fee
  sbt.raw_json->>'description' AS description
FROM stripe_balance_transactions sbt
WHERE sbt.raw_json->>'payout' = $1         -- payout ID from payout.paid event
  AND sbt.org_id = $2
ORDER BY sbt.raw_json->>'created';

-- Sum of net_cents for all rows matching a payout ID should equal the payout amount
```

**Balance transaction types to track:**

| `type` | What it represents |
|--------|-------------------|
| `charge` | Gross charge collected from buyer, net of Stripe fee |
| `refund` | Refund issued to buyer (negative net) |
| `adjustment` | Dispute fee, chargeback deduction, or manual credit |
| `payout` | The actual transfer to your bank account |
| `stripe_fee` | Platform fees charged by Stripe (e.g., Radar) |

**Dispute fees in balance_transactions:**
Stripe charges a dispute fee (typically ~$15) as a separate `adjustment` row. Query for `type = 'adjustment'` rows linked to a dispute ID to capture this in P&L calculations. The default fee allocator does not automatically pick these up — they require a separate check.

```sql
-- Find dispute adjustment fees
SELECT
  raw_json->>'description' AS description,
  raw_json->>'amount'      AS amount_cents  -- typically negative (deduction)
FROM stripe_balance_transactions
WHERE raw_json->>'type' = 'adjustment'
  AND raw_json->>'description' ILIKE '%dispute%'
  AND org_id = $1;
```

## 6. Refund Handling

### 6a. Refund Events Table

The `refund_events` table stores multi-dimensional refund data:

| Column | Type | Note |
|--------|------|------|
| `revenue_refund_cents` | bigint NOT NULL | Always affects profit |
| `tax_refund_cents` | bigint | May be NULL if tax not refunded |
| `shipping_refund_cents` | bigint | May be NULL if shipping not refunded |
| `fee_refund_cents` | bigint | **Can be negative** (fee charged on refund) |
| `refund_type` | text | `'full'`, `'partial'`, `'item_level'` |

Constraint: `revenue_refund_cents >= 0`, `tax_refund_cents >= 0`, `shipping_refund_cents >= 0`. Fee refund has no constraint (Stripe charges fees on refunds in some cases).

> **Critical:** Refunds affect revenue/tax/shipping/fees but NOT CoGS (fulfillment cost is already incurred).

### 6b. Refund Ledger Event

`handleChargeRefunded()` in `sales-hub/apps/web/src/lib/stripe/index.ts`:
- Triggered only for `charge.refunded` events.
- Extracts `refund_id` from `charge.refunds.data[0]`.
- Classifies as full or partial by comparing `amount_refunded` to original `charge.amount`.
- Refund amount is stored as **negative**: `-Math.abs(amount)`.
- Writes the canonical `payment.refunded` ledger event through `persistOrderEventExtended()` and upserts a refund record into `stripe_payments_raw`.
- **Note:** The standalone `refund_events` schema exists for multidimensional refund modeling, but the verified Stripe path currently uses `order_events` + `stripe_payments_raw` for the Stripe refund projection.

The monolithic webhook route also maps refund-like events through `mapStripeEventType()` and `persistOrderEvent()` when it receives them directly.

> **Source:** `sales-hub/apps/web/src/lib/stripe/index.ts`, `sales-hub/apps/web/src/app/api/webhooks/stripe/route.ts`, `sales-hub/db/migrations/2026_01_03_create_refund_events_table.sql`

## 7. Dispute and Chargeback Handling

Stripe dispute events flow through the event mapper:

| Event | Canonical | Financial Impact |
|-------|-----------|-----------------|
| `charge.dispute.created` | `payment.disputed` | Amount held, dispute fee charged |
| `charge.dispute.funds_withdrawn` | `payment.dispute_lost` | Amount deducted from balance |
| `charge.dispute.funds_reinstated` | `payment.dispute_won` | Amount returned, dispute fee may or may not be refunded |
| `charge.dispute.closed` | `payment.dispute_resolved` | Terminal state |

**Dispute fees:** Stripe charges a separate fee per dispute (typically $15). Verify whether `stripe_balance_transactions` captures this as a distinct fee row. If not, profit calculations may understate losses by the dispute fee amount.

In `v_financial_events.sql`, disputes from `stripe_payments_raw` are surfaced with `event_type = 'dispute'` and amount is **negated** (`-1 * amount_cents`). The `orderDetailFinance.ts` service also aggregates dispute amounts from `shopify_balance_transactions` for Shopify-routed disputes.

`extractDisputeAmount()` returns the dispute amount only when `event.type` includes "dispute".

> **Source:** `sales-hub/apps/web/src/lib/stripeEventMapper.ts`, `sales-hub/db/views/20_events/18_v_financial_events.sql`

## 8. Currency Conversion and FX

All Stripe amounts are stored in their **original currency** (never mutated). Reporting-currency conversion uses `fx_rates_daily`:

| Column | Purpose |
|--------|---------|
| `rate_date` | Date of rate |
| `currency` | Source currency (e.g., USD, EUR) |
| `reporting_currency` | Target (e.g., DKK) |
| `rate_to_reporting` | Multiplier: `amount_reporting = amount_original * rate_to_reporting` |
| `source` | `'ECB'`, `'Shopify'`, `'Stripe'`, `'Manual'` |

Design principles:
1. Original amounts are **never mutated** -- FX is a presentation concern.
2. Same-currency rate is always 1.0 (seeded automatically).
3. Each rate is source-attributed for audit.
4. Stripe currencies arrive lowercase (e.g., `usd`); `v_financial_events.sql` normalizes with `upper()`.

> **Source:** `sales-hub/db/migrations/0022__fx_rates_daily.sql`

## 9. Profit Formula: Stripe's Role in the 8-Component Formula

Stripe handles one component of the full 8-component profit formula:

| Component | Source | Stripe's Role |
|-----------|--------|---------------|
| Revenue | Shopify sales channel | No |
| COGS | `provider_costs` (Printify) | No |
| Shipping cost | `provider_costs` | No |
| **Payment Processing Fees** | `stripe_balance_transactions` | **Yes — primary source** |
| Platform Fees | `shopify_balance_transactions` | No (Shopify allocator handles) |
| Tax (fulfillment) | `provider_costs.tax_cost` | No |
| Refunds | `refund_events` | Yes (via `handleChargeRefunded`) |
| Chargebacks | `stripe_payments_raw` (dispute type) | Yes (via dispute events) |

**Full 8-component formula (implemented in `calculateProfitAndMargin()`):**
```
Profit = Net Revenue
         - Payment Processing Fees   ← Stripe provides this
         - COGS
         + Supplier Refund
         - Shipping
         - Tax (fulfillment only)
         - Refunds                   ← Stripe provides this
         - Chargebacks               ← Stripe provides this
         - Ad Spend
```

Stripe fees come from `stripe_balance_transactions` as the fee source of truth; `stripe_payments_raw` stores gross payment/refund/dispute objects used for event projection. For Shopify stores, payment processing often goes through Shopify Payments (Stripe under the hood), NOT direct Stripe — check `resolveGatewayConfig()` for fee allocator routing.

The `orderDetailFinance.ts` service aggregates fees from **all payment processors** in fallback order: Shopify Payments > PayPal > Stripe. It also detects fee mismatches between derived and explicit values (threshold: >100 cents or >1% difference).

> **Full formula implementation:** `sales-hub/apps/web/src/lib/finance/calculator.ts` — `calculateProfitAndMargin()`
> **Full 8-component docs:** `data-reconciliation` skill § "Profit Calculation"
> **Source:** `sales-hub/apps/web/src/lib/services/orderDetailFinance.ts`

## 10. Gateway Allocator Registry

The gateway registry (`gateway_registry.ts`) determines which allocator handles fee assignment:

| Gateway | Allocator | Aliases |
|---------|-----------|---------|
| `shopify_payments` | `shopify` | `shopifypayments`, `shopify payments` |
| `stripe` | `stripe` | `stripe_payments`, `stripe payments` |
| `paypal` | `paypal` | `paypal_express`, `paypal express`, `pp` |
| `unknown` | `none` | (fallback) |
| `amazon.com` | `shopify` | `amazon`, `amazon pay` |

`resolveGatewayConfig()` normalizes and matches case-insensitively. Unrecognized gateways fall back to `allocator: 'none'`.

> **Critical:** The Stripe fee allocator MUST check `cfg.allocator === 'stripe'` before allocating. Shopify Payments orders (even though Shopify uses Stripe under the hood) are handled by the Shopify allocator with different fee structures.

> **Source:** `sales-hub/packages/jobs/src/gateway_registry.ts`

## 11. GDPR Compliance

`/api/webhooks/stripe/gdpr/customers-redact` is a manual erasure endpoint (NOT a webhook -- Stripe does not deliver GDPR erasure events as signed webhooks).

- Protected by `requireOrgAuth()`, not webhook HMAC.
- Scrubs PII from `stripe_events_raw.raw_json`, `stripe_payments_raw.raw_json`, and `order_events.raw_payload`.
- Preserves financial data: amounts, currencies, payment IDs, event types.
- `stripe_order_links` is NOT modified (contains only payment IDs and order IDs, no PII).
- The webhook handler itself redacts PII before archiving: `redactStripeWebhookPayload()` strips email, name, phone, address, billing_details, shipping, payment_method_details.

> **Source:** `sales-hub/apps/web/src/app/api/webhooks/stripe/gdpr/customers-redact/route.ts`

## 12. Financial Events View

`v_financial_events` is a union view across all payment sources:

```
shopify_base UNION ALL shopify_fee_events UNION ALL shopify_tax_events
UNION ALL stripe_events UNION ALL paypal_events
UNION ALL v_provider_cost_events UNION ALL csv_injection_orders
```

The `stripe_events` CTE joins `stripe_payments_raw` to `stripe_order_links` on `stripe_payment_id`. Amount handling varies by payment type:
- `refund` -- positive amount (stored as-is from Stripe)
- `dispute` -- negated (`-1 * amount_cents`)
- `charge`/succeeded -- positive amount
- `failed` -- classified as `'fee'` event type

> **Source:** `sales-hub/db/views/20_events/18_v_financial_events.sql`

## 13. Reconciliation Failure Modes

| Failure Mode | Symptom | Root Cause | Resolution |
|-------------|---------|------------|------------|
| Orphan payment | Stripe payment exists, no order link | Order ID not in metadata, description parse failed | Manual link via `linkStripePaymentToOrder()` or backfill metadata |
| Fee mismatch | `fees_mismatch` object in order detail | Derived fees != payment processor fees | Check `orderDetailFinance.ts` -- threshold is >100 cents or >1% |
| Missing org_id | Order link created without org_id | Order not yet in `orders` table when webhook arrived | Migration SH-1845 backfills from `orders.org_id` |
| Duplicate processing | Same event processed twice | `processed_at` not set before crash | Idempotency check + `ON CONFLICT DO NOTHING` prevents data corruption |
| Gateway misroute | Stripe fee allocated to Shopify Payments order | Gateway string mismatch in `assumptions_json` | Fix gateway in `assumptions_json.payment.gateway`, re-run allocator |
| Currency mismatch | FX conversion produces wrong amount | Missing rate in `fx_rates_daily` for that date/pair | Insert rate manually or trigger ECB/Stripe rate sync |
| Webhook disabled | Stripe stops sending events | Too many 5xx responses | SH-4600: return 500 only for DB errors (Stripe retries), return 200 for non-critical handler failures. Monitor 5xx rate in Stripe dashboard. |

### Quick Reference: Refund Flow

1. Stripe emits `charge.refunded` webhook
2. Signature verified via `stripe.webhooks.constructEvent()`
3. Event stored in `stripe_events_raw` (idempotent upsert)
4. Refund amount extracted, negated, stored in `stripe_payments_raw`
5. Order link resolved via `stripe_order_links`
6. `order_events` entry created with type='refund'
7. `v_financial_events` aggregates refund into the order's financial picture
8. `v_orders_list` subtracts refund from revenue in the profit formula
9. UI displays reduced revenue and recalculated margin

## Anti-Patterns

- **Never calculate fees from Stripe API amounts** -- always use `stripe_balance_transactions.fee_cents` (the allocator source of truth).
- **Never mutate original currency amounts** -- FX conversion is a presentation concern, never stored back.
- **Never allocate Stripe fees to Shopify Payments orders** -- check `resolveGatewayConfig().allocator === 'stripe'` first.
- **Re-throw DB errors from webhook handlers (SH-4600)** -- DB write failures must return 500 so Stripe retries the event. The old "never throw" policy (SH-1669) caused silent data loss. Non-critical handlers (normalization, tax, connector freshness) are still caught and logged.
- **Never skip idempotency** -- always check `processed_at IS NOT NULL` before processing.
- **Never use `$0.00` for missing fees** -- use a missing data indicator. Confidence maps to `estimated` (82 range), not a warning.
- **Never log or commit customer PII** from Stripe events -- `redactStripeWebhookPayload()` must run before any disk write.
- **Always resolve Stripe customers by `org_id` + `stripe_customer_id`** -- never by email alone, to prevent cross-tenant billing entanglement.

## Verification

After applying this skill, verify:
- [ ] Webhook handler returns 500 on DB errors for Stripe retry (SH-4600) — non-critical errors still return 200
- [ ] All `stripe_order_links` queries include `org_id` scoping via `orgQuery()`
- [ ] Fee allocation checks `resolveGatewayConfig().allocator === 'stripe'` before processing
- [ ] Refund amounts are stored as negative values (`-Math.abs()`)
- [ ] Original currency amounts are never overwritten -- FX conversion only in views/presentation
- [ ] `stripe_events_raw` upserts use `ON CONFLICT (stripe_event_id) DO NOTHING`
- [ ] Idempotency check (`processed_at IS NOT NULL`) runs before event processing
- [ ] PII is redacted via `redactStripeWebhookPayload()` before any raw JSON is stored or logged
- [ ] Fee provenance metadata (`fee_source`, `fee_cents_total`, `synced_at`) is written to `assumptions_json.payment`
- [ ] Dispute amounts are negated in `v_financial_events` (`-1 * amount_cents`)

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Shopify Payments fee allocation | `shopify` / `data-reconciliation` | Shopify Payments has its own fee structure and allocator despite using Stripe under the hood |
| Full 8-component profit calculation | `data-reconciliation` | Stripe only provides 3 of 8 components (fees, refunds, chargebacks) -- the full formula lives in data-reconciliation |
| Subscription billing or plan management | `feature-gating` | Stripe subscription lifecycle is a separate domain from payment reconciliation |
| Generic webhook signature verification patterns | `webhook-integration` | This skill covers Stripe-specific webhook handling only -- cross-platform patterns live in webhook-integration |
| Cross-platform entity matching (order/payment linking across Shopify + Stripe + PayPal) | `entity-resolution` | This skill covers Stripe-to-order linking only -- multi-platform identity resolution is entity-resolution's domain |
| PayPal fee allocation or reconciliation | `payment-lifecycle` or `data-reconciliation` | PayPal has its own allocator and reconciliation path |
| Financial display formatting (tilde prefix, confidence badges) | `financial-display-contract` | How financial data is displayed to users is a presentation concern, not a reconciliation concern |
