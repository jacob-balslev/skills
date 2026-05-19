---
name: prioritization
description: "Use when ranking initiatives, roadmap candidates, research experiments, release scope, or AI-agent work by value, confidence, effort, ambiguity, and constraint impact. Covers RICE, a clearly marked RICE-A extension for AI ambiguity, ICE for experiment triage, MoSCoW for timeboxed scope, and human-vs-agent delegation priority. Do NOT use for one-off execution sequencing, UX top-task decomposition (use `task-analysis`), spec authoring (use `spec-driven-development`), or bottleneck/throughput diagnosis (use `constraint-awareness`)."
license: MIT
compatibility:
  notes: "Markdown, Git, agent-skill runtimes"
allowed-tools: Read Grep Bash
grounding:
  domain_object: "Initiative prioritization using RICE, ICE, MoSCoW, and AI-agent delegation heuristics"
  grounding_mode: "hybrid"
  truth_sources:
    - https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/
    - https://www.agilebusiness.org/dsdm-project-framework/moscow-prioritisation.html
    - https://static1.squarespace.com/static/5facca71a363746603c14e78/t/64e555174411633dcd180ed3/1692751130900/eBook-ICE-Done-Right-Itamar-Gilad%5B3191%5D.pdf
  failure_modes:
    - score_treated_as_truth_instead_of_decision_aid
    - rice_a_presented_as_standard_rice
    - confidence_score_not_grounded_in_evidence
    - moscow_must_bucket_overfilled
    - dependencies_and_constraints_hidden_by_numeric_score
    - experiment_triage_used_as_launch_commitment
    - prioritization_confused_with_task_execution_order
  evidence_priority: "equal"
metadata:
  schema_version: 6
  version: "1.1.0"
  type: capability
  category: quality
  domain: quality/strategy
  scope: reference
  owner: skill-graph-maintainer
  freshness: "2026-05-19"
  drift_check: "{\"last_verified\":\"2026-05-19\"}"
  eval_artifacts: planned
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: experimental
  keywords: "[\"prioritization\",\"priority ranking\",\"roadmap prioritization\",\"RICE\",\"RICE score\",\"ICE\",\"MoSCoW\",\"RICE-A\",\"AI ambiguity\",\"feature ranking\",\"research prioritization\",\"experiment triage\",\"release scope\",\"MVP scope\",\"backlog ranking\",\"must should could wont\",\"confidence evidence\",\"effort vs impact\",\"agent delegation priority\",\"human vs agent matrix\"]"
  triggers: "[\"prioritization-skill\",\"roadmap-skill\",\"priority-planning-mode\"]"
  examples: "[\"rank these roadmap candidates with RICE and explain the trade-offs\",\"which AI research experiment should run first given these impact and confidence notes?\",\"turn this release wishlist into Must/Should/Could/Won't for the next milestone\",\"this model feature has high value but high uncertainty -- score it with RICE-A\",\"which work should agents do first to reduce human review load?\",\"compare the priority of these five features without pretending the score is absolute truth\"]"
  anti_examples: "[\"what exact order should I execute these three already-approved tasks today?\",\"write the specification for this feature before implementation\",\"analyze why this onboarding page has too many steps\",\"diagnose the bottleneck in our agent review process\",\"estimate the implementation effort for this one ticket only\",\"approve this PR based on priority\"]"
  relations: "{\"related\":[\"constraint-awareness\",\"methodology\"],\"boundary\":[{\"skill\":\"constraint-awareness\",\"reason\":\"constraint-awareness diagnoses the system bottleneck and whether a process reduces demand on it; prioritization ranks candidate initiatives after the decision context is known\"},{\"skill\":\"spec-driven-development\",\"reason\":\"spec-driven-development defines requirements, plans, tasks, and verification for selected work; prioritization decides what work deserves that treatment\"},{\"skill\":\"task-analysis\",\"reason\":\"task-analysis decomposes user goals and UX route tasks; prioritization ranks initiatives, experiments, and scope candidates across a backlog\"},{\"skill\":\"methodology\",\"reason\":\"methodology designs quality gates and process discipline; prioritization chooses among competing work using scoring and scope frameworks\"}],\"verify_with\":[\"constraint-awareness\",\"methodology\"]}"
  grounding: "{\"domain_object\":\"Initiative prioritization using RICE, ICE, MoSCoW, and AI-agent delegation heuristics\",\"grounding_mode\":\"hybrid\",\"truth_sources\":[\"https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/\",\"https://www.agilebusiness.org/dsdm-project-framework/moscow-prioritisation.html\",\"https://static1.squarespace.com/static/5facca71a363746603c14e78/t/64e555174411633dcd180ed3/1692751130900/eBook-ICE-Done-Right-Itamar-Gilad%5B3191%5D.pdf\"],\"failure_modes\":[\"score_treated_as_truth_instead_of_decision_aid\",\"rice_a_presented_as_standard_rice\",\"confidence_score_not_grounded_in_evidence\",\"moscow_must_bucket_overfilled\",\"dependencies_and_constraints_hidden_by_numeric_score\",\"experiment_triage_used_as_launch_commitment\",\"prioritization_confused_with_task_execution_order\"],\"evidence_priority\":\"equal\"}"
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  lifecycle: "{\"stale_after_days\":90,\"review_cadence\":\"quarterly\"}"
  mental_model: "Prioritization is a bounded comparison of options under constraints. Scores are a disciplined conversation starter, not a proof. First choose the decision context, then choose the framework, then expose assumptions, dependencies, confidence, and explicit trade-offs."
  purpose: "Prevent agents from picking work because it is recent, interesting, loud, or easy. The skill turns a list of candidate initiatives into a ranked recommendation with visible evidence, uncertainty, and scope decisions."
  boundary: "Owns ranking candidate initiatives, research experiments, release scope, and AI-agent delegation opportunities. Does not own writing the selected feature spec, sequencing already-approved execution tasks, diagnosing throughput bottlenecks, UX top-task decomposition, or PR approval."
  analogy: "Prioritization is portfolio triage: a scorecard can show which patient needs attention first, but the clinician still checks constraints, dependencies, and evidence quality before acting."
  misconception: "The common mistake is treating a numeric score as objective truth. The score is only as good as the assumptions behind reach, impact, confidence, effort, ambiguity, and scope constraints."
  concept: "{\"definition\":\"Prioritization is disciplined ranking of candidate work by expected value, confidence, effort, uncertainty, and delivery constraints.\",\"mental_model\":\"Pick the comparison set and time horizon first; score comparable items second; then challenge assumptions, dependencies, and confidence before recommending an order.\",\"purpose\":\"It prevents recency bias, loudest-stakeholder bias, interesting-work bias, and false certainty in AI-assisted planning.\",\"boundary\":\"It ranks initiatives, experiments, release scope, and delegation opportunities; it does not define the full spec, execute the task list, diagnose bottlenecks, or approve implementation quality.\",\"taxonomy\":\"A quality/strategy capability adjacent to constraint-awareness, methodology, spec-driven-development, and task-analysis.\",\"analogy\":\"Prioritization is portfolio triage: scorecards focus attention, but evidence and constraints decide the final recommendation.\",\"misconception\":\"A higher score is not a guarantee of correctness. Scores expose assumptions so they can be challenged.\"}"
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/quality/prioritization/SKILL.md
---
# Prioritization

