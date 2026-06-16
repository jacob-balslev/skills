---
name: taxonomy-design
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when designing a controlled classification system: category trees, facets, browse taxonomies, SKOS broader/narrower relationships, tagging rules, and duplicate-category cleanup. Do NOT use for formal ontology axioms with reasoning constraints (use `ontology-modeling`), broad knowledge-representation choice (use `knowledge-modeling`), or one-off edge typing (use `semantic-relations`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this skill.
compatibility:
  notes: "Portable taxonomy design discipline for skill libraries, product information architecture, documentation trees, and knowledge graphs."
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: knowledge-organization
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # scope: PRD-style free-text statement of what the skill teaches and what it does not.
  # Not an enum (publishability belongs to `public`; project anchoring belongs to `project[]`).
  scope: "Teaches controlled classification systems for categories, facets, browse taxonomies, SKOS broader/narrower links, assignment rules, synonym control, and duplicate-category cleanup. Excludes formal ontology axioms, representation-paradigm choice, single-edge relation typing, and UI-copy/navigation-label writing."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: foundations/classification
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
  # comprehension_state: marker that this skill has populated v6+ Understanding fields
  # (mental_model, purpose, boundary, analogy, misconception). Value: `present` or absent.
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["taxonomy design","controlled vocabulary","browse taxonomy","category hierarchy","facets","tagging rules","broader narrower","SKOS hierarchy","classification cleanup","duplicate categories"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["our skill categories are drifting: some are by domain, some by activity, and some by tool - how should the taxonomy be redesigned?","should these be tags, facets, or child categories?","build a clean category tree for these concepts without making every related term a parent-child relation","we have analytics, observability, telemetry, and monitoring as categories - which should merge and which should stay separate?"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["define OWL class restrictions and property domains for this knowledge base","decide whether this knowledge should be represented as a graph, frame, rules, or hybrid","type this single relation as meronymy, causality, synonymy, or thematic role","write user-facing labels for this navigation item"]
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Taxonomy design is the discipline of constructing a *controlled classification system* — a category tree (possibly augmented by facets) that organizes a set of items so they can be *browsed, found, and reasoned about*. Drawing from Ranganathan's faceted classification (PMEST: Personality, Matter, Energy, Space, Time), Aristotelian genus-species hierarchy, and the W3C SKOS data model, it treats classification as a *retrieval contract* between the system that organizes and the readers who navigate, not as a private mental map of the author.

    *Method*: (1) name the *retrieval tasks* (what questions must the taxonomy answer?); (2) choose *one primary organizing principle* for the tree — domain, activity, artifact, lifecycle, or risk; (3) move secondary dimensions into *facets or tags*; (4) apply the *substitution test* to every parent-child pair (every child must be a kind of the parent — "every X is a Y"); (5) define *assignment rules* for ambiguous cases; (6) add *canonical labels and aliases* (never let synonyms become sibling categories); (7) test with real items and real prompts (count "misc" buckets, duplicates, and uncertain assignments). *SKOS-grade distinctions*: `broader` / `narrower` for hierarchy, `related` for association, `prefLabel` for canonical terms, `altLabel` for aliases.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces ad-hoc category trees that mirror the author's mental map with classification systems designed for *retrieval by the navigator*. Solves the problem that the main failure mode of taxonomies is *mixing incompatible organizing principles* — categorizing by audience in one branch, by tool in another, by lifecycle phase in a third, by domain in a fourth, by risk in a fifth — producing a tree where related items scatter across distant branches and the navigator must learn the author's idiosyncratic grouping logic before finding anything. The discipline is to prefer *shallow, stable, mutually understandable structure*, add facets when one tree cannot express all valid access paths, and *not turn every semantic relation into a hierarchy*. Bowker & Star's *Sorting Things Out* documents how classifications without explicit retrieval-task analysis become abandoned bureaucratic structure — the lesson generalizes to every taxonomy in software (file folders, skill categories, navigation trees, tag systems, knowledge-graph categories).
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  concept_boundary: |
    Distinct from ontology-modeling, which owns *formal axioms and reasoning semantics* — this skill owns *human-governed classification*; ontology is formalization, taxonomy is organization. Distinct from knowledge-modeling, which *chooses the representation paradigm* (graph/frames/rules/hybrid) — this skill *works inside the classification paradigm once chosen*. Distinct from semantic-relations, which *types individual concept edges* (IS-A, PART-OF, thematic) — this skill *governs the category system and assignment rules*. Distinct from information-architecture, which arranges pages/navigation/labels/wayfinding for a *user-facing experience* — this skill is the *underlying classification structure* that information architecture surfaces. Distinct from folksonomies (emergent user tagging — different governance model with different trade-offs; folksonomies are bottom-up, taxonomies are top-down-controlled).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Taxonomy design is to a knowledge surface what a public library's call-number system is to its collection — the books haven't changed, but the system determines which books a researcher finds when looking under 'biology' versus 'medicine' versus 'public health.' A library that categorizes by acquisition date (the author's mental map) is unfindable; one that categorizes by subject with cross-references and facet headings (retrieval contract for the navigator) is searchable. Dewey Decimal is a hierarchy with facet-like subdivisions; Library of Congress is more faceted; both are taxonomies, both have explicit retrieval-task analyses behind their structure."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that *taxonomy = hierarchy* — that classification means choosing a tree and assigning items to it. It does not. Adjacent misconceptions: that *deeper hierarchies are better organized* (they are not — shallow trees with facets often outperform deep trees because the navigator scans fewer levels; Ranganathan's faceted classification is the alternative to strict hierarchies); that *mixing organizing principles is fine* (it is not — sibling categories must share the same organizing principle, or the navigator cannot predict where items will be; "by domain, then by tool, then by lifecycle" mixed within one tree produces unpredictable placement); that *synonyms can be sibling categories* (they cannot — synonyms must be *aliases* via `skos:altLabel` pointing to one canonical `skos:prefLabel`; otherwise the same concept duplicates and items split across both); that *every semantic relation belongs in the hierarchy* (it does not — `related_to` and other associative relations are *not* hierarchy; only IS-A passes the substitution test for parent-child placement); that *catch-all "misc" buckets are acceptable* (they are not — they signal that the classification's primary organizing principle doesn't cover the items, and the right response is *either* adjusting the principle *or* identifying a new top-level category, never adding "misc" and moving on); and that *taxonomies are static* (they are not — they require governance: assignment-rule documentation, periodic audits for drift, alias maintenance as terminology evolves).
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/knowledge-organization/taxonomy-design/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
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
  # semantic-debt: scope — author via /audit:* (schema_version intentionally NOT bumped until earned)
relations:
  related: ["skill-infrastructure","information-architecture","context-graph","canonical-repo-structure","conceptual-modeling"]
  suppresses: ["ontology-modeling","knowledge-modeling","semantic-relations"]
  verify_with: ["context-graph","semantic-relations"]
  depends_on: ["semantic-relations"]
---
# Taxonomy Design

## Concept of the skill

Taxonomy design is the discipline of constructing a *controlled classification system* — a category tree (possibly augmented by facets) that organizes a set of items so they can be *browsed, found, and reasoned about*. Drawing from Ranganathan's faceted classification (PMEST: Personality, Matter, Energy, Space, Time), Aristotelian genus-species hierarchy, and the W3C SKOS data model, it treats classification as a *retrieval contract* between the system that organizes and the readers who navigate, not as a private mental map of the author.

Replaces ad-hoc category trees that mirror the author's mental map with classification systems designed for *retrieval by the navigator*. Solves the problem that the main failure mode of taxonomies is *mixing incompatible organizing principles* — categorizing by audience in one branch, by tool in another, by lifecycle phase in a third, by domain in a fourth, by risk in a fifth — producing a tree where related items scatter across distant branches and the navigator must learn the author's idiosyncratic grouping logic before finding anything. The discipline is to prefer *shallow, stable, mutually understandable structure*, add facets when one tree cannot express all valid access paths, and *not turn every semantic relation into a hierarchy*. Bowker & Star's *Sorting Things Out* documents how classifications without explicit retrieval-task analysis become abandoned bureaucratic structure — the lesson generalizes to every taxonomy in software (file folders, skill categories, navigation trees, tag systems, knowledge-graph categories).

Distinct from ontology-modeling, which owns *formal axioms and reasoning semantics* — this skill owns *human-governed classification*; ontology is formalization, taxonomy is organization. Distinct from knowledge-modeling, which *chooses the representation paradigm* (graph/frames/rules/hybrid) — this skill *works inside the classification paradigm once chosen*. Distinct from semantic-relations, which *types individual concept edges* (IS-A, PART-OF, thematic) — this skill *governs the category system and assignment rules*. Distinct from information-architecture, which arranges pages/navigation/labels/wayfinding for a *user-facing experience* — this skill is the *underlying classification structure* that information architecture surfaces. Distinct from folksonomies (emergent user tagging — different governance model with different trade-offs; folksonomies are bottom-up, taxonomies are top-down-controlled). Taxonomy design is to a knowledge surface what a public library's call-number system is to its collection — the books haven't changed, but the system determines which books a researcher finds when looking under 'biology' versus 'medicine' versus 'public health.' A library that categorizes by acquisition date (the author's mental map) is unfindable; one that categorizes by subject with cross-references and facet headings (retrieval contract for the navigator) is searchable. Dewey Decimal is a hierarchy with facet-like subdivisions; Library of Congress is more faceted; both are taxonomies, both have explicit retrieval-task analyses behind their structure. The wrong mental model is that *taxonomy = hierarchy* — that classification means choosing a tree and assigning items to it. It does not. Adjacent misconceptions: that *deeper hierarchies are better organized* (they are not — shallow trees with facets often outperform deep trees because the navigator scans fewer levels; Ranganathan's faceted classification is the alternative to strict hierarchies); that *mixing organizing principles is fine* (it is not — sibling categories must share the same organizing principle, or the navigator cannot predict where items will be; "by domain, then by tool, then by lifecycle" mixed within one tree produces unpredictable placement); that *synonyms can be sibling categories* (they cannot — synonyms must be *aliases* via `skos:altLabel` pointing to one canonical `skos:prefLabel`; otherwise the same concept duplicates and items split across both); that *every semantic relation belongs in the hierarchy* (it does not — `related_to` and other associative relations are *not* hierarchy; only IS-A passes the substitution test for parent-child placement); that *catch-all "misc" buckets are acceptable* (they are not — they signal that the classification's primary organizing principle doesn't cover the items, and the right response is *either* adjusting the principle *or* identifying a new top-level category, never adding "misc" and moving on); and that *taxonomies are static* (they are not — they require governance: assignment-rule documentation, periodic audits for drift, alias maintenance as terminology evolves).

## Coverage

Design controlled classification systems for skills, docs, product catalogs, navigation trees, knowledge graphs, and tags. Covers hierarchy shape, facet selection, synonym control, category granularity, assignment rules, governance, and drift cleanup. Use SKOS-grade distinctions: broader/narrower for hierarchy, related for association, preferred labels for canonical terms, alternate labels for aliases.

## Philosophy of the skill
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
