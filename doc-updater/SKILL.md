---
schema_version: 7
name: doc-updater
description: "This skill enforces the mandatory documentation update protocol: identifying all affected docs for a code change, routing new content to the correct file via the doc routing table, updating AGENTS.md, CONTEXT.md, MEMORY.md, and skill files as needed, and staging doc changes in the same commit as the code. Use for EVERY task that changes code — docs must ship in the same commit, never after. Use when unsure which doc to update, when a feature affects multiple doc files, or at the pre-commit step of any task. Do NOT mark a task done without completing this skill's checklist."
type: workflow
version: 4.1.0
scope: operational
family: knowledge
triggers:
  - doc-updater-skill
  - planning-mode
  - review-mode
owner: claude
freshness: "2026-03-18"
eval_status: evals
drift_check: "2026-03-18"
layer: meta
primaryCategory: Agent System
layerPrimary: meta
routingRole: universal
relations:
  verify_with:
    - api-connector-patterns
    - nextauth-patterns
    - email-templates
comprehension_state: present
mental_model: "Documentation updates are an atomic part of the code change, not a post-task chore. Think of it like a database transaction: the code change and the doc update must commit together or the transaction is incomplete."
purpose: "To eliminate the problem of 'stale documentation' by forcing every code change to synchronously update the docs that describe it, ensuring the next agent reads reality, not history."
boundary: "This skill enforces the *workflow* of updating docs (when, where, and how to verify). It does NOT dictate the *content quality* of the docs, which belongs to `documentation`, nor the routing rules themselves, which belong to `docs-development`."
analogy: "Doc updating is like leaving a trail of breadcrumbs in a maze; if you move a wall but don't update the map, the next person will crash into the wall."
misconception: "A common misconception is that documentation can be done in a separate PR or at the end of the week. This skill enforces that code and docs must land in the same atomic git commit."
---

## Concept Card

**What it is:** The mandatory workflow protocol for keeping documentation synchronized with code changes. It forces agents to check `git diff`, route changes via the canonical table, update docs, and include those updates in the same commit.

**Mental model:** Documentation updates are an atomic part of the code change, not a post-task chore. Think of it like a database transaction: the code change and the doc update must commit together or the transaction is incomplete.

**Why it exists:** AI agents rely entirely on documentation to understand system state. Undocumented changes create false state for the next agent, leading to hallucinations, broken code, and wasted sessions. This workflow prevents knowledge drift at the source.

**What it is NOT:** It is not a writing style guide (that is `documentation` / `STYLE.md`). It is not the author of the routing rules (that is `docs-development`). It is strictly the enforcement mechanism for the update lifecycle.

**Adjacent concepts:** Git atomic commits, documentation-first development, Diátaxis framework, traceability.

**One-line analogy:** It is a strict checkout clerk that refuses to ring up your code changes unless you present the matching documentation updates in the same basket.

**Common misconception:** That docs can be updated "after the task is done" or in a separate commit. The protocol explicitly defines a task as `PARTIAL` if the docs are not in the exact same commit as the code.

# Documentation Updater Skill

> **MANDATORY. Docs are updated in the same commit as the code change — not after task completion.**
> For multi-commit tasks, run this workflow before EACH commit. Cannot mark a task DONE without completing all steps.
> Skipping doc updates = PARTIAL result, not DONE.

**CONTEXT.md is now a slim index.** Do NOT add content to CONTEXT.md — route it to the appropriate domain doc.

## Generated Metadata

| Field | Value |
|---|---|
| Scope | `operational` |
| Skill type | `workflow` |
| Primary category | `Agent System` |
| Layer primary | `meta` |
| Routing role | `universal` |
| Eval coverage | 24 case(s) across 2 file(s) |
| References | 1 file(s) |
| Relations | adjacent 0 · boundary 0 · verify_with 3 |
| Template source | `skills/doc-updater/SKILL.md.tmpl` |

> This block is generated from live skill metadata. Edit the template, eval files, relation graph, or references directory instead of editing this section in `SKILL.md` directly.


## Key Files

> **Placeholder** — This operational skill does not yet declare its key files.
> Add the primary repository files this skill references so agents can locate
> source-of-truth files without searching.

| File | Purpose |
|---|---|
| *(add key files here)* | |
## Shared Workflow Preamble

- Start from the owning docs and the routed source files before proposing changes.
- Treat verification, documentation, and wrap findings as part of the task, not cleanup after the task.
- Keep evidence close to the work: commands, screenshots, receipts, and doc updates should land in the same change set.
- When this skill overlaps with `AGENTS.md`, `CONTEXT.md`, or repo command docs, use those files as the authority and this block as the common reminder layer.

## Coverage

This skill covers the mandatory documentation update workflow for code changes: identify the diff, route each change to the correct docs, update those docs before staging, verify the updates, and report the documentation work in the final task summary.

## Philosophy

This skill exists because undocumented code changes create false state for the next agent. Documentation is part of the task, not optional cleanup after the code is done.

## Workflow

Use the five-step workflow below in order: diff check, routing, updates, verification, and completion reporting.


---

## 5-Step Doc Update Workflow (Execute in Order)

### Step 1 — Diff Check (FIRST action, no exceptions)

Run this from the repo root before writing a single doc:

```bash
cd /c/Users/Jacob/Development && git diff --name-only HEAD
```

If nothing staged yet, check staged + unstaged:

```bash
git diff --name-only && git diff --cached --name-only
```

