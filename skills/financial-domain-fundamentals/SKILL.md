---
name: financial-domain-fundamentals
description: "Use when reasoning about the foundational primitives of money handling in software: why floating-point binary is the wrong representation for money, how integer-minor-units (cents, pence, satoshi) became the industry-standard storage primitive, the four families of rounding rules (round-half-up, round-half-even / banker's rounding, round-half-down, round-toward-zero / away-from-zero) and which is the IEEE 754 default, the Money pattern (encapsulating amount + currency together as one value object per Fowler PoEAA), multi-currency operations and the choice of a base currency, four distinct semantics for missing money values (fail-fast vs zero-default vs null-propagation vs explicit-unknown), reconciliation invariants and sign conventions, the allocation problem (splitting a total across line items without rounding loss), and the verification discipline that catches money bugs before they become incidents. Do NOT use for one specific product's calculation formula or operational rules (use the relevant product-specific finance skill), display formatting and locale rules (use formatting / financial-display-contract), database transaction guarantees underneath the money writes (use acid-fundamentals or transaction-isolation), allocation algorithms for a specific cost pool (use the relevant allocation skill), or payment-processor integration mechanics (use the relevant integration skill)."
license: MIT
allowed-tools: Read Grep
metadata:
  schema_version: "5"
  version: "1.0.0"
  type: capability
  category: engineering
  domain: engineering/finance
  scope: reference
  owner: skill-graph-maintainer
  freshness: "2026-05-17"
  drift_check: "{\"last_verified\":\"2026-05-17\"}"
  eval_artifacts: planned
  eval_state: unverified
  routing_eval: absent
  comprehension_state: present
  stability: experimental
  keywords: "[\"integer cents\",\"minor units\",\"float for money\",\"binary floating point money problem\",\"Money pattern\",\"banker's rounding\",\"round half even\",\"round half up\",\"IEEE 754 rounding modes\",\"ISO 4217\",\"multi currency\",\"base currency\",\"FX conversion\",\"null cost semantics\",\"missing money values\",\"reconciliation invariant\",\"double entry sign conventions\",\"allocation problem\",\"penny rounding\",\"Knuth fixed point arithmetic\",\"Goldberg floating point\",\"Fowler Money pattern\",\"why not use float for money\",\"why use integer cents\"]"
  triggers: "[\"why not float for money\",\"why integer cents\",\"how to round money\",\"banker's rounding\",\"missing cost handling\",\"financial null semantics\",\"reconciliation invariant\",\"money allocation\",\"why do my totals not match\"]"
  examples: "[\"explain why this finance code should use integer cents instead of floats\",\"choose a rounding rule for a finance system that aggregates many small transactions\",\"decide what to do when a fee is missing — treat as zero, treat as null, or treat as unknown\",\"verify that allocating $99.99 across 7 line items does not introduce a penny-rounding loss\",\"reason about whether a price displayed as 19.99 can be stored as 19.99 in a float column\"]"
  anti_examples: "[\"format a money value for display in EUR with thousands separators (use formatting)\",\"choose an isolation level for a transactional money write (use transaction-isolation)\",\"allocate cost across line items with the specific product allocation formula (use the product's allocation skill)\",\"design the database column type for a money field (use data-modeling)\",\"map Stripe Charge balance_transaction.amount to the local schema (use stripe-ledger-recon)\"]"
  relations: "{\"related\":[\"acid-fundamentals\",\"transaction-isolation\",\"data-modeling\"],\"boundary\":[{\"skill\":\"acid-fundamentals\",\"reason\":\"acid-fundamentals owns the transactional guarantees underneath any money write (A, C, I, D). This skill owns the in-memory representation, arithmetic, and rounding of money values regardless of whether they survive a crash; acid-fundamentals owns whether they survive a crash. Conflation is common because both topics are 'finance correctness' — keep separate by asking whether the question is about arithmetic-and-representation or about transactional-guarantee.\"},{\"skill\":\"transaction-isolation\",\"reason\":\"transaction-isolation owns the choice of isolation level for concurrent money writes (read-committed, repeatable read, serializable). This skill owns money-value semantics independent of concurrency.\"},{\"skill\":\"data-modeling\",\"reason\":\"data-modeling owns the schema choice for a money column (DECIMAL vs BIGINT vs NUMERIC vs domain type). This skill owns the conceptual frame underneath that choice — why an integer minor-unit column is preferred over a binary float column regardless of the database used.\"}],\"verify_with\":[\"acid-fundamentals\",\"data-modeling\"]}"
  concept: "{\"definition\":\"Financial domain fundamentals are the foundational software primitives for representing, arithmetic-ing, rounding, and reconciling money values in a way that produces deterministic, auditable, exactly-correct results: the choice of integer minor units as the storage primitive (because binary floating-point cannot represent 0.10 exactly, and every cent of error compounds across millions of transactions), the four families of rounding rules (round-half-up / round-half-even-banker's / round-half-down / round-toward-zero) and the IEEE 754 default of round-half-even, the encapsulation of amount and currency as one inseparable Money value object (per Fowler 2002), the semantics of missing money values (fail-fast, zero-default, null-propagation, explicit-unknown — four distinct meanings the application chooses between), reconciliation invariants (the books must balance; debits equal credits; sign conventions are global, not local), the allocation problem (distributing a total across N line items without losing or gaining pennies due to rounding), and the verification discipline that catches money bugs before they become regulatory or customer-trust incidents. The discipline exists because money is the single category of software value where 'almost correct' is wrong, where errors compound rather than cancel, and where the cost of a bug is borne by users one penny at a time across years before anyone notices.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/financial-domain-fundamentals/SKILL.md
