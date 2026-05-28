---
name: prioritization
description: "This skill provides prioritization frameworks for AI engineering: RICE-A (adding AI Ambiguity to RICE) for product features, ICE for research experiments, and MoSCoW for MVP/Release scoping. Use when ranking the backlog, deciding which model research path to follow, or defining the scope of a new feature. Do NOT use for one-off task sequencing (use task skill) or personal time management."
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
  subject: quality-assurance
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: quality/doctrine
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-03-27"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-03-27\"}"

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
  keywords: "[\"prioritization\",\"RICE\",\"ICE\",\"MoSCoW\",\"RICE-A\",\"AI ambiguity\",\"feature ranking\",\"research prioritization\",\"backlog management\",\"MVP scope\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"prioritization-skill\",\"roadmap-skill\",\"priority-planning-mode\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"constraint-awareness\"]}"
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
  skill_graph_canonical_skill: skills/prioritization/SKILL.md
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
# Prioritization

## Domain Context

**What is this skill?** This skill provides prioritization frameworks for AI engineering: RICE-A (adding AI Ambiguity to RICE) for product features, ICE for research experiments, and MoSCoW for MVP/Release scoping. Use when ranking the backlog, deciding which model research path to follow, or defining the scope of a new feature. Do NOT use for one-off task sequencing (use task skill) or personal time management.

## Workflow

Use the ordered phases, checklists, and guardrails in the sections below as the canonical workflow for this skill. When multiple subsections describe steps, follow them in the order presented.

## Coverage

Three prioritization frameworks (RICE-A, ICE, MoSCoW), the Human vs AI Matrix for task delegation, accuracy threshold setting to prevent scope creep, and framework selection rules for matching the right framework to the current development phase.

## Philosophy

Without explicit prioritization frameworks, agents default to working on whatever seems most interesting or most recently mentioned. In AI-assisted development, this is especially dangerous because research tasks have unbounded ambiguity. The RICE-A extension adds an Ambiguity denominator that forces experimental work through a research phase before it competes with proven features for engineering time. This skill prevents the two most common prioritization failures: shipping low-confidence features ahead of proven ones, and chasing diminishing accuracy returns instead of delivering core value.

> Prioritization is the science of ranking work by expected impact vs. effort. In AI development, traditional prioritization fails because it ignores research uncertainty. Good prioritization accounts for model ambiguity while maximizing the delivery of core product value.

## 1. RICE-A Framework — Product Feature Prioritization

Use for ranking user-facing features when you have a baseline model.

$$Score = \frac{Reach \times Impact \times Confidence}{Effort \times (\frac{Ambiguity}{2})}$$

### RICE-A Definitions

| Factor | Definition | Scale |
|--------|------------|-------|
| **Reach** | Users/quarter affected | Absolute number |
| **Impact** | Contribution to core value proposition | 3 (Massive) to 0.25 (Minimal) |
| **Confidence** | Data quality & baseline model presence | 100% (Proven) to 50% (Guess) |
| **Effort** | Person-weeks (Inference + Data effort) | Number |
| **Ambiguity** | "Unknown unknowns" of model performance | 1 (Deterministic) to 5 (Highly Experimental) |

**Rule**: A high Ambiguity (A) score acts as a denominator that lowers the priority of experimental features until they move through the ICE research phase.

## 2. ICE Framework — Research Prioritization

Use for ranking 10+ experiments when you are in the "Discovery" phase.

$$Score = Impact \times Confidence \times Ease$$

| Factor | Scale (1-10) | Definition |
|--------|--------------|------------|
| **Impact** | 1-10 | How much does this improve the baseline metric? |
| **Confidence** | 1-10 | How sure are we that this experiment will succeed? |
| **Ease** | 1-10 | How fast can we run this experiment (ignoring long-term COGS)? |

**Rule**: ICE is for "fail-fast" research. Prioritize the highest score to find the working model architecture before applying RICE-A for product integration.

## 3. MoSCoW Method — MVP/Release Scoping

Use for defining the "Musts" of a specific delivery milestone.

| Category | Definition | AI Example |
|----------|------------|------------|
| **Must-Have** | Non-negotiable core functionality | "Model must correctly calculate profit_cents" |
| **Should-Have** | High priority but not critical for launch | "Latency should be < 2s for 95% of queries" |
| **Could-Have** | Desirable enhancements ("Nice-to-have") | "Multi-modal image support for product matching" |
| **Won't-Have** | Out of scope for this milestone | " chasing the final 0.1% of accuracy" |

**Rule**: Protect the team from "Accuracy Creep". Define the "Must-Have" accuracy threshold before starting implementation.

## 4. The Human vs. AI Matrix (The Gold Quadrant)

Prioritize work based on who is best suited for the task.

```text
       High |  (1) AI ASSISTED       |  (2) THE GOLD QUADRANT 
Human       |  (Research, Strategy)  |  (Bulk Gen, Triage, Tests)
Effort      |------------------------|--------------------------
            |  (3) IGNORE            |  (4) HUMAN ONLY
       Low  |  (Trivial Tasks)       |  (Creative, High-Stakes)
            ----------------------------------------------------
                   High              Low
                       AI Effort
```

- **The Gold Quadrant**: High Human Effort / Low AI Effort. These tasks have the highest ROI for AI agents (e.g., generating 50 tests, triaging 1000 logs).

## Verification

```text
PRIORITIZATION CHECK
====================
[ ] Framework matches the phase (ICE for Research, RICE-A for Product)
[ ] Ambiguity (A) score assigned for experimental features
[ ] Confidence score grounded in data quality (not just vibes)
[ ] MoSCoW defined for the current milestone
[ ] Accuracy threshold set (prevents Accuracy Creep)
[ ] Task sits in the "Gold Quadrant" for AI agents
```

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Sequencing tasks within a single sprint or session | `task` | Task skill owns execution ordering; prioritization owns which work to pick |
| Estimating effort for individual tasks | `effort` | Effort calibration is a separate concern from priority ranking |
| Competitive positioning or market strategy | `competitive-positioning` | Business strategy informs priority inputs but is not the framework itself |
| Defining product requirements or specifications | `spec-driven-development` | Prioritization ranks work; SDD defines what the work contains |

> **Source**: `REPORTS/Report_UI-UX-Thesis-Audit_Gemini-3-Flash_13-03-2026-05-15.md`
