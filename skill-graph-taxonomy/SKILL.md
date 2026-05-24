---
schema_version: 7
name: skill-graph-taxonomy
description: "This skill records the skill-graph protocol's specific classification conventions — the closed-enum scope values (portable/codebase/reference), category enum (foundations/engineering/design/quality/agent/product), type enum (capability/workflow/router/overlay), the 7 canonical comprehension dimensions, the four-verdict Health Block values, drift_status enum, relation type taxonomy (related/boundary/verify_with/depends_on), and the routing-role taxonomy (primary/router/verifier/gate/universal). Use when proposing a new enum value in the protocol, classifying a new skill into the existing structure, or designing a schema migration that touches a classification field. Do NOT use for the universal discipline of taxonomy (use project-taxonomy), Sales Hub classification (use sales-hub-taxonomy), agent-orchestration classification (use agent-orchestration-taxonomy), or the protocol entity model itself (use skill-graph-ontology)."
version: 0.1.0
type: capability
scope: reference
layer: architecture
family: skill-system
triggers:
  - skill-graph-taxonomy-skill
  - skill-protocol-classification-skill
keywords:
  - skill scope enum
  - skill category enum
  - skill type enum
  - comprehension dimensions
  - verdict tier ordering
  - drift status enum
  - relation type taxonomy
owner: claude
freshness: 2026-05-23
eval_artifacts: none
eval_state: unverified
routing_eval: absent
drift_check:
  last_verified: "2026-05-23"
primaryCategory: Agent System
layerPrimary: architecture
routingRole: primary
structural_verdict: PASS
truth_verdict: UNVERIFIED
comprehension_verdict: UNVERIFIED
application_verdict: UNVERIFIED
last_audited: 2026-05-23
lint_verdict: PASS
drift_status: NO_BASELINE
comprehension_state: present
mental_model: "Skill-graph taxonomy is the closed-enum surface that every protocol tool (schema checks, manifest, router, drift sentinel, audit, grader) consumes. The universal discipline says 'one organizing principle per level'; this skill records the specific principles — scope by audience (portable / codebase / reference), category by browse facet, type by routing shape, dimensions by comprehension axis, verdicts by health layer, drift_status by detection state, relations by edge type, routing-role by node role in the graph."
purpose: "Every protocol tool reads the same enums. Drift in any one breaks the others. Recording the closed enums in one cited place is what lets schema migrations stay coherent and what catches a `drift_status: current` as obvious drift rather than slipping through."
boundary: "This skill records protocol-specific classification. It does not teach the universal discipline (use project-taxonomy), enumerate the entities (use skill-graph-ontology), define terms (use skill-graph-glossary), or cover Sales Hub / agent-orchestration classification."
analogy: "If project-taxonomy is the federal grammar, this skill is the skill-graph protocol's enumeration appendix — the closed lists of values every implementer reads from."
misconception: "That enum extension is local. It is not — adding a new scope value, category, dimension, or verdict tier requires updating every consumer (lint, manifest, router, audit, grader), and this skill is the change-coordination point."
relations:
  related:
    - skill-graph-glossary
    - skill-graph-ontology
    - skill-graph-semantics
    - skill-infrastructure
    - skill-scaffold
  boundary:
    - project-taxonomy
    - sales-hub-taxonomy
    - agent-orchestration-taxonomy
  verify_with:
    - code-review
---

## Concept Card

**What it is:** A scaffold for the skill-graph protocol's specific classification conventions — the closed enums for scope, category, type, comprehension dimensions, verdict tiers, drift_status, relation types, and routing roles. Currently a placeholder: the structure exists; specific rules will be authored as protocol classification decisions are ratified.

**Mental model:** Protocol-layer overrides on top of `project-taxonomy`. The universal discipline says "one organizing principle per level"; this skill records the specific closed enums.

**Why it exists:** Every protocol tool reads the same enums. Drift in any one (`drift_status: current` instead of canonical `OK`) silently breaks downstream tooling. Recording the enums in one cited place is what coordinates schema migrations and catches drift.

**What it is NOT:** Not the universal discipline (use `project-taxonomy`). Not the entity model (use `skill-graph-ontology`). Not the term definitions (use `skill-graph-glossary`). Not Sales Hub or agent-orchestration classification.

**Adjacent concepts:** skill-graph-glossary, skill-graph-ontology, skill-infrastructure, skill-scaffold.

**One-line analogy:** This skill is to the skill-graph protocol what an enumeration appendix is to a specification — the closed lists every implementer agrees to.

**Common misconception:** That a new enum value can be added locally. It cannot — every consumer (lint, manifest, router, audit, grader) reads the same enum; the change must coordinate across all of them.

# Skill Graph Taxonomy

## Status

**Scaffold** — created 2026-05-23 as part of the project-tier / project-instance split. Specific rules will be authored as protocol classification decisions and schema_version bumps drive them. Until populated, defer to `schemas/skill.schema.json`, `skill-graph/AGENTS.md`, and `docs/field-reference.md` for current closed-enum values.

## Coverage (planned)

When authored, this skill will record:

- **Scope enum**: `portable` / `codebase` / `reference` — what each means and which skills belong in each.
- **Category enum**: `foundations` / `engineering` / `design` / `quality` / `agent` / `product` — the closed browse facet introduced in v5.
- **Type enum**: `capability` / `workflow` / `router` / `overlay` — by routing shape.
- **Comprehension dimensions**: `definition` / `mental_model` / `purpose` / `boundary` / `taxonomy` / `analogy` / `application` — the 7 canonical dimensions.
- **Verdict tier ordering**: `APPLICABLE > PROVISIONAL > UNVERIFIED` (positive); `SHALLOW` / `REDUNDANT` / `HARMFUL` / `MIXED` (negative).
- **drift_status enum**: `OK` / `DRIFT` / `BROKEN` / `STALE` / `NO_BASELINE` / `EXTERNAL_UNHASHED` / `UNKNOWN`.
- **Relation types**: `related` / `boundary` / `verify_with` / `depends_on` (`adjacent` is a back-compat alias for `related`).
- **Routing roles**: `primary` / `router` / `verifier` / `gate` / `universal`.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Learning the universal discipline | `project-taxonomy` | Universal vs. project-specific |
| Looking up what protocol terms MEAN | `skill-graph-glossary` | Glossary defines terms; this skill defines classification |
| Looking up which protocol entities exist | `skill-graph-ontology` | Ontology lists entities; this skill organizes them |
| Sales Hub classification questions | `sales-hub-taxonomy` | Different bounded context |
| Agent-orchestration classification questions | `agent-orchestration-taxonomy` | Different bounded context |

---

*Version 0.1.0 — 2026-05-23. Initial scaffold. Awaiting authoring of specific conventions.*
