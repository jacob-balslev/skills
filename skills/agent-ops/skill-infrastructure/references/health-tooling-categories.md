## The Seven Categories of Skill-Health Tooling

A production skill library needs all seven. Missing any one allows a distinct class of decay — or compromise — to reach agents or downstream consumers. (Categories 1–5 are the original integrity surfaces; category 6 became non-optional once community skill-sharing made untrusted imports common; category 7 became non-optional once skills started carrying graded behavior verdicts that can lie about their evidence.)

### 1. Inventory and Source Validation

Walks the skill tree, parses every `SKILL.md`'s frontmatter, joins the sidecar when needed, and validates the invariants this layer truly owns.

| Check | Why it matters |
|---|---|
| Required frontmatter fields present (`name`, `description`, `subject`, `public`, `scope`) | Missing agent-facing fields break manifest generation, routing, and export |
| `name` shape and parent-directory match | Skill identity is the primary key for routing, relations, exports, and audit artifacts |
| Required sidecar fields present (`schema_version`, `owner`, `freshness`, `drift_check`, `eval_artifacts`, `eval_state`, `routing_eval`) — `audit-state.json` exists where audit/eval state is claimed | Missing audit/eval/provenance state prevents honest audit-loop writeback |
| Field-value enums valid (`subject`, `public`, `eval_state`, `routing_eval`) | Drift in valid values leaks invalid skills into routing and audit reports |
| Description-length and quality (≥ 100 chars, contains "Use when X / Do NOT use for Y") | Short or vague descriptions degrade router precision |
| Tool-surface integrity (`allowed-tools`, when declared, covers the tools the body actually invokes; no undeclared tool calls) | Privilege creep: a body reaching for tools the contract never promised is both a routing and a safety hazard |
| Eval-count per skill (warn at < 7, error at < 3 unless the skill explicitly documents why evals are not meaningful) | Under-evaluated skills regress quality undetected |
| Reference-path resolution (every `references/X.md` cited in frontmatter actually exists) | Dangling references mislead the agent at activation time |
| Token-budget / progressive disclosure (startup cost per skill is small — ~100 tokens for the description — and heavy detail lives in load-on-demand `references/`, not the always-loaded body) | An unbounded body floods the context window for every activation; progressive disclosure is the structural advantage skills have over global system prompts |
| Project-grounding consistency (non-empty `project[]` requires populated `grounding` plus `project[]`) | Project claims without grounding can hallucinate file paths |
| Public-content fence for exported skills | Public libraries must not leak secrets, private operational data, customer data, or local-only paths |

**Reference implementation (live scope, do not overclaim):** in the Skill Graph reference implementation `scripts/skill-lint.js` is intentionally *narrow* — it is the canonical-source schema gate (frontmatter parse, canonical schema, identifier shape, required authored fields, narrow cross-file schema obligations). It explicitly does **not** own routing topology, eval coherence, schema parity, or other infrastructure invariants; those are split across schema-constant checks, manifest validation, status generation, audit preflight, application-eval checks, drift, and export verification. Broad inventory health is the *sum* of those single-purpose tools, not one linter. External analogues report token counts and resolve links the same way (see § The Portable Health-Tooling Landscape).

### 2. Protocol and Projection Consistency

Cross-checks that the schema, generator, sample manifest, JSON-LD/context mapping, field-reference docs, and generated artifacts all agree.

| Check | Failure mode if missing |
|---|---|
| Frontmatter/sidecar field-reference parity with schema | Schema bumps silently drop, rename, or misdocument fields |
| Authored-to-generated manifest parity (`SKILL.md` plus `audit-state.json` match what the generator emits) | Generator drift breaks downstream consumers; routers read stale or lossy projections |
| Sample manifest matches generator output (freshness) | Examples teach a contract the generator no longer emits |
| Generated field-reference matches authored field-reference | Documentation drift hides field changes |
| JSON-LD/context coverage for relation predicates | Graph consumers cannot type or traverse new edges reliably |
| Manifest-root version vs per-skill schema-version separation | Consumers confuse compiled-manifest shape with skill-contract version |
| Dropped-field ledger | A human-authored field disappears from exports without a deliberate, named reason |
| Truth invariants on example evals (e.g. truth-source line ranges still resolve) | Eval expectations point at non-existent code |

