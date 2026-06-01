---
name: skill-router
description: "Use when routing an agent request across multiple skills, building or auditing a routing table, detecting routing coverage gaps, or answering questions like 'which skill handles this?', 'who routes X?', or 'why did skill A activate instead of B?'. Covers trigger-label matching, file-path matching, keyword matching, description-based semantic matching, project-fit filtering, relation-aware co-loading and exclusion, eval/staleness annotations, and coverage-gap detection. Do NOT use when the target skill is already known (load it directly), when authoring a new skill (use `skill-scaffold` instead), or when evaluating a SINGLE skill's quality (use `graph-audit`)."
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
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


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
  scope: "Routing an agent request across multiple skills — building or auditing a routing table, detecting coverage gaps, and answering 'which skill handles this?' / 'why did skill A activate instead of B?' via trigger-label matching, file-path matching, keyword matching, description-based semantic matching, project-fit filtering, relation-aware co-loading and exclusion, eval/staleness annotations, and coverage-gap detection. Anchored to the Skill Graph routing harness (deployment_target: project); applies wherever a skill library uses this routing system. Excludes loading an already-known target skill directly, authoring a new skill (skill-scaffold), and evaluating a single skill's quality (graph-audit)."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: agent/skill-system
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
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"skill routing\",\"skill dispatch\",\"keyword routing\",\"route skill\",\"which skill to use\",\"skill selector\",\"routing table\",\"coverage gap\",\"ambiguous skill activation\",\"agent request routing\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"skill-router\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"given an agent request, choose which skill should fire — what's the skill dispatch logic?\",\"build the skill-routing decision table covering every agent request type we see\",\"why did the documentation skill activate when the user asked about a11y?\",\"find the skill-library coverage gaps — which agent requests match no skill at all?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"audit the graph-audit skill for schema conformance\",\"write a guide explaining how our routing works\",\"reproduce this routing mis-dispatch from production logs\"]"
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           see ADR-0018 for rename rationale) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"boundary\":[{\"skill\":\"graph-audit\",\"reason\":\"graph-audit verifies ONE skill's metadata; skill-router chooses BETWEEN skills at request time\"},{\"skill\":\"debugging\",\"reason\":\"debugging reproduces a specific routing mis-dispatch from evidence; skill-router designs the routing table itself\"},{\"skill\":\"skill-infrastructure\",\"reason\":\"skill-infrastructure analyses routing-miss patterns across the whole library to find systemic gaps; skill-router authors the routing logic for one library at a time\"},{\"skill\":\"middleware-patterns\",\"reason\":\"middleware-patterns owns the design of Next.js middleware (request/response transforms, edge runtime, matchers); skill-router owns agent skill dispatch. Writing a guide explaining 'how our routing works' is documentation about Next.js middleware patterns, not an agent skill routing exercise.\"}],\"verify_with\":[\"graph-audit\"]}"
  # grounding: required when `deployment_target: project`. Declares the truth sources
  # the skill anchors to and the failure modes those sources prevent. Omit when the
  # skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
  grounding: "{\"subject_matter\":\"Skill Graph reference routing behavior\",\"grounding_mode\":\"repo_specific\",\"truth_sources\":[\"scripts/skill-graph-route.js\",\"scripts/skill-graph-routing-eval.js\",\"examples/evals/skill-router.json\",\"examples/evals/skill-router.routing.json\"],\"failure_modes\":[\"negation_paths_score_as_positive_matches\",\"routing_eval_claim_without_harness_pass\",\"boundary_exclusion_removes_stronger_match\",\"coverage_gap_silently_falls_back\"],\"evidence_priority\":\"repo_code_first\"}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
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
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
---

# Skill Router

## Coverage

- Routing by keyword pattern: matching inbound query terms to skill `keywords` arrays to identify the best candidate
- Routing by trigger label: matching explicit skill-router labels (`triggers` field) to eliminate ambiguity when the intent is declared
- Routing by file path: matching touched or mentioned file paths against skill `paths` arrays for file-activated skills
- Fallback ordering: how to rank or withhold skills when multiple candidates score equally, including project-fit filtering, eval/staleness annotations, and relation-aware co-loading or exclusion
- Coverage gaps: detecting when no skill matches a request and how to surface that gap as an authoring signal

