---
schema_version: 7
name: skill-infrastructure
description: "This skill covers the tooling, patterns, and maintenance workflows for the live skill system in the Development repo. Use when running skill health checks, debugging eval threshold violations, detecting imperative conflicts or phantom refs, analyzing routing gaps, fixing invalid frontmatter, auditing shared-skill mirror parity, or auditing skill-routing-config.json coverage. Do NOT use for writing skill content itself — use skill-scaffold for creating new skills. Do NOT use for evaluating task output quality — use evaluation."
type: capability
version: 1.1.1
scope: codebase
project_tags: [skill-graph, agent-orchestration]
triggers:
  - skill-infra-skill
keywords:
  - skill census
  - skill overlap
  - eval quality
  - frontmatter validation
  - phantom refs
  - routing gaps
  - skill graph
  - contradiction check
  - imperative conflicts
  - skill-census.js
  - skill-overlap-detector.js
  - routing-gap-report.js
  - skill health
  - eval threshold
  - skill inventory
  - skill manifest
owner: claude
freshness: "2026-03-30"
eval_artifacts: present
eval_state: unverified
routing_eval: absent
drift_check:
  last_verified: "2026-05-20"
  truth_source_hashes:
    "scripts/skill/skill-census.js": "2ee803111a8e6c5b6ea2cd56c15d13029df06c9285915f0d2c7d06eda02c34c2"
    "scripts/skill/skill-lint.js": "370406fb922dc81dfdb94e7ee22b6be60c0096b12b85f2f73816631810b805e8"
    "scripts/skill-overlap-detector.js": "4875aaba6c1b0b8d0be975300ae512ab7612b771d0e7dc3a6a89f566e7f1ee46"
    "scripts/linear/routing-gap-report.js": "ca9ee9b4e3bff5e9140de9cc756e01c6e4963448c14da2d1da915e74a5d9df2a"
grounding:
  domain_object: Live skill system tooling and maintenance scripts
  grounding_mode: repo_internal
  truth_sources:
    - scripts/skill/skill-census.js
    - scripts/skill/skill-lint.js
    - scripts/skill-overlap-detector.js
    - scripts/linear/routing-gap-report.js
  failure_modes:
    - script_signature_change
    - threshold_rename
    - new_validation_added_without_doc
  evidence_priority: script_source > skill_body
layer: meta
family: skill-system
primaryCategory: Agent System
layerPrimary: meta
routingRole: primary
lint_verdict: PASS
drift_status: OK
structural_verdict: PASS
truth_verdict: PASS
comprehension_verdict: UNVERIFIED
application_verdict: UNVERIFIED
last_audited: 2026-05-20
relations:
  related:
    - codebase-search
    - evaluation
    - skill-scaffold
    - skill-evolution
    - knowledge-modeling
  boundary:
    - editorial-standards
    - doc-updater
  verify_with:
    - evaluation
    - skill-portability
    - context-engineering
---

# Skill Infrastructure

## Domain Context

**What is this skill?** This skill covers the tooling, patterns, and maintenance workflows for the live skill system in the Development repo. Use when running skill health checks, debugging eval threshold violations, detecting imperative conflicts or phantom refs, analyzing routing gaps, fixing invalid frontmatter, auditing shared-skill mirror parity, or auditing skill-routing-config.json coverage. Do NOT use for writing skill content itself — use skill-scaffold for creating new skills. Do NOT use for evaluating task output quality — use evaluation.

## Key Files

| File | Purpose |
|---|---|
| `agent-orchestration/logs/routing-misses.jsonl` | Queries that matched zero skills — each entry has `keywords_tried` |
| `agent-orchestration/logs/eval-history.jsonl` | Eval results with `failure_category` and `skill` |
| `agent-orchestration/references/skill-routing-config.json` | Current `keywordMap` and `labelMap` |
| `scripts/linear/routing-gap-report.js` | now reads the real routing config and canonical telemetry logs, so `current_keywords` / `current_labels` once again reflect live repo truth. |
| `scripts/skill/skill-lint.js` | Workflow or verification script referenced by this skill |
| `skills/skill-infrastructure/evals/evals.json` | Read the skill's existing |
| `scripts/skill/skill-census.js` | Verify: `node scripts/skill/skill-census.js --human 2>&1 | grep <skill-name>` |
| `scripts/skill-overlap-detector.js` | Run `node scripts/skill-overlap-detector.js --conflicts --json` to get the conflict list |
## Recent Changes

