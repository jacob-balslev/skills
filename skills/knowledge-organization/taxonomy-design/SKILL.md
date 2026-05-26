---
name: taxonomy-design
description: "Use when designing a controlled classification system: category trees, facets, browse taxonomies, SKOS broader/narrower relationships, tagging rules, and duplicate-category cleanup. Do NOT use for formal ontology axioms with reasoning constraints (use `ontology-modeling`), broad knowledge-representation choice (use `knowledge-modeling`), or one-off edge typing (use `semantic-relations`)."
license: MIT
compatibility:
  notes: "Portable taxonomy design discipline for skill libraries, product information architecture, documentation trees, and knowledge graphs."
allowed-tools: Read Grep
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
  category: foundations

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: knowledge-organization
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: foundations/classification
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: portable
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-16"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-16\"}"

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
  keywords: "[\"taxonomy design\",\"controlled vocabulary\",\"browse taxonomy\",\"category hierarchy\",\"facets\",\"tagging rules\",\"broader narrower\",\"SKOS hierarchy\",\"classification cleanup\",\"duplicate categories\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"our skill categories are drifting: some are by domain, some by activity, and some by tool - how should the taxonomy be redesigned?\",\"should these be tags, facets, or child categories?\",\"build a clean category tree for these concepts without making every related term a parent-child relation\",\"we have analytics, observability, telemetry, and monitoring as categories - which should merge and which should stay separate?\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"define OWL class restrictions and property domains for this knowledge base\",\"decide whether this knowledge should be represented as a graph, frame, rules, or hybrid\",\"type this single relation as meronymy, causality, synonymy, or thematic role\",\"write user-facing labels for this navigation item\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"ontology-modeling\",\"reason\":\"ontology-modeling owns formal axioms and reasoning semantics; taxonomy-design owns human-governed classification\"},{\"skill\":\"knowledge-modeling\",\"reason\":\"knowledge-modeling chooses the representation paradigm; taxonomy-design works inside the classification paradigm once chosen\"},{\"skill\":\"semantic-relations\",\"reason\":\"semantic-relations types individual concept edges; taxonomy-design governs the category system and assignment rules\"}],\"related\":[\"information-architecture\",\"skill-infrastructure\",\"context-graph\"],\"depends_on\":[\"semantic-relations\"],\"verify_with\":[\"semantic-relations\",\"context-graph\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":365,\"review_cadence\":\"quarterly\"}"

  # === v6+ Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Taxonomy design is the discipline of constructing a *controlled classification system* — a category tree (possibly augmented by facets) that organizes a set of items so they can be *browsed, found, and reasoned about*. Drawing from Ranganathan's faceted classification (PMEST: Personality, Matter, Energy, Space, Time), Aristotelian genus-species hierarchy, and the W3C SKOS data model, it treats classification as a *retrieval contract* between the system that organizes and the readers who navigate, not as a private mental map of the author.

    *Method*: (1) name the *retrieval tasks* (what questions must the taxonomy answer?); (2) choose *one primary organizing principle* for the tree — domain, activity, artifact, lifecycle, or risk; (3) move secondary dimensions into *facets or tags*; (4) apply the *substitution test* to every parent-child pair (every child must be a kind of the parent — "every X is a Y"); (5) define *assignment rules* for ambiguous cases; (6) add *canonical labels and aliases* (never let synonyms become sibling categories); (7) test with real items and real prompts (count "misc" buckets, duplicates, and uncertain assignments). *SKOS-grade distinctions*: `broader` / `narrower` for hierarchy, `related` for association, `prefLabel` for canonical terms, `altLabel` for aliases.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces ad-hoc category trees that mirror the author's mental map with classification systems designed for *retrieval by the navigator*. Solves the problem that the main failure mode of taxonomies is *mixing incompatible organizing principles* — categorizing by audience in one branch, by tool in another, by lifecycle phase in a third, by domain in a fourth, by risk in a fifth — producing a tree where related items scatter across distant branches and the navigator must learn the author's idiosyncratic grouping logic before finding anything. The discipline is to prefer *shallow, stable, mutually understandable structure*, add facets when one tree cannot express all valid access paths, and *not turn every semantic relation into a hierarchy*. Bowker & Star's *Sorting Things Out* documents how classifications without explicit retrieval-task analysis become abandoned bureaucratic structure — the lesson generalizes to every taxonomy in software (file folders, skill categories, navigation trees, tag systems, knowledge-graph categories).
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from ontology-modeling, which owns *formal axioms and reasoning semantics* — this skill owns *human-governed classification*; ontology is formalization, taxonomy is organization. Distinct from knowledge-modeling, which *chooses the representation paradigm* (graph/frames/rules/hybrid) — this skill *works inside the classification paradigm once chosen*. Distinct from semantic-relations, which *types individual concept edges* (IS-A, PART-OF, thematic) — this skill *governs the category system and assignment rules*. Distinct from information-architecture, which arranges pages/navigation/labels/wayfinding for a *user-facing experience* — this skill is the *underlying classification structure* that information architecture surfaces. Distinct from folksonomies (emergent user tagging — different governance model with different trade-offs; folksonomies are bottom-up, taxonomies are top-down-controlled).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Taxonomy design is to a knowledge surface what a public library's call-number system is to its collection — the books haven't changed, but the system determines which books a researcher finds when looking under 'biology' versus 'medicine' versus 'public health.' A library that categorizes by acquisition date (the author's mental map) is unfindable; one that categorizes by subject with cross-references and facet headings (retrieval contract for the navigator) is searchable. Dewey Decimal is a hierarchy with facet-like subdivisions; Library of Congress is more faceted; both are taxonomies, both have explicit retrieval-task analyses behind their structure."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that *taxonomy = hierarchy* — that classification means choosing a tree and assigning items to it. It does not. Adjacent misconceptions: that *deeper hierarchies are better organized* (they are not — shallow trees with facets often outperform deep trees because the navigator scans fewer levels; Ranganathan's faceted classification is the alternative to strict hierarchies); that *mixing organizing principles is fine* (it is not — sibling categories must share the same organizing principle, or the navigator cannot predict where items will be; "by domain, then by tool, then by lifecycle" mixed within one tree produces unpredictable placement); that *synonyms can be sibling categories* (they cannot — synonyms must be *aliases* via `skos:altLabel` pointing to one canonical `skos:prefLabel`; otherwise the same concept duplicates and items split across both); that *every semantic relation belongs in the hierarchy* (it does not — `related_to` and other associative relations are *not* hierarchy; only IS-A passes the substitution test for parent-child placement); that *catch-all "misc" buckets are acceptable* (they are not — they signal that the classification's primary organizing principle doesn't cover the items, and the right response is *either* adjusting the principle *or* identifying a new top-level category, never adding "misc" and moving on); and that *taxonomies are static* (they are not — they require governance: assignment-rule documentation, periodic audits for drift, alias maintenance as terminology evolves).
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"Taxonomy design is the discipline of constructing a controlled classification system — a category tree (possibly augmented by facets) that organizes a set of items so they can be browsed, found, and reasoned about. Drawing from Ranganathan's faceted classification, Aristotelian genus-species hierarchy, and the SKOS data model, it treats classification as a *retrieval contract* between the system that organizes and the readers who navigate, not as a private mental map of the author.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/taxonomy-design/SKILL.md
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

