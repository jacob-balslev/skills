---
name: layout-composition
description: "Use when deciding responsive page or screen structure: section order, scan pattern, grid/flex composition, breakpoints, viewport hierarchy, responsive media, and density. Do NOT use for user-goal decomposition (use `task-analysis`), navigation taxonomy (use `information-architecture`), visual polish (use `visual-design-foundations`), or component/token contracts (use `design-system-architecture`)."
license: MIT
compatibility:
  notes: "Portable layout and responsive-composition guidance for web apps, dashboards, documentation sites, admin tools, and mobile-first product surfaces."
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
  domain: design/layout
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
  keywords: "[\"layout-composition\",\"responsive screen composition\",\"viewport hierarchy\",\"breakpoint selection\",\"grid flex composition\",\"stable dimensions\",\"scan pattern\",\"responsive media\",\"density planning\",\"whitespace balance\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"turn this route hierarchy into a responsive section order\",\"decide whether this dashboard should use tabs, columns, or stacked sections on mobile\",\"the page works on desktop but the mobile scan path is broken\",\"choose grid tracks, breakpoints, and responsive media behavior for this screen\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"what is the user's top task for this route?\",\"design the global navigation and sitemap\",\"pick the color palette, type scale, and visual mood\",\"define component variants and semantic tokens\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"task-analysis\",\"reason\":\"task-analysis defines the user goal and first-viewport hierarchy contract; layout-composition turns that contract into responsive structure\"},{\"skill\":\"information-architecture\",\"reason\":\"information-architecture owns navigation and page grouping; layout-composition owns the structure inside a page or screen\"},{\"skill\":\"visual-design-foundations\",\"reason\":\"visual-design-foundations owns visual craft choices; layout-composition owns spatial structure and responsive behavior\"},{\"skill\":\"design-system-architecture\",\"reason\":\"design-system-architecture owns reusable component and token contracts; layout-composition uses those contracts on a concrete surface\"}],\"related\":[\"task-analysis\",\"information-architecture\",\"design-system-architecture\",\"a11y\",\"performance-engineering\"],\"verify_with\":[\"task-analysis\",\"a11y\"]}"
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
  skill_graph_canonical_skill: skills/layout-composition/SKILL.md
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

# Layout Composition

## Coverage

Compose page and screen structure so the hierarchy survives real viewports. Covers section order, scan pattern, grid and flex choices, responsive breakpoints, mobile-first stacking, stable dimensions, responsive media, density, empty/loaded-state footprint, and handoff from task hierarchy to implementation-ready layout.

## Philosophy

Layout is the visible contract between task priority and available space. A surface that has the right content can still fail if primary information collapses below the fold, controls jump between states, or a desktop-only composition is squeezed into a narrow viewport.

Start from hierarchy, then choose structure. Do not design to named devices; design to the point where the content starts to break.

## Method

1. Read the primary, secondary, and supporting hierarchy from `task-analysis` or the route contract.
2. Identify fixed-format elements: tables, cards, charts, boards, media, toolbars, and forms.
3. Choose the scan pattern: single column, master-detail, sidebar/content, table-first, card grid, or step flow.
4. Define responsive breakpoints where content breaks, not where devices are marketed.
5. Set stable dimensions for elements that must not resize on hover, loading, or label changes.
6. Decide what collapses, stacks, pins, hides, or moves at each breakpoint.
7. Check mobile, tablet, desktop, low-data, loading, empty, and error states.

## Evals

This skill ships a comprehension-eval artifact at [`examples/evals/layout-composition.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/layout-composition.json). The checklist below is the authoring gate for layout decisions; the eval file is the grader surface.

## Verification

- [ ] The primary task remains visible before supporting detail
- [ ] Breakpoints are content-driven rather than device-name-driven
- [ ] Fixed-format elements have stable dimensions or aspect ratios
- [ ] Mobile and narrow layouts preserve action order and recovery paths
- [ ] Loading, empty, and error states do not shift the core layout unpredictably
- [ ] Responsive media cannot overflow its container
- [ ] Accessibility landmarks, heading order, and focus order still match the visual order

## Do NOT Use When

| Use instead | When |
|---|---|
| `task-analysis` | The user goal, top task, or first-viewport hierarchy is not yet known. |
| `information-architecture` | The problem is global navigation, sitemap shape, or page grouping. |
| `visual-design-foundations` | The task is color, typography, spacing taste, mood, or polish. |
| `design-system-architecture` | The task is token taxonomy, component API, theming, or system governance. |
| `a11y` | The primary question is WCAG, ARIA, keyboard behavior, labels, or assistive-tech output. |
