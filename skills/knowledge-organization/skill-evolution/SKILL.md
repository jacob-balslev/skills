---
# name: stable kebab-case skill identifier; must match the parent directory.
name: skill-evolution
# description: routing contract for when this skill should activate and when it should not.
description: "Use when running or auditing Skill Graph's corpus-level `evolve` operation: the continuous skill-improvement loop that analyzes a skill library, triages a priority queue, executes bounded improve/scaffold/eval-generation actions, verifies the result, records checkpoints, and repeats. Covers `skill-graph evolve`, `lib/audit/skill-evolution-loop.js`, the Karpathy keep-or-revert spine, the priority signals based on Audit Status, standalone workspace flags, and the boundary between corpus walking and single-skill audit/improve/evaluate operations. Do NOT use for initial skill scaffolding alone (use skill-scaffold), single-skill schema/eval checks (use graph-audit or the audit operation), or generic evaluation rubric design (use evaluation / eval-driven-development)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this project-grounded skill.
compatibility:
  notes: "Project-grounded to Skill Graph's Node.js CLI and bundled audit implementation. Use in repositories that run or adapt @skill-graph/cli."
# allowed-tools: optional runtime hint for tools the skill may use when loaded.
allowed-tools: Read Grep Bash
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: knowledge-organization
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Running and auditing Skill Graph's corpus-level `evolve` operation: analyze a skill library, triage a priority queue, execute bounded improve/scaffold/eval-generation actions, verify the result, checkpoint progress, and repeat. Project-targeted to the Skill Graph CLI and its bundled audit implementation. Excludes initial skill scaffolding alone (skill-scaffold), single-skill schema/eval checks (graph-audit or audit), and generic evaluation rubric design (evaluation / eval-driven-development)."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: false
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. Remove when the flat `subject` is sufficient.
  taxonomy_domain: skill-system/evolution
  # project: belonging-entity references for project-targeted skills.
  # Array of {handle, role}; required in practice when public is project.
  project: '[{"handle":"skill-graph","role":"primary"}]'
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: '["skill evolution","skill-graph evolve","continuous skill improvement","auto-improve loop","skill audit queue","Karpathy keep-or-revert","audit-state priority","skill corpus walker","evolve standalone","skill improvement checkpoint"]'
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: '["skill-evolution","skill-graph evolve","audit:evolve"]'
  # paths: glob array of code surfaces this skill governs. Supports gitignore-style
  # negation. Each glob should map to one canonical skill.
  paths: '["bin/skill-graph.js","lib/audit/skill-evolution-loop.js","lib/audit/run-skill-improvement-loop.js","lib/audit/evaluate-skill.js","skill-audit-loop/SKILL_AUDIT_LOOP.md","README.md"]'
  # examples: realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: '["run the evolve loop on the top five stale skills without breaking standalone install assumptions","audit whether skill-graph evolve still reads Audit Status from audit-state.json","explain how the evolve queue chooses which skill to improve next","diagnose why the evolve loop skipped a meta skill outside the pilot lane","check whether the auto-improve loop can resume from a checkpoint after a failure"]'
  # anti_examples: near-miss prompts that should route elsewhere.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: '["audit this one skill for schema conformance","create a brand-new skill from a keyword matrix","design the scoring rubric for an application eval","why did the router choose graph-audit instead of skill-router?"]'
  # relations: typed graph edges to sibling skills. Current fields:
  # related / boundary / verify_with / depends_on / broader / narrower / disjoint_with.
  # boundary excludes listed skills from co-routing when THIS skill wins.
  relations: '{"related":["autonomous-loop-patterns","skill-infrastructure","graph-audit","skill-scaffold","evaluation","eval-driven-development"],"verify_with":["skill-infrastructure","evaluation","graph-audit"]}'
  # grounding: required when non-empty `project[]`. Declares the truth sources
  # the skill anchors to and the failure modes those sources prevent.
  grounding: '{"subject_matter":"Skill Graph evolve operation and corpus-level skill-improvement loop","grounding_mode":"repo_specific","truth_sources":["bin/skill-graph.js","lib/audit/skill-evolution-loop.js","lib/audit/run-skill-improvement-loop.js","lib/audit/evaluate-skill.js","skill-audit-loop/SKILL_AUDIT_LOOP.md","README.md"],"failure_modes":["evolve_help_drift","priority_queue_drift","audit_state_write_surface_drift","standalone_path_escape_regression","auto_improve_action_contract_drift","single_skill_audit_confused_with_corpus_walk"],"evidence_priority":"repo_code_first"}'
  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: "Skill evolution is the corpus walker around individual skill maintenance. The primitives are: a skill corpus; each skill's `SKILL.md` teaching/routing contract; each skill's `audit-state.json` Audit Status sidecar; an analyzer that turns Audit Status, scores, and registry facts into a priority queue; a triage step that selects bounded work; an executor that runs improve/scaffold/eval-generation actions; a verification step that keeps or reverts; and checkpoint logs that let the run resume. It is not one more single-skill audit command; it is the loop that decides which skill or asset to touch next and makes one bounded attempt at a time."
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: "Guarantees that a skill corpus is maintained systematically instead of only when someone notices a stale file. The loop makes skill improvement operational: analyze the current corpus, pick the riskiest or most valuable item, make one bounded change, verify it, checkpoint the result, and repeat. It reduces silent decay while protecting the corpus with keep-or-revert behavior and failure budgets."
  # boundary: what this concept is not; distinguish by mechanism, not just label.
  concept_boundary: "Not graph-audit: graph-audit inspects one skill or library artifact for schema, relation, manifest, and sidecar consistency. Not skill-scaffold: skill-scaffold creates a new skill's initial shape. Not evaluation: evaluation defines and interprets scoring. Not eval-driven-development: eval-driven-development changes a system under a test suite. Skill-evolution owns the Skill Graph corpus walker that composes those operations across many skills or assets by priority."
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Skill evolution is a maintenance dispatcher for a building: it reads each unit's inspection record, sends a technician to the highest-priority room, verifies the repair, logs the result, then chooses the next room."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: "The wrong mental model is that `evolve` is just `audit -> improve -> evaluate` hard-coded for every skill. The current Skill Graph implementation is a continuous auto-improve loop: it analyzes, triages, executes allowed action types, verifies, checkpoints, and can re-analyze until convergence or a failure budget is reached. Another wrong model is that it reads stale Health Block fields from `SKILL.md`; current Audit Status state lives in `audit-state.json` and is joined with `SKILL.md` by the tooling."
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v8
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/knowledge-organization/skill-evolution/SKILL.md
  # === Audit Status (written by the audit loop to audit-state.json, not hand-authored here) ===
  # See SKILL_AUDIT_LOOP.md § Audit Status. UNVERIFIED is the honest default.
