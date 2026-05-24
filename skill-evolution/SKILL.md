---
schema_version: 7
name: skill-evolution
description: "This skill is the corpus-level walker over the Skill Audit Loop's four operations (audit, improve, evaluate, evolve). It picks the next skill by priority (application_verdict first, then skill-graph centrality and Health Block staleness), runs one full read → fix → test → next cycle, writes back to the skill's flat Health fields, then advances. Use when running autonomous improvement sessions, identifying coverage gaps via the keyword matrix, or scheduling per-skill audit work. Do NOT use for initial skill scaffolding (use skill-scaffold). Do NOT use for single-skill audits (use the `audit` operation directly via Skill Graph)."
version: 2.0.1
triggers:
  - skill-evolution
  - skill-improve-loop
owner: claude
freshness: "2026-04-01"
eval_artifacts: present
eval_state: unverified
routing_eval: absent
drift_check:
  last_verified: "2026-05-20"
  truth_source_hashes:
    "scripts/skill/skill-evolution-loop.js": "d814b6db98d80e262713454145063f2d72573f1d64da91ccbafb7e8c9dc901cd"
    "scripts/skill/skill-evolution-analyzer.js": "cc2c45434484781199837e445717d31986491a4f5d51fadc8bf29567e10d96b4"
    "scripts/skill/skill-keyword-matrix.js": "e8bb7c75580f3a8ff62ecda5326606a834b12c6ea49e25bf25f16b5fab0543b6"
grounding:
  domain_object: Corpus walker that runs audit → improve → evaluate per skill, prioritized by Health Block staleness + centrality
  grounding_mode: repo_internal
  truth_sources:
    - scripts/skill/skill-evolution-loop.js
    - scripts/skill/skill-evolution-analyzer.js
    - scripts/skill/skill-keyword-matrix.js
  failure_modes:
    - walker_phase_reorder
    - priority_signal_source_change
    - understanding_field_contract_drift
    - kept_counter_accounting_regression
  evidence_priority: walker_source > analyzer_source > skill_body
type: workflow
layer: meta
family: skill-system
scope: codebase
project_tags: [skill-graph, agent-orchestration]
injection_priority: 8
keywords:
  - skill evolution
  - auto-improve loop
  - keyword matrix
  - skill census
  - skill coverage
  - telemetry analysis
  - skill discovery
primaryCategory: Agent System
layerPrimary: meta
routingRole: primary
lint_verdict: PASS
drift_status: OK
last_audited: 2026-05-22
comprehension_state: present
mental_model: "A corpus of skills, each carrying a Health Block (last_audited, verdicts, eval_score, drift_status). A walker reads those fields to compute priority (staleness + graph centrality), then per skill runs audit (read-only, writes verdicts) → improve (one field, one commit, keep-or-revert) → evaluate (writes eval_score). The Health Block is both the loop's input and its output, so the walk is self-driving across runs."
purpose: "Guarantees the whole skill corpus is systematically re-grounded as the code it describes drifts, instead of only the skills someone happens to touch. Prioritizing by staleness + centrality revisits the riskiest skills first; the keep-or-revert gate guarantees an improve attempt can never leave the corpus worse than it found it."
boundary: "Not the single-skill audit (one operation the walker calls), not skill scaffolding (creating a skill from scratch), and not the eval grader itself. It is only the corpus-level scheduler/walker around those. Use the `audit` operation directly for one skill; use skill-scaffold to create one."
analogy: "Skill evolution is a building superintendent doing rounds — inspect each unit on a schedule that puts the longest-neglected and most-used first, fix one thing per visit, confirm the fix held, log it, move on."
misconception: "That it crawls telemetry or logs to decide what to improve. It does not — the priority signal is the flat Health Block in each skill's frontmatter (last_audited ascending, weighted by centrality); telemetry and the coverage matrix feed a separate discovery command, not the walker."
relations:
  related:
    - agent-orchestration
    - dispatch-loop
    - skill-infrastructure
    - skill-scaffold
  boundary:
    - evaluation
    - agent-observability
    - skill-scaffold
structural_verdict: PASS
truth_verdict: PASS
comprehension_verdict: UNVERIFIED
application_verdict: UNVERIFIED
---

## Concept Card

**What it is:** Skill evolution is the corpus-level discipline of continuously improving a whole library of agent skills by walking them one at a time — picking the next by priority, running a fixed inspect → change → verify cycle on each, recording the outcome, and advancing. It is the for-loop around a single-skill audit, not the audit itself.

**Mental model:** A corpus of skills, each carrying a Health Block (last_audited, verdicts, eval_score, drift_status). A walker reads those fields to compute priority (staleness + graph centrality), then per skill runs three operations in order — audit (read-only, writes verdicts), improve (one field, one commit, keep-or-revert), evaluate (writes eval_score). The Health Block is both the input (priority signal) and the output (each operation stamps its fields), so the loop is self-driving across runs.

**Why it exists:** Skills drift as the code they describe changes; without a systematic walker, only the skills someone happens to touch get re-grounded and the rest rot silently. A prioritized corpus walker guarantees the stalest, most-central skills are revisited first, and the keep-or-revert gate guarantees an improvement attempt can never leave the corpus worse than it found it.

