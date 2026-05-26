---
name: problem-framing
description: "Use when a team is converging on solutions before agreeing on the problem, when a brief reads as a feature request, when symptoms and root needs are tangled, or when assumptions need surfacing before design work proceeds. Do NOT use for code-level bug triage, runtime failure diagnosis, or root-cause analysis of system errors — those are engineering investigation tasks, not design problem framing."
license: CC-BY-4.0
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
  category: design

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: design-craft
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-12"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-12\"}"

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
  keywords: "[\"how might we\",\"problem statement\",\"reframing\",\"assumption mapping\",\"root need\",\"symptom vs need\",\"point of view statement\",\"jobs to be done framing\",\"design challenge\",\"double diamond discover\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"frame this problem\",\"how might we\",\"write a problem statement\",\"this brief is a solution\",\"what are we actually solving\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"We've been asked to 'add a chatbot' — help me reframe what we're actually solving for users.\",\"Draft three how-might-we statements from these synthesis insights.\",\"The PRD jumps straight to features; help me extract the underlying user problem.\",\"List the assumptions baked into this product brief and rank them by riskiness.\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Find the bug causing the 500 error in the checkout endpoint.\",\"Why is the test suite flaky on CI?\",\"Classify whether this agent request is high-risk before executing.\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"user-research\",\"ideation\",\"research-synthesis\",\"design-thinking\"],\"boundary\":[{\"skill\":\"problem-locating-solving\",\"reason\":\"problem-locating-solving handles bug localization in source code — concrete failure traced to a line or function. problem-framing handles ambiguous human/business problems where the question itself is unclear and there is no error to reproduce.\"},{\"skill\":\"diagnosis\",\"reason\":\"diagnosis handles failure triage of broken systems and incidents. problem-framing handles upstream definition of what a team should be working on at all.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/problem-framing/SKILL.md
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

# Problem Framing

## Coverage
Problem framing covers the practices that move a team from a vague request, complaint, or feature brief to a sharply articulated problem statement that does not pre-commit to a solution. Core techniques include the **How Might We** reformulation (popularized by IDEO and the Stanford d.school), the **point-of-view statement** (`<user> needs <need> because <insight>`), **jobs-to-be-done** problem articulation (Clayton Christensen, Tony Ulwick), **assumption mapping** to surface what a team is taking on faith, and **5 Whys** style symptom-to-need laddering when a presenting issue masks a deeper one. The UK Design Council's Double Diamond names this entire phase **Discover → Define**, and treats the transition from divergent discovery to convergent problem definition as a distinct skill from solutioning.

The practice draws a hard line between three things that beginners conflate: a **symptom** (an observed irritant), a **problem** (a structured statement of an unmet need), and a **solution** (a proposed intervention). A brief that says "add notifications" is a solution; "users miss time-sensitive updates" is a problem; "I keep forgetting to renew my license" is a symptom. Reframing techniques surface which level the team is operating at and explicitly demote solutions back to problems before ideation begins.

A separate body of methods addresses **problems that are already solutions in disguise**. Tim Brown's HBR essay (2008) and the Stanford d.school bootleg argue that the biggest single failure mode in human-centered work is solving the wrong problem confidently. Tools like the **5 Whys**, **assumption laddering**, and the **inversion technique** (asking what would make the problem worse) are designed to expose where a brief embeds an unexamined causal claim.

## Philosophy
Problem framing exists because solutions are cheap to imagine and expensive to build — and the cost of building the wrong solution dwarfs the cost of spending another day on the question. The discipline insists that ambiguity at the top of the funnel is not a bug to be eliminated by acting quickly; it is a signal that more discovery is needed. A well-framed problem is narrow enough to act on, broad enough to admit several solutions, and honest about which user it serves.

The practice is opinionated about language. "How might we" is not interchangeable with "how do we" — the conditional voice keeps possibility open. A point-of-view statement that names a solution ("users need a dashboard") has framed nothing; one that names a need ("users need to know whether they are on track without opening the app") has. Framing rewards precision over poetry: every word in the problem statement should be defensible against the question "what evidence supports this word being here?"

## Verification
- The problem statement can be read aloud in one sentence without naming a specific solution, feature, or technology.
- At least one assumption in the original brief has been promoted to an explicit, testable claim — not silently accepted.
- A reader who did not attend the framing session can identify the user, the need, and the insight that motivates the need.
- The team can articulate at least two materially different solutions that would satisfy the problem statement — confirming the frame is not solution-shaped.
- The "5 Whys" or equivalent laddering has been applied at least once to the presenting symptom, and the team agrees the chosen level is the right altitude to act on.
- The how-might-we is neither too narrow (admitting only the obvious solution) nor too broad (admitting solutions the team cannot ship).

## Do NOT Use When
- A specific software component is failing and the question is "where in the code does this break" — use **problem-locating-solving** for bug localization.
- A production incident is in progress and the team needs to triage a failure — use **diagnosis**.
- The problem is fully understood and the next action is generating solution concepts — go directly to **ideation**.
- There is no research evidence yet about the user or context, only opinions in the room — gather primary input first via **user-research**, then return to framing with data.
- The task is decomposing a single known task into UI steps — use **task-analysis** instead of journey-spanning framing.
- The "problem" is an internal engineering modeling exercise (event flows, bounded contexts) — use **event-storming** or **conceptual-modeling**.
