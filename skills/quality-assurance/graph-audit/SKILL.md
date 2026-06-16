---
# name: stable kebab-case skill identifier; must match the parent directory.
name: graph-audit
# description: routing contract for when this skill should activate and when it should not.
description: "Use when checking that SKILL.md files and audit-state.json sidecars conform to the live Skill Metadata Protocol schemas, that manifest entries match the joined source model, that relation targets point at real sibling skills, or that Skill Graph routing/audit claims are backed by the current deterministic gates. Covers schema conformance, sidecar consistency, manifest sync, protocol/schema parity, drift baselines, routing-eval honesty, relation metadata and target-existence ownership gaps, application-eval shape, eval-artifact coherence, corpus conformance-ledger signals, inline corpus-count hygiene, Markdown-link integrity, grounding presence, and name-directory parity. Do NOT use for general code review, runtime agent debugging, prose rewriting, body-section refactoring, new-skill scaffolding, or maintaining the health-tooling implementation itself."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this project-grounded skill.
compatibility:
  notes: "Markdown, JSON Schema Draft 2020-12, Node.js"
# allowed-tools: optional runtime hint for tools the skill may use when loaded.
allowed-tools: Read Grep Bash
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:

  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: quality-assurance
  # project: projects this skill is linked to. Array of {handle, role} objects.
  # Non-empty project[] anchors the skill to a project and requires `grounding`.
  # Suggested role values: source-of-truth, consumer, mirror. Replaces original v8 `workspace_tags`.
  project: "[{\"handle\":\"skill-graph\",\"role\":\"source-of-truth\"},{\"handle\":\"skills\",\"role\":\"canonical-skill-library\"}]"
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Auditing Skill Graph skill-library consistency: SKILL.md schema conformance, audit-state.json sidecar consistency, manifest joins and protocol/schema parity, drift baselines, routing-eval honesty, relation metadata and target-existence ownership gaps, application-eval shape, eval-artifact coherence, corpus conformance ledgers, inline corpus-count guards, Markdown-link and runbook-evidenced body-section integrity, project-grounding presence, the Understanding-fields gate, and name-directory parity. Project-targeted to the Skill Graph protocol/tooling repo and its canonical sibling skill library; reads the schemas, protocol docs, audit scripts, manifests, and fixtures those checks depend on. Excludes general code review, runtime agent debugging, prose rewriting, new-skill scaffolding, and changing the health-tooling implementation itself."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: false
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: quality/audit
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["schema conformance","manifest sample","manifest generator","project-targeted grounding","grounding block","broken relation target","relations target","sidecar truth verdict","application eval shape","application eval floor"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["graph-audit"]
  # paths: glob array of code surfaces this skill governs. Supports gitignore-style
  # negation. Each glob should map to ONE canonical skill. Omit if purely conceptual.
  paths: "[\"../skills/skills/**/SKILL.md\",\"../skills/skills/**/audit-state.json\",\"schemas/*.json\",\"skill-metadata-protocol/**\",\"docs/manifest-field-mapping.md\",\"docs/status.generated.md\",\"docs/conformance.generated.md\",\"docs/QUICKSTART-30MIN.md\",\"SKILL_GRAPH.md\",\"scripts/skill-lint.js\",\"scripts/skill-graph-drift.js\",\"scripts/check-audit-manifest.js\",\"scripts/check-application-evals.js\",\"scripts/check-inline-skill-counts.js\",\"scripts/check-markdown-links.js\",\"scripts/check-protocol-consistency.js\",\"scripts/check-schema-constants.js\",\"scripts/generate-manifest.js\",\"scripts/skill-conformance-ledger.js\",\"scripts/skill-graph-routing-eval.js\",\"scripts/skill-audit-preflight.js\",\"examples/skills.manifest.sample.json\",\"examples/evals/*.json\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["audit all skills for schema conformance and broken relation targets","the manifest sample drifted from the generator - find the mismatch","check that every project-targeted skill has a populated grounding block","which skills declare a relations target that doesn't exist in the library?","does this application eval meet the required case shape and floor?","does this sidecar truth verdict still match the current truth-source hashes?"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["diagnose why the @/components import cycle broke the build","my agent is stuck in a loop - what's wrong?","write a reference doc explaining what the lint-checker pipeline does","rewrite this body to sound more natural without changing behavior"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  # grounding: required when `project[]` is non-empty. Declares the truth sources
  # the skill anchors to and the failure modes those sources prevent. Omit when the
  # skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
  grounding: "{\"subject_matter\":\"Skill Metadata Protocol and Skill Graph audit/manifest consistency\",\"grounding_mode\":\"repo_specific\",\"truth_sources\":[\"schemas/SKILL_METADATA_PROTOCOL_schema.json\",\"schemas/skill-audit-state.schema.json\",\"schemas/manifest.schema.json\",\"schemas/application.schema.json\",\"skill-metadata-protocol/SKILL_METADATA_PROTOCOL.md\",\"skill-audit-loop/SKILL_AUDIT_LOOP.md\",\"docs/manifest-field-mapping.md\",\"docs/status.generated.md\",\"docs/conformance.generated.md\",\"SKILL_GRAPH.md\",\"scripts/skill-lint.js\",\"scripts/skill-graph-drift.js\",\"scripts/check-audit-manifest.js\",\"scripts/check-application-evals.js\",\"scripts/check-inline-skill-counts.js\",\"scripts/check-markdown-links.js\",\"scripts/check-protocol-consistency.js\",\"scripts/check-schema-constants.js\",\"scripts/generate-manifest.js\",\"scripts/skill-conformance-ledger.js\",\"scripts/skill-graph-routing-eval.js\",\"scripts/skill-audit-preflight.js\",\"examples/evals/graph-audit.json\"],\"failure_modes\":[\"schema_drift\",\"sidecar_state_drift\",\"manifest_sample_out_of_sync\",\"protocol_schema_projection_drift\",\"truth_verdict_stale_vs_live_drift\",\"routing_eval_claim_without_fresh_manifest\",\"broken_relation_targets\",\"relation_target_existence_unowned\",\"relation_semantics_misclassified\",\"application_eval_shape_drift\",\"eval_artifacts_mismatch\",\"corpus_conformance_regression\",\"inline_corpus_count_drift\",\"markdown_reference_drift\",\"body_structure_claim_without_runbook_evidence\",\"name_directory_mismatch\"],\"evidence_priority\":\"repo_code_first\"}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: "Graph audit has three evidence planes: authored source (SKILL.md plus audit-state.json), compiled projection (manifest samples and exports), and executable or report gates (lint, drift, protocol consistency, schema constants, routing eval, application-eval shape, audit-manifest, conformance ledger, inline-count guard, Markdown links, and preflight). A finding is not closed until the plane that owns it is clean: a lint pass cannot prove drift freshness, and a sample-manifest pass cannot prove the canonical source still projects to that sample."
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: "Make silent Skill Graph metadata failures loud before they degrade routing, export safety, audit status, or relation traversal."
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: "Owns verification of Skill Metadata Protocol conformance and library graph consistency. Does not own rewriting skill prose, designing the health-check implementation, debugging runtime agents, choosing general test strategy, or evolving the schema contract."
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Treat the skill library like a database: SKILL.md files are source rows, audit-state.json files are sidecar state rows, the manifest is a materialized view, relation targets are foreign keys, and the audit commands are integrity checks on different tables."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: "Do not treat `node scripts/skill-lint.js` as the whole audit. It is the structural gate; drift, manifest projection, protocol constants, routing behavior, application-eval shape, audit evidence, conformance ledgers, inline corpus-count guards, Markdown-link resolution, body-structure runbook checks, and readiness each have separate owners. And do not assume the manifest generator validates relation-target existence — it copies relation fields through, so a dangling edge is caught by no deterministic gate today."
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v8
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/quality-assurance/graph-audit/SKILL.md
# relations: typed graph edges to sibling skills.
relations:
  related: ["debugging","schema-evolution","refactor","eval-driven-development","skill-infrastructure","skill-router","testing-strategy"]
  verify_with: ["skill-infrastructure","testing-strategy","skill-router"]
---
# Graph Audit

## Concept of the skill

Graph audit has three evidence planes: authored source (SKILL.md plus audit-state.json), compiled projection (manifest samples and exports), and executable or report gates (lint, drift, protocol consistency, schema constants, routing eval, application-eval shape, audit-manifest, conformance ledger, inline-count guard, Markdown links, and preflight).

## Coverage

- **Schema conformance** — canonical `SKILL.md` metadata validates against `schemas/SKILL_METADATA_PROTOCOL_schema.json`: required v8 identity fields, `subject`/`public` enums, name shape, and name-directory parity.
- **Sidecar consistency** — `audit-state.json` validates against `schemas/skill-audit-state.schema.json`, and audit/eval/provenance fields live in the sidecar instead of being duplicated as hand-authored SKILL.md state.
- **Two-file contract (ADR-0019)** — a skill is `SKILL.md` (the 25 agent-facing frontmatter fields) **plus** its sibling `audit-state.json` (the audit/eval/provenance fields), governed by two distinct schemas. `scripts/check-schema-constants.js` asserts BOTH `required` sets (the 5 core frontmatter fields and the 7 required sidecar fields) and reads `schema_version` + the four verdicts from the sidecar — a field placed in the wrong file is a real finding even when each file independently parses.
- **Manifest sync / joined projection** — `examples/skills.manifest.sample.json` and generated manifests are the joined model of `SKILL.md` + `audit-state.json`, not a stale copy of either file alone (`node scripts/generate-manifest.js --validate-only`).
- **Protocol/schema parity** — field-reference docs, manifest-mapping docs, schema constants, sidecar fields, and sample manifests agree about the live contract (`check-protocol-consistency.js`, `check-schema-constants.js`).
- **Relation integrity** — every target under `relations.*` corresponds to a real sibling skill directory and uses the right predicate semantics (`related`/`broader`/`narrower`/`boundary`/`disjoint_with`/`verify_with`/`depends_on`). **No deterministic gate currently enforces target *existence*.** `scripts/skill-lint.js` deliberately does NOT walk relation targets (that check was removed in the 2026-05-19 lint reduction — it now only emits advisory boundary warnings, checks 5b/5c), and `scripts/generate-manifest.js` copies the `relations` block through unmodified (`generate-manifest.js:360-382`); its `--validate-only` pass validates the compiled manifest against `schemas/manifest.schema.json`, which checks each relation item's *shape*, not whether its target resolves to a real skill. So a dangling edge is surfaced only by the audit pipeline's graded **Relation quality** surface (`lib/audit/skill-audit.js:550`) and the human-facing fix-hint at `lib/audit/skill-audit.js:413` that recognizes a "does not match any known skill" message — both semantic/graded, not a CI gate. **An auditor must therefore resolve relation targets by hand (glob the sibling library) rather than trusting `manifest:validate` to do it.** This live ownership gap also exposes stale docs (see § Known Stale Claims).
- **Suppresses-edge orientation** — `scripts/skill-lint.js` emits advisory warnings (checks 5b/5c) when a `relations.suppresses` reason reads as deference ("use X instead") rather than ownership ("I own this over X"), or when a suppresses edge crosses `subject` shelves (a cross-domain distinction belongs in `anti_examples` + `relations.related`, not an exclusion guard).
- **Drift baselines / truth-source freshness** — each skill's recorded `drift_check.truth_source_hashes` still match the live truth-source files via `scripts/skill-graph-drift.js`; this is the mechanism behind `truth_verdict`. A truth source that changed since `last_verified` without a re-recorded hash is silent staleness, and a live drift result is stronger evidence than a stale sidecar `truth_verdict: PASS`.
- **Routing-eval honesty** — `routing_eval: present` is backed by a current routing-harness run (`scripts/skill-graph-routing-eval.js`) over a manifest generated from current source, with positive examples routing to the skill and anti-examples blocked or explained.
- **Eval-artifact coherence** — `eval_artifacts: present` and graded verdict claims are backed by real gradeable artifacts. `scripts/check-audit-manifest.js` enforces that a graded `comprehension_verdict` (PROVISIONAL/PASS/SHALLOW/REDUNDANT) requires `evals/comprehension.json` on disk, and a high-stakes graded `application_verdict` (APPLICABLE/MIXED/HARMFUL) requires `evals/application.json`.
- **Application-eval shape** — `scripts/check-application-evals.js` validates each `evals/application.json` against `schemas/application.schema.json`: the `mode: "application"` discriminator, the ≥5-case floor, the per-case required-field set, unique ids, and the red-herring recommendation.
- **Understanding-fields gate** — when a skill declares `comprehension_state: present`, it must carry the five flat top-level Understanding fields (`mental_model`, `purpose`, `boundary`, `analogy`, `misconception`); the legacy nested `concept` block is accepted for back-compat only, and the content must contain no out-of-scope repo-specific nouns. This is audit checklist item 8; `scripts/skill-audit-preflight.js` reports whether the fields an op needs (including these) are present before `audit`/`improve`/`evaluate` runs.
- **Corpus-level conformance** — `scripts/skill-conformance-ledger.js` turns the binary lint gate into a per-shelf "X / N clean" number plus an error-type histogram — the incremental signal the all-or-nothing gate cannot give while the corpus is draining through the audit loop.
- **Inline corpus-count hygiene** — corpus counts ("N canonical skills") must be generated in `docs/status.generated.md` + the live `find` command, never hand-stamped into prose; `scripts/check-inline-skill-counts.js` (`npm run counts:check`) fails the build on any inline count.
- **Markdown-link integrity** — `scripts/check-markdown-links.js` catches dangling intra-repo links (paths and anchors) emitted by skill bodies and docs — a broken `[...](path)` is the same silent-failure class as a dangling relation.
- **Grounding & project fit** — every non-empty `project[]` skill has a populated `grounding` declaration with `subject_matter`, `grounding_mode`, `truth_sources`, `failure_modes`, and `evidence_priority`. The schema's `allOf` requires only `grounding` for a project target; `project[]` is an optional belonging-entity affiliation, not a requirement.
- **Name-directory parity** — a skill's `name` field matches the name of its parent directory (required for SKILL.md compatibility).
- **Public/export safety** — project-specific audit skills (this one included) are treated as graph-internal unless the export gate intentionally includes them; check for stale/private/provenance fields before public distribution.

## Philosophy of the skill
Skill graphs fail silently. A broken relation, stale truth-source hash, or drifted enum value does not crash the agent — it changes what the router loads, what the manifest exports, or what the auditor trusts. That kind of failure is worse than a crash because the system still looks healthy. The audit's job is to turn every silent bug into a loud one before the graph accumulates enough drift that agents can no longer trust its edges.

A graph audit is a constellation of single-purpose checkers, not one mega-linter. This is a deliberate design choice: `scripts/skill-lint.js` was reduced (2026-05-19) to enforce only external-mandate, canonical-source constraints — valid YAML, schema validation, identifier shape, non-empty description, name/directory parity, and `subjects[0]`/`subject` agreement (plus advisory boundary-orientation warnings). Everything else — manifest parity, eval coherence, drift, routing — lives in dedicated tools (the drift sentinel, the manifest validator, the routing engine, the audit-manifest checker, the application-eval checker, the conformance ledger). Auditing well means knowing *which checker owns which invariant* and running the right one, not assuming `lint` covers everything. The sharpest example of this trap is relation-target existence: it is owned by *no* deterministic checker today (see Coverage → Relation integrity), so an auditor who assumes a green `lint`/`manifest:validate` proves every edge resolves will ship a dangling edge.

Two integrity surfaces sit side by side. The binary gate (`npm run lint` / `npm run verify`) goes red if *any* skill fails, which is the correct ship-blocker but gives no incremental signal mid-migration. The conformance ledger (`skill-conformance-ledger.js`) is report-only and turns the same per-skill linter into a measurable percentage so progress is visible while the corpus drains. Use the gate to block a release; use the ledger to watch the backlog move.

The audit's reason to exist is upstream-confirmed: the base Agent Skills spec is still intentionally minimal — only `name` and `description` are required, with `license`, `compatibility`, `metadata`, and `allowed-tools` optional, and `metadata` treated as arbitrary additional data that downstream runtimes (e.g. OpenCode) ignore when unknown. No upstream release has absorbed the Skill Metadata Protocol's typed scope, relations, grounding, or eval state, so every invariant this skill audits is a Protocol addition layered on the minimal base — which is exactly why a dedicated audit discipline is needed: the upstream spec will never check these for you.

## Mental Model

Treat the library like a small database system across three evidence planes:

- **Authored source.** `SKILL.md` is the authored capability row (routing contract, scope, relations, grounding, agent-facing guidance); `audit-state.json` is the sidecar state row (owner, freshness, drift hashes, eval state, routing coverage, the four verdicts).
- **Compiled projection.** The manifest is a materialized view: it joins skill source with sidecar state and derives summary facets. The marketplace export is a second projection (the Agent-Skills-compatible shape).
- **Executable / report gates.** Relations are foreign keys plus routing semantics (`related` = adjacency, `boundary` = score-aware exclusion when this skill wins, `depends_on`/`broader` expand loading, `verify_with` = cross-check). The audit commands are integrity checks against those planes — but some questions are intentionally runbook-owned rather than standalone-gate-owned.

Do not close a finding on the wrong plane. A linter pass does not prove truth-source freshness. A sample-manifest routing pass does not prove the canonical source still has the same relations. A sidecar `PASS` verdict does not outweigh a fresh drift command showing changed truth sources.

## Key Files

| File | Line range | Purpose |
|---|---|---|
| `schemas/SKILL_METADATA_PROTOCOL_schema.json` | whole file | Authored metadata schema for every SKILL.md (v8 classification, relations, grounding, project affiliation, Understanding fields) |
| `schemas/skill-audit-state.schema.json` | whole file | Sidecar schema for freshness, drift hashes, eval state, routing coverage, and the four audit verdicts |
| `schemas/manifest.schema.json` | whole file | Compiled-manifest shape and summary rollup — **relation-item shape only, NOT relation-target existence** |
| `schemas/application.schema.json` | whole file | Binding shape for `evals/application.json` (mode discriminator, ≥5-case floor, per-case fields, ids, red-herring) |
| `skill-metadata-protocol/SKILL_METADATA_PROTOCOL.md` | Schema contract + field sections | Source of truth for field semantics and authoring rules (note: § Relations overstates relation-target validation — a stale claim to flag; see § Known Stale Claims) |
| `skill-audit-loop/SKILL_AUDIT_LOOP.md` | Part 2 + Part 3 | Binding audit runbook for per-skill checks that are not fully standalone-gate-owned, including body-section expectations |
| `docs/manifest-field-mapping.md` | whole file | Authored-to-generated projection rules — trace a parity finding back to its projection |
| `SKILL_GRAPH.md` | § Current State | Single source of truth for live corpus facts (schema version, required axes, counts); audits cite it rather than restating numbers |
| `scripts/skill-lint.js` | whole file | Per-skill structural gate — **external-mandate-only** (valid YAML, schema validation, name shape, non-empty description, name/directory parity, `subjects[0]`/`subject` agreement) plus advisory boundary-orientation warnings (5b/5c at `:419`/`:467`). Does NOT check relation-target existence, manifest parity, or eval coherence |
| `lib/audit/skill-audit.js` | `:413` (fix-hint), `:550` (Relation quality) | The graded **Relation quality** surface (`:550`) is the only place a dangling target is surfaced; `:413` supplies the human-facing remediation hint on a "does not match any known skill" message. Neither is a deterministic CI gate |
| `scripts/skill-graph-drift.js` | whole file | Drift sentinel — compares recorded `drift_check.truth_source_hashes` against live truth-source files; feeds `truth_verdict`; can record or stamp drift status |
| `scripts/generate-manifest.js` | `:360-382` (relations copy-through), `:845-857` (validate) | Builds the joined manifest from `SKILL.md` + `audit-state.json`; `--validate-only` is the manifest-parity gate. It copies `relations` through unmodified and validates only manifest *shape* — it does NOT verify relation targets resolve to real skills |
| `scripts/check-protocol-consistency.js` | whole file | Cross-artifact protocol checker; validates that protocol docs/mapping/sample stay consistent with schemas |
| `scripts/check-schema-constants.js` | whole file | Fast guard for hard schema constants across BOTH frontmatter and sidecar schemas (required fields, enums, manifest root version, verdict fields) — the ADR-0019 two-file enforcer |
| `scripts/check-audit-manifest.js` | whole file | Checks that graded verdict claims have the gradeable artifacts they require (comprehension/application evidence-honesty gate) |
| `scripts/check-application-evals.js` | whole file | Structural conformance of every `evals/application.json` against the application schema (floor, fields, ids, red-herring) |
| `scripts/check-markdown-links.js` | whole file | Dangling intra-repo markdown-link/anchor checker for skill bodies and docs |
| `scripts/check-inline-skill-counts.js` | whole file | Guard that prevents volatile corpus counts from being hand-stamped into active prose |
| `scripts/skill-graph-routing-eval.js` | whole file | Routing-coverage check against the retrieval baseline (`evals/retrieval-baseline-*.json`); the honest source for flipping `routing_eval: absent → present`. See also `docs/ROUTING-METRICS.md` |
| `scripts/skill-audit-preflight.js` | whole file | Readiness gate — does a skill carry the version/fields/evals (incl. the five Understanding fields) an op needs before audit/improve/evaluate (exit 0 ready / 2 gaps; `--ensure` scaffolds deterministic gaps) |
| `scripts/skill-conformance-ledger.js` | whole file | Report-only per-shelf "X / N clean" ledger + error-type histogram for tracking corpus health between gate runs |
| `docs/status.generated.md` | whole file | Generated corpus-status source; link to it instead of restating live counts in prose |
| `docs/conformance.generated.md` | whole file | Generated conformance-ledger report; useful for shelf-level cleanup triage |
| `docs/QUICKSTART-30MIN.md` | § "Break the relation" | Current doc surface with a stale relation-lint claim — treat as a concrete audit finding until corrected (see § Known Stale Claims) |
| `examples/skills.manifest.sample.json` | whole file | Generator-produced sample fixture; trustworthy only when fresh against the current canonical source + sidecar state |
| `examples/evals/graph-audit.json` | whole file | Repo-grounded fixture for graph-audit prompts and expected evidence |

## Verification Matrix

`skill-lint.js` is the first smoke test, not the whole audit. A skill that lints clean can still have a dangling relation, a drifted truth source, a stale manifest, or a dishonest verdict — those are caught by the other checkers, and a dangling relation target is caught by NO deterministic checker, so resolve those by hand. Use the smallest command that owns the question.

```bash
# Structural SKILL.md + sidecar checks for one skill
node scripts/skill-lint.js graph-audit --no-color
node scripts/skill-lint.js --path ../skills/skills graph-audit   # explicit root for the sibling library
node scripts/skill-lint.js --include-template                    # also lint the example template

# Truth-source freshness for one skill directory
node scripts/skill-graph-drift.js ../skills/skills/quality-assurance/graph-audit

# Manifest projection and schema validation (NOT relation-target existence)
node scripts/generate-manifest.js --validate-only

# Protocol constants and schema/docs/mapping parity
node scripts/check-schema-constants.js
node scripts/check-protocol-consistency.js

# Routing-eval honesty for this skill against a fresh manifest fixture
node scripts/skill-graph-routing-eval.js --skill graph-audit --manifest examples/skills.manifest.sample.json --confusion-matrix

# Audit/eval evidence consistency + application-eval shape
node scripts/check-audit-manifest.js
node scripts/check-application-evals.js --skill graph-audit --check

# Corpus conformance triage + volatile-count hygiene + Markdown links
node scripts/skill-conformance-ledger.js --json
node scripts/check-inline-skill-counts.js
node scripts/check-markdown-links.js

# Audit-loop readiness before comprehension/application work
node scripts/skill-audit-preflight.js graph-audit --for all
```

Interpretation rules:

- Exit code 0 on `skill-lint.js` means structural checks passed. It does NOT prove drift freshness, manifest sync, routing behavior, or audit-artifact readiness.
- Exit code 1 on `skill-graph-drift.js` means at least one local truth source changed or broke relative to the sidecar hash baseline. Treat this as current truth evidence even if the sidecar still says `truth_verdict: PASS`.
- `generate-manifest.js --validate-only` can fail because of unrelated corpus skills. Separate per-skill graph-audit findings from corpus-wide migration debt — and remember it validates manifest *shape*, never relation-target existence.
- A routing-eval pass is only meaningful when the manifest being tested was generated from the current canonical SKILL.md and current sidecar. A stale sample can hide relation or health-state drift.
- `check-audit-manifest.js` proves graded verdict claims have artifacts. It does not certify usefulness; `application_verdict: APPLICABLE` is the behavior-certification signal.
- `check-application-evals.js --check` proves application-eval JSON is structurally conformant. It does not prove the grader has run or that the application verdict is useful.
- `skill-conformance-ledger.js` is the incremental corpus-drain signal: per-shelf clean-count + error-type histogram help prioritize cleanup; the plain report is not a binary gate unless a threshold flag is used.
- `check-inline-skill-counts.js` proves active docs are not hand-stamping volatile corpus totals — generated status/conformance docs own the live numbers.
- `check-markdown-links.js` proves local Markdown targets and anchors resolve. It does not decide whether a skill's H2/H3 body structure is pedagogically complete; use the audit-loop runbook for that.

Choose the umbrella gate by work mode:

```bash
npm run verify          # full gate — corpus lint + manifest validation + routing eval + export (CONTENT-inclusive)
npm run verify:system   # SYSTEM-only gate — schema constants, protocol, docs, fixtures, marketplace, unit tests
npm run release:check   # the release-critical corpus gates verify:system OMITS (manifest:validate, routing-eval, export, marketplace:verify)
```

`verify:system` green does **not** mean publishable: it deliberately omits the corpus gates, so it can stay green while `manifest:validate` / `routing-eval` are red (e.g. skills missing a required `scope`). Before claiming the library is publishable, run `npm run release:check`.

## Relation Integrity Procedure

Because no deterministic gate owns relation-target existence, audit relations by hand:

1. Read `relations` from the canonical SKILL.md, then compare against the generated manifest entry to catch stale projection.
2. Confirm every relation predicate is semantically correct: `related` is browse/routing adjacency; `boundary` excludes listed skills from co-routing when this skill wins; `verify_with` names cross-check context; `depends_on`/`broader` expand loading; `disjoint_with` is mutual exclusion.
3. Check `relations.suppresses` entries for ownership wording — a good reason says "graph-audit owns metadata-integrity verification over X"; a weak reason says "use X instead."
4. Check target existence against the sibling skill library or generated manifest data yourself. Do NOT claim `skill-lint.js` proves relation targets exist (the live lint only owns relation shape via schema validation plus boundary reason/cross-domain warnings), and do NOT claim `generate-manifest.js --validate-only` proves target existence (it copies relation fields through and schema-validates shape). If no deterministic command owns the target-existence check, report that as a tooling gap rather than claiming a gate already proved it.
5. Run routing eval when anti-examples or boundary behavior are part of the claim.

## Known Stale Claims (current audit findings)

Two repo docs currently assert relation-target validation that the live code does not perform — both are real findings a graph audit should raise (schema/code wins over prose per the Doc Ownership Map precedence):

- `docs/QUICKSTART-30MIN.md` (§ "Break the relation and watch lint catch it") states the lint "walks every relation predicate … and verifies that every named target resolves to a real sibling skill." False against current `scripts/skill-lint.js` (relation-target checking was removed in the 2026-05-19 lint reduction; only advisory boundary checks 5b/5c remain).
- `skill-metadata-protocol/SKILL_METADATA_PROTOCOL.md` § Relations states "the manifest compiler refuses to emit a relation to a skill that does not exist" and to "rely on `npm run manifest:validate` for the relation-integrity guarantee." False against current `scripts/generate-manifest.js`, which copies `relations` through unmodified (`:360-382`) and validates only manifest *shape* (`:845-857`).

Record both as documentation drift until a deterministic relation-target checker is added or the docs are corrected. The general lesson generalizes: a sidecar `truth_verdict: PASS` recorded on an earlier date is an audit *record*, not live truth — re-run `skill-graph-drift.js` and trust the live result when they disagree.

## Evals

This skill has a local comprehension artifact at `evals/comprehension.json` and a Skill Graph fixture at [`examples/evals/graph-audit.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/graph-audit.json). The local artifact exercises the portable concept (sidecar ownership, drift versus lint, manifest joins); the Skill Graph fixture keeps repo-grounded prompts tied to current protocol files, sidecar state, manifest joins, routing examples, relation metadata, and gradeable-artifact evidence.

No `evals/application.json` exists yet. The sidecar's `eval_artifacts: present` (ADR-0019 places `eval_artifacts` in `audit-state.json`, not frontmatter) is disk-truth meaning *an* eval file exists on disk — here the comprehension artifact — NOT a claim that an application eval exists; both `comprehension_verdict` and `application_verdict` stay honestly `UNVERIFIED`. The moment a graded `application_verdict` is claimed, `check-audit-manifest.js` will require an `evals/application.json` on disk — so do not stamp a graded application verdict without authoring (and running) that artifact in the same change. Before claiming comprehension/application readiness, run preflight: comprehension readiness requires the sidecar state plus the five flat Understanding fields and a sufficiently sized comprehension eval; application readiness requires a gradeable application artifact that passes the application-eval shape gate.

## Verification Checklist

- [ ] `SKILL.md` passes schema validation and name-directory parity.
- [ ] `audit-state.json` validates and owns audit/eval/provenance state rather than duplicating those fields in SKILL.md.
- [ ] Generated manifest entries match the joined `SKILL.md` + `audit-state.json` source model (`generate-manifest.js --validate-only`).
- [ ] Protocol docs, field mappings, schemas, and schema constants agree (`check-protocol-consistency.js`, `check-schema-constants.js`).
- [ ] Drift command agrees with the truth-source hashes recorded in the sidecar, or the sidecar is updated by the audit loop (`skill-graph-drift.js`).
- [ ] Relation predicates use the correct semantics, and relation targets have been checked by hand against real sibling skills (no deterministic gate; the graded Relation-quality surface + manual glob are the only coverage — do not overstate lint/generator ownership).
- [ ] Routing eval uses a fresh manifest and proves both positive examples and anti-example boundaries (`skill-graph-routing-eval.js`).
- [ ] Graded comprehension/application verdicts have matching gradeable artifacts and receipts (`check-audit-manifest.js`).
- [ ] `evals/application.json` meets the schema floor (`check-application-evals.js`) when application readiness is claimed.
- [ ] Every skill with `comprehension_state: present` carries the five flat Understanding fields with no out-of-scope repo-specific nouns.
- [ ] non-empty `project[]` skills have a complete `grounding` declaration (and project affiliation where the protocol requires one).
- [ ] No dangling intra-repo Markdown links or anchors (`check-markdown-links.js`); body H2/H3 structure findings are tied to the audit-loop runbook, not overstated as schema failures.
- [ ] No corpus count is hand-stamped into prose (`check-inline-skill-counts.js`); `skill-conformance-ledger.js` consulted when the question is corpus-wide cleanup priority.
- [ ] `docs/QUICKSTART-30MIN.md` and `SKILL_METADATA_PROTOCOL.md` § Relations do not continue to claim lint/manifest walks all relation targets — or that stale claim is recorded as doc drift.
- [ ] Public/export fixtures do not leak project-internal or private data and do not expose repo-specific skills unintentionally.
- [ ] Every skill's `name` field matches its parent directory name (SKILL.md compatibility).

## Verification

After applying this skill, verify:

- [ ] The task matches the declared scope, coverage, or positive examples.
- [ ] The response follows this skill's workflow or checks instead of generic advice.
- [ ] The exclusions in `## Do NOT Use When` do not point to a better skill.

## Do NOT Use When
| Use instead | When |
|---|---|
| `writing-humanizer` | The task is making skill prose read more naturally, not auditing metadata or graph integrity |
| `refactor` | The task is restructuring skill body sections while keeping the audit contract stable |
| `debugging` | The task is chasing a runtime failure in an agent or application, not validating graph metadata |
| `skill-infrastructure` | The task is designing, implementing, or maintaining the health-check tooling itself |
| `skill-router` | The task is diagnosing why the router does or doesn't activate a skill on a query — a routing-mechanism question, not a metadata-consistency one |
| `schema-evolution` | The task is changing the schema contract (bumping `schema_version`, migrating fields) rather than checking conformance against the current one |
| `testing-strategy` | The task is choosing which tests to write for new code, rather than running or interpreting Skill Graph audit gates |
