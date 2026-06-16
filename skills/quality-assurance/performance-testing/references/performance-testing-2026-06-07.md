# Performance Testing Source Review

Last reviewed: 2026-06-07

## Primary sources checked

- Grafana k6 docs: https://grafana.com/docs/k6/latest/
- Grafana k6 thresholds: https://grafana.com/docs/k6/latest/using-k6/thresholds/
- Grafana k6 automated performance testing: https://grafana.com/docs/k6/latest/testing-guides/automated-performance-testing/
- Apache JMeter user manual: https://jmeter.apache.org/usermanual/
- Locust documentation: https://docs.locust.io/
- Gatling documentation: https://docs.gatling.io/
- Gil Tene, How NOT to Measure Latency: https://www.infoq.com/presentations/latency-pitfalls/

## Current synthesis

- k6 current docs still support thresholds as pass/fail criteria and scenarios/load shapes as the mechanism for planned load.
- k6 automated performance testing guidance distinguishes smoke, average/load, stress, spike, and soak automation patterns.
- JMeter, Locust, and Gatling remain active canonical references for mature cross-protocol, Python-scriptable, and high-throughput load-test ecosystems respectively.
- Gil Tene's coordinated-omission warning remains important for honest percentile latency reporting.
- The skill should avoid claiming that average latency is an acceptable SLO gate; percentile/distribution thresholds and error-rate/resource signals are required.

## Content decisions

- Add the missing v8 `scope` because the skill failed lint/preflight without it.
- Keep the six load shapes and SLO-driven test framing.
- Add coordinated omission to the description, grounding, comprehension evals, and application evals.
- Replace stale/nonexistent routing owners such as `observability` and `chaos-engineering` with active or generic boundaries.
- Treat external truth as `EXTERNAL_UNHASHED`; the local source review is hashable, but official docs remain external.

## Skill Graph lens findings

- Performance-testing is best routed with explicit `performance test`, `load test`, `SLO`, `p95/p99`, or load-shape language.
- Same-subject red herrings for `performance-engineering`, `performance-budgets`, `testing-strategy`, and `mutation-testing` are important because these prompts often share words like performance, threshold, and test quality.
- The status command still reports `conceptScope repo_specific_or_unknown` for a portable quality-assurance skill with v8 `scope`.
