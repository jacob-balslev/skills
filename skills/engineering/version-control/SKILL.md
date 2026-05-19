---
name: version-control
description: "Use when designing or maintaining repository history shape: branching model, rebase vs merge policy, atomic commit boundaries, path-limited commits, tracker provenance, release tags, hotfix branches, worktree isolation, force-push safety, and ordinary merge-conflict strategy. Covers trunk-based development, short-lived feature branches, commit transaction boundaries, annotated release tags, SemVer-tag discipline, hotfix flow, worktree lifecycle, and recovery from stale or contaminated history. Do NOT use for commit-message wording or Conventional Commit type semantics (use semantics or naming-conventions), merge-queue serialization (use merge-queue), PR content review (use code-review), patch interpretation (use diff-analysis), destructive-command authorization (use guardrails or intent-recognition), or release-pipeline debugging (use debugging)."
license: MIT
compatibility:
  notes: "Git-centric and provider-agnostic. Patterns translate to other DAG-based version-control systems with tool-specific substitutions. Centralized systems without cheap branching, local commits, or DAG rewriting need a different operational model. Substitute local default branch names, ticket formats, forge settings, and release policies."
allowed-tools: Read Grep Bash
grounding:
  domain_object: "Repository history, branch integration, release tagging, and worktree isolation discipline"
  grounding_mode: "universal"
  truth_sources:
    - https://git-scm.com/docs/git-commit
    - https://git-scm.com/docs/git-worktree.html
    - https://git-scm.com/docs/git-tag.html
    - https://git-scm.com/docs/git-push.html
    - https://semver.org/
    - https://trunkbaseddevelopment.com/short-lived-feature-branches/
  failure_modes:
    - multi_purpose_commit_cannot_be_reverted_cleanly
    - long_lived_branch_drift_creates_large_integration_cost
    - unverified_force_push_overwrites_remote_history
    - standard_commit_includes_unrelated_staged_files
    - release_tag_is_lightweight_or_untraceable
    - hotfix_not_reconciled_back_to_mainline
    - worktree_cleanup_or_branch_delete_loses_unmerged_work
  evidence_priority: "equal"
drift_check:
  last_verified: "2026-05-19"
