---
name: typography-system
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing a typography system — typeface selection and pairing, modular type scale, vertical rhythm, line-height and measure rules, and web font delivery (subsetting, font-display, variable fonts). Do NOT use for body copy writing, single-headline font pairing, or non-text design tokens."
# license: SPDX-compatible license identifier for the skill content.
license: CC-BY-4.0
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:

  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: design
  # public: publishability/private-data gate. Boolean.
  # true = publishable/shareable; false = private and excluded from public export.
  # Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
  public: true
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Designing a typography system — typeface selection and pairing, a modular type scale, vertical rhythm, line-height and measure rules, and web font delivery (subsetting, font-display, variable fonts). Portable across any design system; principle-grounded, not repo-bound. Excludes body-copy writing, single-headline font pairing, and non-text design tokens."
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: stable
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["type scale","typeface pairing","vertical rhythm","line height","measure line length","web font delivery","variable fonts","font-display swap","font subsetting","modular scale"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["typography system","type scale","font pairing","variable fonts","vertical rhythm"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Build a type scale with seven steps using a 1.25 ratio and assign each step to a semantic token (display, h1, body, caption)","Pair a serif display face with a sans-serif text face and document when to use each","Self-host a variable font with WOFF2 subsetting and font-display: swap"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Write the headline copy for the landing page","Pick the brand's primary color","Decide where the headline component lives in the folder structure"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"visual-hierarchy\",\"visual-design-foundations\",\"theme-system-design\",\"layout-composition\"],\"suppresses\":[{\"skill\":\"visual-hierarchy\",\"reason\":\"visual-hierarchy decides how to deploy type as an ordering signal on a given surface; this skill defines the scale and faces that get deployed.\"}]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    A typography system has four interlocking primitives that all resolve into design tokens: a minimal set of typefaces (one display, one text, optionally one monospace); a modular scale of sizes derived from a single ratio applied to a base size; rhythm rules that couple line-height, letter-spacing, and measure (characters per line); and a delivery layer that ships the faces as subset WOFF2 with font-display and metrics-matched fallbacks. Components never name a raw size or face — they consume semantic tokens (display, heading, body, caption) that point at the scale steps and family tokens, so a system change propagates everywhere at once.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without a system, type is decided ad hoc per screen: sizes are hand-picked, faces multiply, line-heights drift, and web fonts arrive with uncontrolled layout shift. The result is inconsistent hierarchy, diluted brand voice, and CLS regressions. A typography system exists to make every type decision derivable and reproducible — sizes come from a ratio, rhythm from a baseline grid, faces from a justified short list — so the same voice reads coherently across marketing pages, app screens, and email.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT copywriting (the words themselves), NOT a one-off font pairing for a single asset with no system implications, NOT color/spacing/motion tokens (visual-design-foundations), NOT how tokens reach components or switch between themes (theme-system-design), and NOT how type is deployed as an ordering signal on a specific surface (visual-hierarchy). It owns the scale, the faces, and the rhythm rules; it does not own where they get used.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A typography system is to a product's text what a musical key and time signature are to a score — it does not write the melody (the copy) or perform it on a given stage (the layout); it sets the scale and the rhythm every part must play in so the whole stays harmonious across instruments."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "typography is picking nice fonts," which treats each size and face as an independent aesthetic choice. The corrected model: face selection is a small, justified part; the system — a ratio-derived scale, line-height/measure coupling, baseline rhythm, and token-mediated delivery — is what actually carries hierarchy, brand, and performance. Adding a typeface or hand-picking a size is a cost (bandwidth, hierarchy clarity, cross-OS rendering), not a free aesthetic win.
---
# Typography System

## Concept of the skill

A typography system is the discipline of turning a brand's voice into a small, rule-governed set of type decisions that stay coherent across every surface a product renders on. It has four interlocking parts: a minimal set of **typefaces** (typically one display, one text, optionally one monospace); a **modular scale** of sizes derived from a single ratio applied to a base size; **rhythm rules** that couple line-height, letter-spacing, and measure (characters per line); and a **delivery layer** that ships those faces as subset WOFF2 with `font-display` and metrics-matched fallbacks to control layout shift. Each decision is encoded as a design token and consumed through semantic tokens (display, heading, body, caption) so components never hard-code a size or face. The system's job is to make typographic choices reproducible and restrained — faces are justified, sizes are derived rather than hand-picked, and rhythm snaps to a baseline grid — so the type reads consistently whether it lands on a marketing page, an app screen, or an email.

## Coverage
A typography system has four components: a small set of typefaces (often one for display, one for text, optionally one monospaced), a modular scale of sizes, a set of weight and style variants per face, and rules for line-height, letter-spacing, and measure (characters per line). Each component is encoded as design tokens — font-family-text, font-size-100 through font-size-900, line-height-tight/normal/loose, letter-spacing-tight/normal — and consumed by components through semantic tokens (display, heading-1, body, caption).

Type scales are usually built from a single ratio applied iteratively to a base size. Common ratios: 1.125 (major second, subtle, content-dense UIs), 1.2 (minor third), 1.25 (major third, common default), 1.333 (perfect fourth), 1.414 (augmented fourth), 1.5 (perfect fifth, loud), 1.618 (golden ratio, very loud). Most production systems use 5–9 steps; more steps dilute the visual distinction between adjacent levels.

Line-height and measure are coupled. Longer measures need taller line-heights to keep the eye from skipping lines; shorter measures need tighter line-heights to avoid feeling sparse. The widely-cited target is 45–75 characters per line for body text, with line-height between 1.4 and 1.6 for body and 1.1–1.3 for display. Letter-spacing (CSS letter-spacing / tracking) generally tightens at large sizes (-0.02em or less at display sizes) and stays neutral at body sizes; uppercase text benefits from positive tracking (+0.05em or more) for legibility.

Variable fonts (OpenType font-variations) deliver multiple weights, widths, and optical sizes in a single file via continuous axes (wght 100–900, wdth, opsz, etc.), exposed in CSS via font-variation-settings and font-weight: <number>. They reduce HTTP requests and enable weight as a continuous design decision. Web font delivery best practices: WOFF2 format (universally supported, ~30% smaller than WOFF); subset to Latin or the languages actually used (Google Fonts CSS API does this automatically; self-hosted fonts use pyftsubset or fonttools); font-display: swap to render fallback text immediately and swap in the web font when loaded; preload the most-used font files with <link rel="preload" as="font" crossorigin>; use size-adjust, ascent-override, descent-override, and line-gap-override on the fallback @font-face to match metrics and minimize cumulative layout shift.

## Philosophy of the skill
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
