---
name: vercel-composition-patterns
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when refactoring React components with boolean-prop proliferation, designing flexible component APIs, building reusable component libraries, or reviewing component architecture — compound components, explicit variant components, children-over-render-props, the context provider state/actions/meta interface, boolean state-explosion auditing, and the React 19 API migration (ref-as-prop, use() over useContext()). Do NOT use for render performance optimization (memoization, suspense, profiling), visual styling, or Next.js routing/server-component framework patterns."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
allowed-tools: Read Grep Bash
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
  scope: "React component composition patterns that prevent boolean-prop proliferation and scale a component API: compound components with shared context, explicit variant components over flag combinations, children-over-render-props, the provider state/actions/meta interface, boolean state-explosion auditing, and the React 19 API migration. Portable across any React codebase; principle-grounded, not repo-bound. Excludes render-performance optimization, visual styling, and Next.js framework-level routing/server-component patterns."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/frontend
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["composition pattern","compound component","boolean prop","render prop","react composition","context provider","state explosion","explicit variant","lifted state","react 19 api"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["compound component","this component has too many props","make this more composable","refactor with render props","component api design"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Refactor a Button with isPrimary, isLoading, isDisabled, isGhost, isIcon booleans into explicit variant components","Design a compound Tabs component where Tabs.List, Tabs.Tab, and Tabs.Panel share state through a context provider","Replace a renderHeader/renderFooter render-prop API with children composition"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Memoize this component tree to stop re-renders","Style this card with the brand spacing and color tokens","Set up the App Router route and a server component for this page"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"state-management\",\"rendering-models\",\"design-system-architecture\",\"refactor\"],\"verify_with\":[\"code-review\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    A scalable component API is a small, named set of valid states composed from primitives — not a flat bag of independent boolean flags. Every boolean prop added to a component doubles its state space, and most of those combined states are impossible, unsupported, or contradictory, so the real shape of the component is the *enumerated valid variants*, not the cartesian product of its flags. Composition replaces the flag bag with structure: a provider owns the canonical state, actions, and meta; subcomponents read that contract through context; and the consumer composes the pieces (compound children, explicit variants, children-over-render-props) instead of toggling behavior through props. The discipline is to audit the state explosion first — count reachable vs impossible states — and let that audit, not convenience, decide whether a prop is added or the API is recomposed.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without this discipline, agents and engineers take the fastest path on every change: add "just one more boolean." Each addition silently doubles the combinatorial state space and grows a fragile if/else rendering chain that breaks on edge-case flag combinations nobody tested. The result is components with five-plus booleans, impossible states that render garbage, and APIs that are impossible to extend without regressions. Composition patterns exist to make component APIs grow by adding *named structure* (variants, compound children, providers) rather than *flags*, so the state space stays enumerable, the valid configurations are explicit, and both humans and AI agents can reason about and extend the component safely as it scales.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT render-performance optimization — memoization, useMemo/useCallback tuning, suspense boundaries, and re-render profiling belong to a React performance skill. It is NOT visual design or styling — it shapes the component's API surface, not its appearance, spacing, or tokens. It is NOT Next.js framework architecture — routing, server components, and server actions are framework-level concerns owned elsewhere. It owns the shape of the component's prop/children/context contract and the refactor playbook that gets there; it does not own how fast the component renders, how it looks, or where it sits in a routing tree.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Composition patterns are to a component API what a power strip with labeled, purpose-built outlets is to a wall socket wired with a dozen toggle switches — instead of guessing which combination of switches produces a working configuration, you plug each named part into the contract it was built for, and the impossible combinations simply have no socket to plug into."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "more props means a more flexible component," which treats each boolean as a free, independent feature. The corrected model: each boolean is a multiplier on the state space, and most of the states it creates are invalid — so flexibility from flags is mostly *fragility*. Real flexibility comes from composition: explicit variants name the valid states, a provider centralizes the state, and children compose the structure. Adding a boolean is a cost (doubled state space, untested combinations, brittle conditionals), not a free win; when a component reaches three or more booleans, treat the API as broken until the state-explosion audit proves otherwise.
---
# React Composition Patterns

## Concept of the skill

This skill is the discipline of growing a React component's API by composition instead of by accumulating boolean flags. Its central move is the boolean state-explosion audit: before any prop is added, you count how many booleans a component already has, how many combined states that produces (2ⁿ), and how many of those combinations are impossible, unsupported, or contradictory — because the answer almost always reveals that the component's real shape is a small set of *named valid variants*, not the cartesian product of its flags. From that audit follow the patterns that scale: **compound components** (a family like `Tabs.List` / `Tabs.Tab` / `Tabs.Panel` that share state through a context provider rather than through prop drilling), **explicit variant components** (named modes instead of flag combinations), **children-over-render-props** (composing structure through `children` rather than `renderX` callbacks), and the **provider state/actions/meta interface** (one place owns the canonical state, the actions that mutate it, and the derived meta, decoupling consumers from how state is managed). The skill also carries the React 19 API migration — ref as a regular prop instead of `forwardRef`, and `use()` in place of `useContext()`. The throughline is restraint enforced by measurement: provider boundaries matter more than visual nesting, and a boolean prop is a cost to be justified against the audit, never a default reflex.

## Coverage

React component composition patterns that prevent boolean prop proliferation: compound components (shared-context child families), explicit variant components, children-over-render-props, the context provider state/actions/meta interface, the boolean state explosion audit, and the React 19 API migration (ref as a regular prop instead of `forwardRef`, `use()` over `useContext()`). Covers the refactor playbook from flag inventory through impossible-state deletion and variant extraction to provider-based composition.

The rule categories, in priority order:

| Priority | Category | Impact | Prefix |
| -------- | ----------------------- | ------ | --------------- |
| 1 | Component Architecture | HIGH | `architecture-` |
| 2 | State Management | MEDIUM | `state-` |
| 3 | Implementation Patterns | MEDIUM | `patterns-` |
| 4 | React 19 APIs | MEDIUM | `react19-` |

**1. Component Architecture (HIGH)**

- `architecture-avoid-boolean-props` — don't add boolean props to customize behavior; use composition.
- `architecture-compound-components` — structure complex components with shared context (a parent provides state; named children consume it).
- `architecture-boolean-state-audit` — count reachable vs impossible states before adding props.

**2. State Management (MEDIUM)**

- `state-decouple-implementation` — the provider is the only place that knows how state is managed.
- `state-context-interface` — define a generic interface with `state`, `actions`, and `meta` for dependency injection.
- `state-lift-state` — move state into provider components so siblings can access it without prop drilling.

**3. Implementation Patterns (MEDIUM)**

- `patterns-explicit-variants` — create explicit variant components instead of boolean modes.
- `patterns-children-over-render-props` — use `children` for composition instead of `renderX` props.

**4. React 19 APIs (MEDIUM)**

> **⚠️ React 19+ only.** Skip this section on React 18 or earlier.

- `react19-no-forwardref` — don't use `forwardRef`; pass `ref` as a regular prop, and use `use()` instead of `useContext()`.

### Boolean State Explosion Audit

Before adding a new prop or mode, answer:

1. How many booleans does this component already have?
2. How many combined states does that create (2ⁿ)?
3. Which of those states are impossible, unsupported, or nonsensical?
4. Can the valid states be named as explicit variants instead?

If a boolean produces impossible combinations, stop and refactor the API.

### Refactor Playbook

1. Inventory flags and modes.
2. Enumerate valid combinations.
3. Delete impossible states.
4. Name the remaining variants explicitly.
5. Extract a provider that owns `state`, `actions`, and `meta`.
6. Compose subcomponents around that contract.
7. Add one example or test per valid variant.

## Philosophy of the skill

Boolean props are technical debt that compounds exponentially. Every boolean added to a component doubles the state space, and most of those combined states are impossible or unsupported. Agents default to adding "just one more boolean" because it is the fastest path — this skill forces the discipline of auditing the state explosion first. Without it, agents regularly create components with five-plus booleans and fragile if/else rendering chains that break on edge-case combinations.

Composition is the antidote: build flexible, maintainable React components by using compound components, lifting state, and composing internals rather than toggling behavior through flags. Provider boundaries matter more than visual nesting — the provider owns `state`, `actions`, and `meta`, and consumers compose around that contract. These patterns make codebases easier for both humans and AI agents to work with as they scale, because the valid configurations stay explicit and enumerable instead of hiding inside a cartesian product of flags.

The core mandate is short and strict:

- Never add boolean props to customize behavior.
- If a component accumulates three or more booleans, treat the API as broken until proven otherwise by the state-explosion audit.
- Provider boundaries matter more than visual nesting; the provider owns state, actions, and meta.

## Verification

After applying this skill, verify:

- No component has 3+ boolean props without an explicit variant refactor.
- State is lifted into a context provider, not drilled through props.
- Compound components use `children` composition, not `renderX` props.
- React 19 code passes `ref` as a regular prop and uses `use()` instead of `useContext()`.
- Impossible state combinations are documented and eliminated (the audit's "delete impossible states" step is reflected in the code).
- Each valid variant has at least one example or test, so the enumerated states are exercised rather than assumed.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| React render-performance optimization (memoization, suspense, re-render profiling) | `react-best-practices` | The performance skill owns rendering optimization; this skill owns API shape, not render speed. |
| Visual component design and styling | a design/UI skill (e.g. `design-system-architecture`) | This skill covers the component's API surface, not its visual appearance, spacing, or tokens. |
| Next.js routing and server components | a Next.js framework skill | The framework skill owns routing and server-component patterns; this skill is React-composition-level, framework-agnostic. |
| A general behavior-preserving structural cleanup with no specific composition target | `refactor` | `refactor` owns generic restructuring; reach for this skill when the target API shape is specifically a composition pattern. |
