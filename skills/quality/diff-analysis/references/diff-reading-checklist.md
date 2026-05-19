# Diff Reading Checklist

Use this checklist when reading a patch. It is intentionally shorter than the main skill so it can be loaded as an operational prompt during reviews.

## Before opening hunks

- Identify the changed file set first.
- Tag each file as one of: rename/move, mechanical churn, local logic edit, contract edit, test-only edit, config/dependency edit, or documentation-only edit.
- Read the stated intent before trusting the patch shape.
- Note surprise files that do not match the stated intent.
- If a generated or lockfile change is present, separate it from hand-authored source before summarizing.

## Per hunk

- What behavior or contract existed before?
- What behavior or contract exists now?
- Is the change additive, restrictive, or substitutive?
- Did any guard, fallback, validation rule, default, or dependency change?
- What nearby path could now regress?
- What evidence would prove this hunk is safe?

## Risk cues

- removed guards
- widened conditionals
- changed query predicates or selectors
- changed type/interface/schema shapes
- changed defaults
- new imports or dependencies
- snapshot or fixture churn without matching behavior explanation
- mixed formatting and logic in the same hunk
- renamed dynamic keys, routes, files, or exported symbols

## Summary output

- File scope: changed files grouped by change class.
- Semantic delta: behavior or contract changes, not line narration.
- Risk surface: callers, tests, routes, data, docs, deployment, or users that could be affected.
- Verification need: the next test, command, read, or question that would prove the interpretation.

## Banned summary moves

- "Looks safe" without naming the risk surface.
- "Only formatting" before isolating every semantic hunk.
- "Tests updated" as proof that the new behavior is intended.
- "Small diff" as a proxy for low risk.
- Full code-review approval from diff analysis alone.
