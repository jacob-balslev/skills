---
name: form-ux-architecture
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing or auditing form structure and validation UX: field grouping, required vs optional inputs, validation timing, client/server validation split, submission lifecycle, recovery, multi-step forms, and high-risk data entry. Do NOT use for labels and announcements alone (use `a11y`), validation-message wording (use `microcopy`), API schema design (use `api-design`), or stored data modeling (use `entity-relationship-modeling`)."
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
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/ux
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Designing and auditing form structure and validation UX — field grouping, required vs optional inputs, validation timing, the client/server validation split, the submission lifecycle, recovery, multi-step forms, and high-risk data entry. Portable across any form-bearing UI; principle-grounded, not repo-bound. Excludes labels and announcements alone (a11y), validation-message wording (microcopy), API schema design (api-design), and stored data modeling (entity-relationship-modeling)."
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["form-ux","form architecture","validation timing","client server validation","field grouping","submission lifecycle","form recovery","multi-step forms","required optional inputs","error recovery flow"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["form ux","validation timing","client server validation","multi-step form","form recovery"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["design the validation lifecycle for this signup form","audit this checkout form for grouping, required fields, and recovery","should this be one form, a wizard, or progressive disclosure?","split client-side and server-side validation responsibilities for this form"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["add labels so assistive tech can read each field","rewrite the inline validation messages","define the request and response schema for the form submit endpoint","model the database columns that store these inputs"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"interaction-patterns\",\"interaction-feedback\",\"task-analysis\",\"a11y\",\"microcopy\",\"api-design\",\"entity-relationship-modeling\"],\"suppresses\":[{\"skill\":\"microcopy\",\"reason\":\"microcopy owns validation-message wording; form-ux-architecture owns when validation appears and how users recover\"}],\"verify_with\":[\"a11y\",\"microcopy\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    A form is a guided conversation, not a data dump. Its architecture is settled by a sequence of decisions: name the user goal and the minimum data that goal truly requires; remove fields that are not needed now or cannot be acted on; group the survivors by the user's mental model rather than by a storage table; classify each field as required, optional, defaulted, derived, or deferred; choose when validation fires (on submit, on blur, on change, or after an async check); split the client-side aid from the mandatory server-side check and map server errors back to specific fields; and define the full submission lifecycle (submit, pending, success, failure, retry, partial-save). Client-side validation is a UX aid that speeds correction; it is never a trust boundary, so the server validates every submitted field even when the client looked correct.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Forms are where users do the most error-prone, highest-friction work in a product, and an unarchitected form punishes them: it asks for data the system does not need, fires hostile errors on every keystroke, loses entered data on failure, and treats client validation as if it were security. The discipline exists to make a form a conversation that asks only for what is needed, at the moment the user can answer, with correction paths that preserve trust and data. It separates the concerns most often conflated — what to ask, how to group it, when to validate, who validates (client vs server), and how submission and recovery behave — so each can be decided deliberately instead of inherited from whatever the last form did.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT accessibility labeling and announcement (a11y owns labels, fieldsets, focus order, keyboard flow, and screen-reader output). It is NOT message wording (microcopy owns the text of validation messages, placeholders, and button labels — this skill owns WHEN a message appears and how the user recovers, not what it says). It is NOT API contract design (api-design owns endpoint shape, request/response schema, status codes, and the error envelope). It is NOT persistence modeling (entity-relationship-modeling owns columns, constraints, keys, and data lifecycle). It owns the form's structure, the validation timing and client/server split, and the submission/recovery lifecycle; it hands off wording, announcement, endpoint shape, and storage to those neighbors.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Designing a form is like designing an intake interview rather than handing someone a blank questionnaire — a good interviewer asks only what is relevant, in an order the person can follow, waits until an answer is complete before correcting it, and never loses the answers already given when one question goes wrong."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that a form is a faithful editor for a database row, so it should expose every column, mark most of them required, and validate aggressively on the client to 'catch errors early.' That conflates the storage shape with the user's task, produces hostile on-keystroke errors, and — most dangerously — treats client-side validation as a security boundary. The corrected model: the form mirrors the user's goal and mental model (not the table), validates at the moment the user can actually answer (usually on blur or submit, rarely on every keystroke), and always re-validates on the server because the client can be bypassed. Client checks improve correction speed; only the server can be trusted.
---
# Form UX Architecture

## Concept of the skill

Form UX architecture is the discipline of structuring a form and its validation behavior so that data entry becomes a guided conversation rather than a data dump. It owns a connected set of decisions: which fields to ask for (the minimum the user's goal truly requires), how to group them (by the user's mental model, not by a storage table), how to classify each one (required, optional, defaulted, derived, or deferred), when validation fires (on submit, on blur, on change, or after an async check), how to split the client-side correction aid from the mandatory server-side trust check, and how the whole submission lifecycle behaves (submit, pending, success, failure, retry, partial-save, and error recovery). Its central principle is that client-side validation is a user-experience aid and never a security boundary — the server must validate every submitted field even when the client appears correct — and its central craft is asking only for what is needed, at the moment the user can answer, with correction paths that preserve trust and the data already entered. It deliberately hands off neighbors it does not own: labels and announcements to a11y, message wording to microcopy, endpoint shape to api-design, and persistence to entity-relationship-modeling.

## Coverage

Design form structure and validation behavior. Covers field grouping, labels as structure handoff, required vs optional decisions, progressive disclosure, defaults, input formats, client-side validation, server-side validation, validation timing, submit lifecycle, error recovery, multi-step forms, review steps, autosave, and high-risk data entry.

## Philosophy of the skill

Forms are not data dumps. A form is a guided conversation that asks only for information the system truly needs, at the moment the user can answer it, with correction paths that preserve trust.

Client-side validation is a user-experience aid, not a security boundary. The server must validate every submitted field even when the client appears correct.

## Method

1. Name the user goal and the minimum data needed to complete it.
2. Remove fields that are not needed now or cannot be acted on.
3. Group fields by user mental model, not database table.
4. Decide required, optional, defaulted, derived, and deferred fields.
5. Choose validation timing: on submit, on blur, on change, or after async check.
6. Split client-side validation from server-side validation and map server errors back to fields.
7. Define submit, pending, success, failure, retry, and partial-save behavior.
8. Hand off labels and announcements to `a11y`, wording to `microcopy`, and endpoint shape to `api-design`.

## Verification

- [ ] Every field has a reason tied to the user's goal or system requirement
- [ ] Required fields are truly required at this step
- [ ] Field groups match how users think about the task
- [ ] Validation timing avoids hostile on-keystroke errors unless immediate feedback is necessary
- [ ] Client-side checks improve correction speed but do not replace server validation
- [ ] Server errors map back to fields or a clear form-level recovery path
- [ ] Submit, pending, success, failure, retry, and partial-save states are defined

## Do NOT Use When

| Use instead | When |
|---|---|
| `a11y` | The task is labels, fieldsets, focus, keyboard flow, or screen-reader announcement. |
| `microcopy` | The task is validation-message wording, placeholder text, button labels, or error copy. |
| `api-design` | The task is endpoint shape, request/response schema, status codes, or error envelope. |
| `entity-relationship-modeling` | The task is persistence schema, constraints, keys, or data lifecycle. |
| `interaction-feedback` | The task is feedback state staging after the form action starts. |
