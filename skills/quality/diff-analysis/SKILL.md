---
name: diff-analysis
description: "Use when analyzing `git diff`, reviewing a patch before commit, explaining what a changeset does, or separating semantic code changes from formatting churn. Covers unified diff anatomy, hunk interpretation, file-level change classification, blast-radius tracing, hidden-risk scanning, and intent-vs-diff comparison. Do NOT use for full code-review verdicts (use `code-review`), git workflow/history decisions (use `version-control`), authoring behavior-preserving code changes (use `refactor`), or screenshot/pixel diffs."
license: MIT
compatibility:
  notes: "Markdown, Git, agent-skill runtimes"
allowed-tools: Read Grep Bash
grounding:
  domain_object: "Unified diff and Git patch interpretation for agent-readable changesets"
  grounding_mode: "hybrid"
  truth_sources:
    - https://git-scm.com/docs/diff-format
    - https://www.gnu.org/software/diffutils/manual/html_node/Unified-Format.html
    - https://www.gnu.org/software/diffutils/manual/html_node/Detailed-Unified.html
  failure_modes:
    - added_removed_lines_narrated_without_semantic_delta
    - formatting_churn_masks_behavior_change
    - hunk_header_context_ignored
    - contract_edit_treated_as_local_change
    - intent_diff_mismatch_not_called_out
    - code_review_verdict_overclaimed_from_diff_scan
  evidence_priority: "equal"
metadata:
  schema_version: 6
  version: "1.1.0"
  type: capability
  category: quality
  domain: quality/doctrine
  scope: portable
  owner: skill-graph-maintainer
  freshness: "2026-05-19"
  drift_check: "{\"last_verified\":\"2026-05-19\"}"
  eval_artifacts: planned
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: experimental
  keywords: "[\"git diff\",\"unified diff\",\"patch analysis\",\"changeset review\",\"diff analysis\",\"read a diff\",\"review a patch\",\"explain this diff\",\"hunk analysis\",\"semantic delta\",\"formatting churn\",\"blast radius\",\"hidden risk\",\"intent vs diff\",\"removed guard\",\"snapshot churn\",\"contract edit\"]"
  triggers: "[\"diff-skill\"]"
  paths: "[\"**/*.diff\",\"**/*.patch\"]"
  examples: "[\"explain this git diff without line-by-line narration\",\"review this patch for hidden behavior changes before I commit\",\"this refactor diff is huge -- separate formatting churn from real semantic changes\",\"does this patch match the stated intent or did it widen behavior?\",\"summarize the blast radius of this interface change from the diff\"]"
  anti_examples: "[\"approve or reject this pull request after a full correctness/security review\",\"should I squash or rebase this branch before merge?\",\"refactor this function and keep behavior unchanged\",\"compare these two screenshots pixel by pixel\",\"find every caller of this changed function and update them\"]"
  relations: "{\"related\":[\"semantics\",\"refactor\"],\"boundary\":[{\"skill\":\"code-review\",\"reason\":\"diff-analysis extracts semantic deltas and risk surfaces from a patch; code-review owns full correctness/security/performance verdicts and blocking comments\"},{\"skill\":\"version-control\",\"reason\":\"diff-analysis reads a changeset; version-control owns branch strategy, commit boundaries, history shape, tags, rebases, and release workflow\"},{\"skill\":\"refactor\",\"reason\":\"refactor authors behavior-preserving code changes; diff-analysis reads an already-produced patch and checks whether behavior appears preserved\"}],\"verify_with\":[\"code-review\",\"semantics\"]}"
  grounding: "{\"domain_object\":\"Unified diff and Git patch interpretation for agent-readable changesets\",\"grounding_mode\":\"hybrid\",\"truth_sources\":[\"https://git-scm.com/docs/diff-format\",\"https://www.gnu.org/software/diffutils/manual/html_node/Unified-Format.html\",\"https://www.gnu.org/software/diffutils/manual/html_node/Detailed-Unified.html\"],\"failure_modes\":[\"added_removed_lines_narrated_without_semantic_delta\",\"formatting_churn_masks_behavior_change\",\"hunk_header_context_ignored\",\"contract_edit_treated_as_local_change\",\"intent_diff_mismatch_not_called_out\",\"code_review_verdict_overclaimed_from_diff_scan\"],\"evidence_priority\":\"equal\"}"
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  lifecycle: "{\"stale_after_days\":90,\"review_cadence\":\"quarterly\"}"
  mental_model: "A diff is an evidence artifact, not a verdict. Read it as a layered signal: file set first, hunk context second, semantic delta third, risk surface fourth. Added and removed lines are raw evidence; the useful output is what behavior, contract, or reviewer obligation changed."
  purpose: "Help agents produce accurate, compact, behavior-focused patch summaries and pre-commit risk scans without overclaiming full code-review certainty or getting distracted by formatting churn."
  boundary: "This skill owns interpreting textual code diffs and patches. It does not own approving a PR, deciding git history shape, authoring the refactor, updating call sites, or comparing rendered visuals."
  analogy: "Diff analysis is like reading a medical chart before diagnosis: the chart shows observations and changes over time, but a responsible reader still separates signal from noise before making a claim."
  misconception: "The common mistake is treating every plus and minus line as equally important. Diff quality comes from identifying the semantic delta and naming what must be verified next, not narrating the patch line by line."
  concept: "{\"definition\":\"Diff analysis is disciplined interpretation of unified diffs, Git patches, and changesets to identify file scope, semantic deltas, hidden risk, and verification needs.\",\"mental_model\":\"Read the patch in layers: changed file set, hunk context, semantic change, blast radius, and intent alignment. The diff is evidence; the summary is an interpretation with bounded confidence.\",\"purpose\":\"It prevents agents from missing behavior changes hidden inside churn, overclaiming review safety, or producing low-value line-by-line narrations.\",\"boundary\":\"It is not full code review, git workflow design, refactor authoring, call-site update work, or visual/pixel comparison.\",\"taxonomy\":\"A quality capability adjacent to code-review, refactor, semantics, and version-control; it sits before full review and after a patch exists.\",\"analogy\":\"Diff analysis is like reading a medical chart before diagnosis: observations matter, but the useful work is separating signal from noise and naming the next test.\",\"misconception\":\"A diff summary is not a transcript of added and removed lines. Good analysis compresses the patch into semantic change, risk surface, and verification obligations.\"}"
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/quality/diff-analysis/SKILL.md
---
# Diff Analysis

