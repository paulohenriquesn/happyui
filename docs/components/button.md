# Button

A drawn box with a hard pencil shadow. Hover lifts it off the paper and pressing pushes it in. Use `<button>` for actions and `<a>` for links that should look like actions.

## Example

```html
<div class="hui-button-group">
  <button class="hui-button hui-button--primary" type="button">Primary</button>
  <button class="hui-button" type="button">Default</button>
  <button class="hui-button hui-button--ink" type="button">Ink</button>
  <button class="hui-button hui-button--ghost" type="button">Ghost</button>
</div>

<div class="hui-button-group">
  <button class="hui-button hui-pink" type="button">Pink</button>
  <button class="hui-button hui-blue" type="button">Blue</button>
  <button class="hui-button hui-button--sm" type="button">Small</button>
  <button class="hui-button hui-button--lg" type="button">Large</button>
  <button class="hui-button hui-button--primary" type="button" aria-busy="true">Saving</button>
  <button class="hui-button" type="button" disabled>Disabled</button>
</div>

<a class="hui-button hui-button--primary hui-button--lg" href="#download">
  <svg class="hui-icon hui-button__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M5 19.5h14"/></svg>
  <span class="hui-button__text">
    <span class="hui-button__label">Download for Mac</span>
    <span class="hui-button__hint">macOS 13 or later, 12 MB</span>
  </span>
</a>

<button class="hui-button hui-button--icon" type="button" aria-label="Add">
  <svg class="hui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
</button>
```

## Classes

| Class | What it does |
|---|---|
| `hui-button` | The base button: at least 2.75rem tall, 2px outline, wobble corners, hard shadow. Plain surface color unless you add a tone |
| `hui-button--primary` | The one main action of a screen. Sets the tone to the brand |
| `hui-button--ink` | Solid ink background with paper-colored text. It inverts in dark mode, so it always reads |
| `hui-button--ghost` | Quiet: no box and no shadow until you hover it (then a dashed outline and a sunken background) |
| `hui-button--sm` | Smaller: at least 2.25rem tall, smaller text and shadow |
| `hui-button--lg` | Larger: at least 3.5rem tall, bigger text and shadow |
| `hui-button--block` | Full width (`display: flex; width: 100%`) |
| `hui-button--icon` | A square button for a single icon (2.75rem, or 2.25rem with `--sm`, 3.5rem with `--lg`) |
| `hui-button__icon` | An icon inside a button, `1.25em`. It nudges down when you hover the button |
| `hui-button__text` | Wraps two lines of text, left-aligned |
| `hui-button__label` | The main line of `hui-button__text` |
| `hui-button__hint` | The small line under the label |
| `hui-button-group` | A row of buttons that wraps, with a gap |

## Tones

The background is `--hui-tone` and the label is `--hui-tone-on`: `<button class="hui-button hui-green">`. With no tone the button is a plain surface with ink text. `hui-button--primary` is a tone too (the brand), and a tone class beats it: `hui-button--primary hui-pink` is pink.

`hui-button--ink` ignores tones. A toned ghost button keeps its transparent background and writes its label in the tone's ink color, so `hui-button--ghost hui-red` is a quiet red action that reads well in both themes.

## States

| State | Look |
|---|---|
| hover | Moves up and left by 1px, turns by 1 degree and the shadow grows |
| active (pressed) | Pushes down into the paper and the shadow disappears |
| `:focus-visible` | A 3px blue ring, 3px away from the box |
| `aria-busy="true"` | The label hides and a dashed spinner turns in the middle. Pointer clicks are ignored |
| `:disabled`, `aria-disabled="true"` | Half opacity, `not-allowed` cursor, no lift |

## JavaScript

Buttons have no script of their own. These attributes turn any button into a trigger (the script finds them on load):

| Attribute | What it does |
|---|---|
| `data-hui-open="#id"` | Opens that `<dialog>`. See [dialog](dialog.md) |
| `data-hui-close` | Closes the dialog it sits in. See [dialog](dialog.md) |
| `data-hui-toast="message"` | Shows a toast. See [toast](toast.md) |
| `data-hui-copy="text or #id"` | Copies text to the clipboard. See [code](code.md) |
| `data-hui-theme-toggle` | Switches light and dark. See [Foundations](../foundations.md#dark-mode) |

## Accessibility

- Use `<button type="button">` for actions (add `type="submit"` for form submit) and `<a href>` for navigation. Both get the same look.
- An icon-only button needs a name: `aria-label="Add"`. Mark the icon `aria-hidden="true"`.
- For a busy button set `aria-busy="true"` and keep the label text. It is only hidden visually, so screen readers still read it. Pointer events are blocked, but a keyboard press on the focused button still fires, so ignore repeat clicks in your handler.
- `aria-disabled="true"` only changes the look. Use `disabled` on a `<button>` when you want it to stop working.
- The base height of 2.75rem is a comfortable touch target. Use `hui-button--sm` for tight toolbars, not for the main action on a phone.

## Tips

- One `hui-button--primary` per section (the nav may repeat the page's main action as a small primary). Everything else stays default or ghost.
- Labels do not wrap (`white-space: nowrap`). Keep them short, or use `hui-button--block` on small screens.
- Put a `hui-button-group` around side-by-side buttons instead of adding margins.
- Inside a `<form>`, a button without `type` submits. Always write the `type`.
