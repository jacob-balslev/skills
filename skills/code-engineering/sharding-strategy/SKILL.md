---
name: sharding-strategy
description: "Use when reasoning about horizontal partitioning of data across nodes for storage capacity and write throughput beyond a single node: the three foundational partitioning schemes (range, hash, directory/lookup), the shard-key choice that determines whether the system scales or hotspots, the resharding problem and how consistent hashing addresses it, cross-shard queries and the joins-and-transactions trade-off, the relationship to replication (sharding partitions data; replication copies each shard), and the failure modes (hot shard, skewed distribution, cross-shard transactions, range-end overload). Do NOT use for replicating the same data across nodes (use replication-patterns), the CAP/PACELC frame (use cap-theorem-tradeoffs), single-node performance tuning (use query-optimization), or indexing within a shard (use indexing-strategy)."
license: MIT
allowed-tools: Read Grep
metadata:
  schema_version: 8
  version: "1.0.0"
  type: capability
  operation: know
  category: engineering
  subject: code-engineering
  domain: engineering/data
  scope: workspace
  owner: skill-graph-maintainer
  freshness: "2026-05-16"
  drift_check: "{\"last_verified\":\"2026-05-16\"}"
  eval_artifacts: planned
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: experimental
  keywords: "[\"sharding\",\"partitioning\",\"horizontal partitioning\",\"shard key\",\"hash partitioning\",\"range partitioning\",\"consistent hashing\",\"hot shard\",\"resharding\",\"cross-shard query\"]"
  triggers: "[\"how should we shard\",\"what's the right shard key\",\"hot shard\",\"cross-shard transaction\",\"consistent hashing\"]"
  examples: "[\"choose a shard key for a multi-tenant system where 90% of queries are tenant-scoped\",\"diagnose a hot shard caused by skewed shard-key distribution\",\"design the resharding strategy when adding nodes to a hash-sharded cluster\",\"decide whether to accept cross-shard JOIN complexity or denormalize\"]"
  anti_examples: "[\"design replication topology for the same data (use replication-patterns)\",\"tune a single slow query (use query-optimization)\",\"design indexes within one shard (use indexing-strategy)\"]"
  relations: "{\"related\":[\"replication-patterns\",\"cap-theorem-tradeoffs\",\"indexing-strategy\",\"data-modeling\"],\"boundary\":[{\"skill\":\"replication-patterns\",\"reason\":\"replication-patterns owns copying the same data across nodes; this skill owns splitting different data across nodes. The two compose: a sharded system can replicate each shard. They answer different questions.\"},{\"skill\":\"cap-theorem-tradeoffs\",\"reason\":\"cap-theorem-tradeoffs owns the theoretical consistency-availability frame; this skill owns the operational partitioning that often interacts with it (cross-shard transactions have stronger consistency requirements than single-shard ones).\"},{\"skill\":\"indexing-strategy\",\"reason\":\"indexing-strategy owns within-node retrieval; this skill owns how data is divided across nodes. Indexes within a shard are designed normally; cross-shard secondary indexes are a separate, harder problem.\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling owns schema and access-pattern design; this skill owns the partitioning of that schema across nodes. The shard key is a schema design decision with operational consequences.\"}],\"verify_with\":[\"replication-patterns\",\"data-modeling\"]}"
  mental_model: |
    Sharding (horizontal partitioning) is the discipline of dividing a database's data across multiple nodes so each node holds a subset — a *shard*. The unit of judgment is the *shard key*: the column or columns the system uses to route each row to a specific shard. Three foundational schemes: *range partitioning* (contiguous shard-key value ranges per shard — strong for range queries `BETWEEN x AND y`; weak for hotspots at range boundaries and for resharding-by-split), *hash partitioning* (`hash(shard_key) % N` — strong for even balance and no range hotspots; weak for range queries which become scatter-gather, and for resharding which rehashes nearly all data), *consistent hashing* (hash ring with each key routed to the nearest clockwise shard — adding shards moves only 1/N of data; the practical refinement that makes hash partitioning operationally reasonable for systems that grow), and *directory / lookup partitioning* (explicit map per key or key-range — strong for arbitrary placement; weak because the directory itself becomes a bottleneck).

    The shard-key selection rules: (1) appears in nearly every query's WHERE clause (shard-locality so queries hit one shard), (2) distributes data evenly (high cardinality, no value dominates traffic), (3) immutable for a row (moving rows between shards is expensive), (4) predictable growth (won't shift hotspots over time), (5) matches natural grain of operations (common transactions are single-shard). Common keys: `tenant_id` for multi-tenant SaaS, `user_id` for per-user data, `time_bucket(timestamp)` for time-series (recent shards hot, older cold — often acceptable), `region` for geographic placement.
  purpose: |
    Replaces "scale vertically forever" with horizontal capacity for write throughput, storage, and geographic placement. Solves the problem that when write throughput exceeds the primary's capacity, when storage approaches the node's limit, or when geographic placement is regulatory or latency-driven, the simpler single-node tools — replication (scales reads), caching (reduces load), denormalization (eliminates joins), vertical scaling (adds capacity) — are no longer sufficient. Sharding is the *scaling tool of last resort* — reached for only when the simpler tools are exhausted, because it adds operational complexity proportional to the gain. The shard key is the most consequential design decision: a well-chosen key gives nearly linear scaling; a poorly-chosen key pays operational complexity without capacity gain — hotspots concentrate on one shard, common queries scatter-gather across all shards, transactions require two-phase commit and become slow and failure-prone. The schema must be designed *with sharding in mind from the start*, or significant refactoring is required when sharding is later introduced.
  boundary: |
    Distinct from replication-patterns, which owns copying the *same* data across nodes for fault tolerance and read scaling; this skill owns dividing *different* data across nodes for write throughput and storage capacity. The two compose in production (sharded systems replicate each shard) but answer different questions. Distinct from cap-theorem-tradeoffs, which owns the theoretical consistency-availability frame; this skill is operational partitioning that often interacts with it (cross-shard transactions require stronger consistency than single-shard ones, and the application typically pays that cost as two-phase commit or distributed consensus latency). Distinct from indexing-strategy, which owns within-node retrieval — indexes within a shard are designed normally; cross-shard secondary indexes are a separate, harder problem. Distinct from data-modeling, which owns schema and access-pattern design — the shard key is a schema decision with operational consequences. Distinct from query-optimization (single-query performance, within a shard) and acid-fundamentals (single-system transactional frame; cross-shard transactions need distributed commit which is a different problem at a different layer).
  analogy: "Sharding is to a database what tenant-based building partitioning is to a multinational corporation — replicating each office to multiple cities is fault tolerance (replication); putting *Sales* in Building A and *Engineering* in Building B *because they do not talk to each other* is sharding. The shard key is the rule that decides who goes in which building, and the most catastrophic operational outcome is choosing a rule that puts everyone in Building A on Monday morning and Building B on Tuesday morning — the hot shard, where the structure was right but the routing rule was wrong."
  misconception: |
    The wrong mental model is that sharding is a database scaling lever you reach for to handle load, separately from schema design. It is not. Sharding is a *schema architecture* — queries must filter on the shard key for single-shard performance, related data must be co-located on the same shard for JOIN and transaction locality, cross-shard operations must be rare or accepted as slow, and the schema must be designed with sharding in mind from the start or significant refactoring is required when sharding is later introduced. Adjacent misconceptions: that sharding is "early-stage scaling" — it is the scaling tool of *last resort*, reached for only after replication, caching, denormalization, and vertical scaling are exhausted; that any column can be a shard key — `created_at` causes a range hotspot at the latest range, `status` has low cardinality with one value dominating traffic, and any column not in most queries' WHERE clauses turns every query into a scatter-gather; that resharding is "just rebalancing" — naive hash modulo locks the shard count and changing N rehashes nearly all data, while consistent hashing solves this but only if it was the chosen scheme from the start; that cross-shard transactions are normal — they require two-phase commit or distributed consensus, are slow, and are failure-prone, so applications under sharding are designed to make transactions single-shard by co-locating related data; that sharding and replication are alternatives — they are orthogonal axes, and a production system typically does both (shard for capacity, replicate each shard for HA).
  concept: "{\"definition\":\"Sharding (horizontal partitioning) is the discipline of dividing a database's data across multiple nodes such that each node holds a subset (a shard) of the data. The unit of judgment is the *shard key*: the column or columns the system uses to route each row to a specific shard. Three foundational schemes exist — **range partitioning** (rows with shard-key values in a contiguous range go to the same shard), **hash partitioning** (the shard-key value is hashed; the hash determines the shard), and **directory / lookup partitioning** (an explicit map records which shard owns each key or key-range). Each scheme has its own access-pattern fit, resharding complexity, and hot-shard risk profile. The strategic discipline of sharding is choosing the shard key and scheme such that (a) the per-shard load is balanced, (b) common queries can be answered by a single shard (no cross-shard scatter-gather), and (c) the system can be resharded (add nodes, rebalance data) without unacceptable downtime.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/sharding-strategy/SKILL.md
  structural_verdict: UNVERIFIED
  truth_verdict: UNVERIFIED
  comprehension_verdict: UNVERIFIED
  application_verdict: UNVERIFIED
