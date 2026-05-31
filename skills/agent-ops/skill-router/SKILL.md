---
name: skill-router
description: "Use when routing an agent request across multiple skills, building or auditing a routing table, detecting routing coverage gaps, or answering questions like 'which skill handles this?', 'who routes X?', or 'why did skill A activate instead of B?'. Covers trigger-label matching, file-path matching, keyword matching, description-based semantic matching, scope/type tiebreakers, and coverage-gap detection. Do NOT use when the target skill is already known (load it directly), when authoring a new skill (use `skill-metadata-template` instead), or when evaluating a SINGLE skill's quality (use `graph-audit`)."
license: MIT
compatibility:
  notes: "Markdown, YAML, any agent runtime"
allowed-tools: Read Grep
grounding:
  subject_matter: "Skill Graph reference routing behavior"
  grounding_mode: "repo_specific"
  truth_sources:
    - scripts/skill-graph-route.js
    - scripts/skill-graph-routing-eval.js
    - examples/evals/skill-router.json
    - examples/evals/skill-router.routing.json
  failure_modes:
    - negation_paths_score_as_positive_matches
    - routing_eval_claim_without_harness_pass
    - boundary_exclusion_removes_stronger_match
    - coverage_gap_silently_falls_back
  evidence_priority: "repo_code_first"
drift_check:
  last_verified: "2026-05-18"
  truth_source_hashes:
    "scripts/skill-graph-route.js": "7c29b1bc2420887f32809b8f52f5bd448c1234542672e669a68247942dd77df4"
    "scripts/skill-graph-routing-eval.js": "fffac2858863662bde6bc54c56bb77a219ae93f626e0c8d5886566f998181deb"
    "examples/evals/skill-router.json": "fccabcbc5f9d8057536f397fb0fc71a567371f75fb9a21afda343b197af30293"
    "examples/evals/skill-router.routing.json": "c4dc88db1e746bea78a7cf96b50c6c84532a07eda42da2e35d790c8928d4da8c"
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
  subject: agent-ops
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: project
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Routing an agent request across multiple skills — building or auditing a routing table, detecting coverage gaps, and answering 'which skill handles this?' / 'why did skill A activate instead of B?' via trigger-label matching, file-path matching, keyword matching, description-based semantic matching, scope/type tiebreakers, and coverage-gap detection. Anchored to the Skill Graph routing harness (deployment_target: project); applies wherever a skill library uses this routing system. Excludes loading an already-known target skill directly, authoring a new skill (skill-metadata-template), and evaluating a single skill's quality (graph-audit)."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: agent/skill-system
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-04-18"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-13\",\"truth_source_hashes\":{\"scripts/skill-graph-route.js\":\"b9a7b51d0e8b845b11473f479c4593754768c3775508049db7339892b2f08cc2\",\"scripts/skill-graph-routing-eval.js\":\"fffac2858863662bde6bc54c56bb77a219ae93f626e0c8d5886566f998181deb\",\"examples/evals/skill-router.json\":\"fccabcbc5f9d8057536f397fb0fc71a567371f75fb9a21afda343b197af30293\",\"examples/evals/skill-router.routing.json\":\"c4dc88db1e746bea78a7cf96b50c6c84532a07eda42da2e35d790c8928d4da8c\"}}"

  # === Evaluation Status: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: present
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  eval_state: passing
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  routing_eval: present
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"skill routing\",\"skill dispatch\",\"keyword routing\",\"route skill\",\"which skill to use\",\"skill selector\",\"routing table\",\"coverage gap\",\"ambiguous skill activation\",\"skill activate\",\"agent request routing\",\"skill activation decision\",\"which skill should fire\",\"skill selection for request\",\"skill library coverage\",\"skill dispatch logic\",\"agent request to skill mapping\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"skill-router\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"given an agent request, choose which skill should fire — what's the skill dispatch logic?\",\"build the skill-routing decision table covering every agent request type we see\",\"why did the documentation skill activate when the user asked about a11y?\",\"find the skill-library coverage gaps — which agent requests match no skill at all?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"audit the graph-audit skill for schema conformance\",\"write a guide explaining how our routing works\",\"reproduce this routing mis-dispatch from production logs\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"graph-audit\",\"reason\":\"graph-audit verifies ONE skill's metadata; skill-router chooses BETWEEN skills at request time\"},{\"skill\":\"debugging\",\"reason\":\"debugging reproduces a specific routing mis-dispatch from evidence; skill-router designs the routing table itself\"},{\"skill\":\"skill-infrastructure\",\"reason\":\"skill-infrastructure analyses routing-miss patterns across the whole library to find systemic gaps; skill-router authors the routing logic for one library at a time\"},{\"skill\":\"middleware-patterns\",\"reason\":\"middleware-patterns owns the design of Next.js middleware (request/response transforms, edge runtime, matchers); skill-router owns agent skill dispatch. Writing a guide explaining 'how our routing works' is documentation about Next.js middleware patterns, not an agent skill routing exercise.\"}],\"verify_with\":[\"graph-audit\"]}"
  # grounding: required when `deployment_target: project`. Declares the truth sources
  # the skill anchors to and the failure modes those sources prevent. Omit when the
  # skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
  grounding: "{\"subject_matter\":\"Skill Graph reference routing behavior\",\"grounding_mode\":\"repo_specific\",\"truth_sources\":[\"scripts/skill-graph-route.js\",\"scripts/skill-graph-routing-eval.js\",\"examples/evals/skill-router.json\",\"examples/evals/skill-router.routing.json\"],\"failure_modes\":[\"negation_paths_score_as_positive_matches\",\"routing_eval_claim_without_harness_pass\",\"boundary_exclusion_removes_stronger_match\",\"coverage_gap_silently_falls_back\"],\"evidence_priority\":\"repo_code_first\"}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/skill-router/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: PASS
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: DRIFT
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

