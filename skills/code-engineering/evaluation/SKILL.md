---
name: evaluation
description: "Use when scoring a completed agent task, implementation, document, skill upgrade, or other deliverable against the original request, acceptance criteria, verification evidence, quality rubric, and residual risks before calling it done. Covers skeptical critic review, 1-5 scoring, score ceilings, evidence sufficiency, finding/action capture, and the evaluation-revision loop. Do NOT use for designing eval datasets or graders (use agent-eval-design), line-by-line diff review (use code-review), choosing test levels (use testing-strategy), or designing the overall process and gates before work starts (use methodology)."
license: MIT
compatibility:
  notes: "Portable completion-evaluation discipline for AI agent work, documentation, skill upgrades, and software deliverables. It assumes the evaluator can inspect the request, artifact, changed files or report, and verification evidence; substitute local tools and acceptance criteria as needed."
allowed-tools: Read Grep Bash
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.1.0"

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
  domain: engineering/evaluation
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-18"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-18\"}"

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
  # comprehension_state: marker that this skill has populated v6+ Understanding fields
  # (mental_model, purpose, boundary, analogy, misconception). Value: `present` or absent.
  comprehension_state: present
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"evaluation\",\"quality gate\",\"deliverable review\",\"completion review\",\"evidence-based score\",\"skeptical critic\",\"score 1-5\",\"evaluation revision loop\",\"acceptance criteria review\",\"done gate\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"evaluation-skill\",\"critic-loop-skill\",\"quality-gate-skill\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"score this completed agent task against the original request, changed files, tests, and remaining risks before we call it done\",\"act as a skeptical critic and tell me whether this deliverable is actually complete or only technically working\",\"run a completion gate on this implementation: what is the 1-5 score, what evidence supports it, and what must be revised?\",\"evaluate whether this documentation update satisfies the acceptance criteria and preserves all required information\",\"after the focused checks pass, decide whether the skill upgrade can be marked complete without inflating eval claims\",\"review the final artifact and produce a scorecard with blockers, required revisions, residual risks, and verification evidence\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"design a new eval dataset, grader, and hard negatives for this router\",\"review this pull request line by line for bugs and security issues\",\"choose unit versus integration versus end-to-end tests for this feature\",\"design the whole implementation methodology and quality gate sequence before work starts\",\"debug why the existing run failed in production\",\"author a new SKILL.md from scratch\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"agent-eval-design\",\"reason\":\"agent-eval-design creates eval suites, graders, thresholds, and hard negatives; evaluation applies a completion rubric to a concrete artifact or finished task.\"},{\"skill\":\"code-review\",\"reason\":\"code-review inspects a diff for correctness, security, maintainability, and review comments; evaluation scores the whole deliverable against request, evidence, risks, and done criteria.\"},{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy decides what behavior deserves which test level; evaluation judges whether the delivered verification evidence is sufficient for the task risk.\"},{\"skill\":\"methodology\",\"reason\":\"methodology designs the process and gates before execution; evaluation is the gate applied to an artifact after work exists.\"},{\"skill\":\"skill-infrastructure\",\"reason\":\"skill-infrastructure runs deterministic health tooling across a skill library; evaluation is a human-readable scoring discipline for one deliverable.\"}],\"related\":[\"best-practice\",\"methodology\",\"agent-eval-design\",\"testing-strategy\",\"code-review\"],\"verify_with\":[\"code-review\",\"testing-strategy\",\"best-practice\"]}"
  # grounding: required when `scope: project` (or legacy alias `scope: codebase`).
  # Declares the truth sources the skill anchors to and the failure modes those sources
  # prevent. Omit when the skill is universal-knowledge.
  grounding: "{\"domain_object\":\"Evidence-based evaluation of agent outputs, deliverables, and completion claims\",\"grounding_mode\":\"universal\",\"truth_sources\":[\"https://github.com/openai/evals\",\"https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents\",\"https://platform.claude.com/docs/en/test-and-evaluate/develop-tests\",\"https://adk.dev/evaluate/\",\"https://airc.nist.gov/\"],\"failure_modes\":[\"self_assessment_optimism_marks_incomplete_work_done\",\"tests_pass_treated_as_full_quality_evidence\",\"score_inflated_despite_missing_acceptance_criteria\",\"rubric_omits_negative_boundaries_or_residual_risks\",\"evaluation_confused_with_code_review_or_eval_dataset_design\",\"unverified_claims_enter_final_report\"],\"evidence_priority\":\"equal\"}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":90,\"review_cadence\":\"quarterly\"}"

  # === v6+ Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: "Evaluation is a gate, not a compliment: compare the requested outcome, produced artifact, evidence trail, and meaningful failure modes before deciding whether the work is done."
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: "Prevent optimistic completion claims by making scores, evidence gaps, required revisions, and residual risks explicit before acceptance."
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: "This skill applies after a concrete artifact or task result exists. It does not design eval suites, review a diff line by line, choose test levels, debug a failure, or design the process before implementation."
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Evaluation is an inspection gate at the end of a production line: passing one measurement is not enough if the product misses the order, lacks traceability, or carries a known risk."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: "Tests passing, lint passing, or a plausible final answer is not the same as completion. Completion requires fit to request, sufficient evidence, handled risks, and honest reporting."
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"Evaluation is the disciplined scoring of a concrete output against explicit goals, evidence, rubric criteria, and residual risks so a team can decide whether to accept, revise, or block the work.\",\"mental_model\":\"Treat evaluation as a gate, not a compliment. The evaluator compares the requested outcome, the produced artifact, the evidence trail, and the failure modes that would matter if the artifact shipped unchanged.\",\"purpose\":\"It prevents optimistic done claims by forcing visible scores, score ceilings, missing-evidence callouts, required revisions, and a final accept or block decision.\",\"boundary\":\"It does not design eval datasets, review code line by line, choose test levels before implementation, debug failures, or design the whole process. It scores an artifact or task result after evidence exists.\",\"taxonomy\":\"Core evaluation surfaces are acceptance fit, evidence sufficiency, artifact quality, risk handling, regression protection, portability, and reporting completeness. Common graders are checklist, rubric, exact or code-based checks, trace inspection, human review, and LLM-as-judge with calibration.\",\"analogy\":\"Evaluation is like an inspection gate at the end of a production line: passing one measurement is not enough if the product misses the order, lacks traceability, or carries a known safety risk.\",\"misconception\":\"The common mistake is treating evaluation as praise, taste, or a post-hoc score. Good evaluation is adversarial in the useful sense: it looks for the first honest reason the work is not done yet.\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/code-engineering/evaluation/SKILL.md
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

