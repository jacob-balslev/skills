---
name: skill-scaffold
description: "Use when creating a new SKILL.md from scratch, adapting an existing skill to a different archetype, or teaching another author the canonical Skill Metadata Protocol frontmatter and body structure. Covers schema-conformant frontmatter, archetype-aware body layout, semantic-layer discipline (description vs Coverage), teaching-layer mechanics (TEMPLATE NOTE blockquotes), the focused authoring gates, and the routing-eval honesty rule. Do NOT use when modifying an already-written skill (edit it directly), when writing general technical documentation (use `docs-development`), or when fixing a malformed skill detected by health tooling (use `skill-infrastructure` for systematic library health, not authoring scaffold help)."
license: MIT
compatibility:
  notes: "Markdown, YAML, JSON Schema"
allowed-tools: Read Grep Bash Write Edit
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.1.0"

  # === v7 Classification (DEPRECATED 2026-05-26 — kept for back-compat only) ===
  # type: v7 classification — DEPRECATED, replaced by `operation`.
  # Legacy values: capability / workflow / router / overlay.
  type: capability
  # operation: cognitive operation enabled (Bloom-grounded). One of four closed values:
  # know (declarative — concepts, vocabulary, reference) /
  # do (procedural — step-by-step execution) /
  # decide (judgment — choosing, dispatching) /
  # modify (context injection — shapes how other skills execute).
  operation: know
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: agent

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: agent-ops
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: agent/skill-system
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: workspace
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-26"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-18\"}"

  # === Eval-health: three orthogonal axes ===
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
  keywords: "[\"skill authoring\",\"new skill\",\"writing a skill\",\"skill scaffold\",\"skill template\",\"skill frontmatter\",\"skill metadata protocol v7\",\"skill graph contract\",\"capability or workflow\",\"description vs coverage\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"I'm writing a new skill from scratch — where do I start?\",\"how do I pick between capability and workflow for my skill type?\",\"what's the difference between description and the ## Coverage section?\",\"scaffold a new skill that teaches react component composition patterns\",\"I copied skill-metadata-template.md but my new skill won't pass lint — help\",\"draft frontmatter for a workflow skill that owns deployment rollback\",\"how do I strip teaching annotations from the template before commit?\",\"should I flip routing_eval to present on my new skill?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"refactor my existing skill to be more concise\",\"my skill's routing isn't activating — why?\",\"audit my skill library for stale frontmatter\",\"write a developer guide for the contributor docs\",\"review this skill's content for correctness\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"refactor\",\"reason\":\"refactor is behaviour-preserving modification of existing code or skills; skill-scaffold creates a new skill from scratch\"},{\"skill\":\"skill-router\",\"reason\":\"skill-router dispatches between existing skills at request time; skill-scaffold is the authoring-time guide for a NEW skill\"},{\"skill\":\"skill-infrastructure\",\"reason\":\"skill-infrastructure runs health tooling across the entire skill library after authoring; skill-scaffold is the authoring-time guide for creating a single new skill before it joins the library\"}],\"related\":[\"naming-conventions\"],\"verify_with\":[]}"
  # grounding: required when `scope: project` (or legacy alias `scope: codebase`).
  # Declares the truth sources the skill anchors to and the failure modes those sources
  # prevent. Omit when the skill is universal-knowledge.
  grounding: "{\"domain_object\":\"Authoring a new SKILL.md against Skill Metadata Protocol v7\",\"grounding_mode\":\"hybrid\",\"truth_sources\":[\"https://github.com/jacob-balslev/skill-graph/blob/main/examples/skill-metadata-template.md\",\"https://github.com/jacob-balslev/skill-graph/blob/main/SKILL_METADATA_PROTOCOL.md\",\"https://github.com/jacob-balslev/skill-graph/blob/main/schemas/skill.schema.json\",\"https://github.com/jacob-balslev/skill-graph/blob/main/docs/field-reference.md\"],\"failure_modes\":[\"placeholder_sludge\",\"cargo_cult_meta_sections\",\"description_coverage_collapse\",\"authoring_gate_skipped\",\"inflated_routing_eval\",\"v6_v7_contract_drift\"],\"evidence_priority\":\"equal\"}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":180,\"review_cadence\":\"quarterly\"}"

  # === v6+ Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: "Skill scaffolding is protocol-backed authoring, not free-form prompt writing. The scaffold separates the routing contract, field contract, concept model, grounding evidence, body sections, and verification gates so a new skill becomes a routable graph node rather than a decorative Markdown file."
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: "This skill prevents new SKILL.md files from inheriting template comments, false eval claims, stale schema fields, dangling relations, or vague descriptions. It turns authoring into a reproducible sequence: start from the canonical template, choose the archetype, adapt the contract, remove teaching annotations, and verify before publishing."
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: "This skill is for authoring a new skill or re-archetyping a draft before it becomes a stable node. It is not for routine edits to an existing skill, router debugging, bulk graph audits, general documentation, or correctness review of an already-authored skill's domain content."
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A skill scaffold is like construction formwork: it gives the new structure its shape while the concrete sets, but the temporary braces must be removed before the finished building is occupied."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: "The common mistake is treating the template as copy text to fill in. A scaffold is an authoring instrument: fields must be chosen for the new skill, template notes must disappear, and every health or eval claim must match evidence from the current change."
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"Skill scaffolding is the protocol-backed process of creating a SKILL.md whose frontmatter, body sections, relations, grounding, and verification claims are coherent from the first commit.\",\"mental_model\":\"Think of a skill as a graph node with a routing contract, an instructional body, typed edges, evidence, and health state. Scaffolding is the work of shaping all five together before the node joins the graph.\",\"purpose\":\"It prevents cargo-culted templates, vague activation text, false eval claims, dangling relation targets, and stale schema assumptions from entering a skill library.\",\"boundary\":\"It is not routine editing, router debugging, static graph audit, general documentation, or domain-content review for an existing skill.\",\"taxonomy\":\"Authoring workflow adjacent to skill-router, skill-infrastructure, and naming-conventions; distinct because it happens before a skill is fully authored.\",\"analogy\":\"A skill scaffold is like construction formwork: it gives the new structure its shape while the concrete sets, but the temporary braces must be removed before the finished building is occupied.\",\"misconception\":\"The template is not copy text to fill in. It is an authoring instrument whose teaching layer must be removed and whose claims must be re-earned for the new skill.\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v7
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/skill-scaffold/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: UNVERIFIED
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: UNVERIFIED
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
---

