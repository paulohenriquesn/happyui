# HappyUI: guide for agents and contributors

This file is for anyone changing HappyUI itself: people, Claude Code (through `CLAUDE.md`), Codex, Cursor and other agents. To use HappyUI in another project, read `SKILL.md` instead.

## What this repo is

A hand-drawn design system for the web: plain CSS with BEM classes prefixed `hui-`, an optional dependency-free script, design tokens, docs, examples and an optional React layer. The repo is also a Claude Code skill (`SKILL.md` at the root).

## Commands

Node 18 or newer. On a machine where `node` is not on the PATH, call it by its full path.

| Command | What it does |
|---|---|
| `npm run build` | Joins `src/` into `dist/happyui.css`, writes `dist/happyui.min.css`, copies `js/happyui.js` to `dist/` and writes `tokens/tokens.json` |
| `npm run check` | Build, then test 140 text and background pairs for WCAG AA contrast in both themes |
| `npm test` | `check`, then 23 browser checks of `happyui.js` on the showcase: tabs, dialog, menu, toast, theme, reveal, focus (needs `npm install` once) |
| `npm run screenshots` | Build, then redo `docs/screenshots/` with the installed Chrome or Edge |

`docs/index.html` and `examples/*.html` open straight from disk. They load `dist/`, so build before you look.

## Where things live

| Path | Content |
|---|---|
| `src/tokens.css` | Every variable. One declaration per line: the build parses this file |
| `src/base.css` | `.hui` paper and plain-tag defaults, all under `:where()` (zero specificity), shared SVG masks |
| `src/typography.css`, `layout.css`, `motion.css` | Text classes and icons, layout blocks, reveal and keyframes |
| `src/components/*.css` | Components, grouped by family |
| `src/tones.css` | Tone classes. Loaded last on purpose |
| `scripts/build.mjs` | The `ORDER` array decides the bundle order. A new CSS file must be added there |
| `js/happyui.js` | The optional script. `dist/happyui.js` is a copy made by the build |
| `docs/index.html` | Showcase. Blocks with `data-shot="name"` become `docs/screenshots/name.png` |
| `docs/components/*.md`, `docs/foundations.md` | One doc per component family |
| `react/` | Optional typed React wrappers, self-contained (own `package.json` and `tsconfig.json`) |

Never edit `dist/` or `tokens/tokens.json` by hand.

## Conventions

- **Names:** block `hui-card`, element `hui-card__title`, modifier `hui-card--dashed`. State lives in ARIA attributes (`aria-pressed`, `aria-selected`, `aria-current`, `aria-invalid`, `aria-busy`) or in `is-*` classes.
- **Colors only from tokens.** No hex values in components. The one exception is the fixed night screen of `.hui-window--night`.
- **Tones do not inherit.** `--hui-tone*` and `--hui-tilt` are registered with `inherits: false`. A component resolves them into private variables on its own element (`--_bg: var(--hui-tone, var(--hui-surface))`), and its pseudo-elements read the private variable. Never read `var(--hui-tone*)` inside `::before` or `::after`: it is always empty there.
- **Private variables** start with `--_` and belong to one component. Users never set them.
- **Specificity:** base styles use `:where()`. A modifier that must beat a size modifier uses two classes (see `.hui-button.hui-button--ghost`).
- **Small things stay straight, big paper can tilt.** Tilt uses the `rotate` property, hover uses `translate` and `rotate`, reveal uses `transform`. They compose because they are different properties; keep it that way.
- **Every component, every time:** light and dark theme, visible keyboard focus, touch targets of 44 px or more at the default size, native elements, and nothing that moves under `prefers-reduced-motion`.
- **Writing:** English, short sentences, no em dashes or en dashes (use commas, colons or parentheses).

## Adding or changing a component

1. Write the CSS in `src/components/`. New file? Add it to `ORDER` in `scripts/build.mjs`.
2. Show it in `docs/index.html`, inside the right `data-shot` block when it should appear in the screenshots.
3. Write or update its doc in `docs/components/` and the index in `docs/components/README.md`.
4. Update the component table in `README.md` and the quick reference in `SKILL.md`.
5. If `react/happyui.tsx` wraps it, update the wrapper and run `npx tsc -p react/tsconfig.json`.
6. Run `npm test`. When the look changed, run `npm run screenshots` too.
7. Add a line to `CHANGELOG.md`.

## Releasing

1. Bump `version` in `package.json` and in `js/happyui.js`.
2. Add the release to `CHANGELOG.md`.
3. `npm test && npm run screenshots`.
4. Commit, tag `vX.Y.Z` and push the tag. jsDelivr serves the tag at `https://cdn.jsdelivr.net/gh/paulohenriquesn/happyui@vX.Y.Z/dist/happyui.min.css`.
5. Update the version in the CDN links of `README.md` and `SKILL.md`.
