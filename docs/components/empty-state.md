# Empty state

What a list, a page or a dashboard shows when there is nothing in it yet. A friendly drawing, a short title, a line of help and one action.

## Example

```html
<div class="hui-empty">
  <svg class="hui-icon hui-empty__art hui-yellow" viewBox="0 0 24 24" aria-hidden="true">
    <path style="fill:var(--hui-icon-accent,none)" d="M11 3c.6 3.8 1.8 5.4 6 6-4.2.6-5.4 2.2-6 6-.6-3.8-1.8-5.4-6-6 4.2-.6 5.4-2.2 6-6z"/>
    <path d="M18.5 14.5c.3 1.6.9 2.3 2.5 2.5-1.6.2-2.2.9-2.5 2.5-.3-1.6-.9-2.3-2.5-2.5 1.6-.2 2.2-.9 2.5-2.5z"/>
  </svg>
  <h3 class="hui-empty__title">Nothing here yet</h3>
  <p class="hui-empty__text">This is where your doodles will live. Start with a blank page, we will cheer from the corner.</p>
  <button class="hui-button hui-button--primary" type="button">
    <svg class="hui-icon hui-button__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
    New doodle
  </button>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-empty` | A centered column inside a dashed outline with rounded corners and generous padding |
| `hui-empty__art` | The picture at the top: a `5rem` icon in the muted ink color. Put it on an `<svg class="hui-icon">` |
| `hui-empty__title` | The handwritten title |
| `hui-empty__text` | The help text, muted, up to `26rem` wide |

## Tones

The empty state itself has no tone. To give the art a pastel splash, add a tone class to the `<svg>` and mark the shape you want filled with `fill:var(--hui-icon-accent,none)`, as above. See [icons](icons.md).

## Accessibility

- The title is a real heading, at the level that fits the page (the example uses `<h3>`).
- The art is decoration: `aria-hidden="true"`.
- The action is a normal button or link. It is the one thing a person can do here, so make its label say it ("New doodle").
- If the empty state replaces content that appears after loading, announce the change with a live region, or keep the region mounted and update its text.

## Tips

- Say what will live here and how to start. "Nothing here yet" alone is a dead end.
- One action only. If people have two ways to start, pick the main one.
- An empty state that comes from a search with no results is different: say what was searched and how to change it.
- Keep the tone warm. This is the place where the hand-drawn style does the most good.
