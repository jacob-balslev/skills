---
name: semiotics
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing or auditing icon systems, colors/badges/shapes, visual metaphors, interface signs, or naming-plus-visual surfaces that users misread. Covers semiotic reasoning across icon/index/symbol, signifier/signified, denotation/connotation/myth, color/shape/position/iconography, affordances, code/API signifiers, and semiotic-coherence audits. Do NOT use for actual UI wording (use `microcopy`), palette/typography craft (use `visual-design-foundations`), accessibility or contrast compliance (use `a11y`), formal class hierarchies, or word morphology rules."
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
  scope: "Designing and auditing icon systems, colors/badges/shapes, visual metaphors, interface signs, and naming-plus-visual surfaces that users misread — semiotic reasoning across icon/index/symbol, signifier/signified, denotation/connotation/myth, color/shape/position/iconography, affordances, code/API signifiers, and semiotic-coherence audits. Portable across any sign-bearing interface; principle-grounded, not repo-bound. Excludes actual UI wording (microcopy), palette/typography craft (visual-design-foundations), accessibility/contrast compliance (a11y), formal class hierarchies, and word morphology rules."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/semantics
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["sign-system analysis","icon polysemy","signifier signified mapping","denotation versus connotation","affordance signifier match","icon-index-symbol trichotomy","visual metaphor clarity","color connotation audit","cross-surface sign drift","semiotic coherence audit"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["semiotic audit","icon polysemy","signifier signified","denotation connotation","sign system"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["our dashboard uses green for both revenue increase and cost increase, so users read both as good — what semiotic failure is that and how should we correct it?","we use a gear icon for settings on one page and preferences on another — is this just a naming issue, or an interface sign conflict?","a disabled button still looks clickable because only the color changed — which signifier or affordance rule is failing?","we need an icon for reconciliation in a financial workflow — which metaphors are available, and when must text stay paired with the icon?","an API function is named processData() — from a sign-system perspective, what is wrong with that name?","audit this status-badge color system for denotation vs connotation conflicts","explain why users keep clicking a non-interactive label that looks like a link"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["I need formal class hierarchies, axioms, and what-exists rules for our knowledge base","I need physical database schema design and relationship constraints","I need the relation type between two concepts — synonymy, polysemy, or meronymy","draft the exact wording for a button label or tooltip after the sign system is chosen","give me the live color-token values, APCA contrast math, and palette enforcement","explain the morphology rule behind verb-first function names"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"linguistics\",\"a11y\",\"intent-recognition\",\"visual-design-foundations\",\"semantics\",\"semantic-relations\"],\"suppresses\":[{\"skill\":\"microcopy\",\"reason\":\"microcopy owns the actual UI wording (button labels, empty states, tooltips, dialogs); semiotics owns the sign-system reasoning that determines what the words and accompanying visual signs should communicate — the same 'fix this UI element' prompt routes by whether the trigger is the wording itself or the sign system the wording sits inside\"},{\"skill\":\"visual-design-foundations\",\"reason\":\"visual-design-foundations owns visual craft decisions such as palette, type, spacing, and hierarchy; semiotics owns what those signs communicate\"}],\"verify_with\":[\"a11y\",\"code-review\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Semiotics is the study of *sign systems* — how *signifiers* (perceivable forms: icons, colors, shapes, positions, words) point to *signifieds* (concepts, states, actions) via convention, resemblance, or causal connection. Applied to interfaces, it is the discipline of designing and auditing the *multi-channel sign systems* through which a product communicates with its users. It draws from Peirce's *icon/index/symbol* trichotomy (icon resembles, index causally connects, symbol arbitrarily conventions), Saussure's signifier/signified dyad, Barthes' three layers (denotation / connotation / myth), and Norman's affordance theory (real affordance / perceived affordance / signifier / anti-affordance). Visual semiotics treats *color as sign* (red = error/loss; green = success/growth — but never color alone, since color-blindness makes hue an unreliable sole channel; pair with icon, text, or shape) and *shape and position as sign channels* (top-left = primary; circle = status; triangle = direction; pill = category/state/count). Iconography is itself a sign system governed by consistency (same concept = same icon), metaphor clarity, pairing (abstract icons need text until learned), and family coherence; its common breakdowns are icon polysemy, opacity, cultural collision, and obsolete metaphor. The same lens extends to code and API signs — a vague name like `processData()` is a signifier failure even when the implementation works, because the reader must open the function to learn its meaning.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Semiotics replaces "design by aesthetic intuition" with explicit reasoning about *what each visual element communicates*. It solves the problem that every interface element is *already communicating*, whether the designer intended it to or not — a button that looks clickable but is disabled, a green badge that signals "good" when the metric is actually worsening, or a gear icon that means different things on different pages are not visual quirks; they are sign failures that erode user trust one micro-misread at a time. The core rule it enforces is that one signifier should point clearly to one intended signified within a given system context. The more a sign drifts, the more users (and agents reading the UI) are forced to infer meaning from guesswork rather than from the system itself, and sign drift compounds — a single ambiguous icon is a small cost; ten ambiguous icons across a product is learned distrust of the entire surface. The denotation/connotation distinction matters acutely in metric and financial UI: an *increase* (direction) is not always *good* (judgment), so a green up-arrow signaling "cost increased 30%" reads as positive even though the business meaning is negative.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT the actual UI wording (microcopy owns button labels, empty states, tooltips, and dialogs — semiotics owns the sign-system reasoning that determines what the words and accompanying visual signs should communicate). It is NOT the meaning encoding of a single textual identifier or signal (semantics owns function names, design tokens, HTTP status codes, branded types — semiotics owns the multi-channel sign system those identifiers sit inside). It is NOT typed connections between concepts such as IS-A or PART-OF (semantic-relations owns concept-to-concept relations — semiotics owns the signifier-to-signified mapping in interface and naming surfaces). It is NOT word-form rules (linguistics), accessibility/contrast compliance (a11y — semiotics may inform a11y but does not own its contracts), palette/typography/spacing craft (visual-design-foundations — semiotics asks what the visual element *signifies*), or formal class hierarchies and existence axioms (ontology modeling). It owns whether a sign communicates the right meaning; it does not own the words, the hex values, the contrast math, or the class model.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Semiotics is to interface design what choreography is to a play — the words are the script, but the actor's stance, hand position, gaze direction, and proximity to other actors are the choreography; a line lands flat with the wrong choreography and well with the right one, and a disabled button colored only slightly paler is a stage actor whispering an exit cue the audience cannot hear."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that *visual design is taste* and that sign-system audits are aesthetic preferences. They are not — every interface element is communicating something whether the designer intended it or not, and the question is whether the communication is intentional and coherent. Adjacent misconceptions: that *color alone can signal state* (it cannot — the never-color-alone rule is accessibility and clarity, not preference; a meaningful fraction of users cannot reliably distinguish hue, so pair color with icon, text, or shape); that *direction equals judgment* (it does not — an *increase* is direction, *good* is judgment, and a green up-arrow on a 30% cost rise conflates them); that *one icon means one thing universally* (icon polysemy is the most common UI sign failure — the gear means "settings" in one product, "preferences" in another, "build" in a third; either follow strong convention or pair with text); that *abstract marks gain meaning with exposure* (they sometimes do but require pairing-with-text until learned — the floppy-disk save icon was learned for decades and is now an obsolete metaphor users under a certain age do not recognize); that *disabled states need only a color change* (they need a strong anti-affordance, since greying alone is too subtle and combined with hover effects can read as "loading"); and that *code naming and visual signs are separate concerns* (they are not — `processData()` is a signifier failure for the same reason the gear icon's polysemy is: the sign forces inference rather than transferring meaning).
---
# Semiotics

## Concept of the skill

Semiotics is the discipline of designing and auditing the multi-channel sign systems through which an interface communicates with its users. Its primitives are *signifiers* (perceivable forms — icons, colors, shapes, positions, words, interaction cues) and *signifieds* (the concepts, states, actions, or judgments those forms point to), and its working vocabulary comes from four sources: Peirce's icon/index/symbol trichotomy (a sign resembles, causally connects to, or arbitrarily conventions its referent), Saussure's signifier/signified dyad, Barthes' denotation/connotation/myth layers, and Norman's affordance theory (real affordance, perceived affordance, signifier, anti-affordance). The skill applies these models across visual surfaces (color, shape, position, iconography) and textual/code surfaces (function names, API endpoints, error messages) under one governing rule: one signifier should point clearly to one intended signified within a given system context. Its central insight is that every interface element is *already* communicating whether the designer intended it to or not, so the job is to make that communication intentional and coherent rather than to leave it to aesthetic intuition. Sign drift — a gear icon that means different things on different pages, a green badge that connotes "good" while the metric worsens, a disabled button that still looks clickable — is not a cosmetic quirk; it is a sign failure that imposes inference cost on the reader and compounds into distrust of the whole surface.

## Coverage

Semiotic analysis as the study of sign systems in software interfaces and communication. Covers:

- **Foundational models** — Peirce's icon / index / symbol trichotomy; Saussure's signifier / signified dyad; Barthes' denotation / connotation / myth layers
- **Visual semiotics for interfaces** — color as sign (denotation + connotation, with the never-color-alone rule), shape and position as sign channels (top-left, top-right, bottom-right, circle, triangle, pill)
- **Iconography as a sign system** — consistency, metaphor clarity, pairing rules, system coherence; common breakdowns (icon polysemy, opacity, cultural collision, obsolete metaphor)
- **Affordance theory** — real affordance, perceived affordance, signifier, anti-affordance; the rule that disabled states need a strong anti-affordance
- **Code and API semiotics** — naming, variable, endpoint, and error-message signs; the rule that vague names like `processData()` are signifier failures even when the implementation works
- **Semiotic-coherence audit** — the checklist for reviewing a surface across color, icon, affordance, and cross-surface consistency

The skill operates *above* microcopy execution and color-token math, and *below* formal ontology. It owns the question "what does this sign communicate to a user?", not "what should the button say?", "what hex value is this?", or "what class hierarchy do these things belong to?".

## Philosophy of the skill

Every interface element is already communicating, whether the designer intended it to or not. Semiotics exists to make that communication explicit and coherent. A button that looks clickable but is disabled, a green badge that signals "good" when the metric is actually worsening, or a gear icon that means different things on different pages are not visual quirks; they are sign failures that erode user trust one micro-misread at a time.

The core rule is: **one signifier should point clearly to one intended signified within a given system context.** The more a sign drifts, the more users (and agents) are forced to infer meaning from guesswork rather than from the system itself. Sign drift compounds — a single ambiguous icon is a small cost; ten ambiguous icons across a product is a learned distrust of the entire surface.

This skill is sign *analysis*, not visual *craft*. It tells you whether a sign communicates the right meaning. It does not tell you how to lay out the screen, what hex value to use, what class hierarchy to formalize, or what wording to put on a button. Each of those belongs to a different skill in the design / language / data cluster.

## When to Use

- Designing or auditing icon systems
- Checking whether a color, badge, or shape communicates the wrong judgment
- Explaining why users misread a button, state, or symbol
- Choosing or critiquing visual metaphors for abstract concepts
- Auditing naming and interface signs together when a surface feels semantically off

---

## 1. Foundations — How Signs Work

### Peirce's Trichotomy

| Sign type | Relationship to meaning | UI example | Strength |
|-----------|------------------------|------------|----------|
| **Icon** | Resembles what it represents | Magnifying glass = search | Intuitive but culturally variable |
| **Index** | Causally connected to meaning | Loading spinner = something is happening | Direct but context-dependent |
| **Symbol** | Arbitrary convention | Red = danger, hamburger = menu | Efficient once learned |

Rules:

- Prefer icons for first-use discoverability.
- Prefer symbols for expert fluency when the convention is already learned.
- Use indexes when the system needs to signal that a process or state is actively occurring.

### Saussure's Dyad

| Component | Definition | Application |
|-----------|-----------|-------------|
| **Signifier** | The perceivable form | Color, shape, text, icon, animation |
| **Signified** | The concept or meaning | Action, state, category, judgment |

Rules:

- The same signifier should not point to multiple signifieds within one product surface unless that ambiguity is deliberate and documented.
- Changing the signifier can break learned meaning even if the redesign seems visually improved.

### Barthes' Three Layers

| Layer | What it is | Example |
|-------|-----------|---------|
| **Denotation** | Literal reading | Up arrow = increase |
| **Connotation** | Associated judgment / cultural meaning | Green = positive / good |
| **Myth** | Systemic or ideological framing | Growth as inherently desirable |

Rules:

- Separate direction from judgment in financial UI. An *increase* is not always *good*.
- A sign can be denotationally correct while still semantically wrong because the connotation misleads.

---

## 2. Visual Semiotics for Interfaces

### Color as Sign

| Color | Common denotation | Common connotation | Risk |
|-------|-------------------|--------------------|------|
| Red | Error, stop, danger | Bad, urgent, loss | Overuse dulls alarm meaning |
| Green | Success, active, up | Good, growth, healthy | Wrong when used for *undesirable* increases |
| Yellow / Amber | Warning, caution | Attention needed | Easily confused with error |
| Blue | Information, trust, link | Calm, corporate, neutral authority | Can become semantically empty if overused |
| Grey | Inactive, secondary, disabled | Neutral, quiet | May fail as an anti-affordance if too subtle |

Rules:

- Color should not be the *only* sign channel for important meaning.
- Audit color decisions at both denotation and connotation levels.
- Live token values, contrast compliance, and visual craft belong to `a11y` or `visual-design-foundations`; semiotics evaluates only whether the *sign* itself is coherent.

### Shape and Position as Sign

| Sign channel | Common reading |
|--------------|----------------|
| Top-left placement | Primary or first-scanned element |
| Top-right placement | Tools, account, utility actions |
| Bottom-right placement | Primary CTA in a dialog |
| Circle | Status, avatar, completion |
| Triangle / arrow | Direction, expansion, movement |
| Pill / badge | Category, state, count |

Rules:

- Position and shape carry meaning even without text; treat them as part of the sign system.
- If a layout or component breaks a strong convention, ensure the surrounding cues are strong enough to retrain the interpretation.

---

## 3. Iconography as a Sign System

| Principle | Rule |
|-----------|------|
| **Consistency** | Same concept = same icon across the product |
| **Metaphor clarity** | The metaphor should be legible without specialist training |
| **Pairing** | Abstract or unfamiliar icons need text pairing until learned |
| **System coherence** | Use one icon family unless there is a compelling reason not to |

Common breakdowns:

- **Icon polysemy** — one icon means several things
- **Opacity** — abstract mark with no clear signified
- **Cultural collision** — metaphor fails outside one audience's assumptions
- **Obsolete metaphor** — the convention is still learned by some but dead to others (e.g., the floppy-disk save icon)

---

## 4. Affordance Theory

| Concept | Application |
|---------|-------------|
| **Real affordance** | What the element can actually do |
| **Perceived affordance** | What the element appears to allow |
| **Signifier** | The cue that tells the user action is possible |
| **Anti-affordance** | The cue that tells the user action is *not* possible |

Rules:

- If an element looks interactive, it should be interactive.
- Disabled states need a strong anti-affordance, not just a mild color change.
- Semiotic failures most often appear when the signifier and the true affordance disagree.

---

## 5. Code and API Semiotics

Semiotics also applies to textual and code-facing signs.

| Sign surface | Semiotic question |
|--------------|-------------------|
| Function name | Does the signifier actually tell me what the behavior is? |
| Variable name | Does the label point clearly to the value's meaning? |
| API endpoint | Does the route name communicate the resource / action correctly? |
| Error message | Does it communicate both what happened and how to respond? |

**Rule**: a vague name like `processData()` is a signifier failure even when the implementation works. The reader has to *open the function* to learn its meaning — which is exactly the inference cost a good sign eliminates.

This overlaps with `semantics` (which owns identifier-level meaning encoding); semiotics adds the sign-system lens — *is the same concept signed consistently across both code names and visual interface elements?*

---

## 6. Semiotic-Coherence Audit

Use this checklist when reviewing a surface:

- Does each color carry one stable meaning across the product?
- Does each icon represent one intended concept?
- Do interactive elements look interactive?
- Do disabled states look unavailable rather than merely quiet?
- Are abstract concepts paired with enough textual support?
- Is the same concept being signed consistently across UI and code-facing surfaces?

---

## Verification

After applying this skill, verify:

- [ ] No signifier points to multiple unintended signifieds within the same system context
- [ ] Important interface meanings are not encoded through color alone
- [ ] Interactive and non-interactive states have distinct affordance signals
- [ ] Icon metaphors are coherent, learnable, and consistent across surfaces
- [ ] Direction (denotation) and judgment (connotation) are separated in financial / metric UI
- [ ] Code-facing signs (function, variable, endpoint names) are not vague signifier failures

## Do NOT Use When

| Instead, use | Why |
|---|---|
| `microcopy` | Drafting the actual button labels, empty states, tooltips, or toasts. Microcopy owns the wording; semiotics owns the sign system the wording lives inside. |
| `semantics` | Deciding the meaning encoding of a single identifier, design token, HTTP status code, or commit type. Semantics owns identifier-level meaning; semiotics owns the multi-channel sign system. |
| `semantic-relations` | Typing the connection between two concepts (IS-A, PART-OF, thematic, causal). Semantic-relations owns concept-to-concept relations; semiotics owns sign-to-meaning mappings. |
| `linguistics` | Word morphology, compound-word ordering, abbreviation policy. Linguistics owns word-form rules; semiotics owns broader sign systems including visual ones. |
| `a11y` | Auditing aria-label correctness, focus management, screen-reader semantics. A11y owns accessibility contracts; semiotics may inform them but does not own them. |
| `visual-design-foundations` | Palette, typography, spacing, hierarchy, craft quality, and motion feel. Visual-design-foundations owns visual craft; semiotics asks what the visual element *signifies*. |
| (an ontology skill) | Formal class hierarchies, existence axioms, reasoning constraints. Ontology owns formal classification; semiotics owns sign meaning in interfaces. |

## Key Sources

- Peirce, C. S. (1931-1958). *Collected Papers of Charles Sanders Peirce* (8 vols.). Harvard University Press. The original statement of the icon / index / symbol trichotomy; the foundational typology of sign-to-referent relations that all later interface-semiotics work builds on.
- Saussure, F. de (1916). *Cours de linguistique générale* / *Course in General Linguistics*. Payot. The signifier/signified dyad and the principle that meaning is constituted by systems of contrast — the structural foundation for sign-system analysis.
- Barthes, R. (1957). *Mythologies*. Éditions du Seuil. The three-layer denotation / connotation / myth analysis; the canonical demonstration that signs carry cultural and ideological meaning beyond literal reading.
- Eco, U. (1976). *A Theory of Semiotics*. Indiana University Press. The systematic treatment of semiotics as a discipline; cultural codes, sign-production, and the constructed-meaning principle.
- Norman, D. A. (2013). *The Design of Everyday Things* (Revised and Expanded Edition). Basic Books. The foundational text on affordances and signifiers for interface design; the discipline of matching visual cues to actual interaction possibilities.
- Gibson, J. J. (1979). *The Ecological Approach to Visual Perception*. Houghton Mifflin. The original psychological account of affordances — what the environment offers to a perceiver — that Norman adapted to design.
- Nielsen Norman Group. ["Icon Usability"](https://www.nngroup.com/articles/icon-usability/). Empirical UX research on icon polysemy, opacity, and the icon-plus-text pairing rule; the practitioner reference for icon-system design.
- W3C. [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) — Use of Color (Success Criterion 1.4.1). The international standard expression of the never-color-alone principle.
- Frutiger, A. (1989). *Signs and Symbols: Their Design and Meaning*. Watson-Guptill. The reference work on visual sign design from typography to pictograms; foundational for icon-system vocabulary work.
- Krug, S. (2014). *Don't Make Me Think, Revisited*. New Riders. The practitioner statement of the cognitive-cost principle in interface signs; the empirical observation that users do not read signs analytically — they pattern-match, and the sign system must support that.
