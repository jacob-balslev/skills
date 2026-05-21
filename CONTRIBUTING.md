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

## Privacy Gate — Installing the Pre-Push Hook

This repo enforces a **defense-in-depth privacy gate** (ADR 0012) to prevent internal content from reaching the public distribution surface. The gate is implemented at three independent layers:

| Layer | Gate | Where |
|---|---|---|
| L2 | Export pipeline scope gate | `skill-graph` — run at export time |
| L3 | **Pre-push hook** (this section) | `skills/.git/hooks/pre-push` |
| L4 | CI workflow | `.github/workflows/` (SH-6325) |

### Install the hook (one-time, after cloning)

```bash
# From the skills repo root:
node hooks/install.js
```

This copies `hooks/pre-push` → `.git/hooks/pre-push`. The hook is a Node.js script; no other dependencies are required beyond Node >= 16.

### What the hook checks

The hook scans every `SKILL.md` file in the push for patterns defined in
[`skill-graph/scripts/lib/privacy-patterns.js`](https://github.com/jacob-balslev/skill-graph/blob/main/scripts/lib/privacy-patterns.js), including:

- Local filesystem paths (`/Users/…`, `/home/…`, `C:\Users\…`)
- Email addresses
- Private key blocks and known token prefixes
- Internal codebase paths (`sales-hub`, `apps/web/src`)
- Internal database surface names
- Known private project names

**HARD RULE:** No Sales Hub / Sales Channels / Printify / Shopify / customer / personal API / bank / credential / PII data may enter this repo — ever. See [`skill-graph/docs/adr/0012-internal-skill-library-separation.md`](https://github.com/jacob-balslev/skill-graph/blob/main/docs/adr/0012-internal-skill-library-separation.md).

### Workspace layout requirement

The hook imports the shared privacy-patterns module from its sibling repo:

```
~/Development/skill-graph/   ← privacy-patterns module lives here
~/Development/skills/        ← this repo
```

If `skill-graph` is cloned elsewhere, set `SKILL_GRAPH_PATH=/path/to/skill-graph` before pushing:

```bash
SKILL_GRAPH_PATH=/path/to/skill-graph git push origin main
```

### Bypassing the hook (never do this)

The hook can be bypassed with `git push --no-verify`, but doing so defeats the L3 gate. The CI gate (L4) will still catch violations at PR review time. Do not push internal content and do not bypass hooks.

---

## License of contributions

By submitting a contribution to this repo, you agree to license it under the project's existing terms: **[CC-BY-4.0](LICENSE)** for skill content. When redistributing or building derivative works, attribute as:

> _"Skills from Skill Graph (https://github.com/jacob-balslev/skill-graph), licensed CC-BY-4.0."_

## Code of Conduct

This project follows the [Contributor Covenant 2.1](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

## Reporting security issues

Do **not** open public issues for security reports. See [SECURITY.md](SECURITY.md) for the private disclosure process.