### Lint verdict = external mandates only + audit-only walker mode (Updated 2026-05-20)

- `scripts/skill/skill-lint.js` now sets `lint_verdict: FAIL` only on canonical-source or external-mandate violations such as parseable frontmatter, valid identifiers, non-empty descriptions, and parent-directory/name alignment. Broader internal checks (`dead-relation`, `dead-file-ref`, `invalid-url`, `missing-evals`, recommended-field gaps, routing quality) belong in companion inventory, protocol, routing, drift, and export tools instead of the lightweight lint verdict. The walker rolls `lint_verdict` up into `structural_verdict`; quality is measured by `application_verdict` (gate 9), never by form lint. See [ADR 0011](../../skill-graph/docs/adr/0011-split-audit-verdict-into-four-verdicts.md) Change 2.
- The kebab check is namespace-aware: a `/`-separated name (e.g. `agents/claude-haiku`, `token-cost-estimation/findings`) is valid for internal, non-exported skills referenced by their full path in `skill-routing-config.json`; each segment must be kebab-case. The flat-name marketplace contract (`name === leaf directory`) is enforced only on actual export candidates by `skill-graph/scripts/verify-skill-md-export.js`, not by this lint.
- `scripts/skill/skill-evolution-loop.js` gained `--no-evaluate` and `--audit-only`. `--audit-only` runs a deterministic lint + drift sweep that repopulates `structural_verdict` + `truth_verdict` corpus-wide with zero LLM calls and zero commits — the way to refresh the two deterministic verdicts after a schema migration or a lint-rule change.

### Walker Stability — v5-mirror exclusion + evaluate arg-order + stderr surface (Updated 2026-05-17 — Phase 21)

- `scripts/skill/skill-lint.js` and `scripts/skill/skill-evolution-loop.js` now hard-skip a directory literally named `skills` at the root of `SKILLS_DIR`. The `skills/skills/` tree is the v5 portable Skill Graph mirror (140 frozen exports with no Health Block). Phase 19's shallowest-depth-wins dedup only suppressed mirrors that had a parent twin — ~83 mirror-only skills were being lint-stamped as canonical and would have topped any live `--top N` walk with `last_audited [unset]`.
- Corpus impact: lint scan **514 → 429** active skills, errors **525 → 193**. The 332 removed errors were all `required-field` against frozen v5 exports — pure noise. The 193 remaining are real and now triageable: 176 `dead-relation` (concentrated on `seller-persona` 74, `financial-correctness` 42, `documentation` 16, plus nine smaller clusters), 13 `dead-file-ref` (real path drift under sales-hub), and 4 `required-field` against one sales-hub-rooted skill.
- `scripts/skill/skill-evolution-loop.js` `evaluate()` arg order fixed. `evaluate-skill.js parseArgs` is greedy — every `--flag` consumes the next token as its value unless that token starts with `--`. Calling `--mode ab --write-verdict <evalFile>` made `parseArgs` swallow the eval file as `--write-verdict`'s value, leaving `positional[]` empty; the script bailed to its `Usage:` block with exit 1. Every walker run had silently failed the evaluate phase since Phase 8 (`evaluate-skill.js --write-verdict` first existed). Now passes the positional first: `evaluate-skill.js <evalFile> --mode ab --write-verdict`.
- Walker now prints `stderr-tail` (last 3 lines) after the `evaluate:` line whenever `evaluate-skill.js` exits non-zero. Without this surface, the arg-order bug above was invisible to the operator — the trace showed `evaluate: exit=1, eval_score=(none)` with no clue why.

### Skill-Lint Dual-Root Walk + Improver Grader Preflight (Updated 2026-05-17 — Phase 19)

