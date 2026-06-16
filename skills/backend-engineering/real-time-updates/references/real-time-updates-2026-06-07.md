# Real-Time Updates Source Review

Last reviewed: 2026-06-07

## Primary sources checked

- WHATWG HTML Standard, Server-sent events: https://html.spec.whatwg.org/multipage/server-sent-events.html
- MDN, Using server-sent events: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
- MDN, Page Visibility API: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
- MDN, WebSocket API: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
- IETF RFC 6455, The WebSocket Protocol: https://www.rfc-editor.org/rfc/rfc6455
- React, useOptimistic reference: https://react.dev/reference/react/useOptimistic
- TanStack Query, Polling guide: https://tanstack.com/query/latest/docs/framework/react/guides/polling

## Current synthesis

- The WHATWG EventSource specification and MDN SSE guide still support the skill's core distinction: SSE is one-way server-to-browser event delivery with browser reconnect behavior and event IDs, not a complete application-level guarantee that every missed state change has been reconciled.
- MDN's SSE guide documents `event`, `data`, `id`, and `retry` fields, so the skill should require an event ID, version, cursor, timestamp, or full refetch when missed updates matter.
- MDN's Page Visibility API remains the appropriate browser primitive for adapting or pausing polling when a page becomes hidden.
- MDN's WebSocket API guidance still warns that the classic WebSocket API does not provide backpressure. Low-level backpressure design belongs to `streaming-architecture`; browser freshness should choose WebSocket only when bidirectionality is required.
- RFC 6455 remains the canonical WebSocket protocol source. It supports the skill's directionality and operational-complexity boundary without making WebSocket the default for one-way dashboards.
- React's `useOptimistic` reference supports the skill's framing of optimistic UI as provisional state that resolves back to authoritative state after the action completes.
- TanStack Query's polling guide supports the skill's claim that polling can be explicit, periodic, and connectivity-aware rather than inherently a bad design.

## Content decisions

- Add v8 `scope`, remove audit/provenance fields from SKILL.md frontmatter, and move them to `audit-state.json`.
- Keep the main decision rule: freshness contract first, then transport choice.
- Sharpen boundaries with `streaming-architecture`, `event-contract-design`, `background-jobs`, `cron-scheduling`, `interaction-feedback`, and `client-server-boundary`.
- Add client cache invalidation and authoritative-state reconciliation because live messages should usually be signals, not full truth.
- Replace legacy `evals/evals.json` with canonical `evals/comprehension.json` and `evals/application.json`.
- Keep truth as `UNVERIFIED` because external truth sources are not hashable by the current drift gate.

## Skill Graph lens findings

- The router initially over-routed pure optimistic UI language to `interaction-feedback`; the positive routing example now includes live-list freshness and server reconciliation so it remains in this skill's scope.
- The router initially over-routed duplicated polling language to `client-server-boundary`; the positive routing example now names dashboard widgets sharing one freshness channel.
- The router correctly sent event schema/topic language to `event-contract-design`, but `real-time-updates` did not declare that boundary. The relation is now explicit.
- `skill-graph status` reports `conceptScope repo_specific_or_unknown` for portable skills even after v8 `scope` is present; this remains a SYSTEM finding.
- Bare-slug resolver behavior should be checked after migration because other v8 nested skills have required category-qualified paths for source-truth and test-runner tooling.
