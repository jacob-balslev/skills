---
schema_version: 7
name: skill-scaffold
description: "This skill guides agents in creating, structuring, and maintaining skills using a shared base schema, behavior-based archetypes, and optional section packs. Use when creating a new skill, deciding whether to extend versus create, rewriting a skill template, or aligning skill sales-hub/docs/tooling with the canonical authoring contract. Do NOT use for routine domain-content improvements to an existing skill when the structure itself is not in question."
type: workflow
version: 3.1.0
category: agent
primaryCategory: Agent System
scope: codebase
workspace_tags: [skill-graph, agent-orchestration]
stability: stable
triggers:
  - self-evolution-skill
  - skill-writer
  - skill-creation-skill
keywords:
  - create skill
  - new skill
  - skill template
  - skill scaffold
  - skill archetype
  - skill section pack
  - skill structure
  - skill frontmatter
  - skill eval
  - skill taxonomy
owner: claude
freshness: "2026-04-03"
eval_artifacts: present
eval_state: unverified
routing_eval: absent
drift_check:
  last_verified: "2026-05-20"
  truth_source_hashes:
    "skills/skill-scaffold/references/templates-and-examples.md": "d745a2ee085d10fbb8987f6c079493cd33c1f09f594977810002b36741499240"
    "skills/_meta/REGISTRY.md": "9c3860f613ae320bb75f5ef09aefc241fb49120773bf2fb6155e6de2a5c9ae4b"
    "docs/guides/skill-family-classification.md": "ef722bdd2233295b6294b562fee53c279175b55b8d1f81cbcb6a4e5dd75e5ff8"
grounding:
  domain_object: Skill authoring contract
  grounding_mode: repo_specific
  truth_sources:
    - skills/skill-scaffold/references/templates-and-examples.md
    - skills/_meta/REGISTRY.md
    - docs/guides/skill-family-classification.md
  failure_modes:
    - template_schema_change
    - archetype_taxonomy_change
    - registry_pattern_change
    - family_classification_drift
  evidence_priority: repo_code_first
relations:
  related:
    - skill-infrastructure
    - categorization
  boundary:
    - ai-coding-agents
    - doc-updater
  verify_with:
    - skill-infrastructure
    - editorial-standards
lint_verdict: PASS
drift_status: OK
last_audited: 2026-05-20
structural_verdict: PASS
truth_verdict: PASS
comprehension_verdict: UNVERIFIED
application_verdict: UNVERIFIED
---

# Skill Scaffold

## Domain Context

**What is this skill?** This skill guides agents in creating, structuring, and maintaining skills using a shared base schema, behavior-based archetypes, and optional section packs. Use when creating a new skill, deciding whether to extend versus create, rewriting a skill template, or aligning skill sales-hub/docs/tooling with the canonical authoring contract. Do NOT use for routine domain-content improvements to an existing skill when the structure itself is not in question.

## Key Files

| File | Purpose |
|---|---|
| `skills/skill-scaffold/references/templates-and-examples.md` | Referenced implementation file |
| `skills/_meta/REGISTRY.md` | Before creating a new skill, search `SKILL-INDEX.md` and . If an existing skill covers most of the need, extend it instead. |
| `docs/guides/skill-family-classification.md` | Use the canonical family list from for new work. Prefer: |
| `skills/skill-scaffold/evals/evals.json` | Every active skill needs . |
## Workflow

Use the ordered phases, checklists, and guardrails in the sections below as the canonical workflow for this skill. When multiple subsections describe steps, follow them in the order presented.

## Coverage

This skill defines the canonical authoring contract for the Development repo skill system: when a skill is warranted, how to choose a behavior-based archetype, how to use family as a browse taxonomy instead of a template driver, which frontmatter fields are core versus optional, when to use section packs, how to scope project-local overlays, what belongs in `SKILL.md` versus `references/`, and what eval coverage a new skill needs before it should be considered complete.

## Philosophy

The repo's main skill-system problem is no longer missing taxonomy. It is drift between guidance, tooling, and the live corpus. Agents were being taught a family-driven template model even though the real distinctions in the skill tree are behavioral: some skills teach domain capability, some enforce workflows, some route to other skills, and some add project-local rules. This skill exists to make that distinction explicit and to keep future skills from inheriting stale structure.

## Cross-Domain Synergy

- `skill-infrastructure` validates whether the authoring contract is being followed in tooling and inventory health.
- `categorization` helps when the family or browse grouping is ambiguous.
- `documentation` and `editorial-standards` ensure the resulting skill reads clearly and lands in the right layer of the doc system.

