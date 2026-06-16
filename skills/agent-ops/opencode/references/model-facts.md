# OpenCode CLI / Runtime — Model Facts

> Current facts about the OpenCode agent runtime gathered from official sources for the `opencode` skill.
> Last updated: 2026-06-11.

## What OpenCode Is

OpenCode is an open-source, provider-agnostic AI coding-agent runtime. It is not a model. It is the harness that runs the agent loop, manages sessions/tools/permissions/context, and routes work to a selected `provider/model` engine.

Current public docs and the source repository describe a TypeScript-centered client-server runtime distributed through package-manager installs. Treat "Go-based OpenCode" claims as stale unless the current repository language mix and docs say otherwise.

Runtime surfaces:

- Terminal TUI for interactive development.
- `opencode run` for non-interactive scripting.
- `opencode acp` for Agent Client Protocol editor/IDE bridging.
- Desktop app beta.
- `opencode web` for browser UI backed by a server.
- `opencode serve` plus `opencode attach` / `opencode run --attach` for long-running or remote server workflows.

## Non-Interactive Invocation

`opencode run [message..]` runs a prompt without launching the full TUI.

Important flags to verify against `opencode run --help` before relying on them:

- `--model` / `-m` — model in `provider/model` form.
- `--agent` — named agent to use.
- `--variant` — model variant / reasoning-effort path where supported.
- `--continue` / `-c` — continue the last session.
- `--session` / `-s` — continue a specific session ID.
- `--fork` — fork an existing session.
- `--file` / `-f` — attach files to the message.
- `--dir` — run from a specific directory.
- `--format json` — emit JSONL events on stdout.
- `--attach` — attach to a running OpenCode server.
- `--dangerously-skip-permissions` — bypass permission prompts; do not use on sensitive work.
- `--thinking` — show thinking blocks where available.
- `--port`, `--username`, `--password` — server/auth-related execution options.

Automation rule: `--format json` emits JSONL, not one JSON document. Parse line-by-line, reconstruct assistant text from text events, and treat process exit as the terminal signal. Real runs can exit before a final `step_finish` event reaches stdout; use session/export/stat surfaces for complete usage data.

## Model Selection

Use an explicit `provider/model` string for auditable dispatch.

Documented startup precedence:

1. CLI `--model`.
2. Config `model` key.
3. Last used model from session state.
4. Internal default.

Also distinguish:

- `model` — the main engine.
- `small_model` — lightweight helper tasks, such as titles or summaries.
- `variant` / provider options — reasoning effort, thinking budget, or model-specific runtime knobs.

Confirm availability with:

```bash
opencode models <provider> --refresh --verbose
```

The local 2026-06-11 check with OpenCode `1.16.2` showed the `opencode` provider roster had already drifted from the prior snapshot. Treat every exact Zen/free/Go roster as volatile.

## Config Precedence

The effective config is a merge of multiple sources. Later sources override earlier ones on conflict while non-conflicting settings remain.

Documented order, lowest to highest:

1. Remote config: `.well-known/opencode`.
2. Global config: `~/.config/opencode/opencode.json`.
3. Custom config: `OPENCODE_CONFIG`.
4. Project config: `opencode.json` / `.jsonc`, discovered by walking up to the git worktree.
5. `.opencode/` directories: agents, commands, modes, plugins, skills, tools, themes.
6. Inline config: `OPENCODE_CONFIG_CONTENT`.
7. Managed config: platform admin locations.
8. macOS managed preferences / MDM: `ai.opencode.managed`.

Operational consequences:

- Use `opencode debug config` when model, permission, provider, command, agent, or reference settings are surprising.
- JSONC comments and `$schema` validation are supported.
- Variable substitution supports `{env:VAR_NAME}` and `{file:path}`.
- Managed/MDM config can override developer or CI config.

## Runtime Controls

Permissions and provider policies are different mechanisms:

- `permission` config gates tool actions such as bash, edit, external directories, web fetch/search, LSP, and skill use.
- `experimental.policies` gates provider/resource access.

Do not use broad allow rules or `--dangerously-skip-permissions` on sensitive work. For review/planning/unfamiliar repositories, prefer read-only or ask/deny rules.

Server auth:

- `opencode serve` / `opencode web` are unauthenticated by default.
- Anything reachable beyond deliberate localhost use should set `OPENCODE_SERVER_PASSWORD`; override username with `OPENCODE_SERVER_USERNAME` or CLI username/password flags.
- Treat an exposed unauthenticated server as a remote-code-execution surface because the agent can run tools.

## Extension And Context Layers

OpenCode has native harness extension surfaces:

- Agent Skills from `.opencode/skills/`, `~/.config/opencode/skills/`, and compatibility paths `.claude/skills/` / `.agents/skills/`.
- `AGENTS.md` as the native instruction file; `CLAUDE.md` fallback for compatibility.
- Commands from `.opencode/commands/*.md`.
- References from local directories or Git repositories.
- MCP servers through `opencode mcp`.
- Plugins through `opencode plugin`.
- GitHub integration through `opencode github` and PR workflows.

For controlled "pure OpenCode" runs where Claude compatibility files must not affect context, verify and use the current `OPENCODE_DISABLE_CLAUDE_CODE` family of environment variables.

## CLI Lifecycle Surface

Runtime-operation tasks may involve more than `run`:

- `serve`, `web`, `attach`, `acp`.
- `session`, `stats`, `export`, `import`.
- `github`, `pr`.
- `plugin`, `mcp`.
- `db`, `debug`, `upgrade`, `uninstall`.

These commands matter for audits, CI drivers, session migration, usage accounting, plugin/MCP/GitHub setup, database troubleshooting, and binary lifecycle work.

## OpenCode Zen And OpenCode Go

Zen is an optional curated OpenCode provider/gateway. It is not the runtime itself.

Zen rules:

- Model IDs generally use `opencode/<model-id>`.
- Free/trial model availability is promotional and rotates.
- Paid models are per-token / per-1M-token economics.
- Paid models are described as zero-retention by default, but docs name exceptions for free/trial models and provider APIs such as OpenAI/Anthropic retention.
- Do not send confidential data to a free/trial model unless the exact current selected model policy permits it.
- Attribute quality, cost, privacy, and context to the selected model/provider/data path, not to "OpenCode."

OpenCode Go is a separate optional subscription lane for open coding models. Public docs describe an introductory first-month price and a regular monthly price, with usage limits denominated as dollar value rather than request count. Treat price, limits, model roster, and geography as live economic data; verify before routing work on that basis.

## Local Models

Local or self-hosted paths such as Ollama, LM Studio, and Docker Model Runner are configured as standard providers. This makes OpenCode a good fit when offline/local execution is the harness requirement, but capability still depends on the selected local model.

## Verification Checklist

- Run `opencode --version` before relying on recent docs.
- Run `opencode run --help` before scripting new flags.
- Run `opencode models <provider> --refresh --verbose` before dispatching to a model ID.
- Run `opencode debug config` when config, policy, permission, provider, agent, command, or reference behavior is surprising.
- Protect any reachable `serve`/`web` endpoint with `OPENCODE_SERVER_PASSWORD`.
- Save model, variant, OpenCode version, raw JSONL stream, session ID, and usage source for auditable automation.
- Confirm Zen/Go roster, pricing, limits, and data policy live before using them as a routing reason.

## Sources

- [Intro | OpenCode](https://opencode.ai/docs/) — runtime overview and surfaces.
- [CLI | OpenCode](https://opencode.ai/docs/cli/) — commands, `run`, flags, JSON output.
- [Models | OpenCode](https://opencode.ai/docs/models/) — model selection and `provider/model` format.
- [Providers | OpenCode](https://opencode.ai/docs/providers/) — 75+ provider support.
- [Config | OpenCode](https://opencode.ai/docs/config/) — config merge order, JSONC, variables, environment controls.
- [Agents | OpenCode](https://opencode.ai/docs/agents/) — built-in/custom agents.
- [Skills | OpenCode](https://opencode.ai/docs/skills/) — Agent Skills discovery.
- [Permissions | OpenCode](https://opencode.ai/docs/permissions/) — tool permissions.
- [Policies | OpenCode](https://opencode.ai/docs/policies/) — provider/resource policies.
- [Commands | OpenCode](https://opencode.ai/docs/commands/) — custom commands.
- [References | OpenCode](https://opencode.ai/docs/references/) — references.
- [Server | OpenCode](https://opencode.ai/docs/server/) — `serve`, `web`, auth, attach.
- [ACP | OpenCode](https://opencode.ai/docs/acp/) — IDE bridge.
- [GitHub | OpenCode](https://opencode.ai/docs/github/) — GitHub integration.
- [MCP Servers | OpenCode](https://opencode.ai/docs/mcp-servers/) — MCP management.
- [TUI | OpenCode](https://opencode.ai/docs/tui/) — interactive TUI behavior.
- [Zen | OpenCode](https://opencode.ai/docs/zen/) — curated provider, roster/pricing/privacy.
- [Go | OpenCode](https://opencode.ai/docs/go/) — subscription lane.
- [OpenCode source repository](https://github.com/anomalyco/opencode) — source language, release, and issue context.
