---
name: merge-queue
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when serializing merges across multiple agent branches, resolving conflicts between agent outputs, or cleaning stale task branches. Covers atomic locking, idempotency checks, non-fast-forward handling, and worktree cleanup. Do NOT use for ordinary git operations outside an agent merge queue (use `version-control`)."
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
  scope: "Teaches serialized merge control for parallel agent branches: exclusive merge locking, idempotent retry, branch freshness checks, non-fast-forward merge discipline, stale worktree cleanup, and queue event recording. Project-oriented but portable to any multi-agent git workflow. Excludes ordinary single-branch git operations and commit-message/history policy outside a shared merge queue."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/git
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
  keywords: ["merge queue","atomic lock","idempotency","no-ff merge","worktree cleanup","agent branch","master merge"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["merge-queue","agent-merge"]
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
  skill_graph_canonical_skill: skills/software-engineering-method/merge-queue/SKILL.md
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
  related: ["version-control"]
  suppresses: ["version-control"]
---
# Merge Queue (Serialized Commit Control)

## Concept of the skill

Use when serializing merges across multiple agent branches, resolving conflicts between agent outputs, or cleaning stale task branches.


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

## Philosophy of the skill
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
| Ordinary branching, rebasing, committing, or tag management | `version-control` | Version-control owns general git history shape; this skill owns only serialized agent-branch integration. |
| Reviewing whether a branch's code is correct before merge | `code-review` | Code-review owns behavioral approval; this skill owns the queue mechanics after a branch is ready. |
| Explaining what changed in a branch or patch | `diff-analysis` | Diff-analysis owns patch interpretation; this skill owns merge ordering, locks, and cleanup. |
| Investigating a failed test or production bug after merge | `debugging` | Debugging owns failure localization; this skill only preserves merge order and records queue state. |


## Verification

After applying this skill, verify:
- [ ] Changes follow the patterns documented above
- [ ] No regressions in affected functionality
