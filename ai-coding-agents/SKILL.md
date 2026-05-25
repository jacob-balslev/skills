---
schema_version: 7
name: ai-coding-agents
description: "This skill provides the repo-specific operations reference for the multi-agent coding system. Covers when to use /solve, /solo, /manage, /manage-auto, /grind, /boardmeeting, and /experiment; how grind-loop, dispatch-solver, and agent-runner actually route models; and which files are the source of truth when orchestration behavior is in doubt. Use when choosing an agent workflow, debugging autonomous loop behavior, routing work to Gemini or GPT-5.4, or explaining how task-researcher and task-solver fit together. Do NOT use for generic Linear issue operations - use the linear skill instead. Do NOT use for writing or restructuring skills - use skill-scaffold instead."
type: hybrid
version: 4.1.0
scope: operational
family: agent-ops
triggers:
  - agent-skill
  - orchestration-skill
  - command-skill
  - model-routing-skill
keywords:
  - which command should i use
  - grind loop
  - manage-auto
  - dispatch-solver
  - task dispatch
  - task-solver
  - task-researcher
  - spawn agent
  - boardmeeting
  - agentic engineering
  - flow engineering
  - A2A protocol
  - subagent
  - worktree isolation
  - ralph wiggum
  - autonomous loop
  - agent memory
  - claim lock
  - GRIND_INSTANCE
  - solo status
  - manage continuation
owner: claude
freshness: "2026-03-28"
eval_status: evals+trigger
drift_check: "2026-03-28"
layer: meta
primaryCategory: Agent System
layerPrimary: meta
routingRole: primary
key_files:
  - .claude/commands/workflow/manage.md
  - .claude/commands/workflow/USAGE_GUIDE.md
  - .claude/commands/workflow/solve.md
  - .claude/commands/workflow/solo.md
  - .claude/commands/workflow/grind.md
  - .claude/commands/workflow/boardmeeting.md
  - .claude/commands/workflow/experiment.md
  - scripts/loop/grind-loop.sh
  - scripts/loop/dispatch-solver.js
  - scripts/agent/agent-runner.js
relations:
  adjacent:
    - linear
    - task-execution
    - ghostty
    - repository-structure
  boundary:
    - skill-scaffold
---

# AI Coding Agents

> Use this skill to answer repo-specific orchestration questions from current command docs and scripts, not from generic CLI memory.

## Generated Metadata

| Field | Value |
|---|---|
| Scope | `operational` |
| Skill type | `hybrid` |
| Primary category | `Agent System` |
| Layer primary | `meta` |
| Routing role | `primary` |
| Eval coverage | 28 case(s) across 2 file(s) |
| References | 8 file(s) |
| Relations | adjacent 4 · boundary 1 · verify_with 0 |
| Template source | `skills/ai-coding-agents/SKILL.md.tmpl` |

> This block is generated from live skill metadata. Edit the template, eval files, relation graph, or references directory instead of editing this section in `SKILL.md` directly.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| `ai-coding-agents` | `skill-scaffold` | This skill guides agents in creating, structuring, and maintaining skills using a shared base schema, behavior-based archetypes, and optional section packs |


## Key Files

| File | Purpose |
|---|---|
| `.claude/commands/workflow/manage.md` | Declared source-of-truth file for this skill |
| `.claude/commands/workflow/USAGE_GUIDE.md` | Declared source-of-truth file for this skill |
| `.claude/commands/workflow/solve.md` | Declared source-of-truth file for this skill |
| `.claude/commands/workflow/solo.md` | Declared source-of-truth file for this skill |
| `.claude/commands/workflow/grind.md` | Declared source-of-truth file for this skill |
| `.claude/commands/workflow/boardmeeting.md` | Declared source-of-truth file for this skill |
| `.claude/commands/workflow/experiment.md` | Declared source-of-truth file for this skill |
| `scripts/loop/grind-loop.sh` | Declared source-of-truth file for this skill |
| `scripts/loop/dispatch-solver.js` | Declared source-of-truth file for this skill |
| `scripts/agent/agent-runner.js` | Declared source-of-truth file for this skill |
## Shared Workflow Preamble

- Start from the owning docs and the routed source files before proposing changes.
- Treat verification, documentation, and wrap findings as part of the task, not cleanup after the task.
- Keep evidence close to the work: commands, screenshots, receipts, and doc updates should land in the same change set.
- When this skill overlaps with `AGENTS.md`, `CONTEXT.md`, or repo command docs, use those files as the authority and this block as the common reminder layer.


