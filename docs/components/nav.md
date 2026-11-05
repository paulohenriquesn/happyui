# Nav, logo and footer

The page frame: a sticky top bar with a mobile menu, a logo, and a footer. The icons in the example come from an SVG sprite (see [icons](icons.md)).

## Example

```html
<header class="hui-nav">
  <div class="hui-container hui-nav__inner">
    <a class="hui-logo" href="/">
      <span class="hui-logo__mark"><svg class="hui-icon" aria-hidden="true"><use href="#i-smile"/></svg></span>
      happyui
    </a>

    <nav class="hui-nav__links" aria-label="Main">
      <a class="hui-nav__link" href="/docs" aria-current="page">Docs</a>
      <a class="hui-nav__link" href="/examples">Examples</a>
    </nav>

    <div class="hui-nav__actions">
      <button class="hui-button hui-button--icon hui-button--sm" type="button" data-hui-theme-toggle aria-label="Switch light or dark theme">
        <svg class="hui-icon hui-icon--sm hui-only-light" aria-hidden="true"><use href="#i-moon"/></svg>
        <svg class="hui-icon hui-icon--sm hui-only-dark" aria-hidden="true"><use href="#i-sun"/></svg>
      </button>
      <a class="hui-button hui-button--primary hui-button--sm" href="#get">Get started</a>
    </div>

    <details class="hui-nav__menu">
      <summary class="hui-button hui-button--icon hui-button--sm" aria-label="Open menu">
        <svg class="hui-icon hui-icon--sm" aria-hidden="true"><use href="#i-menu"/></svg>
      </summary>
      <div class="hui-nav__sheet">
        <a class="hui-nav__link" href="/docs" aria-current="page">Docs</a>
        <a class="hui-nav__link" href="/examples">Examples</a>
        <a class="hui-nav__link" href="#get">Get started</a>
      </div>
    </details>
  </div>
</header>

<footer class="hui-footer">
  <div class="hui-container hui-footer__inner">
    <div class="hui-footer__brand">
      <a class="hui-logo" href="/">happyui</a>
      <p>A hand-drawn design system for websites that want to smile.</p>
    </div>
    <nav class="hui-footer__cols" aria-label="Footer">
      <div>
        <h2 class="hui-footer__title">Learn</h2>
        <ul>
          <li><a href="/docs">Docs</a></li>
          <li><a href="/examples">Examples</a></li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="hui-container hui-footer__bottom">
    <span>Made with a pencil and a lot of coffee.</span>
  </div>
</footer>
```

## Classes

| Class | What it does |
|---|---|
| `hui-nav` | The sticky top bar: translucent paper with a blur and a dashed line underneath |
| `hui-nav__inner` | The row inside the bar (at least 4rem tall). Put it on a `hui-container` |
| `hui-nav__links` | The link list, pushed to the right |
| `hui-nav__link` | One link. Hover and `aria-current="page"` get a marker-colored background |
| `hui-nav__actions` | The buttons on the right (theme toggle, call to action) |
| `hui-nav__menu` | The mobile menu: a `<details>` that only shows on small screens |
| `hui-nav__sheet` | The dropdown panel inside the mobile menu |
| `hui-logo` | A logo link: a mark plus a word |
| `hui-logo__mark` | The tilted square badge for the logo. Holds an icon or a letter, and turns and grows a little when you hover the logo |
| `hui-footer` | The page footer, with a dashed line above it |
| `hui-footer__inner` | A two-part grid: brand on the left, link columns on the right. Stacks at 760px and below |
| `hui-footer__brand` | Logo plus a short line |
| `hui-footer__cols` | Link columns that fit as many as there is room for |
| `hui-footer__title` | A handwritten column title |
| `hui-footer__bottom` | The bottom row: small print, wrapped |

At 760px and below, `hui-nav__links` hides, `hui-nav__menu` shows, and every button in `hui-nav__actions` that is not a `hui-button--icon` hides.

## Tones

- `hui-logo__mark` has a `--hui-tone` background (brand by default). Put the tone class on the mark itself.
- Link hover and the current page use `--hui-brand-mark`. Footer link hover uses it too.

## States

- `.hui-nav__link:hover` and `[aria-current="page"]`: a marker-colored background.
- `hui-logo:hover`: the mark turns and grows a little.

## JavaScript

`happyui.js` handles the `<details class="hui-nav__menu">` (and `hui-menu`, see [menu](menu.md)):

- It closes when you click outside, press Esc (focus goes back to the button), or choose a `hui-nav__link`.
- Opening one menu closes any other open menu.
- For menus added later, call `HappyUI.init(element)`.

## Accessibility

- Give each `<nav>` a label (`aria-label="Main"`, `"Footer"`) when a page has more than one.
- Mark the current page with `aria-current="page"`.
- The menu button is a `<summary>`, so it works with Enter and Space and tells assistive tech if it is open. An icon-only summary needs an `aria-label`.
- Add a skip link to `<main id="main">` as the first thing in the body. If you use `hui-sr-only` for it, it stays invisible even when focused (see [layout](layout.md)).
- The theme toggle button needs an `aria-label`. The script keeps its `aria-pressed` in sync (`true` in the dark theme).

## Tips

- Repeat the links in both `hui-nav__links` and `hui-nav__sheet`. The bar hides one and shows the other, they do not share markup.
- Keep `hui-nav` as a direct child of `<body>`. Sticky only follows you inside a parent that is as tall as the page.
- Logo mark with a letter instead of an icon: `<span class="hui-logo__mark hui-pink">h</span>`.
- Put at most one `hui-button--primary` in the bar.
