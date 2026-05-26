---
name: ontology-modeling
description: "Use when formalizing domain meaning with classes, properties, constraints, RDF/OWL-style semantics, SHACL-like validation shapes, or reasoning-ready axioms. Do NOT use for simple category trees (use `taxonomy-design`), pre-implementation business entity sketches (use `conceptual-modeling`), database schemas (use `data-modeling`), or broad representation choice (use `knowledge-modeling`)."
license: MIT
compatibility:
  notes: "Portable ontology modeling guidance; implementation can be Markdown, RDF, JSON-LD, OWL, SHACL, or an internal schema language."
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
  domain: foundations/ontology
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
  keywords: "[\"ontology modeling\",\"formal semantics\",\"RDF\",\"OWL\",\"JSON-LD\",\"SHACL\",\"class axioms\",\"property domains\",\"property ranges\",\"disjoint classes\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"we need class and property definitions that another system can reason over, not just a human-readable diagram\",\"should Customer and Organization be disjoint classes in this ontology?\",\"define property domains and ranges for our skill graph export\",\"turn this conceptual model into a machine-checkable ontology without inventing database tables\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"make a simple browse category tree for skills\",\"identify the business entities and relationships before implementation\",\"design the SQL tables, keys, and indexes\",\"choose whether this knowledge belongs in rules, frames, a graph, or a hybrid\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"boundary\":[{\"skill\":\"taxonomy-design\",\"reason\":\"taxonomy-design owns informal classification and facets; ontology-modeling owns formal semantics\"},{\"skill\":\"conceptual-modeling\",\"reason\":\"conceptual-modeling is stakeholder-readable domain analysis; ontology-modeling is machine-checkable semantic formalization\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling owns persistence structure and constraints; ontology-modeling owns meaning constraints\"},{\"skill\":\"knowledge-modeling\",\"reason\":\"knowledge-modeling chooses the representation paradigm; ontology-modeling applies one formal paradigm\"}],\"related\":[\"semantic-relations\",\"taxonomy-design\",\"knowledge-modeling\"],\"depends_on\":[\"semantic-relations\"],\"verify_with\":[\"semantic-relations\",\"conceptual-modeling\"]}"
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
    Ontology modeling is the discipline of *formalizing the meaning of a domain* into classes, properties, and axioms whose semantics is precise enough for *automated reasoning, validation, or cross-system interoperability*. Drawing from Aristotle's categories, Gruber's information-systems definition ("a specification of a conceptualization"), and Guarino's formal-ontology tradition, it treats meaning as something that can be *specified* — a commitment to a conceptualization — and the specification as a *contract that downstream consumers can compute over*. Outputs: class hierarchies, object/data properties with domain/range, cardinality constraints, equivalence and disjointness axioms, identity criteria, controlled vocabularies, validation shapes (SHACL), interop-oriented JSON-LD/RDF projection.

    *Method*: identify competency questions (what must the ontology answer or validate?), separate classes/instances/literals, define properties with domain/range/direction/cardinality, add equivalence and disjointness only when the claim is durable, reuse existing vocabularies where they fit, validate against positive *and* negative instance examples, document open-world vs closed-world assumptions. *Implementation surfaces*: Markdown with conventions for sketches; RDFS for lightweight class hierarchies; OWL 2 (profiles: EL, QL, RL — each trading expressiveness for reasoning tractability) for formal axioms with automated reasoning; SHACL for closed-world validation shapes; JSON-LD for web-native serialization. *OntoClean methodology* (Guarino & Welty): meta-properties — rigidity, unity, identity, dependence — for evaluating subclass-relation correctness.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces "informal taxonomy plus prose conventions" with formal axiomatization when *ambiguity, interoperability, validation, or reasoning matter*. Solves the problem that without formal semantics, two systems claiming to share a vocabulary may *disagree on what the vocabulary means* — the same class name carrying different membership criteria, the same property carrying different domain or range, the same hierarchy carrying different inheritance semantics. Most teams do not need OWL — they need clear conceptual models and controlled vocabularies. *Escalate to ontology when another consumer must compute over the semantics, validate instances against constraints, or align meaning across systems*. The ontology must *preserve business meaning while stating which inferences are allowed*. A vague ontology is worse than no ontology because it gives false confidence to downstream tools that compute over it; the resulting incorrect inferences are harder to diagnose than the absence of any formalism.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from taxonomy-design, which owns *informal classification and facets* — human-governed category trees, browse taxonomies, SKOS broader/narrower; this skill owns *formal semantics* with axioms and reasoning constraints. Distinct from conceptual-modeling, which is *stakeholder-readable domain analysis* (entities and relationships with humans, before any formalism) — this skill is *machine-checkable semantic formalization*. Distinct from data-modeling, which owns persistence structure and constraints (tables, FKs, indexes) — this skill owns *meaning constraints* (class/property axioms, validation shapes). Distinct from knowledge-modeling, which chooses the *representation paradigm* (graph/frames/rules/hybrid) — this skill *applies one formal paradigm* once chosen. Distinct from semantic-relations, which types individual relation edges — this skill is the formalization layer above.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "An ontology is to a domain model what an engineering tolerance specification is to a manufactured part — the part might fit at +/-0.5mm informally (taxonomy, conceptual model), but if another factory must mass-produce a counterpart that mates with it, both factories need a tolerance spec that says *exactly* what 'fits' means in microns. The spec is more expensive to write than the napkin sketch, but it is the artefact that lets two shops produce interlocking parts without ever talking to each other."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that *every domain model should become an ontology* — that formalization is universally better. It is not. Ontology modeling is *only worth its cost when ambiguity, interoperability, validation, or reasoning matter*; most teams need clear conceptual models and controlled vocabularies, not OWL axioms. Adjacent misconceptions: that *more formal expressiveness is always better* (it is not — Baader et al.'s *Description Logic Handbook* documents the expressiveness-tractability trade-off rigorously: OWL DL is more expressive than OWL EL, but EL admits polynomial-time reasoning that DL does not; choose the profile that fits the reasoning task); that *disjointness claims are safe by default* (they are not — disjointness is a durable commitment; "Customer and Organization are disjoint" forbids legitimate cases where one entity is both, and the inference is *load-bearing for the consumer's reasoning*); that *synonyms are duplicate classes* (they are not — they should be *aliases* via `owl:sameAs` or `skos:altLabel`, not separate classes with overlapping membership); that *the open-world vs closed-world assumption is implicit* (it is not — RDF/OWL is open-world by default ["absence of a fact is not evidence of falsehood"]; many consumer applications assume closed-world ["if it's not in the database, it doesn't exist"]; the assumption *must be documented* or downstream reasoning produces wrong answers); and that *the ontology is the system* (it is not — the ontology is one artefact; the system also has data, code, and user-facing behaviour, and the ontology only governs the slice where formal semantics genuinely matter).
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"Ontology modeling is the discipline of formalizing the meaning of a domain into classes, properties, and axioms whose semantics is precise enough for automated reasoning, validation, or cross-system interoperability. Drawing from Aristotle's categories, Gruber's information-systems definition of ontology, and Guarino's formal ontology tradition, it treats meaning as something that can be specified — a *commitment to a conceptualization* — and the specification as a contract that downstream consumers can compute over.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/ontology-modeling/SKILL.md
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

