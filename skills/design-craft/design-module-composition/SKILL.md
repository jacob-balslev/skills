---
name: design-module-composition
description: "Use when designing reusable component modules — composition patterns, compound components, slot/children APIs, render props, headless component contracts, and the choice between configuration and composition. Do NOT use for application-level architecture, single-use feature components, or visual styling decisions."
license: CC-BY-4.0
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"


  # === v8 Classification (subject + deployment_target; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: design-craft
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Designing reusable component modules — composition patterns, compound components, slot/children APIs, render props, headless component contracts, and the configuration-vs-composition choice. Portable across any component-based UI; principle-grounded, not repo-bound. Excludes application-level architecture, single-use feature components, and visual styling decisions."
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-12"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-12\"}"

  # === Evaluation Status: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: planned
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  eval_state: unverified
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  routing_eval: absent
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"component composition\",\"compound components\",\"slot api\",\"headless components\",\"render props\",\"polymorphic components\",\"asChild pattern\",\"children as api\",\"composition over configuration\",\"component contract design\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"compound component\",\"composition over configuration\",\"headless component\",\"slot pattern\",\"asChild\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Design a Dialog component whose trigger, content, and close button are addressable by consumers\",\"Refactor a Card with 14 boolean props into a composition-based API\",\"Build a headless table primitive that exposes state and behavior without imposing markup\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Choose the border radius value for cards\",\"Decide where the OrderDetailPage component lives in the folder structure\",\"Pick the brand font for headings\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"design-system-architecture\",\"frontend-architecture\",\"interaction-patterns\",\"a11y\"],\"boundary\":[{\"skill\":\"frontend-architecture\",\"reason\":\"frontend-architecture covers application-level organization; this skill covers the internal API of a reusable module that the application composes.\"},{\"skill\":\"a11y\",\"reason\":\"Composition choices affect accessibility (focus management, ARIA wiring); when the question is whether a pattern meets WCAG requirements, hand off to a11y.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/design-module-composition/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: PASS
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: PASS
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
  last_audited: 2026-05-28
  lint_verdict: PASS
---

# Design Module Composition

## Coverage
A composable component module exposes its parts to consumers rather than hiding them behind a configuration prop. The four mainstream patterns are compound components (a parent and a named set of children share context: <Tabs>, <Tabs.List>, <Tabs.Trigger>, <Tabs.Panel>), slot/children APIs (named slots accept arbitrary content: <Card header={...} footer={...} />), render props or function-as-children (the parent provides state, the consumer provides markup: <Tooltip>{({open}) => ...}</Tooltip>), and headless primitives (state and behavior are exposed as hooks or unstyled components — Radix, Headless UI, TanStack Table — leaving all markup and styling to the consumer).

The "asChild" or polymorphic pattern (Radix's term; also called "as" prop, "render" prop in some libraries) lets a consumer change the rendered element while inheriting all behavior: <Dialog.Trigger asChild><Button>Open</Button></Dialog.Trigger>. The pattern collapses two-level wrappers and avoids the "button inside button" accessibility error, but requires the parent to clone or render-prop its single child carefully.

Choosing between configuration and composition is a trade-off between control surface and expressiveness. A prop-heavy API (<Card title={} subtitle={} action={} variant={} />) is fast to consume for the common case and friction-heavy for variants the original author didn't anticipate. A composition API (<Card><Card.Header>...</Card.Header></Card>) reverses this: more typing for the common case, no friction for variants. Mature design systems often offer both: a high-level "summary" component that consumes the low-level composable primitives.

State sharing between compound-component pieces uses React context (or framework-equivalent). The context contract — what the parent provides, what the children expect — is the real API of the module, and changing it is a breaking change even when the prop signatures stay the same. Headless primitives push this further: state and behavior leave the module entirely, and the visual layer is the consumer's responsibility.

## Philosophy
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
