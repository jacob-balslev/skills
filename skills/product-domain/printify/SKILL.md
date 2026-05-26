---
name: printify
description: "Use when working with Printify — the print-on-demand REST API, catalog model (blueprints, print providers, variants, print areas), product creation and publish lifecycle to connected channels, order routing, shipping cost queries, and HMAC SHA-256 webhook verification. Do NOT use for non-Printify POD vendors, generic Shopify storefront work, or print-file (artwork) generation."
license: CC-BY-4.0
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"

  # === v7 Classification (DEPRECATED 2026-05-26 — kept for back-compat only) ===
  # type: v7 classification — DEPRECATED, replaced by `operation`.
  # Legacy values: capability / workflow / router / overlay.
  type: capability
  # operation: cognitive operation enabled (Bloom-grounded). One of four closed values:
  # know (declarative — concepts, vocabulary, reference) /
  # do (procedural — step-by-step execution) /
  # decide (judgment — choosing, dispatching) /
  # modify (context injection — shapes how other skills execute).
  operation: know
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: engineering

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: product-domain
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: engineering/integrations
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-12"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-12\"}"

  # === Eval-health: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: planned
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  eval_state: unverified
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  routing_eval: absent
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"printify api\",\"print on demand\",\"printify blueprints\",\"printify print providers\",\"printify publish lifecycle\",\"printify webhooks\",\"printify variants\",\"printify shipping costs\",\"printify order routing\",\"print provider catalog\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"printify\",\"printify api\",\"printify webhook\",\"print on demand\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Create a Printify product from a blueprint + print provider + variant set and publish it to a connected Shopify store\",\"Handle a Printify order:updated webhook and reconcile fulfillment status\",\"Resolve shipping cost for a basket of Printify variants given a destination country\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Generate the artwork PNG file that gets uploaded as a print file\",\"Implement the Shopify side of the Printify-to-Shopify sync\",\"Design a generic POD-vendor-agnostic product schema\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"shopify\",\"webhook-integration\",\"api-design\"],\"boundary\":[{\"skill\":\"shopify\",\"reason\":\"Printify publishes to Shopify (and other channels) but the Shopify-side concerns — theme display, Shopify webhooks, Admin API — belong in the shopify skill.\"},{\"skill\":\"webhook-integration\",\"reason\":\"webhook-integration covers vendor-neutral signing/retry patterns; this skill handles Printify's specific event types and signature scheme.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/printify/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: UNVERIFIED
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: UNVERIFIED
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
---

# Printify

## Coverage
The Printify REST API exposes a catalog (blueprints — abstract product templates like "Unisex Heavy Cotton Tee"; print providers — fulfillment partners who manufacture a given blueprint; variants — concrete color/size combinations a provider offers for a blueprint), shops (connected sales channels: Shopify, Etsy, WooCommerce, eBay, TikTok, custom API), products (a blueprint + print provider + variant selection + print areas + images, owned by a Printify shop), and orders (created either by sync from a connected channel or directly via API for merchant-fulfilled flows). This skill covers the relationships between these resources and the lifecycle transitions that move a product from draft to published to live on a storefront.

Authentication is a personal access token in the Authorization: Bearer header. The API is versioned via URL path (currently /v1/) and rate-limited globally with documented limits per endpoint family — product creation is more constrained than read calls. Image uploads go through a dedicated upload endpoint that accepts either a public URL or base64 contents and returns an image ID referenced by subsequent product-create payloads.

The publish lifecycle is a two-step asynchronous operation. POST to /products marks a product as ready for publish in Printify; the actual push to the connected channel (e.g., creating the Shopify product) happens via /products/{id}/publish which returns immediately and resolves asynchronously. The channel push can fail independently (channel auth expired, blueprint not available in the target region) and must be observed via the publishing-succeeded / publishing-failed webhook events or by polling the product publish status. Unpublish and delete each have their own semantics — unpublish removes from the channel but keeps the product in Printify; delete removes both.

Webhooks deliver order, product, and shop events. Each delivery includes an X-Pfy-Signature header computed as HMAC SHA-256 over the raw body with the webhook secret returned on subscription. Order events (order:created, order:updated, order:sent-to-production, order:shipment:created, order:shipment:delivered, order:cancelled) carry the full order payload including line items with print provider, shipping cost, and tracking. Shipping cost can also be computed pre-purchase via /shops/{shop_id}/orders/shipping.json with a destination address and line items.

## Philosophy
Printify sits between the merchant and the print provider, and its catalog reflects that — a blueprint's available variants and print areas are determined by the print provider, not by Printify. The same blueprint produced by two providers can have different color availability, different print area dimensions, and different shipping profiles. Integrations should treat blueprint + print_provider as a composite key and never assume that variants are portable across providers.

The publish lifecycle is asynchronous and partially observable. Treat publish success as a separate state from product-create success, and reconcile via webhooks rather than optimistic UI. Costs (product cost, shipping cost) are determined at order-create time by Printify and can differ from any pre-quoted estimate; the order webhook payload is the source of truth for actual cost.

## Verification
- Webhook signature verification computes HMAC SHA-256 over the raw body bytes with the per-subscription secret and uses constant-time comparison against the X-Pfy-Signature header.
- Product creation supplies a valid (blueprint_id, print_provider_id) pair from the print provider's variant list — invalid pairs return 400 with the unsupported variant ID, not a generic error.
- Publish status is reconciled via the publishing-succeeded webhook before the product is marked live in the integrating system; status defaults to pending and stays there if the webhook is missed.
- Image uploads complete and return an image ID before the product-create call references it; race conditions return 404 on the image reference.
- Shipping cost queried via /shipping.json uses the same address fields the order will eventually carry; mismatched country/region codes silently route to default shipping profiles.
- Order webhooks are idempotent at the consumer — the same event ID can be delivered more than once on retry.

## Do NOT Use When
- The print-on-demand vendor is Printful, Gelato, CustomCat, or any non-Printify provider. Each has a different catalog model, signing scheme, and publish lifecycle.
- The task is generating the print artwork itself (PNG/SVG creation, DPI handling, color-profile conversion). That is a graphics-generation task, not a Printify task.
- You are working on the Shopify-side of a Printify→Shopify sync (theme display, Shopify product overrides). Use the shopify skill.
- The work is vendor-agnostic webhook plumbing (retry, dead-letter, signing-key rotation across many providers). Use webhook-integration.
- You are designing the merchant's internal order schema. Use event-contract-design.
