---
name: prioritization
# description: routing-facing summary of when this skill activates and what it covers.
description: "This skill provides prioritization frameworks for AI engineering: RICE-A (adding AI Ambiguity to RICE) for product features, ICE for research experiments, and MoSCoW for MVP/Release scoping. Use when ranking the backlog, deciding which model research path to follow, or defining the scope of a new feature. Do NOT use for one-off task sequencing (use task skill) or personal time management."
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
  subjects: [software-engineering-method, reasoning-strategy]
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # scope: required free-text statement of what this skill teaches and what it does not.
  scope: "Teaches work-ranking frameworks for AI-assisted engineering: RICE-A for product feature priority under ambiguity, ICE for research experiment ordering, MoSCoW for release scope, and human-vs-AI effort mapping. Portable across backlogs, roadmap choices, and model-research queues. Excludes within-session task sequencing, raw effort estimation, market-positioning strategy, and requirements definition."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
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
  keywords: ["prioritization","RICE","ICE","MoSCoW","RICE-A","AI ambiguity","feature ranking","research prioritization","backlog management","MVP scope"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["prioritization-skill","roadmap-skill","priority-planning-mode"]
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
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
  skill_graph_canonical_skill: skills/software-engineering-method/prioritization/SKILL.md
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
  related: ["constraint-awareness","bayesian-reasoning","playing-to-win","porters-five-forces","seven-powers"]
---
# Prioritization

## Concept of the skill

This skill provides prioritization frameworks for AI engineering: RICE-A (adding AI Ambiguity to RICE) for product features, ICE for research experiments, and MoSCoW for MVP/Release scoping.


## Domain Context

**What is this skill?** This skill provides prioritization frameworks for AI engineering: RICE-A (adding AI Ambiguity to RICE) for product features, ICE for research experiments, and MoSCoW for MVP/Release scoping. Use when ranking the backlog, deciding which model research path to follow, or defining the scope of a new feature. Do NOT use for one-off task sequencing (use task skill) or personal time management.

## Workflow

Use the ordered phases, checklists, and guardrails in the sections below as the canonical workflow for this skill. When multiple subsections describe steps, follow them in the order presented.

## Coverage

Three prioritization frameworks (RICE-A, ICE, MoSCoW), the Human vs AI Matrix for task delegation, accuracy threshold setting to prevent scope creep, and framework selection rules for matching the right framework to the current development phase.

## Philosophy of the skill
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
| Sequencing the steps inside one chosen task | `task-path-optimization` | Task-path optimization owns execution order; prioritization owns which work item should be selected. |
| Estimating confidence under uncertainty | `bayesian-reasoning` | Bayesian reasoning owns evidence updates; prioritization consumes confidence as one scoring input. |
| Competitive positioning or market strategy | `positioning` | Positioning shapes market claims and alternatives; prioritization ranks work after strategy inputs are known. |
| Defining product requirements or specifications | `spec-driven-development` | Prioritization ranks work; SDD defines what the work contains |

> **Source**: `REPORTS/Report_UI-UX-Thesis-Audit_Gemini-3-Flash_13-03-2026-05-15.md`
