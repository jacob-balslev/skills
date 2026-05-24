---
schema_version: 7
name: skill-graph-ontology
description: "This skill records the formal ontological commitments of the skill-graph protocol — what entities exist (Skill, ConceptCard, Eval, ComprehensionEval, Relation, Manifest, Audit, Run, Verdict, DriftBaseline, TruthSource), what identity criteria distinguish them, and what axioms govern their state and relationships (e.g., a Skill has exactly one schema_version; a Verdict tier ordering is APPLICABLE > PROVISIONAL > UNVERIFIED; a ComprehensionEval must carry a dimension tag from the 7 canonical dimensions). Use when proposing a new field or entity in the protocol, designing a schema migration, debating whether a new concept deserves its own protocol entity vs. an attribute on an existing one, or debugging cross-entity inconsistencies in the audit pipeline."
version: 0.1.0
type: capability
scope: reference
layer: architecture
family: doctrine
triggers:
  - skill-graph-ontology-skill
  - skill-protocol-entity-model
keywords:
  - skill graph ontology
  - skill protocol
  - concept card
  - comprehension eval
  - verdict tier
  - drift baseline
  - truth source
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
mental_model: "The skill-graph protocol's entity model: a Skill is the top-level node, carrying a ConceptCard (the universal-discipline layer) and a set of Evals (legacy + ComprehensionEval + eval-set). Skills connect via typed Relations (related, boundary, verify_with, depends_on) to form the graph. Manifest is the compiled projection of all Skills. Audit is the lifecycle of evaluating a skill's health; Run is one execution of an audit; Verdict is the four-verdict health block produced. DriftBaseline records the hash of TruthSources at last verification. Identity is the kebab-case skill slug; axioms include 'a Skill has exactly one schema_version,' 'every ComprehensionEval has a dimension from {definition, mental_model, purpose, boundary, taxonomy, analogy, application},' and 'Verdict.application_verdict can only be APPLICABLE if a dual-run grader produced it.'"
purpose: "The skill-graph protocol embeds ontological commitments — what counts as a Skill, what a ConceptCard owes, what a gradeable Eval looks like, what each Verdict tier means — that every audit script, lint rule, and migration codemod must honor. Recording those commitments explicitly is what lets the protocol evolve coherently across schema_version bumps; without it, each new tool quietly re-invents the model and drift accumulates."
boundary: "This skill records what the skill-graph protocol IS committed to. It does not teach the universal discipline of ontology (use project-ontology), describe Sales Hub product entities (use sales-hub-ontology), describe agent-orchestration runtime entities (use agent-orchestration-ontology), or document protocol implementation tooling (use skill-infrastructure, skill-scaffold, skill-evolution)."
analogy: "If project-ontology is the constitution, this skill is the skill-graph protocol's specification — the record of what entities the protocol promises every consumer (lint, manifest compiler, router, drift sentinel, audit, grader) will recognize."
misconception: "That the skill-graph protocol is fully specified by the JSON schemas in schemas/. The schemas pin the SHAPE; this skill pins the MEANING — which entities exist conceptually, how their identity criteria differ, what state changes are allowed. A schema says a field is a string; an ontology says what that string IS."
relations:
  related:
    - skill-graph-glossary
    - skill-graph-semantics
    - skill-graph-taxonomy
    - skill-infrastructure
    - skill-scaffold
    - skill-evolution
    - skill-portability
  boundary:
    - project-ontology
    - sales-hub-ontology
    - agent-orchestration-ontology
  verify_with:
    - code-review
---

## Concept Card

**What it is:** A scaffold for the skill-graph protocol's actual ontological commitments — the formal record of what entities exist in the protocol, their identity criteria, lifecycle axioms, and the cross-tool invariants that the lint / manifest / router / drift sentinel / audit pipeline must honor. Currently a placeholder: the structure exists, specific entity definitions await authoring.

