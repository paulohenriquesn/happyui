# Menu

A dropdown menu of actions, built on the native `<details>` element. It works without script, and `happyui.js` makes it close when you click away or press Esc.

## Example

```html
<details class="hui-menu">
  <summary class="hui-button">Options</summary>
  <div class="hui-menu__list">
    <span class="hui-menu__label">This note</span>
    <button class="hui-menu__item" type="button">Edit <kbd class="hui-kbd">E</kbd></button>
    <button class="hui-menu__item" type="button">Duplicate</button>
    <a class="hui-menu__item" href="#favorites">Add to favorites</a>
    <hr class="hui-menu__sep">
    <button class="hui-menu__item hui-menu__item--danger" type="button">Delete</button>
  </div>
</details>

<details class="hui-menu hui-menu--end">
  <summary class="hui-button hui-button--icon" aria-label="More actions">
    <svg class="hui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  </summary>
  <div class="hui-menu__list">
    <button class="hui-menu__item" type="button">Rename</button>
  </div>
</details>
```

## Classes

| Class | What it does |
|---|---|
| `hui-menu` | Put it on a `<details>`. The wrapper is `inline-block` and positioned |
| `hui-menu--end` | The list lines up with the right edge of the button instead of the left |
| `hui-menu__list` | The floating panel: surface background, outline, wobble corners, large shadow. Pops in when opened |
| `hui-menu__item` | One row, a `<button>` or an `<a>`. A `<kbd>` inside is pushed to the right, an `<svg>` is sized to `1.1em` |
| `hui-menu__item--danger` | A destructive action in red ink |
| `hui-menu__sep` | A dashed separator line. Use it on an `<hr>` |
| `hui-menu__label` | A small handwritten group title |

The `<summary>` can be any element you like. If it is a `hui-button`, it looks pressed while the menu is open.

## States

| State | Look |
|---|---|
| `[open]` on the `<details>` | The list shows. A `summary.hui-button` is pushed in |
| item hover or `:focus-visible` | A marker-colored background |
| danger item hover | A soft red background |

## JavaScript

`happyui.js` adds behavior to `details.hui-menu` (and the mobile `details.hui-nav__menu`, see [nav](nav.md)):

- Clicking outside the menu closes it.
- Choosing an item (`hui-menu__item`) closes it.
- Opening a menu closes any other open menu.
- Esc closes every open menu and puts focus back on its `<summary>`.

Run `HappyUI.init(element)` for menus added after the page loaded. Your own code can listen for the native `toggle` event on the `<details>`.

## Accessibility

- `<summary>` is a button for the keyboard: Enter or Space opens and closes it, and assistive tech reports expanded or collapsed.
- The items are ordinary buttons and links, reachable with Tab. Plain buttons are the right fit here. `role="menu"` and `role="menuitem"` promise arrow-key movement between items, which `happyui.js` does not provide, so this page leaves them out. Add them only if you also write that keyboard code.
- An icon-only summary needs an `aria-label`.
- Use `<button>` for actions and `<a>` for navigation. Mark the dangerous one clearly with text, not only with the red color.

## Tips

- The list is absolutely positioned. An ancestor with `overflow: hidden` can clip it.
- Use `hui-menu--end` for a menu near the right edge of the screen, so the list does not run off the page.
- The list sits above content at `--hui-z-dropdown` (60), and below toasts.
- A menu is for commands ("Edit", "Delete"). For site navigation use [nav](nav.md), and for choosing a value use a `<select>` in [forms](forms.md).