# Skill Router

## Coverage

- Routing by keyword pattern: matching inbound query terms to skill `keywords` arrays to identify the best candidate
- Routing by trigger label: matching explicit skill-router labels (`triggers` field) to eliminate ambiguity when the intent is declared
- Routing by file path: matching touched or mentioned file paths against skill `paths` arrays for file-activated skills
- Fallback ordering: how to rank skills when multiple candidates score equally, including `scope` and `type` tiebreakers
- Coverage gaps: detecting when no skill matches a request and how to surface that gap as an authoring signal

## Philosophy

Routing is adversarial against convenience. The tempting move — "if nothing matches exactly, just pick the closest skill and activate it" — is the one that silently degrades every agent that depends on the router. A wrong skill that activates confidently is worse than a coverage gap that surfaces loudly, because silent wrongness has no signal for anyone to fix. The router's job is to produce either a certain winner or an explicit non-answer, never a confident guess.

Four principles follow from that stance:

- **First unique winner stops the chain.** A match on `triggers` is stronger than a match on `paths`, which is stronger than a match on `keywords`. Evaluate surfaces in priority order and stop at the first one that yields a unique winner — do not second-guess a trigger-label hit with keyword analysis.
- **Tiebreakers favor specificity, not popularity.** When scores tie, a skill specific to *this* codebase (`scope: codebase`) wins over a portable skill, and a procedural skill (`type: workflow`) wins over a reference (`type: capability`) because the inbound query is more likely to need action than lookup. Never rank by skill age, usage count, or author preference.
- **Explicit coverage gaps beat silent wrong fallback.** If no surface produces a winner, surface the gap to the caller — recommend authoring a new skill or broadening a keyword list. Silent fallback to a default skill is a bug that no test catches, because the misrouted query looks successful to the router but nonsensical to the downstream agent.
- **The router is a mapping, not a judge.** It decides which skill owns a query; it does not decide whether the query is well-formed, worth handling, or strategically important. Those are the activated skill's concerns. Overloading the router with domain judgment makes it harder to audit and harder to change.

## Routing Rules

The router evaluates three matching surfaces in priority order. The first surface that produces a unique winner stops the evaluation chain.

| Priority | Surface | Field consulted | Match rule |
|---|---|---|---|
| 1 | Trigger label | `triggers` | Exact match against the declared label. Winner is unambiguous. |
| 2 | File path | `paths` | Glob match against the touched/mentioned path. Prefer the most specific match. |
| 3 | Keyword pattern | `keywords` | Token overlap between query terms and skill keyword list. Rank by match count; break ties with `scope` then `type`. |

### Scope tiebreaker

When keyword scores are equal, prefer skills in this `scope` order: `codebase` > `reference` > `portable`. A codebase-scoped skill is specific to *this* repository and wins over a portable one when both match the query equally.

> **Schema version note.** The v1 enum values `operational` and `generic` were renamed to `codebase` and `portable` in `schema_version: 2`. Always use the v2 names; the current schema rejects the v1 names as hard errors. A full rename map ships with the Skill Graph schema migration notes — consult those when porting a v1 skill.

### Type tiebreaker

After scope, prefer `workflow` over `capability` over `router` over `overlay`. A workflow skill ships procedural decision logic that is usually more actionable than a pure capability reference when the query is ambiguous.

### Fallback behavior

If no skill matches any surface, the router does not fall back to a default skill. It surfaces a coverage gap and recommends authoring a new skill or broadening an existing skill's `keywords` array. Silent fallback to a wrong skill is worse than an explicit coverage-gap signal.

## Evals

This skill ships a comprehension-eval artifact as `skill-router.json` in the Skill Graph `examples/evals/` directory. The eval prompts specifically test the priority-ordered match surfaces, the scope/type tiebreakers, and the explicit refusal to fall back to a default. The eval file is how this skill is graded by the Skill Graph audit runner — consumers in other agent runtimes can treat the eval cases as conformance tests translated to their own grading harness.

## Do NOT Use When

| Use instead | When |
|---|---|
| The target skill directly | The correct skill is already known — skip the router and load it |
| `documentation` | The task is writing or structuring doc prose, not routing |
| `graph-audit` | The task is auditing whether routing metadata is consistent, not dispatching a query |
| `examples/skill-metadata-template.md` | The task is authoring a new skill from scratch, not dispatching to an existing one (the template is a reference artifact, not a routable skill) |
