---
name: route-handler-design
description: "Use when designing or reviewing Next.js Route Handlers (the `route.ts` file convention in App Router): when a Route Handler is the right surface vs Server Actions or Server Components, the HTTP-method-as-export contract (GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS), the Web-standard Request/Response interface (no Node `req`/`res`), the body-parsing primitives (`request.json`/`formData`/`text`/`blob`/`arrayBuffer`), the default caching behavior of GET responses and how to opt out (`dynamic = 'force-dynamic'`, `revalidate`, segment config), dynamic segments and search params, manual CORS, runtime selection (Edge vs Node), streaming via `ReadableStream`, status-code and header discipline, error responses, webhook-style handlers (signature verify before parse), and the design rule that a Route Handler is the right surface when the caller is not your own Next.js UI. Do NOT use for internal mutations triggered from your own UI (use server-actions-design), for the broader REST/contract/versioning discipline (use api-design), for HTTP method/status semantics in the abstract (use http-semantics), for request preprocessing across all routes (use middleware-patterns), or for the broader webhook reliability story — HMAC verification, idempotency, retries, queue handoff (use webhook-integration)."
license: MIT
allowed-tools: Read Grep
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 8. Prior contract retrievable via `git show schema-v7:schemas/skill.schema.json`.
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"


  # === v8 Classification (subject + deployment_target; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: product-domain
  # deployment_target: where this skill applies. One of two closed values:
  # portable (any project, repo-agnostic) /
  # project (one or more specific projects; requires populated `grounding` and `project[]`).
  deployment_target: portable
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: engineering/frontend
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-17"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-17\"}"

  # === Evaluation Status: three orthogonal axes ===
  # eval_artifacts: disk-truth — does an eval file exist on disk?
  # none (no intent) / planned (intent declared, no file yet) / present (file exists).
  eval_artifacts: planned
  # eval_state: runtime-truth — has the eval been run and passed?
  # unverified (no run yet, or no file) / passing (one-shot green) / monitored (cadenced green).
  # `monitored` is strictly stronger than `passing` — a forward state for continuous runs.
  eval_state: unverified
  # routing_eval: routing-coverage — is the skill's activation verified by the harness?
  # absent (not verified) / present (gated by lint check 12; harness must exit 0).
  routing_eval: absent
  # comprehension_state: marker that this skill has populated v6+ Understanding fields
  # (mental_model, purpose, boundary, analogy, misconception). Value: `present` or absent.
  comprehension_state: present
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: "[\"Next.js Route Handler\",\"route.ts file\",\"API endpoint via route.ts\",\"GET POST PUT DELETE export\",\"Web Request Response API\",\"NextRequest NextResponse\",\"request.json formData parsing\",\"dynamic force-dynamic segment config\",\"revalidate Route Handler\",\"Edge runtime vs Node runtime\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"how do I expose an API endpoint in Next.js App Router\",\"when should I use a Route Handler instead of a Server Action\",\"how do I receive a webhook in Next.js\",\"how do I return a streaming response from an API route\",\"how do I parse a JSON body in route.ts\",\"why is my Route Handler GET cached\",\"how do I set CORS headers on a Next.js API route\",\"Edge runtime vs Node runtime for an API route\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"design the route.ts that receives a Stripe webhook — verify signature before parsing the body, return 200 immediately, queue the heavy work\",\"decide whether a 'export user data' endpoint should be a Route Handler or a Server Action\",\"add CORS to a Route Handler that mobile clients call from a different origin\",\"opt a GET Route Handler out of the default static cache because it depends on the request user\",\"return a streaming binary response (PDF generation, large CSV export) from a Route Handler\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"design an internal create-comment form mutation triggered only from this app's UI (use server-actions-design)\",\"define the REST contract and resource model for a v2 public API (use api-design)\",\"explain what an HTTP 422 means vs 400 (use http-semantics)\",\"add an auth check that runs before every protected route (use middleware-patterns)\",\"design the idempotency-key + retry + dead-letter-queue strategy for a webhook (use webhook-integration)\",\"design the resource model, versioning, pagination, or error envelope of an HTTP API (use api-design)\",\"decide what an HTTP method, status code, or header should mean per RFC 9110 (use http-semantics)\",\"design signature verification, idempotency keys, retry semantics, or dead-letter queues for vendor webhooks (use webhook-integration)\",\"design a cross-cutting streaming model with Web Streams, SSE, or backpressure (use streaming-architecture)\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"server-actions-design\",\"api-design\",\"http-semantics\",\"middleware-patterns\",\"webhook-integration\",\"streaming-architecture\",\"client-server-boundary\"],\"boundary\":[{\"skill\":\"server-actions-design\",\"reason\":\"server-actions-design owns the internal mutation surface — a function the bundler turns into a network call from your own UI. route-handler-design owns the public-endpoint surface — a Web-standard Request/Response handler invoked by callers (mobile, third-party, webhooks, your own client-side fetches) that are not the Next.js bundler's typed call sites. Use Server Actions when the only caller is this app's UI; use Route Handlers when the caller is anything else or when you need fine-grained HTTP control.\"},{\"skill\":\"middleware-patterns\",\"reason\":\"middleware runs once before route resolution and applies to many routes via a `matcher`; route-handler-design runs for one route and one method. Use middleware for cross-cutting concerns (auth gate, header injection, locale rewrite); use Route Handlers for the per-route logic that runs after middleware passes.\"}],\"verify_with\":[\"code-review\",\"api-design\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    A Next.js Route Handler is a file named `route.ts` (or `route.js`) under the `app/` directory that exports one async function per HTTP method (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS). Each export receives a standard Web `Request` and returns a standard Web `Response` (or `NextResponse` which extends it). *The file shape IS the contract* — the filesystem path defines the URL; the export name defines the method; the function body defines the handler. No Node-style `req`/`res`; no middleware chain; no per-method routing config. Unhandled methods auto-return `405`. The five body-reading methods (`request.json()`, `request.formData()`, `request.text()`, `request.blob()`, `request.arrayBuffer()`) are mutually exclusive — *a body can be read only once*; if you need both raw and parsed (for webhook HMAC verification), read `text()` and parse yourself.

    *Default caching*: GET handlers that don't read request-scoped sources are statically cached in production; opt out via `export const dynamic = 'force-dynamic'`, `export const revalidate = 60`, or read cookies/headers (which auto-opts out by inference). POST/PUT/PATCH/DELETE are never cached. *Runtime selection* (`export const runtime = 'edge' | 'nodejs'`) controls the capability surface — Edge offers Web Crypto, Web Streams, fast cold start (~10-50ms), lower memory ceiling, no Node modules; Node offers full Node ecosystem at the cost of higher cold start (~200-1000ms). Streaming responses return a `ReadableStream` with appropriate headers (`Content-Type: text/event-stream` for SSE, etc.); Edge runtime is the safe choice for long-lived streams. *Webhook pattern*: read `request.text()` for raw bytes, verify HMAC signature against the raw body before any parsing, ACK fast (return 200 immediately), queue heavy work asynchronously — vendors interpret slow ACKs as failures and retry.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Replaces the Pages Router's Node-style `/api/*` endpoints with Web-standard handlers that compose into the App Router's file-system convention. Solves the problem that Pages Router endpoints were tied to Node's `req`/`res` interface (not portable to Edge, Cloudflare Workers, or Deno) and required separate routing-layer registration. The deeper purpose emerges from the App Router introducing *Server Actions* as a competing mutation surface: Route Handlers become *purely the public HTTP endpoint surface*, used when the caller is *not your own typed UI* — mobile apps, third-party integrations, webhooks, server-to-server calls, cross-origin client-side fetches, binary downloads, server-sent events, anything that benefits from explicit HTTP semantics. The single most common Route Handler mistake in App Router code is using one for an internal mutation that a Server Action would serve better — duplicate type contracts, manual fetch wiring, no progressive enhancement, no built-in revalidation.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from server-actions-design, which owns the *internal* mutation surface — a function the bundler turns into a network call from your own UI; this skill owns the *public-endpoint* surface for callers who aren't the Next.js bundler's typed call sites. Use Server Actions when the only caller is this app's UI; use Route Handlers when the caller is anything else or when you need fine-grained HTTP control. Distinct from middleware-patterns, which runs once before route resolution and applies to many routes via a `matcher` — Route Handlers run for one route and one method *after* middleware passes. Distinct from api-design, which owns the broader REST/contract/versioning discipline — this skill owns the Next.js implementation surface that hosts the contract. Distinct from http-semantics, which owns the abstract method/status/header semantics — this skill owns honoring them in App Router. Distinct from webhook-integration, which owns the full webhook reliability story (HMAC details, idempotency keys, retry semantics, dead-letter queues) — this skill covers the endpoint surface only. Distinct from streaming-architecture, which owns the cross-cutting streaming model — this skill covers Route Handler streaming specifically. Distinct from client-server-boundary (which owns the bundler's component split, a different boundary).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "A Route Handler is to a Next.js app what a service window at a government office is to its workflow — different windows handle different services (`GET /posts`, `POST /comments`); each window has a posted sign saying which forms it accepts and what stamps it returns; you do not walk into the back office (Server Action) unless you work there. The window is the contract: filesystem path = window number, export name = service offered, function body = the clerk's actual work."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that Route Handlers are "Next.js's API routes" and that every HTTP endpoint in a Next.js app belongs there. They are, but with a critical refinement after App Router: *internal mutations from your own UI belong in Server Actions, not Route Handlers*. Using a Route Handler for an internal mutation duplicates the type contract (request shape + response shape + manual fetch wiring + manual revalidation), loses progressive enhancement (form submission without JS), and loses built-in revalidation. Adjacent misconceptions: that `request.body` can be read multiple times (it cannot — pick one of `json`/`formData`/`text`/`blob`/`arrayBuffer`; if you need both raw and parsed, read `text()` and parse yourself); that GET responses are never cached (they are — by default, in production, GETs that don't read request-scoped sources are statically cached and the same response is served to every caller; opt out explicitly or read cookies/headers); that calling `request.json()` on a webhook is fine (it is not — the parse can mutate whitespace and break HMAC signature verification; read raw bytes via `text()`, verify, then parse); that webhooks should do heavy work inline (they should not — vendors interpret slow ACKs as failures and retry, producing duplicate processing; ACK fast with 200 and queue the work); that `Access-Control-Allow-Origin: '*'` works with credentialed requests (it does not — browsers refuse to send credentials with wildcard origin; allowlist explicit origins); that Edge runtime is always faster (it is not — cold start is faster, but Edge has a tight capability surface, ~1MB bundle ceiling, and many vendor SDKs require Node's `crypto` module; default to Node and switch only when the gain matters and the dependencies are compatible).
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"A Next.js Route Handler is a file named route.ts (or route.js) under the app/ directory that exports one async function per HTTP method (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS). Each export receives a standard Web Request object and returns a standard Web Response (or NextResponse, which extends it). The file's filesystem path defines the URL; the export name defines the method; the function body defines the handler. There is no Node-style req/res, no middleware chain, no per-method routing config — the file shape IS the contract.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/route-handler-design/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: PASS
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: PASS
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
  last_audited: 2026-05-28
  lint_verdict: PASS
