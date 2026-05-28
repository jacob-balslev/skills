---
name: dependency-architecture
description: "Use when designing or auditing dependency structure: package boundaries, runtime vs build dependencies, adapter layers, duplicate-purpose libraries, supply-chain risk, upgrade policy, lock-in, and dependency graph health. Do NOT use for choosing a major framework (use `framework-fit-analysis`), vulnerability-only review (use `owasp-security`), or routine refactoring without dependency boundary changes (use `refactor`)."
license: MIT
compatibility:
  notes: "Portable dependency architecture guidance for monorepos, package.json ecosystems, service boundaries, SDKs, and internal libraries."
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
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: architecture/dependencies
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
  keywords: "[\"dependency architecture\",\"dependency graph\",\"package boundaries\",\"runtime dependency\",\"build dependency\",\"duplicate libraries\",\"supply chain risk\",\"adapter layer\",\"lock-in\",\"upgrade policy\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"audit whether this repo has duplicate-purpose dependencies and unsafe package boundaries\",\"should this SDK be wrapped behind an adapter or imported everywhere?\",\"design dependency rules for packages in this monorepo\",\"evaluate dependency lock-in and upgrade risk before adding this library\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"choose between Next.js, Remix, and Astro for a new app\",\"scan dependencies only for known vulnerabilities\",\"refactor this module without changing dependency boundaries\",\"write an ADR after the dependency decision is accepted\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"framework-fit-analysis\",\"reason\":\"framework-fit-analysis evaluates major technology choices; dependency-architecture governs dependency graph structure and package boundaries\"},{\"skill\":\"owasp-security\",\"reason\":\"owasp-security owns vulnerability and security review; dependency-architecture includes supply-chain risk as one design dimension\"},{\"skill\":\"refactor\",\"reason\":\"refactor preserves behavior in code structure; dependency-architecture changes or audits dependency boundaries\"},{\"skill\":\"architecture-decision-records\",\"reason\":\"architecture-decision-records records accepted dependency decisions; dependency-architecture analyzes the dependency design\"}],\"related\":[\"framework-fit-analysis\",\"system-interface-contracts\",\"version-control\",\"owasp-security\"],\"verify_with\":[\"owasp-security\",\"code-review\"]}"
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
  skill_graph_canonical_skill: skills/dependency-architecture/SKILL.md
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

# Dependency Architecture

## Coverage

Design and audit the dependency graph of a codebase. Covers direct vs transitive dependencies, runtime vs dev/build dependencies, package boundaries, import direction, adapter layers, duplicate-purpose libraries, lock-in, upgrade policy, supply-chain risk, and dependency drift.

## Philosophy

Dependencies are architecture. Every package adds API surface, operational risk, update cost, and implicit design direction. A dependency that solves one task can still be wrong if it creates long-term coupling or duplicates an existing standard.

Prefer fewer, clearer dependencies with explicit ownership. Wrap volatile external SDKs at boundaries. Let application code depend on local contracts, not vendor shapes, when the vendor is likely to change or be replaced.

## Method

1. Inventory dependencies by purpose, owner, and import surface.
2. Classify each as runtime, dev, build, test, or optional.
3. Identify duplicate-purpose libraries and unauthorized standards.
4. Check import direction and package boundary rules.
5. Decide where adapters are needed for external SDKs or volatile APIs.
6. Assess security, maintenance, license, and ecosystem health.
7. Define upgrade, pinning, and removal policy.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/dependency-architecture.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/dependency-architecture.json). The checklist below is the authoring gate for dependency-boundary decisions; the eval file is the grader surface.

## Verification

- [ ] Each dependency has a purpose and owner
- [ ] Runtime dependencies are not hidden as dev/build dependencies
- [ ] Duplicate-purpose packages are justified or removed
- [ ] External SDKs do not leak vendor types across core boundaries without intent
- [ ] Package import direction is enforceable
- [ ] Upgrade policy and lockfile discipline are clear
- [ ] Security and license risks have been checked for high-impact dependencies

## Do NOT Use When

| Use instead | When |
|---|---|
| `framework-fit-analysis` | You are selecting a major framework, platform, runtime, or database. |
| `owasp-security` | The task is vulnerability-focused security review. |
| `refactor` | You are restructuring code without changing dependency architecture. |
| `architecture-decision-records` | The dependency decision is already made and needs a record. |
