---
name: debugging
description: "Use when behavior is broken, a test is failing, or runtime output contradicts expectations. Covers failure reproduction, scope reduction by bisection, evidence capture at the moment of failure, root-cause isolation (not symptom patching), fix verification against the same evidence path, and regression-test creation. Do NOT use for feature planning, architectural design, or behavior-preserving refactor."
license: MIT
compatibility:
  notes: "Markdown, Git, any codebase"
allowed-tools: Read Grep Bash
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
  subject: code-engineering
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-04-18"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-04-18\"}"

  # === Evaluation Status: three orthogonal axes ===
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
  keywords: "[\"debugging\",\"reproduce failure\",\"reproduce bug\",\"failing test\",\"root cause\",\"symptom vs cause\",\"minimum reproduction\",\"bisect\",\"what caused it\",\"my tests are failing\",\"what changed\",\"regression\",\"used to work\",\"what broke\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"debugging-skill\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"my tests pass locally but fail in CI — why?\",\"this function used to work yesterday; what changed?\",\"reproduce this Stripe webhook failure from production logs\",\"I see the symptom but can't find the root cause of this nil panic\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"plan test coverage for a new feature\",\"document what this function does for future readers\",\"refactor this messy code while the test suite is green\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy plans what to test before a failure exists; debugging chases a specific observed failure\"},{\"skill\":\"refactor\",\"reason\":\"refactor is behavior-preserving code change with green tests; debugging is invoked because tests or behavior are NOT green\"},{\"skill\":\"generative-ui\",\"reason\":\"generative-ui owns the model-emits-typed-UI-spec pattern for writing documentation or explanatory content; debugging owns chasing observed runtime failures, not writing documentation about functions\"},{\"skill\":\"test-driven-development\",\"reason\":\"test-driven-development owns writing test cases first as part of the spec-then-implement loop on green code; debugging owns chasing a specific observed failure on broken code — TDD operates pre-failure, debugging operates post-failure\"}],\"verify_with\":[\"testing-strategy\"]}"
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
  skill_graph_canonical_skill: skills/debugging/SKILL.md
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

# Debugging

## Coverage

- Reproduction: turning a vague bug report into a deterministic failing case
- Scope reduction: isolating the smallest surface where the failure still reproduces
- Evidence capture: collecting logs, stack traces, and state snapshots at the moment of failure
- Root-cause isolation: distinguishing symptoms from causes and resisting the urge to patch symptoms
- Fix verification: re-running the original failure path to confirm the fix is real
- Regression prevention: converting the failing case into a permanent test so the same bug cannot return silently

## Philosophy

The fastest way to fix a bug is usually the wrong fix. A working reproduction is worth more than a plausible hypothesis; a plausible hypothesis is worth more than a clever fix; a clever fix that skips the reproduction step ships the same bug again under a different name. When pressure is high the temptation to jump from symptom to patch is also high — resist it, because the cost of a wrong fix is paid again by the next person who hits the same failure with less context than you had.

## Workflow

Each step asks a question. The answer decides the next step. Do not skip steps to save time; the steps exist because skipping them is how bugs return.

| Step | Ask | If yes | If no |
|---|---|---|---|
| 1. Reproduce | Do you have a deterministic failing case? | Go to step 2 | Add logging, narrow inputs, or run the failing path in a loop until the failure is reliable |
| 2. Scope | Can you reproduce it in a surface smaller than the full system? | Go to step 3 | Bisect — halve the code path, data, or config and retry |
| 3. Evidence | Do you have the state at the moment of failure, not just the symptom after? | Go to step 4 | Add instrumentation at the boundary where state flips wrong |
| 4. Cause | Does your hypothesis explain ALL of the evidence, not just the visible symptom? | Go to step 5 | Form a better hypothesis — partial explanations hide shared root causes |
| 5. Verify | Does the same evidence path pass with the fix applied, and fail with it reverted? | Go to step 6 | The fix did not land or the cause was wrong — return to step 4 |
| 6. Regression test | Does the test you just wrote fail without the fix and pass with it? | Done | Your test is not isolating the cause — rewrite it |

### When to stop and escalate

- Step 1 is still unreproducible after ~60 min of narrowing → suspect non-determinism (race, timing, clock, network). This is a design issue, not a debugging issue.
- Step 3 instrumentation shows contradictory state on the same object → suspect memory corruption, concurrent mutation, or stale cache. Out of scope for a single-file debugger; escalate to architectural review.
- The same bug returned after a previous fix → the previous fix patched a symptom. Start over at step 1 and find the real cause.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/debugging.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/debugging.json). The `Verification` checklist below is the authoring gate for a completed debugging pass; the eval file is how this skill is graded by `scripts/skill-audit.js --graded`. Do not conflate them — the checklist is for the debugger, the eval is for the grader.

## Verification

- [ ] The original failure was reproduced deterministically, not just described
- [ ] The hypothesis explains every piece of evidence collected, not a subset
- [ ] The fix was verified by the same evidence path that revealed the bug
- [ ] A regression test fails without the fix and passes with it
- [ ] The next engineer who hits this failure can reach the fix from the regression test alone

## Do NOT Use When

| Use instead | When |
|---|---|
| `refactor` | The task is structural cleanup, not failure-driven diagnosis |
| `testing-strategy` | The task is planning what to test, not chasing a known failure |
| `documentation` | The task is explaining behavior, not fixing broken behavior |