---

# Sharding Strategy

## Coverage

The discipline of dividing a database's data across multiple nodes through horizontal partitioning. Covers the three foundational partitioning schemes (range, hash, directory), consistent hashing as the refinement that solves the resharding problem, the shard-key choice as the most consequential design decision, the cross-shard query and transaction trade-offs, the catalog of failure modes (hot shard, skewed distribution, range-boundary overload), the relationship to replication (sharding divides; replication copies; they compose), and the rule that sharding is one of the last optimizations to reach for after replication, caching, and denormalization.

## Philosophy

Sharding is the scaling tool of last resort. Replication scales reads; caching reduces load; denormalization eliminates joins; vertical scaling adds capacity. When write throughput, storage capacity, or geographic data placement exceeds what those tools provide, sharding becomes the answer.

The shard key is the most consequential design decision. It determines which queries are fast (single-shard) and which are slow (scatter-gather), which operations are atomic (single-shard) and which require distributed commit (cross-shard), which growth patterns hotspot and which balance. A team that chooses the shard key well gains nearly linear scaling; a team that chooses it poorly pays operational complexity without capacity gain.

The schema must be designed with sharding in mind from the start, or significant refactoring is required when sharding is later introduced. Queries must filter on the shard key; related data must be co-located on the same shard; cross-shard operations must be rare or accepted as slow. Sharding is a schema architecture, not just an operational technique.

