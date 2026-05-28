---
name: context-graph
description: "Use when designing or auditing the multi-graph context architecture of an AI-coding workspace: skill graph, document routing graph, memory index, script registry, and the cross-graph edges between them. Covers edge typing, orphan detection, connectivity health, deterministic graph synthesis signals, change-propagation checks, and drift or hub-and-spoke anti-patterns. Do NOT use for authoring one SKILL.md (use `skill-scaffold`), validating one skill (use `skill-infrastructure`), live routing decisions (use `skill-router`), context-window budgeting (use `context-window`), or session load/drop choices (use `context-management`)."
license: MIT
compatibility:
  notes: "Architecture-level skill. Applies to any agent-coding workspace that has more than one skill / doc-routing / memory artifact and any way to traverse them — Claude Code, OpenCode, Cursor, Aider, Continue, Copilot Workspace, or a custom harness. The four-graph model and the orphan / connectivity metrics are independent of the specific runtime."
allowed-tools: Read Grep
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.1.0"


  # === v8 Classification (subject + deployment_target; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: agent-ops
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: agent/context
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-18"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-18\"}"

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
  keywords: "[\"context graph architecture\",\"multi-graph context model\",\"skill knowledge graph\",\"document routing graph\",\"memory index graph\",\"script command registry graph\",\"cross-graph edges\",\"orphan detection skill graph\",\"graph connectivity metrics\",\"average node degree\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"we have ~300 skills but the agent never finds half of them — what's the diagnostic frame?\",\"how do I measure whether our skill graph is actually navigable vs just present?\",\"I changed a webhook handler — what's the discipline for tracing the impact across docs, skills, memory, and scripts?\",\"we keep accumulating orphan skills and our connectivity drops every quarter — how do I make graph-health a deliberate gate?\",\"the agent is loading 15 skills per task and burning context — is the underlying graph too dense, too sparse, or wrong-shaped?\",\"design a deterministic recipe for synthesizing the skill graph from frontmatter without running an LLM\",\"what's the right cap on adjacent / boundary / verify_with relations per skill?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"scaffold a new SKILL.md from a template\",\"validate that this single skill's frontmatter matches the schema\",\"decide which skill to inject for this query right now\",\"this skill says 'use orgQuery'; that one says 'never use orgQuery' — fix the conflict\",\"decide what should and shouldn't be in this agent's context window for this task\",\"review this AI-generated PR for correctness\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"skill-router\",\"reason\":\"skill-router is the per-query dispatch decision (which skill activates now); context-graph is the underlying graph the router traverses\"},{\"skill\":\"skill-infrastructure\",\"reason\":\"skill-infrastructure owns the live skill library tooling (census, conflict detection, routing-gap reporting); context-graph owns the architectural model behind it\"},{\"skill\":\"skill-scaffold\",\"reason\":\"skill-scaffold authors a single SKILL.md; context-graph designs the graph that those authored skills participate in\"}],\"related\":[\"skill-router\",\"skill-infrastructure\",\"skill-scaffold\"],\"verify_with\":[\"skill-infrastructure\"]}"
  # grounding: required when `deployment_target: project`. Declares the truth sources
  # the skill anchors to and the failure modes those sources prevent. Omit when the
  # skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
  grounding: "{\"subject_matter\":\"Agent workspace context topology and discovery model\",\"grounding_mode\":\"hybrid\",\"truth_sources\":[\"https://github.com/jacob-balslev/skill-graph/blob/main/SKILL_GRAPH.md\",\"https://github.com/jacob-balslev/skill-graph/blob/main/docs/PRIMER.md\",\"https://github.com/jacob-balslev/skill-graph/blob/main/docs/concept-map.md\",\"https://github.com/jacob-balslev/skill-graph/blob/main/docs/diagrams/starter-graph.mmd\",\"https://github.com/jacob-balslev/skill-graph/blob/main/scripts/generate-manifest.js\",\"https://github.com/jacob-balslev/skill-graph/blob/main/scripts/skill-overlap.js\"],\"failure_modes\":[\"inferred_edges_replace_authored_relations\",\"orphan_skills_remain_unreachable\",\"relation_caps_turn_into_hub_and_spoke_graph\",\"change_propagation_ignores_cross_graph_edges\"],\"evidence_priority\":\"repo_code_first\"}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":365,\"review_cadence\":\"quarterly\"}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: "Context discovery is a graph problem: agents start from the current task, then traverse typed edges to find the skills, docs, memory records, scripts, and command surfaces that are relevant but not explicitly named. The useful primitives are nodes, typed edges, traversal roots, graph health metrics, and propagation paths. The core relationship is that a node's quality only matters if traversal can reach it; unreachable knowledge behaves like missing knowledge."
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: "Prevents large agent workspaces from becoming flat piles of disconnected files. Without a context graph, agents over-rely on exact-name recall, load overly broad context, miss nearby safety or correctness skills, and let documentation or memory drift because change propagation has no visible route. This skill replaces ad hoc \"search until something looks relevant\" with explicit topology, health checks, and propagation discipline."
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: "Distinct from skill routing, which decides what to load for one query; this skill designs the graph that routing traverses. Distinct from context-window budgeting, which decides how much selected material fits; this skill decides how material becomes discoverable. Distinct from single-skill audit, which validates one node; this skill evaluates library topology, edge discipline, orphan risk, and cross-graph propagation."
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A context graph is a transit map for an agent workspace: individual stations can be excellent, but the system only works when routes connect them, transfer points are intentional, and isolated stops are visible enough to fix."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: "The common mistake is treating graph metadata as decoration: add a few \"related\" links, trust search to fill gaps, and assume more edges always means better discovery. That produces noisy hubs, one-way references, and isolated specialist skills. A useful graph is not the densest graph; it is the graph whose typed edges preserve routing meaning, keep important nodes reachable, and make change propagation auditable."
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"A context graph is the explicit topology that connects an agent workspace's skills, docs, memory records, scripts, and commands so agents can discover relevant context by traversal rather than exact-name recall.\",\"mental_model\":\"Agents start from a task as the traversal root, then follow typed edges to reachable nodes. Node quality and graph reachability are separate properties: a beautifully written skill that no route reaches behaves like absent knowledge. Healthy graph work therefore watches edge meaning, orphan rate, degree distribution, cluster boundaries, and cross-graph propagation paths together.\",\"purpose\":\"It solves the flat-library failure mode where useful knowledge exists but agents cannot find it unless the user names it directly. The replacement is explicit topology: authored relations, deterministic synthesis signals, health metrics, and propagation checks that make relevance discoverable and drift visible.\",\"boundary\":\"It is not per-query skill routing, context-window budgeting, or single-file metadata linting. Routing consumes the graph, budgeting trims selected context, and single-skill audit checks one node; context-graph work asks whether the whole workspace is navigable and whether changes propagate through the right edges.\",\"taxonomy\":\"Main graph families are skill knowledge graphs, document routing graphs, memory indexes, and script or command registries. Main edge concerns are typed meaning, reachability, reciprocity, degree caps, cross-graph propagation, and deterministic rebuild signals.\",\"analogy\":\"A context graph is a transit map for an agent workspace: individual stations can be excellent, but the system only works when routes connect them, transfer points are intentional, and isolated stops are visible enough to fix.\",\"misconception\":\"The trap is believing more links always improve discovery. Over-linking creates noisy hubs, under-linking creates orphans, and untyped links destroy routing meaning. The useful graph is the one whose edges preserve intent and make important context reachable.\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/context-graph/SKILL.md
  skill_graph_export_description: shortened for Agent Skills 1024-character description limit; canonical source keeps the full routing contract
  skill_graph_canonical_description_length: "1597"
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: PASS
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
  last_audited: 2026-05-28
  lint_verdict: PASS
