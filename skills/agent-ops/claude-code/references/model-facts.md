# Claude Code Harness — Capability & Model Facts

> Verified facts about the Claude Code CLI/agent harness and the Claude model it runs, for the `claude-code` skill.
> Last updated: 2026-06-08

## The model behind the harness (June 2026)

- **Claude Opus 4.8** is the current most-capable Claude model. Released **2026-05-28** across claude.ai, the Claude API, and Claude Code. Model ID: `claude-opus-4-8`.
- **Context window: 1M tokens** at standard API pricing (no long-context premium). On a MAX subscription, 1M context on the Opus tier carries no cost premium.
- **Pricing:** $5 / 1M input tokens, $25 / 1M output tokens (identical to Opus 4.7). A "fast mode" runs ~2.5× speed at $10/$50 per 1M.
- **Max output:** 128K tokens (streaming required at high `max_tokens`).
- **Cross-session context:** Opus 4.8 can carry context across sessions to manage complex multi-day projects.
- **Request surface:** adaptive thinking only (`thinking: {type: "adaptive"}`); `budget_tokens`, `temperature`, `top_p`, `top_k` are removed (400 if sent). Effort tiers `low`/`medium`/`high`/`xhigh`/`max`; `xhigh` and `max` are Opus-tier only. `xhigh` is the default in Claude Code.

## Claude Code harness extensibility (3 layers)

| Layer | What it is |
|---|---|
| **Hooks** | Lifecycle automation. Fire at 25 distinct lifecycle points (e.g. `PreToolUse` is the primary security checkpoint, fires before any tool executes). Can be defined in `settings.json`, or scoped inside skills/subagents via frontmatter (run only while that component is active). |
| **Subagents** | Specialized AI instances that handle tasks in their **own context window**. Verbose output stays isolated; only a summary returns to the main conversation. |
| **Skills** | A named bundle of instructions + optional helper files, invoked via the **Skill tool**. The skill's short description sits in context by default (progressive disclosure); the full `SKILL.md` is read only when the task calls for it. |

## Other harness capabilities

- **Plan mode** — a read-only planning phase where the agent investigates and proposes a plan before making edits.
- **Background tasks** — long-running shell commands backgrounded via `run_in_background` on the Bash tool. The agent is notified on completion and can poll output without blocking the conversation.
- **MCP** — Model Context Protocol servers connect external tools/data; CLI-first policy in this workspace prefers CLIs over MCP where both exist.
- **Slash commands** — user-typed `/command` workflows resolved from `.claude/commands/`.
- **1M context on Opus** — the harness runs Opus 4.8 with its 1M window.

## How it differs from other harnesses (June 2026)

- **vs Codex CLI** (runs a frontier GPT, GPT-5.5 generation): Codex's differentiators are resumable `codex exec resume` sessions and `exec` non-interactive piping; Claude Code's are the skills + hooks + subagents extensibility stack, plan mode, and `run_in_background`. Codex leads Terminal-Bench 2.0 (82.7%) and SWE-bench Verified; Claude Opus leads SWE-bench Pro and architectural reasoning across large codebases.
- **vs OpenCode** — an open-source, provider-agnostic harness that can route to many model providers (used in this workspace for Gemini/MiniMax/Nemotron/GPT free tiers). Claude Code is Anthropic-first and ships the skills/hooks/subagents protocol natively.
- **vs Copilot** — IDE-embedded completion + chat; Claude Code is a terminal-first autonomous agent harness.

## Sources

- [Introducing Claude Opus 4.8 — Anthropic](https://www.anthropic.com/news/claude-opus-4-8) — release date, capabilities
- [Claude Opus 4.8 — Anthropic](https://www.anthropic.com/claude/opus) — product page
- [Claude Opus 4.8 Pricing 2026 — Finout](https://www.finout.io/blog/claude-opus-4.8-pricing-2026-everything-you-need-to-know) — $5/$25, fast mode $10/$50, 1M context
- [Claude Code: Hooks, Subagents, and Skills — Complete Guide (2026)](https://ofox.ai/blog/claude-code-hooks-subagents-skills-complete-guide-2026/) — 25 hook lifecycle points, subagent isolation, Skill tool
- [Claude Code Features and Settings Reference 2026](https://hidekazu-konishi.com/entry/claude_code_features_settings_reference_2026.html) — settings, hooks, background tasks
- [Hooks reference — Claude Code Docs](https://code.claude.com/docs/en/hooks) — hook lifecycle events
- Anthropic `claude-api` skill (bundled, cached 2026-05-26) — model catalog, effort tiers, adaptive thinking, model ID `claude-opus-4-8`