metadata:
  schema_version: 6
  version: "1.2.0"
  type: capability
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
  keywords: '["version control","git workflow","repository history","history shape","branching strategy","trunk-based development","short-lived branch","feature branch","merge vs rebase","rebase branch","squash merge","linear history","atomic commit","commit boundary","path-limited commit","git commit --only","staged files contamination","tracker provenance","release tag","annotated tag","semantic version tag","SemVer release","hotfix branch","cherry-pick hotfix","force-with-lease","git worktree","worktree cleanup","parallel branch development","merge conflict strategy","protected branch policy","mainline integration"]'
  triggers: '["version-control","version-control-skill","git workflow","branching strategy","merge vs rebase","atomic commit","path-limited commit","release tagging","hotfix workflow","worktree isolation"]'
  examples: '["set up trunk-based development for a four-person team","this branch is two weeks behind main -- rebase, merge, or recreate it?","split this commit plan into atomic commits before merge","two agents are sharing one repo and staged files leaked into the wrong commit","use path-limited commits so unrelated staged files do not land","tag the v1.2.0 release with provenance back to the release record","design a hotfix workflow from the last release tag and reconcile it to main","should this feature branch squash, rebase, or merge into main?","clean up an abandoned worktree without deleting unmerged work","when is force-with-lease acceptable after a rebase?"]'
  anti_examples: '["write the Conventional Commit subject for this change","choose whether this is a feat or fix commit type","review this PR for correctness before merge","read this git diff and summarize the behavior change","serialize ten ready branches through a merge queue","is it safe to run git reset --hard right now?","debug why the release pipeline failed after tag creation","name this branch or database column"]'
  relations: '{"boundary":[{"skill":"semantics","reason":"semantics owns Conventional Commit type meaning, SemVer compatibility meaning, and whether a version bump accurately communicates API change; version-control owns the repository history and tag workflow that carries those signals."},{"skill":"naming-conventions","reason":"naming-conventions owns the words and format inside commit messages, branch names, and identifiers; version-control owns commit boundaries, branch lifecycle, and history shape."},{"skill":"merge-queue","reason":"merge-queue owns serialized integration of multiple ready branches into a protected target branch; version-control owns ordinary branch strategy, rebase/squash policy, path-limited commits, tags, and one-off conflict handling."},{"skill":"code-review","reason":"code-review evaluates change content before merge; version-control evaluates the shape and traceability of the history that will remain after merge."},{"skill":"diff-analysis","reason":"diff-analysis interprets an already-produced patch; version-control decides how that patch should be committed, rebased, split, tagged, or integrated."},{"skill":"guardrails","reason":"guardrails blocks or escalates high-risk git actions such as hard reset, branch deletion, and destructive force-push; version-control describes routine git discipline and safer defaults."},{"skill":"intent-recognition","reason":"intent-recognition classifies the risk of a specific tool action immediately before execution; version-control provides the workflow model behind routine git choices."},{"skill":"debugging","reason":"debugging investigates failures after a git, CI, or release action breaks; version-control designs the history and release workflow before failure."}],"related":["merge-queue","semantics","naming-conventions","code-review","diff-analysis","guardrails","intent-recognition","debugging"],"verify_with":["code-review","guardrails","semantics"]}'
  grounding: '{"domain_object":"Repository history, branch integration, release tagging, and worktree isolation discipline","grounding_mode":"universal","truth_sources":["https://git-scm.com/docs/git-commit","https://git-scm.com/docs/git-worktree.html","https://git-scm.com/docs/git-tag.html","https://git-scm.com/docs/git-push.html","https://semver.org/","https://trunkbaseddevelopment.com/short-lived-feature-branches/"],"failure_modes":["multi_purpose_commit_cannot_be_reverted_cleanly","long_lived_branch_drift_creates_large_integration_cost","unverified_force_push_overwrites_remote_history","standard_commit_includes_unrelated_staged_files","release_tag_is_lightweight_or_untraceable","hotfix_not_reconciled_back_to_mainline","worktree_cleanup_or_branch_delete_loses_unmerged_work"],"evidence_priority":"equal"}'
  portability: '{"readiness":"scripted","targets":["skill-md"]}'
  lifecycle: '{"stale_after_days":180,"review_cadence":"quarterly"}'
  mental_model: |
    Version control is the transaction log of a codebase. Each commit, branch, tag, and rewrite should preserve three things future maintainers need under pressure: what changed, why it changed, and how to reverse or replay it without dragging unrelated work along.
  purpose: |
    This skill keeps repository history useful as operational evidence. It helps agents and developers choose branch lifetimes, commit boundaries, integration method, tag form, hotfix path, worktree isolation, and safe rewrite behavior before history becomes expensive to repair.
  boundary: |
    This skill owns repository history shape and routine Git workflow decisions. It does not own commit-message wording, semantic version meaning, queue serialization, PR correctness review, patch interpretation, destructive-action authorization, or CI/release failure debugging.
  analogy: "Version control is accounting for code changes: each commit is a ledger entry, each tag is a period close, and each rewrite needs controls so the books still reconcile."
  misconception: "The common mistake is treating Git as file backup. Git is coordination infrastructure; messy history, long-lived branches, unsafe force pushes, and mixed-purpose commits create future operational risk."
  concept: '{"definition":"Version-control discipline designs the shape, provenance, and recoverability of repository history: branches, commits, tags, worktrees, rebases, merges, force pushes, and hotfix paths.","mental_model":"Treat each commit as an atomic transaction and each branch as temporary integration debt. The longer the branch lives and the more mixed the commit, the higher the future merge, review, and rollback cost.","purpose":"It makes history readable, reversible, auditable, and safe for parallel contributors or agents.","boundary":"It does not own commit wording, SemVer meaning, PR content review, merge queue serialization, diff interpretation, destructive-command authorization, or release-pipeline debugging.","taxonomy":"Surfaces: branches, commits, tags, worktrees, remotes, merge conflicts, force pushes, hotfixes. Decisions: branch model, branch lifetime, commit boundaries, path scope, integration method, tag type, release reconciliation, cleanup safety.","analogy":"It is accounting for code changes: every ledger entry should balance and be traceable.","misconception":"A green branch or successful local commit is not enough; the history must remain readable, reversible, and safe to integrate."}'
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/engineering/version-control/SKILL.md
---