# Ontology Modeling

## Coverage

Formalize domain meaning into classes, properties, constraints, and axioms. Covers class hierarchy, object/data properties, domain/range, cardinality constraints, equivalence, disjointness, identity, controlled vocabularies, validation shapes, and interop-oriented JSON-LD/RDF projection. The output may be an actual ontology file or a precise ontology sketch before implementation.

## Philosophy

Ontology modeling is only worth its cost when ambiguity, interoperability, validation, or reasoning matter. Most teams do not need OWL. They need clear conceptual models and controlled vocabularies. Escalate to ontology when another consumer must compute over the semantics, validate instances against constraints, or align meaning across systems.

The ontology must preserve business meaning while stating which inferences are allowed. A vague ontology is worse than no ontology because it gives false confidence to downstream tools.

## Method

1. Identify competency questions: what must the ontology answer or validate?
2. Separate classes, instances, and literals.
3. Define properties with domain, range, direction, and cardinality where needed.
4. Add equivalence and disjointness only when the claim is durable.
5. Reuse existing vocabularies where they fit; do not rename standards for style.
6. Validate against positive and negative instance examples.
7. Document open-world vs closed-world assumptions.

## Verification

- [ ] Every class exists to answer a competency question
- [ ] Property domain and range are explicit where consumers depend on them
- [ ] Disjointness claims are intentional and tested with counterexamples
- [ ] Synonyms are aliases, not duplicate classes
- [ ] The model distinguishes class, instance, and literal values
- [ ] Validation examples include invalid cases
- [ ] Reasoning assumptions are stated