---

# Context Graph

## Coverage

The architectural model behind navigable context in an AI-coding workspace. Names the four interconnected graphs that any mature workspace accumulates — Skill Knowledge Graph, Document Routing Graph, Memory Index, Script / Command Registry — and the cross-graph edges that connect them (skill → script, skill → memory, doc-routing → doc, script → command). Specifies the three skill-graph edge types (`adjacent`, `boundary`, `verify_with`) and their per-edge-type caps. Defines orphan detection (a node with zero or near-zero incoming edges that agents cannot find by traversal) and the priority order for remediation (security skills first, then financial, integration, infrastructure, then UX). Specifies graph-connectivity metrics with healthy / unhealthy bands: connectivity, average degree, orphan rate, max degree, cluster count, hub-spoke ratio. Names the five deterministic signals that should drive graph synthesis (explicit prose references, manual `relations` frontmatter, bundle co-membership, shared routing labels, keyword overlap) — never an LLM at synthesis time. Walks the change-propagation checklist that traces a single edit across all four graphs. Catalogs the anti-patterns that quietly destroy graph quality: edge inflation, one-way edges, optional-metadata mindset, AI-inferred edges that drift on rebuild, ignoring cross-graph edges.

## Philosophy

Without a navigable graph, agents cannot discover context they did not already know existed. The original failure mode looks like this: a skill exists, the agent doesn't reference it by name in the current prompt, and the routing layer has no edge to find it from — so the skill might as well not exist. A workspace can ship hundreds of skills and still operate as if it had ten, because the other 290 are unreachable from any traversal an agent actually performs.

