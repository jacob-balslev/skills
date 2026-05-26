---
name: acid-fundamentals
description: "Use when reasoning about the four ACID properties of database transactions — Atomicity, Consistency, Isolation, Durability — as foundational concepts beneath any transactional system: what each property formally guarantees, the difference between the property the database claims and the property the application gets (depending on isolation level, replication mode, and configuration), the relationship between ACID and BASE (the alternative model in many NoSQL systems), why 'C' is the most contested letter (database consistency vs application invariants), and the historical record (Härder & Reuter 1983, the Gray-Reuter transaction model, Gray's Turing lecture). Do NOT use for choosing isolation levels for a specific workload (use transaction-isolation), distributed-system CAP tradeoffs (use cap-theorem-tradeoffs), database query design (use query-optimization), or zero-downtime migration mechanics (use database-migration)."
license: MIT
allowed-tools: Read Grep
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 7
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

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: code-engineering
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: engineering
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: engineering/data
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: reference
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-21"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-16\"}"

  # === Eval-health: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: present
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
  keywords: "[\"ACID\",\"atomicity\",\"consistency\",\"isolation\",\"durability\",\"transaction\",\"BASE\",\"Härder Reuter\",\"Gray transaction model\",\"transactional guarantee\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"is this database ACID\",\"what does consistency mean\",\"ACID vs BASE\",\"is my transaction atomic\",\"what's the durability guarantee\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"explain what ACID guarantees a database does and does not provide to the application\",\"decide whether ACID or BASE is the right model for a new system\",\"diagnose a data-loss incident — likely a durability or atomicity failure\",\"explain why the 'C' in ACID is not the same as application consistency\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"choose an isolation level for a workload (use transaction-isolation)\",\"reason about availability vs consistency in a distributed system (use cap-theorem-tradeoffs)\",\"design a database schema (use data-modeling)\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"transaction-isolation\",\"cap-theorem-tradeoffs\",\"data-modeling\",\"replication-patterns\"],\"boundary\":[{\"skill\":\"transaction-isolation\",\"reason\":\"transaction-isolation owns the choice and semantics of isolation levels (read uncommitted, read committed, repeatable read, serializable, snapshot) — the 'I' of ACID specifically as a tunable. This skill owns ACID as the four-property foundational frame; transaction-isolation owns one of the four in operational depth.\"},{\"skill\":\"cap-theorem-tradeoffs\",\"reason\":\"cap-theorem-tradeoffs owns the distributed-systems frame (consistency, availability, partition tolerance) which uses 'consistency' in a different sense than the C in ACID. This skill owns the single-system transactional frame; cap-theorem-tradeoffs owns the distributed frame; conflating them is the most common misconception in this space.\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling owns schema design and entity structure; this skill owns the transactional-guarantee semantics that any data model relies on at runtime.\"},{\"skill\":\"replication-patterns\",\"reason\":\"replication-patterns owns the patterns for keeping multiple replicas in agreement; this skill owns the single-node transactional model from which distributed replication is a generalization (and often a relaxation of).\"}],\"verify_with\":[\"transaction-isolation\",\"cap-theorem-tradeoffs\"]}"

  # === v6+ Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    ACID is the precise vocabulary the database industry uses to describe transactional guarantees, codified by Härder & Reuter (1983) on Gray's transaction model. Four *orthogonal* axes: *Atomicity* (all-or-nothing per transaction; no partial state visible after failure — implemented via write-ahead logging + rollback/redo), *Consistency* (database integrity constraints satisfied — foreign keys, NOT NULL, unique indexes, CHECK constraints, triggers), *Isolation* (concurrent transactions appear serialized — locking, MVCC, Serializable Snapshot Isolation), *Durability* (committed effects survive failure — synchronous WAL flush, replication to durable storage). The four-letter frame is not a one-dimensional rating; it is a vector — a system can be atomic without being isolated, durable without being CAP-consistent, ACID-consistent (constraints satisfied) without being CAP-consistent (replicas agree).

    Each property is *configuration-graded*: in Postgres, `synchronous_commit` controls D (off → commit acknowledged before WAL flush, last few commits lost on crash); isolation level controls I (`read committed` default, `serializable` strongest; Postgres accepts `read uncommitted` but maps it to read committed, while some engines permit dirty reads); replication mode controls D-across-replicas (synchronous = replica is part of the D guarantee; async = primary-only). The strategic value of the frame is not the acronym itself but the discipline of asking, for any database in any configuration, what each property actually guarantees and what the application can rely on. "Postgres is ACID" is a vague claim; "Postgres at read committed with `synchronous_commit` on and FKs enforced gives us A, I-at-RC, D, and C" is the precise statement.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces vague claims about transactional behavior with precise vocabulary. Before ACID, database claims were imprecise ("we're safe"); after Härder & Reuter's 1983 formalization, the system's behavior on each of four orthogonal axes is the conversation. Solves the problem that a database advertising "ACID compliance" can configure any of the four properties to weaker forms — synchronous_commit off (D weakened), weaker isolation modes in engines that permit dirty reads or other anomalies (I weakened), async replication (D-across-replicas weakened), constraints disabled (C weakened) — and the application doesn't know what it actually gets. The strategic value: when a system claims ACID or relaxes some property, the conversation has precise vocabulary. The BASE alternative (Pritchett 2008) names a different point in the trade space (Basically Available, Soft state, Eventually consistent) for systems that trade strong guarantees for throughput and availability under partition; most production architectures use both, picking per component (transactional cores ACID; high-throughput non-transactional caches and streams BASE).
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from transaction-isolation, which owns the choice and semantics of isolation levels — the I axis in operational depth. This skill owns ACID as the four-property foundational frame; transaction-isolation owns one of the four axes in depth. Distinct from cap-theorem-tradeoffs, which owns the distributed-system frame — CAP's C (replica agreement) is *not* ACID's C (constraint satisfaction); this skill owns the single-system transactional frame; cap-theorem-tradeoffs owns the distributed frame; conflating them is the most common misconception in the space. Distinct from replication-patterns, which owns the patterns for keeping multiple replicas in agreement — replication is the operational layer above single-node ACID, and often relaxes some ACID properties (most notably durability and isolation in async modes). Distinct from data-modeling, which owns schema design and entity structure (this skill owns the runtime guarantee semantics that any data model relies on). Distinct from database-migration (zero-downtime mechanics) and cross-transaction coordination (sagas, two-phase commit — ACID is per-transaction; cross-transaction atomicity is a different problem at a different layer).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "ACID is to a database transaction what the four corners of a legal contract are to an agreement — Atomicity is the signing block (all parties sign together or no contract exists), Consistency is the boilerplate clauses (every clause must be satisfied for the contract to be valid), Isolation is the negotiating-room rule (other negotiations cannot read your draft until both sides initial each page), and Durability is the safe in the law office (once signed, the contract survives the office burning down)."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that ACID is a binary property a database "has" or doesn't — that "Postgres is ACID" is a complete description of the system's behavior. It is not. Each property is *configuration-graded*, and the default configuration may not give the property the team thinks it does. `synchronous_commit = off` trades durability for write throughput — last few committed transactions can be lost on crash. Some engines' read-uncommitted mode allows dirty reads; PostgreSQL maps read uncommitted to read committed, which is exactly why engine-specific documentation matters. Async replication makes the primary the only durable copy. Disabled constraints make C the application's problem, not the database's. ACID-compliance is a marketing claim until the *configuration* is named. A second misconception: that ACID's C and CAP's C are the same. They are not — ACID-C is database-constraint satisfaction (FK resolves; NOT NULL holds); CAP-C is replica agreement (all replicas return the same value). A system can be ACID-C and CAP-inconsistent (constraints hold; replicas disagree), or CAP-C and ACID-inconsistent (replicas agree; foreign key violated). Using "consistency" without qualifier in design discussions produces confused decisions. A third: that ACID solves cross-transaction coordination — it does not; sagas, two-phase commit, and outbox patterns are a separate problem at a layer above per-transaction guarantees.
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"ACID is the acronym for four properties that a database transaction either provides or does not provide, defining the contract between the database and the application using it: Atomicity (the transaction either entirely happens or entirely does not — there is no partial state visible after a failure), Consistency (the transaction takes the database from one valid state to another valid state per the database's defined integrity constraints), Isolation (concurrent transactions do not see each other's intermediate states; each transaction observes the database as if it were the only transaction), Durability (once the transaction commits, its effects survive any subsequent failure including power loss). The four properties were codified by Härder and Reuter (1983) based on Jim Gray's earlier transaction model and have become the foundational vocabulary for relational and many NoSQL database systems. The strategic value of the ACID frame is that it names the four orthogonal guarantees the application can rely on, so that when a database advertises 'ACID compliance' or claims to relax some property, the conversation has precise vocabulary.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/acid-fundamentals/SKILL.md
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

