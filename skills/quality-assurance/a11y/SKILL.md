---
name: a11y
description: "Use when building or reviewing interactive UI, forms, navigation, or dynamic content. Covers semantic HTML, keyboard access, focus management, labeling, state-change announcement, and reduced-motion / high-contrast preferences. Do NOT use for color-palette creation, visual branding, feedback-state staging, or prose reading-level accessibility - those belong to `visual-design-foundations`, `interaction-feedback`, and documentation respectively."
license: MIT
compatibility:
  notes: "Markdown, Git, any web stack"
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
  category: quality

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: quality-assurance
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: quality/accessibility
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
  keywords: "[\"screen reader\",\"announce\",\"validation state\",\"form labels\",\"assistive tech\",\"ARIA roles\",\"keyboard support\",\"arrow key\",\"navigation\",\"focus return\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"a11y-skill\"]"
  # paths: glob array of code surfaces this skill governs. Supports gitignore-style
  # negation. Each glob should map to ONE canonical skill. Omit if purely conceptual.
  paths: "[\"**/*.{html,tsx,jsx,vue,svelte}\",\"**/*.css\",\"!**/*.test.{ts,tsx,js,jsx}\",\"!**/dist/**\",\"!**/node_modules/**\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"this modal is keyboard-trapped — users can't Escape to close it\",\"screen reader doesn't announce when the form validation state changes\",\"add proper labels to these form fields so assistive tech can read them\",\"review this dropdown menu for arrow-key navigation and focus return\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"rewrite this error message at a 6th-grade reading level\",\"clean up this accessibility code without changing how it behaves\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"refactor\",\"reason\":\"refactor is behavior-preserving code modification; a11y is observable user-facing behavior\"},{\"skill\":\"diagnosis\",\"reason\":\"diagnosis classifies failure symptoms (Logic / Runtime / Performance / etc.) for triage; a11y owns assistive-tech behavior. The phrase 'rewrite this error message...' is a documentation/UX concern, not a diagnosis or a11y concern — diagnosis is named here so the router excludes it from a11y's positive scope.\"},{\"skill\":\"linguistics\",\"reason\":\"linguistics owns reading-level, audience-register, and wording rationale; a11y owns assistive-technology behavior and accessibility semantics. Rewriting an error message for reading level is language work, not an accessibility implementation task.\"},{\"skill\":\"visual-design-foundations\",\"reason\":\"visual-design-foundations owns palette, typography, spacing, and visual craft; a11y owns whether the resulting interaction is perceivable, operable, understandable, and robust\"},{\"skill\":\"interaction-feedback\",\"reason\":\"interaction-feedback owns feedback-state staging; a11y owns whether those state changes are announced and operable\"},{\"skill\":\"best-practice\",\"reason\":\"best-practice owns generic code-quality cleanup and language/idiom hygiene; a11y owns assistive-tech behavior. Phrases like 'clean up this accessibility code without changing behavior' are best-practice refactor activities, not a11y semantic work — best-practice is named here so the router excludes it from a11y's positive scope.\"}],\"related\":[\"interaction-patterns\",\"form-ux-architecture\",\"interaction-feedback\",\"design-system-architecture\"],\"verify_with\":[\"testing-strategy\"]}"
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
  skill_graph_canonical_skill: skills/a11y/SKILL.md
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
last_audited: 2026-05-25
lint_verdict: PASS
---

# Accessibility

## Coverage

- Semantic HTML: choosing the right primitive elements so structure is meaningful to assistive technology
- Keyboard access: making every interaction reachable and operable without a pointing device
- Focus management: keeping focus visible, predictable, and correctly placed after navigation and state changes
- Labeling and naming: ensuring every interactive element has a programmatic name that matches its visible label
- State and change announcement: communicating dynamic updates (loading, errors, success) to assistive technology
- Reduced-motion and high-contrast preferences: respecting user settings that affect interaction perception

## Philosophy

Accessible interaction is structural, not cosmetic. It is decided by the primitive you picked, the focus order you wrote, and the label that ships or doesn't — not by the audit that runs after. Teams that treat accessibility as a finishing pass pay for it twice: once in remediation work that was cheaper to avoid, and again when assistive-technology users hit the failure and bounce. The correct default is to build with those users in scope from the first commit, not after the first lawsuit.

## Primitive Selection

The single highest-leverage accessibility decision is picking the right HTML primitive before styling. A wrong primitive cannot be rescued by ARIA; the right primitive usually needs no ARIA at all.

| User intent                          | Correct primitive                               | Wrong primitives (common mistakes)                      |
| ------------------------------------ | ----------------------------------------------- | ------------------------------------------------------- |
| Trigger an action on the same page   | `<button type="button">`                        | `<a href="#">`, `<div onclick>`, `<span role="button">` |
| Navigate to a different URL          | `<a href="…">`                                  | `<button onclick=navigate>`, `<div onclick>`            |
| Group related form controls          | `<fieldset>` + `<legend>`                       | `<div>` with a heading above it                         |
| Label a form control                 | `<label for="…">` (or wrapping `<label>`)       | `<div>` text next to the input, `placeholder` only      |
| Show a collapsible section           | `<details>` + `<summary>`                       | `<div>` with JS toggle and no ARIA                      |
| Present tabular data                 | `<table>` + `<th scope="…">`                    | `<div>` grid, CSS grid with no semantic role            |
| Announce a status change             | `<output>` or `role="status"` live region       | Toast that only renders visually                        |
| Interactive widget not covered above | Native element + tested keyboard + ARIA pattern | Custom `<div>` with ad-hoc `role` and handlers          |

### When ARIA is appropriate

Only when no native primitive fits the interaction, and only when you also ship the keyboard behavior that matches the role. Adding `role="button"` to a `<div>` without Enter/Space handlers is worse than either the correct `<button>` or the untyped `<div>` alone.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/a11y.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/a11y.json). The `Verification` checklist below is the authoring gate for a new interactive component; the eval file is how this skill is graded by `scripts/skill-audit.js --graded`. Do not conflate them — the checklist is for implementers, the eval is for the grader.

## Verification

- [ ] Interactive elements use the right semantic primitives
- [ ] Keyboard-only flows remain usable
- [ ] Focus is visible and lands in the correct place
- [ ] Labels and state changes are perceivable
- [ ] User preferences (reduced motion, high contrast) are respected

## Do NOT Use When

| Use instead     | When                                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| `documentation` | The task is prose structure or reading-level clarity, not interaction accessibility                      |
| `refactor`      | The task is behavior-preserving code cleanup — refactoring does not change what assistive tech perceives |
