# Callout and banner

Two ways to ask for attention. A callout is a big colored box that asks for one action. A banner is the small tilted "what's new" pill that sits at the top of a page.

## Example

```html
<a class="hui-banner" href="#news">
  <span class="hui-badge hui-badge--solid hui-red">New</span>
  Version 1.0 is out. Come say hi
</a>

<div class="hui-callout">
  <p class="hui-callout__title">
    Two computers on one desk?
    <em>You're two clicks away.</em>
  </p>
  <div class="hui-button-group">
    <button class="hui-button" type="button">Mac</button>
    <button class="hui-button hui-button--primary" type="button">Windows</button>
  </div>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-callout` | A big box: tinted fill, thick outline, wobble corners, large shadow. Title on one side, actions on the other, wrapping on small screens. Tilted by -0.8 degrees |
| `hui-callout__title` | The handwritten title. An `<em>` inside it becomes a second line in blue ink (not italic) |
| `hui-banner` | A small inline pill with a thin outline, tilted by -1.5 degrees. It never gets wider than its container |

A banner that is an `<a>` also gets an arrow after the text. The arrow slides right on hover.

## Tones

Both use `--hui-tone-fill` as the background, or the brand fill without a tone: `<div class="hui-callout hui-blue">`. Text stays ink. The `<em>` line in a callout title is always blue ink (`--hui-blue-ink`) and does not follow the tone.

## States

- `a.hui-banner:hover`: the banner straightens, lifts by 2px and the arrow slides right.

## Accessibility

- Write the banner link text so it makes sense alone: "Version 1.0 is out. Come say hi". The arrow is drawn by CSS and is only decoration.
- Do not put more than one primary action in a callout. If it has two buttons, make only one `hui-button--primary`.
- A callout is not an alert: it does not announce itself. For status messages that change, use [alert](alert.md) with a role.

## Tips

- Use one callout per page, near the end, as the last nudge. More than one stops being a callout.
- Straighten them with `hui-straight`, or tilt them with the helpers: both read `--hui-tilt`. See [Foundations](../foundations.md#tilt).
- A banner pairs well with a `hui-badge--solid` at the front, as above.
- The banner is `inline-flex`: put it alone on a line, or in a `hui-cluster` with other things.
