---
name: merge-queue
description: "Use when serializing integration of multiple ready branches or agent outputs into a protected target branch; designing or operating a merge queue, merge train, or local queue script; preventing concurrent merges from invalidating CI; handling already-merged branches, stale locks, failed required checks, conflicts, and cleanup after queued work. Provides a portable queue workflow: classify the queue surface, verify target-branch freshness, acquire a single-writer lock or platform queue slot, validate the speculative merged result with required checks, merge only the validated result, release the lock, and clean branch/worktree state. Do NOT use for ordinary commit hygiene, branch naming, rebase-vs-squash policy, or one-off merge conflict resolution outside a queue (use version-control), for reviewing change content before merge (use code-review), or for deciding the test suite itself (use testing-strategy)."
license: MIT
compatibility:
  notes: "Portable merge-queue workflow. Applies to hosted merge queues, merge trains, custom local queue scripts, and multi-agent branch integration systems. Substitute the local target branch, branch naming convention, lock store, CI provider, and cleanup command; do not assume any one repository's script path, lock path, or default branch name."
allowed-tools: Read Grep Bash
grounding:
  domain_object: "Merge queue discipline for serialized target-branch integration and speculative validation"
  grounding_mode: "universal"
  truth_sources:
    - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue
    - https://docs.gitlab.com/ci/pipelines/merge_trains/
    - https://buildkite.com/docs/pipelines/tutorials/github-merge-queue
  failure_modes:
    - branch_merged_without_revalidating_against_current_target
    - multiple_agents_or_pull_requests_merge_concurrently
    - stale_lock_blocks_queue_or_is_removed_without_process_check
    - failing_or_conflicting_entry_remains_in_queue
    - cleanup_deletes_unmerged_or_unverified_work
    - queue_status_claims_are_made_without_read_only_verification
  evidence_priority: "equal"
drift_check:
  last_verified: "2026-05-19"
