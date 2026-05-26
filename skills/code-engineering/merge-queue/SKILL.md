---
name: merge-queue
description: "Use when serializing merges across multiple agent branches, resolving conflicts between agent outputs, or cleaning stale task branches. Covers atomic locking, idempotency checks, non-fast-forward handling, and worktree cleanup. Do NOT use for ordinary git operations outside an agent merge queue (use `version-control`)."
license: MIT
compatibility:
  notes: "Markdown, Git, agent-skill runtimes"
allowed-tools: Read Grep Bash
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"

  # === v7 Classification (DEPRECATED 2026-05-26 — kept for back-compat only) ===
  # type: v7 classification — DEPRECATED, replaced by `operation`.
  # Legacy values: capability / workflow / router / overlay.
  type: workflow
  # operation: cognitive operation enabled (Bloom-grounded). One of four closed values:
  # know (declarative — concepts, vocabulary, reference) /
  # do (procedural — step-by-step execution) /
  # decide (judgment — choosing, dispatching) /
  # modify (context injection — shapes how other skills execute).
  operation: do
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: engineering

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: code-engineering
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: engineering/git
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-04-01"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-04-01\"}"

  # === Eval-health: three orthogonal axes ===
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
  keywords: "[\"merge queue\",\"atomic lock\",\"idempotency\",\"no-ff merge\",\"worktree cleanup\",\"agent branch\",\"master merge\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"merge-queue\",\"agent-merge\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"version-control\"],\"boundary\":[\"version-control\"]}"
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
  skill_graph_canonical_skill: skills/merge-queue/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: UNVERIFIED
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: UNVERIFIED
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
---
# Merge Queue (Serialized Commit Control)

## Domain Context

**What is this skill?** This skill manages the serialized merge queue for agent branches. Covers atomic locking, idempotency checks, non-fast-forward merges, and worktree cleanup. Use when merging multiple agent tasks to master, resolving merge conflicts between agents, or cleaning up stale task branches. Do NOT use for standard git operations (use version-control).

## Coverage

This skill manages the serialized merge queue for agent branches. The sections below contain the detailed rules, examples, and boundaries for using this skill correctly.

## Key Files

| File | Purpose |
|---|---|
| `scripts/agent/merge-queue.sh` | The primary CLI for managing the queue. |
| `agent-orchestration/logs/events.jsonl` | Emits `merge_started` and `merge_completed` events. |
## Workflow

Use the ordered phases, checklists, and guardrails in the sections below as the canonical workflow for this skill. When multiple subsections describe steps, follow them in the order presented.

## Queue Coverage

Atomic merge locking (`merge.lock`), branch idempotency checks, `--no-ff` (non-fast-forward) merge policy, automated worktree and branch cleanup, and event emission.

> The "Gatekeeper" for the master branch. Prevents agents from causing race conditions during the final commit phase.

## Philosophy

Merge queues exist to protect the main branch from concurrent merge failures. When multiple agents modify overlapping code simultaneously, merging them independently creates a false sense of safety — each agent's work may pass CI alone but break when combined. A merge queue serializes merges, ensuring every commit is tested against the current state of main plus all queued predecessors before pushing. The result is a main branch that is always in a known-good state, with clear task-level history preserved via non-fast-forward commits. This prevents both silent conflicts (where two agents unwittingly overwrite each other's work) and long debugging sessions trying to untangle which merge introduced a regression.

## 1. The Merge Protocol

To prevent merge conflicts and history pollution, all agents must submit their finished tasks to the merge queue.

| Phase | Action | Tool |
|---|---|---|
| **Lock** | Acquire `merge.lock` | `scripts/agent/merge-queue.sh` (merge subcommand) |
| **Verify** | Check branch state | Verify branch is up to date with master and passes tests. |
| **Merge** | Non-FF Merge | Merge with `--no-ff` to preserve task history. |
| **Cleanup** | Delete branch/worktree | Remove the git worktree and the remote task branch. |
| **Release** | Release `merge.lock` | Allow the next agent in the queue to proceed. |

## 2. Clever Features (Stolen from Merge Queue)

- **Atomic Lock**: Only one agent can merge at a time, ensuring that master is always in a known good state.
- **Idempotency**: If a merge fails halfway, the queue can be resumed without creating duplicate commits.
- **Automated Cleanup**: Once a merge is successful, the `merge-queue.sh` automatically deletes the task-specific worktree (`/tmp/worktrees/SH-XXXX`) to save disk space.

## 3. Managing the Queue

- **Submit Merge**: `bash scripts/agent/merge-queue.sh merge --task SH-XXXX`
- **Check Status**: `bash scripts/agent/merge-queue.sh status`
- **Cleanup Manually**: `bash scripts/agent/merge-queue.sh cleanup --task SH-XXXX`

## 4. Key Files

| File | Purpose |
|---|---|
| `scripts/agent/merge-queue.sh` | The primary CLI for managing the queue. |
| `.git/merge.lock` | (Virtual) The lock file preventing concurrent merges. |
| `agent-orchestration/logs/events.jsonl` | Emits `merge_started` and `merge_completed` events. |

## 5. Verification Protocol

- **Lock Test**: Try to start two merges simultaneously; the second should wait or fail.
- **Master Integrity**: Verify that master only contains `--no-ff` merge commits for agent tasks.
- **Disk Space**: Verify that the `/tmp/worktrees/` directory is pruned after successful merges.


## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| (To be filled during next audit pass) | — | — |


## Verification

After applying this skill, verify:
- [ ] Changes follow the patterns documented above
- [ ] No regressions in affected functionality
