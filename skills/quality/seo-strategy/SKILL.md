---
name: seo-strategy
description: "Use after keyword research when designing SEO implementation strategy: page types, content hubs, comparison/alternative pages, programmatic SEO templates, internal-linking plans, structured data eligibility, ecommerce/product surfaces, and AI-feature readiness for search. Builds pages and page systems from an intent map. Do NOT use for keyword discovery/clustering (use keywords), information architecture/navigation design (use information-architecture), finished prose/tone (use writing-humanizer), performance/Core Web Vitals optimization (use performance-engineering), or diagnosing traffic drops and crawl failures."
license: MIT
compatibility:
  notes: "Portable SEO strategy guidance for public web, SaaS, ecommerce, and marketplace-adjacent surfaces. Search features and marketplace policies drift frequently; verify platform docs before promising rich-result eligibility, AI feature inclusion, or marketplace ranking effects."
allowed-tools: Read Grep Bash
grounding:
  domain_object: "SEO implementation strategy for page systems, structured data, programmatic SEO, content hubs, ecommerce surfaces, and AI-feature readiness"
  grounding_mode: "hybrid"
  truth_sources:
    - https://developers.google.com/search/docs/fundamentals/seo-starter-guide
    - https://developers.google.com/search/docs/fundamentals/creating-helpful-content
    - https://developers.google.com/search/docs/essentials/spam-policies#scaled-content
    - https://developers.google.com/search/docs/appearance/structured-data/search-gallery
    - https://developers.google.com/search/docs/appearance/structured-data/faqpage
    - https://developers.google.com/search/docs/appearance/ai-features
    - https://help.shopify.com/en/manual/promoting-marketing/seo/seo-overview
    - https://www.etsy.com/seller-handbook/article/1289139008351
  failure_modes:
    - keyword_research_and_seo_implementation_collapsed
    - programmatic_pages_are_variable_swaps_or_scaled_abuse
    - faq_schema_sold_as_rich_result_growth_after_2026_deprecation
    - ai_search_optimization_claims_special_markup_google_does_not_require
    - structured_data_not_matching_visible_page_content
    - comparison_pages_hide_competitor_strengths_and_lose_trust
    - internal_linking_or_canonical_owner_missing
    - marketplace_google_assumptions_copied_without_platform_docs
    - conversion_or_performance_work_misrouted_to_seo_strategy
  evidence_priority: "primary_docs_first"
drift_check:
  last_verified: "2026-05-19"
