---
name: performance-testing
description: "Use when measuring a system's non-functional properties — latency, throughput, error rate, resource utilization — by running it under controlled load and verifying against explicit SLO thresholds. Covers the five primitives (load profile, workload, latency metric, throughput metric, SLO target), the load-shape taxonomy (smoke, load, stress, spike, soak, breakpoint), the latency-percentile vocabulary (p50, p95, p99, p99.9) and why average latency misleads, the tool ecosystem (k6, JMeter, Locust, Gatling, Vegeta), and the offline-vs-observability distinction. Do NOT use for the optimization activity itself (use `performance-engineering`), declaring the threshold contract (use `performance-budgets`), runtime measurement of deployed systems (use `observability` or `error-tracking`), microbenchmarks of single functions (language benchmark tools), chaos engineering (use `chaos-engineering`), or test-suite quality measurement (use `mutation-testing`)."
license: MIT
allowed-tools: Read Grep
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"


  # === v8 Classification (subject + deployment_target; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: quality-assurance
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: quality/testing
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-16"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-16\"}"

  # === Evaluation Status: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: planned
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  eval_state: unverified
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  routing_eval: absent
  # comprehension_state: marker that this skill has populated v6+ Understanding fields
  # (mental_model, purpose, boundary, analogy, misconception). Value: `present` or absent.
  comprehension_state: present
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"performance testing\",\"load testing\",\"stress testing\",\"soak testing\",\"spike testing\",\"breakpoint test\",\"k6\",\"JMeter\",\"Locust\",\"Gatling\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"what should our load test do\",\"p95 vs average latency\",\"k6 vs JMeter vs Locust\",\"is the system fast enough\",\"stress test or load test\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"design a load test for an API endpoint that verifies the p95 SLO at expected production traffic\",\"decide between load, stress, and soak tests for a new service before launch\",\"diagnose a soak test failure that only appears after 4 hours — likely a leak\",\"explain why average latency is the wrong metric for user experience\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"measure production traffic latency in real time (use observability)\",\"benchmark a single function in isolation (use language benchmark tools)\",\"inject failures into a production system (use chaos-engineering)\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"testing-strategy\",\"integration-test-design\",\"e2e-test-design\",\"performance-engineering\",\"performance-budgets\"],\"boundary\":[{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy owns the strategic question of what to test; this skill owns one tactical technique (controlled-load measurement of non-functional properties) within that strategy.\"},{\"skill\":\"integration-test-design\",\"reason\":\"integration-test-design owns tests of correctness across internal seams; this skill owns tests of non-functional properties (latency, throughput) under controlled load. Both can use the same environment; they answer different questions.\"},{\"skill\":\"e2e-test-design\",\"reason\":\"e2e-test-design owns user-journey correctness tests; this skill owns load-driven measurement of those same journeys. A 'performance e2e test' is the composition of both disciplines.\"},{\"skill\":\"performance-engineering\",\"reason\":\"performance-engineering owns the activity of profiling and optimizing a specific slow path once it has been identified; this skill owns the discipline of exercising the system under controlled load to discover and quantify performance behavior. Performance-engineering acts on bottlenecks; performance-testing produces the measurements that locate them and verifies the optimizations afterward.\"},{\"skill\":\"performance-budgets\",\"reason\":\"performance-budgets owns the declaration of the threshold-and-consequence contract (metric, threshold, percentile, consequence) as a quality property; this skill owns the test mechanism that exercises the system under load and verifies whether the declared budgets hold. The two compose: budgets declare what 'fast enough' means; performance tests verify the system meets the declaration. Without a budget, a performance test produces measurements without a verdict; without performance tests, a budget is an aspirational threshold without empirical evidence.\"}],\"verify_with\":[\"testing-strategy\",\"integration-test-design\",\"performance-budgets\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Performance testing is the discipline of measuring a system's *non-functional properties* — latency, throughput, error rate, resource utilization, saturation — by running the system under *controlled load* and observing the resulting metrics. Where functional tests answer "does the system produce the right output?", performance tests answer "does the system produce the right output *quickly enough* and at *sufficient scale*, while staying within resource budgets and error tolerances?" The unit of judgment is whether measured metrics meet defined acceptance thresholds — typically *Service-Level Objectives* (SLOs) expressed as *percentiles* (e.g., "p95 latency below 200ms at 1,000 RPS sustained for 30 minutes").

    *Five primitives*: load profile (shape of traffic over time), workload (operation mix — 70% reads, 25% writes, 5% complex queries), latency metric (typically p50/p95/p99/p99.9), throughput metric (RPS, transactions/sec), SLO target. *Six load shapes*: smoke (small load, short duration — every PR), load (expected production × margin, sustained — every merge), stress (beyond expected capacity — verifies graceful failure mode), spike (sudden large increase — verifies elasticity and autoscaling), soak (sustained moderate load for hours — verifies no leaks or degradation), breakpoint (gradually increasing to failure — quantifies capacity ceiling). *Latency percentiles* are the honest vocabulary — p50 is the typical request; p95 is what 1 in 20 users feels; p99 is what 1 in 100 users feels; p99.9 is what 1 in 1000 feels; the mean is easily skewed and should not be an acceptance criterion. *Tool landscape*: k6 (Grafana, modern JS — recommended default for new projects), JMeter (mature, UI-driven, enterprise), Locust (Python, distributed), Gatling (Scala, high throughput), Vegeta (Go, CLI), Wrk/Wrk2 (microbenchmark). *Environment fidelity* is the load-bearing precondition — a test in a non-production-like environment measures that environment, not the system.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces "is it fast enough?" answered by intuition or user complaints with empirical answers measured against an explicit SLO. Solves the problem that performance is *multi-dimensional* — latency distribution, throughput ceiling, error rate under load, resource utilization, saturation point are each separate properties; each requires its own measurement; each can be acceptable while others fail. Reducing performance to a single number (especially average latency) is the most common discipline failure. Sub-purpose: verify that declared performance budgets (per `performance-budgets`) hold under realistic load — without performance tests, a budget is an aspirational threshold without empirical evidence; without budgets, a performance test produces measurements without a verdict. A complete pre-launch performance test suite runs all six load shapes because each verifies a different property; an ongoing suite typically runs smoke on every PR, load on every merge, with stress/spike/soak/breakpoint on cadence.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from performance-engineering, which owns the activity of *profiling and optimizing* a specific slow path once it has been identified — this skill owns the discipline of *exercising the system under controlled load* to discover and quantify performance behavior; the two compose (this skill produces measurements that locate bottlenecks and verifies optimizations afterward). Distinct from performance-budgets, which owns the *declaration* of the threshold-and-consequence contract (metric, threshold, percentile, consequence) as a quality property — this skill owns the *test mechanism* that exercises the system under load and verifies the budgets hold. Distinct from observability, which owns *real-time runtime measurement* of the deployed system — this skill is *offline controlled measurement*; the two compose (one for pre-deploy verification, the other for production runtime validation). Distinct from chaos-engineering (fault injection in deployed systems), microbenchmarks (single-function isolation via language benchmark tools), testing-strategy (level/scope), integration-test-design and e2e-test-design (correctness across seams or user journeys — this skill exercises those same paths under load), and mutation-testing (test-suite quality measurement).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Performance testing is to a software system what a load-bearing inspection is to a bridge — you do not certify a bridge by walking across it (functional test) and concluding it works; you drive trucks of known weight across at increasing volumes, with strain gauges on every beam, and verify the deflection stays within spec under expected traffic, that the failure mode is graceful when overloaded (cracks before collapse), that nothing creeps over a long soak. A bridge whose 'average' load it can carry is 50 tonnes but whose p99 stressor reveals harmonic resonance at 80 tonnes is the bridge that fails on a windy day."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that *average latency* is a meaningful performance metric. It is not. A system whose mean is 50ms and p99 is 5 seconds has a user-experience problem the mean hides — 1 in 100 users sees a 5-second response time. Acceptance criteria should always be *percentiles* (or distributions); averages are easily skewed by outliers in both directions. Adjacent misconceptions: that performance tests in a stripped/non-production environment are meaningful (they are not — the test produces a measurement of *that environment*, not the system; production hardware, network, data volumes, dependency versions, and configuration are the load-bearing investment); that one-time pre-launch testing is enough (it is not — regressions accumulate; the ongoing value is continuous testing in CI); that load tests alone characterize the system (they do not — a complete pre-launch suite runs all six shapes, because each verifies a different property: load verifies SLO at design load, stress verifies graceful failure, spike verifies elasticity, soak verifies no leaks or memory growth, breakpoint quantifies the capacity ceiling); that performance testing replaces observability (it does not — performance testing is offline controlled measurement; observability is online real-traffic measurement; the two compose); that *coordinated omission* in the load tool doesn't matter (it does — Tene's canonical talk shows naive percentile reporting silently drops slow responses; honest tools account for it); and that a performance test without an SLO is a verification (it is not — without an SLO it is a measurement without a verdict; the SLO is what makes the test a verification rather than an information report).
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"Performance testing is the discipline of measuring a system's non-functional properties — latency, throughput, resource utilization, error rate under load — by running the system under controlled load conditions and observing the resulting metrics. Where functional tests answer 'does the system produce the right output?', performance tests answer 'does the system produce the right output *quickly enough* and at *sufficient scale*, while staying within resource budgets and error tolerances?'. The unit of judgment is whether the measured metrics meet defined acceptance thresholds (typically Service-Level Objectives expressed as percentiles, e.g., 'p95 latency below 200ms at 1,000 requests per second sustained for 30 minutes'). Performance testing is *controlled* and *offline*; observability is its production-runtime counterpart that measures the live system without imposed load.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/performance-testing/SKILL.md
  skill_graph_export_description: shortened for Agent Skills 1024-character description limit; canonical source keeps the full routing contract
  skill_graph_canonical_description_length: "1133"
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: PASS
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: PASS
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
  last_audited: 2026-05-28
  lint_verdict: PASS
