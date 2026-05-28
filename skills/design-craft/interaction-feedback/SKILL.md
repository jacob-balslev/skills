---
name: interaction-feedback
description: "Use when designing UI feedback around user actions and system state: loading, skeletons, optimistic updates, progress, success, errors, empty states, retries, disabled/pending states, autosave, undo, and perceived latency. Do NOT use for the words inside feedback (use `microcopy`), accessibility announcement mechanics (use `a11y`), business lifecycle modeling (use `state-machine-modeling`), or performance optimization (use `performance-engineering`)."
license: MIT
compatibility:
  notes: "Portable feedback-state design for web and app UI. Applies before framework-specific implementation and after task or interaction pattern selection."
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
  routing_eval: absent
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"interaction-feedback\",\"feedback-state staging\",\"optimistic ui\",\"pending state\",\"retry feedback\",\"undo feedback\",\"perceived latency\",\"long-running action feedback\",\"skeleton loading\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"design loading, success, error, and retry feedback for this async action\",\"should this save be optimistic, pending, blocked, or undoable?\",\"the sync takes 30 seconds - what should users see at each stage?\",\"add feedback states so the UI does not feel frozen after clicking Export\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"rewrite the toast and validation text\",\"make sure the status update is announced to screen readers\",\"model the order lifecycle and legal transitions\",\"profile the endpoint that makes this action slow\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"microcopy\",\"reason\":\"microcopy owns the words inside feedback states; interaction-feedback owns timing, placement, persistence, and recovery behavior\"},{\"skill\":\"a11y\",\"reason\":\"a11y owns assistive-technology announcement mechanics; interaction-feedback owns the visible and behavioral feedback model\"},{\"skill\":\"state-machine-modeling\",\"reason\":\"state-machine-modeling owns business lifecycle legality; interaction-feedback owns the UI representation of pending, success, failure, and recovery\"},{\"skill\":\"performance-engineering\",\"reason\":\"performance-engineering reduces measured latency; interaction-feedback communicates latency and state honestly\"}],\"related\":[\"interaction-patterns\",\"microcopy\",\"task-analysis\",\"a11y\",\"performance-engineering\"],\"verify_with\":[\"a11y\",\"microcopy\"]}"
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
  skill_graph_canonical_skill: skills/interaction-feedback/SKILL.md
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

# Interaction Feedback

## Coverage

Design feedback states for user actions and system changes. Covers immediate click feedback, loading indicators, skeletons, optimistic UI, pending and disabled states, progress, success confirmation, persistent errors, retry, undo, autosave, long-running jobs, empty and low-data states, and perceived-latency staging.

## Philosophy

Feedback is the user's proof that the system heard them. Without it, users repeat actions, abandon flows, or assume data was lost. Good feedback is honest about uncertainty and gives recovery paths when the system cannot complete the action.

Feedback is not the same as performance. A fast system still needs confirmation, and a slow system still needs staged truth.

## Method

1. Name the action or state change that needs feedback.
2. Classify expected duration: instant, short, medium, long, background, or unknown.
3. Decide the feedback surface: inline state, button state, skeleton, banner, toast, progress row, modal, or job history.
4. Define transitions: idle, pending, partial, success, failure, retrying, cancelled, and undoable.
5. Preserve user control for long or destructive actions: cancel, retry, undo, leave-and-return.
6. Hand off wording to `microcopy` and announcement mechanics to `a11y`.
7. Verify the user can tell whether work is still happening, done, failed, or recoverable.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/interaction-feedback.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/interaction-feedback.json). The checklist below is the authoring gate for feedback-state design; the eval file is the grader surface.

## Verification

- [ ] Every async action has an immediate observable response
- [ ] Long-running work has progress, backgrounding, or return-later behavior
- [ ] Optimistic updates define rollback and conflict behavior
- [ ] Success states are visible without being noisy
- [ ] Errors are persistent enough to recover from
- [ ] Retry, cancel, undo, or support paths exist when relevant
- [ ] Screen-reader announcement and wording are verified by `a11y` and `microcopy`

## Do NOT Use When

| Use instead | When |
|---|---|
| `microcopy` | The task is writing button labels, toast text, empty-state text, or validation copy. |
| `a11y` | The task is live regions, screen-reader announcements, focus management, or WCAG compliance. |
| `state-machine-modeling` | The task is defining legal lifecycle states, guards, and transitions. |
| `performance-engineering` | The task is measuring and reducing latency, bundle size, query cost, or throughput. |
| `interaction-patterns` | The task is selecting the primary control or interaction pattern. |
