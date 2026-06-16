---
name: contract-testing
# description: routing-facing summary of when this skill activates and what it covers.
description: "Contract testing: interface verification between consumers and providers via shared contract artifacts and independent two-phase verification."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # subject: primary browse shelf.
  subject: quality-assurance
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # scope: free-text statement of what the skill teaches and excludes.
  scope: "Teaching contract testing as a portable interface-verification technique for consumer-driven contracts, provider replay, broker-backed deploy gates, API-spec-driven contract checks, and schema-versus-behavior boundaries."
  # taxonomy_domain: optional hierarchical sub-path within `subject`.
  taxonomy_domain: quality/testing
  # stability: lifecycle marker.
  stability: stable
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  keywords:
    - contract testing
    - consumer-driven contracts
    - Pact
    - Spring Cloud Contract
    - Specmatic
    - contract broker
    - provider verification
    - consumer test
    - CDC
    - OpenAPI conformance
  # triggers: explicit-match activation phrases.
  triggers:
    - should this be a contract test or an integration test
    - Pact vs OpenAPI
    - how do we decouple deploys between services
    - the consumer broke when the provider changed
    - should we e2e test across services
  # examples: realistic user prompts.
  examples:
    - "Design a consumer-driven contract test between a frontend and a backend service."
    - "Decide whether to use Pact or schema-only validation for a new API."
    - "Diagnose a contract test that passes consumer-side but fails provider-side — implementation drift."
    - "Explain how the contract broker decouples deploy schedules between consumer and provider teams."
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  anti_examples:
    - "Test internal seams of a system (use integration-test-design)."
    - "Validate an HTTP response against an OpenAPI schema (use API-spec tooling)."
    - "Test a complete user journey through the UI (use e2e-test-design)."
  # relations: typed graph edges to sibling skills.
  relations:
    related:
      - event-contract-design
      - system-interface-contracts
      - testing-strategy
      - integration-test-design
      - e2e-test-design
      - api-design
    suppresses:
      - skill: integration-test-design
        reason: "contract-testing owns interface verification; integration-test-design owns internal behavior testing"
      - skill: e2e-test-design
        reason: "contract-testing replaces cross-service e2e tests for boundary verification"
    verify_with:
      - api-design
      - integration-test-design
      - testing-strategy
  # grounding: required truth sources and failure modes.
  grounding:
    subject_matter: "Consumer-driven and API-spec-driven contract testing for service, API, and message compatibility."
    grounding_mode: universal
    truth_sources:
      - https://martinfowler.com/articles/consumerDrivenContracts.html
      - https://docs.pact.io/implementation_guides/javascript/docs/provider
      - https://docs.pact.io/pact_broker
      - https://docs.pact.io/pact_broker/can_i_deploy
      - https://docs.spring.io/spring-cloud-contract/docs/current/reference/html/index.html
      - https://docs.specmatic.io/contract_driven_development/contract_testing
      - skills/quality-assurance/contract-testing/references/upstream-displacement-2026-06-09.md
    failure_modes:
      - pact_used_as_mock_library_only
      - schema_validation_treated_as_behavior_contract
      - broker_or_verification_results_omitted
      - provider_replay_not_run_against_real_provider
      - contract_tests_replacing_in_service_integration_tests
      - cross_service_e2e_kept_as_primary_boundary_check
    evidence_priority: equal

  # mental_model: primitives and relationships in one paragraph.
  mental_model: |
    Contract testing is interface verification between a consumer and a provider via a shared contract artifact, with two-phase independent verification. The contract is *consumer-driven*: it captures the specific interactions the consumer actually performs (this HTTP request → this response shape and content, three endpoints out of fifty, twelve fields out of a hundred), not the provider's full API surface. Phase 1: the consumer's CI runs consumer tests against a generated mock provider derived from the contract — if pass, the contract is correct; publish it to the broker. Phase 2: the provider's CI fetches contracts from the broker and replays each one against the real provider — if pass, the provider satisfies the contract; the broker records the version as verified. When both phases pass independently, the two sides are known compatible *without ever running them together*.

    The broker (Pact Broker, PactFlow) is where the strategic value lives: versioned contract storage, compatibility tracking across consumer/provider versions, and `can-i-deploy` deploy gating that blocks a deploy if the current version isn't verified against the production counterpart. The contract-test ecosystem (Pact, Spring Cloud Contract, Specmatic, API-spec-driven patterns) plus the broker is what makes deploy independence real.
  # purpose: problem this concept solves.
  purpose: |
    Replaces cross-service end-to-end tests and coordinated deploy schedules with focused interface verification and deploy-time gating. Solves three problems: (1) brittle e2e tests across services that require both running and produce flaky signal in a shared staging environment; (2) coordinated deploys that serialize team velocity because the consumer and provider must change together; (3) schema-only validation (OpenAPI captures the surface shape — endpoints, types — but doesn't know which specific fields and values *this* consumer actually relies on, so it can't catch the breaking change that affects that consumer). Decouples deploy schedules between consumer and provider teams; the broker's compatibility matrix becomes the deploy gate, automated end-to-end.
  # concept_boundary: what this concept is NOT.
  concept_boundary: |
    Distinct from integration-test-design, which owns tests that exercise the real implementation through an interface — contract tests verify the interface, integration tests verify behavior *through* the interface; the two compose, contract testing does not replace integration testing for in-service behavior. Distinct from e2e-test-design, which owns user-journey tests across the whole stack including UI — cross-service e2e is usually the wrong tool (slow, verifies too much); contract testing replaces most of it. Distinct from api-design, which owns the design of the request/response surface itself — api-design *produces* the contract; this skill *verifies* it. Distinct from system-interface-contracts, which owns the design and documentation of contracts as a design discipline — this skill owns the verification technique. Distinct from event-contract-design (which designs asynchronous event contracts; Pact's message-contract support applies this skill to those). Distinct from OpenAPI/JSON-Schema validation, which captures surface shape — the two coexist and complement each other; schema describes surface, contract verifies behavior; neither replaces the other.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A contract test is to a service interface what a lease is to a tenancy — the consumer writes down the specific obligations they depend on (utilities included, quiet hours, this exact rent), the landlord (provider) verifies independently that they can honor those obligations, and the lease in the broker's filing cabinet lets either party prove compatibility without re-negotiating from scratch each time one of them moves."
  # misconception: common wrong mental model and correction.
  misconception: |
    The wrong mental model is that contract testing is "schema validation with extra steps" or that Pact is a mocking library. It is neither. Schema validation captures the surface — endpoints, types, shapes — and is *necessary but not sufficient*: the schema doesn't know which specific fields and values *this* consumer actually depends on, so it cannot catch the breaking change that affects only that consumer. Contract testing captures behavior at the consumer-specific level — three endpoints out of fifty, twelve fields out of a hundred — exactly what each consumer relies on. Pact is not a mock library: the consumer-side mock is a side effect of the consumer's test driving the contract artifact; the strategic value is the *provider-side replay against the real implementation*, plus the broker's compatibility matrix that decouples deploys. A contract-test setup without a broker is contracts-as-committed-fixtures — much of the maintenance cost, little of the deploy-independence benefit, the strategic value lost.
---
## Concept of the skill

**What it is:** Contract testing verifies that consumers and providers remain compatible by turning interface expectations into executable contracts that providers replay and publish as verification results.

**Mental model:** A consumer records the smallest meaningful promise it relies on, the provider proves that promise still holds, and a broker or CI gate answers whether the relevant versions can deploy together.

**Why it exists:** It protects service boundaries without relying on slow, brittle cross-service end-to-end suites or treating a schema as proof that real consumer behavior is safe.

**What it is NOT:** It is not a replacement for provider integration tests, user-journey end-to-end tests, property-based testing, or API design governance.

**Adjacent concepts:** API design, system interface contracts, event contract design, integration test design, test doubles, deploy gates.

**One-line analogy:** Contract testing is a lease agreement for an interface: each side can change internally, but shared obligations must still be honored.

**Common misconception:** Pact-style tests are not valuable because they mock providers; the provider replay and published verification result are the part that turns mocks into deploy confidence.

# Contract Testing

## Coverage

The technique of verifying interfaces between consumer and provider components by capturing the consumer's expectations as a contract artifact and running that contract against both sides independently. Covers the consumer-driven contracts pattern (Fowler 2006; Pact ecosystem), the two-phase verification (consumer-side mock generation; provider-side replay), the broker as the integration point that enables deploy independence and compatibility tracking, the contrast with schema-only validation (OpenAPI captures surface; contracts capture behavior), the contrast with integration and e2e testing (contracts verify the interface; integration and e2e verify implementation and journeys), and the tool ecosystem (Pact, Spring Cloud Contract, Specmatic, API-spec-driven patterns).

## Philosophy of the skill

Contract testing decouples deploy schedules between services. Before contract testing, two services that depended on each other had to be tested together — usually with brittle cross-service e2e tests in a shared staging environment, which serialized deploys and produced flaky signal. With contract testing, each side is verified independently against a shared contract; deploys can happen on independent schedules as long as the contract is satisfied.

The contract is *consumer-driven*: it captures what the consumer actually does, not what the provider offers. This narrowing — three endpoints out of fifty, twelve fields out of a hundred — is what makes contract testing focused and what distinguishes it from full schema validation. The provider can change anything the consumers don't rely on; the provider cannot break anything any consumer's contract requires.

The discipline is in the broker. A contract-test setup without a broker is "contracts as committed fixtures" — much of the maintenance cost, little of the deploy-independence benefit. A contract-test setup with a broker (Pact Broker, PactFlow) provides versioned contract storage, compatibility tracking, and deploy-gating; the strategic value of the technique is realized at this layer.

## The Two-Phase Verification

```
┌─────────────────────────┐         ┌─────────────────────────┐
│   Consumer's CI         │         │   Provider's CI         │
│                         │         │                         │
│ 1. Run consumer tests   │         │ 4. Fetch contracts      │
│    against generated    │         │    from broker          │
│    mock provider        │         │                         │
│                         │         │ 5. Replay each contract │
│ 2. If pass: contract    │         │    against real         │
│    is correct           │         │    provider             │
│                         │         │                         │
│ 3. Publish contract     │         │ 6. If pass: provider    │
│    to broker            │ ──────▶ │    satisfies contract   │
│                         │         │                         │
│                         │ ◀────── │ 7. Mark contract version│
│                         │  broker │    as verified          │
└─────────────────────────┘         └─────────────────────────┘
```

When both sides have passed independently, the broker records the compatibility. Deploy gating uses this record: don't deploy the provider unless its current version is marked compatible with the production consumer's contract.

## Schema vs Contract — A Practical Comparison

| Property | OpenAPI / JSON Schema | Consumer-driven contract |
|---|---|---|
| Captures | Surface (endpoints, types, shapes) | Behavior (specific interactions the consumer performs) |
| Driven by | Provider | Consumer |
| Coverage | Everything the provider offers | Only what consumers use |
| Catches breaking field value change | If schema constrains values; usually not | Yes — the contract has specific values |
| Catches semantic / error-shape change | No | Yes if consumer relies on the error |
| Verifies through real implementation | No (validates response against schema only) | Yes (provider runs the contract against itself) |
| Used for | API description, code generation, validation | Test gate between consumer and provider |
| Should you have both? | Yes | Yes |

## When Contract Testing Replaces What

| Pre-contract-testing approach | Contract-testing replacement | When replacement is right |
|---|---|---|
| Cross-service e2e test for service boundary | Contract test | Almost always — cheaper, more reliable, doesn't require both services running |
| Schema validation alone | Contract test + schema | Always — schema is necessary but not sufficient |
| Coordinated deploy schedules | Independent deploys + broker gating | Almost always — the deploy-independence is the strategic value |
| Manual API change reviews | Contract verification on provider CI | Always — the verification is automated |
| "We'll catch it in staging" | Contract test on PR | Always — catching at PR time is much cheaper |

## Broker-Enabled Deploy Gating

| State | Can deploy? |
|---|---|
| Provider version has been verified against current production consumer contract | Yes |
| Provider version has not yet been verified against current production consumer contract | No — run verification first |
| Provider version fails verification against production consumer contract | No — fix or coordinate with consumer |
| Consumer version's contract has not been verified against current production provider | No — run provider verification |

The broker's compatibility matrix is the deploy gate. Modern setups (PactFlow, Pact Broker `can-i-deploy` API) automate this; the deploy pipeline calls the broker and gets a yes/no answer.

## Verification

After applying this skill, verify:
- [ ] Contracts are *consumer-driven* — written from consumer-side tests against real consumer code, not generated from provider specs.
- [ ] Contracts and OpenAPI/JSON-Schema coexist; the schema describes surface, the contract verifies behavior. Neither replaces the other.
- [ ] Both phases of verification run automatically: consumer-side on every consumer PR, provider-side on every provider PR (plus scheduled cron for drift detection).
- [ ] A broker is in use for any setup with more than 1-2 consumers per provider. The broker provides compatibility tracking and deploy gating.
- [ ] Deploy gating is wired: provider deploys are blocked if the version isn't verified against the production consumer's contract.
- [ ] Contract testing is *complementing* integration testing, not replacing it. The team still has integration tests for in-service behavior.
- [ ] Cross-service e2e tests have been reduced to the most-critical journeys; most cross-service e2e has migrated to contract tests.
- [ ] Message-bus and event-driven boundaries use contract testing where the consumer-provider pattern applies (Pact supports async message contracts).
- [ ] Contract evolution is handled: deprecating a field requires checking that no consumer's contract requires it; introducing a new field doesn't break existing contracts.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Testing the implementation behind a service interface | `integration-test-design` | integration tests verify in-service behavior; contracts verify the interface |
| Testing a user journey across the whole stack including UI | `e2e-test-design` | e2e tests verify the user experience; contracts verify the service boundary |
| Validating responses against an OpenAPI schema | OpenAPI/JSON-Schema validation tooling | schema validation captures surface; this skill captures behavior |
| Testing a single unit in isolation | `testing-strategy` + `test-doubles-design` | unit scope is below this skill's level |
| Designing the API surface itself | `api-design` | api-design owns the contract design; this skill owns the verification |
| Designing the event surface | `event-contract-design` | event-contract-design owns the asynchronous contract design; this skill verifies it |
| Choosing the test-level ratio | `testing-strategy` | strategy owns ratios; this skill owns the contract-testing technique |

## Key Sources

- Fowler, M. (2006). ["Consumer-Driven Contracts: A Service Evolution Pattern"](https://martinfowler.com/articles/consumerDrivenContracts.html). The foundational essay defining consumer-driven contracts as a pattern for service evolution.
- Pact Foundation. ["Pact — Documentation"](https://docs.pact.io). The canonical reference for the most-adopted consumer-driven contract testing tool; multi-language clients; broker ecosystem.
- Pact Foundation. ["The Pact Broker"](https://docs.pact.io/pact_broker). Reference for the contract broker pattern, compatibility tracking, and deploy gating.
- Robinson, I. (2006). ["Consumer-Driven Contracts: Three Levels of Confidence"](https://www.ianrobinson.net/). Practitioner essay on the levels of compatibility consumer-driven contracts provide.
- Specmatic. ["Specmatic — Contract Testing"](https://docs.specmatic.io/contract_driven_development/contract_testing). Reference for API-spec-driven contract testing and smart mocks from API specifications.
- Spring Cloud. ["Spring Cloud Contract — Reference Documentation"](https://docs.spring.io/spring-cloud-contract/docs/current/reference/html/index.html). The JVM-ecosystem contract testing tool; works with REST and messaging.
- Newman, S. (2015, 2nd ed. 2021). *Building Microservices*. O'Reilly. Chapter on testing strategies for microservices, with contract testing as the recommended cross-service approach.
- Richardson, C. (2018). *Microservices Patterns*. Manning. Pattern chapters covering contract testing as part of microservices integration patterns.
- Cervera, A., et al. (2015). ["Consumer-driven Contracts for Microservices: A Survey"](https://www.researchgate.net/publication/277024057). Academic survey of CDC patterns and tool support.
