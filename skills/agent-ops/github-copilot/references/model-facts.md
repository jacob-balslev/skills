# GitHub Copilot — Model Facts

> Current facts about GitHub Copilot's billing and routing for the `github-copilot` skill.
> Last updated: 2026-06-08

## The June 1, 2026 billing change (the central fact)

GitHub Copilot **moved from premium-request billing to usage-based billing on June 1, 2026.**

- **Before June 1, 2026:** "premium requests" with per-model **multipliers** — each interaction with a premium model consumed N premium requests from a monthly quota (e.g. a premium model at 1×, Copilot code review at 13×). Plans included a fixed monthly premium-request allowance; unused requests expired (no rollover/banking).
- **After June 1, 2026:** premium request units (PRUs) were replaced by **GitHub AI Credits**. **1 AI credit = $0.01 USD.** Cost = (input + output + cached tokens) × per-model per-token rate, converted to credits. Plans include a pooled monthly AI-credit allowance; overage is billed at published per-token rates.
- **Legacy:** multipliers still apply only to Pro/Pro+ subscribers on existing annual plans who stayed on legacy premium-request billing.
- **Always free:** code completions and next-edit suggestions are NOT billed in AI credits — unlimited for paid plans (separate counting mechanism from the chat/agent model billing).

## Plan allowances (legacy premium-request numbers, still the practical sizing guide)

| Tier | Cost | Premium requests/month (legacy) |
|---|---|---|
| Free | $0 | small fixed allowance |
| Pro | $10/mo | 300 |
| Pro+ | $39/mo | 1500 |
| Business | $19/seat/mo | 300/user |
| Enterprise | $39/seat/mo | 1000/user |

Under usage-based billing these map to pooled AI-credit allowances; the relative sizing (Pro+ ≈ 5× Pro) is the budgeting signal. No rollover under either model.

## Models available through Copilot (June 2026)

- **OpenAI:** GPT-5 mini, GPT-5.3-Codex, GPT-5.4 (+ mini/nano), GPT-5.5 tiers ($0.20–$10.00 / M input)
- **Anthropic:** Claude Haiku 4.5, Sonnet 4/4.5/4.6, Opus 4.5/4.6/4.7/4.8 ($1.00–$5.00 / M input; cache-write costs apply)
- **Google:** Gemini 2.5 Pro, Gemini 3 Flash, Gemini 3.1 Pro, Gemini 3.5 Flash
- **Microsoft/fine-tuned:** MAI-Code-1-Flash, Raptor mini

## What Copilot is good at vs not

**Good at:**
- Inline code completions + next-edit suggestions (unlimited, not credit-billed) — its strongest, cheapest surface
- IDE-native chat / moderate assist inside VS Code, JetBrains, etc.
- Access to frontier models (GPT / Claude / Gemini) across tiers without separate vendor accounts

**Weak / expensive at:**
- **Agent-like flows burn credits fast** — multi-file edits, complex refactors, agentic loops consume allowance fastest, and surprise teams
- No rollover → buying the biggest plan does not prevent end-of-cycle waste
- Sticker-price comparisons ignore real per-token operational cost

## When a cheaper or free lane is preferable

Spend Copilot premium credits only where the IDE-native frontier model earns it. Route away from premium for:
- Boilerplate generation, small edits, formatting, repetitive transformations → free/cheap lane (OpenCode Zen free tier, a script, a small model)
- Bulk classification / triage at volume → high-throughput free model
- Anything a deterministic script can do → no model at all

Reserve Copilot premium requests/credits for the work that genuinely benefits from a frontier model inside the IDE flow. The premium allowance is a finite, non-rolling budget — treat low-complexity work as a free-lane job, not a premium-credit job.

## Sources

- [Models and pricing for GitHub Copilot — GitHub Docs](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing)
- [GitHub Copilot is moving to usage-based billing — GitHub Blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/)
- [Model multipliers for annual plans (legacy) — GitHub Docs](https://docs.github.com/en/copilot/reference/copilot-billing/request-based-billing-legacy/model-multipliers-for-annual-plans)
- [Overview of request-based billing (legacy) — GitHub Docs](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests)
- [Copilot Pro+ Premium Requests Explained in 2026 — Developers Digest](https://www.developersdigest.tech/blog/copilot-pro-plus-premium-requests-explained-2026)
