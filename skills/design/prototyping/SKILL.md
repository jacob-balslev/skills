---
name: prototyping
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when building an artifact whose purpose is to answer a specific question — paper sketch, wireframe, clickable mockup, wizard-of-oz, role-play, service prototype, or code spike — at the lowest fidelity sufficient to produce that learning. Do NOT use for production-grade component construction, design-system contribution, or building the actual ship-ready feature — those are design-module-composition and engineering implementation."
# license: SPDX-compatible license identifier for the skill content.
license: CC-BY-4.0
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:

  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: design
  # public: publishability/private-data gate. Boolean.
  # true = publishable/shareable; false = private and excluded from public export.
  # Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
  public: true
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Building an artifact whose purpose is to answer a specific question — paper sketch, wireframe, clickable mockup, wizard-of-oz, role-play, service prototype, or code spike — at the lowest fidelity sufficient to produce that learning. Portable across any design effort; principle-grounded, not repo-bound. Excludes production-grade component construction (design-module-composition), design-system contribution, and building the ship-ready feature (engineering implementation)."
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["paper prototype","low fidelity prototype","clickable prototype","wizard of oz","role play prototype","service prototype","code spike","learning goal","fidelity matching","throwaway prototype"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["prototype this","wizard of oz","paper prototype","clickable mockup","what fidelity"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Pick the right fidelity for a prototype that tests whether users will trust an AI-suggested category.","Plan a wizard-of-oz study where a human acts as the recommendation engine.","Sketch a role-play prototype for a service-desk interaction before any UI is built.","Decide between a paper prototype and a Figma clickable for this onboarding test."]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Build the production React component for the new dashboard widget.","Add this component to the design system library.","Write the migration script for the production database."]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"ideation\",\"usability-testing\",\"design-thinking\"],\"suppresses\":[{\"skill\":\"design-module-composition\",\"reason\":\"design-module-composition produces durable design-system components meant to ship and be reused. prototyping produces disposable artifacts whose only purpose is learning — different lifecycle, different quality bar, different audience.\"},{\"skill\":\"interaction-patterns\",\"reason\":\"interaction-patterns is a reference catalog of established UI behaviors. prototyping is the activity of building a thing to test a question — it may use interaction patterns but is not itself a pattern library.\"}]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    A prototype is a question-answering instrument, not a draft of the product. Every prototype starts from one or two written learning questions and a definition of what evidence would answer them either way. The core move is fidelity matching: choose the lowest fidelity on the ladder (paper sketch → wireframe → clickable mockup → wizard-of-oz → role-play → service prototype → code spike) that can credibly answer that question, because each rung up the ladder costs more time and prematurely anchors stakeholders on visual decisions. The artifact is disposable by design — its value is the learning it produces, not the thing itself; a prototype that yields a clear "this concept doesn't work" succeeded.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without prototyping discipline, teams polish before they show, and polish is the enemy of learning: it signals finality, makes stakeholders evaluate fit-and-finish instead of the concept, and makes users reluctant to criticize. The opposite failure is over-building — spending two weeks at high fidelity to test a one-week assumption, or letting a "high-fi prototype" quietly become the production artifact. Prototyping exists to answer expensive questions cheaply: it substitutes a disposable artifact for a launched feature so the team learns whether a concept works before committing engineering cost, and it forces the team to write the learning question down first so the test produces an unambiguous answer.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT production component construction or shipping the real feature (that is engineering implementation — even a "high-fi prototype" that ships is a product, not a prototype), NOT contributing a durable, reusable component to the design system (design-module-composition owns the ship-and-reuse lifecycle), NOT a reference catalog of established UI behaviors (interaction-patterns — a prototype may *use* patterns but is not a pattern library), NOT evaluating an already-built artifact with users (usability-testing — no new artifact is needed), and NOT articulating which problem to solve (problem-framing / ideation supply the question a prototype then tests). It owns building-to-learn; it does not own building-to-ship, the pattern catalog, the testing of finished work, or the framing of the question.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A prototype is to a product what a wind-tunnel model is to an aircraft — a deliberately cheap, deliberately disposable stand-in built to answer one question (does this wing shape generate lift?) at the lowest fidelity that gives a trustworthy answer; nobody flies the wind-tunnel model, and its whole value is the data it produces before the expensive real thing is committed."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "a prototype is an early version of the product, so make it as polished as you can." That inverts the value system: it judges prototypes by visual quality instead of by what was learned, drives over-fidelity, makes users polite instead of honest, and tempts the team to ship the prototype. The corrected model: a prototype is an instrument for a written question, built at the lowest fidelity that can answer it and meant to be thrown away. A rough, sacrificial artifact that draws an honest reaction and produces a clear answer — even a negative one — beats a beautiful one that anchors stakeholders and gets defended.
---
# Prototyping

## Concept of the skill

Prototyping is the practice of building an artifact whose only purpose is to answer a specific, written-down question — and building it at the lowest fidelity that can credibly produce that answer. A prototype is not an early draft of the product; it is an instrument. The work begins with a learning goal contract: one or two questions the prototype exists to answer, plus a definition of what evidence would count as an answer in either direction. From there the central judgment is fidelity matching — choosing a rung on the ladder (paper sketch → wireframe → clickable mockup → wizard-of-oz → role-play/bodystorming → service prototype → code spike) that can answer the question without paying for fidelity the question doesn't require. Paper can answer "is this flow understandable?" but not "is this typography readable?"; a clickable can answer "do users find the primary action?" but not "does this feel fast under load?"; only a code spike can answer a true scaling question. The artifact is disposable by design: its value is the learning, not the thing, and a prototype that produces a clear "this concept doesn't work" has succeeded — that finding came at the price of a prototype rather than a launched feature. The discipline rejects polishing before showing, because polish signals finality, makes stakeholders evaluate fit-and-finish instead of concept, and makes users reluctant to criticize.

## Coverage
Prototyping covers the practice of constructing artifacts whose primary purpose is to **answer a question** the team has written down. The fidelity ladder runs from **paper sketches** (fastest, cheapest, best for early flow and concept testing) through **wireframes**, **clickable prototypes** (Figma, Framer, similar), **wizard-of-oz** prototypes (a human secretly performs the function the system will eventually automate — Kelley 1984), **role-play / bodystorming** (the team physically acts out a service interaction), **service prototypes** (props and staged environments for service-design questions), and up to **code spikes** (throwaway working code that answers a feasibility question).

The central skill is **fidelity matching**: choosing the lowest fidelity that can credibly answer the learning question. Paper prototypes can answer "is this flow understandable?" but not "is the typography readable?"; a clickable prototype can answer "do users find the primary action?" but not "does this feel fast under load?"; only a code spike can answer "will this API rate-limit us at scale?". Building higher fidelity than the question requires wastes time and prematurely anchors stakeholders on visual decisions.

A complementary skill is **the learning goal contract**: every prototype begins with one or two written questions it is built to answer, and a definition of what evidence would count as an answer in either direction. Without this, prototypes drift into "let's just make it look nice" and the testing session that follows produces ambiguous results because nobody agreed in advance what they were looking for.

The practice also covers **sacrificial concepts** — deliberately rough or extreme prototypes whose purpose is to provoke a reaction, not to be defended. IDEO and the Stanford d.school both teach using disposable artifacts to draw out user preferences that would not surface in abstract conversation.

## Philosophy of the skill
Prototyping rejects the instinct to polish before showing. Polish signals finality; polish makes stakeholders evaluate fit-and-finish instead of concept; polish makes users reluctant to criticize. A rougher prototype invites honest reaction. The famous IDEO maxim "if a picture is worth a thousand words, a prototype is worth a thousand meetings" captures the substitution effect — but only if the prototype is cheap enough that a team can build three and throw two away.

The discipline insists prototypes are means, not ends. A successful prototype is one that produced a clear answer, even if the answer is "this concept doesn't work" — perhaps especially then, because that finding came at the price of a prototype rather than a launched feature. Teams that judge prototypes by their visual quality have inverted the value system; teams that judge them by what was learned have it right.

## Verification
- The prototype has a written learning question, agreed before construction began, and a definition of what evidence would answer it.
- The fidelity matches the learning goal — the team can defend why this fidelity was chosen and what a higher- or lower-fidelity version would have cost or gained.
- The prototype is **disposable** in the team's mind — there is no implicit commitment that this code/file/sketch will become the production artifact.
- The construction time is small relative to the cost of being wrong about the underlying concept — if a prototype took two weeks to test a one-week assumption, the fidelity was probably too high.
- The prototype is testable: a real participant can interact with it (or watch it being acted out) and produce a meaningful reaction, not just nod politely.
- The team has a plan for what happens after testing — either iterate, escalate fidelity, or kill the concept — written down before testing begins.

## Do NOT Use When
- The artifact will ship to real users in production — that is engineering implementation, not prototyping; even a "high-fi prototype" that ships is a product.
- The component is meant for reuse across many features and contexts — use **design-module-composition** to contribute to the design system.
- No learning question has been articulated — return to **problem-framing** or **ideation** to clarify what the prototype would even test.
- The team needs to evaluate an existing artifact with users — use **usability-testing** directly; no new prototype is required.
- The question is purely technical performance, scaling, or infrastructure — use an engineering spike with appropriate measurement instrumentation, not a design prototype.
- The output is a reference catalogue of established UI behaviors — use **interaction-patterns**.