---

# Route Handler Design

## Coverage

The discipline of designing Next.js App Router `route.ts` handlers: the file-and-export convention (one async function per HTTP method, one URL per filesystem path), the Web-standard Request/Response interface that replaces the Node `req`/`res` pair, the body-parsing primitives (`request.json` / `formData` / `text` / `blob` / `arrayBuffer`), the default GET caching behavior and the segment-config opt-outs (`dynamic`, `revalidate`, `runtime`), dynamic segments and search-param access, manual CORS, the Edge vs Node runtime choice, streaming responses via `ReadableStream`, status-code and header discipline, error response shaping, the canonical webhook pattern (verify signature against the raw body before parsing), and the central design rule that determines when a Route Handler is the right surface at all: **the caller is not your own typed UI**.

## Philosophy

The App Router collapsed three things that used to be distinct in the Pages Router:

- **Pages**: rendered routes — moved to Server Components and `page.tsx`.
- **API routes**: HTTP endpoints under `/api/*` — moved to Route Handlers in `route.ts`.
- **Custom server handlers**: middleware, edge functions — partly absorbed by `middleware.ts`, partly by per-route runtime selection.

The Pages Router `/api/foo.ts` exported a default function taking Node's `req` and `res`. The Route Handler exports per-method async functions taking a Web `Request` and returning a Web `Response`. The change is not cosmetic — it makes Next.js endpoints portable to any runtime that speaks Web standards (Edge, Cloudflare Workers, Deno, browser Service Workers in principle) and removes a category of "Node-specific" footguns.