# Skill Scaffold

## Coverage

- Authoring flow: copy → rename → adapt → strip authoring scaffolding (`# TEMPLATE NOTE:` lines and `> **TEMPLATE NOTE:**` blockquotes only; keep field-purpose comments) → verify → commit
- Frontmatter identity: `schema_version`, `name`, `description`, `version`, `type`, `category`, `scope`, `owner`, plus the eval-health triple and `drift_check` required by every Skill Metadata Protocol v7 skill
- Archetype selection: how to pick between `capability`, `workflow`, `router`, and `overlay` and which `## H2` body sections each archetype requires
- v6+ understanding fields: when to add `comprehension_state`, `mental_model`, `purpose`, `boundary`, `analogy`, `misconception`, and when the legacy `concept` back-compat block is still useful
- Semantic-layer discipline: how `description:` (≤ 3 sentences, pushy, boundary-aware routing contract) differs from `## Coverage` (bulleted scope map of distinct topics) and why each must stay in its own layer
- Teaching-layer mechanics: two distinct comment conventions with opposite lifecycles — `# TEMPLATE NOTE:` lines and `> **TEMPLATE NOTE:**` blockquotes are authoring scaffolding (strip on derivation), while field-purpose comments (no `TEMPLATE NOTE:` prefix; sit above each field documenting its purpose, allowed values, and when-to-use) are co-located documentation (keep in production). See `~/Development/skill-graph/SKILL_METADATA_PROTOCOL.md § Inline field comments — the authoring convention`
- Focused authoring gates: passing lightweight skill lint, then running protocol/routing checks that match the fields you changed
- Routing-eval honesty: defaulting to `routing_eval: absent` and only flipping to `present` after `node scripts/skill-graph-routing-eval.js --skill <name>` exits 0
- Grounding declarations: when to populate `grounding.truth_sources`, when URL truth sources are acceptable, and how local truth-source hashes differ from external references

## Philosophy

A scaffold teaches by example, not by placeholder. A concrete, internally consistent specimen of a finished skill is a more reliable authoring reference than any amount of abstract instruction. The teaching layer — meta-commentary about how to read and adapt the scaffold — must live in structurally distinct slots that disappear when the author tightens a new skill, never in the `## H2` section slots that AI agents copy verbatim. Authoring is also a verification-first discipline: lightweight lint is the first smoke test, but protocol consistency, routing evals, drift checks, and human review are what answer "did I do this right?" for the full contract.

## Authoring Flow