# Taxonomy Design

## Coverage

Design controlled classification systems for skills, docs, product catalogs, navigation trees, knowledge graphs, and tags. Covers hierarchy shape, facet selection, synonym control, category granularity, assignment rules, governance, and drift cleanup. Use SKOS-grade distinctions: broader/narrower for hierarchy, related for association, preferred labels for canonical terms, alternate labels for aliases.

## Philosophy

A taxonomy is a retrieval contract. It should make things findable by the people or agents who browse it, not mirror the author's private mental map. The main failure mode is mixing incompatible organizing principles: by audience, by tool, by lifecycle phase, by domain, and by risk all in the same tree.

Prefer shallow, stable, mutually understandable structure. Add facets when one tree cannot express all valid access paths. Do not turn every semantic relation into a hierarchy.

## Method

1. Name the retrieval tasks: what questions must the taxonomy answer?
2. Choose one primary organizing principle for the tree: domain, activity, artifact, lifecycle, or risk.
3. Move secondary dimensions into facets or tags.
4. Apply the substitution test to every parent-child pair: every child must be a kind of the parent.
5. Define assignment rules for ambiguous cases.
6. Add canonical labels and aliases; never let synonyms become sibling categories.
7. Test with real items and real prompts; count "misc", duplicates, and uncertain assignments.