**What it is NOT:** Not the single-skill audit (that is one operation the walker calls), not skill scaffolding (creating a new skill from scratch), and not the eval grader itself. It is only the corpus-level scheduler-and-walker around those.

**Adjacent concepts:** skill audit loop, Health Block, keep-or-revert, eval regression gate, skill-graph centrality, coverage matrix, continuous training.

**One-line analogy:** Skill evolution is like a building superintendent doing rounds — inspect each unit on a schedule that puts the longest-neglected and most-used first, fix one thing per visit, confirm the fix held, log it, move to the next door.

**Common misconception:** That it crawls telemetry or logs to decide what to improve. It does not — the priority signal is the flat Health Block on each skill's frontmatter (last_audited ascending, weighted by centrality); telemetry and the coverage matrix are side-channels that feed a separate discovery command, not the walker.

# Skill Evolution (Continuous Improvement)

## Domain Context

**What is this skill?** This skill is the corpus-level walker over the Skill Audit Loop's four operations. Where `audit`, `improve`, and `evaluate` act on one skill at a time, `evolve` runs them in order across many skills, prioritised by skill-graph centrality and Health Block staleness. Use when running autonomous improvement sessions, identifying coverage gaps via the keyword matrix, or scheduling per-skill audit work across the corpus.

## Coverage

This skill owns the corpus-level loop: how the next skill is picked, how the four operations chain together per skill, how telemetry-driven prioritisation works, and how the keyword matrix surfaces uncovered domains. The four operations' contract lives in `skill-graph/SKILL_AUDIT_LOOP.md`; `skill-audit-loop/` is only a frozen docs mirror. Their local implementations are the scripts in the Key Files table. This skill is only the walker.

## Philosophy

The audit loop runs on one skill at a time. The evolution loop runs the audit loop in a for-loop. They share vocabulary instead of inventing parallel ones. The Health Block on every skill (`last_audited`, `last_changed`, `structural_verdict`, `truth_verdict`, `comprehension_verdict`, `application_verdict`, `eval_score`, `lint_verdict`, `drift_status`) is the priority signal — `application_verdict` and `last_audited` pick the next skill. No telemetry crawl, no log aggregation.

## Key Files

| File | Purpose |
|---|---|
| `scripts/skill/skill-evolution-loop.js` | The corpus walker — thin for-loop over the four operations. |
| `scripts/skill/skill-evolution-analyzer.js` | Reads Health Block fields across all skills, returns priority order. |
| `scripts/skill/skill-census.js` | Deterministic inventory and metadata validator. Reads the v7 four-verdict Health Block. |
| `scripts/skill/skill-keyword-matrix.js` | Zero-AI coverage mapping. Finds uncovered surfaces. |
| `scripts/skill/skill-lint.js` + `skill-graph/scripts/skill-graph-drift.js` | The `audit` operation's deterministic core — lint writes `lint_verdict`, drift writes `drift_status`. Both invoked per skill by the walker via `runNode`. |
| `scripts/skill/run-skill-improvement-loop.js` | The `improve` operation. One field (`--field` HARD scope), time-boxed, keep-or-revert via `--commit` atomic merge. Invoked by the walker. |
| `scripts/skill/evaluate-skill.js` | The `evaluate` operation. Writes `eval_score`, `eval_failed_ids`. Invoked by the walker. |
| `skill-graph/SKILL_AUDIT_LOOP.md` | The four-operation contract — the canonical current spec for `audit`/`improve`/`evaluate`/`evolve`; the sibling `skill-audit-loop/` repo is a frozen docs mirror. |
| `Analysis/audits/SKILL_OPTIMIZATION_LOG.md` | Persistent narrative log of improvements (evidence; not state). |

## 1. The Walker

The walker is the only thing this skill owns. The four operations live in the Skill Audit Loop.

```
for skill in priority_order(application_verdict first, then centrality + staleness):
  audit(skill)                                  # reads + writes audit fingerprint
  if structural_verdict in {FAIL, PASS_WITH_FIXES}
     or truth_verdict in {DRIFT, BROKEN}
     or application_verdict in {UNVERIFIED, REDUNDANT, HARMFUL, MIXED}:
    improve(skill, field=understanding_field)   # one v6+ Understanding field, keep-or-revert
  evaluate(skill)                                # writes eval_score, eval_failed_ids
  advance
```

The walker picks `understanding_field` via `understandingField()` in
`scripts/skill/skill-evolution-loop.js`: any empty/missing field wins outright
(length 0), otherwise the shortest populated value among
`description`, `mental_model`, `purpose`, `boundary`, `analogy`, `misconception`.
Passing this — not the stalest Health date field — is what activates the
improver's HARD CONSTRAINT block and makes the walker's revert path
deterministic (one commit per kept change).

Priority comes from `application_verdict` first, then `last_audited` ascending across the corpus weighted by skill-graph centrality. No telemetry crawl — the Health Block on each skill is the priority signal.

## 2. The Four Operations (owned by skill-audit-loop)

