---
# name: stable skill identifier. Match the skill directory name or the final namespace segment.
# Lowercase letters/numbers with hyphen, slash, or colon separators.
name: ci-cd-pipelines
# description: routing-facing summary of what the skill covers and when it activates.
# Include concrete triggers and an explicit negative boundary; keep routing semantics out of prose-only ambiguity.
description: "Designing continuous integration and continuous delivery pipelines that turn every commit into a verified, releasable artifact and move it safely toward production. Covers the CI/CD distinction (integration vs delivery vs deployment), the pipeline as a staged graph of fast-to-slow gates, trunk-based integration and short-lived branches, build-once/promote-the-same-artifact discipline, hermetic and reproducible builds, dependency and layer caching for fast feedback, the test pyramid mapped onto pipeline stages, required status checks and branch protection, quality and security gates (lint, type-check, SAST, dependency/SCA scanning, license checks) as blocking vs advisory, artifact and container registries with immutable versioning and provenance, environment promotion (build → test → stage → prod), deployment strategies the pipeline triggers (blue-green, canary, rolling, feature-flag-gated), pipeline secrets and least-privilege CI credentials (OIDC over long-lived tokens), DORA delivery metrics (deployment frequency, lead time, change-failure rate, MTTR), flaky-test quarantine, pipeline observability, and rollback/auto-revert on failed gates. Stack-agnostic across GitHub Actions, GitLab CI, Jenkins, CircleCI, and equivalents."
# license: SPDX license identifier (e.g., MIT, Apache-2.0).
license: MIT
# compatibility: runtime compatibility object. Prefer structured fields
# (`runtimes`, `node`) over free-text `notes`.
compatibility:
  notes: "CI/CD platform-agnostic. The pipeline-as-staged-gates model, build-once/promote discipline, gate design, and DORA metrics apply to GitHub Actions, GitLab CI, Jenkins, CircleCI, Buildkite, Argo, and equivalents; specific YAML/DSL syntax is illustrative — substitute your platform's runner, cache, and artifact primitives."
allowed-tools: Read Grep

# === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
# subject: primary browse shelf — what the skill teaches. One of twelve closed values:
# backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
# quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
subject: software-engineering-method
# public: publishability/private-data gate. Boolean.
# true = publishable/shareable; false = private and excluded from public export.
# Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
public: true
# scope: free-text PRD-style statement of what the skill teaches and what it excludes.
# (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
scope: "Designing and operating continuous integration and continuous delivery pipelines — the automated path from commit to releasable, deployed artifact. Teaches: the CI vs CD vs continuous-deployment distinction; the pipeline as a directed graph of stages ordered fast-feedback-first; trunk-based development and short-lived branches feeding frequent integration; build-once then promote the identical artifact across environments (never rebuild per environment); hermetic, reproducible, cacheable builds; mapping the test pyramid onto pipeline stages (unit → integration → contract → e2e) with parallelization and fail-fast; required status checks, branch protection, and merge queues as the gate that protects trunk; classifying gates as blocking (correctness, security ship-blockers) vs advisory (style, coverage trend); security and supply-chain gates in-pipeline (SAST, dependency/SCA scanning, secret scanning, license policy, artifact signing/provenance); artifact and container registries with immutable, content-addressed versioning; environment promotion and approval gates; the deployment strategies a pipeline triggers (blue-green, canary, rolling, feature-flag dark launch) and automated rollback; CI credentials via short-lived OIDC tokens and least-privilege rather than long-lived secrets; flaky-test detection and quarantine; pipeline observability and the DORA four key metrics as the delivery-health scoreboard. Portable across CI platforms. Excludes the deployment-strategy mechanics themselves in depth (which traffic-shift math a canary uses), runtime infrastructure provisioning and IaC, application performance engineering, the in-application secret-handling lifecycle beyond CI credentials (secrets-management), the dependency-auditing discipline as a standalone practice (supply-chain-security), and the version-control branching model as a topic of its own (version-control)."
# taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
# lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
# `subject` is sufficient.
taxonomy_domain: engineering/delivery