## 1. Decision Gate

Create or extend a skill only when at least one of these is true.

| Criterion | Test | Example |
| --- | --- | --- |
| Repetition | the same 3+ step sequence appears repeatedly | migration safety protocol |
| Complexity | repo-specific context would bloat ordinary prompts | Shopify Basic-plan constraints |
| Protocol | missing a process causes repeated failure | wrap gate, doc-update flow |

Do not create a skill for:

- one-off work that belongs in Linear
- always-on repo rules that belong in `AGENTS.md`, `CLAUDE.md`, or repo rule files
- generic knowledge the model already has natively

Before creating a new skill, search `SKILL-INDEX.md` and `skills/_meta/REGISTRY.md`. If an existing skill covers most of the need, extend it instead.

### 1.1 Name collision protocol

If `skills/<intended-name>/` already exists, do NOT overwrite. Pick the path based on the difference between your skill and the existing one:

| Situation | Action |
| --- | --- |
| The existing skill covers your subject (same primitives, same purpose) | EXTEND it: add a new section, new key file, new eval case. No new directory. |
| The existing skill is the same shape but a stale fork left mid-migration | UPDATE the existing skill in place; commit the rename/cleanup as one diff. |
| Your skill genuinely teaches a different mechanism (e.g., `database-pooling` connection pools vs `database-migration` schema versioning) | DIFFERENTIATE the name (`<scope>-<mechanism>` or `<system>-<aspect>`) and create the new directory. Update the existing skill's `relations.related` (or `relations.boundary` if the topics are confusable) to point at yours. |
| You believe the existing skill should be deleted | STOP and ask. Deletion of a workspace skill is a corpus change, not an authoring decision. |

### 1.2 Authoring defaults when the docs do not specify

When the canonical authoring path leaves a judgment call open, these are the defaults:

| Decision | Default | When to override |
|---|---|---|
| `scope` | `portable` for cross-repo concepts; `codebase` for repo-specific (requires `grounding`); `reference` for vendor/standard docs | Pick `codebase` whenever the skill cites a specific file path, table, or function in this repo. |
| `category` (primary) | The category whose audience reads the skill most often | Use `quality` only for cross-cutting properties (a11y, perf, security, testing); never as a default. |
| `domain` | Omit unless the library is large enough that a slash-delimited path adds discovery value | Add `<category>/<sub>` when ≥3 sibling skills share the same primary `category`. |
| `grounding` (required when `scope: codebase`) | List the 2-3 files whose content the skill's claims depend on; pick `evidence_priority: repo_code_first`. | For external API-grounded skills (Stripe, Shopify), add the vendor URL as a truth source with `evidence_priority: external_first`. |
| Eval defaults | `eval_artifacts: planned`, `eval_state: unverified`, `routing_eval: absent`. Author at least 7 realistic scenarios with negative expectations before flipping any to `present`/`passing`. | Never flip to `passing` without an `eval_last_run` receipt in the same commit (see `.claude/rules/version-schema-contract.md`). |
| Health Block (Loop-owned) | Leave all four verdicts at `UNVERIFIED`; the audit Loop stamps them. Never hand-author `application_verdict: APPLICABLE`. | Single-model self-assessment records `PROVISIONAL` (with a scorecard.md receipt), never `APPLICABLE`. |
| Flat Understanding fields vs body `## Concept Card` | Author the five flat fields (`mental_model`, `purpose`, `boundary`, `analogy`, `misconception`) in frontmatter when `comprehension_state: present`. The body `## Concept Card` is the human-readable rich form and is optional; when both exist they MUST agree. | A skill teaching a multi-part subject can author both; otherwise stick to flat fields. |

## 2. Archetype First

Choose the structure from behavior, not family.

| Archetype | Purpose | Typical signals |
| --- | --- | --- |
| `capability` | teaches domain rules, patterns, and repo-specific judgment | `type: capability` or `hybrid` |
| `workflow` | enforces a sequence, checklist, or quality gate | `type: workflow`, `routingRole: verifier`, `gate`, or `universal` |
| `router` | directs work to the correct specialist skill | `routingRole: router`, `family: umbrella` |
| `overlay` | adds project-local truth or extends a broader skill | `scope: overlay`, `routingRole: overlay`, true local-extension behavior |

If the archetype is unclear, prefer `capability` unless the skill is obviously a router or gate.

## 3. Family Second