# Version Control

## Coverage

Use this skill for repository history and Git workflow decisions: branching model, branch lifetime, rebase vs merge, commit boundaries, path-limited commits, provenance links, annotated release tags, hotfix branches, worktree isolation, force-push safety, and ordinary merge-conflict strategy.

The skill is about the shape and recoverability of history, not the prose inside a commit message. A complete version-control decision names the branch model, the integration method, the commit boundary rule, the provenance convention, the release/tag policy if relevant, and the safety gate for any history rewrite.

## Philosophy

Repository history is a decision log. When the log is noisy - accidental merge commits, mixed-purpose commits, missing provenance, month-old branches, lightweight release tags, or force pushes without a lease - the team loses the ability to answer two pressure questions: why did this change, and can I reverse only this change without taking unrelated work with it?

Every commit is a transaction future maintainers may need to read or revert in a hurry. The discipline is to keep transactions small, attributed, and reversible. A commit that combines a refactor with a bug fix cannot be reverted cleanly when the fix is wrong; a commit without provenance forces later readers into archaeology.

History cleanup has asymmetric cost. Cleanup before merge is cheap: split commits, rebase, squash, edit local branch history, or recreate an old branch. Cleanup after merge is expensive: coordinated rewrites, force pushes, broken references, and possible data loss. Push history hygiene left while the branch is still private or review-bound.

Parallel-agent and multi-session work adds one more invariant: the Git index is shared inside one working tree. A normal commit can pick up unrelated staged files from another session. In shared or dirty repos, use path-limited commits and verify the committed file list.

## Grounding

This skill is grounded in public Git and release-management behavior:

- Git commit documentation says committing named pathspecs records the current content of those paths and ignores other staged index content, which grounds path-limited commit discipline.
- Git worktree documentation models linked worktrees as separate working directories with private worktree metadata, which grounds parallel branch isolation and cleanup requirements.
- Git tag documentation distinguishes annotated release tags from lightweight temporary labels, which grounds release-tag policy.
- Git push documentation defines --force-with-lease as a ref expectation check and warns that plain --force can lose commits, which grounds rewrite safety.
- SemVer 2.0.0 defines MAJOR.MINOR.PATCH compatibility signaling; version-control owns where that signal is carried as a tag, while semantics owns whether the bump meaning is correct.
- Trunk-based development guidance treats short-lived branches as the default integration model and warns that branches lasting more than a couple of days become long-lived drift.

Use these as constraints. Local repositories may choose different branch names, ticket formats, forge merge buttons, protected-branch rules, or release automation, but the history must remain readable, reversible, and auditable.

## Branching Strategy

Prefer trunk-based development for product work: one protected mainline branch, short-lived feature branches, frequent integration, and incomplete features hidden behind feature flags or configuration gates.

| Situation | Default decision | Risk to watch |
|---|---|---|
| Small product team | Short-lived branches into mainline | Branches silently live for a week and become integration projects. |
| Large or regulated product team | Short-lived branches plus protected-branch checks and review gates | Review latency turns short-lived branches into long-lived branches. |
| Library with multiple supported major versions | Release branches may be justified | Git Flow is copied into a product repo without the multi-version need. |
| Emergency production fix | Branch from the relevant release tag, then reconcile back to mainline | Fix ships on a tag but never returns to mainline. |
| Experimental work | Branch or fork with explicit expiry and cleanup criteria | Prototype branch becomes an undeclared product branch. |

A branch lifetime rule should be concrete. A useful default is: aim for under two days, treat one week as an exception requiring explicit review, and recreate branches that have diverged structurally from mainline.

## Commit Boundaries

A commit is atomic when reverting it leaves no broken intermediate state, no unrelated rollback, and no half-finished feature. The practical test is simple: if the reason the commit exists requires the word "and", split it.

