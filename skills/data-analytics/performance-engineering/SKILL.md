---
name: performance-engineering
description: "Use when measuring, diagnosing, budgeting, or improving performance: latency, throughput, Core Web Vitals, database queries, caching, bundle size, concurrency, resource use, and regression prevention. Do NOT use for telemetry schema design alone (use `observability-modeling`), error capture setup (use `error-tracking`), or premature micro-optimization without a measured bottleneck."
license: MIT
compatibility:
  notes: "Portable performance discipline for frontend, backend, databases, jobs, APIs, and agent tooling."
allowed-tools: Read Grep
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"


  # === v8 Classification (subject + deployment_target; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: data-analytics
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: quality/performance
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-11"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-11\"}"

  # === Evaluation Status: three orthogonal axes ===
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
  keywords: "[\"performance engineering\",\"performance budget\",\"profiling\",\"latency\",\"throughput\",\"Core Web Vitals\",\"database performance\",\"caching\",\"bundle size\",\"performance regression\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"profile this slow dashboard and decide what to optimize first\",\"set performance budgets for API latency, page load, and query time\",\"review this change for likely N+1 queries, cache mistakes, or bundle growth\",\"design a regression check so this endpoint cannot get slow again unnoticed\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"design logs, spans, metrics, and correlation IDs before implementation\",\"set up Sentry and error redaction\",\"make random micro-optimizations without measurements\",\"write general unit tests for this feature\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"observability-modeling\",\"reason\":\"observability-modeling designs telemetry signals; performance-engineering uses measurements to improve performance\"},{\"skill\":\"error-tracking\",\"reason\":\"error-tracking captures failures; performance-engineering handles latency, throughput, and resource efficiency\"},{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy plans correctness tests; performance-engineering plans performance budgets and regressions\"},{\"skill\":\"refactor\",\"reason\":\"refactor restructures code while preserving behavior; performance-engineering changes behavior characteristics under measurement\"}],\"related\":[\"observability-modeling\",\"api-design\",\"data-modeling\",\"testing-strategy\"],\"verify_with\":[\"observability-modeling\",\"code-review\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":180,\"review_cadence\":\"quarterly\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/performance-engineering/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: PASS
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: PASS
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
  last_audited: 2026-05-28
  lint_verdict: PASS
---

# Performance Engineering

## Coverage

Measure and improve performance across frontend, backend, database, jobs, APIs, and tooling. Covers bottleneck analysis, performance budgets, Core Web Vitals, query plans, N+1 detection, caching, batching, concurrency, bundle size, resource use, regression checks, and tradeoffs.

## Philosophy

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
