---
name: information-architecture
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when structuring information for findability: navigation, page hierarchy, docs architecture, sitemap shape, labeling systems, wayfinding, and content grouping. Do NOT use for formal category-governance work (use `taxonomy-design`), responsive page composition (use `layout-composition`), component/token architecture (use `design-system-architecture`), or sentence-level UI text (use `microcopy`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
allowed-tools: Read Grep
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
  subjects: [design, knowledge-organization]
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Structuring information for findability — navigation, page hierarchy, docs architecture, sitemap shape, labeling systems, wayfinding, and content grouping. Portable across any product or docs surface; principle-grounded, not repo-bound. Excludes formal category-governance work (taxonomy-design), responsive page composition (layout-composition), component/token architecture (design-system-architecture), and sentence-level UI text (microcopy)."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/information-architecture
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["information architecture","navigation structure","sitemap","wayfinding","page hierarchy","docs architecture","labeling system","content grouping","findability","content model"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["information architecture","navigation structure","sitemap","page hierarchy","wayfinding"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["our docs have good content but nobody can find the setup instructions - how should the IA change?","design the navigation and page hierarchy for this admin app","these dashboard sections overlap and users do not know where to look first","should this be a top-level nav item, a tab, a filter, or a page section?"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["make the category taxonomy and assignment rules for this skill library","define design tokens, component APIs, and theming rules","rewrite this tooltip and empty-state copy","audit keyboard accessibility and ARIA semantics"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"suppresses\":[{\"skill\":\"layout-composition\",\"reason\":\"layout-composition owns structure inside a page or screen; information-architecture owns cross-page organization and wayfinding\"},{\"skill\":\"microcopy\",\"reason\":\"microcopy owns sentence-level UI text; information-architecture owns placement and hierarchy\"}],\"related\":[\"taxonomy-design\",\"task-analysis\",\"design-system-architecture\",\"layout-composition\",\"a11y\"],\"verify_with\":[\"task-analysis\",\"a11y\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Information architecture is the structural contract between a user's goal and where the system puts the thing that satisfies it. It has four interlocking parts: an inventory of the content and screens that exist; a grouping that clusters them by user goal rather than by implementation category; a placement decision per item (top-level nav, page, tab, section, filter, or cross-link) governed by frequency and task-entry, not raw importance; and a labeling-plus-wayfinding layer that names each group in recognizable user language and always tells the user where they are, what is nearby, what comes next, and how to escape a wrong turn. Structure is chosen after tasks are named, never before.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without deliberate IA, structure mirrors the org chart or the database schema: features land in technically accurate but user-invisible categories, every important thing is promoted to top-level navigation until the navigation means nothing, and similar content scatters across multiple homes. The symptoms are always the same — users cannot find what they came for even when the content and components are good, because the path to them is unclear. IA exists to make those paths obvious and recoverable: it converts a pile of pages into a navigable structure where the top tasks have obvious entry points, labels read in the user's language, and a wrong turn is one click from recovery.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT formal category governance — facets, controlled vocabularies, and assignment rules belong to taxonomy-design. It is NOT the structure inside a single page or screen (responsive section order, grid/flex layout, scan pattern) — that is layout-composition. It is NOT component, token, theme, or design-system governance — that is design-system-architecture. It is NOT sentence-level wording for labels, errors, or empty states once the structure is settled — that is microcopy. And it is NOT accessibility compliance or assistive-technology behavior — that is a11y. IA owns cross-page organization, hierarchy, grouping, labeling, and wayfinding; it does not own what lives inside a page, how things are classified at the governance level, or how they are worded.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Information architecture is to a product what the floor plan and signage of a building are to its rooms — it does not furnish a room (layout) or write the notices on the wall (microcopy) or decide the building code for room types (taxonomy); it decides which rooms exist on which floor, how they are grouped, what each door is labeled, and how a lost visitor finds their way back to the lobby."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The common wrong model is "important things go in the top-level navigation." Importance alone does not earn a nav slot — frequency of use, whether the item is a genuine task entry point, and overall findability decide placement, and a tab, section, filter, or cross-link is often the better home. The deeper misconception is that IA mirrors how the team thinks about the product (its features, its internal categories) when it must mirror how the user thinks about their goal. An IA that is technically accurate but user-invisible has failed, and the only way to know is to test the structure against real, no-prior-knowledge task prompts rather than asserting it reads well.
---
# Information Architecture

## Concept of the skill

Information architecture is the discipline of structuring information so that people and agents can find, understand, and move through it. It is the contract between a user's goal and the system's structure: when the IA is wrong, good content and good components still feel confusing because the path to them is unclear. Strong IA always starts from tasks — name the top user goals and entry points first — and only then chooses structure, grouping content by what the user is trying to accomplish rather than by how the system is built internally. Every item then gets a deliberate placement (nav item, page, tab, section, filter, or cross-link) decided by frequency and task-entry rather than by raw importance, a label drawn from recognizable user language, and a wayfinding layer that keeps the user oriented (where am I, what is nearby, what is next, how do I recover from a wrong turn). The whole structure is validated the same way it was conceived — against real task scenarios and no-prior-knowledge discovery — because an IA that merely looks logical to its authors but cannot be navigated by a first-time user has not done its job.

## Coverage

Structure information so users and agents can find, understand, and move through it. Covers navigation, sitemaps, hierarchy, page grouping, labeling systems, docs structure, cross-links, wayfinding cues, content models, and IA validation through real user tasks.

IA decisions resolve into a small set of recurring choices. **Placement:** for each piece of content, decide whether it is a top-level navigation item, a page, a tab within a page, a section on a page, a filter over a list, or a cross-link from a related location — governed by how often the item is used and whether it is a genuine task entry point, not by how important the team feels it is. **Grouping:** cluster content by user goal first and implementation detail second, so a user looking to "get set up" finds setup material together rather than scattered across product-feature silos. **Labeling:** name each group and destination in stable, recognizable user nouns, avoiding internal jargon and ensuring the same concept is named the same way everywhere. **Wayfinding:** every location communicates the current position, the sibling options at that level, the likely next action, and an escape path back to a known anchor. **Hierarchy depth:** navigation levels are kept limited and predictable, because deep or inconsistent nesting hides content as effectively as omitting it.

A recurring tension is the single-canonical-home rule: similar content should have one authoritative location plus cross-links from related places, rather than being duplicated into several homes (which fragments maintenance and confuses users about which copy is current). Empty states and low-data states are part of the IA, not an afterthought — the structure must still read clearly when a list is empty or a section has no data yet.

## Method

1. Name the top user tasks and entry points.
2. Inventory current content or screens.
3. Group by user goal first, implementation detail second.
4. Decide structure: nav item, page, tab, section, filter, or cross-link.
5. Apply label discipline: recognizable user language, stable nouns, no internal jargon.
6. Add wayfinding: current location, sibling options, next action, and escape path.
7. Test against task scenarios and no-prior-knowledge discovery.

## Philosophy of the skill

Information architecture is not decoration. It is the contract between a user's goal and the system's structure. If the IA is wrong, good content and good components still feel confusing because the path to them is unclear.

Good IA starts from tasks, then chooses structure. Do not promote every important thing to top-level navigation. Do not bury frequently used workflows under technically accurate but user-invisible categories.

The credibility of an IA comes from being tested, not asserted. A structure that reads logically to the team that built it routinely fails a first-time user, because the team's mental model is shaped by the system's internals while the user's is shaped by their goal. Restraint at the top level is part of the discipline: a navigation that promotes everything communicates nothing, so the practice is to earn each top-level slot against frequency and task-entry, push the rest down into sections, tabs, filters, and cross-links, and verify the result against real task prompts.

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
