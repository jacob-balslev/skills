---
name: journey-mapping
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when mapping a user's experience across multiple touchpoints and time, surfacing emotional peaks and troughs, identifying opportunity moments in a cross-channel flow, or aligning a team on the end-to-end experience including back-stage support processes. Do NOT use for decomposing a single screen into UI steps (use task-analysis) or for drawing back-end service architecture diagrams — journey maps describe human experience, not system topology."
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
  scope: "Portable across any product, service, or team. Teaches how to model a person's end-to-end lived experience across touchpoints, channels, and time — the actions, thoughts, and emotional curve front-stage, plus the back-stage processes that produce each moment — so a team aligns on one cross-channel reality and fixes the moments that matter. Not bound to any codebase or tool; applies to any experience being designed, audited, or aligned on."
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["customer journey map","user journey","service blueprint","touchpoint","moments of truth","experience map","front-stage back-stage","emotional curve","opportunity areas","pain points"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["journey map","service blueprint","map the user experience","customer journey","touchpoints"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Build a journey map for first-time tax filers from awareness through filing to refund.","Add a service-blueprint layer below this journey map showing the back-stage support steps.","Identify the emotional low points in this onboarding journey and the opportunities at each.","Map the cross-channel experience of returning an online order to a physical store."]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Break down the steps a user takes inside the upload modal.","Draw the microservice call graph for the checkout API.","Diagram the database schema for the order entity."]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"research-synthesis\",\"information-architecture\",\"design-thinking\",\"problem-framing\",\"task-analysis\",\"event-storming\",\"ideation\",\"user-research\"],\"suppresses\":[\"information-architecture\",\"ideation\"],\"verify_with\":[\"user-research\",\"research-synthesis\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    A journey map is a time-ordered model of one actor's lived experience across touchpoints and channels, layering what they do, think, and feel against the front-stage interactions and the back-stage processes that produce each moment. Experience is treated as one continuous arc, not a set of isolated screens: actions, thoughts, and an emotional curve sit over a stage timeline, and in a service blueprint the model extends downward through the line of visibility into the back-stage work and support processes that cause each moment.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    To surface where an end-to-end experience helps or fails a person — emotional peaks and troughs, drop-off points, and opportunity moments — so a team aligns on the same cross-channel reality and invests in the moments that matter instead of optimizing individual screens in isolation. The journey map is the one artifact that asks what a person actually lives through end to end, including the parts that happen on phone calls, in physical mail, and in the gaps between sessions, which no single screen design, architecture diagram, or backlog captures.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    It models human experience over time and across channels, not system topology. It is NOT single-interface task decomposition (that is task-analysis) and NOT service or architecture diagramming; a journey map's unit is a person's moment — including emotion and context — not a UI step or a service call. A flow stripped of the emotional curve, the cross-channel and time span, and the back-stage layer is a task flow, not a journey map. It also does not produce navigation structures or content taxonomies (information-architecture) and does not generate new concept variants (ideation).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A journey map is like a film's emotional storyboard rather than a wiring diagram: it tracks how the protagonist feels scene by scene across locations and time, so you fix the scenes that lose the audience — not the lighting rig behind them."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    That a journey map is just a flowchart of screens or steps. A flow without the emotional curve, the cross-channel and time span, and the back-stage layer is a task flow — collapsing journey-mapping into that discards exactly the human-experience signal it exists to capture. The related trap is the anodyne happy-path map (every stage a positive verb, a gentle emotional wave) which describes what the team hopes is true rather than what research showed; a credible journey map is grounded in synthesis evidence and has real troughs.
---
# Journey Mapping

## Concept of the skill

Journey mapping is the discipline of modeling a person's end-to-end lived experience across touchpoints, channels, and time, so a team can see — and align on — what the user actually goes through rather than what any single screen, diagram, or backlog reveals. A journey map lays the experience out as a timeline of stages (for example Awareness → Consideration → Purchase → Onboarding → Use → Renew) with vertical lanes for what the user is doing, thinking, and feeling, and which touchpoint they are using; an emotional curve rendered along that timeline exposes the peaks and troughs — the "moments of truth" — that disproportionately shape the overall impression. A service blueprint extends the map downward through the line of visibility into the back-stage employees, systems, and support processes that produce each front-stage moment, which matters whenever the experience depends on handoffs the user never sees. The map's credibility comes entirely from being grounded in research synthesis: each pain point and emotional low cites real evidence, stages are named from the user's perspective rather than the business's, and the artifact identifies specific opportunity areas at named stages instead of a generic "improve onboarding." Done well, journey mapping is the only artifact that treats experience as temporal and cross-channel, letting a team invest in the moments that actually decide success.

## Concept Card

**What it is:** A time-ordered model of one actor's lived experience across touchpoints and channels — laying out what they do, think, and feel, against the front-stage interactions and the back-stage processes that produce each moment.

**Mental model:** Experience is one continuous arc, not a set of isolated screens. A journey map layers actions, thoughts, and an emotional curve over a stage timeline, then (in a service blueprint) extends downward through the line of visibility into the back-stage work and support processes that cause each moment.

**Why it exists:** To surface where an end-to-end experience helps or fails a person — emotional peaks and troughs, drop-off points, opportunity moments — so a team aligns on the same cross-channel reality and invests in the moments that matter, rather than optimizing individual screens in isolation.

**What it is NOT:** Not single-interface task decomposition (that is `task-analysis`), and not service/architecture diagramming. Its unit is a person's *moment* — including emotion and context — not a UI step or a service call. A flow stripped of the emotional curve, the cross-channel/time span, and the back-stage layer is a task flow, not a journey map.

**One-line analogy:** Like a film's emotional storyboard rather than a wiring diagram — track how the protagonist feels scene by scene across locations and time, and fix the scenes that lose the audience, not the lighting rig behind them.

## Coverage
Journey mapping covers the family of visualizations that lay out a user's experience as a timeline across stages, actions, thoughts, feelings, and touchpoints. The classic **customer journey map** (Jeff Patton's writing on story mapping is an adjacent influence; NN/g has codified the canonical structure) typically has a horizontal axis of stages (e.g., Awareness → Consideration → Purchase → Onboarding → Use → Renew/Churn) and vertical lanes for what the user is doing, thinking, feeling, and which touchpoint they are interacting with. An **emotional curve** rendered along the timeline highlights peaks and troughs — the "moments of truth" that disproportionately shape the overall impression.

