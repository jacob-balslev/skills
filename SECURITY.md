# Security Policy

## Reporting a Vulnerability

Report security issues privately via GitHub Security Advisories:

👉 **https://github.com/jacob-balslev/skills/security/advisories/new**

Please do **not** open a public issue for security reports.

If you cannot use GitHub Security Advisories, email **jacobbalslev@gmail.com** with the subject line `[security] skills — <short description>`.

## What counts as a security issue in a skill library?

This repo distributes plain-text Agent Skills. The most relevant security concerns are:

- A skill that instructs an agent to exfiltrate credentials, secrets, or PII.
- A skill whose `truth_sources` or example commands point at malicious resources.
- A skill that triggers destructive shell commands without confirmation.
- A skill that embeds prompt-injection payloads disguised as documentation.
- A supply-chain concern in how the skill is fetched or installed.

If you find one of these — or anything else that could lead a downstream agent to take unsafe action — please report privately rather than opening a public issue.

## Response SLA

| Phase | Target |
|---|---|
| Triage acknowledgement | within 7 calendar days of report |
| Initial assessment | within 14 days |
| Fix or mitigation plan | within 30 days for high-severity issues; 90 days otherwise |

These are targets, not guarantees. Single-maintainer project — please be patient and follow up if you have not heard back.

## Scope

In scope:
- The `SKILL.md` files, scripts, references, and assets distributed from this repo.
- The `skills.manifest.json` index.

Out of scope:
- Tooling that consumes the skills — see [skill-graph](https://github.com/jacob-balslev/skill-graph) and [skill-audit-loop](https://github.com/jacob-balslev/skill-audit-loop).
- The protocol spec itself — see [skill-metadata-protocol](https://github.com/jacob-balslev/skill-metadata-protocol).
- Forks of this repo published outside `github.com/jacob-balslev`.

## Coordinated Disclosure

We follow coordinated disclosure. Reporters will be credited in the published security advisory once a fix is released, unless the reporter requests anonymity.

## Supported Versions

`main` is the only supported branch. Skill content evolves continuously — there are no maintained release branches.
