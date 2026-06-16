# Free Agent Models via OpenCode - Model Facts

> Current grounding for the `opencode-free-models` skill. Routing knowledge is
> portable; exact model IDs, prices, context windows, and free-tier status are
> volatile. Treat this file as a researched snapshot, then verify live before
> dispatch.
>
> Last updated: 2026-06-10

## Current Evidence Snapshot

Captured 2026-06-10:

- `opencode models opencode --refresh` listed these local OpenCode free lanes:
  `opencode/big-pickle`, `opencode/deepseek-v4-flash-free`,
  `opencode/mimo-v2.5-free`, `opencode/nemotron-3-ultra-free`, and
  `opencode/north-mini-code-free`.
- The same refreshed CLI listed `opencode/gpt-5-nano`, `opencode/minimax-m2.5`,
  and `opencode/minimax-m2.7`, but not as free IDs.
- The public `https://opencode.ai/zen/v1/models` endpoint exposed
  `minimax-m3-free` and `qwen3.6-plus-free` as candidate IDs, but the refreshed
  local CLI did not expose them. Endpoint-visible is therefore not enough for
  dispatch.
- OpenCode Zen docs price Big Pickle, DeepSeek V4 Flash Free, MiMo-V2.5 Free,
  North Mini Code Free, and Nemotron 3 Ultra Free as free promotional models.
  The same docs price GPT-5 Nano, MiniMax M2.5, MiniMax M2.7, GLM, Kimi, and
  paid DeepSeek variants as paid lanes.
- OpenCode Zen privacy docs state free/trial models can be exceptions to the
  zero-retention posture. Treat free/trial lanes as public-data only unless the
  selected lane's policy explicitly clears the task's data.

Dispatch rule: the local runtime is authoritative for a run. Docs and public
endpoints are discovery inputs; `opencode models opencode --refresh` plus a tiny
probe decides whether a model is actually dispatchable today.

## OpenCode Zen Free Lane

The documented Zen free promotional lane currently consists of:

- Big Pickle
- DeepSeek V4 Flash Free
- MiMo-V2.5 Free
- North Mini Code Free
- Nemotron 3 Ultra Free

Do not add GPT-5 Nano to this list. It is a cheap paid helper lane in the Zen
pricing table, not a documented Zen free model. Do not assume MiniMax M3 is a
dispatchable free Zen lane just because the raw endpoint exposes
`minimax-m3-free`; the local CLI must list it and a smoke test must pass before
use.

## Provider And Router Drift

Free/cheap model access drifts across at least four surfaces:

| Surface | What it proves | What it does not prove |
|---|---|---|
| OpenCode docs | Documented model roster, pricing, privacy exceptions, and recommended IDs | That the local account/CLI can dispatch the ID right now |
| OpenCode public model endpoint | Candidate IDs visible through the gateway | Pricing class, full context metadata, local CLI visibility, or dispatch reliability |
| `opencode models opencode --refresh` | The local CLI-visible roster for this account and cache state | That a long run will stay reliable or clear feature-specific gates |
| Tiny live probe | Current prompt/shape/tool-call reliability for one selected ID | Future availability or higher-task competence |

When these disagree, route from the local CLI plus probe for the current run, and
record the disagreement instead of converting it into a stable model fact.

## Other Free Or Cheap Lanes

OpenCode is not the whole market. Treat each lane's data policy, quota, and
exact model ID independently.

| Lane | Current grounding | Routing note |
|---|---|---|
| OpenRouter `:free` | OpenRouter exposes exact `:free` IDs with zero prompt/completion pricing in `/api/v1/models`; `openrouter/free` selects among currently available free models and filters for requested features. | Useful overflow/discovery lane. No source reproduced in this audit supports the claim that a `:free` ID silently routes to a paid backend. Pin an exact free ID when capability matters; expect disappearance, quota limits, or free-upstream rotation. |
| Google AI Studio / Gemini free tier | Google pricing shows free-tier inputs/outputs for eligible models and states free-tier data is used to improve products. | Good for public/prototype work when policy permits. Not for confidential source, PII, secrets, or unreleased strategy on the free tier. |
| Vendor trials / promo credits | Plan-specific. Check pricing, rate limits, zero-retention options, and production restrictions live. | Evaluation/prototyping lane until the plan's data policy and quota clear production use. |
| Local or BYOK open weights | Depends on hardware, quantization, context, license, and serving stack. | Best privacy posture when feasible; quality and latency are local facts, not family facts. |
| Cheap paid nano/flash/mini lanes | GPT-5 Nano-class and similar helpers are low-cost paid lanes unless the selected provider explicitly marks the exact ID free. | Good for boilerplate, formatting, extraction, and simple classification. Weak final authority. |

