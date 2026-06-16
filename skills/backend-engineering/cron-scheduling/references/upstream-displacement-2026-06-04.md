# Upstream Displacement Check — 2026-06-04

## Sources Checked

- Vercel Cron Jobs: https://vercel.com/docs/cron-jobs
- Vercel Managing Cron Jobs: https://vercel.com/docs/cron-jobs/manage-cron-jobs
- Inngest Functions: https://www.inngest.com/docs/learn/inngest-functions
- Inngest Trigger Helpers: https://www.inngest.com/docs/reference/typescript/functions/triggers
- Inngest Concurrency: https://www.inngest.com/docs/functions/concurrency
- Inngest Handling Failures: https://www.inngest.com/docs/reference/typescript/functions/handling-failures
- Inngest Observability & Metrics: https://www.inngest.com/docs/platform/monitor/observability-metrics
- OpenAI Tasks in ChatGPT: https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt
- OpenAI ChatGPT Agent: https://help.openai.com/en/articles/11752874-chatgpt-agent

## Finding

No upstream displacement found.

Vercel and Inngest still expose platform-level cron and scheduled-function primitives that require application architecture decisions: authorization, idempotency, overlap prevention, dispatch-to-worker shape, failure handling, and observability. OpenAI Tasks and ChatGPT agent recurring tasks provide user-facing scheduled prompts and agent invocations, but they do not replace backend web-application cron architecture for Vercel/Inngest services.

## Skill Updates Made From Current Sources

- Replaced fixed Vercel Cron duration numbers with the current Vercel rule: cron duration follows the invoked Vercel Function's `maxDuration`.
- Corrected Vercel Cron authorization wording to use the `Authorization: Bearer <CRON_SECRET>` header.
- Added Vercel duplicate-invocation and concurrency guidance as first-class design checks.
- Updated the Inngest example to use the current trigger-helper shape with `cron()` and to mention timezone support and jitter.
- Preserved the skill's guidance that cron routes should usually trigger durable work rather than perform long-running work inline.
