---
name: compression
description: "This skill provides expertise in data and context compression: SaaS payload optimization (Zstd, Brotli, Gzip), database storage compression, and AI context window compression (Semantic Summarization, Token Pruning). Use when optimizing API latency, reducing storage costs, or managing long-running agent sessions near context limits. Do NOT use for image/video lossy compression (use product-photo) or file archiving."
license: MIT
compatibility:
  notes: "Markdown, Git, agent-skill runtimes"
allowed-tools: Read Grep Bash
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
  subject: code-engineering
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Data and context compression — SaaS payload optimization (Zstd, Brotli, Gzip), database storage compression, and AI context-window compression (semantic summarization, token pruning) — applied to cut API latency, storage cost, and long-running agent context pressure. Portable across any service or agent runtime; principle-grounded, not repo-bound. Excludes lossy image/video compression (product-photo) and file archiving."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/data
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-03-28"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-03-28\"}"

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
  keywords: "[\"compression\",\"Zstd\",\"Brotli\",\"Gzip\",\"context window\",\"token efficiency\",\"semantic summarization\",\"payload reduction\",\"DB TOAST\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"compression-skill\",\"context-compression\",\"payload-optimization\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"context-window\"],\"boundary\":[\"context-management\",\"summarization\"]}"
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":90,\"review_cadence\":\"quarterly\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/compression/SKILL.md
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
# Compression

## Domain Context

**What is this skill?** This skill provides expertise in data and context compression: SaaS payload optimization (Zstd, Brotli, Gzip), database storage compression, and AI context window compression (Semantic Summarization, Token Pruning). Use when optimizing API latency, reducing storage costs, or managing long-running agent sessions near context limits. Do NOT use for image/video lossy compression (use product-photo) or file archiving.

## Key Files

| File                                                 | Purpose                                                                                  |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `skills/token-efficiency/SKILL.md`                   | Adjacent authority for prompt and token-budget compression strategy.                     |
| `skills/context-window/SKILL.md`                     | Adjacent authority for compaction timing and context-budget math.                        |
| `scripts/hooks/pre-compact-hook.py`                  | Pre-compaction persistence hook that preserves state before context compression.         |
| `scripts/session/session-ctl.js`                     | Session-control CLI that exposes wrap, clear, and continue operations around compaction. |
| `docs/reference/session-control-wrapper-contract.md` | Canonical session-control contract covering wrap, clear, compact, and resume semantics.  |
| `agent-orchestration/ONBOARDING.md`                  | Workflow context for how session-control and continuation fit the orchestration flow.    |

## Coverage

SaaS payload compression (Zstd, Brotli, Gzip algorithm selection, level tuning, content negotiation), PostgreSQL storage compression (TOAST with Zstd, application-layer blob compression), and AI context window compression (semantic summarization, token pruning, dead context identification, state re-injection). Covers the decision tree for matching algorithms to data types, the `Accept-Encoding` negotiation order, and the three-phase token pruning workflow.

## Philosophy

Compression is the science of increasing information density. In a modern SaaS, it applies at two layers: the **Infrastructure Layer** (reducing bytes on the wire/disk) and the **Intelligence Layer** (reducing tokens in the context window). Without this skill, agents default to generic compression advice that ignores the specific algorithm-to-data-type mapping (e.g., using Gzip everywhere instead of Zstd for dynamic API payloads) and fail to recognize that sub-1KB payloads should skip compression entirely. On the intelligence side, agents routinely let context windows bloat with dead research turns instead of applying structured summarization that preserves evidence paths.

## 1. SaaS Data Compression Decision Tree

Match the compression algorithm to the data type and lifecycle.

| Data Type                  | Recommended              | Why?                                                       |
| -------------------------- | ------------------------ | ---------------------------------------------------------- |
| **Static Assets** (JS/CSS) | Brotli (Level 11)        | Highest ratio for web strings; slow build-time OK.         |
| **Dynamic API** (JSON)     | Zstd (Level 3)           | Fastest decompression; lower TTFB than Gzip.               |
| **Small Payloads** (<1KB)  | None / Custom Dictionary | Compression overhead often increases size for small items. |
| **Large DB Columns**       | Zstd (TOAST)             | Postgres 14+ native support; high speed/low I/O.           |

### Implementation Rules

- **Negotiation**: Always check `Accept-Encoding` header. Order: `zstd` > `br` > `gzip`.
- **Level Selection**: Use Level 3 for dynamic runtime; Level 11 for static build-time.
- **Header Safety**: Ensure `Vary: Accept-Encoding` is set to prevent cache pollution.

## 2. AI Context Compression

Protect the context window by maximizing token density.

### Semantic Summarization

- **Pattern**: Replace raw logs/code with high-density Markdown summaries.
- **Rule**: A summary must preserve **Intent**, **Outcome**, and **Evidence Paths** while removing boilerplate.

### Token Pruning (The "Surgical Cut")

- **Phase 1**: Identify "Dead Context" (e.g., redundant file reads, failed research turns).
- **Phase 2**: Use `/clear` or `/compact` to drop the bottom 50% of the session history.
- **Phase 3**: Re-inject the "State of the Union" summary via Memory MCP.

> **Source**: `skills/token-efficiency/SKILL.md` (Adjacent)

## 3. Storage Compression (Postgres)

Optimize for cost and performance at the database layer.

- **TOAST Compression**: Set `default_toast_compression = 'zstd'` for large JSONB fields.
- **Blob Compression**: For extremely large blobs (>10MB), compress in the application layer (Node.js `zstd` bindings) before storing as `BYTEA`.

## 4. Verification Checklist

```text
COMPRESSION CHECK
=================
[ ] Static assets pre-compressed with Brotli (Level 11)
[ ] API middleware supports Zstd with Gzip fallback
[ ] Vary: Accept-Encoding header present
[ ] AI context summary preserves Evidence Paths
[ ] redundant research/file reads pruned from session
[ ] DB compression matches Postgres version (Zstd if 14+)
[ ] Payloads < 1KB skip compression to avoid overhead
```

## Verification

After applying this skill, verify:

- [ ] Algorithm matches data type per the decision tree (static=Brotli, dynamic API=Zstd, DB=TOAST Zstd)
- [ ] `Accept-Encoding` negotiation respects the `zstd > br > gzip` priority order
- [ ] `Vary: Accept-Encoding` header is set to prevent cache pollution
- [ ] Small payloads (<1KB) are not compressed (overhead exceeds savings)
- [ ] Context summaries preserve Intent, Outcome, and Evidence Paths
- [ ] Token pruning removes dead context (failed research turns, redundant reads) before injecting fresh state

## Do NOT Use When

| Instead of this skill                                                           | Use                     | Why                                                                                 |
| ------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------- |
| Image/video lossy compression (JPEG quality, WebP, AVIF format selection)       | `product-photo`         | product-photo owns the image pipeline and format selection logic                    |
| Agent session lifecycle (when to compact, context budgets, compaction triggers) | `context-management`    | context-management owns session-level compaction strategy and budget allocation     |
| Token budget allocation and prompt compression techniques                       | `token-efficiency`      | token-efficiency owns the token budget framework; compression handles the mechanics |
| Credential encryption at rest                                                   | `credential-encryption` | credential-encryption covers AES-256-GCM patterns, not data compression             |
