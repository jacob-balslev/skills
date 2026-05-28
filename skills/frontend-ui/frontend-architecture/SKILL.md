---
name: frontend-architecture
description: "Use when organizing a frontend codebase — module boundaries, component layering, state ownership, data-flow direction, and the separation between feature code and shared primitives. Do NOT use for visual design decisions, specific framework migration tactics, or backend API contract design."
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
  subject: frontend-ui
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/frontend
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
  keywords: "[\"frontend architecture\",\"component boundaries\",\"module organization\",\"state management shape\",\"feature-sliced design\",\"container presentational\",\"data flow direction\",\"shared primitives\",\"component layering\",\"frontend folder structure\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"frontend architecture\",\"component boundaries\",\"folder structure\",\"state shape\",\"where should this code live\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Decide whether a new modal lives in the shared component library or inside a feature folder\",\"Reorganize a frontend that has mixed presentational components and data-fetching components in the same files\",\"Choose a state shape that doesn't force every consumer to re-render on unrelated changes\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Pick the brand color palette for a marketing site\",\"Design the REST endpoint shape for the orders resource\",\"Decide whether to use CSS-in-JS or Tailwind\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"design-system-architecture\",\"design-module-composition\",\"refactor\",\"testing-strategy\"],\"boundary\":[{\"skill\":\"design-system-architecture\",\"reason\":\"design-system-architecture covers token layering, primitive component contracts, and library publishing; this skill covers application-side organization that consumes those primitives.\"},{\"skill\":\"api-design\",\"reason\":\"API contract shape lives in api-design; this skill takes the API as given and structures the frontend around it.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/frontend-architecture/SKILL.md
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

# Frontend Architecture

## Coverage
Frontend architecture decides three things: where code lives (folder and module structure), what depends on what (allowed import direction), and who owns mutable state (component-local, feature-scoped, or global). This skill covers the common organizing models — feature-sliced (features/<feature>/{ui,model,api}), layered (components/, hooks/, services/, pages/), and domain-driven (domains/<domain>/{ui,logic,data}) — and the trade-offs each makes when the codebase grows from a few features to dozens.

Component layering separates primitives (no business knowledge, configurable purely through props — Button, Input, Stack), composed components (combine primitives with feature-specific layout, still no data fetching — OrderSummary, AddressForm), and connected components (own data fetching, mutation, and routing — OrderDetailPage). The boundary between composed and connected is the most common source of dependency tangles: a "shared" composed component that quietly reaches into a feature-specific store creates a back-edge that breaks the dependency graph.

State shape decisions span four axes: location (component, context, store), normalization (entity-keyed vs. nested), derivation (computed at read time vs. stored), and ownership (who can write). The shape choice determines what re-renders, what stays consistent across views, and what becomes a source of bugs when a mutation forgets to update one of several copies. Server state (data fetched from an API, cache-managed) and client state (UI-only, ephemeral) have different requirements and benefit from being managed by different tools.

Import direction enforces the architecture. A rule like "shared/ may not import from features/, and feature A may not import from feature B" is checkable with ESLint boundary plugins and tells the team at PR time when a change crosses an intended layer. Without enforcement, the structure degrades within months — a single shortcut import becomes the norm.

## Philosophy
The folder structure is not the architecture; the import graph is. A pretty folder tree with cyclic imports between features is architecturally worse than a flat folder with strict one-way dependencies. Optimize for "where would I look for this" (colocation by feature) and "what changes together stays together" (cohesion) over imposed taxonomy.

Server state and client state are different problems. Mixing them in a single store creates cache-invalidation bugs that look like rendering bugs. Use the same tool for fetching, caching, and revalidating server data; reserve global client state for genuinely cross-cutting UI concerns (theme, current user, route).

## Verification
- An import-boundary linter is configured and a CI step fails the build on violations.
- Every feature folder can be removed without touching code outside it, except a single registration point (route table, feature flag map).
- A new developer can name where any given piece of code lives within thirty seconds of being told the feature name and the kind of thing (UI vs. data vs. logic).
- Server state is fetched through one mechanism (a single query/cache library) — counting fetch call sites in client code returns approximately the number of distinct endpoints, not multiples per endpoint.
- Component props for shared primitives contain no feature-specific names; a grep for feature names in shared/ returns nothing.
- Re-render counts on a representative interaction can be measured and explained — no "this component re-renders five times and I'm not sure why."
- Tests follow the layering: primitives tested in isolation, connected components tested with mocked data layer, no test reaches across feature boundaries.

## Do NOT Use When
- The decision is visual rather than structural — color, type, spacing, motion. Use visual-design-foundations, color-system-design, or typography-system.
- The work is publishing or versioning a shared component library across multiple applications. Use design-system-architecture.
- The task is choosing or migrating a specific framework (React→Solid, Webpack→Vite). This skill is framework-neutral.
- You are designing the API the frontend consumes. Use api-design or system-interface-contracts.
- The problem is a single component's internal behavior or accessibility. Use design-module-composition, interaction-patterns, or a11y.
