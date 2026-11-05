# Stat and steps

Two ways to show numbers and order. A stat is one big number with a label. Steps are a numbered path: 1, 2, 3 and done.

## Example

```html
<div class="hui-grid" style="--hui-min: 8rem">
  <div class="hui-stat">
    <span class="hui-stat__value">12,480</span>
    <span class="hui-stat__label">happy people</span>
    <span class="hui-stat__delta">+18% this month</span>
  </div>
  <div class="hui-stat">
    <span class="hui-stat__value">4.9</span>
    <span class="hui-stat__label">average rating</span>
    <span class="hui-stat__delta hui-blue">from 2,300 reviews</span>
  </div>
</div>

<ol class="hui-steps">
  <li class="hui-step"><h3 class="hui-step__title">Install</h3><p class="hui-step__text">Add one CSS file.</p></li>
  <li class="hui-step"><h3 class="hui-step__title">Doodle</h3><p class="hui-step__text">Use the classes.</p></li>
  <li class="hui-step"><h3 class="hui-step__title">Smile</h3><p class="hui-step__text">Ship it.</p></li>
</ol>

<ol class="hui-steps hui-steps--vertical hui-blue">
  <li class="hui-step"><h3 class="hui-step__title">Sign up</h3><p class="hui-step__text">It takes a minute.</p></li>
  <li class="hui-step"><h3 class="hui-step__title">Say hello</h3><p class="hui-step__text">Introduce yourself.</p></li>
</ol>
```

## Classes

| Class | What it does |
|---|---|
| `hui-stat` | A column with a value, a label and an optional delta |
| `hui-stat__value` | The big number, in the handwriting font |
| `hui-stat__label` | What the number is, in the muted color |
| `hui-stat__delta` | A small bold note under the label, like "+18% this month". It sits at the start of the line |
| `hui-steps` | Put it on an `<ol>`. Lays the steps out in columns (3 by default) |
| `hui-step` | One step (`<li>`). A tilted numbered circle, then a dashed path to the next step. The number comes from a CSS counter |
| `hui-step__title` | The step's handwritten title |
| `hui-step__text` | The step's text, small and muted |
| `hui-steps--vertical` | One column, with the path running down the left side |

Steps stack into a vertical list on screens 640px wide and narrower, on their own.

## Variables

| Variable | What it does |
|---|---|
| `--hui-steps` | How many columns `hui-steps` has. Default `3`. Set `style="--hui-steps: 4"` for four steps in a row |

## Tones

| Part | Uses | Default |
|---|---|---|
| `hui-stat__delta` | `--hui-tone-ink` | Green ink |
| `hui-steps` | `--hui-tone` for the number circles. Put the tone on the `<ol>` | The brand |

Remember that the delta text should not rely on color alone to say "up" or "down". Write the direction ("+18%", "down 4%").

## Accessibility

- Steps are an ordered list, so assistive tech can announce a list with a count. The visible numbers are drawn by a CSS counter.
- Some browser and screen reader pairs (Safari with VoiceOver) stop announcing a list when `list-style` is `none`. If it matters to you, add `role="list"` on the `<ol>`.
- Keep the step titles as real headings only when they fit your page outline. Otherwise use a `<p>` with the same class.
- For a stat, make sure the label and the value are read together. They are siblings in one block, so they are read in order.

## Tips

- Use `hui-stat` for three to five key numbers. More than that stops being a highlight.
- Round the numbers for people ("12k") unless the exact value matters.
- Steps work best for three to five items. For a longer path, use `--vertical`.
- Set `--hui-steps` to match the number of steps, so the columns share the width evenly.