---

# Financial Domain Fundamentals

## Coverage

The foundational software primitives for representing, arithmetic-ing, rounding, and reconciling money. Covers the binary floating-point problem and why integer minor units (cents, pence, satoshi) became the industry-standard storage primitive; the four families of rounding rules and the IEEE 754 default; the Money pattern that encapsulates amount and currency as one value object; multi-currency operations and the choice of a base currency for cross-currency arithmetic; the four distinct semantics for missing money values; reconciliation invariants and sign conventions; the allocation problem and its rounding-loss-free solutions; and the verification discipline that prevents penny-class bugs from becoming material incidents.

## Philosophy

Money is the category of software value where "almost correct" is wrong. A timestamp off by a millisecond is rarely material; a balance off by a penny across millions of accounts is a regulatory event. The cost of money bugs is borne by users one cent at a time across years before anyone notices, which means the bug-detection horizon is much longer than the typical test cycle. The discipline exists because correctness here has to be designed in rather than tested in.

The trap is treating money as just another number. Numbers in software are usually represented as IEEE 754 binary floats, which are exact for some decimals (0.5, 0.25) and inexact for others (0.1, 0.2, 0.3). Every operating system, every database default, every CSV import auto-detects "looks like a number" and produces a float — and then the float carries an invisible representation error through every subsequent operation until totals stop matching.

The fix is conceptual before it is mechanical. Once the engineer understands that 0.1 cannot be represented exactly in binary floating point, the integer-minor-units choice is obvious. Once the engineer understands that rounding half-up is statistically biased toward larger numbers, banker's rounding becomes obvious. Once the engineer understands the difference between "this fee is zero" and "this fee is missing", null-semantics confusion stops. The body of this skill is the conceptual scaffolding underneath those obvious-once-seen choices.

## 1. The Binary Floating-Point Problem

IEEE 754 binary floating-point can represent any value of the form `m × 2^e` where m is an integer (within mantissa precision) and e is an integer exponent. Powers of two and their finite sums (0.5, 0.25, 0.125, 0.75) are exact. Powers of ten and their non-power-of-two fractions (0.1, 0.2, 0.3, 0.01) are NOT exact — they are infinite repeating fractions in binary, analogous to how 1/3 is `0.333...` in decimal.

```
0.1 in binary = 0.0001100110011001100110011001100110011001100110011001101... (repeating)
```

The IEEE 754 64-bit double truncates this at 52 bits of mantissa, producing a representation that is *approximately* 0.1 but not exactly. Every subsequent operation propagates this approximation:

| Operation | Mathematical result | Float-64 result |
|---|---|---|
| 0.1 + 0.2 | 0.3 | 0.30000000000000004 |
| 0.1 × 3 | 0.3 | 0.30000000000000004 |
| 0.7 - 0.5 - 0.2 | 0.0 | 2.7755575615628914e-17 |
| sum(0.01 × 100 times) | 1.0 | 1.0000000000000007 |

