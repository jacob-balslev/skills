# Claude Haiku (fast/cheap tier) — model facts

> Verified facts about Anthropic's Haiku-tier model, the basis for the `claude-haiku` routing skill.
> Last updated: 2026-06-08

## Current generation (June 2026)

| Model | Model ID | Context window | Max output | Input $/1M | Output $/1M | Status |
|---|---|---|---|---|---|---|
| Claude Haiku 4.5 | `claude-haiku-4-5` | 200K | 64K | $1.00 | $5.00 | Active (current) |

`claude-haiku-4-5` is the current Haiku — Anthropic's fastest and most cost-effective model. Full ID `claude-haiku-4-5-20251001`; the bare alias is preferred. Do not append date suffixes to the alias.

## Where Haiku sits in the cost/quality ladder

| Tier | Input $/1M | Output $/1M | Context | Relative role |
|---|---|---|---|---|
| Opus (frontier) | $5.00 | $25.00 | 1M | Hardest reasoning |
| Sonnet (balanced) | $3.00 | $15.00 | 1M | Default implementation lane |
| **Haiku (fast/cheap)** | **$1.00** | **$5.00** | **200K** | **Mechanical, high-volume, low-latency** |

Haiku input is **1/5 of Opus and 1/3 of Sonnet**; output is 1/5 of Opus and 1/3 of Sonnet. It is the cost/latency floor of the roster.

## The defining differences (decision-useful)

- **200K context window** — NOT 1M. This is the hard line that distinguishes Haiku from the two upper tiers: a task whose context genuinely exceeds 200K cannot run on Haiku at all and must go to Sonnet/Opus. The smaller window is the structural boundary, separate from the reasoning-difficulty boundary.
- **64K max output** (stream above ~16K to avoid SDK HTTP timeouts).
- **No effort parameter** — the `effort` knob errors on Haiku 4.5 (it is an Opus/Sonnet-4.6 feature). Haiku has no `xhigh`/`max`; you cannot dial up depth on it. If a task needs tunable reasoning depth, it needs a higher tier by definition.
- **Separate rate-limit pool** — Haiku 4.5 has its own rate-limit pool distinct from older Haiku. When ramping high-volume traffic, check the tier's Haiku-4.5 limits; a quota that served older Haiku volume may need a tier bump.
- **Prompt-cache minimum** is **4096 tokens** on Haiku 4.5 (same as Opus, higher than Sonnet 4.6's 2048).
- Often **less loaded** than busier tiers — a practical fallback during overload (529 errors).

## What Haiku is for (routing)

Fast, cheap, high-volume, low-latency work where throughput and cost dominate and deep reasoning is not required:

- Transcription and parsing structured payloads (e.g. webhook bodies) into a target shape.
- Polling / status-check loops, format conversion, config updates.
- Keyword/frontmatter additions, boilerplate generation, structured-output slot-filling.
- Small-diff code review, simple classification, label parsing.

It is the model tier just above "write a deterministic script" — use it when the task needs a little judgment but not reasoning depth, and runs often enough that Sonnet's cost/latency is wasteful.

## The escalation boundary (when to leave Haiku)

A task should escalate **up to Sonnet/Opus** when ANY of these holds:

1. **Context exceeds 200K** — structural; Haiku physically cannot hold it.
2. **The task needs tunable reasoning depth** — Haiku has no `effort` control; multi-step reasoning, architecture, or hard debugging belongs higher.
3. **Correctness cost is high and the task is non-trivial** — a wrong answer on a security check or a financial calculation is worth the higher tier even at higher cost.
4. **The task is genuinely multi-step synthesis**, not slot-filling.

A task should drop **below Haiku to a script** when it is fully deterministic and repeatable (bulk rename, mechanical find-and-replace) — no model is needed at all.

## Sources

- [Claude models overview](https://platform.claude.com/docs/en/about-claude/models/overview.md) — Haiku 4.5 ID, 200K context, 64K output
- [Pricing](https://platform.claude.com/docs/en/pricing.md) — $1/$5 per million
- [Effort parameter](https://platform.claude.com/docs/en/build-with-claude/effort.md) — effort errors on Haiku 4.5 (Opus/Sonnet-4.6 only)
- [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching.md) — Haiku 4.5 minimum cacheable prefix is 4096 tokens
- [Rate limits](https://platform.claude.com/docs/en/api/rate-limits) — Haiku 4.5 has a separate rate-limit pool
- `claude-api` skill (`shared/models.md`, `shared/error-codes.md` → 529 Overloaded "Haiku is often less loaded") — cached catalog + routing notes, verified 2026-06-08
