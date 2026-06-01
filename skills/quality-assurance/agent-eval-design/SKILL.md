---
# name: stable kebab-case skill identifier; must match the parent directory.
name: agent-eval-design
# description: routing contract for when this skill should activate and when it should not.
description: "Use when designing evaluations for AI agents, skills, routers, prompts, tool-use policies, or multi-step workflows: task sets, rubrics, graders, hard negatives, regression cases, traces, and acceptance thresholds. Do NOT use for application test planning (use `testing-strategy`), skill-library health tooling (use `skill-infrastructure`), or live debugging of a failed run (use `debugging`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime or format notes for consumers that export or execute this skill.
compatibility:
  notes: "Portable eval-design discipline for agent workflows, skill routers, prompt systems, and tool-use policies."
# allowed-tools: optional runtime hint for tools the skill may use when loaded.
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


  # === v8 Classification (subject + deployment_target; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: quality-assurance
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Designing behavioral evaluations for AI agents, skills, routers, prompts, tool-use policies, and multi-step workflows: task sets, rubrics, graders, hard negatives, regression cases, traces, and acceptance thresholds. Portable across agentic systems and skill libraries. Excludes application-code test planning, skill-library health tooling, live failure debugging, and code-diff review."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: ai-engineering/evaluation
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
  keywords: "[\"agent eval\",\"AI eval design\",\"skill routing eval\",\"eval rubric\",\"hard negatives\",\"grader design\",\"regression eval\",\"trace evaluation\",\"acceptance threshold\",\"prompt eval\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"design an eval set for whether this skill routes correctly against near-miss prompts\",\"create a rubric for judging agent outputs on grounded project knowledge extraction\",\"what hard negatives should test this router before we mark routing_eval present?\",\"turn these agent failure traces into regression eval cases\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"plan unit, integration, and e2e tests for this product feature\",\"run the skill graph lint and overlap tooling\",\"debug why yesterday's agent run failed\",\"write production code to fix this failing test\"]"
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           see ADR-0018 for rename rationale) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"boundary\":[{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy plans software tests; agent-eval-design designs behavioral evals for AI agents and skills\"},{\"skill\":\"skill-infrastructure\",\"reason\":\"skill-infrastructure owns library health tooling; agent-eval-design owns eval content and grading design\"},{\"skill\":\"debugging\",\"reason\":\"debugging investigates a live failure; agent-eval-design turns patterns into future evals\"},{\"skill\":\"code-review\",\"reason\":\"code-review evaluates diffs; agent-eval-design evaluates agent behavior\"}],\"related\":[\"skill-router\",\"context-engineering\",\"testing-strategy\",\"skill-infrastructure\"],\"verify_with\":[\"testing-strategy\",\"skill-infrastructure\"]}"
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
  skill_graph_protocol: Skill Metadata Protocol v8
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/agent-eval-design/SKILL.md
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

## Eval Case Matrix

| Behavior surface | Positive cases | Hard negatives | Grader shape |
|---|---|---|---|
| Skill routing | Real prompts that should load the target skill | Near-miss prompts owned by boundary skills or no skill | Exact expected skill plus explanation check |
| Grounded project work | Tasks with enough source files to answer correctly | Stale docs, missing files, or tempting unsupported claims | Rubric plus citation/trace inspection |
| Tool-use policy | Cases where tool use is necessary and allowed | Cases where a tool would leak data, mutate state, or skip approval | Trace inspection against policy constraints |
| Multi-step workflow | End-to-end tasks with intermediate checkpoints | Partial completion, skipped verification, or wrong order | Artifact check plus step-completion rubric |
| Prompt/system behavior | Representative prompts from actual usage | Jailbreaks, prompt injection, ambiguity, or scope inversion | Rubric with refusal/boundary criteria |

## Threshold Design

- Set the pass bar from user and system risk, not from a desired green percentage.
- Separate blocking failures from score-lowering failures; one critical privacy or mutation error should fail even if most rubric items pass.
- Track regressions from prior failures as named cases so fixes stay fixed.
- Keep hard negatives in the suite even when they feel adversarial; they are where overconfident agents reveal the real boundary.

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