- `scripts/skill/skill-lint.js` `findAllSkills()` now walks both `skills/` and `sales-hub/.agents/skills/` with shallowest-depth-wins dedup. Before this fix, the walker's `skill-lint --skill <name> --write-verdict` invocation against any sales-hub-rooted skill silently dropped the skill (lint scan returned 0/0 PASS/FAIL) and stamped no `lint_verdict` on the v6 Health Block.
- Corpus impact: lint scan went from 354 → 514 skills, surfacing 525 pre-existing latent errors (336 `required-field`, 176 `dead-relation`, 13 `dead-file-ref`) that the single-root walk was hiding. These are not new failures introduced by this commit — they are real issues on sales-hub-scoped skills and on parent-repo skills whose `verify_with`/`adjacent` relations now actually get resolved.
- `scripts/skill/skill-evolution-loop.js` `improve()` now passes `--grader claude` explicitly. The improver's global default remains `opencode` (documented operator-of-record spec for human-driven runs), but the walker is the autonomous caller and runs on machines without opencode installed.
- `scripts/skill/run-skill-improvement-loop.js` preflight now verifies the grader CLI is on PATH before any eval work runs. Without this, a missing `opencode` silently turned every eval case into `spawnSync ENOENT`, the improver gate surfaced this as "updated eval bundle introduced execution errors (N)", and every walker pass auto-rejected without ever explaining the rejection cause was an uninstalled CLI. Fail-fast message: `Preflight failed: grader CLI '<grader>' not available on PATH (ENOENT). Install <grader> or pass --grader claude.` claude is exempt from the version probe since it's bundled.

### Nested Script Path Canonicalization (Updated 2026-04-02 — skill-system wrap)

- Nested scripts under `scripts/agent/`, `scripts/loop/`, `scripts/infra/`, `scripts/linear/`, `scripts/monitoring/`, `scripts/model/`, `scripts/task/`, and `scripts/skill/` now resolve the actual workspace root instead of treating `scripts/` as the repo root.
- This removed the shadow telemetry split between `scripts/agent-orchestration/logs/` and the canonical `agent-orchestration/logs/` paths for skill-eval and routing-gap tooling.
- `scripts/linear/routing-gap-report.js` now reads the real routing config and canonical telemetry logs, so `current_keywords` / `current_labels` once again reflect live repo truth.
- `scripts/skill/skill-lint.js` now shares the same path semantics as `skill-census.js`: namespaced skill IDs, redirect aliases, and repo-root or skill-local `references.files` all resolve correctly.
- Current verified health after this earlier fix: `skill-lint` reported `0 errors`, `skill-census` reported `0 invalidFrontmatter`, `0 invalidGeneratedDocs`, `0 brokenMappings`, `0 brokenRefFiles`, and `0 brokenKeyFilePaths`. (Note: post-Phase-19, `skill-lint` now surfaces 525 errors across 214 skills because the dual-root walk no longer hides sales-hub issues — see Phase 19 entry above for the breakdown.)

## Coverage

Skill system tooling and maintenance: skill-census.js (inventory, frontmatter validation, eval counting, threshold enforcement, broken mapping detection, monolith detection, scope distribution, missing negative evals, key-file validation, generated-doc validation, route-group ownership via `route_groups` frontmatter, and **Concept Card health via `validateConceptCard()` — the `conceptCard` census field is owned here as a skill-health dimension**: it reports skills with missing, partial, or out-of-range Concept Cards for the Concept Comprehension Layer), skill-overlap-detector.js (pairwise comparison across description similarity, heading overlap, code duplication, imperative conflicts with 3-check false-positive suppression), routing-gap-report.js (keyword gaps from routing-misses.jsonl, eval failure breakdown, suggested actions), generate-skill-docs.js (generated SKILL.md rendering, including `key_files` frontmatter into a concrete `## Key Files` section), eval quality enforcement (7-eval minimum, contradiction-check pattern, negative expectations requirement, valid eval types), and maintenance workflows (full health check sequence, adding evals, fixing imperative conflicts, fixing invalid frontmatter).

## Philosophy

A skill library is only as useful as its worst skill. When agents load stale, conflicting, poorly-routed, or mirror-drifted skills, they get worse at tasks — not better. The live skill tree in this repo is large enough that health decay happens invisibly: eval counts drift below minimums, keyword maps miss whole product areas, shared skills fall out of sync with `.claude/skills` or `.agents/skills`, and two skills start giving opposite instructions for the same function.

The infrastructure tools exist to catch that decay deterministically, with zero AI calls. Every script in this domain reads files and computes — it does not reason, infer, or hallucinate. That makes the output trustworthy enough to use in CI-style gates.

The maintenance commitment is: run a full health check after any batch skill work, fix threshold violations before they reach the CI gate, and document conflicts before they reach the agents loading those skills.

