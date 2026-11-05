# Choice controls

Checkbox, radio, switch and range slider. They are the real `<input>` elements, drawn by hand with CSS, so forms, keyboards and screen readers work as usual.

## Example

```html
<fieldset class="hui-fieldset">
  <legend>Checkboxes</legend>
  <label class="hui-check"><input type="checkbox" checked> Send me the weekly doodle</label>
  <label class="hui-check hui-pink"><input type="checkbox" checked> Pink ones are allowed too</label>
  <label class="hui-check"><input type="checkbox" disabled> Not available</label>
</fieldset>

<fieldset class="hui-fieldset">
  <legend>Size</legend>
  <div class="hui-cluster">
    <label class="hui-radio"><input type="radio" name="size" checked> Small</label>
    <label class="hui-radio"><input type="radio" name="size"> Medium</label>
    <label class="hui-radio hui-blue"><input type="radio" name="size"> Huge</label>
  </div>
</fieldset>

<fieldset class="hui-fieldset">
  <legend>Switches and sliders</legend>
  <label class="hui-switch"><input type="checkbox" role="switch" checked> Cheerful sounds</label>
  <label class="hui-switch hui-purple"><input type="checkbox" role="switch"> Night mode</label>
  <label class="hui-label" for="happy">Happiness level</label>
  <input class="hui-range" id="happy" type="range" min="0" max="100" value="72">
</fieldset>
```

## Classes

| Class | What it does |
|---|---|
| `hui-check` | A checkbox with its label. Put it on the `<label>` and make the `<input type="checkbox">` its direct child |
| `hui-radio` | A radio button with its label. Same markup, `<input type="radio">` |
| `hui-switch` | An on/off switch with a bouncy knob. Put it on the `<label>` around `<input type="checkbox" role="switch">` |
| `hui-range` | A range slider. Put it on `<input type="range">` |

The whole label is clickable. The check mark is a hand-drawn tick that pops in with a bounce, and the radio shows a dot.

## Tones

| Control | Uses | Default |
|---|---|---|
| `hui-check`, `hui-radio` | `--hui-tone` for the checked fill | The brand |
| `hui-switch` | `--hui-tone` for the "on" track | **Green** |
| `hui-range` | `--hui-tone` for the thumb and the filled part of the track | The brand |

Marks on the pop color are the dark `--hui-on-pop`. Put the tone on the label (or on the range input itself).

## States

| State | Look |
|---|---|
| `:checked` | Filled with the tone, and the tick, dot or knob moves in |
| `:indeterminate` (checkbox) | Filled, with a short dash instead of a tick |
| `:active` | Presses down 1px (checkbox and radio), or the thumb grows (range, in Chrome and Safari) |
| `:focus-visible` | A 3px blue ring |
| `:disabled` | Half opacity. A disabled checkbox or radio also makes its label text faint and shows the `not-allowed` cursor |

The indeterminate state has no HTML attribute. Set it from script:

```js
document.querySelector("#select-all").indeterminate = true;
```

## Accessibility

- Keep the `<input>` as the direct child of the `<label>` (the styles use `.hui-check > input`). Do not hide it with `display: none`: it must stay focusable.
- Group checkboxes and radios in a `<fieldset>` with a `<legend>`. Radios in one group share a `name`, and arrow keys move between them.
- A switch is a checkbox with `role="switch"`. Screen readers say "switch, on" or "off".
- A range slider needs a visible `<label for>`. Show the current value in text if people need the exact number.
- Disabled controls are skipped by the keyboard. Say why they are disabled nearby.

## Tips

- A single yes/no setting that takes effect right away is a switch. A choice you confirm with a submit button is a checkbox.
- The filled part of the track uses the tone color. Firefox paints it on its own. In Chrome and Safari, `happyui.js` keeps a `--hui-range-pct` variable in sync with the value; without the script the track stays plain there and only the thumb is colored.
- Want bigger choice cards with an icon and a description? Use [option](option.md).
