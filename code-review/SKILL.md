---
schema_version: 7
name: code-review
description: "This skill provides code review methodology for AI agents: pre-review validation checklists, review focus areas (correctness, security, performance, style), feedback patterns (actionable, specific, kind), AI-on-AI review workflows, PR review checklist, and the distinction between blocking vs non-blocking feedback. Use when reviewing pull requests, performing code review as part of task completion, or setting up AI-assisted review workflows. Do NOT use for design review (use design-review) or security-specific auditing (use security-scanning)."
type: capability
version: 1.1.0
scope: operational
family: workflow
triggers:
  - code-review-skill
keywords:
  - code review
  - pull request review
  - PR review
  - review checklist
  - review feedback
  - merge request
  - diff review
  - code quality feedback
  - PR feedback
owner: claude
freshness: "2026-03-25"
eval_status: evals
drift_check: "2026-03-25"
layer: quality
primaryCategory: Design & UX
layerPrimary: quality
routingRole: verifier
relations:
  adjacent:
    - design-review
    - security-scanning
    - task-execution
    - best-practice
  boundary:
    - design-qa-gate
  verify_with:
    - best-practice
    - quality-doctrine
---

# Code Review

> Structured methodology for reviewing code changes — whether reviewing your own work before committing, reviewing a teammate's PR, or setting up AI-assisted review pipelines.

## Generated Metadata

| Field | Value |
|---|---|
| Scope | `operational` |
| Skill type | `capability` |
| Primary category | `Design & UX` |
| Layer primary | `quality` |
| Routing role | `verifier` |
| Eval coverage | 27 case(s) across 2 file(s) |
| References | 2 file(s) |
| Relations | adjacent 4 · boundary 1 · verify_with 2 |
| Template source | `skills/code-review/SKILL.md.tmpl` |

> This block is generated from live skill metadata. Edit the template, eval files, relation graph, or references directory instead of editing this section in `SKILL.md` directly.

## Shared Workflow Preamble

- Start from the owning docs and the routed source files before proposing changes.
- Treat verification, documentation, and wrap findings as part of the task, not cleanup after the task.
- Keep evidence close to the work: commands, screenshots, receipts, and doc updates should land in the same change set.
- When this skill overlaps with `AGENTS.md`, `CONTEXT.md`, or repo command docs, use those files as the authority and this block as the common reminder layer.

## Coverage

This skill covers the full code-review process for this repo: understanding intent, analyzing the diff across review dimensions, producing structured feedback, and verifying that revised code actually resolves the important concerns.

## Philosophy

This skill exists to make review quality repeatable. A good review is not a vibe check; it is a structured pass that separates understanding, analysis, feedback, and verification.

## Key Files

| File | Purpose |
|---|---|
| `skills/code-review/SKILL.md.tmpl` | Template source that owns the generated skill text |
| `skills/code-review/evals/evals.json` | Review-quality eval cases and expected outputs |
| `skills/code-review/evals/eval-set.json` | Trigger routing tests for review-vs-boundary queries |
| `skills/code-review/references/review-dimension-rubrics.md` | Deeper rubric for correctness, security, performance, readability, conventions, and error handling |
| `skills/code-review/references/ai-review-prompt-templates.md` | Structured prompt patterns for cross-model review passes |
| `.opencode/commands/code-review.md` | OpenCode command surface that invokes this skill |
| `.claude/agents/code-reviewer.md` | Reviewer agent contract and escalation expectations |
| `scripts/model/cheap-code-review.js` | Low-cost review gate for diffs and commit ranges |

> This skill is methodology-focused — it governs how agents review code and diffs, not one product subsystem.


## Workflow

Use the review flow in this order: understand intent, analyze the change across the review dimensions, classify the feedback, and then verify whether the final state resolves the blocking concerns.


## 1. When this skill applies