The deeper shift is that the App Router introduced a *competing* mutation surface in **Server Actions**. Before, every mutation needed an API route. Now, most mutations triggered from the app's own UI should use a Server Action (one declaration, no manual wire format). Route Handlers remain the right surface only when the caller is *not* the Next.js bundler's typed call site — mobile apps, third-party integrations, webhooks, server-to-server calls, server-sent events, binary downloads, and anything else that benefits from explicit HTTP semantics.

The Route Handler is the **public HTTP endpoint** surface. Use it when you need an HTTP endpoint. Use a Server Action when you need a mutation triggered from this app's UI. The two surfaces can coexist — many apps publish a Route Handler `/api/v1/posts` for external clients AND use Server Actions for the same mutations from their own forms.

## When to Use What

| Caller | Right surface | Why |
|---|---|---|
| This app's `<form>` or button | **Server Action** | One declaration; no wire format; progressive enhancement; revalidation built in |
| This app's component reading data on render | **Server Component** | No round-trip; co-located with the render that uses the data |
| Mobile app, third-party integration, server-to-server | **Route Handler** | Explicit HTTP contract; the caller does not run the Next.js bundler |
| Webhook from Stripe / Shopify / GitHub | **Route Handler** | Need raw-body access for signature verification; need exact status codes; vendor expects standard HTTP |
| Streaming SSE, binary downloads, large CSV/PDF | **Route Handler** | Returns a `ReadableStream` with the right headers; Server Actions can't model this |
| Client-side `fetch()` from a Client Component | **Route Handler** if it's a real API, **Server Action** if it's a mutation | Don't fetch your own internal mutation; that's what Server Actions exist to replace |

