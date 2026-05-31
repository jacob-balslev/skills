---
name: typography-system
description: "Use when designing a typography system — typeface selection and pairing, modular type scale, vertical rhythm, line-height and measure rules, and web font delivery (subsetting, font-display, variable fonts). Do NOT use for body copy writing, single-headline font pairing, or non-text design tokens."
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
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Designing a typography system — typeface selection and pairing, a modular type scale, vertical rhythm, line-height and measure rules, and web font delivery (subsetting, font-display, variable fonts). Portable across any design system; principle-grounded, not repo-bound. Excludes body-copy writing, single-headline font pairing, and non-text design tokens."
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
  keywords: "[\"type scale\",\"typeface pairing\",\"vertical rhythm\",\"line height\",\"measure line length\",\"web font delivery\",\"variable fonts\",\"font-display swap\",\"font subsetting\",\"modular scale\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"typography system\",\"type scale\",\"font pairing\",\"variable fonts\",\"vertical rhythm\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Build a type scale with seven steps using a 1.25 ratio and assign each step to a semantic token (display, h1, body, caption)\",\"Pair a serif display face with a sans-serif text face and document when to use each\",\"Self-host a variable font with WOFF2 subsetting and font-display: swap\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Write the headline copy for the landing page\",\"Pick the brand's primary color\",\"Decide where the headline component lives in the folder structure\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"visual-hierarchy\",\"visual-design-foundations\",\"theme-system-design\",\"layout-composition\"],\"boundary\":[{\"skill\":\"visual-hierarchy\",\"reason\":\"visual-hierarchy decides how to deploy type as an ordering signal on a given surface; this skill defines the scale and faces that get deployed.\"},{\"skill\":\"theme-system-design\",\"reason\":\"theme-system-design covers how typography tokens are layered and switched; this skill produces the typographic decisions inside them.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/typography-system/SKILL.md
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

# Typography System

## Coverage
A typography system has four components: a small set of typefaces (often one for display, one for text, optionally one monospaced), a modular scale of sizes, a set of weight and style variants per face, and rules for line-height, letter-spacing, and measure (characters per line). Each component is encoded as design tokens — font-family-text, font-size-100 through font-size-900, line-height-tight/normal/loose, letter-spacing-tight/normal — and consumed by components through semantic tokens (display, heading-1, body, caption).

Type scales are usually built from a single ratio applied iteratively to a base size. Common ratios: 1.125 (major second, subtle, content-dense UIs), 1.2 (minor third), 1.25 (major third, common default), 1.333 (perfect fourth), 1.414 (augmented fourth), 1.5 (perfect fifth, loud), 1.618 (golden ratio, very loud). Most production systems use 5–9 steps; more steps dilute the visual distinction between adjacent levels.

Line-height and measure are coupled. Longer measures need taller line-heights to keep the eye from skipping lines; shorter measures need tighter line-heights to avoid feeling sparse. The widely-cited target is 45–75 characters per line for body text, with line-height between 1.4 and 1.6 for body and 1.1–1.3 for display. Letter-spacing (CSS letter-spacing / tracking) generally tightens at large sizes (-0.02em or less at display sizes) and stays neutral at body sizes; uppercase text benefits from positive tracking (+0.05em or more) for legibility.

Variable fonts (OpenType font-variations) deliver multiple weights, widths, and optical sizes in a single file via continuous axes (wght 100–900, wdth, opsz, etc.), exposed in CSS via font-variation-settings and font-weight: <number>. They reduce HTTP requests and enable weight as a continuous design decision. Web font delivery best practices: WOFF2 format (universally supported, ~30% smaller than WOFF); subset to Latin or the languages actually used (Google Fonts CSS API does this automatically; self-hosted fonts use pyftsubset or fonttools); font-display: swap to render fallback text immediately and swap in the web font when loaded; preload the most-used font files with <link rel="preload" as="font" crossorigin>; use size-adjust, ascent-override, descent-override, and line-gap-override on the fallback @font-face to match metrics and minimize cumulative layout shift.

## Philosophy
Restraint is the practice. One text face and one display face cover most product needs; a third is a deliberate choice that requires justification. Each additional typeface costs bandwidth, hierarchy clarity, and rendering consistency across operating systems.

Typography is the densest carrier of brand. A wordmark, a heading face, and a body face shape voice more than any color does. Treat the choice of faces with the same seriousness as the choice of brand color, and treat the system around them — scale, rhythm, measure — as the structure that makes the choices work across surfaces.

## Verification
- The system uses at most three typefaces (display, text, monospace); each is justified by a use that the others cannot serve.
- Type scale steps are derived from a single ratio applied to a base size; sizes are not picked individually.
- Body text measure falls within 45–75 characters on the most common viewport widths; verified by inspecting actual rendered lines, not assumed.
- Web fonts are served as WOFF2, subset to required glyphs, with font-display: swap and metrics-matched fallback @font-face to minimize layout shift.
- Cumulative Layout Shift attributable to web font loading is below 0.1 on a representative page.
- Variable fonts (where used) load a single file and access weight/width through font-variation-settings or numeric font-weight, not separate files per weight.
- Headings and body share a consistent vertical rhythm; line-heights and margins snap to a baseline grid (typically a 4px or 8px subgrid).

## Do NOT Use When
- The task is writing copy. Typography systems shape how copy reads; they do not produce copy.
- The decision is a one-off pairing for a single graphic or asset with no system implications.
- The work is color, spacing, or motion tokens. Use color-system-design or visual-design-foundations.
- The concern is how typography tokens reach components and switch between themes. Use theme-system-design.
- You are debugging a single rendering issue (font kerning, ligature behavior in a specific browser) without a system change. That is browser-specific debugging.
