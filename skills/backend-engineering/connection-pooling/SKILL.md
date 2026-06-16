---
# name: stable kebab-case skill identifier; must match the parent directory.
name: connection-pooling
# description: routing contract for when this skill should activate and when it should not.
description: "Use when reasoning about how an application manages its database connections: why every connection has a server-side cost, the difference between application-level pools (HikariCP, pgx pool, node-postgres Pool) and proxy-level pools (PgBouncer, Pgpool, ProxySQL), the three PgBouncer modes (session, transaction, statement) and their feature compatibility, the canonical pool-sizing math (Little's Law applied to database concurrency; Wooldridge's analyses), the failure modes (connection exhaustion, hot-loop reconnects, prepared-statement breakage under transaction pooling, idle-in-transaction leaks), and the diagnostic procedure when a workload is contending on connections instead of query work. Do NOT use for query-level performance (use query-optimization), for index design (use indexing-strategy), for read/write replica routing (use replication-patterns), or for cross-shard query coordination (use sharding-strategy)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this portable skill.
compatibility:
  notes: "Portable database connection-pooling guidance. Pool limits, driver defaults, and proxy features vary by database, driver, cloud provider, and PgBouncer/proxy version; verify production behavior against the target stack."
# allowed-tools: optional runtime hint for tools the skill may use when loaded.
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: backend-engineering
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "How an application manages its database connections — the server-side cost of a connection, application-level pools (HikariCP, pgx, node-postgres) vs proxy-level pools (PgBouncer, Pgpool, ProxySQL), the three PgBouncer modes (session/transaction/statement) and their feature compatibility, the pool-sizing math (Little's Law applied to database concurrency), the failure modes (connection exhaustion, hot-loop reconnects, prepared-statement breakage under transaction pooling, idle-in-transaction leaks), and the diagnostic procedure for connection contention. Portable across any DB-backed application; principle-grounded, not repo-bound. Excludes query-level performance (query-optimization), index design (indexing-strategy), read/write replica routing (replication-patterns), and cross-shard coordination (sharding-strategy)."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/data
  # grounding: authoritative public references this portable skill is anchored on.
  # External canonical sources, not repo files — no local hash is recorded for them.
  grounding: "{\"subject_matter\":\"Portable database connection-pooling: application pools, proxy pools, PgBouncer pool modes, server-side connection costs, pool sizing, wait-time diagnostics, transaction/session feature compatibility, idle-in-transaction leaks, and reconnect storms\",\"grounding_mode\":\"universal\",\"truth_sources\":[\"https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing\",\"https://github.com/brettwooldridge/HikariCP/wiki/Down-the-Rabbit-Hole\",\"https://www.pgbouncer.org/usage.html\",\"https://www.pgbouncer.org/faq.html\",\"https://www.postgresql.org/docs/current/runtime-config-connection.html\",\"https://www.postgresql.org/docs/current/runtime-config-client.html\",\"https://www.jstor.org/stable/167570\",\"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html\",\"https://github.com/supabase/supavisor\"],\"failure_modes\":[\"Sizing pools from request rate or app-instance count instead of measured concurrency\",\"Treating max_connections as a target rather than a ceiling\",\"Assuming transaction pooling preserves all session-level database features\",\"Diagnosing pool wait time as slow query time\",\"Ignoring idle-in-transaction leaks that hold pool slots and open transactions\",\"Letting autoscaled or serverless clients multiply direct database connections without a proxy cap\"],\"evidence_priority\":\"equal\"}"
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["connection pooling","PgBouncer","HikariCP","pool sizing","session pooling","transaction pooling","statement pooling","prepared statements","idle in transaction","Little's Law"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["connection-pooling","what should max pool size be","PgBouncer transaction mode","too many connections error","connection exhaustion","prepared statements not working with PgBouncer"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["size a connection-pooling pool using Little's Law, database cores, query time, and app instance count","diagnose connection-pooling exhaustion where pool.acquire_time_p99 is high but query latency is normal","decide between PgBouncer session mode, transaction mode, and statement mode for prepared statements and SET LOCAL","explain why HikariCP recommends small connection pools instead of large ones"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["choose the transaction isolation level for concurrent account transfers","move a slow export into a background job queue with retry policy","model a producer, stream, consumer, backpressure, and termination contract for an SSE progress stream"]
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Connection pooling is the discipline of managing a finite set of database connections shared across many application threads, requests, or processes — because opening a connection is expensive (network round-trips, authentication, session setup) and every open connection consumes server resources (in Postgres, a backend process and associated memory/state; in MySQL, a thread; in serverless variants, different but still non-zero costs). Two pool layers: *application-level pools* (in-process: HikariCP for the JVM, pgx pool for Go, node-postgres Pool for Node.js) and *proxy-level pools* (external services: PgBouncer, Pgpool, ProxySQL, RDS Proxy, Supavisor — multiplex many client connections onto a smaller set of upstream database connections).

    Three PgBouncer modes with different feature compatibility: *session* (full Postgres feature surface — prepared statements, `SET`, advisory locks, `LISTEN/NOTIFY`, `WITH HOLD` cursors, temporary tables across transactions; 1× multiplexing), *transaction* (high 10-100× multiplexing; no session-spanning features — `SET` must be `SET LOCAL`, advisory locks/LISTEN/WITH HOLD all break; server-side prepared statements work in PgBouncer 1.21+ only), *statement* (highest multiplexing; no transactions). Sizing math via *Little's Law*: `concurrency = arrival_rate × average_service_time`; pool size is *peak concurrency + small headroom*, not request rate. HikariCP's doctrine (Wooldridge): start with `cores × 2 + spindles` (~18 for 8 cores); raise only when measured queue waits prove a larger pool helps. Most OLTP pools are <20 per app instance. The pool's instrumentation surface — `pool.active`, `pool.idle`, `pool.waiting`, `pool.acquire_time_p99` — is the operational hygiene that makes contention legible.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces per-request connection-open (too expensive at scale) with a finite, sized-for-workload set of reused connections, and replaces "raise max_connections" with structural multiplexing through a proxy. Solves two problems: (1) opening a connection per request is too expensive (auth, TLS, session setup, server-side process creation) for high request rates; (2) every open connection has a *standing* server-side cost — Postgres uses one process per connection (~10MB memory each), and `max_connections` is not a target but a ceiling. The pool is a *throughput throttle, not a resource budget*: sizing too large doesn't make slow queries faster, it makes the database thrash and shifts the symptom from "queue waiting for connection" to "queue waiting for CPU, buffer cache, or locks." Sizing too small produces queue waits. The right size is the smallest pool that doesn't queue under peak load — typically much smaller than teams initially set, and verified by `pool.acquire_time_p99` instrumentation rather than guessed.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  concept_boundary: |
    Distinct from query-optimization, which owns the cost of individual query work — this skill owns the cost of *having a connection at all*; a workload contending on connections has different symptoms (request latency spike with normal query latency = pool exhaustion, not slow queries) and a different diagnostic discipline. Distinct from replication-patterns, which owns the routing of reads and writes across replicas — pooling sits beneath that routing, often as one pool per replica. Distinct from sharding-strategy, which owns how data is partitioned across nodes — pooling multiplies surface in a sharded architecture (one pool per shard). Distinct from transaction-isolation, which owns per-transaction concurrency-correctness — this skill owns connection-level mechanics that determine whether a transaction's connection is held, released, or shared; PgBouncer transaction mode in particular interacts with session state and isolation. Distinct from indexing-strategy and entity-relationship-modeling (those govern what the database does; pooling governs how the application talks to it).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A connection pool is to a database what a taxi rank is to an airport — every taxi has a standing cost (driver salary, fuel, parking space); a rank with too few taxis leaves passengers queuing on the curb; a rank with too many burns money on idle taxis and clogs the access road. The right number is the smallest that doesn't queue under peak arrival rate, sized by how long each taxi trip actually takes — and adding more taxis doesn't make the trips faster, it just lets more start at once."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that bigger pools are better (more capacity), and that pool size should scale with application server count or request rate. They are not, and it should not. A pool sized for request rate over-sizes by 10× or more, and when many app instances multiply against that mis-sizing, the database hits `max_connections` and thrashes — symptoms migrate from "queue waiting for connection" to "queue waiting for CPU or locks." HikariCP's documented advice is *small pools* (`cores × 2 + spindles`); Wooldridge's analysis (citing Oracle Real-World Performance Group's empirical findings) shows throughput-vs-pool-size curves *peak at small sizes* and degrade beyond that point. Adjacent misconceptions: that pool mode is operational only — transaction mode buys multiplexing in exchange for *feature loss* (prepared statements, `SET` without LOCAL, advisory locks, LISTEN/NOTIFY, WITH HOLD cursors all break or require workarounds; mode choice is a *feature-surface* decision auditable from application code); that pool exhaustion shows up as slow queries (it shows up as application-side request queueing; the database log looks fine; only `pool.acquire_time_p99` reveals it); that connections last forever (long-tail accumulation produces memory bloat, stale prepared-statement caches, and version drift — `maxLifetime` connection rotation is operational hygiene); that idle-in-transaction is benign (a forgotten connection holding a transaction blocks pool slots indefinitely and grows the transaction-id wraparound horizon; `idle_in_transaction_session_timeout` is required, and application code must not perform external service calls inside database transactions); and that serverless apps don't need pooling — they need it *more*, because client count can spike to thousands and a proxy pool (Supavisor, RDS Proxy, Neon Proxy) is required to cap the database-side total.
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/backend-engineering/connection-pooling/SKILL.md
# relations: typed graph edges to sibling skills.
relations:
  related: ["indexing-strategy","sharding-strategy","query-optimization","replication-patterns","transaction-isolation","transaction-isolation","background-jobs","streaming-architecture","performance-engineering"]
  suppresses: ["transaction-isolation","transaction-isolation","background-jobs","streaming-architecture"]
  verify_with: ["replication-patterns","performance-engineering","query-optimization","transaction-isolation"]
---
# Connection Pooling

## Concept of the skill

**What it is:** `connection-pooling` is the discipline for keeping a bounded set of database connections open, handing them to units of work briefly, and returning them without letting application concurrency overwhelm database-side connection capacity.

**Mental model:** A pool is a wait queue plus a small number of expensive database sessions. Size it from peak concurrent database work, measure wait time separately from query time, and choose proxy modes by the database features the application needs.

**Why it exists:** Opening a connection per request is expensive, and every open connection has a standing cost. The pool protects the database from client fan-out while keeping application work from waiting unnecessarily.

**What it is NOT:** It is not query-plan tuning, index design, replica routing, shard coordination, durable job retry design, stream backpressure, or transaction isolation semantics.

**Adjacent concepts:** `query-optimization` owns slow query work; `indexing-strategy` owns access paths; `replication-patterns` owns read/write replica routing; `sharding-strategy` owns data partitioning; `transaction-isolation` owns concurrency correctness; `background-jobs` owns durable worker retries; `streaming-architecture` owns value-stream backpressure.

**One-line analogy:** A connection pool is a taxi rank for database sessions: too few taxis leaves work waiting, too many taxis clog the road, and adding taxis does not make trips faster.

**Common misconception:** Bigger pools are not automatically more capacity; beyond the database's useful concurrency, larger pools move the bottleneck from pool wait time to CPU, locks, cache churn, and connection exhaustion.

## Coverage

The discipline of managing a finite set of database connections shared across many application threads, requests, or processes. Covers the connection cost (server-side process/thread, memory, locks), why pooling is required (open-cost amortization, throughput cap, load-shedding), application-level vs proxy-level pools, the three PgBouncer modes (session, transaction, statement) and their feature compatibility, the canonical pool-sizing math via Little's Law and HikariCP's analyses, the failure modes catalog (connection exhaustion, idle-in-transaction, hot-loop reconnect, prepared-statement breakage, cross-connection state leaks, long-tail accumulation), the operational concerns (wait-time monitoring, connection rotation, reconnect backoff, health checks), and the database-specific connection models (Postgres process-per-connection, MySQL thread-per-connection, serverless variants).

## Philosophy of the skill
The pool is a throughput throttle, not a resource budget. Sizing too large doesn't make slow queries faster — it makes the database thrash and shifts the symptom from "queue waiting for connection" to "queue waiting for CPU, buffer cache, or locks." Sizing too small produces queue waits. The right size is the smallest pool that doesn't queue under peak load — typically much smaller than teams initially set.

Pooling mode determines feature surface. The choice between session, transaction, and statement pooling is not just operational — it determines what features the application is allowed to use at the database. Transaction pooling buys multiplexing in exchange for session-feature loss; statement pooling buys further multiplexing in exchange for transaction loss. Knowing which features the application uses, and the cross-product against the pooling mode, is preconditional to choosing a mode.

The pool is the place where database-level health becomes application-level latency. A workload contending on the pool surfaces as request queueing in the application, not as slow queries in the database log. Pool instrumentation (`pool.active`, `pool.idle`, `pool.waiting`, `pool.acquire_time`) is the operational hygiene that makes contention legible.

## Sizing — Little's Law in Practice

**Little's Law:** concurrency = arrival rate × average service time.

| Workload | Arrival rate | Avg query time | Concurrency | Pool size |
|---|---|---|---|---|
| OLTP point query | 10,000 req/sec | 1 ms | 10 | 12–15 |
| OLTP transaction | 1,000 req/sec | 10 ms | 10 | 12–15 |
| Mixed read/write | 2,000 req/sec | 25 ms | 50 | 60–80 |
| Analytical | 100 req/sec | 500 ms | 50 | Pool partitioning recommended |

The pool size is *peak concurrency + small headroom*. Teams that size by request rate (treating pool size as a per-app-server quota) over-size by 10x or more, then discover the database is thrashing.

**HikariCP's documented advice:** start with `cores * 2 + effective_spindle_count` (e.g., 8 cores → pool size 18); raise only when measured queue waits prove a larger pool helps. Most OLTP pools are <20 per app instance.

## PgBouncer Mode Matrix

| Feature | Session | Transaction | Statement |
|---|---|---|---|
| Prepared statements (server-side) | ✅ | ✅ (1.21+) / ❌ (pre-1.21) | ❌ |
| `SET` session variables | ✅ | ❌ (use `SET LOCAL`) | ❌ |
| `SET LOCAL` (transaction-scoped) | ✅ | ✅ | ❌ |
| Advisory locks | ✅ | ❌ | ❌ |
| `LISTEN` / `NOTIFY` | ✅ | ❌ | ❌ |
| `WITH HOLD` cursors | ✅ | ❌ | ❌ |
| Temporary tables across transactions | ✅ | ❌ | ❌ |
| Transactions | ✅ | ✅ | ❌ |
| Multiplexing benefit | 1x | High (10–100x) | Highest |

**Default rule:** Transaction mode for production scale; verify the application uses no session-spanning features (or, if it does, audit each one). Session mode when full Postgres feature surface is required.

## The Failure Modes Catalog

| Symptom | Likely cause | First diagnostic |
|---|---|---|
| `too many connections` error | Pool size × instances > `max_connections`; reconnect storm | Sum app pools + replica pools; check reconnect rate |
| Request latency spike, query latency normal | Pool exhaustion (queries holding connections too long) | `pool.acquire_time_p99` vs query latency |
| Intermittent "prepared statement does not exist" | PgBouncer transaction mode, pre-1.21 | Upgrade PgBouncer or disable server-side prepares |
| Random session-variable values | `SET` (not `SET LOCAL`) under transaction pooling | Audit `SET` use; switch to `SET LOCAL` |
| Connections held for hours; transaction-id age growing | Idle-in-transaction | `pg_stat_activity` for long `idle in transaction` |
| Brief outage during deploy | Reconnect storm | Stagger app startup; add reconnect backoff |
| Slow degradation over weeks | Long-tail connection age (memory bloat, stale prepared statements) | Enable `maxLifetime` rotation |

## Verification

After applying this skill, verify:
- [ ] Pool size has been calculated against Little's Law for the workload — not copied from advice columns. Peak concurrency × small headroom, not request rate.
- [ ] Sum of (app pool size × app instances) + replica pools + admin connections fits inside the database's `max_connections` with headroom. The database-side total is bounded, not just the per-instance pool.
- [ ] If PgBouncer transaction mode is enabled, the application's use of prepared statements, `SET`, advisory locks, `LISTEN/NOTIFY`, and WITH HOLD cursors has been audited. Compatible patterns confirmed; incompatible patterns refactored.
- [ ] Pool instrumentation is in place: `pool.acquire_time`, `pool.active`, `pool.waiting`. Connection contention shows up as a first-class signal, not as opaque application latency.
- [ ] `idle_in_transaction_session_timeout` is set (Postgres) so leaked transactions don't hold pool slots indefinitely. Application code does not perform external service calls inside database transactions.
- [ ] Connection rotation (`maxLifetime` / `server_lifetime`) is configured so connections refresh and don't accumulate long-tail bloat.
- [ ] Reconnect backoff and circuit-breaking are configured so deploy churn or brief network partitions don't produce reconnect storms.
- [ ] If serverless or auto-scaled application instances are used, a proxy pool (PgBouncer, Supavisor, RDS Proxy) caps the database-side connection total. Client count and server connection count are decoupled.
- [ ] Long-running queries (>1s) and short-running queries are not in the same pool. Pool partitioning prevents one class from starving the other.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Tuning a slow query | `query-optimization` | query-optimization owns query-level cost; this owns connection-level cost |
| Designing indexes | `indexing-strategy` | indexing-strategy owns access-path design |
| Routing reads vs writes across replicas | `replication-patterns` | replication-patterns owns the routing layer above pooling |
| Partitioning data across shards | `sharding-strategy` | sharding-strategy owns the data-partition layer; pooling sits beneath it per shard |
| Choosing transaction isolation level | `transaction-isolation` | isolation owns the per-transaction concurrency contract |
| Designing the schema | `entity-relationship-modeling` | entity-relationship-modeling owns design; pooling is operational |

## Key Sources

- Brett Wooldridge. ["About Pool Sizing"](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing). HikariCP maintainer's canonical analysis; the source of the "small pools" doctrine. Cites Oracle Real-World Performance Group's empirical findings.
- Brett Wooldridge. ["HikariCP — Down the Rabbit Hole"](https://github.com/brettwooldridge/HikariCP/wiki/Down-the-Rabbit-Hole). Deep dive on connection pool implementation choices and overhead.
- PgBouncer Project. ["PgBouncer Documentation"](https://www.pgbouncer.org/usage.html). Reference for the three pooling modes and their feature compatibility. The 1.21 release notes document the prepared-statement support in transaction mode.
- PostgreSQL Global Development Group. ["PostgreSQL Documentation — Connection Pooling"](https://www.postgresql.org/docs/current/runtime-config-connection.html). Reference for `max_connections`, `idle_in_transaction_session_timeout`, and related configuration.
- Little, J. D. C. (1961). ["A Proof for the Queuing Formula: L = λW"](https://www.jstor.org/stable/167570). *Operations Research*, 9(3). The original Little's Law paper; basis for concurrency-based pool sizing.
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly. Discussion of database concurrency limits and their interaction with application architecture.
- Amazon Web Services. ["Amazon RDS Proxy"](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html). Managed proxy pool documentation; surfaces the serverless-vs-pool tension and the proxy's role.
- Supabase. ["Supavisor — Scalable Postgres Connection Pooler"](https://github.com/supabase/supavisor). Open-source proxy pool documentation; the recommended pooler for Neon and Supabase serverless workloads.
- Markus Winand. ["Performance — Open Source Database Pool Sizing"](https://use-the-index-luke.com/). Practitioner reference cross-cited from `indexing-strategy`; the chapter on operational concerns.