| Mixed change | Split into |
|---|---|
| Bug fix and opportunistic refactor | One fix commit, one refactor commit. |
| Feature and formatting sweep | One feature commit, one formatting commit. |
| Schema migration and UI wiring | Migration commit plus application commit unless they must land atomically. |
| Rename and behavior change | Rename-only commit, then behavior commit. |
| Test harness repair and product change | Harness repair commit, then product change commit. |

Commit-message wording, type prefixes, and scope names belong to semantics or naming-conventions. Version-control owns whether the commit should exist as one transaction at all.

## Provenance

Every meaningful commit should point to the reason it exists. The reason might be a tracker ID, issue number, ADR, incident record, release note, or written task brief. Use the local convention consistently.

Common portable forms:

~~~text
feat(export): add order CSV export (TASK-1234)

Refs: TASK-1234
Decision: docs/decisions/0017-export-format.md
~~~

The provenance convention should answer:

- What task, bug, incident, or decision caused this change?
- Where can a future reader find the acceptance criteria or rationale?
- Is the link visible in one-line history, structured trailers, or both?
- Is enforcement social, hook-based, CI-based, or forge-based?

Do not hard-code a private tracker prefix into a public skill. Substitute the local ticket or issue format.

## Integration Method

Choose the integration method by the shape of the branch:

| Branch state | Preferred integration | Reason |
|---|---|---|
| One polished commit | Rebase-and-merge or fast-forward | Preserves the commit as a useful transaction. |
| Several noisy WIP commits that form one logical change | Squash-and-merge | Keeps mainline readable while preserving PR discussion elsewhere. |
| Several polished commits that each stand alone | Rebase-and-merge | Preserves useful commit sequence without merge noise. |
| Release branch or long-lived support branch with independent history | Explicit merge commit may be appropriate | The branch relationship is semantically meaningful. |
| Branch is old and conflicts repeat across many commits | Recreate from current mainline and re-author/cherry-pick | Rebase cost has exceeded the value of preserving branch history. |

Avoid "merge main into my feature branch" as routine history maintenance when a clean rebase or branch recreation would communicate the same work more clearly. If a repository intentionally allows merge commits, document when they are meaningful and verify that reviewers can still follow the history.

## Path-Limited Commits

In a dirty or shared working tree, do not trust the global index. A standard git commit records whatever is staged, including files staged by another session. A path-limited commit records only named paths.

~~~bash
# Tracked files: commit only these paths, ignoring other staged changes.
git commit --only -m "subject" -- path/one path/two

# New files: add them first so Git knows them, then commit only those paths.
git add path/new-file
git commit --only -m "subject" -- path/new-file

# Multi-line message from a file.
git commit --only -F /tmp/commit-message -- path/one path/two
~~~

Flag ordering matters: commit-message flags come before --; paths come after --. Anything after -- is a pathspec.

After every path-limited commit, verify the file list:

~~~bash
git show --name-only --format='%H%n%s' HEAD
~~~

If unintended files appear, stop. The recovery depends on repo policy and whether the commit was published; do not rewrite shared history without guardrails and intent-recognition.

## Release Tags And Hotfixes

Use annotated tags for releases. Annotated tags carry release metadata and are meant for release use; lightweight tags are better treated as temporary labels.

~~~bash
git tag -a v1.2.0 -m "Release v1.2.0"
git push origin v1.2.0
~~~

The tag name may include a leading v, while the semantic version itself is the numeric MAJOR.MINOR.PATCH value. Let semantics decide whether a change is major, minor, patch, pre-release, or build metadata; this skill decides how the chosen version is represented in Git and reconciled into history.

Hotfix flow:

1. Identify the release tag that contains the production bug.
2. Create a hotfix branch from that tag.
3. Apply the smallest safe fix and verify it.
4. Create a new patch tag or release tag according to the local release policy.
5. Reconcile the fix back to mainline by cherry-pick, merge, or re-authoring so the bug does not return in the next release.
6. Record the release, fix provenance, and any divergence from mainline.

Do not fix only on the release tag path and forget mainline. That creates a regression waiting for the next release.

## Worktrees

Use worktrees when one repository needs multiple simultaneous working directories: parallel agents, one branch running a long test while another is edited, release-tag inspection, or separate hotfix and feature work.

