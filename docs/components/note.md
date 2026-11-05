# Note

A sticky note: pastel paper in handwriting, tilted a little, with a soft lifted shadow. Use it for tips, reminders and little human touches.

## Example

```html
<div class="hui-cluster" style="align-items: flex-start">
  <div class="hui-note" style="width: 9.5rem">
    buy more coffee
    <small>before monday</small>
  </div>
  <div class="hui-note hui-green" style="width: 8.75rem; --hui-tilt: 2deg">
    ship it friday!
  </div>
  <div class="hui-note hui-blue hui-tilt-right" style="width: 9rem">
    be kind to the new intern
    <span class="hui-note__by">sam, 5 pm</span>
  </div>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-note` | The sticky note: handwriting font, dark text, a soft light-to-color paper gradient, a rounded curl at the bottom left corner, and a tilt of -2 degrees by default |
| `hui-note__by` | A small line under the text (like a signature or time). A plain `<small>` inside a note looks the same |
| `hui-tilt-left`, `hui-tilt-right`, `hui-tilt-slight`, `hui-straight` | Change the tilt. See [Foundations](../foundations.md#tilt) |

Children of a note lose their outer margins and get a small gap between them.

## Variables

| Variable | What it does |
|---|---|
| `--hui-tilt` | The rotation. Default `-2deg` (the note is the only paper piece that leans by default) |

## Tones

The paper color is `--hui-tone`, or the brand without a tone, with a faint white gradient on top. The text is the dark `--hui-on-pop` in both themes.

## Accessibility

- A note is plain text in a block. Use the element that fits: `<p>` for a short line, `<aside>` for a side remark, `<blockquote>` if it is a quote.
- Pastel paper with dark text stays readable in light and dark themes, because the pop colors stay light.
- Do not hide important information in a note that looks decorative. Rotation is only visual, so reading order is unchanged.

## Tips

- A note fills the width of its container (`display: block`). Give it a width, as above, or put it in a grid.
- Stick a [tape](frame-and-tape.md) on a note for a "pinned" look.
- To pin a note over another block, wrap both in a `position: relative` box and place the note with your own `position: absolute`.
- A column of notes in different tones with different tilts looks like a real desk. Keep tilts small.
