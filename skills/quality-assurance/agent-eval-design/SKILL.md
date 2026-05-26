---
name: agent-eval-design
description: "Use when designing evaluations for AI agents, skills, routers, prompts, tool-use policies, or multi-step workflows: task sets, rubrics, graders, hard negatives, regression cases, traces, and acceptance thresholds. Do NOT use for application test planning (use `testing-strategy`), skill-library health tooling (use `skill-infrastructure`), or live debugging of a failed run (use `debugging`)."
license: MIT
compatibility:
  notes: "Portable eval-design discipline for agent workflows, skill routers, prompt systems, and tool-use policies."
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
  category: quality

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: quality-assurance
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: ai-engineering/evaluation
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
  keywords: "[\"agent eval\",\"AI eval design\",\"skill routing eval\",\"eval rubric\",\"hard negatives\",\"grader design\",\"regression eval\",\"trace evaluation\",\"acceptance threshold\",\"prompt eval\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"design an eval set for whether this skill routes correctly against near-miss prompts\",\"create a rubric for judging agent outputs on grounded project knowledge extraction\",\"what hard negatives should test this router before we mark routing_eval present?\",\"turn these agent failure traces into regression eval cases\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"plan unit, integration, and e2e tests for this product feature\",\"run the skill graph lint and overlap tooling\",\"debug why yesterday's agent run failed\",\"write production code to fix this failing test\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy plans software tests; agent-eval-design designs behavioral evals for AI agents and skills\"},{\"skill\":\"skill-infrastructure\",\"reason\":\"skill-infrastructure owns library health tooling; agent-eval-design owns eval content and grading design\"},{\"skill\":\"debugging\",\"reason\":\"debugging investigates a live failure; agent-eval-design turns patterns into future evals\"},{\"skill\":\"code-review\",\"reason\":\"code-review evaluates diffs; agent-eval-design evaluates agent behavior\"}],\"related\":[\"skill-router\",\"context-engineering\",\"testing-strategy\",\"skill-infrastructure\"],\"verify_with\":[\"testing-strategy\",\"skill-infrastructure\"]}"
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
  skill_graph_canonical_skill: skills/agent-eval-design/SKILL.md
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

# Agent Eval Design

## Coverage

Design evaluations for agent behavior, skill routing, prompt systems, tool-use policies, and multi-step workflows. Covers task selection, expected behavior, rubrics, graders, hard negatives, trace capture, regression cases, thresholds, coverage, and eval maintenance.

## Philosophy

Agent evals are behavioral contracts. They should measure whether the agent does the right thing under realistic ambiguity, not whether it can parrot the happy path.

The highest-value cases are hard negatives and prior failures. A routing eval with only obvious positives gives false confidence.

## Method

1. Define the behavior being evaluated in one sentence.
2. Collect realistic positive cases, near misses, and failure traces.
3. Write expected outcomes that are observable.
4. Add hard negatives that should route elsewhere or refuse an unsafe path.
5. Choose grader type: exact, rubric, trace inspection, artifact check, or hybrid.
6. Set pass thresholds and severity for failures.
7. Add regression cases whenever a real agent failure is fixed.

## Verification

- [ ] Eval cases include positives, hard negatives, and prior failures
- [ ] Expected outcomes are observable and not preference-only
- [ ] The grader can distinguish partially correct from wrong
- [ ] Thresholds match risk, not vanity metrics
- [ ] Cases cover routing, grounding, tool use, and final artifact where relevant
- [ ] New failures become regression cases
- [ ] Eval metadata honestly reflects run state

## Do NOT Use When

| Use instead | When |
|---|---|
| `testing-strategy` | You are planning tests for application code or product behavior. |
| `skill-infrastructure` | You are building or running skill-library health tooling. |
| `debugging` | You need to root-cause a specific failed run. |
| `code-review` | You need to review a code diff. |

