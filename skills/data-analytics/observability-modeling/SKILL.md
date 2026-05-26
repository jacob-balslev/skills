---
name: observability-modeling
description: "Use when designing telemetry semantics before or during implementation: logs, metrics, traces, events, spans, attributes, correlation IDs, SLOs, alert signals, and diagnostic questions. Do NOT use for domain/business event contracts (use `event-contract-design`), configuring an error tracker alone (use `error-tracking`), performance optimization (use `performance-engineering`), or debugging a current incident (use `debugging`)."
license: MIT
compatibility:
  notes: "Portable observability modeling discipline for applications, integrations, jobs, queues, APIs, and agent workflows."
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
  subject: data-analytics
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: engineering/observability
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
  keywords: "[\"observability modeling\",\"telemetry design\",\"logs metrics traces\",\"SLO\",\"spans\",\"correlation id\",\"diagnostic events\",\"alert design\",\"instrumentation model\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"design telemetry for this ingestion pipeline so failures can be diagnosed later\",\"which logs, metrics, spans, and correlation IDs should this interface contract require?\",\"model observability for a background job before adding alerts\",\"turn these diagnostic questions into events and metrics\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"set up Sentry error tracking for this app\",\"profile and optimize a slow endpoint\",\"debug the current production incident\",\"write application tests for this feature\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"error-tracking\",\"reason\":\"error-tracking owns error-capture setup and handling; observability-modeling owns the broader telemetry schema\"},{\"skill\":\"event-contract-design\",\"reason\":\"event-contract-design owns published business event contracts; observability-modeling owns telemetry events, spans, metrics, and logs for diagnosability\"},{\"skill\":\"performance-engineering\",\"reason\":\"performance-engineering improves measured performance; observability-modeling defines the signals needed to measure and diagnose\"},{\"skill\":\"debugging\",\"reason\":\"debugging investigates a current failure; observability-modeling designs future diagnosability\"},{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy proves behavior in tests; observability-modeling proves runtime diagnosability\"}],\"related\":[\"error-tracking\",\"performance-engineering\",\"system-interface-contracts\",\"event-contract-design\",\"debugging\"],\"verify_with\":[\"error-tracking\",\"debugging\"]}"
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
  skill_graph_canonical_skill: skills/observability-modeling/SKILL.md
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

# Observability Modeling

## Coverage

Design telemetry semantics that make systems diagnosable. Covers diagnostic questions, logs, metrics, traces, spans, events, attributes, correlation IDs, SLOs, alert signals, cardinality, privacy, sampling, and contract-level observability requirements.

## Philosophy

Observability starts with questions, not tools. "Can we answer why this order failed to sync?" is a better design input than "add logs." Tool setup without a telemetry model produces noisy data and weak diagnosis.

Instrument boundaries, state changes, and decisions. Avoid high-cardinality or sensitive fields unless the operational value justifies the risk.

## Method

1. List diagnostic questions the system must answer.
2. Map each question to required signals: log, metric, trace, event, or derived view.
3. Define correlation identifiers across boundaries.
4. Name span/event attributes with stable semantics and cardinality limits.
5. Add SLOs and alert signals only for user or business impact.
6. Define privacy redaction and sampling rules.
7. Verify that failures can be reconstructed from emitted signals.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/observability-modeling.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/observability-modeling.json). The checklist below is the authoring gate for telemetry-semantics decisions; the eval file is the grader surface.

## Verification

- [ ] Telemetry answers named diagnostic questions
- [ ] Correlation IDs cross async and external boundaries
- [ ] Event and metric names use stable domain language
- [ ] High-cardinality attributes are avoided or justified
- [ ] Sensitive data is redacted before emission
- [ ] Alerts map to actionable symptoms, not raw noise
- [ ] A realistic failure can be reconstructed from the proposed signals

## Do NOT Use When

| Use instead | When |
|---|---|
| `error-tracking` | You need error tracker setup, redaction, source maps, or issue triage. |
| `event-contract-design` | You need a business/domain event envelope, schema, topic, replay, or consumer compatibility contract. |
| `performance-engineering` | You need to profile and optimize latency, throughput, or resource use. |
| `debugging` | There is already a failing incident or reproducible bug. |
| `testing-strategy` | You need pre-runtime test coverage design. |