| Operation | Edits instructional content? | Writes which Health fields |
|---|---|---|
| `audit` | No — writes Health Block fields only | `last_audited`, `structural_verdict`, `truth_verdict`, `comprehension_verdict` (`--graded`), `application_verdict` (`--graded`), `lint_verdict`, `drift_status` |
| `improve` | Yes (one field, one commit) | the chosen field + `last_changed` |
| `evaluate` | No — writes eval/Health Block fields only | `eval_score`, `eval_failed_ids`, `freshness`, `comprehension_verdict` / `application_verdict` when graders run |

Karpathy keep-or-revert is enforced at two layers:

1. **Inside `improve`** (the improvement loop's own gate): the model edits inside a git worktree; the gate runs the eval bundle against the candidate and either fast-forwards the change into main (`--commit` path) or restores from the snapshot.
2. **Inside the walker** (this loop): after `improve` returns, the walker captures the new HEAD and runs `evaluate` against the official eval bundle. If `eval_score` regressed against the pre-improve baseline, the walker `git revert HEAD` undoes the single atomic commit the improver placed on main.

The contract — one field, one commit — is enforced by the improvement loop's `--field` hard scope (refuses multi-field edits) and `--commit` atomic-merge flag. The walker passes both. Without them, the revert path would be unsafe because `git revert HEAD` only reverts ONE commit.

## 3. Discovery Side-Channel

Telemetry feedback, coverage matrix, content-monitor auto-discovery, and **run-level writeback** feed the priority queue but are not part of the walker itself:

### Run Findings Writeback (Browser Harness pattern)

`scripts/skill/skill-writeback.js` exports `appendRunFindings()`, which appends structured
post-run findings (selectors that worked, drifted, auth quirks) back into the skill's own
`SKILL.md` under a `## Run Findings (auto-generated)` section.  This is the Browser Harness
self-writeback pattern — instead of re-deriving selectors and login flows on every run, each
run enriches the skill file in place.  Entries are capped at 20 with FIFO rotation; overflows
land in `skills/<name>/run-findings-archive.jsonl`.

The two pilot skills for this pattern are `playwright-cli` and `customer-journey`.  Future
skills can opt in by calling `appendRunFindings()` at the end of any automated run.

- **Telemetry feedback**: skill injection frequency + stall/abort signals augment `last_audited` for priority ranking.
- **Coverage matrix**: `skill-app-coverage-matrix.js --summary` finds repo surfaces (routes, components) with no owning skill. Feeds `skill-discovery`, which is a separate command from the walker.
- **Auto-Discovery**: content-monitor surfaces external patterns (GitHub, Reddit) that suggest new skills to bridge gaps. Also feeds `skill-discovery`, not the walker.

## 4. Commands

```bash
# Walk the top N stalest skills
node scripts/skill/skill-evolution-loop.js --top 10

# Walk a single skill (one full audit → improve → evaluate cycle)
node scripts/skill/skill-evolution-loop.js --skill <name>

# Deterministic audit-only sweep (lint + drift → structural + truth verdicts).
# No LLM calls, no commits. Repopulates the two deterministic verdicts across
# the corpus for free — use after a schema migration or a lint-rule change.
node scripts/skill/skill-evolution-loop.js --top 600 --audit-only

# Skip just the evaluate phase (audit + improve, no LLM grader on eval bundles)
node scripts/skill/skill-evolution-loop.js --top 10 --no-evaluate

# Surface priority order without acting
node scripts/skill/skill-evolution-analyzer.js --plan

# Run only the analyzer, output JSON
node scripts/skill/skill-evolution-analyzer.js --json
```

## 5. Verification Protocol

- **No regression**: `improve` must auto-revert when `eval_score` drops. The walker records the failed attempt and proceeds.
- **Health Block stamps**: every operation writes its date field (`last_audited`, `last_changed`, `freshness`). The walker reads them on the next iteration to pick priority.
- **Version bumps on accept**: when an `improve` is kept, `version` is bumped semver-style by the `improve` operation.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Auditing one specific skill | `audit` operation directly via `skill-audit-loop` | skill-evolution is the corpus walker; single-skill work bypasses it |
| Creating a new skill from scratch | `skill-scaffold` | scaffolding precedes any audit cycle |
| Investigating one skill's score | `skill-status` | reads the Health Block without running the walker |

## Verification

After applying this skill, verify:
- [ ] The walker reads `last_audited` directly from frontmatter (no log-file scan)
- [ ] Each operation writes its target Health Block fields on completion
- [ ] `improve` failures auto-revert the commit and record the attempt
- [ ] No regression on `eval_score` is accepted

---

*Version 2.0.1 — 2026-05-22. Fixed 3 broken Key Files paths (`skill-audit-loop/src/*.js` → the real walker-invoked scripts: `run-skill-improvement-loop.js`, `evaluate-skill.js`, `skill-lint.js` + `skill-graph-drift.js`); noted that `skill-audit-loop/` is a frozen docs mirror (canonical = Skill Graph); authored the Concept Card + v6+ Understanding fields + a gradeable comprehension.json.*
*Version 2.0.0 — prior corpus-walker rewrite.*