The six steps are non-negotiable; skipping any step produces a skill that lints in your editor but breaks on someone else's machine.

**Step 0 (precondition):** Before authoring, search the existing skill library and any project-specific redundancy registry. If the intended subject is already covered, either improve the existing skill or document the new grounding evidence that justifies a separate node. Re-authoring a duplicate skill without contradicting evidence wastes context and weakens routing precision.

1. **Copy** the canonical template from the Skill Graph tooling repo's `examples/skill-metadata-template.md` to `skills/<your-skill-name>/SKILL.md`. Do not rename in-place; the template stays as the canonical specimen.
2. **Rename** identity fields: `name`, `description`, `category` (if used), `keywords`, `examples`, `anti_examples`, `paths` (if applicable), and the body title. Every reference to "skill-metadata-template" should be gone.
3. **Adapt** body sections to your skill's subject. Match the `## H2` layout to your declared archetype per `docs/skill-metadata-protocol.md § Archetype section map`. Remove sections that do not apply — do not keep them with placeholder content.
4. **Decide understanding and grounding.** Add v6+ understanding fields only when the skill needs concept transfer and the content is ready to be graded. Add `grounding.truth_sources` when the skill is anchored to a protocol, spec, codebase, or vendor/source document; use public URLs when the release repo does not contain the source files.
5. **Strip authoring scaffolding while preserving field-purpose comments.** The template carries two distinct comment conventions with opposite lifecycles (see `~/Development/skill-graph/SKILL_METADATA_PROTOCOL.md § Inline field comments — the authoring convention`):
   - **STRIP** every `> **TEMPLATE NOTE:**` body blockquote and every YAML comment line beginning with `# TEMPLATE NOTE:`. These are scaffolding *about the template itself* — guidance about how to use the template — never field semantics. Shipping them in a derived skill is the most common authoring mistake.
   - **KEEP** every YAML comment line that documents a field's purpose, allowed values, or when-to-use. These have no `TEMPLATE NOTE:` prefix and read like `# operation: cognitive operation an agent will primarily DO with this skill loaded.` followed by the enum values. They are co-located documentation, not scaffolding. They stay so the derived skill's frontmatter is self-explanatory to readers and to cold-start agents who would otherwise have to open `~/Development/skill-graph/docs/field-reference.md` to decode each field.

   Verification (both must hold):
   - `grep -n "TEMPLATE NOTE" skills/<your-skill>/SKILL.md` returns zero hits — scaffolding stripped.
   - `grep -c "^\s*#" skills/<your-skill>/SKILL.md` returns a count similar to the template's (roughly 30-50 depending on which optional fields you kept) — field-purpose comments preserved.
6. **Verify** by running the gate sequence: focused `node scripts/skill-lint.js skills/<your-skill>` (must show 0 errors), `node scripts/check-protocol-consistency.js` for protocol-tier changes, and (if you populated `examples` and `anti_examples`) `node scripts/skill-graph-routing-eval.js --skill <your-skill>` (verdict PASS before flipping `routing_eval` to `present`).

## Archetype Selection

Pick `type:` once, deliberately, before writing the body — the archetype determines which body sections are required.

| Archetype | When to pick it | Required body sections |
|---|---|---|
| `capability` | The skill teaches *how to do something* with no fixed sequence (e.g., a11y, naming-conventions, prompt-craft) | `## Coverage`, `## Philosophy`, `## Verification` |
| `workflow` | The skill orchestrates a *sequence of steps* the agent follows in order (e.g., debugging, refactor, skill-audit-loop) | `## Coverage`, `## Workflow` (numbered steps), `## Verification` |
| `router` | The skill dispatches between *other skills* (rare; only one starter — `skill-router`) | `## Coverage`, `## Routing Rules`, `## Verification` |
| `overlay` | The skill *specialises an `extends:` parent* with project-specific or stack-specific overrides (e.g., `lint-overlay`) | `## Overlay Rules` plus everything inherited from the parent's archetype |

The fastest way to pick wrong: choose `workflow` because your skill happens to list ordered steps in the body. If the *user* could reasonably consume the skill in any order based on the section they need, it is a `capability`, not a `workflow`. Workflows are skills the agent literally walks through start-to-end every time.

## Semantic-Layer Discipline

`description` and `## Coverage` look like duplicates and are not. They live in different layers and serve different consumers.

