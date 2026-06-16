---
# name: stable skill identifier. Match the skill directory name or the final namespace segment.
# Lowercase letters/numbers with hyphen, slash, or colon separators.
name: caching-strategies
# description: routing-facing summary of what the skill covers and when it activates.
# Include concrete triggers and an explicit negative boundary; keep routing semantics out of prose-only ambiguity.
description: "Deciding what to cache, where, and how to keep it coherent — trading freshness for speed and load reduction across the cache layers (client, CDN/edge, application in-memory, distributed cache, database). Covers the two hard problems (cache invalidation and choosing the layer), the write/read patterns (cache-aside/lazy, read-through, write-through, write-behind, refresh-ahead), expiry and TTL design, eviction policies (LRU/LFU/FIFO/TTL), staleness budgets and tolerated inconsistency, cache coherence and invalidation strategies (TTL expiry, explicit invalidation, key/tag versioning, write-through), the thundering-herd / cache-stampede problem and its mitigations (request coalescing, locks, jitter, stale-while-revalidate), HTTP caching semantics (Cache-Control, ETag, conditional requests, stale-while-revalidate/stale-if-error), CDN and edge caching, multi-layer cache hierarchies, cache key design and cardinality, negative caching, and measuring hit ratio and the cost of a miss. Stack-agnostic across Redis/Memcached, CDNs, browser cache, and framework data caches."
# license: SPDX license identifier (e.g., MIT, Apache-2.0).
license: MIT
# compatibility: runtime compatibility object. Prefer structured fields
# (`runtimes`, `node`) over free-text `notes`.
compatibility:
  notes: "Caching discipline is stack-agnostic. The layer-selection, invalidation, pattern, stampede-protection, and HTTP-caching principles apply to Redis/Memcached, CDN/edge caches, browser/HTTP caches, and framework data caches (Next.js, Rails, etc.) alike; specific client APIs and header syntax are illustrative — substitute your stack's cache primitives."
allowed-tools: Read Grep

# === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
# subject: primary browse shelf — what the skill teaches. One of twelve closed values:
# backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
# quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
subject: backend-engineering
# public: publishability/private-data gate. Boolean.
# true = publishable/shareable; false = private and excluded from public export.
# Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
public: true
# scope: free-text PRD-style statement of what the skill teaches and what it excludes.
# (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
scope: "Designing caching across layers to reduce latency and backend load without serving incorrect data. Teaches: caching as a freshness-for-speed trade and why invalidation (keeping the copy coherent with the source) and layer-choice are the two hard problems; the cache layers (client/browser, CDN/edge, application in-memory, distributed cache like Redis/Memcached, and the database's own caches) and what each is good for; the write/read interaction patterns — cache-aside (lazy loading), read-through, write-through, write-behind (write-back), and refresh-ahead — with their consistency and failure tradeoffs; TTL and expiry design and the staleness budget (how stale a given datum may be); eviction policies (LRU, LFU, FIFO, TTL) and sizing; cache coherence and invalidation strategies (time-based expiry, explicit/event-driven invalidation, key or tag versioning, write-through coherence); the cache-stampede / thundering-herd problem when many keys expire or a hot key misses, and its mitigations (request coalescing/single-flight, locks, TTL jitter, stale-while-revalidate, early/probabilistic refresh); HTTP caching semantics (Cache-Control directives, ETag and conditional requests, stale-while-revalidate / stale-if-error) and CDN/edge caching; cache key design, cardinality, and namespacing; negative caching of misses; and measuring hit ratio plus the cost-of-a-miss. Stack-agnostic. Excludes the database index design that speeds the underlying query (indexing-strategy), the SQL/query rewrite itself (query-optimization), HTTP protocol semantics in general beyond caching headers (http-semantics), connection pooling, and CDN/infrastructure provisioning."
# taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
# lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
# `subject` is sufficient.
taxonomy_domain: engineering/performance

