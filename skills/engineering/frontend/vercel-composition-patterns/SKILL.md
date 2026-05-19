---
name: vercel-composition-patterns
description: "Use when refactoring React or Next.js component APIs for composition: boolean prop proliferation, prop soup, impossible state combinations, compound components, children/slot APIs, provider-backed subcomponents, lifted shared state inside a component family, render-prop trade-offs, and React 19 ref-as-prop migration. Covers small client wrappers around server-rendered children in Next/Vercel-style apps. Do NOT use for route rendering model selection (use rendering-models), client/server serialization and secret boundaries (use client-server-boundary), app-wide state placement (use state-management), reusable multi-product component library architecture (use component-architecture), visual styling, or performance optimization."
license: MIT
compatibility:
  notes: "Portable React composition guidance for modern React and Next.js applications. Substitute local component names, UI primitives, router conventions, and framework version constraints. React 19 ref-as-prop guidance requires project support; React 18 libraries may still need forwardRef."
allowed-tools: Read Grep Bash
grounding:
  domain_object: "React component API composition for prop-heavy components, compound components, provider-backed component families, and Next.js server/client composition"
  grounding_mode: "universal"
  truth_sources:
    - https://react.dev/learn/passing-props-to-a-component
    - https://react.dev/learn/sharing-state-between-components
    - https://react.dev/learn/passing-data-deeply-with-context
    - https://react.dev/reference/react/forwardRef
    - https://react.dev/reference/react/use
    - https://nextjs.org/docs/app/getting-started/server-and-client-components
    - https://vercel.com/academy/nextjs-foundations/component-composition-patterns
  failure_modes:
    - boolean_prop_state_space_explodes
    - prop_soup_hides_impossible_combinations
    - compound_subcomponents_cannot_share_state_safely
    - provider_boundary_follows_visual_nesting_instead_of_state_ownership
    - server_component_content_forced_through_serialized_client_props
    - react19_guidance_overstates_forwardref_or_usecontext_migration
    - render_prop_used_where_children_or_compound_api_is_clearer
    - context_used_when_simple_children_composition_would_suffice
  evidence_priority: "primary_docs_first"
drift_check:
  last_verified: "2026-05-19"