| Use this skill for... | Use something else for... |
|---|---|
| reviewing pull requests for correctness, security, or style | visual or interaction quality (use design-review) |
| AI-on-AI review workflows (GPT-5.4 or Gemini reviewing Sonnet output) | penetration testing or static security scanning (use security-scanning) |
| self-review before marking a task done | running full QA test suites (use task-execution) |
| giving structured feedback on code changes | reviewing database schema changes (use data-architect) |

---

## 2. Review Phases

Run phases in order. Each phase has a specific question it answers.

| Phase | Question | Output |
|---|---|---|
| **Understand** | What is this change trying to do? | Mental model of intent |
| **Analyze** | Does the code do what it claims? | List of concerns |
| **Feedback** | How should the author act on each concern? | Structured comments |
| **Verify** | Did the revised code address the concerns? | Pass/fail verdict |

### Phase 1 — Understand

Before reading a single changed line:

1. Read the PR title, description, and linked issue.
2. Identify the acceptance criteria. If none exist, state that the review is blocked until they are defined.
3. Identify the files in scope and files intentionally excluded.
4. Note the expected behavior change from the user's perspective.

**Anti-pattern:** Jumping straight into the diff without reading context. The diff tells you what changed; the description tells you what should have changed.

### Phase 2 — Analyze

Read the diff with these six dimensions in sequence (from Fabric review_code pattern). For detailed per-dimension questions, see `references/review-dimension-rubrics.md`.

```
1. Correctness      →  Does the logic implement the stated intent?
2. Security         →  Does the change introduce or preserve a vulnerability?
3. Performance      →  Is there a clear performance regression?
4. Readability      →  Is the code easy to understand and maintain?
5. Conventions      →  Does the code follow language and project conventions?
6. Error Handling   →  Are edge cases, failures, and error paths covered?
```

Open questions per lens:

**Correctness:**
- Does each function do what its name implies?
- Are edge cases (null, empty, negative, overflow) handled?
- Do the tests cover the new code path?
- Are any assumptions undocumented?

**Security:**
- Does the change touch authentication or authorization? If yes, flag for deeper review.
- Is input validated at the boundary before use?
- Could the change expose PII in logs, error messages, or API responses?
- Are secrets loaded from env vars, not hardcoded?

**Performance:**
- Are there N+1 query patterns introduced?
- Are expensive operations in hot paths (render loops, request handlers)?
- Are large objects serialized unnecessarily?

**Readability (from Fabric review_code):**
- Do names describe intent clearly?
- Is complexity hidden behind abstraction or exposed clearly?
- Could a new team member understand this code without context?

**Conventions:**
- Is the file structure consistent with adjacent files?
- Are project patterns followed (query tiers, auth guards, token usage)?
- Are imports organized consistently?

**Error Handling:**
- Are all error paths handled (not just the happy path)?
- Do catch blocks log and report, not swallow silently?
- Are edge cases documented if not handled?

### Phase 3 — Feedback

For each concern, write a structured comment:

```
[BLOCKING | ADVISORY | QUESTION | NITPICK] — Dimension: [correctness|security|performance|readability|conventions|error-handling]

What: [One sentence describing the issue]
Why: [Why this matters — correctness, security, performance, or style]
Fix: [Concrete suggestion — code snippet or reference]
```

Example:
```
[BLOCKING]

What: The `getOrder` function calls the database inside a loop over line items.
Why: This is an N+1 query — 50 line items means 51 database round-trips.
Fix: Fetch all line items in a single query using an IN clause before the loop.
```

### Phase 4 — Verify

After the author addresses feedback:

- Confirm each blocking concern is resolved.
- Spot-check that advisory items were considered, not silently dropped.
- Re-read the acceptance criteria and confirm the final diff satisfies them.

---

## 3. Comment Classification

