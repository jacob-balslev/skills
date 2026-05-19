---
name: intent-recognition
description: "Use immediately before an agent or tool runner performs a risky action: sensitive reads, file writes, dependency installs, database mutations, git history changes, deploys, package publication, credential operations, or public/external side effects. Classifies the intended action by operation and target sensitivity into Passive/Read, Reconnaissance, Modification, or Destructive/Irreversible, then applies Identify / Confirm / Verify before execution. Do NOT use for deciding implementation logic, reviewing a finished diff, configuring deterministic guardrail enforcement, designing safe migrations, or analyzing failures after they already happened."
license: MIT
compatibility:
  notes: "Runtime-agnostic. Applies to any LLM or automation harness with tools: shell, filesystem, VCS, database, package manager, deployment, browser, API, or MCP-style tool calls. Substitute local approval policy, protected-path list, default branch names, database roles, and package/deploy tooling."
allowed-tools: Read Grep
grounding:
  domain_object: "Pre-execution risk classification for agent/tool actions and side-effecting automation"
  grounding_mode: "hybrid"
  truth_sources:
    - https://openai.github.io/openai-agents-python/guardrails/
    - https://genai.owasp.org/llmrisk/llm062025-excessive-agency/
    - https://www.nist.gov/itl/ai-risk-management-framework
    - https://git-scm.com/docs/git-reset
    - https://git-scm.com/docs/git-push
    - https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json
  failure_modes:
    - sensitive_read_mislabeled_passive
    - dependency_install_mislabeled_read_only
    - destructive_git_command_treated_as_routine_mutation
    - database_delete_without_preview_or_alternative
    - public_publish_or_deploy_without_confirmation
    - credential_operation_without_blast_radius_check
    - action_target_not_checked_against_user_intent
    - safer_reversible_alternative_not_considered
  evidence_priority: "equal"
drift_check:
  last_verified: "2026-05-19"
