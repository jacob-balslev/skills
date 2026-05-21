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

## Public-Safe vs Internal-Only Skill Boundary

Not every skill may be published here. This section defines when a skill is eligible for the public library and when it must stay internal — and what signals the gate layers use to enforce that boundary.

### When a skill may be published (public-safe)

A skill is public-safe when all of the following are true:

| Criterion | What it means |
|---|---|
| `scope: portable` or `scope: reference` | The skill teaches a universal capability or a publicly-documented vendor/spec — not a pattern specific to one private codebase. |
| No codebase grounding | The skill's `grounding.truth_sources` do not point at private repositories (`sales-hub/`, `apps/web/src`, or similar). |
| No internal nouns in the body | The skill body does not name private services, internal DB tables, internal project names, or internal file paths — even in examples. |
| No personal or customer data | No email addresses, customer identifiers, payment details, or any other PII appear anywhere in the skill. |
| No secrets | No private keys, API token prefixes, or credential-like strings appear anywhere in the skill. |

### When a skill must stay internal-only

A skill must **not** be published here if it has any of the following:

| Signal | Why it must stay internal |
|---|---|
| `scope: codebase` | The skill is grounded in a specific private codebase; its guidance only makes sense in that context. |
| `scope: operational` | The skill encodes operational knowledge specific to a private deployment or internal agent workflow. |
| `grounding_mode: repo_specific` or `repo_internal` | The skill's truth-source files live in a private repo — publishing it would expose internal architecture. |
| Grounding paths pointing at `sales-hub/` or `apps/web/src` | These are the primary private codebase paths. A skill that names them in truth-source tables leaks internal architecture even if the body looks portable. |
| References to internal DB surface names | Table names such as `stripe_events_raw`, `shopify_orders_raw`, `printify_order_items`, or `fx_rates_daily` are private storage surfaces, never portable knowledge. |

### Privacy signals enforced by the gate

The three enforcement layers (L2 export gate, L3 pre-push hook, L4 CI scan) share a single pattern set defined in [`skill-graph/scripts/lib/privacy-patterns.js`](https://github.com/jacob-balslev/skill-graph/blob/main/scripts/lib/privacy-patterns.js). The table below lists every pattern by its machine-readable `id` and human-readable `message` as they appear in finding reports:

| Pattern id | Message | What it catches |
|---|---|---|
| `windows_user_path` | local Windows user path | `C:\Users\...` filesystem paths |
| `posix_user_path` | local macOS user path | `/Users/...` filesystem paths |
| `linux_home_path` | local Linux home path | `/home/<user>/...` filesystem paths |
| `email_address` | email address | Any `user@domain.tld` pattern |
| `private_key` | private key block | `-----BEGIN ... PRIVATE KEY-----` headers |
| `known_secret_prefix` | token-like secret prefix | AWS access keys (`AKIA...`), OpenAI keys (`sk-...`), GitHub tokens (`ghp_...`/`github_pat_...`), Shopify tokens (`shpat_...`/`shpss_...`), Neon tokens (`napi_...`), Slack tokens (`xox...`) |
| `internal_codebase_path` | internal codebase path (sales-hub / app source) | The strings `sales-hub` and `apps/web/src` anywhere in the file |
| `internal_db_surface` | internal database surface name | `stripe_events_raw`, `stripe_payments_raw`, `stripe_order_links`, `stripe_balance_transactions`, `shopify_orders_raw`, `shopify_line_item_tax_lines`, `printify_blueprints`, `printify_line_items`, `printify_order_items`, `printify_shipments`, `fx_rates_daily` |
| `local_artifact_path` | local-only artifact path | `.artifacts/`, `.research/`, `.roundtable/`, `audits/_state/` paths |
| `private_project_name` | known private project name | Internal project names and codenames not for public disclosure |

Any hit on any pattern in any file in a push is a gate failure. Findings report the `id`, the 1-based line number, and up to 120 characters of the matched text.

### Scope of the scan — frontmatter AND body

The gate scans the **full text** of every `SKILL.md`, including both the YAML frontmatter and the Markdown body. This means:

- A skill whose frontmatter `scope` is `portable` but whose **body** still names `sales-hub/apps/web/src/styles/` as a grounding reference will fail the gate.
- Truth-source tables, example file paths, and inline code snippets are all scanned.

> **Note — open gap (SH-6329):** The export pipeline (`export-marketplace-skills.js`) currently generates marketplace copies that include body-level `sales-hub/` path references from otherwise-portable skills with codebase grounding tables. This causes the export to exit non-zero. Until SH-6329 is resolved (body-level scrub or exclusion of grounded skills at export time), the pre-push hook and CI gate act as the primary backstop against these references reaching this repo. Do not bypass the hook on the grounds that the export pipeline allows it — the export failure is the signal that the skill content needs remediation upstream.

### Enforcement layers at a glance

Three independent layers enforce this boundary. A content violation must evade all three to reach the public distribution surface:

| Layer | What runs it | When | What it blocks |
|---|---|---|---|
| **L2 — Export pipeline scope gate** | `skill-graph/scripts/export-marketplace-skills.js` | At export time, in `skill-graph` | Skills mis-marked as portable; `PRIVACY_PATTERNS` hits in the generated export surface |
| **L3 — Pre-push hook** | `skills/hooks/pre-push` (install: `node hooks/install.js`) | Before every `git push` in this repo | Internal content arriving via direct `git add`, bypassing the export pipeline |
| **L4 — CI scan** | `.github/workflows/` (SH-6325, planned) | On every PR and push to this repo | Both paths, as a remote-side backstop after L3 |

For the full architectural rationale — including why defense-in-depth was chosen over a hard repository split — see [ADR 0012](https://github.com/jacob-balslev/skill-graph/blob/main/docs/adr/0012-internal-skill-library-separation.md).

---

## License of contributions

By submitting a contribution to this repo, you agree to license it under the project's existing terms: **[CC-BY-4.0](LICENSE)** for skill content. When redistributing or building derivative works, attribute as:

> _"Skills from Skill Graph (https://github.com/jacob-balslev/skill-graph), licensed CC-BY-4.0."_

## Code of Conduct

This project follows the [Contributor Covenant 2.1](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms.

## Reporting security issues

Do **not** open public issues for security reports. See [SECURITY.md](SECURITY.md) for the private disclosure process.
