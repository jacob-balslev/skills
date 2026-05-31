---
name: eval-driven-development
description: "Use when reasoning about building language-model-integrated systems by writing evaluations before and alongside the system: the statistical (not binary) nature of LLM evals, the five primitives (dataset, evaluation function, aggregation, iteration loop, regression budget), the judgment-mechanism taxonomy (programmatic, model-graded, human-graded, preference comparison), the difference between system-specific evals and canonical benchmarks (MMLU, HumanEval, BIG-bench, GAIA), how evals drive prompt/model/scaffolding/tooling changes, why Goodhart's Law means higher eval scores are not always improvements, and the offline-eval-vs-production-telemetry distinction. Do NOT use for deterministic unit testing (use testing-strategy), production monitoring (use evaluation or error-tracking), general-software TDD (use testing-strategy), or the construction of individual eval rubrics and task sets (use agent-eval-design — it owns construction; this skill owns the iteration discipline)."
license: MIT
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
  subject: agent-ops
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Building language-model-integrated systems by writing evaluations before and alongside the system — the statistical (not binary) nature of LLM evals, the five primitives (dataset, evaluation function, aggregation, iteration loop, regression budget), the judgment-mechanism taxonomy (programmatic, model-graded, human-graded, preference comparison), system-specific evals vs canonical benchmarks (MMLU, HumanEval, BIG-bench, GAIA), how evals drive prompt/model/scaffolding/tooling changes, Goodhart's Law on eval scores, and the offline-eval-vs-production-telemetry distinction. Portable across any LLM-integrated system; principle-grounded, not repo-bound. Excludes deterministic unit testing and general TDD (testing-strategy), production monitoring (evaluation, error-tracking), and constructing individual eval rubrics and task sets (agent-eval-design owns construction; this skill owns iteration discipline)."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: agent/evaluation
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-16"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-16\"}"

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
  keywords: "[\"eval-driven development\",\"LLM evals\",\"evaluation harness\",\"benchmark\",\"HumanEval\",\"MMLU\",\"BIG-bench\",\"GAIA\",\"LLM-as-judge\",\"model-graded eval\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"how do we know this prompt change improved things\",\"should this be an eval or a unit test\",\"the model passes the benchmark but fails in production\",\"what should we measure\",\"the LLM-as-judge gives different scores each run\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"design an offline eval suite for an LLM-integrated summarization feature before writing the prompt\",\"decide between programmatic grading, model-graded judgment, and human review for a freeform-output eval\",\"explain why MMLU score is a poor predictor of a domain-specific assistant's quality\",\"structure an iteration loop where each prompt change is gated by a regression budget\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"write unit tests for a deterministic data transformation (use testing-strategy)\",\"set up production alerting on API error rates (use observability)\",\"interpret a specific benchmark's leaderboard (use benchmarking-engine)\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"tool-call-flow\",\"prompt-injection-defense\",\"testing-strategy\",\"type-safety\",\"agent-eval-design\",\"evaluation\"],\"boundary\":[{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy owns deterministic-software testing where every run is binary pass/fail; this skill owns LLM evaluation where every run is a sample from a distribution and pass-rate is the unit of judgment. The disciplines share vocabulary (suite, gate, regression) but the math underneath differs.\"},{\"skill\":\"tool-call-flow\",\"reason\":\"tool-call-flow owns the protocol cycle by which a model invokes tools; this skill owns the discipline of measuring whether that cycle produces correct behavior. Tool-call evals are a specialization of the general pattern.\"},{\"skill\":\"prompt-injection-defense\",\"reason\":\"prompt-injection-defense owns the security property; this skill owns the measurement of whether the property holds. Red-team evals against an injection corpus are one application of eval-driven-development.\"},{\"skill\":\"agent-eval-design\",\"reason\":\"agent-eval-design owns the construction of evals — task sets, rubrics, graders, hard negatives, traces; this skill owns the development discipline that uses constructed evals to gate every change to prompt, model, retrieval, scaffolding, or tooling. The two compose: agent-eval-design produces the suite; this skill applies it.\"},{\"skill\":\"type-safety\",\"reason\":\"type-safety owns the compile-time property of programs; this skill owns the runtime-distributional property of LLM outputs. They are both validate-at-the-boundary disciplines with different threat models.\"}],\"verify_with\":[\"testing-strategy\",\"agent-eval-design\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Eval-driven development is the practice of building LLM-integrated systems by writing evaluations before and alongside the system, with each eval defining a behavioral criterion the system must satisfy on a representative input set, and the suite's aggregated pass-rate signal gating every change to prompt, model, retrieval, scaffolding, or tooling. *Five primitives*: (1) *eval dataset* — curated input examples representing production, typically JSONL of `{input, reference}` records checked into version control; (2) *evaluation function* — per-example grader producing a score, with mechanism chosen from programmatic, model-graded, human-graded, or hybrid; (3) *aggregation* — statistical summary across the dataset (pass-rate, weighted pass-rate, stratified pass-rate, distribution) with sample size and either a confidence interval or a defined minimum-detectable-change threshold; (4) *iteration loop* — eval → diagnose → change → re-eval, with the suite stable while the system changes; (5) *regression budget* — per-eval policy: gating (no regression allowed), optimizing (improvement gates merge), or watchful (tracked, not gated).

    *Statistical, not binary*: every LLM eval is a sample from a distribution where *pass-rate over the population* is the unit of judgment, not pass/fail per run, because the system under test is itself stochastic. *Judgment-mechanism taxonomy*: programmatic ($0/grade, deterministic, narrow applicability — code, JSON validity, exact match), model-graded ($0.001-$0.10 per grade, cheap at scale, correlated-error and verbosity-bias risks, *must* be calibrated against humans), human-graded ($1-$50 per grade, highest validity, lowest scale, inter-rater agreement must be measured), hybrid (production default: programmatic gates, model-graded scales, human samples calibrate). Public benchmarks (MMLU, HumanEval, BIG-bench, GAIA, MT-Bench) are cited for model-selection grounding but do *not* gate system-specific quality decisions.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces "ship LLM systems based on how the model feels at the desk" with empirical measurement that distinguishes "the new prompt works better" from "the new prompt works better on the five examples I happened to try." Solves the problem that LLM system behavior is *stochastic* (every run is a sample, not a deterministic pass/fail), the input space is *open-ended* (the developer's pet examples are not a representative sample of what users will throw at it), and traditional binary unit tests do not capture the distributional nature of LLM outputs. The eval suite is the empirical measurement instrument that makes shipping decisions defensible and changes gateable. The discipline's hard part is not writing evals — it is choosing what to measure, encoding the choice into a grader the team agrees with, sampling a dataset that represents production, and *resisting Goodhart's Law* as the eval suite becomes the optimization target. Teams that get this right ship systems whose quality matches their stated definition of "good"; teams that get this wrong ship systems that ace evals and disappoint users.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from testing-strategy, which owns deterministic-software testing where every run is binary pass/fail — this skill owns LLM evaluation where every run is a sample from a distribution and *pass-rate* is the unit of judgment; the disciplines share vocabulary (suite, gate, regression) but the math underneath differs. Distinct from tool-call-flow, which owns the protocol cycle by which a model invokes tools — this skill owns the discipline of *measuring* whether that cycle produces correct behavior; tool-call evals are a specialization of the general pattern. Distinct from prompt-injection-defense, which owns the security property — this skill owns the *measurement* of whether the property holds (red-team evals against an injection corpus are one application). Distinct from agent-eval-design, which owns the *construction* of evals (task sets, rubrics, graders, hard negatives, traces) — this skill owns the *development discipline* that uses constructed evals to gate every change; the two compose. Distinct from observability and error-tracking, which own runtime measurement of deployed systems — this skill owns *offline pre-deployment* measurement; one is not used as a substitute for the other. Distinct from benchmarking-engine, which owns the interpretation of specific public benchmarks' leaderboards.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Eval-driven development is to LLM system engineering what crash-test ratings are to automotive safety — you do not ship a car based on how well it parked in your driveway; you ship it after a battery of standardized tests on representative crash scenarios, with the pass-rate against named criteria as the gating signal. A score of 4.3 stars across the suite is the only defensible claim of 'safer'; a developer's intuition that 'the new model feels smarter' is the unmeasured equivalent of 'I drove it home, it seemed fine.'"
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that LLM evals are "unit tests for prompts" — binary pass/fail, written once, checked in CI. They are not. The fundamental property is *distributional*: every run is a sample from a stochastic system, and the unit of judgment is *pass-rate over a sampled population* with a sample size and confidence interval. A test that runs once and "passes" tells you nothing about the distribution; pass-rate at n=20 has huge uncertainty; pass-rate at n=500 starts to be informative. Adjacent misconceptions: that public benchmarks (MMLU, HumanEval, BIG-bench, GAIA, MT-Bench) gate system-specific shipping decisions (they do not — benchmarks predict how a model will do on the *exact* tasks they contain, not on your system's user inputs; use them for model-selection grounding, not as the gating signal); that higher eval scores are always improvements (they are not — *Goodhart's Law*: when the eval becomes the optimization target, it ceases to be a good measure; symptoms are pass-rate climbing while human reviewers' confidence flattens or declines, prompt changes producing phrasings the grader rewards but users dislike, the system memorizing patterns specific to the dataset; defenses are held-out sets, periodic dataset refresh, calibration of model-graders against humans, tracking multiple criteria); that model-graded evals are reliable without calibration (they are not — model-graders have verbosity bias, position bias in pairwise comparisons, and correlated error with the system being graded; periodic human-review calibration is operational hygiene); that offline evals replace production telemetry (they do not — production telemetry measures the actual user-facing system under actual load; the two are complementary, not substitutable); and that a single headline number is sufficient (it is not — a panel of independent measures is harder to over-fit than one, and HELM's multi-metric framing exists precisely as a counter to single-metric Goodharting).
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"Eval-driven development is the practice of building language-model-integrated systems by writing evaluations before and alongside the system, where each evaluation defines a behavioral criterion the system must satisfy on a representative input set, and the suite's aggregated pass-rate signal gates every change to the prompt, model, retrieval, scaffolding, or tooling. Evals are the LLM analog of automated tests for deterministic software with one fundamental difference: LLM evals are statistical (pass-rate over a sampled population) rather than binary (pass/fail per run), because the system under test is itself stochastic. The discipline is the rigorous separation of generation (what the system produces) from judgment (how it is scored) with explicit accounting for the uncertainty in both.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/eval-driven-development/SKILL.md
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

# Eval-Driven Development

## Coverage

The practice of building language-model-integrated systems by writing evaluations before and alongside the system, and using the eval suite's aggregated pass-rate signal to gate every change. Covers the statistical (not binary) nature of LLM evaluation, the five primitives (dataset, evaluation function, aggregation, iteration loop, regression budget), the judgment-mechanism taxonomy (programmatic / model-graded / human-graded / hybrid), the distinction between system-specific evals and canonical public benchmarks (MMLU, HumanEval, BIG-bench, GAIA, MT-Bench), why higher scores are not always improvements (Goodhart's Law), the difference between offline evals and production telemetry, and the eval-lifecycle archetypes (acceptance, regression, calibration, red-team, cross-model).

