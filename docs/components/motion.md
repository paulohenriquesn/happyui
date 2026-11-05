# Motion

Small, bouncy and kind. Motion in HappyUI is a few CSS classes plus one optional behavior: blocks that fade and rise in as you scroll. Everything turns itself off when a visitor asks for reduced motion.

## Example

```html
<!-- In <head>, so reveal blocks never flash visible first -->
<script>document.documentElement.classList.add("hui-js");</script>

<h2 class="hui-h2 hui-reveal">
  Write it <span class="hui-marker hui-pink">like you mean it</span>
</h2>

<div class="hui-grid hui-grid--3" data-hui-stagger>
  <div class="hui-card hui-reveal">First</div>
  <div class="hui-card hui-reveal">Second</div>
  <div class="hui-card hui-reveal">Third</div>
</div>

<button class="hui-button hui-wiggle-hover" type="button">Wiggle on hover</button>
<span class="hui-doodle hui-doodle--sparkle hui-orange hui-bob" aria-hidden="true"></span>

<svg viewBox="0 0 100 20" width="200" aria-hidden="true">
  <path class="hui-draw" pathLength="1" d="M4 12 C 30 2, 60 20, 96 8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
</svg>
```

## Classes

| Class | What it does |
|---|---|
| `hui-reveal` | The block fades in and rises (28px, with a slight turn) when it scrolls into view. Needs `happyui.js`. Without the script nothing is hidden |
| `is-in` | Added by the script when a block is revealed. You do not write it |
| `hui-wiggle-hover` | A short wiggle (480ms) on hover |
| `hui-nudge` | A small downward nudge now and then. For a "scroll down" hint |
| `hui-bob` | Bobs up and tilts, in a loop |
| `hui-float` | Floats up and down, slowly |
| `hui-buzz` | Shakes side to side, like a ringing bell |
| `hui-bounce` | Bounces, in a loop |
| `hui-spin` | Spins around, in a loop |
| `hui-pop` | Pops in once when it appears (scales up with a bounce) |
| `hui-draw` | Draws an SVG `<path>` like a pen. The path needs `pathLength="1"` |
| `hui-march` | Marching dashes along an SVG stroke, in a loop. For "connection" lines |

The keyframes behind them are named `hui-spin`, `hui-nudge-down`, `hui-wiggle`, `hui-bob`, `hui-float`, `hui-buzz`, `hui-bounce`, `hui-pop-in`, `hui-toast-in`, `hui-toast-out`, `hui-dialog-in`, `hui-hatch`, `hui-draw` and `hui-march`. You can use them in your own `animation` rules.

## Variables

| Variable | What it does |
|---|---|
| `--hui-i` | The reveal order. Each step adds a `90ms` delay. The script sets it for children of `data-hui-stagger`, or you can set it yourself: `style="--hui-i: 2"` |
| `--hui-duration-fast`, `--hui-duration`, `--hui-duration-slow` | `140ms`, `220ms`, `900ms`. The timings used by hovers, presses and the marker |
| `--hui-ease`, `--hui-ease-bounce` | The two easing curves |

## States

- **Reveal blocks** start hidden (`opacity: 0`, moved down and turned) only when `<html>` has the `hui-js` class, then get `is-in`.
- **Ink effects draw themselves.** Inside a `hui-reveal` block (or on an element that is itself `hui-reveal`), `hui-marker`, `hui-scribble` and `hui-strike` start undrawn and draw in when the block is revealed. `hui-circled` does not animate. See [ink](ink.md).
- **Reduced motion.** Under `.hui`, `prefers-reduced-motion: reduce` shrinks all animation and transition durations to 1ms and runs animations once. The script also adds `is-in` to every reveal block straight away.

## JavaScript

`happyui.js` adds the class `hui-js` to `<html>` and runs the reveal on load.

| Call or attribute | What it does |
|---|---|
| `HappyUI.reveal(scope)` | Watches the `hui-reveal` blocks inside `scope` (an element, default the whole document). Blocks already shown are skipped |
| `HappyUI.init(scope)` | Runs the reveal and every other behavior (tabs, dialogs, menus, toasts, copy and theme buttons) for new markup. Safe to call again |
| `data-hui-stagger` | On a parent. Its direct `hui-reveal` children get `--hui-i` set to 0, 1, 2 and so on (unless you already set it inline), so they arrive one after another |

A block is revealed once about 12% of it is on screen, and the bottom 6% of the screen does not count, so blocks appear a moment after they enter. Without `IntersectionObserver`, or with reduced motion, all blocks show at once.

## Accessibility

- Reveal and loop animations are decoration. Content is in the DOM and readable by screen readers before it is revealed.
- Reduced motion is honored by CSS and by the script. Do not add your own animation without respecting `prefers-reduced-motion`.
- Avoid looping effects (`hui-bob`, `hui-float`, `hui-buzz`, `hui-bounce`, `hui-nudge`) on text people are reading. Use them on small decorations.

## Tips

- Put the `hui-js` line in `<head>` as above. If you only load `happyui.js` with `defer`, the class is added after the first paint and reveal blocks can flash visible, then hide, then fade in.
- Put `hui-reveal` on cards, headings and sections. A block counts as seen as soon as any part of it enters the screen, so tall blocks work too, but smaller blocks give a nicer cascade.
- Added markup later (a modal, a route change)? Call `HappyUI.init(element)` so new `hui-reveal` blocks are watched.
- Reveal uses `transform`, and tilt uses the separate `rotate` property, so a tilted card can still be revealed.
