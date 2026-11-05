# Ink

The marks a person leaves on paper: a highlighter box, a marker stroke, a swoosh underline, a strike-through, a circle, squiggly dividers and tiny doodles. Inside a `hui-reveal` block, the marker, scribble and strike draw themselves as you scroll.

## Example

```html
<h2 class="hui-h2 hui-reveal">
  Make something <span class="hui-marker hui-pink">happy</span>
</h2>

<p>
  Works with <span class="hui-highlight hui-blue">React</span>,
  <span class="hui-highlight hui-green">Vue</span> and plain HTML.
</p>

<p class="hui-h3">
  Great at their own jobs, <span class="hui-strike">terrible together</span>.
</p>

<p class="hui-h3">
  A <span class="hui-circled">circled</span> word and an
  <span class="hui-scribble">underlined</span> one.
</p>

<hr class="hui-divider">
<hr class="hui-divider hui-divider--dashed">
<div class="hui-divider-label">or</div>

<div class="hui-cluster">
  <span class="hui-doodle hui-doodle--star hui-yellow" aria-hidden="true"></span>
  <span class="hui-doodle hui-doodle--heart hui-pink" style="--hui-doodle-size: 3.5rem" aria-hidden="true"></span>
  <span class="hui-doodle hui-doodle--arrow hui-red" aria-hidden="true"></span>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-highlight` | A highlighter box over a word or phrase. Inline, wraps across lines, dark text |
| `hui-marker` | A marker stroke behind the lower half of the text. Made for titles. Draws itself in a revealed block |
| `hui-scribble` | A hand-drawn swoosh under a short phrase. Does not wrap. Draws itself in a revealed block |
| `hui-strike` | A pen line through words you take back. Draws itself in a revealed block. Wraps normally on screens 560px and narrower |
| `hui-circled` | A loose pen circle around one word. Does not wrap. It does not animate |
| `hui-divider` | A squiggly line between blocks. Put it on an `<hr>` (or any empty element) |
| `hui-divider--dashed` | With `hui-divider`: a straight dashed line instead of the squiggle |
| `hui-divider-label` | A divider with a word in the middle, like "or". The word is handwritten |
| `hui-doodle` | A tiny drawing, colored by the tone. Needs one of the shapes below. Empty element |
| `hui-doodle--star` | A four-point star |
| `hui-doodle--sparkle` | A sparkle with rays |
| `hui-doodle--heart` | A heart |
| `hui-doodle--sun` | A sun |
| `hui-doodle--swirl` | A swirl |
| `hui-doodle--arrow` | A curved arrow, 1.6 times wider than the other shapes |
| `hui-doodle--check` | A hand-drawn check mark |

## Variables

| Variable | What it does |
|---|---|
| `--hui-doodle-size` | The height of a doodle (and the width, except the arrow). Default `2.25rem` |

## Tones

| Effect | Uses | Default |
|---|---|---|
| `hui-highlight` | `--hui-tone` (the pop), dark text | The brand |
| `hui-marker` | `--hui-tone-mark` | The brand mark |
| `hui-scribble`, `hui-strike`, `hui-circled` | `--hui-tone-ink` | Red ink |
| `hui-doodle` | `--hui-tone-ink` | The brand ink |
| `hui-divider`, `hui-divider-label` | None | Neutral |

## States

- **Draw on reveal.** Inside a `hui-reveal` block, or on an element that has `hui-reveal` itself, `hui-marker`, `hui-scribble` and `hui-strike` start undrawn and draw in when the block scrolls into view. Without the script (no `hui-js` on `<html>`) they are simply drawn. See [motion](motion.md).

## Accessibility

- The marks are decoration. The words stay in the text, so screen readers read them normally.
- Doodles are empty `<span>`s: add `aria-hidden="true"`.
- `hui-strike` is only a drawing. If the crossed-out text matters, add hidden context: `<span class="hui-sr-only">(crossed out)</span>`.
- Do not use color alone to carry meaning. A green highlight on "Live" is fine, but the word is what says it.
- `hui-divider` on an `<hr>` is announced as a separator, which is usually what you want.

## Tips

- `hui-marker` is for titles, `hui-highlight` is for words inside body text. Use one or two effects per screen.
- `hui-scribble` and `hui-circled` do not wrap, so keep them to one word or a short phrase. `hui-circled` also needs a little space around it, because its circle sticks out of the text.
- Want an effect on a loose element, like an icon? Doodles are made for that: color them with a tone class and place them with your own CSS.
- The drawings are CSS masks. Use them in your own CSS, see [Foundations](../foundations.md#shared-drawings).
