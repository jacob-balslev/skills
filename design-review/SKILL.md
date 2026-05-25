---
schema_version: 7
name: design-review
description: "This skill enforces mandatory pre-task and post-task design quality gates for all UI work: pre-task intent declaration (what will change, what must not break), post-task visual verification checklist (spacing, alignment, color, motion, responsiveness), and escalation rules when a review fails. Use before starting any task that modifies visual UI, and again after implementation before marking a task done. This skill can block task completion — a failing post-task review means the task is NOT done. Do NOT skip for 'small' changes — visual regressions most often come from cosmetic-looking edits."
type: workflow
version: 2.3.0
scope: operational
family: workflow
triggers:
  - design-mode
  - design-review
  - ui-mode
  - frontend-layer
  - visual-qa
owner: claude
freshness: "2026-03-24"
eval_status: evals
drift_check: "2026-03-24"
layer: quality
primaryCategory: Design & UX
layerPrimary: quality
routingRole: verifier
relations:
  verify_with:
    - visual-design
    - design-qa-gate
    - composition-theory
---

# Design Review Skill — Quality Gates

> Enforces visual quality through mandatory pre-task and post-task checklists. Every agent working on UI MUST follow this skill.

**Authority:** This skill can block task completion. A failing post-task review means the task is NOT done.

## Role In The Stack

- `visual-design` defines what good visual quality looks like.
- `design-qa-gate` gathers evidence in the running browser.
- `design-review` decides whether the work passes, needs revision, or is blocked.

Use this skill for gatekeeping and verdicts. Use `design-qa-gate` when the task needs the evidence loop spelled out in browser terms.

> **Project overlay:** A Sales Hub-specific overlay exists at `skills/sales-hub/design-review/SKILL.md`. It adds SH brand constraints (zero-hue policy, specific token values, financial data display rules, files to audit). When working on Sales Hub, the skill-router automatically resolves to the overlay — which instructs you to read this base file first. Both files are intentional: this one holds the generic framework; the overlay holds project constraints. Do NOT merge them.

## Generated Metadata

| Field | Value |
|---|---|
| Scope | `operational` |
| Skill type | `workflow` |
| Primary category | `Design & UX` |
| Layer primary | `quality` |
| Routing role | `verifier` |
| Eval coverage | 22 case(s) across 2 file(s) |
| References | 2 file(s) |
| Relations | adjacent 0 · boundary 0 · verify_with 3 |
| Template source | `skills/design-review/SKILL.md.tmpl` |

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

This skill covers the mandatory design-quality review flow for UI work: when the gate applies, what evidence it needs, how to assess the result, and what verdicts are allowed before work can be considered done.

## Philosophy

This skill exists because visual quality, interaction quality, and design-system compliance drift silently when they are not reviewed through an explicit gate. It turns design review from taste into a repeatable pass/fail process.

## Workflow

Use this skill in three phases: pre-task intent review, implementation-time standards enforcement, and post-task visual verification with an explicit verdict.


---

## When This Skill Activates

Load this skill when the task involves ANY of:
- New UI components or pages
- Modifications to existing visual elements
- Styling changes (SCSS, CSS, layout)
- Design system work (tokens, patterns)
- Accessibility improvements
- Dark mode adjustments
- Responsive layout changes
- Data visualization (charts, tables, KPI cards)
- Any task labeled `design-mode`, `ui-mode`, or `frontend-layer`

---

## Quick Token Reference

Use design tokens for all styling — never raw hex, px, or magic numbers. Token categories below are generic examples; always defer to the active project fork for exact token names.

```scss
// Surfaces (elevation layers)
var(--surface-sunken)    // Page background
var(--surface-default)   // Cards, panels
var(--surface-raised)    // Popovers, dropdowns
var(--surface-overlay)   // Modals, dialogs

// Text
var(--text-primary)      // Headings, body copy
var(--text-secondary)    // Labels, descriptions
var(--text-muted)        // Placeholders, hints
var(--text-disabled)     // Inactive elements

// Interactive (project-dependent — see project fork)
var(--brand)             // Primary interactive color
var(--brand-hover)       // Hover state
var(--focus-ring-color)  // Focus ring

// Spacing (4px grid baseline)
var(--space-1) = 4px    var(--space-2) = 8px
var(--space-3) = 12px   var(--space-4) = 16px
var(--space-5) = 20px   var(--space-6) = 24px
var(--space-8) = 32px   var(--space-10) = 40px

// Radii
var(--radius-sm)   var(--radius-md)
var(--radius-lg)   var(--radius-full)

// Status (semantic — available in all projects)
var(--status-success-bg)   var(--status-success-text)
var(--status-error-bg)     var(--status-error-text)
var(--status-warning-bg)   var(--status-warning-text)
var(--status-info-bg)      var(--status-info-text)
```

