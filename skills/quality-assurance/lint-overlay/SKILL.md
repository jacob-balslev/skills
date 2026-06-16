---
name: lint-overlay
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when adding or enforcing lint rules as part of a test or verification plan. Extends testing-strategy with lint-specific guidance: rule selection, gate placement, failure triage, and migration planning when introducing rules to an existing codebase. Do NOT use standalone — load the base testing-strategy skill alongside it — and do NOT use for chasing a specific lint failure in one file (that is debugging)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this skill.
compatibility:
  notes: "Markdown, Git, any codebase with a lint tool"
allowed-tools: Read Grep Bash
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
  public: true
  # scope: required free-text statement of what this skill teaches and what it does not.
  scope: "Use when adding or enforcing lint rules as part of a test or verification plan. Extends testing-strategy with lint-specific guidance: rule selection, gate placement, failure triage, and migration planning when introducing rules to an existing codebase. Do NOT use standalone — load the base testing-strategy skill alongside it — and do NOT use for chasing a specific lint failure in one file (that is debugging)."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
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
  keywords: ["lint","lint rules","new rule","pre-commit","CI only","lint integration","static analysis","eslint","noImplicitAny","phased lint rollout"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["lint-overlay"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["plan ESLint rule introduction for a monorepo that has never had linting","which lint rules should block CI and which should warn-only for now?","migrate these legacy noImplicitAny violations in phased gates","decide whether this new rule runs pre-commit or in CI only"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["decide whether to unit-test or integration-test this handler","extract this repeated code pattern into a shared util"]
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  # grounding: required when non-empty `project[]`. Declares the truth sources
  # the skill anchors to and the failure modes those sources prevent. Omit when the
  # skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
  grounding: "{\"subject_matter\":\"Lint-specific verification planning in the Skill Graph starter library\",\"grounding_mode\":\"hybrid\",\"truth_sources\":[\"scripts/skill-lint.js\",\"scripts/check-routing-config.js\",\"scripts/skill-graph-routing-eval.js\",\"examples/evals/lint-overlay.json\",\"skills/quality-assurance/testing-strategy/SKILL.md\"],\"failure_modes\":[\"lint_failure_triaged_as_strategy_problem\",\"overlay_loaded_without_base_testing_strategy\",\"rule_migration_lacks_gate_placement\",\"routing_eval_claim_not_backed_by_harness\"],\"evidence_priority\":\"repo_code_first\"}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/quality-assurance/lint-overlay/SKILL.md
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
  related: ["pattern-recognition","debugging","refactor","skill-infrastructure","problem-locating-solving"]
  suppresses: ["testing-strategy","integration-test-design"]
---
# Lint Overlay

## Concept of the skill

Use when adding or enforcing lint rules as part of a test or verification plan. Extends testing-strategy with lint-specific guidance: rule selection, gate placement, failure triage, and migration planning when introducing rules to an existing codebase.

## Extends

This overlay extends `testing-strategy`. Load both skills whenever lint is part of a verification plan — this overlay alone is under-specified because it relies on the base skill's effort-to-risk framework for deciding which rules to enforce at all.

**What this overlay adds on top of `testing-strategy`:**

| Concern | `testing-strategy` (base) | `lint-overlay` (this skill) |
|---|---|---|
| What to verify | Behavior under real input | Static properties of the source, independent of input |
| When to run | At the scope dictated by risk | Before unit tests, on changed files only (unless a global rule is at risk) |
| Failure meaning | A regression in shipped behavior | A rule violation — block the merge, do not debug it in situ |
| Migration pattern | Write tests for existing behavior once | Introduce rules by pinning pre-change green state; fail only on new violations |

**What this overlay does NOT override from the base:**

- Effort-to-risk matching (base decides *whether* to lint before this decides *how*)
- Evidence quality (lint output is evidence; the same "concrete, reproducible" rule applies)
- Failure-case coverage (lint catches only the cases its rules know about; behavior tests still cover the rest)

## Coverage

- Lint as verification: when a lint step belongs in a test plan and when it is out of scope
- Rule selection: choosing which lint rules to enforce based on the risk profile of the change
- Lint-gate placement: where lint fits in the verification sequence relative to unit and integration tests
- Failure triage: separating lint failures caused by the current change from pre-existing rule violations
- Overlay discipline: what this skill adds on top of testing-strategy and what it intentionally leaves to the base

## Philosophy of the skill
Lint is a verification signal, not a style opinion. A lint rule exists because a pattern has a measurable cost — a bug class, a readability drop, a maintenance drag — and the rule's job is to surface that cost early enough to fix it cheaply. Rules without that grounding are style preferences dressed up as gates, and style preferences should not block merges.

Three principles follow from that stance:

- **Enforce only rules that were green before the change.** A new rule that fails 200 pre-existing files on its first run is not a test — it is a scope change. Pin the pre-change green state, fail only on *new* violations, and plan the cleanup as a separate migration track.
- **Lint failures are test failures, not advisory warnings.** A rule that does not block the merge does not change behavior; it just adds noise to the log. Either the rule is worth a block or it is not a rule yet. "Warn-only" is a deployment mode for a migration window, not a permanent posture.
- **Lint scope matches test scope.** Run lint on the files the change touches, not on the entire tree. The exception is a rule whose correctness is global (e.g., a no-circular-imports check that a local diff cannot detect) — those run tree-wide, deliberately, and their cost is acknowledged.

## Overlay Rules

These rules augment (not replace) the testing-strategy base skill.

| Rule | When it applies | Why |
|---|---|---|
| Lint runs after unit tests, before integration tests | When the change touches logic and style | Lint fails are cheap to fix; catching them before integration saves context |
| Only enforce rules that were green before the change | When introducing lint to an existing codebase | Fail on regressions, not on pre-existing violations |
| Lint scope matches the test scope | When the diff is bounded to specific files | Run lint only on changed files unless a global rule is at risk |
| Lint failures are blocking, not advisory | When lint is part of the official CI gate | A lint failure is a test failure; treat it the same way |
| New lint rules require a migration plan | When adding a rule that affects many existing files | Adding a rule that immediately fails 200 files is not a test — it is a scope change |

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/lint-overlay.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/lint-overlay.json). Because this is an overlay, the eval prompts specifically test what the overlay adds on top of `testing-strategy` and what it deliberately leaves to the base. The eval file is how this skill is graded by `scripts/skill-audit.js --graded`.

## Verification

After applying this skill, verify:

- [ ] The task matches the declared scope, coverage, or positive examples.
- [ ] The response follows this skill's workflow or checks instead of generic advice.
- [ ] The exclusions in `## Do NOT Use When` do not point to a better skill.

## Do NOT Use When
| Use instead | When |
|---|---|
| `testing-strategy` alone | Lint is not in scope for this change — load only the base skill |
| `debugging` | The task is chasing a specific lint failure in one file, not planning lint-gate strategy |
| `refactor` | The task is fixing accumulated lint debt as structural cleanup — refactor covers behavior preservation during the cleanup |