# ACID Fundamentals

## Coverage

The four foundational transactional properties — Atomicity, Consistency, Isolation, Durability — that define the contract between a database and the application using it. Covers what each property formally guarantees, the implementation mechanisms underneath each (write-ahead logging for atomicity; locking and MVCC for isolation; constraint checking for consistency; synchronous storage flush for durability), the configuration-dependent strength of each property, the BASE alternative model for systems that trade ACID guarantees for availability, the C-of-ACID vs C-of-CAP distinction that is the most-frequently-confused concept in the space, and the historical record from Gray's transaction model through Härder & Reuter's 1983 formalization.

## Philosophy

ACID is the precise vocabulary the database industry uses to describe transactional guarantees. Before ACID, claims were vague; after ACID, a system's behavior on each of four orthogonal axes is the conversation. The strategic value of the frame is *not* the acronym itself but the discipline of asking, for any database in any configuration, what each property actually guarantees and what the application can rely on.

The frame's defining property is that it names four *orthogonal* axes. A system can be atomic without being isolated; it can be durable without being consistent in the CAP sense; it can be consistent (database constraints satisfied) without being consistent across replicas. The four-letter frame is not a one-dimensional rating; it is a vector.

The discipline is in the configuration. "Postgres is ACID" is a vague claim; "Postgres at read committed isolation with synchronous_commit on with foreign-key constraints enforced gives us A, I (at read-committed level), D, and C" is the precise statement. Knowing what your specific database guarantees in your specific configuration is operational hygiene; assuming the default is a class of incident.

