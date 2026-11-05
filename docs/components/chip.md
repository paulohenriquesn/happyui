# Chip

A small toggle, filter or quick choice. It looks like a tiny tab with a hard shadow and fills with a color when it is switched on.

## Example

```html
<div class="hui-cluster" role="group" aria-label="Filter by topic">
  <button class="hui-chip" type="button" aria-pressed="true">All</button>
  <button class="hui-chip" type="button" aria-pressed="false">Design</button>
  <button class="hui-chip hui-blue" type="button" aria-pressed="true">Code</button>
  <button class="hui-chip hui-green" type="button" aria-pressed="false">Music</button>
  <button class="hui-chip" type="button" aria-pressed="false">
    <svg class="hui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
    More
  </button>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-chip` | The chip: at least 2.25rem tall, 2px outline, small shadow, small corners. Works on `<button>` and `<a>` |
| `is-active` | Switches the chip on, the same as `aria-pressed="true"`. Handy when you cannot set an ARIA attribute |

Any `<svg>` inside a chip is sized to `1.1em`.

## Tones

The color it fills with when it is on is `--hui-tone`, or the brand if there is no tone. The text on it is the dark `--hui-on-pop`. An off chip is always a plain surface: `<button class="hui-chip hui-blue" aria-pressed="true">`.

## States

| State | Look |
|---|---|
| hover | Lifts by 1px and the shadow grows |
| active (pressed) | Moves down by 1px and the shadow disappears |
| `aria-pressed="true"`, `aria-selected="true"`, `.is-active` | Filled with the tone color |

## JavaScript

HappyUI does not toggle chips for you. Flip the attribute in your own code:

```js
document.querySelectorAll(".hui-chip[aria-pressed]").forEach((chip) => {
  chip.addEventListener("click", () => {
    const on = chip.getAttribute("aria-pressed") === "true";
    chip.setAttribute("aria-pressed", String(!on));
  });
});
```

## Accessibility

- A chip that switches on and off is a `<button>` with `aria-pressed="true"` or `"false"`. Screen readers say "toggle button, pressed".
- A chip that opens a page is an `<a href>`. Mark the current one with `is-active` and `aria-current="page"`.
- For a "pick exactly one" group, radio buttons or [option](option.md) cards are a better fit than chips.
- A group of chips deserves a name: `role="group"` with `aria-label`, as above.
- The "on" state is shown by color and fill. If the meaning is critical, also change the text or add a check icon.

## Tips

- Chips are for short words. Their label does not wrap.
- Do not mix many tones in one filter row. Use one tone for the whole row and let the fill show what is on.
- A chip is not a [badge](badge.md): badges only label, chips can be pressed.
