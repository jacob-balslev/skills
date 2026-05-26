---
name: summarization
description: "Use when condensing prose while preserving meaning: session findings, wrap reports, research briefs, executive summaries, TLDRs, agent handoffs, progressive summaries, audit summaries, and long-document distillation. Covers extractive vs abstractive summarization, what to keep vs drop, evidence preservation, summary levels, handoff summaries, and audit-report condensation without hiding findings. Do NOT use for byte/data compression algorithms (use `compression`), context-window budget math or compaction triggers (use `context-window`), working-set selection (use `context-management`), prose tone repair (use `writing-humanizer`), or quality scoring (use `evaluation`)."
license: MIT
compatibility:
  notes: "Markdown, Git, agent-skill runtimes"
allowed-tools: Read Grep Bash
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
  domain: agent/cognition
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: workspace
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-18"
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
  keywords: "[\"summarization\",\"summary\",\"TLDR\",\"executive summary\",\"condensation\",\"abstract\",\"distill\",\"key findings\",\"brief\",\"compress text\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"summarization-skill\",\"summary-skill\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"context-management\",\"context-window\",\"writing-humanizer\"],\"boundary\":[{\"skill\":\"compression\",\"reason\":\"compression owns byte, payload, and storage compression; summarization owns semantic prose condensation\"},{\"skill\":\"context-window\",\"reason\":\"context-window owns token-budget math and compaction triggers; summarization is one technique for shrinking prose after the budget decision is made\"},{\"skill\":\"context-management\",\"reason\":\"context-management decides what belongs in the active working set; summarization condenses selected material into a usable form\"},{\"skill\":\"writing-humanizer\",\"reason\":\"writing-humanizer repairs tone and AI-patterned prose; summarization decides what meaning to preserve and what to omit\"},{\"skill\":\"evaluation\",\"reason\":\"evaluation scores work quality; summarization may report scores but does not define the rubric\"}],\"verify_with\":[\"evaluation\",\"writing-humanizer\"]}"
  # grounding: required when `scope: project` (or legacy alias `scope: codebase`).
  # Declares the truth sources the skill anchors to and the failure modes those sources
  # prevent. Omit when the skill is universal-knowledge.
  grounding: "{\"domain_object\":\"Prose summarization and agent handoff condensation\",\"grounding_mode\":\"hybrid\",\"truth_sources\":[\"https://owl.purdue.edu/owl/research_and_citation/using_research/quoting_paraphrasing_and_summarizing/index.html\",\"https://fortelabs.com/blog/progressive-summarization-a-practical-technique-for-designing-discoverable-notes/\",\"https://arxiv.org/abs/2204.09519\",\"https://github.com/jacob-balslev/skills/blob/main/skills/agent-ops/context-management/SKILL.md\",\"https://github.com/jacob-balslev/skills/blob/main/skills/agent-ops/context-window/SKILL.md\",\"https://github.com/jacob-balslev/skills/blob/main/skills/design-craft/writing-humanizer/SKILL.md\"],\"failure_modes\":[\"summary_drops_decisive_evidence\",\"summary_introduces_new_claims\",\"audit_summary_hides_findings\",\"handoff_omits_next_step\",\"style_polish_overrides_meaning_preservation\"],\"evidence_priority\":\"equal\"}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":90,\"review_cadence\":\"quarterly\"}"

  # === v6+ Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: "Summarization is semantic compression: reduce a source to the smallest useful representation for a reader and task while preserving meaning, provenance, decisions, evidence, and next actions. It is lossy by design, so the quality question is not how short the summary is; it is whether the chosen loss is intentional, reversible through evidence links, and appropriate for the audience."
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: "This skill prevents long agent outputs, research notes, audit reports, and handoffs from becoming technically complete but practically unreadable. It gives agents a repeatable way to choose summary level, preserve the causal chain, avoid invented claims, and leave enough evidence for a successor or reviewer to verify the condensed result."
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: "This skill does not choose the context-window budget, decide which sources enter the working set, compress bytes or files, repair prose tone, or score quality. It starts after the source material has been selected and the task asks for a smaller meaning-preserving prose artifact."
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Summarization is like packing an evidence suitcase for a trip: you cannot bring the whole room, so you choose the items the next person will actually need, label where they came from, and leave a map back to the rest."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: "The common mistake is treating summarization as proportional shortening: trim every section equally, remove evidence first, and keep the same shape at smaller size. Good summarization is selective and task-aware; it may keep one decisive paragraph intact and drop an entire low-value section."
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"Summarization is semantic compression of prose: creating a shorter artifact that preserves the source's main meaning, task-relevant evidence, decisions, and provenance while intentionally omitting lower-value detail.\",\"mental_model\":\"Treat every summary as a lossy transform with a declared audience and job. First choose the summary level, then preserve the causal chain and evidence links, then cut material whose absence will not harm the reader's next decision.\",\"purpose\":\"It turns long agent outputs, research notes, audit reports, and handoff materials into usable briefs without losing the facts a successor needs to trust or continue the work.\",\"boundary\":\"It is not byte compression, context-budget math, working-set selection, prose tone repair, or quality scoring. Those neighboring skills decide size constraints, context membership, style, and evaluation; summarization preserves meaning inside the chosen constraint.\",\"taxonomy\":\"Core forms include TLDR, executive summary, brief, condensed report, progressive summary, agent handoff, research-to-memory note, and audit summary. Core methods include extractive, abstractive, synthesis, evidence-linking, and priority grouping.\",\"analogy\":\"Summarization is like packing an evidence suitcase for a trip: you cannot bring the whole room, so you choose the items the next person will actually need, label where they came from, and leave a map back to the rest.\",\"misconception\":\"Shorter is not automatically better. A summary that drops the decisive evidence, hides findings, or invents a clean story is worse than the messy source.\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/agent-ops/summarization/SKILL.md
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
# Summarization

