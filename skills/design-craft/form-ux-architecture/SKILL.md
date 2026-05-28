---
name: form-ux-architecture
description: "Use when designing or auditing form structure and validation UX: field grouping, required vs optional inputs, validation timing, client/server validation split, submission lifecycle, recovery, multi-step forms, and high-risk data entry. Do NOT use for labels and announcements alone (use `a11y`), validation-message wording (use `microcopy`), API schema design (use `api-design`), or stored data modeling (use `data-modeling`)."
license: MIT
compatibility:
  notes: "Portable form UX guidance for web and app forms. Client-side validation improves UX; server-side validation remains mandatory for trust and security."
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
  taxonomy_domain: design/ux
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
  keywords: "[\"form-ux\",\"form architecture\",\"validation timing\",\"client server validation\",\"field grouping\",\"submission lifecycle\",\"form recovery\",\"multi-step forms\",\"required optional inputs\",\"error recovery flow\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"design the validation lifecycle for this signup form\",\"audit this checkout form for grouping, required fields, and recovery\",\"should this be one form, a wizard, or progressive disclosure?\",\"split client-side and server-side validation responsibilities for this form\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"add labels so assistive tech can read each field\",\"rewrite the inline validation messages\",\"define the request and response schema for the form submit endpoint\",\"model the database columns that store these inputs\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"a11y\",\"reason\":\"a11y owns labels, focus, fieldsets, errors, and assistive-tech behavior; form-ux-architecture owns form structure and validation lifecycle\"},{\"skill\":\"microcopy\",\"reason\":\"microcopy owns validation-message wording; form-ux-architecture owns when validation appears and how users recover\"},{\"skill\":\"api-design\",\"reason\":\"api-design owns submit endpoint schemas and error envelopes; form-ux-architecture owns the user-facing input and correction flow\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling owns stored data shape; form-ux-architecture owns collection and correction before submission\"}],\"related\":[\"interaction-patterns\",\"interaction-feedback\",\"task-analysis\",\"a11y\",\"microcopy\"],\"verify_with\":[\"a11y\",\"microcopy\"]}"
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
  skill_graph_canonical_skill: skills/form-ux-architecture/SKILL.md
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

# Form UX Architecture

## Coverage

Design form structure and validation behavior. Covers field grouping, labels as structure handoff, required vs optional decisions, progressive disclosure, defaults, input formats, client-side validation, server-side validation, validation timing, submit lifecycle, error recovery, multi-step forms, review steps, autosave, and high-risk data entry.

## Philosophy

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

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/form-ux-architecture.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/form-ux-architecture.json). The checklist below is the authoring gate for form UX architecture; the eval file is the grader surface.

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
| `data-modeling` | The task is persistence schema, constraints, keys, or data lifecycle. |
| `interaction-feedback` | The task is feedback state staging after the form action starts. |