---

# Performance Testing

## Coverage

The discipline of measuring non-functional system properties — latency, throughput, error rate, resource utilization, saturation — by running the system under controlled load and verifying against explicit SLO thresholds. Covers the five primitives (load profile, workload, latency metric, throughput metric, SLO target), the six load-shape types (smoke, load, stress, spike, soak, breakpoint) that each test a different property, the latency-percentile discipline (p50/p95/p99/p99.9) that replaces the misleading average, the environment-fidelity requirement that makes results meaningful, the modern tool landscape (k6, JMeter, Locust, Gatling, Vegeta, Wrk), and the distinction from observability (offline controlled vs online real-traffic) and benchmarking (system vs single-function).

## Philosophy

Performance testing is the discipline of adding the *time and scale* dimensions to verification. Functional tests verify "the system produces the right output"; performance tests verify "the system produces the right output quickly enough and at sufficient scale, within resource budgets and error tolerances." Without performance testing, "is it fast enough" is answered by intuition or by users complaining; with performance testing, it is answered by measurement against an explicit SLO.

The central insight is that performance is multi-dimensional. Latency distribution, throughput ceiling, error rate under load, resource utilization, saturation point — each is a separate property; each requires its own measurement; each can be acceptable while others fail. Reducing performance to a single number (especially average latency) is the most common discipline failure.

