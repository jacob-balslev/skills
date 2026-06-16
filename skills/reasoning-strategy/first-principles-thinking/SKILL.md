---
name: first-principles-thinking
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when a problem is trapped inside inherited assumptions, copied convention, analogy, or local optimization and needs to be rebuilt from irreducible premises. Covers decomposition to primitives, assumption stripping, primitive tests, reconstruction from constraints, derivation chains, and reality checks. Do NOT use for root-cause analysis of an observed failure (use debugging or problem-locating-solving), formal argument grounding (use epistemic-grounding), domain entity modeling (use conceptual-modeling), or recurring issue clustering (use pattern-recognition)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
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
  subject: reasoning-strategy
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # scope: required free-text statement of what this skill teaches and what it does not.
  scope: "Use when a problem is trapped inside inherited assumptions, copied convention, analogy, or local optimization and needs to be rebuilt from irreducible premises. Covers decomposition to primitives, assumption stripping, primitive tests, reconstruction from constraints, derivation chains, and reality checks. Do NOT use for root-cause analysis of an observed failure (use debugging or problem-locating-solving), formal argument grounding (use epistemic-grounding), domain entity modeling (use conceptual-modeling), or recurring issue clustering (use pattern-recognition)."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.



  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: foundations/reasoning




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

  # comprehension_state: marker that this skill has populated v6+ Understanding fields
  # (mental_model, purpose, boundary, analogy, misconception). Value: `present` or absent.

  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental

  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords:
    - first principles thinking
    - first principle
    - irreducible premise
    - assumption stripping
    - rebuild from fundamentals
    - primitive constraints
    - axiomatic reasoning
    - inherited assumptions
    - reasoning from basics
    - ab initio reasoning

  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers:
    - reason from first principles
    - rebuild this from fundamentals
    - strip the assumptions
    - what are the primitive truths here
    - stop reasoning by analogy

  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples:
    - "We keep copying the old pricing model. Rebuild the problem from first principles."
    - "This architecture decision is full of assumptions. What facts and constraints are actually irreducible?"
    - "Everyone says this workflow needs five steps, but why? Strip it to fundamentals."
    - "The analogy to competitors is misleading. Derive the design from user needs and constraints instead."
    - "Why are we defaulting to microservices here? Let's look at our actual physical constraints and data shape."

  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples:
    - "This incident happened yesterday. Find the root cause."
    - "Update the probability after new evidence arrives."
    - "Score these options by expected monetary value."
    - "Imagine this plan failed and list why."

  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations:
    related:
      - epistemic-grounding
      - conceptual-modeling
      - mental-models
      - pattern-recognition
      - debugging
      - second-order-thinking
      - inversion
      - expected-value
    verify_with:
      - epistemic-grounding
      - conceptual-modeling


  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    First-principles thinking has three primitives: candidate beliefs, primitive premises, and derived conclusions. Candidate beliefs are everything currently accepted in the problem frame: facts, rules, conventions, analogies, preferences, constraints, and proxy metrics. Primitive premises are the subset that cannot be derived from another premise inside the relevant domain and that survives evidence, definition, or constraint tests. Derived conclusions are rebuilt from those primitives through explicit inference steps. The method moves downward from inherited belief to irreducible premise, then upward from premise to design, decision, or explanation.

  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces reasoning by inheritance with reasoning by construction. Without it, teams copy existing solutions, argue from analogy, preserve outdated constraints, and optimize around proxy rules whose original purpose has been forgotten. First-principles thinking strips those inherited layers away until only load-bearing facts, definitions, laws, constraints, and values remain; then it rebuilds a solution that is justified by those primitives rather than by precedent.

  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  concept_boundary: |
    Distinct from root-cause analysis, which starts after an observed failure and asks what caused that failure; first-principles thinking can be used before anything fails, when the problem frame itself may be wrong. Distinct from inversion, which asks what would make the goal fail; first-principles thinking asks what must be true before any solution is valid. Distinct from Bayesian reasoning, which updates belief weights after evidence; first-principles thinking identifies the premises whose truth or falsity should be weighted. Distinct from expected-value reasoning, which compares options once the option space exists; first-principles thinking may reveal that the inherited option space is wrong. Distinct from second-order-thinking, which predicts the downstream consequences of a decision; first-principles thinking establishes whether the decision should exist at all. Distinct also from blind iconoclasm: it does not discard a constraint merely because the constraint is conventional — it removes a constraint only after reconstructing and then disqualifying the function that constraint was serving.

  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "First-principles thinking is like dismantling a machine to its load-bearing parts, discarding decorative casing and copied attachments, then rebuilding only the mechanism that the physics of the problem requires."

  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The common misconception is that first-principles thinking means ignoring all prior work. It does not. Prior work is useful evidence and can supply candidate premises, but it is not automatically foundational. The test is whether a belief is derivable, contingent, negotiable, or merely conventional. A copied rule may survive as a primitive if it encodes a real constraint; it fails if it is only inherited habit.

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
  skill_graph_canonical_skill: skills/reasoning-strategy/first-principles-thinking/SKILL.md


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
  related: ["pattern-recognition","debugging","mental-models","epistemic-grounding","conceptual-modeling","second-order-thinking","inversion","expected-value"]
  verify_with: ["epistemic-grounding","conceptual-modeling"]
