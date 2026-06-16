---
name: spec-driven-development
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when starting a non-trivial feature, refactor, or agent implementation that needs a written spec, plan, task breakdown, and verification path before code changes. Covers Spec Kit-style SDD phases, requirements-vs-plan separation, task traceability, review gates, and spec-compliance verification. Do NOT use for one-line edits, README-only fixes, post-implementation code review (use `code-review`), or test-level decisions (use `testing-strategy`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this skill.
compatibility:
  notes: "Markdown, Git, agent-skill runtimes"
allowed-tools: Read Grep Bash
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: software-engineering-method
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # scope: required free-text statement of what this skill teaches and what it does not.
  scope: "Use when starting a non-trivial feature, refactor, or agent implementation that needs a written spec, plan, task breakdown, and verification path before code changes. Covers Spec Kit-style SDD phases, requirements-vs-plan separation, task traceability, review gates, and spec-compliance verification. Do NOT use for one-line edits, README-only fixes, post-implementation code review (use `code-review`), or test-level decisions (use `testing-strategy`)."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/methodology
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  # freshness: ISO date the skill body was last reviewed or updated.
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.

  # === Evaluation Status: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["spec driven development","SDD","specification first","technical plan","task decomposition","spec.md","plan.md","tasks.md","requirements before code","phase gates"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["sdd-skill","planning-mode","spec-driven-development"]
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  # grounding: required when non-empty `project[]`. Declares the truth sources
  # the skill anchors to and the failure modes those sources prevent. Omit when the
  # skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
  grounding: "{\"subject_matter\":\"Spec-driven development workflow for AI-assisted engineering using specification, plan, task, implementation, and verification artifacts\",\"grounding_mode\":\"hybrid\",\"truth_sources\":[\"https://github.github.com/spec-kit/index.html\",\"https://github.github.com/spec-kit/reference/workflows.html\",\"https://github.com/github/spec-kit\",\"https://standards.ieee.org/ieee/29148/6937/\"],\"failure_modes\":[\"code_started_before_spec_or_plan\",\"implementation_plan_missing_architecture_contracts_or_tests\",\"tasks_not_traceable_to_plan_or_success_criteria\",\"verification_not_mapped_to_spec_requirements\",\"workflow_requires_vendor_specific_commands_when_plain_markdown_would_work\"],\"evidence_priority\":\"equal\"}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/software-engineering-method/spec-driven-development/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
relations:
  related: ["evaluation","testing-strategy","code-review","prioritization","interaction-patterns"]
  verify_with: ["testing-strategy","code-review"]
---
# Spec Driven Development (SDD)

## Concept of the skill

Use when starting a non-trivial feature, refactor, or agent implementation that needs a written spec, plan, task breakdown, and verification path before code changes.


## Coverage

- When to require SDD: non-trivial work, core-module refactors, ambiguous agent loops, cross-boundary changes, or any task where hidden requirements could be expensive after code exists.
- Artifact chain: `spec.md` for what and why, `plan.md` for how, `tasks.md` for ordered work, implementation commits for execution, and a final verification report for spec compliance.
- Phase discipline: specification before plan, plan before tasks, tasks before implementation, and verification before completion.
- Traceability: each task and verification check maps back to a requirement, constraint, or success criterion.
- Review gates: human approval when available, or an explicit documented rationale when autonomous work must proceed.
- Scope control: if implementation discovers the spec or plan is wrong, update the upstream artifact before continuing.
- Post-implementation learning: measure whether the change solved the problem when the task has a product, operational, or user-facing success metric.

## Philosophy of the skill
AI agents default to implementation-first thinking: receive a prompt, start coding. That produces features that compile, pass narrow tests, and still miss the actual requirement. SDD makes the specification the source of truth and turns the plan, task list, implementation, and verification report into derived artifacts.

GitHub Spec Kit frames the core process as Spec → Plan → Tasks → Implement. This skill keeps that source shape and adds a final Verify gate because a skill application is not complete until the implementation is checked against the spec that justified it.

The most important separation is **what** versus **how**. The spec names user value, constraints, non-goals, and success criteria. The plan names architecture, contracts, data flow, testing, and risk. Collapsing those two artifacts creates design debt before the first file is edited.

## Workflow

Use this workflow in order. If a phase reveals that an earlier artifact is wrong, update the earlier artifact first and restart from there.

### 1. Decide Whether SDD Is Required

Use the lightweight path only for small, local, reversible edits. Use SDD when any of these are true:

- More than one module, service, schema, public API, or user flow may change.
- Requirements are ambiguous or conflict with existing behavior.
- Security, privacy, accessibility, data integrity, or migration risk is present.
- An agent loop has stalled because it keeps discovering new scope while coding.

### 2. Specify (`spec.md`)

The specification defines the desired outcome without prescribing implementation mechanics.

- Requirements: user-visible behavior, system behavior, and must-have outcomes.
- Constraints: architecture boundaries, security/privacy rules, accessibility, performance, compatibility, and data handling.
- Non-goals: what this change explicitly will not solve.
- Success criteria: observable facts that prove the work is done.
- Edge cases: zero states, failure states, concurrent access, volume limits, and rollback paths.

> **Anti-pattern**: Describing implementation details (e.g., "Use a `for` loop") in the spec. The spec is for "What", not "How".

Exit gate: the spec is approved by the human owner, or the agent records why it is safe to proceed without explicit approval.

### 3. Plan (`plan.md`)

The plan translates the spec into an implementation strategy.

- Architecture: affected modules, new components, storage/schema changes, migration path, and rollback strategy.
- Data flow: how data moves between inputs, processing, storage, outputs, and external systems.
- Contracts: API request/response shapes, events, schemas, status codes, and compatibility promises.
- Testing: evidence needed at unit, integration, contract, E2E, manual, or visual levels.
- Risks: hidden dependencies, breaking changes, sequencing hazards, and observability needs.

Exit gate: the plan explains how every success criterion will be implemented and verified.

### 4. Decompose (`tasks.md`)

Break the plan into ordered, testable tasks.

- One behavioral change per task.
- Each task names the spec requirement or plan section it satisfies.
- Each task includes a verification command, check, or review step.
- Dependencies are topologically ordered so prerequisite work appears first.
- Parallel tasks are marked only when they can be executed without touching the same files or contracts.

Exit gate: a reader can execute tasks in order without rediscovering architecture decisions.

### 5. Implement

Implement from `tasks.md`, not from memory.

- Complete tasks in dependency order.
- Keep each commit or patch scoped to the task it claims.
- If a task exposes a wrong requirement, update `spec.md`; if it exposes a wrong design, update `plan.md`; then regenerate or adjust tasks.
- Do not silently add scope just because the implementation made it convenient.
- Keep tests, docs, and operational checks attached to the task that requires them.

### 6. Verify

Verification is the only path to finality.

- Spec compliance: every must-have and success criterion has evidence.
- Plan compliance: implementation follows the chosen architecture or documents an approved change.
- Regression evidence: focused tests, lint/type checks, contract checks, or manual verification ran.
- User-facing quality: UI, copy, accessibility, and visual behavior match the spec and the project design system.
- Documentation: repo instructions, API docs, decisions, and runbooks are updated when the behavior or workflow changed.
- Residual risk: any skipped check has a named reason and owner.

### 7. Learn

When the spec has a product, operational, or user-facing metric, measure whether the change solved the intended problem.

- Define the success metric before implementation.
- Confirm the measurement mechanism exists.
- Collect enough evidence for the decision.
- Record whether to continue, adjust, or stop.

Skip the learning loop for pure infrastructure chores, small bug fixes with a regression test, and cosmetic edits with no measurable hypothesis.

## Verification Checklist

```text
SDD CHECK
=========
[ ] spec.md exists or the fast-track rationale is documented
[ ] spec.md separates requirements, constraints, non-goals, success criteria, and edge cases
[ ] plan.md maps each success criterion to architecture, contracts, data flow, and verification evidence
[ ] tasks.md is ordered, traceable, and verifiable
[ ] No code was written before the plan gate, or the exception is documented
[ ] Every implementation deviation updated the upstream spec or plan
[ ] Final verification confirms all spec success criteria
[ ] Eval, routing, or quality claims remain unverified unless the corresponding check actually ran
```

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| One-line edits, README-only fixes, or trivial local changes | no dedicated skill | The SDD overhead is larger than the change risk |
| Reviewing code quality after implementation | `code-review` | Code review owns diff-level correctness, risk, and merge-readiness assessment |
| Deciding what level of automated or manual testing is appropriate | `testing-strategy` | Testing strategy owns test-level selection and regression targeting |
| Holistic completion scoring after work is done | `evaluation` | Evaluation owns quality scoring and revision loops after implementation evidence exists |


## Verification

After applying this skill, verify:
- [ ] Changes follow the patterns documented above
- [ ] No regressions in affected functionality
- [ ] The final report names which spec criteria were satisfied and which checks produced evidence
