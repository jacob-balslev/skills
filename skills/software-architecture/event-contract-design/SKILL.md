---
name: event-contract-design
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing or reviewing asynchronous event contracts: producer/consumer ownership, event envelope, schema, topic/channel naming, ordering, idempotency, versioning, compatibility, replay, dead-letter behavior, and AsyncAPI/CloudEvents-style documentation. Do NOT use for domain-event discovery (use `event-storming`), broad interface contracts (use `system-interface-contracts`), inbound provider webhook mechanics (use `webhook-integration`), or HTTP endpoint design (use `api-design`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this skill.
compatibility:
  notes: "Portable async-event contract guidance for queues, streams, pub/sub, internal events, outbound webhooks, and documented event-driven APIs."
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: software-architecture
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # scope: required free-text statement of what this skill teaches and what it does not.
  scope: "Use when designing or reviewing asynchronous event contracts: producer/consumer ownership, event envelope, schema, topic/channel naming, ordering, idempotency, versioning, compatibility, replay, dead-letter behavior, and AsyncAPI/CloudEvents-style documentation. Do NOT use for domain-event discovery (use `event-storming`), broad interface contracts (use `system-interface-contracts`), inbound provider webhook mechanics (use `webhook-integration`), or HTTP endpoint design (use `api-design`)."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: architecture/events
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  # freshness: ISO date the skill body was last reviewed or updated.
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.

  # === Evaluation Status: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["event-contract","async-api","cloudevents","event envelope","topic naming","async event schema","event compatibility","replay contract","dead-letter behavior","consumer fixtures"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["design the event contract for publishing OrderPaid to downstream consumers","define topic names, payload schema, idempotency, and versioning for this event stream","review this outbound webhook event schema before customers integrate with it","write the compatibility rules for consumers of these async messages"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["discover the domain events, commands, and policies in this business process","define every boundary contract between services, jobs, and APIs","verify inbound provider webhook signatures and retry behavior","design REST endpoints, status codes, and pagination"]
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/software-architecture/event-contract-design/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
relations:
  related: ["api-design","state-machine-modeling","entity-relationship-modeling","event-storming","system-interface-contracts","observability-modeling","webhook-integration"]
  suppresses: ["event-storming","system-interface-contracts"]
  verify_with: ["system-interface-contracts","observability-modeling","real-time-updates"]
---
# Event Contract Design

## Concept of the skill

Use when designing or reviewing asynchronous event contracts: producer/consumer ownership, event envelope, schema, topic/channel naming, ordering, idempotency, versioning, compatibility, replay, dead-letter behavior, and AsyncAPI/CloudEvents-style documentation.

## Coverage

Design asynchronous event contracts for producers and consumers. Covers event envelope, schema, event type, topic/channel naming, producer ownership, consumer expectations, required and optional fields, idempotency keys, ordering, causation and correlation IDs, schema evolution, replay, dead-letter behavior, compatibility, observability, and machine-readable documentation such as AsyncAPI or CloudEvents-style metadata.

## Philosophy of the skill
An event is a public promise once another consumer depends on it. If the payload, ordering, retry, or compatibility rules are implicit, every consumer invents its own interpretation and the event stream becomes shared folklore.

Do not confuse event discovery with event contracts. Discovery asks what happened in the domain. Contract design asks what exactly will be published, consumed, replayed, and evolved.

## Method

1. Name the producer, owner, intended consumers, and event purpose.
2. Separate business event type from transport topic or queue name.
3. Define envelope fields: id, type, source, time, subject, schema version, correlation, causation, tenant, and idempotency key.
4. Define payload schema with required, optional, nullable, and deprecated fields.
5. State ordering, delivery, retry, replay, and dead-letter expectations.
6. Define compatibility rules: additive fields, breaking changes, versioning, deprecation, and consumer migration.
7. Add observability fields needed to reconstruct publishing and consumption failures.
8. Provide at least one positive and one negative contract fixture.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/event-contract-design.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/event-contract-design.json). The checklist below is the authoring gate for async event contracts; the eval file is the grader surface.

## Verification

- [ ] Producer, owner, and consumers are named
- [ ] Event type, topic/channel, envelope, and payload are distinct
- [ ] Required, optional, nullable, and deprecated fields are explicit
- [ ] Idempotency, ordering, retry, replay, and dead-letter behavior are stated
- [ ] Compatibility rules distinguish additive from breaking changes
- [ ] Correlation and causation IDs cross async boundaries
- [ ] Positive and negative fixtures exist for contract testing

## Do NOT Use When

| Use instead | When |
|---|---|
| `event-storming` | You are still discovering domain events, commands, policies, aggregates, or timelines. |
| `system-interface-contracts` | The boundary is not specifically asynchronous events or messages. |
| `webhook-integration` | You are implementing inbound provider webhooks, signatures, retries, and raw payload handling. |
| `api-design` | You are designing HTTP endpoints, status codes, pagination, filtering, or error envelopes. |
| `observability-modeling` | The event contract is settled and the task is telemetry design. |
