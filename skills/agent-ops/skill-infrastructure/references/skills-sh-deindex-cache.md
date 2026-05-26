# skills.sh listing cache & de-index behavior

> How the skills.sh public marketplace caches listings, why stale/superseded rows persist, and the only known removal path.
> Last updated: 2026-05-21

## Key findings
- skills.sh **caches directory listings** and exposes **no self-service re-scan or de-index** mechanism. Once a `username/<repo>/` row is indexed it persists even after the source changes.
- **Deleting the source GitHub repo does NOT de-index** the listing — proven: `skill-graph-skills` and `skill-graph-skills-missing-1` return 404 on GitHub yet still serve rows on skills.sh.
- Stale rows have only ever been removed by **manual @quuu action** (Vercel maintainer), evidenced by three resolved Vercel Community threads: 35562, 37935, 39521.
- New symptom (2026-05-21): the *canonical* page `skills.sh/jacob-balslev/skills/` reportedly shows **"0 skills"** despite the CLI discovering 80 — an indexing/scan bug on skills.sh, distinct from the stale-row problem.
- Upstream tracking issue [vercel-labs/skills#1147](https://github.com/vercel-labs/skills/issues/1147) is **open since 2026-05-14**, no maintainer response, no assignee/label/milestone (verified 2026-05-21).

## Actionable takeaways for our repo
- Treat skills.sh publication as **append-mostly**: assume a published `username/<repo>/` path is effectively permanent. Avoid creating throwaway export repos (the `skill-graph-skills*` rows became unremovable orphans).
- Publish only from the single canonical release repo (`jacob-balslev/skills`); never from secondary/partial export repos.
- For removal, escalate via #1147 + a Vercel Community thread requesting manual @quuu action — there is no API/CLI path.
- Tracked internally as **SH-6285** (stale rows) — monitor monthly; nothing to merge in-repo.

## Sources
- [vercel-labs/skills#1147](https://github.com/vercel-labs/skills/issues/1147) — open upstream issue requesting listing consolidation / de-index; no maintainer response as of 2026-05-21.
- Vercel Community threads 35562, 37935, 39521 — prior stale-row removals, each resolved only by manual @quuu action.
