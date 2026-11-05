# Breadcrumb and pagination

Two small navigation helpers. A breadcrumb shows where you are in a tree of pages. Pagination moves through pages of a list.

## Example

```html
<nav class="hui-breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/components">Components</a></li>
    <li><span aria-current="page">Navigation</span></li>
  </ol>
</nav>

<nav class="hui-pagination" aria-label="Pages">
  <a class="hui-pagination__item" href="?page=1" aria-label="Previous page">&larr;</a>
  <a class="hui-pagination__item" href="?page=1">1</a>
  <a class="hui-pagination__item" href="?page=2" aria-current="page">2</a>
  <a class="hui-pagination__item" href="?page=3">3</a>
  <span class="hui-pagination__gap">...</span>
  <a class="hui-pagination__item" href="?page=9">9</a>
  <a class="hui-pagination__item" href="?page=3" aria-label="Next page">&rarr;</a>
</nav>
```

## Classes

| Class | What it does |
|---|---|
| `hui-breadcrumb` | Put it on a `<nav>` that holds an `<ol>`. Styles the list, links and separators |
| `hui-pagination` | A row of page buttons that wraps |
| `hui-pagination__item` | One page link or button: a small drawn square with a hard shadow |
| `hui-pagination__gap` | The handwritten "..." between page numbers |

The breadcrumb needs no class on its items. The separators between them are small hand-drawn chevrons that CSS adds. Links are muted and get a wavy underline on hover. The item with `aria-current="page"` is bold and in the ink color. Use a `<span>` for it, as above, because the current page is not a link.

## States

| Where | State | Look |
|---|---|---|
| breadcrumb | `aria-current="page"` | Bold, ink color |
| pagination | hover | The item lifts by 1px |
| pagination | `aria-current="page"` | Filled with the brand color |
| pagination | `aria-disabled="true"` | 45% opacity, and the pointer ignores it |

## Accessibility

- Use `<nav>` with a label for each: `aria-label="Breadcrumb"` and `aria-label="Pages"`.
- The breadcrumb is an ordered list. The last item is the current page, marked `aria-current="page"`.
- Mark the current pagination item `aria-current="page"` too.
- Arrow-only items need an `aria-label` ("Previous page", "Next page").
- `aria-disabled="true"` only stops the mouse and touch (the item ignores the pointer). A disabled `<a>` can still be followed with the keyboard. For a disabled arrow, use a `<span class="hui-pagination__item" aria-disabled="true">` with no `href`.

## Tips

- Put the breadcrumb above the page title, and pagination below the list it controls.
- Show the first and last page and the pages around the current one, with a `hui-pagination__gap` for the rest, so the row stays short on a phone.
- Pagination items are links when each page has its own URL. If the page changes without navigation, use `<button type="button">` with the same class.
- Neither piece takes a tone class. The current page in pagination is filled with `--hui-brand` directly, so recolor the brand to change it (see [Foundations](../foundations.md#recolor-the-brand)).
