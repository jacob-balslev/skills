---
name: user-research
description: "Use when planning or conducting generative qualitative research with real users — interviews, contextual inquiry, ethnographic observation, diary studies — to learn what people do, think, and need in their own context. Do NOT use for analytics review, survey statistics, A/B test interpretation, or agent-side intent classification — those are different research practices entirely."
license: CC-BY-4.0
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
  subject: design-craft
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-12"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-12\"}"

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
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"user interviews\",\"contextual inquiry\",\"ethnographic observation\",\"diary study\",\"generative research\",\"qualitative research\",\"interview guide\",\"leading questions\",\"master-apprentice model\",\"in-context observation\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"interview users\",\"user research plan\",\"what to ask users\",\"contextual inquiry\",\"diary study\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Draft an interview guide for SMB founders adopting their first accounting software.\",\"How do I observe ICU nurses on shift without disturbing the workflow?\",\"Review my interview script for leading questions and solution-prompts.\",\"Plan a two-week diary study for commuters using public transit apps.\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Analyze last quarter's NPS results and produce a dashboard.\",\"Classify whether this agent request from the user is high-risk before executing.\",\"Set up an A/B test of two onboarding flows.\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"problem-framing\",\"research-synthesis\",\"usability-testing\",\"design-thinking\"],\"boundary\":[{\"skill\":\"intent-recognition\",\"reason\":\"intent-recognition classifies an agent request's risk level at runtime from the agent's perspective. user-research investigates real human users' goals, contexts, and needs through fieldwork — these are entirely different practices that share only the word 'intent'.\"},{\"skill\":\"usability-testing\",\"reason\":\"usability-testing is evaluative — it watches users attempt tasks on an artifact to find usability defects. user-research is generative — it studies users before any artifact exists, to discover needs and context.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/user-research/SKILL.md
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

# User Research

## Coverage
User research covers the generative qualitative methods that surface what people do, think, feel, and need — typically before a solution exists. The core methods are **semi-structured interviews** (Steve Portigal, Tomer Sharon), **contextual inquiry** with its master-apprentice stance (Beyer & Holtzblatt), **ethnographic observation** in the user's actual environment, **diary studies** for behaviors that unfold over days or weeks, and **intercept studies** for in-the-moment reactions. Each method trades off depth, naturalism, scale, and scheduling cost differently; choosing well depends on what kind of evidence the project needs.

The skill includes the craft of **interview construction**: opening with broad context questions, moving to specific recent episodes ("tell me about the last time you…"), avoiding hypotheticals ("would you use…") and leading prompts ("don't you find it frustrating that…"), and using silence as a tool. The **critical incident technique** (Flanagan) and **5 Whys** laddering are used in-session to push past surface answers. The practice also includes what NOT to do: solution-prompting, confirmation seeking, anchoring on the interviewer's own hypothesis, interrupting, and steering toward a preferred narrative.

Contextual methods extend interviews into the user's environment. **Contextual inquiry** treats the user as the master craftsperson and the researcher as an apprentice asking clarifying questions while the user works. **Fly-on-the-wall observation** removes the researcher's questions entirely. **Shadowing** follows a single user through their day. Each makes different trade-offs between naturalism (less intrusion → more authentic behavior) and depth (more questions → richer interpretation).

Diary and longitudinal methods cover behaviors that do not surface in a single session. Daily prompts, photo diaries, and experience sampling (Csíkszentmihályi) capture in-context moments and reduce recall bias.

## Philosophy
User research is harder than it looks because the natural conversational instincts that make humans good company — finishing each other's sentences, offering sympathy, confirming what the other person seems to want to hear — actively destroy data quality. The discipline trains interviewers to do the opposite: leave silence intact, ask the participant to "say more about that" instead of paraphrasing, and treat surprise as the signal that the conversation is producing new information.

The practice is grounded in a specific epistemological claim: people are unreliable narrators of their own behavior, especially when asked hypothetical or future-tense questions, but they are reasonably reliable when describing concrete recent episodes. This is why methods skew toward "tell me about the last time" over "would you ever" — episodic memory is more trustworthy than self-prediction. It is also why observation outranks interview when the project can afford it: what people do and what people say they do are routinely different.

## Verification
- The interview guide contains no leading, hypothetical, or solution-prompting questions; every question can be answered by describing a real past event.
- Sessions are recorded (with consent) so synthesis works from primary data, not interviewer memory.
- At least one finding from the research contradicts a hypothesis the team held going in — if every finding confirms prior beliefs, the questions were probably leading.
- For contextual studies, observation happened in the user's real environment, not a lab simulation of it.
- Sample composition is documented and matches the recruitment criteria — including who was excluded and why.
- The researcher can name what they don't yet know after the session, not just what they confirmed.

## Do NOT Use When
- The question is quantitative (how many, what percentage, statistical significance) — use survey or analytics methods, not generative interviews.
- A working artifact already exists and the question is "does this artifact work for users" — use **usability-testing**.
- The team needs to make sense of research that has already been collected — use **research-synthesis**.
- The "user" is an agent or system, not a human — interview methods do not transfer to non-humans.
- The team has not yet agreed on what problem they are studying — return to **problem-framing** first, then design research to investigate the framed problem.
- The need is to evaluate a feature against a hypothesis with a control group — use experimental methods (A/B, RCT), not interviews.
