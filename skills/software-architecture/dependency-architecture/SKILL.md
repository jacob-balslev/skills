---
name: dependency-architecture
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing or auditing dependency structure: package boundaries, runtime vs build dependencies, adapter layers, duplicate-purpose libraries, supply-chain risk, upgrade policy, lock-in, and dependency graph health. Do NOT use for choosing a major framework (use `framework-fit-analysis`), vulnerability-only review (use `owasp-security`), or routine refactoring without dependency boundary changes (use `refactor`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this skill.
compatibility:
  notes: "Portable dependency architecture guidance for monorepos, package.json ecosystems, service boundaries, SDKs, and internal libraries."
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: software-architecture
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # scope: required free-text statement of what this skill teaches and what it does not.
  scope: "Use when designing or auditing dependency structure: package boundaries, runtime vs build dependencies, adapter layers, duplicate-purpose libraries, supply-chain risk, upgrade policy, lock-in, and dependency graph health. Do NOT use for choosing a major framework (use `framework-fit-analysis`), vulnerability-only review (use `owasp-security`), or routine refactoring without dependency boundary changes (use `refactor`)."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: architecture/dependencies
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
  keywords: ["dependency architecture","dependency graph","package boundaries","runtime dependency","build dependency","duplicate libraries","supply chain risk","adapter layer","lock-in","upgrade policy"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["audit whether this repo has duplicate-purpose dependencies and unsafe package boundaries","should this SDK be wrapped behind an adapter or imported everywhere?","design dependency rules for packages in this monorepo","evaluate dependency lock-in and upgrade risk before adding this library"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["choose between Next.js, Remix, and Astro for a new app","scan dependencies only for known vulnerabilities","refactor this module without changing dependency boundaries","write an ADR after the dependency decision is accepted"]
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/software-architecture/dependency-architecture/SKILL.md
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
relations:
  related: ["refactor","system-interface-contracts","version-control","framework-fit-analysis","owasp-security"]
  suppresses: ["framework-fit-analysis","architecture-decision-records"]
  verify_with: ["owasp-security","code-review"]
---
# Dependency Architecture

## Concept of the skill

Use when designing or auditing dependency structure: package boundaries, runtime vs build dependencies, adapter layers, duplicate-purpose libraries, supply-chain risk, upgrade policy, lock-in, and dependency graph health.

## Coverage

Design and audit the dependency graph of a codebase. Covers direct vs transitive dependencies, runtime vs dev/build dependencies, package boundaries, import direction, adapter layers, duplicate-purpose libraries, lock-in, upgrade policy, supply-chain risk, and dependency drift.

## Philosophy of the skill
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

Use the package manager and a graph tool to make the inventory observable before making architecture claims. In JavaScript/TypeScript, start with `npm ls`, `pnpm why`, `yarn why`, `madge`, or dependency-cruiser. In JVM systems, use Gradle/Maven dependency reports or `jdeps`. In Go, use `go list -deps` and `go mod graph`; in Rust, `cargo tree`; in Python, `pipdeptree` or lockfile inspection. Pair the generated graph with code search for imports at boundary seams, because manifest dependencies show what is installed while imports show what the architecture actually depends on.

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