metadata:
  schema_version: 6
  version: "1.3.0"
  type: capability
  category: engineering
  domain: engineering/frontend
  scope: portable
  owner: skill-graph-maintainer
  freshness: "2026-05-19"
  drift_check: '{"last_verified":"2026-05-19"}'
  eval_artifacts: planned
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: experimental
  keywords: '["react composition","component composition","vercel composition patterns","nextjs composition patterns","compound component","boolean prop","prop soup","render prop","children prop","slot api","provider component","context provider","state explosion","component API design","ref as prop","forwardRef migration","use context conditionally","server component children","client wrapper","compound API","component family"]'
  triggers: '["this component has too many props","too many boolean props","make this component more composable","refactor prop soup","design a compound component","component API design","children slot pattern","server component children inside a client component","should this be render props or children","React 19 forwardRef migration"]'
  examples: '["refactor a dialog with showTitle/showFooter/showCloseButton props into DialogRoot, DialogTrigger, DialogContent, DialogTitle, and DialogActions","this component has four booleans and the valid combinations are hard to reason about","design a Tabs compound component with shared selected state and accessible subcomponents","wrap a small interactive client component around server-rendered children in a Next.js App Router page","migrate an internal React 19 component from forwardRef to ref as a prop while preserving React 18 library compatibility boundaries","replace renderHeader/renderFooter props with children or named slots when the structure should be user-composed"]'
  anti_examples: '["should this route use SSR, SSG, RSC, ISR, or partial prerendering","can this function cross from a Server Component to a Client Component","where should this app-wide state live: URL, server state, global store, or local state","design the whole reusable design-system component architecture for multiple products","optimize this component with memo or useCallback","pick colors, spacing, motion, or visual styling for the component","audit keyboard focus and ARIA mechanics only"]'
  relations: '{"boundary":[{"skill":"rendering-models","reason":"rendering-models owns when and where a route is produced (SSR, SSG, RSC, streaming, PPR). vercel-composition-patterns owns component API shape after the rendering model is known."},{"skill":"client-server-boundary","reason":"client-server-boundary owns serialization, trust, directives, and secret leakage across server/client execution. vercel-composition-patterns owns the composition pattern that can place a small client wrapper around server-rendered children without deciding what values may cross."},{"skill":"state-management","reason":"state-management owns app-wide state location and ownership. vercel-composition-patterns owns component-family state sharing for compound APIs and provider-backed subcomponents."},{"skill":"component-architecture","reason":"component-architecture owns reusable multi-product component library layering and public API governance. vercel-composition-patterns is the tactical React/Next composition pattern set for prop-heavy component refactors."},{"skill":"performance-engineering","reason":"performance-engineering owns profiling, memoization, bundle analysis, and runtime optimization. vercel-composition-patterns may reduce client boundaries but does not claim performance wins without measurement."},{"skill":"a11y","reason":"a11y owns focus management, ARIA, keyboard behavior, and screen-reader verification. vercel-composition-patterns requires accessible subcomponent contracts and then verifies with a11y."}],"related":["component-architecture","state-management","client-server-boundary","rendering-models","frontend-architecture","design-system-architecture","a11y","performance-engineering"],"verify_with":["a11y","code-review","client-server-boundary"]}'
  grounding: '{"domain_object":"React component API composition for prop-heavy components, compound components, provider-backed component families, and Next.js server/client composition","grounding_mode":"universal","truth_sources":["https://react.dev/learn/passing-props-to-a-component","https://react.dev/learn/sharing-state-between-components","https://react.dev/learn/passing-data-deeply-with-context","https://react.dev/reference/react/forwardRef","https://react.dev/reference/react/use","https://nextjs.org/docs/app/getting-started/server-and-client-components","https://vercel.com/academy/nextjs-foundations/component-composition-patterns"],"failure_modes":["boolean_prop_state_space_explodes","prop_soup_hides_impossible_combinations","compound_subcomponents_cannot_share_state_safely","provider_boundary_follows_visual_nesting_instead_of_state_ownership","server_component_content_forced_through_serialized_client_props","react19_guidance_overstates_forwardref_or_usecontext_migration","render_prop_used_where_children_or_compound_api_is_clearer","context_used_when_simple_children_composition_would_suffice"],"evidence_priority":"primary_docs_first"}'
  portability: '{"readiness":"scripted","targets":["skill-md"]}'
  lifecycle: '{"stale_after_days":180,"review_cadence":"quarterly"}'
  mental_model: |
    A component API is a small language. Boolean props create hidden grammar rules; compound components, children slots, and provider contracts make the valid sentences visible. The goal is not fewer props at all costs, but an API whose legal states are named, composable, and hard to misuse.
  purpose: |
    This skill prevents prop-heavy React components from growing by accretion. It gives agents a decision procedure for replacing flag combinations with explicit variants, children composition, compound subcomponents, and small client wrappers that preserve server-rendered content where Next.js supports it.
  boundary: |
    This skill owns React/Next component composition patterns. It does not own route rendering-model selection, server/client serialization rules, app-wide state placement, design-system governance, visual craft, performance optimization, or accessibility mechanics beyond requiring handoff verification.
  analogy: "Component composition is grammar for UI code: props are words, valid combinations are sentences, and compound components expose the structure that prop soup hides."
  misconception: "The common mistake is treating every new variation as one more boolean. Three independent booleans already create eight states, and most product components only support a few of them."
  concept: '{"definition":"React component composition is the discipline of shaping component APIs so variation is expressed through named variants, children/slots, compound subcomponents, provider-backed state, or render functions instead of uncontrolled flag accumulation.","mental_model":"Treat the component API as a language whose valid states should be visible in the call site and representable without impossible combinations.","purpose":"It keeps React and Next.js components reusable, legible, and compatible with server/client composition constraints as they grow.","boundary":"It does not decide route rendering models, boundary serialization, global state placement, design-system governance, visual styling, performance optimization, or accessibility mechanics.","taxonomy":"Patterns: explicit variants, children composition, named slots, compound components, provider contract, render props, ref-as-prop, small client wrapper. Risks: boolean explosion, prop soup, impossible states, overused context, over-broad client boundary.","analogy":"It is grammar for UI code: the call site should show the sentence structure instead of hiding it behind flags.","misconception":"Composition is not anti-prop; it is anti-impossible-state and anti-unbounded configuration."}'
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/engineering/frontend/vercel-composition-patterns/SKILL.md
---

