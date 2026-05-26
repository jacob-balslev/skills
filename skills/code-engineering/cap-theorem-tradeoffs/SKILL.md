---
name: cap-theorem-tradeoffs
description: "Use when reasoning about the consistency-availability-partition-tolerance trade-off for distributed data systems: Brewer's CAP conjecture (2000), Gilbert & Lynch's 2002 formal proof, why P is not optional in any real distributed system, the CP-vs-AP dichotomy that follows, PACELC as the extension that names the latency-vs-consistency trade-off that exists even without partition, the relationship between CAP's C and ACID's C (different concepts with the same letter), and the choice procedure of naming what the system must guarantee under partition. Do NOT use for single-node transactional guarantees (use acid-fundamentals), choosing an isolation level (use transaction-isolation), the design of replication topologies (use replication-patterns), or sharding decisions (use sharding-strategy)."
license: MIT
allowed-tools: Read Grep
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"

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
  category: engineering

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: code-engineering
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: engineering/data
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: workspace
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
  keywords: "[\"CAP theorem\",\"Brewer\",\"Gilbert Lynch\",\"consistency availability partition\",\"CP system\",\"AP system\",\"PACELC\",\"eventual consistency\",\"linearizability\",\"distributed system\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"CAP theorem\",\"CP or AP\",\"what should we do on partition\",\"is this strongly consistent\",\"PACELC\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"decide whether a new distributed service should be CP or AP given its workload\",\"explain why CAP's C and ACID's C are different concepts despite sharing the letter\",\"diagnose a system claiming 'CA' (consistency + availability without P) — likely confused, since P is not optional\",\"design the partition-mode behavior of a multi-region service\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"choose a transaction isolation level (use transaction-isolation)\",\"explain the four ACID properties (use acid-fundamentals)\",\"design the replication topology of a database (use replication-patterns)\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"acid-fundamentals\",\"transaction-isolation\",\"replication-patterns\",\"sharding-strategy\"],\"boundary\":[{\"skill\":\"acid-fundamentals\",\"reason\":\"acid-fundamentals owns the single-system transactional frame; this skill owns the distributed-system frame. CAP's C (replica agreement) is not ACID's C (constraint satisfaction); conflating them is the most common misconception in this space.\"},{\"skill\":\"transaction-isolation\",\"reason\":\"transaction-isolation owns single-cluster concurrency-correctness; this skill owns multi-replica consistency under network partition. The two layers can compose (a CP system may run at serializable isolation locally) but address different threats.\"},{\"skill\":\"replication-patterns\",\"reason\":\"replication-patterns owns the design patterns for multi-replica systems (primary-replica, multi-primary, leaderless quorum); this skill owns the C/A/P trade-off that motivates choosing among them. The two compose: this is the theoretical frame; replication-patterns is the operational realization.\"},{\"skill\":\"sharding-strategy\",\"reason\":\"sharding-strategy owns horizontal partitioning of data across nodes; this skill owns the C/A trade-off when those shards must coordinate or recover from network partition between them.\"}],\"verify_with\":[\"acid-fundamentals\",\"replication-patterns\"]}"

  # === v6+ Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    CAP is Brewer's 2000 conjecture (formal proof by Gilbert & Lynch 2002) that in a distributed data system you cannot simultaneously guarantee all three of: *Consistency* (every read returns the most recent write or an error — replica agreement, often linearizability), *Availability* (every request receives a non-error response), *Partition tolerance* (the system continues despite arbitrary message loss between nodes). Real-world networks partition; P is *not optional*. The choice is between C and A *during a partition*: a *CP system* refuses to serve some requests during partition to preserve consistency (Spanner, etcd, MongoDB with majority, ZooKeeper); an *AP system* serves all requests but may return stale data (Cassandra default, DynamoDB default, Riak). "CA" is not a real choice — partitions happen, and systems that claim it have not actually been tested under partition.

    *PACELC* (Abadi 2010) extends CAP by naming the *Else* case: even without partition, the system must trade Latency against Consistency, because synchronous replication for strong consistency takes time. Four PACELC quadrants: *PA/EL* (Cassandra, DynamoDB default, MongoDB default), *PA/EC* (rare; often misconfiguration), *PC/EL* (mixed-mode systems), *PC/EC* (Spanner, Cosmos DB strong, MongoDB with majority-read). Most systems spend the overwhelming majority of their time *not* partitioned, so the steady-state latency-vs-consistency trade-off is where most users' actual experience lives. The consistency-model spectrum — linearizability, sequential, causal, read-your-writes, monotonic reads, eventual — is the vocabulary for naming the C side of the trade-off precisely.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces contradictory distributed-systems claims with shape. Before CAP, the industry claimed simultaneous strong consistency, full availability, and partition tolerance; after Brewer's conjecture and Gilbert & Lynch's formal proof, those claims have constraints. The discipline is making the C-vs-A choice *per workload, intentionally*: a banking core ledger is right to be CP (correctness over availability); a shopping cart's session state is right to be AP (availability over strict consistency); a multi-region CDN is right to be AP with eventual consistency; a schema registry or coordination service is right to be CP. PACELC makes the frame practical — a team that designs for CAP without PACELC has optimized for the rare event (partition) and ignored the daily one (steady-state latency vs consistency). The choice procedure: name what the system must do under partition (lose money if stale → CP; lose users if unavailable → AP), then choose the steady-state PACELC quadrant for the common case.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from acid-fundamentals, which owns the single-system transactional frame — this skill owns the distributed-system frame; CAP's C (replica agreement) is *not* ACID's C (constraint satisfaction), and conflating them is the most common misconception in the space. Distinct from transaction-isolation, which owns single-cluster concurrency correctness — this skill owns multi-replica consistency under network partition; the two layers can compose (a CP system may run at serializable isolation locally) but address different threats. Distinct from replication-patterns, which owns the operational design patterns (primary-replica, multi-primary, leaderless quorum) — this skill owns the theoretical C/A/P trade-off that motivates choosing among them; replication-patterns is the operational realization. Distinct from sharding-strategy, which owns horizontal partitioning across nodes — this skill owns the C/A trade-off when those shards must coordinate or recover from partition between them. Distinct from high-availability or reliability frameworks for single-node systems (HA on a single node is not a CAP concern; CAP applies to distributed-data systems specifically).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "CAP is to a distributed database what the Heisenberg uncertainty principle is to physics — you cannot simultaneously have a fully consistent reading and a fully available reading when the network has partitioned, just as you cannot simultaneously measure a precise position and a precise momentum. The trade-off is not a limit of the engineering, it is a limit of the physics; pretending otherwise is the source of every 'CA' system that claims to defy CAP and chooses one side anyway on its first partition."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that CAP says "pick any two of three" as if all three combinations are real choices. They are not. P is mandatory in real networks — physics imposes partitions, and a system that claims "CA" has not been tested under partition; when partition arrives, the system chooses C or A and the team finds out which. Adjacent misconceptions: that CAP-C is the same as ACID-C (they share the letter but measure different things — replica agreement vs constraint satisfaction; a multi-region banking system can have CAP-inconsistent replicas while every replica satisfies the balance ≥ 0 constraint, and can have CAP-consistent replicas while one of them violates the constraint); that CAP is the dominant design concern (most systems are not partitioned most of the time; PACELC's E case — the steady-state latency-vs-consistency trade-off — is the daily experience and the dominant design question); that "strong consistency" is precise (the consistency-model spectrum is wide — linearizability, sequential, causal, read-your-writes, monotonic, eventual; "strong" without specification is imprecise and the choice within the spectrum affects achievable throughput); that single-node systems need CAP analysis (they don't); and that AP means "no consistency at all" (it means *eventually* consistent, with a chosen convergence strategy: vector clocks, CRDTs, last-write-wins, anti-entropy — tunable systems like Cassandra and DynamoDB let the application choose per-operation, and the default settings are not assumed correct without verification per workload). A final misconception: that partition behavior is theoretical — it isn't; chaos engineering and network-partition simulation are how teams verify the system behaves as designed when partition actually arrives.
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"CAP is the theorem (Brewer 2000 as a conjecture; Gilbert & Lynch 2002 as a formal proof) that, in a distributed data system, you cannot simultaneously guarantee all three of: Consistency (every read returns the most recent write or an error), Availability (every request receives a non-error response), Partition tolerance (the system continues despite arbitrary message loss between nodes). Since real-world networks can and do partition, P is not optional — the choice is between C and A *during a partition*. A CP system refuses to serve some requests during partition to preserve consistency; an AP system serves all requests but may return stale data. PACELC (Abadi 2010) extends CAP by naming the *Else* case: even without partition, the system must trade Latency against Consistency, because synchronous replication for strong consistency takes time. The discipline is choosing C-vs-A *intentionally per workload*, knowing that P is given by physics and that even outside partition, latency-vs-consistency is a continuous choice.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/cap-theorem-tradeoffs/SKILL.md
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