metadata:
  schema_version: 6
  version: "3.0.0"
  type: capability
  category: engineering
  domain: ai-engineering/safety
  scope: portable
  owner: skill-graph-maintainer
  freshness: "2026-05-19"
  drift_check: '{"last_verified":"2026-05-19"}'
  eval_artifacts: present
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: stable
  keywords: '["intent recognition","action classification","pre-execution risk classification","tool execution risk","agent action risk","passive read","reconnaissance","modification","destructive action","irreversible operation","sensitive target","credential read","dotenv read","dependency install risk","lockfile rewrite","git reset hard","force push","database delete","drop table","package publication","deploy approval","Identify Confirm Verify","non-destructive alternative","target sensitivity elevates tier","side-effecting tool call"]'
  triggers: '["classify this action","what tier is this tool call","before running this command","is this safe to run","intent-recognition","action-classification","risk tier","pre-execution risk","destructive or modification","reconnaissance or passive","Identify Confirm Verify"]'
  examples: '["classify the risk of running git reset --hard HEAD~5","is reading .env a safe read operation?","before running pnpm install, what risk tier applies?","the agent wants to DELETE FROM sessions where expired=true -- what must it verify first?","should I confirm before git push --force-with-lease?","what tier is a package publish dry run vs actual publish?","is viewing .env.example passive or reconnaissance?","the next tool call writes 40 files -- what should be confirmed before execution?","the agent wants to deploy production from this branch -- classify and verify"]'
  anti_examples: '["write the TypeScript function for this feature","review this PR for correctness and maintainability","design a deterministic hook that blocks dangerous commands","set up a reactive guardrail that blocks dangerous commands","create the database migration plan and rollback sequence","debug why the previous deploy failed","choose the branching model for this repository","write the final user-facing confirmation copy","run the already-approved command now"]'
  relations: '{"boundary":[{"skill":"guardrails","reason":"guardrails owns enforcement surfaces, tripwires, blocking/advisory policy, and protected-operation controls; intent-recognition owns the cognitive classification of one intended action before execution."},{"skill":"tool-call-flow","reason":"tool-call-flow owns sequencing and coordination of tool calls; intent-recognition owns the risk tier and pre-execution checkpoint for a proposed tool call."},{"skill":"version-control","reason":"version-control owns normal Git workflow design; intent-recognition classifies a specific Git command at execution time when flags, branch, and target determine risk."},{"skill":"database-migration","reason":"database-migration owns schema/data-change planning and rollback design; intent-recognition classifies the immediate database command before it runs."},{"skill":"code-review","reason":"code-review evaluates artifacts after or before merge; intent-recognition evaluates action risk, not code quality."},{"skill":"debugging","reason":"debugging investigates failures after execution; intent-recognition prevents one class of failure by classifying actions before execution."},{"skill":"owasp-security","reason":"owasp-security audits application security risks; intent-recognition is domain-neutral action-risk classification for tools and agents."},{"skill":"prompt-injection-defense","reason":"prompt-injection-defense treats untrusted instructions as data; intent-recognition classifies the resulting proposed action even when the prompt source is benign."}],"related":["guardrails","tool-call-flow","version-control","database-migration","code-review","debugging","owasp-security","prompt-injection-defense"],"verify_with":["guardrails","version-control","database-migration"]}'
  grounding: '{"domain_object":"Pre-execution risk classification for agent/tool actions and side-effecting automation","grounding_mode":"hybrid","truth_sources":["https://openai.github.io/openai-agents-python/guardrails/","https://genai.owasp.org/llmrisk/llm062025-excessive-agency/","https://www.nist.gov/itl/ai-risk-management-framework","https://git-scm.com/docs/git-reset","https://git-scm.com/docs/git-push","https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json"],"failure_modes":["sensitive_read_mislabeled_passive","dependency_install_mislabeled_read_only","destructive_git_command_treated_as_routine_mutation","database_delete_without_preview_or_alternative","public_publish_or_deploy_without_confirmation","credential_operation_without_blast_radius_check","action_target_not_checked_against_user_intent","safer_reversible_alternative_not_considered"],"evidence_priority":"equal"}'
  portability: '{"readiness":"scripted","targets":["skill-md"]}'
  lifecycle: '{"stale_after_days":180,"review_cadence":"quarterly"}'
  mental_model: |
    Intent recognition is the brake check before a tool action. The question is not "am I allowed to use tools?" but "what class of consequence does this exact action have against this exact target, and is there a safer reversible way to get the same result?"
  purpose: |
    This skill slows agents down at the point where inference meets side effects. It prevents familiar-looking commands from bypassing risk review when a flag, target, environment, or publication surface changes the blast radius.
  boundary: |
    This skill classifies one intended action before execution. It does not decide implementation logic, enforce deterministic guardrails, design full migration plans, review code artifacts, define governance policy, or debug failures after execution.
  analogy: "Intent recognition is a flight checklist for tool calls: the action may be routine, but the target, weather, and runway determine whether takeoff is safe."
  misconception: "The common mistake is classifying by verb alone. Read, write, push, install, and delete all change tier depending on target sensitivity, scope, reversibility, and public exposure."
  concept: '{"definition":"Intent recognition is pre-execution classification of an agent or automation action by operation, target sensitivity, reversibility, and external blast radius.","mental_model":"Classify the exact action against the exact target; then require only the checkpoint proportional to the tier.","purpose":"It prevents sensitive reads, destructive mutations, public publications, and irreversible history or data changes from being treated as routine tool use.","boundary":"It does not own implementation design, deterministic guardrail enforcement, migration planning, code review, governance policy, or post-failure debugging.","taxonomy":"Tiers: Passive/Read, Reconnaissance, Modification, Destructive/Irreversible. Modifiers: sensitive target, production/public target, bulk scope, credential effect, history rewrite, dependency/environment mutation, reversible alternative available.","analogy":"It is a flight checklist for tool calls.","misconception":"No state change does not mean no risk; sensitive reads are reconnaissance because exposure itself is the risk."}'
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/engineering/intent-recognition/SKILL.md
---

