---
name: bayesian-reasoning
description: "Use when uncertainty must be updated after new evidence: start with a prior or base rate, estimate how strongly the evidence fits each hypothesis, update to a posterior, and decide what evidence would change the belief next. Covers priors, base rates, likelihood ratios, posterior odds, calibration, evidence independence, false positives in rare events, and base-rate neglect. Do NOT use for decomposing assumptions to primitives (use first-principles-thinking), tracing downstream consequences (use second-order-thinking), recurring issue clustering (use pattern-recognition), or formal source-to-claim citation (use epistemic-grounding)."
license: MIT
allowed-tools: Read Grep
metadata:
  schema_version: 7
  version: "1.0.0"
  type: capability
  category: foundations
  domain: foundations/reasoning
  scope: portable
  owner: skill-graph-maintainer
  freshness: "2026-05-21"
  drift_check:
    last_verified: "2026-05-21"
  eval_artifacts: present
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: experimental
  keywords:
    - bayesian reasoning
    - bayesian updating
    - prior probability
    - posterior probability
    - base rate
    - likelihood ratio
    - update beliefs
    - evidence strength
    - false positive rare event
    - base-rate neglect
  triggers:
    - update the probability
    - what is the posterior
    - account for the base rate
    - how much should this evidence change my belief
    - reason under uncertainty
  examples:
    - "The alert fired, but the event is rare. How should I update my belief?"
    - "We have a prior estimate and a new signal. What is the posterior?"
    - "This evidence feels convincing, but how diagnostic is it really?"
    - "Do not ignore the base rate when interpreting this test result."
  anti_examples:
    - "Break this assumption down to first principles."
    - "What second-order effects will this policy create?"
    - "Cluster these repeated incidents into patterns."
    - "Cite the source that supports this claim."
  relations:
    related:
      - epistemic-grounding
      - first-principles-thinking
      - second-order-thinking
      - mental-models
      - pattern-recognition
      - prioritization
      - evaluation
    verify_with:
      - epistemic-grounding
      - evaluation
  mental_model: |
    Bayesian reasoning has five primitives: hypothesis, prior, evidence, likelihood, and posterior. A hypothesis is a possible state of the world. A prior is the belief before the current evidence, usually anchored in a base rate. Evidence is an observation. A likelihood asks how expected that evidence would be if each hypothesis were true. The posterior is the updated belief after the prior is multiplied by the evidence's diagnostic strength. Evidence moves belief only when it is more expected under one hypothesis than under its alternatives.
  purpose: |
    Replaces certainty jumps and anecdote-driven belief with explicit belief updating under uncertainty. People often treat vivid new evidence as decisive, ignore base rates, double-count correlated signals, or refuse to update because no evidence feels perfect. Bayesian reasoning makes the starting belief, the strength of the evidence, and the remaining uncertainty visible enough to act or seek better evidence.
  boundary: |
    Distinct from first-principles thinking, which asks which premises are primitive before a solution is built; Bayesian reasoning assumes candidate hypotheses exist and updates their plausibility after evidence arrives. Distinct from second-order thinking, which traces consequences of an intervention through time; Bayesian reasoning estimates which hypothesis best explains current evidence. Distinct from pattern-recognition, which clusters repeated observations; Bayesian reasoning updates belief about a specific hypothesis or class. Distinct from epistemic-grounding, which marks source support and warrants; Bayesian reasoning weighs how much evidence should change a belief.
  analogy: "Bayesian reasoning is like adjusting a map after each landmark: the old map matters, the new landmark matters, and the correction depends on how diagnostic the landmark is."
  misconception: |
    The common misconception is that Bayesian reasoning requires exact numbers for everything. Exact probabilities are useful when available, but the core discipline is comparative: start with the base rate, ask whether the evidence is more expected under one hypothesis than another, avoid double-counting, and state how the belief changed. Qualitative Bayesian reasoning is still useful when the numbers are rough, as long as the roughness is explicit.
  portability:
    readiness: declared
    targets:
      - skill-md
  lifecycle:
    stale_after_days: 365
    review_cadence: quarterly
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v7
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/foundations/bayesian-reasoning/SKILL.md
  structural_verdict: UNVERIFIED
  truth_verdict: UNVERIFIED
  comprehension_verdict: UNVERIFIED
  application_verdict: UNVERIFIED