## Do NOT Use When

| Use instead | When |
|---|---|
| `taxonomy-design` | You need a human-governed category tree or facets, not formal axioms. |
| `conceptual-modeling` | You are still discovering business entities and relationships with stakeholders. |
| `data-modeling` | You need persistence schema, keys, indexes, or denormalization decisions. |
| `semantic-relations` | You only need to choose the relation type between concepts. |

## Key Sources

- Gruber, T. R. (1993). "A Translation Approach to Portable Ontology Specifications." *Knowledge Acquisition*, 5(2), 199-220. The canonical definition of ontology as "a specification of a conceptualization"; the modern grounding of formal ontology in information systems.
- Guarino, N. (1998). "Formal Ontology and Information Systems." In *Proceedings of FOIS '98*. IOS Press. The methodological foundation for evaluating ontologies; the discipline of distinguishing ontology from taxonomy by the presence of formal axioms.
- Guarino, N., & Welty, C. (2002). "Evaluating ontological decisions with OntoClean." *Communications of the ACM*, 45(2), 61-65. The OntoClean methodology: meta-properties (rigidity, unity, identity, dependence) for evaluating subclass-relation correctness.
- Baader, F., Calvanese, D., McGuinness, D. L., Nardi, D., & Patel-Schneider, P. F. (Eds.). (2003). *The Description Logic Handbook*. Cambridge University Press. The canonical reference for the formal foundations of OWL: syntax, semantics, complexity, and reasoning algorithms.
- W3C. [OWL 2 Web Ontology Language: Document Overview (Second Edition)](https://www.w3.org/TR/owl2-overview/). The normative specification of OWL 2 and its profiles (EL, QL, RL).
- W3C. [RDF Schema 1.1](https://www.w3.org/TR/rdf-schema/). The minimal RDFS vocabulary used as the lightweight precursor to OWL.
- W3C. [Shapes Constraint Language (SHACL)](https://www.w3.org/TR/shacl/). The validation companion to OWL: closed-world validation shapes for RDF data.
- Sowa, J. F. (2000). *Knowledge Representation: Logical, Philosophical, and Computational Foundations*. Brooks/Cole. Comprehensive synthesis covering description logics, conceptual graphs, and the historical lineage from Aristotle to modern formal ontology.
- Smith, B. (2004). "Beyond Concepts: Ontology as Reality Representation." In *Proceedings of FOIS 2004*. The realist position on ontology: ontologies represent what exists in the world, not just what is in someone's head. Foundation for upper ontologies like BFO.
- Noy, N. F., & McGuinness, D. L. (2001). ["Ontology Development 101: A Guide to Creating Your First Ontology."](https://protege.stanford.edu/publications/ontology_development/ontology101.pdf) Stanford KSL Technical Report. The widely-cited practitioner methodology for ontology authoring.