metadata:
  schema_version: 6
  version: "1.1.0"
  type: capability
  category: quality
  domain: quality/search
  scope: portable
  owner: skill-graph-maintainer
  freshness: "2026-05-19"
  drift_check: '{"last_verified":"2026-05-19"}'
  eval_artifacts: present
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: experimental
  keywords: '["seo strategy","seo implementation","organic growth strategy","programmatic seo","scaled content abuse","content hub","topic cluster","comparison page","alternative page","schema markup","structured data","Product structured data","SoftwareApplication structured data","FAQPage deprecation","internal linking","canonical page owner","ecommerce seo","shopify seo","marketplace seo","ai search optimization","AI Overviews","AI Mode","search feature readiness","helpful content","people-first content","topical authority"]'
  triggers: '["seo-strategy","seo-strategy-skill","programmatic-seo","schema strategy","structured data plan","AI Overviews strategy","content hub strategy","comparison page cluster","alternative page cluster","SEO page brief"]'
  examples: '["plan a comparison page cluster for a SaaS product after keyword research is done","design programmatic city landing pages without scaled-content abuse","choose Product, Breadcrumb, Article, or SoftwareApplication structured data for these pages","update our FAQ schema strategy after Google removed FAQ rich results in May 2026","plan internal links between a pillar page and topic clusters","create an SEO brief for ecommerce collection and product pages","adapt content so it is eligible for AI Overviews without claiming special schema","decide which pages should exist from this intent map"]'
  anti_examples: '["research keywords for our product category","cluster these 80 search queries by intent","design the main navigation and sitemap","rewrite this landing page so it sounds human","audit Core Web Vitals scores","why did organic traffic drop after migration","fix crawl errors in Search Console","optimize this pricing page for conversions","guarantee that these pages will rank or be cited by AI systems","check Core Web Vitals scores","design the page hierarchy for our new website"]'
  relations: '{"boundary":[{"skill":"keywords","reason":"keywords owns demand discovery, search intent mapping, clustering, and field translation before page construction; seo-strategy owns page-system implementation after the target map exists."},{"skill":"information-architecture","reason":"information-architecture owns navigation, sitemap, wayfinding, and content hierarchy; seo-strategy can supply search-driven page candidates but does not own the full IA."},{"skill":"writing-humanizer","reason":"writing-humanizer owns final prose quality and voice; seo-strategy owns the page brief, structure, schema, and internal-linking plan."},{"skill":"performance-engineering","reason":"performance-engineering owns Core Web Vitals, profiling, and runtime optimization; seo-strategy names page and content strategy but does not diagnose performance."},{"skill":"a11y","reason":"a11y owns accessibility verification; seo-strategy may require textual, crawlable, user-visible content but does not replace accessibility testing."}],"related":["keywords","information-architecture","writing-humanizer","performance-engineering","a11y"],"verify_with":["keywords","information-architecture","writing-humanizer"]}'
  grounding: '{"domain_object":"SEO implementation strategy for page systems, structured data, programmatic SEO, content hubs, ecommerce surfaces, and AI-feature readiness","grounding_mode":"hybrid","truth_sources":["https://developers.google.com/search/docs/fundamentals/seo-starter-guide","https://developers.google.com/search/docs/fundamentals/creating-helpful-content","https://developers.google.com/search/docs/essentials/spam-policies#scaled-content","https://developers.google.com/search/docs/appearance/structured-data/search-gallery","https://developers.google.com/search/docs/appearance/structured-data/faqpage","https://developers.google.com/search/docs/appearance/ai-features","https://help.shopify.com/en/manual/promoting-marketing/seo/seo-overview","https://www.etsy.com/seller-handbook/article/1289139008351"],"failure_modes":["keyword_research_and_seo_implementation_collapsed","programmatic_pages_are_variable_swaps_or_scaled_abuse","faq_schema_sold_as_rich_result_growth_after_2026_deprecation","ai_search_optimization_claims_special_markup_google_does_not_require","structured_data_not_matching_visible_page_content","comparison_pages_hide_competitor_strengths_and_lose_trust","internal_linking_or_canonical_owner_missing","marketplace_google_assumptions_copied_without_platform_docs","conversion_or_performance_work_misrouted_to_seo_strategy"],"evidence_priority":"primary_docs_first"}'
  portability: '{"readiness":"scripted","targets":["skill-md"]}'
  lifecycle: '{"stale_after_days":90,"review_cadence":"quarterly"}'
  mental_model: |
    SEO strategy is page-system design from an intent map. Keywords say what demand exists; SEO strategy decides which durable pages should exist, what each page uniquely satisfies, how pages link to each other, what structured data accurately describes them, and how success will be measured.
  purpose: |
    This skill prevents agents from jumping from keyword lists to generic content. It turns demand evidence into useful, crawlable, non-duplicative page systems that can earn search visibility without scaled-content shortcuts or false rich-result promises.
  boundary: |
    This skill owns implementation strategy for SEO page systems. It does not own keyword research, navigation/IA, final prose, technical/performance audits, conversion optimization, or ranking guarantees.
  analogy: "SEO strategy is urban planning for search demand: keywords reveal where people want to go, but this skill decides which streets, buildings, signs, and addresses should exist."
  misconception: "The common mistake is treating SEO as adding keywords or schema to any page. Strategy means one intent owner, useful unique content, crawlable structure, accurate markup, and measurable outcomes."
  concept: '{"definition":"SEO strategy is the implementation discipline of turning search intent evidence into page systems: page types, briefs, templates, internal links, structured data, measurement, and update cadence.","mental_model":"Start from the intent map, assign one owner page per intent, make every scalable page uniquely useful, and only use structured data that accurately describes visible content.","purpose":"It helps agents build organic search surfaces that are useful for users and legible to search systems without relying on keyword stuffing, thin templates, or deprecated rich-result tactics.","boundary":"It does not discover keywords, design full information architecture, write final prose, optimize runtime performance, perform technical SEO diagnosis, or promise rankings.","taxonomy":"Surfaces: product pages, collection pages, comparison pages, alternative pages, integration pages, local/location pages, content hubs, tools/calculators, documentation pages, marketplace listings. Decisions: page owner, intent fit, unique value, internal links, schema eligibility, indexing/canonical rule, measurement." ,"analogy":"Urban planning for search demand.","misconception":"Schema and keywords do not make a weak page rank; they only clarify a useful page that already deserves to exist."}'
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/quality/seo-strategy/SKILL.md
---

