---
name: interaction-feedback
description: "Use when designing UI feedback around user actions and system state: immediate acknowledgement, loading, skeletons, optimistic updates, progress, success, errors, retries, disabled/pending states, autosave, undo, and perceived latency. Covers feedback-state staging, duration-aware pattern selection, recovery paths, optimistic/reversible action decisions, and handoff boundaries for copy and accessibility. Do NOT use for the words inside feedback (use microcopy), accessibility announcement mechanics (use a11y), business lifecycle legality (use state-machine-modeling), or performance optimization (use performance-engineering)."
license: MIT
compatibility:
  notes: "Portable feedback-state design for web, mobile, and desktop UI. Applies before framework-specific implementation and after the primary interaction pattern is chosen. Substitute local component names and design-system variables; preserve the feedback-state contract."
allowed-tools: Read Grep
grounding:
  domain_object: "Interaction feedback state design for user actions, async work, completion, failure, and recovery"
  grounding_mode: "universal"
  truth_sources:
    - https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1_A4_compressed.pdf
    - https://material-web.dev/components/progress/
    - https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
  failure_modes:
    - click_has_no_immediate_acknowledgement
    - loading_pattern_wrong_scope_or_duration
    - optimistic_update_without_rollback_or_undo
    - success_or_failure_not_visible
    - generic_error_without_recovery_path
    - long_running_work_has_no_progress_or_backgrounding
    - feedback_state_not_available_to_assistive_technology
  evidence_priority: "equal"
drift_check:
  last_verified: "2026-05-19"
metadata:
  schema_version: 6
  version: "1.2.0"
  type: capability
  category: design
  domain: design/interaction
  scope: portable
  owner: skill-graph-maintainer
  freshness: "2026-05-19"
  drift_check: '{"last_verified":"2026-05-19"}'
  eval_artifacts: present
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: experimental
  keywords: '["interaction feedback","interaction-feedback","feedback state staging","immediate acknowledgement","loading state","skeleton loading","optimistic UI","pending state","disabled pending state","retry feedback","undo feedback","autosave feedback","success confirmation","error recovery","perceived latency","long-running action feedback","progress indicator","determinate progress","indeterminate progress","batch operation feedback","state choreography","button no feedback","click feedback","nothing happens after clicking","after clicking nothing happens","user clicks button nothing happens","silent click","ui feels frozen after click"]'
  triggers: '["interaction-feedback","feedback-skill","loading state","button no feedback","click feedback","silent click"]'
  examples: '["design loading, success, error, and retry feedback for this async action","should this save be optimistic, pending, blocked, or undoable?","the sync takes 30 seconds -- what should users see at each stage?","add feedback states so the UI does not feel frozen after clicking Export","a batch import partially failed -- how should success, failure count, and retry be shown?","this autosave is silent and users do not know whether changes are safe","should this page use a skeleton, spinner, progress bar, or inline pending state?","after the user clicks the button nothing happens for 4 seconds -- design the feedback flow"]'
  anti_examples: '["rewrite the toast and validation text","make sure the status update is announced to screen readers","model the order lifecycle and legal transitions","profile the endpoint that makes this action slow","choose the primary interaction pattern for this toolbar","pick the easing curve for this transition","implement the skeleton component CSS"]'
  relations: '{"boundary":[{"skill":"microcopy","reason":"microcopy owns the words inside feedback states; interaction-feedback owns timing, placement, persistence, reversibility, and recovery behavior."},{"skill":"a11y","reason":"a11y owns programmatic announcement, focus, roles, keyboard behavior, and WCAG mechanics; interaction-feedback owns the visible and behavioral state model that must then be made accessible."},{"skill":"state-machine-modeling","reason":"state-machine-modeling owns business lifecycle legality and invalid transitions; interaction-feedback owns how pending, success, failure, retry, undo, and background states are represented to users."},{"skill":"performance-engineering","reason":"performance-engineering measures and reduces latency; interaction-feedback communicates latency honestly while work is still slow."},{"skill":"interaction-patterns","reason":"interaction-patterns selects the primary control or interaction pattern; interaction-feedback defines what the UI communicates after that interaction begins."}],"related":["interaction-patterns","microcopy","task-analysis","a11y","performance-engineering","state-machine-modeling"],"verify_with":["a11y","microcopy","performance-engineering"]}'
  grounding: '{"domain_object":"Interaction feedback state design for user actions, async work, completion, failure, and recovery","grounding_mode":"universal","truth_sources":["https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1_A4_compressed.pdf","https://material-web.dev/components/progress/","https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html"],"failure_modes":["click_has_no_immediate_acknowledgement","loading_pattern_wrong_scope_or_duration","optimistic_update_without_rollback_or_undo","success_or_failure_not_visible","generic_error_without_recovery_path","long_running_work_has_no_progress_or_backgrounding","feedback_state_not_available_to_assistive_technology"],"evidence_priority":"equal"}'
  portability: '{"readiness":"scripted","targets":["skill-md"]}'
  lifecycle: '{"stale_after_days":365,"review_cadence":"quarterly"}'
  mental_model: |
    Interaction feedback is a state contract between the user and the system. Every meaningful action should answer four questions: did the system hear me, is work happening, what changed, and what can I do next? The answer may be a pressed button state, inline pending row, skeleton, determinate progress indicator, success confirmation, persistent error, retry affordance, undo window, or background job record.
  purpose: |
    This skill prevents dead air after interaction. It helps agents design the feedback states that make causality visible, reduce duplicate actions, preserve trust during waits, and give users a way back when work fails.
  boundary: |
    This skill owns feedback behavior and state staging. It does not write final text, implement ARIA/focus mechanics, define business lifecycle legality, optimize runtime latency, pick the primary interaction pattern, or style animation curves.
  analogy: "Interaction feedback is a receipt system for UI actions: each click, save, retry, undo, and background job needs a visible receipt that says what happened and what remains possible."
  misconception: "The common mistake is treating a disabled button or spinner as sufficient feedback. A user also needs scope, progress or uncertainty, completion, failure, and recovery information appropriate to the action."
  concept: '{"definition":"Interaction feedback designs the visible and behavioral states that tell users whether an action was received, is running, succeeded, failed, or can be recovered.","mental_model":"Treat each interaction as a small state machine exposed to the user: idle, acknowledged, pending, partial, success, failure, retrying, cancelled, undoable, or backgrounded.","purpose":"It prevents silent waits, duplicate actions, hidden failures, and dead-end errors by staging feedback at the right scope and duration.","boundary":"It does not own wording, accessibility mechanics, domain lifecycle legality, performance optimization, primary interaction selection, or styling implementation.","taxonomy":"Feedback surfaces: control state, inline row, skeleton, spinner, linear progress, banner, toast/snackbar, dialog, job history, empty state. Feedback decisions: duration, scope, reversibility, risk, certainty, recoverability, assistive-technology handoff.","analogy":"It is a receipt system for UI actions: every meaningful action needs evidence of receipt, progress, result, and recovery.","misconception":"A spinner alone is not a feedback strategy; it is only one possible signal for short, uncertain waits."}'
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/design/interaction-feedback/SKILL.md
---

