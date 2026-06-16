---
name: design-module-composition
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing reusable component modules — composition patterns, compound components, slot/children APIs, render props, headless component contracts, and the choice between configuration and composition. Do NOT use for application-level architecture, single-use feature components, or visual styling decisions."
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
  scope: "Designing reusable component modules — composition patterns, compound components, slot/children APIs, render props, headless component contracts, and the configuration-vs-composition choice. Portable across any component-based UI; principle-grounded, not repo-bound. Excludes application-level architecture, single-use feature components, and visual styling decisions."
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["component composition","compound components","slot api","headless components","render props","polymorphic components","asChild pattern","children as api","composition over configuration","component contract design"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["component module composition","composition over configuration","headless component","slot pattern","asChild"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Design a Dialog component whose trigger, content, and close button are addressable by consumers","Refactor a Card with 14 boolean props into a composition-based API","Build a headless table primitive that exposes state and behavior without imposing markup"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Choose the border radius value for cards","Decide where the OrderDetailPage component lives in the folder structure","Pick the brand font for headings"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"design-system-architecture\",\"frontend-architecture\",\"interaction-patterns\",\"a11y\"],\"verify_with\":[\"a11y\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    A composable component module exposes its internal parts to consumers as a contract rather than hiding them behind configuration props. Four mainstream patterns realize this: compound components (a parent and named children share context — Tabs / Tabs.List / Tabs.Trigger / Tabs.Panel), slot/children APIs (named slots accept arbitrary content), render props / function-as-children (the parent provides state, the consumer provides markup), and headless primitives (state and behavior leave the module as hooks or unstyled components, all markup and styling delegated to the consumer). The real API of such a module is the shared context contract — what the parent provides and the children expect — so changing it is a breaking change even when the prop signatures stay identical. Choosing composition over configuration is a deliberate trade of common-case convenience for open-ended expressiveness.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Configuration-heavy components force the module author to anticipate every variant on behalf of every future consumer: each boolean prop is a decision baked in, and the variants the author did not foresee become friction or forks. Composition exists to externalize variation — slots and compound children defer the decision to the consumer, so a module accommodates unanticipated shapes without modification. Headless primitives go further, separating state, behavior, and presentation so a second visual treatment of the same behavior becomes trivial instead of a rewrite. The payoff is reusable modules that survive new requirements without the author touching them.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT application-level architecture (which features live in which folders, which app owns which screen — frontend-architecture), NOT the publishing/versioning of the shared library that hosts modules (design-system-architecture), NOT visual styling decisions (color, spacing, type — visual-design-foundations / layout-composition), NOT single-use feature components that will never be reused (reach for the simpler prop-driven shape), and NOT the accessibility criteria for a control pattern (a11y owns the criteria; this skill owns the API shape that must satisfy them). It owns how a reusable module exposes its parts; it does not own where modules live, how they ship, or how they look.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A composable module is to its consumers what a set of LEGO bricks is to a builder — the value is the standardized studs (the context contract and slots) that let anyone assemble shapes the kit's designer never imagined, rather than a single pre-glued model with a few painted-on options; freezing it into one configured shape is gluing the bricks together."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "composition just means adding more props so the component can do more," which treats expressiveness as a function of the configuration surface. The corrected model: every boolean prop is a decision the author imposes on every consumer, and the composable path is to expose parts (slots, compound children, headless state) so consumers assemble variants the author never anticipated. Adding props makes the common case faster but every unforeseen variant a fork; exposing composition reverses that trade. Composition is about deferring decisions, not multiplying them.
---
# Design Module Composition

## Concept of the skill

Design module composition is the discipline of shaping a reusable component's public API so that its variation is achieved by composing exposed parts rather than by configuring a growing set of props. A composable module externalizes its internals as a contract — most often through one of four mainstream patterns: **compound components** (a parent and a named set of children share context, like Tabs / Tabs.List / Tabs.Trigger / Tabs.Panel), **slot/children APIs** (named slots accept arbitrary content), **render props or function-as-children** (the parent supplies state and the consumer supplies markup), and **headless primitives** (state and behavior leave the module entirely as hooks or unstyled components, leaving all markup and styling to the consumer). The polymorphic "asChild"/"as" pattern lets a consumer swap the rendered element while inheriting behavior and ARIA wiring. The central design judgment is the trade between configuration and composition: a prop-heavy API is fast for the common case but brittle for unanticipated variants, while a composition API costs more typing up front and absorbs variants with no friction — which is why mature systems often offer both, a high-level summary component built on low-level composable primitives. The module's real API is the context contract between parent and children, not the prop signatures, so the discipline asks for every variation whether it belongs to the module's identity (make it a prop) or to how a specific consumer uses the module (make it a slot).

## Coverage
A composable component module exposes its parts to consumers rather than hiding them behind a configuration prop. The four mainstream patterns are compound components (a parent and a named set of children share context: <Tabs>, <Tabs.List>, <Tabs.Trigger>, <Tabs.Panel>), slot/children APIs (named slots accept arbitrary content: <Card header={...} footer={...} />), render props or function-as-children (the parent provides state, the consumer provides markup: <Tooltip>{({open}) => ...}</Tooltip>), and headless primitives (state and behavior are exposed as hooks or unstyled components — Radix, Headless UI, TanStack Table — leaving all markup and styling to the consumer).

The "asChild" or polymorphic pattern (Radix's term; also called "as" prop, "render" prop in some libraries) lets a consumer change the rendered element while inheriting all behavior: <Dialog.Trigger asChild><Button>Open</Button></Dialog.Trigger>. The pattern collapses two-level wrappers and avoids the "button inside button" accessibility error, but requires the parent to clone or render-prop its single child carefully.

Choosing between configuration and composition is a trade-off between control surface and expressiveness. A prop-heavy API (<Card title={} subtitle={} action={} variant={} />) is fast to consume for the common case and friction-heavy for variants the original author didn't anticipate. A composition API (<Card><Card.Header>...</Card.Header></Card>) reverses this: more typing for the common case, no friction for variants. Mature design systems often offer both: a high-level "summary" component that consumes the low-level composable primitives.

State sharing between compound-component pieces uses React context (or framework-equivalent). The context contract — what the parent provides, what the children expect — is the real API of the module, and changing it is a breaking change even when the prop signatures stay the same. Headless primitives push this further: state and behavior leave the module entirely, and the visual layer is the consumer's responsibility.

## Philosophy of the skill
Composition externalizes variation. Every boolean prop on a component is a decision the module author made on behalf of every future consumer; every slot is a decision deferred. The discipline is to ask whether the variant being added is part of the module's identity (it should be a prop) or part of how a specific consumer uses the module (it should be a slot).

Headless primitives separate three concerns that are routinely conflated: state (open/closed, selected, expanded), behavior (focus trapping, keyboard navigation, ARIA attribute wiring), and presentation (markup and styles). Conflation is convenient until the design system needs a second visual treatment of the same behavior; separation makes that addition trivial.

## Verification
- The component's primary variations are achievable by composing children rather than passing boolean props; a count of boolean props is in single digits.
- Compound-component children render outside the parent only with an explicit error (they require the parent's context).
- Slot props accept ReactNode (or framework equivalent) rather than typed sub-shapes; consumers can pass any valid element.
- Accessibility wiring (aria-controls, aria-expanded, focus return on dialog close) is the module's responsibility, not the consumer's, even when markup is delegated via asChild or headless patterns.
- Documentation shows the compositional pattern as the primary example, with prop-API shortcuts noted as conveniences.
- Replacing the rendered element type via asChild or polymorphic-as preserves all behavior and ARIA attributes.
- The module has at least one example of being composed into a non-obvious shape (a tabs control becoming a vertical sidebar) without modification.

## Do NOT Use When
- The component is single-use within one feature and will never be reused. Reach for the simpler prop-driven shape.
- The question is which features live in which folders or which application owns which screen. Use frontend-architecture.
- The decision is purely visual — color, spacing, type. Use visual-design-foundations or layout-composition.
- The work is configuring or publishing the shared library that hosts these modules. Use design-system-architecture.
- The concern is meeting specific accessibility criteria for a control pattern. Use a11y for the criteria; this skill for the API shape.