---

## Concept Card

**What it is:** Bayesian reasoning is the discipline of updating belief under uncertainty by combining a prior belief or base rate with evidence strength to produce a posterior belief.

**Mental model:** Start with what was plausible before the new evidence. Ask how expected the evidence is if each hypothesis is true. Evidence that is much more expected under one hypothesis moves belief strongly; evidence that is equally expected under all hypotheses should barely move belief.

**Why it exists:** New evidence is easy to overweight when it is vivid and easy to underweight when it is probabilistic. Bayesian reasoning keeps belief updates proportional to the evidence instead of to confidence, fear, recency, or narrative fit.

**What it is NOT:** It is not first-principles decomposition, not expected-value payoff ranking, not second-order consequence tracing, not source citation, and not a requirement to invent fake precision.

**Adjacent concepts:** epistemic grounding, first-principles thinking, expected value, pattern recognition, mental models, evaluation.

**One-line analogy:** Bayesian reasoning is steering by both the old compass reading and the new landmark, not by whichever one feels louder.

**Common misconception:** The trap is thinking rough numbers make the method invalid. Rough estimates can still prevent base-rate neglect and evidence overweighting when the uncertainty is stated honestly.

# Bayesian Reasoning

## Coverage

Bayesian reasoning covers belief updates when the truth is uncertain and evidence arrives. It includes priors, base rates, likelihood ratios, posterior odds, false-positive reasoning in rare events, calibration, evidence independence, selection effects, absence of evidence, and decision thresholds.

Use this skill when the question sounds like:

- "How much should this evidence change my belief?"
- "What is the base rate before we react to this signal?"
- "Is this alert convincing if the underlying event is rare?"
- "Are we double-counting correlated evidence?"
- "What evidence would make us update again?"

## Philosophy

Belief usually changes too much or too little. A dramatic example can make a rare event feel common. A weak signal can feel decisive because it confirms an existing story. A base rate can be ignored because the current case feels special. On the other side, a team can refuse to update because every single piece of evidence is imperfect.

Bayesian reasoning prevents both mistakes by separating three questions:

- What did we believe before this evidence?
- How diagnostic is the evidence?
- What do we believe after updating?

The goal is not mathematical theater. The goal is calibrated action: change confidence by the right amount, name what remains uncertain, and identify the next observation that would matter.

## The Workflow

### 1. State the hypotheses

Name the competing explanations or states.

Bad: "Is this bad?"

Better: "Hypothesis A: the failure is caused by a recent code change. Hypothesis B: the failure is caused by an external outage."

At minimum, compare the focal hypothesis against a real alternative. Updating against no alternative turns Bayesian reasoning into confirmation bias.

### 2. Set the prior

State the belief before the current evidence.

Good priors can come from:

- base rates from similar cases
- historical frequency
- known prevalence in the population being considered
- previous verified evidence
- a deliberately rough estimate when no measurement exists

If no numeric prior is defensible, use a qualitative one: rare, uncommon, plausible, common, or expected. Mark it as rough.

### 3. Describe the evidence

Separate the evidence from the interpretation.

Bad: "The system is definitely compromised."

Better: "A high-severity alert fired once on an event type with a historically low true-positive rate."

Evidence should be observable. Interpretation is what the update produces.

### 4. Estimate diagnostic strength

Ask the likelihood question for each hypothesis:

```text
How expected is this evidence if Hypothesis A is true?
How expected is this evidence if Hypothesis B is true?
```

The evidence is diagnostic only when those answers differ. If both hypotheses predict the evidence equally well, the evidence should not move the belief much.

### 5. Update to a posterior