# grounding: required when `project[]` is non-empty. Declares the truth sources
# the skill anchors to and the failure modes those sources prevent. Omit when the
# skill is universal-knowledge. `subject_matter` replaces v8 `domain_object`.
grounding:
  subject_matter: "Multi-layer caching: what to cache, which layer, which read/write pattern, and how to invalidate and protect against stampede"
  grounding_mode: universal
  truth_sources:
    - path: "https://www.rfc-editor.org/rfc/rfc9111"
      note: "RFC 9111 (HTTP Caching) — the normative semantics of Cache-Control, freshness, validation, ETag/conditional requests; grounds the HTTP-caching and CDN sections."
    - path: "https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside"
      note: "Cache-Aside pattern (Azure Architecture Center) — grounds the canonical lazy-loading read/write pattern and its consistency caveats."
    - path: "https://redis.io/docs/latest/develop/use/patterns/"
      note: "Redis patterns documentation — grounds distributed-cache patterns, key design, eviction, and TTL behavior for the in-memory/distributed layer."
    - path: "https://web.dev/articles/stale-while-revalidate"
      note: "stale-while-revalidate — grounds serving a slightly-stale cached response while refreshing in the background, a core stampede/latency mitigation."
    - path: "https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final197.pdf"
      note: "Facebook 'Scaling Memcache' (NSDI 2013) — grounds real-world cache coherence, lease-based stampede control, and the look-aside cache at scale."
    - path: "https://developers.cloudflare.com/cache/concepts/cache-control/"
      note: "Cloudflare cache concepts — grounds CDN/edge caching behavior, cache keys, and directive interpretation at the edge layer."
  failure_modes:
    - "Setting a TTL but having no invalidation strategy, so the cache serves stale data after the source changes"
    - "Many keys sharing one expiry so they all miss at once and stampede the backend (no jitter / no coalescing)"
    - "Caching at the wrong layer (e.g. per-user data in a shared CDN) leaking one user's response to another"
  evidence_priority: general_knowledge_first

# stability: lifecycle marker. One of:
# experimental (active development) / stable (production-ready) /
# frozen (no further changes expected) / deprecated.
# When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
stability: experimental

# keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
# Keep terms a user would actually type when starting a task in this skill's domain.
keywords:
  - caching strategy
  - cache invalidation
  - cache-aside
  - redis cache
  - cdn caching
  - ttl expiry
  - cache stampede
  - stale-while-revalidate
  - cache coherence
  - hit ratio

# examples: 2-5 realistic user prompts the skill SHOULD activate for.
# Written in the user's voice. Improves retrieval recall beyond keywords alone.
examples:
  - "Add a caching layer in front of this slow read endpoint without serving stale data"
  - "Our cache keys all expire at the same time and hammer the database — how do I fix the stampede?"
  - "Should this response be cached at the CDN, in Redis, or in app memory?"
  - "How do I invalidate cached data when the underlying record changes?"
  - "Cache-aside vs write-through — which fits our consistency needs?"

# anti_examples: near-miss prompts that should route ELSEWHERE.
# Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
anti_examples:
  - "Add a database index to speed up this slow query"
  - "Rewrite this N+1 query to a single join"
  - "Explain HTTP status codes and methods"
  - "Configure the connection pool size for Postgres"

# === Understanding fields (when comprehension_state: present) ===
# mental_model: the primitives of the concept and how they relate. One paragraph.
mental_model: "A cache stores a copy of data closer to the consumer so the consumer avoids recomputing or refetching it — trading freshness for speed and load. Every caching decision is two coupled choices: a STALENESS BUDGET (how out-of-date may this copy be?) and an INVALIDATION STRATEGY (how does the copy get corrected when the source changes?), made for a specific LAYER (client, CDN/edge, app memory, distributed cache, database). A cache hit is cheap; a cache miss costs the full underlying work plus the cache machinery; coherence is the standing tax you pay for keeping copies."
# purpose: the problem this concept solves and why the field exists. One paragraph.
purpose: "Recomputing or refetching the same data repeatedly is the dominant source of latency and backend load. Caching removes that redundant work by serving a stored copy — turning an expensive query, render, or API call into a fast lookup. But the copy introduces a coherence problem: it can diverge from the source of truth. The discipline exists to capture the speed/load win while controlling the staleness it creates — choosing the right layer, the right read/write pattern, the right expiry, and a real invalidation strategy, and protecting the backend from stampede when caches miss."
# concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
# the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
concept_boundary: "Caching owns the SERVE-A-STORED-COPY-AND-KEEP-IT-COHERENT decision across layers: what to cache, which layer, which read/write pattern, how to invalidate, and how to survive a stampede. It does NOT own making the SOURCE itself faster — that is the index design (indexing-strategy) or the query rewrite (query-optimization) that speeds the underlying fetch a cache miss falls back to. It does not own HTTP protocol semantics in general (it uses the Cache-Control/ETag subset), connection pooling, or CDN infrastructure provisioning. The distinguishing mechanism: caching serves and reconciles a COPY; it does not optimize the original computation."
# analogy: one-sentence metaphor preserving the core mechanism.
analogy: "Keeping a frequently-used reference book on your desk instead of walking to the library each time: lookups are instant, but when a new edition is published you must remember to swap your desk copy — otherwise you'll confidently cite stale information. The desk is the cache, the library is the source of truth, and 'remember to swap it' is invalidation."
# misconception: the wrong mental model people bring; corrected explicitly.
misconception: "That caching is 'just set a TTL.' The TTL is the easy half; the hard half is invalidation — knowing when the cached copy no longer matches the source and refreshing it without serving stale data, AND surviving the moment many keys expire at once (the stampede) without hammering the backend. 'Set a TTL and forget it' silently serves stale data after every source change and concentrates misses into traffic spikes. The engineering is in the invalidation strategy and stampede protection, not the expiry number."

