---
name: dark-mode-implementation
# description: routing-facing summary of when this skill activates and what it covers.
description: "Use when implementing dark mode — prefers-color-scheme detection, theme persistence, flash-of-unstyled-theme prevention, color token mirroring, image and asset variants, and meta theme-color updates. Do NOT use for designing the dark palette itself, designing the token architecture, or generic theme-switching across more than two themes."
# license: SPDX-compatible license identifier for the skill content.
license: CC-BY-4.0
# metadata: Skill Metadata Protocol fields encoded under Agent Skills-compatible frontmatter.
metadata:

  # === v8 Classification (subject + public; polyhierarchy via subjects[]) — see ADR-0017 ===
  # subject: primary browse shelf — what the skill teaches. One of twelve closed values:
  # backend-engineering / frontend-engineering / software-architecture / data-engineering / agent-ops / ai-engineering /
  # quality-assurance / design / reasoning-strategy / software-engineering-method / knowledge-organization / product-domain.
  subject: design
  # public: publishability/private-data gate. Boolean.
  # true = publishable/shareable; false = private and excluded from public export.
  # Project anchoring is carried separately by non-empty `project[]` plus `grounding`.
  public: true
  # scope: free-text PRD-style statement of what the skill teaches and what it excludes.
  # (v8 required; not an enum). Mirrors Coverage + Do NOT Use When at frontmatter level.
  scope: "Implementing dark mode — prefers-color-scheme detection, theme persistence, flash-of-unstyled-theme prevention, color-token mirroring, image/asset variants, and meta theme-color updates. Portable across any web UI; principle-grounded, not repo-bound. Excludes designing the dark palette itself (color-system-design), token-architecture design, and generic theme-switching across more than two themes."
  # taxonomy_domain: optional hierarchical sub-path within `subject`. Slash-delimited
  # lowercase kebab-case segments. rename of the original v8 `domain`. Remove when the flat
  # `subject` is sufficient.
  taxonomy_domain: design/visual
  # stability: lifecycle marker. One of:
  # experimental (active development) / stable (production-ready) /
  # frozen (no further changes expected) / deprecated.
  # When `deprecated`, schema's allOf REQUIRES `superseded_by: <real-skill-name>`.
  stability: experimental
  # keywords: semantic phrases for fuzzy router activation. v8 cap: max 10.
  # Keep terms a user would actually type when starting a task in this skill's domain.
  keywords: ["dark mode","prefers-color-scheme","theme persistence","flash of unstyled theme","flash of incorrect theme","color-scheme css property","meta theme-color","dark mode images","picture source media","system theme detection"]
  # triggers: explicit-match activation phrases the router fires on literally.
  # Use when label-based routing is intended; usually keywords + examples are enough.
  triggers: ["dark mode","prefers-color-scheme","light dark toggle","system theme","FOUC dark mode"]
  # examples: 2-5 realistic user prompts the skill SHOULD activate for.
  # Written in the user's voice. Improves retrieval recall beyond keywords alone.
  examples: ["Add a dark mode toggle with system / light / dark options and persist the user's choice","Eliminate the white flash that appears for a moment when a dark-mode user loads the page","Provide dark variants of the marketing illustrations and the favicon"]
  # anti_examples: near-miss prompts that should route ELSEWHERE.
  # Pair with relations.suppresses (or legacy boundary alias) to name the confusable territory's owner.
  anti_examples: ["Pick the dark mode color palette values","Design the three-tier token architecture","Build a multi-brand theme system with five themes"]
  # relations: typed graph edges to sibling skills. Current fields:
  # related (adjacency for browse / co-routing expansion) /
  # suppresses (exclude listed skills from co-routing when THIS skill wins; write reason
  #             as "I own this exclusively over X", not "use X instead") /
  # boundary (DEPRECATED alias of suppresses, retained for unmigrated skills) /
  # verify_with (cross-check; co-loaded as one-hop expansion) /
  # depends_on (composition; transitive — A→B→C loads all three) /
  # broader / narrower (SKOS-style generalization) /
  # disjoint_with (mutual exclusion for incompatible ownership).
  relations: "{\"related\":[\"theme-system-design\",\"color-system-design\",\"a11y\",\"frontend-architecture\"],\"suppresses\":[{\"skill\":\"color-system-design\",\"reason\":\"dark-mode-implementation owns the runtime wiring of a two-state light/dark switch — detection, persistence, flash prevention, asset variants, and browser-chrome hints; the dark palette values and their contrast pairings are color-system-design's responsibility, which this skill consumes.\"}],\"verify_with\":[\"a11y\"]}"

  # === Understanding fields (when comprehension_state: present) ===
  # mental_model: the primitives of the concept and how they relate. One paragraph.
  mental_model: |
    Dark mode is a two-state runtime switch over an already-designed palette, and it is settled by five concerns, each with a defined web-platform primitive: (1) DETECTION — read the user's preference from prefers-color-scheme (system) and from a persisted explicit choice (localStorage/cookie), with three user-facing states System/Light/Dark; (2) FIRST-PAINT APPLICATION — set the theme on <html> synchronously before stylesheets resolve (a blocking inline script in <head>, or the server serializing the resolved theme) so there is no flash of the wrong theme; (3) RUNTIME PROPAGATION — toggle a class or data attribute that paired custom properties (or light-dark()) respond to, plus the CSS color-scheme property so native controls render correctly; (4) ASSET VARIANTS — dark versions of brand-color raster images (<picture> media), currentColor/custom-property SVGs, favicon, and themed iframes/videos; (5) BROWSER-CHROME HINTS — meta theme-color paired per scheme for the address bar, toolbar, and PWA splash. The explicit user choice always overrides the system, and "System" is a distinct third state, not the absence of a saved preference.
  # purpose: the problem this concept solves and why the field exists. One paragraph.
  purpose: |
    Treating dark mode as a stylesheet swap produces a dark mode that technically toggles but flashes the wrong theme on cold load, leaves native form controls and scrollbars light, ships invisible dark-on-dark logos, and forgets the user's explicit choice on the next visit. This skill exists to make dark mode a correct runtime integration: the right theme paints on the very first frame, the user's choice persists and outranks the OS, color-sensitive assets have real dark variants, and the browser chrome matches the active theme. It is the operational layer that takes a palette someone else designed and makes it switch flawlessly in a real browser, including the platform edge cases (color-scheme, light-dark(), meta theme-color, <picture> media) that a CSS-only approach silently misses.
  # concept_boundary: what this concept is NOT. Distinguishes from adjacent skills by naming
  # the MECHANISM that differs, not just the label. Canonical replacement for top-level `boundary`.
  concept_boundary: |
    This is NOT choosing the dark palette values or their contrast pairings — that is color-system-design, whose tokens this skill consumes. It is NOT designing the token architecture (the three-tier structure, the per-theme resolution machinery) that makes theming possible — that is theme-system-design. It is NOT a general multi-theme system: this skill owns the two-state light/dark case and its platform integrations; three-or-more visual modes / multi-brand white-label belong to theme-system-design. It is NOT WCAG criterion lookup (a11y) and NOT debugging one component that looks wrong after the system is otherwise complete (component-level debugging). It owns the runtime: detect, apply-before-paint, persist, propagate, swap assets, and hint the chrome.
  # analogy: one-sentence metaphor preserving the core mechanism.
  analogy: "Dark mode implementation is to a designed dark palette what a building's automatic day/night lighting controller is to the fixtures an electrician already chose — it does not select the bulbs or set their brightness (the palette), but it senses dusk, remembers the override switch the resident flipped last night, turns everything to the right setting the instant they walk in (no flicker), and also dims the exterior signage and porch lamps to match (the assets and chrome)."
  # misconception: the wrong mental model people bring; corrected explicitly.
  misconception: |
    The wrong mental model is "dark mode is a CSS-only re-skin — add a [data-theme=dark] selector and override some colors." That model misses everything that makes dark mode feel finished and correct: the flash of the wrong theme on cold load (because the default light paints before the persisted preference applies — fixed only by a blocking pre-paint script or server-serialized theme), the color-scheme property that native controls need, dark mode being a parallel design surface (shadows become borders/elevated tints, focus rings and chart palettes need rethinking), real dark asset variants for brand-color images and the favicon, the meta theme-color for mobile chrome, and persistence where the user's explicit choice outranks the OS and "System" is a true third state. Dark mode is a runtime integration, not a stylesheet.
