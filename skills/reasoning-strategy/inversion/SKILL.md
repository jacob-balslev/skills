---
name: inversion
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when a goal, plan, design, strategy, metric, or assumption should be examined by reversing it: ask how to guarantee failure, how the opposite could be true, what would have to happen for the desired outcome not to occur, or how an apparent win could backfire. Covers objective reversal, prospective-hindsight framing, failure-path enumeration, obstacle-first planning, consider-the-opposite debiasing, opposite-hypothesis testing, metric inversion, architectural non-goal definition, red-team-style self-review, and prevention design. Do NOT use for decomposing a problem to irreducible premises (use first-principles-thinking), post-failure root-cause analysis (use debugging), recurring failure clustering (use pattern-recognition), claim/source grounding (use epistemic-grounding), full FMEA scoring, full pre-mortem facilitation, or full AI/security red-team programs."
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
  scope: "Use when a goal, plan, design, strategy, metric, or assumption should be examined by reversing it: ask how to guarantee failure, how the opposite could be true, what would have to happen for the desired outcome not to occur, or how an apparent win could backfire. Covers objective reversal, prospective-hindsight framing, failure-path enumeration, obstacle-first planning, consider-the-opposite debiasing, opposite-hypothesis testing, metric inversion, architectural non-goal definition, red-team-style self-review, and prevention design. Do NOT use for decomposing a problem to irreducible premises (use first-principles-thinking), post-failure root-cause analysis (use debugging), recurring failure clustering (use pattern-recognition), claim/source grounding (use epistemic-grounding), full FMEA scoring, full pre-mortem facilitation, or full AI/security red-team programs."
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
    - inversion thinking
    - invert the goal
    - reverse the problem
    - failure path
    - opposite hypothesis
    - obstacle first
    - what would make this fail
    - avoid failure
    - anti-goal
    - reverse reasoning
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers:
    - invert this plan
    - how could this fail
    - what would guarantee failure
    - reason from the opposite
    - avoid the worst outcome
    - use prospective hindsight
    - red-team this plan
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples:
    - "We want activation to improve. Invert the goal and identify what would make users abandon onboarding."
    - "Before we commit to this launch plan, ask how it could fail and what safeguards follow."
    - "Test the opposite hypothesis: what if the metric increase is actually bad?"
    - "What actions would guarantee this project misses the deadline?"
    - "Red-team this proposal before sign-off: assume it failed after launch and identify the preventable causes."
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples:
    - "Break this pricing model down to irreducible assumptions."
    - "This incident already happened; find the root cause."
    - "Score every webhook failure mode with severity, occurrence, and detectability."
    - "Facilitate a team pre-mortem session with independent written generation."
    - "Run a full LLM red-team with adversarial probes, automated scoring, and CI reporting."
    - "Explain the mathematical proof for matrix inversion."
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations:
    related:
      - first-principles-thinking
      - epistemic-grounding
      - pattern-recognition
      - debugging
    verify_with:
      - epistemic-grounding
      - first-principles-thinking

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Inversion has four primitives: desired outcome, inverted outcome, causal path, and control. The method temporarily replaces "How do we get X?" with "How would we guarantee not-X?", "What would have to be true for the opposite of our claim to hold?", "How could this metric improve while the real goal worsens?", or "Assume this already failed; what caused it?" The output is not pessimism; it is a map of blockers, failure paths, perverse incentives, hidden assumptions, gamed proxies, and avoidable behaviors. The agent then translates that inverted map back into prevention, detection, buffers, rehearsals, accepted risks, or redesign.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces one-direction optimism with obstacle-first reasoning. Forward planning tends to over-focus on actions that might create success and under-examine the behaviors, constraints, incentives, and assumptions that would reliably destroy it. Inversion forces the negative space into view: instead of asking only how to win, it asks how to lose, how to be wrong, how an apparent improvement could become a proxy failure, or how the opposite could be true. This improves planning only when the failure map is converted into concrete controls or an explicit accepted-risk rationale.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  concept_boundary: |
    Distinct from first-principles thinking, which decomposes a problem into primitives and rebuilds forward; inversion reverses the target state and reasons backward from failure, negation, or proxy breakage. Distinct from debugging, which investigates a failure that already occurred; inversion is prospective and can be used before action, though its findings can later feed prevention after debugging finds root cause. Distinct from FMEA, which systematically enumerates component-level failure modes and scores severity, occurrence, detection, and action priority; inversion is lighter-weight and starts from the goal, claim, metric, or design. Distinct from pre-mortem facilitation, which is a structured team process using assumed future failure and independent written generation; inversion is the underlying reasoning move usable by one agent on a plan, claim, metric, or design. Distinct from full AI/security red teaming, which runs adversarial probes, measurements, and mitigations against a deployed or deployable system; inversion can generate adversarial questions but does not replace that program.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Inversion is like checking a bridge design by asking where it would snap first, not because you want it to snap, but because that is where reinforcement matters."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The common misconception is that inversion is negativity or risk avoidance. It is not. Inversion is a search strategy. It deliberately looks for counterexamples, failure paths, and proxy breakage so the forward plan can be made stronger. A valid inversion pass ends in action: remove the blocker, add a guardrail, test the opposite hypothesis, add a detection trigger, rehearse rollback, redesign the plan, or explicitly accept the remaining risk.
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
  skill_graph_canonical_skill: skills/reasoning-strategy/inversion/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  # comprehension_verdict: gate 8 — the behavior-gate quality signal (evidence-gated,
  # receipt-backed). Not a bare recitation check; never alone certifies application.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