# grounding: required when `project[]` is non-empty. Declares the truth sources
# the skill anchors to and the failure modes those sources prevent. Omit when the
# skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
grounding:
  subject_matter: "Design and operation of CI/CD pipelines: staged build/test/gate/promote/deploy automation from commit to production"
  grounding_mode: universal
  truth_sources:
    - path: "https://martinfowler.com/articles/continuousIntegration.html"
      note: "Fowler's canonical definition of Continuous Integration — frequent integration to mainline, self-testing builds, fixing broken builds immediately; grounds the trunk-based / fast-feedback core."
    - path: "https://martinfowler.com/bliki/ContinuousDelivery.html"
      note: "Fowler on Continuous Delivery — software always in a releasable state, the deployment pipeline, build-once/promote; grounds the CI vs CD distinction and the pipeline-as-stages model."
    - path: "https://www.oreilly.com/library/view/continuous-delivery/9780321670250/"
      note: "Humble & Farley, Continuous Delivery — the deployment pipeline pattern, build binaries once and promote, environment promotion, and configuration management as the practitioner reference."
    - path: "https://dora.dev/guides/dora-metrics-four-keys/"
      note: "Google DORA — the four key delivery metrics (deployment frequency, lead time for changes, change-failure rate, failed-deployment recovery time) that score pipeline/delivery health."
    - path: "https://docs.github.com/en/actions"
      note: "GitHub Actions documentation — concrete runner, workflow, job/step, cache, artifact, environment, and required-status-check primitives one CI platform exposes (illustrative of the stack-agnostic concepts)."
    - path: "https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect"
      note: "GitHub OIDC for CI — grounds short-lived, least-privilege CI credentials via OIDC token exchange instead of long-lived cloud secrets stored in the pipeline."
    - path: "https://12factor.net/build-release-run"
      note: "Twelve-Factor build/release/run — strict separation of build, release (build + config), and run stages; grounds the immutable-release and config-injection promotion model."
    - path: "https://slsa.dev/spec/v1.0/levels"
      note: "SLSA supply-chain levels — grounds build provenance, artifact signing, and tamper-evident pipeline requirements referenced in the security-gate section."
  failure_modes:
    - "Rebuilding the artifact separately in each environment so staging and prod run different binaries"
    - "A green pipeline that proves nothing because gates are advisory or tests are flaky-and-ignored"
    - "Long-lived cloud admin credentials pasted into CI secrets instead of short-lived OIDC tokens"
  evidence_priority: general_knowledge_first

# stability: lifecycle marker. One of:
# experimental (active development) / stable (production-ready) /
# frozen (no further changes expected) / deprecated.
# When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
stability: experimental

# keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
# Keep terms a user would actually type when starting a task in this skill's domain.
keywords:
  - ci/cd pipeline
  - continuous integration
  - continuous delivery
  - github actions
  - build test deploy
  - deployment pipeline
  - required status checks
  - dora metrics
  - artifact promotion
  - pipeline gates

# examples: 2-5 realistic user prompts the skill SHOULD activate for.
# Written in the user's voice. Improves retrieval recall beyond keywords alone.
examples:
  - "Set up a GitHub Actions pipeline that builds, tests, and deploys on every push to main"
  - "Our CI is slow and flaky — how do I structure stages so feedback comes fast and trunk stays green?"
  - "Add a security and dependency-scanning gate that blocks merge on critical findings"
  - "Promote the same build artifact from staging to production instead of rebuilding"
  - "What gates should be blocking vs advisory in our deploy pipeline?"

# anti_examples: near-miss prompts that should route ELSEWHERE.
# Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
anti_examples:
  - "Write the unit tests themselves for this module"
  - "Pick a trunk-based vs git-flow branching model for the team"
  - "Rotate the production database password and store it in the vault"
  - "Design the canary traffic-shifting math for the rollout"