The complementary insight is environment fidelity. A performance test in a non-production-like environment produces a measurement of that environment, not the system. Production hardware, network, data volumes, dependency versions, and configuration are the load-bearing investment for performance testing; the load tool itself is increasingly cheap.

## The Six Load Shapes

| Shape | Profile | Verifies | When to run |
|---|---|---|---|
| Smoke | Small load, short duration | Test harness works, system functions under any load | Every PR (fast) |
| Load | Expected production load × margin, sustained | System meets SLO at design load | Every merge / nightly |
| Stress | Load beyond expected capacity | Failure mode is graceful | Pre-launch / quarterly |
| Spike | Sudden large increase | Elasticity, autoscaling, recovery | Pre-launch / before known traffic events |
| Soak | Sustained moderate load for hours | No leaks, no degradation | Pre-launch / monthly |
| Breakpoint | Gradually increasing load to failure | Quantitative capacity ceiling | Pre-launch / before capacity planning |

A complete pre-launch performance test suite runs all six. An ongoing test suite usually runs smoke on every PR and load on every merge, with stress / spike / soak / breakpoint on cadence.

## Latency Percentiles — The Honest Vocabulary

| Metric | What it tells you | Use for |
|---|---|---|
| Mean (average) | Arithmetic average — easily skewed by outliers | Almost nothing; avoid as acceptance criterion |
| p50 (median) | The typical request | Sanity check; basic system health |
| p95 | The slow 5% — what 1 in 20 users feels | Common SLO target |
| p99 | The slow 1% — what 1 in 100 users feels | Common SLO target for user-facing systems |
| p99.9 | The very slow 0.1% — rare but real | SLO target for high-stakes systems |
| Max | The single worst request | Diagnosis; avoid as SLO (one bad data point dominates) |

Acceptance criteria should always be percentiles (or distributions), never averages. A system whose mean is 50ms and p99 is 5 seconds has a user-experience problem the mean hides.

## SLO-Driven Performance Tests

A performance test without an SLO is "we measured X" without a verdict. An SLO-driven performance test is:

```
SLO statement:
  - p95 latency < 200ms
  - p99 latency < 500ms
  - error rate < 0.1%
  - sustained throughput >= 1000 RPS

Test design:
  - Load shape: constant 1000 RPS for 30 minutes
  - Workload: 70% reads, 25% writes, 5% complex queries
  - Environment: production-equivalent staging
  - Pass: all four SLO conditions met for full test duration
  - Fail: any SLO condition violated for > 60 seconds cumulative
```

The SLO is what makes the test a verification rather than a measurement.

## Tool Selection

