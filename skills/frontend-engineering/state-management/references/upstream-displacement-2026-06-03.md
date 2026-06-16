# Upstream Displacement Check — 2026-06-03

## Scope

Checked whether the state-management skill is now superseded by a first-party or widely adopted platform capability that makes the skill unnecessary.

## Sources Checked

- React official docs: `https://react.dev/learn/managing-state`
- React official docs: `https://react.dev/learn/sharing-state-between-components`
- React official docs: `https://react.dev/learn/choosing-the-state-structure`
- TanStack Query official React overview: `https://tanstack.com/query/docs/docs`
- SWR official docs: `https://swr.vercel.app/docs/advanced/understanding`
- SWR official docs: `https://swr.vercel.app/docs/revalidation`
- nuqs official docs: `https://nuqs.dev/`

## Result

No displacement found. The official sources reinforce the skill's classification model instead of replacing it:

- React still teaches state structure, lifting state, and sharing state as design decisions.
- TanStack Query and SWR are implementation tools for server state; they do not decide whether a value is server state, client UI state, URL state, or persistent state.
- nuqs implements URL-backed state ergonomics; it does not replace the upstream decision of whether a value belongs in the URL.

## Recommendation

Keep the skill. Reframe was not needed; the useful delta is still the decision discipline that comes before picking React state primitives, a server-state library, or a URL-state library.