**Mental model:** Skill is the top-level entity (identity = kebab-case slug). It carries a ConceptCard (universal discipline) and Evals (legacy + ComprehensionEval + eval-set). Skills connect via typed Relations to form the graph. Manifest is the compiled view; Audit is the health-evaluation lifecycle; Verdict is the four-tier health block. DriftBaseline records TruthSource hashes at last verification.

**Why it exists:** The skill-graph protocol must evolve coherently — every schema_version bump and every new tool (lint rule, migration codemod, audit grader) honors the same entity model. Without explicit recording, each tool re-invents the model and drift accumulates; with explicit recording, drift becomes a reviewable claim.

**What it is NOT:** Not the universal discipline (use `project-ontology`). Not Sales Hub product entities (use `sales-hub-ontology`). Not agent-orchestration runtime entities (use `agent-orchestration-ontology`). Not protocol implementation tooling (use `skill-infrastructure`, `skill-scaffold`, `skill-evolution`).

**Adjacent concepts:** skill-graph-glossary, skill-infrastructure, skill-evolution, skill-portability.

**One-line analogy:** This skill is to the skill-graph protocol what a specification document is to a standards body — the record of what every consumer agrees the entities mean before any tool implements them.

**Common misconception:** That the JSON schemas in `schemas/` fully specify the protocol. Schemas pin the SHAPE; this skill pins the MEANING.

# Skill Graph Ontology

## Status

**Scaffold** — created 2026-05-23 as part of the project-tier / project-instance split. The structure is established; specific entity definitions, axioms, and invariants will be authored as protocol decisions and schema_version bumps drive them. Until populated, do not cite this skill as canonical evidence for any specific protocol entity commitment — route to `skill-infrastructure`, `skill-scaffold`, or the `skill-graph/AGENTS.md` document for current protocol behavior.

## Coverage (planned)

When authored, this skill will record the skill-graph protocol's ontological commitments:

- **First-class entities**: Skill, ConceptCard, Eval, ComprehensionEval, Relation, Manifest, Audit, Run, Verdict, DriftBaseline, TruthSource.
- **Identity criteria**: kebab-case slug for Skills; (skill, dimension) pair for ComprehensionEval entries; (skill, audit_run_dir) for Runs.
- **Lifecycle axioms**: schema_version is monotonic per skill; ComprehensionEval.dimension ∈ {7 canonical dimensions}; Verdict tier ordering APPLICABLE > PROVISIONAL > UNVERIFIED; "labels are earned, not bumped" rule; DriftBaseline rehash gates.
- **Relation types**: related, boundary, verify_with, depends_on — and how each constrains routing (`adjacent` remains a back-compat alias for related).

## Philosophy

The skill-graph protocol exists to make a skill library coherent at scale. Coherence at scale requires that every tool — lint, manifest compiler, router, drift sentinel, audit grader, migration codemod — agree on what the entities are and what their states mean. This skill is the record of that agreement; without it, each tool re-invents the model and the library decays into inconsistency.

## Verification

After applying this skill (once authored), verify:
- [ ] Every proposed protocol entity has an explicit identity criterion
- [ ] Every schema_version migration checks the ontological commitments before bumping the label
- [ ] Every new tool consumes the entity model from the same source, not its own private definition
- [ ] Verdict tier claims match the ontology's tier ordering (no PROVISIONAL reported as PASS)

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Learning the universal discipline of ontology | `project-ontology` | This skill records commitments; project-ontology teaches methodology |
| Sales Hub product entity questions | `sales-hub-ontology` | Different bounded context |
| Agent-orchestration runtime entity questions | `agent-orchestration-ontology` | Different bounded context |
| Authoring a new skill from a template | `skill-scaffold` | Scaffold is the tool; this skill is the conceptual model the scaffold honors |
| Running the protocol's lint/manifest/audit toolchain | `skill-infrastructure` | Infra is the script layer; this skill is the entity layer |

---

*Version 0.1.0 — 2026-05-23. Initial scaffold. Awaiting authoring of specific entity commitments.*