The projection rule is: no human-authored field should vanish unless the mapping explicitly declares why. If a field is generated-only, name the generator. If a field is intentionally absent from export, name the consumer boundary.

**Reference implementation:** `scripts/check-protocol-consistency.js` runs a numbered series of protocol checks (C1–C8 in the current reference implementation; the set grows as new cross-artifact invariants are added — treat the count as implementation-specific, not a fixed contract).

### 3. Conflict, Overlap, and Relation Integrity

Compares skills across the whole graph to surface ambiguous ownership, duplicate activation surfaces, broken relation targets, and contradictory instructions.

**What the live reference overlap checker actually owns** (`scripts/skill-overlap.js`): activation-surface collisions only.

| Dimension | Method | Signal |
|---|---|---|
| Trigger collisions | Exact duplicate trigger labels | Hard routing ambiguity |
| Keyword overlap | Shared activation phrases | Recall signal requiring relation review, **not** automatic deletion |
| Path overlap | Duplicate file globs | Possible co-activation ambiguity |

Shared keywords are **not** a defect by themselves — keywords are the recall substrate of the graph. If two related skills share a term, confirm the relation edge and boundary wording; do **not** delete a useful keyword just to quiet a warning. That strips recall and worsens routing.

**Relation-target integrity (foreign-key check).** Every `relations.*` target must resolve to a real skill. Use `relations.suppresses` for routing-exclusion edges (directional: "skill-A suppresses skill-B" = "when skill-A wins, skill-B is suppressed from the result set" — *not* a defer-to-target pointer); `relations.boundary` is a deprecated alias accepted only for historical or external input (renamed per ADR-0018). If the live linter or manifest validator does not deterministically enforce target existence, record that as a tooling gap and add a focused graph-integrity checker — do not assume "lint passed" proves graph topology is valid.

**Advanced / optional detector patterns (layer on top; not implemented by the live overlap tool).** A library may add a richer conflict detector for description similarity, structural duplication, and contradictory imperatives. These are real, portable detector-design patterns — keep them as deliberate optional tooling, not as a claim about the reference overlap checker:

| Dimension | Method | Signal |
|---|---|---|
| Description similarity | Jaccard on word bigrams | > 0.4 = potential duplicate |
| Heading overlap | Shared H2/H3 headings excluding boilerplate | High overlap = structural duplication |
| Code duplication | Identical fenced code blocks > 30 chars | Copy-paste anti-pattern |
| Imperative conflicts | Same target, opposite polarity (ALWAYS vs NEVER) after negation-aware extraction | Agents get contradictory instructions |

**Imperative extraction patterns:**

- Positive: `\b(?:always|must|required|mandatory)\b\s+(.{10,80})/gi`, `\buse\s+(.{5,60})\s+(?:for|when|instead)/gi`
- Negative: `\b(?:never|do\s+not|don't|must\s+not|prohibited)\b\s+(.{10,80})/gi`, `\bdo\s+NOT\s+use\s+(.{5,60})/gi`

**Three-check false-positive suppression** for the most common phantom-conflict sources (e.g. `Do NOT use X` matching as positive `use X`):

1. **Lookbehind check** — if `not`, `never`, `don't`, or `cannot` appears in the 20 characters before a positive match, suppress it
2. **Within-match check** — if `not` appears between the start of the match and the target identifier (extracted via backticks), suppress it
3. **Same-line dedup** — if the target was already extracted as a negative on the current line, suppress any positive extraction for that target

**When a conflict/overlap finding is real vs spurious:**

| Finding type | Resolution |
|---|---|
| Phantom ref | Relation/routing config maps to a non-existent skill — fix the name, add the missing skill only if it really exists, or delete the stale entry with a recorded reason |
| Keyword recall overlap | Confirm the relation edge and boundary wording; preserve the shared keyword |
| Code duplication | One skill owns the example; the other links to it |
| Heading overlap | Acceptable for structural templates; review only the differentiating content |
| Imperative conflict (real) | Scope the instructions more precisely (`always use X` → `always use X in app code`); name the exception; rarely merge skills |
| Imperative conflict (spurious) | Un-backticking an identifier to hide a real boundary ambiguity is wrong — fix the skill wording instead |

### 4. Routing and Retrieval Health

