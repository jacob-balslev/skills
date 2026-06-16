---
name: performance-engineering
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when measuring, diagnosing, budgeting, or improving performance: latency, throughput, Core Web Vitals, database queries, caching, bundle size, concurrency, resource use, and regression prevention. Do NOT use for telemetry schema design alone (use `observability-modeling`), error capture setup (use `error-tracking`), or premature micro-optimization without a measured bottleneck."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this skill.
compatibility:
  notes: "Portable performance discipline for frontend, backend, databases, jobs, APIs, and agent tooling."
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
  subject: quality-assurance
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Measuring, diagnosing, budgeting, and improving performance — latency, throughput, Core Web Vitals, database queries, caching, bundle size, concurrency, resource use, and regression prevention. Portable across any system with performance goals; principle-grounded, not repo-bound. Excludes telemetry schema design alone (observability-modeling), error-capture setup (error-tracking), and premature micro-optimization without a measured bottleneck."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: quality/performance
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
  keywords: ["performance engineering","performance budget","profiling","latency","throughput","Core Web Vitals","database performance","caching","bundle size","performance regression"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["profile this slow dashboard and decide what to optimize first","set performance budgets for API latency, page load, and query time","review this change for likely N+1 queries, cache mistakes, or bundle growth","design a regression check so this endpoint cannot get slow again unnoticed"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["design logs, spans, metrics, and correlation IDs before implementation","set up Sentry and error redaction","make random micro-optimizations without measurements","write general unit tests for this feature"]
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
  skill_graph_canonical_skill: skills/quality-assurance/performance-engineering/SKILL.md
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
  related: ["api-design","entity-relationship-modeling","refactor","observability-modeling","testing-strategy"]
  suppresses: ["testing-strategy","error-tracking"]
  verify_with: ["code-review","observability-modeling","connection-pooling"]
---
# Performance Engineering

## Concept of the skill

Measuring, diagnosing, budgeting, and improving performance — latency, throughput, Core Web Vitals, database queries, caching, bundle size, concurrency, resource use, and regression prevention.

## Coverage

Measure and improve performance across frontend, backend, database, jobs, APIs, and tooling. Covers bottleneck analysis, performance budgets, Core Web Vitals, query plans, N+1 detection, caching, batching, concurrency, bundle size, resource use, regression checks, and tradeoffs.

## Philosophy of the skill
Measure first. Performance work without measurement is guessing, and guessing usually optimizes the easiest code rather than the bottleneck. The correct target is the user-visible or business-critical bottleneck with evidence.

Performance is also a contract. If speed matters, define budgets and regression checks before the system silently decays.

## Method

1. Define the performance goal and user/business impact.
2. Collect baseline measurements under realistic conditions.
3. Identify the bottleneck: network, server, database, rendering, bundle, CPU, memory, lock contention, or third party.
4. Choose the smallest intervention likely to move the bottleneck.
5. Verify improvement with the same measurement method.
6. Add a budget, alert, or regression test for the fixed surface.
7. Record tradeoffs such as freshness, complexity, cost, or cache invalidation risk.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/performance-engineering.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/performance-engineering.json). The checklist below is the authoring gate for performance decisions; the eval file is the grader surface.

## Verification

- [ ] Baseline and post-change measurements use the same method
- [ ] The optimized target is the measured bottleneck
- [ ] User-visible or business impact is stated
- [ ] Cache changes include invalidation and staleness rules
- [ ] Database fixes include query-plan or index evidence when relevant
- [ ] Frontend fixes include bundle or Web Vitals evidence when relevant
- [ ] A regression guard exists for important performance surfaces

## Do NOT Use When

| Use instead | When |
|---|---|
| `observability-modeling` | You need to design telemetry schema and diagnostic signals. |
| `error-tracking` | You need error capture, redaction, source maps, or issue triage. |
| `testing-strategy` | You need general correctness test planning. |
| `refactor` | You are restructuring code without a measured performance goal. |