---
# Dark Mode Implementation

## Concept of the skill

Dark mode implementation is the discipline of making a two-state light/dark switch work flawlessly in a real browser over a palette that has already been designed elsewhere. It is settled by five concerns, each with a well-defined web-platform primitive: **detection** of the user's preference (the `prefers-color-scheme` media query for the system default, plus a persisted explicit choice in localStorage or a cookie, exposed as the three states System / Light / Dark); **first-paint application**, where the resolved theme is set on `<html>` synchronously before stylesheets resolve — via a small blocking inline script in `<head>` or server-side serialization — so the user never sees a flash of the wrong theme; **runtime propagation** through a class or data attribute that paired custom properties (or the `light-dark()` function) respond to, alongside the CSS `color-scheme` property so native form controls, scrollbars, and the page background render correctly; **asset variants** for color-sensitive content — dark raster images via `<picture>` media, `currentColor`/custom-property SVGs, a dark favicon, themed iframes and videos; and **browser-chrome hints** via a per-scheme `meta theme-color` for the mobile address bar, Safari toolbar, and PWA splash. Throughout, the explicit user choice overrides the system preference, and "System" is a genuine third state rather than the absence of a saved choice. The skill's job is to make dark mode a correct runtime integration rather than a stylesheet swap.

## Coverage
A dark mode implementation handles five concerns: detecting the user's preference (system, explicit choice, persisted choice), applying the right theme before first paint, propagating theme changes at runtime, swapping color-sensitive assets, and updating browser-chrome hints. Each has well-defined web platform primitives.