For money this means: any sum, average, percentage, or running balance computed in binary float will drift from the mathematically correct value. The drift is small per operation but accumulates across millions of operations into material errors. Worse, the drift is *non-associative*: `(a + b) + c` does not equal `a + (b + c)` for some triples, so the same set of transactions summed in different order produces different totals. This is the property that breaks reconciliation.

Goldberg (1991) is the canonical reference. Knuth (TAOCP Vol. 2, §4.2.2) covers the rounding behavior of fixed-point and floating-point arithmetic in depth.

## 2. Integer Minor Units — The Industry Standard

The fix is to store money as an integer count of the smallest currency unit (cents for USD/EUR, pence for GBP, satoshi for BTC, no-fractional for JPY/KRW, mils for KWD/JOD/BHD which use three decimals). Arithmetic on integers is exact and associative. Conversion from integer cents to a displayed decimal value is a presentation concern.

```
USD 19.99  →  store as integer 1999 cents
JPY 1500   →  store as integer 1500 yen (no fractional unit)
BTC 0.001  →  store as integer 100000 satoshi
KWD 1.234  →  store as integer 1234 mils (3 decimal places)
```

ISO 4217 publishes the official fractional-unit count per currency. The application MUST know this table to convert correctly. Hard-coding `value × 100` works for USD/EUR but produces wrong results for JPY (no fractional unit) and KWD (three decimal places).

The minor-unit choice cascades through the system:
- **Database columns**: `BIGINT` or `NUMERIC(20, 0)` storing minor units, not `NUMERIC(10, 2)` storing major units. Conversion happens at the presentation boundary, not at the storage boundary.
- **API contracts**: minor-unit integers in the wire format, not formatted decimal strings or floats. Stripe, Square, and Paddle all use minor-unit integers in their APIs for this reason.
- **In-memory representation**: integer type (`number` in JS up to 2^53, `bigint` above that; `int64` in most other languages).
- **Arithmetic**: integer addition, subtraction, multiplication. Division is the only operation that needs special care (see §4 Rounding Rules).

## 3. The Money Pattern (Fowler PoEAA)

Storing money as a raw integer is a necessary but insufficient step. A bare integer carries the amount but loses the currency. Mixing currencies via raw addition (`100 + 50` where one is USD-cents and the other is EUR-cents) is the most common cross-currency bug class, and it is invisible until reconciliation.

Fowler's *Patterns of Enterprise Application Architecture* (2002, p. 488) defines the Money pattern: a value object encapsulating an amount and a currency together, with arithmetic operations defined to fail loudly when currencies do not match.

```
class Money {
  amount: bigint        // minor units
  currency: string      // ISO 4217 code

  add(other: Money): Money {
    if (this.currency !== other.currency) throw new MismatchedCurrencyError(...);
    return new Money(this.amount + other.amount, this.currency);
  }
  // similarly for subtract, multiply (by scalar only), divide (returns Money[] for allocation)
}
```

The key properties:
- **Immutable.** Every operation returns a new Money. No mutation.
- **Currency-aware.** Cross-currency arithmetic without explicit conversion is a type error, not a runtime warning.
- **No silent coercion.** A raw integer cannot be added to a Money. A Money cannot be multiplied by another Money (only by a dimensionless scalar — multiplying USD by USD produces `USD²` which is meaningless).
- **Allocation as a special operation.** Splitting Money is not normal division; it is the allocation problem (§7).

Joda-Money (Stephen Colebourne, Java) is the most widely-cited reference implementation with the design tradeoffs documented in JavaDoc. Most modern languages have at least one community library implementing the pattern; if not, hand-rolling a value class is straightforward.

## 4. Rounding Rules — The Four Families

Integer minor units cover storage, but rounding still appears whenever division produces a non-integer result: percentages, fractional fees, tax allocation, currency conversion. The choice of rounding rule has material statistical consequences.