| Level | Meaning | Must be resolved before merge? |
|---|---|---|
| **BLOCKING** | Correctness bug, security vulnerability, or broken contract | Yes |
| **ADVISORY** | Meaningful improvement the author should weigh | Author decides |
| **QUESTION** | Reviewer does not understand — needs author explanation | Yes (explanation or code change) |
| **NITPICK** | Style or naming preference with no correctness impact | No |

**Rule:** Never block a merge on a NITPICK. Reserve BLOCKING for things that would cause a bug or security issue if shipped.

---

## 4. Feedback Patterns

### Be specific, not vague

| Vague | Specific |
|---|---|
| "This could be better." | "This regex will match phone numbers without country codes. Add a `+` prefix requirement." |
| "Security concern here." | "The `userId` is taken directly from `req.query` without validation — pass it through `z.string().uuid()` first." |
| "Performance issue." | "The `filter` + `map` chain runs twice over the same array. Combine into a single `reduce`." |

### Separate observation from prescription

State what you see first, then what to do about it. This separates the diagnosis (which the author can confirm or dispute) from the fix (which the author might implement differently).

```
Observation: `syncShopifyOrders` calls `updateOrder` once per webhook event even when the
             order data has not changed since the last sync.
Suggestion:  Add an ETag or `updated_at` comparison before calling `updateOrder` to skip
             no-op writes.
```

### Keep QUESTION comments short

A QUESTION is a request for the author's reasoning — not an implicit criticism. Phrase it neutrally:

```
QUESTION: Why does `applyDiscount` receive the full order object instead of just the
          discount amount and subtotal? Is the extra data used elsewhere in the function?
```

---

## 5. AI-on-AI Review Patterns

When an AI agent reviews another AI agent's output. For structured prompt templates, see `references/ai-review-prompt-templates.md`.

**Use GPT-5.4 or Gemini as the reviewer** when the output came from Claude. Different models surface different blind spots.

**What to include in the review prompt:**
1. The PR description and acceptance criteria
2. The diff or changed files
3. The test output (TypeScript, ESLint, test runner)
4. Explicit review focus: `correctness | security | performance | style`

**What not to include:**
- The reviewer's own output from a prior session (contaminates the perspective)
- Vague instructions like "review this" — always specify the lens

**Review output shape to request:**

```markdown
## Code Review

### Blocking concerns
- [one per line, with file:line reference]

### Advisory suggestions
- [one per line]

### Questions for the author
- [one per line]

### Verdict: APPROVE | REQUEST_CHANGES | NEEDS_DISCUSSION
```

**When to skip AI-on-AI review:** For micro-tasks (copy fixes, token tweaks, single-line changes), self-review with the checklist below is sufficient.

---

## 6. PR Description Quality

A PR that is hard to review is a PR that takes longer and gets worse feedback. Before requesting review, verify the PR description answers:

| Question | What a good answer looks like |
|---|---|
| What does this change do? | One sentence in plain English |
| Why is it needed? | Links to issue or explains the user need |
| How was it tested? | List of test types run and result |
| Are there open questions? | Named explicitly, not implied |
| What is the rollback plan? | Only required for schema or API changes |

A PR description missing the "why" is a code review smell. The reviewer cannot evaluate correctness without knowing intent.

---

## 7. Self-Review Checklist (Before Committing)

Run this before marking any task done:

```
Code quality
[ ] No console.log, debug code, or commented-out blocks
[ ] No hardcoded secrets, emails, or user data
[ ] TypeScript compiles cleanly (npx tsc --noEmit)
[ ] ESLint passes on changed files
[ ] No `any` types introduced

Correctness
[ ] Edge cases handled: null, empty array, zero, negative numbers
[ ] Error paths have explicit handling, not silent swallows
[ ] New code paths have corresponding tests
[ ] Acceptance criteria from the task are all met

Security
[ ] No PII in log calls (use safeConsole)
[ ] No new raw SQL string interpolation
[ ] Auth checks present on new routes
[ ] Input validated at the boundary

Documentation
[ ] Changed function signatures have updated comments
[ ] New env vars documented in .env.example
[ ] Breaking changes noted in PR description
```