Detection uses the prefers-color-scheme media query (window.matchMedia('(prefers-color-scheme: dark)')), which reflects the operating system or browser-level preference. Most products offer three user choices — System, Light, Dark — where System defers to the media query and the other two override it. The chosen mode is persisted (localStorage or a cookie) and read on every load. The CSS color-scheme property tells the user agent which schemes a page supports, enabling correct rendering of native form controls, scrollbars, and the default page background; declare color-scheme: light dark on :root for sites that support both.

Flash-of-incorrect-theme (sometimes called FOUC for theme) occurs when the browser paints the light default before the persisted dark preference is applied. The fix is a small, blocking inline script in <head> that reads the persisted preference and sets a class or data attribute on <html> synchronously before stylesheets resolve. Frameworks with server-side rendering must serialize the resolved theme into the HTML response, often by reading a cookie on the server.

The CSS Color Module Level 5 light-dark() function (light-dark(white, black)) lets a property declare both schemes inline and the user agent picks based on color-scheme. This is supported in current browsers and reduces the boilerplate of paired custom properties for simple cases; for token-driven systems, paired :root and [data-theme="dark"] custom property assignments remain the typical approach.

Asset handling covers three categories. Raster images that have brand-color elements need dark variants delivered via <picture> with <source media="(prefers-color-scheme: dark)"> (the markup-driven approach) or via CSS background-image swapping. SVG illustrations can use currentColor or CSS custom properties for fill/stroke and update automatically. Favicons can declare a dark variant via <link rel="icon" media="(prefers-color-scheme: dark)" href="...">. Embedded videos and iframes (YouTube, Maps) often have their own theme parameter that needs to be passed via URL.

Browser chrome hints include the meta theme-color tag (<meta name="theme-color" content="..." media="(prefers-color-scheme: dark)">), which sets the address bar color on mobile browsers, the Safari toolbar tint, and the PWA splash screen. Pair it with a light variant via media= so the chrome matches the active theme. Apple-specific apple-mobile-web-app-status-bar-style is now overridden by theme-color on supported versions.

## Philosophy of the skill
Dark mode is not a re-skin; it is a parallel design surface. Image contrast, shadow strategy (shadows on dark backgrounds work differently — often replaced with subtle borders or elevated background tints), focus ring visibility, and chart palettes all need attention. Treating dark mode as a CSS-only change produces a dark mode that technically works and feels half-finished.

The user's explicit choice overrides the system. A user who has toggled to Dark on your site once expects Dark on the next visit regardless of what their OS is doing. Persistence is not optional, and a System option is a separate, third state from "no preference saved."

## Verification
- No flash of incorrect theme occurs on cold load for a dark-mode user; verified by throttling network and watching the first paint.
- The CSS color-scheme property is declared on :root with the schemes the page supports, so native form controls render correctly in dark mode.
- Brand-color images (illustrations, hero photos with light backgrounds) have dark variants delivered via <picture> source matching or equivalent.
- The meta theme-color tag has paired light and dark variants and matches the active theme.
- The favicon has a dark variant where the design needs it (e.g., dark logos on transparent backgrounds become invisible against dark browser tabs).
- The user's explicit choice (light/dark/system) is persisted and restored across reloads; toggling away from System and back is observable.
- All interactive states (focus rings, hover, selected) are visible in dark mode and meet contrast requirements; verified visually and via automated contrast testing.

## Do NOT Use When
- The task is choosing the dark palette values themselves. Use color-system-design.
- The work is defining the token architecture that makes theming possible. Use theme-system-design.
- The product requires more than two themes (multi-brand white-label, three or more visual modes). Use theme-system-design for the architecture; this skill covers the dark-specific platform integrations only.
- You are auditing for WCAG contrast violations specifically. Use a11y for the criteria; the palette decisions come from color-system-design.
- The bug is a single component looking wrong in dark mode after the system is otherwise complete. That is component-level debugging, not implementation architecture.
