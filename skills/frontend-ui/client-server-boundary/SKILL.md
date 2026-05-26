---
name: client-server-boundary
description: "Use when reasoning about the line at which execution context changes between a server runtime and a client runtime: what values can cross via serialization, what cannot, the directives that mark transitions (`'use client'`, `'use server'`), the difference between server-rendered HTML and a serialized component tree, the trust model that treats client input as adversarial, and the consequences of leaking server-only modules into client bundles. Do NOT use for when and where the UI is produced (use rendering-models), the HTTP wire protocol itself (use http-semantics), how to organize the frontend codebase (use frontend-architecture), or how to design the JSON shape of an API endpoint (use api-design)."
license: MIT
allowed-tools: Read Grep
metadata:
  # schema_version: protocol contract version this skill conforms to.
  # Integer 7 or 8. v8 is canonical (2026-05-26).
  schema_version: 8
  # version: skill content version (semver). Bumped when the instructional content changes.
  version: "1.0.0"

  # === v7 Classification (DEPRECATED 2026-05-26 — kept for back-compat only) ===
  # type: v7 classification — DEPRECATED, replaced by `operation`.
  # Legacy values: capability / workflow / router / overlay.
  type: capability
  # operation: cognitive operation enabled (Bloom-grounded). One of four closed values:
  # know (declarative — concepts, vocabulary, reference) /
  # do (procedural — step-by-step execution) /
  # decide (judgment — choosing, dispatching) /
  # modify (context injection — shapes how other skills execute).
  operation: do
  # category: v7 classification — DEPRECATED, replaced by `subject`.
  # Legacy values: foundations / engineering / design / quality / agent / product.
  category: engineering

  # === v8 Classification (5-axis model — see ADR-0017) ===
  # subject: primary browse shelf — what the skill teaches. One of nine closed values:
  # code-engineering / quality-assurance / frontend-ui / design-craft / agent-ops /
  # product-domain / knowledge-organization / meta-methods / data-analytics.
  subject: frontend-ui
  # domain: optional hierarchical sub-path within `subject`. Slash-delimited lowercase
  # kebab-case segments. Remove when flat `subject` is sufficient.
  domain: engineering/frontend
  # scope: deployment targeting. One of three closed values:
  # portable (any project) / workspace (this workspace only) /
  # project (one specific repo; requires populated `grounding` block).
  scope: workspace
  # owner: team handle, GitHub username, or tool name responsible for keeping this skill current.
  owner: skill-graph-maintainer
  # freshness: ISO date the skill body was last reviewed or updated.
  freshness: "2026-05-15"
  # drift_check: truth-source verification record. Object with required `last_verified`
  # (ISO date) and optional `truth_source_hashes`. Record hashes with:
  # `node scripts/skill-graph-drift.js --record --apply <skill-dir>`.
  drift_check: "{\"last_verified\":\"2026-05-15\"}"

  # === Eval-health: three orthogonal axes ===
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
  keywords: "[\"client server boundary\",\"serialization boundary\",\"use client directive\",\"use server directive\",\"React Server Components\",\"server actions\",\"RPC\",\"serializable types\",\"structured clone\",\"secret leakage\"]"
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: "[\"can I pass this function as a prop\",\"why is my server-only module in the client bundle\",\"what does 'use client' actually do\",\"is it safe to put this secret in a server component\",\"why won't this Date / Map / class serialize\"]"
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: "[\"decide whether a piece of data must cross the network or can stay server-only\",\"diagnose why a component marked as a server component is being shipped to the client\",\"review whether secrets in server code can leak through serialized props\",\"design which functions are exposed as server actions and which stay internal\"]"
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.boundary to indicate the confusable territory's owner.
  anti_examples: "[\"decide whether a route should be SSG or SSR (use rendering-models)\",\"design HTTP authentication headers (use http-semantics)\",\"design the JSON shape of an API response body (use api-design)\"]"
  # relations: typed graph edges to sibling skills. Six edge types:
  # related (adjacency for browse / co-routing expansion) /
  # boundary (exclude listed skills from co-routing when THIS skill wins — name is inverse
  #           to mechanic; write reason as "I own this exclusively over X", not "use X instead";
  #           rename to `suppresses` pending ADR-0018) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization; broader drives co-load, narrower does not).
  relations: "{\"related\":[\"rendering-models\",\"http-semantics\",\"frontend-architecture\",\"type-safety\",\"api-design\"],\"boundary\":[{\"skill\":\"rendering-models\",\"reason\":\"rendering-models owns the staging of work across build/request/stream/interaction. client-server-boundary owns the serialization frontier — what can cross between server code and client code. The two compose: any rendering model that emits a server-produced artifact for client consumption faces a boundary.\"},{\"skill\":\"http-semantics\",\"reason\":\"http-semantics owns the wire protocol (verbs, status codes, headers, caching). client-server-boundary is upstream — it decides what data exists at the boundary and how it is encoded into request and response bodies.\"},{\"skill\":\"api-design\",\"reason\":\"api-design owns the external API surface (versioning, REST/GraphQL choice, endpoint shape). client-server-boundary owns the in-program boundary between a unified frontend codebase's server and client halves — a tighter, framework-mediated boundary than a public API.\"},{\"skill\":\"type-safety\",\"reason\":\"type-safety owns the discipline of compile-time type checking. client-server-boundary is one of the places where the type system stops — values crossing the boundary lose their type until parsed.\"}],\"verify_with\":[\"type-safety\",\"api-design\"]}"

  # === v6+ Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Three governing properties of the boundary: (1) SERIALIZATION — values crossing must be expressible as bytes; the wire format (JSON, structured clone, RSC payload, FormData) determines which types survive and which must be reshaped; (2) DIRECTION — server→client emits trusted payloads to be consumed as data, client→server emits adversarial requests every byte of which must be parsed, validated, authenticated, authorized, rate-limited; (3) TRUST — the asymmetry is categorical: the server trusts itself, the client trusts what the server sent, the server trusts nothing the client said. Layered on top: directives (`'use client'`, `'use server'`, `import 'server-only'`) that make the boundary syntactically visible, leakage modes (server-only modules in client bundle, secrets in payloads, hidden imports) that an unmarked boundary creates.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Makes an always-present boundary into an object of explicit thought. The boundary always exists — even a PHP application with a templated HTML response has server and client runtimes separated by a wire protocol — but in older architectures it was implicit and easy to ignore. Modern frameworks with unified codebases (Next.js App Router, Remix) make the boundary live in the same file tree as the rest of the application, which makes it trivially crossable by accident — a server-only import in a component without `'use client'` ships the server module to the browser; a secret in a server component prop leaks via the RSC payload; a server action looks like a local function call but is an RPC handler facing a hostile caller. Without explicit discipline, a unified codebase silently leaks secrets, ships broken code, and trusts adversaries. The directives are the markers that make the boundary visible.
  # boundary: what this concept is NOT. Distinguishes from adjacent skills by naming the
  # MECHANISM that differs, not just the label. Universal terms only — no repo-specific nouns.
  boundary: |
    Distinct from rendering-models, which owns the staging of work across build/request/stream/interaction — client-server-boundary owns the serialization frontier (what can cross between server code and client code); the two compose, every rendering model that emits a server-produced artifact for client consumption faces a boundary. Distinct from http-semantics, which owns the wire protocol (verbs, status codes, headers, caching) — client-server-boundary is upstream, deciding what data exists at the boundary and how it is encoded into request and response bodies. Distinct from api-design, which owns the external API surface (versioning, REST/GraphQL choice, endpoint shape) — client-server-boundary owns the in-program boundary between a unified frontend codebase's server and client halves, a tighter framework-mediated boundary than a public API. Distinct from type-safety, which owns compile-time type checking — client-server-boundary is one of the places where the type system stops (values crossing lose their type until parsed on the other side).
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "The client-server boundary is to a unified codebase what an embassy boundary is to a city — both spaces exist in the same physical address, but inside the embassy the law of one country applies (server: full filesystem, secret access, database), outside the law of another applies (client: browser sandbox, no secrets), and everyone crossing must pass through documented customs (serialization) with their bags inspected (validation) and stamped (authentication)."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is that the boundary is invisible if the same TypeScript types appear on both sides. It is not. Types are a compile-time claim; the runtime boundary is a serialization-and-trust event regardless of what the type system says. A function passed as a prop from server to client is not actually a function on the client — it's an opaque RSC payload token that calls back across the network. A Date object on the server becomes a string on the client (in JSON) or a Date again (in structured clone) — but only structurally, not the same JavaScript identity. A server action invoked from a client component looks like `await sendEmail(formData)` but is an HTTP POST with a hostile caller on the other side. The misconception leads to architectures that pass classes, closures, or untrusted-input-shaped-as-User across the boundary and produce subtle runtime failures or security holes.
  # concept: legacy v5 nested Understanding block. DEPRECATED — flat fields above
  # (mental_model, purpose, boundary, analogy, misconception) win when both are present.
  concept: "{\"definition\":\"The client-server boundary is the line in a unified codebase at which execution context changes — between a server runtime (full filesystem, secret access, database connections) and a client runtime (browser, no filesystem, no server secrets, untrusted by the server). Anything that crosses the boundary must be serialized: encoded as bytes on one side, decoded into a value on the other. The boundary is marked by directives, enforced by the framework, and made invisible to the developer who treats it correctly.\",\"mental_model\":\"|\",\"purpose\":\"|\",\"boundary\":\"|\",\"taxonomy\":\"|\",\"analogy\":\"|\",\"misconception\":\"|\"}"
  # === Export provenance (set by the export pipeline; do not hand-author) ===
  # skill_graph_protocol is a content-label claim distinct from `schema_version` semantics.
  # See AGENTS.md § Version Labels Are Earned, Not Bumped.
  skill_graph_source_repo: "https://github.com/jacob-balslev/skill-graph"
  skill_graph_protocol: Skill Metadata Protocol v5
  skill_graph_project: Skill Graph
  skill_graph_canonical_skill: skills/client-server-boundary/SKILL.md
  # === Health Block (written by the audit loop, not hand-authored) ===
  # See SKILL_AUDIT_LOOP.md § The Health Block. UNVERIFIED is the honest default.
  #
  # structural_verdict: form/export shape (gates 1-2, 7 — external mandates only).
  # PASS / PASS_WITH_FIXES / FAIL / UNVERIFIED.
  structural_verdict: UNVERIFIED
  # truth_verdict: truth sources vs declared hashes (gates 3-6).
  # PASS / DRIFT / BROKEN / UNVERIFIED.
  truth_verdict: UNVERIFIED
  # comprehension_verdict: gate 8 — cheap recitation smoke test. Never alone certifies.
  # PASS / SHALLOW / REDUNDANT / UNVERIFIED / PROVISIONAL / SKIPPED_BASELINE_HIGH / NA.
  comprehension_verdict: UNVERIFIED
  # application_verdict: gate 9 — the primary quality signal. APPLICABLE is the only verdict
  # that certifies the skill is USEFUL (grader-confirmed). PROVISIONAL = one model self-assessed.
  # APPLICABLE / REDUNDANT / HARMFUL / MIXED / FALSE_POSITIVE / PROVISIONAL / UNVERIFIED.
  application_verdict: UNVERIFIED
