---
name: problem-approach-router
description: "Use when facing a new problem and unsure which problem-solving methodology or foundational skill to apply first. Routes between first-principles-thinking, pattern-recognition, mental-models, constraint-awareness, and task-analysis by classifying the problem type. Activate before choosing any other foundational skill. Do NOT use to execute the selected approach (use the specific routed skill directly), for implementation work (use the relevant engineering skill), or when the correct approach is already known."
license: MIT
compatibility:
  notes: "Domain-agnostic dispatch. The routing table applies to any problem a human or agent faces — software, design, product, or strategy. The skill names in the Routing Rules refer to sibling skills in the foundations category."
allowed-tools: Read Grep
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"

  # === v7 Classification (DEPRECATED 2026-05-26 — kept for back-compat only) ===
  # type: v7 classification — DEPRECATED, replaced by `operation`.
  # Legacy values: capability / workflow / router / overlay.
  type: router
  # operation: cognitive operation enabled (Bloom-grounded). One of four closed values:
  # know (declarative — concepts, vocabulary, reference) /
  # do (procedural — step-by-step execution) /
  # decide (judgment — choosing, dispatching) /
  # modify (context injection — shapes how other skills execute).
  operation: decide
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: foundations

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: meta-methods
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: foundations/meta
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-23"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-23\"}"

  # === Eval-health: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: present
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
  keywords: "[\"which approach\",\"which methodology\",\"problem-solving method\",\"select methodology\",\"which skill first\",\"approach selection\",\"methodology dispatch\",\"method router\",\"first principles vs pattern\",\"how to approach this problem\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"problem-approach-router\",\"methodology-router\",\"approach-router\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"I have a completely novel problem nobody has solved before — where do I start?\",\"the codebase has a recurring bug pattern — which foundational approach should I use?\",\"I need to explain a complex system to a stakeholder — which skill applies?\",\"I'm blocked by conflicting requirements that all seem equally valid — which approach first?\",\"the task feels overwhelming because there are too many parts — what's the right starting lens?\",\"a user is asking me to solve something I know a similar solution for but the details differ\",\"I don't know what I don't know about this problem — which foundational skill handles that?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"actually apply first-principles thinking to this specific problem\",\"analyze why this pattern keeps recurring in the codebase\",\"break down the constraints on this engineering decision\",\"map the mental model for this domain concept\",\"implement the algorithm we already decided on\",\"choose a testing strategy for this feature\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"first-principles-thinking\",\"reason\":\"first-principles-thinking executes the approach for novel, assumption-heavy problems; problem-approach-router routes to it — the router does not apply the method itself\"},{\"skill\":\"pattern-recognition\",\"reason\":\"pattern-recognition executes the approach for recurring or familiar problem shapes; problem-approach-router routes to it — the router does not apply the method itself\"},{\"skill\":\"mental-models\",\"reason\":\"mental-models executes the approach for system-understanding and explanation problems; problem-approach-router routes to it — the router does not apply the method itself\"},{\"skill\":\"constraint-awareness\",\"reason\":\"constraint-awareness executes the approach for constraint-dominated problems; problem-approach-router routes to it — the router does not apply the method itself\"},{\"skill\":\"task-analysis\",\"reason\":\"task-analysis executes the approach for workflow and user-goal decomposition problems; problem-approach-router routes to it — the router does not apply the method itself\"}],\"related\":[\"epistemic-grounding\",\"taxonomy-design\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":365,\"review_cadence\":\"quarterly\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/meta-methods/problem-approach-router/SKILL.md
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

# Problem Approach Router

## Coverage

Routes between the five foundational problem-solving skills by classifying the problem type before any approach is applied. Does not teach any methodology — it dispatches to the skill that teaches it. The routing table covers: novel problems with unknown assumptions (`first-principles-thinking`), recurring or familiar problem shapes (`pattern-recognition`), system-understanding and explanation tasks (`mental-models`), constraint-dominated or boundary-rich problems (`constraint-awareness`), and workflow and user-goal decomposition tasks (`task-analysis`).

## Routing Rules

Evaluate the problem against the signals below. The first matching row determines the skill to activate. If multiple rows match, the problem is multi-layered — apply the skills in the order they match (start from the top of the table).

| Signal | Route to | When to activate |
|---|---|---|
| "Nobody has solved this before" or "I don't know what the correct assumptions are" | `first-principles-thinking` | Problem is genuinely novel; existing solutions, patterns, and analogies are unavailable or misleading |
| "This looks like something I've seen before" or "there's a recurring shape here" | `pattern-recognition` | Problem shape has appeared before in the same or analogous form; the goal is to name and apply the pattern rather than derive from scratch |
| "I need to explain how this system works" or "I don't understand how the parts relate" | `mental-models` | Goal is comprehension or explanation of a domain, system, concept, or architecture — not yet solving or deciding |
| "Everything is constrained and I don't know which constraints are hard" | `constraint-awareness` | Problem is dominated by boundary conditions, limitations, or competing requirements; the first move is mapping what cannot change |
| "I need to decompose this workflow or user goal into steps" | `task-analysis` | Problem is a sequence of user actions, a multi-step workflow, or a task that requires understanding user intent before designing a solution |
| "I'm not sure which of the above applies" | `epistemic-grounding` | Start here when the problem type itself is unclear — epistemic-grounding clarifies what is known, what is assumed, and what is missing before routing |

### Coverage-gap behavior

If no signal matches clearly, return to the caller with: "Which of the following best describes the problem — novel/no-prior-solution, recurring/familiar, needs-explanation, constraint-dominated, workflow/user-goal?" Do NOT default to any approach without a classification signal.

### Compound problems

When a problem matches more than one row simultaneously (e.g., it is both novel AND constraint-dominated), list both matches and route to each skill in sequence. Declare the compound classification explicitly before proceeding: "This is a novel + constraint-dominated problem. I will apply first-principles-thinking first to clear the assumptions, then constraint-awareness to map the hard boundaries."

## Do NOT Use When

| Use instead | When |
|---|---|
| `first-principles-thinking` | The approach is already known to be first-principles; the router has already been applied |
| `pattern-recognition` | The recurring pattern is already identified; no routing decision is needed |
| `mental-models` | The goal is explicitly system understanding; the routing decision is already made |
| `task-analysis` | The task is explicitly a workflow or user-goal decomposition; no routing needed |
| `epistemic-grounding` | The problem is not about choosing an approach but about clarifying what is known |
| Domain-specific skills (`debugging`, `testing-strategy`, `code-review`, etc.) | The problem is domain-specific and the correct skill is already evident from context |
