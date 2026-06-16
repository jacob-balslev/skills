---
# name: stable skill identifier. Match the skill directory name or the final namespace segment.
# Lowercase letters/numbers with hyphen, slash, or colon separators.
name: experimentation
# description: short about-statement (2026-05-27 doctrine — topical, not "Use when").
description: "Designing, running, and interpreting controlled experiments to decide whether a change is genuinely better — online A/B tests, randomized controlled trials, and offline hypothesis tests. Covers hypothesis framing, randomization and unit-of-assignment, sample-size and statistical-power calculation, metric design (primary, guardrail, invariant, and the overall evaluation criterion), variance reduction (CUPED/CUPAC) for sensitivity, significance testing and confidence intervals, sequential and anytime-valid testing for the peeking problem, multiple-comparison correction, the trust checklist led by sample-ratio-mismatch, interference-aware designs (cluster and switchback), long-term holdouts and reverse experiments, bandit/adaptive-allocation boundaries, experiment ethics and blast-radius limits, quasi-experimental fallbacks when randomization is infeasible, and the validity threats that quietly invalidate results (novelty and primacy effects, interference/SUTVA violations, Simpson's paradox, and survivorship)."
# license: SPDX license identifier (e.g., MIT, Apache-2.0).
license: MIT
# compatibility: runtime compatibility object. Prefer structured fields
# (`runtimes`, `node`) over free-text `notes`.
compatibility:
  notes: "Stack- and platform-agnostic experimentation discipline. The design, power, metric, sensitivity, and validity machinery applies to product/growth A/B platforms, feature-flag systems, warehouse-native experimentation tools, systems-performance trials, and offline hypothesis tests alike; specific tool names (feature-flag platforms, stats libraries, experimentation services) are illustrative — substitute your stack's equivalents and follow its statistical engine."
allowed-tools: Read Grep

# === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
# subject: primary browse shelf — what the skill teaches. One of twelve closed values:
# backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
# quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
subject: software-engineering-method
# public: publishability/private-data gate. Boolean.
# true = publishable/shareable; false = private and excluded from public export.
# Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
public: true
# scope: free-text PRD-style statement of what the skill teaches and what it excludes.
# (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
scope: "Designing, running, and interpreting controlled experiments — online A/B tests, randomized controlled trials, and offline hypothesis tests embedded in a deliberate comparison with a predeclared decision rule — to make evidence-based change decisions: hypothesis and decision framing, randomization and unit-of-assignment, stable deterministic assignment/bucketing, sample-size and power calculation, minimum detectable effect, metric design (primary, guardrail, invariant/diagnostic, and the overall evaluation criterion), variance reduction (CUPED, CUPAC, stratification, triggered analysis) for sensitivity, significance testing and confidence intervals, fixed-horizon vs sequential and anytime-valid testing for the peeking problem, multiple-comparison and segment correction, the trust checklist led by sample-ratio-mismatch (plus variant jumping, A/A checks, invariant-metric movement, exposure/logging integrity), interference-aware designs (cluster and switchback randomization, carryover buffers), long-term effect measurement (holdouts and reverse experiments), staged rollout/ramp, bandit/adaptive-allocation tradeoffs, experiment ethics (blast-radius limits, stop rules, sensitive populations), quasi-experimental fallbacks when randomization is infeasible (difference-in-differences, regression discontinuity, interrupted time series, synthetic control, matched observational comparison), and validity threats (novelty/primacy, interference and SUTVA violations, Simpson's paradox, survivorship). Portable across product, growth, and systems experimentation. Excludes general descriptive and inferential statistics theory detached from an experiment decision, the Lean Startup MVP/build-measure-learn validation loop that learns without a powered causal comparison (lean-startup), the LLM-system eval iteration discipline (eval-driven-development), completion review of a finished deliverable (evaluation), Bayesian belief-update reasoning without random assignment (bayesian-reasoning), and classic supervised-ML model performance metrics on a fixed dataset."
# taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
# lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
# `subject` is sufficient.
taxonomy_domain: engineering/experimentation
# grounding: required when non-empty `project[]`. This skill is universal-knowledge
# (no project[]); grounding is OPTIONAL here but recorded to anchor provenance.
# Encoded as a YAML OBJECT per schema (schemas/SKILL_METADATA_PROTOCOL_schema.json —
# grounding is type:object with required subfields). truth_sources use the object form
# {path, note} (schema-valid) so each source carries its provenance reason.
grounding:
  subject_matter: "Design, execution, and interpretation of controlled experiments (A/B tests, RCTs, offline hypothesis tests) for software, product, growth, and systems changes"
  grounding_mode: universal
  truth_sources:
    - path: "https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/D97B26382EB0EB2DC2019A7A7B518F59"
      note: "Kohavi, Tang & Xu — the canonical practitioner text for trustworthy online controlled experiments, OEC, trust diagnostics, pitfalls, and experimentation culture; its ethics chapter grounds the experiment-ethics section."
    - path: "https://www.microsoft.com/en-us/research/articles/diagnosing-sample-ratio-mismatch-in-a-b-testing/"
      note: "Microsoft Research — grounds SRM as the first integrity gate that must pass before effect analysis, with a conservative detection threshold."
    - path: "https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/"
      note: "Microsoft ExP — grounds during-experiment trust checks, OEC, diagnostic/invariant metrics, and guardrail interpretation."
    - path: "https://exp-platform.com/cuped/"
      note: "Deng, Xu, Kohavi & Walker (WSDM 2013) — the original CUPED variance-reduction paper using pre-experiment data for sensitivity and shorter runtime."
    - path: "https://careersatdoordash.com/blog/improving-experimental-power-through-control-using-predictions-as-covariate-cupac/"
      note: "DoorDash — grounds CUPAC, the ML-prediction-covariate extension of CUPED for higher power when a single pre-period metric is weak."
    - path: "https://www.kdd.org/kdd2017/papers/view/peeking-at-ab-tests-why-it-matters-and-what-to-do-about-it"
      note: "Johari, Pekelis, Walsh & Koomen (KDD 2017) — always-valid p-values and confidence sequences for continuously monitored A/B tests (canonical KDD provenance, not a third-party mirror)."
    - path: "https://pubsonline.informs.org/doi/10.1287/mnsc.2020.01157"
      note: "Holtz et al. (Airbnb pricing meta-experiment, Management Science) — grounds interference bias in marketplaces and cluster randomization as a remedy."
    - path: "https://docs.growthbook.io/bandits/overview"
      note: "Grounds multi-armed bandits as adaptive traffic-allocation experiments, distinct from static fixed-split A/B tests."
    - path: "https://openfeature.dev/docs/reference/intro/"
      note: "Grounds feature flags as a control-plane mechanism that implements assignment, canaries, and rollouts without replacing experiment design."
    - path: "https://link.springer.com/article/10.1007/s11023-023-09644-y"
      note: "Grounds ethical-deliberation requirements for online controlled experiments as real interventions on people."
  failure_modes:
    - underpowered_test_called_as_null
    - peeking_inflates_false_positive_rate
    - randomization_unit_mismatched_to_analysis_unit
    - unstable_or_unsalted_bucketing_changes_assignment_over_time
    - gameable_or_single_metric_with_no_guardrail
    - sample_ratio_mismatch_ignored
    - feature_flag_rollout_mistaken_for_valid_experiment
    - novelty_or_primacy_effect_read_as_durable
    - interference_violates_sutva
    - simpsons_paradox_from_aggregation
    - multiple_comparisons_uncorrected
    - post_hoc_segment_mining_turns_diagnostics_into_false_winners
    - short_term_win_read_as_durable_without_holdout_or_reversal
    - bandit_used_when_clean_causal_estimate_is_required
    - significant_but_trivial_effect_shipped
    - unethical_or_unbounded_blast_radius_experiment
    - spurious_causality_in_quasi_experiment
  evidence_priority: general_knowledge_first
