---
name: user-research
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when planning or conducting generative qualitative research with real users — interviews, contextual inquiry, ethnographic observation, diary studies — to learn what people do, think, and need in their own context. Do NOT use for analytics review, survey statistics, A/B test interpretation, or agent-side intent classification — those are different research practices entirely."
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
  scope: "Planning and conducting generative qualitative research with real users — semi-structured interviews, contextual inquiry, ethnographic observation, diary studies, and intercept studies — to discover what people do, think, feel, and need in their own context before a solution exists. Portable across any product-discovery effort; principle-grounded, not repo-bound. Excludes analytics review, survey statistics, A/B test interpretation, usability evaluation of an existing artifact, and agent-side intent classification (those are different research practices)."
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["user interviews","contextual inquiry","ethnographic observation","diary study","generative research","qualitative research","interview guide","leading questions","master-apprentice model","in-context observation"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["interview users","user research plan","what to ask users","contextual inquiry","diary study"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Draft an interview guide for SMB founders adopting their first accounting software.","How do I observe ICU nurses on shift without disturbing the workflow?","Review my interview script for leading questions and solution-prompts.","Plan a two-week diary study for commuters using public transit apps."]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Analyze last quarter's NPS results and produce a dashboard.","Classify whether this agent request from the user is high-risk before executing.","Set up an A/B test of two onboarding flows."]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"problem-framing\",\"research-synthesis\",\"usability-testing\",\"design-thinking\",\"intent-recognition\"],\"suppresses\":[{\"skill\":\"usability-testing\",\"reason\":\"usability-testing is evaluative — it watches users attempt tasks on an artifact to find usability defects. user-research is generative — it studies users before any artifact exists, to discover needs and context.\"}],\"verify_with\":[\"research-synthesis\",\"problem-framing\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    User research is the disciplined opposite of normal conversation. The instincts that make humans good company — finishing sentences, offering sympathy, confirming what the other person seems to want — destroy data quality. The practice has three method families that trade off depth, naturalism, scale, and cost: generative interviews (semi-structured, episodic, silence-as-tool), contextual methods (contextual inquiry's master-apprentice stance, fly-on-the-wall observation, shadowing), and longitudinal methods (diary studies, experience sampling) for behavior that does not surface in one session. The binding epistemological claim underneath all of them: people are unreliable narrators of their own behavior — especially about the hypothetical and future-tense — but reasonably reliable when describing concrete recent episodes, which is why methods skew toward "tell me about the last time" over "would you ever," and why observation outranks interview whenever the project can afford it.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Without a research practice, teams build for an imagined user assembled from their own assumptions, anecdotes, and the loudest stakeholder in the room — and discover the gap only after shipping. Generative qualitative research exists to learn what real people actually do, think, and need in their own context, before a solution exists, so the problem being solved is real rather than invented. It surfaces needs, mental models, workarounds, and context that no analytics dashboard or survey reveals, and it is the only research family that can produce a finding which contradicts what the team believed going in.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT quantitative measurement (how many, what percentage, significance) — that is survey or analytics work. It is NOT usability-testing (watching users attempt tasks on an existing artifact to find defects) — that is evaluative, after an artifact exists; user research is generative, before one does. It is NOT research-synthesis (making sense of data already collected). It is NOT problem-framing (agreeing what problem to study — that comes first). It is NOT experimental evaluation against a hypothesis with a control group (A/B, RCT). And it does NOT transfer to non-human "users" — interview methods assume a human participant.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A user researcher is a field naturalist, not an interrogator — they study the animal in its habitat and record what it actually does, rather than capturing it, asking it to predict its own behavior, and writing down the confident answer it gives to please them."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "research means asking users what they want and building it." That fails on two counts: people cannot reliably predict their own future behavior or preferences, and a leading question ("don't you find X frustrating?") manufactures the answer the interviewer expects. The corrected model: ask about concrete recent episodes, not hypotheticals; leave silence intact instead of filling it; treat surprise as the signal that new information is arriving; and observe behavior wherever possible, because what people do and what they say they do routinely differ. If every finding confirms what the team already believed, the questions were leading and the research produced nothing.
---
# User Research

## Concept of the skill

User research, in its generative qualitative form, is the practice of learning what real people do, think, feel, and need in their own context — typically *before* a solution exists — so that a team builds for an actual user rather than an imagined one. It spans three method families that make different trade-offs between depth, naturalism, scale, and scheduling cost: **generative interviews** (semi-structured, episodic, using silence as a tool), **contextual methods** (contextual inquiry with its master-apprentice stance, fly-on-the-wall observation, shadowing — which extend interviews into the user's real environment), and **longitudinal methods** (diary studies and experience sampling — which capture behavior that never surfaces in a single session). What unifies them is a specific epistemological discipline: humans are unreliable narrators of their own behavior, especially when asked hypothetical or future-tense questions, but reasonably reliable when describing concrete recent episodes. The craft is therefore the deliberate opposite of good conversation — leave silence intact, ask people to "say more about that" instead of paraphrasing, ask "tell me about the last time" instead of "would you," and treat a surprising answer as the proof that the conversation is producing new information rather than confirming a prior belief.

## Coverage
User research covers the generative qualitative methods that surface what people do, think, feel, and need — typically before a solution exists. The core methods are **semi-structured interviews** (Steve Portigal, Tomer Sharon), **contextual inquiry** with its master-apprentice stance (Beyer & Holtzblatt), **ethnographic observation** in the user's actual environment, **diary studies** for behaviors that unfold over days or weeks, and **intercept studies** for in-the-moment reactions. Each method trades off depth, naturalism, scale, and scheduling cost differently; choosing well depends on what kind of evidence the project needs.

The skill includes the craft of **interview construction**: opening with broad context questions, moving to specific recent episodes ("tell me about the last time you…"), avoiding hypotheticals ("would you use…") and leading prompts ("don't you find it frustrating that…"), and using silence as a tool. The **critical incident technique** (Flanagan) and **5 Whys** laddering are used in-session to push past surface answers. The practice also includes what NOT to do: solution-prompting, confirmation seeking, anchoring on the interviewer's own hypothesis, interrupting, and steering toward a preferred narrative.

Contextual methods extend interviews into the user's environment. **Contextual inquiry** treats the user as the master craftsperson and the researcher as an apprentice asking clarifying questions while the user works. **Fly-on-the-wall observation** removes the researcher's questions entirely. **Shadowing** follows a single user through their day. Each makes different trade-offs between naturalism (less intrusion → more authentic behavior) and depth (more questions → richer interpretation).

Diary and longitudinal methods cover behaviors that do not surface in a single session. Daily prompts, photo diaries, and experience sampling (Csíkszentmihályi) capture in-context moments and reduce recall bias.

## Philosophy of the skill
User research is harder than it looks because the natural conversational instincts that make humans good company — finishing each other's sentences, offering sympathy, confirming what the other person seems to want to hear — actively destroy data quality. The discipline trains interviewers to do the opposite: leave silence intact, ask the participant to "say more about that" instead of paraphrasing, and treat surprise as the signal that the conversation is producing new information.

The practice is grounded in a specific epistemological claim: people are unreliable narrators of their own behavior, especially when asked hypothetical or future-tense questions, but they are reasonably reliable when describing concrete recent episodes. This is why methods skew toward "tell me about the last time" over "would you ever" — episodic memory is more trustworthy than self-prediction. It is also why observation outranks interview when the project can afford it: what people do and what people say they do are routinely different.

## Verification
- The interview guide contains no leading, hypothetical, or solution-prompting questions; every question can be answered by describing a real past event.
- Sessions are recorded (with consent) so synthesis works from primary data, not interviewer memory.
- At least one finding from the research contradicts a hypothesis the team held going in — if every finding confirms prior beliefs, the questions were probably leading.
- For contextual studies, observation happened in the user's real environment, not a lab simulation of it.
- Sample composition is documented and matches the recruitment criteria — including who was excluded and why.
- The researcher can name what they don't yet know after the session, not just what they confirmed.

## Do NOT Use When
- The question is quantitative (how many, what percentage, statistical significance) — use survey or analytics methods, not generative interviews.
- A working artifact already exists and the question is "does this artifact work for users" — use **usability-testing**.
- The team needs to make sense of research that has already been collected — use **research-synthesis**.
- The "user" is an agent or system, not a human — interview methods do not transfer to non-humans.
- The team has not yet agreed on what problem they are studying — return to **problem-framing** first, then design research to investigate the framed problem.
- The need is to evaluate a feature against a hypothesis with a control group — use experimental methods (A/B, RCT), not interviews.
