# skills

> Public open-source skill library for AI agent systems. Submit to [skills.sh](https://skills.sh).

**137 skills** · Apache-2.0 · Maintained by [@jacob-balslev](https://github.com/jacob-balslev)

Each skill under `skills/<name>/SKILL.md` is a plain Agent Skills-compatible export in [Skill Metadata Protocol](https://github.com/jacob-balslev/skill-metadata-protocol) format.

## Install

```bash
npx skills add jacob-balslev/skills
```

## Ecosystem

| Repo | Purpose |
|------|---------|
| [skill-metadata-protocol](https://github.com/jacob-balslev/skill-metadata-protocol) | Protocol spec + JSON schemas |
| [skill-graph](https://github.com/jacob-balslev/skill-graph) | Library tooling: lint, manifest, router, drift |
| [skill-audit-loop](https://github.com/jacob-balslev/skill-audit-loop) | 5-phase audit procedure |
| **skills** *(this repo)* | Public open-source skill library |

## Generating skills

Skills are exported from [skill-graph](https://github.com/jacob-balslev/skill-graph):

```bash
cd skill-graph && npm run marketplace:export
```

Then copy the output from `marketplace/skills/` into `skills/` in this repo and commit.

## License

Apache-2.0