Asks whether real tasks reach the right skills, whether hard negatives avoid the wrong skills, and audits the *shape* of the library the router retrieves over.

| Input | Purpose |
|---|---|
| Authored `examples` | Positive activation cases: should top-1 route to the skill |
| Authored `anti_examples` | Hard negatives: should **not** top-1 route to the skill |
| Retrieval baseline | Corpus-level Recall@1, Recall@3, and coverage across realistic queries |
| Routing-misses log (queries that matched zero skills) | Surface keyword gaps — words users typed that never reached a skill |
| Eval-history log with `failure_category` | Surface skills failing for reasons routing can fix (`skill_not_activated`, `wrong_answer`) |
| Active routing config (`keywordMap`, `labelMap`) + active manifest | The authoritative truth for what currently routes |
| Library hierarchy / shelf distribution | Surface flat-at-scale risk — too many near-identical descriptions under one undifferentiated shelf |

**Output sections:**

1. **Keyword gaps** — words appearing in routing-misses but absent from the active keyword map, sorted by frequency
2. **Eval failure breakdown** — skills with 2+ failures, grouped by failure category
3. **Suggested actions** — `add_keyword` for frequent gaps; `improve_skill` for skills failing for content reasons; `subdivide_shelf` when one browse shelf grows past its healthy size

**Diagnosing misses:**

1. If the query uses vocabulary the skill should own, add or refine keywords/examples.
2. If the query belongs to another skill, add an anti-example or suppression edge.
3. If no skill should own it, record a legitimate coverage gap instead of inventing a keyword.
4. If the right skill activates but the answer is wrong, route the fix to content/application evaluation, not the router.

**Signal hygiene rules** (suppress these from the suggestion list):

- Low-signal tokens (`v`, `v4`, `skill`, `start`, `events`, `daily`, `log`, `status`, `health`)
- Single-word misses already covered by an existing multi-word phrase (e.g. `error` should not surface if `error recovery` is already mapped)
- Stale historical misses where the full query already routes under the current config
- Synthetic no-match probes used to verify the router's miss path
- Bundle/group entries (only direct `keywordMap` entries participate in free-text matching)

**Routing collapse at scale.** As a library grows, the dominant routing failure shifts from *misses* (zero skills matched) to *mis-hits* (a wrong but plausible skill matched). The AgentSkillOS research showed flat retrieval degrading into routing collapse — the orchestrator confidently invoking the wrong skill — and a hierarchy (domain → branch → leaf) restoring precision, with the advantage widening as the library scales. A practical deterministic guard: enforce a healthy size band per browse shelf (e.g. 5–25 skills) and flag shelves that have grown past the band for subdivision, before near-duplicate descriptions start trading activations. This is the dispatch-correctness half of the skill-as-contract model, checked structurally.

**Reference implementation:** the routing harness (`scripts/skill-graph-routing-eval.js` in this repo) checks that authored `examples` route top-1 to the skill and `anti_examples` do not, supports retrieval-baseline metrics (Recall@1, Recall@3, coverage), and regenerates a fresh manifest by default to avoid stale-manifest false failures. A real routing-gap report is the symmetric case (verifying that real user prompts reach a skill).

### 5. Drift, Freshness, Mirror, and Export Parity

Detects when the *world the skill claims* has changed without the skill being updated — and when downstream copies have fallen behind the canonical source.

| Drift type | Detection |
|---|---|
| Truth-source drift | `drift_check.truth_source_hashes` records SHA-256 of cited files; rerun hashes; mismatch = drift |
| Missing truth source | A declared local path no longer exists |
| No baseline (`NO_BASELINE`) | Truth sources exist but no hash baseline is recorded |
| External source gap (`EXTERNAL_UNHASHED`) | A URL source exists but was not fetched because external hashing is opt-in |
| Stale `freshness` date | Skill has not been touched in > `lifecycle.stale_after_days`; surface for review |
| Mirror parity | Hash every `<library>/skills/<name>/SKILL.md` and every `<harness-mirror>/skills/<name>/SKILL.md`; mismatch = drift |
| Procedure drift | The body no longer matches its own declared procedure / anti-patterns (the trajectory half of the skill-as-contract model) — caught structurally via conflict + truth-source checks, then confirmed by an activation trace where one is available |
| Export parity | Rendered or marketplace export differs from canonical/generated output |
| Public-index drift | Public marketplace listing is stale, orphaned, or not rescanned |
| Tracker → skill drift | Issue tracker references a skill that no longer exists; or skill references a closed issue |

