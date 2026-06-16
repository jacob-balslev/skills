# Codex CLI Harness — Capability & Failure-Mode Facts

> Verified facts about OpenAI's Codex CLI agent harness for the `codex` skill.
> Last updated: 2026-06-11T00:00Z
> Command-surface facts in this file are verified against `codex-cli 0.130.0` (`codex … --help`); web sources cover concepts the CLI help does not spell out.

## What Codex is

The **Codex CLI** is OpenAI's terminal-first agent harness that drives a frontier GPT model (the GPT-5.5 generation; `/model` switches among the GPT models the app serves). It is the GPT-running counterpart to Claude Code.

## Resumable sessions (the headline differentiator)

Resumed runs keep the original **transcript, plan history, and approvals**, so prior context is reused while you supply new instructions.

| Command | Behavior |
|---|---|
| `codex resume` | Interactive picker of recent sessions |
| `codex resume --last` | Jump straight to the most recent session (skip the picker) |
| `codex resume <SESSION_ID>` | Resume a specific session by ID |
| `codex exec resume <SESSION_ID> "<instruction>"` | **Non-interactive** resume by ID with a follow-up prompt |
| `codex exec resume --last "<instruction>"` | Non-interactive resume of the most recent session |
| `--all` | Consider sessions from any directory (not just the current cwd) |
| `-C, --cd <DIR>` | Override the working directory before resuming |
| `--add-dir <dir>` | Add extra roots to the environment |

For threaded GPT consultations, capture the session id and `codex exec resume <SESSION_ID> "<follow-up>"` instead of cold one-shots — cold one-shots re-send full context every turn and lose the plan/approval history.

## Non-interactive `exec` mode

The `exec` subcommand automates workflows by **piping the final plan and results back to stdout** without user interaction — the basis for in-process dispatch (one agent calling Codex as a subprocess rather than an interactive TUI).

Structured-output flags on `codex exec` (verified against `codex exec --help`, 0.130.0):

| Flag | Behavior |
|---|---|
| `--json` | Print events to stdout as JSONL (stream the run) |
| `--output-schema <FILE>` | Path to a JSON Schema file describing the model's final-response shape |
| `-o, --output-last-message <FILE>` | Write only the final assistant message to a file |
| `--ephemeral` | Run without persisting a resumable session |
| stdin | Pipe the prompt in via stdin for scripted dispatch |

## Approval & sandbox modes (two distinct layers)

Codex separates the **sandbox policy** (what model-generated shell commands may touch) from the **approval policy** (when the human is asked), and the interactive `/permissions` presets bundle them.

**`-s, --sandbox <SANDBOX_MODE>`** — possible values (verified against `codex --help`, 0.130.0):

| Sandbox mode | Behavior |
|---|---|
| `read-only` | Commands may read only; no writes or network until escalated |
| `workspace-write` | Read/write within the working directory (no network by default) |
| `danger-full-access` | No sandbox — network + cross-machine reach. A real safety boundary; escalate deliberately |

The `--sandbox` MODES above are the verifiable contract (from `codex --help`) and are what a user selects — document the harness at the mode level. The OS-level ENFORCEMENT mechanism behind a mode is a platform-specific implementation detail, not a load-bearing capability of the skill: on **macOS** it is Apple **Seatbelt** (`sandbox-exec`) — the same mechanism this audit loop's own kernel fence relies on — and on **Linux** it is Landlock + seccomp. Per-OS kernel-enforcement specifics evolve and are not reproducible from every environment, so do NOT assert a fixed per-OS mechanism (e.g. a "native Windows sandbox") as a current capability unless live OpenAI docs confirm it for the relevant version; describe sandboxing by its MODE, and treat platform-enforcement detail as "check current docs," not as a verified fact.

**`-a, --ask-for-approval <APPROVAL_POLICY>`** governs when approval is requested (e.g. `on-request` for interactive runs, `never` for unattended runs). `--dangerously-bypass-approvals-and-sandbox` skips ALL confirmation and sandboxing — EXTREMELY DANGEROUS, intended only for environments that are already externally sandboxed.

The interactive **`/permissions`** presets are the UI layer over these: **Auto** (read/edit/run within the working dir), **Read-only** (browse only until approval), **Full Access** (network + cross-machine). Do not confuse the preset names with the `--sandbox` values.

## Cloud delegation — `codex cloud exec`