# Intent Recognition

## Coverage

Use this skill to classify a proposed agent or tool action before it runs. It covers four action tiers, target-sensitivity elevation, high-impact modifiers, and the Identify / Confirm / Verify sequence for commands that mutate state, expose sensitive information, rewrite history, alter environments, publish externally, deploy, or touch credentials.

The unit of analysis is one intended action against one target. A command such as `git push` is not inherently one tier; `git push origin feature-x`, `git push origin main`, and `git push --force origin main` have different risk. A read is not always passive; reading a normal source file is different from reading a real credential file.

## Philosophy

Agents can execute tool calls faster than they can feel uncertainty. That is useful for harmless reads and dangerous for irreversible operations. Without a pre-execution classifier, a familiar command can slip through because it looks routine while its target or flags make it destructive.

The core rule is operation plus target. The operation says what kind of effect is possible; the target says how much that effect matters. Reading `README.md` is Passive/Read. Reading `.env` is Reconnaissance because the content can expose credentials. Updating one Markdown file is Modification. Publishing a package, deploying production, or force-pushing a protected branch is Destructive/Irreversible because the effect leaves the local workspace.

This skill is not a permission system. Permission says whether the agent is allowed to do a class of work. Intent recognition says whether the next action matches the plan, what tier it occupies, and whether a safer alternative should be used before the tool fires.

## Grounding

This skill combines public safety and tool semantics:

- OpenAI Agents SDK guardrail docs distinguish input, output, and tool guardrails; tool guardrails can validate or block function-tool calls before and after execution. This grounds the boundary between cognitive classification and enforcement surfaces.
- OWASP LLM06:2025 Excessive Agency describes harmful actions arising from excessive functionality, permissions, and autonomy, and recommends minimizing tools, permissions, autonomy, and requiring approval for high-impact actions.
- NIST AI RMF frames AI risk management as a design, development, deployment, use, and evaluation discipline, grounding the need to classify risk before action rather than only after incidents.
- Git reset documentation says `git reset --hard` overwrites files and updates the index to match the target commit, grounding its destructive classification.
- Git push documentation warns that `--force` disables safety checks and can cause remote commits to be lost, while `--force-with-lease` adds a ref expectation check.
- npm package-lock documentation says package-lock is generated for operations where npm modifies the `node_modules` tree or `package.json`, grounding dependency installs as environment-affecting modifications.

Use these as constraints, not as a single harness recipe. Local policy decides exactly which actions require user confirmation, but the action tier must be earned from the actual operation and target.

## The Four Tiers

| Tier | Name | Definition | Examples | Default checkpoint |
|---|---|---|---|---|
| 1 | Passive/Read | Reads non-sensitive local information without mutating state or exposing protected content. | List files, read public docs, inspect non-sensitive source, grep code. | Proceed after ordinary relevance check. |
| 2 | Reconnaissance | Reads or discovers sensitive, security-relevant, private, credential-adjacent, production, or environment information without direct mutation. | Read `.env`, inspect credentials config, list production database tables, print CI secrets metadata, enumerate cloud resources. | Confirm necessity; redact; avoid logging values. |
| 3 | Modification | Changes local or routine project state in a reversible or reviewable way. | Edit source, create files, run formatters, commit local changes, update docs, run a migration in a disposable dev database. | Identify action/tier/reason; confirm it matches the plan. |
| 4 | Destructive/Irreversible | Deletes, rewrites, publishes, deploys, rotates, publicizes, or mutates important remote/prod/shared state where rollback is hard or external. | `git reset --hard`, force-push, `DROP TABLE`, `DELETE` without preview, `npm publish`, production deploy, credential rotation, branch/tag deletion, `rm -rf`. | Identify, Confirm, Verify safer alternative; require explicit authorization when policy demands it. |

### High-Impact Modifier

Some Tier 3 modifications need extra care without becoming Tier 4. Examples: dependency installs, lockfile rewrites, generated-file sweeps, bulk renames, large formatter runs, or commands that implicitly touch many files. Treat these as high-impact Modification: preview scope where possible and confirm the rationale before execution.