Context discovery is therefore a precondition for context quality. If the right skill, doc, or memory file cannot be found by following edges from the current task, content quality is irrelevant. Graph maintenance — adding edges, fixing orphans, capping inflation, keeping cross-graph references current — is a quality gate, not optional metadata. Every new skill enters the system with a question attached: who reaches this from where, by which edges?

The deterministic-signal discipline is the second non-negotiable. Graph synthesis must be a deterministic function of the authored artifacts (frontmatter relations, bundle membership, prose references, shared routing labels, keyword overlap) — not an LLM inference. If the graph drifts on rebuild, agents lose the one stable surface they have. Use AI to _suggest_ edges during authoring; never to _generate_ the live graph at runtime.

## 1. The Four Context Graphs

A mature AI-coding workspace converges on four interconnected graphs:

### Graph 1 — Skill Knowledge Graph

Nodes are skill files; edges are the typed relations declared in skill frontmatter. The job of this graph is _what knowledge exists in the workspace, and what knowledge teaches alongside what other knowledge_. The graph's vital signs are connectivity (no large isolated components), orphan rate (no skills nobody references), and edge-type discipline (each edge has a typed reason).

### Graph 2 — Document Routing Graph

Nodes are documentation targets and change categories; edges express "when this kind of code changes, those docs must be updated." The job of this graph is _propagation_ — preventing stale docs by making the doc-update obligation visible at the point of code change. The graph is most valuable when it is read by humans during PR review and by agents during the wrap / closeout protocol, not when it is read by no one.

### Graph 3 — Memory Index

Nodes are persistent memory topic files (decisions, observations, durable preferences); edges are the index entries that point from a topic table to the underlying file. The job of this graph is _cross-session knowledge persistence_ — the answer to "what did we already decide about X, why, and when did the decision become true." A memory graph that records facts but not the _why_ and _how_ of decisions cannot answer audit questions like "why did the agent choose Y?". Workspaces that need decision provenance extend the memory graph with the Process Knowledge Ontology pattern (modeling decisions, triggers, state transitions, and outcomes as first-class entities).

### Graph 4 — Script / Command Registry

Nodes are scripts and commands; edges are the categorisations that group them by purpose. The job of this graph is _agent tooling discovery_ — when an agent needs a deterministic script or a slash command, the registry is what makes it findable without trial-and-error.

### Cross-graph edges

The four graphs are _interconnected_. The cross-graph edges are where most of the propagation value lives:

| From        | To      | Edge type                                          | Example                                                                   |
| ----------- | ------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| Skill       | Script  | `key_file` (frontmatter `paths` or body reference) | A health-audit skill points at the script that runs the audit             |
| Skill       | Skill   | `adjacent` / `boundary` / `verify_with`            | Frontmatter relations                                                     |
| Script      | Command | `consumed_by`                                      | A loop-supervisor script is consumed by a manage-style command            |
| Memory      | Skill   | `informs`                                          | A memory file recording a billing strategy informs an agent-routing skill |
| Doc-routing | Doc     | `requires_update`                                  | A code change row points at the docs that must be updated together        |

A workspace that names all four graphs _and_ their cross-graph edges has a complete map. A workspace that names only the skill graph has roughly a quarter of the picture.

## 2. Edge Types in the Skill Graph

The skill graph uses three relation types. Each has a different _meaning_ and a different _cap_. Mixing them collapses the graph into noise.