## Domain Context

**What is this skill?** This skill provides portable prioritization frameworks for AI-assisted engineering and product work: RICE for product initiatives, RICE-A as a local extension when AI/model ambiguity changes confidence, ICE for fast experiment triage, MoSCoW for timeboxed release scope, and a human-vs-agent delegation matrix for deciding where agent work has the highest leverage. Use it when ranking a backlog, choosing research experiments, narrowing release scope, or deciding which agent tasks are worth doing first. Do not use it for one-off execution order, writing the selected spec, UX route task analysis, or bottleneck diagnosis.

## Public Grounding

This skill is grounded in three public sources checked on 2026-05-19:

| Source | What it grounds | How this skill uses it |
|---|---|---|
| Intercom RICE | Reach, Impact, Confidence, Effort, and the "not a hard rule" caveat | Product initiative ranking and score humility |
| Agile Business Consortium MoSCoW | Must/Should/Could/Won't, timebox focus, Must Have tests, and contingency guidance | Release and MVP scope decisions |
| Itamar Gilad ICE guide | Impact, Confidence, Ease, experiment scoring, and evidence-based confidence | Research experiment triage |

RICE-A and the Human vs. Agent matrix are local AI-agent extensions. They are useful heuristics, not external standards. Keep that distinction explicit when citing sources or teaching the skill.

## Coverage

This skill covers:

- framework selection for product, research, release, and agent-delegation decisions
- RICE scoring for product initiatives
- RICE-A scoring for AI/model work with material ambiguity
- ICE scoring for research experiments and fast discovery loops
- MoSCoW scoping for timeboxed releases and MVP decisions
- confidence and evidence discipline
- dependencies, constraints, and override notes that numeric scores hide
- recommendation format for ranked output

It does not cover full product strategy, task execution order inside an already-selected plan, estimating one ticket in isolation, spec writing, UX top-task analysis, or code-review approval.

## Philosophy

Agents often pick work because it was mentioned last, looks interesting, has the cleanest implementation path, or feels easy to automate. That is not prioritization. Prioritization is a comparison of candidate work against a shared decision context: goal, time horizon, constraints, evidence quality, and effort.

