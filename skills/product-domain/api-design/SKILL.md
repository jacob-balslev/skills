---
name: api-design
description: "Use when designing or reviewing API surfaces: resources/actions, request and response schemas, status codes, pagination, filtering, idempotency, versioning, auth boundaries, and error envelopes. Do NOT use for non-HTTP system contracts (use `system-interface-contracts`), async event contracts (use `event-contract-design`), database design (use `data-modeling`), or inbound provider webhook mechanics (use `webhook-integration`)."
license: MIT
compatibility:
  notes: "Portable API design guidance for REST-like HTTP APIs, route handlers, internal APIs, and documented JSON contracts."
allowed-tools: Read Grep
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
  domain: engineering/api-design
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-11"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-11\"}"

  # === Eval-health: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: present
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
  keywords: "[\"API design\",\"REST API\",\"endpoint design\",\"request response schema\",\"status codes\",\"pagination\",\"filtering\",\"idempotency\",\"API versioning\",\"error envelope\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"design the API for listing orders with filters, pagination, and stable errors\",\"review this route contract before frontend and backend implement it separately\",\"should this operation be a resource update, an action endpoint, or an async job?\",\"define API versioning and idempotency for this create endpoint\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"define the broader contract between a job, service, and dashboard\",\"design database tables, foreign keys, and views\",\"implement provider webhook signature verification and retry behavior\",\"debug why this endpoint is returning 500\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"system-interface-contracts\",\"reason\":\"system-interface-contracts owns interface contracts across any boundary; api-design owns API endpoint shape and HTTP semantics\"},{\"skill\":\"event-contract-design\",\"reason\":\"event-contract-design owns asynchronous event and message contracts; api-design owns HTTP request/response surfaces\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling owns persistence shape; api-design owns external representation and operation shape\"},{\"skill\":\"webhook-integration\",\"reason\":\"webhook-integration owns inbound provider webhooks; api-design owns APIs the system exposes or calls by contract\"},{\"skill\":\"debugging\",\"reason\":\"debugging owns known endpoint failures; api-design owns pre-implementation surface design\"}],\"related\":[\"system-interface-contracts\",\"data-modeling\",\"testing-strategy\",\"webhook-integration\",\"event-contract-design\"],\"verify_with\":[\"testing-strategy\",\"code-review\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":365,\"review_cadence\":\"quarterly\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/api-design/SKILL.md
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

# API Design

## Coverage

Design clear and evolvable API surfaces. Covers resources vs actions, route naming, request/response schemas, validation, status codes, pagination, filtering, sorting, idempotency, auth boundaries, error envelopes, rate-limit signals, versioning, deprecation, and contract examples.

## Philosophy

An API is a product surface for another program. Its main job is stable meaning under change. Internal convenience should not leak into routes, schemas, or errors unless consumers actually need it.

Prefer boring consistency. A small set of predictable patterns beats clever endpoint-specific behavior that every client has to rediscover.

## Method

1. Identify consumers and their tasks.
2. Model resources and actions separately.
3. Define request, response, and error schema examples.
4. Decide pagination, filtering, sorting, and field selection.
5. State auth, tenant, and permission boundaries.
6. Add idempotency and retry behavior for mutating or async operations.
7. Define versioning and deprecation rules before the first breaking change.
8. Add contract tests or fixtures.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/api-design.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/api-design.json). The checklist below is the authoring gate for API surface decisions; the eval file is the grader surface.

## Verification

- [ ] Routes use consistent nouns/actions and avoid implementation leakage
- [ ] Request and response examples cover success and failure
- [ ] Status codes match retry and client-action semantics
- [ ] Collection endpoints define pagination and stable ordering
- [ ] Mutating operations define idempotency or explicitly reject it
- [ ] Auth and tenant boundaries are visible in the contract
- [ ] Breaking-change and deprecation rules are stated

## Do NOT Use When

| Use instead | When |
|---|---|
| `system-interface-contracts` | The boundary is broader than an API endpoint, such as jobs, modules, events, or agent interfaces. |
| `event-contract-design` | You need asynchronous event schema, envelope, topic/channel naming, replay, or compatibility. |
| `data-modeling` | You need persistence structure and constraints. |
| `webhook-integration` | You are implementing inbound third-party webhook handling. |
| `debugging` | An API already fails and needs diagnosis. |
