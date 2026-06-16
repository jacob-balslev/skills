# Upstream Displacement Review - 2026-06-05

## Sources Checked

- PostgreSQL current documentation: modifying tables, `ALTER TABLE`, `CREATE INDEX`, and system administration functions.
- Neon documentation: branching workflow and connection pooling guidance.
- PgBouncer documentation: pooling modes and session-feature limitations.
- OpenAI platform documentation for agent tooling and Codex-facing code-generation guidance.
- Anthropic Claude Code documentation for current terminal-agent capabilities.
- OpenCode public documentation and changelog surface.

## Verdict

No upstream displacement found.

Current AI coding agents can generate SQL, inspect repositories, run shell commands, and automate review loops, but they do not replace the migration-safety judgment this skill teaches: lock profile analysis, direct migration connection choice, volatile-default handling, batched backfills, deploy compatibility, branch or snapshot rehearsal, verification queries, and rollback planning.

## Changes Made From Current Sources

- Corrected PostgreSQL default guidance from "non-constant defaults rewrite" to the current volatility-based distinction: constant and non-volatile defaults are metadata-friendly on modern PostgreSQL, while volatile defaults require existing rows to be updated.
- Corrected index-lock wording: plain `CREATE INDEX` locks out writes but not reads; `CONCURRENTLY` avoids locks that prevent concurrent inserts, updates, or deletes and must run outside a transaction block.
- Narrowed type-change safety: direct `ALTER COLUMN ... TYPE` is safe only after checking the specific source type, target type, constraints, indexes, and rewrite behavior.
- Replaced the single-block backfill example with a repeatable bounded update pattern that can commit between batches.
- Moved audit/eval state into `audit-state.json` and added a local `evals/comprehension.json` artifact for the current audit loop.
