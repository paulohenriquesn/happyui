# Typography

Two voices: Caveat (handwriting) for titles and notes, Shantell Sans (a friendly marker sans) for everything you read. Inside `class="hui"`, plain `h1` to `h6`, `p`, `a`, lists and `blockquote` already look right. The `hui-*` classes let you get the same looks on any element.

## Example

```html
<span class="hui-eyebrow">New this week</span>
<h1 class="hui-display">Hello there!</h1>
<p class="hui-lede">An intro paragraph, with <a href="#docs">a plain link</a>.</p>

<h2 class="hui-h2">A handwritten title</h2>
<h3 class="hui-h3">A bold marker heading</h3>
<h4 class="hui-h4">Card title, written by hand</h4>

<p>Body text is Shantell Sans. <strong>Bold</strong>, <em>italic</em> and <span class="hui-hand">handwritten</span>.</p>
<p class="hui-small hui-muted">Small muted text for hints and captions.</p>

<a class="hui-link" href="#story">Read the story</a>
<a class="hui-link hui-link--back" href="#home">Back home</a>

<article class="hui-prose">
  <h2>A long read</h2>
  <p>Comfortable line length and spacing for articles.</p>
</article>
```

## Classes

| Class | What it does |
|---|---|
| `hui-display` | The biggest title: Caveat, bold, `--hui-hand-3xl`, tight lines. For the hero |
| `hui-h1` | Handwritten page title, `--hui-hand-2xl` |
| `hui-h2` | Handwritten section title, `--hui-hand-xl` |
| `hui-h3` | The bold "marker" heading in body font, 1.35rem to 1.75rem. For sub-sections and side-by-side blocks |
| `hui-h4` | Small handwritten heading, `--hui-hand-md`. For card titles |
| `hui-eyebrow` | The little handwritten note that sits above a title, tilted by 2 degrees |
| `hui-lede` | Intro paragraph under a title, `--hui-text-lg` |
| `hui-hand` | Switch any text to the handwriting font (bold) |
| `hui-mono` | Switch to the monospace font |
| `hui-small` | `--hui-text-sm` |
| `hui-tiny` | `--hui-text-xs` |
| `hui-muted` | Secondary text color (`--hui-ink-soft`) |
| `hui-faint` | Faintest text color (`--hui-ink-faint`) |
| `hui-center` | Centered text |
| `hui-text-ink` | Plain ink color |
| `hui-text-tone` | Text in the tone's readable ink color |
| `hui-link` | A handwritten link with an arrow after it, for "see more" moments. Works on `<a>` and `<button>` |
| `hui-link--back` | Moves the arrow to the front and points it left |
| `hui-prose` | Long-form text: a `68ch` measure, and extra space above `h2` and `h3` |

Plain elements inside `class="hui"`:

| Element | Look |
|---|---|
| `h1`, `h2` | Caveat, bold. `h1` is `--hui-hand-3xl`, `h2` is `--hui-hand-2xl` |
| `h3` to `h6` | Shantell Sans, extra bold: `1.5rem`, `1.25rem`, `1.0625rem`, `0.9375rem` |
| `a` | Blue ink, underlined. Turns wavy on hover |
| `blockquote` | Handwritten, with a bar on the left |
| `code`, `kbd`, `samp`, `pre` | Monospace |
| `hr` | The squiggly divider |

These element rules have zero specificity (`:where()`), so a class of yours always wins.

## Tones

- `hui-eyebrow` uses `--hui-tone-ink` (red ink by default).
- `hui-link` uses `--hui-tone-ink` (blue ink by default): `<a class="hui-link hui-red">`.
- `hui-text-tone` uses `--hui-tone-ink` (the brand ink by default).

## Accessibility

- Choose the heading level for the document outline, then pick the look with a class. A section title can be an `<h3>` that looks like `hui-h2`. Keep one `<h1>` per page.
- Link text uses blue ink (`--hui-blue-ink`), which has its own readable value in each theme. Links keep their underline, so they do not depend on color alone.
- Use `hui-link` on a real `<a>` for navigation, or a `<button>` for an action. Both get a visible wavy underline on hover and the focus ring on keyboard focus.
- `hui-small` and `hui-tiny` text is still 15px and 13px. Avoid going smaller for anything people need to read.

## Tips

- Handwriting is for short text. Use `hui-hand` for a word or a line, not for paragraphs.
- Load both fonts (see [Foundations](../foundations.md#getting-set-up)). Without them the stacks fall back to system handwriting and sans fonts.
- Do not put the whole page in `hui-display`. One display title per page is plenty.
- The size variables behind these classes are listed in [Foundations](../foundations.md#typography).
