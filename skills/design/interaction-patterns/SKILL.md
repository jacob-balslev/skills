---
name: interaction-patterns
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when choosing or auditing UI interaction patterns and controls: tabs vs pages, dropdown vs combobox, stepper vs wizard, modal vs inline edit, disclosure, command menus, selection, filtering, and gesture alternatives. Do NOT use for accessibility compliance (use `a11y`), task decomposition (use `task-analysis`), feedback-state staging (use `interaction-feedback`), or reusable component API design (use `design-system-architecture`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:

  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: design
  # public: publishability/private-data gate. Boolean.
  # true = publishable/shareable; false = private and excluded from public export.
  # Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
  public: true
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Choosing and auditing UI interaction patterns and controls — tabs vs pages, dropdown vs combobox, stepper vs wizard, modal vs inline edit, disclosure, command menus, selection, filtering, and gesture alternatives. Portable across any UI; principle-grounded, not repo-bound. Excludes accessibility compliance (a11y), task decomposition (task-analysis), feedback-state staging (interaction-feedback), and reusable component API design (design-system-architecture)."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/interaction
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["interaction patterns","control pattern selection","dropdown combobox choice","modal inline edit choice","tabs accordion choice","bulk selection pattern","command menu pattern","disclosure pattern","gesture alternative","modal vs panel choice"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["interaction patterns","choose a control pattern","modal or inline edit","tabs or accordion","dropdown or combobox"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["should this control be a dropdown, combobox, radio group, or stepper?","choose the interaction pattern for bulk editing rows in this table","this modal interrupts the flow - should the edit be inline instead?","decide whether these settings belong in tabs, accordion sections, or separate pages"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["audit this combobox for ARIA roles and keyboard support","define the user's top task before choosing controls","add skeleton loading and optimistic feedback to this action","define the component props, variants, slots, and token contract"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"layout-composition\",\"form-ux-architecture\",\"microcopy\",\"semiotics\",\"a11y\",\"task-analysis\",\"design-system-architecture\",\"spec-driven-development\"],\"suppresses\":[{\"skill\":\"interaction-feedback\",\"reason\":\"interaction-feedback owns feedback states after an action; interaction-patterns owns the primary control and flow shape\"},{\"skill\":\"design-module-composition\",\"reason\":\"design-module-composition owns component props, variants, slots, and token contracts; interaction-patterns owns choosing the user-facing control pattern\"},{\"skill\":\"component-architecture\",\"reason\":\"component-architecture owns the component-library layering question (primitives, composites, product-specific) and headless/styled, controlled/uncontrolled splits; interaction-patterns owns choosing the user-facing control pattern before any component is designed\"}],\"verify_with\":[\"a11y\",\"task-analysis\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    An interaction pattern is the chosen shape of how a user makes a decision or takes an action on a surface — and the right pattern is derived from the SHAPE OF THE DECISION, not from a catalogue of components. Every control choice answers: what is the user actually deciding (compare, choose one, choose many, sequence, search, edit, confirm, recover) and what is the choice set like (small, large, searchable, hierarchical, ordered, destructive, reversible, repeated)? From those two answers the simplest pattern that keeps the needed context visible follows. The pattern then has to survive its edges: what happens on selection, cancel, escape, undo, and invalid action; whether pointer-only gestures have a keyboard alternative; and whether the pattern still holds under loading, empty, error, and permission-limited states. Choosing the pattern is upstream of designing any component — it decides WHICH control the user faces; the component API and the accessibility implementation come after.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Most confusing interfaces are not missing components — they chose the wrong pattern for the decision the user has to make. A dropdown hides options that needed comparison; a modal blocks the context the user needed to decide; a wizard adds ceremony to a task that only needed one form; an inline edit scatters a change that needed a deliberate confirm. The purpose of this discipline is to make the control choice a derivation from the user's decision shape rather than a reach for the most familiar widget, so the interface reduces effort instead of adding it. It exists because the cost of a wrong pattern is paid on every use by every user, and it is far cheaper to choose correctly before a component is built than to re-platform the interaction afterward.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT accessibility compliance — ARIA roles, keyboard semantics, focus management, labels, and WCAG conformance belong to a11y, which interaction-patterns hands the chosen pattern off to for correct implementation. It is NOT task decomposition — discovering the user's top task, goal, and flow breakpoints belongs to task-analysis, which runs BEFORE a pattern can be chosen. It is NOT feedback-state staging — what the UI shows during and after an action (loading, optimistic, success, error) belongs to interaction-feedback, which runs AFTER the pattern is chosen. And it is NOT reusable component API design — props, variants, slots, tokens, and the primitive/composite layering belong to design-system-architecture and component-architecture, which build the chosen control. It owns the selection of the user-facing pattern; it does not own the goal behind it, the component that implements it, the feedback after it, or the accessibility plumbing inside it.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Choosing an interaction pattern is like a surgeon choosing the approach before choosing the instrument — the decision is driven by the anatomy of the problem (how many options, ordered or not, reversible or not), and only once the approach is right does it make sense to pick the exact tool; a brilliant instrument used for the wrong approach still produces a worse outcome than the plain instrument used correctly."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "pick the component that looks nicest / that we already have." That treats interaction design as a styling and inventory problem, and it produces the recurring failures: a dropdown chosen for options that demand side-by-side comparison, a modal chosen for an edit whose source context the user must keep seeing, a multi-step wizard wrapped around a three-field form, bulk actions buried because single-item patterns were copied per row. The corrected model: start from the user's decision shape (compare / choose one / choose many / sequence / search / edit / confirm / recover) and choice-set characteristics, then select the simplest pattern that keeps the needed context visible — and only then hand off to component design and accessibility. The control is a consequence of the decision, not a starting point.
---
# Interaction Patterns

## Concept of the skill

An interaction pattern is the chosen shape of how a user makes a decision or takes an action on a surface — tabs versus pages, dropdown versus combobox, stepper versus wizard, modal versus inline edit, command menu, disclosure, bulk selection, filtering, and the rest. The discipline is to derive that choice from the shape of the user's decision rather than from a catalogue of available components. Two questions settle most cases: what is the user actually deciding (compare, choose one, choose many, sequence, search, edit, confirm, or recover), and what is the choice set like (small, large, searchable, hierarchical, ordered, destructive, reversible, repeated)? From those the simplest pattern that keeps the needed context visible follows. A chosen pattern is then pressure-tested against its edges — selection, cancel, escape, undo, invalid action, keyboard alternatives to pointer gestures, and behavior under loading, empty, error, and permission-limited states. Pattern choice is upstream of component design and accessibility implementation: it decides which control the user faces; the component API and the ARIA wiring come afterward.

## Coverage

Choose and audit interaction patterns before implementation. Covers control selection, mode switching, progressive disclosure, modals, drawers, tabs, accordions, command menus, comboboxes, steppers, wizards, inline edit, bulk selection, filters, sorting, gestures, keyboard alternatives, and pattern fit under task pressure.

The decision shapes that drive pattern choice are: **compare** (the user must weigh options side by side — favors visible options over hidden ones), **choose one** (single selection from a set — radio/segmented for small sets, dropdown/combobox for large), **choose many** (multi-selection — checkboxes, tag inputs, bulk-select with a contextual action bar), **sequence** (ordered steps — stepper for short known sequences, wizard only when ceremony is genuinely warranted), **search** (the set is large and the user knows what they want — combobox/command menu), **edit** (modify a value in place — inline edit when context must stay, modal/panel when the edit is involved), **confirm** (a deliberate gate before a consequential action), and **recover** (undo, cancel, escape, retry).

Choice-set characteristics modulate the pattern: a **small** closed set tolerates always-visible controls; a **large** set needs search; a **hierarchical** set needs nesting or a tree; an **ordered** set needs a sequence pattern; a **destructive** action needs a confirm or an undo window; a **reversible** action can skip the confirm in favor of undo; a **repeated** action favors keyboard-first and bulk patterns.

Hidden options (in dropdowns, accordions, overflow menus) are acceptable only when comparison is not required. Modals are justified only when the interaction genuinely needs to block the surface; otherwise a drawer, panel, or inline pattern keeps context. Every pointer-only gesture needs a keyboard or explicit-control alternative before handoff.

## Philosophy of the skill

Most confusing interfaces are not missing components; they chose the wrong pattern for the decision the user has to make. A dropdown hides options that need comparison. A modal blocks context the user needs. A wizard adds ceremony to a task that only needed one form.

Choose the pattern from the user's decision shape: compare, choose one, choose many, sequence, search, edit, confirm, or recover. The component and its styling are consequences of that choice, never the starting point.

The simplest pattern that keeps the needed context visible wins. Complexity in interaction is a cost paid on every use; the burden of proof is on the more elaborate pattern, not the simpler one.

## Method

1. Name the user decision or action the control must support.
2. Classify the choice set: small, large, searchable, hierarchical, ordered, destructive, reversible, or repeated.
3. Choose the simplest known pattern that keeps needed context visible.
4. Preserve alternatives for keyboard and non-pointer users before handoff to `a11y`.
5. Define what happens on selection, cancel, escape, undo, and invalid action.
6. Check whether the pattern works with loading, empty, error, and permission-limited states.
7. Hand off feedback-state staging to `interaction-feedback` and component API concerns to `design-system-architecture`.

## Verification

- [ ] The pattern matches the user's decision type.
- [ ] Hidden options are acceptable only when comparison is not required.
- [ ] Context needed to decide is visible or intentionally preserved.
- [ ] Cancel, escape, undo, and invalid-action behavior are defined.
- [ ] Pointer-only gestures have a keyboard or explicit control alternative.
- [ ] Loading, empty, error, and disabled states fit the pattern.
- [ ] Accessibility implementation is handed off to `a11y`.

## Do NOT Use When

| Use instead | When |
|---|---|
| `a11y` | The task is ARIA roles, keyboard behavior, focus management, labels, or WCAG compliance. |
| `task-analysis` | The user goal, top task, or flow breakpoint is still unknown. |
| `interaction-feedback` | The pattern is chosen and the task is feedback timing, progress, optimistic UI, or state visibility. |
| `design-system-architecture` | The task is reusable component APIs, variants, slots, tokens, or governance. |
| `component-architecture` | The task is the component-library layering (primitive/composite/assembly) and headless/styled or controlled/uncontrolled API splits. |
| `form-ux-architecture` | The surface is primarily a form with validation, field grouping, and submission lifecycle concerns. |