## The Three Partitioning Schemes

| Scheme | How it routes | Strong for | Weak for |
|---|---|---|---|
| Range | Contiguous key ranges per shard | Range queries (`BETWEEN x AND y`) | Hotspots at range boundaries; resharding by split |
| Hash | Hash(key) % N | Even balance; no range hotspots | Range queries become scatter-gather; resharding rehashes |
| Consistent hashing | Hash ring; key → nearest clockwise shard | Adding shards moves only 1/N of data | Range queries still scatter-gather |
| Directory | Explicit map per key | Flexibility; arbitrary routing | The directory itself becomes a bottleneck |

Hash with consistent hashing is the default for most large-scale systems; range partitioning is used for time-series and naturally-ordered data; directory is rare but useful for arbitrary placement.

## The Shard-Key Selection Rules

A good shard key:

1. **Appears in nearly every query's WHERE clause** — for shard-locality.
2. **Distributes data evenly** — high cardinality; no value dominates traffic.
3. **Is immutable for a row** — moving a row between shards is expensive.
4. **Has predictable growth** — won't shift hotspots over time.
5. **Matches the natural grain of operations** — common transactions are single-shard.

Common keys:
- **Multi-tenant SaaS**: `tenant_id`. Most queries are tenant-scoped; tenants are independent.
- **Per-user data**: `user_id`. Most queries are user-scoped.
- **Time-series**: `time_bucket(timestamp)`. Recent shards hot; older shards cold (often acceptable for time-series).
- **Geographic**: `region`. Latency benefit; regulatory benefit.

Bad keys:
- `created_at` (range hotspot at latest range).
- `status` (low cardinality; one value dominates).
- A column not in most query WHERE clauses (scatter-gather every query).

## Cross-Shard Query Trade-offs

| Operation | Single-shard | Cross-shard |
|---|---|---|
| Lookup by shard key | Fast | n/a (must include shard key) |
| Lookup not using shard key | Single-shard if data co-located | Scatter to every shard |
| JOIN | Fast within shard | Slow or unavailable |
| Aggregation | Fast | Scatter-gather; partial-aggregate-then-combine |
| Transaction | ACID via single-shard primary | Two-phase commit or distributed consensus; slow and failure-prone |

Schema design under sharding co-locates related data (store user's orders on user's shard) to make JOINs and transactions single-shard.

## When Sharding Is The Right Tool

