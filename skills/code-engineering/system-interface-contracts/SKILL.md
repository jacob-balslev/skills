---
name: system-interface-contracts
description: "Use when defining or reviewing contracts between systems, modules, services, agents, jobs, events, APIs, or teams: ownership, inputs, outputs, invariants, compatibility, errors, idempotency, and versioning. Do NOT use for REST resource design alone (use `api-design`), async event contract detail (use `event-contract-design`), database schemas (use `data-modeling`), or post-failure debugging (use `debugging`)."
license: MIT
compatibility:
  notes: "Portable contract-design discipline across code modules, services, queues, APIs, webhooks, jobs, and agent interfaces."
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
  subject: code-engineering
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: architecture/contracts
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
  keywords: "[\"interface contract\",\"system boundary\",\"contract design\",\"compatibility contract\",\"input output invariant\",\"event schema\",\"module boundary\",\"idempotency contract\",\"versioning contract\",\"error contract\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"define the contract between the ingestion job and the dashboard view layer\",\"what invariants must this event producer and consumer share?\",\"review this module boundary for missing ownership and compatibility rules\",\"we need an interface contract before several agents implement opposite sides of the boundary\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"design the REST endpoints, status codes, and pagination\",\"create database tables and constraints\",\"investigate why this existing integration is failing in production\",\"write an ADR after the interface decision has already been accepted\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"api-design\",\"reason\":\"api-design owns REST/API surface shape; system-interface-contracts owns the broader boundary contract across any interface type\"},{\"skill\":\"event-contract-design\",\"reason\":\"event-contract-design owns asynchronous event envelopes, schemas, topics, and compatibility; system-interface-contracts owns the broader boundary discipline\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling owns stored data structure; system-interface-contracts owns producer/consumer expectations and compatibility\"},{\"skill\":\"debugging\",\"reason\":\"debugging investigates a known failure; system-interface-contracts prevents ambiguous boundary behavior before failure\"},{\"skill\":\"architecture-decision-records\",\"reason\":\"architecture-decision-records records the adopted contract decision; this skill designs the contract\"}],\"related\":[\"bounded-context-mapping\",\"api-design\",\"event-storming\",\"event-contract-design\",\"state-machine-modeling\"],\"verify_with\":[\"testing-strategy\",\"code-review\"]}"
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
  skill_graph_canonical_skill: skills/system-interface-contracts/SKILL.md
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

# System Interface Contracts

## Coverage

Design and audit contracts across boundaries: modules, services, event producers/consumers, background jobs, APIs, webhooks, databases, and agents. Covers ownership, data shape, required/optional fields, invariants, preconditions, postconditions, idempotency, ordering, error behavior, retries, compatibility, versioning, and verification.

## Philosophy

A boundary without a contract is a rumor. The implementation may work today because both sides accidentally agree, but the first independent change exposes the missing contract.

Contracts should be specific enough to protect both sides from drift and small enough that teams can keep them true. The contract is not the implementation. It is the stable promise at the boundary.

## Method

1. Name the producer, consumer, owner, and direction of dependency.
2. Define inputs, outputs, and allowed states.
3. State invariants and forbidden states.
4. Define error, retry, timeout, and idempotency behavior.
5. Specify compatibility: additive changes, breaking changes, versioning, and deprecation.
6. Identify observability required to prove the contract is being honored.
7. Add contract tests or fixtures where possible.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/system-interface-contracts.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/system-interface-contracts.json). The checklist below is the authoring gate for system-boundary contracts; the eval file is the grader surface.

## Verification

- [ ] Each side has a named owner
- [ ] Required and optional fields are explicit
- [ ] Invariants and forbidden states are stated
- [ ] Error and retry behavior is deterministic
- [ ] Idempotency keys or deduplication rules exist where duplicate delivery is possible
- [ ] Compatibility rules distinguish additive from breaking changes
- [ ] Contract tests, fixtures, or examples exist for positive and negative cases

## Do NOT Use When

| Use instead | When |
|---|---|
| `api-design` | You specifically need REST/resource endpoint shape, HTTP semantics, or API envelope design. |
| `event-contract-design` | You specifically need asynchronous event envelope, schema, topic, replay, or consumer compatibility rules. |
| `data-modeling` | You need persistence schema, keys, indexes, or data lifecycle. |
| `debugging` | A boundary has already failed and the task is root-cause analysis. |
| `architecture-decision-records` | The contract is chosen and needs a durable decision record. |
