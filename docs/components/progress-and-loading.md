# Progress and loading

Three ways to say "hold on": a progress bar for known progress, a spinner for unknown waits and a skeleton that stands in for content that is on its way.

## Example

```html
<progress class="hui-progress" value="35" max="100" aria-label="Upload">35%</progress>
<progress class="hui-progress hui-pink" value="70" max="100" aria-label="Profile">70%</progress>

<div class="hui-cluster">
  <span class="hui-spinner" role="status" aria-label="Loading"></span>
  <span class="hui-spinner hui-pink" style="--hui-spinner-size: 2.25rem" aria-hidden="true"></span>
</div>

<div aria-busy="true">
  <span class="hui-skeleton hui-skeleton--title"></span>
  <span class="hui-skeleton hui-skeleton--text"></span>
  <span class="hui-skeleton hui-skeleton--text" style="width: 80%"></span>
  <span class="hui-skeleton hui-skeleton--circle"></span>
  <span class="hui-skeleton hui-skeleton--block"></span>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-progress` | Put it on a native `<progress>`. A pill-shaped track with a striped fill |
| `hui-spinner` | A dashed pencil circle that turns. `1.75rem` by default |
| `hui-skeleton` | A hatched placeholder bar, one line tall, with hatching that slides |
| `hui-skeleton--text` | A line of text, with a little space around it |
| `hui-skeleton--title` | A title-sized bar, 60% wide |
| `hui-skeleton--circle` | A 3rem circle, for an avatar |
| `hui-skeleton--block` | An 8rem tall block, for a picture or a card |

## Variables

| Variable | What it does |
|---|---|
| `--hui-spinner-size` | The width and height of a spinner. Default `1.75rem` |

## Tones

| Part | Uses | Default |
|---|---|---|
| `hui-progress` fill | `--hui-tone` | The brand |
| `hui-spinner` line | `--hui-tone-ink` | Plain ink |
| `hui-skeleton` | None | Neutral |

## States

- In WebKit and Blink browsers (Chrome, Edge, Safari) the stylesheet gives the fill (`::-webkit-progress-value`) a width transition of `--hui-duration-slow` (900ms).
- With `prefers-reduced-motion: reduce`, the spinner and skeleton stop moving (animations run once for 1ms), so a spinner looks like a still dashed circle. Keep a text hint ("Loading...") next to it.

## Accessibility

- A `<progress>` needs a name: `aria-label`, or a `<label>` that points to it. Always set `value` and `max`, and keep the percentage as the element's text for browsers that cannot draw it.
- A lone spinner is announced with `role="status"` and an `aria-label`. A spinner next to a text label is decoration: `aria-hidden="true"`.
- Skeletons are empty, so there is nothing to read. Put `aria-busy="true"` on the area that is loading, and remove it (and the skeletons) when the real content arrives.
- For a button waiting on something, use `aria-busy="true"` on the button. See [button](button.md).

## Tips

- A `<progress>` without a `value` is indeterminate: HappyUI fills the track with sliding stripes in the tone color. Use it, or a spinner, when you do not know how long the wait is.
- Make skeleton shapes about the size of the real content, so the page does not jump when it loads.
- Skeleton elements are `display: block`. Set a `width` inline or in your CSS for lines of different lengths.
- Show a progress bar only for work that takes a while. For short waits, a pressed button or a spinner is enough.