## Domain Context

**What is this skill?** This skill provides disciplined diff analysis for AI agents: reading code changes as a structured before/after artifact, isolating semantic changes from formatting noise, tracing blast radius across files, and extracting review-ready findings from a patch. Covers unified diff anatomy, hunk-by-hunk interpretation, scope validation, hidden-risk scanning, and intent-vs-diff comparison. Use when analyzing `git diff`, reviewing a patch before commit, or explaining what a changeset actually does. Do NOT use for full code-review verdicts (use code-review), git workflow decisions (use version-control), authoring refactors (use refactor), or screenshot/pixel comparison (use visual diff tooling).

## Key Files

| File | Purpose |
|---|---|
| `references/repo-diff-patterns.md` | Portable patch-risk patterns showing where semantic changes hide inside common diff shapes. |
| `references/diff-reading-checklist.md` | Step-by-step checklist for reading hunks, isolating semantic deltas, and naming blast radius. |

## Coverage

This skill covers reading and interpreting unified diffs and patches: the anatomy of `diff --git` output, hunk-by-hunk semantic extraction, file-level change classification (rename, mechanical rewrite, local logic edit, contract edit, test-only edit), separating signal from formatting noise, blast radius estimation for changed contracts and types, intent-vs-diff mismatch detection, and writing concise behavior-focused diff summaries. Does not cover full code review verdicts, git workflow/branching decisions, or visual/pixel comparison.

## Philosophy