# relations: typed graph edges to sibling skills. Current fields:
# related (adjacency for browse / co-routing expansion) /
# suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
#             as "I own this exclusively over X", not "use X instead") /
# boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
# verify_with (cross-check; co-loaded as one-hop expansion) /
# depends_on (composition; transitive — A→B→C loads all three) /
# broader / narrower (SKOS-style generalization) /
# disjoint_with (mutual exclusion for incompatible ownership).
relations:
  related: ["api-design", "query-optimization", "indexing-strategy", "http-semantics", "cap-theorem-tradeoffs"]
  suppresses: []
  verify_with: ["performance-engineering", "observability-modeling"]
  depends_on: ["http-semantics"]
---

# Caching Strategies

## Concept of the skill

A cache stores a copy of data closer to the consumer so repeated reads avoid the expensive recompute or refetch. The win is real — an expensive query becomes a fast lookup — but the copy creates a **coherence problem**: it can drift from the source of truth. Caching is the discipline of capturing the speed-and-load win while controlling the staleness it introduces.

Every caching decision is two coupled choices made for a specific **layer**:

1. **Staleness budget** — how out-of-date may this data be? (A price quote: seconds. A user's avatar: hours. A blog post: minutes.)
2. **Invalidation strategy** — how does the copy get corrected when the source changes? (Expiry, explicit invalidation, versioned keys, write-through.)

The two famously hard problems, per the field's oldest joke, are **cache invalidation** and naming things — and caching forces you to confront the first one directly.

## Coverage

- **The cache layers** — client/browser, CDN/edge, application in-memory, distributed cache (Redis/Memcached), and the database's own caches — and what each is good for.
- **Read/write patterns** — cache-aside (lazy loading), read-through, write-through, write-behind (write-back), refresh-ahead — with consistency and failure tradeoffs.
- **TTL and expiry** design and the **staleness budget**.
- **Eviction policies** — LRU, LFU, FIFO, TTL — and sizing.
- **Cache coherence and invalidation** — time-based expiry, explicit/event-driven invalidation, key/tag versioning, write-through coherence.
- **Cache stampede / thundering herd** — and mitigations: request coalescing (single-flight), locks/leases, TTL jitter, stale-while-revalidate, probabilistic early refresh.
- **HTTP caching semantics** — Cache-Control, ETag and conditional requests, stale-while-revalidate / stale-if-error — and CDN/edge caching.
- **Cache key design** — cardinality, namespacing, and the per-user-in-a-shared-cache trap.
- **Negative caching** of misses.
- **Measurement** — hit ratio and the cost of a miss.

## Philosophy of the skill

**Caching is a correctness risk traded for a performance win — treat it as such.** A cache that serves stale or cross-tenant data is worse than no cache: it is fast and wrong. Before adding a cache, state the staleness budget and the invalidation strategy explicitly. If you cannot say how the cache gets invalidated, you are not ready to add it.

**The miss path is the design.** A cache makes the hot path fast, but the system's behavior under misses — cold start, mass expiry, a hot key invalidated — is where caches cause outages. Design the miss path (coalescing, jitter, stale-while-revalidate) with as much care as the hit path.

## The cache layers

```
client/browser ─► CDN/edge ─► app in-memory ─► distributed cache ─► database
   (per user)      (shared,     (fastest,        (shared across       (source of
                    geo)         per-instance)     instances, Redis)     truth)
```

Choosing the layer is half the skill. Per-user data must not sit in a shared CDN (you'll leak one user's response to another). Cross-instance consistency needs a distributed cache, not per-instance memory. Static assets belong at the edge. The closer to the consumer, the faster — and the harder to invalidate.

## Read/write patterns

- **Cache-aside (lazy loading):** the app checks the cache; on a miss it loads from the source, populates the cache, and returns. Simple and resilient (cache down ≠ app down), but the first request after expiry pays the miss, and there's a small write-skew window.
- **Read-through:** the cache itself loads from the source on a miss (the app only talks to the cache). Cleaner app code; couples app to the cache.
- **Write-through:** writes go to the cache and the source synchronously — strong coherence, higher write latency.
- **Write-behind (write-back):** writes hit the cache and flush to the source asynchronously — fast writes, risk of loss if the cache dies before flush.
- **Refresh-ahead:** proactively refresh hot keys before they expire — hides miss latency, wastes work on cold keys.

Pick by the consistency you need and the failure you can tolerate.

## Invalidation strategies

- **TTL / time-based expiry** — simplest; data is correct-enough within the staleness budget, wrong after a source change until expiry.
- **Explicit / event-driven invalidation** — on a write to the source, delete or update the cached key. Coherent, but you must find *every* key affected by a change.
- **Key/tag versioning** — embed a version (or a tag) in the key; bump it to invalidate a whole class at once without enumerating keys.
- **Write-through coherence** — the write updates the cache, so it never goes stale (at write-latency cost).

There is no free invalidation: TTL is easy but stale-prone; explicit is coherent but hard to get complete; versioning trades memory for simplicity.

## Cache stampede (thundering herd)

When a hot key expires (or many keys share an expiry), the next requests all miss simultaneously and slam the backend with identical work — a self-inflicted load spike that can cascade into an outage. Mitigations:

- **Request coalescing / single-flight** — only one request recomputes the key; the rest wait and share the result.
- **Locks / leases** — the first miss takes a lease to recompute; others serve stale or wait.
- **TTL jitter** — randomize expiry so keys don't all expire together.
- **stale-while-revalidate** — serve the stale value immediately and refresh in the background.
- **Probabilistic early refresh** — refresh a key slightly before expiry with rising probability, smoothing the miss.

A caching design that ignores the miss-storm is incomplete.

## HTTP caching

For cacheable HTTP responses, the protocol gives you the tools: `Cache-Control` (max-age, s-maxage, public/private, no-store), `ETag` + conditional `If-None-Match` for cheap revalidation (304 Not Modified), and `stale-while-revalidate` / `stale-if-error` for graceful freshness. CDNs honor these directives at the edge. `private` vs `public` is a correctness control — never let a `private` (per-user) response be cached by a shared CDN.

## Verification

A caching design is sound when you can answer yes to:

- Is the **staleness budget** stated for each cached datum?
- Is there a real **invalidation strategy** (not just a TTL) for data that changes?
- Is the **layer** correct for the data's sharing scope (no per-user data in a shared cache)?
- Is the **read/write pattern** chosen for the consistency you actually need?
- Is the **miss storm** handled (coalescing, jitter, or stale-while-revalidate)?
- Do you **measure hit ratio** and know the **cost of a miss**?
- For HTTP, are `private`/`public` and validation headers correct?

If any answer is no, name the gap before shipping the cache.

## Do NOT Use When

- The task is making the **source query itself faster** via an index — that is `indexing-strategy`. A cache fronts the query; it does not optimize it.
- The task is **rewriting the query** (N+1 → join, removing a full scan) — that is `query-optimization`.
- The task is **HTTP protocol semantics in general** (methods, status codes, content negotiation) — that is `http-semantics`; caching uses only its Cache-Control/ETag subset.
- The task is **connection pooling** or **CDN/infrastructure provisioning** — out of scope.

## References

- RFC 9111 — HTTP Caching: https://www.rfc-editor.org/rfc/rfc9111
- Cache-Aside pattern (Azure): https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside
- Redis patterns: https://redis.io/docs/latest/develop/use/patterns/
- stale-while-revalidate: https://web.dev/articles/stale-while-revalidate
- Scaling Memcache at Facebook (NSDI 2013): https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final197.pdf
- Cloudflare cache concepts: https://developers.cloudflare.com/cache/concepts/cache-control/
