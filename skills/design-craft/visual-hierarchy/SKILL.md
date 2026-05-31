---
name: visual-hierarchy
description: "Use when establishing visual hierarchy — type scale ratios, spacing rhythm, contrast as ordering signal, weight and size as importance, and the layered relationship between primary, secondary, and tertiary information. Do NOT use for content writing, information architecture, or specific color palette construction."
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
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Establishing visual hierarchy — type-scale ratios, spacing rhythm, contrast as an ordering signal, weight and size as importance cues, and the layered relationship between primary, secondary, and tertiary information. Portable across any visual interface; principle-grounded, not repo-bound. Excludes content writing, information architecture, and specific color-palette construction (color-system-design)."
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
  keywords: "[\"visual hierarchy\",\"hierarchical type sizing\",\"proximity hierarchy\",\"contrast hierarchy\",\"importance ordering\",\"reading order\",\"focal point\",\"figure ground\",\"gestalt principles\",\"hierarchy through weight\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"visual hierarchy\",\"type as hierarchy\",\"what should the eye go to first\",\"establishing focus\",\"page hierarchy\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"Decide the H1/H2/H3 size ratios and weight contrast for a long-form article layout\",\"Reduce visual noise on a dashboard where every element competes for attention\",\"Establish a clear primary call-to-action on a page with multiple secondary actions\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"Write the H1 copy that should appear at the top of the landing page\",\"Choose between sans-serif and serif typefaces for the brand\",\"Pick the brand's primary color\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"typography-system\",\"color-system-design\",\"layout-composition\",\"visual-design-foundations\"],\"boundary\":[{\"skill\":\"typography-system\",\"reason\":\"typography-system defines the scale and the typefaces; this skill decides how to deploy them as hierarchy signals on a given surface.\"},{\"skill\":\"layout-composition\",\"reason\":\"layout-composition handles grid, alignment, and spatial structure; this skill handles the prioritization within a layout.\"}]}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/visual-hierarchy/SKILL.md
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

# Visual Hierarchy

## Coverage
Visual hierarchy is the ordering of perceptual prominence that tells a reader what to look at first, second, and third. The available signals are scale (larger draws attention before smaller), weight (heavier strokes draw attention before lighter), contrast (higher contrast against the background reads before lower), color (saturated and warm colors read before desaturated and cool), position (top-left in left-to-right reading cultures reads first; centered isolated elements break flow and draw focus), and isolation (whitespace around an element increases its prominence regardless of its intrinsic properties).

Type scale operationalizes scale as hierarchy. Modular scales — pairs of values related by a ratio (1.125 major second, 1.2 minor third, 1.25 major third, 1.333 perfect fourth, 1.414 augmented fourth, 1.5 perfect fifth, 1.618 golden ratio) — produce step sizes that feel intentional. The ratio chosen determines the perceptual distance between levels: a 1.125 ratio gives subtle hierarchy useful for content-dense interfaces; a 1.5 ratio gives loud hierarchy useful for marketing surfaces. Most production systems use 5–7 type sizes; more sizes dilute hierarchy by giving the reader too many similar steps.

Spacing creates hierarchy through proximity (Gestalt's law of proximity — items closer together read as grouped, items further apart read as separate) and through breathing room (an element with more whitespace around it reads as more important). Vertical rhythm — a consistent baseline grid that spacing values snap to — reinforces grouping without explicit dividers and makes the page feel calmer because the eye finds predictable resting points.

Contrast as ordering is more general than color contrast. Two equal-sized headlines can be ordered by weight (bold reads before regular), by color (filled black reads before mid-gray), or by treatment (underlined or boxed reads before plain). The principle: when two elements compete for attention, increase the difference along one dimension rather than incrementing many dimensions slightly. Loud-loud combinations exhaust the reader; one loud against many quiet directs them.

## Philosophy
Hierarchy is what you suppress, not what you amplify. Making one thing important by making everything else louder produces a flat, noisy surface where nothing is important. The discipline is restraint: most elements should be quiet so the few that need to be loud can be heard.

Reading order is a property of the page, not just the markup. CSS source order, visual size, color contrast, and position all participate. When they disagree — a giant pull quote in the middle of an article, an overlay button that contrasts more than the page title — the reader's eye follows the visual cues regardless of the writer's intent. Verify hierarchy by asking what someone notices first, second, and third without reading.

## Verification
- Squinting at the surface (or rendering it at low resolution) reveals an unambiguous order of attention; the intended first element is the first noticed.
- Type scale uses at most 7 sizes; each level differs from its neighbor enough to register as different at a glance.
- Whitespace around a primary element is larger than whitespace around its neighbors, not equal to them.
- A grayscale screenshot retains the intended hierarchy; if hierarchy collapses without color, the design is over-reliant on hue.
- Primary calls to action appear at most once per view; if two CTAs are present, one is visibly secondary in weight or fill.
- Adjacent elements at the same hierarchy level share scale, weight, and color treatment; deviations are deliberate and signal a meaningful difference.
- Reading the page aloud in the order the eye lands on elements matches the order intended by the content.

## Do NOT Use When
- The task is writing the copy itself rather than ordering it visually. Hierarchy without good copy emphasizes the wrong things.
- You are deciding how to structure a site's navigation or content taxonomy. That is information architecture, not visual hierarchy.
- The decision is which typeface to use or which color the brand should adopt. Use typography-system or color-system-design.
- The concern is grid structure, alignment, or column composition. Use layout-composition.
- The accessibility question is contrast ratios for WCAG compliance. Use a11y for the threshold; this skill for the design intent.