## Operation And Target Rule

Classify by both operation and target. If either side is high-risk, classify up.

| Operation | Low-risk target | Sensitive/high-risk target | Tier shift |
|---|---|---|---|
| Read | Non-sensitive source file | `.env`, private key, credentials file, production config | Passive -> Reconnaissance |
| Search | Public docs or local source | secrets, private records, production data, credential names | Passive -> Reconnaissance |
| Write | One local source/doc file | lockfile, CI config, auth config, generated sweep, public docs release | Modification or high-impact Modification |
| Run script | Read-only diagnostics | installs, deploys, deletes, publishes, mutates DB, sends external messages | Modification or Destructive |
| Git command | `status`, `diff`, ordinary local commit | hard reset, branch delete, tag delete, force push, protected branch push | Passive/Modification -> Destructive |
| Database command | `SELECT` in local fixture DB | production SELECT, bulk UPDATE, DELETE, DROP, TRUNCATE | Reconnaissance, Modification, or Destructive |
| Network/API call | GET public docs | POST/DELETE/PATCH, email send, payment, issue/PR publication, cloud mutation | Modification or Destructive |

When the target is ambiguous, classify up until the target is verified. "Probably dev" is not evidence. Connection string, branch, remote, package name, deployment target, database role, and output destination all matter.

## Identify / Confirm / Verify

Run this sequence before Tier 3, high-impact Tier 3, and Tier 4 actions. For Tier 2, use the Identify step plus redaction discipline.

### Identify

State the exact action, target, tier, and reason.

Useful form:

~~~text
Action: git push --force-with-lease origin feature/refactor
Target: remote branch feature/refactor on origin
Tier: Destructive/Irreversible modifier, because it rewrites remote history
Reason: branch was rebased and the remote must be updated
~~~

If the action cannot be stated clearly, stop. Unclear action descriptions are usually scope drift.

### Confirm

Compare the action to the active user request, task plan, or approval boundary.

Ask:

- Did the user or task authorize this class of action?
- Is the target the same target that was discussed?
- Has a routine action escalated because of flags, scope, production/public target, or credential impact?
- Are unrelated files, branches, packages, tables, or external systems included?
- Does this action expose information that should be redacted from chat, logs, commits, or public surfaces?

If the action differs from the plan, reconfirm before execution.

### Verify

Look for a safer alternative with the same outcome.

| Proposed action | Safer alternative to check |
|---|---|
| `git reset --hard` | `git status`, backup branch, `git stash`, `git revert`, or path-limited restore. |
| `git push --force` | `git push --force-with-lease`, new branch, PR update, or explicit expected ref. |
| `rm -rf path` | Move to archive path, preview file list, or use trash/quarantine. |
| `DELETE FROM table` | SELECT preview, transaction, soft delete, archive table, batch with rollback. |
| `DROP TABLE` / `TRUNCATE` | Rename/archive, backup/restore plan, migration rollback plan. |
| Dependency install | Dry run/audit where supported, inspect package, pin version, separate lockfile commit. |
| Package publish/deploy | Dry run/preview, staging deploy, release checklist, rollback plan. |
| Credential rotation | Inventory consumers, staged rollout, overlapping old/new credential window, rollback path. |

If a safer alternative exists and the user did not explicitly require the destructive form, choose the safer form or ask for authorization.

## Classification Examples