---

# Client-Server Boundary

## Coverage

The line in a unified codebase at which execution context changes between server and client. Covers the three governing properties (serialization, direction, trust), the wire formats currently in use (JSON, structured clone, RSC payload, FormData), the directives that mark the boundary (`'use client'`, `'use server'`, framework-specific equivalents), the trust asymmetry that makes client→server crossings categorically different from server→client, the leakage modes (server-only modules, secrets, hidden imports) that an unmarked boundary creates, and the misconceptions that arise from treating the boundary as either invisible or as a TypeScript-checked contract.

## Philosophy

The boundary always exists. Even an old PHP application with a templated HTML response has a server runtime and a client runtime separated by a wire protocol; the boundary is the network. What modern frameworks add is not the boundary itself, but the markers that make it visible — directives that say "this code is for over there" and serializers that say "these bytes will arrive on the other side as this shape."

The discipline of the boundary is to take seriously the asymmetry between sides:

- Server code can read secrets; client code cannot.
- Server code receives requests; client code makes them.
- Server code trusts itself; client code is trusted by the server only after validation.
- Server code can import any module; client code can import only what the bundler shipped.

A program that treats the two sides as interchangeable will leak secrets, ship broken code, and trust adversaries. A program that marks the boundary explicitly will pay a small upfront cost in ceremony and gain a large benefit in legibility and refactor safety.