Default drift checks should be **read-only**. Recording hashes or writing verdict/status fields is a deliberate maintenance operation, not a side effect of inspection. Treat public marketplaces as caches, not canonical truth: if a public index has no self-service de-index or rescan path, publish only from the canonical release repo and avoid throwaway export repos. A stale public row is release debt even when local export verification passes.

**Reference implementation:** `scripts/skill-graph-drift.js` records and verifies truth-source hashes against the live files; `scripts/verify-skill-md-export.js` and `scripts/export-marketplace-skills.js --check` verify export parity.

### 6. Safety and Supply-Chain Scanning

The category that did not matter when every skill was hand-written in-house, and became mandatory the moment libraries started importing community skills. A 2026 analysis of **31,132 community skills found 26.1% contained at least one exploitable vulnerability** — prompt injection, data exfiltration, privilege escalation, and supply-chain risks (reported in O'Reilly Radar, 2026). A library that pulls third-party skills without scanning is shipping that base rate straight into its agents' context.

| Check | What it catches |
|---|---|
| Injection / exfiltration patterns | Body text instructing the agent to ignore prior instructions, leak secrets, or send data to an external endpoint — treat skill bodies as data, not trusted instructions |
| Secret / credential patterns | Hardcoded tokens, API keys, private URLs, or PII committed into a skill body or reference file |
| Tool-surface escalation | A body that reaches for tools beyond its declared `allowed-tools` (also an inventory check; here the lens is *privilege*, not completeness) |
| Untrusted-import provenance | Skills added from outside the owned corpus without a recorded source, review, or content hash |
| Forbidden files in the skill directory | Executables, archives, or unexpected file types that have no business in a SKILL.md bundle |

These are **deterministic pattern checks**, consistent with the zero-LLM rule — they scan and match, they do not reason about intent. (Designing the *runtime* defenses an agent applies when executing a skill — sandboxing, tool permissioning, exfiltration controls — is `guardrails` / `owasp-security` territory; this category is the static library-health scan that keeps a compromised skill from entering the corpus in the first place.) Run the safety scan on every import from outside the owned corpus, not only in the full sweep.

**Reference implementations (external):** SkillCheck and agent-ecosystem/skill-validator both run local security/quality scans (slop, accessibility, agent-readiness, governance, forbidden files, cross-language contamination); claudelint ships a rule set in the same shape (see § The Portable Health-Tooling Landscape).

### 7. Audit, Eval, and Evidence-State Integrity

Prevents a library from claiming quality it has not proven. Distinct from the categories above: it does not guard the *shape* of a skill, it guards the *honesty of the quality claims attached to it*.

| Check | Failure mode if missing |
|---|---|
| Comprehension/application verdicts require matching eval artifacts | A skill claims graded status with no gradeable file (false canonicality) |
| Application evals satisfy the schema and case floor | A behavior gate becomes self-attested or too thin |
| Eval IDs remain append-only | Eval history can no longer identify old failures |
| Every expectation has at least one negative / absent-signal clause where appropriate | Evals become happy-path recitation tests |
| Red herrings and hard negatives exist | The evaluator cannot distinguish real skill use from generic competence |
| Eval-staleness checker resolves referenced paths, symbols, and line ranges | Old evals keep passing against non-existent evidence |
| Preflight checks operation readiness before audit/evaluate/improve runs | Long runs fail halfway because required artifacts were missing |
| Verdict semantics stay split | `structural` and `truth` prove *eligibility*; `application` is the behavior-quality signal that *certifies* usefulness |

The health layer should make false canonicality hard. A run artifact, verdict, or sidecar status must not imply that a grader ran unless the corresponding eval artifact and receipt exist.

**Reference implementation:** `scripts/check-audit-manifest.js` (graded verdict claims have matching artifacts), `scripts/check-application-evals.js` (application-eval schema shape, case floor, unique IDs, red-herring recommendation), `lib/audit/eval-staleness-checker.js`, and `scripts/skill-audit-preflight.js`.
