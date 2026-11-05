# Card

A sheet of paper with a pencil outline, wobble corners and a hard shadow. The workhorse container for features, products, posts and settings.

## Example

```html
<div class="hui-grid hui-grid--3">

  <div class="hui-card">
    <svg class="hui-icon hui-card__icon hui-yellow" viewBox="0 0 24 24" aria-hidden="true"><path style="fill:var(--hui-icon-accent,none)" d="m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/></svg>
    <h3 class="hui-card__title">Shared folders</h3>
    <p class="hui-card__text">A folder on one machine shows up as a drive on the other.</p>
  </div>

  <div class="hui-card hui-blue hui-tilt-left">
    <div class="hui-card__media hui-pink">
      <img src="cat.jpg" alt="A cat wearing a tiny hat">
    </div>
    <h3 class="hui-card__title">Toned and tilted</h3>
    <p class="hui-card__text">A tone class colors the whole sheet.</p>
    <div class="hui-card__footer">
      <span class="hui-card__meta">2 min read</span>
      <a class="hui-link" href="#post">Open</a>
    </div>
  </div>

  <a class="hui-card hui-card--dashed" href="#more">
    <h3 class="hui-card__title">Clickable and light</h3>
    <p class="hui-card__text">Make it a link and it lifts when you point at it.</p>
  </a>

</div>

<div class="hui-card hui-card--row">
  <svg class="hui-icon hui-card__icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/></svg>
  <div class="hui-card__body">
    <h3 class="hui-card__title">Row card</h3>
    <p class="hui-card__text">Icon on the left, words on the right.</p>
  </div>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-card` | The sheet: a column with a small gap, padding, 2px outline, wobble corners and a medium shadow. Its direct children have no outer vertical margin |
| `hui-card__icon` | A `2rem` icon at the top |
| `hui-card__title` | A handwritten title |
| `hui-card__text` | Body text, small size |
| `hui-card__meta` | A small muted line, for dates and counts |
| `hui-card__media` | A picture area at the top (at least 9rem tall, centered). An `img` or `video` inside fills it and is cropped to fit |
| `hui-card__footer` | A row pinned to the bottom of the card, with a gap. Use it for meta text and a link or button |
| `hui-card--row` | Icon on the left, words on the right. Wrap the words in `hui-card__body` |
| `hui-card__body` | The words column of a `hui-card--row` |
| `hui-card--soft` | A lighter fill |
| `hui-card--flat` | No shadow |
| `hui-card--dashed` | A light card: thin dashed outline, soft background, no shadow, small corners. For long feature grids where twelve heavy boxes would shout |
| `hui-card--lg` | Roomier padding |
| `hui-card--interactive` | Lifts on hover like a link. An `<a class="hui-card">` does this without the class |
| `hui-tilt-left`, `hui-tilt-right`, `hui-tilt-slight`, `hui-straight` | Rotate the card a little, or not at all. See [Foundations](../foundations.md#tilt) |

## Variables

| Variable | What it does |
|---|---|
| `--hui-card-padding` | The padding. `hui-card--lg` sets it. Default `1.25rem 1.4rem 1.4rem` |
| `--hui-tilt` | The rotation. Default `0deg` |

## Tones

| Part | Uses |
|---|---|
| `hui-card` | Fill `--hui-tone-fill` (surface by default). Text stays ink |
| `hui-card--soft` | Fill `--hui-tone-soft` (sunken paper by default) |
| `hui-card--dashed` | Background `--hui-tone-soft` (transparent by default) |
| `hui-card__media` | Background `--hui-tone-soft` (sunken paper by default). Put the tone on the media element |
| `hui-card__icon` | It is an icon, so a tone class on the `<svg>` gives the splash. See [icons](icons.md) |

## States

- **Interactive** (`<a class="hui-card">` or `hui-card--interactive`): on hover the card lifts up and left, turns a little more and the shadow grows. Pressed, it sinks and the shadow shrinks.

## Accessibility

- For a card that is one big link, make the card the link: `<a class="hui-card" href="...">`. It is a single tab stop and the keyboard focus ring shows around the whole card. Do not put other links or buttons inside it.
- Use a real heading level for `hui-card__title` (an `<h3>`, for example) so the page outline makes sense.
- Give every `img` inside `hui-card__media` an `alt`. Use `alt=""` when it is only decoration.

## Tips

- Tone every card in a grid and nothing stands out. Keep most cards plain and tone one or two, or use `--dashed` for the quiet ones.
- `hui-card__footer` uses `margin-top: auto`, so the footers line up at the bottom of cards of different heights in a grid.
- `--hui-card-padding` does not inherit, so a card inside a `hui-card--lg` keeps its normal padding. Set it on the card you want to change.
- Need a taped photo instead? See [frame and tape](frame-and-tape.md).