## Philosophy

Building LLM-integrated systems without evals is shipping airplanes based on how good the model feels at the desk. The system's behavior is stochastic, the input space is open-ended, and the developer's pet examples are not a representative sample of what users will throw at it. An eval suite is the empirical measurement instrument that lets a team distinguish "the new prompt works better" from "the new prompt works better on the five examples I happened to try."

The discipline's hard part is not writing evals. It is choosing what to measure, encoding the choice into a grader the team agrees with, sampling a dataset that represents production, and resisting the gravitational pull of Goodhart's Law as the eval suite becomes the optimization target. Teams that get this right ship systems whose quality matches their team's stated definition of "good." Teams that get this wrong ship systems that ace evals and disappoint users.

Eval-driven development is not test-driven development with extra noise. It is empirical engineering applied to systems whose behavior is a distribution rather than a value. The vocabulary overlaps; the math underneath does not.

## The Five Primitives In Practice

| Primitive | What it is | Common encoding | Failure mode if neglected |
|---|---|---|---|
| Eval dataset | Curated input examples that represent production | JSONL of `{input, reference}` records; checked into version control | "It works for me" with no shared evidence |
| Evaluation function | Per-example grader producing a score | Python function, model-graded prompt template, or human-review UI | Implicit, undocumented definition of "good" |
| Aggregation | Statistical summary across the dataset | Pass-rate, weighted pass-rate, stratified pass-rate, distribution | Headline number obscures pattern of failure |
| Iteration loop | Eval → diagnose → change → eval | CI-integrated pipeline; eval results in PR comment | Changes ship without measurement |
| Regression budget | Defined acceptable change per metric | Per-eval policy: "must not regress" / "improvement gates merge" / "watchful" | Every change becomes a debate about the headline number |

