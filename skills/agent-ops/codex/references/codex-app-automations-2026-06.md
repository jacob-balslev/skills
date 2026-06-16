# Codex App Automations — sandbox, scheduling, and prompt behavior

> Verified facts about how the Codex desktop app executes scheduled automations: sandbox
> resolution, network access, environment options, and reporting. Researched for the
> nightly Skill Audit Loop automation redesign.
> Last updated: 2026-06-10

## Sandbox resolution (the load-bearing facts)

- **Automations always start with the `workspace-write` sandbox — even when the app is
  configured for full access.** The desktop app stores its sandbox preference in
  `.codex-global-state.json`, which is NOT in the app-server's config resolution chain;
  the automation launcher's `thread/start` RPC passes no sandbox parameter, so the
  app-server defaults to `workspace-write` from `config.toml`. Interactive chat is
  unaffected (the UI sends `sandbox: danger-full-access` explicitly). Open upstream bug,
  no workaround documented: [openai/codex#15310](https://github.com/openai/codex/issues/15310).
  **Design automations for workspace-write; never assume full access.**
- **Workspace-write blocks outbound network by default.** Enable per host in
  `~/.codex/config.toml`:
  ```toml
  [sandbox_workspace_write]
  network_access = true
  ```
  ([Config reference](https://developers.openai.com/codex/config-reference))
- Other `[sandbox_workspace_write]` keys: `writable_roots` (array — extend writable dirs
  without dropping the sandbox), `exclude_tmpdir_env_var` / `exclude_slash_tmp` (booleans —
  leave UNSET when tooling relies on temp scratch dirs, e.g. the Skill Audit Loop's scratch
  CLI homes and heartbeat files).
- `approval_policy` accepts `untrusted | on-request | never | { granular = … }`; automations
  use `never` where org policy permits. Admins can enforce stricter policy via
  `requirements.toml`. ([Sandboxing](https://developers.openai.com/codex/concepts/sandboxing),
  [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security))

## Execution environment

- Per-automation choice: **dedicated git worktree** (isolated; recommended by the docs for
  unsupervised runs) vs **local checkout** (required when the job depends on shared local
  state — claim files, ledgers, committing to a sibling repo). Frequent worktree schedules
  accumulate worktrees; archive unneeded runs.
- Project-scoped local automations require: machine powered on, Codex app running, project
  present on disk at the scheduled time.
- Model + reasoning effort can be pinned per automation or left on defaults.

## Reporting behavior

- Findings land in the inbox ("Triage"); **runs with nothing to report auto-archive** —
  an archived run is not a failed run. If you want every run visible, the prompt must
  always produce a report (e.g. a per-item outcome contract + completeness claim).
- Standalone automations report independently; thread automations are heartbeat-style
  wake-ups that keep returning to one conversation (minute/daily/weekly cadences).

## Prompt guidance (from the official docs)

- Make automation prompts durable: state what to do each wake, how to decide whether
  there is anything to report, and when to stop or ask for input.
- Test the prompt manually in a regular thread before scheduling; review the first few
  scheduled outputs and adjust prompt/cadence.
- Codex reads `AGENTS.md` files before doing any work — layer global + project guidance
  there instead of restating it per automation.
- Sweet spot per practitioner writeups: recurring work with the same shape every time
  (triage, checks, report generation) — not judgment-heavy work.

## Sources

- [Automations — Codex app](https://developers.openai.com/codex/app/automations) — execution env, sandbox inheritance, inbox/auto-archive, durable-prompt guidance
- [Sandboxing — concepts](https://developers.openai.com/codex/concepts/sandboxing) — workspace-write semantics, writable_roots
- [Configuration reference](https://developers.openai.com/codex/config-reference) — `sandbox_workspace_write.network_access` / `writable_roots` / tmp exclusions, `approval_policy` values
- [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security) — full-access risk, allowlist rules, `requirements.toml`
- [openai/codex#15310](https://github.com/openai/codex/issues/15310) — automations silently run workspace-write regardless of full-access (open)
- [Best practices](https://developers.openai.com/codex/learn/best-practices) — AGENTS.md layering, test-before-scheduling, skills/automation guidance
- [Codex Knowledge Base: Desktop automations](https://codex.danielvaughan.com/2026/04/08/codex-desktop-automations/) — triggers + review-queue walkthrough
- [Developers Digest: Codex Automations](https://www.developersdigest.tech/blog/codex-automations-recurring-engineering-work) — what recurring agent work succeeds in practice
