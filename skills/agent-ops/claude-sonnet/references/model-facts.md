# Claude Sonnet (balanced implementation tier) — model facts

> Verified facts about Anthropic's Sonnet-tier model, the basis for the `claude-sonnet` routing skill.
> Last updated: 2026-06-08

## Current generation (June 2026)

| Model | Model ID | Context window | Max output | Input $/1M | Output $/1M | Status |
|---|---|---|---|---|---|---|
| Claude Sonnet 4.6 | `claude-sonnet-4-6` | 1M | 64K | $3.00 | $15.00 | Active (current) |

`claude-sonnet-4-6` is the current Sonnet — Anthropic's best balance of speed and intelligence. Use the bare model-ID string exactly; do not append date suffixes.

## Where Sonnet sits in the cost/quality ladder

| Tier | Input $/1M | Output $/1M | Context | Relative role |
|---|---|---|---|---|
| Opus (frontier) | $5.00 | $25.00 | 1M | Hardest reasoning, highest cost |
| **Sonnet (balanced)** | **$3.00** | **$15.00** | **1M** | **Default lane — feature work, tests, multi-step code** |
| Haiku (fast/cheap) | $1.00 | $5.00 | 200K | Mechanical, high-volume, low-latency |

Sonnet is ~60% of Opus input cost and ~3× Haiku input cost. It is the default implementation lane: cheaper and faster than Opus, materially more capable than Haiku.

## Capability profile (decision-useful)

- **1M-token context window** — same window size as Opus, far larger than Haiku's 200K. A large-context task does NOT force an escalation to Opus on window size alone.
- **64K max output tokens** — half of Opus's 128K. Streaming is required above ~16K output to avoid SDK HTTP timeouts.
- **Adaptive thinking** (`thinking: {type: "adaptive"}`). `budget_tokens` is deprecated on Sonnet 4.6 — use adaptive thinking.
- **Effort parameter** `output_config: {effort: ...}` is supported, but the `max` and `xhigh` ceilings are **Opus-only** — Sonnet caps below them. Sonnet 4.6 defaults to `high`; set effort explicitly (e.g. `low`/`medium`) on chat/classification workloads to control latency and token spend.
- **Structured outputs** and **compaction (beta)** supported.
- **Prompt-cache minimum** is **2048 tokens** on Sonnet 4.6 (lower than Opus's 4096) — a 3K-token shared prefix caches on Sonnet but silently won't on Opus.

## The 1M-context billing caveat (load-bearing)

The 1M window itself carries **no per-token long-context premium** at GA on the first-party API (the old "2× above 200K" beta surcharge was removed). BUT in subscription-runner / CLI contexts the picture differs by tier: the 1M-context entitlement is included for Opus on a MAX subscription, while **Sonnet's 1M-context tier routes to per-token API billing** (i.e. `sonnet[1m]` triggers usage-metered charges where `opus[1m]` does not). When cost discipline matters on a flat subscription, this inverts the naive "Sonnet is always cheaper" intuition for the 1M-context tier specifically. Below the 200K standard window, Sonnet is the cheaper-than-Opus default.

## What Sonnet is for (routing)

The default implementation lane: feature work, bug fixes, test writing, multi-step code, structured extraction, content generation, and most agentic coding/tool-use workflows that are well-specified. Anthropic's recommended starting point for "most applications (balanced)."

## What Sonnet is NOT for

- The hardest reasoning, intermittent multi-system debugging, security analysis, or long-horizon autonomy where the Opus-only effort ceiling matters → escalate to Opus.
- Pure mechanical slot-filling, transcription, polling, high-volume classification where latency/cost dominate → drop to Haiku or a script.

## Sources

- [Claude models overview](https://platform.claude.com/docs/en/about-claude/models/overview.md)
- [Pricing](https://platform.claude.com/docs/en/pricing.md)
- [Adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking.md)
- [Effort parameter](https://platform.claude.com/docs/en/build-with-claude/effort.md) — `max`/`xhigh` are Opus-only; Sonnet 4.6 defaults to `high`
- [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching.md) — Sonnet 4.6 minimum cacheable prefix is 2048 tokens
- `claude-api` skill (`shared/models.md`, `shared/model-migration.md` → Migrating from Sonnet 4.5 to Sonnet 4.6) — cached catalog + effort-default guidance, verified 2026-06-08