metadata:
  schema_version: 6
  version: "1.1.0"
  type: workflow
  category: engineering
  domain: engineering/version-control
  scope: portable
  owner: skill-graph-maintainer
  freshness: "2026-05-19"
  drift_check: '{"last_verified":"2026-05-19"}'
  eval_artifacts: planned
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: experimental
  keywords: '["merge queue","merge train","serialized merge","target branch protection","speculative merge","merge group","required status checks","agent branch integration","atomic merge lock","single-writer merge","idempotent merge","non-fast-forward merge","merge conflict dequeue","stale lock recovery","worktree cleanup","queue status","merge_group webhook","parallel agent branches","queued pull request integration","two agents finished branches","serialize merge into main","concurrent merges","agent branch merge","validated merged result"]'
  examples: '["two agents finished branches at the same time; serialize the merge safely","the protected branch has a merge queue and a PR was removed after failing checks -- explain the recovery path","design a local queue script for agent/TASK-1234 branches without concurrent merges","check whether a stale merge lock is blocking the queue before removing it","a queued branch already merged; make the merge command idempotent","clean up a stale worktree only after proving the branch was merged or intentionally abandoned","compare our local queue behavior with GitHub merge groups or GitLab merge trains","what should happen when CI fails for an entry in the middle of the merge queue?"]'
  anti_examples: '["write a better commit message for this branch","should this repository use squash merge or rebase merge generally?","review the PR code before it enters the queue","resolve this one merge conflict by editing the file","decide which test suite should be required by branch protection","delete all old branches from the repo without checking queue state"]'
  relations: '{"boundary":[{"skill":"version-control","reason":"version-control owns general git history shape, branch lifecycle, path-limited commits, rebase/squash policy, and ordinary conflict handling; merge-queue owns the serialized integration protocol for multiple ready branches competing for the same protected target branch."},{"skill":"code-review","reason":"code-review evaluates whether the change content is correct before it enters the queue; merge-queue assumes the candidate is ready and verifies whether the candidate still composes with the current target branch and earlier queued entries."},{"skill":"testing-strategy","reason":"testing-strategy decides which checks are sufficient; merge-queue requires the selected checks to run on the speculative merged result and defines what to do when they fail."}],"related":["version-control","code-review","testing-strategy"],"verify_with":["version-control","testing-strategy"]}'
  grounding: '{"domain_object":"Merge queue discipline for serialized target-branch integration and speculative validation","grounding_mode":"universal","truth_sources":["https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue","https://docs.gitlab.com/ci/pipelines/merge_trains/","https://buildkite.com/docs/pipelines/tutorials/github-merge-queue"],"failure_modes":["branch_merged_without_revalidating_against_current_target","multiple_agents_or_pull_requests_merge_concurrently","stale_lock_blocks_queue_or_is_removed_without_process_check","failing_or_conflicting_entry_remains_in_queue","cleanup_deletes_unmerged_or_unverified_work","queue_status_claims_are_made_without_read_only_verification"],"evidence_priority":"equal"}'
  portability: '{"readiness":"scripted","targets":["skill-md"]}'
  lifecycle: '{"stale_after_days":180,"review_cadence":"quarterly"}'
  mental_model: |
    A merge queue is a single-writer gate in front of a protected branch. Each queued entry must be tested as if it had already been applied after the target branch and any earlier queue entries. The queue is not just a line of branches; it is a sequence of speculative target-branch states. The safe merge is the state that passed checks, not merely the branch that passed checks before it joined the queue.
  purpose: |
    This skill prevents integration races. It gives agents and maintainers a disciplined way to serialize ready work, prove that each queued result still composes with the current target branch, and clean up without deleting unmerged work or letting stale locks block progress indefinitely.
  boundary: |
    This skill owns queue protocol and queue failure handling. It does not own ordinary git style, commit authoring, branch naming conventions, content review, CI policy design, or low-level conflict editing outside the queued integration context.
  analogy: "A merge queue is an airlock for the target branch: only one validated merged state enters at a time, and anything that fails pressure testing is removed before the door opens."
  misconception: "The common mistake is treating a green source branch as safe to merge. It is safe only after checks run against the current target branch plus the queued entries ahead of it."
  concept: '{"definition":"A merge queue serializes integration into a protected target branch by validating each candidate against the target branch and earlier queued candidates before merge.","mental_model":"Treat the queue as a sequence of speculative target-branch states. The unit being validated is the merged result, not the isolated branch.","purpose":"It prevents concurrent integrations from invalidating each other and gives deterministic recovery for failed checks, conflicts, stale locks, and cleanup.","boundary":"It does not replace version-control policy, code review, testing strategy, or manual conflict resolution; it orchestrates those gates around queued target-branch integration.","taxonomy":"Queue surfaces: hosted merge queue, merge train, local queue script. Queue phases: preflight, lock or queue-slot acquisition, target refresh, speculative validation, merge, event/log record, cleanup, release. Failure states: missing branch, already merged, failing checks, conflicts, stale lock, cleanup refusal.","analogy":"It is an airlock for mainline integration: the merged state is tested before it enters the protected branch.","misconception":"A branch being green before it joins the queue is insufficient evidence because the target branch or earlier queued entries may change the combined result."}'
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/engineering/merge-queue/SKILL.md
---

# Merge Queue

## Coverage

A portable workflow for serialized integration into a protected target branch. Covers hosted merge queues, GitLab-style merge trains, local queue scripts, and multi-agent branch integration. Use this skill when the hard part is queue correctness: only one validated merged state reaches the target branch, failed entries are removed or retried safely, stale locks are handled deliberately, and branch/worktree cleanup never deletes unmerged work by accident.

This skill is intentionally narrower than general version control. It starts after a branch or pull request is considered ready for integration and ends when the queue has either merged the validated result, removed the entry, or stopped for human conflict resolution.

## Philosophy

