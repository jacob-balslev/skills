---
name: testing-strategy
description: "Use when planning tests for a bug fix, feature, or refactor — deciding what deserves a test, at which level, with what evidence. Covers test-scope decisions, test-level selection (unit / integration / contract / e2e), effort-to-risk matching, regression targeting, evidence quality, and failure-case coverage. Do NOT use for chasing a known failure (that is `debugging`), for pure doc writing (that is `documentation`), or for conceptual architecture discussion with no verification target (no dedicated skill — treat as strategy, not testing)."
license: MIT
compatibility:
  notes: "Markdown, Git, any codebase"
allowed-tools: Read Grep Bash
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
  category: quality

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: quality-assurance
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-04-18"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-04-18\"}"

  # === Eval-health: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: present
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  eval_state: passing
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  routing_eval: present
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"testing strategy\",\"what to test\",\"what not to test\",\"which test level\",\"test scope\",\"effort vs risk\",\"regression target\",\"failure case coverage\",\"test plan\",\"do I need a test\",\"unit test or integration\",\"test level decision\",\"pin this regression\",\"regression test\",\"slip through\",\"pure formatter test\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"testing-skill\"]"
  # routing_bundles: batch-activation group memberships. Router fires the whole bundle
  # when the bundle label matches. Distinct from workspace_tags (per-project filter).
  routing_bundles: "[\"quality\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"do I need a unit test for this pure formatter or is integration enough?\",\"what's the right test level for a webhook handler that talks to Stripe?\",\"the feature passes manual QA — does it need an automated test?\",\"pin this regression so the same bug can't slip through again\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"my existing test is failing — why?\",\"write a testing-patterns guide for the contributor docs\",\"clean up this duplicated test setup across three files\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"debugging\",\"reason\":\"debugging chases a specific observed failure; testing-strategy decides what to test BEFORE a failure exists\"},{\"skill\":\"refactor\",\"reason\":\"refactor reshapes code (including test setup) while preserving behavior; testing-strategy decides what coverage to author in the first place\"},{\"skill\":\"integration-test-design\",\"reason\":\"integration-test-design owns the design of integration-level tests including their setup and data lifecycle; the 'duplicated test setup across three files' anti_example has token overlap with integration-test setup discipline. testing-strategy decides what level a test should be; integration-test-design owns how to design integration tests once chosen.\"},{\"skill\":\"microcopy\",\"reason\":\"microcopy owns functional UI text and contributor-facing writing; testing-strategy decides what and how to test. Writing a testing-patterns guide for contributor docs is a documentation/writing task owned by microcopy, not a test-scope decision.\"},{\"skill\":\"middleware-patterns\",\"reason\":\"middleware-patterns owns the design of Next.js middleware (request/response transforms, edge runtime, matchers) including writing reference guides about middleware; testing-strategy decides what and how to test. Writing a 'testing-patterns guide' for contributor docs has token overlap with the patterns-guide vocabulary middleware-patterns discusses, not a test-scope decision.\"},{\"skill\":\"performance-engineering\",\"reason\":\"performance-engineering owns load, latency, and SLO-targeted optimization including the regression-on-perf testing discipline; testing-strategy decides what and how to test for correctness. Pinning a correctness regression is a test-coverage decision, not a perf-engineering decision — naming this boundary keeps the routing distinct.\"}],\"verify_with\":[\"debugging\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/testing-strategy/SKILL.md
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

# Testing Strategy

## Coverage

- Test scope: deciding what behavior actually needs a test, and what does not earn the maintenance cost
- Test level selection: choosing between unit, integration, contract, and end-to-end tests based on risk and coupling
- Effort-to-risk matching: investing verification effort where regressions are most likely and most damaging
- Regression targeting: writing tests that pin the specific behavior a change risks breaking, not generic coverage
- Evidence quality: preferring concrete, reproducible verification over assumed or manual checks
- Failure-case coverage: ensuring boundary conditions and error paths are tested, not only the happy path

## Philosophy

Most test suites fail the effort-to-risk test: they exercise code that will never break and skip code that breaks in production. The correct target is the behavior that ships to users, not the code you happen to have written last. Coverage percentage is a proxy, and every proxy eventually gets gamed — the real signal is regressions caught before release. A test that never fails is noise; a test that fails without isolating the cause is worse than no test at all because it wastes the next engineer's time.

## Test-Level Selection

Pick the test level by the risk of the change and the coupling of the behavior, not by the file you happen to be editing. Unit tests are cheap to write and cheap to pass; integration and contract tests are where real production bugs are actually caught.

| Situation | Test level | Why |
|---|---|---|
| Pure function, single-owner, no I/O | **Unit** | Fast, deterministic, zero setup. If you cannot unit-test it, the function is doing too much |
| Logic that composes multiple units inside one service | **Integration** (in-process) | Unit tests of each piece will miss composition bugs; integration test catches real wiring |
| Behavior that crosses a service / process / network boundary | **Contract** | Both sides need a shared verifiable agreement; a unit test on either side misses the real failure mode |
| User-visible flow end-to-end | **E2E** (one or two per critical path) | Proves the full path works at least once; too expensive to run for every code path |
| Bug fix for a bug that reached production | **Regression** at the level where the bug slipped through | If it slipped past unit tests, a unit test won't catch it next time; write the test at the level the bug exposed |
| Behavior that is "obviously correct," unchanged for a year, no external pressure | **No new test** | The test would never fail; it would only add maintenance cost. Every test is a liability until it catches a bug |

### Level-selection anti-patterns

- **Unit testing what should be an integration test** — mocking the only thing that could actually break. Fix: test the real integration, or admit the unit test proves nothing.
- **Integration testing what should be a unit test** — slow setup for a function that has no dependencies. Fix: extract the pure logic and unit-test it.
- **E2E-testing every code path** — fragile, slow, flaky. Fix: one E2E per critical user journey, unit/integration for the rest.
- **Adding a test because coverage dropped** — test has no regression target and never fails meaningfully. Fix: either find a real regression to pin, or delete the uncovered code if it has no value.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/testing-strategy.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/testing-strategy.json). The `Verification` checklist below is the authoring gate for a completed test plan; the eval file is how this skill is graded by `scripts/skill-audit.js --graded`. Do not conflate them — the checklist is for the test author, the eval is for the grader.

## Verification

- [ ] The test type matches the change risk
- [ ] A behavior or regression target is explicit
- [ ] Verification evidence is concrete, not assumed
- [ ] Failure cases and boundaries are covered, not only the happy path

## Do NOT Use When

| Use instead | When |
|---|---|
| `documentation` | The task structures explanation for a reader, not verification for a change |
| `debugging` | The task is chasing a known failure — strategy is planned before the failure, not after |
| `refactor` | The task is restructuring code; any test work is to preserve existing behavior, which belongs to the refactor skill's verification step |