Agents that skim diffs miss hidden behavior changes buried in formatting churn. A one-line guard removal inside a 300-line reformat can silently widen access. This skill exists because agents need a repeatable reading discipline -- structure first, meaning second, risk last -- instead of narrating every added and removed line equally. Without it, agents produce line-by-line restatements that miss the semantic delta and say "looks safe" without naming the blast radius.

A diff is not just a list of changed lines. It is a compact representation of intent, scope, and risk. Git patch text extends the unified diff shape with file metadata such as `diff --git`, index lines, and mode/rename headers; unified hunks still carry the before/after line ranges and `+` / `-` / space prefixes. This skill helps agents read that structure accurately, separate real behavior changes from noise, and turn raw hunks into useful conclusions.

For concrete patch shapes, read `references/repo-diff-patterns.md` and `references/diff-reading-checklist.md` when you need examples instead of the general rubric.

## 1. What This Skill Owns

| Owns | Does not own |
| --- | --- |
| Reading unified diffs and patches | Deciding branch strategy or release flow |
| Separating semantic change from formatting churn | Full review sign-off across correctness/security/performance |
| Mapping changed hunks to probable blast radius | Visual screenshot or image diffs |
| Explaining what changed in plain language | Commit-policy or git-history governance |

## 2. The Diff Reading Loop

Read diffs in this order:

1. Identify the file set.
2. Classify each file by change type.
3. Read hunk headers before line edits.
4. Extract semantic change from each hunk.
5. Check for scope mismatch or hidden blast radius.
6. Summarize intent, risk, and verification needs.

Do not start by reading every added and removed line equally. Start from structure, then meaning.

## 3. Diff Anatomy

| Diff part | What it tells you | How to use it |
| --- | --- | --- |
| `diff --git a/... b/...` | File identity | Build the file-level scope list |
| `index ...` | Blob/version change | Usually low-value unless debugging patch application |
| `---` / `+++` | Before and after file path | Confirm rename vs in-place edit |
| `@@ ... @@` | Hunk location and nearby context | Understand where the change lands before reading lines |
| `-` lines | Removed behavior/content | Ask what guarantee or behavior disappeared |
| `+` lines | Added behavior/content | Ask what new state, branch, or dependency now exists |
| context lines | Stable neighborhood | Use to infer surrounding intent and call path |

## 4. File-Level Change Classification

Before reading hunks, tag each changed file.

| Change class | Typical signal | Primary question |
| --- | --- | --- |
| Rename/move | Path changed, little content churn | Is behavior unchanged but references now need updates? |
| Mechanical rewrite | Many lines changed, low semantic delta | Is this formatting or real logic? |
| Local logic edit | Small hunk in one function | What behavior changed here? |
| Contract edit | Types, schemas, API responses, SQL view shape | What downstream consumers now need adjustment? |
| Test-only edit | Only assertions/fixtures changed | Is the test following behavior or masking a regression? |
| Config or dependency edit | Lockfile, package manifest, environment defaults | What runtime, install, or deployment path changes even if source code is unchanged? |
| Documentation-only edit | Markdown or comments only | Does the doc change accurately describe behavior, or does it create stale guidance? |

This classification decides how deeply to inspect the diff.

## 5. Semantic Extraction Per Hunk

For each hunk, answer four questions:

1. What behavior or contract existed before?
2. What behavior or contract exists now?
3. Is the change additive, restrictive, or substitutive?
4. What adjacent path could now behave differently?

### Hunk interpretation rules

- A one-line edit can still be a contract break.
- Large churn can still be mostly noise.
- Added guards often narrow behavior; removed guards widen risk.
- Type-only changes can imply runtime consequences if APIs or assumptions shift.

## 6. Noise vs Signal

| Looks noisy | May still matter because |
| --- | --- |
| Import reorder | It can hide a new dependency or removal of a side-effect import |
| Rename-only edit | It can change route ownership, dynamic import paths, or symbol meaning |
| Formatting rewrite | It can bury one real branch or condition change |
| Test snapshot update | It can normalize a regression instead of proving a fix |
| Lockfile-only update | It can change transitive runtime behavior or supply-chain risk |
| Comment/doc update | It can contradict code and mislead future agents |

