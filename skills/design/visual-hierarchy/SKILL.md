---
name: visual-hierarchy
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when establishing visual hierarchy — type scale ratios, spacing rhythm, contrast as ordering signal, weight and size as importance, and the layered relationship between primary, secondary, and tertiary information. Do NOT use for content writing, information architecture, or specific color palette construction."
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
  scope: "Establishing visual hierarchy — type-scale ratios, spacing rhythm, contrast as an ordering signal, weight and size as importance cues, and the layered relationship between primary, secondary, and tertiary information. Portable across any visual interface; principle-grounded, not repo-bound. Excludes content writing, information architecture, and specific color-palette construction (color-system-design)."
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["visual hierarchy","hierarchical type sizing","proximity hierarchy","contrast hierarchy","importance ordering","reading order","focal point","figure ground","gestalt principles","hierarchy through weight"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["visual hierarchy","type as hierarchy","what should the eye go to first","establishing focus","attention hierarchy"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Decide the H1/H2/H3 size ratios and weight contrast for a long-form article layout","Reduce visual noise on a dashboard where every element competes for attention","Establish a clear primary call-to-action on a page with multiple secondary actions"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Write the H1 copy that should appear at the top of the landing page","Choose between sans-serif and serif typefaces for the brand","Pick the brand's primary color"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"typography-system\",\"color-system-design\",\"layout-composition\",\"visual-design-foundations\"],\"suppresses\":[{\"skill\":\"typography-system\",\"reason\":\"typography-system defines the scale and the typefaces; this skill decides how to deploy them as hierarchy signals on a given surface.\"},{\"skill\":\"layout-composition\",\"reason\":\"layout-composition handles grid, alignment, and spatial structure; this skill handles the prioritization within a layout.\"}]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Visual hierarchy is an ordering of perceptual prominence built from a small set of competing signals: scale (larger before smaller), weight (heavier before lighter), contrast (higher against the background before lower), color (saturated/warm before desaturated/cool), position (the reading-order entry point and isolated centered elements), and isolation (whitespace around an element raises its prominence). These signals stack — and can conflict. Hierarchy is produced not by amplifying the important element but by suppressing everything else, so the few loud elements can be heard against many quiet ones. The reliable test is perceptual, not structural: squint at the surface and confirm the eye lands first / second / third in the intended order, independent of markup or source order.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without a deliberate hierarchy, every element competes for attention at the same volume, producing a flat, noisy surface where nothing reads as important and the reader does not know where to look. Hierarchy exists to direct attention: to make the primary action, the headline, and the key datum register before the secondary and tertiary information, so a reader extracts the page's intent before reading a single word. It turns "make this look good" into a deciding mechanism — when two elements compete, increase the difference along one signal rather than incrementing many slightly — so layouts stay legible as content grows.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT the copy itself (the words being ordered), NOT information architecture (how a site's navigation and content taxonomy are structured), NOT the type scale and typeface definitions (typography-system owns the scale and the faces; this skill deploys them as ordering signals on a surface), NOT grid/alignment/column composition (layout-composition), NOT brand color-palette construction (color-system-design), and NOT WCAG contrast-ratio compliance (a11y owns the threshold; this skill owns the design intent). It owns the prioritization of attention within a given layout; it does not own what gets laid out or which tokens exist.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Visual hierarchy is to a page what dynamics and mixing are to a piece of music — it does not choose the instruments (the typefaces) or write the notes (the copy); it decides what plays loud and what plays quiet so the listener's ear is led to the melody first and the accompaniment second."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "make the important thing stand out by making it bigger and bolder," applied element by element until everything is large and bold and the surface is flat noise. The corrected model: hierarchy is what you suppress, not what you amplify — most elements stay quiet so a few can be loud, and prominence is relative, not absolute. A second trap is treating reading order as a property of the markup; the eye follows visual cues (size, contrast, isolation, position) regardless of source order, so hierarchy must be verified by what is noticed first, not by what comes first in the DOM.
---
# Visual Hierarchy

## Concept of the skill

Visual hierarchy is the discipline of ordering perceptual prominence on a surface so a reader's eye is led to what matters first, second, and third — before they read a single word. It works through a small, stackable set of signals: **scale** (larger draws attention before smaller), **weight** (heavier strokes before lighter), **contrast** (higher against the background before lower), **color** (saturated and warm before desaturated and cool), **position** (the reading-order entry point in the reader's culture, plus isolated centered elements that break flow), and **isolation** (whitespace around an element raises its prominence regardless of its intrinsic properties). The central insight is that hierarchy is produced by suppression, not amplification: most elements must be quiet so the few that need to be loud can be heard. When two elements compete, the move is to increase their difference along *one* signal rather than to increment many signals slightly, because loud-against-loud exhausts the reader while one loud element against many quiet ones directs them. Because the eye follows visual cues rather than source order, a hierarchy is correct only when it survives the perceptual test — squint at the surface, or render it in grayscale, and confirm the intended element is the first noticed.

## Coverage
Visual hierarchy is the ordering of perceptual prominence that tells a reader what to look at first, second, and third. The available signals are scale (larger draws attention before smaller), weight (heavier strokes draw attention before lighter), contrast (higher contrast against the background reads before lower), color (saturated and warm colors read before desaturated and cool), position (top-left in left-to-right reading cultures reads first; centered isolated elements break flow and draw focus), and isolation (whitespace around an element increases its prominence regardless of its intrinsic properties).

Type scale operationalizes scale as hierarchy. Modular scales — pairs of values related by a ratio (1.125 major second, 1.2 minor third, 1.25 major third, 1.333 perfect fourth, 1.414 augmented fourth, 1.5 perfect fifth, 1.618 golden ratio) — produce step sizes that feel intentional. The ratio chosen determines the perceptual distance between levels: a 1.125 ratio gives subtle hierarchy useful for content-dense interfaces; a 1.5 ratio gives loud hierarchy useful for marketing surfaces. Most production systems use 5–7 type sizes; more sizes dilute hierarchy by giving the reader too many similar steps.

Spacing creates hierarchy through proximity (Gestalt's law of proximity — items closer together read as grouped, items further apart read as separate) and through breathing room (an element with more whitespace around it reads as more important). Vertical rhythm — a consistent baseline grid that spacing values snap to — reinforces grouping without explicit dividers and makes the page feel calmer because the eye finds predictable resting points.

Contrast as ordering is more general than color contrast. Two equal-sized headlines can be ordered by weight (bold reads before regular), by color (filled black reads before mid-gray), or by treatment (underlined or boxed reads before plain). The principle: when two elements compete for attention, increase the difference along one dimension rather than incrementing many dimensions slightly. Loud-loud combinations exhaust the reader; one loud against many quiet directs them.

## Philosophy of the skill
Hierarchy is what you suppress, not what you amplify. Making one thing important by making everything else louder produces a flat, noisy surface where nothing is important. The discipline is restraint: most elements should be quiet so the few that need to be loud can be heard.

Reading order is a property of the page, not just the markup. CSS source order, visual size, color contrast, and position all participate. When they disagree — a giant pull quote in the middle of an article, an overlay button that contrasts more than the page title — the reader's eye follows the visual cues regardless of the writer's intent. Verify hierarchy by asking what someone notices first, second, and third without reading.

## Verification
- Squinting at the surface (or rendering it at low resolution) reveals an unambiguous order of attention; the intended first element is the first noticed.
- Type scale uses at most 7 sizes; each level differs from its neighbor enough to register as different at a glance.
- Whitespace around a primary element is larger than whitespace around its neighbors, not equal to them.
- A grayscale screenshot retains the intended hierarchy; if hierarchy collapses without color, the design is over-reliant on hue.
- Primary calls to action appear at most once per view; if two CTAs are present, one is visibly secondary in weight or fill.
- Adjacent elements at the same hierarchy level share scale, weight, and color treatment; deviations are deliberate and signal a meaningful difference.
- Reading the page aloud in the order the eye lands on elements matches the order intended by the content.

## Do NOT Use When
- The task is writing the copy itself rather than ordering it visually. Hierarchy without good copy emphasizes the wrong things.
- You are deciding how to structure a site's navigation or content taxonomy. That is information architecture, not visual hierarchy.
- The decision is which typeface to use or which color the brand should adopt. Use typography-system or color-system-design.
- The concern is grid structure, alignment, or column composition. Use layout-composition.
- The accessibility question is contrast ratios for WCAG compliance. Use a11y for the threshold; this skill for the design intent.