## Model Family Notes

Use these as capability hypotheses, never as dispatch guarantees.

### MiniMax family

MiniMax M3 is a strong coding/agentic family with vendor-stated 1M-token context
and a guaranteed minimum of 512K in the native M3 API. That does not mean the
OpenCode-exposed ID is free, locally visible, or configured with the same
limits. In the 2026-06-10 check, OpenCode docs priced MiniMax M2.5/M2.7 as paid,
the raw endpoint exposed `minimax-m3-free`, and the refreshed local CLI exposed
neither `minimax-m3-free` nor `qwen3.6-plus-free`. Resolve the exact ID live.

### North Mini Code

North Mini Code is a coding-tuned open model for agentic software engineering
tasks. Prefer it over generic nano helpers for small/medium coding work when the
local roster lists it, tests exist, and the task does not require final
architecture/security/correctness judgment.

### DeepSeek V4 Flash Free

DeepSeek V4 Flash Free is a good free-lane candidate for fast implementation,
triage, extraction, and simple agent tasks where tests, schemas, or sampling
catch errors. Do not transfer context, benchmark, or reasoning claims from
DeepSeek V4 Pro to the Free ID without live metadata for that exact ID.

### MiMo-V2.5 Free

MiMo-V2.5 Free is a free-lane candidate, but do not inherit MiMo-V2.5-Pro's
1M-context and long-horizon benchmark claims unless the selected free ID's
metadata confirms them. Treat the free ID as its own lane.

### NVIDIA Nemotron family

Nemotron 3 Ultra Free is documented and locally visible in the 2026-06-10
OpenCode check. It is a credible reasoning/throughput and background-analysis
lane when the data policy permits, but trial/free endpoints can log or collect
feedback, and observed free dispatch can loop or time out. Smoke-test before
long unattended runs.

### Big Pickle and preview free IDs

Big Pickle and other stealth/preview IDs are disposable-advisory lanes only.
Use them where tests or frontier review make mistakes cheap. Do not send private
data and do not use them as final judges.

### GPT-5 Nano and nano/flash/mini helpers

GPT-5 Nano is a cheap paid helper in current Zen pricing. It is useful for
boilerplate, formatting, extraction, and simple classification, but has a low
ceiling for multi-step reasoning, architecture, security, and correctness
judgment.

## Routing Rules

Cost-routing means choosing the cheapest currently available lane whose quality
ceiling clears the task's bar at the lowest total successful cost.

Total successful cost includes:

- listed token price or subscription cost
- orchestration time
- expected retries
- verification and sampling cost
- rate-limit or queue waiting
- expected rework

Escalate on concrete signal:

- looping or stall
- self-contradiction
- malformed output or repeated schema/tool failure
- low confidence on high-consequence work
- scope crossing into architecture, security, audit verdicting, eval grading, or
  correctness-critical synthesis
- rate-limit/reliability collapse
- privacy mismatch
- output becoming the quality bar

Do not escalate merely because a frontier model is available. That destroys the
cost lane. Do escalate when the selected model's ceiling or policy no longer
clears the task.

## Hard Quality Boundary

A free or cheap model may draft, triage, summarize, propose alternatives, or
generate candidate patches. It may not be the final authority for:

- audit verdicts
- eval grading
- architecture decisions
- security review
- correctness-critical synthesis
- shipped user-visible judgment
- any artifact where the output itself becomes the quality bar

In those cases, a frontier model, deterministic test, or qualified human must
author or judge the final result.

## Sources

- OpenCode Zen docs: https://opencode.ai/docs/zen/
- OpenCode model discovery docs: https://opencode.ai/docs/cli/#models
- OpenCode model configuration docs: https://opencode.ai/docs/models/
- OpenCode Zen public models endpoint: https://opencode.ai/zen/v1/models
- OpenCode Go public models endpoint: https://opencode.ai/zen/go/v1/models
- OpenRouter free model limits: https://openrouter.ai/docs/api/reference/limits
- OpenRouter free models router: https://openrouter.ai/openrouter/free
- OpenRouter model API: https://openrouter.ai/api/v1/models
- Google Gemini API pricing/free tier: https://ai.google.dev/gemini-api/docs/pricing
- MiniMax M3 model page: https://www.minimax.io/models/text/m3
- DeepSeek V4 Preview release: https://api-docs.deepseek.com/news/news260424
- Cohere North Mini Code release: https://huggingface.co/blog/CohereLabs/introducing-north-mini-code
- Xiaomi MiMo-V2.5-Pro release: https://mimo.xiaomi.com/mimo-v2-5-pro/
