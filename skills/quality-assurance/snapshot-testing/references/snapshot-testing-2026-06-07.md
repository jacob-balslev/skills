# Snapshot Testing Source Review

Last reviewed: 2026-06-07

## Primary sources checked

- Jest, Snapshot Testing: https://jestjs.io/docs/snapshot-testing
- Vitest, Snapshot Testing guide: https://main.vitest.dev/guide/learn/snapshots
- Playwright, Visual comparisons: https://playwright.dev/docs/test-snapshots
- Storybook, Snapshot testing: https://storybook.js.org/docs/writing-tests/snapshot-testing
- Storybook, Visual tests: https://storybook.js.org/docs/9/writing-tests/visual-testing
- Chromatic, Snapshots: https://www.chromatic.com/docs/snapshots/

## Current synthesis

- Jest current docs still define the core pattern: render or compute output, compare it to a stored reference snapshot, fail on mismatch, and update only after deciding whether the change is intentional.
- Jest explicitly says snapshots should be committed and reviewed, tests should be deterministic, snapshot names should be descriptive, and snapshots do not replace unit tests.
- Vitest current docs match the same baseline pattern and warn to review diffs before updating snapshots because blindly accepting updates can record broken output.
- Playwright current docs support visual comparisons with generated reference screenshots, update flags, platform/browser-specific baselines, screenshot determinism controls, pixel-diff thresholds, and non-image snapshots.
- Storybook current docs distinguish DOM/markup snapshot tests from visual tests and note Storyshots is deprecated in favor of Portable Stories workflows.
- Storybook visual tests and Chromatic docs support the centralized visual snapshot workflow: capture rendered UI snapshots, compare against previous baselines, inspect changed pixels, and accept intentional baselines.

## Content decisions

- Add v8 `scope`, remove audit/provenance fields from SKILL.md frontmatter, and move them to `audit-state.json`.
- Add structured grounding and a local source-review file because snapshot tooling and visual testing workflows change over time.
- Add canonical comprehension and application evals.
- Replace the stale `code-review` relation with `diff-analysis` because `code-review` is not an active skill in this library.
- Keep `truth_verdict: UNVERIFIED`; local source review is hashable, but official docs remain external and unhashable by the drift gate.

## Skill Graph lens findings

- Positive routing needs explicit snapshot terms such as `snapshot testing`, `snapshot diffs`, `snapshot churn`, `baseline`, or named snapshot tools.
- Anti-examples should not embed parenthetical "use X" hints; the router can overfit to the parenthetical and mask the actual user wording.
- Same-subject red herrings for `testing-strategy`, `property-based-testing`, `test-doubles-design`, `test-driven-development`, and `e2e-test-design` are important because all share test vocabulary.
- `skill-graph status` reports `conceptScope repo_specific_or_unknown` for portable skills even after v8 `scope` is present; this remains a SYSTEM finding.
