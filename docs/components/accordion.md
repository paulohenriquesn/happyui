# Accordion

A stack of questions that open to show an answer. Built on the native `<details>` and `<summary>` elements, so it works without any script.

## Example

```html
<div class="hui-accordion">
  <details class="hui-accordion__item" open>
    <summary>Is HappyUI free?</summary>
    <div class="hui-accordion__body">
      <p>Yes. It is MIT licensed, so you can use it in personal and commercial work.</p>
    </div>
  </details>
  <details class="hui-accordion__item">
    <summary>Does it need React?</summary>
    <div class="hui-accordion__body">
      <p>No. It is CSS classes. Use them in React, Vue, Svelte or plain HTML.</p>
    </div>
  </details>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-accordion` | The stack of items, with a gap between them |
| `hui-accordion__item` | Put it on each `<details>`: a drawn box with a small shadow. The `<summary>` inside gets its look from this class: bold text and a hand-drawn chevron on the right |
| `hui-accordion__body` | The answer area under the summary, in the softer ink color. Its last child loses the bottom margin |

## States

| State | Look |
|---|---|
| `[open]` on the `<details>` | The chevron turns over (with a bounce) and the shadow grows |
| summary hover | A soft brand tint on the summary |

## Accessibility

- `<details>` and `<summary>` are keyboard accessible without any work: Tab to the summary, Enter or Space to open and close. Assistive tech reports expanded or collapsed.
- Write the summary as the question or the title. It is the only part that shows when closed.
- The chevron is drawn by CSS and is decoration.
- Keep interactive content out of the `<summary>` itself (no buttons or links inside it).

## Tips

- Add the `open` attribute to the items that should start open.
- To let only one item stay open, give all the `<details>` the same `name` attribute. That is a native browser feature, not part of HappyUI, and it needs a current browser.
- For several related views of the same content, [tabs](tabs.md) are better. Accordions suit FAQs and long settings pages.
- Wrap the answer in `hui-accordion__body`. A bare paragraph under a `<summary>` would touch the box edge.