## Coverage

This skill covers the repo-specific command system, loop entrypoints, dispatch surfaces, and model-routing behavior that power the Development workspace's multi-agent execution flow.

## Philosophy

This skill exists to stop agents from answering orchestration questions from generic CLI memory or stale assumptions. Its job is to ground command and loop behavior in the repo's actual scripts and command docs.


## 1. When this skill applies

| Use this skill for... | Use something else for... |
|---|---|
| choosing between `/solve`, `/solo`, `/manage`, `/manage-auto`, `/grind`, `/boardmeeting`, or `/experiment` | generic issue CRUD in Linear (`linear`) |
| debugging `grind-loop.sh`, `dispatch-solver.js`, or `agent-runner.js` behavior | creating or improving skills (`skill-scaffold`) |
| explaining how repo agents claim tasks, respawn, or hand off work | building an MCP server (`mcp-builder`) |
| routing work to Claude, Gemini, GPT-5.4, MiniMax, or Nemotron inside this repo's automation | generic coding-tool tutorials unrelated to this repo |

- The value of this skill is repo behavior: command contracts, loop semantics, model dispatch, and agent coordination.
- If the question is generic product knowledge about Codex, OpenCode, or Gemini with no repo workflow angle, do not force this skill into the answer.

## 2. Pick the right command by outcome

| Goal | Best entry point | Why |
|---|---|---|
| solve one task with human oversight | `/solve SH-XXX` | full single-task protocol with explicit planning and closeout |
| solve one task autonomously inside a loop | `/solo SH-XXX` or `grind-loop.sh --mode solo` | one task per fresh agent, writes handoff + status file |
| run a visible multi-task orchestrator session | `/manage` | queue building, dependency ordering, researcher/solver gates |
| run the same orchestrator without confirmation pauses | `/manage-auto` | `/manage` contract plus autonomous queue execution and session-end continuation signal |
| keep clearing backlog with fresh contexts | `bash scripts/loop/grind-loop.sh` | loop supervisor that respawns agents after each exhausted session |
| run a GPT-5.4-only Sales Hub loop | `/auto-solve-gpt` | dedicated GPT-5.4 autonomous backlog command with per-task `/wrap` closeout; compaction is optional and provider-cost dependent |
| run a strategic multi-model review | `/boardmeeting` | chair + external reviewers, not implementation work |
| run a page/task design verification cycle | `/experiment` | sequential verify -> implement -> re-verify flow |

- Do not describe `/experiment` as a parallel A/B/C variant contest here. The current command doc is a sequential 3-phase experiment.
- Treat `.claude/commands/workflow/*.md` as the source of truth when a command's behavior is in doubt.

## 3. Read the owning file before answering specifics

| Question type | Source of truth |
|---|---|
| `/manage` or `/manage-auto` behavior | `.claude/commands/workflow/manage.md`, `.claude/commands/workflow/manage-auto.md`, `.claude/agents/task-manager.md` |
| `/solve` or `/solo` flow | `.claude/commands/workflow/solve.md`, `.claude/commands/workflow/solo.md` |
| backlog loop / respawn behavior | `scripts/loop/grind-loop.sh` |
| external model dispatch | `scripts/loop/dispatch-solver.js`, `scripts/agent/agent-runner.js`, `.claude/references/shared-patterns.md` |
| strategic review flow | `.claude/commands/workflow/boardmeeting.md` |
| experiment flow | `.claude/commands/workflow/experiment.md` |
| command-family comparison | `.claude/references/command-guides/orchestration-guide.md` |

- If the user asks why a loop respawns, where continuation is written, or how Gemini is routed, inspect the owning script or command file first.
- Do not answer orchestration questions from stale memory, old benchmark tables, or archived command behavior.

## 4. Runtime truths that commonly drift

| Current repo truth | Evidence |
|---|---|
| `dispatch-solver.js --model gemini` uses the native Gemini CLI, not OpenCode | `scripts/loop/dispatch-solver.js`, `.claude/references/shared-patterns.md` |
| `agent-runner.js` routes `gemini-*` to Gemini CLI, `gpt-5.4`/`minimax`/`nemotron` to OpenCode, and `codex` to Codex CLI | `scripts/agent/agent-runner.js` |
| `grind-loop.sh` owns respawn logic, claim locks, `solo-status*.json`, and `manage-continuation*.json` | `scripts/loop/grind-loop.sh` |
| `manage-auto` always writes `context_health: "exhausted"` at session end | `.claude/commands/workflow/manage-auto.md` |
| `/boardmeeting` now uses `dispatch-solver.js` background dispatch, not Ghostty tabs, for reviewer execution | `.claude/commands/workflow/boardmeeting.md` |
| task claiming should go through `node scripts/linear-cli.js claim ...`, not ad hoc status updates | `.claude/commands/workflow/manage.md`, `.claude/commands/workflow/solve.md`, `.claude/commands/workflow/solo.md` |