# Vercel Composition Patterns

## Coverage

Use this skill for React and Next.js component API composition: boolean prop proliferation, prop soup, impossible state combinations, explicit variants, compound components, children and slot APIs, provider-backed subcomponents, render-prop trade-offs, lifted state inside a component family, and React 19 ref-as-prop migration.

The skill is tactical. It answers: what should this component API look like so future variations compose without adding another flag? It does not answer whether a route should be server-rendered, what values may cross a client/server boundary, where app-wide state belongs, or how an entire multi-product design system should be governed.

## Philosophy

Boolean props look cheap because the first one is cheap. The cost arrives as state-space growth. One boolean creates two states, three booleans create eight, and five create thirty-two. Most real components support only a small subset of those combinations, so the rest become untested behavior, nested conditionals, and unclear call sites.

Composition is the discipline of naming the valid structure. If there are only three valid modes, expose three named variants. If consumers need to rearrange parts, expose subcomponents or slots. If subcomponents need shared state, put the state in a provider that owns the contract. If server-rendered content should appear inside an interactive shell, keep the shell as the smallest client wrapper and pass server content through `children` or another slot.

The goal is not to ban props. Props are React's ordinary component interface. The goal is to keep props from becoming an unbounded configuration language whose legal combinations live only in the component author's memory.

## Grounding

This skill is grounded in current public React and Next/Vercel behavior:

- React documents props as the way parent and child components communicate, and documents `children` as the flexible channel for nested JSX.
- React's state guidance says each unique piece of state should have a single owner, and shared state should be lifted to a common parent instead of duplicated.
- React context guidance says context is useful for distant consumers but easy to overuse; passing props and extracting components with `children` should be considered first.
- React 19 documentation says `forwardRef` is no longer necessary and `ref` can be passed as a prop, while `forwardRef` remains part of the API for current compatibility.
- React's `use` API can read context in conditionals and loops, but it does not make `useContext` universally obsolete.
- Next.js App Router documentation supports interleaving Server and Client Components by passing Server Components as props such as `children` to Client Components; props passed to Client Components still need to be serializable by React.
- Vercel Academy's component-composition guidance frames compound components as the remedy for prop-heavy components and emphasizes small client wrappers, accessibility verification, stable public APIs, and server-rendered children.

Use these as constraints. Local projects may prefer different UI primitives, export styles, state libraries, or React versions, but the component API should make legal composition obvious and should not invent framework behavior that the current docs do not support.

## Boolean State Explosion Audit

Before adding a boolean prop, run this audit:

1. Count the existing boolean props that affect rendering or behavior.
2. Compute the state space: `2 ** boolean_count`.
3. List the valid combinations users actually need.
4. Mark impossible, unsupported, redundant, and dangerous combinations.
5. Ask whether the valid combinations are better expressed as named variants, subcomponents, or slots.
6. Add tests or examples for each valid combination that remains.

Treat three or more behavior booleans as a design smell. The answer is not always a refactor, but the burden of proof flips: the component API must show why independent flags are safer than named structure.

## Pattern Selection

