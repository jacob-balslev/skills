---
name: state-machine-modeling
description: "Use when modeling lifecycle states, transitions, guards, events, side effects, invalid states, retries, and state invariants for workflows or domain objects. Do NOT use for broad event discovery (use `event-storming`), database schema design (use `data-modeling`), or observability instrumentation after the lifecycle already exists (use `observability-modeling`)."
license: MIT
compatibility:
  notes: "Portable state-machine discipline for product workflows, domain lifecycles, retries, background jobs, and UI flow control."
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
  operation: do
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: engineering

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: code-engineering
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: modeling/state-machines
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-11"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-11\"}"

  # === Eval-health: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: planned
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
  keywords: "[\"state machine\",\"state modeling\",\"lifecycle states\",\"transitions\",\"guards\",\"finite state machine\",\"invalid states\",\"status field\",\"workflow invariants\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"model the order fulfillment status lifecycle so invalid transitions are impossible\",\"this status field keeps growing flags - should it become a state machine?\",\"define guards and side effects for onboarding steps\",\"find impossible states in this workflow before we implement it\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"discover the domain events and policies for the whole business process\",\"create database tables and constraints for this lifecycle\",\"instrument metrics and traces for an existing workflow\",\"debug why this job got stuck yesterday\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"event-storming\",\"reason\":\"event-storming discovers domain behavior broadly; state-machine-modeling formalizes a specific lifecycle\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling persists state; state-machine-modeling defines legal state behavior\"},{\"skill\":\"observability-modeling\",\"reason\":\"observability-modeling instruments a lifecycle; state-machine-modeling defines the lifecycle itself\"},{\"skill\":\"debugging\",\"reason\":\"debugging investigates an observed stuck state; state-machine-modeling prevents invalid states by design\"}],\"related\":[\"event-storming\",\"system-interface-contracts\",\"testing-strategy\",\"api-design\"],\"verify_with\":[\"testing-strategy\",\"system-interface-contracts\"]}"
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
  skill_graph_canonical_skill: skills/state-machine-modeling/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: UNVERIFIED
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: UNVERIFIED
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
---

# State Machine Modeling

## Coverage

Define legal lifecycle behavior for a domain object, UI flow, job, integration, or process. Covers states, transitions, events, guards, side effects, terminal states, retries, timeouts, compensation, invalid states, and transition verification.

## Philosophy

State modeling prevents boolean sprawl. When a workflow has several flags that can combine into impossible conditions, the model is already a state machine - just an implicit and unsafe one.

Make illegal states unrepresentable where possible. Where that is not possible, make illegal transitions impossible and detectable.

## Method

1. Name the entity whose state is being modeled.
2. List observable states as nouns or adjectives, not events.
3. List events or commands that trigger transitions.
4. Add guards: conditions required before a transition is legal.
5. Add side effects separately from state changes.
6. Mark terminal, retryable, and compensating states.
7. Define invalid transitions and expected error behavior.
8. Create transition-table tests before implementation.

## Verification

- [ ] States are mutually exclusive unless explicitly modeled as parallel regions
- [ ] Every transition has a trigger
- [ ] Guards are explicit where transitions depend on conditions
- [ ] Side effects are not confused with state changes
- [ ] Terminal and retry states are named
- [ ] Invalid transitions have deterministic behavior
- [ ] Tests cover allowed and forbidden transitions

## Do NOT Use When

| Use instead | When |
|---|---|
| `event-storming` | You need to discover the broader domain flow, commands, policies, and aggregates. |
| `data-modeling` | You need persistence schema or query shape for state data. |
| `observability-modeling` | The lifecycle is settled and you need metrics, logs, traces, or alerts. |
| `debugging` | A stateful system has already failed and needs root-cause analysis. |

