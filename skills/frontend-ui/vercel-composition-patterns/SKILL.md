---
name: vercel-composition-patterns
description: "This skill provides React composition patterns that scale — compound components, render props, context providers, lifted state, and React 19 API changes. It applies when refactoring components with boolean prop proliferation, designing flexible component APIs, building reusable libraries, or reviewing component architecture — triggered by phrases like \\\"this component has too many props,\\\" \\\"design a compound component,\\\" \\\"make this more composable,\\\" \\\"refactor with render props,\\\" or \\\"component API design.\\\" Do NOT use for performance optimization — use react-best-practices instead."
license: MIT
compatibility:
  notes: "Markdown, Git, agent-skill runtimes"
allowed-tools: Read Grep Bash
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
  subject: frontend-ui
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/frontend
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-03-28"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-03-28\"}"

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
  keywords: "[\"composition pattern\",\"compound component\",\"boolean prop\",\"render prop\",\"react composition\",\"context provider\",\"state explosion\",\"variant component\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"vercel-composition-patterns-skill\",\"react-composition-patterns-skill\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"refactor\"],\"verify_with\":[\"code-review\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":90,\"review_cadence\":\"quarterly\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/vercel-composition-patterns/SKILL.md
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
# React Composition Patterns

## Domain Context

**What is this skill?** This skill provides React composition patterns that scale — compound components, render props, context providers, lifted state, and React 19 API changes. It applies when refactoring components with boolean prop proliferation, designing flexible component APIs, building reusable libraries, or reviewing component architecture — triggered by phrases like "this component has too many props," "design a compound component," "make this more composable," "refactor with render props," or "component API design." Do NOT use for performance optimization — use react-best-practices instead.
## Key Files



| File | Purpose |
|---|---|
| `skills/vercel-composition-patterns/PATTERNS.md` | Full composition guide with the canonical examples and decision rules this skill summarizes. |
| `skills/vercel-composition-patterns/AGENTS.md` | Repo-local entry guidance for when to use composition patterns and how to choose among them. |
| `skills/vercel-composition-patterns/rules/architecture-avoid-boolean-props.md` | Core rule for replacing boolean-prop APIs with composable structures. |
| `skills/vercel-composition-patterns/rules/architecture-compound-components.md` | Compound component pattern guidance for shared-context component families. |
| `skills/vercel-composition-patterns/rules/state-context-interface.md` | Provider contract pattern for exposing `state`, `actions`, and `meta`. |
| `skills/vercel-composition-patterns/rules/patterns-explicit-variants.md` | Explicit variant pattern for named component modes instead of flag combinations. |

## Coverage

React component composition patterns that prevent boolean prop proliferation: compound components (shared context children), explicit variant components, children-over-render-props, context provider state/actions/meta interface, boolean state explosion audit, and the React 19 API migration (no forwardRef, use() over useContext()). Covers the refactor playbook from flag inventory through variant extraction to provider-based composition.

## Philosophy

Boolean props are technical debt that compounds exponentially. Every boolean added to a component doubles the state space, and most of those combined states are impossible or unsupported. Agents default to adding "just one more boolean" because it is the fastest path -- this skill forces the discipline of auditing the state explosion first. Without it, agents regularly create components with 5+ booleans and fragile if/else rendering chains that break on edge-case combinations.

Composition patterns for building flexible, maintainable React components. Avoid
boolean prop proliferation by using compound components, lifting state, and
composing internals. These patterns make codebases easier for both humans and AI
agents to work with as they scale.

## Core Mandate

- Never add boolean props to customize behavior.
- If a component accumulates 3 or more booleans, treat the API as broken until proven otherwise.
- Provider boundaries matter more than visual nesting; the provider owns state, actions, and meta.

## When to Apply

Reference these guidelines when:

- Refactoring components with many boolean props
- Building reusable component libraries
- Designing flexible component APIs
- Reviewing component architecture
- Working with compound components or context providers

## Rule Categories by Priority

| Priority | Category                | Impact | Prefix          |
| -------- | ----------------------- | ------ | --------------- |
| 1        | Component Architecture  | HIGH   | `architecture-` |
| 2        | State Management        | MEDIUM | `state-`        |
| 3        | Implementation Patterns | MEDIUM | `patterns-`     |
| 4        | React 19 APIs           | MEDIUM | `react19-`      |

## Quick Reference

### 1. Component Architecture (HIGH)

- `architecture-avoid-boolean-props` - Don't add boolean props to customize
  behavior; use composition
- `architecture-compound-components` - Structure complex components with shared
  context
- `architecture-boolean-state-audit` - Count reachable vs impossible states before adding props

### 2. State Management (MEDIUM)

- `state-decouple-implementation` - Provider is the only place that knows how
  state is managed
- `state-context-interface` - Define generic interface with state, actions, meta
  for dependency injection
- `state-lift-state` - Move state into provider components for sibling access

### 3. Implementation Patterns (MEDIUM)

- `patterns-explicit-variants` - Create explicit variant components instead of
  boolean modes
- `patterns-children-over-render-props` - Use children for composition instead
  of renderX props

### 4. React 19 APIs (MEDIUM)

> **⚠️ React 19+ only.** Skip this section if using React 18 or earlier.

- `react19-no-forwardref` - Don't use `forwardRef`; use `use()` instead of `useContext()`

## How to Use

### Boolean State Explosion Audit

Before adding a new prop or mode, answer:

1. How many booleans does this component already have?
2. How many combined states does that create?
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

Read individual rule files for detailed explanations and code examples:

```
rules/architecture-avoid-boolean-props.md
rules/state-context-interface.md
```

Each rule file contains:

- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## Verification

After applying this skill, verify:
- [ ] No component has 3+ boolean props without an explicit variant refactor
- [ ] State is lifted into a context provider, not drilled through props
- [ ] Compound components use children composition, not renderX props
- [ ] React 19 code uses ref as regular prop and use() instead of useContext()
- [ ] Impossible state combinations are documented and eliminated

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| React performance optimization (memoization, suspense) | `react-best-practices` | Performance skill owns rendering optimization |
| Visual component design and styling | `visual-design` or `ux-ui-patterns` | This skill covers API shape, not visual appearance |
| Next.js routing and server components | `next-best-practices` | Next.js skill owns framework-level patterns |

## Full Compiled Document

For the complete guide with all rules expanded: `AGENTS.md`