## Judgment Mechanism Selection

| Mechanism | Best for | Cost per example | Reliability | Watch for |
|---|---|---|---|---|
| Programmatic | Outputs with mechanical correctness (code, JSON validity, exact match) | $0 | Deterministic | Narrow applicability — won't work for freeform output |
| Model-graded | Open-output tasks at scale (summarization, classification, freeform Q&A) | $0.001-$0.10 per grade depending on model | Correlated error with the system being graded | Verbosity bias, position bias in pairwise; calibrate against humans |
| Human-graded | Subjective criteria, calibration runs, ambiguous outputs | $1-$50 per grade depending on annotator | Highest validity; lowest scale | Inter-rater agreement must be measured; one rater is not "humans think" |
| Hybrid | Production systems | Mixed | Mixed | Standard setup: programmatic gates, model-graded scales, human samples calibrate |

A practical default: programmatic checks for the parts you can mechanically verify, model-graded for the open parts, periodic human review to calibrate.

## Iteration Loop Discipline

The eval-driven iteration loop is the development cycle. Run the suite, diagnose failures, identify the change, re-run, gate the change on regression budget.

```
┌─────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────┐
│ Eval    │ -> │ Diagnose │ -> │ Change       │ -> │ Re-run   │
│ baseline│    │ failures │    │ (prompt,     │    │ Eval     │
│         │    │          │    │  model,      │    │          │
│         │    │          │    │  retrieval,  │    │          │
│         │    │          │    │  tooling)    │    │          │
└─────────┘    └──────────┘    └──────────────┘    └──────────┘
                                                          │
                                                          v
                                                ┌──────────────────┐
                                                │ Compare against  │
                                                │ regression budget│
                                                │ Merge / iterate  │
                                                └──────────────────┘
```