## Domain Context

**What is this skill?** Prose condensation and abstraction patterns for AI agents: extracting key findings from long reports, writing executive summaries, creating TLDRs, compressing context for handoffs between agents, progressive summarization, audit report condensation, and the discipline of deciding what to keep and what to cut when space is limited. Use when summarizing session findings, writing wrap reports, condensing research for durable notes, creating executive summaries of audits, compressing context before agent handoffs, or distilling long documents into actionable briefs. Do NOT use for data compression algorithms (use `compression`), context-window budget management (use `context-window`), working-set selection (use `context-management`), prose tone repair (use `writing-humanizer`), or quality scoring (use `evaluation`).

> Summarization is not shortening. It is the skill of identifying what matters and discarding what doesn't — while preserving the causal chain that makes the remaining content useful.

## Coverage

Extractive summarization (pulling key sentences verbatim), abstractive summarization (rewriting in fewer words while preserving meaning), progressive summarization (Tiago Forte's 3-layer highlight method adapted for agent work), executive summary structure (situation → findings → recommendations → next steps), TLDR generation (one-sentence distillation of a complex document), session wrap condensation (converting 50+ findings into a prioritized summary), research-to-memory compression (distilling task research into memory-file-sized briefs), agent handoff summaries (what the next agent needs to know, nothing else), audit report condensation (from raw findings to scored summary with evidence), and the information-theoretic principle of lossy compression — what you choose to lose defines the quality of the summary.

## Philosophy

Every agent in this system produces more text than any human will read. Session logs run to thousands of lines. Research files contain every detail an agent discovered. Audit reports list every finding at every severity level. Without summarization discipline, this output becomes noise — technically complete but practically useless.

The failure mode is not missing information but buried information. A 500-line research file that contains the answer on line 347 is worse than a 50-line summary that puts the answer in the first paragraph. A wrap report that lists 30 findings without priority is worse than one that highlights the 3 critical findings and links to the rest.

Summarization is lossy by definition. The skill is in choosing *what to lose*. The rules below encode that choice: keep decisions and their rationale, keep blockers and their workarounds, keep numbers and their context — drop process narration, drop tool output, drop hedging.

## Source Notes

This skill combines three public traditions:

- Research-writing guidance treats a summary as a shorter restatement of a source's main ideas in the writer's own words, distinct from quoting or close paraphrase.
- Progressive summarization treats notes as layers of discoverability: keep the raw material reachable, then highlight, emphasize, and rewrite the useful meaning for future use.
- NLP summarization literature distinguishes extractive summaries that reuse source material from abstractive summaries that generate new wording, with factuality and faithfulness as core quality risks.

## When to Use

- Writing session wrap summaries
- Creating durable notes from research sessions
- Condensing task-researcher output for task-solver consumption
- Writing executive summaries of audit reports
- Creating TLDRs for long issue descriptions
- Compressing context for agent-to-agent handoffs
- Distilling board meeting minutes into decisions + action items
- Summarizing git log history for PR descriptions
- Converting verbose tool output into human-readable findings

## Cross-Domain Synergy

- **context-window**: Owns context limits, compaction timing, and token-budget pressure. Summarization is one technique used after the size constraint is known.
- **context-management**: Owns what enters, stays in, or leaves the working set. Summarization condenses material that has already been selected as worth carrying forward.
- **writing-humanizer**: Owns tone, rhythm, and removal of AI-patterned prose. Summarization owns meaning selection; polish is a secondary pass.
- **compression**: Owns algorithmic data compression. Summarization covers prose compression, which is lossy and requires semantic judgment.
- **evaluation**: Owns quality rubrics and scoring. Summarization may report scores or verdicts, but it must not invent the rubric.

---

## 1. The Summarization Hierarchy

Not all summaries serve the same purpose. Match the technique to the audience and constraint.

| Level | Name | Length | Keeps | Drops | Use For |
|-------|------|--------|-------|-------|---------|
| L1 | **TLDR** | 1-2 sentences | The single most important takeaway | Everything else | chat messages, issue comments, commit subjects |
| L2 | **Executive Summary** | 3-8 sentences | Situation, key findings, recommendation | Evidence, process, reasoning | Memory files, PR descriptions, wrap reports |
| L3 | **Brief** | 1-2 paragraphs | Findings + evidence + reasoning | Verbose tool output, narration | Task handoffs, research summaries |
| L4 | **Condensed Report** | 1-2 pages | Full findings with priority, evidence refs | Raw data, duplicates, process log | Audit reports, board meeting summaries |

**Rule: Always specify which level you're writing.** "Summarize this" is ambiguous. "Write an L2 executive summary" is actionable.

## 2. Faithfulness Gate

A summary must preserve the source's truth conditions. It can be shorter, reorganized, and clearer, but it cannot invent new claims, hide uncertainty, convert tentative evidence into certainty, or erase the path back to the source.

Before handing off a summary, check:

| Question | Pass Condition |
|---|---|
| Does every claim appear in or follow directly from the source? | No unsupported claims or imported assumptions |
| Are decisions, blockers, numbers, and action items preserved? | The reader can act without reopening the full source |
| Are evidence paths retained for non-obvious claims? | File paths, URLs, issue links, commit hashes, or line refs remain available |
| Is uncertainty still visible? | Confidence, caveats, and unresolved questions are not flattened |
| Are omissions intentional? | Dropped material is low-value for the declared summary level |
| Are audit findings complete? | Condensed audit summaries preserve exact counts and link to the complete findings |

## 3. What to Keep vs What to Drop

**Always keep:**
- Decisions and their rationale ("Chose X because Y")
- Blockers and their workarounds or status
- Numbers with context (counts, scores, percentages)
- Action items with owners
- Surprising or non-obvious findings
- Links to evidence (file paths, URLs, line numbers)

**Always drop:**
- Process narration ("First I read the file, then I searched for...")
- Tool invocation details ("I ran grep and found...")
- Hedging and qualification ("It's worth noting that perhaps...")
- Repeated information (say it once, in the right place)
- Obvious context the reader already has
- Intermediate reasoning that led to the final conclusion

## 4. Executive Summary Structure

The executive summary is the most common summary type in this system (memory files, wrap reports, PR descriptions).

**Four-part structure:**
1. **Situation** (1 sentence): What was the task/context?
2. **Findings** (2-4 sentences): What did we discover or accomplish?
3. **Recommendation** (1-2 sentences): What should happen next?
4. **Evidence** (optional, linked): Where can the reader verify?

**Example:**
> Audited the 12 language-related skills for gap coverage. Found 4 clear gaps: microcopy (highest impact — no owner for functional UI text), i18n (linguistics has awareness but no implementation patterns), summarization (critical for agent context handoffs but unowned), and content strategy (the "what to write" layer above copywriting). Recommend creating all 4 as shared skills in the quality/meta/display layers. See gap analysis in conversation context.

## 5. Progressive Summarization for Agent Work

Adapted from Tiago Forte's method for agent memory:

- **Layer 0**: Raw output (session logs, tool results, full research)
- **Layer 1**: Highlighted key passages (extractive — pull the important sentences)
- **Layer 2**: Bold the key phrases within highlights (identify the core claims)
- **Layer 3**: Write an executive summary in your own words (abstractive)

**For memory files:** Always store Layer 3 (the executive summary) with a link to Layer 0 (the raw source) if it still exists. Never store Layer 0 directly in memory — it's too large and decays into noise.

## 6. Agent Handoff Summaries

When one agent passes work to another, the summary must answer exactly these questions:

1. **What was done?** (completed work, in one sentence)
2. **What's left?** (remaining work, as a list)
3. **What's blocked?** (if anything, with the specific blocker)
4. **What's surprising?** (non-obvious findings that affect the remaining work)
5. **Where's the evidence?** (file paths, issue IDs or links, commit hashes)

Anything not in these 5 categories is noise for the receiving agent.

## 7. Audit Report Condensation

Raw audit findings → prioritized summary:

1. **Preserve the full finding count**: "Found 23 findings: 3 critical, 7 high, 8 medium, 5 low"
2. **Lead with critical**: List critical findings first with one-line descriptions
3. **Group by theme**: Not by file or discovery order, but by the *type* of problem
4. **Score if applicable**: "Overall score: 36/50" with dimension breakdown and scoring source
5. **Link to complete findings**: The condensed report links to the full findings file and says whether the body is complete or summarized

A condensed audit report is not a replacement for the complete findings artifact. It may prioritize, group, and explain, but it must not silently drop findings or present a "top N" subset as the whole audit.

## 8. Anti-Patterns

| Anti-Pattern | Why It's Bad | Fix |
|-------------|-------------|-----|
| "First I did X, then Y, then Z" | Process narration wastes reader time | State the outcome, not the journey |
| Including all findings at equal weight | Reader can't distinguish critical from trivial | Prioritize by severity/impact |
| Summarizing by shortening every section proportionally | Produces a uniformly shallow version | Cut entire low-value sections, keep high-value sections intact |
| "As mentioned above" / "As noted earlier" | Self-referential text that doesn't survive extraction | Make each section standalone |
| Hedging in summaries | "It might be worth considering" wastes the reader's attention | State the recommendation directly |


## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Compressing payloads, files, logs, blobs, or storage formats | `compression` | That work is algorithmic compression, not prose condensation |
| Deciding token budgets, truncation points, or compaction timing | `context-window` | That work chooses the size constraint; this skill works inside it |
| Deciding which documents, notes, or facts belong in the active context | `context-management` | That work selects the source material before summarization begins |
| Making prose sound more human, warm, or less AI-patterned | `writing-humanizer` | That work edits voice and rhythm; this skill preserves and condenses meaning |
| Designing rubrics, assigning scores, or judging quality | `evaluation` | That work defines the quality standard; summarization may report its result |


## Verification

After applying this skill, verify:
- [ ] The summary level is explicit or obvious from the requested artifact
- [ ] Every non-obvious claim is present in or directly supported by the source
- [ ] Decisions, blockers, numbers, evidence paths, and action items are preserved when relevant
- [ ] Uncertainty and unresolved questions remain visible
- [ ] Audit summaries preserve exact finding counts and link to complete findings
- [ ] Handoff summaries answer what was done, what is left, what is blocked, what is surprising, and where the evidence is
