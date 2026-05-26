---
name: visual-design-foundations
description: "Use when designing or auditing visual craft: color palette, typography, spacing, elevation, rhythm, density, visual hierarchy, brand fit, contrast intent, and motion feel. Do NOT use for sign-system meaning (use `semiotics`), token/component architecture (use `design-system-architecture`), responsive structure (use `layout-composition`), or accessibility compliance (use `a11y`)."
license: MIT
compatibility:
  notes: "Portable visual-design guidance for product UI, dashboards, docs, marketing-adjacent product surfaces, and design-system consumers. Does not replace brand-specific guidelines."
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
  type: capability
  # operation: cognitive operation enabled (Bloom-grounded). One of four closed values:
  # know (declarative — concepts, vocabulary, reference) /
  # do (procedural — step-by-step execution) /
  # decide (judgment — choosing, dispatching) /
  # modify (context injection — shapes how other skills execute).
  operation: know
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: design

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: frontend-ui
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: design/visual
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-11"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-11\"}"

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
  keywords: "[\"visual-design\",\"visual craft\",\"palette direction\",\"typography direction\",\"spatial rhythm\",\"density rules\",\"elevation treatment\",\"motion feel\",\"brand fit\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"pick a visual direction for this dashboard without changing the task structure\",\"audit color, typography, spacing, and hierarchy for this product page\",\"this UI feels flat and hard to scan - improve the visual hierarchy\",\"choose a restrained palette and type scale for an internal admin tool\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"what does this icon or badge color communicate to users?\",\"define semantic tokens and component variants\",\"decide the responsive section order and breakpoint behavior\",\"verify WCAG contrast, focus order, and screen-reader behavior\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"semiotics\",\"reason\":\"semiotics owns what visual signs mean; visual-design-foundations owns the craft choices that shape the surface\"},{\"skill\":\"design-system-architecture\",\"reason\":\"design-system-architecture owns reusable tokens and components; visual-design-foundations owns visual direction and craft on a surface\"},{\"skill\":\"layout-composition\",\"reason\":\"layout-composition owns responsive structure; visual-design-foundations owns palette, typography, rhythm, density, and polish\"},{\"skill\":\"a11y\",\"reason\":\"a11y owns accessibility compliance; visual-design-foundations can propose visual choices that a11y later verifies\"}],\"related\":[\"semiotics\",\"design-system-architecture\",\"layout-composition\",\"microcopy\",\"a11y\"],\"verify_with\":[\"a11y\",\"semiotics\"]}"
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
  skill_graph_canonical_skill: skills/visual-design-foundations/SKILL.md
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

# Visual Design Foundations

## Coverage

Design and audit visual craft for interface surfaces. Covers palette direction, type scale, spacing rhythm, hierarchy, density, elevation, borders, contrast intent, visual weight, motion feel, brand fit, and when a visual system should be split into deeper color, typography, or motion skills.

## Philosophy

Visual design is not decoration after structure; it is how the structure becomes legible. Good visual craft makes priority, grouping, affordance, and tone visible without asking the user to parse every label.

Keep this skill at foundation level. If the task needs formal color math, font-loading engineering, or token governance, hand off to the skill that owns that contract.

## Method

1. Name the surface type: operational tool, docs, dashboard, editorial page, marketplace, or brand page.
2. State the intended tone and scanning demand.
3. Choose palette roles before picking raw colors: surface, text, accent, success, warning, danger, info, disabled.
4. Define type roles: page title, section heading, control label, body, metadata, numeric emphasis.
5. Set spacing and density rules that match repeated use, not one screenshot.
6. Use elevation, border, and background only to clarify grouping or affordance.
7. Check visual decisions against `semiotics` and `a11y` before treating them as done.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/visual-design-foundations.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/visual-design-foundations.json). The checklist below is the authoring gate for visual-design decisions; the eval file is the grader surface.

## Verification

- [ ] Visual hierarchy makes primary content faster to find
- [ ] Palette roles are named by purpose rather than raw color
- [ ] Type roles are consistent and not oversized inside compact UI
- [ ] Spacing and density fit the surface's repeated-use context
- [ ] Elevation and borders clarify grouping instead of adding noise
- [ ] Motion, if used, clarifies state or continuity and can be reduced
- [ ] A11y contrast and non-color-only checks are deferred to `a11y`

## Do NOT Use When

| Use instead | When |
|---|---|
| `semiotics` | The question is what a color, icon, badge, shape, or visual metaphor means. |
| `design-system-architecture` | The task is semantic tokens, component APIs, theming contracts, or governance. |
| `layout-composition` | The task is responsive structure, grid tracks, breakpoints, or section order. |
| `a11y` | The task is WCAG contrast, focus, labels, keyboard access, or assistive technology. |
| `microcopy` | The task is the wording inside buttons, dialogs, empty states, errors, or tooltips. |
