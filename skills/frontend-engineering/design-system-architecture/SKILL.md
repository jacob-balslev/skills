---
name: design-system-architecture
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing or auditing a design system's architecture: token taxonomy, semantic tokens, component APIs, theming, accessibility contracts, documentation, governance, and migration strategy. Do NOT use for information hierarchy and navigation (use `information-architecture`), page-specific layout (use `layout-composition`), visual craft direction (use `visual-design-foundations`), sentence-level UI copy (use `microcopy`), or accessibility-only audits (use `a11y`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:

  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: frontend-engineering
  # public: publishability/private-data gate. Boolean.
  # true = publishable/shareable; false = private and excluded from public export.
  # Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
  public: true
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Designing and auditing a design system's architecture — token taxonomy, semantic tokens, component APIs, theming, accessibility contracts, documentation, governance, and migration strategy. Portable across any design system; principle-grounded, not repo-bound. Excludes information hierarchy and navigation (information-architecture), page-specific layout (layout-composition), visual craft direction (visual-design-foundations), sentence-level UI copy (microcopy), and accessibility-only audits (a11y)."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/system
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["design tokens","semantic tokens","component API","theming","component library","token taxonomy","design system migration","design system audit","component library audit","token drift"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["define semantic tokens so charts, status colors, and surfaces do not hardcode raw colors","audit this component library for API consistency and token drift","design the theming architecture before adding dark mode","how should we migrate old CSS variables to canonical design-system tokens?"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["organize pages, nav, sitemap, and wayfinding","rewrite the empty-state text and tooltip labels","add aria-labels and keyboard behavior to this component","draft an architecture note explaining why we chose Postgres over DynamoDB"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"component-architecture\",\"layout-composition\",\"visual-design-foundations\",\"interaction-patterns\",\"microcopy\",\"refactor\",\"a11y\",\"information-architecture\",\"semantics\"],\"verify_with\":[\"a11y\",\"code-review\",\"component-architecture\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    A design system is a layered architecture, not a style pile. The bottom layer is RAW tokens — the literal values a brand owns (a hex palette, a spacing ramp, a type scale). The middle layer is SEMANTIC tokens — names that encode product meaning (surface, danger, primary-action, text-muted) and point AT raw tokens, so meaning is stable while values can change per theme. The top layer is COMPONENT contracts — each component declares its purpose, props/slots, states, accessibility behavior, and composition rules, and consumes only semantic tokens, never raw values. Theming swaps the raw values a semantic token resolves to without touching any component. Governance (forbidden local overrides, deprecation/migration paths, drift detection between code and design intent) is the rule layer that keeps the three layers from decaying back into per-screen ad-hoc choices.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without a system, every screen re-decides color, spacing, state, and behavior locally: palette names leak into components, variants multiply to cover visual guesses, accessibility is bolted on per component, and a theme change means a rewrite. The result is inconsistency, slow product work, and drift between what design intends and what code ships. A design system architecture exists to encode durable decisions ONCE — as a token taxonomy plus component contracts — so product teams compose from a governed vocabulary instead of inventing one per screen. Its second-order purpose is governability: clear constraints (which overrides are forbidden, which tokens are deprecated, how migrations run) are what make the system flexible rather than ungoverned; a system with too many escape hatches is decorative, not architectural.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT information architecture — page hierarchy, navigation, sitemap, and wayfinding belong to information-architecture. It is NOT page-specific layout — section order, responsive structure, and breakpoints for one screen belong to layout-composition. It is NOT visual craft direction — choosing the actual colors, type, spacing values, and density mood belongs to visual-design-foundations. It is NOT sentence-level UI copy — labels, empty-state and error wording belong to microcopy. It is NOT a focused accessibility audit — compliance verification belongs to a11y (this skill owns only the accessibility CONTRACT as part of each component's API). It owns the token taxonomy, the component contracts, the theming and governance rules; it does not own the page-level deployment, the visual values themselves, the words, or the compliance check.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A design system architecture is to product UI what a building code plus a kit of standardized parts is to construction — it does not draw any single floor plan (the page layout) or pick the paint colors (the visual values); it defines the load-bearing vocabulary (semantic tokens), the certified components and how they connect (component contracts), and the rules every builder must follow (governance), so any team can assemble a sound, consistent building without re-engineering the joists each time."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "a design system is a component library plus a palette" — a pile of reusable pieces and colors. That treats components and tokens as a convenience kit and skips the architecture. The corrected model: the value lives in the SEMANTIC layer and the CONTRACTS, not the pieces. Raw tokens with no semantic layer leak palette names into components and break theming; components without declared contracts (states, accessibility, composition rules, forbidden overrides) become a gallery of one-offs. Adding another variant or another escape hatch feels free but is a governance cost — it dilutes the constraints that make the system worth having.
---
# Design System Architecture

## Concept of the skill

A design system architecture is the discipline of turning recurring UI decisions into a governed, layered vocabulary so that building a screen becomes composition from durable parts rather than a fresh round of local choices. It has three layers and a rule layer. **Raw tokens** hold the literal brand values — a palette, a spacing ramp, a type scale. **Semantic tokens** name product meaning (surface, danger, primary-action, text-muted) and point at raw tokens, so the meaning of a token is stable while the value behind it can change per theme. **Component contracts** define each reusable piece — its purpose, props and slots, states, accessibility behavior, and composition rules — and consume only semantic tokens, never raw values. Over all three sits **governance**: forbidden local overrides, deprecation and migration paths, documentation that shows expected use and anti-use, and drift detection between code and design intent. The architecture's job is to encode decisions once and make them reusable and enforceable, so that color, spacing, state, theming, and accessibility are answered by the system instead of re-decided on every screen — and a theme change or token rename propagates through the semantic layer without rewriting components.

## Coverage

Design and audit reusable UI systems. Covers token taxonomy, semantic vs raw tokens, component APIs, variants, slots, theming, accessibility contracts, responsive behavior, documentation, governance, migration, and drift detection between code and design intent.

## Philosophy of the skill

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
