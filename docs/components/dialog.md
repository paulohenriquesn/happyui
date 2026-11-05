# Dialog

A modal window built on the native `<dialog>` element. The browser gives you focus handling and Esc to close. `happyui.js` adds the buttons that open and close it, and closing when you click outside.

## Example

```html
<button class="hui-button" type="button" data-hui-open="#delete-dialog">Open dialog</button>

<dialog class="hui-dialog" id="delete-dialog" aria-labelledby="delete-dialog-title">
  <div class="hui-dialog__inner">
    <div class="hui-dialog__head">
      <h2 class="hui-dialog__title" id="delete-dialog-title">Delete this doodle?</h2>
      <button class="hui-button hui-button--icon hui-button--sm hui-button--ghost" type="button" data-hui-close aria-label="Close">
        <svg class="hui-icon hui-icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>
    </div>
    <p class="hui-dialog__text">The doodle "Cat wearing a hat" will be gone for good. This cannot be undone.</p>
    <div class="hui-dialog__actions">
      <button class="hui-button hui-button--ghost" type="button" data-hui-close>Keep it</button>
      <button class="hui-button hui-red" type="button" data-hui-close value="delete">Delete doodle</button>
    </div>
  </div>
</dialog>
```

## Classes

| Class | What it does |
|---|---|
| `hui-dialog` | Put it on a `<dialog>`. Surface background, thick outline, wobble corners, extra large shadow, up to `32rem` wide. It bounces in, over a blurred backdrop |
| `hui-dialog__inner` | The padded content area. It scrolls if the content is taller than the screen |
| `hui-dialog__head` | The top row: title on the left, close button on the right |
| `hui-dialog__title` | The handwritten title |
| `hui-dialog__text` | Body text in the softer ink color |
| `hui-dialog__actions` | The buttons row, aligned to the right and wrapping on small screens |

## States

- `dialog[open]` plays the entrance animation.
- The `::backdrop` is `--hui-backdrop` with a small blur.

## JavaScript

| Attribute | Where | What it does |
|---|---|---|
| `data-hui-open="#id"` | On a button | Opens the `<dialog>` that matches the selector (as a modal) |
| `data-hui-close` | On any element inside the dialog | Closes the dialog. The element's `value` becomes the dialog's `returnValue` (`"close"` if it has none) |

Clicking the backdrop (outside the box) closes the dialog with the `returnValue` `"backdrop"`. Esc closes it natively. Read the result when it closes:

```js
const dialog = document.querySelector("#delete-dialog");
dialog.addEventListener("close", () => {
  if (dialog.returnValue === "delete") {
    // go ahead and delete
  }
});
```

You can also use the native methods yourself: `dialog.showModal()` and `dialog.close()`. For dialogs added after load, call `HappyUI.init(element)`.

## Accessibility

- A modal `<dialog>` moves focus into itself, keeps keyboard focus inside while open, makes the rest of the page inert and returns focus to what opened it. You get this from the browser.
- Name it: `aria-labelledby` pointing at the title.
- Always give a way out that is not the main action: a close button with `aria-label`, and a clearly worded "Keep it" next to the risky button.
- Word the risky button for what it does ("Delete doodle"), not "OK". Use a red tone for destructive actions.

## Tips

- Use `type="button"` on every button inside the dialog (unless it is a form submit). A bare button inside a `<form method="dialog">` closes the dialog on its own.
- Keep dialogs short: one question and one or two actions. A long form belongs on a page.
- The dialog opens only if the selector in `data-hui-open` matches a `<dialog>`. Check the `#id` when nothing happens.
- A modal dialog is drawn in the browser's top layer, so a parent with `overflow: hidden` or a transform cannot clip it. You can keep the markup next to the button that opens it.