`family` is a browse and clustering facet.

It helps with discovery, overlap analysis, and reporting. It does not decide the whole body template.

Use the canonical family list from `docs/guides/skill-family-classification.md` for new work. Prefer:

- `overlay`
- `agent-ops`
- `agent-cognition`
- `agent-models`
- `knowledge`
- `skill-system`
- `display`
- `doctrine`
- `workflow`
- `framework`
- `integration`
- `security`
- `data`
- `umbrella`

Legacy aliases such as `agent`, `page`, and `Doctrine` remain parseable for compatibility but should not be used for newly authored skills.

## 4. Base Frontmatter Contract

### Core fields

These fields should exist on all active skills that claim `schema_version: 7`.

| Field | Why it matters |
| --- | --- |
| `schema_version` | shape contract for validators and migration tools |
| `name` | stable identifier |
| `description` | routing contract |
| `version` | lifecycle tracking |
| `type` | broad structural kind |
| `category` | primary protocol browse shelf |
| `scope` | codebase, reference, or portable applicability |
| `triggers` | label activation |
| `keywords` | text activation |
| `owner` | maintenance ownership |
| `freshness` | last verification date |
| `eval_artifacts` | whether eval files exist, are planned, or are absent |
| `eval_state` | current content-eval state |
| `routing_eval` | whether routing examples are evaluated |
| `drift_check` | last repo-truth check |
| `relations` | related, boundary, verify_with, depends_on, and supported extensions |

### Optional fields

Only add these when they improve routing, verification, or maintenance.

| Field | Add when |
| --- | --- |
| `domain` | a slash-delimited subdomain helps browse or route |
| `categories` | the skill needs multiple browse homes; first item must match `category` |
| `primaryCategory` | the workspace requires its title-case browse alias |
| `secondary_categories` | public marketplace cross-listing is useful |
| `workspace_tags` | the skill is relevant only to named workspaces |
| `paths` | file-path activation should route to the skill |
| `grounding` | `scope: codebase` or concrete external claims need truth sources |
| `portability` | the skill is exported or tested across runtimes |
| `lifecycle` | stale-after or review cadence needs to be machine-readable |
| `user-invocable` | the skill should be hidden or exposed explicitly |
| `use_when`, `not_for` | legacy consumers still read those hints; new routing should live in `description`, `examples`, and `anti_examples` |

### Specialized lifecycle fields

Legacy fields below may appear in old skills but are not valid v7 top-level fields. Do not add them to new skills.

| Field | Recommended for |
| --- | --- |
| `family` | replace with `category`, `domain`, and `relations.related` |
| `layer` | replace with `category` or `domain` |
| `layerPrimary` | replace with protocol fields and generated manifest facets |
| `routingRole` | replace with `type`, `relations`, `examples`, and `anti_examples` |
| `eval_status` | replace with `eval_artifacts`, `eval_state`, and `routing_eval` |
| `references` | replace with `grounding.truth_sources` or body links |

### Understanding fields (flat)

When the skill teaches a non-trivial subject, populate these flat top-level fields. The comprehension grader reads them; the agent loads them when the skill activates. Required when `comprehension_state: present` (see `schemas/skill.v7.schema.json`). These replace the v5 `concept.*` nested block for machine-readable grading.

| Field | Purpose |
| --- | --- |
| `mental_model` | Primitives and their relationships |
| `purpose` | Problem the concept solves + alternative it replaced |
| `boundary` | Things commonly confused with it but are NOT it (as mechanisms, not labels) |
| `analogy` | One-sentence metaphor that preserves the core mechanism |
| `misconception` | Wrong mental model people bring and why it misleads |

The legacy `concept` nested block remains accepted for v5 skills not yet migrated, but new skills should populate the flat fields directly. A body `## Concept Card` section may still exist as the human-readable expansion; it must not be the only machine-readable source when `comprehension_state: present`.

### Health Block (flat — written by the audit loop)

These fields are stamped automatically by `audit`, `improve`, and `evaluate`. Do not author them manually; the loop owns them. (v7 replaced the single `audit_verdict` field with four discrete verdicts — see `docs/migrations/v6-to-v7.md` and ADR 0011.)