# CAP-Theorem Tradeoffs

## Coverage

The consistency-availability-partition-tolerance trade-off that physics imposes on distributed data systems. Covers Brewer's 2000 conjecture, Gilbert & Lynch's 2002 formal proof, why P is mandatory in real networks (the practical choice is CP vs AP, not "any two of three"), the PACELC extension (Abadi 2010) that names the latency-vs-consistency trade-off in the non-partition case, the CAP-C vs ACID-C confusion that is the most-common misconception in the space, the spectrum of consistency models from linearizability to eventual consistency, the four PACELC quadrants (PA/EL, PA/EC, PC/EL, PC/EC) and the systems that occupy each, and the partition-mode choice procedure.

## Philosophy

CAP is the frame that made distributed-systems design honest. Before Brewer's 2000 conjecture and Gilbert & Lynch's 2002 proof, the industry made contradictory claims about consistency, availability, and fault tolerance; after CAP, those claims have shape. Under partition — which physics guarantees will happen — you preserve consistency at the cost of availability, or availability at the cost of consistency.

The discipline is making the choice *per workload* and *intentionally*. A banking core ledger is right to be CP. A shopping cart's session state is right to be AP. A multi-region content-delivery system is right to be AP with eventual consistency. A schema registry is right to be CP. The choice is the engineering team's responsibility; CAP names the trade-off; the design realizes the choice.