> **Project fork:** Exact token values (light/dark) and additional project-specific tokens are defined in each project's SKILL.md overlay and `_tokens.scss`. Always consult the fork for authoritative values.

---

## PRE-TASK GATE: Research & Planning

**Purpose:** Prevent building the wrong thing. Ensure design alignment before code exists.

### Checklist (ALL items required before implementation begins)

### 0. Classify The Task Tier

Every UI task is one of:

| Tier | Use For | Minimum Verification |
|---|---|---|
| `micro` | tiny copy/style fix, no new state/layout | self-review |
| `standard` | component/page refinement, new component, meaningful state/layout change | self-review + screenshots |
| `major` | new page, redesign, system-wide visual/interaction change | full screenshots + critic + reviewer |

Default to `standard`.

#### 1. Brand Knowledge Loaded

Read your project's brand guide and design tokens before implementing. You must be able to cite:
- The accent color and its usage constraints
- The type scale and spacing grid
- At least 3 known anti-patterns to avoid

#### 2. Existing Patterns Audited

Search for existing implementations of what you're building. Questions to answer:
- Does a similar component already exist? → Extend it, don't duplicate.
- What tokens do adjacent components use? → Match them for consistency.
- What's the current state of dark mode in this area? → Verify before modifying.

#### 3. Design Intent Declared

Output this declaration before any implementation:

```
PRE-TASK DESIGN REVIEW
======================
Task: [ID + title]
Tier: [micro | standard | major]
Scope: [New component | Modification | Redesign | Bug fix]
Brand alignment: [Which brand principle this serves]
Tokens planned: [List of var(--*) tokens you'll use]
Components reused: [List of existing components]
States to implement: [default, hover, focus, disabled, loading, empty, error]
Feedback plan: [acknowledge -> progress -> completion -> recovery]
Breakpoints: [Which breakpoints need work]
Dark mode impact: [Yes/No — if yes, which tokens change]
Risks: [What could go wrong]
```

#### 4. Research Completed

- [ ] Context7 queried for relevant library docs
- [ ] Memory MCP searched for related patterns/decisions
- [ ] Figma checked (if design exists)
- [ ] Existing codebase patterns audited

**GATE PASS CRITERIA:** All 4 sections completed. Declaration outputted. Proceed to implementation.

---

## IMPLEMENTATION STANDARDS

While implementing, enforce these rules continuously:

### Token Compliance (Zero Tolerance)

| Property | Must Use | Never Use |
|----------|----------|-----------|
| Colors | `var(--surface-*)`, `var(--text-*)`, `var(--accent-*)`, `var(--status-*)`, `var(--border-*)` | Raw hex, rgb(), hsl() |
| Spacing | Spacing tokens (e.g., `var(--space-*)`) | Raw px/rem values |
| Radii | Radius tokens (e.g., `var(--radius-*)`) | Raw border-radius values |
| Typography | Typography tokens (e.g., `var(--text-*)`) | Raw font-size values |
| Shadows | Shadow tokens (e.g., `var(--shadow-*)`) | Raw box-shadow values |

**Exception:** `1px` for borders is acceptable. `0` for resets is acceptable.

> **Project-specific note — accent tokens:** `var(--accent-*)` is valid in projects that use brand color accents. **Sales Hub forbids accent tokens in UI chrome** — zero hue policy. Use `var(--brand)` (maps to neutral grey: Grey-700 light / Grey-400 dark) for interactive elements. Only `var(--status-*)` tokens carry semantic color in Sales Hub.

### State Completeness

Every interactive element MUST implement:

| State | Implementation | Verify |
|-------|----------------|--------|
| Default | Base styling with tokens | Visual inspection |
| Hover | `:hover:not(:disabled)` | Mouse hover test |
| Focus | `:focus-visible` with accent ring, `2px offset` | Tab key test |
| Active | `:active` subtle press feedback | Click test |
| Disabled | `opacity: 0.5; cursor: not-allowed` + explanation | Programmatic disable test |
| Loading | Skeleton matching content layout | Network throttle test |
| Empty | Icon (48-64px) + heading + description + CTA | Zero-data test |
| Error | Error message + retry action | Error simulation test |

### Feedback Completeness

Every meaningful interaction should answer four questions:

1. Did the system receive the input?
2. Is work in progress?
3. What changed?
4. What can the user do next?

#### Response-time guidance

