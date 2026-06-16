---
# name: stable kebab-case skill identifier; must match the parent directory.
name: skill-router
# description: routing contract for when this skill should activate and when it should not.
description: "Use when routing an agent request across multiple skills, building or auditing a routing table, detecting routing coverage gaps, or answering questions like 'which skill handles this?', 'who routes X?', or 'why did skill A activate instead of B?'. Covers trigger-label matching, file-path matching, keyword matching, description-based semantic matching, project-fit filtering, relation-aware co-loading and exclusion, eval/staleness annotations, and coverage-gap detection. Do NOT use when the target skill is already known (load it directly), when authoring a new skill (use `skill-scaffold` instead), or when evaluating a SINGLE skill's quality (use `graph-audit`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this project-grounded skill.
compatibility:
  notes: "Markdown, YAML, any agent runtime"
# allowed-tools: optional runtime hint for tools the skill may use when loaded.
allowed-tools: Read Grep
# grounding: truth sources and failure modes that anchor the skill's claims.
grounding:
  subject_matter: "Skill Graph reference routing behavior"
  grounding_mode: "repo_specific"
  truth_sources:
    - scripts/skill-graph-route.js
    - scripts/skill-graph-routing-eval.js
  failure_modes:
    - negation_paths_score_as_positive_matches
    - routing_eval_claim_without_harness_pass
    - boundary_exclusion_removes_stronger_match
    - coverage_gap_silently_falls_back
  evidence_priority: "repo_code_first"
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: agent-ops
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Routing an agent request across multiple skills — building or auditing a routing table, detecting coverage gaps, and answering 'which skill handles this?' / 'why did skill A activate instead of B?' via trigger-label matching, file-path matching, keyword matching, description-based semantic matching, project-fit filtering, relation-aware co-loading and exclusion, eval/staleness annotations, and coverage-gap detection. Anchored to the Skill Graph routing harness (non-empty project[]); applies wherever a skill library uses this routing system. Excludes loading an already-known target skill directly, authoring a new skill (skill-scaffold), and evaluating a single skill's quality (graph-audit)."
  # project: projects this skill is linked to. Array of {handle, role} objects.
  # Required when the skill is project-anchored. Non-empty `project[]` is the
  # routing-specificity signal `projectFitRank()` keys off (wins a score tie over
  # an ambient skill). Suggested role values: source-of-truth, consumer, mirror.
  project: "[{\"handle\":\"skill-graph\",\"role\":\"source-of-truth\"},{\"handle\":\"skills\",\"role\":\"consumer\"}]"
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: false
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: agent/skill-system
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
  keywords: ["skill routing","skill dispatch","dispatch decision","why did skill","keyword routing","route skill","which skill to use","skill selector","routing table","coverage gap"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["skill-router"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["given an agent request, choose which skill should fire — what's the skill dispatch logic?","build the skill-routing decision table covering every agent request type we see","audit the skill-routing dispatch decision: why did the documentation skill activate when the user asked about a11y?","find the skill-library coverage gaps — which agent requests match no skill at all?"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["author a brand-new skill from scratch","analyze routing-miss patterns across the whole skill library","inspect the context graph that supplies skill co-loading"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #             to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #             see ADR-0018 for rename rationale; replaces deprecated `boundary`) /
  # boundary (DEPRECATED alias for suppresses; router reads `suppresses` first) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Skill routing is a staged dispatch pipeline over a compiled manifest. Each skill contributes activation signals (triggers, path globs, keywords, description), scope signals (`public` and optional `project[]` membership), relation edges (`depends_on`, `verify_with`, `suppresses`, broader/narrower), and health signals. The router scores candidate matches additively (trigger and keyword and path signals accumulate into one weighted score), filters by project, gently boosts certified application verdicts, ranks ties by project-anchoring and legacy type, then applies suppression exclusion and co-loading. The important outcome is not just a winner; it is an explained winner, explained co-loads, explained exclusions, and explicit coverage gaps when no skill should fire.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    This skill prevents agents from guessing which skill to use when multiple skills overlap. It teaches maintainers to make dispatch evidence explicit, to test routing examples and anti-examples, and to surface gaps instead of silently choosing the nearest neighbor. A wrong skill chosen confidently is worse than an explicit missing-skill signal because silent wrong routing gives downstream agents the wrong operating frame while hiding the authoring gap.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  concept_boundary: |
    Distinct from graph-audit, which verifies one skill or manifest surface for schema, relation, and graph consistency; skill-router decides which skill owns an incoming request. Distinct from skill-scaffold, which authors a new skill; skill-router dispatches among existing skills. Distinct from skill-infrastructure, which analyzes library-wide health, routing-miss patterns, and maintenance systems; skill-router owns request-time routing logic and routing-table behavior. Distinct from debugging, which reproduces a concrete bug; skill-router explains dispatch semantics and coverage gaps. Distinct from model routing, which chooses which LLM processes a request; skill-router chooses which skill's methodology the agent should follow, regardless of the underlying model. Distinct from workflow orchestration, which scripts a sequence of subagent runs; skill-router is the one-shot dispatch decision that happens before execution begins.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Skill-router is an air-traffic controller for skills: it reads declared signals, assigns the request to the right runway, calls in required support, and reports when no runway is fit instead of waving the plane toward the nearest lights."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that a router should always pick the nearest skill. It should not. The router should pick a skill only when activation evidence supports ownership; otherwise it should surface a coverage gap. It also should not vote across all surfaces equally: trigger labels, path evidence, keyword evidence, project-anchoring specificity, behavior verdicts, and relation edges each have specific roles and weights in the current Skill Graph routing pipeline. A second misconception is that metadata alone (name, description, keywords) is sufficient at scale: in large, overlapping skill pools the full skill body becomes the decisive routing signal, and descriptions alone cannot substitute for it.
  # grounding: required when non-empty `project[]`. Declares the truth sources
  # the skill anchors to and the failure modes those sources prevent. Omit when the
  # skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
  grounding: "{\"subject_matter\":\"Skill Graph reference routing behavior\",\"grounding_mode\":\"repo_specific\",\"truth_sources\":[\"scripts/skill-graph-route.js\",\"scripts/skill-graph-routing-eval.js\"],\"failure_modes\":[\"negation_paths_score_as_positive_matches\",\"routing_eval_claim_without_harness_pass\",\"boundary_exclusion_removes_stronger_match\",\"coverage_gap_silently_falls_back\"],\"evidence_priority\":\"repo_code_first\"}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/agent-ops/skill-router/SKILL.md
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
relations:
  related: ["debugging","middleware-patterns","graph-audit","context-graph","skill-scaffold"]
  suppresses: ["skill-scaffold","context-graph","skill-infrastructure"]
  verify_with: ["graph-audit","skill-infrastructure"]
---
# Skill Router

## Concept of the skill

**What it is:** `skill-router` is the request-time dispatch discipline for choosing which existing skill should handle an agent request, plus which adjacent skills should be co-loaded or excluded.

**Mental model:** Read the compiled manifest, score activation signals additively, filter by project fit, apply quality and specificity tiebreakers, exclude conflicting ownership, expand dependencies and verification partners, and report coverage gaps instead of guessing.

**Why it exists:** Skill libraries decay when ambiguous requests silently activate the wrong skill. Routing needs explicit evidence and evals so maintainers can see whether the library covers real requests.

**What it is NOT:** It is not a one-skill metadata audit, new-skill authoring guide, library-wide infrastructure health audit, or general debugging workflow. It is also not *model* routing (choosing which LLM handles the request) and not a *workflow orchestrator* (sequencing multi-step subagent runs) — it is the one-shot decision of which skill's methodology the agent should follow before execution begins.

**Adjacent concepts:** `graph-audit` checks one skill or manifest surface; `skill-scaffold` creates new skills; `skill-infrastructure` watches library-wide health and routing-miss patterns; `eval-driven-development` helps design routing evals; `context-graph` supplies the graph context the router consumes.

**One-line analogy:** The router is an air-traffic controller for skills: it assigns the request to the right runway, co-loads support, and says when no runway is fit.

**Common misconception:** A router is not a nearest-neighbor guesser; a no-match result is useful evidence, not a failure to be hidden.

## Coverage

- Routing by keyword pattern: matching inbound query terms to skill `keywords` arrays to identify the best candidate, with stopword filtering and per-token dedup so a keyword bag cannot stuff its way to the top
- Routing by trigger label: matching explicit skill-router labels (`triggers` field) — the highest-weighted activation signal
- Routing by file path: matching touched or mentioned file paths against skill `paths` arrays for file-activated skills, including gitignore-style negation semantics
- Additive scoring and tiebreaking: how the surfaces combine into one weighted score, and how ties resolve through project-anchoring, quality boosts, and legacy type
- Verdict gating: how the four-verdict Audit Status (structural / truth / comprehension / application) hard-blocks broken skills, gates out proven-negative behavior, and rank-boosts certified skills
- Relation-aware co-loading and exclusion: suppression-before-co-loading order, transitive `depends_on`, one-hop `verify_with` and `broader`, and the score-aware suppression guard
- Coverage gaps: detecting when no skill matches a request and how to surface that gap as an authoring signal
- Routing at scale: how deterministic surface-scoring relates to embedding retrieval, LLM-reasoning routing, and retrieve-and-rerank, and where the body (not the metadata) becomes the decisive signal

## Philosophy of the skill
Routing is adversarial against convenience. The tempting move — "if nothing matches exactly, just pick the closest skill and activate it" — is the one that silently degrades every agent that depends on the router. A wrong skill that activates confidently is worse than a coverage gap that surfaces loudly, because silent wrongness has no signal for anyone to fix. The router's job is to produce either a certain winner or an explicit non-answer, never a confident guess.

Five principles follow from that stance:

- **Priority is encoded as weight, not as a short-circuit.** The reference router (`scripts/skill-graph-route.js`) does not stop at the first matching surface. It scores every surface additively into a single number — a trigger hit is +5, a keyword exact-token match is +3, a keyword substring match is +1, a `--path` glob hit is +2 — then ranks by the total. Triggers are weighted highest precisely so a declared label dominates, but the score is cumulative: two precise keyword matches (+6) can outrank a single trigger (+5), and that is intended — convergent evidence should win. The intuition "a declared trigger should decide" holds because of the weight gap, not because evaluation halts.
- **Tiebreakers favor fit and evidence, not popularity.** When total scores tie, a project-anchored skill (non-empty `project[]`) wins over an ambient one only when its declared `project[]` membership fits the active workspace; otherwise a project-anchored skill out of context is *wrong* context, not more specific. Certified `application_verdict` skills get a gentle additive boost, and stale or unverified skills are annotated rather than silently promoted. Never rank by skill age, usage count, or author preference.
- **Explicit coverage gaps beat silent wrong fallback.** If no surface produces a winner, surface the gap to the caller — recommend authoring a new skill or broadening a keyword list. Silent fallback to a default skill is a bug that no test catches, because the misrouted query looks successful to the router but nonsensical to the downstream agent.
- **Load the minimum sufficient context.** Co-loading exists to support the winner, not to pad the result. Pulling in weak matches or walking expansion edges further than the mechanics allow "poisons" the context window with irrelevant instructions and degrades the downstream agent's reasoning. This is why suppression runs before co-loading, why `verify_with` and `broader` are one-hop only, and why `narrower` is never co-loaded.
- **The router is a mapping, not a judge.** It decides which skill owns a query; it does not decide whether the query is well-formed, worth handling, or strategically important. Those are the activated skill's concerns. Overloading the router with domain judgment makes it harder to audit and harder to change.

## Routing Rules

The router scores each candidate skill across the surfaces below, sums the weights into a single score, and ranks. The surfaces are not a stop-at-first-match chain; their *weights* encode priority. Graph edges then explain co-loading, dependency expansion, and exclusions on top of the ranked result.

| Weight | Surface | Field consulted | Match rule |
|---|---|---|---|
| +5 | Trigger label | `triggers` | Exact match against the normalized full query, a retained query token, or a normalized trigger phrase. The dominant signal. |
| +3 | Keyword exact | `keywords` | Each query content-token earns +3 **at most once per skill**, no matter how many keyword phrases contain it — this is the keyword-stuffing guard. Keyword tokens shorter than 3 chars are ignored. |
| +1 | Keyword substring | `keywords` | A query token (≥3 chars) that did **not** earn an exact match, found as a substring of any keyword phrase, earns +1 once. Run as a separate second pass so a substring credit cannot poison a later exact match. |
| +2 | File path | `paths` | Only when the caller passes `--path`. Glob match against the touched path after gitignore-style `!negation` patterns are subtracted. |

**Description semantics is NOT scored by the deterministic harness.** The reference router does not text-match the `description` field; description quality drives routing in the *LLM-reasoning* runtimes described under "Routing at scale" below. Keep `description` a sharp routing contract regardless, because that is the surface that decides routing when a native Agent-Skills runtime — not this deterministic harness — does the dispatch.

### Scoring hygiene

- **Stopwords are dropped from both sides.** Function words (`the`, `this`, `how`, `with`, …) are stripped from the query and from keyword phrases before comparison, so a prompt like "fix this" cannot exact-match every keyword phrase containing "this" and trigger library-wide false positives.
- **Per-token credit is capped.** Each query token contributes at most one exact (+3) or one substring (+1) credit per skill. This is why `keywords` is capped at 10 in the contract: more phrases cannot buy more score for the same token, so padding the array is wasted authoring effort and a routing smell.

### Project-fit and quality gates

Project membership is checked **before** a score is accepted. A skill with a non-empty `project[]` only routes when no project filter is active, or when one of its `project[]` handles matches the active project; otherwise it is excluded by the project filter entirely. On a *score tie*, a project-anchored skill (non-empty `project[]`) outranks an ambient one — project-anchoring, not publishability, is the specificity signal. (The retired `deployment_target` enum and the boolean `public` gate are **not** routing-specificity signals; `public` only governs whether a skill is publishable.)

The router also surfaces quality state. `eval_state` is an **opt-in** gate via `--min-eval-state` (default: no gating), and `lifecycle.stale_after_days` lets the route explanation mark stale skills instead of hiding freshness risk.

### Verdict gating (four-verdict Audit Status — Decision A)

After scoring, the router applies the four-verdict Audit Status in a fixed order. This is the current behavior in `scripts/skill-graph-route.js`; treat it as the canonical gate semantics:

- **Hard integrity block.** `structural_verdict: FAIL` or `truth_verdict: BROKEN` removes the skill — a genuinely broken skill never routes. Critically, `UNVERIFIED` does **not** block: the corpus default is UNVERIFIED, and gating on `PASS` would delete most of the library. "Unknown" is treated as routable, not as broken.
- **Behavior gate-out.** An active proven-negative `application_verdict` — `HARMFUL`, `REDUNDANT`, or `FALSE_POSITIVE` — excludes the skill. `MIXED` is **not** gated out (it means "applicable on some cases", not proven-bad). A negative verdict **expires** so a since-fixed skill is not tombstoned forever: it lapses when the skill's `last_changed` is newer than the grading receipt, or when the grade is older than 90 days. A negative verdict with no `eval_last_run` receipt is conservatively treated as still active.
- **Rank-weight boost.** `application_verdict: APPLICABLE` adds +2 and `PROVISIONAL` adds +1 to the sort key. The boost is a tiebreaker, never an override: a strong keyword match on an UNVERIFIED skill still outranks a weak match on an APPLICABLE one. `UNVERIFIED` and `MIXED` are neutral (0).

### Graph expansion and exclusion

Relation edges run in a fixed order. The canonical exclusion edge is `relations.suppresses` (ADR-0018; the router reads `suppresses` first and falls back to the deprecated `boundary` alias for unmigrated skills):

1. **Suppression runs BEFORE co-loading.** When a selected skill `suppresses` another selected skill, the suppressed skill is removed *and so are its own co-loads* — a suppressed skill must not contribute its `verify_with` / `depends_on` / `broader` partners to the result.
2. **Suppression is score-aware.** A suppression only fires when the suppressing skill scored **≥** the target on this query. If the target outscored the declarer, the target stays — this guards the `boundary_exclusion_removes_stronger_match` failure mode, where a weak owner would otherwise evict the genuinely stronger match.
3. **`depends_on` expands transitively.** A→B→C co-loads all three, because the selected skill requires those supporting skills.
4. **`verify_with` co-loads one hop only** for cross-checking — it is not treated as a transitive dependency.
5. **`broader` co-loads the generalisation parent one hop** (SKOS `skos:broader`): when a specific child matches, its broader parent is pulled in for context. `narrower` is deliberately **not** co-loaded — a parent matching does not make its children relevant.
6. **`disjoint_with`** marks incompatible ownership and must not be treated as a dependency.

### Fallback behavior

If no skill matches any surface, the router does not fall back to a default skill. It surfaces a coverage gap and recommends authoring a new skill or broadening an existing skill's `keywords` array. Silent fallback to a wrong skill is worse than an explicit coverage-gap signal. Capture the missed query as a future routing-eval case so the gap is closed with evidence, not just patched.

## Routing at Scale

The deterministic surface-scoring router teaches the *mechanics* of explainable dispatch, but it is one of three routing strategies the field uses, and it has a known scaling boundary. Situate it honestly:

- **Deterministic surface-scoring (this skill).** Cheap, fully explainable, auditable case-by-case. Best for a curated library (tens to low hundreds of skills) where authors control the metadata. The whole point is the *explanation*: every selection, co-load, and exclusion is traceable to a declared field.
- **Embedding retrieval.** Embed the task and the skill metadata; load the top-k by cosine similarity. Scales to large pools but is opaque and depends entirely on what text is embedded.
- **LLM-reasoning routing.** The runtime reasons over skill descriptions and picks — the model Anthropic's Agent Skills standard uses, where progressive disclosure exposes name+description first and "description quality directly determines routing accuracy." Native runtimes do this dispatch for you; the deterministic router is the *auditable complement*, not a competitor.
- **Hybrid retrieve-and-rerank.** A bi-encoder narrows to a candidate set over the full skill records (body text, examples, relations), then a cross-encoder reranks using full text; the Skill Graph `suppresses` / `depends_on` edges are applied to the reranked winner as a post-process. This is the shape of the SkillRouter system (74.0% top-1, +6pp over a much larger zero-shot 8B pipeline).

**The scaling boundary — the body becomes the decisive signal.** Surface metadata (keywords, triggers, name, description) is sufficient discrimination only while the library is small and low-overlap. Recent retrieval research finds that in large, highly overlapping pools the **full skill body is the decisive routing signal**: removing the body degrades top-1 accuracy by roughly 29–44 percentage points across BM25, embedding, and reranking methods, and an attention analysis attributes 91.7% of routing attention to the body versus 7.3% to the name and 1.0% to the description. The lesson for a maintainer: keyword/trigger metadata buys precision in a curated library, but it does not scale to a sprawling, overlapping one — past that point, routing must read the body, and the right move is to *split or sharpen overlapping skills*, not to keep tuning keyword arrays. (Sources: SkillRouter, arXiv 2603.22455; Anthropic, "Equipping agents for the real world with Agent Skills.")

## Universal Anti-Patterns

| Anti-pattern | Problem | Fix |
|---|---|---|
| **Silent default fallback** | Hides missing expertise and poisons context with a wrong frame; the misroute looks successful to the router. | Surface a coverage gap loudly; recommend a new skill or broader keywords. |
| **Keyword bag-stuffing** | Padding `keywords` to win routing. | Per-token credit is capped — repeating a token across phrases earns nothing extra. Sharpen the phrase instead. |
| **Ambiguous descriptions / overlapping siblings** | The router cannot distinguish two near-identical skills. | Add `anti_examples` and a `suppresses` edge naming the owner; at scale, split or sharpen the overlapping skills. |
| **Stale verdict poisoning routing** | Gating forever on an old `HARMFUL`/`REDUNDANT` verdict. | Rely on the 90-day / `last_changed`-supersession expiry so a since-fixed skill is not tombstoned. |

## Evals

This skill's routability is tested by `skill-graph/scripts/skill-graph-routing-eval.js`, which evaluates the skill's manifest `examples[]`, `anti_examples[]`, and relation boundaries after generating a fresh manifest. The harness runs each `examples[]` prompt and requires this skill as the top-1 winner (positive class), and each `anti_examples[]` prompt and requires this skill to NOT win (a winner named in `relations.suppresses[]` is a boundary-target pass; a null winner is an informational coverage gap, not a failure). It emits a confusion matrix (`expected → actual`) to help maintainers spot overlapping keywords or missing boundary edges, and a skill only earns `routing_eval: present` when all its example cases pass. The skill also ships application and comprehension evals alongside the skill. The eval prompts test weighted-additive match scoring, explicit coverage-gap behavior, relation-aware routing, and the refusal to fall back to a default. Consumers in other agent runtimes can translate those cases to their own grading harness.

## Verification

After applying this skill, verify:

- [ ] The task matches the declared scope, coverage, or positive examples.
- [ ] The response follows this skill's workflow or checks instead of generic advice.
- [ ] Routing claims describe additive weighted scoring (not a stop-at-first-surface chain) and name the actual gate order: project filter → score → verdict gate → suppression → co-loading.
- [ ] Coverage gaps were surfaced explicitly rather than hidden behind a nearest-neighbor fallback.
- [ ] The exclusions in `## Do NOT Use When` do not point to a better skill.

## Do NOT Use When
| Use instead | When |
|---|---|
| The target skill directly | The correct skill is already known — skip the router and load it |
| `documentation` | The task is writing or structuring doc prose, not routing |
| `graph-audit` | The task is auditing whether routing metadata is consistent, not dispatching a query |
| `skill-scaffold` | The task is authoring a new skill from scratch, not dispatching to an existing one |
| `skill-infrastructure` | The task is analyzing routing-miss patterns or health across the whole library, not one request's dispatch |
| `context-graph` | The task is designing the underlying relation graph the router traverses, not the dispatch decision itself |
| Generic RAG / similarity search | The task needs typed Skill Graph metadata (relations, verdicts, project-fit), not raw text similarity |
