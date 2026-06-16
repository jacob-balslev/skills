---
name: frontend-architecture
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when organizing a frontend codebase: module boundaries, component layering, state ownership, data-flow direction, route/file colocation, public module APIs, and the separation between feature code and shared primitives. Do NOT use for visual design decisions, detailed React Server Component/read-path design, rendering-model selection, specific framework migration tactics, or backend API contract design."
# license: SPDX-compatible license identifier for the skill content.
license: CC-BY-4.0
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:

  # === v8 Classification (subject + public; polyhierarchy via subjects[]) - see ADR-0017 ===
  # subject: primary browse shelf - what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: frontend-engineering
  # public: publishability/private-data gate. Boolean.
  # true = publishable/shareable; false = private and excluded from public export.
  # Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
  public: true
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Organizing a frontend codebase: module boundaries, component layering, state ownership, data-flow direction, route/file colocation, public module APIs, and the separation between feature code and shared primitives. Portable across frontend stacks; principle-grounded, not repo-bound. Includes recognizing server/client runtime boundaries as a code-organization constraint, while handing detailed React Server Component read-path design, serialization mechanics, and rendering-model selection to sibling skills. Excludes visual design decisions, specific framework migration tactics, and backend API contract design."
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
  keywords: ["frontend architecture","component boundaries","module organization","state management shape","feature-sliced design","server client boundary","data flow direction","shared primitives","component layering","frontend folder structure"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["frontend architecture","component boundaries","folder structure","state shape","where should this code live","shared or feature-local"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Decide whether a new modal lives in shared UI or inside a feature folder","Reorganize a frontend that has presentational components, route files, and data-fetching components mixed together","Choose a state shape that does not force every consumer to re-render on unrelated changes","Define import rules so shared modules, feature slices, route files, and server/client files cannot reach across the wrong boundary"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Pick the brand color palette for a marketing site","Design the REST endpoint shape for the orders resource","Decide whether to use CSS-in-JS or Tailwind","Choose between SSR, SSG, ISR, CSR, RSC, or PPR for a route","Design the full data-fetching, caching, and Suspense plan for React Server Components"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive - A -> B -> C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"design-system-architecture\",\"design-module-composition\",\"refactor\",\"testing-strategy\",\"api-design\",\"state-management\",\"server-components-design\",\"client-server-boundary\",\"rendering-models\"],\"suppresses\":[{\"skill\":\"design-system-architecture\",\"reason\":\"design-system-architecture owns token layering, primitive component contracts, and library publishing; this skill owns the application-side consumption boundary: where design-system primitives may be imported, wrapped, connected to feature policy, and promoted or kept feature-local.\"}]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Frontend architecture is four decisions made deliberately rather than by accident: where code lives (folder, route, feature, and module structure), what may depend on what (allowed import direction and public module APIs), who owns mutable state (component-local, feature-scoped, server-cache-owned, or global client state), and which runtime boundary a file belongs to when the stack has both server and client modules. The folder tree is the surface; the real architecture is the import graph underneath it. Components stratify into primitives (no business knowledge, props-only: Button, Input, Stack), composed components (combine primitives with feature layout, still no fetching or mutation: OrderSummary, AddressForm), and connected or route-level components (own orchestration, data reads, mutation triggers, and routing registration). In React Server Components or similar split-runtime stacks, that connected layer has a server/client seam; frontend architecture records how that seam affects module placement and import rules, while server-components-design and client-server-boundary own the detailed read-path and serialization mechanics. Because `'use client'` marks a module and its transitive dependencies as client code, the directive belongs at intentional interactive entry points rather than broad page or layout roots that would drag unnecessary modules into the client side of the graph. State decisions span location, normalization, derivation, write ownership, and cache ownership. Server state is remote, cache-managed data; client state is ephemeral UI state. An import-direction rule ("shared/ may not import features/; feature A may not import feature B; route files orchestrate features but features do not import route files"), mechanically enforced at PR time, is what keeps the intended structure from degrading into a tangle within months.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without an explicit architecture, a frontend organizes itself by accident: code lands wherever the author happened to be, shared components quietly reach into feature stores creating back-edges, route files become dumping grounds for domain logic, server and client state get mixed into one store producing cache-invalidation bugs that masquerade as rendering bugs, and a single shortcut import becomes the team norm until the dependency graph is cyclic. Frontend architecture exists to make placement, dependency, and ownership decisions reproducible and checkable: a new developer can name where any piece of code lives quickly, a feature folder can be removed without touching code outside it except a registration point, and the structure is defended by a linter at PR time rather than by memory. It buys long-run changeability: the system stays cheap to modify as it grows from a few features to dozens.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT visual design (color, type, spacing, motion: visual-design-foundations / typography-system), NOT publishing or versioning a shared component library across multiple applications (design-system-architecture owns token layering, primitive component contracts, and library distribution; this skill owns the application-side organization that consumes those primitives), NOT choosing or migrating a specific framework (React to Solid, Webpack to Vite), NOT choosing the rendering model for a route (rendering-models), NOT full React Server Component read-path design, Suspense, data security, or caching (server-components-design), NOT the serialization and trust frontier of values crossing server/client (client-server-boundary), NOT the tactical choice of a state-update primitive or library (Redux vs Zustand - state-management owns state placement but excludes that tactical choice; it has no skill owner), NOT designing the API the frontend consumes (api-design / system-interface-contracts), and NOT a single reusable component's internal API or accessibility behavior (design-module-composition / interaction-patterns / a11y). It owns structure, dependency direction, public module contracts, state ownership, and placement rules; it does not own how anything looks, what the backend returns, or the full mechanics of a server/client framework.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Frontend architecture is to a codebase what zoning, public roads, and utility boundaries are to a city: it does not design any building facade or decide what factories produce, but it dictates which districts may connect to which, where public entrances are, which utilities cross district lines, and which roads are one-way so the city stays navigable as it grows."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "the folder structure is the architecture" - that a tidy, deeply categorized folder tree means the system is well-architected. It does not: a pretty tree with cyclic imports between features is architecturally worse than a flat folder with strict one-way dependencies, because the import graph, not the folder names, determines what can change independently. The corrected model: optimize the import graph for cohesion ("what changes together stays together") and colocation ("where would I look for this"), expose each slice through a small public API, enforce direction with a boundary linter, and treat any "shared" module that reaches into a feature-specific store as an architecture violation, not a convenience. The second common error is treating server state and client state as the same problem and putting both in one global store. The third is treating a route tree or framework file convention as the whole architecture; route folders are one organizing surface, not permission for feature code to import route internals or for route modules to absorb all domain logic.
---
# Frontend Architecture

## Concept of the skill

Frontend architecture is the discipline of deciding, on purpose, where code lives, what is allowed to depend on what, who owns mutable state, and how runtime boundaries are reflected in the module graph. Its central insight is that the folder tree you see is only the surface; the architecture that actually governs changeability is the import graph beneath it.

The skill works at four structural layers. **Module organization** chooses an organizing model - feature-sliced (`features/<feature>/{ui,model,api}`), layered (`components/`, `hooks/`, `services/`, `pages/`), domain-driven (`domains/<domain>/{ui,logic,data}`), route-colocated, or package/workspace-based - and accepts its trade-offs as the codebase scales. **Component layering** separates pure primitives, feature-composed components, and connected or route-level components, watching the composed-to-connected boundary where most dependency tangles begin. **State ownership** decides location, normalization, derivation, write ownership, and cache ownership for each piece of state, keeping remote server state separate from ephemeral client state. **Import-direction enforcement** turns the desired structure into a checkable rule: shared modules do not import features, features do not import sibling features, features do not import route files, and clients do not pull server-only modules into the browser.

This is not a folder-naming skill. The goal is an import graph that makes change cheap: feature code is cohesive and removable, shared primitives are truly feature-agnostic, route files are thin orchestration or registration points, state has one owner, and public module APIs prevent consumers from depending on internal file layout.

## Coverage

### Boundary Triage

Before reorganizing, classify the decision:

| Decision | Own here? | Rule |
|---|---:|---|
| Which feature, route, package, or shared layer owns this file? | Yes | Decide by volatility, ownership, and dependency direction. |
| Can this component move from a feature folder into `shared/`? | Yes | Promote only the data-free, feature-agnostic shell; keep connected behavior feature-local. |
| Which module may import which other module? | Yes | Encode as a lintable import rule, not a review preference. |
| Which state owner should write and invalidate this data? | Yes | Separate server cache ownership from UI/client ownership. |
| Should this route use SSR, SSG, ISR, CSR, RSC, or PPR? | No | Use rendering-models. |
| Where exactly should an RSC tree fetch, cache, stream, and pass DTOs? | No | Use server-components-design; this skill only records placement implications. |
| What values can cross server/client and what is trusted? | No | Use client-server-boundary. |
| What should the backend API contract look like? | No | Use api-design / system-interface-contracts. |

### Module Organization

The common organizing models each make a trade:

- **Feature-sliced:** code is grouped by user or domain capability, e.g. `features/orders/{ui,model,api}`. It maximizes removability and local reasoning. The risk is accidental feature-to-feature imports unless boundaries are enforced.
- **Layered:** code is grouped by technical kind, e.g. `components/`, `hooks/`, `services/`, `pages/`. It is easy at small scale and often degrades at large scale because one feature's logic is scattered across every layer.
- **Domain-driven:** code is grouped by durable business domain, e.g. `domains/billing/{ui,logic,data}`. It works when domain ownership is stable and teams need clear domain seams.
- **Route-colocated:** framework route folders colocate UI, loaders, actions, and tests near a URL segment (the metaframework default - Next.js App Router, Remix, SvelteKit). This improves locality but must not turn route files into giant connected components; route files should orchestrate feature modules and register routes, not become the only place domain logic can live. Route colocation and feature-slicing are not mutually exclusive: a common scaled shape keeps thin route entries (loader + page shell) in the route tree and imports the real UI and logic from `features/`.
- **Package/workspace-based:** larger products split vertical slices or shared libraries into packages. This gives stronger boundaries and build-time ownership, but costs more ceremony and versioning. At the far end this extends to micro-frontends / module federation, where boundaries become deployment boundaries across applications; that cross-application split is a heavier decision (independent deploys, runtime composition, versioned contracts between apps) than the single-application import graph this skill mostly targets - reach for it only when team and deploy independence, not just code organization, is the driver.

Feature-Sliced Design (FSD) is a formal version of the feature-sliced model. Its layer ladder - `app -> pages -> widgets -> features -> entities -> shared` - carries one load-bearing rule: code may import only from lower layers, never upward or sideways into another slice at the same layer. In FSD, **entities are business domain models** (e.g. `User`, `Product`, `Order`) - their types, domain logic, and the UI that represents the entity - while **features own user actions and the interaction/data-fetching that performs them**; do not mislabel entities as "data-fetching layers." Each slice should expose a **public API** (usually an `index` barrel) and consumers should import from that public entry, not from internal files. The public API rule matters as much as the folder names: without it, auto-imports and direct deep imports make refactors expensive because other features depend on internals.

Use the repo's existing model when it is coherent. Change models only when the current import graph proves the current model cannot support the next change.

### Shared Promotion Rule

Code starts feature-local by default. Promote it to shared only when all of these are true:

- It has at least two independent consumers, OR it fills a clear platform role (app shell, design-system bridge, cross-cutting logging/analytics wrapper, framework adapter) whose home is the platform layer regardless of current consumer count. The default honest trigger is the *second real consumer*, not a guess that "this might be reused"; the platform-role case is the deliberate single-consumer exception for code whose owner is genuinely the platform, not a loophole for promoting speculative feature code.
- Its props, names, imports, tests, and state do not mention a feature-specific domain.
- It receives behavior through props, callbacks, slots, or composition rather than reading a feature store or API directly.
- It can be moved or versioned without moving feature policy with it.

"Reusable" is not enough. Promoting too early produces a `shared/` full of single-consumer code coupled to one feature's assumptions (a pre-emptive back-edge); promoting too late produces a copy-paste fork. A billing-specific `CancelSubscriptionDialog` that calls a billing mutation belongs in `features/billing/`. If reuse is real, split it into a shared props-only `ConfirmDialog` shell plus a billing-owned connected wrapper that passes `onConfirm`. If promotion would require the candidate to import anything feature-specific, it is not shared yet - keep it local or refactor the feature coupling out first.

### Component Layering

Separate components by dependency and ownership, not by visual complexity:

| Layer | Owns | Must not |
|---|---|---|
| Primitive | Generic UI behavior and props-only rendering (`Button`, `Input`, `Stack`) | Know feature names, call feature hooks, fetch data, import stores. |
| Composed | Feature layout using primitives (`OrderSummary`, `AddressForm`) | Fetch/mutate data or reach into another feature. |
| Connected / route-level | Fetching, mutation triggers, routing, permissions, orchestration (`OrderDetailPage`) | Move into `shared/` merely because another feature wants similar UI. |

The composed-to-connected boundary is the most common source of dependency tangles. A "shared" composed component that quietly imports a feature store creates a back-edge that breaks the graph. Extract the data-free shell; keep the connected wrapper at the feature or route boundary.

In stacks with React Server Components or similar server/client module splits, the connected layer also has a runtime seam. The architecture concern here is not the full RSC data/caching design; it is that server-only modules, client-only modules, and route orchestration must have import rules. A route may render a client island or a server component; a client island must not import server-only code; shared primitives should stay server-renderable unless they genuinely need hooks, event handlers, refs, or browser APIs. The reason to push `'use client'` toward interactive leaves is mechanical: it marks the file as a client entry point and pulls the modules it imports, and their transitive dependencies, into the client side of the dependency tree. A broad page-level directive can turn otherwise server-renderable utilities and UI into client code by import reachability alone. The architectural shape this favors is a thin connected Server Component that fetches data and passes it into small Client Component islands - which inverts the old single-page-app default that every data-connected component is necessarily a client component. Load the server-components-design and client-server-boundary skills for the detailed boundary.

### State Shape

State shape decisions span five axes:

| Axis | Question | Healthy default |
|---|---|---|
| Location | Where does this state live? | As low as possible; lift only to the nearest common owner. |
| Normalization | Is the same entity duplicated? | Entity-keyed or ID-referenced state for shared entities; avoid nested copies. |
| Derivation | Can it be computed from existing state or props? | Compute at read/render time; do not store redundant derived values. |
| Write ownership | Who is allowed to change it? | One owner writes; consumers request changes through that owner. |
| Cache ownership | Is this remote server data or local UI state? | Remote data belongs to a server-data/cache layer; UI state belongs to component/context/store. |

React's own state guidance is architectural at scale: avoid contradictory state, redundant state, duplicated state, and deeply nested state. Those rules map directly to this skill's axes. A deeply nested dashboard object that every widget subscribes to will re-render unrelated widgets; normalize entities, select narrowly, and measure the representative interaction so the re-render path can be explained.

Server state (data fetched from an API or database, cache-managed, invalidated by remote writes) and client state (UI-only, ephemeral, local to interaction) are different problems. The load-bearing rule is **one cache/read owner per data source**: each remote resource is fetched, cached, deduplicated, and revalidated through a single mechanism, so exactly one place knows the data is stale. That owner is a framework server cache / RSC read path when the data is rendered on the server, or a client server-state library such as TanStack Query, SWR, or RTK Query when browser-side caching is appropriate. Note one trap when reaching for normalization here: RTK Query is a *document* cache keyed per query endpoint+args and deliberately does **not** normalize or de-duplicate entities across queries - two queries returning the same entity hold two independent copies. If you genuinely need a single normalized entity store shared across queries, that is the job of a normalized Redux slice (or a normalizing cache), not of RTK Query's built-in cache. Reserve global client stores such as Redux, Zustand, Jotai, or Context for genuinely cross-cutting UI state (theme, current user display state, route/session UI, feature flags), not as a hand-rolled server cache. Putting server data into that same global store - a second cache owner for one source - is the single most common cause of cache-invalidation bugs that present as rendering bugs.

React Compiler can reduce the need for manual `useMemo`, `useCallback`, and `React.memo`, but it does not fix broad state ownership, duplicated server data, or a store subscription that invalidates too much of the tree. Treat compiler optimization as performance assistance, not as an architecture substitute.

### Import Direction

Import direction enforces the architecture. Write rules in the shape of the repo, for example:

- `shared/` may not import from `features/`, `pages/`, `routes/`, or app-specific stores.
- A feature may import `shared/` and its own internals, but not a sibling feature's internals.
- Cross-feature coordination goes through a route/registration point, event contract, shared abstraction, or backend/API contract, not direct imports.
- Route files may orchestrate feature modules, but feature modules may not import route files.
- Public module APIs are the only allowed cross-slice entry points; direct imports from another slice's internal folders are violations.
- Client-marked modules may not import server-only modules; server-only modules should be guarded by framework conventions or guard imports where available.

Use an enforcer that matches the repo:

| Situation | Tooling fit |
|---|---|
| General JS/TS app, ESLint already authoritative | `eslint-plugin-boundaries` or equivalent import rules. |
| Need graph visualization, cycle detection, and non-ESLint reports | `dependency-cruiser`. |
| Nx workspace with project tags | `@nx/enforce-module-boundaries`. |
| TypeScript project needing lightweight modularity without a monorepo | Sheriff. |
| Feature-Sliced Design project | Steiger with FSD rules such as `fsd/forbidden-imports`. |

Without enforcement, the structure degrades within months: one shortcut import becomes normal, then the dependency graph goes cyclic and features can no longer be removed in isolation.

## Philosophy of the skill

The folder structure is not the architecture; the import graph is. A pretty folder tree with cyclic imports between features is architecturally worse than a flat folder with strict one-way dependencies. Optimize for "where would I look for this" and "what changes together stays together" over imposed taxonomy.

Code should become shared later than teams think. Premature shared code is often feature code wearing a generic name. Promote only the stable, data-free, feature-agnostic shell - or code whose owner is genuinely the platform; leave policy, fetching, mutations, and permissions near the feature that owns them.

Server state and client state are different problems. Mixing them in a single global store creates cache-invalidation bugs that look like rendering bugs. Use the same cache owner for fetching, caching, and revalidating server data; reserve global client state for genuinely cross-cutting UI concerns.

Boundaries are kept by machines, not intentions. Any architectural rule a human is expected to remember at review time will be broken under deadline. The rules that survive are the ones a linter, graph check, or package boundary makes cheaper to obey than to violate - architecture is the set of constraints you have made cheaper to obey than to violate.

## Verification

- An import-boundary linter or dependency graph check is configured and CI fails on violations; the linter config asserts the rules below, not just that some plugin is installed.
- The rules cover at least shared-to-feature, feature-to-feature, route-to-feature direction, public-API-only cross-slice imports, and client-to-server-only imports where the stack has split runtimes.
- Every feature folder can be removed without touching code outside it, except a single registration point such as a route table, feature flag map, app shell, or package export.
- A new developer can name where any given piece of code lives within thirty seconds of being told the feature name and the kind of thing (UI, model/state, data/read, mutation/write, route registration, test).
- Shared primitives contain no feature-specific names in props, tests, imports, or story examples; a grep for feature names in `shared/` returns nothing intentional.
- Cross-slice consumers import from public API barrels/entry points, not another slice's internal file paths; a grep for deep imports past a slice's `index` from outside that slice returns nothing.
- Server state is owned by one cache/read mechanism per data source; client code does not maintain several manual copies of the same remote entity - counting fetch call sites in client code returns roughly the number of distinct endpoints, not multiples per endpoint.
- Derived values are computed from source state rather than stored in parallel; duplicated or deeply nested state has an explicit reason.
- TypeScript type-only imports are marked `import type` so the enforced runtime import graph is not muddied by false-positive circularities from type references.
- Re-render counts on a representative interaction can be measured and explained; broad invalidation is traced to state ownership or subscription granularity, not patched with blind memoization.
- In React Server Components or similar stacks, `"use client"` sits at intentional interactive boundaries, not at broad page/layout roots by default; a grep for the directive does not land at the top of large files that contain no interactivity. Detailed RSC/security/cache review is delegated to server-components-design and client-server-boundary.
- Tests follow the layering: primitives tested in isolation, feature-composed components tested near the feature, connected/route components tested with mocked data or server-state layer, and no test reaches across feature internals directly.

## Do NOT Use When

- The decision is visual rather than structural: color, type, spacing, motion. Use visual-design-foundations, color-system-design, or typography-system.
- The work is publishing or versioning a shared component library across multiple applications. Use design-system-architecture.
- The problem is the public API of a reusable component module: compound components, slots, headless APIs, render props, polymorphic `as`/`asChild`, or accessibility wiring. Use design-module-composition and a11y as needed.
- The task is choosing or migrating a specific framework, styling tactic, or build tool. This skill can keep boundaries invariant across that choice, but it does not pick React vs Solid, Webpack vs Vite, or Tailwind vs CSS-in-JS.
- The task is choosing a rendering model such as SSR, SSG, ISR, CSR, RSC, streaming SSR, edge rendering, or PPR. Use rendering-models.
- The task is detailed React Server Component read-path design, Suspense placement, data security, DTO filtering, or cache/freshness planning. Use server-components-design.
- The problem is what values can cross the server/client boundary, what is serialized, what is trusted, or whether secrets/raw records leak into the client. Use client-server-boundary.
- The decision is where state lives, how it propagates, or URL-as-state across the app generally (state placement), or the tactical state-update mechanism (Redux vs Zustand). Use state-management for placement/propagation; tactical library choice is a non-architectural call this skill does not make.
- You are designing the backend API the frontend consumes. Use api-design or system-interface-contracts.
- The work is behavior-preserving restructuring of existing code with no new architecture decision. Use refactor, and verify with this skill only if module boundaries are the refactor target.