The goal of this skill is to make the boundary an object of explicit thought — not a thing to work around, but a thing to design with.

## Directives — The Boundary Made Syntactic

| Directive | Where it goes | What it means |
|---|---|---|
| `'use client'` | Top of a `.tsx` or `.ts` file | This file is the first client module in its import graph. Everything it imports becomes part of the client bundle. The framework will server-render it for first paint, then ship it to the client. |
| `'use server'` | Top of a `.ts` file or first line of a function body | The functions in this file (or this specific function) become server actions — RPC handlers callable from the client. The function body executes on the server; the client invokes it via a network call. |
| `import 'server-only'` | A line at the top of a server-intended module | A static import that causes the bundler to error if this module ends up in the client bundle. A guardrail, not a directive. |
| `import 'client-only'` | A line at the top of a client-intended module | Symmetric: errors if the module ends up in the server bundle. Useful for code that touches `window`, `document`, or other browser-only globals. |

The directives are not the boundary; they are the marks that make the boundary visible. A file without `'use client'` in an App Router project is implicitly a server component — the absence is meaningful.

## Serialization — What Can Cross

| Wire format | Allowed types | Disallowed types |
|---|---|---|
| Plain JSON | string, number, boolean, null, plain objects, arrays | undefined, functions, Dates (become strings), Maps, Sets, Symbols, BigInts, class instances, circular references |
| Structured clone (postMessage, IndexedDB) | All JSON + Date, RegExp, Blob, File, FileList, ImageData, Map, Set, ArrayBuffer, typed arrays | Functions, DOM nodes, Error objects (partial), class instances with non-cloneable internals |
| RSC payload (React Server Components) | All structured-clone + Promises, JSX trees, server-action function references (as opaque tokens) | Arbitrary closures, classes with private fields, host-environment-bound objects |
| FormData (multipart/form-data) | string key/value, File/Blob | Nested structure (must encode as JSON inside a string field), non-string non-file values |