| Problem shape | Prefer | Why |
|---|---|---|
| A closed set of mutually exclusive modes | Explicit variants or separate components | Illegal combinations disappear from the type/API surface. |
| Optional regions that consumers arrange differently | `children`, named slots, or subcomponents | Structure is expressed at the call site instead of hidden behind props. |
| Multi-part component with shared state | Compound components plus a provider | Subcomponents coordinate without every prop being threaded manually. |
| A small interactive shell needs server-rendered content | Small Client Component wrapper with server content passed as `children` | Keeps the client boundary narrow while allowing server content inside the shell. |
| Consumer needs to customize rendering with internal state | Render prop or hook, used deliberately | Still valid when the consumer truly needs state to decide rendering. |
| Mostly visual wrapper around arbitrary content | `children` composition | Avoids forwarding unrelated props through layers that do not use them. |
| One internal element must expose a DOM ref in React 19 app code | `ref` prop | Matches React 19 guidance when project support is confirmed. |
| Library must support React 18 consumers | `forwardRef` compatibility path | React 18 still needs the established forwarding API. |

### Explicit Variants

Use explicit variants when modes are mutually exclusive and named in the product language.

~~~tsx
// Avoid: valid states are implicit and combinations can conflict.
<Notice isWarning isCompact showIcon={false} />

// Prefer: the valid mode is named.
<Notice variant="warning" density="compact" icon="none" />
~~~

Enums can still combine badly. If two enums create many unsupported pairs, split the component or move to compound composition.

### Compound Components

Use compound components when a component has multiple named parts that need shared state or coordination.

~~~tsx
<TabsRoot value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsPanel value="overview">...</TabsPanel>
  <TabsPanel value="activity">...</TabsPanel>
</TabsRoot>
~~~

A compound API should document:

- Which component owns state.
- Which subcomponents must be descendants of the provider.
- Whether the API is controlled, uncontrolled, or hybrid.
- What each subcomponent may render.
- What accessibility relationship must be preserved by implementation.
- Whether server-rendered children are allowed inside the interactive shell.

### Provider Contract

Provider boundaries should follow state ownership, not visual nesting. A useful provider exposes a small contract:

~~~ts
type ComponentContextValue = {
  state: {
    open: boolean
    selectedValue: string | null
  }
  actions: {
    setOpen(open: boolean): void
    select(value: string): void
  }
  meta: {
    disabled: boolean
    ids: Record<string, string>
  }
}
~~~

The provider is the only place that knows how state is stored. Subcomponents read the contract and render their part. If a subcomponent can work without the provider, document the fallback; otherwise fail loudly with a clear error when it is used outside the provider.

### Children Before Context

Do not reach for context simply because a prop travels through several levels. React's own guidance says to consider passing props explicitly and extracting components with `children` first. If intermediate components do not use the data, a children/slot refactor often removes the prop tunnel without adding a global tree dependency.

Use context when distant descendants genuinely need the same information or actions from different parts of the subtree. Keep context values stable and narrow; a large frequently changing context value can turn composition into a re-render problem.

### Render Props

Render props are still valid when the consumer needs internal state to decide what to render.

Use render props when:

- The consumer needs values produced inside the component.
- The output shape is too open-ended for named slots.
- The function boundary makes data dependencies clearer than context.

Avoid render props when plain children, named slots, or compound subcomponents express the structure more directly. A component with `renderHeader`, `renderFooter`, `renderItem`, and `renderEmpty` may be asking to become a compound API.

## Next.js Server And Client Composition

In Next.js App Router, default to the smallest client boundary that owns interactivity. Let server components fetch and render server-owned content, then pass that content into a client wrapper as `children` or another slot when the framework supports it.

~~~tsx
// Client wrapper owns only interactivity.
'use client'

export function ModalShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return open ? <div role="dialog">{children}</div> : null
}
~~~

~~~tsx
// Server component can provide server-rendered content through children.
export default async function Page() {
  const details = await loadDetails()
  return (
    <ModalShell>
      <ServerRenderedDetails details={details} />
    </ModalShell>
  )
}
~~~

Do not use this pattern to bypass boundary rules. Values passed to Client Components still need to be serializable by React, and server-only code must stay out of the client bundle. For those questions, use `client-server-boundary`.

