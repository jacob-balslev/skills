---
name: layout-composition
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when deciding responsive page or screen structure: section order, scan pattern, grid/flex composition, breakpoints, viewport hierarchy, responsive media, and density. Do NOT use for user-goal decomposition (use `task-analysis`), navigation taxonomy (use `information-architecture`), visual polish (use `visual-design-foundations`), or component/token contracts (use `design-system-architecture`)."
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
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Deciding responsive page or screen structure — section order, scan pattern, grid/flex composition, breakpoints, viewport hierarchy, responsive media, and density. Portable across any UI; principle-grounded, not repo-bound. Excludes user-goal decomposition (task-analysis), navigation taxonomy (information-architecture), visual polish (visual-design-foundations), and component/token contracts (design-system-architecture)."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/layout
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["layout composition","responsive screen composition","viewport hierarchy","breakpoint selection","grid flex composition","stable dimensions","scan pattern","responsive media","density planning","whitespace balance"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["layout composition","responsive layout","section order","breakpoints","scan pattern"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["turn this route hierarchy into a responsive section order","decide whether this dashboard should use tabs, columns, or stacked sections on mobile","the page works on desktop but the mobile scan path is broken","choose grid tracks, breakpoints, and responsive media behavior for this screen"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["what is the user's top task for this route?","design the global navigation and sitemap","pick the color palette, type scale, and visual mood","define component variants and semantic tokens"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"task-analysis\",\"information-architecture\",\"design-system-architecture\",\"a11y\",\"performance-engineering\",\"interaction-patterns\"],\"suppresses\":[{\"skill\":\"information-architecture\",\"reason\":\"information-architecture owns navigation and page grouping; layout-composition owns the structure inside a page or screen\"},{\"skill\":\"visual-design-foundations\",\"reason\":\"visual-design-foundations owns visual craft choices; layout-composition owns spatial structure and responsive behavior\"}],\"verify_with\":[\"task-analysis\",\"a11y\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Layout composition is the assignment of priority-ranked content to space across the range of viewports a surface must serve. It runs in one direction: hierarchy first, structure second. Given the primary, secondary, and supporting content (from task analysis or a route contract), composition chooses a scan pattern (single column, master-detail, sidebar/content, table-first, card grid, step flow), then a grid/flex skeleton, then the breakpoints — defined at the points where the content actually breaks, not at marketed device widths. The hard constraints are spatial stability and ordered survival: fixed-format elements (tables, charts, media, cards) get stable dimensions so they do not jump on hover, load, or label change; and at every breakpoint the primary content stays above the fold and the action/recovery order is preserved as things stack, pin, collapse, or hide. The layout is the visible contract between task priority and available space — and it must hold not only at full data but at loading, empty, and error states too.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    A surface can have exactly the right content and still fail because of how that content meets the space: primary information collapses below the fold on a phone, controls jump position between loading and loaded states, a desktop-first composition is crushed into a narrow viewport, or a chart overflows its container. Layout composition exists to make these failures designed-out rather than discovered in production — to guarantee that the task hierarchy survives the real range of viewports, that elements which must not resize do not, and that the mobile scan path is as deliberate as the desktop one. It is the step that turns 'the page has the parts' into 'the page works on the device in the user's hand.'
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT user-goal decomposition — discovering the top task, the user's intent, and the priority ranking of content belongs to task-analysis, which runs BEFORE layout and feeds it the hierarchy. It is NOT navigation taxonomy — the sitemap, the grouping of pages, and how a user moves BETWEEN screens belong to information-architecture; layout-composition owns the structure WITHIN a single page or screen. It is NOT visual polish — color, typography taste, spacing aesthetics, mood, and craft belong to visual-design-foundations; layout-composition owns spatial structure and responsive behavior, not the finish applied to it. And it is NOT the component/token contract — variants, slots, semantic tokens, theming, and system governance belong to design-system-architecture; layout-composition arranges the components, it does not define their APIs. It owns where things go and how they reflow; it does not own why they are there, how you navigate to them, how they are styled, or how they are built.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Layout composition is to a screen what an architect's floor plan is to a building — it does not choose the furniture's finish (visual polish) or decide why you need a kitchen (task analysis) or how you walk between buildings on the campus (information architecture); it fixes where the load-bearing rooms sit, how the space reflows when the lot is narrow, and which walls stay put so the structure holds at every size."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "design it on the desktop canvas and let it shrink." That treats responsive behavior as automatic degradation and produces the familiar failures: the primary task buried below a hero on mobile, three desktop columns squeezed into illegible narrow strips, breakpoints set to iPhone/iPad widths that break a month later when a new device ships, and content that pops and shifts as it loads. The corrected model: start from the content hierarchy, design the scan path at the narrowest viewport first (or at least deliberately for it), set breakpoints where the content breaks rather than where devices are marketed, and give fixed-format elements stable dimensions. Responsiveness is a designed sequence of compositions across the viewport range, not a single composition left to collapse.
---
# Layout Composition

## Concept of the skill

Layout composition is the discipline of assigning priority-ranked content to space across the full range of viewports a surface must serve, so the task hierarchy survives every real screen. It runs in one direction — hierarchy first, structure second. Given the primary, secondary, and supporting content (handed over from task analysis or a route contract), composition chooses a scan pattern (single column, master-detail, sidebar/content, table-first, card grid, or step flow), lays down a grid or flex skeleton, and then sets breakpoints at the points where the content actually breaks rather than at marketed device widths. Two constraints are non-negotiable: spatial stability — fixed-format elements such as tables, charts, media, and cards get stable dimensions so they do not jump on hover, loading, or label changes; and ordered survival — at every breakpoint the primary content stays above the fold and the action and recovery order is preserved as elements stack, pin, collapse, or hide. The layout is the visible contract between task priority and available space, and it must hold not only at full data but across loading, empty, and error states. Composition arranges; it does not decide why the content exists, how the user navigates to it, how it is styled, or how its components are built.

## Coverage

Compose page and screen structure so the hierarchy survives real viewports. Covers section order, scan pattern, grid and flex choices, responsive breakpoints, mobile-first stacking, stable dimensions, responsive media, density, empty/loaded-state footprint, and handoff from task hierarchy to implementation-ready layout.

**Scan patterns** are the structural archetypes: *single column* (linear reading/forms), *master-detail* (a list plus a detail pane), *sidebar/content* (persistent nav or filters beside the main region), *table-first* (dense tabular data leads), *card grid* (browsable peers), and *step flow* (sequenced screens). The pattern is chosen from the content hierarchy, not from aesthetic preference.

**Breakpoints** are defined where the content breaks — where a column becomes too narrow to read, where a table can no longer show its essential columns, where a card grid drops below a usable card width — not at named device widths (375, 768, 1024). Designing to devices dates the layout the moment a new device ships; designing to content-break points keeps it durable.

**Stable dimensions** protect elements that must not resize on hover, load, or label change: reserve space for tables, charts, images (aspect-ratio), and toolbars so the surrounding layout does not reflow when their content arrives or updates. Layout shift during loading is a designed-out defect, not an inevitability.

**Reflow decisions** at each breakpoint specify what *collapses* (multi-column to single), *stacks* (side-by-side to vertical), *pins* (a toolbar/action bar stays reachable), *hides* (secondary detail behind disclosure), or *moves*. Across all of these, the primary task stays visible before supporting detail and the action/recovery order is preserved.

**State footprints** matter: the loading, empty, and error states of a region must occupy the same structural slot as the loaded state so the page does not jump between states, and responsive media must not overflow its container.

## Philosophy of the skill

Layout is the visible contract between task priority and available space. A surface that has the right content can still fail if primary information collapses below the fold, controls jump between states, or a desktop-only composition is squeezed into a narrow viewport.

Start from hierarchy, then choose structure. Do not design to named devices; design to the point where the content starts to break. A breakpoint tied to a device is a breakpoint that expires; a breakpoint tied to content is one that endures.

Stability is a feature. An element that holds its position through loading, hover, and label changes is doing invisible work — it keeps the user's spatial memory intact. Treat layout shift as a defect to design out, not an artifact to tolerate.

## Method

1. Read the primary, secondary, and supporting hierarchy from `task-analysis` or the route contract.
2. Identify fixed-format elements: tables, cards, charts, boards, media, toolbars, and forms.
3. Choose the scan pattern: single column, master-detail, sidebar/content, table-first, card grid, or step flow.
4. Define responsive breakpoints where content breaks, not where devices are marketed.
5. Set stable dimensions for elements that must not resize on hover, loading, or label changes.
6. Decide what collapses, stacks, pins, hides, or moves at each breakpoint.
7. Check mobile, tablet, desktop, low-data, loading, empty, and error states.

## Verification

- [ ] The primary task remains visible before supporting detail.
- [ ] Breakpoints are content-driven rather than device-name-driven.
- [ ] Fixed-format elements have stable dimensions or aspect ratios.
- [ ] Mobile and narrow layouts preserve action order and recovery paths.
- [ ] Loading, empty, and error states do not shift the core layout unpredictably.
- [ ] Responsive media cannot overflow its container.
- [ ] Accessibility landmarks, heading order, and focus order still match the visual order.

## Do NOT Use When

| Use instead | When |
|---|---|
| `task-analysis` | The user goal, top task, or first-viewport hierarchy is not yet known. |
| `information-architecture` | The problem is global navigation, sitemap shape, or page grouping. |
| `visual-design-foundations` | The task is color, typography, spacing taste, mood, or polish. |
| `design-system-architecture` | The task is token taxonomy, component API, theming, or system governance. |
| `a11y` | The primary question is WCAG, ARIA, keyboard behavior, labels, or assistive-tech output. |