relations:
  related: ["eval-driven-development","autonomous-loop-patterns","skill-infrastructure","graph-audit","skill-scaffold","evaluation"]
  verify_with: ["skill-infrastructure","evaluation","graph-audit"]
---

# Skill Evolution

## Concept of the skill

Skill evolution is the corpus walker around individual skill maintenance. The primitives are: a skill corpus; each skill's `SKILL.md` teaching/routing contract; each skill's `audit-state.json` Audit Status sidecar; an analyzer that turns Audit Status, scores, and registry facts into a priority queue; a triage step that selects bounded work; an executor that runs improve/scaffold/eval-generation actions; a verification step that keeps or reverts; and checkpoint logs that let the run resume.

## Coverage

Skill evolution is the project-grounded discipline for running Skill Graph's corpus-level `evolve` operation. It covers:

- The public command: `skill-graph evolve`
- The bundled implementation: `skill-graph/lib/audit/skill-evolution-loop.js`
- The action loop: analyze -> triage -> execute -> verify -> checkpoint
- The priority model: Audit Status, application verdicts, scores, registry facts, staleness, and action types
- The keep-or-revert spine for improvement actions
- Standalone workspace flags and the removal of cross-repo path assumptions
- The boundary between walking a corpus and auditing, improving, evaluating, or scaffolding one skill

This skill is project-grounded to Skill Graph. It does not teach generic habit formation, generic evaluation theory, or first-time skill authoring.

## Philosophy of the skill
Single-skill audit keeps one artifact honest. Skill evolution keeps the corpus from rotting silently. The loop exists because a large skill library has more potential drift than a human will remember to revisit.

The current implementation is not a simple hard-coded `audit -> improve -> evaluate` script. It is a continuous queue driver: analyze the current corpus, triage bounded work, execute one allowed action, verify the result, record findings/checkpoints, and optionally re-analyze. That shape matters because the queue can include different action types, and because a failed change must leave the corpus no worse than before.

Audit Status state lives in `audit-state.json`, not in `SKILL.md` frontmatter. `SKILL.md` teaches the skill; the sidecar records what the audit loop has proven about it. The evolve loop must preserve that split.

## Key Files

| Workspace-relative file | Purpose |
|---|---|
| `skill-graph/bin/skill-graph.js` | Public CLI surface for `skill-graph evolve`, help text, bundled-script mapping, and standalone requirements. |
| `skill-graph/lib/audit/skill-evolution-loop.js` | Current corpus walker: analyze, triage, execute, verify, checkpoint, continuous mode, pilot lanes, failure budget. |
| `skill-graph/lib/audit/run-skill-improvement-loop.js` | Improvement executor used for bounded skill edits and keep-or-revert behavior. |
| `skill-graph/lib/audit/evaluate-skill.js` | Evaluation runner that writes eval and behavior verdict state to `audit-state.json`. |
| `skill-graph/skill-audit-loop/SKILL_AUDIT_LOOP.md` | Binding operation doctrine: audit, improve, evaluate, evolve, write surfaces, and Behavior Gate semantics. |
| `skill-graph/README.md` | User-facing standalone install, smoke-test, `evolve` flags, and exit-code guidance. |

## 1. The Corpus Walker

