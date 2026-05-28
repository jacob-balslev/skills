---
name: query-optimization
description: "Use when diagnosing and tuning a specific slow query in a relational database: the query planner mental model (parse → rewrite → plan → execute), the canonical inputs the planner reasons over (statistics, cost model, available indexes), reading EXPLAIN and EXPLAIN ANALYZE output, the catalog of plan-node types (sequential scan, index scan, index-only scan, bitmap heap scan, nested loop, hash join, merge join, sort, hash aggregate, materialize) and what each tells you about the query's actual cost, the difference between query rewriting (reformulating the SQL) and operational fixes (adding indexes, ANALYZE, statistics targets), and the diagnostic procedure that takes a slow query to a fast one. Do NOT use for the design of which indexes to maintain (use indexing-strategy), schema design (use data-modeling), distributed-data partitioning (use sharding-strategy), or isolation-level decisions (use transaction-isolation)."
license: MIT
allowed-tools: Read Grep
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
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/data
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-16"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-16\"}"

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
  keywords: "[\"query optimization\",\"query planner\",\"EXPLAIN\",\"EXPLAIN ANALYZE\",\"sequential scan\",\"index scan\",\"nested loop\",\"hash join\",\"merge join\",\"query rewriting\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"this query is slow\",\"EXPLAIN ANALYZE output\",\"why isn't the planner using the index\",\"join order optimization\",\"subquery vs join\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"diagnose a query that takes 8 seconds and identify the plan node responsible\",\"rewrite a slow correlated subquery as a join to enable a faster plan\",\"explain why ANALYZE on a recently-changed table can change the planner's decisions\",\"decide whether to add an index, rewrite the query, or accept the cost\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"design which indexes to maintain on a new schema (use indexing-strategy)\",\"choose a database schema (use data-modeling)\",\"decide isolation level for a workload (use transaction-isolation)\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"indexing-strategy\",\"data-modeling\",\"transaction-isolation\",\"schema-evolution\"],\"boundary\":[{\"skill\":\"indexing-strategy\",\"reason\":\"indexing-strategy owns the design of which indexes the database has; this skill owns the diagnosis and tuning of specific slow queries. The two compose: query-optimization diagnoses; indexing-strategy is one of the response tools.\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling owns schema and access-pattern design; this skill owns the tuning of queries against the existing schema. Sometimes the diagnosis is 'the schema is wrong for this query'; the response is then in data-modeling's scope.\"},{\"skill\":\"transaction-isolation\",\"reason\":\"transaction-isolation owns concurrency correctness; this skill owns single-query performance. Sometimes a slow query is slow because of lock contention from isolation; the disciplines intersect on those cases.\"}],\"verify_with\":[\"indexing-strategy\",\"data-modeling\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Query optimization is the reading discipline applied to slow queries. The mental model is the *query planner* — the database component that takes the SQL string, parses it, applies semantic rewrites, considers possible execution plans, estimates each plan's cost using statistics and a cost model, picks the cheapest, and executes it. The diagnostic vocabulary is the *plan-node catalog*: Seq Scan (read every row of a table), Index Scan (use index to find rows then fetch the row), Index Only Scan (use covering index, no row fetch — the cheapest read access), Bitmap Heap Scan (build bitmap from indexes, fetch matching rows — good for AND of multiple conditions), Nested Loop (for each outer row, scan inner — fast for small outer or when inner has an index, bad for large outer), Hash Join (build hash from one side, probe with other — standard fast equi-join for medium-large inputs), Merge Join (merge two sorted inputs — fast when both are pre-sorted on join key), Sort (expensive at scale; consider an index or ORDER BY-less query), Hash Aggregate, Group Aggregate (on sorted input), Materialize, CTE Scan.

    The diagnostic procedure: run EXPLAIN ANALYZE, find the most-expensive plan node (highest actual time), compare estimated rows vs actual rows (cardinality misestimation is the most common root cause), choose response from the response catalog (rewrite, add index, refresh statistics, denormalize, materialized view, isolation change, settings, application cache, accept cost), apply, re-EXPLAIN, iterate until target is met. Slow queries are prioritized by aggregate impact (frequency × duration) via pg_stat_statements or equivalent — not by individual duration alone.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces "guess at the slow query" with planner-led diagnosis and response selection. Solves the problem that a slow query has many possible root causes — sequential scan on a selective predicate (add index), cardinality misestimate where the planner thinks 100 rows and gets 10 million (ANALYZE, raise statistics target, extended statistics), nested loop with large outer (rewrite or change join order to enable a hash plan), correlated subquery (rewrite as join or EXISTS), N+1 from the application (replace with single join query), lock contention under concurrency (isolation work), fundamentally too much work (materialized view, precomputed aggregate, schema change) — and reaching for "add an index" before reading the plan is the most common waste of effort. EXPLAIN ANALYZE exposes the planner's actual choices and their actual cost; the work is interpretation, not guessing. The discipline distinguishes *diagnosis* from *response* and matches one to the other.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from indexing-strategy, which owns the *design* of which indexes the database has — indexing-strategy is one of the response tools when this skill's diagnosis says "add an index," but it is only one of many possible responses. Distinct from data-modeling, which owns the schema and access patterns — sometimes the diagnosis is "the schema is wrong for this query"; the response is then in data-modeling's scope. Distinct from transaction-isolation, which owns concurrency correctness — sometimes a slow query is slow because of lock contention from isolation, and the disciplines intersect on those cases (slow under concurrency, fast solo → suspect locking). Distinct from schema-evolution (how the schema changes over time) and from sharding-strategy (cross-node partitioning, where this skill addresses within-shard performance). Distinct from performance-testing, which owns measurement of the system under load — this skill diagnoses a single query; performance-testing evaluates the whole system's response under realistic load.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Query optimization is to a slow SQL query what a medical specialist's chart-reading is to a slow-recovering patient — you do not prescribe before reading the lab values; the plan reads like a chart, every plan node is a vital sign, every cardinality misestimate is a misdiagnosis the planner already made, and your job is to translate the chart into the right intervention rather than the most familiar one."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that the response to "this query is slow" is always to add an index. It is not. The most common root cause is *cardinality misestimation* — the planner thinks 100 rows will match, actually 10 million do, and the plan chosen for 100 is wrong for 10 million. The right response is ANALYZE, raised statistics targets, or (occasionally) extended statistics objects — adding an index without addressing the statistics problem produces no improvement. Adjacent misconceptions: that an index that "exists" is being used (use EXPLAIN ANALYZE to confirm — selectivity, type coercion, or function-on-column commonly disable use); that two queries that "should be equivalent" produce the same plan (they may produce dramatically different ones — rewriting a correlated subquery as a join is a *plan-shape* change, not just a syntactic change); that stale statistics are rare (they are routine after bulk inserts and schema changes — ANALYZE is the first thing to try when estimates seem off); that the slowest individual query is the most important one (aggregate impact = frequency × duration — a 100ms query run a million times a day is more important than a 30-second query run weekly). The discipline distinguishes diagnosis from response and matches one to the other; reaching for the most familiar response without reading the plan is the universal failure mode.
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"Query optimization is the discipline of diagnosing and tuning a specific slow query. The unit of work is one query that the application or a user reported as slow; the goal is identifying the root cause and applying a response (rewrite the SQL, add an index, refresh statistics, denormalize the schema, change the access pattern). The mental model is the query planner — the database component that takes the SQL string, parses it, applies rewrites, considers possible plans, estimates each plan's cost using statistics and a cost model, picks the cheapest, and executes it. EXPLAIN and EXPLAIN ANALYZE expose the planner's choices and their actual cost; reading these is the central diagnostic skill. The work is largely interpretation: knowing what each plan-node type means, what its cost implies, what cardinality misestimation looks like, and which response (rewrite, index, statistics, schema) addresses the diagnosis.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/query-optimization/SKILL.md
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

