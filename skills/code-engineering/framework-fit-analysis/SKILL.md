---
name: framework-fit-analysis
description: "Use when choosing, replacing, or justifying a framework, library, SDK, runtime, database, UI kit, or platform by fit: constraints, team skill, ecosystem maturity, migration cost, operability, performance, security, and exit cost. Do NOT use for routine dependency hygiene (use `dependency-architecture`), documenting an accepted decision (use `architecture-decision-records`), or framework-specific implementation work."
license: MIT
compatibility:
  notes: "Portable technology-selection discipline for application frameworks, libraries, SDKs, platforms, runtimes, data stores, and agent tooling."
allowed-tools: Read Grep
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
  subject: code-engineering
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Choosing, replacing, or justifying a framework, library, SDK, runtime, database, UI kit, or platform by fit — weighing constraints, team skill, ecosystem maturity, migration cost, operability, performance, security, and exit cost. Portable across any technology-selection decision; principle-grounded, not repo-bound. Excludes routine dependency hygiene (dependency-architecture), documenting an already-accepted decision (architecture-decision-records), and framework-specific implementation work."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: architecture/technology-selection
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-11"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-11\"}"

  # === Evaluation Status: three orthogonal axes ===
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
  keywords: "[\"framework fit\",\"technology selection\",\"library choice\",\"SDK evaluation\",\"platform evaluation\",\"migration cost\",\"exit cost\",\"operability\",\"ecosystem maturity\",\"build vs buy\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"should we use Next.js server actions, route handlers, or a separate API service for this workflow?\",\"evaluate whether adding this charting library is worth it\",\"compare Supabase, Firebase, and custom Postgres for this project under real constraints\",\"we want to replace this framework - what fit analysis should happen before an ADR?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"audit installed packages for duplication and supply-chain risk\",\"write the ADR after we chose the framework\",\"implement this feature in the framework we already selected\",\"profile a slow page and optimize bottlenecks\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"dependency-architecture\",\"reason\":\"dependency-architecture governs dependency graph shape and package boundaries; framework-fit-analysis evaluates a candidate technology decision\"},{\"skill\":\"architecture-decision-records\",\"reason\":\"architecture-decision-records records accepted decisions; framework-fit-analysis compares options before acceptance\"},{\"skill\":\"performance-engineering\",\"reason\":\"performance-engineering measures and optimizes actual behavior; framework-fit-analysis weighs expected performance among selection criteria\"},{\"skill\":\"refactor\",\"reason\":\"refactor changes existing code structure; framework-fit-analysis decides whether a larger technology shift is justified\"}],\"related\":[\"architecture-decision-records\",\"dependency-architecture\",\"performance-engineering\",\"owasp-security\"],\"verify_with\":[\"architecture-decision-records\",\"dependency-architecture\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":180,\"review_cadence\":\"quarterly\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/framework-fit-analysis/SKILL.md
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

# Framework Fit Analysis

## Coverage

Evaluate technology fit before adoption, replacement, or standardization. Covers requirement fit, constraints, ecosystem maturity, maintenance health, team skill, integration cost, migration path, performance envelope, security posture, operational burden, lock-in, exit cost, and decision recording.

## Philosophy

Technology choice is context-dependent. "Best" without constraints is marketing. A good fit analysis makes tradeoffs explicit enough that a team can accept the costs knowingly.

Do not confuse popularity with fit. Do not let a narrow implementation preference choose a durable platform. The right output is a recommendation plus consequences, not a ranking table with fake precision.

## Method

1. State the job the technology must do.
2. List hard constraints: runtime, hosting, data, compliance, team, budget, timeline.
3. Define evaluation criteria and weights qualitatively: must-have, important, nice-to-have.
4. Compare credible options, including staying put.
5. Assess migration and exit costs.
6. Identify operational ownership and failure modes.
7. Recommend one path with accepted tradeoffs.
8. Hand off to `architecture-decision-records` if the decision is durable.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/framework-fit-analysis.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/framework-fit-analysis.json). The checklist below is the authoring gate for technology-fit decisions; the eval file is the grader surface.

## Verification

- [ ] The recommendation is tied to explicit project constraints
- [ ] "Do nothing" or "keep current stack" was considered when real
- [ ] Migration and exit costs are named
- [ ] Operational ownership is named
- [ ] Performance and security claims are evidence-backed or marked uncertain
- [ ] The decision can be reversed only with known cost
- [ ] Follow-up ADR is proposed for durable choices

## Do NOT Use When

| Use instead | When |
|---|---|
| `dependency-architecture` | You need dependency graph hygiene, package boundaries, duplication control, or supply-chain guardrails. |
| `architecture-decision-records` | The choice is already made and needs a record. |
| `performance-engineering` | You need to measure and optimize actual runtime behavior. |
| A framework-specific skill | The framework is already chosen and the task is implementation. |