The practical rule: **if you cannot describe the value in terms of bytes, it cannot cross.** A `Map<string, User>` can cross structured-clone but not JSON; serialize to an array of `[key, value]` pairs for JSON.

## Trust — The Asymmetric Boundary

The two directions across the boundary have categorically different trust profiles.

**Server → client.** The server emits a payload. The payload is trusted by its producer (the server) and consumed as data by the client. The client cannot tamper with the payload in transit (TLS), but can read everything inside it and use the contents however the client code chooses.

Implications:
- Do not put server secrets in the payload. The client will see them.
- Do not assume the client will *not* call a function in the payload. If the payload says "this user is an admin," the client UI may render an admin panel; if a security check depends on it, that check must be repeated on the server.
- The payload is a window into the server's state model. Keep it minimal.

**Client → server.** The client emits a request. The request crosses the trust boundary; every byte is adversarial. The server must:

- Parse the request structurally (the bytes may not be the expected shape).
- Validate the contents semantically (the values may not be in the expected range).
- Authenticate the requester (cookies, tokens — themselves potentially forged).
- Authorize the action (the authenticated requester may not have permission for this operation).
- Rate-limit (the client may be a script).

Server actions look like local function calls when invoked from a client component. They are not. They are RPC handlers with a network in front of them and a hostile caller on the other side of the network.

