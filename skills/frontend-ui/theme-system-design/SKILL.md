---
name: theme-system-design
description: "Use when designing a theme system — design tokens, semantic token layering, CSS custom property strategy, runtime theme switching, and theme contract guarantees. Do NOT use for one-off color choices, brand-only palette work, or framework-specific styling-library configuration."
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
  keywords: "[\"theme token contract\",\"theme semantic layer\",\"theme variables\",\"css custom properties\",\"runtime theme switching\",\"token tiers\",\"theme contract\",\"design tokens community group\",\"theme parity\",\"token naming\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"theme system\",\"design tokens\",\"theme switching\",\"css variables for theming\",\"token architecture\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Design a three-tier token system (reference → system → component) for a multi-brand product\",\"Add a third theme to an existing two-theme system without breaking the component contracts\",\"Move from hard-coded colors to CSS custom properties with runtime switching\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Choose the exact hex value for the brand's primary blue\",\"Configure Tailwind's content array and purge settings\",\"Implement the dark mode toggle interaction\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"color-system-design\",\"design-system-architecture\",\"visual-design-foundations\",\"dark-mode-implementation\"],\"boundary\":[{\"skill\":\"color-system-design\",\"reason\":\"color-system-design produces the palette and the semantic color decisions; this skill structures how those decisions become tokens and reach components.\"},{\"skill\":\"dark-mode-implementation\",\"reason\":\"dark-mode-implementation handles preference detection, asset swapping, and image handling; this skill defines the token layer that makes dark mode trivial to add.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/theme-system-design/SKILL.md
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

# Theme System Design

## Coverage
A theme system is a contract between design decisions and component code, expressed as named tokens that components consume and themes resolve. The mainstream model uses three tiers — reference tokens (raw values: blue.500 = #1E66F5), system or semantic tokens (intent-named: color.background.surface, color.text.primary), and component tokens (component-specific overrides: button.primary.background). Components consume system and component tokens only; themes provide reference-token-to-system-token mappings. This indirection is what allows a single theme swap to repaint the whole product without component edits.

CSS custom properties are the dominant runtime delivery mechanism for web themes. A theme is a set of custom-property assignments scoped to a selector — typically :root for the default, [data-theme="dark"] for alternates. Custom properties cascade and inherit, so a theme override on a subtree (a dark-on-light landing-page hero inside a light app) is a single attribute change. The W3C Design Tokens Community Group format (design-tokens.org) is the emerging interchange standard, expressed as JSON with $value, $type, and $description; tooling (Style Dictionary, Tokens Studio, Terrazzo) transforms it into platform outputs (CSS variables, iOS catalogs, Android resources).

Runtime switching has three operational pieces: persistence (localStorage or a cookie if SSR-sensitive), application (a class or data attribute on the document root before first paint to avoid flash), and propagation (notify components that read theme imperatively — chart libraries, canvases). The pre-paint application typically requires a small inline script in the document head that runs before the stylesheet loads.

Theme contracts make additive changes safe and breaking changes visible. Adding a new system token is safe; renaming or removing one is a breaking change requiring a deprecation cycle. Components that read tokens by exact name should not be expected to handle missing tokens gracefully — a missing token resolves to the CSS variable's fallback value (or invalid, depending on the property), which is rarely what's wanted in production.

## Philosophy
The indirection earns its complexity by separating two rates of change: brand decisions change rarely, theme assignments (which brand color means "danger") change occasionally, and components change continuously. A flat token system collapses these into one rate and forces every component to know about every brand value. The three-tier model gives each rate of change its own surface to evolve on.

Semantic names beat descriptive names. color.background.surface tells a component author what to use; color.gray.100 forces them to know that gray.100 happens to be the surface color today and changes meaning when the theme flips. The discipline is to resist convenience names that leak appearance into the contract.

## Verification
- Components reference only system or component tokens; a grep for raw hex values or reference tokens in component code returns zero matches.
- Switching themes at runtime triggers no full-page repaint flicker; the theme attribute is set before the first paint.
- A new theme can be added by providing only a new set of system-token values; no component files are modified.
- Token definitions live in a single source-of-truth file (JSON, ideally DTCG-format) and are generated into the CSS variable layer by a build step.
- Removing or renaming a system token causes a build-time or lint-time error in every consuming component, not a silent runtime fallback.
- Server-rendered pages serialize the chosen theme into the initial HTML so first paint matches user preference.
- Documentation lists every semantic token with intent, not appearance.

## Do NOT Use When
- The task is picking specific color values or designing a palette. Use color-system-design.
- The work is one-off styling of a single component with no system-wide implications. Use design-module-composition.
- The integration concerns are dark-mode detection, asset variants, and prefers-color-scheme handling. Use dark-mode-implementation.
- You are configuring a styling library's runtime (Tailwind config, Emotion theme provider setup) without changing the token contract. That is build configuration, not theme architecture.
- The decision is about typography or spacing scales rather than tokens generally. Use typography-system or visual-design-foundations.
