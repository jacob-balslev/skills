---
name: information-architecture
description: "Use when structuring information for findability: navigation, page hierarchy, docs architecture, sitemap shape, labeling systems, wayfinding, and content grouping. Do NOT use for formal category-governance work (use `taxonomy-design`), responsive page composition (use `layout-composition`), component/token architecture (use `design-system-architecture`), or sentence-level UI text (use `microcopy`)."
license: MIT
compatibility:
  notes: "Portable IA guidance for apps, documentation, dashboards, admin tools, and skill libraries."
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
  taxonomy_domain: design/information-architecture
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
  keywords: "[\"information architecture\",\"navigation structure\",\"sitemap\",\"wayfinding\",\"page hierarchy\",\"docs architecture\",\"labeling system\",\"content grouping\",\"findability\",\"content model\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"our docs have good content but nobody can find the setup instructions - how should the IA change?\",\"design the navigation and page hierarchy for this admin app\",\"these dashboard sections overlap and users do not know where to look first\",\"should this be a top-level nav item, a tab, a filter, or a page section?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"make the category taxonomy and assignment rules for this skill library\",\"define design tokens, component APIs, and theming rules\",\"rewrite this tooltip and empty-state copy\",\"audit keyboard accessibility and ARIA semantics\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"taxonomy-design\",\"reason\":\"taxonomy-design governs classification systems; information-architecture arranges user-facing information paths\"},{\"skill\":\"design-system-architecture\",\"reason\":\"design-system-architecture owns component and token systems; information-architecture owns navigation and content structure\"},{\"skill\":\"layout-composition\",\"reason\":\"layout-composition owns structure inside a page or screen; information-architecture owns cross-page organization and wayfinding\"},{\"skill\":\"microcopy\",\"reason\":\"microcopy owns sentence-level UI text; information-architecture owns placement and hierarchy\"},{\"skill\":\"a11y\",\"reason\":\"a11y owns accessibility compliance; information-architecture can create structures that a11y later verifies\"}],\"related\":[\"taxonomy-design\",\"task-analysis\",\"design-system-architecture\",\"layout-composition\"],\"verify_with\":[\"task-analysis\",\"a11y\"]}"
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
  skill_graph_canonical_skill: skills/information-architecture/SKILL.md
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

# Information Architecture

## Coverage

Structure information so users and agents can find, understand, and move through it. Covers navigation, sitemaps, hierarchy, page grouping, labeling systems, docs structure, cross-links, wayfinding cues, content models, and IA validation through real user tasks.

## Philosophy

Information architecture is not decoration. It is the contract between a user's goal and the system's structure. If the IA is wrong, good content and good components still feel confusing because the path to them is unclear.

Good IA starts from tasks, then chooses structure. Do not promote every important thing to top-level navigation. Do not bury frequently used workflows under technically accurate but user-invisible categories.

## Method

1. Name the top user tasks and entry points.
2. Inventory current content or screens.
3. Group by user goal first, implementation detail second.
4. Decide structure: nav item, page, tab, section, filter, or cross-link.
5. Apply label discipline: recognizable user language, stable nouns, no internal jargon.
6. Add wayfinding: current location, sibling options, next action, and escape path.
7. Test against task scenarios and no-prior-knowledge discovery.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/information-architecture.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/information-architecture.json). The checklist below is the authoring gate for findability and structure decisions; the eval file is the grader surface.

## Verification

- [ ] Top tasks have obvious entry points
- [ ] Labels use user language rather than implementation terms
- [ ] Navigation levels are limited and predictable
- [ ] Similar content has one canonical home plus cross-links where needed
- [ ] Users can recover from a wrong turn without restarting
- [ ] Empty states and low-data states still preserve structure
- [ ] IA was tested against real task prompts

## Do NOT Use When

| Use instead | When |
|---|---|
| `taxonomy-design` | You need classification governance, facets, or category assignment rules. |
| `layout-composition` | You need responsive section order, grid/flex structure, or page-level scan pattern. |
| `design-system-architecture` | You need token, theme, component API, or design-system governance. |
| `microcopy` | The structure is settled and you need wording for labels, errors, or empty states. |
| `a11y` | The primary task is accessibility compliance or assistive-technology behavior. |
