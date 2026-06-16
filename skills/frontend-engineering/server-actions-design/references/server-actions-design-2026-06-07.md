# Server Actions Design Source Review - 2026-06-07

## Sources Checked

- Next.js 16.2 docs, `Mutating Data`: Server Functions can be called from the client through network requests, are called Server Actions in mutation contexts, use POST behind the scenes, and are reachable via direct POST requests.
- Next.js 16.2 docs, `use server`: module-level directives expose file exports as server-side functions; Client Components import Server Functions from a dedicated module-level `'use server'` file; inline use is supported in Server Components.
- Next.js 16.2 docs, `Data Security`: exported Server Actions create public HTTP endpoints; secure action IDs and dead-code elimination reduce exposure but do not remove the need for validation, authentication, authorization, and rate limiting.
- Next.js 16.2 docs, `serverActions`: `allowedOrigins` extends the same-origin invocation list; `bodySizeLimit` defaults to 1 MB and can be configured.
- Next.js 16.2 docs, cache/navigation functions: `revalidatePath`, `revalidateTag`, `updateTag`, `refresh`, and `redirect` have different contexts and freshness semantics.
- React docs, `useActionState`: form usage passes previous state and submitted `FormData` to the action wrapper.
- React docs, `useFormStatus`: status is scoped to a parent form and includes pending state.

## Content Updates Made

- Updated terminology from Server Actions-only wording to React Server Functions as the umbrella term, while preserving Server Actions for mutation/action contexts.
- Added explicit public-endpoint semantics and direct POST reachability to the teaching body.
- Added `updateTag`, `refresh`, `allowedOrigins`, and `bodySizeLimit` coverage.
- Clarified bound arguments and closures: useful for call-site design, not authority, and not a place to hide secrets.
- Removed stale references to `useFormState` except as a routing trigger near `useActionState`.
- Replaced suppressive `relations.boundary` edges with `related` and `verify_with` links so read-path, client/server-boundary, API, form UX, hook, and security skills can still co-route when relevant.

## Audit Verdict Notes

- Truth remains `UNVERIFIED` because the grounding sources are external docs without local truth-source hashes.
- Comprehension and application remain `UNVERIFIED` because external evaluators were not approved for private skill content in this run.
