# Streaming Architecture Source Review — 2026-06-07

## Reviewed Sources

- RFC 9112, section 7.1, anchors HTTP/1.1 chunked transfer coding and the zero-length final chunk.
- RFC 9113, section 5, anchors HTTP/2 streams, multiplexing, and flow-control framing.
- RFC 6455 anchors WebSocket as a bidirectional framed protocol.
- WHATWG HTML Server-Sent Events anchors `EventSource`, `text/event-stream`, reconnection, and event ids.
- WHATWG Streams anchors `ReadableStream`, `WritableStream`, `TransformStream`, and pull/backpressure concepts.
- Node.js Streams docs anchor server-side stream classes, `pipe()`, and high-water-mark buffering.
- gRPC core concepts anchor server-streaming, client-streaming, and bidirectional-streaming RPCs over HTTP/2.
- Reactive Streams anchors asynchronous stream processing with non-blocking backpressure.
- React `renderToPipeableStream` docs anchor React server rendering as a stream that can be piped and aborted.
- MDN readable-stream examples provide practical browser-side stream-consumption reference.

## Content Decisions

- Kept the five-primitives teaching center: producer, stream, consumer, backpressure, termination.
- Kept SSE as the default starting point for one-way browser text event streams, with the boundary that browser freshness UX belongs to `real-time-updates`.
- Replaced stale/nonexistent adjacent-skill references with existing skills: `real-time-updates`, `api-design`, `background-jobs`, `tool-call-flow`, `event-contract-design`, and `rendering-models`.
- Changed the LLM SDK row to avoid claiming all vendors use the same exact transport. The skill now describes HTTP response streams and often SSE-like event frames.
- Left truth verdict `UNVERIFIED` because the grounding is external and no approved independent evaluator graded the skill.