Merge queues exist because isolated success is weak evidence. A branch can pass tests by itself and still break the protected branch when another ready branch lands first. The queue changes the unit of verification from "this branch is green" to "this branch still works when applied to the exact target state it would merge into."

The core invariant is single-writer integration of validated merged results. Whether the implementation is GitHub merge groups, GitLab merge trains, a local script, or a human-run queue, the protected branch should receive only a state that has been checked against the current target plus the queued work ahead of it. Locks, queue slots, temporary branches, and cleanup commands are implementation details that serve that invariant.

Cleanup is part of correctness, not housekeeping. Deleting a branch or worktree before proving merge, idempotency, or authorized abandonment can destroy evidence and strand work. A good merge queue is conservative: it stops loudly on missing candidates, failed checks, conflicts, stale locks, or unverifiable cleanup.

## Grounding

This skill is grounded in three public merge-queue patterns:

- GitHub merge queues validate pull request changes with the current target branch and queued changes ahead of them before merging.
- GitLab merge trains validate merge requests in queue order with merged-result pipelines and expose queue position, removal, and skip behavior.
- Buildkite's GitHub merge queue support treats merge groups as distinct CI inputs and relies on merge-group webhook events so required checks apply to the speculative merged result.

The portable rule is the same across platforms: validate the combined result that would land on the target branch. Do not treat a green branch, isolated PR build, or stale queue status as sufficient evidence.

## Core Model

A merge queue has four moving parts:

| Part | Role | Verification question |
|---|---|---|
| Candidate branch or pull request | The ready change waiting to merge | Does it still exist, and is it intended for this target branch? |
| Target branch | The protected branch receiving the queue | Is the queue based on the latest target state? |
| Speculative merged result | Candidate plus target plus earlier queue entries | Did required checks pass on this exact combined result? |
| Queue state | Lock, queue slot, train position, event log, and cleanup state | Is one integration happening at a time, and is stale state handled safely? |

## Workflow

### 1. Classify the Queue Surface

Name the queue implementation before acting:

| Surface | Use when | Evidence to read first |
|---|---|---|
| Hosted merge queue | GitHub or another forge manages queue entries | Queue status, branch protection, required checks, merge-group status |
| Merge train | GitLab-style train validates queued merge requests | Train position, merged-result pipeline, dropped-entry reason |
| Local queue script | A repository script serializes agent or contributor branches | Script help/status output, target branch setting, lock strategy, cleanup behavior |
| Manual queue | A maintainer is serializing branches by convention | Written runbook, current target branch hash, branch list, required checks |

Do not proceed from memory. Run a read-only status command or inspect the forge queue state before claiming the queue is free, blocked, or safe to clean.

### 2. Preflight the Candidate

Before adding or merging an entry, verify:

- Candidate branch or pull request exists.
- Candidate targets the expected protected branch.
- Candidate has already passed the pre-queue readiness gate required by the repo, such as review approval or source-branch CI.
- No human hold, freeze label, unresolved conversation, or explicit block applies.
- The queue tool can identify the candidate idempotently, such as by branch name, pull request number, or task id.

If the candidate is already merged, stop and move to cleanup. A second merge attempt is a bug unless the tool proves idempotency first.

### 3. Acquire the Queue Gate

Use the platform queue slot or a local single-writer lock. The gate must be atomic: two agents or maintainers must not be able to decide simultaneously that they own the target branch.

For a local script, verify the lock behavior rather than assuming it:

- Lock acquisition uses an atomic primitive or a platform queue slot.
- Lock release is attached to process exit or failure cleanup.
- Stale-lock detection checks whether the owning process or queue run is still alive.
- Manual stale-lock removal is explicit and logged.

Do not remove a stale lock merely because it is old. Age is a signal; process or platform state is the evidence.

### 4. Validate the Speculative Result

Refresh the target branch or queue base, then validate the combined state:

1. Build the speculative result from target branch plus earlier queued entries plus the candidate.
2. Run the required checks against that combined result.
3. Treat failing required checks, timeout, branch-protection failure, or conflicts as a dequeue/stop condition.
4. If an earlier queued entry is removed, invalidate and rebuild later speculative results.