## React 19 Notes

React 19 changes the ref ergonomics for component APIs: app components can accept `ref` as a regular prop instead of requiring `forwardRef`. Treat that as a migration opportunity, not a blanket rewrite rule.

Use this guidance:

- For React 19 app code, prefer `ref` as a prop when the project version and tooling support it.
- For React 18 consumers or published libraries that must support React 18, keep the `forwardRef` compatibility path.
- Do not claim that `use()` replaces `useContext()` universally. `use(context)` can be called in conditionals and loops; `useContext` remains the straightforward hook for ordinary context reads.
- Do not combine a React 19 migration with an API-shape refactor unless both changes are small and independently verified.

## Refactor Playbook

1. Inventory the current props, grouped by behavior, structure, styling, and data.
2. Run the boolean state explosion audit.
3. Name the valid states in product language.
4. Choose a pattern: explicit variants, children/slots, compound API, provider contract, render prop, or small client wrapper.
5. Sketch the desired call site before changing internals.
6. Decide controlled, uncontrolled, or hybrid state ownership.
7. Move shared component-family state into the smallest provider that owns it.
8. Keep visual customization separate from behavior customization.
9. Preserve accessibility contracts while moving structure; verify with `a11y`.
10. Add examples or tests for each valid mode and at least one forbidden combination if the type system cannot prevent it.

## Review Checklist

- [ ] The call site shows the component's real structure instead of hiding it behind unrelated booleans.
- [ ] Three or more behavior booleans have been audited for state explosion.
- [ ] Impossible combinations are removed, typed away, or explicitly guarded.
- [ ] Valid modes are named as variants, subcomponents, or slots.
- [ ] Shared state has a single owner and is not duplicated between sibling subcomponents.
- [ ] Provider boundaries follow state ownership, not visual layout convenience.
- [ ] Context is used only after props or `children` extraction would not solve the problem cleanly.
- [ ] Render props are used only when consumers need internal state to render.
- [ ] Next.js client wrappers are as small as possible and do not pull server-only code into the client bundle.
- [ ] React 19 ref-as-prop migration is version-gated and does not falsely deprecate `useContext`.
- [ ] Accessibility relationships, focus behavior, and keyboard support are verified with `a11y`.
- [ ] Performance claims are measured or left to `performance-engineering`.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Choosing SSR, SSG, RSC, streaming, ISR, or PPR for a route | `rendering-models` | Rendering model is a route production decision, not a component API decision. |
| Deciding what can cross between Server and Client Components | `client-server-boundary` | Boundary serialization, trust, directives, and leakage rules are separate from composition shape. |
| Deciding where app-wide state belongs | `state-management` | This skill only owns component-family state used by a composition pattern. |
| Designing a reusable multi-product component library architecture | `component-architecture` | Component-architecture owns layer, public API governance, headless/styled split, and multi-product reuse. |
| Profiling render performance or adding memoization | `performance-engineering` | Composition may reduce complexity, but performance must be measured. |
| Visual styling, density, typography, color, or motion | Visual/design skills | This skill shapes API structure, not visual treatment. |
| Accessibility-only verification | `a11y` | This skill requires accessible contracts but does not replace focused a11y testing. |

## Verification

After applying this skill, verify:

- [ ] The skill or code change names the component API problem being solved.
- [ ] Boolean prop additions include a state-space audit or are rejected.
- [ ] The selected pattern matches the problem shape in the pattern table.
- [ ] Server/client composition claims are checked against current Next.js behavior.
- [ ] React 19 ref and `use(context)` guidance is version-gated and not overstated.
- [ ] Neighbor-skill boundaries are respected: `rendering-models`, `client-server-boundary`, `state-management`, `component-architecture`, `performance-engineering`, and `a11y`.
- [ ] Public examples contain no private repository paths, customer data, credentials, or local-only tool assumptions.
- [ ] Eval state remains unverified unless a real public Skill Graph eval run has been executed and recorded.