Scores help because they force assumptions into the open. They fail when agents treat them as objective truth. A RICE score with guessed reach and guessed effort is not more rigorous than a sentence explaining the guess. The right output is a ranked recommendation with assumptions and trade-offs visible enough for a reviewer to challenge.

AI-assisted development adds one extra failure mode: experimental model work can look high-value while carrying unknown performance, evaluation, and data risk. RICE-A adds an explicit ambiguity penalty so speculative AI features pass through discovery before competing with proven product work.

## 1. Choose The Framework

Pick the framework by decision phase, not by habit.

| Decision context | Use | Why |
|---|---|---|
| Product roadmap or feature backlog | RICE | Compares reach, impact, confidence, and effort across user-facing initiatives |
| AI/model feature with material unknowns | RICE-A | Adds explicit ambiguity so speculative work is not scored like proven work |
| Research backlog with many possible tests | ICE | Quickly orders experiments by impact, evidence confidence, and ease |
| Fixed milestone, MVP, or release scope | MoSCoW | Creates explicit Must/Should/Could/Won't trade-offs inside a timebox |
| Agent work portfolio | Human vs. Agent matrix | Prioritizes high-human-effort / low-agent-effort work first |
| Throughput bottleneck or approval-load problem | `constraint-awareness` | The problem is the system constraint, not backlog scoring |
| Requirements/specification for selected work | `spec-driven-development` | The work has been selected and now needs a traceable spec/plan |

## 2. RICE - Product Initiative Ranking

Use RICE when comparing product initiatives with a shared goal and enough data to estimate reach and effort.

```text
RICE = (Reach * Impact * Confidence) / Effort
```

| Factor | Meaning | Evidence to prefer |
|---|---|---|
| Reach | How many users/events are affected within the chosen time period | analytics, funnel counts, support volume, account counts |
| Impact | Expected change for each affected user/event | product goal, conversion lift estimate, user pain severity |
| Confidence | How much evidence supports reach, impact, and effort | measured data, research, prior experiment, comparable launch |
| Effort | Total work across engineering, design, product, data, and review | historical delivery data, team estimate, known dependencies |

### RICE Rules

- Define the goal and time period before scoring.
- Use the same scale across every candidate in the comparison set.
- Lower confidence when the estimate is mostly opinion.
- Treat dependencies, table-stakes work, legal/safety requirements, and sequencing constraints as explicit override notes.
- Do not hide a strategic override by manipulating numbers.

## 3. RICE-A - AI Ambiguity Extension

RICE-A is this skill's local extension for AI-assisted product work. It is not part of standard RICE.

Use it when model quality, data availability, eval reliability, latency/cost, or workflow acceptance is still uncertain enough to affect delivery.

```text
RICE-A = (Reach * Impact * Confidence) / (Effort * AmbiguityFactor)
```

| Ambiguity | Factor | Meaning |
|---:|---:|---|
| 1 | 1.00 | Deterministic or already proven in this context |
| 2 | 1.25 | Some uncertainty, but known evaluation path |
| 3 | 1.50 | Moderate unknowns in data, eval, latency, or user acceptance |
| 4 | 2.00 | High research uncertainty; discovery should precede product commitment |
| 5 | 2.50 | Highly experimental; score only to justify research, not launch scope |

### RICE-A Rules

- If ambiguity is 4 or 5, route the item into ICE research before treating it as product delivery.
- Do not double-penalize the same uncertainty in both Confidence and Ambiguity. Use Confidence for evidence quality; use Ambiguity for unknown unknowns and evaluation risk.
- Name what would reduce ambiguity: dataset, prototype, benchmark, user test, latency profile, cost model, or failure taxonomy.
- Keep the ambiguity factor visible in the output.

## 4. ICE - Research Experiment Triage

Use ICE when ranking many possible experiments and the goal is learning, not launch commitment.

```text
ICE = Impact * Confidence * Ease
```

| Factor | Meaning | Good evidence |
|---|---|---|
| Impact | Expected movement on the target metric or decision | baseline metric, expected lift, user pain, strategic value |
| Confidence | Strength of evidence behind the impact estimate | prior test, user signal, prototype result, benchmark |
| Ease | How quickly the experiment can run to decision-quality evidence | small scope, available data, simple instrumentation, low dependency load |

### ICE Rules

- Score experiments against one target metric or learning question.
- Favor experiments that can change a decision, not experiments that merely produce activity.
- Do not use ICE to commit to shipping a feature; use it to decide what to test next.
- Prefer "high confidence, medium impact" over "huge impact, no evidence" when only one experiment can run.
- Record what result would promote the experiment into RICE or RICE-A product scoring.