## Common Leakage Modes

| Leakage mode | What goes wrong | How to prevent |
|---|---|---|
| Secret in a shared module | `process.env.SECRET` is referenced in a module imported by both server and client; the secret name (and possibly value) ends up in the client bundle | Import the secret only in modules guarded by `import 'server-only'`; or read it inside a server action / route handler where the import graph cannot leak |
| Server-only API in a client bundle | `fs.readFileSync` or `pg.Client` is imported into a `'use client'` component; build fails or runtime crashes | Mark client components with `'use client'`; mark server-only utilities with `import 'server-only'`; the bundler's static analysis catches the leak |
| Untyped client→server validation gap | A server action accepts an argument typed as `{ userId: string }`; the client constructs a payload with `{ userId: 123 }`; the server crashes or, worse, queries with `123` and accidentally exposes another user's data | Validate every server-action argument with a runtime schema (Zod, valibot); never trust the TypeScript types of an RPC handler |
| Trusted-by-default client claim | A server action checks `if (req.userRole === 'admin') ...` where `req.userRole` came from the client (via cookie, header, or body) | Re-derive trust from the server's authoritative source (the session record, the database, the IdP) — never from the client's self-report |
| Non-serializable value in props | A `'use client'` component receives a server-built `Map<string, User>` as a prop; the RSC serializer can encode it, but a misconfigured project on plain JSON cannot — silent data loss or runtime crash | Test the serialization shape in code review; convert to plain objects at the boundary; or upgrade to a wire format that supports the type |
| Closure leakage attempt | A server component constructs `() => doSomething()` and tries to pass it to a client component as a prop | Use a `'use server'` function (which serializes as an RPC reference) or pass the data the function uses and reconstruct the behavior on the client |

## RSC Server Actions — A Worked Example

```typescript
// app/actions.ts
'use server';

import { z } from 'zod';
import { requireSession } from '@/lib/auth';
import { db } from '@/lib/db';

const UpdateNameInput = z.object({
  userId: z.string().uuid(),
  name: z.string().min(1).max(100),
});

export async function updateUserName(rawInput: unknown) {
  // 1. Authenticate the caller (server-only source of truth)
  const session = await requireSession();

  // 2. Validate the input (the bytes from the client may be anything)
  const input = UpdateNameInput.parse(rawInput);

  // 3. Authorize the action (the authenticated user may not be allowed to do this)
  if (session.userId !== input.userId && !session.isAdmin) {
    throw new Error('not allowed');
  }

  // 4. Perform the action
  await db.user.update({
    where: { id: input.userId },
    data: { name: input.name },
  });
}
```

```typescript
// app/profile/edit.tsx
'use client';

import { updateUserName } from '@/app/actions';

export function EditProfile({ userId }: { userId: string }) {
  return (
    <form action={async (formData) => {
      await updateUserName({
        userId,
        name: formData.get('name'),
      });
    }}>
      <input name="name" />
      <button type="submit">Save</button>
    </form>
  );
}
```

The shape of this code embeds the boundary's three properties:

- **Serialization** — the `formData` is a `FormData` (the wire format for a form submission), unwrapped to a plain object before the action is invoked.
- **Direction** — the form is client→server; everything in `rawInput` is potentially adversarial.
- **Trust** — the session is the server's authoritative claim about who is calling; `input.userId` is the client's claim about who to operate on; the authorization check compares the two.

