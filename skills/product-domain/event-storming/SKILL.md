---
name: event-storming
description: "Use when discovering a domain through events, commands, actors, policies, aggregates, read models, external systems, and temporal workflows before implementation. Do NOT use for event schema/topic contracts (use `event-contract-design`), webhook handler implementation (use `webhook-integration`), generic state transition modeling (use `state-machine-modeling`), or persistence schema design (use `data-modeling`)."
license: MIT
compatibility:
  notes: "Portable event-storming discipline for product discovery, domain modeling, event-driven architecture, and workflow analysis."
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
  subject: product-domain
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: architecture/domain-discovery
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
  keywords: "[\"event storming\",\"domain events\",\"commands\",\"aggregates\",\"policies\",\"read models\",\"temporal workflow\",\"event-driven discovery\",\"process modeling\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"map the order lifecycle as domain events before we design tables or APIs\",\"which commands, policies, and external systems are hidden in this workflow?\",\"use event storming to find aggregate boundaries for fulfillment\",\"turn this incident-prone business process into events and decisions\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"implement Shopify webhook signature verification and idempotent retries\",\"draw the state machine for this one status field\",\"create a normalized data model and indexes\",\"write event-bus infrastructure code\",\"define the schema, topic, compatibility, and fixtures for a selected event\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"event-contract-design\",\"reason\":\"event-contract-design owns publishable event envelopes, schemas, topics, and compatibility; event-storming discovers the domain behavior before contract design\"},{\"skill\":\"webhook-integration\",\"reason\":\"webhook-integration implements inbound provider event handlers; event-storming discovers business-domain events before implementation\"},{\"skill\":\"state-machine-modeling\",\"reason\":\"state-machine-modeling formalizes states and transitions; event-storming discovers events, commands, policies, and aggregates\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling designs stored data structures after domain events are understood\"},{\"skill\":\"api-design\",\"reason\":\"api-design shapes endpoint surfaces; event-storming discovers the domain behavior those surfaces expose\"}],\"related\":[\"bounded-context-mapping\",\"state-machine-modeling\",\"system-interface-contracts\",\"event-contract-design\",\"conceptual-modeling\"],\"verify_with\":[\"conceptual-modeling\",\"bounded-context-mapping\"]}"
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
  skill_graph_canonical_skill: skills/event-storming/SKILL.md
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

# Event Storming

## Coverage

Discover domain behavior through temporal events and decisions. Covers domain events, commands, actors, policies, aggregates, read models, external systems, hotspots, timelines, invariants, and handoff into bounded-context, state-machine, data, and API design.

## Philosophy

Event storming starts from "what happened" because events expose real business flow faster than nouns do. Noun-first modeling often freezes premature assumptions. Event-first modeling reveals time, causality, policy, and exceptions.

Do not confuse domain events with technical notifications. "OrderPlaced" is business meaning. "WebhookReceived" is transport detail.

## Method

1. List domain events in past tense.
2. Place them on a timeline.
3. Add commands that cause events.
4. Add actors and external systems that issue commands or receive outcomes.
5. Add policies: "when event X happens, if condition Y, then command Z."
6. Identify aggregates that enforce invariants.
7. Mark hotspots, missing decisions, temporal ambiguity, and unclear ownership.
8. Hand off to bounded-context, state-machine, data, or API design only after the flow is coherent.

## Verification

- [ ] Events are named in past tense and carry business meaning
- [ ] Commands are imperative and have actors or policies
- [ ] Policies are explicit condition-action rules
- [ ] Aggregates are tied to invariants, not guessed from nouns
- [ ] External systems and transport details are separated from domain events
- [ ] Hotspots and unanswered questions are recorded
- [ ] The timeline can replay a real scenario end to end

## Do NOT Use When

| Use instead | When |
|---|---|
| `webhook-integration` | You are implementing provider webhooks, signatures, retries, and deduplication. |
| `event-contract-design` | You already selected the event and need schema, envelope, topic, compatibility, replay, or fixtures. |
| `state-machine-modeling` | You already know the lifecycle and need formal states, transitions, and guards. |
| `data-modeling` | You need tables, keys, indexes, constraints, or data lifecycle. |
| `api-design` | You need endpoint, request, response, and status-code design. |
