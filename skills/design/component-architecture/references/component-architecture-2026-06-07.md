# Component Architecture Source Review

Last reviewed: 2026-06-07

## Primary sources checked

- Radix Primitives overview: https://www.radix-ui.com/primitives/docs/overview/introduction
- Radix Primitives composition guide: https://www.radix-ui.com/primitives/docs/guides/composition
- React Aria getting started: https://react-aria.adobe.com/getting-started
- shadcn/ui docs: https://ui.shadcn.com/docs
- Vue slots docs: https://vuejs.org/guide/components/slots.html
- React `forwardRef` reference: https://react.dev/reference/react/forwardRef

## Current synthesis

- Radix still frames primitives as accessible, unstyled, customizable building blocks for design systems, with `asChild` as a composition mechanism. Its composition guide requires custom leaf components to spread props and remain ref-compatible.
- React Aria currently emphasizes unstyled component parts, reusable wrappers, state data attributes, custom styling, and accessibility-first behavior.
- shadcn/ui currently frames itself as a code distribution platform and "how you build your component library," not a traditional installed package component library.
- Vue slots remain a useful cross-framework example of parent-provided structure, named slots, scoped slots, and renderless component trade-offs.
- React 19 changes ref guidance: new components can receive `ref` as a prop; `forwardRef` remains relevant for React 18 compatibility and libraries that still expect it.

## Content decisions

- Keep the skill focused on reusable component API structure, not design-system governance or visual language selection.
- Keep the primitive/composite/product-assembly layering model, but sharpen routing examples so component-library architecture wins over single-product module composition.
- Add `color-system-design` and `form-ux-architecture` as boundary owners for same-subject routing negatives.
- Update ref language from "ref forwarding" as universal guidance to "ref exposure / imperative handles" with React 19 compatibility nuance.
- Treat external truth as `EXTERNAL_UNHASHED`; the local source review is hashable, but official docs remain external.

## Skill Graph lens findings

- Routing positives need the words `component architecture`, `component API`, or `component library` when adjacent design skills are dense.
- Anti-examples should use active same-subject owners where possible; cross-subject boundaries can conflict with lint expectations even when conceptually valid.
- The status command still reports `conceptScope repo_specific_or_unknown` for a portable design skill with v8 `scope`.