The single most common Route Handler mistake in App Router code is using a Route Handler for an internal mutation that a Server Action would serve better — duplicate type contracts, manual fetch wiring, no progressive enhancement, no built-in revalidation.

## The File-and-Export Contract

```ts
// app/api/posts/route.ts
export async function GET(request: Request) {
  const posts = await db.post.findMany()
  return Response.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const created = await db.post.create({ data: body })
  return Response.json(created, { status: 201 })
}
```

The filesystem path `app/api/posts/route.ts` registers `/api/posts`. The exports `GET` and `POST` register the methods. Unhandled methods auto-return `405 Method Not Allowed`. There is no router-level config object, no separate registration step.

A Route Handler file cannot coexist with a `page.tsx` at the same path — `/api/posts/page.tsx` and `/api/posts/route.ts` collide and Next.js rejects the build. Choose one or the other per URL.

### Dynamic segments

```ts
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params       // Promise in Next 15+
  const post = await db.post.findUnique({ where: { id } })
  return post ? Response.json(post) : new Response(null, { status: 404 })
}
```

In Next 15+, `params` is a Promise — `await` it. In earlier versions, it was a plain object. The shape of the typed second argument follows the dynamic-segment names in the path.

### Search params

```ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') ?? '20')
  // ...
}
```

`URLSearchParams` is the Web-standard read surface. There is no Next-specific helper for query strings beyond constructing a `URL` from `request.url`.

## Body Parsing

The `Request` object exposes five body-reading methods:

| Method | Returns | Use when |
|---|---|---|
| `request.json()` | parsed JSON | Content-Type: application/json |
| `request.formData()` | FormData | Content-Type: multipart/form-data or application/x-www-form-urlencoded |
| `request.text()` | string | Plain text, raw payload, or when you need to verify a signature against the raw bytes |
| `request.blob()` | Blob | File upload, binary payload you'll re-serve |
| `request.arrayBuffer()` | ArrayBuffer | Low-level binary processing |

A body can only be read **once**. If you need both the raw body (for HMAC verification) and the parsed body (for handler logic), call `request.text()` and parse it yourself. The webhook section below demonstrates this.

## Default Caching and How to Opt Out

In production, a Route Handler whose `GET` export does not read from request-scoped sources (cookies, headers, search params accessed via `request.url`'s changing parts) is **statically cached** by default. Subsequent requests hit the cache.

For most APIs this is wrong. Opt out via segment config:

```ts
// app/api/posts/route.ts
export const dynamic = 'force-dynamic'      // always run; never cache

// or
export const revalidate = 60                // cache for 60s, then revalidate

// or
export const runtime = 'edge'               // run on Edge Runtime (changes capability surface)
```

`POST`, `PUT`, `PATCH`, `DELETE` handlers are never cached — they're assumed to mutate. Only `GET` and `HEAD` are affected by the default-cache rule.

Reading cookies, headers, or `request.headers` automatically opts a GET out of static caching. So does reading `searchParams` from the request URL. The rule is: any handler that depends on per-request data is dynamic by definition; Next infers this from your code. The explicit `dynamic = 'force-dynamic'` is the belt-and-suspenders option when the inference might be wrong or when you want the intent to be visible.

## NextRequest and NextResponse

Standard Web `Request` and `Response` work fine. Next provides extended versions for convenience:

```ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const country = request.geo?.country               // on Vercel Edge
  return NextResponse.json({ session, country }, { status: 200 })
}
```

`NextRequest` extends `Request` with `.cookies`, `.geo`, `.ip`, `.nextUrl`. `NextResponse` extends `Response` with `.cookies.set/.delete`, `NextResponse.redirect`, `NextResponse.rewrite`, `NextResponse.json` (a convenience that mirrors `Response.json`).

Use them when you need cookies or geo. Stick with standard `Request`/`Response` when you don't — it makes the handler more portable.

## Streaming Responses

A Route Handler can return a `ReadableStream` directly. Useful for SSE, AI streaming, large file generation, and chunked CSV/JSON exports.

```ts
export async function GET() {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of generateData()) {
        controller.enqueue(encoder.encode(chunk))
      }
      controller.close()
    },
  })
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  })
}
```

The `Edge` runtime is the safe choice for long-lived streams — it has lower memory overhead per connection and avoids Node's connection-keepalive quirks. The Node runtime can also stream, but be aware of buffering behavior in your deployment platform (Vercel buffers Node responses by default unless you opt out).

## The Webhook Pattern

Webhooks need three things almost always: **raw body access, signature verification before parse, fast acknowledgment**.

```ts
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'         // some HMAC libs need Node crypto
export const dynamic = 'force-dynamic'  // never cache a webhook

export async function POST(request: Request) {
  const signature = (await headers()).get('stripe-signature')
  if (!signature) return new Response('Missing signature', { status: 400 })

  const rawBody = await request.text()  // raw bytes for HMAC

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return new Response(`Webhook signature verification failed: ${err.message}`, { status: 400 })
  }

  // ACK fast; do heavy work async
  queueEventForProcessing(event)
  return new Response(null, { status: 200 })
}
```

Key decisions encoded above:

- **`request.text()`**, not `request.json()` — you need the raw bytes for HMAC; parsing first would mutate whitespace and break verification.
- **Verify before any business logic** — reject unauthenticated calls with a fast 400 before touching the database.
- **ACK fast** — return 200 within seconds; queue the actual processing. Vendors interpret slow ACKs as failures and retry, which produces duplicate processing if you're not careful.
- **`runtime = 'nodejs'`** — some vendor SDKs need Node-only crypto APIs (Stripe's `constructEvent` does in some versions). Edge runtime supports Web Crypto natively; check the vendor SDK.

The reliability concerns beyond the endpoint itself — idempotency keys, retry semantics, dead-letter queues, replay protection — belong to `webhook-integration`. This skill covers the framework-specific endpoint surface only.

## CORS

There is no built-in CORS helper in Route Handlers. Set headers manually, and handle the preflight `OPTIONS` request explicitly:

```ts
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://app.example.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(request: Request) {
  const data = await request.json()
  return Response.json({ ok: true }, { headers: CORS_HEADERS })
}
```

Never reflexively allow `*` for credentialed requests — it doesn't work with `Access-Control-Allow-Credentials: true` and is a footgun for cookies and auth. Allowlist explicit origins.

If many routes need the same CORS policy, push it to `middleware-patterns` and the middleware can inject headers globally.

## Status Codes and Errors

Honor HTTP semantics (see `http-semantics` for the full discipline):

- **200** — success with body
- **201** — created (returning the new resource)
- **204** — success, no body
- **400** — client error: malformed input
- **401** — unauthenticated
- **403** — authenticated but not authorized
- **404** — resource not found
- **409** — conflict (e.g., duplicate)
- **422** — validation failure (unprocessable entity)
- **429** — rate limited
- **500** — unexpected server error
- **503** — temporarily unavailable

```ts
export async function POST(request: Request) {
  try {
    const parsed = Schema.safeParse(await request.json())
    if (!parsed.success) {
      return Response.json({ error: parsed.error.flatten() }, { status: 422 })
    }
    const created = await db.post.create({ data: parsed.data })
    return Response.json(created, { status: 201 })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

A thrown exception that escapes the handler becomes a 500. That's a usable fallback, but explicit `try/catch` plus a structured error envelope is better for any handler clients consume programmatically.

## Edge vs Node Runtime

```ts
export const runtime = 'edge'  // or 'nodejs' (default)
```

| Capability | Edge | Node |
|---|---|---|
| Web Crypto (`crypto.subtle`) | ✅ | ✅ |
| Node `crypto` module | ❌ | ✅ |
| Node `fs`, `child_process`, `net` | ❌ | ✅ |
| Most npm packages | ⚠️ depends on package | ✅ |
| Cold start | ~10–50ms | ~200–1000ms |
| Memory ceiling | lower (per Vercel: 128MB code, fast startup) | higher |
| Long-lived streams | ✅ better | ⚠️ platform-dependent |
| Vendor SDKs that need Node crypto | ❌ check vendor support | ✅ |

Default to Node when in doubt. Move to Edge only when (a) the cold-start gain matters (geographic distribution, low-traffic endpoints), (b) the handler is a streaming endpoint, or (c) the handler is on a hot path where the latency budget needs Edge's fast startup. Always re-test after switching — package compatibility breaks often.

## Common Anti-Patterns

| Anti-pattern | Why it's wrong | Fix |
|---|---|---|
| Using a Route Handler for an internal mutation triggered from this app's UI | Duplicate type contracts, manual fetch wiring, no progressive enhancement, no built-in revalidation | Use a Server Action |
| Calling `request.json()` on a webhook before HMAC verification | The parse can mutate whitespace; signature verification fails | Read `request.text()`, verify against raw bytes, then `JSON.parse` |
| Forgetting `dynamic = 'force-dynamic'` on a GET that depends on the request user | Cached response leaks one user's data to another | Either read cookies/headers (auto-opts out) or set `dynamic` explicitly |
| Slow webhook ACK because the handler awaits the heavy work inline | Vendor retries; duplicate processing | Queue the work; return 200 immediately |
| Throwing inside the handler and letting it become a generic 500 | Client gets no actionable error | Catch, log, return a structured error envelope with the right status code |
| Reflexive `Access-Control-Allow-Origin: '*'` with credentialed requests | Browser refuses to send credentials; auth breaks | Allowlist explicit origins; never combine `*` with credentials |
| Putting a `route.ts` and a `page.tsx` at the same path | Build error | Choose one — the URL has one purpose |
| Reading `request.body` as a stream and also trying `request.json()` | Body is consumed once | Pick one read method; if you need both raw and parsed, read text and parse yourself |
| Mixing App Router Route Handlers with Pages Router `pages/api/*` patterns (`req.body`, `res.status`) | Different API surfaces; types don't transfer | App Router uses Web Request/Response; rewrite to that shape |
| Long-lived stream on the Node runtime without checking platform buffering | Vercel/host may buffer the entire response before sending | Use Edge runtime for streams, or explicitly configure the host |

## Verification

After applying this skill, verify:

- [ ] The handler's caller is genuinely external (mobile, third-party, webhook, cross-origin client) or needs explicit HTTP semantics — otherwise it should be a Server Action or Server Component.
- [ ] Each HTTP method that the endpoint should support is a named export; unsupported methods are not exported.
- [ ] Body is read exactly once (or read as `text()` and parsed manually when raw bytes are needed).
- [ ] GET handlers that depend on per-request data either read cookies/headers explicitly or set `dynamic = 'force-dynamic'`.
- [ ] Webhook handlers verify signature against the raw body before any parsing or business logic.
- [ ] Webhook handlers ACK within the vendor's timeout budget; heavy work is queued.
- [ ] Status codes match the response semantics (201 for created, 422 for validation failure, 401 vs 403 distinguished).
- [ ] Errors are caught and returned with a structured envelope, not allowed to become bare 500s.
- [ ] CORS headers — if needed — are explicit allowlists, not `*` with credentials, and an `OPTIONS` handler is present.
- [ ] Runtime choice (`edge` vs `nodejs`) is intentional and the handler's dependencies are compatible with that runtime.

## Grounding Sources

- Next.js docs — [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers). The canonical reference for the `route.ts` convention.
- Next.js docs — [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config). `dynamic`, `revalidate`, `runtime`, and the other per-route knobs.
- MDN — [Fetch API: Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response). The Web-standard interface Route Handlers implement.
- RFC 9110 — [HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110). Method semantics, status code semantics, header semantics. The contract Route Handlers honor.
- Vercel docs — [Edge Runtime API reference](https://vercel.com/docs/functions/runtimes/edge-runtime). The capability surface available to `runtime = 'edge'` handlers.
- Stripe docs — [Verifying webhook signatures](https://stripe.com/docs/webhooks#verify-events). The canonical example of the raw-body / verify-before-parse pattern that drives Route Handler webhook design.
- WHATWG Streams — [Streams Living Standard](https://streams.spec.whatwg.org/). The `ReadableStream` interface used for streaming responses.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Designing an internal mutation triggered only from this app's UI | `server-actions-design` | Server Actions are the right surface for in-app mutations — one declaration, no wire format, progressive enhancement. |
| Designing the broader REST/RPC contract: resources, versioning, pagination, error envelopes | `api-design` | api-design owns the contract; this skill owns the Next.js implementation surface that hosts the contract. |
| Understanding what each HTTP method or status code means in the abstract | `http-semantics` | http-semantics owns the protocol semantics; this skill owns honoring them in App Router. |
| Adding auth, locale, or header injection across many routes | `middleware-patterns` | middleware runs once before route resolution and applies to many routes; Route Handlers run per-route per-method. |
| The full webhook reliability story: idempotency, retries, dead-letter queues, replay protection | `webhook-integration` | webhook-integration owns the cross-vendor reliability discipline; this skill covers the endpoint surface only. |
| The cross-cutting streaming model: Web Streams, SSE, RSC streaming, backpressure | `streaming-architecture` | streaming-architecture covers streaming as a concept; this skill covers the Route Handler streaming surface specifically. |
| The serialization/directive mechanics of `'use client'` and `'use server'` | `client-server-boundary` | Different boundary — client-server-boundary is for the bundler's component split, not for HTTP endpoints. |
