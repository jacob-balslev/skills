---
name: test-driven-development
description: "Use when reasoning about Test-Driven Development as a design discipline rather than a workflow: the red-green-refactor cycle as a feedback loop, the difference between London-school (outside-in, interaction-heavy, mock-driven) and Detroit-school (inside-out, state-heavy, classicist) TDD, the role of TDD as a design tool (how tests pressure code into more decomposable shapes), the connection between TDD and emergent design, the boundary between TDD and prior-test-suites, why TDD's failure mode is not 'no tests' but 'tests that mirror implementation', and the empirical record of TDD's effects on defect density, design quality, and development velocity. Do NOT use for the strategy of what to test at which level (use testing-strategy), the construction of test doubles (use test-doubles-design), the discipline of LLM eval iteration (use eval-driven-development), or general-software process workflow (use the obra/superpowers test-driven-development workflow skill — this skill is the concept-shape complement)."
license: MIT
allowed-tools: Read Grep
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.2.0"

  # === v7 Classification (DEPRECATED 2026-05-26 — kept for back-compat only) ===
  # type: v7 classification — DEPRECATED, replaced by `operation`.
  # Legacy values: capability / workflow / router / overlay.
  type: capability
  # operation: cognitive operation enabled (Bloom-grounded). One of four closed values:
  # know (declarative — concepts, vocabulary, reference) /
  # do (procedural — step-by-step execution) /
  # decide (judgment — choosing, dispatching) /
  # modify (context injection — shapes how other skills execute).
  operation: do
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: quality

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: quality-assurance
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: quality/testing
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: workspace
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-18"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-18\"}"

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
  keywords: "[\"test-driven development\",\"TDD\",\"red green refactor\",\"London school\",\"Detroit school\",\"Chicago school\",\"outside-in TDD\",\"inside-out TDD\",\"mockist\",\"classicist\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"should we write tests first\",\"are mocks ruining the design\",\"is TDD worth it\",\"London school vs Detroit school\",\"the tests changed every refactor\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"explain why writing the test first changes the design of the code under test\",\"decide between London-school (mocks-as-design) and Detroit-school (state-verification) TDD for a new module\",\"diagnose why the test suite is fragile under refactor — likely over-mocked interaction tests\",\"explain why high test coverage with TDD is a side effect, not the goal\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"construct a mock, stub, or spy (use test-doubles-design)\",\"decide what test levels (unit/integration/e2e) to invest in (use testing-strategy)\",\"iterate on LLM behavior using an eval suite (use eval-driven-development)\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"testing-strategy\",\"test-doubles-design\",\"eval-driven-development\",\"refactor\",\"type-safety\"],\"boundary\":[{\"skill\":\"testing-strategy\",\"reason\":\"testing-strategy owns the question 'what should we test, at which level, with what evidence' for a given change; this skill owns the design discipline of writing the test before the code that satisfies it. The two compose — testing-strategy decides the surface; TDD prescribes the rhythm — but they answer different questions.\"},{\"skill\":\"test-doubles-design\",\"reason\":\"test-doubles-design owns mocks/stubs/fakes/spies as a construct; this skill owns the discipline that places them (London-school heavily, Detroit-school lightly). The schools differ on how much test-doubles design matters to the practice.\"},{\"skill\":\"eval-driven-development\",\"reason\":\"eval-driven-development owns the LLM analog of TDD where the unit of judgment is pass-rate over a sample rather than binary per-test pass/fail. The disciplines share the iteration-first-then-implement spirit but the math underneath differs.\"},{\"skill\":\"refactor\",\"reason\":\"refactor owns behavior-preserving structural change; this skill prescribes refactor as the third beat of red-green-refactor. The skills compose: TDD calls refactor on every green; refactor owns how to do it without breaking behavior.\"}],\"verify_with\":[\"testing-strategy\",\"refactor\"]}"
  # grounding: required when `scope: project` (or legacy alias `scope: codebase`).
  # Declares the truth sources the skill anchors to and the failure modes those sources
  # prevent. Omit when the skill is universal-knowledge.
  grounding: "{\"domain_object\":\"Reference-grounded Test-Driven Development concept, school taxonomy, design-discipline mechanics, and empirical evidence boundaries\",\"grounding_mode\":\"universal\",\"truth_sources\":[\"https://martinfowler.com/bliki/TestDrivenDevelopment.html\",\"https://martinfowler.com/articles/mocksArentStubs.html\",\"https://link.springer.com/article/10.1007/s10664-008-9062-z\",\"https://ieeexplore.ieee.org/document/1423994\",\"https://ieeexplore.ieee.org/document/4493089\",\"https://doi.org/10.1016/j.infsof.2016.02.004\",\"https://dannorth.net/introducing-bdd/\"],\"failure_modes\":[\"treating_test_first_order_as_tdd_without_refactor_design_pressure\",\"over_specifying_interactions_so_tests_mirror_implementation\",\"choosing_london_or_detroit_school_accidentally\",\"using_tdd_as_a_substitute_for_testing_strategy\",\"treating_empirical_defect_reduction_numbers_as_guaranteed_outcomes\",\"claiming_eval_or_routing_verification_without_a_run\"],\"evidence_priority\":\"equal\"}"

  # === v6+ Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    TDD is design discipline through the test-writing lens. The unit of work is the red-green-refactor cycle: write one failing test for one increment of behavior (red), write the smallest production change that makes it pass (green), restructure the shape of both code and test while keeping all tests passing (refactor). Each cycle fits in a few minutes; long cycles indicate either insufficient test granularity or production complexity that should be decomposed. The test suite is the *design pressure* that shapes production code — writing tests first surfaces hard-to-test code at the moment when the underlying design discomfort (hard-to-use, hard-to-compose, hard-to-maintain) is still cheap to correct.

    Three schools differ in where they apply the design pressure: London (Freeman & Pryce, GOOS 2009) is mockist, outside-in, interaction-heavy, mock-driven, starts at an acceptance test or service boundary, applies pressure to collaborator interfaces; Detroit (Beck, TDD by Example 2002) is classicist, inside-out, state-heavy, mock-sparse, starts at a single concrete unit, applies pressure to units' responsibilities and state shape; Chicago/hybrid is the working norm. London suits collaboration-rich services (microservices, hexagonal); Detroit suits state-rich domains (calculators, parsers, domain logic).
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces test-after-implementation with test-driven design pressure. Solves the problem that tests written after the code mirror the implementation rather than the desired behavior — they lock the current shape in place, fragment under refactor, and miss the design feedback that comes only from articulating what a unit should do *before* writing it. Industrial evidence (Nagappan et al. 2008 at Microsoft and IBM across four teams) shows TDD codebases have 40-90% lower defect density at 15-35% longer initial development time; Erdogmus et al. (2005), Janzen & Saiedian (2008), and Bissi et al. (2016) converge on the same direction. Replaces "tests as regression coverage" with "tests as design pressure that produces regression coverage as a side effect."
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from testing-strategy, which owns the strategic question of what to test, at which level, with what evidence — strategy decides the surface, TDD prescribes the rhythm within it. Distinct from test-doubles-design, which owns mocks/stubs/fakes/spies as constructs — TDD's schools differ on how much test-doubles design matters to the practice (London heavily, Detroit lightly); the two compose. Distinct from eval-driven-development, the LLM analog where the unit of judgment is pass-rate over a sample rather than binary per-test pass/fail — both share the iteration-first-then-implement spirit but the math underneath differs. Distinct from refactor, which owns behavior-preserving structural change as a technique — TDD calls refactor as the third beat of red-green-refactor; refactor owns how to do it without breaking behavior. Distinct from the obra/superpowers TDD workflow skill on skills.sh, which is workflow-shape (process steps); this skill is concept-shape (the discipline's underlying mechanism).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "TDD is to code design what a piano teacher's metronome is to a student's playing — the rhythm is not the music, but it surfaces every uneven phrase, every rushed measure, every hesitation, in time to correct it before it ossifies into habit."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that TDD is "writing tests first" as a procedural rule, where the tests are the point and the production code merely satisfies them. They are not the point. Tests are an *artifact* of doing design with a test-shaped tool; a team that "does TDD" by writing tests first without heeding the design pressure has the artifact without the practice, and will conclude TDD doesn't work because they will see only the cost (slower initial development) without the benefit (better-shaped code with lower defect density). Two adjacent misconceptions: that high coverage is the goal (coverage is a side effect; engineering tests to satisfy a coverage number Goodharts the discipline), and that the school doesn't matter (a practitioner who has not chosen London or Detroit has chosen by accident — the test suite's character, mock-rich vs state-rich, interaction-heavy vs state-heavy, reveals which school is in use whether the team named it or not).
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: '{"definition":"Test-Driven Development is a software design discipline in which the test for a behavior is written before the production code that satisfies it, the production code is written until the test passes, and the code is then refactored while the test suite stays green. The red-green-refactor cycle is the unit of work; the test suite is the design pressure that shapes the code.","mental_model":"TDD applies pressure through short red-green-refactor loops. Red names one behavior before implementation, green proves the smallest production change satisfies it, and refactor improves the code and test shape without changing behavior. London-school TDD applies pressure through collaborator interactions and mocks; Detroit-school TDD applies pressure through observable state and sparse doubles; hybrid practice names which pressure is intentional.","purpose":"TDD solves the problem of tests written after implementation merely mirroring the implementation. Writing the test first forces the interface, responsibility, and observable behavior to be designed before internal structure hardens. Regression coverage is a side effect; the primary purpose is design feedback while change is still cheap.","boundary":"Testing-strategy chooses what level and scope deserves a test; TDD prescribes the rhythm inside that chosen surface. Test-doubles-design chooses the stand-ins used by tests; TDD chooses when and why tests are written. Refactor owns behavior-preserving restructuring; TDD invokes refactor as the third beat. Eval-driven-development is the LLM analog with statistical pass-rate rather than binary test pass/fail.","taxonomy":"Prerequisite: testing-strategy selects the test surface. Composition: test-doubles-design supplies mocks, stubs, fakes, spies, and dummies when the chosen TDD school needs them. Phase relation: refactor is the third beat of each cycle. Alternative/analog: eval-driven-development adapts the iteration-first discipline to stochastic LLM systems.","analogy":"TDD is to code design what a piano-teacher metronome is to a student performance: the rhythm is not the music, but it surfaces rushed measures and hesitations early enough to correct them before they become habit.","misconception":"The common mistake is treating TDD as a mechanical rule to write tests first. Tests are not the point; they are the artifact of design through a test-shaped tool. A team that writes tests first but ignores design pressure gets the cost without the benefit."}'
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v6
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/quality-assurance/test-driven-development/SKILL.md
  # portability: external-runtime export claims. Object with:
  # readiness — declared (claim only) / scripted (export tooling exists) /
  #             verified (proven with a receipt artifact).
  # targets — array; currently only `skill-md` is in the enum.
  portability: "{\"readiness\":\"scripted\",\"targets\":[\"skill-md\"]}"
  # lifecycle: maintenance policy for the drift sentinel.
  # stale_after_days — skill flagged STALE when N days past `drift_check.last_verified`.
  # review_cadence — process commitment (quarterly / monthly / annual), not a calendar fact.
  lifecycle: "{\"stale_after_days\":180,\"review_cadence\":\"quarterly\"}"
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

# Test-Driven Development

## Coverage

The design discipline of writing the test before the production code that satisfies it, using the test-writing pressure to shape the code's design, and applying the red-green-refactor cycle as the unit of work. Covers the cycle structure (red → green → refactor), the design-pressure mechanism that makes TDD a design discipline rather than just a test-first habit, the London/Detroit/Chicago school distinctions (mockist vs classicist, outside-in vs inside-out, interaction vs state), the relationship between TDD and emergent design, the empirical record (Nagappan 2008 at Microsoft/IBM and meta-analyses since), the boundary between TDD and BDD, and the failure modes (skipping refactor, ignoring design pressure, mock-heavy fragile tests, coverage-as-goal Goodharting).

## Philosophy

TDD is design through the test-writing lens. Every test you sit down to write is a moment of design: what is this unit, what does it own, what does it delegate, what does its interface look like from the outside. The discomfort of writing a hard-to-test piece of code is the same discomfort that will eventually arrive as hard-to-use, hard-to-maintain, hard-to-compose code; TDD makes that discomfort visible at the moment when correcting it is cheap.

The tests are not the point. The tests are an artifact of doing design with a test-shaped tool. A team that "does TDD" by writing tests first without heeding the design pressure has the artifact without the practice; they will conclude TDD doesn't work because they will see only the cost (slower initial development) without the benefit (better-shaped code with lower defect density).

The schools matter. London and Detroit produce different code under the same red-green-refactor cycle, because they apply the design pressure to different surfaces. A practitioner who has not chosen a school has chosen by accident, and the test suite's character — interaction-heavy or state-heavy, mock-rich or mock-sparse, outside-in or inside-out — reveals which they chose without knowing.

## The Cycle In Detail

| Beat | Activity | Stop condition | Common mistake |
|---|---|---|---|
| Red | Write one failing test for one increment of desired behavior | The test compiles and fails for the right reason (not a syntax error) | Writing a passing test (no design pressure); writing many tests at once (loses the increment) |
| Green | Write the smallest production change that makes the test pass | The test passes; no other tests broke | Writing more than needed; "fake it till you make it" abandoned too early |
| Refactor | Improve the shape of both code and test while keeping all tests passing | The structure is cleaner; tests still pass | Skipping this beat; refactoring into bigger changes that break tests |

Each cycle should fit in a few minutes — long cycles indicate either insufficient test granularity or production complexity that should be decomposed before continuing.

## London School vs Detroit School — A Practical Comparison

| Property | London (mockist, outside-in) | Detroit (classicist, inside-out) |
|---|---|---|
| Origin | Freeman & Pryce, *GOOS* (2009) | Beck, *TDD by Example* (2002) |
| Starting point | Acceptance test or service boundary | A single concrete unit |
| Test focus | Interactions (who called whom with what) | Observable state changes |
| Test doubles | Central — every new collaborator becomes a mock | Sparse — used only when needed (DB, external service) |
| Design pressure | On collaborator interfaces (the mocks shape them) | On units' responsibilities and state shape |
| Failure mode | Tests mirror implementation; refactor breaks them | State assertions get coarse; design coupling grows |
| Typical codebase | Many small classes with well-defined collaboration roles | Fewer larger classes with rich state |

A practical heuristic: London-school suits services with rich collaboration (microservices, hexagonal architectures); Detroit-school suits state-rich domains (calculators, domain logic, parsers). Hybrid is the working norm.

## When TDD Fits

Use TDD when the next behavior can be named before the implementation exists and feedback can arrive quickly enough to shape the code. Do not force it onto exploration where the target behavior is still unknown; spike first, then restart with tests once the behavior is nameable.

| Situation | TDD fit | Reason |
|---|---|---|
| New behavior with a clear externally observable contract | Strong | The failing test can state the desired behavior before implementation details exist |
| Bug fix with a reproducible example | Strong | The regression test becomes the red step, then green proves the bug is fixed |
| Refactor with behavior already pinned | Supporting | Use TDD for new seams discovered during the refactor, but the refactor skill owns behavior preservation |
| Legacy code with no test harness | Characterize first | Golden-master or characterization tests may be needed before true TDD can begin safely |
| Research spike, unfamiliar API, or unclear product behavior | Weak until clarified | Exploration is legitimate; TDD starts once the desired behavior can be expressed |
| Visual polish or copy-only work | Usually weak | The feedback signal is often review, screenshot comparison, or usability judgment rather than binary test failure |

## Failure Modes and Corrections

| Failure mode | Symptom | Correction |
|---|---|---|
| Test-first without refactor | Red-green-next-red cycles pile up, design does not improve | Stop after green; refactor production and test code while the suite stays green |
| Implementation-mirroring tests | Every internal rename or extraction breaks tests | Rewrite tests around observable behavior and natural boundaries |
| Accidental school choice | Some tests mock every collaborator while others assert broad state with no rationale | Name the school per module and align doubles with the chosen design pressure |
| Coverage Goodharting | Tests are added to satisfy a number but do not describe meaningful behavior | Use coverage as a smoke alarm, not the target; require a behavior or regression reason |
| Slow cycles | A single red-green-refactor loop takes hours | Shrink the behavioral increment or decompose the production unit before continuing |
| TDD used instead of testing strategy | The team writes tests first but still chooses the wrong level of test | Load `testing-strategy` first to choose unit/integration/contract/e2e surface, then apply TDD rhythm inside that surface |

## The Empirical Record

Multiple controlled studies and one large industrial study converge on a consistent directional finding: TDD codebases often show lower defect density at the cost of longer initial development time. Treat these numbers as evidence boundaries, not guarantees. The results depend on team discipline, cycle size, refactor quality, domain fit, and whether the team actually uses tests as design pressure rather than only as test-first paperwork.

| Study | Finding |
|---|---|
| Nagappan et al. (2008) at Microsoft and IBM | TDD teams had 40-90% lower defect density; 15-35% longer initial development time |
| Erdogmus et al. (2005) controlled experiment | TDD subjects had higher external code quality; productivity comparable |
| Janzen & Saiedian (2008) meta-analysis | Code complexity reduced; cohesion improved; coupling reduced under TDD |
| Bissi et al. (2016) systematic review | 27 of 39 studies showed TDD improved internal quality; 18 of 23 showed external quality improvement |

The trade is well-documented. Teams abandoning TDD often do so on the visible-cost side (the time spent writing tests) without measuring the invisible-saving side (defects not encountered, rework not required).

## Evaluation State

This public skill is reference-grounded and carries v6 understanding fields (`mental_model`, `purpose`, `boundary`, `analogy`, `misconception`), but its dedicated comprehension eval artifact is still planned. Keep `eval_artifacts: planned`, `eval_state: unverified`, and `routing_eval: absent` until a realistic eval suite exists, includes boundary/negative cases, runs in the same change, and produces evidence.

## Verification

After applying this skill, verify:
- [ ] Every increment of production code is preceded by a failing test that describes the behavior, not the implementation. If code was written before the test, the test is regression coverage, not TDD-born specification.
- [ ] Each cycle includes a refactor beat. Cycles that go red → green → next-red are test-first development, not TDD.
- [ ] The school being practiced (London / Detroit / hybrid) is intentional, not accidental. The test suite's character (mock-rich vs state-rich) reveals which school is in use.
- [ ] When a test is hard to write, the design is examined. Hard-to-test code is the design-pressure signal; ignoring it (with test-only hooks, exposed internals, or stretched test boundaries) defeats the discipline.
- [ ] Test names describe behaviors at the unit's natural boundaries — "calculates total with discount applied," not "tests `calculateTotal()` line 17."
- [ ] Coverage is treated as a side effect, not a target. The discipline is the goal; coverage emerges from doing it.
- [ ] The cycle's granularity stays small. Cycles that run hours indicate either over-large tests or under-decomposed production code.
- [ ] For research/spike work where the target is unclear, exploration is allowed before TDD applies. The discipline is not universally appropriate.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Choosing what to test, at which level, with what evidence | `testing-strategy` | testing-strategy owns the strategic-level decision; this skill owns the tactical design discipline |
| Constructing a mock, stub, fake, or spy | `test-doubles-design` | test-doubles-design owns the constructs; this skill owns the discipline that places them |
| Iterating on LLM behavior using an eval suite | `eval-driven-development` | eval-driven-development is the LLM analog with statistical (not binary) judgment |
| Performing a behavior-preserving structural change | `refactor` | refactor owns the technique; this skill calls it as the third beat |
| Process workflow guidance for a TDD session | the obra/superpowers `test-driven-development` skill on skills.sh | that skill is the workflow-shape complement; this one is concept-shape |

## Key Sources

- Beck, K. (2002). *Test-Driven Development: By Example*. Addison-Wesley. The canonical book on Detroit-school TDD; defines red-green-refactor and the discipline's core form.
- Freeman, S., & Pryce, N. (2009). *Growing Object-Oriented Software, Guided by Tests* (GOOS). Addison-Wesley. The canonical book on London-school TDD; defines outside-in mock-driven development.
- Nagappan, N., Maximilien, E. M., Bhat, T., & Williams, L. (2008). ["Realizing quality improvement through test driven development: results and experiences of four industrial teams"](https://link.springer.com/article/10.1007/s10664-008-9062-z). *Empirical Software Engineering*, 13(3), 289-302. The Microsoft/IBM industrial study showing 40-90% defect-density reduction.
- Erdogmus, H., Morisio, M., & Torchiano, M. (2005). ["On the effectiveness of the test-first approach to programming"](https://ieeexplore.ieee.org/document/1423994). *IEEE Transactions on Software Engineering*, 31(3), 226-237. Controlled experiment on TDD's productivity and quality effects.
- Janzen, D., & Saiedian, H. (2008). ["Does Test-Driven Development Really Improve Software Design Quality?"](https://ieeexplore.ieee.org/document/4493089). *IEEE Software*, 25(2). Meta-analysis on TDD's effect on code complexity, cohesion, and coupling.
- Bissi, W., Serra Seca Neto, A. G., & Emer, M. C. F. P. (2016). ["The effects of test driven development on internal quality, external quality and productivity: A systematic review"](https://doi.org/10.1016/j.infsof.2016.02.004). *Information and Software Technology*, 74, 45-54. Systematic review of controlled TDD studies.
- Fowler, M. (2007). ["Mocks Aren't Stubs"](https://martinfowler.com/articles/mocksArentStubs.html). Practitioner-focused explanation of the London/Detroit school distinction and its consequences.
- North, D. (2006). ["Introducing BDD"](https://dannorth.net/introducing-bdd/). The origin essay for Behavior-Driven Development as a vocabulary and tooling layer above TDD.