---

## Inventory Tools

### skill-census.js

Walks `skills/` and `sales-hub/.agents/skills/`, parses YAML frontmatter, counts evals, validates field presence, computes monolith counts, and cross-references the routing config for broken mappings.

**Key output fields:**

| Field | Meaning |
|---|---|
| Active skills | Skills with a `SKILL.md` in non-archived directories |
| Zero-eval skills | Skills with 0 eval cases (currently 0 — this should stay at 0) |
| Below minimum evals | Skills with fewer than 7 evals (warn) or fewer than 3 (error) |
| Invalid frontmatter | Skills missing required fields |
| Broken mappings | Entries in `skill-routing-config.json` that point to non-existent skill directories |
| Monolithic skills | Skills >200 lines without a `references/` directory |
| Scope distribution | Counts by `codebase`, `reference`, and `portable` |
| Missing negative evals | Evals that have expectations but none containing `does not / never / must not` |
| Route ownership | Page-route groups matched through exact skill names plus optional `route_groups` frontmatter aliases |

**Commands:**

```bash
# Human-readable summary
node scripts/skill/skill-census.js

# Human-readable with grep filter
node scripts/skill/skill-census.js --human 2>&1 | grep skill-infrastructure

# Full JSON output
node scripts/skill/skill-census.js --json

# Write manifest + SKILL-INDEX.md in one pass
node scripts/skill/skill-census.js --json --write-manifest --write-docs
```

**Thresholds enforced by skill-census.js:**

| Threshold | Value | Behaviour |
|---|---|---|
| Eval minimum (warn) | 7 | Surfaces in `belowMinimum` list |
| Eval minimum (error) | 3 | Surfaces in `critical` list; reference-scoped skills downgrade error to warn |
| Invalid frontmatter | 0 tolerated | Any missing required field surfaces as an error |
| Repo-specific grounding ratio | 70% minimum | Skills below threshold surface in grounding warnings |

### Route-group ownership

Sales Hub page-group coverage is no longer limited to exact skill names like `settings-pages`. Skills can declare explicit route ownership in frontmatter with:

```yaml
route_groups:
  - reports
  - exports
```

`skill-census.js` uses those aliases in `routeSkillMatrix` before reporting a route group as uncovered. Use this when the natural skill name does not match the route group literal, such as `landing-page`, `pricing-page`, `search-page`, or `help-center`.

**Required frontmatter fields:** `name`, `description`, `type`, `version`, `scope`, `triggers`, `keywords`, `owner`, `freshness`, `eval_status`, `drift_check`.

---

## Conflict Detection

### skill-overlap-detector.js

Compares all active skills pairwise across four dimensions:

| Dimension | Method | Signal |
|---|---|---|
| Description similarity | Jaccard on word bigrams | >0.4 = potential duplicate |
| Heading overlap | Shared H2/H3 headings (excluding boilerplate) | High overlap = structural duplication |
| Code duplication | Identical fenced code blocks >30 chars | Copy-paste anti-pattern |
| Imperative conflicts | Same target, opposite polarity (ALWAYS vs NEVER) | Agents get contradictory instructions |

**Commands:**

```bash
# Full overlap summary
node scripts/skill-overlap-detector.js

# Conflicting imperatives only
node scripts/skill-overlap-detector.js --conflicts

# Top 20 pairs by similarity
node scripts/skill-overlap-detector.js --top 20

# Custom Jaccard threshold
node scripts/skill-overlap-detector.js --threshold 0.3

# Write to file
node scripts/skill-overlap-detector.js --json --out /tmp/conflicts.json
```

### Imperative Extraction

The detector extracts imperative sentences from every SKILL.md body using two pattern groups:

**Positive imperatives** (must/always/required/use X for):
- `\b(?:always|must|required|mandatory)\b\s+(.{10,80})/gi`
- `\buse\s+(.{5,60})\s+(?:for|when|instead)/gi`

**Negative imperatives** (never/do not/must not):
- `\b(?:never|do\s+not|don't|must\s+not|prohibited)\b\s+(.{10,80})/gi`
- `\bdo\s+NOT\s+use\s+(.{5,60})/gi`

A conflict is reported when two skills reference the same backticked identifier, file path, or function name with opposite polarity.