# Query Optimization

## Coverage

The discipline of diagnosing and tuning specific slow queries by reading the database planner's chosen plan, identifying the root cause, and applying the right response. Covers the query planner's phases (parse → rewrite → plan → execute), the cost model and statistics that drive plan choice, the plan-node catalog (Seq Scan, Index Scan, Index Only Scan, Bitmap Heap Scan, Nested Loop, Hash Join, Merge Join, Sort, Hash Aggregate, Materialize, CTE Scan), the EXPLAIN and EXPLAIN ANALYZE diagnostic vocabulary, the response catalog (rewrite, add index, refresh statistics, denormalize, materialized view, isolation change, settings, application cache, accept cost), and the root-cause taxonomy that links diagnosis to response.

## Philosophy

Query optimization is largely a reading discipline. The planner exposes its decisions and the database reports the actual cost; the work is reading EXPLAIN ANALYZE output, knowing what each node means, and choosing the right response. A team that reaches for "add an index" before reading the plan is guessing; a team that reads the plan finds the actual issue and applies the right response — often *not* adding an index.

The most common root cause is cardinality misestimation: the planner thinks 100 rows will match, actually 10 million do. The chosen plan optimized for 100 is wrong for 10 million. ANALYZE, raised statistics targets, and (occasionally) extended statistics objects are where most diagnoses live. Adding indexes without addressing the statistics problem produces no improvement.