# === Understanding fields (when comprehension_state: present) ===
# mental_model: the primitives of the concept and how they relate. One paragraph.
mental_model: "A CI/CD pipeline is a directed graph of automated stages that transforms a commit into a verified, promotable release. Each stage is a gate that the change must pass; gates are ordered cheapest-and-fastest first so failures surface in seconds, not minutes. Integration (CI) proves the merged code builds and passes tests on every commit to a shared mainline; delivery (CD) keeps a build-once artifact always releasable and promotes that identical artifact through environments; deployment is the act the pipeline triggers to put a release into production. The artifact is immutable and content-addressed: it is built once, scanned and tested once, and the same bytes flow build → test → stage → prod with only configuration injected at each step."
# purpose: the problem this concept solves and why the field exists. One paragraph.
purpose: "Manual, ad-hoc integration and release is the dominant source of slow, risky software delivery: long-lived branches that diverge and merge-conflict, 'works on my machine' builds, environment-specific binaries, and release nights. A pipeline exists to make integration continuous and release boring — every commit is automatically built, verified by a fast-to-slow gate sequence, and turned into a known-good artifact that can be promoted on demand. It converts release from a manual, error-prone event into a repeatable, observable, reversible process, and it makes delivery health measurable (DORA) so teams can improve throughput without sacrificing stability."
# concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
# the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
concept_boundary: "CI/CD pipelines own the AUTOMATION GRAPH from commit to deployable release: stage ordering, gate selection, artifact build-once/promote, and the trigger of a deploy. They do NOT own the branching model itself (that is a version-control concern the pipeline merely consumes), the in-application secret lifecycle of rotation/vaulting (the pipeline only needs short-lived credentials to run), the dependency-auditing discipline as a standalone practice (the pipeline invokes it as one gate), or the deployment-strategy mechanics of how traffic actually shifts during a canary (the pipeline triggers the strategy but the traffic math is its own concern). The distinguishing mechanism: a pipeline is the orchestration of WHEN gates run and WHAT artifact moves, not the implementation of any single gate."
# analogy: one-sentence metaphor preserving the core mechanism.
analogy: "An assembly line with quality stations: the same chassis moves down the line, each station inspects or adds to it and can halt the whole line on a defect, and nothing reaches shipping that skipped a station — you build the unit once and it travels, you never re-manufacture it at the loading dock."
# misconception: the wrong mental model people bring; corrected explicitly.
misconception: "That 'green pipeline' means 'safe to ship.' A pipeline is only as trustworthy as its gates: if the blocking gates are weak, the tests are flaky and retried until green, or staging runs a different rebuilt artifact than production, a green checkmark certifies almost nothing. Green means 'the gates we defined passed' — the engineering is in defining gates that actually catch the failures that matter and in promoting the exact artifact that was verified."

# relations: typed graph edges to sibling skills. Current fields:
# related (adjacency for browse / co-routing expansion) /
# suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
#             as "I own this exclusively over X", not "use X instead") /
# boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
# verify_with (cross-check; co-loaded as one-hop expansion) /
# depends_on (composition; transitive — A→B→C loads all three) /
# broader / narrower (SKOS-style generalization) /
# disjoint_with (mutual exclusion for incompatible ownership).
relations:
  related: ["version-control", "test-driven-development", "testing-strategy", "merge-queue", "canonical-repo-structure"]
  suppresses: []
  verify_with: ["owasp-security", "test-driven-development"]
  depends_on: ["version-control"]
---

# CI/CD Pipelines

## Concept of the skill

A CI/CD pipeline is the automated path a change travels from commit to released artifact. It is modeled as a **directed graph of stages**, each stage a **gate** the change must pass, ordered so the cheapest and fastest gates run first and the most expensive last. The pipeline's job is to make integration *continuous* (every commit proves it merges and passes tests against a shared mainline) and release *boring* (a single build-once artifact is always in a releasable state and can be promoted through environments on demand).

Three terms are routinely conflated and must stay distinct:

- **Continuous Integration (CI):** every commit to a shared mainline is automatically built and verified by a self-testing build. The point is to catch integration failures within minutes of the commit that caused them.
- **Continuous Delivery (CD):** the codebase is *always* in a deployable state; a verified artifact is produced and can be released to production at the push of a button (a human approval may gate the final step).
- **Continuous Deployment:** the same as continuous delivery, but the final release step is automatic too — every change that passes all gates goes to production with no human gate.

## Coverage

This skill covers the design and operation of the pipeline itself:

- The CI / CD / continuous-deployment distinction and when each is the right target.
- The pipeline as a fast-to-slow staged graph; parallelization and fail-fast.
- Trunk-based development and short-lived branches as the integration model the pipeline assumes.
- **Build once, promote the same artifact** — build, scan, and test the artifact a single time, then move the *identical bytes* through environments, injecting only configuration. Never rebuild per environment.
- Hermetic, reproducible, cacheable builds and dependency/layer caching for fast feedback.
- The test pyramid mapped onto stages: unit → integration → contract → end-to-end.
- Required status checks, branch protection, and merge queues as the gate protecting trunk.
- Classifying gates **blocking** (correctness, security ship-blockers) vs **advisory** (style, coverage trend).
- In-pipeline security & supply-chain gates: SAST, dependency/SCA scanning, secret scanning, license policy, artifact signing and provenance.
- Artifact and container registries with immutable, content-addressed versioning.
- Environment promotion (build → test → stage → prod) and approval gates.
- Deployment strategies the pipeline triggers (blue-green, canary, rolling, feature-flag dark launch) and automated rollback on failed gates.
- CI credentials via short-lived OIDC tokens and least privilege.
- Flaky-test detection and quarantine; pipeline observability.
- The DORA four key metrics as the delivery-health scoreboard.

## Philosophy of the skill

**Fast feedback is the whole point.** A pipeline that takes 40 minutes to tell you a one-line lint error broke the build has failed at its core job. Order stages so a broken build fails in seconds: lint and type-check before unit tests, unit tests before integration, integration before end-to-end. Parallelize independent stages. Cache aggressively but hermetically.

**The artifact is sacred and built once.** The single most common pipeline anti-pattern is rebuilding the application separately for each environment, so the binary that passed staging is *not* the binary that runs in production. Build the artifact once, give it an immutable content-addressed version, verify it once, and promote those exact bytes. Configuration — not code — is what differs between environments.

**Green must mean something.** A pipeline's trustworthiness equals the strength of its blocking gates. If the gates are advisory, the tests are flaky and retried until green, or the promoted artifact differs from the verified one, the green checkmark is theater.

## The pipeline as a staged graph

A typical pipeline, ordered fast-to-slow:

1. **Trigger** — a push/PR to a protected branch (or a merge-queue entry).
2. **Build** — compile/bundle once, produce the immutable artifact, cache dependencies.
3. **Static gates (fast)** — lint, format, type-check, secret scan. Seconds. Blocking on correctness-affecting ones.
4. **Unit tests** — fast, parallelized, hermetic.
5. **Integration & contract tests** — slower; spin up real-ish dependencies or verify contracts.
6. **Security & supply-chain gates** — SAST, dependency/SCA scan, license policy, sign the artifact, record provenance.
7. **Publish artifact** — push the signed, versioned artifact to the registry.
8. **End-to-end tests** — against a deployed staging environment.
9. **Promote / deploy** — promote the same artifact to stage, then (with the chosen deployment strategy and any approval gate) to prod.
10. **Verify & rollback** — post-deploy health/smoke checks; auto-revert on failure.

Stages 3–6 should fail fast: the first blocking failure stops the pipeline and reports precisely.

## Trunk-based integration

CI assumes frequent integration to a shared mainline. Long-lived feature branches defeat it — they diverge, and the "integration" happens in a painful merge weeks later, exactly what CI exists to prevent. Favor short-lived branches (hours to a couple of days) that merge to trunk behind required checks, or commit to trunk directly behind feature flags. The pipeline's required status checks are what make this safe: trunk only accepts a change that built and passed its gates.

## Build once, promote the same artifact

```
build ──► artifact@sha256:abc...  (immutable, signed)
            │
            ├─► deploy to staging   (config: staging)
            └─► deploy to prod      (config: prod)   ← SAME bytes
```

Promotion moves the *identical* artifact and injects environment configuration at release time (the Twelve-Factor build/release/run separation). If you find yourself running `build` again before the prod deploy, the pipeline is broken: you are shipping an unverified binary.

## Gates: blocking vs advisory

Every gate is one of two kinds, and miscategorizing them is a common failure:

- **Blocking** — a failure must stop the merge/deploy. Compilation, type errors, failing tests, critical SAST/dependency findings, secret leaks, license-policy violations.
- **Advisory** — informative, must not block. Coverage-trend deltas, style nits that auto-fix, performance-budget warnings under threshold, non-critical lint.

A pipeline where everything is advisory protects nothing; a pipeline where everything is blocking (including flaky e2e and noisy linters) trains the team to bypass it. Choose deliberately and write the policy down.

## Security and supply-chain gates