| Field | Written by | Purpose |
| --- | --- | --- |
| `last_audited` | `audit` | ISO date the audit last ran |
| `last_changed` | `improve` | ISO date the skill was last edited |
| `structural_verdict` | `audit` | Form gates (1–2, 7): skill is exportable — required fields, valid YAML, Agent Skills schema |
| `comprehension_verdict` | `evaluate --comprehension` | Gate 8: foundation model already has the concept (`SKIPPED_BASELINE_HIGH` expected for known concepts) |
| `application_verdict` | `evaluate --application` | Gate 9: loading the skill changes agent behavior on real artifacts — the field that certifies usefulness |
| `truth_verdict` | `audit` (drift phase) | Rolls up `drift_status`: skill content still matches its truth sources |
| `eval_score` | `evaluate` | 0.0–5.0 grade |
| `eval_failed_ids` | `evaluate` | failing eval IDs |
| `lint_verdict` | `audit` (deterministic phase) | `PASS` / `FAIL` / `UNKNOWN` (rolls into `structural_verdict`) |
| `drift_status` | `audit` (drift phase) | `OK` / `DRIFT` / `BROKEN` / `STALE` / etc. (rolls into `truth_verdict`) |

## 4.1 primaryCategory (workspace alias) (Updated 2026-05-24)

The protocol field is `category`. `primaryCategory` is a workspace alias for the same browse home when the local repo requires title-case labels. Use it only when that policy applies.

| Value | Use for |
|---|---|
| `Product Domain` | Skills about a specific business surface (shopify, printify, fulfillment, invoice) |
| `Technical Capability` | Skills about a technical pattern (encryption, caching, webhook-integration) |
| `Design & UX` | Skills about visual design, design systems, UX patterns |
| `Agent System` | Skills about the agent system itself (orchestration, agent-identity, dispatch-loop) |
| `Meta Method` | Skills about how to think/work (methodical, no-cutting-corners, semantics, taxonomy) |

**Selection rule:** Pick the category whose audience reads the skill most often. If a skill genuinely spans multiple categories, keep `category` as the primary and add `categories: [primary, secondary]` or `secondary_categories`, not `family`.

**Validation:** v7 schema validates the lowercase `category` enum and the optional `primaryCategory` alias values. Workspace census tools may add policy checks on top.

## 4.2 Adding new skill directories — no `git add -f` needed (Updated 2026-05-19 — SH-6190)

`skills/.gitignore` is now scoped to specific noise patterns (`/*.env`, `*.log`, `node_modules/`, `.DS_Store`, etc.) rather than a blanket `/*` ignore. New skill directories at the root of `skills/` (`<name>/SKILL.md`, `<name>/evals/*.json`, `<name>/references/*.md`) are tracked by default — `git add skills/<name>/SKILL.md` works without `-f`.

If you ever encounter a "path is ignored" warning when adding a new skill, run `git check-ignore -v <path>` to see which rule blocked it, and treat that rule as the bug to fix in `skills/.gitignore`. The intent is that `git add skills/<new-name>/` always works without overrides.

## 5. Section Contract By Archetype

### Capability skills

Required sections:

- `## Coverage`
- `## Philosophy`
- one or more core domain sections
- `## Verification`
- `## Do NOT Use When`

### Workflow skills

Required sections:

- `## Coverage`
- `## Philosophy`
- `## Workflow` or equivalent process section
- `## Verification`
- `## Do NOT Use When`

Recommended:

- `## Preconditions`
- `## Failure Modes`

### Router skills

Required sections:

- `## Coverage`
- `## Philosophy`
- `## Routing Table`
- `## Decision Tree` or `## Boundary Map`
- `## Verification`
- `## Do NOT Use When`

### Overlay skills

Required sections:

- `## Coverage`
- `## Philosophy`
- `## Project-Specific Rules`
- `## Key Files`
- `## Verification`
- `## Do NOT Use When`

Recommended:

- `## Base Skill` or `## Base Skill Overrides`

## 6. Section Packs

Do not create a separate full template for every family. Add a section pack only when it materially improves the skill.

| Pack | Add when | Typical additions |
| --- | --- | --- |
| Integration pack | external APIs or webhooks are central | `## API Contract`, `## Webhook Patterns`, rate limits, vendor URLs |
| Doctrine pack | rules are non-negotiable | invariants, enforcement, ship-blocker classification |
| Page pack | route ownership or page contracts matter | `route_groups`, page contracts, nearby docs |
| Model/profile pack | the skill documents a model or agent lane | strengths, weaknesses, routing guidance, cost notes |

## 7. Overlay Semantics

`scope` is limited to `codebase`, `reference`, or `portable`. A true overlay is expressed with `type: overlay` plus `extends: <base-skill>`.

