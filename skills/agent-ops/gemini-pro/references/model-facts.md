# Gemini Pro — Routing Facts (Google's frontier Gemini Pro tier)

> Current capability, context, pricing, and cross-model comparison facts used to decide when to route work to Google's Gemini Pro frontier model. Decision-useful, not exhaustive vendor spec.
> Last updated: 2026-06-08

## Current generation (June 2026)

- **Gemini 3.1 Pro** is the established Pro frontier generation this skill centers on. Google announced **Gemini 3.5** on 2026-05-19; **Gemini 3.5 Flash** shipped first (GA), and **Gemini 3.5 Pro** was announced as "coming next month" (June 2026 launch guides exist but it was rolling out as of this writing). Treat "Gemini Pro" as the tier; the concrete model id moves (`gemini-3.1-pro-preview` → `gemini-3.5-pro`). Pick the newest Pro the API serves; the routing logic in this skill is generation-stable.
- Gemini 2.5 Pro/Flash/Flash-Lite are deprecated: AI Studio / Gemini API deprecation **2026-06-17**, Vertex AI retirement **2026-10-16**. Do not route to 2.5.

## Gemini 3.1 Pro — capability sheet

| Property | Value |
|---|---|
| Context window (input) | **1,000,000 tokens** (~750K words) |
| Max output tokens | 64K |
| Multimodal input | Native: text, images, audio, video, PDF |
| Knowledge generation | Top-tier reasoning + agentic coding model |
| Price — Standard ≤200K prompt | **$2.00 / 1M input · $12.00 / 1M output** |
| Price — Standard >200K prompt | **$4.00 / 1M input · $18.00 / 1M output** (the WHOLE request reprices, input+output, once the prompt crosses 200K) |
| Batch API | 50% off (async workloads) |
| AI Studio free tier | **Pro is paid-only** — AI Studio free access is Flash / Flash-Lite only |

The 200K context-tier repricing is the load-bearing pricing fact: a 201K-token prompt costs 2× the per-token rate of a 199K-token prompt across the entire request, not just the overflow.

## Benchmarks (April 2026 cross-model snapshot, Gemini 3.1 Pro)

| Benchmark | Gemini 3.1 Pro | Claude Opus 4.7 | GPT-5.5 |
|---|---|---|---|
| SWE-Bench Verified | 80.6% | — | — |
| SWE-Bench Pro | — | **64.3%** (leader) | 58.6% |
| GPQA Diamond (reasoning) | 94.3% | — | — |
| ARC-AGI-2 | 77.1% | 75.8% | **85.0%** |
| Humanity's Last Exam (no tools) | 44.4% | **46.9%** | 43.1% |
| HumanEval | ~68.5% | 69.4% | **82.7%** |

**Read:** no model dominates every lane. The widely-cited April-2026 practical default — Gemini 3.1 Pro as the **volume tier** (best capability-per-dollar at frontier), Claude Opus for **code / complex reasoning**, GPT-5.5 for **best-in-class long-context retrieval quality and math**.

## Routing implications (the decision-useful part)

- **Very large context is the strongest Gemini Pro signal.** 1M-token input handles whole-codebase / long-document / many-PDF reasoning in one call that Claude/GPT would need chunking + retrieval to fit. When the task IS "reason over a corpus that doesn't fit a 200K window," Gemini Pro is often the only single-call option.
- **Native multimodal in one call.** Audio + video + PDF + image in the same prompt with no preprocessing pipeline — a capability Claude/GPT match only partially.
- **Capability-per-dollar at the frontier.** At $2/$12 (≤200K) Gemini 3.1 Pro is materially cheaper than the top Claude/GPT frontier tiers while staying near them on reasoning — the "volume frontier" position.
- **Escalate OFF Gemini Pro for** the hardest agentic code modification (Claude Opus leads SWE-Bench Pro) and best-in-class long-context-retrieval-quality / hard math (GPT-5.5). "Has 1M context" ≠ "best at finding the needle in 1M context."

## Sources

- [Gemini 3.1 Pro vs Flash vs Flash-Lite: Model Comparison (2026) — ai-toolbox.co](https://www.ai-toolbox.co/gemini-models/gemini-3-1-pro-vs-flash-vs-flash-lite-2026)
- [Gemini 3.1 Pro vs Gemini 3 Flash pricing & context — pricepertoken.com](https://pricepertoken.com/pricing-page/model/google-gemini-3.1-pro-preview)
- [How Much Does the Gemini 3.0 API Cost in 2026? — apidog](https://apidog.com/blog/gemini-3-0-api-cost/)
- [GPT-5.5 vs Claude Opus 4.7 and Gemini 3.1 Pro benchmarks — ofox.ai](https://ofox.ai/blog/gpt-5-5-api-vs-claude-opus-gemini-3-1-flagship-2026/)
- [Gemini 3.1 Pro vs Claude Opus 4.7 vs GPT-5.5 decision framework — spectrumailab.com](https://spectrumailab.com/blog/gemini-3-1-pro-vs-claude-opus-4-7-vs-gpt-5-5-decision-framework-2026)
- [Gemini 3.5: frontier intelligence with action — blog.google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/)
- [Gemini 2.5 deprecation schedule — Google Cloud release notes](https://docs.cloud.google.com/gemini/enterprise/docs/release-notes)