The pipeline is the natural place to enforce security continuously: static analysis (SAST), dependency/SCA scanning for known-vulnerable packages, secret scanning to catch committed credentials, license policy, and artifact signing + provenance (SLSA) so a deployed artifact is tamper-evident. Treat critical findings as blocking and lower-severity ones as advisory with a tracked budget. (The deep *practice* of dependency auditing is its own skill; here it is one gate among several.)

## CI credentials: short-lived over long-lived

Do not store long-lived cloud admin keys in CI secrets — they are a high-value, broadly-scoped, hard-to-rotate target. Prefer **OIDC token exchange**: the CI provider mints a short-lived, narrowly-scoped token the cloud trusts for that specific workflow run. Least privilege per job; no standing credentials. (The broader secret lifecycle — rotation, vaulting, app-runtime injection — is the `secrets-management` skill's domain.)

## Flaky tests

A flaky test (passes/fails nondeterministically) is corrosive: it trains the team to hit "re-run" until green, which destroys the meaning of the gate. Detect flakes (track per-test pass/fail history), **quarantine** them out of the blocking set immediately, and fix or delete them on a deadline. Retrying a flaky test until it passes is not a fix — it is laundering an unverified result into a green checkmark.

## DORA: the delivery-health scoreboard

Measure the pipeline's outcome, not its internals, with the four DORA metrics:

- **Deployment frequency** — how often you ship to prod.
- **Lead time for changes** — commit → running in prod.
- **Change-failure rate** — % of deploys causing a degradation needing remediation.
- **Failed-deployment recovery time** (MTTR) — how fast you recover.

The first two measure throughput; the last two measure stability. A healthy pipeline improves throughput *without* worsening stability. If "ship faster" is raising change-failure rate, the gates are too weak.

## Deployment strategies the pipeline triggers

The pipeline does not just merge — it triggers a deploy using a strategy that bounds blast radius: **blue-green** (stand up the new version alongside the old, switch traffic, keep old for instant rollback), **canary** (route a small % of traffic to the new version, watch metrics, ramp or abort), **rolling** (replace instances incrementally), and **feature-flag dark launch** (deploy dark, enable via flag). The pipeline's responsibility is to *trigger* the strategy and to *auto-rollback* on a failed post-deploy health gate; the traffic-shifting mechanics of each strategy are a separate concern.

## Verification

A pipeline design is sound when you can answer yes to:

- Does a broken build fail in seconds, not after the whole suite? (fast feedback)
- Is the artifact built exactly once and the same bytes promoted to prod? (build-once)
- Are the blocking gates a deliberate, written set that actually catches shipping failures — and are advisory gates non-blocking?
- Do required status checks / branch protection prevent an unverified change from reaching trunk?
- Are CI credentials short-lived and least-privilege (OIDC), not long-lived secrets?
- Are flaky tests quarantined rather than retried-until-green?
- Can you roll back a bad deploy automatically and quickly, and do you measure change-failure rate and MTTR?

If any answer is no, name the gap before calling the pipeline production-ready.

## Do NOT Use When

- The task is **writing the tests themselves** — that is `test-driven-development` / `testing-strategy`. This skill places existing tests into stages; it does not author them.
- The task is **choosing or operating the branching model** (trunk-based vs git-flow, PR conventions) — that is `version-control`. The pipeline consumes the model; it does not define it.
- The task is the **in-application secret lifecycle** (rotation, vaulting, runtime injection) — that is `secrets-management`. CI credentials are only the slice this skill touches.
- The task is the **dependency-auditing discipline as a standalone practice** — that is `supply-chain-security`. Here it is one gate.
- The task is **runtime infrastructure provisioning / IaC** or the **traffic-shifting math of a specific deployment strategy** — out of scope.

## References

- Fowler — Continuous Integration: https://martinfowler.com/articles/continuousIntegration.html
- Fowler — Continuous Delivery: https://martinfowler.com/bliki/ContinuousDelivery.html
- Humble & Farley — Continuous Delivery: https://www.oreilly.com/library/view/continuous-delivery/9780321670250/
- Google DORA — Four Key Metrics: https://dora.dev/guides/dora-metrics-four-keys/
- GitHub Actions docs: https://docs.github.com/en/actions
- GitHub OIDC for CI: https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect
- Twelve-Factor — Build, release, run: https://12factor.net/build-release-run
- SLSA supply-chain levels: https://slsa.dev/spec/v1.0/levels