# SEO Strategy

## Coverage

Use this skill after keyword research and intent mapping, when the work becomes implementation strategy: which pages should exist, what each page uniquely satisfies, how a page cluster links together, what structured data accurately describes the visible content, how programmatic templates avoid scaled-content abuse, and how SEO work should be measured after release.

The skill covers public web, SaaS, ecommerce, content hubs, product/collection pages, comparison and alternative pages, programmatic SEO, structured data strategy, and AI-feature readiness. It does not guarantee rankings, citations, rich results, AI Overview inclusion, or marketplace placement.

## Philosophy

SEO strategy builds useful search surfaces. Keyword research reveals demand; strategy turns that demand into page systems. A good strategy can name the user intent, owner page, unique value, internal links, schema eligibility, canonical/indexing rule, update cadence, and measurement plan for every important surface.

The trap is to confuse implementation strategy with shortcuts: add more keywords, generate more pages, paste JSON-LD everywhere, or write for AI systems instead of users. Search systems keep changing, but the durable constraint is stable: content must be useful, crawlable, accurate, and distinct enough to deserve its own URL.

Programmatic SEO is not a scale loophole. It is a page-production system that only works when every page has unique evidence, local/product/entity data, and a reason to exist beyond variable substitution.

## Grounding

Current public search guidance creates several hard constraints:

- Google's SEO Starter Guide emphasizes logical organization, descriptive URLs, duplicate-content reduction, and compelling, useful, unique, up-to-date content.
- Google's helpful-content guidance says ranking systems prioritize helpful, reliable, people-first content and that automation used primarily to manipulate rankings violates spam policies.
- Google's spam policies define scaled content abuse as many pages generated primarily to manipulate rankings rather than help users.
- Google uses structured data to understand page content and enable eligible rich appearances, but the actual appearance can differ and markup must follow feature-specific guidelines.
- Google FAQPage guidance now says FAQ rich results no longer appear in Search as of May 7, 2026, with FAQ reporting and Rich Results Test support being retired in June 2026 and API support in August 2026. Do not treat FAQPage as a rich-result growth tactic.
- Google's AI features guidance says there are no additional technical requirements, machine-readable files, or special schema.org markup required for AI Overviews or AI Mode; foundational SEO and visible text still matter.
- Shopify's SEO overview emphasizes relevant content, editable title tags/meta descriptions/URLs/alt text, and built-in canonical/sitemap/robots support.
- Etsy's current search visibility guidance says Etsy search considers shop, listing, and customer-service quality; marketplace strategy must verify platform-specific docs instead of copying Google assumptions.

## Strategy Pipeline

