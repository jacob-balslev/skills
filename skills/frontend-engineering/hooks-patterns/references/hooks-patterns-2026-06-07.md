# Hooks Patterns Source Review

Last reviewed: 2026-06-07

## Primary sources checked

- React Rules of Hooks: https://react.dev/reference/rules/rules-of-hooks
- React exhaustive-deps lint: https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps
- React You Might Not Need an Effect: https://react.dev/learn/you-might-not-need-an-effect
- React Reusing Logic with Custom Hooks: https://react.dev/learn/reusing-logic-with-custom-hooks
- React `useEffectEvent`: https://react.dev/reference/react/useEffectEvent
- React `useMemo`: https://react.dev/reference/react/useMemo
- React `useCallback`: https://react.dev/reference/react/useCallback
- React `memo`: https://react.dev/reference/react/memo
- React 18 working group automatic batching: https://github.com/reactwg/react-18/discussions/21

## Current synthesis

- The Rules of Hooks remain call-order rules: Hooks must be called at top level from React functions or custom Hooks.
- The current `exhaustive-deps` lint frames dependency arrays as a stale-closure prevention contract; fighting the linter usually means restructuring the code.
- Current React docs still strongly support "you might not need an Effect": use effects for synchronization with external systems, not for derived render data.
- `useEffectEvent` is now a documented React hook for reading latest props/state from Effects without making those reads reactive dependencies. Effect Events must not be included in dependency arrays.
- React Compiler changes memoization guidance: `memo` is applied automatically to many components, reducing the need for manual `memo`; manual `useMemo` and `useCallback` remain useful for expensive computation, stable dependencies, or code not covered by the compiler.
- React 18 automatic batching remains relevant for hook reasoning in asynchronous callbacks.

## Content decisions

- Keep call-order slots, closure dependencies, derived-vs-stored state, and custom-hook extraction as the core teaching model.
- Update stale `useEffectEvent` language from RFC/partial to current documented Effect Events.
- Update memoization guidance to include `memo` and React Compiler's effect on manual memoization.
- Add same-subject routing boundaries for `rendering-models`, `client-server-boundary`, `state-management`, and `suspense-patterns`.
- Treat external truth as `EXTERNAL_UNHASHED`; the local source review is hashable, but official docs remain external.

## Skill Graph lens findings

- Hooks prompts must include explicit `React Hooks`, `useEffect`, `dependency array`, `custom hook`, or memoization language to beat nearby frontend skills.
- Same-subject red herrings for server/client boundary, state location, rendering model, and Suspense are necessary because all of those tasks mention React components but are not hook-semantics work.
- The status command still reports `conceptScope repo_specific_or_unknown` for a portable frontend skill with v8 `scope`.
