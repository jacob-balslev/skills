# Repo Diff Patterns

These are recurring patch patterns that deserve extra scrutiny in any codebase. Use them as examples after the main `SKILL.md` workflow identifies the changed file set.

## 1. Mixed formatting plus one semantic branch

Common shape:

- import reordering, whitespace churn, generated formatting, or broad indentation changes across a file
- one real change inside a conditional, guard, helper call, or return expression

Review rule:

- summarize the semantic branch only after proving the rest is mechanical
- do not let mechanical churn hide the behavioral change
- if the semantic branch cannot be isolated, say that the diff remains mixed and needs a smaller follow-up diff or focused test

## 2. Type-only diff with downstream impact

Common shape:

- interface, schema, enum, serialized payload, or union changes in one file
- few or no runtime call sites change in the same patch

Review rule:

- treat contract edits as blast-radius changes
- check callers, generated SDKs, API responses, fixtures, and docs before calling the patch low-risk
- name whether the contract became additive, restrictive, or substitutive

## 3. Snapshot-only test update

Common shape:

- snapshot, fixture, golden file, or recorded response changed
- no clear explanation of the user-visible behavior shift

Review rule:

- ask what behavior justified the fixture change
- treat unexplained snapshot churn as a possible regression mask
- never summarize "tests updated" as proof that behavior is correct

## 4. Guard removal presented as cleanup

Common shape:

- author says "cleanup", "simplify", "refactor", or "remove dead branch"
- diff removes a null/auth/range/feature-flag guard, fallback branch, retry, or validation rule

Review rule:

- compare the stated intent against the actual widened behavior
- call out the removed safety boundary explicitly
- require verification evidence that the removed branch was unreachable or obsolete

## 5. Query or selector change with tiny hunk size

Common shape:

- one predicate, join, grouping clause, selector, filter, or sort key changes
- hunk is visually small

Review rule:

- assume the blast radius may be large even if the diff is small
- identify downstream metrics, reports, caches, read models, or UI states that could shift
- ask for representative before/after data or targeted tests when the changed expression controls user-visible output

## 6. Lockfile-only or dependency diff

Common shape:

- package lockfile, dependency manifest, or generated dependency metadata changes
- little or no source code changes

Review rule:

- distinguish runtime dependency from dev-only tooling
- scan for major version bumps, removed transitive packages, and new postinstall or native-build surfaces
- do not call it "no behavior change" until install/runtime impact is verified

## 7. Rename-only diff

Common shape:

- file, symbol, route, key, or event name changes
- logic appears unchanged

Review rule:

- verify whether the rename changes public contract, import path, dynamic lookup key, persisted data, analytics event, or documentation path
- if only identifiers changed, summarize the semantic naming improvement and state that behavior was not otherwise inspected