# Interaction Feedback

## Coverage

Design feedback states for user actions and system changes. Covers immediate click acknowledgement, loading indicators, skeletons, optimistic UI, pending and disabled states, progress, success confirmation, persistent errors, retry, undo, cancel, autosave, background work, empty and low-data states, and perceived-latency staging.

The skill applies to the behavior and timing of feedback, not the final words, ARIA mechanics, or implementation styling. A complete feedback design names the action, chooses the feedback surface, defines the state transitions, handles failure and recovery, and names the handoffs to `microcopy` and `a11y`.

## Philosophy

Feedback is the user's proof that the system heard them. Without it, users repeat actions, abandon flows, refresh during long work, or assume data was lost. Good feedback is honest about uncertainty and gives recovery paths when the system cannot complete the action.

Feedback is not the same as performance. A fast system still needs confirmation when the result is not obvious, and a slow system still needs staged truth. Hiding latency with vague spinners is less useful than showing scope, progress, uncertainty, and safe next actions.

The core rule is: make causality visible. The user should be able to tell that input was received, where work is happening, whether it finished, whether it failed, and what recovery remains available.

## Grounding

This skill combines three public interaction principles:

- Nielsen Norman Group's visibility-of-system-status heuristic frames timely system feedback as a core usability requirement.
- Material progress guidance distinguishes determinate and indeterminate progress, plus circular and linear indicators, which supports choosing progress shape by certainty and scope.
- WCAG status-message guidance requires status, progress, success, and error messages that appear without a focus change to be programmatically determinable for assistive technologies.

Use these as constraints, not as a single component recipe. The feedback pattern still depends on action scope, duration, risk, reversibility, and whether progress can be measured truthfully.

## Method

1. Name the action or state change that needs feedback.
2. Classify the scope: control, row, panel, page, background job, or cross-session workflow.
3. Classify the expected duration: instant, short, sustained, long, background, or unknown.
4. Classify risk and reversibility: harmless, reversible, expensive, destructive, or cross-account/cross-user.
5. Choose the feedback surface: control state, inline pending state, skeleton, spinner, progress bar, banner, toast/snackbar, modal, job history, or empty state.
6. Define transitions: idle, acknowledged, pending, partial, success, failure, retrying, cancelled, undoable, and backgrounded where relevant.
7. Preserve user control for long, risky, or destructive actions: cancel, retry, undo, leave-and-return, or support path.
8. Hand off wording to `microcopy` and programmatic announcement/focus mechanics to `a11y`.
9. Verify the user can tell whether work is still happening, done, failed, or recoverable.