- When documenting model routing, mention the transport layer and the command layer. Example: `/auto-solve-gpt` is the workflow entry point; OpenCode is the backend that runs GPT-5.4.
- When documenting queue behavior, distinguish `/manage` from `manage-auto` and from `grind-loop.sh`. They are related but not interchangeable.

## 5. Researcher/solver roles

| Role | What it does | When it runs |
|---|---|---|
| `task-researcher` | read-only refinement, shaped spec, `VERDICT` gate | before solving when structuredness is insufficient |
| `task-solver` | implementation, verification, docs, commit, `RESULT` gate | after the task is ready to execute |

- In `/manage` and `/grind`, researcher is conditional. If the task is already well-structured, the orchestrator may skip it.
- If you explain this flow, mention the gate tokens (`READY`, `BLOCKED`, `NEEDS_SHAPING`, `DONE`, `PARTIAL`) only when relevant to the user's question.

## 6. Answer shape

- For "which command should I use?" questions, recommend one command first and explain the trade-off in one or two lines.
- For debugging questions, cite the specific command doc or script that owns the behavior.
- For model-routing questions, separate three layers: command, orchestrator/script, backend CLI.
- For loop questions, mention the actual state files if they matter (`manage-continuation*.json`, `solo-status*.json`).
- Do not pad the answer with benchmark trivia unless the routing decision truly depends on it.

## 7. Agentic Engineering Taxonomy (2026)

The field has developed distinct labels for different ways humans use AI to write code. Where our system sits on this spectrum matters for how we design guardrails, review gates, and loop semantics.

### The three tiers

**Vibe coding** — casual AI-assisted coding with minimal review. The human describes what they want, accepts whatever the model produces, and moves on. Fast, but carries real cost: research shows AI-generated code produced in this mode has roughly 1.7x more major issues per line than code written with structured review. It works for throwaway scripts. It should not be anywhere near production systems.

**Agentic engineering** — structured orchestration where AI agents plan, implement, and verify under human oversight. Agents are not just autocomplete; they are actors in a coordinated workflow. This system operates here. Agents claim tasks, produce artifacts, run verification passes, and surface results to a human before merging. The human is not absent — they designed the workflow and can inspect every output.

**Flow engineering** — designing the control flow and state transitions that surround LLM calls, not just optimizing the prompts inside them. A flow engineer asks: which task gets dispatched to which model and why? What happens when an agent stalls? How does context degrade and what triggers a fresh spawn? Our `dispatch-solver.js`, `grind-loop.sh`, and `manage-auto` are flow engineering artifacts. The prompt content inside each agent matters, but the orchestration structure is what makes the system reliable at scale.

### Where this system sits

We are firmly in **agentic engineering** for task execution, with **flow engineering** at the orchestration layer. The separation is intentional: task agents (task-solver, task-researcher) stay focused on implementation correctness; the orchestration layer (grind-loop, manage-auto, dispatch-solver) handles retry logic, model routing, context exhaustion, and handoff. Neither layer needs to know the other's internals.

This taxonomy matters when evaluating changes. A proposed simplification to a loop that removes a review gate may look like a flow engineering improvement but is actually a regression toward vibe coding. Name the tier before accepting the trade-off.

---

## 8. Subagent Patterns

The Claude Code Agent tool lets a running agent spawn subordinate agents. These patterns appear throughout the repo's orchestration scripts.

### Isolation modes

**Worktree isolation (`isolation: "worktree"`)** — the subagent operates in a separate git worktree, giving it its own working directory and branch. Changes it makes do not immediately affect the parent's workspace. Use this when:
- The subagent will modify files (avoids conflicts with concurrent agents)
- You need the subagent's work to be reviewable before merging
- Running multiple agents in parallel on the same repo

Without `isolation: "worktree"`, the subagent shares the parent's working directory. Use shared workspace only for read-only analysis or tightly coordinated single-file tasks where conflicts are impossible.

