---
name: design-system-architecture
description: "Use when designing or auditing a design system's architecture: token taxonomy, semantic tokens, component APIs, theming, accessibility contracts, documentation, governance, and migration strategy. Do NOT use for information hierarchy and navigation (use `information-architecture`), page-specific layout (use `layout-composition`), visual craft direction (use `visual-design-foundations`), sentence-level UI copy (use `microcopy`), or accessibility-only audits (use `a11y`)."
license: MIT
compatibility:
  notes: "Portable design-system architecture guidance for web and app component systems, token systems, and multi-theme UI libraries."
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
  subject: frontend-ui
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/system
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
  keywords: "[\"design tokens\",\"semantic tokens\",\"component API\",\"theming\",\"component library\",\"token taxonomy\",\"design system migration\",\"design system audit\",\"component library audit\",\"token drift\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"define semantic tokens so charts, status colors, and surfaces do not hardcode raw colors\",\"audit this component library for API consistency and token drift\",\"design the theming architecture before adding dark mode\",\"how should we migrate old CSS variables to canonical design-system tokens?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"organize pages, nav, sitemap, and wayfinding\",\"rewrite the empty-state text and tooltip labels\",\"add aria-labels and keyboard behavior to this component\",\"draft an architecture note explaining why we chose Postgres over DynamoDB\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"information-architecture\",\"reason\":\"information-architecture owns navigation and content structure; design-system-architecture owns tokens and component systems\"},{\"skill\":\"microcopy\",\"reason\":\"microcopy owns UI text patterns; design-system-architecture owns reusable component and token contracts\"},{\"skill\":\"a11y\",\"reason\":\"a11y verifies accessibility behavior; design-system-architecture embeds accessibility contracts into components\"},{\"skill\":\"layout-composition\",\"reason\":\"layout-composition owns page-specific responsive structure; design-system-architecture owns reusable component and token rules\"},{\"skill\":\"visual-design-foundations\",\"reason\":\"visual-design-foundations owns surface-level visual craft; design-system-architecture owns reusable system contracts\"},{\"skill\":\"interaction-patterns\",\"reason\":\"interaction-patterns owns selecting the right pattern for a task; design-system-architecture owns reusable component APIs once the pattern belongs in the system\"},{\"skill\":\"refactor\",\"reason\":\"refactor restructures code behavior-preservingly; design-system-architecture changes the UI system contract\"}],\"related\":[\"a11y\",\"microcopy\",\"information-architecture\",\"semantics\",\"layout-composition\",\"visual-design-foundations\",\"interaction-patterns\"],\"verify_with\":[\"a11y\",\"code-review\"]}"
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
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/design-system-architecture/SKILL.md
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

# Design System Architecture

## Coverage

Design and audit reusable UI systems. Covers token taxonomy, semantic vs raw tokens, component APIs, variants, slots, theming, accessibility contracts, responsive behavior, documentation, governance, migration, and drift detection between code and design intent.

## Philosophy

A design system is a product architecture layer, not a style pile. Tokens and components should encode durable decisions so product work becomes faster and more consistent. If every screen still makes local choices for color, spacing, state, and behavior, the design system is only decorative.

Optimize for clear constraints. A system with too many escape hatches is not flexible; it is ungoverned.

## Method

1. Inventory tokens, components, variants, and usage hotspots.
2. Separate raw tokens from semantic tokens.
3. Define component contracts: purpose, props/slots, states, accessibility, and composition rules.
4. Establish theming and density rules before multiplying variants.
5. Mark forbidden local overrides and migration paths.
6. Add docs examples that show expected use and anti-use.
7. Verify real screens can be built without one-off styling.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/design-system-architecture.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/design-system-architecture.json). The checklist below is the authoring gate for design-system architecture decisions; the eval file is the grader surface.

## Verification

- [ ] Semantic tokens cover product meaning without leaking palette names
- [ ] Components have clear ownership and API boundaries
- [ ] Variants map to real use cases, not visual guesses
- [ ] Accessibility behavior is part of the component contract
- [ ] Theming does not require component-level rewrites
- [ ] Deprecated tokens or components have migration paths
- [ ] Real product screens can use the system without local escape hatches

## Do NOT Use When

| Use instead | When |
|---|---|
| `information-architecture` | You need page hierarchy, navigation, sitemap, or wayfinding. |
| `microcopy` | You need UI wording, labels, empty states, or error copy. |
| `a11y` | You need focused accessibility compliance verification. |
| `layout-composition` | You need page-specific responsive structure, section order, or breakpoints. |
| `visual-design-foundations` | You need color, typography, spacing, density, or visual craft direction. |
| `interaction-patterns` | You need to choose a control or interaction pattern before systemizing it. |
| `refactor` | You are only restructuring existing code without changing design-system contracts. |