| Intended action | Tier | Why |
|---|---|---|
| Read `README.md` | Passive/Read | Non-sensitive local read. |
| Read `.env.example` | Passive/Read or low-risk Reconnaissance | Usually template content, but still inspect for accidental live values before quoting. |
| Read `.env` | Reconnaissance | Sensitive target; exposure is the risk even without mutation. |
| Run `rg "TODO" src` | Passive/Read | Non-sensitive search in source. |
| Edit one `SKILL.md` | Modification | Local file mutation, reviewable in diff. |
| Run `npm install lodash` | High-impact Modification | Can modify package manifest, lockfile, and dependency tree. |
| Run `git commit --only path` | Modification | Local VCS state change with bounded path scope. |
| Run `git reset --hard HEAD~3` | Destructive/Irreversible | Discards local work and rewrites current branch state. |
| Run `git push --force origin main` | Destructive/Irreversible | Rewrites shared remote history and can lose commits. |
| Run `DELETE FROM sessions WHERE expired = true` | Destructive/Irreversible unless sandboxed and previewed | Removes data; requires target and rollback verification. |
| Run `npm publish` | Destructive/Irreversible | Public package release is externally visible and hard to retract. |
| Deploy production | Destructive/Irreversible or high-impact external Modification | External user-facing side effect; requires target and rollback check. |

## Common Anti-Patterns

| Anti-pattern | Why it fails | Correct approach |
|---|---|---|
| Classifying by verb only | `read`, `write`, `push`, and `install` change tier based on target and flags. | Classify operation plus target plus reversibility. |
| Treating all reads as passive | Sensitive reads can leak credentials, PII, private config, or production topology. | Sensitive targets are Reconnaissance; redact and confirm necessity. |
| Treating install commands as harmless setup | Installs can mutate manifests, lockfiles, dependency trees, scripts, and vulnerability surface. | High-impact Modification; confirm rationale and diff scope. |
| Skipping classification for familiar commands | Familiar commands become dangerous with different flags or targets. | Classify every risky action by exact command and target. |
| Calling force-push a routine Git update | Force can disable remote safety checks and lose commits. | Prefer force-with-lease and verify branch/ref expectations. |
| Proceeding with destructive commands because the user gave broad edit permission | Broad permission does not imply approval for irreversible or public side effects. | Ask or use safer alternatives unless explicitly authorized. |
| Logging sensitive target contents while classifying | The classification step itself can become the leak. | Name the type of sensitive target, not the secret value. |

## Evals

This skill has local eval artifacts in `evals/evals.json` and routing trigger cases in `evals/eval-set.json`. They cover `.env.example` vs `.env`, dependency installs, hard resets, destructive SQL, force push, bulk rename, and negative routing for implementation/governance tasks. Eval state remains unverified until the eval suite is run and results are recorded.

## Verification

- [ ] The exact action and target are named before any Tier 3, high-impact Tier 3, or Tier 4 operation.
- [ ] The tier was assigned from operation plus target, not verb alone.
- [ ] Sensitive reads are classified as Reconnaissance and do not echo protected values.
- [ ] High-impact modifications preview scope where practical.
- [ ] Destructive/Irreversible actions include explicit rationale and approval evidence when policy requires it.
- [ ] A safer reversible alternative was considered before destructive execution.
- [ ] The action still matches the active user request, plan, and target.
- [ ] Neighbor boundaries were respected: enforcement goes to `guardrails`, Git workflow to `version-control`, migration planning to `database-migration`, artifact review to `code-review`, and post-failure investigation to `debugging`.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Designing deterministic blockers, tripwires, approval policy, or protected-path enforcement | `guardrails` | Guardrails enforce; intent-recognition classifies one proposed action. |
| Choosing normal Git branching, merge, tag, or commit strategy | `version-control` | Version-control owns workflow design; this skill owns immediate risk tier. |
| Planning schema/data migrations, rollback, backfill batching, or data safety design | `database-migration` | Migration planning is broader than classifying a specific command. |
| Reviewing a diff for correctness, maintainability, or security bugs | `code-review` | Code-review evaluates artifacts, not the risk tier of the next tool call. |
| Debugging a failed command, deploy, migration, or release | `debugging` | Debugging starts after execution; this skill runs before execution. |
| Designing tool orchestration or sequencing after risk is known | `tool-call-flow` | Tool-call-flow owns execution choreography; this skill owns risk classification. |
| Auditing app vulnerabilities against a security threat catalog | `owasp-security` | Security audit is domain-level; this skill is per-action and tool-runtime focused. |