The discipline is keeping the suite stable while the system changes. If both move in the same iteration, the comparison anchor is gone and the team is doing parallel experiments.

## Public Benchmarks — Cited For Grounding, Not For Gating

Benchmarks measure cross-system capability against a shared standard. They predict how a model will do on the *exact* tasks the benchmark contains. They do not predict how your specific system, on your specific user inputs, with your specific prompts and retrieval, will perform.

| Benchmark | Measures | Cited for |
|---|---|---|
| MMLU (Hendrycks et al., 2021) | 57 subjects of multiple-choice general knowledge | Breadth of general capability |
| HumanEval (Chen et al., 2021) | 164 programming problems graded by test execution | Code-generation correctness baseline |
| BIG-bench (Srivastava et al., 2022) | 200+ tasks across the long tail of NLP | Breadth of niche capabilities |
| GAIA (Mialon et al., 2023) | General-assistant multi-step tasks with tool use | Realistic agentic-task baseline |
| MT-Bench / Chatbot Arena (Zheng et al., 2023) | Pairwise preference comparison for chat | Human-aligned preference signal |

The right use: pick a model partly on benchmark performance, then build system-specific evals to gate the actual deployment.

## Goodhart's Law In Eval Practice

When the eval becomes the optimization target, the eval ceases to be a good measure. Symptoms:

- Pass-rate climbs while human reviewers' confidence in the system flattens or declines.
- Prompt changes produce phrasings the grader rewards but users dislike (e.g., verbose hedging that scores well on rubric, reads poorly on screen).
- The system memorizes patterns specific to the eval dataset (over-fitting to test cases).
- A held-out evaluation set, scored fresh, shows worse pass-rate than the development set.

Defenses:

- **Hold out a portion of the dataset from active iteration.** Score it periodically; if held-out and development pass-rates diverge, the iteration is over-fitting.
- **Periodically refresh the eval dataset.** Replace some examples with new production-sampled inputs to prevent the dataset from going stale.
- **Calibrate model-graders against humans.** A grader that has drifted from human judgment can produce high pass-rates on outputs humans dislike.
- **Track multiple criteria.** A single headline number is easier to over-fit than a panel of independent measures.

## What This Skill Is Not

This skill is the *concept* of eval-driven development. Specific topics with their own scope:
- The mechanics of running evals in CI/CD pipelines belong to a tooling skill.
- The construction of individual eval rubrics, task sets, graders, and hard negatives belongs to `agent-eval-design`.
- The deterministic testing of non-LLM code belongs to `testing-strategy`.
- The production monitoring of running systems belongs to observability and reliability skills.
- The obra/superpowers `test-driven-development` skill (on skills.sh) is a process-shape workflow skill for general software TDD; this one is the concept-shape complement for the LLM-specific evaluation discipline.

## Verification

