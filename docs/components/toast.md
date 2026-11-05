# Toast

A small message that slides in at the bottom right, stays a few seconds and leaves. Toasts are created with one line of JavaScript, or with a data attribute on a button.

## Example

```html
<button class="hui-button hui-green" type="button"
        data-hui-toast="Your note is on the fridge."
        data-hui-toast-title="Pinned!"
        data-hui-toast-tone="green">Show a toast</button>

<button class="hui-button hui-button--primary" type="button" id="save">Save</button>

<script>
  document.querySelector("#save").addEventListener("click", () => {
    HappyUI.toast("Your changes are safe.", { title: "Saved!", tone: "green" });
    HappyUI.toast("This one stays until you close it.", { tone: "blue", timeout: 0 });
  });
</script>

<!-- A toast drawn in plain markup (for a design, or your own region) -->
<div class="hui-toast hui-pink">
  <span class="hui-toast__icon" aria-hidden="true">&#9829;</span>
  <div class="hui-toast__body">
    <strong class="hui-toast__title">Sam liked your doodle</strong>
    2 minutes ago
  </div>
  <button class="hui-toast__close" type="button" aria-label="Dismiss">&times;</button>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-toast-region` | The fixed corner (bottom right, above everything) where toasts stack. The first toast sits at the bottom and newer ones stack above it. `HappyUI.toast()` creates it for you |
| `hui-toast` | One toast: surface background, outline, wobble corners, large shadow, tilted a little. It bounces in |
| `hui-toast__icon` | The round badge on the left |
| `hui-toast__body` | The text column |
| `hui-toast__title` | An optional handwritten title on its own line |
| `hui-toast__close` | The round close button on the right |
| `is-leaving` | Plays the exit animation. The script adds it, then removes the toast |

## Tones

The icon badge uses `--hui-tone` (the brand without a tone), with the dark `--hui-on-pop` for the icon. Put the tone on the toast itself: `class="hui-toast hui-pink"`.

## JavaScript

`HappyUI.toast(message, options)` shows a toast and returns its element.

| Option | Default | What it does |
|---|---|---|
| `title` | none | A short title above the message |
| `tone` | `"yellow"` | A tone name. The toast gets the class `hui-<tone>`. Colors (`"green"`) and the aliases (`"success"`, `"danger"`, `"brand"`) all work as classes |
| `icon` | by tone | The text shown in the round badge |
| `timeout` | `4500` | Milliseconds before it leaves. `0` keeps it until it is closed |

Default icons by tone: green gets a check mark, red and orange an exclamation mark, yellow a star, blue an "i", pink a heart, purple and teal a sparkle. The semantic names follow their color: `"success"` gets the check mark, `"danger"` and `"warning"` the exclamation mark, `"info"` the "i", and `"brand"` the star.

From markup, put these on a button (found on load, or by `HappyUI.init`):

| Attribute | What it does |
|---|---|
| `data-hui-toast="message"` | The message. Required |
| `data-hui-toast-title="Title"` | The title |
| `data-hui-toast-tone="green"` | The tone, same rules as the option |

The message and title are added as text, so HTML in them is shown as typed and never runs. The close button says "Dismiss" to assistive tech and removes the toast with the exit animation. With reduced motion it leaves at once. Copy buttons ([code](code.md)) use a green toast too.

## Accessibility

- The region has `role="status"` and `aria-live="polite"`, so new toasts are announced without interrupting.
- A toast disappears by itself after 4.5 seconds by default. Do not use it for anything people must read or act on. Use an [alert](alert.md) or a [dialog](dialog.md), or pass `timeout: 0`.
- Do not put buttons that matter inside a toast. They may be gone before a keyboard user reaches them.
- The icon badge is decoration (`aria-hidden`). The words carry the meaning.

## Tips

- The default tone is `"brand"`, so toasts follow your brand color when you recolor it.
- Short messages work best: "Saved!" and a few words.
- A toast you draw in markup keeps its entry animation when it is inserted. To show a static sample, switch the animation off in your own CSS.