### False-Positive Suppression (3-Check System)

The detector runs three checks before promoting a positive imperative match:

1. **Lookbehind check** — if `not`, `never`, `don't`, or `cannot` appears in the 20 characters before the positive match, suppress it. This catches "Do NOT use X" where "use X" would otherwise match the positive pattern.
2. **Within-match check** — if `not` appears between the start of the match and the target identifier (via backtick extraction), suppress it. This catches "must render as missing, not `$0.00`".
3. **Same-line dedup** — if the same target was already extracted as a negative on the current line, suppress any positive extraction for that target.

Without these checks, the three highest-false-positive sources are: `` `$0.00` `` (43 phantom positives), `` `query()` `` (42), and `` `org_id` `` (39).

### Conflict Categories

| Category | Description | Typical Fix |
|---|---|---|
| Phantom refs | Routing config maps to a skill directory that does not exist | Delete the stale entry from `skill-routing-config.json` |
| Code duplication | Two skills contain identical fenced code >30 chars | One skill owns the example; the other links to it |
| Heading overlaps | Identical H2/H3 headings across unrelated skills | Acceptable for structural templates (e.g., model profiles); review the differentiating content |
| Imperative conflicts | Skill A says always use X; skill B says never use X for the same target | Scope the instructions more precisely, or remove one skill's claim |

---

## Routing Health

### routing-gap-report.js

Reads two log files and the routing config to identify where the keyword map fails:

| Input | Purpose |
|---|---|
| `agent-orchestration/logs/routing-misses.jsonl` | Queries that matched zero skills — each entry has `keywords_tried` |
| `agent-orchestration/logs/eval-history.jsonl` | Eval results with `failure_category` and `skill` |
| `agent-orchestration/references/skill-routing-config.json` | Current `keywordMap` and `labelMap` |

**Commands:**

```bash
# Full report
node scripts/linear/routing-gap-report.js

# Only misses from the last 7 days
node scripts/linear/routing-gap-report.js --since 2026-03-21

# Only misses with count >= 5
node scripts/linear/routing-gap-report.js --min-misses 5

# JSON output
node scripts/linear/routing-gap-report.js --json
```

**Output sections:**

1. **Keyword gaps** — words appearing in routing-misses.jsonl but absent from `keywordMap`. Sorted by frequency.
2. **Eval failure breakdown** — skills with 2+ failures, grouped by `failure_category` (wrong_answer, missing_context, hallucinated_path, over_general, skill_not_activated).
3. **Suggested actions** — `add_keyword` entries for frequent gaps; `improve_skill` entries for failing skills with a primary category and suggested action.

**Signal hygiene:**

- The report suppresses low-signal tokens such as `v`, `v4`, `skill`, `start`, `events`, `daily`, `log`, `status`, and `health`.
- It also suppresses single-word misses that are already covered by an existing multi-word config phrase. Example: `error` is not suggested if `error recovery` already exists in `keywordMap`.
- It suppresses stale historical misses when the full query already routes under the current config. Example: `reports anomalies` should not keep surfacing `anomalies` once `reports` already resolves that query.
- It suppresses exact synthetic no-match probes used to verify the router's miss path. Example: `xyznonexistentkeyword` should not appear as a real routing gap.
- Phrase aliases beat fragment aliases. Add `content monitor`, `figma capture`, or `skill fix` before adding generic tokens like `monitor`, `capture`, or `fix`.
- Bundles do not participate in free-text matching. If `integrations` or another user query should resolve directly, add it to `keywordMap`; a bundle entry alone is insufficient.
- Treat the remaining list as candidates, not automatic edits. Sample the underlying `routing-misses.jsonl` queries before adding a new keyword.

**Current known miss clusters (as of 2026-03-28):**

| Keyword | Miss count | Likely target skill |
|---|---|---|
| `roundtable` / `boardmeeting` | command miss | `ai-coding-agents`, `orchestration` |
| `figma capture` / `figma import` | design workflow miss | `design-execution` |
| `data-health` | route miss | `data-status-layer`, `settings-pages` |
| `dsar` / `dsar requests` | privacy flow miss | `gdpr-compliance` |
| `invoice aging` / `v invoice aging` | reporting/view miss | `analytics-reporting`, `wholesale-payments` |
| `content monitor` | pipeline miss | `content-monitor` |

---