| Rule | At exact half | Tie-break direction | Statistical bias | Use when |
|---|---|---|---|---|
| **Round half up** | 0.5 → 1, -0.5 → 0 | toward positive infinity | biased upward by half | the application explicitly wants the customer-favorable side (e.g. refunds always rounded toward the customer) |
| **Round half to even** (banker's, IEEE 754 default) | 0.5 → 0, 1.5 → 2, 2.5 → 2 | toward the nearest even integer | unbiased across many roundings | aggregating many small transactions where bias would compound |
| **Round half down** | 0.5 → 0, -0.5 → -1 | toward negative infinity | biased downward by half | rare; used when application wants merchant-favorable rounding on fees |
| **Round half away from zero** | 0.5 → 1, -0.5 → -1 | away from zero in both directions | unbiased per direction; biased away from zero overall | naive "school rounding"; common in casual contexts but introduces drift in finance |

**Banker's rounding (round-half-to-even) is the IEEE 754 default for a reason.** Across many transactions, round-half-up systematically inflates every aggregate by an average of 0.25 of the rounding unit, because half-cases are biased toward larger numbers. Banker's rounding has expected bias of zero because half-cases are evenly distributed between rounding up and rounding down (half go to the nearest even integer above, half to the nearest even integer below). For high-volume finance, this difference is the difference between books that reconcile and books that drift.

The application MUST choose its rounding rule explicitly and document it. Different rules for different operations (banker's for aggregations, half-up for customer-facing refunds) is acceptable — the discipline is the choice being conscious rather than inherited from the platform default.

PEP 327 (Python Decimal) and Knuth §4.2.2 are the references for the full enumeration of rounding modes (the four above plus round-toward-zero, round-toward-positive-infinity, round-toward-negative-infinity).

## 5. Missing Money Semantics — Four Distinct Meanings

When a money field is absent in the data, the application has to choose what it means. There are four distinct semantics, and conflating them causes a class of bugs that survives review because every reviewer thinks the convention is obvious:

| Semantics | Meaning | Behavior on arithmetic | Use when |
|---|---|---|---|
| **Fail-fast (throw)** | Missing is an error; this code must never run with a missing value | Throw immediately on read | Critical paths where missing is genuinely impossible (e.g. a `payment.amount` field on a paid order) |
| **Zero-default** | Missing means there is no charge for this dimension | Treat as `0` in arithmetic | Optional charges (e.g. a tip field that is null when no tip was given) |
| **Null-propagation** | Missing means we don't know; arithmetic involving missing is also missing | Propagate `null` through all operations (a + null = null) | Computed values where any unknown input invalidates the result (e.g. profit = revenue - cost, if cost is unknown then profit is unknown, not "profit equals revenue") |
| **Explicit-unknown** | Missing is a domain-meaningful state distinct from both zero and null | Surface as a separate field (e.g. `cost: { state: 'unknown' }`) and route by state | Multi-state domain where "unknown" is a first-class concept (e.g. fulfillment-cost-pending vs fulfillment-cost-zero) |

The error pattern is silent coercion: treating null as zero everywhere because that "makes the math work." For revenue-side fields (a missing tip is a zero tip), this is often correct. For cost-side fields (a missing fulfillment cost is NOT a zero fulfillment cost; it is an unknown that will be ingested later), this corrupts the P&L from the moment the order is placed until the data arrives.

The discipline: every money field in the schema has a documented semantics. The semantics is part of the schema, not part of the code that reads it.

## 6. Reconciliation Invariants — The Books Balance

Money obeys conservation: every money movement has a source and a destination, and the sum across all sides of all transactions is zero (or constant, if you include external entries like a bank balance as a domain entity). This is the central insight of double-entry bookkeeping, codified circa 1494 by Luca Pacioli.

In software, this becomes:

| Invariant | Statement | Verification |
|---|---|---|
| Conservation | Σ(debits) = Σ(credits) for any closed system | Trial balance query: sum the ledger by side; assert equal |
| Sign conventions are global | Revenue is + ; cost is - ; refund of revenue is - ; refund of cost is + | One sign-convention table at the system level, not per-module |
| Order-independent totals | Sum of N transactions equals total regardless of order | Integer arithmetic gives this for free; float arithmetic does not |
| Refund is not a new transaction; it is a reversal | A $20 refund on a $20 charge nets to zero, not to -$20 with separate revenue impact | Refund flow links to the original charge, not to a separate revenue/cost line |

The verification discipline is to encode these as runtime checks (assertions, integrity tests, reconciliation reports) rather than rely on developer attention. A trial balance that runs nightly and alerts on a non-zero sum catches a class of bugs that no test will ever catch because the data shape needed to trigger the bug only appears in production-volume aggregates.

## 7. The Allocation Problem

Allocating a total across N line items is not normal division. If a $99.99 invoice contains 7 line items proportional to weights `[3, 1, 1, 1, 1, 1, 1]`, the proportional allocations are `[42.85714..., 14.28571..., ...]` — none of which are exact cents. Rounding each independently can produce a total of $99.98 or $100.00 instead of $99.99, depending on rounding rule.

The fix is the **largest-remainder method** (also known as the Hare quota in voting theory):

1. Compute each allocation as a floating-point or exact-fraction proportional value.
2. Truncate each to integer cents — this gives a total that is ≤ the original total (off by at most N-1 cents).
3. Compute the remainder (original total − sum of truncated allocations).
4. Distribute the remainder one cent at a time, prioritized by the fractional part of each allocation (largest fractional part gets the first extra cent).

```
$99.99 across weights [3,1,1,1,1,1,1] (total weight 9):
proportional:   [33.33, 11.11, 11.11, 11.11, 11.11, 11.11, 11.11]
truncated:      [33.33, 11.11, 11.11, 11.11, 11.11, 11.11, 11.11] — sum 99.99 ✓ (this case lucky)

$100.00 across weights [1,1,1] (total weight 3):
proportional:   [33.33333..., 33.33333..., 33.33333...]
truncated:      [33.33, 33.33, 33.33] — sum 99.99
remainder:      0.01 — distribute to one item (by fractional rank or by stable rule)
final:          [33.34, 33.33, 33.33] — sum 100.00 ✓
```

The fairness rule for tie-breaking the remainder distribution (when multiple items have equal fractional parts) is application-specific. Common choices: by line-item ID order, by largest weight, by random-but-deterministic hash. Document the choice and stick to it; otherwise reconciliation reveals "the math is right but the line items are different across re-runs."

Joda-Money implements this as `Money.allocate(long[] ratios)`. Joda's algorithm is the canonical reference for the cross-language pattern.

## 8. Verification Discipline

The verifications that catch money bugs before they become incidents:

| Check | What it catches | When to run |
|---|---|---|
| Trial balance (Σ debits = Σ credits) | Sign-convention violations, missing offsets, broken sync | Nightly; pre-deploy; post-migration |
| Allocation total equals input total | Penny-rounding losses in allocation | Per allocation, as a runtime assertion |
| Re-aggregate independent of order | Float arithmetic bugs, non-associative rounding errors | Pre-deploy test; periodic integrity test |
| Currency-mismatch errors thrown | Cross-currency arithmetic without conversion | Compile time if types support it; runtime otherwise |
| Null-semantics matches schema | Silent null→zero coercion bugs | Per-field unit tests; production sampling |
| Reconciliation against external source | Drift between local books and external truth (e.g. processor reports) | Nightly reconciliation job |

The pattern: every money invariant is encoded as a check, every check runs automatically, and every failure produces an alert that someone owns. The discipline is in the automation, not in the reviewer's attention.

## 9. Anti-Patterns

| Anti-pattern | Why it fails | Correct approach |
|---|---|---|
| `parseFloat(priceString)` for money | Binary float representation error from the moment of parse | `parseInt(...)` of the minor-unit value, or a Money library |
| `Number.toFixed(2)` for storage | Returns a string, which then gets parsed back as a float | Store minor units; format only at the display boundary |
| Treating null as zero everywhere | Conflates "fee is zero" with "fee is unknown" | Per-field semantics; explicit null-propagation where unknown is possible |
| Cross-currency add | Currency drift; reconciliation fails silently | Money pattern; arithmetic on same-currency only |
| Default platform rounding | Round-half-up bias inflates aggregates | Explicit choice; banker's rounding for aggregations |
| Allocate by independent rounding | Penny loss; totals do not match | Largest-remainder method |
| Sum of grouped sums ≠ sum of all | Float non-associativity surfaces in reports | Integer cents end-to-end |
| Recomputing from display values | Compounds presentation rounding into storage | Recompute from stored minor-unit values only |

## 10. Common Misconceptions

**"Decimal types in databases solve this."** Partial. `NUMERIC(10, 2)` or `DECIMAL(10, 2)` is exact for the stored value, but the application driver may convert to/from a binary float at the language boundary. Validate end-to-end: round-trip a 0.10 value through the driver and confirm bit-exact equality.

**"Modern languages use decimal by default for money."** No. Most languages still default to binary float. Python has `decimal.Decimal` but only opt-in. JavaScript has no native decimal type at all (Stage 1 TC39 proposal as of 2026). Java has `BigDecimal` but it is verbose enough that developers reach for `double` "just for this case." The discipline is opt-in everywhere.

**"Banker's rounding is just for banks."** No — it is the IEEE 754 default and is the right choice for any aggregation where unbiased rounding matters. Banks happen to be the largest consumer of the property, but any high-volume aggregation has the same need.

**"The Money pattern is over-engineering."** Until it isn't. The cost of the pattern is one value class. The cost of not having it is a cross-currency bug that survives review, integration tests, and customer use until someone reconciles two reports and discovers the EUR-USD addition. The cost asymmetry is the case for the pattern.

## Verification

After applying this skill, verify:

- [ ] All money values are stored as integer minor units (cents, pence, satoshi), never as floats
- [ ] The application's rounding rule is explicitly chosen and documented (banker's for aggregations is the safe default)
- [ ] Money values are encapsulated as a Money value object (or equivalent), not as raw integers carrying currency in a separate field
- [ ] Every money schema field has a documented null-semantics (fail-fast / zero-default / null-propagation / explicit-unknown)
- [ ] Cross-currency arithmetic is impossible without explicit conversion (type system or runtime guard)
- [ ] Allocation of a total across line items uses the largest-remainder method, not independent rounding
- [ ] At least one runtime invariant check enforces conservation (Σ debits = Σ credits) for the relevant ledger
- [ ] Reconciliation against an external source runs on a documented cadence

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Designing one specific product's profit formula or operational money rules | The product-specific finance skill (e.g. a `sales-hub-financial-rules` or analogous) | This skill is portable concept-shape; product-specific operational rules belong in product-specific skills with grounded line-range citations |
| Formatting a money value for display in a specific locale | `formatting` or a product-specific display-contract skill | This skill ends at storage and arithmetic; display is a separate concern with locale-specific rules |
| Choosing the database transaction isolation level for a money write | `transaction-isolation` | Transaction-isolation owns the concurrency-correctness layer underneath any money write |
| Reasoning about whether the money write survives a crash | `acid-fundamentals` | acid-fundamentals owns durability and atomicity guarantees; this skill owns in-memory representation and arithmetic |
| Mapping a payment processor's webhook payload to the local money schema | The processor-integration skill (e.g. `stripe-ledger-recon`) | Processor-specific schema mapping is operational; this skill is foundational |
| Choosing the database column type for a money field | `data-modeling` | Column-type choice is a schema decision; this skill provides the conceptual frame underneath it |

## Key Sources

- Knuth, D.E. (1998). *The Art of Computer Programming, Volume 2: Seminumerical Algorithms* (3rd ed.), §4.2-4.3. Addison-Wesley. Fixed-point arithmetic and rounding rules.
- Goldberg, D. (1991). "What Every Computer Scientist Should Know About Floating-Point Arithmetic." *ACM Computing Surveys* 23(1), 5-48. The canonical explanation of why binary FP is inexact for decimals.
- IEEE 754-2019. *IEEE Standard for Floating-Point Arithmetic*. Defines the five rounding modes; round-half-to-even is the default.
- Fowler, M. (2002). *Patterns of Enterprise Application Architecture*, "Money" pattern, p. 488. Addison-Wesley.
- ISO 4217. *Codes for the representation of currencies*. International Organization for Standardization. The currency-code and fractional-unit registry.
- Colebourne, S. *Joda-Money* library documentation (https://www.joda.org/joda-money/). Java reference implementation of the Money pattern.
- Fowler, M. "Money" bliki (https://martinfowler.com/eaaCatalog/money.html). Short canonical pattern summary.
- van Rossum, G. (2002). PEP 327 — Decimal Data Type. Python Software Foundation. Rationale and rounding-mode enumeration for `decimal.Decimal`.
