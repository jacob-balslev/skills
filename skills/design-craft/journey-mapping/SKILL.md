---
name: journey-mapping
description: "Use when mapping a user's experience across multiple touchpoints and time, surfacing emotional peaks and troughs, identifying opportunity moments in a cross-channel flow, or aligning a team on the end-to-end experience including back-stage support processes. Do NOT use for decomposing a single screen into UI steps (use task-analysis) or for drawing back-end service architecture diagrams — journey maps describe human experience, not system topology."
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
  keywords: "[\"customer journey map\",\"user journey\",\"service blueprint\",\"touchpoint\",\"moments of truth\",\"experience map\",\"front-stage back-stage\",\"emotional curve\",\"opportunity areas\",\"pain points\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"journey map\",\"service blueprint\",\"map the user experience\",\"customer journey\",\"touchpoints\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Build a journey map for first-time tax filers from awareness through filing to refund.\",\"Add a service-blueprint layer below this journey map showing the back-stage support steps.\",\"Identify the emotional low points in this onboarding journey and the opportunities at each.\",\"Map the cross-channel experience of returning an online order to a physical store.\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Break down the steps a user takes inside the upload modal.\",\"Draw the microservice call graph for the checkout API.\",\"Diagram the database schema for the order entity.\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"research-synthesis\",\"information-architecture\",\"design-thinking\",\"problem-framing\"],\"boundary\":[{\"skill\":\"task-analysis\",\"reason\":\"task-analysis decomposes a single goal-directed task into ordered steps within one interface or session. journey-mapping spans many sessions, channels, and days, and includes emotional and contextual layers task-analysis does not.\"},{\"skill\":\"bounded-context-mapping\",\"reason\":\"bounded-context-mapping is an engineering practice for modeling DDD context boundaries. journey-mapping describes human experience across touchpoints — a similar diagrammatic instinct but unrelated output.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/journey-mapping/SKILL.md
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

# Journey Mapping

## Coverage
Journey mapping covers the family of visualizations that lay out a user's experience as a timeline across stages, actions, thoughts, feelings, and touchpoints. The classic **customer journey map** (Jeff Patton's writing on story mapping is an adjacent influence; NN/g has codified the canonical structure) typically has a horizontal axis of stages (e.g., Awareness → Consideration → Purchase → Onboarding → Use → Renew/Churn) and vertical lanes for what the user is doing, thinking, feeling, and which touchpoint they are interacting with. An **emotional curve** rendered along the timeline highlights peaks and troughs — the "moments of truth" that disproportionately shape the overall impression.

A **service blueprint** (Lynn Shostack, 1984) extends the journey map downward with **front-stage** elements (what the user sees), the **line of visibility**, and **back-stage** elements (what employees, systems, and processes do that the user does not see). Below those, **support processes** show the infrastructure that enables back-stage work. Service blueprints are appropriate when the experience involves human or system handoffs that the user never sees but that determine whether the experience succeeds.

The skill also covers **current-state vs future-state** maps (current documents reality and surfaces pain points; future proposes a redesigned experience and is used to align stakeholders), and the choice of **scope** — a single transaction, an entire lifecycle, or a specific moment-of-truth blown up in detail. Granularity matches the decision the map will inform; a board-level alignment map is coarser than a redesign brief.

## Philosophy
Journey maps exist because experience is temporal and cross-channel, and most artifacts a team produces are neither. A screen design captures one moment; an architecture diagram captures one cross-section; a backlog captures one project. The journey map is the only artifact that asks "what does the user actually live through, end to end, including the parts that happen on phone calls, in physical mail, in the gap between sessions, and in the moments when they think about us and then put it down?"

The practice resists two failure modes. The first is the **anodyne happy-path map**, where every stage is labeled with a positive verb and the emotional curve is a gentle wave — these maps describe what the team hopes is true rather than what research showed. The second is the **everything-everywhere map**, where ambition outruns research and the map sprouts lanes for every possible channel without evidence. A journey map's credibility comes from being grounded in synthesis output; without that grounding it is decoration.

## Verification
- The map is grounded in specific research evidence — each pain point and emotional trough cites at least one source (interview quote, observation, support log) rather than being asserted.
- Stages on the horizontal axis are named from the user's perspective ("trying to understand what I owe") rather than the business's ("acquisition funnel stage 2").
- The emotional curve has actual lows, not only highs and neutrals — a curve with no dips usually means the map omits the hard parts.
- For service blueprints, the line of visibility is drawn explicitly and the back-stage steps include both human and system actors.
- The map identifies named **opportunity areas** at specific stages, not a generic "improve onboarding" annotation.
- A stakeholder who did not attend the mapping session can read the map and explain back the journey's overall arc, including where it goes wrong.

## Do NOT Use When
- The scope is a single screen or single task within one session — use **task-analysis** for goal-directed step decomposition.
- The team has not yet done qualitative research on the journey — run **user-research** and **research-synthesis** first; an unresearched journey map is fiction.
- The diagram needed is a system architecture, microservice topology, or data flow — those are engineering artifacts, not journey maps.
- The output should be a navigation structure or content taxonomy — use **information-architecture**.
- The task is modeling engineering domain events across bounded contexts — use **event-storming** or **bounded-context-mapping**.
- The team is in solutioning mode and needs to generate concept variants — use **ideation**; journey mapping clarifies experience, it does not invent new ones.