- `description` (≤ 3 sentences, frontmatter): the **routing contract**. Pushy, specific, boundary-aware. Tells a router whether to activate this skill for a given query. Should include an explicit "Do NOT use for…" boundary clause so the router doesn't over-activate.
- `## Coverage` (bulleted list, body): the **scope map**. Enumerates the distinct topics this skill teaches. The reader scans `## Coverage` to decide whether to read further. Should NOT restate `description` as a single line; should NOT be a checklist of placeholder commitments.

If you can drop your `description` into `## Coverage` without changing meaning, both layers are wrong. Rewrite `description` until it is too pushy for the body, then rewrite `## Coverage` until it is too enumerative for the description.

## Common Authoring Mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Placeholder sludge | `description: "Use when... for..."`, paths like `your/file.md`, `todo` markers | Search the file for `your-`, `path/to/`, `todo`, `lorem`. Zero hits before commit. |
| Cargo-culted teaching layer | `> **TEMPLATE NOTE:**` blocks survive into derived skill | `grep -n "TEMPLATE NOTE" skills/<name>/SKILL.md` returns nothing |
| Description-Coverage collapse | `description` and `## Coverage` say the same thing in different shapes | Rewrite description as routing contract, Coverage as scope map (see § Semantic-Layer Discipline) |
| Inflated routing_eval | `routing_eval: present` set without running the harness | Default to `absent`. Flip to `present` only after `node scripts/skill-graph-routing-eval.js --skill <name>` returns PASS |
| Stale protocol version | `schema_version: 7` paired with v5/v6 schema names, old concept-block advice, or the deprecated `audit_verdict` aggregate | Update truth sources, protocol labels, understanding fields, Health Block fields, and migration notes together |
| Wrong archetype | Skill body sections don't match `type:` | Re-pick archetype per § Archetype Selection; rewrite the body to match |
| Anti-examples for skills that don't exist | `anti_examples` references skills not in the library | Either author those skills first or use existing starter names |
| Lint-skipped commit | New skill is committed without focused lint | Run `node scripts/skill-lint.js skills/<name>` before every commit; fix all errors |

## Verification

Use this checklist as the authoring gate before committing a skill. Every item must pass.

- [ ] Every retained field has a real reason to exist in the new skill
- [ ] Every removed field was removed because of archetype or grounding mismatch, not laziness
- [ ] Body sections match the declared archetype per `docs/skill-metadata-protocol.md § Archetype section map`
- [ ] `description:` is ≤ 3 sentences, contains pushy trigger phrases, and names an explicit negative boundary
- [ ] `## Coverage` is a scope map of distinct topics, not a one-line restate of the description
- [ ] `drift_check` is an object with `last_verified`; local `truth_source_hashes` are recorded only when the drift tool can compute them, while URL truth sources remain explicit but external-unhashed
- [ ] v6+ understanding fields are either honestly populated or omitted with `comprehension_state` absent
- [ ] `compatibility` is an object (not a free-text string) when present
- [ ] `eval_artifacts`, `eval_state`, `routing_eval` reflect the actual skill state — no inflation
- [ ] All `relations` entries point to skills that exist in the target repo; `boundary` entries with non-obvious rationale use the `{skill, reason}` form
- [ ] No placeholder sludge (`your-skill-name`, `path/to/file`, `todo`) remains
- [ ] No `> **TEMPLATE NOTE:**` blockquotes or `# TEMPLATE NOTE:` YAML comments remain — scaffolding fully stripped (`grep -n "TEMPLATE NOTE" skills/<name>/SKILL.md` returns zero hits)
- [ ] Field-purpose comments above each frontmatter field PRESERVED — the derived skill carries the same kind of `# fieldname: purpose / allowed values` comment block the template had for each retained field. `grep -c "^\s*#" skills/<name>/SKILL.md` is roughly the same magnitude as the template's, not zero
- [ ] `node scripts/skill-lint.js skills/<name>` returns 0 errors against the new skill
- [ ] `node scripts/check-protocol-consistency.js` passes C1-C7
- [ ] If `routing_eval: present`, `node scripts/skill-graph-routing-eval.js --skill <name>` returns verdict PASS

## Do NOT Use When

| Use instead | When |
|---|---|
| `documentation` | Writing general technical documentation (guides, tutorials, references) — not a skill specifically |
| `refactor` | Modifying an existing skill's content while preserving its identity |
| `skill-infrastructure` | Auditing the metadata health of skills already in the library |
| `skill-router` | Diagnosing why a router doesn't activate an existing skill on a given query |
| `code-review` | Reviewing the technical content of a skill (correctness, clarity) once authored |