A **service blueprint** (Lynn Shostack, 1984) extends the journey map downward with **front-stage** elements (what the user sees), the **line of visibility**, and **back-stage** elements (what employees, systems, and processes do that the user does not see). Below those, **support processes** show the infrastructure that enables back-stage work. Service blueprints are appropriate when the experience involves human or system handoffs that the user never sees but that determine whether the experience succeeds.

The skill also covers **current-state vs future-state** maps (current documents reality and surfaces pain points; future proposes a redesigned experience and is used to align stakeholders), and the choice of **scope** — a single transaction, an entire lifecycle, or a specific moment-of-truth blown up in detail. Granularity matches the decision the map will inform; a board-level alignment map is coarser than a redesign brief.

## Philosophy of the skill
Journey maps exist because experience is temporal and cross-channel, and most artifacts a team produces are neither. A screen design captures one moment; an architecture diagram captures one cross-section; a backlog captures one project. The journey map is the only artifact that asks "what does the user actually live through, end to end, including the parts that happen on phone calls, in physical mail, in the gap between sessions, and in the moments when they think about us and then put it down?"

The practice resists two failure modes. The first is the **anodyne happy-path map**, where every stage is labeled with a positive verb and the emotional curve is a gentle wave — these maps describe what the team hopes is true rather than what research showed. The second is the **everything-everywhere map**, where ambition outruns research and the map sprouts lanes for every possible channel without evidence. A journey map's credibility comes from being grounded in synthesis output; without that grounding it is decoration.

## Verification
- The map is grounded in specific research evidence — each pain point and emotional trough cites at least one source (interview quote, observation, support log) rather than being asserted.
- Stages on the horizontal axis are named from the user's perspective ("trying to understand what I owe") rather than the business's ("acquisition funnel stage 2").
- The emotional curve has actual lows, not only highs and neutrals — a curve with no dips usually means the map omits the hard parts.
- For service blueprints, the line of visibility is drawn explicitly and the back-stage steps include both human and system actors.
- The map identifies named **opportunity areas** at specific stages, not a generic "improve onboarding" annotation.
- A stakeholder who did not attend the mapping session can read the map and explain back the journey's overall arc, including where it goes wrong.

## Do NOT Use When
- The scope is a single screen or single task within one session — use **task-analysis** for goal-directed step decomposition.
- The team has not yet done qualitative research on the journey — run **user-research** and **research-synthesis** first; an unresearched journey map is fiction.
- The diagram needed is a system architecture, microservice topology, or data flow — those are engineering artifacts, not journey maps.
- The output should be a navigation structure or content taxonomy — use **information-architecture**.
- The task is modeling engineering domain events or ownership boundaries — use **event-storming** or **conceptual-modeling**.
- The team is in solutioning mode and needs to generate concept variants — use **ideation**; journey mapping clarifies experience, it does not invent new ones.