## Verification

- [ ] Every child category passes the IS-A substitution test against its parent
- [ ] Sibling categories share the same organizing principle
- [ ] Cross-cutting concerns are facets/tags, not duplicated branches
- [ ] Canonical labels and aliases are explicit
- [ ] Ambiguous assignment rules are written down
- [ ] No category exists only because one item needed somewhere to go
- [ ] Real items can be placed without using a catch-all bucket

## Do NOT Use When

| Use instead | When |
|---|---|
| `ontology-modeling` | You need formal class/property axioms, RDF/OWL semantics, or automated reasoning. |
| `knowledge-modeling` | You are still choosing between graph, frame, rule, concept-map, or hybrid representations. |
| `semantic-relations` | You only need to type the relation between two concepts. |
| `information-architecture` | You are arranging pages, navigation, labels, and wayfinding for a user-facing experience. |

## Key Sources

- Ranganathan, S. R. (1933/1962). *Colon Classification* and *Prolegomena to Library Classification* (3rd ed.). Asia Publishing House. The foundational statement of faceted classification and the PMEST formula (Personality / Matter / Energy / Space / Time); the alternative to strict hierarchical trees that all modern multi-criteria classification descends from.
- W3C. [SKOS Simple Knowledge Organization System Reference](https://www.w3.org/TR/skos-reference/) (2009). The standard data model for taxonomies and thesauri: broader/narrower/related, prefLabel/altLabel, and the minimal formalism required for transmissible classification.
- Bowker, G. C., & Star, S. L. (1999). *Sorting Things Out: Classification and Its Consequences*. MIT Press. The canonical critical study of how classifications shape what becomes thinkable; the source of the "boundary infrastructure" framing and the empirical evidence that taxonomies without explicit retrieval-task analysis become abandoned bureaucratic structure.
- Hjørland, B. (2008). "What is Knowledge Organization (KO)?" *Knowledge Organization*, 35(2-3), 86-101. Authoritative survey of the field; situates taxonomy design within library and information science.
- Aristotle. *Categories* (c. 350 BCE). The philosophical root of hierarchical classification: genus-species definitions, the predicables, and the structure that two and a half millennia of taxonomy work has built on or against.
- Vander Wal, T. (2005). ["Folksonomy."](https://vanderwal.net/folksonomy.html) The coinage and definition of folksonomy; the alternative to controlled vocabulary and the trade-offs that come with emergent tagging.
- Morville, P., & Rosenfeld, L. (2006). *Information Architecture for the World Wide Web* (3rd ed.). O'Reilly. The practitioner reference for taxonomy work in user-facing systems; the bridge from classification to navigation.
- Glushko, R. J. (Ed.). (2013). *The Discipline of Organizing*. MIT Press. Cross-disciplinary synthesis treating classification as a design activity rather than a domain reflection; explicit attention to facet design and retrieval-task analysis.
- Schema.org. [Type Hierarchy](https://schema.org/docs/full.html). A pragmatic large-scale web taxonomy; a real-world example of design choices, facet vs hierarchy decisions, and the costs of governance at scale.
