---
name: architecture-decision-records
description: "Use when writing, reviewing, or updating Architecture Decision Records: context, decision, options rejected, consequences, status, supersession, and follow-up verification. Do NOT use for general documentation prose (use `documentation`), code review findings (use `code-review`), or choosing between frameworks before a decision exists (use `framework-fit-analysis`)."
license: MIT
compatibility:
  notes: "Portable ADR discipline for Markdown decision logs, repo docs, design docs, and architecture governance."
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
  subject: code-engineering
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: architecture/decision-records
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-11"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-11\"}"

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
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"ADR\",\"architecture decision record\",\"decision log\",\"technical decision\",\"decision consequences\",\"options rejected\",\"superseded ADR\",\"architectural rationale\",\"decision status\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"write an ADR for choosing Postgres views as the source of truth\",\"review this architecture decision record for missing consequences and rejected options\",\"this decision changed - should we amend the ADR or supersede it?\",\"extract the decision from this long architecture discussion into a durable ADR\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"write a general README section explaining how this module works\",\"choose which framework we should use for this project\",\"review this PR for bugs and regressions\",\"design the interface contract between these two services\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"framework-fit-analysis\",\"reason\":\"framework-fit-analysis evaluates options before selection; architecture-decision-records records the selected option and tradeoffs\"},{\"skill\":\"code-review\",\"reason\":\"code-review evaluates a diff; architecture-decision-records evaluates the decision record\"},{\"skill\":\"system-interface-contracts\",\"reason\":\"system-interface-contracts designs boundaries and contracts; architecture-decision-records records the decision to adopt one\"}],\"related\":[\"framework-fit-analysis\",\"bounded-context-mapping\",\"system-interface-contracts\",\"dependency-architecture\"],\"verify_with\":[\"code-review\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":365,\"review_cadence\":\"quarterly\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/architecture-decision-records/SKILL.md
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

# Architecture Decision Records

## Coverage

Create and audit ADRs for significant technical choices. Covers decision context, forces, considered options, chosen decision, rejected alternatives, consequences, status, supersession, links to implementation, and follow-up verification. Use for decisions with future readers, cross-team consequences, operational cost, or hard-to-reverse effects.

## Philosophy

An ADR is not a design essay. It is a durable answer to "Why did we choose this, given what we knew then?" It should preserve the tradeoff, not retroactively make the decision look inevitable.

Good ADRs are short, dated, statused, and honest about consequences. If a future agent cannot tell whether the decision still holds, the record failed.

## Method

1. Name the decision in one sentence.
2. Capture context and forces, including constraints and non-goals.
3. List serious options considered, including "do nothing" when real.
4. State the decision and why it won.
5. Record consequences: benefits, costs, risks, migration obligations, and reversibility.
6. Set status: proposed, accepted, deprecated, or superseded.
7. Link implementation surfaces and verification checks.

## Verification

- [ ] The ADR records one decision, not a cluster of unrelated choices
- [ ] Rejected options are concrete and plausible
- [ ] Consequences include costs and risks, not only benefits
- [ ] Status and date are present
- [ ] Supersession links are explicit when the decision changed
- [ ] Implementation references are current or intentionally absent
- [ ] The decision can be understood without reading the whole discussion that caused it

## Do NOT Use When

| Use instead | When |
|---|---|
| `documentation` | You need a guide, README, tutorial, or reference page. |
| `framework-fit-analysis` | The task is still evaluating options before a decision. |
| `code-review` | The task is reviewing a diff for correctness. |
| `system-interface-contracts` | You need to design a contract before recording the decision. |

