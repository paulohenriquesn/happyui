# Pricing

A plan card: a name, a big price, a list of what you get and a button. Mark the plan you recommend with the featured style.

## Example

```html
<div class="hui-grid hui-grid--2">

  <div class="hui-price">
    <h3 class="hui-price__name">Free</h3>
    <p class="hui-price__amount">$0 <small>forever</small></p>
    <p class="hui-price__text">Everything to get started.</p>
    <ul class="hui-checklist hui-green">
      <li>Every component</li>
      <li>Light and dark themes</li>
      <li class="is-off">A pony <span class="hui-sr-only">(not included)</span></li>
    </ul>
    <a class="hui-button hui-button--block" href="#start">Start doodling</a>
  </div>

  <div class="hui-price hui-price--featured">
    <span class="hui-badge hui-badge--solid hui-red hui-price__flag">Most loved</span>
    <h3 class="hui-price__name">Team</h3>
    <p class="hui-price__amount">$9 <small>per month</small></p>
    <ul class="hui-checklist">
      <li>Everything in Free</li>
      <li>Shared color themes</li>
      <li>A sticker pack, mailed to you</li>
    </ul>
    <a class="hui-button hui-button--primary hui-button--block" href="#team">Make it happy</a>
  </div>

</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-price` | The plan card: a column with gaps, a drawn outline, wobble corners and a medium shadow |
| `hui-price__name` | The plan name, handwritten |
| `hui-price__amount` | The price in big handwriting. A `<small>` inside is the period ("per month") in small body text |
| `hui-price__text` | A short line about the plan, small and muted |
| `hui-price__flag` | Pins a badge to the top right corner, tilted. Put it on a `hui-badge` |
| `hui-price--featured` | The recommended plan: tinted fill, thicker outline, larger shadow and a tilt of -1 degree |

A `hui-checklist` inside a plan grows to fill the free height, so the buttons of neighboring plans line up at the bottom.

## Tones

The fill is `--hui-tone-fill`: the surface color for a normal plan, and the brand fill for `--featured` unless you add a tone: `<div class="hui-price hui-price--featured hui-blue">`.

## Accessibility

- Give each plan a heading (`hui-price__name` on an `<h3>`, for example) so people can jump between plans.
- Write the full price in text: "$9 per month". The `<small>` is read right after the number.
- The "Most loved" flag is a text badge, so it is read in order. Do not use color alone to show the recommended plan.
- `is-off` items need a text note such as "(not included)", see [checklist](checklist.md).

## Tips

- Show two or three plans. Make only one of them `--featured`.
- The featured plan sets its own tilt (`-1deg`), so the tilt helper classes do not change it. To straighten it, set `style="--hui-tilt: 0deg"` on the card.
- Use `hui-button--block` so every plan has a full-width button.
- Put the flag first inside the card. It is positioned absolutely, so its place in the markup does not change where it shows.
