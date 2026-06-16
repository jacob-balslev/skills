---
name: seo-strategy
# description: routing-facing summary of when this skill activates and what it covers.
description: "SEO implementation strategy for building pages that rank -- covering content strategy, programmatic SEO at scale, marketplace-specific SEO, and AI search optimization."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime and portability notes for this skill.
compatibility:
  notes: "Markdown, Git, agent-skill runtimes"
allowed-tools: Read Grep Bash
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  # version: skill content version (semver). Bumped when the instructional content changes.


  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0020 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: quality-assurance
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # scope: required free-text statement of what this skill teaches and what it does not.
  scope: "Teaches proactive SEO implementation strategy: page-type selection, content-cluster planning, programmatic template design, structured data choice, marketplace-specific ranking mechanics, and AI-search citation readiness. Portable across SaaS, e-commerce, marketplace, and content sites. Excludes keyword clustering as its own task, information-architecture/navigation design, monitoring trend sources, and conversion copy optimization."
  subjects: [quality-assurance, product-domain]
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: quality/display
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
  keywords: ["seo strategy","programmatic seo","content strategy","comparison page","alternative page","schema markup","structured data","ai seo","marketplace seo","etsy seo"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["seo-strategy-skill","seo-skill","programmatic-seo-skill"]
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/quality-assurance/seo-strategy/SKILL.md
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
  related: ["keywords","content-monitor","etsy","information-architecture","microcopy"]
---
# SEO Strategy Skill

## Concept of the skill

SEO implementation strategy for building pages that rank -- covering content strategy, programmatic SEO at scale, marketplace-specific SEO, and AI search optimization.


## Domain Context

**What is this skill?** SEO implementation strategy for building pages that rank -- covering content strategy, programmatic SEO at scale, marketplace-specific SEO, and AI search optimization.

## Key Files

| File | Purpose |
|---|---|
| `skills/seo-strategy/references/marketplace-seo-differences.md` | See for detailed algorithm breakdowns. |
## Philosophy of the skill
Auditing finds problems; this skill builds solutions. The distinction matters because agents conflate the two and either run a diagnostic when they should be building pages, or build pages without a strategy. SEO strategy is proactive — choosing the right page types, content structures, and schema markup before traffic data exists. The marketplace-specific sections exist because applying Google SEO assumptions to Etsy or Amazon actively hurts rankings: Etsy rewards recency and conversion rate, Amazon rewards sales velocity, and neither cares about backlinks. Without this skill, agents default to generic "add keywords" advice that misses the structural decisions (programmatic templates, hub-and-spoke linking, schema choice) that create ranking power at scale.

## Coverage

E-commerce SEO (product page optimization, collection page strategy, cross-selling internal links), SaaS SEO (comparison/alternative pages, feature pages, documentation SEO, blog cluster strategy), marketplace SEO algorithm differences (Shopify Google organic, Etsy recency and Category Relevance Score, Amazon A9/COSMO), programmatic SEO template patterns (comparison pages, integration pages, location pages), schema markup implementation (Product, FAQ, HowTo, BreadcrumbList, SoftwareApplication), and AI search optimization (AEO, GEO, LLMO for AI Overviews and chatbot citations).


> seo-audit finds problems. This skill builds solutions.

## When to Use This Skill

Load this skill when:
- Building new pages optimized for organic search
- Planning content strategy for organic growth (blog clusters, comparison pages)
- Implementing programmatic SEO at scale (100+ templated pages)
- Optimizing product listings for marketplace search algorithms
- Adding schema markup (JSON-LD structured data)
- Adapting content for AI search (AI Overviews, chatbot citations)

Do NOT use for:
- Keyword research and clustering (use `keywords`)
- Page hierarchy, navigation, or findability structure (use `information-architecture`)
- Monitoring source feeds for trend discovery (use `content-monitor`)
- Conversion-focused headline, CTA, or in-page copy wording (use `microcopy`)
- Product or marketplace research before SEO decisions (use `user-research`)

---

## 1. Content Strategy by Site Type

### Decision Tree

```
What type of site?
├── E-commerce (Shopify/Etsy/Amazon)
│   ├── Collection pages → target generic keywords (higher volume)
│   ├── Product pages → target specific long-tail keywords
│   └── Blog → build topical authority, link to collections
├── SaaS
│   ├── Comparison pages → "[product] vs [competitor]" at scale
│   ├── Alternative pages → "[competitor] alternatives"
│   ├── Feature pages → one page per feature, deep content
│   ├── Integration pages → "[product] + [integration]" at scale
│   └── Blog → educational content linking to product pages
└── Content/Blog
    ├── Pillar pages → comprehensive guides on core topics
    ├── Cluster pages → specific subtopics linking to pillar
    └── FAQ pages → question-based content for featured snippets
```

### E-Commerce SEO Strategy

**Collection pages rank higher than product pages.** Prioritize collection page optimization:
- Unique H1 with primary keyword
- 200+ words of original descriptive content above and below the product grid
- Internal links to related collections
- Breadcrumb navigation with schema markup

**Product pages target specific long-tail:**
- Title: `[Brand] [Product Name] [Key Attribute] | [Store Name]`
- Original description (never manufacturer copy)
- All image alt tags descriptive and keyword-relevant
- Related products section for internal linking
- Product schema markup with price, availability, reviews

### SaaS SEO Strategy

**Comparison and alternative pages are highest-ROI for SaaS:**
- Template: `[Your Product] vs [Competitor]: [Honest Comparison]`
- Structure: feature table, pricing comparison, use case recommendations
- Honest tone — acknowledge where competitors excel (builds E-E-A-T trust)
- CTA at the end, not the beginning

---

## 2. Programmatic SEO

### When to Use Programmatic SEO

Use when you can generate 100+ unique pages from structured data with genuine value per page. Each page must pass the "would a human find this useful?" test.

### Template Architecture

```
Data Source (DB/Spreadsheet/API)
    ↓
Template Engine (Next.js dynamic routes)
    ↓
Unique Page = Template + Dynamic Data + Unique Content Blocks
    ↓
Internal Linking (category → subcategory → page → related pages)
    ↓
XML Sitemap (auto-generated, all pages included)
```

### Programmatic SEO Patterns

| Pattern | URL Structure | Example | Data Source |
|---------|-------------|---------|-------------|
| **Comparison** | `/compare/[a]-vs-[b]` | `/compare/printify-vs-printful` | Product database |
| **Location** | `/[service]-in-[city]` | `/pod-suppliers-in-london` | City database |
| **Integration** | `/integrations/[platform]` | `/integrations/shopify` | Integration catalog |
| **Alternative** | `/alternatives/[competitor]` | `/alternatives/printful` | Competitor list |
| **Template/Tool** | `/tools/[calculator-type]` | `/tools/profit-margin-calculator` | Tool catalog |

### Thin Content Guardrails

Every programmatic page MUST have:
1. Unique title and H1 (not just variable swapped)
2. At least one paragraph of unique descriptive content
3. Unique data points (stats, features, pricing) not found on other pages
4. Internal links to related pages in the same programmatic set
5. No duplicate meta descriptions across pages

**Red flags that trigger Google thin content penalties:**
- 95%+ identical content across pages (only city name swapped)
- No unique data — just template with variable substitution
- Boilerplate FAQ repeated across all pages
- Missing internal linking between related pages

---

## 3. Marketplace SEO Differences

See `references/marketplace-seo-differences.md` for detailed algorithm breakdowns.

### Quick Comparison

| Factor | Shopify (Google) | Etsy | Amazon |
|--------|-----------------|------|--------|
| **Primary algorithm** | Google organic | Etsy search (proprietary) | A9 / COSMO |
| **Ranking signal #1** | Backlinks + content quality | Recency + conversion rate | Sales velocity + conversion |
| **Title optimization** | 50-60 chars, keyword at start | 140 chars, front-load keywords | 80 chars optimal, keyword-rich |
| **Content depth** | Critical (500+ words ideal) | Less important (tags matter more) | Bullet points + A+ content |
| **Reviews impact** | Indirect (trust signal) | Direct ranking factor | Direct ranking factor |
| **Freshness** | Moderate (evergreen can rank) | High (recent listings boosted) | Moderate (sales velocity matters more) |
| **External links** | Critical | Helpful (drives external traffic signal) | Not applicable |

---

## 4. Schema Markup Implementation

### Which Schema for Which Page

| Page Type | Schema Types | Priority |
|-----------|-------------|----------|
| Product page | `Product`, `AggregateRating`, `Offer`, `BreadcrumbList` | Critical |
| Collection page | `CollectionPage`, `BreadcrumbList`, `ItemList` | High |
| FAQ page | `FAQPage`, `Question`, `Answer` | High (enables rich results) |
| How-to guide | `HowTo`, `Step`, `BreadcrumbList` | Medium |
| SaaS pricing | `SoftwareApplication`, `Offer`, `AggregateRating` | High |
| Blog post | `Article`, `Person` (author), `BreadcrumbList` | Medium |
| Local business | `LocalBusiness`, `PostalAddress`, `GeoCoordinates` | Critical for local |

### JSON-LD Implementation Pattern

Always use JSON-LD (not Microdata or RDFa). Place in `<head>` or at end of `<body>`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Product Name",
  "description": "...",
  "image": "https://...",
  "offers": {
    "@type": "Offer",
    "price": "29.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

**Detection limitation:** `web_fetch` and `curl` cannot detect JS-injected schema. Use Google Rich Results Test or browser DevTools to verify. See `seo-audit` skill for details.

---

## 5. AI Search Optimization

### AEO (Answer Engine Optimization)

Optimize for AI Overviews (Google), ChatGPT, Perplexity, and Claude citations.

**Key patterns:**
1. **Concise answer paragraphs:** Start sections with a direct, 2-3 sentence answer before elaborating
2. **Entity clarity:** Use proper nouns, define terms, be specific (not "the tool" but "Printify's production API")
3. **Structured data:** Tables, lists, and clear headings that AI can parse
4. **Citation-worthy statements:** Include specific numbers, dates, and verifiable facts
5. **FAQ format:** Question-answer pairs that directly match search queries

### What AI Search Engines Cite

| Signal | Why It Gets Cited |
|--------|------------------|
| Specific data points | "Printify charges $12.50 per standard tee" — concrete, verifiable |
| Step-by-step instructions | Procedural knowledge that AI can relay as guidance |
| Comparison tables | Structured data AI can extract and present |
| Expert attribution | Named author with credentials increases citation likelihood |
| Recency | AI prefers recently-updated pages for rapidly-changing topics |

---

## Related Skills

- **seo-audit** — Diagnose existing SEO problems (this skill builds, seo-audit audits)
- **keywords** — Research and choose the right keywords before building pages
- **site-architecture** — Plan page hierarchy and URL structure
- **page-cro** — Optimize pages for conversion (not just ranking)
- **copywriting** — Write the content that goes on SEO-optimized pages

## Verification

After applying this skill, verify:
- [ ] Content strategy matches the correct site type (e-commerce, SaaS, content/blog)
- [ ] Programmatic SEO pages pass the thin content guardrails (unique title, unique content, unique data)
- [ ] Marketplace SEO uses platform-specific factors (not Google SEO assumptions)
- [ ] Schema markup uses JSON-LD format with correct @type for the page type
- [ ] AI search optimization includes concise answer paragraphs and entity clarity
- [ ] Internal linking follows hub-and-spoke pattern where applicable

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Diagnosing existing SEO problems or traffic drops | `seo-audit` | seo-audit diagnoses; seo-strategy builds |
| Keyword research and clustering | `keywords` | keywords owns research methodology |
| Page hierarchy and navigation design | `site-architecture` | site-architecture owns IA structure |
| Conversion rate optimization | `page-cro` | page-cro owns conversion, not ranking |

---

*Version 1.1.0 — 2026-03-28. Added Philosophy, Verification, Do NOT Use When.*
