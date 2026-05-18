# Contributing to `skills`

Thanks for your interest in contributing! This repo is the **public distribution surface** for the Skill Graph library. By convention, skills are not authored here directly — they are authored in [`skill-graph`](https://github.com/jacob-balslev/skill-graph) and exported here via the marketplace pipeline.

## Where to contribute

| What you want to do | Where to go |
|---|---|
| **Propose a new skill** | Open a [feature request in `skill-graph`](https://github.com/jacob-balslev/skill-graph/issues/new?template=feature.yml) |
| **Fix the content of an existing skill** | Open an issue/PR in [`skill-graph`](https://github.com/jacob-balslev/skill-graph) — the fix is exported here in the next sync |
| **Report a broken link or stale reference in a skill** | File a [bug in this repo](.github/ISSUE_TEMPLATE/bug.yml) — library-level issues are tracked here |
| **Report a manifest/structure problem** | File a [bug in this repo](.github/ISSUE_TEMPLATE/bug.yml) |
| **Suggest a curation policy change** | Open an issue in [`skill-graph`](https://github.com/jacob-balslev/skill-graph) referencing ADR 0008 |

## Why not edit skills here directly?

Skills are authored as **protocol-enriched** records in `skill-graph` and exported to this repo as **plain `SKILL.md`** files. The export pipeline applies provenance, description-limit, privacy, and link gates. Direct edits in this repo bypass those gates and may be overwritten by the next export.

If you have a one-off content fix that's blocked by the authoring repo (e.g. typo, broken link, stale reference), opening a small PR here is fine — but the long-term fix should land upstream.

## License of contributions

By submitting a contribution to this repo, you agree to license it under the project's existing terms: **[CC-BY-4.0](LICENSE)** for skill content. When redistributing or building derivative works, attribute as:

> _"Skills from Skill Graph (https://github.com/jacob-balslev/skill-graph), licensed CC-BY-4.0."_

## Code of Conduct

This project follows the [Contributor Covenant 2.1](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

## Reporting security issues

Do **not** open public issues for security reports. See [SECURITY.md](SECURITY.md) for the private disclosure process.
