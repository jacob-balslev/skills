---
name: data-modeling
description: "Use when designing logical or physical data structures: entities as stored data, keys, constraints, normalization, denormalization, provenance, lifecycle, indexing implications, and schema tradeoffs. Do NOT use for pre-implementation business concept discovery (use `conceptual-modeling`), migrations against an existing database (use `database-migration`), or formal ontology semantics (use `ontology-modeling`)."
license: MIT
compatibility:
  notes: "Portable data-modeling discipline across relational, document, graph, event-sourced, and warehouse-style systems."
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
  operation: do
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
  domain: data/modeling
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
  keywords: "[\"data modeling\",\"logical data model\",\"physical data model\",\"entity relationship\",\"normalization\",\"denormalization\",\"primary key\",\"foreign key\",\"schema design\",\"data provenance\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"turn this conceptual model into a logical schema with keys and constraints\",\"should this be normalized, denormalized, or materialized as a view?\",\"model provenance for revenue, cost, and refund fields\",\"choose identifiers and uniqueness constraints before writing the migration\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"identify business entities and relationships without implementation details\",\"write and apply the actual migration for an existing database\",\"define OWL/RDF class axioms and reasoning rules\",\"design REST endpoints for these resources\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"conceptual-modeling\",\"reason\":\"conceptual-modeling is implementation-neutral; data-modeling adds logical and physical data constraints\"},{\"skill\":\"database-migration\",\"reason\":\"database-migration changes an existing database; data-modeling decides the schema shape before migration\"},{\"skill\":\"ontology-modeling\",\"reason\":\"ontology-modeling formalizes meaning; data-modeling structures persisted data\"},{\"skill\":\"api-design\",\"reason\":\"api-design exposes resources and operations; data-modeling stores and constrains underlying data\"}],\"related\":[\"conceptual-modeling\",\"database-migration\",\"api-design\",\"state-machine-modeling\",\"entity-relationship-modeling\"],\"depends_on\":[\"conceptual-modeling\"],\"verify_with\":[\"database-migration\",\"testing-strategy\"]}"
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
  skill_graph_canonical_skill: skills/data-modeling/SKILL.md
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

# Data Modeling

## Coverage

Design logical and physical data structures from a validated conceptual model. Covers entities as stored records, identifiers, primary keys, foreign keys, uniqueness, cardinality enforcement, normalization, denormalization, derived data, materialized views, provenance, retention, indexing implications, and schema-change risk.

## Philosophy

Data models are long-lived promises. Application code changes quickly; stored data and integrations remember mistakes. A good data model preserves business meaning, supports expected queries, and prevents invalid states without overfitting to today's UI.

Do not jump from concept to migration. First decide what must be stored, what can be derived, what must be constrained, and what must remain queryable.

## Method

1. Start from a conceptual model or extract one quickly.
2. Define identity and uniqueness for each stored entity.
3. Map relationships to keys, junctions, embeddings, or references.
4. Decide normalization vs denormalization based on write/read patterns and consistency requirements.
5. Mark derived fields and their source of truth.
6. Add provenance for data sourced from external systems or calculations.
7. Check query patterns and indexing implications.
8. Hand off to `database-migration` for implementation changes.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/data-modeling.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/data-modeling.json). The checklist below is the authoring gate for persistence-model decisions; the eval file is the grader surface.

## Verification

- [ ] Every stored entity has identity and uniqueness criteria
- [ ] Relationship cardinality is enforceable or intentionally documented
- [ ] Derived data names its source and refresh rule
- [ ] Denormalization has a stated read/write tradeoff
- [ ] External-source fields carry provenance
- [ ] Retention and privacy obligations are represented where relevant
- [ ] Expected queries can be served without accidental full scans at scale

## Do NOT Use When

| Use instead | When |
|---|---|
| `conceptual-modeling` | You are still discovering business concepts without persistence details. |
| `database-migration` | You need to write, apply, or verify a concrete migration. |
| `ontology-modeling` | You need formal semantic axioms or reasoning constraints. |
| `api-design` | You need endpoint, request, response, error, and versioning design. |