| Type          | Recommended cap | Meaning                                                                                                              | Example                                                     |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `adjacent`    | ≤ 5 per skill   | Closely related — teach together; an agent loading one would benefit from also loading the other                     | A data-reconciliation skill ↔ a financial-correctness skill |
| `boundary`    | ≤ 5 per skill   | Contrasting — "do NOT use X for this; use Y instead." The router should _exclude_ the boundary skill when both match | A financial-correctness skill ↮ a data-visualisation skill  |
| `verify_with` | ≤ 3 per skill   | Cross-check skill output against this skill before trusting it                                                       | A financial-correctness skill → a code-logic skill          |

The caps exist to prevent edge inflation. A skill with 12 `adjacent` relations is not "well-connected" — it is a hub that pulls every adjacent traversal toward itself, hiding more specific signals. Edge discipline beats edge volume.

### `boundary` is exclusion, not adjacency

The most common edge-type confusion: putting "topical neighbour" skills in `boundary`. Boundary edges tell the router "if both this skill and the boundary skill match, route AWAY from the boundary skill" — they are _exclusion-with-a-reason_, not "see also." Putting a skill in `boundary` that should be in `related` will hijack the boundary skill's positive cases and depress its routing-eval pass rate. When in doubt, prefer `related` and only promote to `boundary` when the two skills genuinely _compete_ for the same prompt with different correct answers.

## 3. Orphan Detection

An **orphan** is a node with zero (or near-zero) incoming edges. Nothing points at it, so traversal cannot reach it; agents have to know its exact name to find it. In a healthy graph, the orphan rate is below 10%. In an unhealthy graph it is the majority — and adding more skills makes the problem worse, not better, because each new skill is also unreachable.

### Orphan-detection recipe

1. Rebuild the graph from authored artefacts (deterministic synthesis).
2. Walk every node, count its `degree` (incoming + outgoing).
3. Flag every node with degree ≤ 1 as an orphan candidate.
4. For each orphan: identify its domain cluster (layer, keywords, examples) and find 3–5 sibling skills that _should_ reference it.
5. Add `relations` to the orphan and reciprocal references to its siblings — bidirectionally. A one-way edge from the orphan does not solve discovery, because the existing skills are where traversal _starts_.

### Remediation priority

Fix orphans in order of blast radius, not alphabetically:

1. **Security and compliance skills** — data exposure risk if agents miss them
2. **Correctness-critical skills** — financial, accounting, time, irreversible mutations
3. **Integration skills** — webhook signature verification, idempotency, retry
4. **Infrastructure skills** — operational impact (deploy, migrate, rollback)
5. **UX / display skills** — lower blast radius; fix once higher-priority orphans are gone

## 4. Graph Connectivity Metrics

These are the vital signs of a skill graph. Run them after every batch of skill additions or edge edits.

| Metric              | Formula                                | Healthy band    | Unhealthy signal                                                                 |
| ------------------- | -------------------------------------- | --------------- | -------------------------------------------------------------------------------- |
| **Connectivity**    | `connected_skills / total_skills`      | > 95%           | Multiple disconnected clusters indicate domain silos                             |
| **Average degree**  | `total_edges × 2 / total_nodes`        | > 5             | Below 3 means the graph is too sparse for traversal to be useful                 |
| **Orphan rate**     | `nodes with degree ≤ 1 / total_nodes`  | < 10%           | Above 30% means agents cannot discover most of the library                       |
| **Max degree**      | Highest degree of any node             | < 30            | A single node with degree 50+ is a hub-and-spoke anti-pattern                    |
| **Cluster count**   | Connected components                   | < 3 (ideally 1) | Many clusters means the workspace has informal silos that traversal can't bridge |
| **Hub-spoke ratio** | `nodes with degree > 15 / total_nodes` | < 5%            | More than 10% means the graph is degenerating into a star around a few mega-hubs |

### Five deterministic signals for graph synthesis

Synthesise the skill graph from these signals only — never from an LLM at runtime:

1. **Explicit prose references** — patterns like "Do NOT use X — use skill-name" in skill bodies
2. **Manual `relations` frontmatter** — author-declared edges
3. **Bundle co-membership** — skills declared in the same routing bundle
4. **Shared routing labels / triggers** — overlapping `triggers` or label declarations
5. **Keyword overlap** — shared keywords via the routing-config map