## Duration And Pattern Selection

| Duration / certainty | User risk | Preferred feedback |
|---|---|---|
| Instant or near-instant | Low | Pressed/active state, then visible result; avoid flashing loading UI. |
| Short, uncertain wait | Low to medium | Inline pending state or small spinner at the action scope. |
| Initial content load with known structure | Low to medium | Skeleton matching final layout, not a blank page. |
| Sustained wait with unknown progress | Medium | Labeled indeterminate progress near the affected surface. |
| Sustained wait with known progress | Medium to high | Determinate progress with count, step, or percentage. |
| Long-running or background work | Medium to high | Progress plus cancel/background/return-later behavior and completion notification. |
| Destructive or expensive action | High | Confirmation before action, then explicit result; optimistic UI only if safely reversible. |
| Partial success or batch operation | Medium to high | Split success and failure counts, plus retry/continue path for failed items. |

## Feedback Surfaces

| Surface | Use when | Guardrail |
|---|---|---|
| Control state | The action is local to one button, toggle, or menu item. | Do not rely on disablement alone; show acknowledged/busy/result state. |
| Inline row/panel state | The action affects a local row, card, form, or section. | Keep surrounding layout stable and preserve context. |
| Skeleton | Final content structure is known but data is not ready. | Skeleton geometry should resemble final layout and should not flash for instant work. |
| Spinner | Short wait with uncertain progress. | Add a label when scope is ambiguous; avoid spinner-only for long waits. |
| Linear/determinate progress | Progress can be measured truthfully. | Use real counts, steps, or percentage; avoid fake rapid-then-stall progress. |
| Banner | A page or workflow state needs persistent attention. | Include recovery or next action, not just a notice. |
| Toast/snackbar | A brief non-blocking result is enough. | Use only when missing it is not harmful; reversible actions need undo when feasible. |
| Dialog | The user must decide before work proceeds or failure blocks the flow. | Dialogs change context; use them for important decisions, not routine status. |
| Job history / activity log | Work continues after the user leaves. | Include status, timestamps, result, retry/cancel where relevant. |

## Optimistic UI And Reversibility

Use optimistic UI only when all of these are true:

- Failure is rare or cheaply recoverable.
- The action is reversible or can be reconciled without data loss.
- The UI can roll back or mark conflict clearly if the server rejects the change.
- The user has enough context to understand what changed.

Do not use optimistic UI for irreversible deletion, money movement, permission changes, cross-user effects, legal/account state changes, or anything where rollback would be surprising. For destructive actions, use confirmation before action or a timed undo model only if the system can defer final destruction until the undo window closes.

## Failure And Recovery

Recoverable failures should include:

- What failed, at the affected scope.
- Whether work stopped, partially completed, or will retry automatically.
- What the user can do next: retry, cancel, undo, continue, edit input, contact support, or inspect details.
- Persistent enough visibility for the user to recover.

Batch operation feedback must include counts when available. A message like "Import complete" is not sufficient when some records failed. Split the result: how many succeeded, how many failed, and what can be retried or downloaded for correction.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/interaction-feedback.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/interaction-feedback.json). The checklist below is the authoring gate for feedback-state design; the eval file is the grader surface. Eval state remains unverified until the eval suite is run and recorded.

## Verification

- [ ] Every async action has an immediate observable response.
- [ ] Feedback is scoped to the affected control, row, panel, page, or background job.
- [ ] Loading pattern matches duration and certainty: skeleton, inline spinner, indeterminate progress, determinate progress, or background job.
- [ ] Long-running work has progress, backgrounding, cancel, retry, or return-later behavior.
- [ ] Optimistic updates define rollback, conflict, and undo behavior before use.
- [ ] Destructive or expensive actions have confirmation or a real undo window.
- [ ] Success states are visible when the result is not otherwise obvious.
- [ ] Errors are persistent enough to recover from and include a next action.
- [ ] Batch outcomes report success/failure counts when counts are available.
- [ ] Screen-reader announcement and focus mechanics are verified by `a11y`; wording is verified by `microcopy`.

## Do NOT Use When

| Use instead | When |
|---|---|
| `microcopy` | The task is writing button labels, toast text, empty-state text, validation copy, or error-message wording. |
| `a11y` | The task is live regions, screen-reader announcements, focus management, keyboard behavior, roles, or WCAG compliance. |
| `state-machine-modeling` | The task is defining legal lifecycle states, guards, invariants, and invalid transitions. |
| `performance-engineering` | The task is measuring and reducing latency, bundle size, query cost, or throughput. |
| `interaction-patterns` | The task is selecting the primary control or interaction pattern before feedback states exist. |
| `motion-design` | The task is animation easing, transition timing, spring behavior, or motion choreography. |