# Evaluation

## Coverage

This skill covers evidence-based evaluation of a completed artifact or task result:

- Skeptical critic stance: assume the work may be incomplete until evidence says otherwise.
- Goal alignment: compare the artifact to the original user request, acceptance criteria, and any stated constraints.
- Evidence inventory: name the checks, files, sources, tests, screenshots, traces, or manual inspections that support the verdict.
- 1-5 scoring: assign a numeric score with a one-sentence justification and a visible score ceiling when evidence is missing.
- Evaluation-revision loop: record required revisions, apply them, re-run focused verification, and rescore.
- Finding discipline: preserve every material gap with severity, evidence, required action, and status.
- Boundary routing: separate holistic evaluation from diff review, test planning, eval-suite design, debugging, and methodology design.
- Honest completion reporting: distinguish passed checks, unverified claims, accepted risks, deferred work, and blockers.

## Philosophy

Agents are biased toward marking their own work done once the visible output looks plausible. That optimism is useful for momentum and dangerous at the finish line. Evaluation exists to slow the final decision just enough to ask: did this artifact actually satisfy the request, and can we prove it?

Modern agent-evaluation practice points in the same direction. OpenAI Evals treats evals as runnable checks for LLM systems. Anthropic frames an eval around tasks, trials, graders, traces, outcomes, and an evaluation harness, and recommends eval-driven development for agent capabilities. Google ADK separates final-response quality from trajectory and tool-use evaluation. NIST's AI Resource Center places testing, evaluation, verification, and validation inside broader AI risk-management practice. The shared lesson is simple: quality claims need observable criteria, not confidence.

This skill is the lightweight human-readable gate for a concrete deliverable. It does not replace automated eval suites or tests; it decides whether the available evidence is enough to accept the work, revise it, or block it.

## Evaluation Inputs

Gather the smallest sufficient evidence packet before scoring.

| Input | What to inspect | Failure if missing |
|---|---|---|
| Original request | User goal, constraints, negative boundaries, requested output | Score may reward the wrong artifact |
| Acceptance criteria | Explicit checklist, plan, issue text, or implied done conditions | Missing requirements hide behind a high score |
| Artifact | Changed files, report, document, UI, skill, commit, or final answer | Evaluation becomes abstract opinion |
| Verification evidence | Commands run, tests, lint, screenshots, traces, source reads, links checked | Claims become unverifiable |
| Domain skills | Relevant standards loaded for the artifact type | Generic scoring misses domain-specific quality gaps |
| Residual risks | Unrun checks, known limits, deferred work, accepted tradeoffs | Final report implies more certainty than exists |

If one of these inputs does not exist, say so and apply the score ceiling in the next section.

## Score Rubric

Use the full 1-5 range. A score is a decision aid, not decoration.

| Score | Verdict | Use when |
|---|---|---|
| 1 | Broken or wrong | Fails the core request, cannot be used, introduces obvious harm, or lacks the artifact being evaluated. |
| 2 | Partial or risky | Some useful work exists, but important requirements, evidence, safety checks, or domain constraints are missing. |
| 3 | Functional but incomplete | The main request is satisfied, yet polish, completeness, edge cases, documentation, or verification is weaker than the task deserves. |
| 4 | Professional and acceptable | Requirements are met, evidence is concrete, risks are handled or disclosed, and remaining issues are minor or explicitly accepted. |
| 5 | Exemplary | Goes beyond acceptance with robust edge-case handling, clear evidence, maintainable structure, excellent reporting, and no known material gaps. |

### Score Ceilings

Apply ceilings mechanically. Do not negotiate them upward with confidence language.

