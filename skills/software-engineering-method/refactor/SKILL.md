---
name: refactor
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when reorganizing existing code without changing external behavior — extracting functions, reducing duplication, renaming for clarity, splitting modules, or tightening structure. Covers behavior preservation, duplication reduction, decomposition, naming improvements, structural reorganization, and before/after verification. Do NOT use for bug investigation, adding new product behavior, or writing documentation (even when the docs describe the refactored code)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this skill.
compatibility:
  notes: "Markdown, Git, any codebase"
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
  subject: software-engineering-method
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Behavior-preserving restructuring of existing code — extracting functions, reducing duplication, renaming for clarity, splitting modules, and tightening structure, with every change verified against before/after behavior so external contracts stay identical. Portable across any language or codebase; principle-grounded, not repo-bound. Excludes bug investigation and root-cause isolation (debugging, diagnosis), adding new product behavior (feature implementation), and documentation authoring (doc-updater) even when the docs describe the refactored code."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
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
  keywords: ["refactor","cleanup","extract function","reduce duplication","rename module","rename for clarity","split this file","decompose function","duplicated logic","behavior preserving"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["refactor-skill"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["this 600-line function is hard to reason about — decompose it while keeping tests green","extract the duplicated validation logic from these three handlers into a helper","rename this module from `utils` to something that describes what it actually does","split this file by responsibility; no behavior changes, tests must still pass"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["the test is failing after my edit — what did I break?","write an architecture note explaining this pattern for new team members","reproduce why this function retries three times on transient network errors"]
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
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/software-engineering-method/refactor/SKILL.md
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
  related: ["semantics","tool-call-flow","generative-ui","context-graph","error-boundary","performance-testing"]
  suppresses: ["debugging"]
  verify_with: ["testing-strategy","test-driven-development","test-doubles-design"]
  depends_on: ["testing-strategy"]
---
# Refactor

## Concept of the skill

Behavior-preserving restructuring of existing code — extracting functions, reducing duplication, renaming for clarity, splitting modules, and tightening structure, with every change verified against before/after behavior so external contracts stay identical.

## Coverage

- Behavior preservation: identifying the external contract that must remain stable before any change
- Duplication reduction: consolidating repeated logic without over-abstraction
- Decomposition: extracting functions, modules, or types to improve readability and reuse
- Naming improvements: renaming so identifiers carry their real meaning
- Structure improvements: reorganizing file and module boundaries when the current layout obscures intent
- Verification before and after: running the same behavioral checks on both sides of the change

## Philosophy of the skill
Refactoring pays off only when the shape of the code has diverged from the shape of the problem. Before that point it is risk without reward — every move invites a regression, and "cleaner" is a preference, not a justification. The honest test for a legitimate refactor is not "this feels better" but "the next concrete change will be materially easier because of this one." If you cannot name the next change, stop — you are rearranging, not refactoring, and the safest rearrangement is none.

## Workflow

Each step decides whether to continue, split, or stop. "Stop" is always a valid answer; speculative refactoring is a failure mode, not a signal of ambition.

| Step | Ask | If yes | If no |
|---|---|---|---|
| 1. Contract | What externally observable behavior must stay the same? | Write it down as a test suite or explicit checklist | Stop — you cannot refactor what you cannot pin down |
| 2. Next-change justification | Can you name one concrete pending change that becomes easier because of this refactor? | Go to step 3 | Stop — you are rearranging for taste, not improving the codebase |
| 3. Smallest useful cut | What is the smallest structural change that moves toward the next-change goal? | Make only that change | Split into sequential cuts; do not change multiple abstraction layers at once |
| 4. Behavior re-verify | Does the contract from step 1 still hold exactly? | Commit | Revert; the refactor was not behavior-preserving. Start over smaller |
| 5. Stop condition | Have you made the next change materially easier than it would have been before? | Done | Do not keep going — refactoring beyond the next change is speculative waste |

### When to back out

- A green test from before the refactor is now red → revert immediately, then cut smaller.
- The next-change goal shifted during the refactor → restart at step 2 with the new goal before continuing.
- The refactor requires touching more than one abstraction layer in a single commit → split into per-layer commits and re-verify each.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/refactor.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/refactor.json). The `Verification` checklist below is the authoring gate for a completed refactor; the eval file is how this skill is graded by `scripts/skill-audit.js --graded`. Do not conflate them — the checklist is for the engineer, the eval is for the grader.

## Verification

- [ ] External behavior is unchanged — same tests green before and after
- [ ] The named next change is now demonstrably easier, not merely "more possible"
- [ ] No new abstraction was introduced speculatively (no "future-proofing" without a named consumer)
- [ ] Each commit is a single structural change, not a bundle of rearrangements

## Do NOT Use When

| Use instead | When |
|---|---|
| `debugging` | The task starts from a failing behavior, not from structural cleanup |
| `documentation` | The task is rewriting docs — even docs about the refactored code — it belongs to a separate commit and skill |
| `testing-strategy` | The task is designing a new test suite; the refactor's own tests should already exist before step 1 |
