## Eval Quality Patterns

### The minimum-threshold rule

Every active skill should have at least 7 evals. Most healthy skills carry 9–15 covering happy paths, edge cases, anti-patterns, hard negatives, prior failures, and contradiction checks. The threshold is a *floor*, not a goal — a broad skill can be under-tested even when it clears the minimum.

**Recommended enforcement:**

- **Error** if `eval_count < 3` (or if an application-eval artifact exists but has fewer than the schema floor) unless the skill explicitly documents why evals are not meaningful for its behavior surface
- **Warn** if `eval_count < 7`

Below 7, the skill is statistically under-tested. Below 3, it is effectively un-evaluated. Do **not** lower a floor to make a status green — add cases or explicitly document non-applicability.

### The contradiction-check eval type

A `contradiction-check` eval tests that the agent correctly handles a documented exception or boundary condition that a simpler reading of the skill would mishandle. Format:

```json
{
  "id": 5,
  "type": "contradiction-check",
  "grounding": "repo-specific",
  "difficulty": "adversarial",
  "prompt": "Skill A says always use the scoped fetcher. One service uses the unscoped fetcher with an inline comment. Is this wrong?",
  "expected_output": "Not wrong — the unscoped fetcher with an inline justification comment is the documented exception for system-level reads.",
  "expectations": [
    "Correctly identifies the documented exception from the skill's anti-patterns table",
    "Does NOT flag the usage as a bug without reading the inline comment",
    "Distinguishes a system-level exception from a regular violation in application code"
  ]
}
```

Use a contradiction-check when:

- A skill has a documented exception that overrides the general rule
- Two adjacent skills appear to contradict each other but actually operate in different scopes
- A historical false positive or conflict was resolved and the resolution is non-obvious

### The negative-expectation / absent-signal requirement

Every eval case with an `expectations` array must include at least one expectation containing `does not`, `never`, `must not`, `should not`, or `do not`. Without this, evals become pure happy-path tests and miss the failure modes that motivated the skill.

For application evals, encode **absent signals** explicitly. A good grader should notice not only the right fix, but also the *absence* of private data, unsupported claims, unverified source assertions, and irrelevant skill activation.

**Recommended enforcement:** the inventory/eval tool flags any eval missing this pattern in a `missingNegativeEvalIds` field of its report.

### Append-only eval IDs

Never renumber existing eval IDs during cleanup. Eval-history logs and grader receipts refer to numeric IDs. Append new cases, deprecate bad cases with a recorded reason if the format supports it, and keep historical identifiers stable.

### The contract / three-failure-mode rubric (activation-level eval)

The patterns above grade a skill *in isolation* (does an agent given this body answer correctly?). At library scale you also need to grade the skill *in the system* — the **activation triple** of supervisor decision → skill-internal trajectory → supervisor integration. Each leg gets its own rubric so a single blurred score cannot hide which contract broke (Future AGI, 2026):

| Rubric | Question | Reference threshold |
|---|---|---|
| Dispatch correctness | Was this the right skill for the goal (vs a wrong skill, or inline reasoning that needed no skill)? | ≥ 0.85 |
| Trajectory adherence | Did execution stay inside the declared scope and `allowed-tools`? | ≥ 0.90 |
| Output integration | Did the supervisor actually use the result, instead of regenerating or contradicting it? | ≥ 0.80 |

This is LLM-graded, trace-based work and therefore lives one layer up from the deterministic metadata gate — design the cases and graders with `agent-eval-design`, score completed runs with `evaluation`. Infrastructure's job is to make the activation *observable* (per-skill names, declared tool surface, activation prompt on the trace) so those rubrics have something to operate on, and to version-pin test sets to the skill's content hash so a re-grade is comparable across changes.

### Valid eval types

| Type | When to use |
|---|---|
| `knowledge` | Tests a factual claim or pattern from the skill |
| `contradiction-check` | Tests documented exceptions and boundary conditions |
| `browser` | Tests a browser-executable interaction (requires running server) |
| `edge-case` | Tests unusual inputs or rare conditions |
| `business-model` | Tests domain-specific logic (e.g. SaaS billing rules, e-commerce fulfilment) |
| `negative` | Tests refusal or correct non-action |
