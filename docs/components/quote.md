# Quote

A testimonial card: a big hand-drawn opening quote mark, the words in handwriting, and who said it.

## Example

```html
<figure class="hui-quote hui-tilt-slight">
  <blockquote class="hui-quote__text">
    It made our checkout page feel like a birthday card. Sales went up and so did our mood.
  </blockquote>
  <figcaption class="hui-quote__by">
    <span class="hui-avatar hui-orange" aria-hidden="true">M</span>
    <span>
      <strong>Maya Torres</strong>
      <span>runs a tiny bakery shop</span>
    </span>
  </figcaption>
</figure>
```

## Classes

| Class | What it does |
|---|---|
| `hui-quote` | The card: a drawn box with a medium shadow and corners that are the mirror image of the other cards. A large opening quote mark sticks out of the top left |
| `hui-quote__text` | The quote itself, in the handwriting font |
| `hui-quote__by` | The line with the person: a row for an avatar and a name. A `<strong>` in it is the name (on its own line), and a `<span>` is the small muted role |
| `hui-tilt-left`, `hui-tilt-right`, `hui-tilt-slight`, `hui-straight` | Rotate the card. See [Foundations](../foundations.md#tilt) |

## Tones

| Part | Uses | Default |
|---|---|---|
| The card | `--hui-tone-fill` | The surface color |
| The quote mark | `--hui-tone-ink` | Red ink |

## Accessibility

- Use the real elements: `<figure>`, `<blockquote>` for the words and `<figcaption>` for who said it.
- `hui-quote` is a plain `<figure>` with no role. Add a link or `cite` if the quote has a source.
- The avatar next to the name is decoration. The name is in the text, so mark the avatar `aria-hidden="true"`.
- The quote mark is drawn by CSS and is not read out.

## Tips

- `hui-quote__text` removes the left bar and padding that a plain `blockquote` gets inside `class="hui"`, so a `<blockquote>` and a `<p>` look the same here.
- Leave room above the card: the quote mark sticks out above the top edge. Inside a [grid](layout.md) the gap is usually enough.
- Quote real people. Short, specific sentences ("Sales went up") feel truer than praise.
- Put three quotes in a `hui-grid hui-grid--3`, with a different tone on each, or none.
