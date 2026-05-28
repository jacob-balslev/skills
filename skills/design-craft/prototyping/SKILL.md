---
name: prototyping
description: "Use when building an artifact whose purpose is to answer a specific question — paper sketch, wireframe, clickable mockup, wizard-of-oz, role-play, service prototype, or code spike — at the lowest fidelity sufficient to produce that learning. Do NOT use for production-grade component construction, design-system contribution, or building the actual ship-ready feature — those are design-module-composition and engineering implementation."
license: CC-BY-4.0
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
  subject: design-craft
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-12"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-12\"}"

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
  keywords: "[\"paper prototype\",\"low fidelity prototype\",\"clickable prototype\",\"wizard of oz\",\"role play prototype\",\"service prototype\",\"code spike\",\"learning goal\",\"fidelity matching\",\"throwaway prototype\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"prototype this\",\"wizard of oz\",\"paper prototype\",\"clickable mockup\",\"what fidelity\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Pick the right fidelity for a prototype that tests whether users will trust an AI-suggested category.\",\"Plan a wizard-of-oz study where a human acts as the recommendation engine.\",\"Sketch a role-play prototype for a service-desk interaction before any UI is built.\",\"Decide between a paper prototype and a Figma clickable for this onboarding test.\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Build the production React component for the new dashboard widget.\",\"Add this component to the design system library.\",\"Write the migration script for the production database.\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"ideation\",\"usability-testing\",\"design-thinking\"],\"boundary\":[{\"skill\":\"design-module-composition\",\"reason\":\"design-module-composition produces durable design-system components meant to ship and be reused. prototyping produces disposable artifacts whose only purpose is learning — different lifecycle, different quality bar, different audience.\"},{\"skill\":\"interaction-patterns\",\"reason\":\"interaction-patterns is a reference catalog of established UI behaviors. prototyping is the activity of building a thing to test a question — it may use interaction patterns but is not itself a pattern library.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/prototyping/SKILL.md
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

# Prototyping

## Coverage
Prototyping covers the practice of constructing artifacts whose primary purpose is to **answer a question** the team has written down. The fidelity ladder runs from **paper sketches** (fastest, cheapest, best for early flow and concept testing) through **wireframes**, **clickable prototypes** (Figma, Framer, similar), **wizard-of-oz** prototypes (a human secretly performs the function the system will eventually automate — Kelley 1984), **role-play / bodystorming** (the team physically acts out a service interaction), **service prototypes** (props and staged environments for service-design questions), and up to **code spikes** (throwaway working code that answers a feasibility question).

The central skill is **fidelity matching**: choosing the lowest fidelity that can credibly answer the learning question. Paper prototypes can answer "is this flow understandable?" but not "is the typography readable?"; a clickable prototype can answer "do users find the primary action?" but not "does this feel fast under load?"; only a code spike can answer "will this API rate-limit us at scale?". Building higher fidelity than the question requires wastes time and prematurely anchors stakeholders on visual decisions.

A complementary skill is **the learning goal contract**: every prototype begins with one or two written questions it is built to answer, and a definition of what evidence would count as an answer in either direction. Without this, prototypes drift into "let's just make it look nice" and the testing session that follows produces ambiguous results because nobody agreed in advance what they were looking for.

The practice also covers **sacrificial concepts** — deliberately rough or extreme prototypes whose purpose is to provoke a reaction, not to be defended. IDEO and the Stanford d.school both teach using disposable artifacts to draw out user preferences that would not surface in abstract conversation.

## Philosophy
Prototyping rejects the instinct to polish before showing. Polish signals finality; polish makes stakeholders evaluate fit-and-finish instead of concept; polish makes users reluctant to criticize. A rougher prototype invites honest reaction. The famous IDEO maxim "if a picture is worth a thousand words, a prototype is worth a thousand meetings" captures the substitution effect — but only if the prototype is cheap enough that a team can build three and throw two away.

The discipline insists prototypes are means, not ends. A successful prototype is one that produced a clear answer, even if the answer is "this concept doesn't work" — perhaps especially then, because that finding came at the price of a prototype rather than a launched feature. Teams that judge prototypes by their visual quality have inverted the value system; teams that judge them by what was learned have it right.

## Verification
- The prototype has a written learning question, agreed before construction began, and a definition of what evidence would answer it.
- The fidelity matches the learning goal — the team can defend why this fidelity was chosen and what a higher- or lower-fidelity version would have cost or gained.
- The prototype is **disposable** in the team's mind — there is no implicit commitment that this code/file/sketch will become the production artifact.
- The construction time is small relative to the cost of being wrong about the underlying concept — if a prototype took two weeks to test a one-week assumption, the fidelity was probably too high.
- The prototype is testable: a real participant can interact with it (or watch it being acted out) and produce a meaningful reaction, not just nod politely.
- The team has a plan for what happens after testing — either iterate, escalate fidelity, or kill the concept — written down before testing begins.

## Do NOT Use When
- The artifact will ship to real users in production — that is engineering implementation, not prototyping; even a "high-fi prototype" that ships is a product.
- The component is meant for reuse across many features and contexts — use **design-module-composition** to contribute to the design system.
- No learning question has been articulated — return to **problem-framing** or **ideation** to clarify what the prototype would even test.
- The team needs to evaluate an existing artifact with users — use **usability-testing** directly; no new prototype is required.
- The question is purely technical performance, scaling, or infrastructure — use an engineering spike with appropriate measurement instrumentation, not a design prototype.
- The output is a reference catalogue of established UI behaviors — use **interaction-patterns**.
