---
name: happyui
description: Use when building or restyling a web page, landing page, app screen or UI component that should look hand-drawn, playful, warm or sketchbook-like (paper background, handwritten titles, marker highlights, pencil outlines with hard shadows, sticky notes, tape), or when the user mentions HappyUI or hui- classes.
---

# HappyUI

## Overview

HappyUI is a CSS design system (BEM classes prefixed `hui-`) plus an optional, dependency-free script. You get the look by putting its classes on semantic HTML. Never hand-write the sketch effects and never hardcode colors: the classes and the `--hui-*` tokens already do both.

All paths below are relative to this skill's folder.

## Setup (once per project)

1. In `<head>`, in this order:

```html
<script>document.documentElement.classList.add("hui-js")</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulohenriquesn/happyui@v1.0.0/dist/happyui.min.css">
<script src="https://cdn.jsdelivr.net/gh/paulohenriquesn/happyui@v1.0.0/dist/happyui.js" defer></script>
```

   No CDN allowed? Copy `dist/happyui.min.css` and `dist/happyui.js` into the project's static folder and link those.
2. Put `class="hui"` on `<body>` (or on the app's root element).
3. React or Next.js: import the CSS once in the root layout and use `className`. For typed components, copy `react/happyui.tsx` (read `react/README.md`).

## Quick reference

| Need | Classes | Doc in `docs/` |
|---|---|---|
| Width and spacing | `hui-container`, `hui-section`, `hui-stack`, `hui-cluster`, `hui-grid` (`--2` `--3` `--4`), `hui-split`, `hui-hero` | components/layout.md |
| Titles | `hui-display` (hero), `hui-h1`, `hui-h2` (handwritten), `hui-h3` (bold sans), `hui-h4` (card title), `hui-eyebrow`, `hui-lede` | components/typography.md |
| Emphasis | titles: `hui-marker`, `hui-scribble`, `hui-circled`, `hui-strike`. Text: `hui-highlight` | components/ink.md |
| Actions | `hui-button` + `--primary` `--ink` `--ghost` `--sm` `--lg` `--icon` `--block`, `hui-chip`, `hui-link` | components/button.md, chip.md |
| Labels | `hui-badge` + `--solid` `--dot` `--hand` `--count`, `hui-kbd`, `hui-code`, `hui-pre` | components/badge.md, code.md |
| Surfaces | `hui-card` (+ `--dashed` `--soft` `--flat` `--row` `--lg`), `hui-frame` + `hui-tape`, `hui-note`, `hui-callout`, `hui-banner`, `hui-window` | components/card.md and neighbors |
| Point at something | `hui-annotation` (+ `--up-right` `--down-left` `--down-right` `--plain`) | components/annotation.md |
| Forms | `hui-field` > `hui-label` + `hui-input` / `hui-textarea` / `<div class="hui-select"><select>` + `hui-hint` / `hui-error`; `<label class="hui-check"><input type="checkbox">`, same for `hui-radio` and `hui-switch`; `hui-range` on the input | components/forms.md, choice-controls.md |
| Navigation | `hui-nav`, `hui-logo`, `hui-tabs`, `hui-menu`, `hui-breadcrumb`, `hui-pagination`, `hui-footer` | components/nav.md, tabs.md, menu.md |
| Feedback | `hui-alert`, `HappyUI.toast()`, `data-hui-tooltip`, `hui-dialog`, `hui-progress`, `hui-spinner`, `hui-skeleton`, `hui-accordion` | components/alert.md and neighbors |
| Data | `hui-table-wrap` > `hui-table`, `hui-avatar`, `hui-stat`, `hui-steps`, `hui-checklist`, `hui-quote`, `hui-price`, `hui-option`, `hui-empty` | components/table.md and neighbors |
| Color | one tone class on the element itself: `hui-yellow` `hui-orange` `hui-red` `hui-pink` `hui-purple` `hui-blue` `hui-teal` `hui-green`, or `hui-info` `hui-success` `hui-warning` `hui-danger` | foundations.md |
| Hand-placed rotation | `hui-tilt-left`, `hui-tilt-right`, `hui-tilt-slight`, `hui-straight` | components/card.md |
| Motion | `hui-reveal`, `data-hui-stagger`, `hui-float`, `hui-bob`, `hui-buzz`, `hui-nudge`, `hui-wiggle-hover` | components/motion.md |

## Anatomy (element classes)

- `hui-button`: `__icon`, `__text` > `__label` + `__hint`
- `hui-card`: `__icon`, `__title`, `__text`, `__meta`, `__media`, `__footer`; `hui-card--row` > `__body`
- `hui-hero`: `__copy`, `__media`. `hui-section`: `__head`
- `hui-nav`: `__inner` > `hui-logo` (`__mark`), `__links` > `__link`, `__actions`, `__menu` > `__sheet`. `hui-footer`: `__inner`, `__brand`, `__cols`, `__title`, `__bottom`
- `hui-field`: `hui-label` (`__aside`), control, `hui-hint` or `hui-error`
- `hui-tabs` (`data-hui-tabs`): `__list` > `__tab`, `__panel`. `hui-menu` (a `<details>`): `summary`, `__list` > `__item`, `__sep`, `__label`
- `hui-alert`: `__icon`, `__body` > `__title` + `__text`, `__close`. `hui-toast`: `__icon`, `__body`, `__title`, `__close`
- `hui-dialog` (a `<dialog>`): `__inner` > `__head` > `__title`, `__text`, `__actions`
- `hui-accordion`: `__item` (a `<details>`) > `summary` + `__body`
- `hui-window`: `__bar` > `__dot` x3 + `__title`, `__body`. `hui-frame`: any image inside, `hui-tape--tl` `--tr` `--top` `--bl` `--br`
- `hui-steps` (an `<ol>`): `hui-step` > `__title` + `__text`. `hui-stat`: `__value`, `__label`, `__delta`
- `hui-quote` (a `<figure>`): `__text`, `__by`. `hui-price`: `__name`, `__amount` (`<small>`), `__text`, `__flag`
- `hui-option`: `__icon`, `__body` > `__title` + `__meta`, `__action`. `hui-empty`: `__art`, `__title`, `__text`

The first time you use a component in a task, read its doc: it has the exact markup and the required attributes. `docs/index.html` shows every component working. `examples/landing.html` and `examples/app.html` are complete pages to copy structure from.

## Rules that make it look right

1. One `hui-button--primary` per section. The nav may repeat the page's main action as a small primary. Every other action is a default or ghost button.
2. Handwriting (Caveat) only for short text: titles, card titles, notes, annotations. Paragraphs, labels and buttons keep the body font.
3. One marker or scribble per section title. Highlight one to four words, never a sentence.
4. Use two or three tones per page plus the brand yellow, and repeat them.
5. Tilt decorative pieces: notes, callouts, frames, a few cards. Forms, tables, inputs and navigation stay straight.
6. A tone class colors the element it sits on. Children never inherit it, so put the tone on each component you want colored.
7. Semantic HTML: `button` for actions, `a` for navigation, `label` with every input, `dialog`, `details`, `table`. Icon-only buttons need `aria-label`.
8. Colors come from tokens such as `var(--hui-ink)` or `var(--hui-pink-fill)`. Your own CSS only places things (position, size, grid).
9. Never touch the private `--_*` variables.
10. Dark mode works on its own: with no `data-theme`, the page follows the system. Offer a switch with `<button data-hui-theme-toggle aria-label="Switch theme">` (show icons with `hui-only-light` and `hui-only-dark`), and check both themes with `data-theme="dark"` on `<html>`.

## Page recipes

- **Landing page:** nav, hero (banner, display title with scribble, lede with highlights, primary large button plus a default one, inline checklist, a framed window with tape and a sticky note), problem cards, feature grid of dashed cards, split section with steps, quotes, pricing, FAQ accordion, callout, footer. Structure: `examples/landing.html`.
- **App screen:** nav with `aria-current`, breadcrumb, `hui-h1` with a marker and the actions, stat cards in a grid, tabs with a table, an aside with a form card, dialogs. Structure: `examples/app.html`.

## Common mistakes

| Mistake | Fix |
|---|---|
| No `class="hui"` on body: no paper, wrong fonts | Add it |
| `hui-reveal` blocks stay invisible | Load `happyui.js`, or drop `hui-reveal` where no script runs. Screenshots and PDF exports only see blocks already scrolled into view: add the `is-in` class first |
| Tone on a parent, expecting the buttons inside to change | Put the tone class on each component |
| Tape or tilted cards look cut off | Remove `overflow: hidden` from the container or give it padding |
| Tooltip missing on `hui-link`, `hui-scribble` or `a.hui-banner` | Those use `::after`; wrap the element in a `span` with `data-hui-tooltip` |
| Made-up classes like `hui-btn` or `hui-card--blue` | Only documented classes exist; color is always a tone class |