After applying this skill, verify:
- [ ] An eval dataset exists, is checked into version control, and is representative of the system's actual production input distribution.
- [ ] Each eval criterion has a defined judgment mechanism (programmatic, model-graded, or human-graded), and the mechanism's known biases are accounted for.
- [ ] Aggregation reports pass-rate with sample size and either a confidence interval or a defined minimum-detectable-change threshold.
- [ ] Each eval has an explicit regression budget: gating (no regression allowed), optimizing (improvement gates merge), or watchful (tracked, not gated).
- [ ] Model-graded evals have been calibrated against human review on a sample within the past quarter (or whatever cadence the team has agreed to).
- [ ] A held-out portion of the dataset is reserved from active iteration and scored periodically to detect over-fitting.
- [ ] The eval suite is integrated into the change workflow — prompt changes, model upgrades, retrieval changes, and tooling changes are all gated by the suite.
- [ ] Public benchmarks (MMLU, HumanEval, etc.) are cited for model-selection grounding but are not the gating decision for system-specific quality.
- [ ] Production telemetry exists separately from the offline eval suite; one is not used as a substitute for the other.
- [ ] The shipping threshold is a product decision documented somewhere, not an emergent average across team opinion.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Writing deterministic unit tests for non-LLM code | `testing-strategy` | testing-strategy owns binary pass/fail testing; this skill owns distributional measurement |
| Designing individual eval rubrics, task sets, graders, hard negatives | `agent-eval-design` | agent-eval-design owns eval construction; this skill owns the iteration discipline that uses constructed evals |
| Setting up production monitoring, alerting, or telemetry | `evaluation` (general framing) or `error-tracking` | those own runtime measurement of deployed systems; this skill owns offline pre-deployment measurement |
| Reasoning about the protocol cycle of tool calls | `tool-call-flow` | tool-call-flow owns the cycle; eval-driven development can measure tool-call correctness as one criterion |
| Defending against prompt injection | `prompt-injection-defense` | prompt-injection-defense owns the security property; this skill can measure whether the defense holds |
| General software TDD process | the obra/superpowers `test-driven-development` skill or `testing-strategy` | TDD is process-shape for general software; this skill is concept-shape for the LLM-specific evaluation discipline |

## Key Sources

- Hendrycks, D., Burns, C., Basart, S., Zou, A., Mazeika, M., Song, D., & Steinhardt, J. (2021). ["Measuring Massive Multitask Language Understanding"](https://arxiv.org/abs/2009.03300). The MMLU benchmark paper; foundational reference for cross-system general-knowledge evaluation.
- Chen, M., Tworek, J., Jun, H., Yuan, Q., et al. (2021). ["Evaluating Large Language Models Trained on Code"](https://arxiv.org/abs/2107.03374). The HumanEval benchmark paper; foundational for code-generation evaluation.
- Srivastava, A., et al. (2022). ["Beyond the Imitation Game: Quantifying and extrapolating the capabilities of language models"](https://arxiv.org/abs/2206.04615). The BIG-bench paper; canonical reference for breadth-of-capability evaluation across 200+ tasks.
- Mialon, G., Fourrier, C., Swift, C., Wolf, T., LeCun, Y., & Scialom, T. (2023). ["GAIA: A Benchmark for General AI Assistants"](https://arxiv.org/abs/2311.12983). The GAIA benchmark paper; canonical reference for evaluating multi-step assistant tasks with tool use.
- Zheng, L., Chiang, W.-L., et al. (2023). ["Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"](https://arxiv.org/abs/2306.05685). The MT-Bench paper; canonical reference for LLM-as-judge methodology, including known biases.
- OpenAI. [Evals framework on GitHub](https://github.com/openai/evals). Open-source framework for writing and running LLM evals; documents the practical mechanics of the discipline.
- Anthropic. [Building evals — Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook/tree/main/skills/classification) and [Evaluation guide](https://docs.anthropic.com/en/docs/test-and-evaluate/develop-tests). Practitioner-oriented guidance on building eval suites.
- UK AI Safety Institute. [Inspect: An open-source evaluation framework](https://inspect.ai-safety-institute.org.uk/). Open framework purpose-built for capability and safety evaluations of LLMs.
- Goodhart, C. (1975). "Problems of Monetary Management: The U.K. Experience." The origin of Goodhart's Law as commonly cited; "when a measure becomes a target, it ceases to be a good measure."
- Liang, P., et al. (2022). ["Holistic Evaluation of Language Models"](https://arxiv.org/abs/2211.09110). The HELM framework paper; argues for multi-metric eval across many dimensions as a counter to single-metric Goodharting.
