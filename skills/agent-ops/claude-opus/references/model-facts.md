# Claude Opus (frontier reasoning tier) — model facts

> Verified facts about Anthropic's Opus-tier models, the basis for the `claude-opus` routing skill.
> Last updated: 2026-06-08

## Current generation (June 2026)

| Model | Model ID | Context window | Max output | Input $/1M | Output $/1M | Status |
|---|---|---|---|---|---|---|
| Claude Opus 4.8 | `claude-opus-4-8` | 1M | 128K | $5.00 | $25.00 | Active (current default) |
| Claude Opus 4.7 | `claude-opus-4-7` | 1M | 128K | $5.00 | $25.00 | Active (previous gen) |
| Claude Opus 4.6 | `claude-opus-4-6` | 1M | 128K | $5.00 | $25.00 | Active (older) |

`claude-opus-4-8` is the most capable generally available model as of June 2026 — the default unless a caller explicitly names another model. Use the bare model-ID strings exactly as written; do not append date suffixes.

## Capability profile (decision-useful)

- **1M-token context window at standard API pricing** — no long-context premium on Opus 4.6/4.7/4.8. This is the load-bearing fact for "should I route a huge multi-file synthesis to Opus": the window is the same size as Sonnet's, and on a MAX subscription the 1M tier carries no per-token surcharge for Opus.
- **128K max output tokens**, but the SDK requires **streaming** for outputs that large to avoid HTTP timeouts (use `.stream()` + `.get_final_message()` / `.finalMessage()`).
- **Adaptive thinking only** (`thinking: {type: "adaptive"}`). The old fixed `budget_tokens` is removed on 4.7/4.8 (returns 400); deprecated on 4.6. Sampling params (`temperature`, `top_p`, `top_k`) are also removed on 4.7/4.8.
- **Effort parameter** `output_config: {effort: "low"|"medium"|"high"|"xhigh"|"max"}`. `max` and `xhigh` are **Opus-tier only** (not Sonnet, not Haiku) — `xhigh` is the best setting for most coding/agentic work; `high` is the recommended minimum for intelligence-sensitive work. The effort ceiling is part of why Opus is the right tier for hard, long-horizon problems.
- **Task Budgets (beta, Opus 4.7/4.8)** — `output_config: {task_budget: {type: "tokens", total: N}}` lets the model self-moderate token spend across a full agentic loop (minimum 20K). Distinct from `max_tokens`.
- **High-resolution vision** (Opus 4.7+) — up to 2576px long edge, pixel-accurate coordinates. The first Claude tier with high-res image support.
- **Prompt caching** — minimum cacheable prefix is **4096 tokens** on Opus 4.6/4.7/4.8 (higher than Sonnet's 2048 / older Sonnet's 1024). Cache reads ~0.1× base input; writes 1.25× (5-min TTL) / 2× (1-hour TTL).
- **Compaction (beta)** and **mid-session system messages (beta, 4.7+)** supported.

## What Opus is for (routing)

State-of-the-art on: long-horizon autonomous agentic work, complex multi-file refactors, hard debugging (intermittent flakes, multi-system root cause), security reasoning, architecture and tradeoff design, and knowledge work where the model verifies its own output. It is the most autonomous tier — give it the full task spec up front in one turn and run at `high`/`xhigh` effort.

## What Opus is NOT for

Mechanical, deterministic, or pattern-matching work — bulk find-and-replace, transcription, polling, format conversion, frontmatter slot-filling. Those belong to a script or to Haiku. Using Opus there wastes premium reasoning capacity (and, off a flat subscription, real money) on work a cheaper tier or `$0.00` script does identically.

## Sources

- [Claude models overview](https://platform.claude.com/docs/en/about-claude/models/overview.md) — current model IDs, context windows, pricing
- [Pricing](https://platform.claude.com/docs/en/pricing.md) — per-million input/output rates
- [Adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking.md) — adaptive thinking + effort on Opus
- [Effort parameter](https://platform.claude.com/docs/en/build-with-claude/effort.md) — effort levels, `max`/`xhigh` Opus-only
- [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching.md) — per-model minimum cacheable prefix
- `claude-api` skill (`shared/models.md`, `shared/model-migration.md` → Migrating to Opus 4.8) — cached model catalog + capability profile, verified 2026-06-08