PACELC is the frame that made CAP practical. Most systems spend the overwhelming majority of their time *not* partitioned; PACELC's E (else) case names the latency-vs-consistency trade-off in the common case, which is where most users' actual experience lives. A team that designs for CAP without PACELC has optimized for the rare event and ignored the daily one.

## The CAP Theorem In One Diagram

```
                    During a network partition,
                    pick at most TWO of:

                    Consistency (C)
                          /\
                         /  \
                        / CP \       Common: Spanner, etcd,
                       /  ↓   \         MongoDB w/ majority,
                      / refuse \             ZooKeeper
                     /  some    \
                    /  requests  \
                   /              \
                  /                \
                 /                  \
                /                    \
               /         AP           \
              /  serve all requests    \
             /   accept stale reads     \    Common: Cassandra default,
            /   diverge on writes        \      DynamoDB default,
           /                              \              Riak
          /                                \
         /__________________________________\
       Availability (A)        Partition tolerance (P)

   "CA" is not a real choice — partitions happen.
```

## CAP-C vs ACID-C — A Worked Example

A multi-region banking system with eventual consistency:

| Scenario | CAP-C status | ACID-C status |
|---|---|---|
| Both replicas show balance = $500 (constraint: balance ≥ 0) | Consistent | Consistent |
| Replica A shows $500, replica B shows $400 (constraint: balance ≥ 0) | INconsistent (CAP) | Consistent (no constraint violated) |
| Both replicas show balance = -$100 (constraint: balance ≥ 0) | Consistent | INconsistent (constraint violated) |
| Replica A shows balance = -$100, replica B shows $500 | INconsistent (CAP) | INconsistent (replica A violates) |

The two C's measure different things. The system needs both to be operationally correct.

## PACELC Quadrants

| Quadrant | Partition behavior | Else (steady-state) behavior | Example systems |
|---|---|---|---|
| **PA/EL** | AP | Latency over consistency | Cassandra default, DynamoDB default, MongoDB default |
| **PA/EC** | AP | Consistency over latency | Rare; often misconfiguration |
| **PC/EL** | CP | Latency over consistency | Some real-world systems (mixed mode) |
| **PC/EC** | CP | Consistency over latency | Spanner, Cosmos DB strong, MongoDB w/ majority-read |

Choosing for the steady-state matters more than choosing for partition in most workloads.

## The Choice Procedure

1. **What does the system do if data goes stale by 10 seconds during a partition?** If the answer is "users see slightly old data; we reconcile later" — AP is viable. If the answer is "we lose money / corrupt records / fail an SLA" — CP is required.

2. **What does the system do if 50% of requests fail for 60 seconds during a partition?** If "users retry; we lose some requests" — CP is viable. If "we churn users / lose orders / break business" — AP is required.

3. **In the steady state, do we want low latency (EL) or strong consistency (EC)?** This is the dominant question for most workloads, since partition is rare. Strong consistency in the common case requires synchronous replication; eventual consistency in the common case allows asynchronous.

4. **Does the workload need linearizability, or is causal consistency / read-your-writes enough?** Many workloads need weaker consistency than CAP's linearizability; the choice of consistency model affects the system's achievable throughput.

5. **Is the system actually distributed?** Single-node or single-region tightly-coupled systems may not have CAP concerns at all. Avoid invoking CAP for systems where it doesn't apply.

## Verification

