# Annotation

A handwritten note with a curved arrow that points at something, like "click a device to try it". Use it to draw the eye to one thing, the way you would circle it on paper.

## Example

```html
<span class="hui-annotation">click a device to try it</span>
<span class="hui-annotation hui-annotation--up-right hui-blue">files just fly</span>
<span class="hui-annotation hui-annotation--down-left hui-green">start here</span>
<span class="hui-annotation hui-annotation--down-right hui-purple">then here</span>
<span class="hui-annotation hui-annotation--plain">click me</span>
```

## Classes

| Class | What it does |
|---|---|
| `hui-annotation` | The note: handwriting, tilted by -3 degrees. By default the arrow is **before** the text and points **up and left** |
| `hui-annotation--up-right` | The arrow is **after** the text and points up and right |
| `hui-annotation--down-left` | The arrow is before the text and points down and left. The text lines up with the top |
| `hui-annotation--down-right` | The arrow is after the text and points down and right |
| `hui-annotation--plain` | Words only, no arrow |
| `hui-tilt-left`, `hui-tilt-right`, `hui-tilt-slight`, `hui-straight` | Change the tilt. See [Foundations](../foundations.md#tilt) |

## Variables

| Variable | What it does |
|---|---|
| `--hui-tilt` | The rotation. Default `-3deg` |

## Tones

The text and the arrow share one color: `--hui-tone-ink`, or red ink without a tone. The arrow is a CSS mask drawn in `currentColor`.

## Accessibility

- The arrow is drawn by CSS and is not read out. The words must make sense alone: "Click a device to try it", not "this".
- An annotation is not connected to its target for assistive tech. If it explains a control, give the control an `aria-describedby` that points at the annotation's `id`.
- Do not hide required instructions in an annotation. It is a friendly extra.

## Tips

- An annotation is `inline-flex`. Place it with your own CSS next to the thing it points at:

```css
.hero { position: relative; }
.hero .hui-annotation { position: absolute; top: -3rem; left: 38%; }
```

- Pick the modifier by where the target is. If the target is above and to the left of the note, use the default. If it is below and to the right, use `--down-right`.
- Keep the text short, one line. On small screens, hide it or use `--plain`.
- One or two annotations per screen. A page full of arrows is hard to read.
