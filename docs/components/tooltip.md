# Tooltip

A small ink-colored bubble that shows a hint on hover and keyboard focus. It is pure CSS: add one attribute and it works. No script.

## Example

```html
<button class="hui-button hui-button--icon" type="button" aria-label="Help" data-hui-tooltip="I explain things!">
  <svg class="hui-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/></svg>
</button>

<button class="hui-button" type="button" data-hui-tooltip="I show below the button" data-hui-tooltip-pos="bottom">
  Hover me
</button>
```

## Classes

The tooltip has no class. You put one of two data attributes on any element:

| Attribute | What it does |
|---|---|
| `data-hui-tooltip="text"` | Adds the tooltip with that text. By default it appears above the element |
| `data-hui-tooltip-pos="bottom"` | Shows it below the element instead |

The bubble is up to 16rem wide and wraps long text. It has a hard shadow, a slight tilt, and uses `--hui-ink` for its background and `--hui-paper` for its text, so it flips in dark mode.

## States

- It fades and slides in on `:hover` and on `:focus-visible` of the element.
- The bubble ignores the pointer (`pointer-events: none`), so you cannot hover it.

## Accessibility

- The text lives in a CSS pseudo-element. Do not count on screen readers announcing it. The element must already have its own accessible name: visible text, or `aria-label` for an icon button.
- It shows on keyboard focus only for focusable elements (buttons, links, inputs). A tooltip on a plain `<span>` appears on hover only.
- Touch screens have no hover. Do not hide anything important in a tooltip.
- Keep it short and never put links or buttons in it. It cannot be reached.

## Tips

- It needs an element that can hold a pseudo-element. `<img>`, `<input>` and other void elements do not work. Wrap them in a `<span data-hui-tooltip="...">`.
- The attribute sets `position: relative` with zero specificity, so any `position` from your own CSS still wins.
- An ancestor with `overflow: hidden` clips the bubble. Put tooltips on elements away from the edges of such containers.
- Tooltips are for explaining small things, like an icon button. If you need a paragraph, show it in the page.