# stability: lifecycle marker. One of:
# experimental (active development) / stable (production-ready) /
# frozen (no further changes expected) / deprecated.
# When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
# Kept `experimental`: content is comprehensive and grounded, but no comprehension eval
# has been run yet (audit-state: eval_state unverified) — stability is earned, not bumped.
stability: experimental
# keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
# Keep terms a user would actually type when starting a task in this skill's domain.
keywords:
  - A/B test
  - controlled experiment
  - randomized controlled trial
  - hypothesis test
  - statistical power
  - sample size calculation
  - experiment design
  - guardrail metric
  - sequential testing peeking
  - sample ratio mismatch
# examples: 2-5 realistic user prompts the skill SHOULD activate for.
# Written in the user's voice. Improves retrieval recall beyond keywords alone.
examples:
  - "we want to ship a change but aren't sure it actually helps — how do we A/B test it?"
  - "how many users do I need before an A/B result is trustworthy?"
  - "the variant looks better after two days — can we call it and ship?"
  - "we're testing five variants at once — how do we avoid a false winner?"
  - "the experiment was significant but the metric regressed in production — what went wrong?"
# anti_examples: near-miss prompts that should route ELSEWHERE.
# Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
anti_examples:
  - "explain p-values and confidence intervals in general"           # general statistics theory — out of scope (no statistical-analysis skill exists yet)
  - "how do we build an MVP to validate this startup idea?"           # → lean-startup (build-measure-learn without a powered causal comparison)
  - "design the eval suite for our LLM agent"                        # → eval-driven-development
  - "is this finished feature good enough to mark done?"             # → evaluation
  - "compute precision/recall for our classifier"                    # classic supervised-ML model metrics — out of scope (no model-evaluation skill exists yet)
# The five flat Understanding fields live in frontmatter; the `comprehension_state: present`
# marker lives in the audit-state.json sidecar, NOT here (AGENTS.md, ADR-0019).
# mental_model: the primitives of the concept and how they relate. One paragraph.
mental_model: "An experiment converts a belief that a change is better into evidence that it is. The primitives are a falsifiable hypothesis, a decision the result will drive, a randomization unit, treatment and control groups formed by random assignment, exposure/triggering rules, a minimum effect worth detecting, a primary metric plus guardrail and invariant metrics composed into an overall evaluation criterion, an analysis that estimates the treatment effect with its uncertainty, and a predeclared decision rule. Random assignment is the engine: it makes the two groups exchangeable in expectation so any measured difference is caused by the treatment and nothing else — the counterfactual of 'what would have happened without the change.' Everything else — power, sensitivity, integrity diagnostics, sequential correction, validity analysis — exists to protect that causal claim and to make a real effect detectable above noise."
# purpose: the problem this concept solves and why the field exists. One paragraph.
purpose: "This skill prevents agents and teams from shipping on conviction dressed up as data. Without experimentation discipline, teams confuse correlation with causation, read noise as signal, peek at running tests and stop on a lucky swing, optimize one metric while silently harming another, ignore broken traffic splits, turn post-hoc segment searches into false discoveries, and call an underpowered null a proof of no effect. Controlled experimentation replaces those failure modes with a discipline: randomize to isolate cause, size the test so a real effect is visible, pre-declare the metric and the threshold so the result can surprise you, watch the integrity diagnostics so a broken pipeline can't masquerade as a winner, and decide from the confidence interval on the effect rather than a bare significance verdict."
# concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
# MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
concept_boundary: "Experimentation owns the causal-comparison machinery: random assignment, power, metric composition, integrity diagnostics, sequential correction, and validity threats. It is not general statistics theory (the mechanics of distributions, estimators, and inference exist below it and are consumed by it); it is not the Lean Startup validation loop (which seeks cheap validated learning via an MVP and pivot/persevere decisions, often without a powered randomized comparison); it is not Bayesian belief updating (which revises a probability from a prior and may consume an experiment's posterior but does not by itself create exchangeable treatment and control groups); it is not iterating an LLM-system eval suite (a measurement harness for model behavior against tasks and graders, not a randomized causal test); it is not completion review of a finished deliverable; it is not adaptive-allocation/multi-armed-bandit optimization (which dynamically shifts traffic toward the better-performing arm to maximize cumulative reward — an exploit-while-you-learn objective that biases the per-arm estimate, not the fixed-split unbiased causal measurement an A/B test produces); and it is not computing supervised-model performance metrics on a fixed dataset (no treatment, no randomization)."
# analogy: one-sentence metaphor preserving the core mechanism.
analogy: "An experiment is a controlled coin-flip that decides which users see the change: because the flip — not any property of the users — determines the group, a difference between the groups can only have come from the change."
# misconception: the wrong mental model people bring; corrected explicitly.
misconception: "The common mistake is to treat experimentation as 'run an A/B test and read the p-value.' Most failed experiments fail at design time, not analysis time: the test was underpowered, the randomization unit didn't match the analysis unit, the metric was gameable or had no guardrail, the traffic split was broken (sample ratio mismatch), the treatment was diluted by never-exposed users, or units interfered with each other. A small p-value on a broken or underpowered design is not evidence; it is the appearance of evidence — and the p-value itself is the probability of data this extreme under the null, not the probability the hypothesis is true."
# relations: typed graph edges to sibling skills. Current fields:
# related (adjacency for browse / co-routing expansion) /
# suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
#             as "I own this exclusively over X", not "use X instead") /
# boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
# verify_with (cross-check; co-loaded as one-hop expansion) /
# depends_on (composition; transitive — A→B→C loads all three) /
# broader / narrower (SKOS-style generalization) /
# disjoint_with (mutual exclusion for incompatible ownership).
# NOTE: every target below is an existing sibling skill (lean-startup verified at
# skills/reasoning-strategy/lean-startup/SKILL.md). `statistical-analysis` and
# `model-evaluation` are named in prose boundaries but do NOT yet exist in the corpus,
# so they are deliberately NOT listed here (would be dangling edges).
relations:
  related: ["eval-driven-development", "evaluation", "bayesian-reasoning", "lean-startup"]
  suppresses: []
  verify_with: ["bayesian-reasoning"]
