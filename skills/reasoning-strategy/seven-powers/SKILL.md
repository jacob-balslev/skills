---
# name: stable kebab-case skill identifier; must match the parent directory.
name: seven-powers
# description: routing contract for when this skill should activate and when it should not.
description: "Use when diagnosing whether a business has, can build, or is falsely claiming durable strategic power using Hamilton Helmer's Seven Powers: scale economies, network economies, counter-positioning, switching costs, branding, cornered resource, and process power. Covers Power as benefit plus barrier, persistent differential returns, moat-source classification, Power Progression by company phase, false-positive checks, and strategy implications. Do NOT use for industry-structure analysis alone (use porters-five-forces), integrated strategy-cascade formulation (use playing-to-win), generic prioritization, financial valuation, or surface-level SWOT lists."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: optional notes about formats and contexts where the skill is portable.
compatibility:
  notes: "Markdown, strategy memos, investment diligence, product strategy, market-entry analysis, moat diagnosis"
# allowed-tools: optional runtime hint for tools the skill may use when loaded.
allowed-tools: Read Grep
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # === v8 Classification (subject + public; polyhierarchy via subjects[]) - see ADR-0017 ===
  # subject: primary browse shelf - what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: reasoning-strategy
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # scope: free-text PRD-style statement of what the skill teaches and where it deploys
  # (v8 required; not an enum). Positive scope + portability/grounding + explicit exclusions.
  scope: "Teaching the portable strategy-diagnosis discipline from Hamilton Helmer's Seven Powers: classify a company's claimed moat mechanism, test benefit and barrier separately, distinguish durable firm-level Power from industry attractiveness or generic advantage, account for phase/timing through Power Progression, catch false positives, and translate the result into strategic implications and evidence requests. Applies to strategy memos, product/business model diagnosis, investment diligence, market-entry analysis, and competitive-advantage reviews. Excludes industry-structure analysis by itself (porters-five-forces), integrated strategy-cascade formulation (playing-to-win), value-curve creation (blue-ocean-strategy), resource-only VRIO diagnosis, SWOT/TOWS inventory work, financial valuation, and generic prioritization."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: true
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: foundations/strategy
  # grounding: authoritative public specs this skill is anchored on (drift-watch targets).
  # External canonical sources plus local interpretation notes. External URLs are not locally hashed.
  grounding: "{\"subject_matter\":\"Hamilton Helmer's Seven Powers strategy framework\",\"grounding_mode\":\"universal\",\"truth_sources\":[\"https://7powers.com/\",\"https://7powers.com/synopsis/\",\"https://7powers.com/foreword/\",\"skills/reasoning-strategy/seven-powers/references/seven-powers-sources.md\",\"skills/reasoning-strategy/seven-powers/references/upstream-displacement-2026-05-26.md\"],\"failure_modes\":[\"growth_confused_with_power\",\"benefit_without_barrier\",\"barrier_without_customer_value\",\"network_effects_claimed_from_usage_only\",\"brand_awareness_confused_with_branding_power\",\"temporary_execution_edge_confused_with_process_power\",\"industry_attractiveness_confused_with_firm_power\"],\"evidence_priority\":\"general_knowledge_first\"}"
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: stable
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["seven powers","7 powers","Hamilton Helmer","strategic power","durable moat","scale economies","network economies","counter-positioning","switching costs","process power"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["assess whether this startup has a real Seven Powers moat","which of Helmer's powers could apply to this business model?","test if our claimed network effects are actually Power","separate branding from ordinary brand awareness in this strategy memo","does this incumbent face counter-positioning from a new entrant?"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses to indicate the confusable territory's owner.
  anti_examples: ["analyze the attractiveness of this industry using entrants, suppliers, buyers, substitutes, and rivalry","turn this market-entry plan into a winning aspiration, where to play, how to win, capabilities, and systems","rank these roadmap items by impact and effort","make a SWOT table for this company","value this company using discounted cash flows"]
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins;
  #             write reason as "I own this exclusively over X", not "use X instead") /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive - A->B->C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Seven Powers treats durable strategy as a firm-level mechanism that creates both a business benefit and a competitive barrier. The seven mechanisms are scale economies, network economies, counter-positioning, switching costs, branding, cornered resource, and process power. A power claim remains weak until it shows how the mechanism improves economics or strategic options, why rivals cannot quickly copy or bid away the benefit, how long the benefit/barrier pair can persist, and what business phase makes the claim plausible.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    This skill prevents agents from labeling any attractive business, fast-growing product, loyal customer base, or popular feature as a moat. It replaces vague advantage language with a mechanism test: identify the candidate power, prove the benefit, prove the barrier, check timing and phase, name false positives, and translate the diagnosis into strategic implications and evidence requests.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only - no repo-specific nouns.
  concept_boundary: |
    Seven Powers diagnoses durable firm-level Power. It is not Porter's Five Forces industry-structure analysis, Playing to Win strategy-cascade formulation, Blue Ocean value-innovation design, VRIO resource/capability evaluation, SWOT/TOWS factor inventory, financial valuation, or task prioritization. Those tools can feed or consume the analysis, but this skill owns the moat mechanism: benefit plus barrier under competitive response.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Seven Powers is a lock-and-key test for strategy: the benefit is the key that opens economic value, and the barrier is the lock that stops rivals from using the same key tomorrow."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The common mistake is treating the seven powers as a checklist of nice business traits. A real power is not just growth, differentiation, brand awareness, loyal users, a large market, or operational competence. It must create an economic benefit and a defensible barrier that persists against competitive pressure; otherwise it is a candidate, weak edge, or false positive.
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/reasoning-strategy/seven-powers/SKILL.md
# relations: typed graph edges to sibling skills.
relations:
  related: ["prioritization","bayesian-reasoning","expected-value","porters-five-forces","playing-to-win","blue-ocean-strategy","vrio","swot-tows","framework-fit-analysis","epistemic-grounding"]
  suppresses: ["porters-five-forces","positioning"]
  verify_with: ["playing-to-win","framework-fit-analysis","epistemic-grounding","porters-five-forces"]
---
## Concept of the skill

**What it is:** Seven Powers is Hamilton Helmer's framework for identifying durable firm-level sources of Power: scale economies, network economies, counter-positioning, switching costs, branding, cornered resource, and process power.

**Mental model:** Power is not a compliment. It is a mechanism. A valid power creates a benefit for the company and a barrier that prevents rivals from fully copying, neutralizing, or bidding away that benefit.

**Why it exists:** Agents often call every strong company, growing product, sticky workflow, or differentiated feature a moat. Seven Powers forces the moat claim to name its source, economic benefit, competitive barrier, timing, and failure mode.

**What it is NOT:** It is not industry attractiveness, a generic competitor list, a strategy cascade, a financial valuation, or a claim that execution alone is durable Power.

**Adjacent concepts:** `porters-five-forces` owns industry structure; `playing-to-win` owns integrated strategy choices; `blue-ocean-strategy` owns value-curve creation; `vrio` owns resource/capability advantage tests; `swot-tows` owns factor-to-option work; `expected-value` and `prioritization` own choice ranking.

**One-line analogy:** Seven Powers is a lock-and-key test: the benefit is the key that opens economic value, and the barrier is the lock that keeps competitors from using the same key.

**Common misconception:** A company can have a strong product, high growth, or a large market without having Power. Growth may reveal an opportunity; it does not by itself prove durable Power.

# Seven Powers

## Coverage

This skill teaches agents to:

1. Name all seven powers accurately.
2. Separate firm-level Power from industry attractiveness.
3. Test every power claim for both benefit and barrier.
4. Distinguish real network economies from ordinary user growth.
5. Distinguish branding power from awareness, taste, or short-term marketing.
6. Distinguish process power from ordinary execution competence.
7. Map likely powers to company phase and timing.
8. Translate power diagnosis into strategic implications and evidence requests.

## Philosophy of the skill
Seven Powers is useful because it makes competitive advantage falsifiable. A vague moat claim can survive almost any critique: "we have data," "we have brand," "we are better," "we move faster." A power claim has to survive a sharper question: what exact mechanism lets this company earn better economics, and why can competitors not close the gap?

The framework should make an agent slower and stricter. Do not reward a confident-sounding moat story. Look for the economic effect, the barrier, the time horizon, the rival response, and the evidence that would disconfirm the claim.

## Core Equation

Treat a candidate power as valid only when both sides are present.

| Component | Meaning | Fails when |
| --- | --- | --- |
| Benefit | The mechanism improves value, cost, pricing, retention, access, or strategic options for the company. | The trait is interesting but does not improve economics or strategic position. |
| Barrier | Competitors cannot quickly copy, neutralize, or bid away the benefit. | Rivals can buy, imitate, subsidize, hire, integrate, or regulate around it. |
| Persistence | The benefit and barrier hold over the relevant time horizon. | The edge disappears once rivals respond, scale changes, contracts renew, or customers learn. |

If the analysis cannot state the benefit and barrier, report "candidate power, not proven power."

## The Seven Powers

| Power | Mechanism | Valid signal | Common false positive |
| --- | --- | --- | --- |
| Scale economies | Higher volume lowers unit cost or improves economics in ways smaller rivals cannot match. | Large fixed-cost base, learning volume, purchasing leverage, or distribution leverage that creates a cost gap. | "Large market" or "big company" without a cost advantage. |
| Network economies | The product becomes more valuable as more relevant users, participants, data contributors, or complements join. | New participants increase value for existing participants and make rival networks harder to start. | Ordinary growth, social proof, or data accumulation without a defensible network loop. |
| Counter-positioning | A new entrant adopts a superior model that incumbents rationally avoid because copying would damage their existing business. | Incumbent imitation would cannibalize revenue, margins, channels, assets, or incentives. | Any new business model or lower price, even when incumbents can copy without self-harm. |
| Switching costs | Customers face meaningful cost, risk, workflow disruption, data migration, retraining, contract, or compliance burden when leaving. | Retention improves because leaving is costly even when alternatives exist. | Users like the product, forgot to cancel, or have mild habit but can leave cheaply. |
| Branding | Durable perception lets the company command preference or price for an objectively similar offer. | Trust, identity, status, or assurance changes willingness to pay or choice behavior over time. | Awareness, paid acquisition, logo recognition, or current popularity. |
| Cornered resource | Preferential access to a scarce asset, right, talent, relationship, data source, location, license, or capability enhances value. | The resource is valuable, scarce, controlled, and difficult for rivals to obtain on similar terms. | A normal supplier contract, public data, or talent that rivals can hire. |
| Process power | A complex, embedded activity system produces better cost or quality and is hard to replicate quickly. | Advantage comes from accumulated routines, coordination, tacit knowledge, and organizational fit. | "We execute well" or "we have good processes" without a durable, hard-to-copy system. |

## Workflow

### 1. Scope the business and arena

State what business, product, segment, geography, and time horizon you are analyzing.

```text
Business:
Arena:
Stage: origination / takeoff / stability / unclear
Time horizon:
Competitors or substitutes:
Power claim being tested:
```

Do not diagnose power for "the company" in the abstract when the power may apply only to one product, segment, geography, or channel.

### 2. Extract the candidate power claims

List every claim in the source material that sounds like durable advantage.

```text
Claim:
Possible power:
Evidence offered:
Missing evidence:
Immediate false-positive risk:
```

Translate vague claims into the nearest power. For example, "our community grows by itself" might be network economies, "customers never leave" might be switching costs, and "incumbents cannot respond" might be counter-positioning.

### 3. Test benefit and barrier separately

For each candidate power, fill both columns.

| Candidate power | Benefit | Barrier | Verdict |
| --- | --- | --- | --- |
| Scale economies | What cost or economic gap appears at volume? | Why can smaller or richer rivals not match it? | proven / plausible / weak / false positive |
| Network economies | How does each participant increase value for others? | Why is a rival network hard to bootstrap? | proven / plausible / weak / false positive |
| Counter-positioning | Why is the entrant model superior for customers or economics? | What incumbent economics would be damaged by copying it? | proven / plausible / weak / false positive |
| Switching costs | What makes leaving costly or risky? | Why can rivals not make switching painless? | proven / plausible / weak / false positive |
| Branding | How does perception change willingness to pay or choice? | Why can rivals not buy equivalent perception quickly? | proven / plausible / weak / false positive |
| Cornered resource | What scarce resource improves value or economics? | Why can rivals not access it on similar terms? | proven / plausible / weak / false positive |
| Process power | What activity system produces the edge? | Why is replication slow, opaque, or culturally hard? | proven / plausible / weak / false positive |

If either benefit or barrier is missing, the verdict cannot be "proven."

### 4. Check timing and phase

Different powers tend to become available at different moments. Use phase as a diagnostic, not as a rigid rule.

| Phase | Useful question |
| --- | --- |
| Origination | What invention, model, resource, or positioning choice could create power before scale arrives? |
| Takeoff | Is growth creating scale economies, network economies, or switching costs before rivals respond? |
| Stability | Does the company have branding, process power, or other accumulated barriers that keep returns durable? |

Do not assume a startup has process power or branding just because it wants them. Do not assume an incumbent has power just because it is large.

### 5. Rank the power diagnosis

Use four verdicts.

| Verdict | Meaning |
| --- | --- |
| Proven power | Benefit and barrier are both evidenced and tied to durable economics. |
| Plausible candidate | The mechanism could exist, but evidence is incomplete. |
| Weak edge | There is a benefit, but the barrier is weak or temporary. |
| False positive | The claim sounds like power but fails the mechanism test. |

Prefer "plausible candidate" over overclaiming when evidence is thin.

### 6. Translate into strategy implications

End with action, not just classification.

```text
Most likely power:
Confidence:
Evidence that supports it:
Evidence still needed:
Competitor response to watch:
Strategic implication:
What would strengthen the power:
What would weaken or destroy it:
```

Strong implications usually change where the company invests. For example: deepen the network loop, protect the resource, make switching safer for current customers but harder for rivals to dislodge, or avoid a market where no plausible power exists.

## Diagnostic Prompts

Use these prompts to pressure-test common claims.

### Scale Economies

- Which costs decline with cumulative volume or current scale?
- What minimum efficient scale matters in this arena?
- Could a well-funded rival subsidize its way to equivalent scale?
- Does scale improve unit economics, distribution, procurement, data quality, or utilization?

### Network Economies

- Who creates value for whom as the network grows?
- Is the network same-side, cross-side, data-driven, protocol-driven, or complement-driven?
- What makes a cold-start rival hard to bootstrap?
- Are participants multi-homing, and does that weaken the barrier?

### Counter-Positioning

- What incumbent profit pool, asset, channel, metric, culture, or incentive would be harmed by copying?
- Is the entrant model truly superior for a chosen segment?
- Could incumbents respond with a separate brand, acquisition, price cut, or regulation?
- Is the advantage temporary until incumbents accept cannibalization?

### Switching Costs

- What exactly makes switching expensive: data, workflow, integrations, contracts, risk, training, compliance, identity, or relationships?
- Are costs borne by users, buyers, admins, developers, or partners?
- Can a rival automate migration or offer guarantees?
- Are customers retained because of value or trapped despite weak value?

### Branding

- Would customers pay more or choose faster for an objectively similar offering?
- Is the brand tied to trust, identity, status, safety, taste, or assurance?
- How long did the perception take to build?
- Can rivals buy similar awareness, or is the perception historically accumulated?

### Cornered Resource

- What scarce resource is controlled?
- Is control exclusive, preferential, contractual, regulatory, geographic, relational, or capability-based?
- Does the resource independently enhance value or economics?
- Can rivals substitute, bid it away, lobby around it, or develop an alternative?

### Process Power

- What activity system produces lower cost, higher quality, faster cycle time, or superior reliability?
- How much is codified versus tacit?
- How long would a competent rival need to replicate it?
- Is the process embedded across people, tooling, routines, metrics, culture, and suppliers?

## Output Template

```markdown
## Seven Powers Diagnosis

Business and arena:
Time horizon:
Stage:

### Candidate Powers
| Power | Verdict | Benefit | Barrier | Evidence | Missing evidence |
| --- | --- | --- | --- | --- | --- |

### Strongest Claim
- Power:
- Confidence:
- Why it creates benefit:
- Why competitors face a barrier:
- Key false-positive risk:

### Strategy Implications
- Invest in:
- Protect:
- Watch:
- Evidence to collect next:
- What would change the verdict:
```

## Failure Modes

- **Growth confused with power:** Fast adoption may be demand discovery, not defensibility.
- **Benefit without barrier:** The business has an edge, but rivals can copy it.
- **Barrier without benefit:** The company has something hard to copy, but it does not improve economics.
- **Network effects claimed from usage:** More users is not enough; users must increase value for other users or participants.
- **Brand awareness confused with branding power:** Recognition is not the same as durable willingness to pay.
- **Process power claimed too early:** Good execution is not a hard-to-copy activity system.
- **Industry attractiveness confused with firm power:** A good industry can still lack firm-specific power, and a tough industry can contain a powerful firm.

## Boundaries

- Use **Porter's Five Forces** when the question is whether an industry structure lets participants keep profits.
- Use **Playing to Win** when the question is which arena to choose, how to win, what capabilities are required, and what management systems support the choice.
- Use **Blue Ocean Strategy** when the question is how to create differentiated value and reduce direct rivalry.
- Use **VRIO** when the question is whether a resource or capability is valuable, rare, inimitable, and organized.
- Use **SWOT/TOWS** when the question is how to inventory internal/external factors and convert them into options.
- Use **Seven Powers** when the question is whether the company has or can build a durable moat mechanism.
- Use **expected value** when the question is which action has the best probability-weighted payoff.
- Use **prioritization** when the question is how to rank a queue of work.
- Use **framework-fit-analysis** when the question is which method should be used at all.

## Quality Bar

A good Seven Powers answer:

1. Names the relevant power precisely.
2. Tests benefit and barrier separately.
3. Explains why rival imitation is hard.
4. Labels weak evidence and false positives.
5. Distinguishes company power from industry structure.
6. Connects the diagnosis to strategy implications.
7. Avoids calling every advantage a moat.

## References

- `skills/skills/reasoning-strategy/seven-powers/references/seven-powers-sources.md`
- `skills/skills/reasoning-strategy/seven-powers/references/upstream-displacement-2026-05-26.md`

## Verification

After applying this skill, verify:

- [ ] The task matches the declared scope, coverage, or positive examples.
- [ ] The response follows this skill's workflow or checks instead of generic advice.
- [ ] The exclusions in `## Do NOT Use When` do not point to a better skill.

## Do NOT Use When

Use another skill when the task falls outside the declared `scope`, matches an `anti_examples` prompt, or is owned by a more specific related skill.
