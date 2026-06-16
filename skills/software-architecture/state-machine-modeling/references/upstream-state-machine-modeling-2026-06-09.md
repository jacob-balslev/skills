# Upstream Displacement Check - State Machine Modeling

Date: 2026-06-09

## Question

Has a recent first-party, platform, or widely adopted open-source release displaced the need for the `state-machine-modeling` skill?

## Result

No displacement found. Current official sources provide stronger runtime options for statecharts, durable workflows, and agent loops, but they still require authors to design the lifecycle semantics: states, legal transitions, guards, side effects, idempotency, cancellation, compensation, and versioning. The skill remains useful as the modeling layer before choosing an implementation tier.

## Sources Reviewed

- Stately and XState docs: https://stately.ai/docs
  - Reviewed for current XState v5 state-machine, statechart, and actor support.
- Temporal docs: https://docs.temporal.io/
  - Reviewed for durable execution and crash-recovery positioning.
- LangGraph durable execution docs: https://docs.langchain.com/oss/python/langgraph/durable-execution
  - Reviewed for checkpointing, deterministic replay, durability modes, and resumable workflows.
- OpenAI Agents SDK running-agents docs: https://openai.github.io/openai-agents-python/running_agents/
  - Reviewed for `max_turns`, run state, and durable integrations with Dapr, Temporal, Restate, and DBOS.
- Anthropic Building Effective Agents: https://www.anthropic.com/engineering/building-effective-agents
  - Reviewed for the workflow vs agent distinction and the use of predefined code paths.

## Audit Note

These sources support the skill's current framing: workflow engines and agent runtimes may execute or persist a modeled workflow, but they do not decide the domain's legal lifecycle model. No deprecate, fold, or reframe-to-delta recommendation is warranted in this pass.
