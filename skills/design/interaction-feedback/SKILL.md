---
name: interaction-feedback
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing UI feedback around user actions and system state: loading, skeletons, optimistic updates, progress, success, errors, empty states, retries, disabled/pending states, autosave, undo, and perceived latency. Do NOT use for the words inside feedback (use `microcopy`), accessibility announcement mechanics (use `a11y`), business lifecycle modeling (use `state-machine-modeling`), or performance optimization (use `performance-engineering`)."
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
  scope: "Designing UI feedback around user actions and system state — loading, skeletons, optimistic updates, progress, success, errors, empty states, retries, disabled/pending states, autosave, undo, and perceived latency. Portable across any interactive UI; principle-grounded, not repo-bound. Excludes the words inside feedback (microcopy), accessibility announcement mechanics (a11y), business lifecycle modeling (state-machine-modeling), and performance optimization (performance-engineering)."
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
  keywords: ["interaction feedback","feedback state staging","optimistic ui","pending state","retry feedback","undo feedback","perceived latency","long-running action feedback","skeleton loading","empty state"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["interaction feedback","loading and error states","optimistic update","perceived latency","design feedback states"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["design loading, success, error, and retry feedback for this async action","should this save be optimistic, pending, blocked, or undoable?","the sync takes 30 seconds - what should users see at each stage?","add feedback states so the UI does not feel frozen after clicking Export"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["rewrite the toast and validation text","make sure the status update is announced to screen readers","model the order lifecycle and legal transitions","profile the endpoint that makes this action slow"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"interaction-patterns\",\"microcopy\",\"task-analysis\",\"a11y\",\"performance-engineering\",\"state-machine-modeling\"],\"suppresses\":[{\"skill\":\"microcopy\",\"reason\":\"microcopy owns the words inside feedback states; interaction-feedback owns timing, placement, persistence, and recovery behavior\"}],\"verify_with\":[\"a11y\",\"microcopy\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Feedback is the staged communication of system state back to the user across the lifetime of an action. Every action that is not instantaneous moves through a sequence of states — idle, pending, partial, success, failure, retrying, cancelled, undoable — and each state needs an observable signal placed where the user is looking. Four decisions settle any feedback design: (1) the expected DURATION class of the action (instant, short, medium, long, background, unknown); (2) the SURFACE that carries the signal (inline state, button state, skeleton, banner, toast, progress row, modal, job history); (3) the TRANSITIONS the user can observe and the control they retain at each (cancel, retry, undo, leave-and-return); and (4) the TRUTHFULNESS of the optimism — whether the UI shows a result before the system has confirmed it, and what happens when that optimism is wrong. Feedback is a separate concern from performance: a fast system still owes confirmation, and a slow system still owes staged, honest truth about what is happening.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without feedback, the user has no proof the system heard them. The observable failure modes are concrete: users double-submit because the button gave no acknowledgement, abandon flows because a long action looked frozen, or assume data was lost because nothing confirmed the save. Feedback design exists to close that uncertainty gap deliberately rather than by accident — to make every async action acknowledge immediately, every long action show progress or a way to leave and return, every optimistic update define its rollback, and every error persist long enough and carry enough recovery affordance that the user can actually act on it. It is the discipline that turns "the UI feels broken" into "the user always knows whether work is happening, done, failed, or recoverable."
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT the words inside the feedback (the toast text, the empty-state message, the validation copy) — that is microcopy, and feedback design hands wording off to it. It is NOT the accessibility announcement mechanics (live regions, focus management, screen-reader timing) — that is a11y, which feedback design hands the announcement requirement to. It is NOT the modeling of which lifecycle states are legal and what guards transitions between them — that is state-machine-modeling; feedback design consumes the legal states but does not define them. And it is NOT making the action faster (latency, bundle size, query cost) — that is performance-engineering; feedback design manages the PERCEPTION of time, not the time itself. It owns timing, placement, persistence, optimism, and recovery affordance; it does not own the words, the announcement plumbing, the lifecycle truth, or the underlying speed.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Interaction feedback is to a user's action what a courier's tracking updates are to a shipment — the package is not faster because you can watch 'picked up → in transit → out for delivery,' but the staged, honest signals turn an anxious silence into a confident wait, and a failed delivery that tells you why and offers a re-attempt is recoverable where one that simply vanishes is not."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "feedback is just adding a spinner." That treats feedback as a single decoration bolted onto the loading moment, and it produces the classic failures: a spinner with no timeout that hides a silent failure, an optimistic update with no rollback that lies when the server rejects it, a success toast so loud it interrupts and so brief the user misses it, an error that flashes and disappears before anyone can read it. The corrected model: feedback is a staged contract across the whole action lifecycle — acknowledge instantly, communicate honestly during, confirm without noise on success, persist and offer recovery on failure. The spinner is one frame of a film, not the film.
---
# Interaction Feedback

## Concept of the skill

Interaction feedback is the discipline of designing the observable signals a UI gives back to a user across the entire lifetime of an action or system state change. Every action that is not instantaneous travels through a sequence of states — idle, pending, partial, success, failure, retrying, cancelled, undoable — and feedback design decides, for each state, what the user sees, where they see it, how long it persists, and what control they keep. It is settled by four decisions: the expected duration class of the action (instant, short, medium, long, background, or unknown), the surface that carries the signal (inline state, button state, skeleton, banner, toast, progress row, modal, or job history), the transitions the user can observe along with the recovery affordances they retain (cancel, retry, undo, leave-and-return), and how honest the UI is about uncertainty — whether it shows a result optimistically before the system confirms it, and what happens when that optimism turns out to be wrong. Feedback is the user's proof that the system heard them, and it is a distinct concern from performance: a fast system still owes confirmation, and a slow system still owes staged, truthful communication about what is happening.

## Coverage

Design feedback states for user actions and system changes. Covers immediate click feedback, loading indicators, skeletons, optimistic UI, pending and disabled states, progress, success confirmation, persistent errors, retry, undo, autosave, long-running jobs, empty and low-data states, and perceived-latency staging.

The full lifecycle of a non-instant action is the unit of work. The states to account for are: **idle** (nothing started), **pending** (acknowledged, in flight), **partial** (some of a multi-item action completed), **success** (confirmed done), **failure** (errored, recoverable or not), **retrying** (a recovery attempt in flight), **cancelled** (user-aborted), and **undoable** (completed but reversible for a window). Each state maps to a surface and a control set.

Duration classes drive the surface choice. **Instant** (<100ms) needs only the result. **Short** (100ms-1s) needs an immediate acknowledgement (button/inline state). **Medium** (1-5s) needs a determinate or indeterminate indicator with a skeleton for content regions. **Long** (>5s) needs progress, the ability to background the work, or a leave-and-return path with a job history. **Background** work needs an unobtrusive status surface plus a notification on completion. **Unknown** duration must be treated as long until proven otherwise.

Optimistic UI shows the expected result before the server confirms it, which removes perceived latency — but it is a debt: it must define rollback behavior (revert the UI on rejection) and conflict behavior (what wins when the optimistic state and the server state disagree). An optimistic update with no defined rollback is a UI that lies.

## Philosophy of the skill

Feedback is the user's proof that the system heard them. Without it, users repeat actions, abandon flows, or assume data was lost. Good feedback is honest about uncertainty and gives recovery paths when the system cannot complete the action.

Feedback is not the same as performance. A fast system still needs confirmation, and a slow system still needs staged truth. Managing the perception of time is a separate craft from reducing the time, and conflating the two leads teams to either skip feedback ("it's fast enough") or to treat a spinner as a substitute for an honest progress story on genuinely slow work.

Honesty under uncertainty is the core value. The hardest feedback states are not success — they are the long, the failed, and the optimistic-then-rejected. A design that handles only the happy path is not a feedback design; it is a decoration on the happy path.

## Method

1. Name the action or state change that needs feedback.
2. Classify expected duration: instant, short, medium, long, background, or unknown.
3. Decide the feedback surface: inline state, button state, skeleton, banner, toast, progress row, modal, or job history.
4. Define transitions: idle, pending, partial, success, failure, retrying, cancelled, and undoable.
5. Preserve user control for long or destructive actions: cancel, retry, undo, leave-and-return.
6. For optimistic updates, define rollback and conflict behavior explicitly before shipping.
7. Hand off wording to `microcopy` and announcement mechanics to `a11y`.
8. Verify the user can tell whether work is still happening, done, failed, or recoverable.

## Verification

- [ ] Every async action has an immediate observable response.
- [ ] Each non-instant action is mapped to a duration class and an appropriate feedback surface.
- [ ] Long-running work has progress, backgrounding, or return-later behavior.
- [ ] Optimistic updates define rollback and conflict behavior.
- [ ] Success states are visible without being noisy or interrupting.
- [ ] Errors are persistent enough to read and recover from, not flashed and gone.
- [ ] Retry, cancel, undo, or support paths exist when relevant.
- [ ] Screen-reader announcement and wording are verified by `a11y` and `microcopy`.

## Do NOT Use When

| Use instead | When |
|---|---|
| `microcopy` | The task is writing button labels, toast text, empty-state text, or validation copy. |
| `a11y` | The task is live regions, screen-reader announcements, focus management, or WCAG compliance. |
| `state-machine-modeling` | The task is defining legal lifecycle states, guards, and transitions. |
| `performance-engineering` | The task is measuring and reducing latency, bundle size, query cost, or throughput. |
| `interaction-patterns` | The task is selecting the primary control or interaction pattern. |
