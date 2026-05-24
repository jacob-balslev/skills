---
schema_version: 7
name: skill-graph-semantics
description: "This skill records the skill-graph protocol's specific semantic conventions — the non-negotiable naming and meaning rules for protocol entities (Skill, ConceptCard, ComprehensionEval), frontmatter field names, verdict tier nomenclature, dimension tag values, drift_status enum values, slug shapes, and the rules governing version label conventions. Use when authoring or reviewing a SKILL.md, naming a new frontmatter field, debating verdict-tier values, or deciding what a new comprehension.json dimension should be called. Do NOT use for the universal discipline of semantics (use project-semantics), Sales Hub code conventions (use sales-hub-semantics), agent-orchestration naming (use agent-orchestration-semantics), or the protocol entity model itself (use skill-graph-ontology)."
version: 0.1.0
type: capability
scope: reference
layer: quality
family: knowledge
triggers:
  - skill-graph-semantics-skill
  - skill-protocol-naming-skill
keywords:
  - skill protocol naming
  - frontmatter naming
  - comprehension dimension naming
  - verdict tier naming
  - drift status enum
owner: claude
freshness: 2026-05-23
eval_artifacts: none
eval_state: unverified
routing_eval: absent
drift_check:
  last_verified: "2026-05-23"
primaryCategory: Agent System
layerPrimary: quality
routingRole: primary
structural_verdict: PASS
truth_verdict: UNVERIFIED
comprehension_verdict: UNVERIFIED
application_verdict: UNVERIFIED
last_audited: 2026-05-23
lint_verdict: PASS
drift_status: NO_BASELINE
comprehension_state: present
mental_model: "Skill-graph semantics is the layer of protocol-specific naming and meaning rules that schema checks, manifest, and audit tooling agree to. The universal discipline (project-semantics) gives the underlying principles; this skill records the specific values: the 7 canonical comprehension dimensions, the v7 Health Block verdict values, the drift_status enum (OK / DRIFT / BROKEN / STALE / NO_BASELINE / EXTERNAL_UNHASHED / UNKNOWN), the kebab-case skill slug shape, and the v6/v7 Understanding field names."
purpose: "Every protocol consumer (lint, manifest compiler, router, drift sentinel, audit, grader) must agree on the same field names and enum values. Drift in any one breaks the others — a `drift_status: current` is silently invalid because `current` is not in the enum. Recording the conventions in one place lets every tool cite the same source."
boundary: "This skill records protocol-specific naming. It does not teach the universal discipline (use project-semantics), enumerate the entities themselves (use skill-graph-ontology), define what protocol terms MEAN (use skill-graph-glossary), or cover Sales Hub / agent-orchestration naming."
analogy: "If project-semantics is the federal grammar, this skill is the skill-graph protocol specification's naming appendix — the closed list of field names, enum values, and dimension tags every implementer agrees to use verbatim."
misconception: "That a new field can be added to frontmatter with any name as long as it's snake_case. It cannot — the schema field set is closed, and a non-conforming name fails schema/protocol checks. This skill is the citation source for what's allowed."
relations:
  related:
    - skill-graph-glossary
    - skill-graph-ontology
    - skill-graph-taxonomy
    - skill-infrastructure
    - skill-scaffold
  boundary:
    - project-semantics
    - sales-hub-semantics
    - agent-orchestration-semantics
  verify_with:
    - code-review
---

## Concept Card

**What it is:** A scaffold for the skill-graph protocol's specific naming conventions — the non-negotiable rules every protocol consumer (lint, manifest, router, drift sentinel, audit) agrees to follow for field names, enum values, dimension tags, and slug shapes. Currently a placeholder: the structure exists; specific rules will be authored as protocol decisions are ratified.

**Mental model:** Protocol-layer overrides on top of `project-semantics`. The universal discipline says "booleans read as questions"; this skill adds protocol-specific rules like the closed-enum `drift_status` values, the 7 canonical comprehension dimensions, the four-verdict Health Block field names.

**Why it exists:** Protocol field-name drift silently breaks lint, manifest, and audit tooling. A `drift_status: current` looks fine but isn't a valid enum value — the only thing that catches it is a centrally-recorded convention. This skill is that record.

**What it is NOT:** Not the universal discipline (use `project-semantics`). Not the protocol entity model (use `skill-graph-ontology`). Not the term definitions (use `skill-graph-glossary`). Not Sales Hub or agent-orchestration naming.

**Adjacent concepts:** skill-graph-glossary, skill-graph-ontology, skill-infrastructure, skill-scaffold.

**One-line analogy:** This skill is to the skill-graph protocol what a naming appendix is to a specification document — the closed list of identifiers every implementer agrees to use verbatim.

**Common misconception:** That a new field can be added with any reasonable name. It cannot — the schema is closed, and non-conforming names silently fail downstream tools.

# Skill Graph Semantics

## Status

**Scaffold** — created 2026-05-23 as part of the project-tier / project-instance split. Specific rules will be authored as protocol naming decisions and schema_version bumps drive them. Until populated, defer to `schemas/skill.schema.json`, `skill-graph/AGENTS.md`, and the protocol docs for current conventions.

## Coverage (planned)

When authored, this skill will record:

- **Slug shape**: kebab-case, head-noun anchored (per `head-noun-glossary`).
- **Frontmatter field names**: the closed set per `schema_version: 7`, including `comprehension_state`, the five flat Understanding fields, the four-verdict Health Block.
- **Verdict tier values**: `PASS` / `PROVISIONAL` / `UNVERIFIED` / `APPLICABLE` and the negative enums (`SHALLOW`, `REDUNDANT`, `HARMFUL`, `MIXED`).
- **Drift status enum**: `OK` / `DRIFT` / `BROKEN` / `STALE` / `NO_BASELINE` / `EXTERNAL_UNHASHED` / `UNKNOWN`.
- **Comprehension dimensions**: the 7 canonical dimensions (`definition`, `mental_model`, `purpose`, `boundary`, `taxonomy`, `analogy`, `application`).
- **Relation types**: `related` / `boundary` / `verify_with` / `depends_on` (`adjacent` is a back-compat alias for `related`).
- **Eval substance/calibration/truth_mode values**: the closed enums each field accepts.
- **Run-dir, claim-id, audit-id shape**: the canonical formats.
- **Concept Card field labels**: the 7 required bold-label fields and their canonical order.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Learning the universal discipline | `project-semantics` | Universal vs. project-specific |
| Looking up what protocol terms MEAN | `skill-graph-glossary` | Glossary defines terms; this skill defines naming conventions |
| Looking up which protocol entities exist | `skill-graph-ontology` | Ontology lists entities; this skill names them |
| Authoring a new SKILL.md from scratch | `skill-scaffold` | Scaffold is the tool; this skill is the naming reference the scaffold honors |
| Sales Hub code | `sales-hub-semantics` | Different bounded context |
| Agent-orchestration code | `agent-orchestration-semantics` | Different bounded context |

---

*Version 0.1.0 — 2026-05-23. Initial scaffold. Awaiting authoring of specific conventions.*
