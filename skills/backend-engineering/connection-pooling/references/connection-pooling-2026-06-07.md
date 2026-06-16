# Connection Pooling Source Review — 2026-06-07

## Reviewed Sources

- HikariCP "About Pool Sizing": small-pool doctrine and `connections = ((core_count * 2) + effective_spindle_count)` heuristic.
- HikariCP "Down the Rabbit Hole": connection-pool implementation overhead and performance considerations.
- PgBouncer documentation and FAQ: session/transaction/statement pooling, prepared statement behavior, and transaction-pooling restrictions.
- PostgreSQL current documentation for `max_connections` and connection/client timeout settings, including `idle_in_transaction_session_timeout`.
- Little's Law original paper reference: basis for concurrency = arrival rate x service time.
- Amazon RDS Proxy documentation and Supavisor repository: proxy-pool examples for serverless or autoscaled client fan-out.

## Content Decisions

- Removed an exact per-connection memory number from the mental model and replaced it with the more defensible "backend process and associated memory/state."
- Kept the HikariCP small-pool heuristic but framed it as starting guidance that must be verified by wait-time instrumentation.
- Added universal external grounding and left truth `UNVERIFIED` because no approved independent evaluator graded the skill and drift reports external URLs as unhashed.
- Adjusted routing examples toward `connection-pooling` ownership and kept cross-domain boundaries like query tuning in body/description rather than routing-eval anti-examples.
