# Alert

A message that sits in the page and tells people what happened: success, information, a warning or an error. It does not disappear on its own. For a message that comes and goes, use a [toast](toast.md).

## Example

```html
<div class="hui-alert hui-success" role="status">
  <span class="hui-alert__icon">
    <svg class="hui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>
  </span>
  <div class="hui-alert__body">
    <p class="hui-alert__title">All saved!</p>
    <p class="hui-alert__text">Your changes are safe. Go grab a snack.</p>
  </div>
</div>

<div class="hui-alert hui-danger" role="alert">
  <span class="hui-alert__icon">
    <svg class="hui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
  </span>
  <div class="hui-alert__body">
    <p class="hui-alert__title">That did not work</p>
    <p class="hui-alert__text">We could not reach the server. Check your Wi-Fi and try again.</p>
  </div>
  <button class="hui-button hui-button--icon hui-button--sm hui-button--ghost hui-alert__close" type="button" aria-label="Dismiss">
    <svg class="hui-icon hui-icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
  </button>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-alert` | The box: a tinted background, a drawn outline, wobble corners, a medium shadow. Icon and text in a row |
| `hui-alert__icon` | A round badge for the icon, tilted a little. Put an `<svg>` inside |
| `hui-alert__body` | The text column, which takes the free space |
| `hui-alert__title` | A short handwritten title |
| `hui-alert__text` | The message, small size |
| `hui-alert__close` | Pushes a close button to the right edge. Put it on a `<button>` |

Semantic tone classes for the box: `hui-success` (green), `hui-info` (blue), `hui-warning` (orange) and `hui-danger` (red). The normal color names (`hui-green`, `hui-blue` and so on) work too.

## Tones

| Part | Uses |
|---|---|
| Background | `--hui-tone-soft` (the plain surface without a tone) |
| Icon badge | `--hui-tone` (the brand without a tone), with the dark `--hui-on-pop` for the icon |

## Accessibility

- Use `role="status"` for friendly updates (success, info) and `role="alert"` for errors that need attention now. Alerts that are already in the page when it loads are not announced, so these roles matter mostly for messages you add with script.
- Color is not the only signal: each alert has a title, text and a different icon. Keep that habit (check for success, "i" for info, a triangle for warning, a cross for error).
- The close button needs an accessible name (`aria-label="Dismiss"`), and your script has to remove the alert and move focus somewhere sensible.

## Tips

- Say what happened and what to do next. "We could not reach the server. Check your Wi-Fi and try again." beats "Error 503".
- One alert at a time per area. A stack of four is noise.
- Put the alert near what it is about, for example above the form it talks about.
- For a short-lived message ("Copied!"), use a [toast](toast.md). For a decision, use a [dialog](dialog.md).
