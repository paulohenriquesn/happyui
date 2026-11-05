# Forms

Native controls with a fresh coat of paint. Every control keeps its real element, so keyboards, screen readers and autofill keep working. This page covers the field wrapper, label, hint, error, text inputs, select, input group and fieldset. Checkboxes, radios, switches and sliders are in [choice controls](choice-controls.md).

## Example

```html
<form class="hui-stack" style="--hui-gap: 1.1rem">

  <div class="hui-field">
    <label class="hui-label" for="name">Your name</label>
    <input class="hui-input" id="name" placeholder="Sam Smiles" autocomplete="name">
  </div>

  <div class="hui-field">
    <label class="hui-label" for="email">E-mail <span class="hui-label__aside">we never spam</span></label>
    <input class="hui-input" id="email" type="email" placeholder="sam@example.com" aria-describedby="email-hint">
    <p class="hui-hint" id="email-hint">We only write when something good happens.</p>
  </div>

  <div class="hui-field">
    <label class="hui-label" for="plan">Plan</label>
    <div class="hui-select">
      <select id="plan">
        <option>Free, for one person</option>
        <option>Team, up to 10 people</option>
      </select>
    </div>
  </div>

  <div class="hui-field">
    <label class="hui-label" for="code">Invite code</label>
    <input class="hui-input" id="code" value="HAPPY-2O26" aria-invalid="true" aria-describedby="code-error">
    <p class="hui-error" id="code-error">That code has a letter O where a zero should be.</p>
  </div>

  <div class="hui-field">
    <label class="hui-label" for="note">Note <span class="hui-label__aside">optional</span></label>
    <textarea class="hui-textarea" id="note" placeholder="Say something nice..."></textarea>
  </div>

  <fieldset class="hui-fieldset">
    <legend>How should we reach you?</legend>
    <label class="hui-check"><input type="checkbox" checked> E-mail</label>
    <label class="hui-check"><input type="checkbox"> Text message</label>
  </fieldset>

  <div class="hui-field">
    <label class="hui-label" for="news">Get the newsletter</label>
    <div class="hui-input-group">
      <input class="hui-input" id="news" type="email" placeholder="you@example.com">
      <button class="hui-button hui-button--ink" type="button">Join</button>
    </div>
  </div>

  <div class="hui-button-group">
    <button class="hui-button hui-button--primary" type="submit">Save note</button>
    <button class="hui-button hui-button--ghost" type="reset">Clear</button>
  </div>
</form>
```

## Classes

| Class | What it does |
|---|---|
| `hui-field` | Groups a label, a control and a hint or error in a column with a small gap |
| `hui-label` | The label: bold, small. It is a flex row, so an aside inside it goes to the right edge |
| `hui-label__aside` | A little handwritten aside next to a label, like "optional" |
| `hui-hint` | Small helper text under a control |
| `hui-error` | An error message with a red "!" bubble in front. Draws the bubble itself |
| `hui-input` | A text input: a drawn box on the surface color with a hard shadow. Works on `text`, `email`, `password`, `number` and friends |
| `hui-input--sm` | A smaller `hui-input` (at least 2.25rem tall) |
| `hui-input--lg` | A larger `hui-input` (at least 3.5rem tall) |
| `hui-textarea` | A multi-line input, at least 7rem tall, resizable up and down |
| `hui-select` | A wrapper around a native `<select>` that adds the drawn chevron. The `<select>` must be a direct child |
| `hui-input-group` | An input and a button (or any control) side by side. The `hui-input` takes the free space |
| `hui-fieldset` | A `<fieldset>` without the browser border, with a gap between its items. Style its `<legend>` for free |

## States

| State | Look |
|---|---|
| hover | The shadow grows |
| focus | Border and shadow turn blue (`--hui-focus`) and the browser outline is replaced by that |
| `aria-invalid="true"` | Red ink border and red shadow. Pair it with a `hui-error` |
| `:disabled` | Faint text, sunken background, no shadow, `not-allowed` cursor |

Placeholders are written in the handwriting font.

## Accessibility

- Every control needs a label: `<label for>` pointing to the control's `id`. A `placeholder` is not a label.
- Link hints and errors with `aria-describedby`, as above.
- Invalid fields are styled by `aria-invalid="true"`, not by the browser's `:invalid`. Set the attribute from your validation code, and remove it when the value is fixed.
- If an error appears after the user typed, give the message `role="alert"` (or put it in a live region) so it is announced.
- The focus look is a color change plus an offset shadow. Do not remove it.
- Use `<fieldset>` and `<legend>` to group related checkboxes or radios.

## Tips

- Form fields do not take tones. Tones are for the choice controls: see [choice controls](choice-controls.md).
- `hui-input--sm` and `hui-input--lg` only apply to `hui-input`, not to `hui-textarea` or the select.
- Use the right `type` (`email`, `tel`, `number`) so phones show the right keyboard, and `autocomplete` so autofill works.
- A `hui-field` inside a `hui-stack` is the usual way to space a whole form.