The discipline distinguishes diagnosis from response. The diagnosis is "what is the root cause of this query's slowness." The response is "what to do about it." The response catalog has many entries; matching diagnosis to the right one is the work.

## The Diagnostic Procedure

```
   ┌───────────────────────────┐
   │ 1. Run EXPLAIN ANALYZE    │
   └───────────────────────────┘
              │
              ▼
   ┌───────────────────────────┐
   │ 2. Find the most-expensive│
   │    plan node (highest     │
   │    actual time)           │
   └───────────────────────────┘
              │
              ▼
   ┌───────────────────────────┐
   │ 3. Compare estimated rows │
   │    vs actual rows         │
   └───────────────────────────┘
              │
              ▼
   ┌───────────────────────────────────────────────────────┐
   │ 4. Choose response based on diagnosis:                │
   │    estimate ≫ actual  → predicate is more selective   │
   │                          than planner thinks; may need│
   │                          extended statistics or       │
   │                          query rewrite                │
   │    estimate ≪ actual  → ANALYZE; raise statistics     │
   │                          target; consider extended    │
   │                          statistics                   │
   │    estimate ≈ actual but slow → access path is wrong; │
   │                          maybe add index, change      │
   │                          join order, rewrite          │
   └───────────────────────────────────────────────────────┘
              │
              ▼
   ┌───────────────────────────┐
   │ 5. Apply response and     │
   │    re-EXPLAIN ANALYZE     │
   └───────────────────────────┘
              │
              ▼
   ┌───────────────────────────┐
   │ 6. Iterate until target   │
   │    is met                 │
   └───────────────────────────┘
```

## The Plan-Node Catalog

| Plan node | What it does | Read as |
|---|---|---|
| Seq Scan | Read every row of a table | Slow for large tables; the planner chose this for a reason — check selectivity |
| Index Scan | Use index to find rows; fetch row | Standard fast access for selective predicates |
| Index Only Scan | Use covering index; no row fetch | The cheapest read access; index includes all needed columns |
| Bitmap Heap Scan | Build bitmap from indexes; fetch matching rows | Good for AND of multiple conditions; less random I/O than nested index scans |
| Nested Loop | For each outer row, scan inner | Fast for small outer or when inner has an index; bad for large outer |
| Hash Join | Build hash from one side; probe with other | Standard fast equi-join for medium-large inputs |
| Merge Join | Merge two sorted inputs | Fast when both are pre-sorted on join key (often after Sort or matching indexes) |
| Sort | Sort rows | Expensive at scale; consider an index or ORDER BY-less query |
| Hash Aggregate | Group-by via hash table | Fast for moderate cardinality groups |
| Group Aggregate | Group-by on sorted input | Used after Sort or matching index |
| Materialize | Materialize intermediate for repeated access | Inserted by planner when sub-result is reused |
| CTE Scan | Scan CTE result | CTE may be optimization fence in older Postgres |

## Response Catalog