~~~bash
git worktree add ../repo-feature-a feature/a
git worktree list
git worktree remove ../repo-feature-a
~~~

Worktree guardrails:

- Keep worktree directories outside each other; sibling directories are easier to reason about.
- Name the branch and directory by the work item or purpose.
- Run git worktree list before cleanup.
- Use git worktree remove rather than deleting the directory by hand.
- Use git worktree prune only after verifying no live worktree or unmerged branch still depends on that metadata.
- Do not assume one worktree's config, sparse checkout, or ignored files apply to all worktrees.

Worktrees isolate working directories, not judgment. You still need path-limited commits, branch freshness checks, and explicit cleanup evidence.

## Force Push And History Rewrite

Prefer not to rewrite shared history. When rewriting is appropriate - usually a private or review branch after rebase or commit cleanup - use --force-with-lease, not plain --force.

--force-with-lease is not magic safety. It protects against overwriting a remote ref that no longer matches the expected value, but background fetches or broad remote updates can weaken the default lease form. For high-risk rewrites, record the expected remote ref explicitly or use the repository's approved forge workflow.

Before any force push, verify:

- The branch is not protected mainline or a shared release branch.
- The rewrite is intentional and authorized.
- The remote branch has not moved unexpectedly.
- A safer path is not available, such as a revert, new commit, or new branch.
- The command is scoped to the intended branch only.

Plain git push --force belongs behind guardrails; it can lose commits.

## Merge Conflict Strategy

Conflicts are either content conflicts or structural conflicts.

| Conflict type | Signal | Strategy |
|---|---|---|
| Content conflict | Both sides changed the same lines | Read both intents, resolve line-by-line, run focused tests. |
| Rename/edit conflict | One side moved or renamed while another edited old path | Reapply the smaller change onto the new structure. |
| Repeated rebase conflict | Same conflict appears across many commits | Abort and recreate branch from current mainline. |
| Generated-file conflict | Generated artifact changed on both sides | Regenerate from source if possible; do not hand-merge opaque output unless required. |
| Dependency-lock conflict | Lockfile changed on both sides | Re-run the package manager resolution and inspect resulting package changes. |

Do not auto-resolve conflicts inside a merge queue; use merge-queue for queued integration and stop for human or focused conflict handling when the queue encounters conflicts.

## Verification

- [ ] Branching model is named explicitly and actual behavior matches it.
- [ ] Feature branches are short-lived; old branches are rebased, recreated, or explicitly justified.
- [ ] Each commit is atomic: revertable without removing unrelated work.
- [ ] Commit provenance links to a task, issue, decision, incident, or release record by local convention.
- [ ] Commit-message wording and SemVer meaning were handed to semantics or naming-conventions when needed.
- [ ] Integration method is chosen deliberately: fast-forward, rebase-and-merge, squash, or meaningful merge commit.
- [ ] Dirty/shared repos use path-limited commits and verify committed file lists.
- [ ] Release tags are annotated and traceable to the release record.
- [ ] Hotfixes from release tags are reconciled back to mainline.
- [ ] Worktree cleanup is verified before branch or directory removal.
- [ ] Force pushes use --force-with-lease or a stricter approved alternative; plain --force is treated as high-risk.
- [ ] Merge conflicts are classified as content, structural, generated, lockfile, or repeated-rebase conflicts before resolution.

## Do NOT Use When

| Use instead | When |
|---|---|
| semantics | Choosing Conventional Commit type, SemVer bump meaning, breaking-change signal, or compatibility meaning. |
| naming-conventions | Naming a branch, commit scope, file, type, variable, route, or other identifier. |
| merge-queue | Serializing multiple ready branches through a protected target branch or operating a queue/train. |
| code-review | Reviewing PR content for correctness, security, performance, or maintainability. |
| diff-analysis | Reading a patch to summarize semantic changes or risk before review. |
| guardrails | Authorizing or blocking destructive git actions such as hard reset, branch deletion, or unsafe force push. |
| intent-recognition | Classifying the risk of a specific command immediately before tool execution. |
| debugging | Investigating a failed release pipeline, broken tag job, or git error after it happens. |