A graph built from these signals is _reproducible_: rebuild today and tomorrow and the edges are identical. A graph that uses LLM inference at synthesis time will drift on every rebuild and the routing layer cannot trust it.

## 5. Change-Propagation Analysis

When a single artefact changes, trace the propagation across all four graphs. This is the discipline that prevents silent staleness.

### Propagation checklist

| Step | Action                                                                                                                                             | Tool                                      |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| 1    | Read the document-routing graph. Find the change category (e.g., "DB migration", "webhook handler change") and list the docs that must be updated. | Read the routing table                    |
| 2    | Grep the changed file path / function name across all `*.md` for stale references                                                                  | `grep -r "<changed_id>" --include="*.md"` |
| 3    | Check skill key-file sections for references to the changed file                                                                                   | `grep -r "<changed_id>" skills/`          |
| 4    | Check the memory index for related topic files; update or add records if a decision changed                                                        | Read the memory index                     |
| 5    | Verify no stale references remain — run any doc-verification gate the workspace ships                                                              | Local doc-verification script             |

Each step exercises a different edge type. Skipping a step leaves a stale edge somewhere in the system, and the staleness compounds — the next change inherits a wrong baseline.

## 6. Anti-Patterns

| Anti-pattern                                                                      | Why it fails                                                                                  | What to do instead                                                                                      |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Edge inflation** — adding 10+ `adjacent` relations to one skill                 | Creates a hub-and-spoke; traversal pulls everything toward the hub and hides specific signals | Cap at 5; pick the most semantically-close siblings                                                     |
| **One-way edges** — adding edges _from_ a new skill _to_ existing skills only     | Existing skills stay orphaned; nothing points at them in the new direction                    | Add reciprocal references — update the existing skill too                                               |
| **Optional-metadata mindset** — treating relations as nice-to-have                | Orphan rate drifts up silently; eventually most skills are unreachable                        | Graph maintenance is a quality gate; CI should fail on degraded connectivity                            |
| **AI-inferred runtime edges** — letting an LLM "infer" relations on every rebuild | Graph drifts non-deterministically; routing layer cannot trust it                             | Use deterministic signals at synthesis time; use AI only as an _authoring suggestion_ the human accepts |
| **Ignoring cross-graph edges** — only maintaining the skill graph                 | Skills reference scripts and memory references skills, but those edges are unmaintained       | Map all four graphs and the cross-graph edges between them                                              |
| **Boundary-as-adjacency** — putting topical neighbours in `boundary`              | Hijacks the neighbour's positive cases; depresses its routing-eval                            | Use `related` for neighbours; reserve `boundary` for genuine routing-exclusion                          |

## Verification

- [ ] All four graphs in the workspace are named and have an authoritative source-of-truth file
- [ ] Cross-graph edges are explicit (skill → script, skill → memory, doc-routing → doc, script → command) — not implicit
- [ ] Graph rebuild is deterministic — same input artefacts produce identical edge set on every run
- [ ] Orphan rate is below 10%; orphans above the threshold have been triaged by blast radius
- [ ] Average degree is above 5; max degree is below 30; cluster count is 1 (or small with explicit reason)
- [ ] Edge-type discipline is enforced — `adjacent` ≤ 5, `boundary` ≤ 5, `verify_with` ≤ 3 per skill
- [ ] `boundary` is used for routing-exclusion only, not for "see also"
- [ ] The change-propagation checklist has been applied for the most recent significant change, end-to-end across all four graphs
- [ ] CI (or an equivalent gate) fails the merge when connectivity, orphan rate, or max degree breaches the healthy bands

## Do NOT Use When

| Use instead            | When                                                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `skill-scaffold`       | Authoring or restructuring a single SKILL.md — the per-skill craft, not the whole-graph architecture                                |
| `skill-infrastructure` | Running the live skill library tooling — census, overlap detection, routing-gap reporting, drift checks on individual skills        |
| `skill-infrastructure` | Validating that one skill's frontmatter matches the schema and its relation targets exist                                           |
| `skill-router`         | Deciding which skill activates for a specific query at dispatch time — that is the _consumer_ of this graph, not the graph's design |
| `documentation`        | Writing the prose of a single document for a human reader — the change-propagation framework here is upstream                       |
| `code-review`          | Reviewing AI-generated code — orthogonal concern                                                                                    |