## 5. MoSCoW - Timeboxed Scope

Use MoSCoW when scope must fit a release, MVP, increment, or other fixed timeframe.

| Category | Meaning | Test |
|---|---|---|
| Must Have | Required for the timebox to be viable | Would we cancel or defer the release if this is absent? |
| Should Have | Important, but the timebox can still succeed without it | Is there a tolerable workaround or later delivery path? |
| Could Have | Desirable contingency scope | Would dropping this protect more important work with limited pain? |
| Won't Have this time | Explicitly out of scope for this timeframe | Are we willing to stop informal reintroduction during this timebox? |

### MoSCoW Rules

- Define the timeframe first. A Must for the whole project may be a Should or Could for the first increment.
- Keep Must Have effort small enough to preserve delivery confidence. DSDM commonly recommends no more than 60% Must Have effort in typical project conditions, but treat that as guidance, not universal law.
- Start with items as Won't Have when scope pressure is high, then justify promotion.
- If everything is Must Have, decompose requirements until real trade-offs appear.
- Document why each Must is truly non-negotiable.
- Revisit priorities at the end of the increment or timebox.

## 6. Human vs. Agent Matrix

Use this for an AI-agent work portfolio, especially when the backlog contains audits, tests, migrations, documentation, and review preparation.

```text
                         AI effort
                 High                 Low
Human effort  +-------------------+-------------------+
High          | AI-assisted       | Gold quadrant     |
              | research/design   | bulk tests, audit |
              +-------------------+-------------------+
Low           | Usually ignore    | automate if free  |
              | or batch later    | small chores      |
              +-------------------+-------------------+
```

Prioritize the Gold quadrant first: high human effort, low agent effort. These items reduce demand on scarce human attention when done well. Verify with `constraint-awareness` when the real question is whether the work reduces the system bottleneck.

## 7. Output Format

Use this compact format for ranked recommendations.

```markdown
## Priority Recommendation

Decision context: <roadmap | research | release scope | agent work portfolio>
Framework: <RICE | RICE-A | ICE | MoSCoW | Human vs. Agent>
Time horizon: <period or milestone>

| Rank | Item | Score / Category | Evidence | Main risk | Next proof |
|---:|---|---:|---|---|---|
| 1 | <item> | <score> | <why> | <risk> | <check> |

Recommended first move: <one sentence>
Overrides / constraints: <dependencies, table stakes, legal/safety, sequencing>
Residual uncertainty: <what would change the ranking>
```

For MoSCoW, replace Rank with Category and include Must/Should/Could/Won't sections.

## 8. Anti-Patterns

| Anti-pattern | Why it fails | Repair |
|---|---|---|
| Score theater | Numbers imply rigor while inputs are guesses | Show assumptions and confidence evidence |
| Loudest-stakeholder priority | Political pressure replaces comparison | Use a shared scoring table and explicit overrides |
| Everything is Must Have | No contingency remains | Decompose requirements and retest Must criteria |
| RICE-A as standard RICE | Local AI ambiguity extension is misrepresented | Label RICE-A as a local extension every time |
| ICE as launch approval | Experiment rank becomes product commitment | Promote successful experiments into RICE/RICE-A first |
| Hidden dependency | High score ignores prerequisite work | Add override notes and sequence constraints |
| Agent convenience bias | Work is chosen because agents can do it easily | Use the human-vs-agent matrix and constraint lens |

## Verification

```text
PRIORITIZATION CHECK
====================
[ ] Decision context and time horizon are explicit.
[ ] Framework matches the phase.
[ ] Comparison set contains comparable items.
[ ] Inputs are evidence-labeled, not just scored.
[ ] Confidence is grounded in data quality, not vibes.
[ ] Dependencies, table stakes, legal/safety constraints, and sequencing overrides are visible.
[ ] RICE-A is labeled as a local extension when used.
[ ] High ambiguity work has a discovery path before product commitment.
[ ] MoSCoW Must Haves pass the cancel/defer test.
[ ] Output names the next proof that could change the ranking.
```

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Sequencing already-approved tasks inside a single session | current task workflow or task runner | Prioritization chooses what to select; execution workflow orders already-selected work |
| UX route or onboarding task decomposition | `task-analysis` | task-analysis owns user goal, top task, and flow friction |
| Defining requirements, specs, and traceable implementation plans | `spec-driven-development` | prioritization ranks candidate work; SDD defines selected work |
| Diagnosing the throughput bottleneck or human attention constraint | `constraint-awareness` | constraint-awareness decides whether a process reduces demand on the bottleneck |
| Designing quality gates, process methodology, or audit checklists | `methodology` | methodology owns process design; prioritization owns ranking choices |
| Approving implementation quality after a diff exists | code-review tooling | priority does not prove correctness |
