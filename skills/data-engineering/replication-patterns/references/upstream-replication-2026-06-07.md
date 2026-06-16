# Upstream Research — Replication Patterns — 2026-06-07

This reference records the external/domain check for the `replication-patterns` audit run on 2026-06-07.

## Primary Documentation Checked

- PostgreSQL current documentation: streaming replication protocol and logical replication remain WAL/logical-decoding based surfaces for physical/logical replication.
  - https://www.postgresql.org/docs/current/protocol-replication.html
  - https://www.postgresql.org/docs/current/logical-replication.html
- MySQL 8.4 Reference Manual: classic asynchronous replication and Group Replication remain distinct replication technologies with different coordination and availability semantics.
  - https://dev.mysql.com/doc/refman/8.4/en/
  - https://dev.mysql.com/doc/refman/8.4/en/group-replication-replication-technologies.html
- MongoDB Manual: replica sets remain the primary MongoDB replication model, with oplog-based synchronization, elections, and automatic failover behavior documented in the manual.
  - https://www.mongodb.com/docs/manual/core/replication

## Upstream Displacement Check

No credible upstream displacement found. Current first-party AI-agent release notes and coding-agent changelogs do not replace the need for a distributed-systems replication skill: OpenAI Codex, Claude Code, and OpenCode releases add agent execution, model, and workflow capabilities, not database-replication design knowledge.

Sources checked:

- OpenAI model/Codex release notes and Codex product pages:
  - https://help.openai.com/en/articles/9624314-model-release-notes
  - https://openai.com/index/introducing-upgrades-to-codex/
- Claude Code changelog:
  - https://code.claude.com/docs/en/changelog
- OpenCode changelog:
  - https://opencode.ai/changelog

## Audit Conclusion

The skill's core claims remain current: single-leader, multi-leader, and leaderless/quorum topologies are still the right conceptual taxonomy; synchronous versus asynchronous replication remains the durability/latency trade-off; read-after-write handling, failover safety, split-brain prevention, and backup separation remain required operational checks.