---
## Concept Card

**What it is:** First-principles thinking is a reasoning discipline that breaks a problem down to propositions, definitions, constraints, and values that cannot be derived from deeper premises inside the relevant domain, then rebuilds a solution from those primitives. Richard Feynman's governing axiom — "the first principle is that you must not fool yourself, and you are the easiest person to fool" — captures the epistemic core: the method is a defense against self-deception disguised as reasoning.

**Mental model:** Treat every accepted belief as a candidate, not a foundation. Sort candidates into observed facts, definitions, constraints, conventions, analogies, preferences, and derived claims. Keep only the load-bearing primitives, then derive the answer upward with explicit warrants.

**Why it exists:** It prevents inherited assumptions from masquerading as laws. Many bad solutions persist because a team copied a pattern, optimized a proxy, or accepted an old constraint without asking whether it was still load-bearing.

**What it is NOT:** It is not root-cause analysis after a failure, not inversion, not Bayesian updating, not expected-value scoring, not second-order reasoning about downstream consequences, and not an excuse to discard useful prior art.

**Adjacent concepts:** epistemic-grounding, Toulmin argument, DSRP systems thinking, conceptual modeling, inversion, Bayesian reasoning, expected value, second-order thinking, Chesterton's Fence, the Einstellung effect, functional fixedness, CAP-style structural limits.

**One-line analogy:** It is dismantling a problem to the structural beams, then rebuilding only what those beams can actually support.

**Common misconception:** The trap is thinking "from scratch" means "ignore history." History is evidence; first principles decide whether that evidence represents a primitive, a derived claim, or a stale convention.

# First-Principles Thinking

## Concept of the skill

First-principles thinking has three primitives: candidate beliefs, primitive premises, and derived conclusions. Candidate beliefs are everything currently accepted in the problem frame: facts, rules, conventions, analogies, preferences, constraints, and proxy metrics. Primitive premises are the subset that cannot be derived from another premise inside the relevant domain and that survives evidence, definition, or constraint tests. Derived conclusions are rebuilt from those primitives through explicit inference steps. The method moves downward from inherited belief to irreducible premise, then upward from premise to design, decision, or explanation.

Replaces reasoning by inheritance with reasoning by construction. Without it, teams copy existing solutions, argue from analogy, preserve outdated constraints, and optimize around proxy rules whose original purpose has been forgotten. First-principles thinking strips those inherited layers away until only load-bearing facts, definitions, laws, constraints, and values remain; then it rebuilds a solution that is justified by those primitives rather than by precedent.

Distinct from root-cause analysis, which starts after an observed failure and asks what caused that failure; first-principles thinking can be used before anything fails, when the problem frame itself may be wrong. Distinct from inversion, which asks what would make the goal fail; first-principles thinking asks what must be true before any solution is valid. Distinct from Bayesian reasoning, which updates belief weights after evidence; first-principles thinking identifies the premises whose truth or falsity should be weighted. Distinct from expected-value reasoning, which compares options once the option space exists; first-principles thinking may reveal that the inherited option space is wrong. Distinct from second-order-thinking, which predicts the downstream consequences of a decision; first-principles thinking establishes whether the decision should exist at all. First-principles thinking is like dismantling a machine to its load-bearing parts, discarding decorative casing and copied attachments, then rebuilding only the mechanism that the physics of the problem requires. The common misconception is that first-principles thinking means ignoring all prior work. It does not. Prior work is useful evidence and can supply candidate premises, but it is not automatically foundational. The test is whether a belief is derivable, contingent, negotiable, or merely conventional. A copied rule may survive as a primitive if it encodes a real constraint; it fails if it is only inherited habit.

## Coverage

