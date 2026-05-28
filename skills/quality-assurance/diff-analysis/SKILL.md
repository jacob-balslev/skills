---
name: diff-analysis
description: "Use when analyzing `git diff`, reviewing a patch before commit, or explaining what a changeset does. Covers unified diff anatomy, hunk interpretation, semantic-vs-formatting separation, blast-radius tracing, hidden-risk scanning, and intent-vs-diff comparison. Do NOT use for full code-review verdicts (use `code-review`), git workflow decisions (use `version-control`), or visual diffs."
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
  freshness: "2026-03-28"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-03-28\"}"

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
  keywords: "[\"git diff\",\"unified diff\",\"patch analysis\",\"changeset review\",\"diff analysis\",\"read a diff\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"diff-skill\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"semantics\"],\"boundary\":[\"code-review\",\"version-control\"],\"verify_with\":[\"refactor\"]}"
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
  skill_graph_canonical_skill: skills/diff-analysis/SKILL.md
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
# Diff Analysis

## Domain Context

**What is this skill?** This skill provides disciplined diff analysis for AI agents: reading code changes as a structured before/after artifact, isolating semantic changes from formatting noise, tracing blast radius across files, and extracting review-ready findings from a patch. Covers unified diff anatomy, hunk-by-hunk interpretation, scope validation, hidden-risk scanning, and intent-vs-diff comparison. Use when analyzing `git diff`, reviewing a patch before commit, or explaining what a changeset actually does. Do NOT use for full code-review verdicts (use code-review), git workflow decisions (use version-control), or pixel/image comparison (use playwright-cli or visual diff tooling).

## Key Files

| File | Purpose |
|---|---|
| `skills/diff-analysis/references/repo-diff-patterns.md` | Repo-grounded patch examples showing how diff classes map to real changes in this workspace. |
| `skills/diff-analysis/references/diff-reading-checklist.md` | Step-by-step checklist for reading hunks, isolating semantic deltas, and naming blast radius. |
## Coverage

This skill covers reading and interpreting unified diffs and patches: the anatomy of `diff --git` output, hunk-by-hunk semantic extraction, file-level change classification (rename, mechanical rewrite, local logic edit, contract edit, test-only edit), separating signal from formatting noise, blast radius estimation for changed contracts and types, intent-vs-diff mismatch detection, and writing concise behavior-focused diff summaries. Does not cover full code review verdicts, git workflow/branching decisions, or visual/pixel comparison.

## Philosophy

Agents that skim diffs miss hidden behavior changes buried in formatting churn. A one-line guard removal inside a 300-line reformat can silently widen access. This skill exists because agents need a repeatable reading discipline -- structure first, meaning second, risk last -- instead of narrating every added and removed line equally. Without it, agents produce line-by-line restatements that miss the semantic delta and say "looks safe" without naming the blast radius.

A diff is not just a list of changed lines. It is a compact representation of intent, scope, and risk. This skill helps agents read a patch accurately, separate real behavior changes from noise, and turn raw hunks into useful conclusions.

For real repo-grounded examples, read `references/repo-diff-patterns.md` and `references/diff-reading-checklist.md` when you need concrete patch shapes instead of the general rubric.

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

This skill does not require opening every dependent file. It requires naming the probable risk surface correctly.

## 8. Intent vs Diff

Compare the stated goal against the actual patch.

| If the stated intent is... | Check whether the diff actually... |
| --- | --- |
| Fix a bug | Closes the failing path without silently broadening scope |
| Refactor | Preserves behavior while changing structure |
| Add a feature | Includes the necessary contract, UI, and verification changes |
| Clean up | Removes dead weight without deleting active value |

If the diff and stated intent disagree, the patch needs clarification or further work.

## 9. Good Diff Summaries

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

## 10. Boundaries

- Use `code-review` when you need a full review verdict and comment severity.
- Use `version-control` for branching, rebasing, squash, release, or provenance policy.
- Use `playwright-cli` or visual diff tools for screenshots and pixel comparison.
- Use `scanning` when you need to move from a diff into exact files and line slices efficiently.

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
| Visual screenshot or pixel comparison | `playwright-cli` | playwright-cli owns browser-based visual verification |
| Finding specific code locations from a diff | `scanning` | scanning owns efficient file and line-slice navigation |