It does not automatically mean the skill is a true semantic override of a shared base skill.

Treat a skill as a real override only when one of these is true:

- the skill explicitly sets `type: overlay` and `extends`
- the reader must consult the base skill first
- the local delta from base behavior is the whole point of the skill

If the skill is simply local primary truth, use `scope: codebase` plus `grounding.truth_sources` without pretending it overlays something broader.

## 8. What Goes In `SKILL.md` vs `references/`

| Put it in `SKILL.md` when | Put it in `references/` when |
| --- | --- |
| the reader needs it every time the skill loads | it is deep factual material used only sometimes |
| it changes judgment or routing | it provides evidence, examples, or long-form context |
| it is a rule, checklist, or decision table | it is a vendor-specific or repo-specific deep dive |

Do not dump model-native knowledge into either location just to make the skill look comprehensive.

## 9. Description Rules

The description is the routing contract.

Use this pattern:

```yaml
description: "This skill [verb] [what] for [context]. Covers [specific topics]. Use when [trigger scenario 1], [scenario 2], or [scenario 3]. Do NOT use for [excluded surface] ([better owner skill])."
```

Rules:

- write in third person
- include concrete trigger language
- include at least one explicit negative boundary
- keep it concise and front-load the useful words

## 10. Eval Minimum

Every active skill needs `evals/evals.json`.

Minimum expectations:

- 7 or more eval scenarios
- realistic tasks, not trivia
- repo-grounded expectations for codebase-scoped skills
- at least one negative expectation per eval

Archetype emphasis:

| Archetype | What to test |
| --- | --- |
| capability | domain correctness, scope boundaries, anti-patterns |
| workflow | sequencing, gate enforcement, failure handling |
| router | correct owner-skill routing and refusal to over-own |
| overlay | local truth, local file grounding, base-skill boundaries |

## 11. Authoring Workflow

1. clear the decision gate
2. check for a naming collision before creating the directory
3. choose archetype
4. choose category and domain
5. scaffold directory and frontmatter
6. write body using the archetype contract
7. add section packs only when needed
8. add evals
9. register routing if needed
10. run lint, census, and generated-skill checks

### Judgment calls to record

When authoring from the template, record any decision the docs do not decide for you. At minimum, write down:

| Judgment call | Required note |
| --- | --- |
| Name already exists | whether to extend the existing skill, rename the new one, or stop |
| Canonical directory | why this path owns the skill instead of another mirror |
| Scope | why the skill is `codebase`, `reference`, or `portable` |
| Category/domain | why the browse home and domain are primary |
| Truth sources | which repo files, specs, or references ground concrete claims |
| Relation targets | why each `related`, `boundary`, and `verify_with` target belongs |
| Eval default | why evals are `present`, `planned`, or `none` |
| Health defaults | why verdicts remain `UNVERIFIED`, `PROVISIONAL`, or earned |
| Understanding fields | why flat fields are present or omitted |
| Body sections | which archetype sections are required and which are intentionally skipped |

## 12. Anti-Patterns

| Anti-pattern | Why it fails |
| --- | --- |
| using family as the main template driver | creates drift and over-complex authoring |
| marking every Sales Hub skill as a true overlay | hides real domain ownership |
| adding metadata that does not change behavior | increases burden without improving routing |
| stuffing a skill with generic knowledge | lowers knowledge density |
| omitting negative bounds | causes false activation |
| leaving placeholder key files or generated boilerplate in place | makes the skill look complete when it is not |
| creating `database-pooling` when a same-name skill already exists | duplicates routing ownership instead of improving the canonical skill |

## Verification

After applying this skill, verify:

- [ ] the skill cleared the decision gate
- [ ] name collision was checked before creating a directory
- [ ] the archetype is correct
- [ ] `category` and `domain` help browse/discovery but do not drive the whole template
- [ ] only useful section packs were added
- [ ] the description includes trigger phrases and negative bounds
- [ ] the body follows the selected archetype contract
- [ ] evals cover realistic usage and boundaries
- [ ] key files and references are real

## Do NOT Use When

| Instead of this skill | Use | Why |
| --- | --- | --- |
| improving an existing skill's domain content without changing its structure | `skill-infrastructure` or the owning domain skill | this scaffold governs creation and structure, not ordinary content maintenance |
| deciding where documentation should live | `doc-updater` | doc-updater owns routing and same-commit doc protocol |
| broad agent workflow selection | `ai-coding-agents` | that skill routes commands and solver modes, not skill templates |
