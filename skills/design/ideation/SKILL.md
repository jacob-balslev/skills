---
name: ideation
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when generating a wide range of solution concepts before converging on a direction, running structured idea-generation sessions, breaking out of solution fixation, or moving from divergent to convergent selection with explicit criteria. Do NOT use for collaborative engineering domain discovery (event-storming), solo deep technical design, or making final go/no-go investment decisions — those require different methods."
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
  scope: "Generating a wide range of solution concepts before converging — running structured idea-generation sessions, breaking out of solution fixation, and moving from divergent to convergent selection with explicit criteria. Portable across any design or product effort; principle-grounded, not repo-bound. Excludes collaborative engineering domain discovery (event-storming), solo deep technical design, and final go/no-go investment decisions."
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["crazy 8s","brainstorming","SCAMPER","worst possible idea","headlines from the future","dot voting","NUF test","divergent thinking","convergent thinking","ideation workshop"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["brainstorm","ideation session","crazy 8s","generate concepts","narrow down ideas"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Run a crazy-8s round on this how-might-we statement and produce a divergent set.","Apply SCAMPER to this existing feature to generate variant concepts.","Use dot voting and an impact/effort matrix to converge on three concepts to prototype.","Help me set up a worst-possible-idea round to break the team out of solution fixation."]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Decide whether to invest in this feature for the next quarter.","Model the bounded contexts for the order-fulfillment domain.","Write the production code for the selected concept."]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"problem-framing\",\"prototyping\",\"design-thinking\",\"event-storming\",\"conceptual-modeling\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Ideation is two strictly separated cognitive modes operating on a well-framed problem: a divergent mode that maximizes the quantity and range of concept variants while suppressing all judgment, and a convergent mode that prunes the field against criteria named in writing before voting begins. The separation is the mechanism — judgment running in parallel with generation suppresses generation, so the practice time-boxes silent divergent rounds (Crazy 8s, brainwriting, SCAMPER, worst-possible-idea, headlines-from-the-future) to flood the field, then opens an evaluative convergent round (dot voting, NUF test, impact/effort 2x2, weighted matrices) only once the field is large enough that pruning is meaningful.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without disciplined ideation, teams produce concept sets that are small, safe, and clustered around the obvious first ideas any competitor has also had — because they judge as they generate, which throttles output and biases it toward the comfortable middle. Ideation exists to widen the solution field before commitment: divergent rounds force quantity so the interesting ideas in the second half of a forced-quantity round get surfaced, and convergent rounds make the selection criteria explicit so the chosen direction is defensible rather than political.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT problem-framing (shaping the brief and the how-might-we statement that ideation operates on), NOT event-storming (collaborative discovery of engineering domain events and aggregates), NOT conceptual-modeling (seeking one correct model rather than a variety of concepts), NOT prototyping (making a chosen concept real to learn from it), and NOT an investment decision process (committing budget to a single direction). It owns generating many variants and converging on a worthwhile subset; it does not own framing the problem, building the concept, or funding it.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Ideation is to a solution like casting a wide net then sorting the catch — the net is thrown deliberately wide with no inspection mid-haul (divergent), and only once it is on deck does anyone decide which fish to keep against rules agreed before the boat left port (convergent); inspecting each fish as it is caught would only slow the haul and shrink it."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "ideation is brainstorming — just throw out ideas until something sticks," which collapses the two modes into one undisciplined free-for-all where people judge ideas as they arrive. The corrected model: the value comes from strictly separating generation from judgment and from forcing quantity past the obvious first ideas. A brainstorm that evaluates as it generates produces fewer and safer ideas; the discipline — silent time-boxed divergent rounds, then criteria-first convergent selection — is what actually widens and then sharpens the field.
---
# Ideation

## Concept of the skill

Ideation is the disciplined practice of producing a wide range of solution concepts in response to a well-framed problem and then converging on a subset worth pursuing — treating generation and judgment as two separable activities that must not run at the same time. Its core claim is counterintuitive: quantity precedes quality, because judging an idea costs cognitive effort and judgment running in parallel with generation suppresses generation. So the practice splits into a **divergent mode** (Crazy 8s, brainwriting, SCAMPER, worst-possible-idea, headlines-from-the-future, analogous inspiration) that floods the field while withholding all evaluation, and a **convergent mode** (dot voting, the NUF test, impact/effort 2x2, weighted decision matrices, assumption-testing prioritization) that prunes the field against criteria named in writing before voting starts. The facilitation mechanics — enforced silence during divergent rounds, strict time-boxing, "yes-and" over "yes-but", evaluative discussion deferred to the convergent phase — exist to keep the two halves apart. Done well, the divergent round spreads the field past the obvious first three ideas every competitor has also had, and the convergent round prunes intelligently because the field is large enough that pruning is meaningful and the choice is defensible rather than political.

## Coverage
Ideation covers the techniques that produce many concept variants in response to a well-framed problem, then converge on a subset worth pursuing. The practice has two distinct halves and treats them as separable activities. **Divergent techniques** include **Crazy 8s** (eight sketches in eight minutes, popularized by Google Ventures' Design Sprint), **brainwriting** (silent written generation that bypasses dominant voices), **SCAMPER** (Substitute / Combine / Adapt / Modify / Put-to-another-use / Eliminate / Reverse — Bob Eberle's adaptation of Alex Osborn's checklist), **worst-possible-idea** (deliberately bad concepts to disinhibit and reveal hidden assumptions), **headlines-from-the-future** (write the press release for the launched product), and **analogous inspiration** (how do other domains solve adjacent problems).

**Convergent techniques** include **dot voting** (each participant gets N stickers to place on concepts they would invest in), the **NUF test** (Is it New, Useful, Feasible?), **impact / effort 2×2** plotting, **weighted decision matrices** for multi-criteria selection, and **assumption-testing prioritization** (which concepts, if true, would teach the team the most). Convergent methods make the selection criteria explicit before voting begins, so the choice is defensible rather than political.

The skill includes the **facilitation mechanics** that keep the two halves separate: enforcing silence during divergent rounds so no idea is judged before it lands, time-boxing strictly so quantity is prioritized over polish, withholding feedback ("yes-and" rather than "yes-but"), and only opening evaluative discussion in the convergent phase. This separation is the single most-cited determinant of brainstorming productivity in the literature (going back to Osborn 1953, with the criticism / refinements from Diehl & Stroebe and others incorporated via brainwriting variants).

## Philosophy of the skill
Ideation is built on a counterintuitive claim: that quantity precedes quality. The case is empirical and structural — judging an idea costs cognitive effort, and judgment running in parallel with generation suppresses generation. Teams that judge as they ideate produce fewer ideas, and the ideas they produce skew toward the safe middle of the distribution. By splitting the modes, divergent rounds produce a wider range, and convergent rounds can then prune intelligently because the field is large enough that pruning is meaningful.

The discipline is sceptical of "good enough" early ideas. The first three ideas a team generates are usually the obvious ones — the ones any competitor has also considered. The interesting ideas live in the second half of a forced-quantity round, where the obvious is exhausted and the team is pushed into less-trodden territory. Worst-possible-idea exercises serve the same function from the other direction: by deliberately violating norms, they expose which norms were holding the design back.

## Verification
- A divergent round produced at least 20 concept variants (or 8 per participant in a Crazy 8s round) before any convergence began.
- The selection criteria for convergence were named in writing *before* voting started — not retrofitted to justify the popular choice.
- The selected concepts are materially different from each other; if the three "winners" are variations on the same idea, the divergent round failed to spread.
- At least one selected concept is uncomfortable or unfamiliar to the team — pure consensus often signals the convergent phase compressed the range.
- The team can articulate, for each selected concept, what specific question it would help answer in the next stage (prototyping or testing).
- Time-boxes were enforced; the session did not drift into open-ended discussion that re-merged the divergent and convergent modes.

## Do NOT Use When
- The problem has not been framed — return to **problem-framing** first; ideating on a fuzzy brief produces a fuzzy concept set.
- The team needs to commit to a single direction with budget implications, not just narrow a creative field — pair ideation with a separate investment-decision process.
- The task is modeling engineering domain events and aggregates — use **event-storming**.
- The output should be a single best architecture or model — use **conceptual-modeling**, which seeks correctness rather than variety.
- The decision is between two well-understood, already-specified options — a simple comparison is sufficient; full ideation is overhead.
- The next step is to make the chosen concept real and learn from it — move to **prototyping**.