---

## 8. Commit Message Review

Commit messages are documentation. Review them with the same rigor as code.

| Good commit message | Why it works |
|---|---|
| `fix(orders): prevent N+1 when loading line items (SH-2700)` | Type + scope + what + ticket |
| `feat(sync): add idempotency key to Shopify webhook handler` | Explains the mechanism, not just "added webhook" |
| `refactor(auth): extract session validation into shared utility` | Describes intent, not mechanics |

| Poor commit message | What is wrong |
|---|---|
| `fix bug` | No scope, no context |
| `WIP` | Not a complete unit of work |
| `changes` | Completely opaque |
| `fixed the thing Jacob mentioned` | Non-searchable, non-reproducible |

**Rule:** If a reviewer cannot understand the change from the commit message without opening the diff, the message is wrong.

---

## 9. Test Coverage Verification

A change without tests is a change with an unknown risk profile.

| Change type | Minimum test expectation |
|---|---|
| New function or method | At least one happy-path and one error-path test |
| Bug fix | A regression test that would have caught the original bug |
| API endpoint | Request/response shape test + auth test |
| Database query | Test against a real or test DB, not a mock |
| UI component | Render test + interaction test for key states |

**Anti-pattern:** Test files that only test the happy path. Correctness bugs almost always live in the error path, the empty state, or the edge case.

---

## 10. Drift Traps

- Do not approve a PR because the tests pass. Tests only verify what the author thought to test.
- Do not BLOCK on ADVISORY items when a BLOCKING concern would also block — triage your feedback.
- Do not skip the Understand phase because the diff looks small. Small diffs introduce most regressions.
- Do not conflate QUESTION with implicit criticism — make the neutral intent explicit.
- Do not review your own output immediately after writing it; context bias is real.

---

## 11. SOLID Principles Checklist

When reviewing code, evaluate against these five principles:

### S - Single Responsibility
Each module/class/function should have one reason to change.
- Does this component mix data fetching with rendering?
- Does this route handler mix auth, validation, and business logic?
- Sales Hub check: Is `orgQuery()` usage separated from business logic?

### O - Open/Closed
Open for extension, closed for modification.
- Can new behavior be added without modifying existing code?
- Sales Hub check: Can a new sales channel be added by implementing `IntegrationProvider` without touching existing adapters?

### L - Liskov Substitution
Subtypes must be substitutable for their base types.
- Do all `IntegrationProvider` implementations honor the interface contract?
- Sales Hub check: Can `ShopifyProvider` and `EtsyProvider` be swapped without breaking callers?

### I - Interface Segregation
No client should be forced to depend on methods it does not use.
- Are interfaces minimal and focused?
- Sales Hub check: Does `FulfillmentProvider` force adapters to implement methods they don't need?

### D - Dependency Inversion
High-level modules should not depend on low-level modules. Both should depend on abstractions.
- Does business logic depend on database implementation details?
- Sales Hub check: Does the reconciliation engine depend on Shopify-specific types, or on the canonical order interface?

> Source: Robert C. Martin "Agile Software Development" (2002)

---

## Verification

After applying this skill, verify:

- [ ] The review covered correctness, security, performance, readability, conventions, and error handling where applicable
- [ ] Blocking issues are clearly separated from advisory, question, and nitpick feedback
- [ ] Review comments are grounded in the actual diff and acceptance criteria
- [ ] The final verdict matches the evidence surfaced during the review

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| `code-review` | `design-review` | `design-review` owns visual and interaction quality gates |
| `code-review` | `security-scanning` | `security-scanning` owns dedicated vulnerability and security-audit workflows |
| `code-review` | `design-qa-gate` | `design-qa-gate` owns browser-based design evidence gathering rather than code-level review |

---

*Version 1.1.0 — Updated 2026-03-25. Added references/, verify_with relations, expanded keywords, 3 new evals.*