## The Four Properties — Precise Definitions

| Property | Guarantee | Implementation |
|---|---|---|
| Atomicity | All-or-nothing per transaction; no partial state visible after failure | Write-ahead logging + rollback/redo |
| Consistency | Database integrity constraints satisfied across the transaction | Foreign keys, NOT NULL, unique indexes, CHECK constraints, triggers |
| Isolation | Concurrent transactions appear serialized | Locking, MVCC, serializable snapshot isolation |
| Durability | Committed effects survive failure | Synchronous WAL flush, replication to durable storage |

Each property is graded. Atomicity is essentially binary. Isolation has five+ levels (see `transaction-isolation`). Durability has multiple configurations (local sync, local async, replicated sync, quorum). Consistency has database-level rules vs application-level rules.

## The Two C's — ACID vs CAP

| Property | What it means | Example |
|---|---|---|
| ACID Consistency | Database integrity constraints satisfied | FK reference resolves; UNIQUE constraint holds |
| CAP Consistency | All replicas agree on the current value | All replicas return the same balance for account #1234 |

A database can be ACID-Consistent and CAP-Inconsistent (constraints hold; replicas disagree). A database can be CAP-Consistent and ACID-Inconsistent (replicas agree; foreign key was violated). They are different concepts with the same letter and are the most-confused pair in the space.

## ACID vs BASE

| Property | ACID | BASE |
|---|---|---|
| A | Atomicity per transaction | Basically Available |
| C | Database-level Consistency | Soft state |
| I | Isolation between concurrent transactions | (no I in BASE) |
| D | Durability | Eventually consistent |
| Trade | Strong guarantees, limited throughput/availability under partition | High throughput/availability, weaker correctness guarantees |
| Typical use | Transactional cores: orders, payments, accounts | High-throughput non-transactional: streams, analytics, caches |
| Examples | Postgres, Oracle, SQL Server, MongoDB transactions | Cassandra, Riak (default), DynamoDB (default) |

Most production architectures use both, picking per component.

## Configuration Matters

Three configuration knobs that change what your database actually guarantees:

| Knob | Default in Postgres | Effect when changed |
|---|---|---|
| `synchronous_commit` | `on` (durable) | `off` → commit acknowledged before WAL flush; last few commits lost on crash |
| Isolation level | `read committed` | `serializable` is strongest; Postgres maps `read uncommitted` to read committed, while some engines permit dirty reads |
| Replication mode | none | Synchronous replication = D guarantees include replica; async = primary-only |

Knowing your production configuration — not assuming the default — is operational hygiene.

## Verification

After applying this skill, verify:
- [ ] The team can name what each ACID property guarantees and what it does not, distinct from the CAP properties.
- [ ] The current database's configuration is known: isolation level, durability config, replication mode. The team is not relying on assumed defaults.
- [ ] ACID's C and CAP's C are distinguished in design discussions. Using "consistency" without qualifier produces confused decisions.
- [ ] Application-level invariants (business rules) are recognized as the application's responsibility, not delegated to the database's ACID consistency.
- [ ] For systems that mix ACID and BASE components, the boundary is explicit: which data lives in which model and why.
- [ ] Cross-transaction atomicity (sagas, two-phase commit) is recognized as a different problem from in-transaction atomicity. ACID does not solve cross-transaction coordination.
- [ ] Production incidents that involve data loss or corruption are diagnosed against the specific ACID property that failed — and against the configuration that determined the failure boundary.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Choosing an isolation level for a specific workload | `transaction-isolation` | transaction-isolation owns the I axis in operational depth |
| Reasoning about replica agreement, availability under partition | `cap-theorem-tradeoffs` | CAP is the distributed-systems frame; this is the single-system frame |
| Designing the database schema or entity model | `data-modeling` | data-modeling owns design; this owns runtime guarantees |
| Applying a zero-downtime migration | `database-migration` | database-migration owns migration mechanics |
| Designing patterns for replicated systems | `replication-patterns` | replication is the operational layer above single-node ACID |
| Choosing between ACID and BASE for a new system | `cap-theorem-tradeoffs` + this skill | cap-theorem provides the distributed frame; this provides the transactional frame |

## Key Sources

- Härder, T., & Reuter, A. (1983). ["Principles of Transaction-Oriented Database Recovery"](https://dl.acm.org/doi/10.1145/289.291). *ACM Computing Surveys*, 15(4), 287-317. The canonical paper that coined the ACID acronym and consolidated the transaction model.
- Gray, J. (1981). ["The Transaction Concept: Virtues and Limitations"](https://jimgray.azurewebsites.net/papers/thetransactionconcept.pdf). *VLDB 1981*. The foundational paper on the transaction concept that Härder & Reuter built on.
- Gray, J., & Reuter, A. (1992). *Transaction Processing: Concepts and Techniques*. Morgan Kaufmann. The canonical textbook on transaction processing; deep treatment of all four ACID properties and their implementation.
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly. Chapter 7 (Transactions) provides modern practitioner treatment of ACID, BASE, and the configuration-dependent nature of transactional guarantees.
- PostgreSQL Global Development Group. ["PostgreSQL Documentation — Transaction Isolation"](https://www.postgresql.org/docs/current/transaction-iso.html). Reference for Postgres's specific implementation of isolation levels and the durability/consistency configuration surface.
- Pritchett, D. (2008). ["BASE: An Acid Alternative"](https://queue.acm.org/detail.cfm?id=1394128). *ACM Queue*. The canonical practitioner essay defining BASE as the alternative model for high-throughput distributed systems.
- Bailis, P., & Ghodsi, A. (2013). ["Eventual Consistency Today: Limitations, Extensions, and Beyond"](https://queue.acm.org/detail.cfm?id=2462076). *ACM Queue*. Modern treatment of the consistency models on the BASE side, including extensions to eventual consistency.
- Brewer, E. (2012). ["CAP Twelve Years Later: How the 'Rules' Have Changed"](https://ieeexplore.ieee.org/document/6133253). *IEEE Computer*, 45(2), 23-29. Brewer's revisit of CAP; useful for grounding the ACID-vs-CAP distinction.
- Berenson, H., Bernstein, P., Gray, J., Melton, J., O'Neil, E., & O'Neil, P. (1995). ["A Critique of ANSI SQL Isolation Levels"](https://dl.acm.org/doi/10.1145/568271.223785). *SIGMOD 1995*. Foundational paper on the practical issues with isolation-level definitions; required reading for understanding the I axis.