## Eval Quality

### 7-Eval Minimum

Every active skill must have at least 7 evals. The census enforces:
- **Error** if `evalCount < 3` (or warning for reference-scoped skills)
- **Warning** if `evalCount < 7`

Meeting 7 evals is not the goal — it is the floor. Well-exercised skills have 9–15 evals covering happy paths, edge cases, anti-patterns, and contradiction checks.

### Contradiction-Check Pattern

A `contradiction-check` eval tests that the agent correctly handles a documented exception or boundary condition that would otherwise be hidden by a simpler reading of the skill. The format:

```json
{
  "id": 5,
  "type": "contradiction-check",
  "grounding": "repo-specific",
  "difficulty": "adversarial",
  "prompt": "Skill A says always use orgQuery(). The report-export route uses query() with a comment. Is this wrong?",
  "expected_output": "Not wrong — query() with a // system: <reason> comment is the documented exception for cross-org system routes.",
  "expectations": [
    "Correctly identifies the documented exception from query-tier-safety rules",
    "Does NOT flag the usage as a bug without reading the inline comment",
    "Distinguishes system-use query() from app-code query() violations"
  ]
}
```

Use `contradiction-check` evals when:
- A skill has a documented exception that overrides the general rule
- Two adjacent skills appear to contradict each other but actually operate in different scopes
- A historical false positive or conflict was resolved and the resolution is non-obvious

### Negative Expectations Requirement

Every eval case that has an `expectations` array must include at least one expectation containing `does not`, `never`, `must not`, `should not`, or `do not`. This keeps evals from becoming pure happy-path tests. The census flags evals missing this pattern in `missingNegativeEvalIds`.

**Valid eval types:**

| Type | When to use |
|---|---|
| `knowledge` | Tests a factual claim or pattern from the skill |
| `contradiction-check` | Tests documented exceptions and boundary conditions |
| `browser` | Tests a browser-executable interaction (requires running server) |
| `edge-case` | Tests unusual inputs or rare conditions |
| `business-model` | Tests POD/e-commerce domain-specific logic |
| `negative` | Tests refusal or correct non-action |

---

## Maintenance Workflows

### Full Health Check

Run this sequence after any batch skill work (creating 3+ skills, changing routing config, or modifying skill content across multiple files):

```bash
# 1. Inventory snapshot
node scripts/skill/skill-census.js

# 2. Conflict detection
node scripts/skill-overlap-detector.js --conflicts

# 3. Routing gaps (last 7 days)
node scripts/linear/routing-gap-report.js --since $(date -v-7d +%Y-%m-%d)

# 4. Regenerate manifest + index
node scripts/skill/skill-census.js --json --write-manifest --write-docs
```

Review the output of steps 1–3 before running step 4. The manifest and index should reflect a clean state.

### Adding Evals to an Existing Skill

1. Read the skill's existing `evals/evals.json`
2. Identify gaps: are all eval types represented? Are there contradiction-checks for documented exceptions?
3. Draft new cases with `id`, `prompt`, `expected_output`, `expectations`, `type`, `grounding`, `difficulty`
4. Ensure every new case has at least one `Does NOT` expectation
5. Append to the `evals` array — never renumber existing IDs
6. Verify: `node scripts/skill/skill-census.js --human 2>&1 | grep <skill-name>`

### Fixing Imperative Conflicts

1. Run `node scripts/skill-overlap-detector.js --conflicts --json` to get the conflict list
2. For each conflict, identify which skill's instruction is more precise or more scoped
3. Options to resolve:
   - Narrow the instruction scope (e.g., "Use X in app code" instead of "Always use X")
   - Un-backtick the target identifier if the conflict is a parser false positive
   - Move the negative instruction to an anti-patterns table row that does NOT start with "Use"
   - Add a `// system: <reason>` style qualifier that the detector can distinguish
4. Re-run `--conflicts` to confirm the conflict is gone
5. Update the conflict count in `sales-hub/docs/reference/skill-eval-cross-audit-*.md` if you write a new audit

### Fixing Invalid Frontmatter

The census surfaces frontmatter errors per-skill. Common issues:

| Problem | Fix |
|---|---|
| `scope` field absent | Add `scope: codebase` for repo-specific how-to skills, `reference` for contract docs, or `portable` for reusable guidance |
| `drift_check` absent or stale | Add/update to today's ISO date |
| `eval_status` absent | Set to `evals` if evals exist, `pending` if not |
| `keywords` empty list | Add 3–5 natural-language phrases users would type |
| `description` too short | Must be quoted, ≥100 chars, include trigger phrases and negative bounds |
| `version` absent | Set to `1.0.0` for new skills |

After editing, re-run the census and confirm the skill no longer appears in the invalid-frontmatter list.

### Fixing route-group coverage

When `routeSkillMatrix` reports uncovered Sales Hub route groups but the owning skill already exists under a different name:

1. Add `route_groups` to the owner skill frontmatter with the literal group names from `sales-hub/scripts/lib/route-docs.js`
2. Re-run `node scripts/skill/skill-census.js --json`
3. Confirm `routeSkillMatrix.uncoveredGroups` is empty or reduced as expected

Do not create a duplicate skill only to satisfy the route-group matrix if a domain owner already exists.

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | What to Do Instead |
|---|---|---|
| Running `--write-manifest --write-docs` on a dirty skill tree | Writes a broken index to SKILL-INDEX.md and skills.manifest.json | Fix all census errors first, then regenerate |
| Fixing conflicts by deleting the instruction | Removes useful guidance that agents need | Narrow the scope of the instruction instead |
| Adding evals without negative expectations | Census flags them; they test only happy paths | Every eval must have at least one `Does NOT` expectation |
| Renumbering eval IDs during cleanup | Breaks eval-history.jsonl references that use numeric IDs | Always append; never renumber |
| Un-backticking an identifier to suppress a false positive when the conflict is real | Hides a real boundary ambiguity | Fix the skill wording to accurately reflect the scope |
| Adding keywords to `skill-routing-config.json` without a real skill to route to | Creates more broken mappings | Only add keywords that map to an existing skill directory |
| Treating heading overlap as always wrong | Model-profile skills legitimately share structure | Review the differentiating content instead of restructuring |
| Using scope: reference for a skill with file paths and repo-specific patterns | Reference scope downgrades eval error threshold to warning, masking real gaps | Use scope: codebase for any skill with repo-specific instructions |
| Producing a thin audit report after a multi-hour session | A 2-hour audit that outputs "5 entities missing evals" has performed a census, not an audit — 95% of the invested tokens are wasted. Census counts things; audits verify claims against evidence. | Every audited skill must have a filled scorecard, per-claim verdicts (VERIFIED/DRIFT), and a structured report. If the output doesn't reference specific file:line evidence, it's census, not audit. See `sales-hub/docs/guides/agent-skill-audit-guide-and-template.md` Section 0. |
| Running a "skill loop" or "skill evolution" without the minimum output specification | Agents read the methodology sections but skip the output format sections, then produce free-form summaries instead of structured deliverables | Before any skill audit/eval/improvement session, read Section 0 ("Minimum Output Specification") of the relevant guide. Templates exist — use them. |

---

## Verification Checklist

Before any batch skill commit:

- [ ] `node scripts/skill/skill-census.js` exits with zero critical errors
- [ ] Zero invalid frontmatter entries (validates v6 schema including the Health Block)
- [ ] Zero broken mappings in routing config
- [ ] All new skills have ≥7 evals
- [ ] All new evals include at least one negative expectation
- [ ] All new skills populate the five flat Understanding fields (`mental_model`, `purpose`, `boundary`, `analogy`, `misconception`) when `comprehension_state: present`
- [ ] `node scripts/skill-overlap-detector.js --conflicts` shows no NEW conflicts vs baseline
- [ ] `node scripts/linear/routing-gap-report.js` shows no new keyword gaps caused by your changes
- [ ] Health Block fields are read directly from frontmatter — no `eval-history.jsonl` or `health-ledger.jsonl` crawl for current state
- [ ] `node scripts/skill/skill-census.js --json --write-manifest --write-docs` completed without errors
- [ ] SKILL-INDEX.md header count matches actual skill count

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Writing new skill content or SKILL.md structure | `skill-scaffold` | skill-scaffold owns creation methodology; this skill owns the tooling |
| Evaluating task output quality with A/B testing | `evaluation` | evaluation owns the grading framework; this skill owns census health |
| Updating documentation after code changes | `doc-updater` | doc-updater owns the doc routing protocol |