| Tool | Strengths | Best for |
|---|---|---|
| k6 (Grafana Labs) | Modern JS scripting; cloud-and-local; HTTP/gRPC/WebSocket | New projects; production default |
| Apache JMeter | Broad protocol support; UI-driven; very mature | Enterprise / complex protocol mix |
| Locust | Python scripting; distributed; behavioral modeling | Python ecosystem teams |
| Gatling | Scala / Java; high throughput per generator | High-load single-generator scenarios |
| Vegeta | Go; simple HTTP; CLI-driven | Simple HTTP load with CI integration |
| Wrk / Wrk2 | C; very fast; minimal | Microbenchmarks and pure HTTP |

## Verification

After applying this skill, verify:
- [ ] Performance tests have explicit SLOs as acceptance criteria. "We measured X" without a target is not a verification.
- [ ] Acceptance criteria are stated as percentiles (p50/p95/p99/p99.9), never as averages. Tests that report only averages are misleading.
- [ ] The test environment is production-equivalent in hardware, network, data volumes, dependency versions, and configuration. Stripped environments produce informational results, not verifications.
- [ ] A range of load shapes is tested: smoke (PR-level), load (merge-level), stress / spike / soak / breakpoint (pre-launch and on cadence).
- [ ] Workload composition is derived from production traffic patterns where possible. Synthetic load with the right RPS but wrong operation mix tests the wrong code paths.
- [ ] The load tool is not the bottleneck. Distributed load generation is used where single-generator capacity might be exceeded.
- [ ] Performance tests run continuously (not just pre-launch). Regression detection is the on-going value; one-time tests are point-in-time signals only.
- [ ] Soak tests run for hours and exercise the leak and degradation failure modes that shorter tests miss.
- [ ] Performance testing is paired with observability for production validation. The two compose; neither replaces the other.
- [ ] Stress and breakpoint tests are run to characterize failure mode and capacity ceiling. A system whose failure mode is unknown cannot be operated.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Profiling and optimizing a specific slow path once located | `performance-engineering` | performance-engineering is the optimization activity itself; this skill is the load-driven measurement that locates and quantifies what to optimize |
| Declaring the threshold-and-consequence contract (metric, threshold, percentile, consequence) | `performance-budgets` | performance-budgets owns the contract; this skill verifies the contract holds under load |
| Measuring real production traffic in real time | `observability` or `error-tracking` | observability owns runtime measurement; this skill owns offline controlled measurement |
| Benchmarking a single function or implementation | language-level benchmark tools | benchmarks isolate; this skill measures the assembled system |
| Injecting failures into a running system | `chaos-engineering` (when it exists) | chaos is fault injection; this skill is load measurement |
| Testing the test suite's quality | `mutation-testing` | mutation measures test-suite effectiveness; this skill measures system performance |
| Choosing the test-level ratio | `testing-strategy` | strategy owns ratios; this skill is one technique within them |
| Testing internal seams between modules | `integration-test-design` | integration owns correctness across seams; this skill owns load behavior |
| Testing user journeys end-to-end | `e2e-test-design` | e2e owns user-perceived behavior; "performance e2e" composes both |

## Key Sources

- Grafana Labs / k6 Team. ["k6 Documentation"](https://k6.io/docs/). Canonical reference for the modern JavaScript-scriptable load testing tool; covers the six load shapes and the SLO-as-test-target discipline.
- Apache Software Foundation. ["Apache JMeter — User Manual"](https://jmeter.apache.org/usermanual/). Canonical reference for the most-established cross-protocol performance testing tool.
- Locust Team. ["Locust Documentation"](https://docs.locust.io/). Reference for the Python-scriptable distributed load testing tool.
- Gatling Team. ["Gatling Documentation"](https://gatling.io/docs/). Reference for the high-performance Scala-based load testing tool.
- Dean, J., & Norvig, P. ["Latency Numbers Every Programmer Should Know"](https://gist.github.com/jboner/2841832). Industry-canonical reference table for the latency scales that performance testing measures against.
- Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (2016). *Site Reliability Engineering*. O'Reilly. Google SRE book; chapter on SLOs as the contract performance tests verify against.
- Brendan Gregg. ["The USE Method: A method for analyzing system performance"](https://www.brendangregg.com/usemethod.html). The Utilization-Saturation-Errors framework that underlies systematic performance analysis.
- Tene, G. ["How NOT to Measure Latency"](https://www.youtube.com/watch?v=lJ8ydIuPFeU). The canonical talk on percentile latency, coordinated omission, and the misleading nature of average-latency reporting.
- Smith, C. U., & Williams, L. G. (2002). *Performance Solutions: A Practical Guide to Creating Responsive, Scalable Software*. Addison-Wesley. Foundational reference on performance engineering methodology.
- Kounev, S., Lange, K.-D., & von Kistowski, J. (2020). *Systems Benchmarking: For Scientists and Engineers*. Springer. Modern reference on performance testing methodology and benchmark design.
