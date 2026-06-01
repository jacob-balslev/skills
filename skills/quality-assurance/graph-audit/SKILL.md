---
# name: stable kebab-case skill identifier; must match the parent directory.
name: graph-audit
# description: routing contract for when this skill should activate and when it should not.
description: "Use when checking that SKILL.md files and audit-state.json sidecars conform to the live Skill Metadata Protocol schemas, that manifest entries match the joined source model, or that relation targets point at real sibling skills. Covers schema conformance, sidecar consistency, manifest sync, relation integrity, eval-artifact coherence, grounding presence, and name-directory parity. Do NOT use for general code review, runtime agent debugging, or auditing non-skill files."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: portable-runtime notes for how this skill should be used outside the source repo.
compatibility:
  notes: "Markdown, JSON Schema, Node.js"
# allowed-tools: optional runtime hint for tools the skill may use when loaded.
allowed-tools: Read Grep Bash
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


  # === v8 Classification (subject + deployment_target; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: quality-assurance
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: project
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Auditing Skill Graph skill-library consistency: SKILL.md schema conformance, audit-state.json sidecar consistency, manifest joins, relation-target integrity, eval-artifact coherence, project-grounding presence, and name-directory parity. Project-targeted to the Skill Graph protocol/tooling surface and its canonical sibling skill library. Excludes general code review, runtime agent debugging, prose rewriting, new-skill scaffolding, and maintaining the health-tooling implementation itself."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: quality/audit
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  # freshness: ISO date the skill body was last reviewed or updated.
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.

  # === Evaluation Status: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"skill audit\",\"manifest audit\",\"schema validation\",\"skill consistency\",\"graph audit\",\"metadata check\",\"broken relation\",\"sidecar audit\",\"library-wide audit\",\"skill metadata audit\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"graph-audit\"]"
  # paths: glob array of code surfaces this skill governs. Supports gitignore-style
  # negation. Each glob should map to ONE canonical skill. Omit if purely conceptual.
  paths: "[\"../skills/skills/**/SKILL.md\",\"../skills/skills/**/audit-state.json\",\"schemas/*.json\",\"examples/skills.manifest.sample.json\",\"examples/evals/*.json\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"audit all skills for schema conformance and broken relation targets\",\"the manifest sample drifted from the generator — find the mismatch\",\"check that every project-targeted skill has a populated grounding block\",\"which skills declare a relations target that doesn't exist in the library?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"diagnose why the @/components import cycle broke the build\",\"my agent is stuck in a loop — what's wrong?\",\"write a reference doc explaining what the lint-checker pipeline does\"]"
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           see ADR-0018 for rename rationale) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"skill-infrastructure\",\"skill-router\",\"schema-evolution\",\"testing-strategy\"],\"boundary\":[{\"skill\":\"refactor\",\"reason\":\"graph-audit owns checking skill metadata, sidecars, manifests, and relation targets; refactor owns changing skill body structure.\"},{\"skill\":\"debugging\",\"reason\":\"graph-audit owns static consistency checks across skill-library artifacts; debugging owns root-cause analysis of a specific runtime failure.\"},{\"skill\":\"skill-infrastructure\",\"reason\":\"graph-audit owns applying existing health checks to skill artifacts; skill-infrastructure owns designing or maintaining the health-tooling implementation.\"},{\"skill\":\"skill-router\",\"reason\":\"graph-audit owns verifying one skill's metadata and graph edges; skill-router owns choosing between skills at request time.\"},{\"skill\":\"eval-driven-development\",\"reason\":\"graph-audit owns static skill-library consistency; eval-driven-development owns iterative LLM-system change gating with eval suites.\"}],\"verify_with\":[\"skill-infrastructure\",\"testing-strategy\"]}"
  # grounding: required when `deployment_target: project`. Declares the truth sources
  # the skill anchors to and the failure modes those sources prevent. Omit when the
  # skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
  grounding: "{\"subject_matter\":\"Skill Metadata Protocol and Skill Graph manifest consistency\",\"grounding_mode\":\"repo_specific\",\"truth_sources\":[\"schemas/SKILL_METADATA_PROTOCOL_schema.json\",\"schemas/skill-audit-state.schema.json\",\"schemas/manifest.schema.json\",\"skill-metadata-protocol/SKILL_METADATA_PROTOCOL.md\",\"scripts/skill-lint.js\",\"scripts/check-audit-manifest.js\",\"scripts/check-protocol-consistency.js\",\"scripts/generate-manifest.js\",\"examples/evals/graph-audit.json\"],\"failure_modes\":[\"schema_drift\",\"sidecar_state_drift\",\"manifest_sample_out_of_sync\",\"broken_relation_targets\",\"eval_artifacts_mismatch\",\"name_directory_mismatch\"],\"evidence_priority\":\"repo_code_first\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v8
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/quality-assurance/graph-audit/SKILL.md
  # === Audit Status (written by the audit loop to audit-state.json, not hand-authored here) ===
  # See SKILL_AUDIT_LOOP.md § Audit Status. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
