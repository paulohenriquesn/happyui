# Checklist

A list with hand-drawn ticks, for features, requirements and "what you get". Items can be marked as not included.

## Example

```html
<ul class="hui-checklist hui-green">
  <li>Every component</li>
  <li>Light and dark themes</li>
  <li class="is-off">A pony <span class="hui-sr-only">(not included)</span></li>
</ul>

<ul class="hui-checklist hui-checklist--inline">
  <li>No build step</li>
  <li>Light and dark</li>
  <li>Keyboard friendly</li>
</ul>
```

## Classes

| Class | What it does |
|---|---|
| `hui-checklist` | Put it on a `<ul>`. Removes the bullets and draws a tick in front of each item |
| `hui-checklist--inline` | Lays the items out in a wrapping row, in smaller muted text |
| `is-off` | On an `<li>`: the item is "not included". The tick becomes a short dash and the text turns faint |

## Tones

The tick color is `--hui-tone-ink`, or **red ink** without a tone (like a teacher's pen). For "included" lists, add a tone such as `hui-green` to the `<ul>`: `<ul class="hui-checklist hui-green">`.

## Accessibility

- It is a normal `<ul>`, so assistive tech reads it as a list. The ticks are drawn by CSS and are not read.
- `is-off` is only a visual change. Say it in text too, with hidden text (`<span class="hui-sr-only">(not included)</span>`), as above.
- Some browser and screen reader pairs (Safari with VoiceOver) stop announcing a list when `list-style` is `none`. If this matters to you, add `role="list"` to the `<ul>`.
- Color is not the only signal: ticks and dashes have different shapes.

## Tips

- Use a checklist inside a [pricing](pricing.md) card, where the list grows to fill the card.
- Keep items short: a few words each.
- `hui-checklist--inline` is great for the small reassurance line under a hero button ("No build step", "Light and dark").
- This is a list of facts, not a task list. For things people can tick, use [choice controls](choice-controls.md).