| Delay | UX requirement |
|---|---|
| `0-200ms` | Show nothing — avoid flash of loading UI |
| `200ms-1s` | Preserve flow with subtle busy/transition feedback |
| `1-2s` | Visible spinner at action scope |
| `>2s` | Progress text or percent-done indicator |
| `>10s` | Percent-done estimate and interruptibility when possible |

#### Feedback patterns

| Situation | Preferred Pattern | Avoid |
|---|---|---|
| Page/data load | Skeleton states | Blank screen, spinner-only page |
| Local action | Inline loading near the action | Full-screen blocking overlay |
| Long process | Percent-done indicator | Endless spinner |
| Success | Explicit success state or clear changed result | Silent completion |
| Recoverable failure | Inline error + retry/undo/cancel | Error text with no next step |

### Financial Data Rules

| Rule | Implementation |
|------|----------------|
| All amounts: `tabular-nums` | `font-variant-numeric: tabular-nums` on the element or parent |
| Right-aligned in columns | `text-align: right` on number cells |
| Currency symbol present | Prefix on all monetary amounts |
| Comma thousands separator | `Intl.NumberFormat` or equivalent |
| 2 decimal places | Always, even on round numbers |
| Missing data: never zero | Show `—` with explanatory CTA |
| Estimated data | Prefix indicator (e.g., `~`) with visual differentiation |
| Negative values | Minus prefix + semantic color + directional icon |

### Dark Mode Verification

After implementing any visual change:

| Check | How |
|-------|-----|
| Both modes tested | Screenshot light AND dark |
| No white flash | `color-scheme: dark` on `<html>` |
| No shadows in dark | Borders replace shadows for elevation |
| Text readable | Primary text contrast ≥ 4.5:1 |
| Status badges visible | All semantic colors work on dark surfaces; project may require neutral-only badges |

---

## POST-TASK GATE: Visual Verification

**Purpose:** Catch regressions, ensure quality, enforce brand. This gate MUST pass before the task is marked complete.

### Validation Posture

- Start with objective description: what is visibly present, where it sits, and how strong it reads.
- Ignore code intent until the visual evidence is described.
- Assume the goal is not achieved until the screenshots and interactions prove otherwise.
- Hunt for failure evidence on purpose; "different" is not the same as "correct."

### Tier 1: Self-Review (Always Required)

Screenshot at 3 breakpoints × 2 modes = 6 screenshots:
- Desktop (1200px) light + dark
- Tablet (768px) light + dark (if responsive work)
- Mobile (375px) light + dark

**Review each screenshot against this checklist:**

#### Visual Hierarchy
- [ ] ONE clear primary element per viewport
- [ ] Hierarchy works in greyscale (mentally remove color)
- [ ] Eye flows naturally: primary → secondary → tertiary
- [ ] White space groups related elements (Gestalt proximity)
- [ ] Primary vs secondary separation is obvious by position, size, weight, spacing, or contrast

#### Interaction Feedback
- [ ] Every important action acknowledges input immediately
- [ ] Busy states appear when delay is noticeable
- [ ] Success is visible and unambiguous
- [ ] Recoverable failures include next-step guidance
- [ ] No long spinner-only waits where progress can be estimated

#### Brand Compliance
- [ ] 90%+ greyscale surface area
- [ ] Accent color appears only where brand guidelines permit
- [ ] No raw hex colors in source
- [ ] Dark mode looks intentional, not broken
- [ ] Status badges: icon differentiates state, not color alone — some projects require neutral grey (`--grey-100` bg) with no color accent (check project fork for badge policy)

#### Typography
- [ ] All sizes from typography token scale
- [ ] Financial values: right-aligned, tabular-nums
- [ ] Max 3 font weights visible per page

#### Accessibility
- [ ] Focus rings on all interactive elements (Tab through)
- [ ] Touch targets ≥ 44px
- [ ] `aria-label` on icon-only buttons
- [ ] Color not sole signifier
- [ ] `prefers-reduced-motion` respected

#### States & Edge Cases
- [ ] Loading state (skeleton)
- [ ] Empty state (icon + text + CTA)
- [ ] Error state (message + retry)
- [ ] Long text handled (truncation or wrapping)
- [ ] Zero items handled gracefully
- [ ] Slow network / delayed action remains understandable

#### Responsive
- [ ] Mobile: no horizontal overflow
- [ ] Tablet: appropriate reflow
- [ ] Desktop: full width utilized
- [ ] Touch targets sized for mobile

#### Reverse Validation
- [ ] What evidence suggests the goal failed?
- [ ] What element still competes with the intended primary answer?
- [ ] What looks merely changed instead of clearly improved?
- [ ] Which edge state would most likely expose the weakest part of the design?

### Tier 2: Design Critic Review (Required for Substantial Changes)

