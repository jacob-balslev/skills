---
name: interaction-patterns
description: "Use when choosing or auditing UI interaction patterns and controls: tabs vs pages, dropdown vs combobox, stepper vs wizard, modal vs inline edit, disclosure, command menus, selection, filtering, and gesture alternatives. Do NOT use for accessibility compliance (use `a11y`), task decomposition (use `task-analysis`), feedback-state staging (use `interaction-feedback`), or reusable component API design (use `design-system-architecture`)."
license: MIT
compatibility:
  notes: "Portable interaction-pattern guidance for web and app UI. Pattern choices should be checked against platform conventions and accessible-widget guidance before implementation."
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
  subject: design-craft
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Choosing and auditing UI interaction patterns and controls — tabs vs pages, dropdown vs combobox, stepper vs wizard, modal vs inline edit, disclosure, command menus, selection, filtering, and gesture alternatives. Portable across any UI; principle-grounded, not repo-bound. Excludes accessibility compliance (a11y), task decomposition (task-analysis), feedback-state staging (interaction-feedback), and reusable component API design (design-system-architecture)."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/interaction
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
  routing_eval: present
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"interaction-patterns\",\"control pattern selection\",\"dropdown combobox choice\",\"modal inline edit choice\",\"tabs accordion choice\",\"bulk selection pattern\",\"command menu pattern\",\"disclosure pattern\",\"gesture alternative\",\"modal vs panel choice\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"should this control be a dropdown, combobox, radio group, or stepper?\",\"choose the interaction pattern for bulk editing rows in this table\",\"this modal interrupts the flow - should the edit be inline instead?\",\"decide whether these settings belong in tabs, accordion sections, or separate pages\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"audit this combobox for ARIA roles and keyboard support\",\"define the user's top task before choosing controls\",\"add skeleton loading and optimistic feedback to this action\",\"define the component props, variants, slots, and token contract\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"a11y\",\"reason\":\"a11y verifies accessibility semantics and keyboard behavior; interaction-patterns chooses the user-facing pattern before implementation\"},{\"skill\":\"task-analysis\",\"reason\":\"task-analysis identifies what the user is trying to accomplish; interaction-patterns chooses the control pattern that supports it\"},{\"skill\":\"interaction-feedback\",\"reason\":\"interaction-feedback owns feedback states after an action; interaction-patterns owns the primary control and flow shape\"},{\"skill\":\"design-system-architecture\",\"reason\":\"design-system-architecture owns reusable component APIs; interaction-patterns decides which pattern is appropriate for a surface\"},{\"skill\":\"design-module-composition\",\"reason\":\"design-module-composition owns component props, variants, slots, and token contracts; interaction-patterns owns choosing the user-facing control pattern\"},{\"skill\":\"component-architecture\",\"reason\":\"component-architecture owns the component-library layering question (primitives, composites, product-specific) and headless/styled, controlled/uncontrolled splits; interaction-patterns owns choosing the user-facing control pattern before any component is designed\"},{\"skill\":\"spec-driven-development\",\"reason\":\"spec-driven-development owns writing the user goal, top task, or spec BEFORE any design happens; interaction-patterns owns choosing the user-facing control pattern AFTER the task is already defined — not defining the task itself\"}],\"related\":[\"layout-composition\",\"form-ux-architecture\",\"microcopy\",\"semiotics\",\"a11y\"],\"verify_with\":[\"a11y\",\"task-analysis\"]}"
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
  skill_graph_canonical_skill: skills/interaction-patterns/SKILL.md
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

# Interaction Patterns

## Coverage

Choose and audit interaction patterns before implementation. Covers control selection, mode switching, progressive disclosure, modals, drawers, tabs, accordions, command menus, comboboxes, steppers, wizards, inline edit, bulk selection, filters, sorting, gestures, keyboard alternatives, and pattern fit under task pressure.

## Philosophy

Most confusing interfaces are not missing components; they chose the wrong pattern for the decision the user has to make. A dropdown hides options that need comparison. A modal blocks context the user needs. A wizard adds ceremony to a task that only needed one form.

Choose the pattern from the user's decision shape: compare, choose one, choose many, sequence, search, edit, confirm, or recover.

## Method

1. Name the user decision or action the control must support.
2. Classify the choice set: small, large, searchable, hierarchical, ordered, destructive, reversible, or repeated.
3. Choose the simplest known pattern that keeps needed context visible.
4. Preserve alternatives for keyboard and non-pointer users before handoff to `a11y`.
5. Define what happens on selection, cancel, escape, undo, and invalid action.
6. Check whether the pattern works with loading, empty, error, and permission-limited states.
7. Hand off component API concerns to `design-system-architecture`.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/interaction-patterns.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/interaction-patterns.json). The checklist below is the authoring gate for pattern choice; the eval file is the grader surface.

## Verification

- [ ] The pattern matches the user's decision type
- [ ] Hidden options are acceptable only when comparison is not required
- [ ] Context needed to decide is visible or intentionally preserved
- [ ] Cancel, escape, undo, and invalid-action behavior are defined
- [ ] Pointer-only gestures have a keyboard or explicit control alternative
- [ ] Loading, empty, error, and disabled states fit the pattern
- [ ] Accessibility implementation is handed off to `a11y`

## Do NOT Use When

| Use instead | When |
|---|---|
| `a11y` | The task is ARIA roles, keyboard behavior, focus management, labels, or WCAG compliance. |
| `task-analysis` | The user goal, top task, or flow breakpoint is still unknown. |
| `interaction-feedback` | The pattern is chosen and the task is feedback timing, progress, optimistic UI, or state visibility. |
| `design-system-architecture` | The task is reusable component APIs, variants, slots, tokens, or governance. |
| `form-ux-architecture` | The surface is primarily a form with validation, field grouping, and submission lifecycle concerns. |
