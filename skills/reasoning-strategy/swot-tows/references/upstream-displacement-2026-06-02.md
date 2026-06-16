# Upstream Displacement Check - SWOT/TOWS

Checked 2026-06-08.

## Sources Reviewed

- OpenAI Help Center, "ChatGPT - Release Notes", reviewed 2026-06-08.
  - URL: `https://help.openai.com/en/articles/6825453-chatgpt-release-notes`
- OpenAI, "The next evolution of the Agents SDK", published April 15, 2026.
  - URL: `https://openai.com/index/the-next-evolution-of-the-agents-sdk/`
- Anthropic, "Claude Platform - Release notes", reviewed 2026-06-08.
  - URL: `https://platform.claude.com/docs/en/release-notes/overview`
- OpenCode official changelog, reviewed 2026-06-08.
  - URL: `https://opencode.ai/changelog`
- CiNii/Crossref record for Weihrich's 1982 TOWS article, reviewed 2026-06-08.
  - URL: `https://cir.nii.ac.jp/crid/1361137044448123776`
- Australian Government business.gov.au, "Do a SWOT analysis", reviewed 2026-06-08.
  - URL: `https://business.gov.au/planning/business-plans/do-a-swot-analysis`
- Harvard Business Review, "From SWOT to TOWS: Answering a Reader's Strategy Question", reviewed 2026-06-08.
  - URL: `https://hbr.org/2007/03/from-swot-to-tows-answering-a-readers-strategy-question`

## Finding

No upstream displacement found.

Recent OpenAI, Anthropic, Claude, and OpenCode releases improve agent runtime infrastructure: memory, sandbox-aware orchestration, filesystem tools, managed agents, provider behavior, workflow support, desktop/TUI behavior, and API/SDK surfaces. None replaces the SWOT/TOWS method itself: separating internal strengths/weaknesses from external opportunities/threats, then crossing factors into SO/WO/ST/WT strategic options.

Better models may apply SWOT/TOWS more fluently, but the method still needs explicit teaching because the common failure mode is structural: producing a four-quadrant list without evidence or without TOWS option generation.

## Recommendation

Create and keep the skill. Treat current agent platforms as improved execution environments for SWOT/TOWS analysis, not as substitutes for teaching the framework in a portable agent skill.
