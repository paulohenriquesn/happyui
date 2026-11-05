# Frame and tape

A frame is a taped-on picture, screenshot or demo. Tape is a strip you stick on a corner of a frame, card or note to make it look pinned to the page.

## Example

```html
<div class="hui-frame hui-tilt-slight">
  <span class="hui-tape hui-tape--tl"></span>
  <span class="hui-tape hui-tape--tr hui-pink"></span>
  <img src="dashboard.png" alt="The dashboard on a laptop">
</div>

<div class="hui-frame hui-frame--bare">
  <span class="hui-tape hui-tape--top hui-blue"></span>
  <img src="photo.jpg" alt="Sam at the market">
</div>

<div class="hui-card hui-tilt-right">
  <span class="hui-tape hui-tape--br hui-green"></span>
  <h3 class="hui-card__title">Tape works on cards too</h3>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-frame` | A framed picture: padding, a thick 2.5px outline, wobble corners and a large shadow. An `img`, `video`, `svg` or `canvas` that is a direct child fills the width and gets rounded corners |
| `hui-frame--bare` | No padding, so the picture touches the outline. The picture's corners follow the frame's |
| `hui-tape` | A strip of translucent tape with rough edges. Absolutely positioned, so it needs a parent that is positioned. It never blocks clicks |
| `hui-tape--tl` | Top left corner, turned a little to the left |
| `hui-tape--tr` | Top right corner, turned a little to the right |
| `hui-tape--top` | Centered on the top edge |
| `hui-tape--bl` | Bottom left corner |
| `hui-tape--br` | Bottom right corner |

The tilt helpers (`hui-tilt-left`, `hui-tilt-right`, `hui-tilt-slight`, `hui-straight`) rotate a frame. See [Foundations](../foundations.md#tilt).

## Variables

| Variable | What it does |
|---|---|
| `--hui-frame-padding` | The padding around the picture. Default `0.75rem` |
| `--hui-tape-width` | The length of a tape strip. Default `6.75rem` |
| `--hui-tilt` | The frame's rotation. Default `0deg` |

## Tones

- **Frame:** the background (the visible border area around the picture) is `--hui-tone-fill`, or the surface color without a tone.
- **Tape:** the color is `--hui-tone`, or the brand without a tone. It is slightly see-through (72% opaque, 86% in the dark theme).

## Accessibility

- Always write an `alt` on the picture. Describe what it shows, not that it is a picture.
- Tape is pure decoration. Use an empty `<span>`. It ignores the pointer, so it never covers a link under it.
- If the frame holds a screenshot with important text, repeat that text near it, because `alt` text is short.

## Tips

- Tape needs a positioned parent. `hui-frame`, `hui-card` and `hui-note` already are, so put the tape inside them. If you put tape in your own wrapper, give that wrapper `position: relative`.
- A tape strip placed inside a tilted frame rotates with it. Placed in a wrapper next to the frame, it stays straight.
- Two strips on the top corners (`--tl` and `--tr`) with different tones look like a mixed roll of tape. Use one color for a calmer look.
- `hui-frame` only styles direct children that are `img`, `video`, `svg` or `canvas`. To frame something else, put it in a `div` and style that.
