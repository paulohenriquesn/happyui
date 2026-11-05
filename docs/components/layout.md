# Layout

Small building blocks for page structure and spacing: container, stack, cluster, grid, section, split and hero. They only handle space, never color. This page also covers the `hui` page class and the helpers that show or hide things.

## Example

```html
<body class="hui">
  <main class="hui-container">

    <section class="hui-hero">
      <div class="hui-hero__copy">
        <h1 class="hui-display">Make it warm</h1>
        <p class="hui-lede">Text on the left, a picture on the right.</p>
        <div class="hui-button-group">
          <a class="hui-button hui-button--primary" href="#start">Start</a>
          <a class="hui-button" href="#more">Learn more</a>
        </div>
      </div>
      <div class="hui-hero__media">
        <div class="hui-card">A picture, a window or a frame goes here.</div>
      </div>
    </section>

    <section class="hui-section">
      <div class="hui-section__head">
        <span class="hui-eyebrow">Features</span>
        <h2 class="hui-h1">Everything you need</h2>
        <p class="hui-lede">A short intro under the title.</p>
      </div>

      <div class="hui-grid hui-grid--3">
        <div class="hui-card">One</div>
        <div class="hui-card">Two</div>
        <div class="hui-card">Three</div>
      </div>
    </section>

    <section class="hui-section--tight">
      <div class="hui-split hui-split--even">
        <div class="hui-stack" style="--hui-gap: 1rem">
          <h2 class="hui-h2">Text side</h2>
          <p>Stacked paragraphs with one gap.</p>
        </div>
        <div class="hui-cluster">
          <span class="hui-badge">Tags</span>
          <span class="hui-badge hui-pink">that</span>
          <span class="hui-badge hui-blue">wrap</span>
        </div>
      </div>
    </section>

  </main>
</body>
```

## Classes

| Class | What it does |
|---|---|
| `hui` | Put it on `<body>` or a wrapper. Gives the paper color, the graph-paper grid, the fonts, `box-sizing`, friendly defaults for plain HTML (headings, links, lists, `hr`), the focus ring and the reduced-motion rule. The defaults have zero specificity, so any class of yours wins |
| `hui-plain` | Add next to `hui` to drop the graph-paper grid and keep a blank sheet |
| `hui-container` | Centered column. Max width `--hui-container` (`72rem`), side padding from `1rem` to `2rem` |
| `hui-container--narrow` | Max width `--hui-container-narrow` (`46rem`), good for articles |
| `hui-stack` | Children in a column with one gap |
| `hui-cluster` | Children in a row that wraps, centered vertically |
| `hui-grid` | Responsive grid: as many columns as fit, never thinner than `--hui-min` (`15rem` by default) |
| `hui-grid--2` | Sets `--hui-min` to `22rem`: wide columns, about two on a desktop |
| `hui-grid--3` | Sets `--hui-min` to `17rem` |
| `hui-grid--4` | Sets `--hui-min` to `13rem` |
| `hui-section` | Big vertical padding between page sections |
| `hui-section--tight` | Smaller vertical padding |
| `hui-section__head` | Centered heading group (eyebrow, title, lede), up to `50rem` wide. A `hui-lede` inside is centered |
| `hui-split` | Two columns (the second is a bit wider), centered vertically. Stacks at 860px and below |
| `hui-split--even` | Two equal columns |
| `hui-split--reverse` | Puts the first child on the right on wide screens. On small screens the order goes back to normal |
| `hui-hero` | Two-column hero (text, then media), with big vertical padding. Stacks at 900px and below |
| `hui-hero__copy` | The text column: a left-aligned column with gaps, and no outer margins on its children |
| `hui-hero__media` | The media column. It is `position: relative`, so you can pin tape, notes and doodles to it |
| `hui-sr-only` | Hides text visually but keeps it for screen readers |
| `hui-only-light` | Shown in the light theme only |
| `hui-only-dark` | Shown in the dark theme only |

## Variables

| Variable | Default | What it does |
|---|---|---|
| `--hui-gap` | `--hui-space-4` for stack, `--hui-space-3` for cluster, `--hui-space-5` for grid | The gap between children |
| `--hui-min` | `15rem` | The narrowest a `hui-grid` column may be |

Set them on the element: `<div class="hui-stack" style="--hui-gap: 2rem">`.

## Accessibility

- Layout classes add no roles. Use real elements: `<main>`, `<header>`, `<section>`, `<nav>`, `<footer>`.
- `hui-sr-only` keeps text in the accessibility tree. Use it for extra context, like `<span class="hui-sr-only">unread messages</span>` after a count.
- A skip link made with `hui-sr-only` stays invisible even when it has keyboard focus. If you want a visible skip link, add your own `:focus` style that undoes the hiding.
- `hui-only-light` and `hui-only-dark` use `display: none`, so the hidden version is also hidden from screen readers. That is what you want for a sun/moon icon pair.

## Tips

- `--hui-gap` and `--hui-min` do not inherit: they change only the block you set them on. A cluster or grid nested inside keeps its own default gap.
- The `--2`, `--3` and `--4` grid modifiers set a minimum column width, not a fixed number of columns. Narrow screens get fewer columns on their own, with no media queries.
- Cards in a `hui-grid` row stretch to the same height. Put a `hui-card__footer` at the end of each to pin buttons to the bottom.
- Keep `hui-nav` as a direct child of `<body>` (see [nav](nav.md)) and put your sections in `<main>`.
