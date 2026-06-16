# Upstream Displacement Check: Naming Conventions

Date: 2026-06-02

## Result

No displacement found.

The skill teaches naming judgment: artifact-kind casing, identifier morphology, truthful names, rename coordination, and boundaries against refactoring, whole-diff review, debugging, and prose documentation. Current first-party coding agents can perform code edits and refactors, but the checked official sources do not provide a native replacement for repo-specific naming judgment or the skill's teaching contract.

## Sources Checked

- OpenAI Code Generation docs: https://developers.openai.com/api/docs/guides/code-generation
  - Evidence: Codex is described as a coding agent for writing, reviewing, and debugging code.
  - Assessment: This is a general coding capability, not a named native convention engine that supersedes the skill.
- OpenAI Apply Patch docs: https://developers.openai.com/api/docs/guides/tools-apply-patch
  - Evidence: Apply Patch supports structured code diffs, including renames and refactors.
  - Assessment: This is an edit mechanism. It can carry out a rename, but it does not replace the semantic naming guidance that decides whether a name is truthful.
- Anthropic Claude Code common workflows: https://code.claude.com/docs/es/common-workflows
  - Evidence: Claude Code documents workflows for exploring, fixing, refactoring, testing, documentation, and related coding tasks.
  - Assessment: These workflows help execute coding work, but do not supersede a project-level naming-convention skill.
- Anthropic Claude Code release notes entry point: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
  - Evidence: Official docs point to the public changelog for current Claude Code release details.
  - Assessment: Search/open checks did not surface a first-party naming-convention feature that fully replaces this skill.

## Recommendation

Keep the skill. Reframe nothing for displacement today. Continue to treat native coding agents and patch tools as execution surfaces for rename coordination, not substitutes for the naming-decision model.