First-principles thinking covers the reasoning move from inherited problem frame to load-bearing primitives and back to a justified conclusion. It includes assumption inventory, primitive classification, irreducibility tests, missing-premise search, premise validation, derivation-chain reconstruction, constraint checks, tactical stripping aids (Socratic questioning, the Five Whys, Feynman's anti-self-deception discipline), and anti-pattern detection when precedent, analogy, or local optimization has displaced the real problem.

Use this skill when the question sounds like:

- "Why are we assuming this has to work that way?"
- "What is actually true underneath the copied pattern?"
- "If we could not use the old solution, what would the problem require?"
- "Which constraints are real, and which are inherited habit?"
- "What do we know for sure, and what are we just repeating?"

## Philosophy of the skill
First-principles thinking is useful because many constraints are second-hand. A rule that began as a physical limit, legal requirement, customer need, or economic fact can degrade into ritual after the environment changes. Once that happens, teams optimize inside a false box.

The discipline is not skepticism for its own sake. It is controlled reduction followed by reconstruction. The reduction phase prevents stale assumptions from entering as axioms. The reconstruction phase prevents analysis paralysis by requiring every conclusion to climb back from the primitives it retained.

The quality bar is not originality. A first-principles answer may converge on the conventional answer. The difference is that the answer is now justified by primitives rather than copied from precedent.

First principles are contextual, not magic bedrock. In mathematics or formal logic, a primitive may be an axiom, postulate, definition, or rule of inference. In product, strategy, architecture, and documentation, most primitives are narrower: measured facts, binding constraints, chosen values, definitions, and provisional assumptions that are irreducible *for this decision at this time*. Treat them as load-bearing, not eternal. If new evidence changes a primitive, rebuild the derivation instead of defending the old frame. The discipline has two halves, and both are required: Descartes-style doubt prevents inherited beliefs from entering as foundations; Euclidean-style derivation prevents the rebuilt answer from being a pile of unconnected observations. A good pass therefore ends with a premise ledger and a derivation chain, not just a list of challenged assumptions.

The trap this skill counters is well documented in cognitive science. The *Einstellung effect* — named from Luchins' 1942 water-jar experiments — is the finding that a method which worked before will block a simpler available solution: prior experience actively suppresses the better answer. *Functional fixedness* — Duncker's 1945 candle problem, where subjects could not see a tack-box as a shelf because they were fixed on its use as a container — is the same failure applied to objects rather than methods. Both are special cases of *mental set*: approaching a new problem with the frame that fit an old one. First-principles thinking is the deliberate countermove that drags the inherited frame into the open so it can be tested instead of silently assumed. Modern engineering popularized the same move as "reasoning from first principles rather than by analogy" — boiling a problem down to fundamental truths and reasoning back up, instead of copying what others did with slight variations.

Underneath all of it sits Feynman's first principle: *you must not fool yourself, and you are the easiest person to fool.* It is the governing axiom of the entire method. Every assumption test, every irreducibility check, every derivation step is an instance of that principle applied to a specific claim. Without it the technique becomes mechanical theater — tables, chains, and tests with the actual self-deception left intact.

## The Workflow

### 1. Frame the exact question

State the decision, design problem, or explanation being sought. A vague prompt creates vague primitives. Frame the *problem*, not a candidate solution — strip implementation, technology, and solution bias out of the question itself.

Bad frame: "Rethink onboarding."

Better frame: "What is the smallest set of steps a new user must complete before they experience the product's core value?"

### 2. Inventory current beliefs

List every belief currently shaping the answer:

| Belief type | Test question |
|---|---|
| Observed fact | What was directly measured or seen? |
| Definition | What does the term mean by contract? |
| Constraint | What cannot be changed without violating physics, logic, law, safety, time, money, or human limits? |
| Value | What are we choosing to optimize? |
| Convention | What are we doing because others do it this way? |
| Analogy | What outside system are we importing a model from? |
| Derived claim | What conclusion depends on earlier premises? |

Do not discard anything in this phase. The goal is visibility.

#### DSRP deconstruction scan

Use DSRP as a formal scan for assumptions the first inventory missed. It is a discovery scaffold, not proof that a premise is true.

| Lens | Inventory question | Typical hidden premise |
|---|---|---|
| Distinctions | What boundary is being drawn, and what is being excluded by that boundary? | The category split is natural rather than chosen. |
| Systems | What whole, parts, and nesting level are being assumed? | The current component, team, workflow, or market boundary is the right unit of analysis. |
| Relationships | What causal, dependency, ordering, or feedback relation is being assumed? | One variable drives another, or the relation is one-way rather than reciprocal. |
| Perspectives | Whose point of view defines the problem, value, risk, or success measure? | The user, operator, buyer, maintainer, regulator, or model all see the same problem. |

Feed any premise found by this scan into the Premise Ledger below. Do not let the DSRP label promote it to a primitive; it still needs the source, enforcer, falsifier, and removal-cost tests.

### 3. Strip inherited assumptions

For each belief, ask:

1. What would make this false?
2. Is this directly observed, defined, or required, or is it inferred?
3. If it is inferred, what premise supports it?
4. If it is a convention, what problem did the convention originally solve?
5. If it is an analogy, where does the analogy break?

A belief survives this step only if it is primitive for the problem or if its derivation is made explicit.

> **Chesterton's Fence — strip, do not bulldoze.** Question 4 is load-bearing, and there is a discipline for answering it honestly. G.K. Chesterton's rule (*The Thing*, 1929) is: do not clear away a fence until you can explain why it was put up. Applied here: a convention or constraint you cannot explain is not therefore wrong — it is merely *unexamined*. Reconstruct the function it was serving first, then remove it only once you can show that function is now absent, served elsewhere, or outweighed. This is precisely what separates first-principles reduction from blind iconoclasm: you earn the right to delete a constraint by understanding it, not by failing to understand it. Chesterton's rule is not conservatism — it permits removal; it forbids *uninformed* removal.

#### Tactical stripping aids

These tools surface candidate premises and buried support chains. Frame them strictly as premise-discovery aids, not as proof that the resulting primitive is true.

**Socratic questioning.** Use the six Socratic question types to pressure-test each belief:

| Question type | Purpose | Example |
|---|---|---|
| Clarification | Establish what the claim actually means | "What exactly does 'onboarding' include?" |
| Probing assumptions | Surface what is taken for granted | "Why do we assume the first step requires an email?" |
| Probing reasons / evidence | Find the warrant behind the claim | "What evidence supports the five-step flow?" |
| Viewpoints / perspectives | Test whether the claim holds from another angle | "What would a first-time user assume on arrival?" |
| Implications / consequences | Trace what follows if the claim is wrong | "If we removed this step, what actually breaks?" |
| Meta-questions about the question | Check whether the framing itself is correct | "Is 'improving onboarding' even the right problem?" |

**Five Whys (adapted).** Ask why a belief must hold until the answer reaches an observed fact, definition, binding constraint, chosen value, or unsupported habit. A belief that collapses into convention after a few whys is not a primitive. Stop when the chain leaves the task scope or stops changing the decision. (This is the Toyota Production System technique, adapted here to expose premise support chains — not to replace the debugging / root-cause workflow it was originally built for.)

**Anti-self-deception check.** Name the answer you most want to be true, then identify which premise would be most painful to test or falsify. That premise is where self-deception hides. Feynman's principle is the epistemic floor: make it hard for the preferred answer to pass as a primitive just because the agent, team, or stakeholder wants it to be true.

### 4. Search for missing primitives

Assumption stripping is incomplete if it only removes false beliefs. Removing false assumptions does not guarantee the *retained* set is complete — a solution derived from a true-but-partial primitive set fails in exactly the place the missing constraint would have governed. Before testing and rebuilding, actively search for the load-bearing premise that no one stated. The inherited frame often omits realities that were taken for granted. Walk these categories explicitly:

- **Physical / technical:** latency floor, throughput limit, storage cost, failure mode, hardware or network constraint.
- **Logical / structural:** proof, impossibility result, algorithmic complexity, information-theoretic limit, consistency requirement, CAP-style tradeoff, invariant, or required ordering relation.
- **Human:** attention, memory, trust, fatigue, incentive, comprehension, risk tolerance.
- **Economic:** marginal cost, opportunity cost, willingness to pay, support load, distribution cost.
- **Legal / policy / safety:** binding rule, auditability requirement, consent, disclosure, operational risk.
- **Definition:** ambiguous term that must be fixed before reasoning can continue.
- **Value:** what the decision optimizes when tradeoffs conflict.
- **Time:** deadline, reversibility, learning rate, decay, migration window.
- **Dependency:** external system, stakeholder, vendor, interface, data owner, or upstream source of truth.

Add anything found to the ledger and run it through the tests. The highest-risk error is not keeping one stale assumption; it is rebuilding from an incomplete primitive set and getting a clean derivation to the wrong answer.

### 5. Test candidate primitives

Use these tests before declaring anything foundational.

| Test | Pass condition | Failure signal |
|---|---|---|
| Irreducibility | It cannot be derived from a deeper premise in scope | It starts with "because we usually..." |
| Evidence | It is observed, measured, defined, or otherwise grounded | It is asserted from habit or authority only |
| Scope | It holds for this problem, not just for a similar one | It depends on an imported analogy |
| Necessity | Removing it makes the solution invalid | Removing it only makes the solution unfamiliar |
| Stability | It will not flip under ordinary variation | It depends on a temporary implementation detail |
| Source / warrant | It has a source, owner, definition, measurement, or explicit value decision | It is supported only by confidence, title, seniority, or repetition |
| Enforcer | A named force makes it binding: physics, law, contract, customer behavior, budget, time, or explicit value choice | Nobody can say what enforces it |
| Falsifier | There is a realistic observation or argument that would make it fail | It is protected from challenge by vague wording |
| Replacement cost | Removing or changing it creates a real cost that can be named | Removing it only causes discomfort or breaks precedent |
| Level fit | It belongs at the primitive level, not at the solution, implementation, or metric level | It already smuggles in the old solution |

In practical domains, "primitive" means "irreducible enough for the decision at hand." If a deeper premise would change the answer and is discoverable within the task scope, keep reducing. If deeper reduction would not change the decision, record the stopping point and move to reconstruction.

### 6. Rebuild upward

Construct the answer as a derivation chain:

```text
Primitive 1 + Primitive 2 -> Derived conclusion A
Derived conclusion A + Primitive 3 -> Design requirement B
Design requirement B + Constraint C -> Candidate solution
```

Every conclusion must point back to the primitives that support it. If a conclusion cannot be derived, either add a missing primitive with evidence or remove the conclusion.

#### Derivation hygiene

Derive in layers, and do not jump straight from a primitive to a solution:

```text
Primitive -> constraint or value implication -> requirement -> option space -> candidate solution
```

```text
Bad: "Users have limited attention -> use a three-step wizard."
Better:
Users have limited attention.
+ The task has one high-risk irreversible decision.
-> The interface must reduce simultaneous choices and make the irreversible point explicit.
-> Candidate solutions: progressive disclosure, one-page checklist, wizard, or guided review.
-> Choose only after comparing which option satisfies the requirement with least cost.
```

Every derivation chain should make visible:

- Which premises are empirical and need measurement.
- Which premises are definitions and need stakeholder agreement.
- Which premises are values and need decision-owner acceptance.
- Which conclusions are requirements versus merely candidate solutions.
- Which single premise would most change the answer if it moved.

### 7. Reconcile with reality

First-principles reasoning can be internally clean and externally wrong if the primitives were incomplete. Stripping is only half the discipline. Before acting, check:

- **Which primitives are still missing?** Re-walk the failure modes, edge cases, and stakeholders not in the room; each often points to an unstated constraint that belongs in the set.
- Which primitives are empirical and need measurement?
- Which primitives are definitions and need stakeholder agreement?
- Which primitives are constraints and need expert verification?
- Which derived conclusions are brittle if one primitive changes?
- Which conventional solution did the derivation recover, and why?

When a primitive is an empirical or performance limit (e.g., "this database can't sustain X writes/sec"), code-assisted verification is a legitimate optional check: use a simulation, benchmark, or formal proof to test whether the limit is a hard physical/structural constraint or merely an unoptimized artifact. Keep it bounded to measurement and simulation — a passing benchmark is evidence about *one* configuration, not automatic proof that the primitive is true everywhere.

## The Premise Ledger

The workflow above is a sequence of judgments. The ledger is the artifact that makes those judgments **explicit and reproducible**: one row per belief, carried from inventory through stripping, testing, and reconstruction, with a status label that records where each belief currently stands. Without it, assumption state stays in the reasoner's head and a reviewer — human or agent — cannot tell which constraints were tested, which were assumed, and which were removed and why. Use a ledger whenever the problem has more than a few beliefs.

Each belief carries one status at a time; the status changes as the belief moves through the workflow.

| Status | Meaning | Next action |
|---|---|---|
| **Grounded** | Observed, measured, proven, or required — passed the primitive tests. | Retain as a primitive; record the evidence source. |
| **Stipulated** | A definition or value premise chosen by agreement, true by decision rather than by evidence. | Retain, but name it as a choice — never disguise it as a fact. |
| **Provisional** | Assumed pending evidence; plausibly primitive but unverified. | Assign a test or measurement before it can carry a conclusion. |
| **Inherited** | A convention or analogy not yet justified. | Reconstruct its original function (Chesterton's Fence), then promote, demote, or strip. |
| **Derived** | A conclusion that depends on other premises — not a primitive. | Keep only its supporting primitives in the foundation; re-derive it upward. |
| **Stripped** | Removed from the foundation. | Record the reason (false, redundant, or function now absent / served elsewhere). A strip with no recorded reason is not a strip. |
| **Missing** | An unstated constraint surfaced during the missing-premise search or reconciliation. | Add it to the ledger and re-run the tests; do not proceed until placed. |

For non-trivial problems, carry the working columns so each row is auditable end-to-end:

| Candidate belief | Type | Status | Source / owner | Falsifier | If removed, what breaks? |
|---|---|---|---|---|---|
| "Users must enter company size before activation." | Convention / derived claim | Provisional | Current onboarding flow, competitor comparison | Cohort data shows no downstream use or value | Personalization may degrade if size is actually used |

A worked ledger row reads end-to-end:

```text
Belief: "Onboarding needs five steps."        Type: Convention   Status: Inherited
  -> reconstruct function: steps 1-2 collect legally-required consent; 3-5 are habit
  -> Status: Stripped (3-5, reason: no load-bearing function) + Grounded (1-2, reason: legal constraint)
```

The ledger is the recommended output of a first-principles pass: it lets anyone audit the derivation by checking that every retained primitive is Grounded or Stipulated, every Provisional has a test, every Stripped has a reason, and no conclusion rests on an Inherited belief. Do not promote a Provisional belief to a primitive because it sounds plausible — either ground it, stipulate it, name it as a chosen value, or keep the uncertainty visible.

## Primitive Types

| Primitive | Meaning | Example |
|---|---|---|
| Physical law | Cannot be violated by any design | Latency cannot be lower than propagation and processing time combined; thermodynamic heat/power limits. |
| Mathematical identity | True by definition or proof | Profit equals revenue minus costs under the chosen definition; a comparison sort cannot beat n·log n; Shannon channel-capacity limits. |
| Logical or structural constraint | A limit imposed by computation, information, or structure — independent of physical or economic resources, and distinct from a mere identity because it bounds what *any* design in the space can achieve | A distributed system cannot hold consistency, availability, and partition-tolerance at once (CAP); a step cannot run before the invariant it depends on holds (ordering constraint). |
| Human constraint | Stable limit of human attention, memory, time, or behavior | A user cannot compare twenty dense options accurately under time pressure (Miller's 7±2 working-memory limit). |
| Economic constraint | Resource tradeoff that cannot be wished away | Storage, review time, compute, and support load all have opportunity costs. |
| Legal or policy constraint | Binding rule from outside the design space | A required disclosure must be present before action. |
| Definition | Meaning chosen by the system or domain | "Active user" must be defined before optimizing activation. |
| Value premise | What the decision optimizes | Reliability over novelty, speed over completeness, or reversibility over throughput. |
| Cognitive fixation risk | A stable human tendency that makes a familiar frame, tool, or solution feel more primitive than it is | A team keeps selecting the inherited workflow because repeated exposure made it feel inevitable, not because it survived the primitive tests. |

Value premises are legitimate primitives, but only after being named honestly. Hiding a value premise inside a "fact" is a reasoning bug.

## Common Applications

### Product design

Start with the user's job-to-be-done, attention budget, risk, and required trust. Do not start with competitor screens or inherited flows. Rebuild the flow from the minimum sequence needed for the user to make progress safely.

### Technical architecture

Start with invariants, failure modes, latency budgets, data ownership, reversibility, and operational constraints. Do not start with a fashionable architecture label ("we need microservices because Google does," "we need Kafka"). Rebuild boundaries from what must remain true when components fail or scale — e.g., instead of "we need Kafka," ask "what persistence, ordering, and latency does this message flow actually require?"

### Strategy

Start with customer value, constraints, distribution reality, margins, and capability asymmetries. Do not start with category norms. Rebuild the strategy from what must be true for the system to win.

### Skill and documentation authoring

Start with what behavior the reader must perform differently after reading. Do not start with a table of contents copied from neighboring artifacts. Rebuild the document from primitives: trigger, boundary, mental model, procedure, verification.

## AI Agents and Modern Tooling

### Why agents especially need this skill

An AI agent often answers by analogy — it completes the most familiar pattern for a request, which tends toward "what others did, with slight variations." That default is fast and usually adequate, but it is prone to importing an inherited solution wholesale (a copied architecture, a conventional schema, a standard five-step flow) without testing whether the problem's primitives actually require it. The convenient pattern is not, by itself, evidence that the pattern is correct for *this* problem. Apply this skill deliberately when the cost of the default pattern is high or the context is unusual: name the primitives the task truly constrains, then check whether the pattern-matched answer is *derivable* from them or merely *familiar*.

### The validation boundary (the load-bearing point)

Stronger reasoning models, extended-thinking modes, "think" tools, web search, retrieval, and agent frameworks help *execute* this workflow, but they do not replace it. A model thinking longer can generate better candidate premises; it cannot by itself prove that a premise is true, current, complete, or load-bearing. A retrieved "fact" can be stale, a confidently generated constraint can be a hallucinated convention, and no amount of fluent generation tells you which primitives are *missing*. Tool results and citations are evidence inputs, not automatic validation.

So the division of labor for agent work is:

- Use the model to *propose* candidate beliefs and missing-premise classes (Step 2 and Step 4).
- Use tools to *verify* empirical primitives against files, tests, docs, measurements, or the actual law/spec — not against the model's own confidence (Step 5 and Step 7).
- Use agents to *stress-test*: argue for and against a premise to surface confirmation bias; build a simulation or benchmark to test whether a performance limit is a hard constraint or an optimization artifact; analyze existing documentation to extract "background-noise" assumptions a team internalized as immutable.
- Hand a primitive or derived claim that must be source-supported in the final artifact to `epistemic-grounding`. This skill owns the decomposition and reconstruction, not the citation audit; when a primitive depends on current external facts, route that verification to `epistemic-grounding` or a web-capable research workflow.
- Keep context tight: load the facts and constraints needed for the derivation, not every related document. Record uncertainty explicitly when a premise remains provisional.

**Upstream-displacement check.** No reasoning model, search tool, context-management method, or agent framework displaces first-principles thinking. These tools improve decomposition, retrieval, and execution, but the skill still owns deciding which beliefs are primitive, which are inherited, and how conclusions are rebuilt. Treat model output as a candidate-premise generator, never as the validator of primitive truth — and never accept a model's "I reasoned from first principles" as proof that it did.

## Boundary Routing

| User need | Use | Mechanism |
|---|---|---|
| Rebuild a decision, design, strategy, or explanation from load-bearing facts, definitions, constraints, and values | `first-principles-thinking` | Strips inherited beliefs, tests primitives, derives upward |
| Prove that a claim is sourced, qualified, current, and warranted | `epistemic-grounding` | Checks source-to-claim support and claim state |
| Model business entities, attributes, relationships, identity, and cardinality | `conceptual-modeling` | Builds an implementation-neutral domain model |
| Diagnose why a user, designer, operator, or agent has the wrong internal representation of a system | `mental-models` | Compares model-system fit and analogy effects |
| Investigate one observed failure, failing test, or contradictory runtime output | `debugging` or `problem-locating-solving` | Reproduces, isolates, and verifies a root cause |
| Find recurring issue classes across many instances and codify prevention | `pattern-recognition` | Clusters repeated observations and creates detection / prevention |
| Predict the downstream consequences of a decision already on the table | `second-order-thinking` | Traces ripple effects forward in time |
| Compare known options by probability-weighted payoff | `expected-value` | Scores options after the option space exists |
| Update belief weights after evidence | Bayesian reasoning | Revises probabilities, not primitive status |
| Ask how a plan could fail | `inversion` / pre-mortem | Reverses the goal to reveal failure paths |

## Anti-Patterns

| Anti-pattern | What it looks like | Correction |
|---|---|---|
| Physics cosplay | Treating social, product, or business claims as universal laws | Mark value and behavior premises as contingent and testable. |
| Premature axiom | "This is a requirement" with no evidence | Ask what happens if it is removed and who or what enforces it. |
| Analogy lock-in | "This is like X, so we should do Y" | Identify where the analogy breaks before deriving conclusions. |
| Abstraction escape | Staying so abstract that no decision changes | Rebuild upward until the conclusion constrains action. |
| Destructive skepticism | Discarding every prior belief and never rebuilding | Treat prior work as evidence, not authority or trash. |
| Incomplete primitive set | Stripping false assumptions correctly, then deriving from a true-but-partial set | Run the missing-premise search (Step 4); a clean derivation from missing constraints still fails. |
| Premature fence-clearing | Removing a specific rule, step, or boundary because no one present can explain it | Reconstruct the constraint's original function first; remove it only once you can show that function is gone, served elsewhere, or outweighed (Chesterton's Fence). An unexplained constraint is unexamined, not disproven. |
| Framework defaulting | Adopting a framework (microservices, generic RAG, a standard flow) without validating its underlying premises | Derive the need for the framework from system limits; build custom only if the framework violates a primitive. |
| Solution-smuggling | Naming the old solution as a primitive, e.g. "we need microservices" | Translate the solution label into the constraints it allegedly satisfies. |
| Axiomatic theater | Decorating a preference or solution with "first principle" language | Force the belief into the ledger and require type, source, falsifier, and removal cost. |
| Novelty bias | Rejecting prior art because the method feels like "starting from scratch" | Treat prior art as evidence; keep it if it encodes a real constraint or a successful derivation. |
| Over-reduction | Continuing to decompose after the answer would no longer change | Record the stopping rule: deeper premises are out of scope or decision-irrelevant. |
| Einstellung trap | Reusing a familiar method after the current problem makes a simpler or more direct path available | Ask what solution would be chosen if the familiar pattern were unavailable, then compare constraints directly. |
| Functional fixedness | Treating a tool, object, role, or concept as if its usual use is its only possible use | List alternate uses before concluding that a new component, workflow, or policy is required. |
| Model-autonomy laundering | Accepting a model's "I reasoned from first principles" as proof that it did | Inspect the premise ledger, evidence, and derivation chain. Longer thinking is not validation. |
| Cargo-cult reasoning | Copying the *form* of first-principles work (tables, chains, tests) without doing the assumption work | Every conclusion must trace to a tested primitive. |
| Self-deception pass | Letting the preferred answer survive because the ledger never tried to falsify its most convenient premise | Apply Feynman's test: name the premise you least want to test and make its falsifier explicit. |
| Proxy primitive | Optimizing a metric as if it were the goal | Name the value the proxy is supposed to represent. |
| Hidden value claim | Presenting a preference as an objective fact | Separate facts from values before deriving the answer. |

## Output Shape

When applying this skill, prefer this structure:

```text
Question:
The exact decision, design, or explanation being rebuilt.

Candidate belief inventory:
- Facts / Definitions / Constraints / Values / Conventions / Analogies / Derived claims

DSRP scan:
- Distinctions / Systems / Relationships / Perspectives

Premise ledger:
| Candidate | Type | Status | Source / owner | Falsifier | If removed, what breaks? |

Missing primitives checked:
- Physical / Logical-structural / Human / Economic / Legal-policy-safety / Definition / Value / Time / Dependency

Retained primitives:
1. ...

Derivation:
Primitive(s) -> implication -> requirement -> option space -> candidate solution

Reality checks:
- Empirical checks needed / Stakeholder definitions needed / Value tradeoffs needing owner decision / Most brittle primitive

Result:
The action-constraining conclusion, with uncertainties marked.
```

## Verification

After applying this skill, verify:

- [ ] The exact question was framed before decomposition, free of implementation bias.
- [ ] Current beliefs were inventoried (a ledger for non-trivial problems) before anything was discarded.
- [ ] Distinctions, systems, relationships, and perspectives were scanned for hidden premises.
- [ ] Candidate primitives are classified as facts, definitions, constraints, or values.
- [ ] Inherited conventions and analogies were tested rather than accepted; Socratic questioning or the Five Whys was used to surface buried premises.
- [ ] Every convention slated for removal had its original function reconstructed before it was stripped (Chesterton's Fence), not removed merely because it was unexplained.
- [ ] A missing-primitive search was run across the categories (physical, logical-structural, human, economic, legal-policy, definition, value, time, dependency) before reconstruction — not only a strip of false beliefs.
- [ ] Logical / structural limits were checked separately from empirical technical constraints.
- [ ] Every retained primitive passed irreducibility, evidence, scope, necessity, and stability checks.
- [ ] Each belief carries an explicit status (Grounded, Stipulated, Provisional, Inherited, Derived, Stripped, or Missing); every Stripped belief records its reason; every Provisional has a test.
- [ ] Cognitive-fixation traps were checked: familiar pattern, familiar tool use, and preferred answer.
- [ ] The derivation separates requirements from candidate solutions and was rebuilt through explicit steps.
- [ ] Empirical primitives have a measurement plan, benchmark, or evidence source.
- [ ] Value premises are named as values, not disguised as facts.
- [ ] A self-deception check was run ("what would it take for this conclusion to be wrong?") and the answer was recorded.
- [ ] No model or tool output was treated as validation without source or environment evidence; any external/current primitive was verified or explicitly handed to `epistemic-grounding`.
- [ ] The final answer constrains action; it is not merely an abstract restatement.

## Do NOT Use When

| Use instead | When |
|---|---|
| `debugging` or `problem-locating-solving` | You have an observed failure and need root-cause isolation. |
| `epistemic-grounding` | You need to prove that a claim is sourced, qualified, and warranted. |
| `conceptual-modeling` | You need to model domain entities, attributes, relationships, identity, and cardinality. |
| `pattern-recognition` | You need to cluster repeated issues and turn recurrence into prevention. |
| `second-order-thinking` | You need to predict the downstream consequences of a decision already taken. |
| `inversion` | You need to reverse the goal and ask how the plan could fail. |
| `expected-value` or Bayesian reasoning | You need to update probabilities or compare options by probability-weighted payoff. |

## Key Sources

- Aristotle's *Metaphysics* frames wisdom as concern with primary causes and starting-points, and treats the principle of non-contradiction as a fundamental axiom of reasoning. The Greek term Aristotle uses for such a starting-point is *archē* — the first thing from which something is or is known.
- Aristotle's *Physics* opening, as summarized in public reference sources, describes inquiry as moving from what is clearer to us toward what is clearer by nature, seeking first principles, causes, and elements.
- Euclidean and formal-logical traditions treat axioms, postulates, definitions, and primitive notions as starting points from which further propositions are derived — and separate those starting points from the propositions derived from them.
- Descartes' method of doubt and foundationalism show the destructive-then-constructive pattern: remove doubtful inherited beliefs, then rebuild from clearer foundations. His practical method also prescribes dividing difficulties, ordering reasoning from simpler to more complex, and reviewing for omissions — a direct ancestor of the premise ledger, derivation chain, and missing-premise search.
- The modern engineering articulation, popularized in Elon Musk's widely circulated 2013 interviews, frames the method as reasoning "from first principles rather than by analogy" — boiling a problem down to its most fundamental truths and reasoning up from there, instead of copying "what other people are doing, with slight iterations on a theme." The canonical worked example ignores a finished product's market price and re-derives cost from the raw-material physics of its components.
- G.K. Chesterton's fence parable (*The Thing: Why I Am a Catholic*, 1929) supplies the counterbalancing discipline that keeps reduction honest: do not clear away a fence until you understand why it was built. It guards first-principles stripping against destructive skepticism — the rule permits removal, but only of a constraint whose function has first been understood and then disqualified.
- Richard Feynman's *Cargo Cult Science* address (Caltech, 1974) supplies the anti-self-deception principle — "you must not fool yourself, and you are the easiest person to fool" — and the warning against copying the *form* of rigorous reasoning without its substance. Used here as a falsification discipline, not as a replacement for source and evidence checks.
- Socratic questioning (the six-type framework associated with Richard Paul and the Foundation for Critical Thinking) and the Five Whys (originating in the Toyota Production System / Taiichi Ohno) provide repeatable protocols for surfacing buried premises. Both are adapted here as premise-discovery aids, not as proofs of primitive truth.
- DSRP (Distinctions, Systems, Relationships, Perspectives), from Cabrera & Cabrera's systems-thinking work, supplies a deconstruction scan for assumptions hidden in how boundaries, parts/wholes, relations, and viewpoints are drawn.
- The cognitive-science grounding for *why* inherited frames trap reasoning: Luchins' Einstellung (water-jar) experiments (1942), in which a previously successful method blocks a simpler available solution, and Duncker's functional-fixedness (candle) problem (1945), in which an object's familiar use hides its other affordances — both instances of *mental set*. These are the documented mechanisms first-principles thinking is designed to interrupt.
- In physics and chemistry, ab initio or first-principles methods start from established laws rather than empirical fitting parameters; that usage is a narrow scientific cousin, not the whole reasoning skill.
