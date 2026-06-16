# Karpathy AutoResearch Loop

> Primary-source notes on Andrej Karpathy's AutoResearch loop and how it maps to Skill Graph's skill-audit loop.
> Last updated: 2026-06-07T09:00:49+0200

## Primary Pattern

Karpathy's `autoresearch` repository frames an autonomous loop around a deliberately narrow research setup: the agent changes one implementation file, runs a fixed training experiment, reads a scalar validation metric, logs the result, keeps improvements, and discards regressions.

The companion `program.md` file makes the operating contract explicit: read the small in-scope file set, do not modify the fixed evaluation/data-prep file, optimize for the single metric, log every experiment, and reset failed experiments back to the starting point.

## Skill Graph Takeaways

- Keep the editable surface narrow enough that review and rollback stay cheap.
- Use one primary metric per loop so keep-or-discard decisions are comparable.
- Fix the time budget before the run so the system cannot "improve" by spending more time.
- Treat evals as guardrails, not as the whole objective; preserve useful knowledge unless the evidence shows regression or harm.
- Record the receipt for every verdict or status claim.

## Sources

- [karpathy/autoresearch](https://github.com/karpathy/autoresearch) - primary repository for the autonomous research experiment loop.
- [AutoResearch README](https://github.com/karpathy/autoresearch/blob/master/README.md) - describes the small repository, fixed time budget, scalar metric, and keep-or-discard loop.
- [AutoResearch program.md](https://github.com/karpathy/autoresearch/blob/master/program.md) - editable instruction asset for the autonomous experiment loop.
- [Karpathy Software 3.0 talk](https://www.youtube.com/watch?v=LCEmiRjPEtQ) - source already declared by `ai-native-development` for the Software 3.0 framing.
- [Skill Audit Loop doctrine](https://github.com/jacob-balslev/skill-graph/blob/main/skill-audit-loop/SKILL_AUDIT_LOOP.md) - Skill Graph applies the same narrow-loop, measured-iteration idea to skill maintenance.