---
# Experimentation

## Concept of the skill

An experiment converts a *belief* that a change is better into *evidence* that it is. The discipline is not "run an A/B test and read the p-value" — it is designing the comparison so the measured difference is caused by the change and nothing else, sizing it so a real effect is detectable above noise, picking metrics that capture the decision you actually face, watching the integrity diagnostics that catch a broken pipeline, and reading the result without fooling yourself. Random assignment is the engine: it makes treatment and control exchangeable, so any difference between them can only have come from the treatment — the counterfactual of *what would have happened without the change*.

Most failed experiments fail before analysis. The unit was wrong, the metric was a proxy trap, the test was too small, users interfered with each other, a feature flag assigned users inconsistently, the result was peeked at until it looked significant, the treatment was diluted by users who never saw it, or a sample-ratio mismatch made every metric suspect. The agent's job is to protect the causal claim and the decision, not to decorate an already-made choice with statistics.

## Coverage

- **Decision and hypothesis framing** — the decision the experiment will drive, a falsifiable hypothesis, and the minimum effect worth shipping (the minimum detectable effect, MDE).
- **Randomization and units** — treatment, control, allocation ratio, unit of assignment, unit of analysis, why the randomization unit must match the analysis unit, deterministic salted-hash assignment, exposure/triggering rules, and the SUTVA assumption.
- **Power and sample size** — the four-way tradeoff between significance level (α), power (1−β), minimum detectable effect, and sample size; the runtime that implies; why underpowered tests produce both false negatives and inflated "winners" (the winner's curse — Type M magnitude and Type S sign errors).
- **Metric design** — primary metric, guardrail metrics (with non-inferiority margins), invariant/diagnostic metrics, and the overall evaluation criterion (OEC); leading vs lagging signals; metric sensitivity and the STEDII quality bar.
- **Increasing sensitivity (variance reduction)** — CUPED and its ML-covariate extension CUPAC, stratification/post-stratification, and triggered analysis — getting the same power from fewer users or less time.
- **Inference** — significance tests, confidence intervals on the effect size, reporting magnitude-with-uncertainty over a bare p-value, and the statistical-vs-practical-significance distinction; choosing a frequentist or Bayesian engine.
- **Sequential and anytime-valid analysis** — the peeking problem, fixed-horizon vs continuous monitoring, and the modern corrections: always-valid p-values, mixture SPRT, group-sequential boundaries, and confidence sequences.
- **Multiple comparisons and segments** — family-wise error and false-discovery control across metric, variant, segment, and interim-look families; post-hoc segments as diagnosis, not decisions.
- **The trust checklist** — sample ratio mismatch (SRM) as the first integrity gate, plus variant jumping, A/A checks, invariant-metric movement, exposure/logging integrity, and the validity threats: novelty/primacy, interference and SUTVA violations, Simpson's paradox, and survivorship.
- **Interference-aware designs** — cluster randomization, switchback designs, and carryover buffers for two-sided marketplaces, social networks, and other settings where units affect each other.
- **Long-term effects** — long-term holdouts (holdbacks) and reverse experiments to measure durable effects after novelty and primacy wash out, beyond the standard 1–4 week runtime.
- **Adaptive allocation** — multi-armed and contextual bandits as optimization tools, and the boundary from clean causal estimation.
- **Staged rollout and ramp** — increasing exposure in controlled steps to bound blast radius before committing to the full-power test.
- **Experiment ethics** — bounding blast radius, stop rules, and the heightened care owed to sensitive interventions (pricing, access, safety, vulnerable populations, deception, privacy).
- **Fallbacks when randomization is infeasible** — quasi-experimental designs (difference-in-differences, regression discontinuity, interrupted time series, synthetic control, matched observational), staged rollout with monitoring, smaller reversible bets, and honest causal-strength labels.

## Philosophy of the skill

The experiment is a guard against self-deception, not a ceremony to bless a decision already made. The discipline is deliberately front-loaded: decide what would count as success, failure, or harm before the result is visible. Three commitments make it honest:

1. **Pre-registration.** Decide the metric, the MDE, and the analysis *before* you look at data, so the result can surprise you. A decision rule chosen after seeing the data is not a decision rule.
2. **Confidence over thresholds.** Prefer the confidence interval on the effect over a binary "significant?", so you reason about magnitude and uncertainty rather than a single threshold.
3. **A clean null is a real finding.** A properly powered test that finds no effect has *stopped* a change — a win. (A null from an underpowered test has found nothing.)

A fourth principle underlies all three: the experiment's **trustworthiness** is more important than its result. An experiment with a broken split (SRM), a gameable metric, a diluted treatment effect, or a peek-driven false positive is not merely uninformative — it is actively misleading. The integrity diagnostics come first, because a beautiful p-value on a broken experiment is worse than no number at all: it is confident, and wrong. When a controlled experiment is infeasible, the honest move is to name the weaker evidence and reduce the bet, not to call an observational pattern an A/B test.

## The experiment lifecycle

1. **Frame the decision.** State the hypothesis, the decision and its owner, the launch/rollback options, the primary metric + OEC, and the MDE — the smallest effect that would change the decision — *before* touching data.
2. **Design the comparison.** Choose treatment, control, randomization unit, analysis unit, allocation ratio, eligibility, exposure trigger, and holdout/cooldown rules. Confirm the randomization unit matches the analysis unit and that SUTVA is plausible (or pick an interference-aware design).
3. **Choose metrics.** Declare one primary metric or OEC, guardrails (with veto thresholds), and invariant/diagnostic metrics. Decide which guardrail vetoes launch.
4. **Power the test.** Plug baseline rate/variance, α, target power, and the MDE into a power calculation to derive sample size and runtime. Fix the horizon — unless using a valid sequential method.
5. **Instrument and dry-run.** Implement deterministic assignment, exposure logging, and metric definitions. Verify with an A/A test or a tiny ramp when the pipeline is new or risky; run the SRM check before scaling.
6. **Ramp safely.** Raise exposure in steps (e.g., 1% → 5% → 25% → 50%), watching only guardrails and integrity diagnostics for abort decisions; abort early on a clear guardrail or safety breach.
7. **Run to the decision rule.** Collect the pre-committed sample. Do not stop on a lucky interim swing under fixed-horizon inference; if early stopping is required, the sequential method was predeclared.
8. **Validate before interpreting.** Confirm SRM is clean, then check variant jumping, missing/asymmetric data, invariant metrics, and exposure logs — *before* reading the primary effect.
9. **Analyze the effect.** Estimate the effect size and its confidence interval; apply variance reduction and multiple-comparison correction where predeclared; segment for Simpson's paradox and disparate harm.
10. **Decide and record.** Apply the pre-declared decision rule (ship / iterate / abandon / rerun) against the confidence interval, guardrails, and validity threats. Preserve the result as institutional memory.

## Hypothesis and decision framing

A usable hypothesis is **falsifiable** and **tied to a decision**:

```text
If we ship treatment T to population P, metric M will improve by at least X
within window W, while guardrails G stay inside thresholds. If that happens, we
ship; if the interval excludes X, we abandon; otherwise we iterate.
```

Declare the **minimum detectable effect** — the smallest effect that would actually change your decision — up front. A test powered to detect a 5% lift but reporting a non-significant 0.5% result has *not* shown the change is useless; it was never able to see an effect that small. The MDE, not the eventual p-value, is what makes a null result meaningful. If a 0.5% lift is worth shipping, power for it; if the required sample is impossible, say experimentation cannot answer the question at the desired precision. (Some teams pair the MDE with a *region of practical equivalence* — the band of effects treated as "no meaningful difference" — to make the abandon decision explicit.)

### The experiment brief

Pre-registering the design is what makes the result able to surprise you. A minimal brief fixes every degree of freedom an analyst could otherwise exploit post-hoc:

| Field | What it pins down |
|---|---|
| Hypothesis | The falsifiable claim and the mechanism you expect. |
| Decision | What ship / iterate / abandon outcome each result drives. |
| Randomization & analysis unit | The unit assigned and the unit analyzed — and that they match. |
| Primary metric + OEC | The single metric the decision hinges on, plus the composite objective. |
| Guardrail metrics | The must-not-harm signals (incl. the harms you'd refuse to inflict) and veto thresholds. |
| MDE, α, power | The smallest effect worth detecting, and the error rates. |
| Sample size & horizon | The computed N and runtime — fixed, not "until it looks good." |
| Analysis plan | Variance-reduction covariate, multiple-comparison correction, segments — all named in advance. |
| Stop rule | The pre-declared condition that aborts the run regardless of the primary metric. |

A copy-and-fill template (mark unknown fields explicitly and decide whether the gap blocks launch):

```text
Experiment:
Decision this will drive (and owner):
Hypothesis:
Treatment / Control:
Eligibility population:
Exposure/trigger definition:
Randomization unit / Analysis unit:
Allocation ratio:
Primary metric or OEC:
Guardrail metrics and veto thresholds:
Invariant/diagnostic metrics:
Minimum detectable effect:
Baseline rate/variance:
Power and significance target:
Target sample and runtime:
Sequential method, if any:
Multiple-comparison family:
Long-term holdout or reversal plan:
Known interference/carryover risk:
Ethical/privacy/risk review:
Decision rule:
```

If a field can't be filled, the experiment isn't ready to launch — that gap is the finding.

## Randomization and units

Random assignment is what licenses the causal claim. Choose the unit deliberately:

| Unit | Use when | Watch for |
|---|---|---|
| Request / page view | Stateless systems where each event is independent | Correlated events from the same user inflate the effective sample size |
| Session | Experience can vary by visit | Cross-session learning or cookies can contaminate |
| User | User experience must be consistent | Shared accounts, multiple devices, social/network spillovers |
| Account / company | B2B or team product where users interact | Fewer units, lower power, clustered outcomes |
| Geography / market / cluster | Marketplaces, social graphs, shared-resource systems | More complex analysis, cluster imbalance |
| Time window / switchback | Whole system must be in one mode at a time | Carryover, seasonality, time trends |

Two rules matter most:

- **The randomization unit must match (or be modeled against) the analysis unit.** If you randomize by user but analyze by page-view, correlated observations within a user shrink your true sample size and inflate false positives.
- **SUTVA must hold** — the *stable unit treatment value assumption*: one unit's assignment must not change another unit's outcome. In marketplaces, social graphs, shared-resource systems, and anything with network effects, SUTVA breaks and a naive user-level A/B test is biased. See *Interference* below.

A coarser unit (account, cluster) reduces interference but costs power; a finer unit (request) gives power but risks correlated-observation and interference bias.

**Implement assignment deterministically.** Hash the unit identifier together with a per-experiment salt — `bucket = hash(unit_id + experiment_salt) mod N` — rather than store a random coin-flip per unit. Two properties fall out and both matter for validity: assignment is **sticky** (the same unit lands in the same arm on every request and across sessions with no state to persist), and a distinct salt per experiment makes **concurrent experiments independently randomized** (orthogonal). Salts alone, however, do not prevent cross-experiment *layer effects* when many tests overlap — manage concurrency with namespaces, mutual-exclusion zones, or orthogonal layering so overlapping experiments don't confound each other. A broken, shared, or mid-flight-changed salt (or changed identity stitching) is a common root cause of sample ratio mismatch and variant jumping — verify the split before trusting any result.

## Power and sample size

Sample size is governed by four interlocking quantities — fix three and the fourth follows:

| Quantity | What it controls |
|---|---|
| α (significance level) | False-positive rate — concluding an effect that isn't there. |
| Power (1−β) | True-positive rate — detecting an effect that is there (80–90% is typical). |
| MDE (minimum detectable effect) | The smallest effect you care to detect. Halving the MDE roughly quadruples the required sample. |
| Sample size / runtime | Falls out of the other three plus the metric's baseline variance. |

Run the power calculation **before** launch and commit to the resulting horizon. Low-base-rate events and high-variance revenue metrics need far more traffic than common binary actions; clustered designs need more units because within-cluster outcomes are correlated; ratio metrics, quantiles, and long-window retention need extra care. Two failure modes this prevents: shipping on an **underpowered** test (noisy, often-overstated "winners" — the winner's curse, where the published effect is inflated in magnitude (Type M) and sometimes wrong in sign (Type S)), and **peeking** to stop as soon as significance is crossed (which inflates the false-positive rate far above α — see below). Do not say "no effect" when the test could not detect the effect the business cares about; the honest conclusion is "we did not detect an effect at this MDE with this sample."

Also size **runtime to full business cycles.** Reaching the sample-size number in four days does not license stopping if behavior differs weekday vs weekend — run in full weekly increments when day-of-week effects exist, so the estimate is not a slice of one part of the cycle.

## Metric design

Good metric design prevents local optimization from becoming product damage.

| Metric type | Purpose | Example |
|---|---|---|
| Primary | The single decision signal | Activation rate, 7-day retention, revenue per eligible user |
| OEC | Composite/north-star believed to drive long-term value | Utility-weighted engagement; good conversions minus bad |
| Guardrail | Must-not-harm signal (with a non-inferiority margin) | Latency, crash rate, unsubscribe, refund rate, support contacts |
| Invariant/diagnostic | Should NOT move if randomization/logging is correct | Assignment ratio, pre-period activity, user-agent mix |
| Local/supporting | Explains mechanism but does not decide alone | Click on new affordance, funnel step, feature coverage |

Use exactly one primary decision signal when possible; if several decide jointly, predeclare the OEC or the tradeoff rule. A variant that wins the primary while breaching a guardrail is not a winner. Declare a **non-inferiority margin** for each guardrail (how much regression is tolerable) before the test runs. A local click increase that does not move the OEC is a mechanism clue, not a shipping verdict. Optimizing a narrow proxy (clicks) while the OEC (long-term retention/revenue) is flat or negative is the classic metric trap. Prefer **sensitive** metrics — enough movement and low enough variance to detect realistic effects in a feasible sample; a good metric is *Sensitive, Trustworthy, Efficient/timely, Debuggable, Interpretable, and Inclusive* (the STEDII bar).

## Increasing sensitivity: variance reduction

You can buy power without buying more users by reducing the metric's variance:

- **CUPED** (Controlled-experiment Using Pre-Experiment Data; Deng, Xu, Kohavi & Walker, WSDM 2013) uses each unit's pre-experiment values as a covariate to subtract out predictable variation. The adjustment is typically `Y_adjusted = Y − θ·(X − mean(X))` with `θ = cov(Y, X) / var(X)`; the approximate variance reduction is `ρ²`, where `ρ` is the covariate-outcome correlation. So `ρ = 0.3` buys only ~9% reduction while `ρ = 0.5` buys ~25% and `ρ = 0.7` roughly halves the required sample. There is **no magic correlation cutoff** — use the *expected* reduction (and check the *achieved* reduction) to decide whether the added instrumentation is worth it; weakly correlated covariates rarely justify the machinery.
- **CUPAC** (Control Using Predictions As Covariates; DoorDash) generalizes CUPED by replacing the single pre-period covariate with a machine-learned prediction of the outcome built from many pre-experiment features — a stronger covariate yields more reduction when a simple pre-period metric correlates only weakly.
- **Stratification / post-stratification** — block on known high-variance covariates (platform, country, device, account tier) so imbalance can't masquerade as effect.
- **Triggered analysis** — analyze only units actually *exposed* to the change (those who reached the triggering surface). The flip side is **dilution**: when a treatment reaches only a subset but you analyze everyone, the never-exposed majority pulls the effect toward zero and silently underpowers the test. Trigger on exposure to recover sensitivity — but also report the diluted (intent-to-treat) effect, because that is what lands on the full population.

Variance reduction is leverage, not magic: the covariate must be genuinely correlated with the outcome, **unaffected by treatment** (use pre-experiment data only), and specified before analysis. Do not mine covariates after seeing the result to rescue a preferred conclusion.

## Inference: confidence intervals over p-values

Report the **effect size with a confidence interval**, not just "significant / not significant." A p-value answers a yes/no question and hides magnitude; the interval tells you the best estimate *and* the range of effects still consistent with the data. Two results can both be "p < 0.05" while one is a trivial 0.1% lift and the other a decision-changing 8% lift. **Practical** significance (is the effect big enough to matter and to outweigh costs?) is a separate question from **statistical** significance and must be answered explicitly. The two combine into a decision grid:

| | Practically significant | Not practically significant |
|---|---|---|
| **Statistically significant** | Ship — the change works and the effect matters | Consider not shipping — confident, but the effect is too small to justify cost |
| **Not statistically significant** | Rerun with more power — promising point estimate, too much uncertainty | Iterate or abandon — the data does not support the hypothesis |

Choosing the **engine**: a frequentist test (p-values, confidence intervals, strict null-hypothesis control) suits strategic ship/no-ship decisions with predeclared error rates; a Bayesian readout ("probability the variant beats control," expected loss) suits continuous decision-making, small samples, and communicating intuitive probability statements to stakeholders. Pick one before launch, not after.

## Sequential analysis and the peeking problem

A fixed-horizon test computes its p-value **once**, at the pre-committed sample size. If you instead check the running result repeatedly and stop the first time it crosses significance, your real false-positive rate is far above α — "peeking" turns a 5% nominal rate into 20–40%+ because you gave noise many chances to cross. The honest options:

- **Don't peek for the decision** — monitor only guardrails and SRM mid-flight; make the ship call at the horizon.
- **Group-sequential boundaries** (O'Brien–Fleming, Pocock) — pre-planned interim looks with spent-α boundaries (the clinical-trials lineage); requires estimating total sample size in advance.
- **Always-valid inference** (Johari et al., 2017) — always-valid p-values and **mixture SPRT (mSPRT)** produce a p-value/interval valid at *every* stopping time, with no pre-specified look schedule; the trade is slightly less power than a well-calibrated group-sequential design when N is known accurately.
- **Confidence sequences** — time-uniform intervals with anytime coverage, robust to peeking, increasingly standard in enterprise platforms and continuous-monitoring dashboards.

Sequential methods trade a little peak power for the right to stop early; they are **not** a license to revert to naive peeking on a fixed-horizon test.

## Multiple comparisons and segments

Testing many variants or metrics multiplies the chance of a spurious "winner": at α = 0.05, twenty independent comparisons expect ~1 false positive by chance alone.

- **Family-wise error** (Bonferroni / Holm) when any single false positive is costly.
- **False-discovery rate** (Benjamini–Hochberg) when you can tolerate a known fraction of false discoveries among many tests — usually the better fit for large metric suites.
- **Pre-register the comparison family and the correction** so the correction can't be chosen after seeing which result you'd like to keep. Do not over-correct on a small number of planned tests — match the correction to the family size.
- **Post-hoc segments are diagnosis, not decisions** — a slice that "wins" only after the fact is a hypothesis for the next test unless it was predeclared as a decision slice. But a high-risk slice can still *veto* a launch even when the average improves.

## The trust checklist: integrity diagnostics and validity threats

Before trusting any result, run the integrity gates. **Twyman's law**: *any figure that looks interesting or different is usually wrong* — surprising results deserve more scrutiny, not less. Treat SRM, invariant failures, and implausibly large movement as data-quality findings, not "interesting segments," and do not interpret the primary effect until the failure is diagnosed or the experiment rerun.

**Integrity diagnostics (run before reading the primary metric):**

- **Sample Ratio Mismatch (SRM)** — the first and most reliable integrity check. If you targeted a 50/50 split but observe a statistically significant deviation (chi-square goodness-of-fit), the assignment, tracking, or delivery is broken and **the result is invalid regardless of how significant the metric looks**. Use a *conservative* threshold for this repeated alarm (e.g., p < 0.0005, equivalently X² ≳ 12 for a two-arm split) rather than the ordinary 0.05, since it runs on every experiment; diagnose the pipeline before interpreting anything. Checking SRM is a data-quality diagnostic, not a hypothesis test, so it does *not* inflate false positives — always run it.
- **Variant jumping** — the same unit appears in multiple variants because bucketing keys, cookies, identity stitching, or seeds are unstable.
- **Exposure / logging mismatch** — units assigned but not exposed (or exposed but not logged); one arm changes logging, page lifecycle, bot filtering, or crash behavior asymmetrically.
- **Invariant-metric movement** — a pre-treatment covariate or impossible-to-change diagnostic moves, signalling imbalance or instrumentation failure.
- **A/A failure** — a no-op split shows false movement, meaning the platform, metric, or analysis pipeline is not trustworthy.

**Validity threats (consider before concluding):**

- **Novelty and primacy effects** — early behavior (curiosity-driven clicks; habituated users resisting change) is not durable. Let effects stabilize, run at least 2–3 weeks where these are plausible, segment new vs returning users, and inspect the time trend.
- **Interference / SUTVA violations** — treated units affecting control units (shared budgets, marketplaces, social graphs) bias the estimate. Detect via cluster-level checks; fix with an interference-aware design.
- **Simpson's paradox** — an aggregate effect can reverse within every subgroup when group sizes shift between arms. Segment before trusting the pooled number, especially under SRM or ramp changes; if aggregate and segment stories conflict, diagnose allocation/exposure/eligibility/weighting before deciding.
- **Survivorship** — analyzing only units that "survived" (completed, didn't churn, stayed logged in) silently conditions on an outcome and biases the comparison.
- **Carryover** — a unit's experience in one period affecting its behavior in the next (especially in switchbacks).

## Interference: when units affect each other

When one unit's treatment changes another's outcome, the standard user-level A/B test is biased (SUTVA fails) — in marketplaces, social feeds, ranking systems, auctions, inventory, collaboration products, and pricing experiments. Repairs:

- **Cluster randomization** — randomize *groups* (geographies, markets, social communities, accounts, graph clusters) rather than individuals, so most interactions stay within a single arm. Holtz et al. (Airbnb pricing meta-experiment, *Management Science*) showed cluster randomization materially reduces interference bias versus naive user-level tests, at a power cost. **Ego-cluster** designs build clusters around focal "ego" nodes with a buffer to absorb spillover when a clean partition isn't available.
- **Switchback experiments** — alternate the whole system between treatment and control over time windows, so each window is internally consistent; common for two-sided marketplaces and ride-sharing where markets must clear. Watch for carryover; add **washout/carryover buffers** between windows when effects persist.
- **Partial-interference estimators** — when interference is limited (e.g., 1-hop neighbors), specialized estimators with exposure indicators can recover unbiased effects; state which estimand (direct, spillover, or total effect) you target.

Both design families trade power and complexity for an unbiased estimate. The decision is which bias you can least afford.

## Measuring long-term effects: holdouts and reverse experiments

A standard 1–4 week test measures the *short-term* effect, but the effect that matters is often the durable one — and short-term and long-term effects routinely diverge (novelty fades; learning effects grow; a click-bait win erodes retention months later). Two designs measure the long run:

- **Long-term holdout (holdback)** — keep a small, randomly-assigned slice of users *out* of the treatment for an extended period (weeks to months) after the feature ships to everyone else. The persistent gap between the held-back control and the treated population estimates the durable effect, after novelty and primacy have washed out. Costs: denying a (presumed) improvement to the holdout, and the power penalty of a small control.
- **Reverse experiment** — after a feature has shipped to 100%, *re-introduce* a control by turning it back off for a fresh random slice. The treated-vs-reverted gap measures the long-run value of a feature whose users have fully adapted — useful when no holdout was reserved at launch, or to re-confirm a long-shipped feature still earns its keep (and its maintenance cost).

Both convert "we measured a 2-week lift" into "we know the effect is still real at 3 months." Without one of them, a durable-effect claim from a short test is an extrapolation, not a measurement. Keep the holdout/reversal population small, the assignment stable, the guardrails protected, and the stop rule defined.

## Staged rollout and ramp

Don't jump straight to full-power exposure. Ramp the treatment in steps (e.g., 1% → 5% → 25% → 50%), checking SRM and guardrails at each step. Ramping bounds the blast radius of a bad change, surfaces instrumentation bugs before they pollute the full sample, and lets you abort cheaply. Note that a staged rollout whose goal is *stability/safety* (does it crash? does latency hold?) is a different activity from a *causal experiment* (does it move the metric?) — use the ramp for both, but don't mistake a clean rollout for a measured lift. Only once the system is stable and the split is clean do you run the powered comparison to its committed horizon.

## Platform mechanics are not experiment design

Feature flags, gates, canary releases, warehouse-native experimentation platforms, SDKs, and (increasingly) MCP integrations that let agents create/inspect experiments are the **execution and control plane** — they decide *who sees what* and *show you numbers*. They can assign variants, run SRM checks, apply CUPED, expose sequential-test outputs, and support staged rollout. They are **not** the experiment. A flag platform will happily split traffic, render a significance badge, and let you flip a winner without ever asking for a falsifiable hypothesis, a matched randomization/analysis unit, a powered sample size, a guardrail set, a stop rule, or a pre-declared decision rule. The dashboard's green "significant" light is a fixed-horizon p-value that does not know whether you peeked, whether SRM is clean, or whether the metric is gameable.

The agent still owns: the hypothesis and decision rule; the right randomization and analysis unit; the metric and guardrail contract; the risk and ethics review; the validity checks before interpretation; and the final decision from effect size, uncertainty, and guardrails. Use the platform to *implement* a design you already framed — never let the tooling's defaults stand in for the design-time judgment. "The platform says winner" is shipping on conviction with extra steps.

## Bandits and adaptive allocation — a different evidence shape

A multi-armed bandit is *not* an A/B test, and reaching for one when you needed the other is a category error. A fixed-split A/B test holds the allocation constant and spends traffic to **measure** each arm's effect with an unbiased estimate and a clean confidence interval — its product is *evidence*. A bandit continuously reallocates traffic toward whichever arm is performing better, to **maximize cumulative reward** (minimize regret) over the run — its product is *earnings*. That adaptive allocation is exactly what biases the per-arm estimate: arms are no longer observed under a stable, exchangeable split, so the naive arm means are confounded with the allocation policy and standard fixed-horizon inference does not apply (valid post-bandit inference needs adaptively-weighted estimators).

| | Fixed-split A/B test | Bandit / adaptive allocation |
|---|---|---|
| Objective | Unbiased causal estimate (learning) | Maximize cumulative reward (earning) |
| Allocation | Constant | Shifts toward the leader (Thompson sampling, ε-greedy) |
| Best for | Strategic, long-lived decisions; guardrail reads; defensible effect sizes | Short-lived campaigns, many interchangeable arms, time-sensitive optimization |
| Caution | Costs traffic to losing arms | Needs a stopping/duration cap and a minimum per-arm volume |

The two compose: a bandit to prune the variant space, then a fixed-split confirmation of the survivor. But a bandit's headline "winner" is an optimization outcome, not a powered causal result.

## Experiment ethics and blast radius

An experiment is a real intervention on real people, not a thought exercise — so the decision is not only "is it valid?" but "is it acceptable to run?" Escalate or redesign when the experiment changes **pricing, access, eligibility, safety, health, finance, employment, or education**; uses **deception, emotional manipulation, dark patterns, or hidden scarcity**; affects **children, vulnerable populations, or bystanders**; collects **sensitive data beyond normal product expectation**; or could cause **irreversible harm** before detection. The guardrails:

- **Bound the blast radius** — ramp from a small exposure, and size the *worst-case* harm (not just the expected effect) before scaling. Guardrail metrics should include the harms you would refuse to inflict, not only business KPIs.
- **Write a stop rule up front** — the pre-declared condition (a safety-guardrail breach, an SRM that won't clear, evidence of harm to a subgroup) under which you abort regardless of the primary metric. A stop rule decided after the fact is not a stop rule.
- **Don't experiment where consent or reversibility is absent** — irreversible, high-stakes, or non-consensual interventions belong in a different decision process (review, staged rollout with monitoring, quasi-experiment), not a live A/B test.
- **Segment for disparate harm** — an effect that is neutral in aggregate can harm a vulnerable subgroup (the same mechanism as Simpson's paradox, applied to ethics rather than validity). Check it.

For ordinary low-risk UI/product tests, staged rollout plus guardrails may be enough; for sensitive experiments, require explicit review, consent or notice where appropriate, tight blast-radius limits, and a stop rule allowed to override the primary metric. The validity machinery answers "can I trust this number?"; the ethics machinery answers "should I have produced it this way?" Both gates must pass.

## When randomization is infeasible

Sometimes a clean controlled experiment is impossible: traffic is too low, the treatment is irreversible, the population is too small, network effects dominate, or ethics forbids randomization. Do not pretend a weaker design is an A/B test — use the strongest feasible alternative and **label the causal strength honestly**:

| Alternative | Use when | Caveat |
|---|---|---|
| Difference-in-differences | Treated and comparison groups have parallel pre-trends | The parallel-trend assumption must be checked |
| Regression discontinuity | Assignment changes at a threshold | Only local around the threshold |
| Interrupted time series | Whole system changes at a known time | Seasonality and concurrent changes can confound |
| Synthetic control | One treated unit (e.g., a region); construct a weighted combination of controls | Needs a stable pre-treatment match; sensitive to donor pool |
| Matched observational comparison | No randomization, but rich covariates exist | Unobserved confounding remains |
| Staged rollout with monitoring | Safety/risk control matters more than causal proof | Good for blast radius, weak for effect estimation |

Quasi-experiments carry a higher risk of spurious causality — lower your confidence in the *magnitude*, prioritize guardrails, and treat feature-flagged rollouts as a series of mini-experiments with high-resolution observability. If none can answer the decision, say so; the next best action may be a smaller reversible bet, a qualitative study, or a Bayesian update from weaker evidence.

## Reading and reporting results

Report in a way that preserves uncertainty and prevents post-hoc storytelling:

```text
Result:
- Experiment ID / dates:
- Treatment and control:
- Randomization unit / analysis unit:
- Eligibility and exposure count:
- SRM and invariant checks:
- Primary metric estimate + effect size and interval:
- Guardrail outcomes:
- Multiple-comparison adjustment:
- Sequential method or fixed horizon:
- Segment/slice vetoes:
- Validity threats considered:
- Decision against the predeclared rule:
- Follow-up / cleanup (holdout? cleanup of flags?):
```

Decision guidance:

- **Ship** when the effect interval clears the practical threshold, guardrails are clean, and validity checks hold.
- **Iterate** when the interval includes both useful and useless effects, diagnostics are clean, and a narrower next test can answer the question.
- **Abandon** when a powered test excludes a worthwhile effect, or a guardrail breach dominates the primary win.
- **Rerun** when SRM, logging, interference, or another integrity failure makes the result untrustworthy.

A clean null from a properly powered test is a useful result — it stopped a change not worth shipping. A null from an underpowered test is not a result; it is an inconclusive measurement.

## Verification

After applying this skill, verify:

- [ ] A stated, falsifiable hypothesis with a pre-declared primary metric + OEC + MDE before launch.
- [ ] A power/sample-size calculation (or a valid sequential design) that fixes a target sample/runtime before any peeking, with runtime covering full business cycles where day-of-week effects exist.
- [ ] Randomization unit, analysis unit, exposure trigger, eligibility, and allocation ratio explicit; the randomization unit matches the analysis unit; SUTVA is plausible or an interference-aware design is chosen.
- [ ] Deterministic/stable assignment, and instrumentation/logging checked (A/A or tiny ramp) before scale-up.
- [ ] Guardrail metrics declared with non-inferiority margins so a "winning" variant that harms a guardrail is caught.
- [ ] **SRM checked and clean** (conservative threshold) before any metric is interpreted; variant jumping, missing/asymmetric data, and invariant metrics also checked.
- [ ] Multiple-comparison correction applied and pre-registered across variant, metric, segment, and interim-look families; post-hoc segments treated as diagnosis.
- [ ] A decision rule (ship / iterate / abandon) tied to the confidence interval on the effect, not a bare p-value, with practical significance stated separately from statistical significance.
- [ ] Interference, carryover, novelty/primacy, Simpson's paradox, and survivorship explicitly considered before the result is trusted.
- [ ] For a sensitive intervention: a written stop rule, a bounded blast radius, and a disparate-harm segmentation check before the result is acted on.
- [ ] If randomization was infeasible, the answer names the weaker design and does not overclaim causal certainty.

## Do NOT Use When

| Need | Use instead |
|---|---|
| General descriptive/inferential statistics *theory* (distributions, estimators, p-values/CIs in the abstract, detached from an experiment decision) | General statistics — no dedicated `statistical-analysis` skill exists in this library yet |
| Validating a new product/venture idea through an MVP and build-measure-learn loop — learning cheaply *without* a powered randomized comparison; pivot/persevere decisions | `lean-startup` |
| Building or iterating an LLM-system eval suite (measured against tasks/graders, not randomized exposure) | `eval-driven-development` |
| Reviewing whether a finished deliverable meets its acceptance criteria | `evaluation` |
| Updating a belief/probability from a prior given new evidence, without a randomized comparison | `bayesian-reasoning` |
| Exploiting while you learn — dynamically routing traffic to the better arm to maximize cumulative reward across interchangeable variants, with no need for a defensible per-arm causal estimate | A multi-armed **bandit / adaptive allocation** (see *Bandits*) — no dedicated `adaptive-allocation` skill exists yet |
| Computing classic supervised-ML model performance metrics on a fixed dataset (precision/recall/F1/ROC-AUC; no treatment, no randomization) | ML model evaluation — no dedicated `model-evaluation` skill exists in this library yet |

## References

Provenance for each source is recorded in `grounding.truth_sources` above (with a one-line note per source).

- Kohavi, Tang & Xu — *Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing* (Cambridge, 2020). The canonical practitioner text; its ethics chapter grounds the experiment-ethics section.
- Deng, Xu, Kohavi & Walker — *Improving the Sensitivity of Online Controlled Experiments by Utilizing Pre-Experiment Data* (CUPED), WSDM 2013.
- DoorDash — *Improving Experimental Power through Control Using Predictions As Covariate (CUPAC).*
- Johari, Pekelis, Walsh & Koomen — *Peeking at A/B Tests: Why It Matters and What to Do About It* (always-valid p-values), KDD 2017.
- Microsoft Research — *Diagnosing Sample Ratio Mismatch in A/B Testing* and the ExP *Patterns of Trustworthy Experimentation.*
- Holtz et al. — *Reducing Interference Bias in Online Marketplace Experiments Using Cluster Randomization* (Airbnb pricing meta-experiment), *Management Science.*
