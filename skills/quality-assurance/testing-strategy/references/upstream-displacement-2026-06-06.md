# Upstream Displacement Check — 2026-06-06

## Scope

Checked whether current public testing guidance has displaced this skill's core teaching: choose the verification target and test level from behavior risk, coupling, failure signal, and maintenance cost.

## Sources Checked

- Martin Fowler / Thoughtworks, "The Practical Test Pyramid": https://martinfowler.com/articles/practical-test-pyramid.html
- Google Testing Blog, "Test Sizes": https://testing.googleblog.com/2010/12/test-sizes.html
- Playwright, "Best Practices": https://playwright.dev/docs/best-practices
- Pact Docs, "How Pact works": https://docs.pact.io/getting_started/how_pact_works

## Findings

1. The test-pyramid guidance still supports a mixed portfolio: many fast low-level tests, fewer broad high-level tests, and a deliberate split by granularity and feedback cost.
2. Google-style test-size guidance still treats small, medium, and large tests as different tools with different isolation, speed, and confidence tradeoffs.
3. Playwright's current best-practices guidance keeps browser-level tests focused on user-visible behavior and resilient locators, which reinforces the skill's warning against broad brittle end-to-end expansion.
4. Pact's current contract-testing guidance still positions contract tests as a way to verify service boundaries without relying on expensive full-system integration for every interaction.

## Displacement Verdict

No displacement found. The upstream material is more tool-specific or framework-specific than this skill. The skill remains useful as the portable decision layer that chooses when unit, integration, contract, or end-to-end evidence is appropriate before the implementation-specific testing skills take over.

## Audit Action

The skill was updated to make its decision model explicit in v8 understanding fields and to cite these external truth sources in `metadata.grounding`.