### Foreground vs. background

**Foreground agents** — the parent waits for the subagent to complete before proceeding. Use this when the parent's next step depends on the subagent's output (e.g., a researcher agent whose findings feed the solver's plan).

**Background agents** — the parent dispatches and continues. Use this for fire-and-forget work: sending notifications, running independent checks, parallel sub-tasks where the parent aggregates results later. Our `dispatch-solver.js` supports both modes via the `--wait` flag.

### Parallel launch

Multiple independent Agent tool calls in a single response dispatch in parallel. This is the correct pattern when sub-tasks have no dependencies between them — for example, running a type check, a lint pass, and a test run simultaneously. Do not chain them sequentially if they can run at the same time.

### Cross-project parallel orchestration (SH-6446)

For workloads spanning multiple projects (Sales Hub + Skill Graph + Agent Orchestration, etc.), the validated pattern is one orchestrator session running N Opus subagents in parallel — one per project — each doing research-drain + `/orchestrate` planning, then dispatching task-solvers per project. The recursion limit means subagents CANNOT spawn further Agent calls; second-layer fan-out happens at the orchestrator level.

Apply pilot-then-batch per-project: dispatch the first solver per project foreground (or background but await), then dispatch the rest after each pilot reports DONE or PARTIAL. A systemic failure in one project (claim guard collision, missing artifact, repo divergence) does not block other projects from dispatching their own pilots. See `.claude/commands/workflow/manage.md` § Step 4.5b and the validated pattern in `docs/plans/parallel-3-project-pilot-2026-05-24.md`.

### Agent continuation via SendMessage

A running subagent can receive additional instructions via `SendMessage` while still executing. This is how `/manage-auto` injects the continuation signal at session end — the orchestrator sends a message rather than terminating and re-spawning. Use SendMessage for mid-flight corrections, not for spawning new work.

### Subagents vs. direct tool calls

Use a subagent when:
- The work is large enough to warrant its own context window
- Isolation is needed (separate git branch, different working directory)
- The task is parallelizable and independent
- You need the result reviewed by a separate model

Use direct tool calls when:
- The task is a few file reads or a quick script execution
- You already have enough context to act without delegation
- The overhead of spawning an agent exceeds the complexity of the task

The wrong call: spawning a subagent to read a single file. The right call: spawning a subagent to implement a 5-file feature with its own verification pass.

---

## 9. Cross-Platform Agent Protocols

Agents in different processes, on different machines, or in different AI systems need coordination protocols. Three layers are relevant here.

### Google A2A (Agent-to-Agent protocol)

A2A is Google's open protocol for agent-to-agent communication. Agents publish an "agent card" (a JSON document describing their capabilities) and communicate via HTTP requests that carry task objects. The protocol defines task lifecycle states (submitted, working, completed, failed), artifact delivery, and streaming via SSE. It is designed for heterogeneous agent networks where agents from different providers must collaborate.

We do not currently implement A2A natively, but the concepts map directly onto our system: agent cards ≈ skill files; task objects ≈ Linear issues with acceptance criteria; task lifecycle ≈ our claim/in-progress/done state machine. If inter-vendor agent coordination becomes a requirement, A2A is the protocol to evaluate first.

### MCP as tool integration protocol

Model Context Protocol (MCP) is Anthropic's standard for giving agents access to external tools and data sources. We use MCP for three integrations that have no viable CLI alternative: Context7 (library docs), Figma (design assets), and Sentry (error reports). For everything else — Linear, Neon, Vercel, Shopify, Printify — we use CLI tools instead.

### CLI-first as an MCP alternative

Our CLI-first rule exists because MCP adds token overhead for every tool call. At scale, this compounds: a session that makes 50 Linear queries via MCP consumes roughly 85x more tokens than the same session using `node scripts/linear-cli.js`. The tradeoff is clear for high-frequency integrations. Keep MCP for integrations where the overhead is justified by richer API surface or where no CLI exists.

## Verification

After applying this skill, verify:

- [ ] The recommended command or loop was chosen from repo-local docs or scripts, not generic memory
- [ ] Model-routing claims match the current dispatch scripts or command docs
- [ ] State-file or continuation-file claims point to real current artifacts
- [ ] Any backend/runtime distinction is explained accurately and concretely

### File-based inter-agent coordination (current protocol)

Our agents coordinate through structured JSON files written to known paths:

| File | Written by | Read by | Purpose |
|---|---|---|---|
| `manage-continuation*.json` | `manage-auto` at session end | `manage-loop-hook.py` | Signals remaining tasks + context health for next spawn |
| `solo-status*.json` | `/solo` agent at task end | `grind-loop.sh` | Reports outcome (DONE / BLOCKED / PARTIAL) for loop decision |
| `agent-orchestration/.artifacts/*.md` | Task manager (orchestrator) | Task solver (subagent) | Full task payload: spec, acceptance criteria, UUID |
| `agent-orchestration/.planning/PLAN.md` | Task researcher | Task solver | Structured implementation plan with subtask list |

File-based coordination is simpler than A2A but has the same fundamental shape: producer writes a structured artifact to a known location; consumer reads and acts on it. The limitation is that it requires a shared filesystem. For distributed agent networks, A2A or a message queue would replace these files.

---

## 10. Autonomous Loop Patterns

Several approaches exist for running agents in loops without continuous human intervention. Understanding the trade-offs helps when choosing or modifying loop behavior.

### The Ralph Wiggum pattern (exit code 2 + stop hook)

Named after the community blog post that popularized it. The pattern uses three pieces:

1. The agent's instructions tell it to exit with code 2 when all work is done (or when it is blocked)
2. A Claude Code stop hook intercepts the exit signal
3. The hook checks the exit code: 2 means "stop the loop cleanly"; any other non-zero code means "respawn"

This gives the agent a clean way to signal completion without the orchestrator needing to parse output. The "completion promise" variant adds a final sentence in the agent's last response that the hook can grep for, giving human-readable confirmation alongside the exit code.

The pattern is roughly 20 lines to implement, is compatible with any Claude Code project, and is widely adopted in the community. It is the right choice for simple single-repository loops where you want agents to keep claiming and solving tasks until the backlog is clear.

### Our manage-loop (manage-continuation.json)

More powerful and more complex. The flow:

1. `manage-auto` runs until its context is exhausted, then writes `manage-continuation*.json` with `context_health: "exhausted"`, the count of remaining tasks, and a self-retrospective
2. `manage-loop-hook.py` (a stop hook) reads the JSON and decides whether to respawn
3. A new `claude --print` process starts with the continuation context pre-loaded
4. The new session reads the JSON, resumes from where the previous session left off

What this adds over the Ralph Wiggum pattern: checkpoint/resume (the new session has structured handoff data, not a cold start), self-retrospective (the outgoing session reports on what it accomplished and what blocked it), and Linear integration (task state is already updated before the session ends). The cost is ~200 lines of hook logic plus the continuation JSON schema.

### grind-loop.sh (supervisor respawn)

`grind-loop.sh` is a Bash supervisor that wraps either `/solo` or `/manage-auto`. When an agent process exits, the loop checks `solo-status*.json` for the outcome and respawns if appropriate. Key properties:

- **Instance-aware** — Pass `--instance ID` as a CLI flag to run multiple grind loops in parallel without colliding on claim locks. The script exports this as the `GRIND_INSTANCE` env var to child processes. Example: `bash scripts/loop/grind-loop.sh --instance A`
- **Worktree-compatible** — each respawn can operate in a fresh git worktree
- **Outcome-gated** — a `BLOCKED` result from the agent stops the loop; a `DONE` or `PARTIAL` result triggers a respawn up to the cap

Use `grind-loop.sh` when you want a persistent backlog-clearing process that survives context exhaustion by spawning fresh agents, rather than resuming the same context.

### Safety caps

| Pattern | Cap mechanism | Default |
|---|---|---|
| Ralph Wiggum | Completion promise (agent self-terminates) | Unbounded unless hook adds a counter |
| manage-loop | `max_iterations` in `manage-continuation.json` | 10 |
| grind-loop.sh | `--max-iterations` flag | 10 |

Our 10-iteration default reflects a deliberate trade-off: enough to clear a reasonable backlog in one session, low enough to require human re-approval for unusually long runs. Increase it only when you have verified the loop is making forward progress on each iteration and is not stuck in a retry cycle.

---

## Reference Files

| File | Why to read it |
|---|---|
| `references/command-map.md` | Current command selection guidance and common confusions |
| `references/runtime-and-routing.md` | Dispatch backends, loop state files, and stale assumptions to avoid |

---

*Version 4.1.0 - 2026-04-01. Fixed broken key file paths for workflow commands. Added /workflow/ to .claude/commands/ paths.*
