# Upstream Displacement Check — 2026-06-07

## Result

No displacement found. React and Next.js provide the primitives this skill teaches, but they do not replace the design judgment the skill owns: choosing boundary granularity, pairing loading and error UI, avoiding waterfalls, preserving static shells, and deciding when transitions should keep previous content visible.

## Sources Checked

- React `<Suspense>` docs, checked 2026-06-07: React 19.2 docs say `<Suspense>` displays a fallback while children load, coordinates reveal groups, supports nested progressive reveal, and integrates with streaming server rendering and selective hydration.
- React `use` docs, checked 2026-06-07: `use(promise)` integrates with Suspense and Error Boundaries, can be called in loops/conditionals, and lets a Client Component unwrap a Promise passed from a Server Component as long as the resolved value is serializable.
- React `useTransition` / `startTransition` docs, checked 2026-06-07: transitions mark state updates as non-blocking, can preserve already revealed UI, execute their callback immediately, and require extra `startTransition` wrapping for state updates after `await`.
- React `lazy` docs, checked 2026-06-07: code-splitting through `lazy` still relies on a Suspense boundary for the loading UI, so code splitting complements rather than replaces boundary design.
- React class component docs, checked 2026-06-07: function components still cannot directly be Error Boundaries; React points to writing a class boundary or using `react-error-boundary`.
- Next.js `loading.js` / `loading.tsx` docs, checked 2026-06-07: a segment loading file creates instant loading UI with Suspense, wraps the page and nested children below that segment, and has important layout/runtime-data caveats.
- Next.js `useSearchParams` docs and error docs, checked 2026-06-07: a static Client subtree using `useSearchParams()` needs a Suspense boundary to preserve the static shell and avoid a full client-rendering bailout or production-build error.

## Interpretation

The current first-party primitives make the skill more important, not redundant. React and Next.js document what each primitive does; this skill teaches how to combine them into a loading-state architecture for a real component tree. No native release removes the need for that decision discipline.