1. Start with a keyword/intent map from `keywords`.
2. Assign one owner surface per intent: product, collection, guide, comparison, alternative, tool, integration, location, documentation, or marketplace listing.
3. Decide whether an existing page should be improved, split, merged, redirected, canonicalized, noindexed, or replaced by a new page.
4. Write a page brief: search intent, target audience, primary promise, required evidence, sections, internal links, schema candidate, update owner, and measurement plan.
5. Build internal links: hub to spoke, spoke to hub, related spoke to related spoke, product to collection, collection to guide, and guide to product where useful.
6. Add only structured data that matches visible content and is supported by the target search feature.
7. Launch in batches when templates are involved; measure indexation, impressions, clicks, conversions, and cannibalization before scaling.

## Page Type Selection

| Intent / use case | Preferred surface | Strategy notes |
|---|---|---|
| Broad ecommerce category | Collection/category page | Use unique category copy, filters that do not create crawl traps, product coverage, and links to buying guides. |
| Specific product demand | Product page | Use original descriptions, real attributes, media, availability/pricing when applicable, and Product structured data when eligible. |
| Commercial investigation | Comparison, alternative, or buyer guide | Be honest about tradeoffs; thin competitor-bashing pages erode trust and often read as doorway content. |
| Recurring integration demand | Integration page | Show what the integration does, setup steps, use cases, limitations, and related integrations. |
| Reusable tool intent | Calculator/tool/template page | Make the tool genuinely useful; supporting copy should explain method, inputs, limitations, and next steps. |
| Local or geographic demand | Location page | Requires local facts, proof, service coverage, testimonials, staff/office/service details, or another genuine local reason. |
| Educational topic | Pillar plus cluster pages | The pillar owns broad understanding; clusters own narrower sub-intents and link both ways. |
| Marketplace discovery | Marketplace listing fields plus shop/listing quality | Verify the platform's current field limits and ranking guidance; do not copy web SEO rules blindly. |

## Programmatic SEO Guardrails

Programmatic SEO is appropriate only when structured data can create many genuinely useful pages. It is unsafe when the template creates near-duplicates whose only difference is a city, competitor, integration, or product variable.

Every programmatic page set needs:

- A source of unique data or evidence per page.
- A page reason that survives the question: would this page help if search engines did not exist?
- Unique title, H1, summary, examples, facts, and internal links.
- Canonical/indexing rules for variants and near-duplicates.
- A batch rollout plan with indexation and performance monitoring.
- A pruning rule for pages that fail to earn impressions, links, conversions, or user value.

Red flags:

- Boilerplate body with swapped variables.
- Repeated FAQ blocks across every page.
- No unique data, screenshots, local facts, product facts, or expert judgment.
- Auto-generated pros/cons without source evidence.
- Thousands of pages launched before a small batch proves indexation and user value.

## Structured Data Strategy

Structured data is a description layer, not a ranking spell. Use it when the page visibly contains the thing being described and Google supports a relevant feature.

| Page type | Candidate structured data | Current guardrail |
|---|---|---|
| Product page | Product, Offer, AggregateRating where reviews are real and visible, BreadcrumbList | Match visible price, availability, reviews, and product identity. |
| Collection/category page | BreadcrumbList, ItemList when useful | Do not fake Product markup for an entire collection. |
| Article/guide | Article, BreadcrumbList, Organization/Person where appropriate | Authorship and dates should reflect visible page facts. |
| SaaS/pricing/software page | SoftwareApplication, Offer where supported | Use only if the page is genuinely about a software application and visible offers. |
| FAQ/support content | FAQPage only where it matches visible single-answer FAQ content | Do not expect Google FAQ rich results after the May 7, 2026 deprecation. |
| Local business page | LocalBusiness and address/contact details where applicable | Use only for real businesses/locations with visible details. |

Validate syntax with the available structured-data validator or Rich Results Test where the feature is still supported, then verify the rendered DOM for JavaScript-injected markup. A passing syntax test does not guarantee a rich result.

## AI Feature Readiness