| Workload property | Tool |
|---|---|
| Read load too high | Replication (read replicas) |
| Cache hit rate possible | Caching layer |
| Joins / aggregations slow | Denormalization, materialized views |
| Single-node CPU/memory exceeded | Vertical scaling |
| Storage approaching node limit | Sharding (or larger disks first) |
| Write throughput exceeds primary | Sharding |
| Geographic latency required | Sharding by region (with replication within region) |
| Multi-tenant isolation required | Sharding by tenant |

Sharding is the answer when write throughput or storage exceeds single-node capacity. Before that, simpler tools suffice.

## Verification

After applying this skill, verify:
- [ ] Sharding is being considered after replication, caching, denormalization, and vertical scaling — not as a first response.
- [ ] The shard key is chosen against the criteria: appears in queries, distributes evenly, immutable, predictable, matches operation grain.
- [ ] Most production queries are single-shard. Scatter-gather queries are recognized as expensive and made rare.
- [ ] Related data is co-located on the same shard for JOIN and transaction locality.
- [ ] Cross-shard transactions are rare. Application design avoids them where possible.
- [ ] Resharding plan exists before launch: how shards are added, how data moves, what downtime is expected.
- [ ] Hot-shard detection is in place. Per-shard load metrics surface hotspots before they become incidents.
- [ ] Consistent hashing is used over modulo hash where resharding is anticipated. Naive hash modulo locks the shard count.
- [ ] The cross-shard query cost is documented and accepted. Reports and analytics that scatter-gather are run on read replicas or designed for the cost.
- [ ] Sharding interacts with replication intentionally — each shard's replication strategy is designed, not defaulted.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Copying the same data to multiple nodes | `replication-patterns` | replication copies; sharding partitions |
| The CAP / PACELC theoretical frame | `cap-theorem-tradeoffs` | CAP names the trade-off |
| Tuning a slow query | `query-optimization` | query-optimization is single-query |
| Designing indexes within a shard | `indexing-strategy` | indexing is within-node |
| Designing schema | `data-modeling` | data-modeling is the schema design; this is the partitioning of the schema |
| Single-node transactional behavior | `acid-fundamentals` | ACID is the single-system frame |

## Key Sources

- Karger, D., Lehman, E., Leighton, T., Panigrahy, R., Levine, M., & Lewin, D. (1997). ["Consistent Hashing and Random Trees: Distributed Caching Protocols for Relieving Hot Spots on the World Wide Web"](https://dl.acm.org/doi/10.1145/258533.258660). *STOC 1997*. The foundational paper on consistent hashing.
- DeCandia, G., Hastorun, D., Jampani, M., et al. (2007). ["Dynamo: Amazon's Highly Available Key-Value Store"](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf). *SOSP 2007*. Industrial application of consistent hashing in sharded systems; basis of Cassandra and DynamoDB.
- Chang, F., Dean, J., Ghemawat, S., et al. (2006). ["Bigtable: A Distributed Storage System for Structured Data"](https://research.google/pubs/pub27898/). *OSDI 2006*. Google's range-partitioning-based sharded store; basis of HBase and many others.
- Corbett, J. C., Dean, J., Epstein, M., et al. (2012). ["Spanner: Google's Globally-Distributed Database"](https://research.google/pubs/pub39966/). *OSDI 2012*. Modern globally-distributed database with automatic sharding and consensus-based cross-shard transactions.
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly. Chapter 6 (Partitioning) — modern comprehensive treatment of all three schemes.
- MongoDB Manual. ["Sharding"](https://www.mongodb.com/docs/manual/sharding/). Reference for MongoDB's sharded cluster architecture.
- Citus Data. ["Citus Documentation — Distributed Tables"](https://docs.citusdata.com/en/stable/sharding/data_modeling.html). Reference for Postgres + Citus distributed sharding.
- Vitess. ["Vitess Documentation — Sharding"](https://vitess.io/docs/user-guides/configuration-basic/sharding/). Reference for Vitess's MySQL-based sharded architecture (YouTube, Slack, others).
- Lakshman, A., & Malik, P. (2010). ["Cassandra: a decentralized structured storage system"](https://www.cs.cornell.edu/projects/ladis2009/papers/lakshman-ladis2009.pdf). The Cassandra paper; consistent-hashing-based leaderless sharded store.
- Sadalage, P. J., & Fowler, M. (2012). *NoSQL Distilled*. Addison-Wesley. Practitioner reference covering sharding patterns across NoSQL system types.