### Signal extraction rules

- First identify files with likely semantic impact.
- Then ignore purely cosmetic churn only after proving it is cosmetic.
- If one hunk mixes formatting and behavior, rewrite the summary around the behavior change only.

## 7. Blast Radius Checks

After understanding the diff itself, ask what else the patch implicitly touches.

| Change type | Likely blast radius |
| --- | --- |
| Public type/interface change | Callers, tests, route contracts, docs |
| Query/view change | Services, report math, downstream consumers |
| Auth/guard change | Access paths, redirects, error handling |
| Config/env change | Startup paths, deployment docs, feature gates |
| Utility change | Every call site using the helper |
| Dependency or lockfile change | Build output, runtime behavior, package licenses, supply-chain exposure |
| Test fixture/snapshot change | Test intent, product-visible output, regression masking |

This skill does not require opening every dependent file. It requires naming the probable risk surface correctly and saying which follow-up reads or tests would prove the interpretation.

## 8. Intent vs Diff

Compare the stated goal against the actual patch.

| If the stated intent is... | Check whether the diff actually... |
| --- | --- |
| Fix a bug | Closes the failing path without silently broadening scope |
| Refactor | Preserves behavior while changing structure |
| Add a feature | Includes the necessary contract, UI, and verification changes |
| Clean up | Removes dead weight without deleting active value |

If the diff and stated intent disagree, the patch needs clarification or further work.

## 9. Hidden-Risk Scan

Before summarizing, scan for risk cues that deserve explicit mention even when the diff is small.

| Cue | Why it matters | Summary obligation |
| --- | --- | --- |
| Removed guard, fallback, or validation branch | May widen accepted inputs or remove a safety boundary | Name the removed guarantee and who relied on it |
| Changed default value | Can alter behavior without call-site changes | Name the old and new default plus affected execution path |
| New dependency or import | Can add side effects, bundle size, or supply-chain risk | Name the dependency and whether it is runtime, dev, or side-effect-only |
| Type/schema loosening | Can admit states callers did not previously handle | Name the new state and likely consumers |
| Snapshot or fixture churn | Can normalize behavior rather than proving it | Name the user-visible output that changed |
| Large mechanical rewrite | Can hide one semantic change | State whether the semantic delta was isolated or remains unverified |

## 10. Good Diff Summaries

A good summary says why the change matters, not just what lines moved.

### Use this format

- File scope: which files changed and what kinds of changes they represent
- Semantic delta: what behavior or contract changed
- Risk surface: where regressions could now appear
- Verify next: what should be tested or re-read next

### Avoid

- line-by-line narration of the whole patch
- repeating obvious rename churn
- calling a diff safe without naming the risk surface

## 11. Boundaries

- Use `code-review` when you need a full review verdict and comment severity.
- Use `version-control` for branching, rebasing, squash, release, or provenance policy.
- Use visual diff tools for screenshots and pixel comparison.
- Use search tools such as `rg`, `git grep`, or the relevant codebase-search skill when you need to move from a diff into exact files and line slices efficiently.

## Verification

After applying this skill, verify:

- [ ] I classified the file set before reading hunks deeply.
- [ ] I used hunk context, not only added/removed lines.
- [ ] I separated semantic change from cosmetic noise.
- [ ] I identified the likely blast radius of the patch.
- [ ] I compared the diff against the claimed intent.
- [ ] My summary explains behavior change, risk, and next verification step.
- [ ] I did not produce a line-by-line narration of the whole patch.
- [ ] I named the risk surface explicitly, not just "looks safe."

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Full correctness/security review with blocking vs advisory comments | `code-review` | code-review owns the verdict structure and comment severity |
| Git branching, rebasing, squash, release flow decisions | `version-control` | version-control owns branch strategy and release governance |
| Visual screenshot or pixel comparison | Visual diff or browser verification tooling | rendered output comparison needs image/browser evidence, not textual patch interpretation |
| Finding specific code locations from a diff | Codebase search tooling | exact file and line navigation belongs to search/read tools after the diff risk surface is known |
