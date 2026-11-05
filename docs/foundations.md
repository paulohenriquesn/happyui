# Foundations

Everything in HappyUI is built from CSS variables (tokens). Change a variable and every component follows. This page explains what the tokens are, how tones and the brand color work, how dark mode switches, and where the token JSON comes from.

- [Getting set up](#getting-set-up)
- [Tones and brand](#tones-and-brand)
- [Paper and ink](#paper-and-ink)
- [Typography](#typography)
- [Spacing](#spacing)
- [Radius and wobble](#radius-and-wobble)
- [Strokes and shadows](#strokes-and-shadows)
- [Tilt](#tilt)
- [Motion](#motion)
- [Layout and layers](#layout-and-layers)
- [Shared drawings](#shared-drawings)
- [Dark mode](#dark-mode)
- [Token JSON](#token-json)

## Getting set up

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My page</title>
  <script>
    document.documentElement.classList.add("hui-js");
    try { var t = localStorage.getItem("happyui-theme"); if (t) document.documentElement.setAttribute("data-theme", t); } catch (e) {}
  </script>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&amp;family=Shantell+Sans:ital,wght@0,300..800;1,300..800&amp;display=swap">
  <link rel="stylesheet" href="happyui.min.css">
  <script src="happyui.js" defer></script>
</head>
<body class="hui">
  <button class="hui-button hui-button--primary" type="button">Hello!</button>
</body>
</html>
```

- `dist/happyui.css` (readable), `dist/happyui.min.css` and `dist/happyui.js` come from `npm run build`.
- The fonts are not bundled. Load Caveat (handwriting) and Shantell Sans (body) yourself, as above.
- `class="hui"` on `<body>` (or any wrapper) gives you the paper, the graph-paper grid, the fonts, `box-sizing`, the focus ring and the reduced-motion rule. Add `hui-plain` to drop the grid.
- The small inline script is optional. It adds `hui-js` before the first paint (so scroll-reveal blocks do not flash) and applies a saved theme choice (so there is no flash of the wrong theme).
- HappyUI uses modern CSS: `@property`, the individual `rotate`, `translate` and `scale` properties, `:has()` and `color-mix()`. Use current browsers.

## Tones and brand

A tone is a color family. Add a tone class **to the element itself** and the component takes the color:

```html
<button class="hui-button hui-pink" type="button">Pink</button>
<span class="hui-badge hui-green">Green</span>
<div class="hui-card hui-blue">A blue card</div>
```

A tone class sets six variables on that element:

| Variable | What it is | Typical use |
|---|---|---|
| `--hui-tone` | The "pop": a bright pastel | Button and badge backgrounds, highlighter boxes, notes, tape, avatars, selected tabs and chips, switch and progress fill |
| `--hui-tone-on` | Text that sits on the pop color (always the dark `--hui-on-pop`, except `hui-paper`) | Button and badge labels |
| `--hui-tone-fill` | A big-surface tint (a deep tint in dark mode) | Card, frame, callout, banner, quote and pricing backgrounds |
| `--hui-tone-soft` | A whisper tint | Alert background, card media area, `hui-card--soft` |
| `--hui-tone-ink` | A deep, readable color | Colored text and thin marks: eyebrow, link, stat delta, checklist ticks, scribble, strike, circled, annotation, doodles, solid badge background |
| `--hui-tone-mark` | A translucent highlighter color | `hui-marker` |

How tones behave:

- **They do not inherit.** The six variables (and `--hui-tilt`, plus size knobs such as `--hui-gap`, `--hui-min` and `--hui-card-padding`) are registered with `@property` and `inherits: false`. A tone on a wrapper does nothing to the components inside it, and a tone never leaks into nested components. Put the tone class on each component you want to color. This includes icons: an `<svg class="hui-icon">` inside a pink button is not pink unless the `<svg>` itself has `hui-pink`.
- **Each component decides what to use.** A button uses the pop, a card uses the fill, an eyebrow uses the ink. Each component page has a Tones section.
- **Tones win.** `tones.css` is loaded last, so `hui-button--primary hui-pink` is pink.
- **No tone, sensible default.** Without a tone class most components fall back to the brand or to plain surfaces. A few defaults are fixed on purpose: pen-like marks (`hui-scribble`, `hui-strike`, `hui-circled`, `hui-annotation`, `hui-eyebrow`, `hui-checklist` ticks, the quote mark, `hui-badge--count`) are red ink, `hui-stat__delta` is green ink, `hui-switch` is green and `hui-link` is blue ink. Each component page says which.

### The classes

| Class | Color | Notes |
|---|---|---|
| `hui-yellow` | yellow | The default brand |
| `hui-orange` | orange | Also `hui-warning` |
| `hui-red` | red | Also `hui-danger` |
| `hui-pink` | pink | |
| `hui-purple` | purple | |
| `hui-blue` | blue | Also `hui-info` |
| `hui-teal` | teal | |
| `hui-green` | green | Also `hui-success` |
| `hui-brand` | your brand color | Follows `--hui-brand*` (see below) |
| `hui-paper` | plain paper | Sets every tone variable to the plain surface colors. Use it for a white note or white tape, or to cancel another tone class on the same element (it is the last rule in `tones.css`) |

`hui-info`, `hui-success`, `hui-warning` and `hui-danger` are only aliases for blue, green, orange and red. They exist so your markup can say what it means.

### The five shades of each tone

Every tone has five variables named after it. For pink they are `--hui-pink` (the pop), `--hui-pink-fill`, `--hui-pink-soft`, `--hui-pink-ink` and `--hui-pink-mark`. Their values change with the theme.

Light theme:

| Tone | pop | fill | soft | ink | mark |
|---|---|---|---|---|---|
| yellow | `#ffe066` | `#fff3a8` | `#fff9d9` | `#876000` | `rgb(255 222 89 / 0.75)` |
| orange | `#ffc48a` | `#ffe2c4` | `#fff1e3` | `#b24f0c` | `rgb(255 178 102 / 0.62)` |
| red | `#ffab9c` | `#ffd9d1` | `#ffeeea` | `#c63b22` | `rgb(255 140 120 / 0.5)` |
| pink | `#ffaccb` | `#ffd6e5` | `#ffecf3` | `#b8285e` | `rgb(255 146 186 / 0.6)` |
| purple | `#cdb5ff` | `#e7dcff` | `#f3eeff` | `#6a3fd0` | `rgb(196 160 255 / 0.55)` |
| blue | `#a9cbff` | `#d8e8ff` | `#edf4ff` | `#2f5bd3` | `rgb(140 190 255 / 0.55)` |
| teal | `#93e0e3` | `#d3f3f2` | `#eaf9f8` | `#0d7a72` | `rgb(110 214 230 / 0.55)` |
| green | `#a8e8b0` | `#d9f5dc` | `#edfaee` | `#1f7a43` | `rgb(140 226 150 / 0.65)` |

Dark theme:

| Tone | pop | fill | soft | ink | mark |
|---|---|---|---|---|---|
| yellow | `#f7d65c` | `#3d3519` | `#2b2719` | `#f5cf55` | `rgb(214 170 30 / 0.45)` |
| orange | `#ffb877` | `#402c1c` | `#2c2219` | `#ffae6b` | `rgb(230 120 40 / 0.42)` |
| red | `#ff9d8c` | `#43241f` | `#2e1d1a` | `#ff8f7a` | `rgb(230 80 60 / 0.4)` |
| pink | `#ff9fc2` | `#40222f` | `#2d1c23` | `#ff8fb7` | `rgb(230 80 140 / 0.4)` |
| purple | `#c3a6ff` | `#31284a` | `#241f33` | `#bea4ff` | `rgb(140 100 240 / 0.42)` |
| blue | `#9cc0ff` | `#22314d` | `#1b2333` | `#93b4ff` | `rgb(70 120 230 / 0.42)` |
| teal | `#85d8db` | `#1c3a39` | `#172827` | `#6fd6cf` | `rgb(40 170 170 / 0.4)` |
| green | `#98e0a3` | `#213a27` | `#192a1d` | `#82d996` | `rgb(60 170 90 / 0.42)` |

The pop colors stay light in both themes, which is why `--hui-on-pop` is dark in both. Fill and soft become deep tints at night, and ink becomes bright so colored text stays readable.

### Recolor the brand

The brand is a set of five derived variables. They default to yellow and power `hui-button--primary`, `hui-brand`, the nav hover, table row hover, the active page in pagination and many component defaults:

| Variable | Default |
|---|---|
| `--hui-brand` | `var(--hui-yellow)` |
| `--hui-brand-fill` | `var(--hui-yellow-fill)` |
| `--hui-brand-soft` | `var(--hui-yellow-soft)` |
| `--hui-brand-ink` | `var(--hui-yellow-ink)` |
| `--hui-brand-mark` | `var(--hui-yellow-mark)` |

Override all five **on `:root, [data-theme]`**, in a stylesheet loaded after HappyUI. They are declared on both selectors so they recompute inside a nested `[data-theme]` block, so your override has to match.

Point the brand at another tone (it follows light and dark for free):

```css
:root,
[data-theme] {
  --hui-brand: var(--hui-purple);
  --hui-brand-fill: var(--hui-purple-fill);
  --hui-brand-soft: var(--hui-purple-soft);
  --hui-brand-ink: var(--hui-purple-ink);
  --hui-brand-mark: var(--hui-purple-mark);
}
```

Or use your own colors, one set per theme:

```css
:root,
[data-theme="light"] {
  --hui-brand: #8fd694;
  --hui-brand-fill: #d6f0d8;
  --hui-brand-soft: #eef9ef;
  --hui-brand-ink: #1f6b3a;
  --hui-brand-mark: rgb(143 214 148 / 0.6);
}

[data-theme="dark"] {
  --hui-brand: #8fd694;
  --hui-brand-fill: #1f3a24;
  --hui-brand-soft: #182a1b;
  --hui-brand-ink: #8fd694;
  --hui-brand-mark: rgb(80 170 90 / 0.42);
}
```

Keep the pop color light, because text on it is `--hui-on-pop` (dark). Some places do not follow the brand on purpose: links use `--hui-blue-ink`, the window dots are red, yellow and green, while the text selection and `HappyUI.toast()` follow the brand.

## Paper and ink

The neutral colors. They flip in dark mode.

| Variable | Light | Dark | Used for |
|---|---|---|---|
| `--hui-paper` | `#fbf9f3` | `#1d1b18` | The page background, under the grid |
| `--hui-surface` | `#ffffff` | `#282520` | Things lying on the paper: cards, inputs, menus, tabs |
| `--hui-surface-sunken` | `#f6f1e7` | `#161411` | Wells: table header, code block, tracks, hover backgrounds |
| `--hui-ink` | `#29251f` | `#f4efe4` | Main text |
| `--hui-ink-soft` | `#645d4e` | `#c9c0ae` | Secondary text |
| `--hui-ink-faint` | `#76705f` | `#9b9281` | Placeholders and disabled text |
| `--hui-line` | `#29251f` | `#f4efe4` | The pencil outline of components |
| `--hui-line-soft` | `#ddd5c5` | `#3e3a33` | Faint separators (table rows, skeleton hatch) |
| `--hui-line-dashed` | `#8a8270` | `#8d8574` | Dashed lines and squiggles |
| `--hui-shadow-color` | `rgb(41 37 31 / 0.82)` | `rgb(0 0 0 / 0.9)` | The hard pencil shadows |
| `--hui-grid-color` | `rgb(110 160 210 / 0.1)` | `rgb(150 185 230 / 0.07)` | Graph paper lines |
| `--hui-focus` | `#2f5bd3` | `#8fb2ff` | Focus rings and focused inputs |
| `--hui-backdrop` | `rgb(41 37 31 / 0.42)` | `rgb(0 0 0 / 0.6)` | Behind a dialog |
| `--hui-on-pop` | `#29251f` | `#29251f` | Text on pop colors |
| `--hui-on-solid` | `#ffffff` | `#1d1b18` | Text on solid ink-colored fills (`hui-badge--solid`, `hui-badge--count`) |

## Typography

Two voices. **Caveat** (handwriting) is for titles and notes. **Shantell Sans** (a friendly marker sans) is for everything you read. Code uses a monospace stack.

| Variable | Stack starts with |
|---|---|
| `--hui-font-hand` | `"Caveat"`, `"Caveat Variable"`, then `"Segoe Print"`, `"Bradley Hand"`, `"Comic Sans MS"`, `cursive` |
| `--hui-font-body` | `"Shantell Sans Variable"`, `"Shantell Sans"`, `"Segoe UI"`, `"Trebuchet MS"`, `system-ui`, `sans-serif` |
| `--hui-font-mono` | `"JetBrains Mono"`, `ui-monospace`, `"Cascadia Mono"`, `Menlo`, `Consolas`, `monospace` |

Body text sizes:

| Variable | Value | Used for |
|---|---|---|
| `--hui-text-xs` | `0.8125rem` | Hints, captions, badges, table headers |
| `--hui-text-sm` | `0.9375rem` | Small UI text: labels, menus, tables, card text |
| `--hui-text-md` | `1.0625rem` | Body text and buttons (the default) |
| `--hui-text-lg` | `1.1875rem` | Lede paragraph, large buttons |
| `--hui-text-xl` | `1.375rem` | No component uses it. Free for your own CSS |

Handwritten sizes (Caveat runs small, so these are bigger):

| Variable | Value | Used for |
|---|---|---|
| `--hui-hand-sm` | `1.375rem` | Eyebrow, `hui-link`, alert titles, footer titles, divider label |
| `--hui-hand-md` | `1.75rem` | Card, step and quote titles (`hui-h4`) |
| `--hui-hand-lg` | `2.25rem` | Dialog title, price name, empty-state title |
| `--hui-hand-xl` | `clamp(2.25rem, 1.5rem + 2.4vw, 3.25rem)` | `hui-h2`, callout title, stat value |
| `--hui-hand-2xl` | `clamp(2.6rem, 1.6rem + 3.6vw, 4.5rem)` | `hui-h1`, default `h2` |
| `--hui-hand-3xl` | `clamp(3.5rem, 1.8rem + 6.4vw, 7rem)` | `hui-display`, default `h1` |

Line heights: `--hui-leading-tight` (`0.95`, display titles), `--hui-leading-snug` (`1.2`, headings) and `--hui-leading` (`1.65`, body). The classes that use these scales are in [typography](components/typography.md).

## Spacing

A 4px scale. It counts 1 to 6, then jumps by bigger steps: 8, 10, 12, 16, 20 and 24.

| Variable | Value | Variable | Value |
|---|---|---|---|
| `--hui-space-1` | `0.25rem` | `--hui-space-8` | `2rem` |
| `--hui-space-2` | `0.5rem` | `--hui-space-10` | `2.5rem` |
| `--hui-space-3` | `0.75rem` | `--hui-space-12` | `3rem` |
| `--hui-space-4` | `1rem` | `--hui-space-16` | `4rem` |
| `--hui-space-5` | `1.25rem` | `--hui-space-20` | `5rem` |
| `--hui-space-6` | `1.5rem` | `--hui-space-24` | `6rem` |

## Radius and wobble

| Variable | Value |
|---|---|
| `--hui-radius-xs` | `4px` |
| `--hui-radius-sm` | `6px` |
| `--hui-radius-md` | `10px` |
| `--hui-radius-lg` | `16px` |
| `--hui-radius-pill` | `999px` |
| `--hui-wobble` | `255px 15px 225px 15px / 15px 225px 15px 255px` |
| `--hui-wobble-alt` | `15px 255px 15px 225px / 225px 15px 255px 15px` |

The wobble is a `border-radius` with eight values (four horizontal, four vertical radii). The big numbers are on purpose: the browser scales them down to fit the box, so the same uneven, hand-drawn corner shape works on a small button and on a large card. Use it on your own boxes:

```css
.my-box {
  border: var(--hui-stroke) solid var(--hui-line);
  border-radius: var(--hui-wobble);
  box-shadow: var(--hui-shadow-md);
}
```

`--hui-wobble-alt` is the mirror image (used by the quote card) so neighbors do not look stamped from one mold.

## Strokes and shadows

Pencil strokes:

| Variable | Value | Used for |
|---|---|---|
| `--hui-stroke-thin` | `1.5px` | Badges, dashed lines, small marks |
| `--hui-stroke` | `2px` | Most outlines |
| `--hui-stroke-thick` | `2.5px` | Frame, callout, dialog, featured price |

Shadows are hard offsets with no blur, like pencil shading. They use `--hui-shadow-color`, so they turn near-black in dark mode.

| Variable | Value |
|---|---|
| `--hui-shadow-sm` | `2px 2px 0 var(--hui-shadow-color)` |
| `--hui-shadow-md` | `3px 4px 0 var(--hui-shadow-color)` |
| `--hui-shadow-lg` | `5px 6px 0 var(--hui-shadow-color)` |
| `--hui-shadow-xl` | `8px 9px 0 var(--hui-shadow-color)` |
| `--hui-shadow-float` | `0 14px 30px -14px rgb(20 16 8 / 0.45)` (a soft shadow, used by sticky notes) |

## Tilt

Small rotations make things feel placed by hand. Cards, notes, frames and friends read `--hui-tilt` (like tones, it does not inherit).

| Token or class | Value |
|---|---|
| `--hui-tilt-sm` | `0.6deg` |
| `--hui-tilt-md` | `1.5deg` |
| `--hui-tilt-lg` | `3deg` (no class uses it) |
| `hui-tilt-left` | `--hui-tilt` is minus `--hui-tilt-md` (turns left) |
| `hui-tilt-right` | `--hui-tilt` is `--hui-tilt-md` (turns right) |
| `hui-tilt-slight` | `--hui-tilt` is minus `--hui-tilt-sm` |
| `hui-straight` | `--hui-tilt: 0deg` |

Use the helper classes, or set a value yourself: `style="--hui-tilt: 2deg"`. Defaults when you set nothing:

| Component | Default tilt |
|---|---|
| `hui-card`, `hui-frame`, `hui-window`, `hui-quote`, `hui-price` | `0deg` |
| `hui-note` | `-2deg` |
| `hui-callout` | `-0.8deg` |
| `hui-banner` | `-1.5deg` |
| `hui-annotation` | `-3deg` |
| `hui-price--featured` | `-1deg` (a tilt helper on the same card replaces it) |

`hui-straight` on a note, callout, banner or annotation removes its default tilt.

## Motion

| Variable | Value | Meaning |
|---|---|---|
| `--hui-ease` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Smooth and quick to settle |
| `--hui-ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoots a little, for pops and toggles |
| `--hui-duration-fast` | `140ms` | Hover lifts, presses |
| `--hui-duration` | `220ms` | Most transitions |
| `--hui-duration-slow` | `900ms` | The marker drawing in |

Scroll reveal, the animation helpers and the draw effects are in [motion](components/motion.md). When a visitor asks for reduced motion (`prefers-reduced-motion: reduce`), everything under `.hui` runs with 1ms durations and a single iteration, and the scroll reveal shows its blocks at once.

## Layout and layers

| Variable | Value | Meaning |
|---|---|---|
| `--hui-container` | `72rem` | Max width of `hui-container` |
| `--hui-container-narrow` | `46rem` | Max width of `hui-container--narrow` |
| `--hui-grid-size` | `28px` | Size of one square of the graph paper |
| `--hui-z-sticky` | `40` | The sticky nav bar |
| `--hui-z-dropdown` | `60` | Menus and tooltips |
| `--hui-z-toast` | `90` | The toast region |

## Shared drawings

`base.css` defines six hand-drawn shapes as CSS masks on `:root`: `--hui-squiggle-mask`, `--hui-check-mask`, `--hui-chevron-mask`, `--hui-arrow-mask`, `--hui-swoosh-mask` and `--hui-circle-mask`. The shape comes from the mask, and the color comes from the element's `background`, so one drawing works in every tone and theme. You can use them too:

```css
.my-tick {
  width: 1.2em;
  height: 1.2em;
  background: var(--hui-green-ink);
  -webkit-mask: var(--hui-check-mask) center / contain no-repeat;
  mask: var(--hui-check-mask) center / contain no-repeat;
}
```

## Dark mode

Dark mode is a second set of the same variables. Put `data-theme="dark"` on `<html>` (for example `<html lang="en" data-theme="dark">`) and everything follows.

- **On any element.** `data-theme="dark"` or `data-theme="light"` also works on a section or a card, because the shadow and brand variables are recomputed inside every `[data-theme]` block. Inside a `class="hui"` page, such a block also gets its own `background-color: var(--hui-paper)` and `color: var(--hui-ink)` (a zero-specificity rule, so your own classes win). Outside a `hui` wrapper the attribute only sets variables and `color-scheme`, so paint the background yourself.
- **From JavaScript.** `HappyUI.theme.set("light" | "dark" | "auto")`, `HappyUI.theme.toggle()` and `HappyUI.theme.get()` (the table below). The choice is stored in `localStorage` under `happyui-theme`. `"auto"` forgets the stored choice and follows the system.
- **A toggle button.** Any element with `data-hui-theme-toggle` switches the theme on click and keeps `aria-pressed` in sync (`true` means dark).
- **Per-theme content.** `hui-only-light` and `hui-only-dark` show an element in one theme only. The sun and moon icons on a toggle button use them.
- **No flash.** Apply the saved theme in an inline script in `<head>`, as in [Getting set up](#getting-set-up).
- **What changes at night.** Paper and surfaces become warm darks, ink and outlines become cream, shadows become near-black, tone fills and soft tints become deep tints, tone inks become bright, and `--hui-on-solid` flips. The pop colors only shift a little and stay light, and `--hui-on-pop` stays dark.

The theme API:

| Call | What it does |
|---|---|
| `HappyUI.theme.get()` | Returns `"light"` or `"dark"` (the current `data-theme` of `<html>`) |
| `HappyUI.theme.set(mode)` | `mode` is `"light"`, `"dark"` or `"auto"`. Applies it, stores it (or clears the stored value for `"auto"`) and returns the theme that ended up applied |
| `HappyUI.theme.toggle()` | Switches between light and dark and returns the new theme |

On load the script uses the stored choice. With no stored choice and no `data-theme` on `<html>`, it follows `prefers-color-scheme`, and it keeps following it when the system changes. If you hard-code `data-theme` on `<html>` and nothing is stored, your value stays, even when the system theme changes. A click on the theme switch still wins and is remembered. Without any `data-theme`, the CSS itself follows the system theme, so dark-mode visitors never see a light flash, with or without the script.

## Token JSON

`tokens/tokens.json` is generated. `npm run build` (which runs `node scripts/build.mjs`) reads `src/tokens.css` and writes it. Do not edit it by hand. The package exposes it as `happyui/tokens`.

It has a comment, the version and four groups, each one a map from variable name to value:

```json
{
  "$comment": "Generated by scripts/build.mjs from src/tokens.css. Do not edit by hand.",
  "version": "1.0.0",
  "base": { "--hui-space-4": "1rem", "--hui-wobble": "255px 15px 225px 15px / 15px 225px 15px 255px" },
  "light": { "--hui-paper": "#fbf9f3", "--hui-yellow": "#ffe066" },
  "dark": { "--hui-paper": "#1d1b18", "--hui-yellow": "#f7d65c" },
  "derived": { "--hui-brand": "var(--hui-yellow)", "--hui-shadow-sm": "2px 2px 0 var(--hui-shadow-color)" }
}
```

(The real file lists every token; this one is shortened.)

| Group | What is in it | Comes from |
|---|---|---|
| `base` | Fonts, sizes, spacing, radius, strokes, tilt, motion, layout, layers. The same in both themes | The first `:root` block |
| `light` | Paper, ink and all tone shades for the light theme | `:root, [data-theme="light"]` |
| `dark` | The same names with dark values | `[data-theme="dark"]` |
| `derived` | The brand and the shadows, built from other tokens | `:root, [data-theme]` |

Use it to feed other tools, such as a Tailwind or Figma token import, or a native app theme:

```js
import { readFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync("tokens/tokens.json", "utf8"));
console.log(tokens.light["--hui-paper"]); // "#fbf9f3"
```

If you add a token to `src/tokens.css`, keep **one declaration per line** inside one of the four blocks and keep the block openers exactly as they are. The build reads the file line by line and would miss anything else. Only `src/tokens.css` is read, so the `@property` lines and the masks in `base.css` are not in the JSON.