The current `evolve` operation is a corpus queue driver:

```text
analyze current skill library
triage top items by priority and allowed actions
execute one bounded action per item
verify the result
checkpoint progress and findings
repeat when continuous mode is enabled
```

The important operational guarantees are:

- **Bounded work:** `--top`, `--max-cycles`, `--max-iterations`, `--min-priority`, `--actions`, and `--pilot` constrain the run.
- **Failure containment:** `--failure-budget` stops repeated failures instead of letting the run thrash.
- **Resumability:** checkpoints let interrupted runs continue.
- **Standalone operation:** `--workspace-root`, `--skills-dir`, and `--output-dir` make the loop work outside the original Development monorepo.
- **Meta-skill protection:** the implementation filters or gates meta skills unless an explicit pilot lane permits them.

## 2. Relationship to the Four Operations

| Operation | Unit of work | Writes |
|---|---|---|
| `audit` | One skill's Integrity Gate and optional graded checks | `audit-state.json` plus evidence artifacts |
| `improve` | One bounded edit to one skill or asset | `SKILL.md` or eval artifact, then keep-or-revert |
| `evaluate` | One skill's eval suite | `audit-state.json` verdicts, scores, and receipts |
| `evolve` | A prioritized corpus queue | The same writes as the operations/actions it invokes |

Use `audit`, `improve`, or `evaluate` when the target skill is already known. Use `evolve` when the work is to walk the corpus by priority, keep progress resumable, and decide which skill or asset should be improved next.

## 3. Priority Signals

The queue is not a telemetry crawler. It reads structured skill state and registry facts. Important signals include:

- `application_verdict`: unverified or negative behavior signals raise priority.
- `structural_verdict` and `truth_verdict`: failing Integrity Gate slices raise priority.
- `last_audited`: older audit state raises priority.
- `eval_score`: missing or lower scores raise priority when available.
- Registry/pilot metadata: some meta skills are frozen unless a specific pilot lane is active.

The exact queue formula belongs to `skill-graph/lib/audit/skill-evolution-loop.js`; this skill teaches the operating model and the safety boundaries, not a duplicated formula.

## 4. Commands

```bash
# Process a bounded queue
skill-graph evolve --top 5 --max-cycles 3

# Re-analyze and repeat until the cycle cap, convergence, or failure budget
skill-graph evolve --continuous --max-cycles 20 --min-priority 5

# Run the full auto-improve spine
skill-graph evolve --auto-improve --max-cycles 3 --failure-budget 5

# Analyze without executing improvements
skill-graph evolve --analyze-only

# Resume from a checkpoint
skill-graph evolve --resume

# Standalone workspace
skill-graph evolve --workspace-root /path/to/my-skills --skills-dir /path/to/my-skills/skills --output-dir /path/to/my-skills/audits
```

Exit codes:

| Code | Meaning |
|---|---|
| `0` | Loop completed successfully, or `--analyze-only` finished. |
| `1` | Fatal error: missing dependency, unresolvable skill root, invalid workspace, or equivalent setup failure. |
| `2` | Failure budget exceeded. |

## Evals

This skill includes a sibling comprehension eval file for audit-loop grading. Keep `eval_state: unverified` until the eval is run by an independent grader and produces a receipt.

## Verification

After applying this skill, verify:

- [ ] `skill-graph evolve --help` names the same flags and exit codes this skill teaches.
- [ ] The implementation path in `skill-graph/bin/skill-graph.js` points to `skill-graph/lib/audit/skill-evolution-loop.js`.
- [ ] Audit/eval/provenance writes are described as `audit-state.json` writes, not `SKILL.md` frontmatter writes.
- [ ] The skill distinguishes corpus walking from one-skill audit, improve, evaluate, and scaffold work.
- [ ] Local truth-source drift is PASS when hashes are recorded, or UNVERIFIED when hashes are absent.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Auditing one specific skill for schema, relations, sidecar, or manifest consistency | `graph-audit` or the `audit` operation | Skill-evolution owns the corpus queue, not one artifact's static consistency. |
| Creating a new skill from scratch | `skill-scaffold` | Scaffolding owns the initial skill shape; evolve may invoke scaffold-like actions inside a queue. |
| Designing or interpreting a scoring rubric | `evaluation` or `eval-driven-development` | Skill-evolution decides when to invoke evaluation, not how evaluation is designed. |
| Choosing which skill should route for a user request | `skill-router` | Routing picks an owner skill for a request; evolve picks maintenance work for a corpus. |

## Key Sources

- `skill-graph/bin/skill-graph.js` — public command contract.
- `skill-graph/lib/audit/skill-evolution-loop.js` — current implementation.
- `skill-graph/lib/audit/run-skill-improvement-loop.js` — keep-or-revert executor.
- `skill-graph/lib/audit/evaluate-skill.js` — evaluation and sidecar write behavior.
- `skill-graph/skill-audit-loop/SKILL_AUDIT_LOOP.md` — operation doctrine.
- `skill-graph/README.md` — user-facing standalone usage.