For Google AI Overviews and AI Mode, do not create special schema, AI-only files, or hidden text. Google's current guidance says foundational SEO remains the path: indexable pages, crawl access, helpful visible content, internal links, strong page experience, textual content, useful media, and structured data that matches visible text.

Practical AI-readiness moves that do not overclaim:

- Put a direct answer near the top of answer-oriented sections.
- Define entities clearly and consistently.
- Use tables and lists where they genuinely improve comprehension.
- Back important claims with data, examples, dates, methods, or first-hand evidence.
- Keep content visible to users; do not hide AI-only text.
- Track AI-feature traffic through Search Console as part of normal Web search performance, plus manual spot checks for critical queries.

Do not promise citation in ChatGPT, Perplexity, Google AI Overviews, or any other AI surface. Treat those as visibility outcomes to monitor, not deliverables to guarantee.

## Marketplace Notes

Marketplace SEO is platform-specific. The strategy skill can decide whether marketplace listing work belongs in the growth plan, but field selection and term mapping should go through `keywords` and current marketplace docs.

- Shopify public-web SEO still follows web search fundamentals: relevant readable content, editable titles/descriptions/URLs, image alt text, sitemap/robots/canonical support, and useful category/product pages.
- Etsy search visibility is not just title/tag matching; Etsy's own guidance mentions shop, listing, and customer-service quality. Listing photos, policies, reviews, response rate, and issue rates can affect visibility.
- Amazon and other marketplaces have their own field policies and ranking systems. Verify current Seller Central or marketplace docs before making field-length, title, backend-term, or ranking-factor claims.

## Evals

This skill has local eval artifacts in `evals/evals.json` and routing trigger cases in `evals/eval-set.json`. They cover SaaS comparison pages, Etsy listing search, programmatic local pages, Product and SoftwareApplication structured data, AI search readiness, topical authority, content-to-product linking, and negative routing for diagnostics, keyword research, IA, and CRO. Eval state remains unverified until the eval suite is run and recorded.

## Verification

- [ ] Keyword/intent research is complete or explicitly out of scope.
- [ ] Each target intent has one owner page or a documented merge/split/canonical decision.
- [ ] Programmatic pages have unique evidence and a batch rollout plan, not variable-swapped boilerplate.
- [ ] Structured data matches visible content and current feature eligibility.
- [ ] FAQPage is not sold as a Google rich-result growth tactic after the May 7, 2026 deprecation.
- [ ] AI-feature guidance does not claim special schema, AI-only files, or guaranteed citations.
- [ ] Internal links connect hubs, clusters, products, collections, and related pages intentionally.
- [ ] Measurement includes indexation, impressions, clicks, conversions or qualified outcomes, and cannibalization checks.
- [ ] Marketplace claims are checked against current platform docs.
- [ ] Neighbor boundaries are respected: `keywords`, `information-architecture`, `writing-humanizer`, `performance-engineering`, and `a11y`.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Keyword discovery, clustering, marketplace field translation, or cannibalization research | `keywords` | Keywords owns demand language and intent mapping before page construction. |
| Navigation, sitemap, category hierarchy, or user wayfinding | `information-architecture` | IA owns structure for humans; search demand is one input. |
| Final page prose, brand voice, and rewriting AI-sounding text | `writing-humanizer` | SEO strategy writes the brief and structure, not finished copy. |
| Core Web Vitals, runtime performance, profiling, or page speed optimization | `performance-engineering` | Performance work can support SEO but is a separate diagnostic/engineering discipline. |
| Accessibility validation for content and page structure | `a11y` | Accessible content benefits users and search, but a11y owns verification. |
| Organic traffic-drop diagnosis, crawl error investigation, migration recovery, or Search Console debugging | Technical SEO/audit workflow | This skill builds strategy; diagnostics need an audit process. |
| Conversion-rate optimization after organic traffic lands | CRO/product analytics workflow | Ranking and conversion influence each other, but conversion optimization is not SEO strategy. |
