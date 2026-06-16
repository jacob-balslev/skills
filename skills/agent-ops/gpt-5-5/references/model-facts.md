# GPT-5 (current GPT-5.5 generation) — Model Routing Facts

> Verified facts about OpenAI's current GPT-5.5 frontier generation for the `gpt-5-5` model-routing skill.
> Last updated: 2026-06-08

## Current generation (June 2026)

The GPT-5 line's current frontier release is **GPT-5.5** (the skill is named `gpt-5-5` because this skill is specific to the GPT-5.5 generation).

- **Released:** GPT-5.5 and GPT-5.5 Pro became available in the API on **2026-04-24**.
- **Context window:** **1,050,000 tokens** (~1M), positioned explicitly for coding, research, and high-value professional work.
- **Standard pricing:** **$5 / 1M input tokens, $30 / 1M output tokens** (double GPT-5.4's rates).
- **GPT-5.5 Pro:** $30 / 1M input, $180 / 1M output — higher accuracy tier.
- **Cached input:** $0.50 / 1M tokens (repetitive prompt reuse).
- **Long-context surcharge:** prompts > 272K input tokens are billed at 2× input / 1.5× output for the full session (standard, batch, flex).
- **Pricing variants:** Batch and Flex at half the standard rate; Priority at 2.5×.

## Benchmark strengths vs Claude (June 2026 leaderboards)

> Read SWE-bench Verified scores at this tier with skepticism — frontier labs may have trained on or adjacent to the data.

| Benchmark | Leader | Note |
|---|---|---|
| **SWE-bench Verified** | **GPT-5.5 #1 (88.7%)**, Claude Opus 4.7 #2 (87.6%) | Narrow margin; both within a few points |
| **SWE-bench Pro** (complex multi-file GitHub issues) | **Claude Opus 4.7 (64.3%)** vs GPT-5.5 (58.6%) | Opus leads complex multi-file resolution |
| **Terminal-Bench 2.0** (real CLI workflows: planning, iteration, tool coordination) | **GPT-5.5 (82.7%)** — its most decisive win | Strongest signal for terminal/CLI work |
| MCP Atlas (multi-tool agent coordination) | Claude (79.1%) | Claude's tool-coordination edge |

**Where GPT-5.5 has the edge:** problems requiring precise tool use and file navigation; real command-line workflows (planning, iteration, tool coordination in a sandboxed terminal); infrastructure scripts, CI pipelines, concrete implementation, analytical code review, security review.

**Where Claude Opus has the edge:** broad architectural reasoning across large codebases; complex multi-file GitHub issue resolution (SWE-bench Pro); multi-tool agent workflows (MCP Atlas).

## Routing rule of thumb (derived from the above)

- **Concrete, well-specified implementation; infra/CI scripts; analytical diff-reading code review; security review; CLI/terminal-heavy iteration** → GPT-5.5 is a strong (often cheaper-to-deploy-via-subscription) lane.
- **Architecture, cross-system synthesis, complex multi-file refactors, long-horizon autonomy** → Claude Opus tends to lead.
- **Cost-sensitive but still-capable implementation** → Claude Sonnet (cheaper than both frontier tiers; see `claude-sonnet`).
- GPT-5.5 output is pricier per token than Claude Opus ($30 vs $25 output); the routing decision is capability-per-task, not headline price alone — and on subscription plans (not per-token API), notional per-token USD is not the billed cost.

## Comparison context: current Claude tiers (for routing)

- **Claude Opus 4.8** — current frontier Claude, 1M context, $5/$25, leads architecture + SWE-bench Pro.
- **Claude Sonnet 4.6** — balanced tier, 1M context, $3/$15, the default implementation lane.

## Sources

- [Introducing GPT-5.5 — OpenAI](https://openai.com/index/introducing-gpt-5-5/) — release, positioning
- [GPT-5.5 Model — OpenAI API](https://developers.openai.com/api/docs/models/gpt-5.5) — context window, API availability
- [OpenAI API Pricing 2026 — aipricing.guru](https://www.aipricing.guru/openai-pricing/) — $5/$30 standard, Pro $30/$180, cached input
- [OpenAI Winds Down Fine-Tuning API: GPT-5.5 Pricing — explainx.ai](https://explainx.ai/blog/openai-gpt-55-pricing-fine-tuning-api-wind-down-2026) — April 24 2026 release, 2× GPT-5.4 rates
- [SWE-Bench Leaderboard May 2026 — marc0.dev](https://www.marc0.dev/en/leaderboard) — GPT-5.5 88.7% #1 SWE-bench Verified
- [GPT-5.5 vs Claude Opus 4.7 — MindStudio](https://www.mindstudio.ai/blog/gpt-55-vs-claude-opus-47-coding-comparison) — Terminal-Bench 2.0 82.7%, SWE-bench Pro split, per-task strengths
- [DeepSWE / coding leaderboard — VentureBeat](https://venturebeat.com/technology/deepswe-blows-up-the-ai-coding-leaderboard-crowns-gpt-5-5-and-finds-claude-opus-exploiting-a-benchmark-loophole) — benchmark caveats