This is the center of the skill. The queue is correct only if the exact result that would land on the target branch has passed the required checks.

### 5. Merge Only the Validated Result

When checks pass, merge the validated result using the repository's chosen integration method. A local agent queue may use non-fast-forward merges to preserve branch history; a hosted queue may use the repository's merge method. The method is less important than the invariant: the target branch receives the validated result, not a stale source branch.

Record enough provenance for later audit:

- Candidate identifier
- Target branch and target hash used for validation
- Queue position or lock owner
- Required check result identifiers
- Merge commit or resulting target hash
- Cleanup actions taken

### 6. Cleanup Deliberately

Cleanup is allowed only after one of these is true:

- Candidate merged successfully and the resulting target hash is recorded.
- Candidate was already merged and idempotency was proven.
- Candidate was intentionally abandoned or removed from the queue by an authorized operator.
- Human operator explicitly requested cleanup after reviewing unmerged work.

Cleanup may include deleting local branches, pruning worktrees, removing temporary queue branches, or canceling redundant CI. Never let cleanup be the first action in a queue operation.

## Failure Handling

| Failure | Required behavior |
|---|---|
| Missing candidate branch | Fail before acquiring the merge gate if possible. |
| Already merged candidate | Skip merge, verify idempotency, then cleanup if safe. |
| Queue lock held | Wait, report owner/status, or stop after a bounded timeout. |
| Stale lock suspected | Verify process/platform state before removal. |
| Target refresh fails | Stop before merge; do not merge against a stale target. |
| Required checks fail | Remove or hold the candidate according to platform policy; rebuild later queue results. |
| Merge conflict | Stop for human resolution; do not auto-resolve inside queue logic. |
| Cleanup fails | Report residual branch/worktree state; do not claim the queue is clean. |

## Local Script Mode

When the repository has a local merge-queue script, treat it as an implementation of the portable workflow rather than as the skill itself.

Before using it, inspect:

- `--help` or usage output
- read-only status command
- target branch assumption
- branch naming convention
- lock acquisition and release behavior
- idempotency check
- conflict behavior
- event/log emission
- cleanup command and fallback behavior

Use script commands only after the queue surface is understood. A safe local queue normally offers commands shaped like:

```bash
queue status
queue merge --task TASK-1234 --summary "short integration summary"
queue cleanup --task TASK-1234
```

Substitute the actual script path and flags from repository truth. Do not copy command examples from this skill into a repo without checking the local script.

## Verification

After applying this skill, verify:

- [ ] Queue surface is named: hosted merge queue, merge train, local queue script, or manual queue.
- [ ] Queue status was read from a tool or forge state before action.
- [ ] Candidate existence and target branch were verified.
- [ ] The target branch or queue base was current at validation time.
- [ ] Required checks ran on the speculative merged result, not only on the isolated source branch.
- [ ] Any lock or queue slot was acquired atomically and released on failure.
- [ ] Already-merged candidates are skipped idempotently.
- [ ] Failed checks, conflicts, or branch-protection failures remove/hold the candidate rather than merging it.
- [ ] Cleanup happens only after merge, proven idempotency, authorized removal, or explicit human cleanup instruction.
- [ ] Final report names residual branches, worktrees, queue entries, locks, or unverified checks.

## Do NOT Use When

| Use instead | When |
|---|---|
| `version-control` | General git workflow, branch strategy, rebase vs squash policy, path-limited commits, release tags, or ordinary conflict handling. |
| `code-review` | Evaluating whether the change content is correct before it enters the queue. |
| `testing-strategy` | Deciding which checks should be required before queue merge. |
| `naming-conventions` | Choosing branch names, commit-message wording, or queue-entry naming conventions. |
| A platform-specific deployment skill | Debugging CI provider setup, webhook delivery, or protected-branch configuration outside the queue protocol. |