| Condition | Maximum score |
|---|---|
| Original request or acceptance criteria were not checked | 2 |
| Verification evidence is absent or only assumed | 2 |
| Any required action remains unresolved | 3 |
| A relevant domain skill or standard was obviously needed but not consulted | 3 |
| Security, privacy, credential, customer-data, or destructive-action risk is unresolved | 2 |
| Artifact passes tests but docs, state, publication, or reporting requirements are incomplete | 3 |
| Eval, routing, freshness, or verification claims exceed evidence from this run | 2 |
| Known residual risk is real but disclosed and accepted | 4 |

## Evaluation-Revision Loop

1. Identify the artifact and the requested outcome in one sentence.
2. Inventory evidence: changed files, relevant sources, commands, checks, screenshots, traces, or manual inspections.
3. Load the domain skills or standards that govern the artifact type.
4. Score each dimension: request fit, evidence sufficiency, artifact quality, risk handling, and reporting completeness.
5. List every material finding with severity, evidence, required action, and status.
6. Revise the artifact for every required action inside the current scope.
7. Re-run focused verification that matches the revised surface.
8. Rescore and produce a final accept, accept-with-risk, revise, or block verdict.

Do not mark the task done between steps 5 and 7. Findings are work, not commentary.

## Finding Format

Use this shape when the evaluation finds a gap:

| Field | Required content |
|---|---|
| Severity | CRITICAL, HIGH, MEDIUM, LOW, or INFO |
| Surface | File, section, behavior, command, source, or report area |
| Evidence | Concrete line, command result, screenshot, source URL, or observed absence |
| Problem | What makes the artifact less correct, complete, safe, maintainable, or verifiable |
| Required action | What must change, or why the risk is explicitly accepted or deferred |
| Status | remediated, deferred, accepted, or open |

Preserve all findings. Prioritization may order them; it must not hide them.

## Dimension Checklist

| Dimension | Questions |
|---|---|
| Request fit | Did the artifact solve the exact task, including negative instructions and scope limits? |
| Completeness | Are all required files, states, docs, artifacts, and publication steps included? |
| Correctness | Does evidence show the artifact behaves or reads correctly in the relevant cases? |
| Domain quality | Were the appropriate domain skills, standards, or source docs applied? |
| Verification | Are checks reproducible, focused, and matched to the risk surface? |
| Risk handling | Are privacy, safety, destructive action, regression, and residual uncertainty handled? |
| Reporting | Does the final report distinguish done work, evidence, residual risks, and unrun checks? |

## Boundary Decisions

| If the user needs... | Use | Why |
|---|---|---|
| A grader, eval dataset, hard negatives, or pass threshold | agent-eval-design | That skill designs the eval system; this skill applies a completion score to one artifact. |
| A pull request or diff reviewed line by line | code-review | Code review owns technical findings and merge verdicts. |
| A decision about unit, integration, contract, or e2e coverage | testing-strategy | Testing strategy chooses test scope before or during implementation. |
| A process, checklist, or quality gate sequence before work starts | methodology | Methodology designs why and when gates exist. |
| Deterministic skill-library lint, manifest, drift, overlap, or routing health checks | skill-infrastructure | Skill infrastructure runs library health tooling; evaluation scores the deliverable and evidence. |
| Root-cause analysis of a known failure | debugging | Debugging investigates the cause; evaluation judges a completed result. |

## Source Notes

- OpenAI Evals grounds the idea that LLM-system quality can be measured through reusable evaluation tasks and benchmark registries.
- Anthropic's agent-eval guidance grounds tasks, trials, graders, traces, outcomes, harnesses, and eval-driven development.
- Anthropic's evaluation-docs guidance supports task-specific criteria, edge cases, automation where possible, and calibrated rubric grading.
- Google ADK grounds the distinction between evaluating final responses and evaluating trajectory or tool use.
- NIST AIRC grounds evaluation inside testing, evaluation, verification, and validation for AI risk management.

## Verification

After applying this skill, verify:

- [ ] The original request and acceptance criteria were explicitly checked.
- [ ] The evaluated artifact and all changed or relevant files were named.
- [ ] Verification evidence was listed with commands, outputs, source reads, traces, or inspected artifacts.
- [ ] Relevant domain skills or standards were applied, or their absence was called out.
- [ ] A 1-5 score was assigned with score ceilings respected.
- [ ] Every material finding has severity, surface, evidence, required action, and status.
- [ ] Residual risks and unrun checks are stated instead of hidden.
- [ ] Any required revision was followed by focused re-verification and rescoring.

## Do NOT Use When

| Use instead | When |
|---|---|
| agent-eval-design | You are designing eval cases, rubrics, graders, hard negatives, or acceptance thresholds for future automated evaluation. |
| code-review | You are reviewing a PR, diff, or code change line by line for correctness, security, maintainability, and comments. |
| testing-strategy | You are deciding which tests to write, at which level, and with what regression target. |
| methodology | You are designing the process, checklist, or quality gate sequence before implementation exists. |
| skill-infrastructure | You are running deterministic health tooling across a skill library. |
| debugging | You are investigating why a live run, command, product behavior, or shipped change failed. |
