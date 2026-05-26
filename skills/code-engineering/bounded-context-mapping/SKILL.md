---
name: bounded-context-mapping
description: "Use when drawing Domain-Driven Design boundaries: bounded contexts, context maps, ownership seams, upstream/downstream relationships, anti-corruption layers, shared kernels, and translation boundaries. Do NOT use for pre-DDD entity discovery (use `conceptual-modeling`), database schema design (use `data-modeling`), or HTTP endpoint design (use `api-design`)."
license: MIT
compatibility:
  notes: "Portable DDD boundary-mapping discipline for monoliths, modular monoliths, services, event-driven systems, and agent workspaces."
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
  domain: architecture/domain-boundaries
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
  keywords: "[\"bounded context\",\"context map\",\"domain-driven design\",\"DDD boundary\",\"anti-corruption layer\",\"shared kernel\",\"upstream downstream\",\"conformist\",\"customer supplier\",\"domain boundary\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"orders, fulfillment, payments, and support all use status differently - where should the bounded contexts be?\",\"map the upstream/downstream relationships before we split this module\",\"do we need an anti-corruption layer between our canonical order model and Shopify?\",\"which concepts belong to a shared kernel and which are context-local?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"list entities, attributes, and cardinalities before any architecture decision\",\"create SQL tables, foreign keys, and indexes\",\"design REST routes and response envelopes\",\"write an ADR for the boundary decision after we already chose it\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"conceptual-modeling\",\"reason\":\"conceptual-modeling discovers domain structure before DDD boundary ownership is assigned\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling owns persistence structure after context boundaries inform ownership\"},{\"skill\":\"api-design\",\"reason\":\"api-design owns external endpoint shape; bounded-context-mapping owns domain ownership and translation boundaries\"},{\"skill\":\"architecture-decision-records\",\"reason\":\"architecture-decision-records records a chosen decision; bounded-context-mapping analyzes the boundary before the decision is recorded\"}],\"related\":[\"event-storming\",\"system-interface-contracts\",\"conceptual-modeling\",\"architecture-decision-records\"],\"depends_on\":[\"conceptual-modeling\"],\"verify_with\":[\"semantic-relations\",\"system-interface-contracts\"]}"
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
  skill_graph_canonical_skill: skills/bounded-context-mapping/SKILL.md
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

# Bounded Context Mapping

## Coverage

Map domain ownership boundaries and relationships between contexts. Covers bounded context naming, context maps, ubiquitous language separation, upstream/downstream relationships, shared kernel, conformist, customer/supplier, partnership, open host service, published language, anti-corruption layer, and boundary validation against real change scenarios.

## Philosophy

A bounded context is a language and ownership boundary, not a deployment unit. Splitting services without splitting language creates distributed coupling. Keeping one module while mixing incompatible meanings creates hidden domain bugs.

The central question is: "Where does this word mean something different?" Those differences drive boundaries more reliably than folder layout, teams, or database tables.

## Method

1. Extract candidate terms and workflows from requirements, code, docs, and incidents.
2. Mark terms whose meaning changes by actor or workflow.
3. Group concepts that change together under the same business capability.
4. Draw context boundaries around language consistency, not technical layers.
5. Label relationships: upstream/downstream, partnership, shared kernel, conformist, or anti-corruption.
6. Define translation points and ownership of canonical terms.
7. Stress-test with change scenarios: who changes, who breaks, who must approve?

## Verification

- [ ] Each context has a coherent language that does not overload key terms
- [ ] Cross-context communication uses explicit contracts or translation
- [ ] Shared kernels are intentionally small and high-stability
- [ ] Upstream/downstream power dynamics are named
- [ ] Anti-corruption layers protect local language from external models
- [ ] Boundary decisions were tested against real feature-change scenarios
- [ ] No boundary is based only on folder, team, or database layout

## Do NOT Use When

| Use instead | When |
|---|---|
| `conceptual-modeling` | You need to discover entities and relationships before assigning ownership boundaries. |
| `data-modeling` | You need logical or physical data structures. |
| `api-design` | You need HTTP route, request, response, status, or versioning design. |
| `architecture-decision-records` | You need to record a decision that has already been made. |