relations:
  related: ["pattern-recognition","debugging","first-principles-thinking","epistemic-grounding"]
  suppresses: ["first-principles-thinking"]
  verify_with: ["epistemic-grounding","first-principles-thinking"]
---
## Concept Card

**What it is:** Inversion is a reasoning technique that examines a desired outcome by reversing it: ask how to cause failure, how the opposite claim could be true, what would prevent the goal from happening, or how an apparent win could backfire.

**Mental model:** A plan has a success path and a failure surface. Forward reasoning maps the success path. Inversion maps the failure surface first, then turns that map into safeguards, tests, constraints, and accepted-risk decisions.

**Why it exists:** People over-plan the route to success and under-plan the ways they can sabotage it. Inversion makes hidden blockers, perverse incentives, ignored constraints, false assumptions, and gamed metrics easier to see.

**What it is NOT:** It is not cynicism, not post-incident debugging, not first-principles decomposition, not FMEA scoring, not the full facilitated pre-mortem protocol, and not a substitute for full AI/security red teaming.

**Adjacent concepts:** first-principles thinking, prospective hindsight, consider-the-opposite debiasing, pre-mortem, FMEA, red teaming, debugging, epistemic grounding, pattern recognition.

**One-line analogy:** Inversion is stress-testing a plan by first drawing the map of how it breaks.

**Common misconception:** The trap is treating inversion as "be negative." The point is not to dwell on failure; the point is to convert failure paths into prevention, detection, buffers, rehearsals, redesign, or explicit risk acceptance.

# Inversion

## Concept of the skill

Inversion has four primitives: desired outcome, inverted outcome, causal path, and control. The method temporarily replaces "How do we get X?" with "How would we guarantee not-X?", "What would have to be true for the opposite of our claim to hold?", "How could this metric improve while the real goal worsens?", or "Assume this already failed; what caused it?" The output is not pessimism; it is a map of blockers, failure paths, perverse incentives, hidden assumptions, gamed proxies, and avoidable behaviors. The agent then translates that inverted map back into prevention, detection, buffers, rehearsals, accepted risks, or redesign.