`codex cloud` is an experimental surface for running tasks in Codex Cloud and applying changes locally (`exec` / `status` / `list` / `apply` / `diff`). Verified usage (`codex cloud exec --help`, 0.130.0):

```
codex cloud exec [OPTIONS] --env <ENV_ID> [QUERY]
```

| Flag | Behavior |
|---|---|
| `--env <ENV_ID>` | **REQUIRED** — target environment identifier (browse with `codex cloud`). Omitting it errors. |
| `--attempts <ATTEMPTS>` | Number of assistant attempts — **best-of-N**. `<ATTEMPTS>` is an arbitrary integer; the CLI help documents **no fixed upper bound** (do NOT claim a `1-4` range). |

A documented `codex cloud exec` invocation MUST carry `--env <ENV_ID>`; a bare `codex cloud exec` is not runnable.

## Other capabilities

- **MCP** — configure Model Context Protocol servers via `~/.codex/config.toml` or `codex mcp` commands.
- **Subagents** — Codex spawns subagents **only when explicitly asked** (not autonomously). Roles configured under `[agents]` in `config.toml`.
- **Code review agent** — `/review` launches a dedicated reviewer that reads a selected diff and reports prioritized, actionable findings.
- **`/model`** — switch the underlying model / reasoning level mid-session.
- **`-c, --config <key=value>`** — override any `config.toml` value at launch (dotted path, TOML-parsed value), e.g. `-c model="o3"`.

## Choosing Codex vs the Claude Code harness (compare specific capabilities, not a one-sided edge)

Both harnesses now carry comparable native extensibility — skills, hooks, MCP, subagents, and a code-review agent — so the decision is about SPECIFIC capability fit, not a blanket "one harness is richer" claim (that contrast is stale: OpenAI documents Codex skills/plugins/hooks/MCP/rules/subagents/app-server-SDK, and Anthropic documents the Claude Code equivalents). Decide on the concrete surface a task needs:

- **Reach for Codex when** the task wants resumable/forkable `exec resume` sessions, stdout-piping non-interactive `exec` with structured outputs (`--json` / `--output-schema` / `--output-last-message`) for scripted in-process dispatch, `codex cloud exec` off-machine delegation with best-of-N `--attempts`, or the `/review` code-review agent — Codex's terminal-/automation-first surface.
- **Reach for the Claude Code harness when** the task wants its plan mode, its specific skills/hooks/subagents implementation, or the particular frontier model it runs.
- **Model-benchmark figures are about the underlying model, not the harness.** If you cite a benchmark (e.g. a Terminal-Bench or SWE-bench score), attribute it to the specific model+date and treat it as a model data-point — do NOT use it as a standing claim that one HARNESS is superior. Benchmarks and model leadership move; verify against current sources before asserting a lead.

## Known failure modes / watch-outs

- **Subagents are not autonomous** — Codex only spawns them when explicitly asked; do not assume automatic fan-out.
- **`danger-full-access` / Full Access grants network + cross-machine reach** — a real safety boundary; default to `read-only` / `workspace-write` (Auto/Read-only) and escalate deliberately.
- **Cold one-shots lose context** — for threaded work, resume the captured session id (`codex exec resume <SESSION_ID>`) rather than re-sending full context every turn; cold one-shots waste context and lose the plan/approval history.
- **Cloud delegation runs off-machine** — `codex cloud exec` targets a remote environment (`--env <ENV_ID>`); do not assume it sees the local working tree.

## Sources

- [Features — Codex CLI | OpenAI Developers](https://developers.openai.com/codex/cli/features) — resumable sessions, exec, permissions, MCP, subagents, `/review`
- [Command line options — Codex CLI](https://developers.openai.com/codex/cli/reference) — flags (`--last`, `--all`, `--cd`, `--add-dir`)
- [Non-interactive mode — Codex](https://developers.openai.com/codex/noninteractive) — exec piping to stdout, structured output
- [How to Resume a Codex CLI Session — Inventive HQ](https://inventivehq.com/knowledge-base/openai/how-to-resume-sessions) — `codex resume --last`, session ID resume
- [Slash commands in Codex CLI](https://developers.openai.com/codex/cli/slash-commands) — `/permissions`, `/review`, `/model`
- `codex --help`, `codex exec --help`, `codex cloud exec --help` (codex-cli 0.130.0) — authoritative for `--sandbox` values, `exec` structured-output flags, and the `cloud exec --env <ENV_ID>` / `--attempts <N>` contract