After applying this skill, verify:
- [ ] The team distinguishes CAP-C (replica agreement) from ACID-C (constraint satisfaction) in design discussions. Using "consistency" without qualifier produces confused decisions.
- [ ] The system's CP-or-AP choice is explicit, documented, and tied to the workload's tolerance for stale data vs unavailability.
- [ ] The PACELC quadrant is identified for the system. The steady-state latency-vs-consistency trade-off is treated as the dominant design decision, not as an afterthought to CAP.
- [ ] Partition-mode behavior is tested, not assumed. The team has actually exercised partition (chaos engineering, network-partition simulation) and verified the system behaves as designed.
- [ ] Reconciliation logic is in place for AP systems. Eventual consistency requires the team to have a defined convergence strategy (vector clocks, CRDTs, last-write-wins, anti-entropy) and to have tested it.
- [ ] No system claims "CA" without challenge. CA is not a real choice; systems that claim it have not actually been tested under partition.
- [ ] For tunable systems (Cassandra, DynamoDB), the per-operation consistency choice is intentional. The default settings are not assumed correct without verification per workload.
- [ ] The consistency model is named (linearizability, causal, read-your-writes, eventual). "Strong consistency" without specification is imprecise.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Reasoning about single-node transactional guarantees | `acid-fundamentals` | acid-fundamentals owns single-system; this owns distributed |
| Choosing an isolation level for concurrent transactions | `transaction-isolation` | transaction-isolation owns single-cluster concurrency |
| Designing replication topology (primary-replica, multi-primary, etc.) | `replication-patterns` | replication-patterns owns the operational realization of CAP choices |
| Sharding decisions for horizontal scaling | `sharding-strategy` | sharding owns horizontal partitioning; this owns the consistency frame across shards |
| Tuning a query for performance | `query-optimization` | query-optimization owns retrieval performance |
| Designing for high availability without distributed concerns | high-availability or reliability skills | HA on a single node is not a CAP concern |

## Key Sources

- Brewer, E. (2000). ["Towards Robust Distributed Systems" (PODC 2000 keynote)](https://www.cs.berkeley.edu/~brewer/cs262b-2004/PODC-keynote.pdf). The original CAP conjecture as Brewer presented it.
- Gilbert, S., & Lynch, N. (2002). ["Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services"](https://www.glassbeam.com/sites/all/themes/glassbeam/images/blog/10.1.1.20.1495.pdf). *ACM SIGACT News*, 33(2), 51-59. The formal proof; the canonical academic reference.
- Brewer, E. (2012). ["CAP Twelve Years Later: How the 'Rules' Have Changed"](https://ieeexplore.ieee.org/document/6133253). *IEEE Computer*, 45(2), 23-29. Brewer's retrospective; clarifies the misconceptions that grew up around the theorem.
- Abadi, D. (2010). ["Problems with CAP, and Yahoo's little known NoSQL system"](http://dbmsmusings.blogspot.com/2010/04/problems-with-cap-and-yahoos-little.html) and (2012) ["Consistency Tradeoffs in Modern Distributed Database System Design: CAP is Only Part of the Story"](https://ieeexplore.ieee.org/document/6127847). *IEEE Computer*, 45(2), 37-42. The introduction of PACELC as the extended frame.
- Kleppmann, M. (2017). *Designing Data-Intensive Applications*. O'Reilly. Chapter 9 (Consistency and Consensus) — modern practitioner treatment of CAP, PACELC, and the consistency model spectrum.
- Bailis, P., Davidson, A., Fekete, A., Ghodsi, A., Hellerstein, J. M., & Stoica, I. (2014). ["Highly Available Transactions: Virtues and Limitations"](https://dl.acm.org/doi/10.14778/2732232.2732237). *VLDB 2014*. Modern academic treatment of the consistency models that sit between linearizability and eventual consistency.
- Vogels, W. (2009). ["Eventually Consistent"](https://queue.acm.org/detail.cfm?id=1466448). *ACM Queue*, 6(6). The canonical practitioner essay on eventual consistency, written by Amazon's CTO.
- Lipton, R. J., & Sandberg, J. S. (1988). ["PRAM: A Scalable Shared Memory"](https://www.cs.princeton.edu/research/techreps/TR-180-88). Princeton technical report. Early work on weak consistency models that inform CAP-era distributed databases.
- Bailis, P., & Ghodsi, A. (2013). ["Eventual Consistency Today: Limitations, Extensions, and Beyond"](https://queue.acm.org/detail.cfm?id=2462076). *ACM Queue*. Modern survey of the eventual-consistency spectrum.