Use odds form when numbers are available:

```text
posterior odds = prior odds * likelihood ratio
probability = odds / (1 + odds)
```

Use qualitative form when numbers are rough:

```text
low prior + weak evidence = still low confidence
low prior + strong diagnostic evidence = meaningful update, still check false positives
high prior + weak disconfirming evidence = lower confidence, not full reversal
high prior + strong disconfirming evidence = major update
```

### 6. Check evidence independence

Do not count the same source twice.

Examples of correlated evidence:

- two reports copied from the same original source
- several alerts triggered by the same underlying rule
- multiple reviewers influenced by the same prior assumption
- repeated measurements from one biased instrument

Correlated evidence may still matter, but it should not be treated like independent confirmation.

### 7. Choose the next action or threshold

Bayesian reasoning should end with one of these outputs:

| Output | Use when |
|---|---|
| Act now | The posterior crosses the action threshold. |
| Seek a specific test | One observation would strongly separate hypotheses. |
| Hold belief steady | Evidence is weak, correlated, or equally expected under alternatives. |
| Lower confidence | Evidence contradicts a previously strong belief. |
| Split hypotheses | The current hypothesis is too broad to update cleanly. |

## Core Patterns

### Base-rate neglect

The base rate is the starting probability. If a condition is rare, even a good test can produce many false positives unless the evidence is very diagnostic.

Correction: start with the prevalence before interpreting the signal.

### Vivid evidence overweighting

A single vivid story can feel stronger than a large quiet base rate.

Correction: ask whether the vivid example is representative or selected because it is memorable.

### Absence of evidence

Not seeing evidence can be evidence only when the evidence would probably appear if the hypothesis were true.

Correction: ask whether the observation process was sensitive enough to detect the missing signal.

### Double-counting

Several pieces of evidence may come from one cause.

Correction: trace evidence lineage before treating signals as independent.

### Confirmation by narrative fit

Evidence that fits the preferred story can feel more diagnostic than it is.

Correction: ask whether the evidence is also expected under competing stories.

## Anti-Patterns

| Anti-pattern | What it looks like | Correction |
|---|---|---|
| No prior | "This evidence proves it" with no base rate | State the prior or mark it unknown before updating. |
| Fake precision | Inventing exact decimals from weak judgment | Use ranges or qualitative odds when numbers are rough. |
| Likelihood confusion | Asking "how likely is the hypothesis?" before asking how likely the evidence is under each hypothesis | Estimate evidence likelihood under alternatives first. |
| Base-rate neglect | Treating a positive signal as decisive for a rare event | Combine test quality with prevalence. |
| Double-counting | Treating correlated reports as independent confirmation | Collapse shared-source evidence before updating. |
| One-hypothesis update | Only asking whether evidence supports the favored explanation | Compare against at least one alternative. |
| Over-owning payoff ranking | Choosing the highest-value option only from probability updates | Use Bayesian reasoning for probabilities; use prioritization or expected-value reasoning for payoff comparison. |

## Verification

After applying this skill, verify:

- [ ] Competing hypotheses are stated.
- [ ] The prior or base rate is explicit, even if rough.
- [ ] Evidence is separated from interpretation.
- [ ] Likelihood is considered under more than one hypothesis.
- [ ] The posterior update is proportional to diagnostic strength.
- [ ] Correlated evidence is not double-counted as independent.
- [ ] The output names an action threshold, next test, or remaining uncertainty.

## Do NOT Use When

| Use instead | When |
|---|---|
| first-principles-thinking | The task is to strip inherited assumptions and identify primitive premises before any probability update exists. |
| second-order-thinking | The task is to trace consequences of an intervention through time and actor response. |
| pattern-recognition | The task is to cluster recurring observed issues or name a repeated pattern. |
| epistemic-grounding | The task is to prove what source supports a claim and what warrant connects the source to the claim. |
| prioritization | The task is to rank initiatives by impact, confidence, effort, or roadmap importance rather than update belief from evidence. |
