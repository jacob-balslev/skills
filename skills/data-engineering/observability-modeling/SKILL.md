---
name: observability-modeling
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing telemetry semantics before or during implementation: logs, metrics, traces, events, spans, attributes, correlation IDs, SLOs, alert signals, and diagnostic questions. Do NOT use for domain/business event contracts (use `event-contract-design`), configuring an error tracker alone (use `error-tracking`), performance optimization (use `performance-engineering`), or debugging a current incident (use `debugging`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this skill.
compatibility:
  notes: "Portable observability modeling discipline for applications, integrations, jobs, queues, APIs, and agent workflows."
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: data-engineering
  subjects: [data-engineering, quality-assurance]
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Designing telemetry semantics before or during implementation — logs, metrics, traces, events, spans, attributes, correlation IDs, SLOs, alert signals, and the diagnostic questions telemetry must answer. Portable across any instrumented system; principle-grounded, not repo-bound. Excludes domain/business event contracts (event-contract-design), configuring an error tracker alone (error-tracking), performance optimization (performance-engineering), and debugging a current incident (debugging)."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/observability
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
  keywords: ["observability modeling","telemetry design","logs metrics traces","SLO","spans","correlation id","diagnostic events","alert design","instrumentation model"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["design telemetry for this ingestion pipeline so failures can be diagnosed later","which logs, metrics, spans, and correlation IDs should this interface contract require?","model observability for a background job before adding alerts","turn these diagnostic questions into events and metrics"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["set up Sentry error tracking for this app","profile and optimize a slow endpoint","debug the current production incident","write application tests for this feature"]
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
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/data-engineering/observability-modeling/SKILL.md
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
  related: ["system-interface-contracts","testing-strategy","error-tracking","performance-engineering","event-contract-design","debugging","semantics"]
  verify_with: ["error-tracking","debugging","performance-budgets"]
---
# Observability Modeling

## Concept of the skill

Designing telemetry semantics before or during implementation — logs, metrics, traces, events, spans, attributes, correlation IDs, SLOs, alert signals, and the diagnostic questions telemetry must answer.

## Coverage

Design telemetry semantics that make systems diagnosable. Covers diagnostic questions, logs, metrics, traces, spans, events, attributes, correlation IDs, SLOs, alert signals, cardinality, privacy, sampling, and contract-level observability requirements.

## Philosophy of the skill
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
