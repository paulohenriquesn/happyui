# Window

A pretend app window with a title bar and three dots. Use it to frame demos, product mock-ups and screenshots.

## Example

```html
<div class="hui-window">
  <div class="hui-window__bar">
    <span class="hui-window__dot"></span>
    <span class="hui-window__dot"></span>
    <span class="hui-window__dot"></span>
    <span class="hui-window__title">Tiny Wins, today</span>
  </div>
  <div class="hui-window__body hui-stack" style="--hui-gap: 0.85rem">
    <label class="hui-check"><input type="checkbox" checked> Drink a big glass of water</label>
    <label class="hui-check hui-green"><input type="checkbox"> Ten minute walk outside</label>
    <progress class="hui-progress hui-green" value="50" max="100" aria-label="Progress today">50%</progress>
  </div>
</div>

<div class="hui-window hui-window--night hui-tilt-right">
  <div class="hui-window__bar">
    <span class="hui-window__dot"></span>
    <span class="hui-window__dot"></span>
    <span class="hui-window__dot"></span>
    <span class="hui-window__title">Night mode</span>
  </div>
  <div class="hui-window__body">
    <p>A dark screen inside the sketch.</p>
  </div>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-window` | The window: rounded corners that clip its content, a 2px outline, a large shadow and a surface background |
| `hui-window__bar` | The title bar: a sunken strip with a line under it |
| `hui-window__dot` | One of the three dots. In order they are red, yellow and green |
| `hui-window__title` | The window title, a little away from the dots |
| `hui-window__body` | The content area, with padding |
| `hui-window--night` | A dark screen inside the sketch, like an app at night: deep navy surfaces and a dark gradient, whatever the page theme |
| `hui-tilt-left`, `hui-tilt-right`, `hui-tilt-slight`, `hui-straight` | Rotate the window. See [Foundations](../foundations.md#tilt) |

## Variables

| Variable | What it does |
|---|---|
| `--hui-window-padding` | The padding of the body. Default `1.25rem` |
| `--hui-tilt` | The rotation. Default `0deg` |

## Accessibility

- The window is a plain container with no roles. The dots are empty spans, so there is nothing for a screen reader to read in the bar except the title text.
- Content inside a window is real content: use real controls, labels and headings in it.
- A fake window that is only a picture of an app should have an `alt` or be described in nearby text.

## Tips

- `hui-window--night` carries the whole dark theme, with navy surfaces on top. Headings, labels, outlines and any component you put inside read correctly whatever the page theme.
- The window takes no tone. The three dots use fixed colors (`--hui-red`, `--hui-yellow`, `--hui-green`), and the things inside it take tones as usual.
- The window clips its content (`overflow: hidden`), so a tape or annotation inside it can be cut off. Put those on a wrapper around the window.
- Place a [tape](frame-and-tape.md) on the wrapper and a [note](note.md) next to it for a pinned-to-the-desk look.