Replaces one-direction optimism with obstacle-first reasoning. Forward planning tends to over-focus on actions that might create success and under-examine the behaviors, constraints, incentives, and assumptions that would reliably destroy it. Inversion forces the negative space into view: instead of asking only how to win, it asks how to lose, how to be wrong, how an apparent improvement could become a proxy failure, or how the opposite could be true. This improves planning only when the failure map is converted into concrete controls or an explicit accepted-risk rationale.

Distinct from first-principles thinking, which decomposes a problem into primitives and rebuilds forward; inversion reverses the target state and reasons backward from failure, negation, or proxy breakage. Distinct from debugging, which investigates a failure that already occurred; inversion is prospective and can be used before action, though its findings can later feed prevention after debugging finds root cause. Distinct from FMEA, which systematically enumerates component-level failure modes and scores severity, occurrence, detection, and action priority; inversion is lighter-weight and starts from the goal, claim, metric, or design. Distinct from pre-mortem facilitation, which is a structured team process using assumed future failure and independent written generation; inversion is the underlying reasoning move usable by one agent on a plan, claim, metric, or design. Distinct from full AI/security red teaming, which runs adversarial probes, measurements, and mitigations against a deployed or deployable system; inversion can generate adversarial questions but does not replace that program.

Inversion is like checking a bridge design by asking where it would snap first, not because you want it to snap, but because that is where reinforcement matters. The common misconception is that inversion is negativity or risk avoidance. It is not. Inversion is a search strategy. It deliberately looks for counterexamples, failure paths, and proxy breakage so the forward plan can be made stronger. A valid inversion pass ends in action: remove the blocker, add a guardrail, test the opposite hypothesis, add a detection trigger, rehearse rollback, redesign the plan, or explicitly accept the remaining risk.

## Coverage

Inversion covers the deliberate reversal of goals, claims, plans, metrics, decisions, and designs. It includes goal inversion, prospective-hindsight framing, opposite-hypothesis testing, consider-the-opposite debiasing, obstacle-first planning, anti-goal definition, architectural non-goal definition, failure-path enumeration, success-sabotage analysis, metric-backfire analysis, lightweight adversarial self-review, and conversion of inverted findings into concrete safeguards.

Use this skill when the question sounds like:

- "How could this fail?"
- "What would make the opposite true?"
- "What should we avoid doing?"
- "What would guarantee this project misses?"
- "How might this metric improvement backfire?"
- "Assume this launch failed six weeks from now; what caused it?"
- "Red-team this plan before we commit."

## Philosophy of the skill

Forward reasoning is naturally attractive because it aligns with desire: define the goal, list actions, execute. That shape is useful, but it hides the negative space. Many plans fail because of one avoidable blocker, one untested assumption, one incentive that rewards the wrong behavior, one metric that becomes the target, or one condition that would have been obvious if the team had asked how to lose.

Inversion is a compact antidote. It does not replace planning; it improves planning by forcing the plan to survive its own opposite. If the inverted analysis produces no changes, either the plan is unusually robust or the inversion was too generic.

Good inversion ends in action. A list of scary possibilities is not the deliverable. The deliverable is a changed plan, sharper test, added guardrail, detection trigger, rehearsal, removed anti-pattern, explicit accepted risk, or redesign decision.

## Why Inversion Works

Inversion works because it changes the search space. "How do we succeed?" tends to retrieve familiar success actions. "How would we fail?" retrieves blockers, incentives, omissions, and counterexamples that forward optimism suppresses. The technique is strongest when it uses three mechanisms deliberately. It is a heuristic, not a law: complex systems can have combinatorial failure modes that resist full enumeration, so the goal is not a complete failure list but surfacing the most consequential paths first.

**Prospective hindsight:** Treat the future failure as already having happened. "It is six weeks after launch and the project failed; why?" is stronger than a vague "what might go wrong?" because it gives the mind a concrete result to explain backward from. Klein's 2007 HBR premortem article reports Mitchell, Russo, and Pennington's 1989 prospective-hindsight finding that the already-happened frame increased correct cause identification for future outcomes by roughly 30%.

