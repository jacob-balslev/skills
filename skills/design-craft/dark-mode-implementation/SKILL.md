---
name: dark-mode-implementation
description: "Use when implementing dark mode — prefers-color-scheme detection, theme persistence, flash-of-unstyled-theme prevention, color token mirroring, image and asset variants, and meta theme-color updates. Do NOT use for designing the dark palette itself, designing the token architecture, or generic theme-switching across more than two themes."
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
  subject: design-craft
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/visual
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
  keywords: "[\"dark mode\",\"prefers-color-scheme\",\"theme persistence\",\"flash of unstyled theme\",\"flash of incorrect theme\",\"color-scheme css property\",\"meta theme-color\",\"dark mode images\",\"picture source media\",\"system theme detection\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"dark mode\",\"prefers-color-scheme\",\"light dark toggle\",\"system theme\",\"FOUC dark mode\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Add a dark mode toggle with system / light / dark options and persist the user's choice\",\"Eliminate the white flash that appears for a moment when a dark-mode user loads the page\",\"Provide dark variants of the marketing illustrations and the favicon\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Pick the dark mode color palette values\",\"Design the three-tier token architecture\",\"Build a multi-brand theme system with five themes\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"theme-system-design\",\"color-system-design\",\"a11y\",\"frontend-architecture\"],\"boundary\":[{\"skill\":\"theme-system-design\",\"reason\":\"theme-system-design defines the token layering that makes dark mode a token-mapping change; this skill handles the integration mechanics on top of that foundation.\"},{\"skill\":\"color-system-design\",\"reason\":\"The dark palette and its contrast pairings are color-system-design's responsibility; this skill consumes them.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/dark-mode-implementation/SKILL.md
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

# Dark Mode Implementation

## Coverage
A dark mode implementation handles five concerns: detecting the user's preference (system, explicit choice, persisted choice), applying the right theme before first paint, propagating theme changes at runtime, swapping color-sensitive assets, and updating browser-chrome hints. Each has well-defined web platform primitives.

Detection uses the prefers-color-scheme media query (window.matchMedia('(prefers-color-scheme: dark)')), which reflects the operating system or browser-level preference. Most products offer three user choices — System, Light, Dark — where System defers to the media query and the other two override it. The chosen mode is persisted (localStorage or a cookie) and read on every load. The CSS color-scheme property tells the user agent which schemes a page supports, enabling correct rendering of native form controls, scrollbars, and the default page background; declare color-scheme: light dark on :root for sites that support both.

Flash-of-incorrect-theme (sometimes called FOUC for theme) occurs when the browser paints the light default before the persisted dark preference is applied. The fix is a small, blocking inline script in <head> that reads the persisted preference and sets a class or data attribute on <html> synchronously before stylesheets resolve. Frameworks with server-side rendering must serialize the resolved theme into the HTML response, often by reading a cookie on the server.

The CSS Color Module Level 5 light-dark() function (light-dark(white, black)) lets a property declare both schemes inline and the user agent picks based on color-scheme. This is supported in current browsers and reduces the boilerplate of paired custom properties for simple cases; for token-driven systems, paired :root and [data-theme="dark"] custom property assignments remain the typical approach.

Asset handling covers three categories. Raster images that have brand-color elements need dark variants delivered via <picture> with <source media="(prefers-color-scheme: dark)"> (the markup-driven approach) or via CSS background-image swapping. SVG illustrations can use currentColor or CSS custom properties for fill/stroke and update automatically. Favicons can declare a dark variant via <link rel="icon" media="(prefers-color-scheme: dark)" href="...">. Embedded videos and iframes (YouTube, Maps) often have their own theme parameter that needs to be passed via URL.

Browser chrome hints include the meta theme-color tag (<meta name="theme-color" content="..." media="(prefers-color-scheme: dark)">), which sets the address bar color on mobile browsers, the Safari toolbar tint, and the PWA splash screen. Pair it with a light variant via media= so the chrome matches the active theme. Apple-specific apple-mobile-web-app-status-bar-style is now overridden by theme-color on supported versions.

## Philosophy
Dark mode is not a re-skin; it is a parallel design surface. Image contrast, shadow strategy (shadows on dark backgrounds work differently — often replaced with subtle borders or elevated background tints), focus ring visibility, and chart palettes all need attention. Treating dark mode as a CSS-only change produces a dark mode that technically works and feels half-finished.

The user's explicit choice overrides the system. A user who has toggled to Dark on your site once expects Dark on the next visit regardless of what their OS is doing. Persistence is not optional, and a System option is a separate, third state from "no preference saved."

## Verification
- No flash of incorrect theme occurs on cold load for a dark-mode user; verified by throttling network and watching the first paint.
- The CSS color-scheme property is declared on :root with the schemes the page supports, so native form controls render correctly in dark mode.
- Brand-color images (illustrations, hero photos with light backgrounds) have dark variants delivered via <picture> source matching or equivalent.
- The meta theme-color tag has paired light and dark variants and matches the active theme.
- The favicon has a dark variant where the design needs it (e.g., dark logos on transparent backgrounds become invisible against dark browser tabs).
- The user's explicit choice (light/dark/system) is persisted and restored across reloads; toggling away from System and back is observable.
- All interactive states (focus rings, hover, selected) are visible in dark mode and meet contrast requirements; verified visually and via automated contrast testing.

## Do NOT Use When
- The task is choosing the dark palette values themselves. Use color-system-design.
- The work is defining the token architecture that makes theming possible. Use theme-system-design.
- The product requires more than two themes (multi-brand white-label, three or more visual modes). Use theme-system-design for the architecture; this skill covers the dark-specific platform integrations only.
- You are auditing for WCAG contrast violations specifically. Use a11y for the criteria; the palette decisions come from color-system-design.
- The bug is a single component looking wrong in dark mode after the system is otherwise complete. That is component-level debugging, not implementation architecture.