Invoke the design-critic agent for:
- New pages or major redesigns
- New components
- Design system changes
- Anything affecting more than one page
- Any interaction-model or feedback-flow change

### Tier 3: Design Reviewer QA (Required for Shipping)

Invoke the design-reviewer agent for:
- Any change going to production
- Any change affecting the critical path
- Any accessibility-related change
- Any `major` tier design task

---

## POST-TASK GATE VERDICTS

| Verdict | Meaning | Action |
|---------|---------|--------|
| **PASS** | All checks pass across all tiers | Mark task complete |
| **PASS WITH NOTES** | Minor polish items, no violations | Mark complete, create follow-up task for polish |
| **NEEDS REVISION** | Token violations, missing states, or brand violations | Fix issues, re-run verification |
| **BLOCKED** | Fundamental design problem requiring architectural change | Escalate to user, do not ship |

---

## Reporting Format

After completing the post-task gate, output a structured report:

```
POST-TASK DESIGN REVIEW
========================
Task: [ID + title]
Tier: [micro | standard | major]
Screenshots: [count] captured at [breakpoints] × [modes]

Self-Review:
  Hierarchy:     ✅ / ❌ [details if fail]
  Brand:         ✅ / ❌
  Typography:    ✅ / ❌
  Feedback:      ✅ / ❌
  Data:          ✅ / ❌
  Accessibility: ✅ / ❌
  States:        ✅ / ❌
  Responsive:    ✅ / ❌

Critic Review:  ✅ PASSED / ❌ [N] findings / ⏭️ SKIPPED (reason)
Reviewer QA:    ✅ PASSED / ❌ [N] findings / ⏭️ SKIPPED (reason)

VERDICT: PASS / PASS WITH NOTES / NEEDS REVISION / BLOCKED
Notes: [any follow-up items]
```

---

## Code Review Boundary (Added 2026-03-24)

This skill covers design and visual review only. Code review — correctness, security, performance, and style — is a separate concern handled by the `code-review` skill.

### What each review covers

| Dimension | Design Review (this skill) | Code Review (`code-review` skill) |
|-----------|---------------------------|----------------------------------|
| Visual output | Token compliance, spacing, typography, color | Not covered |
| Interaction design | State completeness, feedback timing, responsiveness | Not covered |
| Accessibility | Focus states, touch targets, ARIA labels | Semantic HTML correctness |
| Component logic | Not covered | Correctness, edge cases, null handling |
| Security | Not covered | Auth checks, input validation, injection risks |
| Performance | Perceived rendering quality | Bundle size, query efficiency, re-render cost |
| Code style | Not covered | ESLint compliance, naming conventions |

### When both reviews apply

UI component changes need both design review AND code review. The two are not redundant — they look at different failure modes.

| Change type | Design review? | Code review? |
|-------------|---------------|-------------|
| New UI component | Yes | Yes |
| SCSS token change | Yes | No (unless logic changes) |
| New API route | No | Yes |
| Component with async data fetching | Yes (loading/error states) | Yes (error handling, auth) |
| Design system token addition | Yes | No |
| Chart with computed data | Yes (visual output) | Yes (calculation correctness) |

**Rule:** Run design review after visual implementation is complete. Run code review in the same pass or as a separate review step. Do not skip either because the other is scheduled.

### Relationship between the two reviews

Design review and code review are peers, not a hierarchy. Neither gate blocks the other — both must pass before a UI component ships. A component can have flawless token usage but broken null handling, or correct error handling but wrong spacing. Both matter.

The standard completion sequence for a UI component task is:

## Verification

After applying this skill, verify:

- [ ] Pre-task design intent was stated clearly before implementation
- [ ] The post-task gate evaluated the final UI across the intended breakpoints and modes
- [ ] The final verdict is backed by the evidence gathered during the review
- [ ] Any remaining issues are classified as revision or block conditions, not silently ignored

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| `design-review` | `code-review` | Code review owns correctness, security, performance, and style concerns outside visual/interaction quality |
| `design-review` | `design-qa-gate` | `design-qa-gate` owns the evidence-gathering browser loop; this skill owns the gate and verdict |

```
Implement
  -> POST-TASK GATE: Design Review (this skill) — visual output passes
  -> Code Review (`code-review` skill) — logic and security pass
  -> Mark task Done
```

For the code review methodology (grading rubric, severity levels, security checks, PR review process), see the `code-review` skill. Do not replicate that content here.

---

*Version 2.3.0 — Updated 2026-03-24. Added Code Review Boundary section: scope table, when-both-apply rules, relationship between design review and code review, and cross-reference to the `code-review` skill. Previous 2.2.0 on 2026-03-22 clarified stack boundaries with design-qa-gate.*