**Consider the opposite:** For a favored belief, require reasons the opposite could be true. This is the claim-level version of inversion. It has direct empirical support as a debiasing move: Lord, Lepper, and Preston (1984) showed that explicitly asking a reasoner to argue the opposite case measurably reduces biased assimilation and overconfidence — more than a generic "be fair and unbiased" instruction. It is useful when a recommendation, diagnosis, strategy, or metric narrative is becoming too easy to defend.

**Subtractive control:** Some problems are easier to improve by removing known failure causes than by inventing brilliance. Inversion often turns a success plan from "add more good actions" into "remove the few actions that would predictably ruin the system" — Munger's "avoid stupidity before seeking brilliance."

## When To Invert

Use inversion when the task has a target state and the main danger is unexamined failure, overconfidence, or proxy optimization. Do not use it as a universal reasoning wrapper. When the initial conditions are well-defined and the destination is genuinely unknown (open exploration, discovery, generative design), forward reasoning is usually the better first pass — run inversion afterward as a second pass to stress-test what forward reasoning produced.

| Situation | Inversion move | Boundary |
|---|---|---|
| Clear goal, uncertain path | Ask what would guarantee not-goal and work backward from those causes (Pólya's "working backwards" heuristic). | If the real problem is that the goal itself is inherited or undefined, use first-principles-thinking first. |
| Plan chosen under optimism | Assume the plan failed in the future and list the causes. | If the user asks for a facilitated team exercise, use a dedicated pre-mortem workflow. |
| Favored claim or recommendation | Ask what evidence would make the opposite true. | If the task is to source and qualify the claim, use epistemic-grounding. |
| Metric improvement looks good | Ask how the metric could improve while the real outcome worsens. | If the task is metric-system design, use the domain owner for analytics or evaluation. |
| Agent or reviewer is about to sign off | Ask why this answer, patch, or recommendation might be rejected later. | Use evaluation, tests, or grounding to verify the answer; inversion only generates checks. |
| Component-level reliability analysis | Use inversion to seed candidate hazards. | Use FMEA when severity, occurrence, detection, RPN, action priority, or formal component scoring is requested. |
| AI/security adversarial testing | Use inversion to generate misuse cases and bad-outcome questions. | Use dedicated red-team/security workflows for probes, automated scoring, mitigations, CI, and reporting. |
| Failure already happened | Use inversion only after root cause is known, to improve prevention. | Debugging or problem-locating-solving owns root-cause isolation. |

## The Workflow

### 1. State the forward goal or claim

Name the target precisely. Vague goals produce generic failure lists.

Bad frame: "Make the product better."

Better frame: "Increase first-week activation without increasing support burden."

Also name the real outcome behind any proxy metric.

Weak metric frame: "Increase engagement."

Better metric frame: "Increase meaningful weekly usage without reducing trust, retention, or support quality."

### 2. Choose the inversion frame

Choose the frame that matches the target.

| Forward target | Strong inversion prompt |
|---|---|
| Achieve goal X | What would guarantee not-X? |
| Ship plan X | It is after launch and this plan failed, stalled, or caused damage. What happened? |
| Prove claim X | What evidence would make X false or make the opposite more likely? |
| Improve metric X | How could X improve while the real goal gets worse? |
| Avoid risk X | What behaviors, incentives, or omissions would make X more likely? |
| Review answer/patch X | If this is rejected later, what was the most preventable reason? |

For plan and launch work, prefer the prospective-hindsight wording: assume the future failure already occurred, then explain it — past tense ("it failed; why?") rather than conditional ("how could it fail?"), because the past-tense frame is what activates prospective hindsight and tends to produce more, and more concrete, causes. For claim work, prefer opposite-hypothesis wording. For metric work, prefer backfire wording.

### 3. Enumerate failure paths without filtering

List specific causes, not broad categories. To avoid anchoring on the existing plan, generate the failure list independently first — a fresh scratchpad or a separate sub-agent pass — before reconciling it against the success path; an inverted list written after reviewing the plan tends to echo it.

Weak: "Bad communication."

Strong: "The owner changes the API contract but the integration test still mocks the old response, so the failure ships."

Look for:

- ignored constraints
- stale assumptions
- perverse incentives
- missing feedback loops
- hidden dependencies
- proxy metrics that can be gamed
- irreversible steps
- delayed detection
- ambiguous ownership
- human attention limits
- adversarial or misuse paths
- mundane handoff failures
- narrative or "soft" risks (stakeholder fatigue, morale, shifting sentiment)

When the target is a plan, include both failures inside the team's control and failures outside its control. When the target is a claim, include observations that would falsify it, narrow it, or make the opposite more plausible. When the target is an agent output, include missing evidence, unrun checks, skipped edge cases, and claims that would fail source inspection.

### 4. Convert each material path into a control

Every material failure path needs one of these outcomes.

| Failure-path outcome | Use when | Output shape |
|---|---|---|
| Prevent | The cause can be removed before execution. | Change the plan so the cause cannot arise. |
| Detect | The cause cannot be removed but can be caught early. | Add a check, alert, test, review point, or leading indicator. |
| Buffer | The cause can happen, but impact can be reduced. | Add margin, fallback capacity, staged rollout, or blast-radius limit. |
| Rehearse | The team needs practice or a rollback drill. | Run the cutover, rollback, support, incident, or handoff rehearsal before launch. |
| Accept | The risk is real but intentionally tolerated. | Record the risk, owner, rationale, and trigger that would reopen the decision. |
| Redesign | The failure path is structural and invalidates the plan. | Change the architecture, product shape, policy, or decision. |
| Explicit Non-Goal | A related feature, user path, or use case would damage scope or architecture if included. | State what the system will not support, with rationale, owner, and revisit trigger. |

Do not leave a material failure path as a bare concern. A material failure path that is left uncontrolled is only an honest **Accept** when it carries three things explicitly: a written rationale for why the risk is tolerated, a named owner accountable for it, and a revisit trigger (a date, threshold, or event that forces re-evaluation). "We'll accept that" with none of the three is silent risk, not accepted risk — it is the failure path re-entering the plan disguised as a decision.

### 5. Re-run the forward plan

Apply the controls and restate the plan. If the plan still depends on avoiding obvious failure paths by luck, it is not ready.

If no control is worth adding, say why. A legitimate answer may be "accepted risk" when the cost of control is higher than the expected harm, but that decision must be explicit. Integrate the resulting safeguards into the primary project artifact (test cases, architecture constraints, lint rules, runbook steps), not a separate "risk list" that drifts away from the plan.

### 6. Verify the inversion did not overreach

Inversion generates candidates for safeguards and tests; it does not prove the final plan is correct. Use the adjacent skill that owns the next step:

- Use `epistemic-grounding` to check whether claims and citations are supported.
- Use `evaluation` to judge a completed output against acceptance criteria.
- Use tests, telemetry, or domain-specific review to verify a proposed control.
- Use FMEA, pre-mortem facilitation, or security red-team workflows when the user requests those formal protocols.

## Inversion Patterns

### Anti-goal inversion

Ask: "If we wanted the worst plausible result, what would we do?" or "What must this system explicitly not do?"

Useful for behavior design, operations, architecture, scope control, and product workflows. The answer exposes what to forbid, monitor, or design away. In design and architecture work, a strong output can be an explicit non-goal such as "we will not support manual production edits" or "we will not accept plug-ins without sandboxing"; that boundary is an inversion-derived control, not a missing feature.

A recognized special case is **innovation inversion**: ask "what would guarantee a slow, bureaucratic, uninnovative process?" The answer names the exact behaviors that crush progress — punishing honest mistakes, multiplying sign-offs, hiding bad news — so an organization can strip those behaviors away rather than only bolting on "innovation initiatives."

### Prospective-hindsight inversion

Ask: "It is after the deadline, launch, migration, or decision, and the effort failed. What caused it?"

Useful when optimism, group politeness, or planning momentum is hiding dissent. The past-tense frame is the point: it makes the future failure concrete enough to explain backward. For complex projects, write a short **project obituary**: one or two paragraphs from after the failure that name what stakeholders believed, how momentum shifted, and which ignored signals made the failure feel inevitable. A narrative forces the causes to connect (incentive led to shortcut led to undetected break), which surfaces the slow, structural and "soft" failures (stakeholder fatigue, sentiment shifts) that a flat list of independent bullets tends to miss. Then extract causal paths and controls from the story; the obituary is a discovery aid, not the final deliverable.

### Opposite-hypothesis inversion

Ask: "What evidence would make the opposite conclusion true?"

Useful for strategy, research, metrics, and arguments. This prevents a favored hypothesis from becoming unfalsifiable. The discipline mirrors Popper's falsifiability standard: a claim is stronger once you have named the specific observations that would refute it and gone looking for them. Use epistemic-grounding after this when the output needs sourced warrants.

### Consider-the-opposite debiasing

Ask: "What are the strongest reasons our current belief could be wrong?"

Useful when a recommendation feels obvious, the first interpretation is sticky, or the team is selectively accepting evidence. The goal is not to flip the belief automatically; it is to force the missing counter-case into the reasoning trace. This is the empirically grounded debiasing move (Lord, Lepper & Preston, 1984): generating reasons the other conclusion could hold corrects judgment that selective forward reasoning would distort.

### Metric inversion

Ask: "How could this metric improve while the real system gets worse?"

Useful when optimizing engagement, conversion, productivity, quality scores, or model evals. The answer exposes Goodhart's Law risk — once a measure becomes a target it stops being a good measure — along with proxy gaming and missing guardrail metrics. When metric improvements are proposed, write the specific proxy vulnerability down explicitly; "we considered Goodhart risk" is invisible to a reviewer.

### Constraint inversion

Ask: "Which constraint, if violated, would break the whole plan?"

Useful for architecture, launches, compliance, and reliability. The answer identifies load-bearing assumptions. A sharper, adversarial form is the **design stress-test**: present a design or architecture with the explicit goal of "killing" it — find the single assumption or component whose failure brings down the whole system. This adversarial stance finds high-consequence edge cases that a standard "looks fine" review skips.

### Agent self-inversion

Ask: "If this answer, code change, plan, or review comment is rejected later, what preventable issue caused the rejection?"

Useful before final responses, PR handoff, launch notes, architecture recommendations, or audit verdicts. Agents share the human forward-optimism bias: once an output *looks* plausible, the agent is inclined to mark the task done. Inversion is the cheapest counter. Three agent-specific failure modes it surfaces especially well:

- Inverting "every fact here is grounded" forces a hunt for the one **fabricated or unsupported claim** the agent asserted from memory.
- Inverting "this procedure terminates" forces a check for the **non-terminating loop** — the retry, re-plan, or self-correction step that never reaches a stop condition.
- Inverting "the task is done" forces a check for the **premature completion** — the unhandled branch, skipped verification, or partial answer hiding behind a confident sign-off.

Related agent hazards worth inverting: tool misuse, context pollution, and prompt-injection susceptibility. Convert each finding into a check: missing source, unrun test, ambiguous owner, unhandled edge case, overclaim, stale assumption, or output that does not change the user's plan. Inversion produces the *candidate* failures; confirming which are real is an evaluation/grounding job — route the verdict to `evaluation` or `epistemic-grounding` rather than treating the inverted list as a finished assessment.

### Lightweight red-team inversion

Ask: "How would a user, operator, adversary, or incentive structure misuse this?"

Useful before deploying workflows, agent tools, permission surfaces, policy changes, and automation — for example, "how would a user make this assistant leak its system prompt?" or "what input would make this tool run a destructive command?" This is a generator for misuse cases and safeguards, not a replacement for formal red-team measurement. It does not generate or execute the actual probe suite, score attack-success rates, validate that a mitigation closes the hole, wire the checks into CI, or produce a formal risk report. Inversion supplies the threat *imagination*; the disciplined enumeration, execution, scoring, and reporting belong to dedicated security-testing tooling. Treat the inverted attack ideas as a starting backlog handed off, not a completed assessment.

## Anti-Patterns

| Anti-pattern | What it looks like | Correction |
|---|---|---|
| Generic risk list | "Scope creep, communication, quality" | Rewrite each as a concrete causal path. |
| Negativity without conversion | A long list of scary outcomes | Convert each material path into prevent, detect, buffer, rehearse, accept, declare a non-goal, or redesign. |
| Catastrophe-only thinking | Only naming extreme failures | Include mundane ways plans really fail: delays, ambiguity, incentives, handoffs. |
| Conditional-only pre-mortem | Asking "what might go wrong?" and getting polite possibilities | For planning, use prospective hindsight: "It already failed; why?" |
| Anchoring | Generating failure paths only after reviewing the success plan, so the list echoes it | Generate failure paths independently first (fresh scratchpad or separate sub-agent pass), then reconcile with the plan. |
| One-sided inversion | Asking only "how could it fail?" for a claim | Also ask what evidence would make the opposite true. |
| Negative bias | Fixating on "Don't do X" instead of converting the finding into a positive constraint | State the prevention as a positive constraint — e.g. "do not use a database" becomes "store all state in memory." |
| Metric optimism | Treating a proxy improvement as success | Ask how the metric could improve while the real outcome worsens; add guardrail metrics. |
| Generic mitigation | "Be more careful" / "communicate better" | Add a structural check, a new test, or an automated alert. |
| Inversion as proof | Treating the failure list as evidence the plan is bad | Use the list to update the plan, then verify with evidence, tests, or evaluation. |
| Red-team theater | Saying "red team this" but only brainstorming scary hypotheticals | Define misuse paths, controls, owners, and follow-up verification. |
| Over-owning FMEA | Trying to score every component's S/O/D values | Use FMEA when component-level enumeration and scoring is required. |
| Post-hoc inversion | Applying inversion after the failure as if it were RCA | Use debugging or postmortem methods after the failure has occurred. |
| Hidden accepted risk | Deciding not to control a failure path but not saying so | Record the accepted-risk rationale, owner, and trigger for revisiting it. |
| No plan update | Treating the inverted list as the final artifact | Update the forward plan or decision. |

## Verification

After applying this skill, verify:

- [ ] The forward goal, claim, metric, or design target is specific.
- [ ] The real outcome behind any proxy metric is named.
- [ ] The inversion prompt matches the target type: anti-goal, prospective hindsight, opposite hypothesis, metric backfire, constraint, self-review, or lightweight red team.
- [ ] Failure paths are concrete causal paths, not generic categories.
- [ ] Anchoring was avoided through independent or exhaustive generation.
- [ ] The list includes mundane and high-consequence failures.
- [ ] At least one opposite-hypothesis or metric-backfire check was considered when claims or metrics are involved.
- [ ] When metric improvements are proposed, the specific proxy vulnerability (Goodhart risk) is written down explicitly.
- [ ] Every material failure path maps to prevent, detect, buffer, rehearse, accept, declare a non-goal, or redesign.
- [ ] Accepted risks have an explicit rationale, owner, and revisit trigger.
- [ ] Inverted scope or architecture boundaries are recorded as explicit non-goals with rationale, owner, and revisit trigger.
- [ ] Narrative frames such as a project obituary have been translated back into concrete causal paths and controls.
- [ ] The forward plan, claim, or design changed or the accepted-risk rationale is explicit.
- [ ] Formal protocols were not over-owned: FMEA scoring, pre-mortem facilitation, post-failure RCA, and full AI/security red teaming are routed to their owners.
- [ ] The output does not pretend inversion is evidence, proof, or a post-failure root-cause method.

## Do NOT Use When

| Use instead | When |
|---|---|
| `first-principles-thinking` | You need to decompose a problem to irreducible premises and rebuild from fundamentals. |
| `debugging` or `problem-locating-solving` | A failure already occurred and you need root-cause isolation. |
| `pattern-recognition` | You need to cluster repeated failures into a recurring pattern and build prevention. |
| `epistemic-grounding` | You need to test whether a claim is sourced, warranted, and qualified. |
| `evaluation` | You need to judge a completed artifact against acceptance criteria and evidence. |
| Dedicated FMEA process | You need component-level failure-mode enumeration with severity, occurrence, detectability, RPN, action priority, and formal closure. |
| Dedicated pre-mortem facilitation | You need a team exercise with assumed future failure, independent written generation, group synthesis, and facilitation mechanics. |
| Dedicated AI/security red-team workflow | You need adversarial probe generation, automated scoring, vulnerability taxonomy, mitigation validation, CI integration, or formal risk reporting. |

## Key Sources

- **Carl Gustav Jacob Jacobi** is associated with the maxim *"man muss immer umkehren"* ("one must always invert"). Edward B. Van Vleck's 1916 Bulletin of the American Mathematical Society address records the phrase in mathematical context (the attribution is reported through that line rather than a primary Jacobi source); the practical lesson is to transform a hard forward problem into an easier reverse one.
- **George Pólya**, *How to Solve It* (Princeton University Press, 1945), formalized **working backwards** as a problem-solving heuristic: start from the desired end state and trace steps back to something already known or controllable. This is the constructive, problem-solving half of inversion, distinct from the risk-avoidance half.
- **Charlie Munger** popularized inversion as a general decision-making mental model, borrowing Jacobi's phrase and emphasizing avoidance of predictable stupidity (the ruin path) before pursuit of brilliance. His worked example: *"All I want to know is where I'm going to die, so I'll never go there."*
- **Lord, Lepper & Preston**, *"Considering the Opposite: A Corrective Strategy for Social Judgment"* (Journal of Personality and Social Psychology, 1984, DOI 10.1037//0022-3514.47.6.1231), grounds consider-the-opposite debiasing as a distinct claim-level inversion move: prompting people to consider the opposite conclusion reduced biased assimilation and overconfidence more than telling them to be fair.
- **Mitchell, Russo & Pennington**, *"Back to the Future: Temporal Perspective in the Explanation of Events"* (Journal of Behavioral Decision Making, 1989), introduced the prospective-hindsight finding used by **Gary Klein's** *"Performing a Project Premortem"* (Harvard Business Review, 2007): imagining a future outcome as already occurred improved correct cause identification by roughly 30%.
- **Karl Popper's** falsification frame in *Conjectures and Refutations* (1963) supports opposite-hypothesis testing: a claim becomes stronger when the conditions that would refute it are made explicit and tested. The accurate point is falsifiability/refutability — naming observations that would contradict the theory — with practical falsification remaining methodologically complex, not "a hypothesis is scientific only if it can be proven false."
- **Goodhart's Law** (originating in Charles Goodhart's 1975 monetary-policy work, later popularized as "when a measure becomes a target, it ceases to be a good measure") is the failure mode that metric inversion is designed to catch: proxy targets can stop representing the real outcome and invite gaming.
- **Reliability methods such as FMEA** are adjacent formalizations: they convert possible failure modes into prioritized mitigation work, with severity/occurrence/detectability scoring and action-priority closure that inversion deliberately does *not* carry.
- **Modern AI red-team and reasoning-tool guidance** treats adversarial probing, systematic measurement, and tool-supported thinking as complementary execution supports; they specialize and operationalize a subset of inversion rather than displacing it as a portable reasoning move.