**Output every filename.** This list drives the rest of the steps.

---

### Step 2 — Route Each Changed File to Its Doc

**Canonical routing table:** See `AGENTS.md § Document Routing Table`. For EVERY file in the diff output, find its matching row(s) and apply them. Update `agent-orchestration/STATE.md` and `sales-hub/STATE.md` **when running as an orchestrator session** (task-manager, /manage, /grind, /solo). Not required for one-off code tasks — see routing table row "Session state change" for the full scope rule.

If a file in your diff matches no row, confirm with reasoning that no doc update is needed and state it explicitly.

See also the **Quick Routing Reference** at the bottom of this skill for fast pattern matching.

---

### Step 3 — Update Each Routed Doc

For every row marked above:

1. **Read** the target doc first
2. **Edit** the appropriate section — add or update content
3. **Add the update marker**: `(Updated YYYY-MM-DD — SH-XX)` to the section header

Use this template for new sections:

```markdown
### [Section Name] (Updated YYYY-MM-DD — SH-XX)

**Change Summary:**
[What changed and why]

**Files:** `path/to/changed/file.ts`
```

---

### Step 3.5 — Quality Gate (per-doc checklist)

After writing each doc update, verify it meets these quality standards. A doc that is updated but poorly written is still a failure.

#### Type Purity (from `STYLE.md § Extended Diátaxis`)

| Doc Type | Must Contain | Must NOT Contain |
|----------|-------------|------------------|
| **Reference** | Tables, code blocks, file paths, terse facts | Step-by-step instructions, narrative prose, opinions |
| **Tutorial** | Numbered steps, expected outcomes, hand-holding | Reference tables, dense API specs |
| **Specification** | Version number, changelog, precise formulas | How-to guides, session state |
| **Skill** | Patterns, anti-patterns, verification steps | Session-specific context, ephemeral notes |
| **State** | Timestamps, activity entries, handoff notes | Architecture decisions, permanent reference data |
| **Report** | Findings, evidence, severity ratings | Mutable instructions (reports are archived, never updated) |

If your update violates type purity (e.g. adding tutorial steps to a reference doc), refactor it — move the content to the correct doc type and link between them.

#### Machine-Scannability

Every doc update must be quickly parseable by another agent:

- [ ] **Headings** use `##`/`###` hierarchy (max depth `####`)
- [ ] **Structured data** uses tables, not prose paragraphs (e.g. API params, env vars, file lists)
- [ ] **Code blocks** specify language (` ```typescript `, ` ```sql `, ` ```bash `)
- [ ] **File paths** are absolute from repo root or use `@/` alias
- [ ] **No wall of text** — break prose into bullets or short paragraphs (max 3 sentences per paragraph)

#### Content Quality

- [ ] **Update marker present** — `(Updated YYYY-MM-DD — SH-XX)` in section header
- [ ] **Concrete, not vague** — "Added `POST /api/orders/export` endpoint" not "Updated API docs"
- [ ] **No stale content left** — if updating a section, check the surrounding context is still accurate
- [ ] **Links valid** — any internal links (`§ Section`, `file.md`) point to things that exist

---

### Step 4 — Verify Updates Were Written

Run this grep to confirm the task identifier appears in all docs you updated:

```bash
grep -r "SH-XX" /c/Users/Jacob/Development/sales-hub/docs/ /c/Users/Jacob/Development/agent-orchestration/ --include="*.md" | grep -v STATE
```

Expected: at least one hit per doc you updated. If a doc shows zero hits → you forgot to add the marker → go back and add it.

Also verify STATE.md entries:
```bash
grep "SH-XX" /c/Users/Jacob/Development/agent-orchestration/STATE.md /c/Users/Jacob/Development/sales-hub/STATE.md
```

---

### Step 5 — Fill in the Completion Report

Your final Linear summary comment AND your RESULT output MUST include this section (fill in every line):

```markdown
## Docs Updated

| Doc | What Was Added/Changed |
|-----|----------------------|
| agent-orchestration/STATE.md | Activity entry: [date] — (orchestrator sessions only) |
| sales-hub/STATE.md | Current task updated — (orchestrator sessions only) |
| [specific doc per routing table] | [what section, what changed] |
| ... | ... |

**Verification:** `grep "SH-XX" ...` returned [N] hits across [N] files.
```

If genuinely no domain docs needed updating (e.g. pure test fix, README typo), write:

```markdown
## Docs Updated

No domain docs updated — no API/DB/env/integration/security/KPI/design changes in diff.
Diff contained: [list files from Step 1]
```

**Note:** STATE.md entries are only required for orchestrator sessions (task-manager, /manage, /grind, /solo). One-off code tasks do not need STATE.md updates.

**You CANNOT leave "Docs Updated" blank or omit it. PARTIAL result if missing.**

---

> **Routing table:** See `AGENTS.md § Document Routing Table (ALWAYS — Not Opt-In)` — that is the canonical, complete source. Do not add a routing table here.

## Verification

After applying this skill, verify:

- [ ] Every changed file was checked against the routing table
- [ ] All required docs were updated before staging
- [ ] Any stale references caused by renames or deletions were fixed in the same change
- [ ] The final completion report explicitly names the docs that were updated

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| `doc-updater` | `documentation` | `documentation` owns doc type, structure, and writing quality |
| `doc-updater` | `docs-development` | `docs-development` owns the routing system and governance rules |
