---
name: research-synthesis
description: "Use when turning raw qualitative research output (interview transcripts, field notes, diary entries, observation logs) into themes, patterns, insight statements, and design-ready artifacts via affinity mapping, empathy maps, and jobs-to-be-done framing. Do NOT use for collecting new research, quantitative analysis, statistical inference, or summarizing a single document — synthesis specifically operates on a corpus of qualitative evidence."
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
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Turning raw qualitative research output (interview transcripts, field notes, diary entries, observation logs) into themes, patterns, insight statements, and design-ready artifacts via affinity mapping, empathy maps, and jobs-to-be-done framing. Portable across any qualitative-research effort; principle-grounded, not repo-bound. Excludes collecting new research (user-research), quantitative analysis and statistical inference, and summarizing a single document (synthesis operates on a corpus of qualitative evidence)."
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
  keywords: "[\"affinity mapping\",\"empathy map\",\"insight statement\",\"theme clustering\",\"jobs to be done synthesis\",\"qualitative coding\",\"research wall\",\"downloading research\",\"say think do feel\",\"persona drafting\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"synthesize research\",\"affinity map\",\"empathy map\",\"find themes in interviews\",\"insight statements\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Cluster these 14 interview transcripts into themes using affinity mapping.\",\"Build an empathy map for the 'first-time buyer' segment from these field notes.\",\"Turn this set of observations into three insight statements I can take into ideation.\",\"Draft a jobs-to-be-done statement from this user research corpus.\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Run more interviews with five additional participants.\",\"Calculate the response rate of the survey.\",\"Summarize this single PDF document.\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"user-research\",\"journey-mapping\",\"problem-framing\",\"design-thinking\"],\"boundary\":[{\"skill\":\"user-research\",\"reason\":\"user-research collects primary qualitative data. research-synthesis transforms that data into design-ready themes. Both are needed, in that order.\"},{\"skill\":\"conceptual-modeling\",\"reason\":\"conceptual-modeling synthesizes domain entities and their relationships for engineering. research-synthesis synthesizes human behavior and need patterns for design — different output shapes, different audiences.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/research-synthesis/SKILL.md
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

# Research Synthesis

## Coverage
Research synthesis covers the methods that turn raw qualitative material into structured insight a team can act on. The canonical technique is **affinity mapping** (Jiro Kawakita's KJ method), where individual observations are written on cards or sticky notes, posted on a wall, and clustered bottom-up into emergent themes — without imposing pre-existing categories. Adjacent methods include **empathy mapping** (XPLANE / Dave Gray, "Say / Think / Do / Feel" quadrants), **insight statement** writing (a tension or surprise condensed into one sentence), **jobs-to-be-done synthesis** (extracting the functional, emotional, and social jobs a user is hiring a product to do), and **persona drafting** when patterns are stable enough to warrant archetypes.

The skill includes the mechanics of **downloading research** — getting raw observations off transcripts and onto a shared surface (physical wall or digital board) as atomic units, one observation per card, in the participant's words where possible. This is the unglamorous part of the work and it is non-negotiable: themes that emerge from a wall of evidence are defensible; themes that emerge from memory or impression are not.

The practice distinguishes **descriptive themes** (what we heard) from **interpretive insights** (what it means) from **point-of-view statements** (what we will act on). Each layer requires the previous one as evidence. A common synthesis output is a small set of insight statements, each in the form of an observation + interpretation + implication ("Users batch-process invoices on Fridays because their bookkeeper visits on Mondays — current weekly cadence misses this rhythm"), which then feed directly into problem framing or ideation.

## Philosophy
Synthesis is where qualitative research either pays off or quietly fails. The temptation is to read transcripts, form an impression, and write a summary — but impression-based summaries reproduce the researcher's priors rather than the participants' patterns. Affinity mapping is deliberately slow and physical because the act of moving cards forces the researcher to keep evaluating whether two observations actually belong together, instead of subsuming them under a comfortable label.

The discipline is wary of premature abstraction. A theme named too early ("users want simplicity") becomes a magnet that pulls unrelated observations into it. The IDEO field guide and the Stanford d.school bootleg both teach delaying naming as long as possible — clustering by proximity first, naming only when the cluster's shape is undeniable. The same caution applies to personas: a persona built before patterns have stabilized fossilizes a guess, then teams optimize for a fictional user instead of real ones.

## Verification
- Every theme on the affinity wall traces back to at least two specific cards (observations), and each card is attributable to a specific session or participant.
- Themes were named *after* the clusters formed, not before — the researcher can recount the moment the cluster's identity became clear.
- At least one insight contradicts something the team believed before the research started; if every insight is comfortable, the synthesis was likely too charitable to existing assumptions.
- The output distinguishes observations, interpretations, and implications — they are not collapsed into a single bullet list.
- A reader unfamiliar with the raw research can read the synthesis and predict, in rough strokes, what a participant said — meaning the synthesis preserves enough specificity to be falsifiable.
- The synthesis is small enough to act on (typically 3–7 themes, not 20) — if everything is a theme, nothing is.

## Do NOT Use When
- No primary research has been conducted yet — run **user-research** first; there is nothing to synthesize.
- The question is quantitative (counts, percentages, trends over time) — use statistical analysis rather than affinity methods.
- The corpus is a single document or a small set of internal artifacts — synthesis methods are designed for cross-session pattern extraction, not document summarization.
- The team needs to model an engineering domain (entities, events, contexts) — use **conceptual-modeling** or **event-storming**.
- The output target is a temporal cross-touchpoint experience map — synthesize first, then move to **journey-mapping**.
- The task is to validate a single hypothesis against a known artifact — use **usability-testing** instead.
