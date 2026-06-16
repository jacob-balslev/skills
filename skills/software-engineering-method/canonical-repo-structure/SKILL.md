---
# name: stable kebab-case skill identifier; must match the parent directory.
name: canonical-repo-structure
# description: routing contract for when this skill should activate and when it should not.
description: "Use when organizing or cleaning a project/repository so every script, command, prompt, doc, generated artifact, compatibility shim, and legacy path has one canonical home under version control. Covers owner selection, repo-boundary verification, generated-vs-authored separation, duplicate implementation cleanup, compatibility-shim registration, delete-to-git-history discipline, timestamped changelog explanations, and path-limited commits in the owning repo. Do NOT use for ordinary branching/rebase/tag strategy alone (use `version-control`), behavior-preserving code restructuring alone (use `refactor`), documentation-sync routing alone (use `doc-updater`), or controlled category taxonomy design alone (use `taxonomy-design`)."
# license: SPDX-compatible license identifier for the skill content.
license: MIT
# compatibility: runtime compatibility notes for consumers.
compatibility:
  notes: "Project-structure governance for multi-repo workspaces with git history, generated artifacts, and runtime compatibility paths."
# allowed-tools: optional runtime hint for tools the skill may use when loaded.
allowed-tools: Read Grep Bash Edit
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:
  # subject: primary browse shelf - the competency the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering /
  # agent-ops / ai-engineering / quality-assurance / design / reasoning-strategy /
  # software-engineering-method / knowledge-organization / product-domain.
  subject: software-engineering-method
  # subjects: optional polyhierarchy. Max 2 entries; primary subject first.
  subjects: "[\"software-engineering-method\",\"knowledge-organization\"]"
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  # Project anchoring lives in project[] and requires grounding when present.
  # project: projects this skill is linked to. Array of {handle, role} objects.
  project: "[{\"handle\":\"development\",\"role\":\"source-of-truth\"},{\"handle\":\"skill-graph\",\"role\":\"source-of-truth\"},{\"handle\":\"skills\",\"role\":\"canonical-skill-library\"}]"
  # scope: required PRD-style free-text statement of what the skill teaches and what it does not.
  scope: "Organizing a project or repository into one canonical, version-controlled structure: choose the owning repo and path, separate authored source from generated output, register only necessary compatibility shims, delete confirmed-dead legacy code to git history with a timestamped changelog explanation, update live references, and commit path-limited in the owning repo. Project-targeted to the Development workspace and Skill Graph doctrine, but written as a reusable method for controlled repos. Excludes ordinary git branching/rebase/tag strategy, behavior-preserving code refactors without ownership changes, documentation-sync routing alone, and controlled taxonomy design alone."
  # public: publishability / private-data gate. true = safe for public release; false = private/internal.
  public: false
  # taxonomy_domain: optional hierarchical sub-path within `subject`.
  # Slash-delimited lowercase kebab-case segments.
  taxonomy_domain: engineering/repository-governance
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  keywords: ["canonical repo structure","project structure","repository organization","canonical owner","implementation ownership","compatibility shim","delete dont archive","legacy cleanup","generated artifact","path-limited commit"]
  # examples: realistic user prompts the skill SHOULD activate for.
  examples: ["organize this repo so every script and command has one canonical home","we have a duplicate command in .claude, .opencode, and skill-graph - which one stays?","clean up legacy scripts without leaving an _archive folder","move this implementation to the owning repo and leave only the runtime shim","before deleting this old migration script, what evidence do I need?","make this project structure canonical and version-controlled","this generated output is being hand-edited - fix the repo structure","where should this new cross-repo helper live so it does not become bloat?"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  anti_examples: ["should I rebase or merge this feature branch?","split this 600-line module into smaller functions without changing behavior","update the docs for this API change in the same commit","design a category tree for these skills","write a Conventional Commits message for this patch","audit this PR for security and correctness"]
  # paths: file surfaces where this skill should be considered.
  paths: "[\"AGENTS.md\",\"CLAUDE.md\",\"CONTEXT.md\",\"docs/reference/implementation-ownership.md\",\"docs/reference/implementation-ownership.json\",\"docs/reference/artifact-lifecycle-contract.md\",\"docs/reference/runtime-compatibility-boundary.md\",\".claude/rules/delete-dont-archive.md\",\"skill-graph/AGENTS.md\",\"skill-graph/SKILL_GRAPH.md\",\"skill-graph/CHANGELOG.md\",\"skill-graph/docs/adr/*.md\",\"skill-graph/scripts/**\",\"skill-graph/lib/**\",\"skill-graph/bin/**\",\"skill-graph/prompts/**\",\"skills/skills/**/SKILL.md\",\"skills/skills/**/audit-state.json\"]"
  # relations: typed graph edges to sibling skills.
  # related (adjacency) / boundary (exclude target when THIS skill wins) /
  # verify_with (cross-check) / depends_on / broader / narrower / disjoint_with.
  # grounding: required for project-targeted skills. Declares truth sources and failure modes.
  grounding: "{\"subject_matter\":\"Canonical project and repository organization in the Development workspace and Skill Graph project\",\"grounding_mode\":\"repo_specific\",\"truth_sources\":[\"AGENTS.md\",\"CLAUDE.md\",\"CONTEXT.md\",\"docs/reference/implementation-ownership.md\",\"docs/reference/artifact-lifecycle-contract.md\",\"docs/reference/documentation-standards.md\",\".claude/rules/delete-dont-archive.md\",\".claude/rules/version-schema-contract.md\",\"skill-graph/AGENTS.md\",\"skill-graph/SKILL_GRAPH.md\",\"skill-graph/CONTRIBUTING.md\",\"skill-graph/docs/quality-doctrine.md\"],\"failure_modes\":[\"duplicate_implementation_preserved\",\"generated_output_hand_edited\",\"legacy_path_left_unregistered\",\"dead_code_archived_in_tree\",\"deletion_without_recovery_path\",\"stale_live_reference_after_move\",\"wrong_repo_commit\",\"version_label_bumped_without_content\",\"compatibility_shim_contains_logic\",\"timestamp_without_time_of_day\"],\"evidence_priority\":\"repo_code_first\"}"
  # mental_model: primitives of the concept and how they relate.
  mental_model: "A repository is a map of ownership. Each artifact has one canonical source, zero or more generated projections, and at most one compatibility path per runtime that truly needs the old entrypoint. Git history is the archive for confirmed-dead code; live docs and registries are the map that tells future agents where the current artifact lives."
  # purpose: problem this concept solves.
  purpose: "Prevents repository bloat from accumulating as duplicate scripts, stale command bodies, archived folders, generated files treated as source, and undocumented legacy paths. The skill turns cleanup into an evidence-backed workflow: find the owner, verify live references, choose source vs generated vs shim vs delete, record why, and commit only the owned paths."
  # boundary: what this concept is NOT.
  concept_boundary: "This skill is not ordinary git workflow design, code refactoring, documentation-writing technique, taxonomy design, or full PR review. It decides where artifacts belong, whether a legacy path is still live, whether a compatibility shim is justified, and how confirmed-dead version-controlled code leaves the tree without becoming an archive folder."
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A canonical repository structure is like a city records office: every property has one deed, maps can point to it, and old addresses are kept in the historical register instead of painted on abandoned buildings."
  # misconception: wrong mental model corrected explicitly.
  misconception: "The common mistake is treating cleanup as moving old files into an archive directory. That preserves the cost while hiding the decision; confirmed-dead code belongs in git history with the reason and recovery command recorded, while live compatibility paths must be registered shims with no duplicated logic."
# relations: typed graph edges to sibling skills.
relations:
  related: ["taxonomy-design","skill-infrastructure","semantics","information-architecture","version-control","doc-updater","refactor","naming-conventions","methodical","no-cutting-corners"]
  suppresses: ["refactor","version-control"]
  verify_with: ["doc-updater","naming-conventions","methodical","no-cutting-corners","version-control"]
---
# Canonical Repo Structure

## Concept of the skill

A repository is a map of ownership. Each artifact has one canonical source, zero or more generated projections, and at most one compatibility path per runtime that truly needs the old entrypoint.

## Coverage

- Choosing the owning repo and canonical path before creating, moving, or deleting scripts, commands, prompts, docs, generated artifacts, skills, and compatibility entrypoints
- Separating authored source from generated projections so agents edit the real source and regenerate the output
- Preventing duplicate implementations: update the owner, convert one necessary compatibility path into a thin registered shim, or remove the extra path
- Deciding whether a legacy artifact is live, deprecated, confirmed dead, generated, historical, or a runtime-required compatibility entrypoint
- Deleting confirmed-dead code to git history instead of preserving `_archive/`, `.legacy`, commented-out blocks, or "kept just in case" copies
- Recording deprecation/removal reasons in the owning changelog with a date plus time-of-day when the owning repo requires timestamped prose
- Updating live references after moves/deletions while leaving frozen historical records accurate
- Committing path-limited in the repo that owns the changed files

## Philosophy of the skill
A repo is not just storage. It is an operating map for future agents. When one command body lives in three places, no reader knows which behavior is real. When generated output is hand-edited, the next generation run destroys the change. When dead code is moved into `_archive/`, every grep, router, audit, and cold-start reader has to rediscover that the file is dead.

Canonical organization is therefore a reliability feature. The correct tree is not the smallest tree; it is the tree where source, generated output, compatibility paths, and historical records are visibly different. Preserve live capability, preserve historical recovery in git, and remove dead weight from the live working tree.

## Workflow

1. **Identify the artifact and owning repo.** Run `git rev-parse --show-toplevel` from the path you will touch. For nested repos, commit in the nearest owning repo, not in the parent that happens to list or ignore the path.
2. **Find existing owners before adding a new path.** Search names, commands, imports, package scripts, docs, and registries. If an owner exists, update that owner instead of copying it.
3. **Classify the path.**
   - Authored source: human-edited truth. Keep one canonical file.
   - Generated projection: regenerated from source. Do not hand-edit; update the generator or source.
   - Compatibility path: runtime-required entrypoint that delegates to canonical source. Register it and keep it thin.
   - Frozen historical record: changelog, ADR, report, or archived analysis that describes past state. Do not rewrite it to pretend history changed.
   - Confirmed-dead artifact: no live consumer and no current contract. Remove it from the tree.
4. **Choose the canonical home from the owner map.** Use the project `AGENTS.md`, implementation-ownership registry, document-routing table, package entrypoints, and runtime constraints. If a runtime can only read a specific path, leave a minimal shim there and put the logic in the canonical project-owned path.
5. **Verify before deprecating or deleting.** Grep live code, docs, scripts, package files, command manifests, and routing registries. Exclude frozen historical records from the live-dependency decision. A historical mention proves the artifact existed; it does not prove the artifact is still live.
6. **Remove confirmed-dead implementation code to git history.** Use `git rm` for tracked files. Do not move dead code to an archive folder or leave commented-out code. Record what was removed, why it was dead, the replacement or shim target if one exists, and a recovery command such as `git log --all --oneline -- <path>` followed by `git checkout <sha>^ -- <path>`.
7. **Update live references in the same change.** Grep `*.md`, `*.sh`, `*.json`, package scripts, command manifests, and owning docs for the old path/name. Fix live references; leave changelog/ADR/report mentions alone unless they are themselves wrong.
8. **Commit only the owned paths.** Use path-limited commits in the repo that owns the files. If multiple repos changed, create separate commits per repo.

## Placement Rules

| Artifact kind | Canonical home | Compatibility rule |
|---|---|---|
| Project-specific system code | Owning project repo, usually under `lib/`, `scripts/`, `bin/`, or the project-specific command/prompt directory | Leave a shim only when a runtime mechanically resolves from a fixed path |
| Individual skill content | `skills/skills/<subject>/<skill-name>/SKILL.md` plus sibling artifacts | Do not author skill content in generated marketplace exports |
| Skill Graph schema, audit, prompt, and tooling system code | `skill-graph/` paths owned by the Skill Graph project | Runtime command files outside `skill-graph/` carry only pointer/delegation text when required |
| Generated manifests, indexes, exports, and status files | Generated by their named script | Regenerate from source; do not patch by hand unless the generator is the thing being fixed |
| Documentation truth | The owning doc named by the routing table | Indexes and pointer files link to the owner; they do not duplicate the body |
| Removed or superseded code | Git history, changelog explanation, and optional removed-path registry | No `_archive/`, `.legacy`, or commented-out implementation body in the live tree |

## Keep, Shim, Or Remove

| Evidence | Action |
|---|---|
| Live imports, package scripts, runtime command resolution, tests, or documented user entrypoint still call the path | Keep it or convert it into a thin shim after moving logic |
| Path exists only for a runtime that cannot resolve the canonical location | Keep a registered shim with no business logic and a documented removal condition |
| Path is generated from a source file | Delete manual edits, fix source/generator, and regenerate |
| Only frozen historical records mention it | Remove the live artifact and leave the historical records unchanged |
| No live references, job complete, superseded owner wired, or one-shot migration finished | `git rm`, update changelog/registry as required, and record recovery command |
| You cannot prove whether it is live | Keep it for now and flag the uncertainty; do not guess-delete |

## Deprecation And Removal Discipline

- Deprecation is caused by a replacement, direction change, or completed migration. It is not caused by age alone.
- The live tree carries current source, current shims, current generated outputs, and current docs. Prior implementations live in git history.
- A deprecated compatibility path that stays callable must be registered with its canonical target, status, removal condition, and required delegation/import target.
- A removed implementation path should be listed in the owning removed-path registry when such a registry exists, so it is not silently resurrected.
- Changelog entries for deprecation/removal name the artifact, why it changed, the replacement or shim target, and how to recover it from git.
- When the owning project requires timestamped prose, use date plus time-of-day, for example `2026-06-07T14:32+02:00`, not just `2026-06-07`.

## Verification

- [ ] The nearest git repo owner was verified for every changed path
- [ ] Existing owners and duplicate paths were searched before adding a new artifact
- [ ] Authored source and generated projections are visibly separated
- [ ] Any compatibility path is registered, minimal, and delegates to the canonical path
- [ ] Confirmed-dead code was removed from the live tree rather than archived in-place
- [ ] Live references to moved/deleted paths were updated; frozen historical references were left intact unless wrong
- [ ] The owning changelog or lifecycle registry records deprecation/removal reason and recovery path when required
- [ ] Path-limited commits were used in the owning repo, with separate commits for separate repos

## Do NOT Use When

| Use instead | When |
|---|---|
| `version-control` | The task is choosing branch strategy, rebase vs merge, release tags, commit boundaries, or worktree lifecycle without changing canonical artifact ownership. |
| `refactor` | The task is behavior-preserving code restructuring inside an already canonical implementation path. |
| `doc-updater` | The task is only routing a code change to its owning docs and verifying docs changed in the same commit. |
| `taxonomy-design` | The task is only designing categories, facets, controlled vocabularies, or classification assignment rules. |
| `code-review` | The task is reviewing a PR/diff holistically for bugs, security, performance, and tests. |

## Key Sources

- `AGENTS.md` - repo ownership, document routing, and implementation ownership rules
- `docs/reference/implementation-ownership.md` - canonical implementation registry and compatibility-shim contract
- `docs/reference/artifact-lifecycle-contract.md` - lifecycle metadata and changelog discipline for non-skill artifacts
- `.claude/rules/delete-dont-archive.md` - confirmed-dead code is deleted to git history, not archived in the tree
- `skill-graph/AGENTS.md` - Skill Graph canonical-location rule, delete-to-git-history directive, and timestamped changelog requirement
- `skill-graph/SKILL_GRAPH.md` - Skill Graph source vs generated marketplace distinction
- `docs/reference/documentation-standards.md` - one canonical source per fact and generated/reference verification gates
