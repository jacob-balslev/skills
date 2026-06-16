---
name: a11y
# description: routing-facing summary of what this skill covers and when it activates.
description: "Use when building or reviewing interactive UI, forms, navigation, or dynamic content. Covers semantic HTML, keyboard access, focus management, labeling, state-change announcement, and reduced-motion / high-contrast preferences. Do NOT use for color-palette creation, visual branding, feedback-state staging, or prose reading-level accessibility - those belong to `visual-design-foundations`, `interaction-feedback`, and documentation respectively."
# license: SPDX license identifier for the skill content.
license: MIT
# compatibility: runtime compatibility notes for this skill.
compatibility:
  notes: "Markdown, Git, any web stack"
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: quality-assurance
  # public: publishability / private-data gate. true = safe for the public skills.sh
  # release; false = contains private data and must not be published.
  public: true
  # scope: required free-text statement of what this skill teaches and what it does not.
  # Not an enum; publishability belongs to `public`.
  scope: "Teaches implementation-level accessibility checks for interactive web UI: semantic HTML, keyboard operation, focus management, programmatic names, state-change announcements, and reduced-motion / high-contrast preferences. Excludes visual branding, color-palette creation, prose reading-level edits, and behavior-preserving cleanup that does not change assistive-technology behavior."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: quality/accessibility
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
  keywords: ["screen reader","announce","validation state","form labels","assistive tech","ARIA roles","keyboard support","arrow key","navigation","focus return"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["a11y-skill"]
  # paths: glob array of code surfaces this skill governs. Supports gitignore-style
  # negation. Each glob should map to ONE canonical skill. Omit if purely conceptual.
  paths: "[\"**/*.{html,tsx,jsx,vue,svelte}\",\"**/*.css\",\"!**/*.test.{ts,tsx,js,jsx}\",\"!**/dist/**\",\"!**/node_modules/**\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["this modal is keyboard-trapped — users can't Escape to close it","screen reader doesn't announce when the form validation state changes","add proper labels to these form fields so assistive tech can read them","review this dropdown menu for arrow-key navigation and focus return"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["rewrite this error message at a 6th-grade reading level","clean up this accessibility code without changing how it behaves"]
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
  # mental_model: primitives and relationships the concept depends on.
  mental_model: "Accessible interaction is the relationship between semantic primitives, keyboard behavior, focus movement, programmatic names, state announcement, and user preferences. Native elements carry much of that relationship by default; custom widgets must explicitly recreate the expected role, name, state, focus, and keyboard contract. Visual appearance is only one output of the component, while assistive technology reads the semantic and state model that the markup and ARIA expose."
  # purpose: the problem this concept solves and why the skill exists.
  purpose: "Prevents interactive UI from shipping as visually usable but unavailable to keyboard and assistive-technology users. The skill moves accessibility decisions into implementation review: choose the right primitive first, preserve keyboard operation, make focus predictable, expose labels and state changes programmatically, and verify user-preference handling before the component is considered done."
  # concept_boundary: mechanisms this concept does not own.
  concept_boundary: "Not visual-design-foundations: color and visual hierarchy only enter this skill when contrast or user preferences affect perceivability. Not interaction-feedback: feedback timing and emotional tone are adjacent, but this skill owns whether dynamic state is programmatically announced. Not microcopy or linguistics: reading level and wording quality are separate unless the text is part of an accessible name, description, or error relationship. Not refactor: behavior-preserving cleanup is outside scope unless it changes semantic, focus, keyboard, or announcement behavior."
  # analogy: one-sentence mental anchor preserving the mechanism.
  analogy: "Accessible UI is like a building with visible signs and usable ramps: the path has to work through the structure, not just look finished from the street."
  # misconception: common wrong reading and correction.
  misconception: "The common mistake is treating accessibility as ARIA tags or a post-build audit. ARIA can help only when it matches real keyboard and state behavior, and an audit cannot recover the lost leverage of choosing the correct native primitive and focus model early."
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/quality-assurance/a11y/SKILL.md
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
  related: ["interaction-patterns","form-ux-architecture","interaction-feedback","design-system-architecture","refactor","diagnosis","linguistics","visual-design-foundations"]
  suppresses: ["best-practice"]
  verify_with: ["testing-strategy","interaction-feedback","visual-design-foundations"]
---
# Accessibility

## Concept of the skill

Accessibility for interactive UI means the component exposes the same operable structure to keyboard users and assistive technology that sighted pointer users see visually. The skill checks whether the implementation chose semantic primitives, preserved keyboard operation, controlled focus, provided programmatic names and descriptions, announced dynamic state, and respected user preferences.

## Coverage

- Semantic HTML: choosing the right primitive elements so structure is meaningful to assistive technology
- Keyboard access: making every interaction reachable and operable without a pointing device
- Focus management: keeping focus visible, predictable, and correctly placed after navigation and state changes
- Labeling and naming: ensuring every interactive element has a programmatic name that matches its visible label
- State and change announcement: communicating dynamic updates (loading, errors, success) to assistive technology
- Reduced-motion and high-contrast preferences: respecting user settings that affect interaction perception

## Philosophy of the skill

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