---

# Graph Audit

## Coverage

- Schema conformance: checking that canonical `SKILL.md` files validate against `schemas/SKILL_METADATA_PROTOCOL_schema.json` without errors
- Sidecar consistency: checking that `audit-state.json` files carry loop-owned audit/eval/provenance state and validate against `schemas/skill-audit-state.schema.json`
- Manifest sync: verifying that `examples/skills.manifest.sample.json` and generated manifests match the joined `SKILL.md` + `audit-state.json` source model
- Relation integrity: confirming that every target named under `relations.*` corresponds to a real sibling skill directory and uses the right predicate semantics (`related`/`broader`/`boundary`/`disjoint_with`/`verify_with`/`depends_on`)
- Eval artifact coherence: ensuring that `eval_artifacts: present` and graded verdict claims are backed by real gradeable artifacts
- Grounding presence: confirming that every `deployment_target: project` skill has a populated `grounding` declaration with `subject_matter`, `grounding_mode`, `truth_sources`, `failure_modes`, and `evidence_priority`
- Name-directory parity: checking that a skill's `name` field matches the name of the parent directory (required for SKILL.md compatibility)

## Philosophy

Skill graphs fail silently. A broken relation or a drifted enum value does not crash the agent — it just makes retrieval subtly wrong, and subtly-wrong retrieval is worse than a crash because nothing tells you to look. The audit's job is to turn every silent bug into a loud one before the graph accumulates enough drift that agents can no longer trust its edges.

## Key Files

| File | Line range | Purpose |
|---|---|---|
| `schemas/SKILL_METADATA_PROTOCOL_schema.json` | whole file | Enforces the authored metadata schema for every SKILL.md |
| `schemas/skill-audit-state.schema.json` | whole file | Enforces the sidecar Audit Status schema for loop-owned state |
| `schemas/manifest.schema.json` | whole file | Enforces the compiled manifest shape |
| `skill-metadata-protocol/SKILL_METADATA_PROTOCOL.md` | Schema contract and field sections | Source of truth for field semantics and authoring rules |
| `scripts/skill-lint.js` | whole file | Canonical per-skill lint runner for schema, comments, relation targets, and related static checks |
| `scripts/check-audit-manifest.js` | whole file | Checks that graded verdict claims have the gradeable artifacts they require |
| `scripts/check-protocol-consistency.js` | whole file | Cross-artifact protocol checker; validates that protocol docs remain consistent with schemas |
| `scripts/generate-manifest.js` | whole file | Builds the compiled manifest from `SKILL.md` plus `audit-state.json` |
| `examples/skills.manifest.sample.json` | whole file | Generator-produced sample used as a stable manifest fixture |

## Evals

This skill has a local comprehension artifact at `evals/comprehension.json` and a Skill Graph fixture at [`examples/evals/graph-audit.json`](https://github.com/jacob-balslev/skill-graph/blob/main/examples/evals/graph-audit.json). The local artifact exercises the portable concept; the Skill Graph fixture keeps repo-grounded prompts tied to current protocol files, sidecar state, manifest joins, relation targets, and gradeable-artifact evidence.

## Verification

Run the lint script to execute all audit checks:

```bash
node scripts/skill-lint.js
```

For a single skill:

```bash
node scripts/skill-lint.js skills/<name>
```

For the full audit including the skill-metadata-template and audit-evidence consistency:

```bash
node scripts/skill-lint.js --include-template
node scripts/check-audit-manifest.js
```

Exit code 0 means all checks passed. Exit code 1 means at least one check failed; each failure identifies the specific file and check.

- [ ] All SKILL.md files pass schema validation
- [ ] All `audit-state.json` sidecars validate and contain loop-owned state rather than duplicating those fields in SKILL.md
- [ ] Manifest sample matches generator output
- [ ] All relation targets exist as real sibling skill directories
- [ ] All graded verdict claims have matching gradeable artifacts
- [ ] All `deployment_target: project` skills have a complete `grounding` declaration
- [ ] Every skill's `name` field matches its parent directory name (SKILL.md compatibility)

## Do NOT Use When

| Use instead | When |
|---|---|
| `writing-humanizer` | The task is making skill prose read more naturally, not auditing metadata |
| `refactor` | The task is restructuring skill body sections while keeping the contract stable |
| `debugging` | The task is chasing a runtime failure in an agent, not validating graph metadata |
| `skill-infrastructure` | The task is designing or maintaining the health-check tooling itself |
