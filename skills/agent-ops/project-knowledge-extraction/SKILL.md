---
name: project-knowledge-extraction
description: "Use when extracting durable project knowledge from code, docs, issues, incidents, reports, screenshots, or conversations into reusable context such as skills, ADRs, glossaries, context docs, or memory. Do NOT use for writing a new skill contract (use `skill-scaffold`), maintaining library tooling (use `skill-infrastructure`), or generic documentation polish (use `documentation`)."
license: MIT
compatibility:
  notes: "Portable extraction workflow for turning project evidence into durable agent context without hallucinated project claims."
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
  operation: know
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: agent

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: agent-ops
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: agent/knowledge
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
  drift_check: "{\"last_verified\":\"2026-05-13\",\"truth_source_hashes\":{\"docs/PRIMER.md\":\"e6bd99468c224fe4c9606e147c5db94dff889feeb9ca5d80084480039c7e9296\",\"docs/ADOPTION.md\":\"3a75c1a613ac0bdf0b4b56e567d8ec1f35a80252e68595e8d86bb0a5abdf1bfc\",\"docs/recommended-skills.md\":\"5c0201bd76cdc0310bb57ddc88565ffa41f47f3b41f489c0557cb7634ed16379\",\"skills/skill-scaffold/SKILL.md\":\"ea0e988de27bea1bb0868c153b4e6b2739895d180f857339b97202cc287262f7\",\"skills/context-graph/SKILL.md\":\"732a04f09f2f4362ee17a65bee24406715a773aefd78dbcdc37a4cb3a9f287a7\"}}"

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
  keywords: "[\"project knowledge extraction\",\"context extraction\",\"durable knowledge\",\"knowledge capture\",\"code archaeology\",\"docs mining\",\"issue mining\",\"tacit knowledge\",\"context doc\",\"agent memory\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"read this repo and extract the durable domain knowledge an agent should know next time\",\"turn these incident notes into reusable context without copying noise\",\"mine the code and docs for the true source-of-truth files and project vocabulary\",\"convert repeated discoveries from recent tasks into skills, ADRs, or context docs\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"create a new SKILL.md from the Skill Metadata Protocol template\",\"run the skill library health tooling and overlap detector\",\"rewrite this README to sound better\",\"decide which skill should route for this exact prompt\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"skill-scaffold\",\"reason\":\"skill-scaffold authors a specific skill contract; project-knowledge-extraction decides what durable knowledge should become a skill, ADR, context doc, or memory\"},{\"skill\":\"skill-infrastructure\",\"reason\":\"skill-infrastructure maintains library tooling; project-knowledge-extraction mines evidence into reusable knowledge artifacts\"},{\"skill\":\"skill-router\",\"reason\":\"skill-router dispatches a prompt to existing skills; project-knowledge-extraction creates or updates the knowledge base the router later uses\"}],\"related\":[\"knowledge-modeling\",\"context-graph\",\"architecture-decision-records\"],\"verify_with\":[\"knowledge-modeling\"]}"
  # grounding: required when `scope: project` (or legacy alias `scope: codebase`).
  # Declares the truth sources the skill anchors to and the failure modes those sources
  # prevent. Omit when the skill is universal-knowledge.
  grounding: "{\"domain_object\":\"Extracting durable project knowledge into Skill Graph context artifacts\",\"grounding_mode\":\"hybrid\",\"truth_sources\":[\"docs/PRIMER.md\",\"docs/ADOPTION.md\",\"docs/recommended-skills.md\",\"skills/skill-scaffold/SKILL.md\",\"skills/context-graph/SKILL.md\"],\"failure_modes\":[\"session_noise_promoted_to_durable_context\",\"project_claims_without_truth_sources\",\"artifact_type_chosen_before_evidence_is_classified\",\"extracted_knowledge_not_linked_into_graph\"],\"evidence_priority\":\"repo_code_first\"}"
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
  skill_graph_canonical_skill: skills/project-knowledge-extraction/SKILL.md
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

# Project Knowledge Extraction

## Coverage

Extract durable, reusable project knowledge from local evidence. Covers source discovery, fact extraction, vocabulary capture, decision mining, failure-pattern capture, artifact routing, grounding, freshness, and deciding whether knowledge belongs in a skill, ADR, context doc, glossary, runbook, or memory.

## Philosophy

Agents lose value when every session rediscovers the same project facts. The fix is not to dump everything into context. The fix is to extract durable knowledge, classify it, ground it in truth sources, and store it where future agents can find it.

Durable knowledge must be evidence-backed. If it cannot be tied to code, docs, decisions, or observed behavior, mark it as a hypothesis.

## Method

1. Inventory evidence: code surfaces, docs, issues, reports, tests, scripts, screenshots, and prior decisions.
2. Extract stable facts, recurring failure modes, vocabulary, boundaries, and source-of-truth files.
3. Discard session noise, one-off logs, and facts likely to expire quickly.
4. Classify destination: skill, ADR, context doc, glossary, runbook, memory, or no artifact.
5. Add grounding: truth sources, last-verified date, and drift trigger.
6. Link the new artifact into the context graph.
7. Verify by asking what future task this knowledge should improve.

## Verification

- [ ] Every retained fact has a truth source or is marked as a hypothesis
- [ ] One-off session notes were excluded
- [ ] Vocabulary distinctions are captured with examples
- [ ] Decisions are routed to ADRs, not buried in generic notes
- [ ] Reusable procedures are routed to skills or runbooks
- [ ] Artifact links make the knowledge discoverable later
- [ ] Drift triggers are clear for volatile facts

## Do NOT Use When

| Use instead | When |
|---|---|
| `skill-scaffold` | You already know the skill to write and need the Skill Metadata Protocol contract. |
| `skill-infrastructure` | You need library tooling, audits, overlap detection, or health checks. |
| `documentation` | You need prose polish or a human-facing guide from known facts. |
| `skill-router` | You need to choose an existing skill for one prompt. |
