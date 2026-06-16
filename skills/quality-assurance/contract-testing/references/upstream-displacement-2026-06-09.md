# Upstream Displacement Check: Contract Testing

Date: 2026-06-09

## Verdict

No displacement found. Current primary sources still support the skill's core teaching: contract testing verifies consumer/provider compatibility by combining executable contracts with provider verification results and, when available, broker-backed deploy gates.

## Sources Checked

- Martin Fowler, "Consumer-Driven Contracts": still frames the pattern as consumers defining the provider obligations they depend on and providers validating those expectations.
- Pact provider verification docs: still describe the consumer generating a pact, publishing it to a broker, and the provider replaying it against the local provider while stubbing downstream dependencies.
- Pact Broker docs: still position the broker as the place to share contracts, verification results, and can-deploy decisions across consumer and provider versions.
- Pact `can-i-deploy` docs: still show deploy gating as a compatibility query with success and failure exit codes.
- Spring Cloud Contract reference docs: still provide contract DSL, provider verification, stub runner, WireMock, and JVM workflow guidance.
- Specmatic contract testing docs: still describe API specifications as executable contract tests and smart mocks for consumers, with schema and generative testing support.
- OpenAI Agents SDK update, OpenCode changelog, and Anthropic Claude release notes: current agent/runtime releases improve orchestration, coding, and skill mechanics, but do not replace interface-level contract testing.

## Skill Impact

- Keep the skill's core distinction between contract testing, schema validation, integration testing, and end-to-end testing.
- Keep Pact, Spring Cloud Contract, and Specmatic as representative tools, but describe Specmatic as API-spec-driven contract testing instead of only bi-directional contract testing.
- Emphasize that consumer-side mocks without provider replay and published verification results are incomplete evidence.