| Diagnosis | Right response |
|---|---|
| Sequential scan on large table; predicate is selective | Add index |
| Sequential scan; predicate is poorly selective | Accept (scan is right) or denormalize |
| Index Scan with high `Rows Removed by Filter` | Index doesn't match — partial index or composite |
| Estimated rows ≫ actual | Check if predicate is more selective than planner knows; extended statistics or rewrite |
| Estimated rows ≪ actual | ANALYZE; raise STATISTICS target |
| Nested Loop with large outer | Hint hash join or rewrite to enable hash plan |
| Hash Join with small outer | Should be nested loop with index — check why |
| Many Sort nodes | Add index matching ORDER BY |
| N+1 query pattern (application-side) | Replace with single join query |
| Correlated subquery slow | Rewrite as join or EXISTS |
| Query slow under concurrency, fast solo | Lock contention — check isolation, locking strategy |
| Stale statistics suspected | ANALYZE; consider auto-vacuum tuning |
| Query is fundamentally too much work | Materialized view, precomputed aggregate, schema change |

## Verification

After applying this skill, verify:
- [ ] EXPLAIN ANALYZE is the starting point for every slow-query investigation. Guessing without reading the plan is replaced by reading the plan.
- [ ] The most-expensive plan node is identified and the diagnosis is targeted at that node, not the query as a whole.
- [ ] Estimated rows vs actual rows is checked at every node. Cardinality misestimates are the most common root cause.
- [ ] The response matches the diagnosis. Adding an index is one response of many; the team is not reflexively adding indexes.
- [ ] Slow queries are prioritized by aggregate impact (frequency × duration), not by individual duration alone. pg_stat_statements or equivalent is consulted.
- [ ] Query rewrites are tested for semantic equivalence and plan-shape change. Two queries that "should be equivalent" can produce different plans.
- [ ] Statistics are refreshed (ANALYZE) before deeper investigation when the planner's estimates seem off. Stale statistics are routine after bulk inserts and schema changes.
- [ ] Periodic review of top queries detects regressions caused by data growth. A query that was fast last year may not be this year.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Designing which indexes the database maintains | `indexing-strategy` | indexing-strategy owns design; this skill diagnoses |
| Designing the schema or entity relationships | `data-modeling` | data-modeling owns design; sometimes the answer is a schema change in its scope |
| Reasoning about how schema changes over time | `schema-evolution` | schema-evolution owns versioning; this owns query-level tuning |
| Choosing isolation level | `transaction-isolation` | transaction-isolation owns concurrency; this owns retrieval performance |
| Horizontal partitioning across nodes | `sharding-strategy` | sharding owns partition; this owns within-shard performance |
| Designing performance tests for the system | `performance-testing` | performance-testing owns measurement under load; this owns single-query tuning |

## Key Sources

- PostgreSQL Global Development Group. ["PostgreSQL Documentation — Performance Tips"](https://www.postgresql.org/docs/current/performance-tips.html) and ["Using EXPLAIN"](https://www.postgresql.org/docs/current/using-explain.html). The canonical reference for Postgres query planning and EXPLAIN interpretation.
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly. Chapter 3 (Storage and Retrieval) covers the storage structures underlying query execution; useful framing for why plans take the shape they do.
- Petrov, A. (2019). *Database Internals*. O'Reilly. Deep treatment of query execution, the cost model, and plan generation.
- Tow, D. (2003). *SQL Tuning*. O'Reilly. The classic practitioner reference on diagnosing slow queries; database-agnostic methodology that applies across systems.
- Winand, M. (2012, ongoing). [*Use The Index, Luke!*](https://use-the-index-luke.com/). The canonical practitioner guide to SQL indexing, with substantial treatment of how indexes interact with the planner.
- Microsoft. ["Query Tuning Assistant and Query Store"](https://learn.microsoft.com/en-us/sql/relational-databases/performance/query-store). Reference for SQL Server's query-performance tooling.
- Oracle. ["Query Optimizer Concepts"](https://docs.oracle.com/database/121/TGSQL/tgsql_optcncpt.htm). Reference for Oracle's cost-based optimizer.
- MySQL Reference Manual. ["EXPLAIN Output Format"](https://dev.mysql.com/doc/refman/8.0/en/explain-output.html). MySQL EXPLAIN reference.
- Selinger, P. G., Astrahan, M. M., Chamberlin, D. D., Lorie, R. A., & Price, T. G. (1979). ["Access Path Selection in a Relational Database Management System"](https://dl.acm.org/doi/10.1145/582095.582099). *SIGMOD 1979*. The foundational paper on cost-based query optimization (System R); historical reference for the discipline's origin.