## Philosophy

Routing is adversarial against convenience. The tempting move — "if nothing matches exactly, just pick the closest skill and activate it" — is the one that silently degrades every agent that depends on the router. A wrong skill that activates confidently is worse than a coverage gap that surfaces loudly, because silent wrongness has no signal for anyone to fix. The router's job is to produce either a certain winner or an explicit non-answer, never a confident guess.

Four principles follow from that stance:

- **First unique winner stops the chain.** A match on `triggers` is stronger than a match on `paths`, which is stronger than a match on `keywords`. Evaluate surfaces in priority order and stop at the first one that yields a unique winner — do not second-guess a trigger-label hit with keyword analysis.
- **Tiebreakers favor fit and evidence, not popularity.** When scores tie, project-targeted skills only win when their declared `project[]` / `repo[]` membership fits the current workspace, and stale or unverified skills must be annotated rather than silently promoted. Never rank by skill age, usage count, or author preference.
- **Explicit coverage gaps beat silent wrong fallback.** If no surface produces a winner, surface the gap to the caller — recommend authoring a new skill or broadening a keyword list. Silent fallback to a default skill is a bug that no test catches, because the misrouted query looks successful to the router but nonsensical to the downstream agent.
- **The router is a mapping, not a judge.** It decides which skill owns a query; it does not decide whether the query is well-formed, worth handling, or strategically important. Those are the activated skill's concerns. Overloading the router with domain judgment makes it harder to audit and harder to change.

## Routing Rules

The router evaluates matching surfaces in priority order. The first surface that produces a unique winner stops the evaluation chain; graph edges then explain co-loading, dependency expansion, and exclusions.

| Priority | Surface | Field consulted | Match rule |
|---|---|---|---|
| 1 | Trigger label | `triggers` | Exact match against the declared label. Winner is unambiguous. |
| 2 | File path | `paths` | Glob match against the touched/mentioned path. Prefer the most specific match. |
| 3 | Keyword pattern | `keywords` | Token overlap between query terms and skill keyword list. Rank by match count, then apply project-fit and quality/staleness annotations. |
| 4 | Description semantics | `description` | Fallback text match when explicit trigger/path/keyword evidence is absent or weak. |

### Project-fit and quality gates

When keyword scores are equal, prefer a `deployment_target: project` skill only if its `project[]` or `repo[]` membership fits the current workspace. A project-targeted skill outside the current workspace is not more specific; it is wrong context.

The router also surfaces quality state. `eval_state` gates or annotates confidence, and `lifecycle.stale_after_days` lets the route explanation mark stale skills instead of hiding freshness risk.

### Graph expansion and exclusion

After a winner is selected, relation edges explain the surrounding context:

- `relations.depends_on` expands transitively because the selected skill requires those supporting skills.
- `relations.verify_with` co-loads a sibling for cross-checking.
- `relations.boundary` excludes the listed skill from co-routing when this skill wins.
- `relations.disjoint_with` marks incompatible ownership and should not be treated as a dependency.

### Fallback behavior

If no skill matches any surface, the router does not fall back to a default skill. It surfaces a coverage gap and recommends authoring a new skill or broadening an existing skill's `keywords` array. Silent fallback to a wrong skill is worse than an explicit coverage-gap signal.

## Evals

This skill ships routing eval fixtures in the Skill Graph `examples/evals/` directory and an application eval alongside the skill. The eval prompts test priority-ordered match surfaces, explicit coverage-gap behavior, relation-aware routing, and the refusal to fall back to a default. Consumers in other agent runtimes can translate those cases to their own grading harness.

## Do NOT Use When

| Use instead | When |
|---|---|
| The target skill directly | The correct skill is already known — skip the router and load it |
| `documentation` | The task is writing or structuring doc prose, not routing |
| `graph-audit` | The task is auditing whether routing metadata is consistent, not dispatching a query |
| `skill-scaffold` | The task is authoring a new skill from scratch, not dispatching to an existing one |