A version of this code that skipped the schema parse, used the session's `userId` as if it were the same as `input.userId`, or trusted a client-supplied `isAdmin` claim would have a vulnerability at the boundary.

## Verification

After applying this skill, verify:
- [ ] Every file that ships to the client has `'use client'` (or is reachable only through client imports) — the implicit-server default is intentional, not accidental.
- [ ] Every server action has `'use server'` at the function or file level — the function's network reachability is explicit.
- [ ] Server actions validate input with a runtime schema (Zod, valibot, io-ts) — types from TypeScript are not validation.
- [ ] Server actions re-derive trust from a server-authoritative source (session, JWT verification, database lookup) — client-supplied trust claims are never accepted.
- [ ] Modules holding secrets import `'server-only'` — the bundler will error if they leak.
- [ ] Modules touching `window`, `document`, or other browser globals import `'client-only'` — symmetric guardrail.
- [ ] Props passed from server to client components are serializable in the project's wire format — verified by build success and by code review for non-trivial types (Maps, class instances, Dates).
- [ ] FormData payloads with nested structure are validated after parsing — no `as` casts of `JSON.parse` results.
- [ ] No closures cross the boundary — only data, server-action references, and RSC primitives.
- [ ] Authentication, authorization, and rate-limiting live inside server actions and route handlers, not in client components.

## Do NOT Use When

| Instead of this skill | Use | Why |
|---|---|---|
| Deciding when and where the UI is produced (CSR/SSR/SSG/RSC) | `rendering-models` | rendering-models owns the staging decision; client-server-boundary owns the serialization frontier — they compose but are distinct |
| Designing HTTP caching, status codes, content negotiation | `http-semantics` | http-semantics owns the wire protocol; client-server-boundary owns what data exists at the boundary |
| Organizing the frontend folder layout and module structure | `frontend-architecture` | frontend-architecture is wider — it includes state management, component layering, feature boundaries; the client-server-boundary is one axis it touches |
| Designing the JSON shape of an external API | `api-design` | api-design owns external surface contracts; client-server-boundary is the internal boundary inside a single application |
| Choosing between Zod / valibot / io-ts as a runtime validator | individual library docs + `api-design` | library choice is below this skill |
| Enforcing TypeScript discipline inside the program | `type-safety` | type-safety owns compile-time discipline; the boundary is one of the places where type safety stops |

## Key Sources

- React team. [React Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md). Proposed Dec 2020. The canonical specification of the RSC wire format, including the rules for what can be serialized across the boundary and the role of `'use client'` / `'use server'`.
- Sebastian Markbåge (React core). ["The Future of Web Software Is Server Components"](https://www.youtube.com/watch?v=zMf_xeGPn6s). 2022 talk. The mental model of the boundary as a serialization protocol rather than a deployment topology.
- Vercel. [Next.js documentation — Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components). Reference for `'use client'` / `'use server'` semantics, the `server-only` and `client-only` packages, and the serialization rules in App Router.
- WHATWG. [HTML Living Standard — Structured clone algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#structured-clone). Specification of the broader-than-JSON serialization set used by postMessage, IndexedDB, and Worker boundaries.
- Mark Erikson. ["Why React Server Components Are Important"](https://blog.isquaredsoftware.com/2023/04/whats-the-deal-with-react-server-components/). 2023. Practitioner-level explanation of the boundary's implications for bundle size, hydration, and the framework-author contract.
- Remix team. [Loader and Action documentation](https://remix.run/docs/en/main/route/loader). Reference for the function-named boundary convention that predates and informs RSC's directive-based model.
- OWASP. [Top 10:2021 — A01:2021 Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/). The class of vulnerabilities that arise specifically from treating client-supplied trust claims as authoritative — the failure mode this skill exists to prevent.
- Hejlsberg, A. et al. [TypeScript Handbook — Type assertions and the `unknown` type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions). The explicit acknowledgement that `as` casts do not validate at runtime — the gap that boundary-crossing validation must fill.
