# Option

A "pick one" card: a platform, a plan, a size. It can be a link, a button or a label around a hidden radio button. The chosen one fills with color.

## Example

```html
<div class="hui-grid" style="--hui-min: 12rem; --hui-gap: 0.9rem">

  <a class="hui-option" href="#mac">
    <svg class="hui-icon hui-option__icon" aria-hidden="true"><use href="#i-home"/></svg>
    <span class="hui-option__body">
      <span class="hui-option__title">macOS</span>
      <span class="hui-option__meta">13 or later</span>
    </span>
    <span class="hui-option__action">
      <svg class="hui-icon" aria-hidden="true"><use href="#i-download"/></svg>
    </span>
  </a>

  <a class="hui-option hui-green" href="#android" aria-current="true">
    <svg class="hui-icon hui-option__icon" aria-hidden="true"><use href="#i-leaf"/></svg>
    <span class="hui-option__body">
      <span class="hui-option__title">Android</span>
      <span class="hui-option__meta">your phone, detected</span>
    </span>
  </a>

  <label class="hui-option">
    <input type="radio" name="platform">
    <svg class="hui-icon hui-option__icon" aria-hidden="true"><use href="#i-code"/></svg>
    <span class="hui-option__body">
      <span class="hui-option__title">Linux</span>
      <span class="hui-option__meta">X11 and Wayland</span>
    </span>
  </label>

</div>
```

The icons come from an SVG sprite, see [icons](icons.md).

## Classes

| Class | What it does |
|---|---|
| `hui-option` | The card: a row with a drawn outline, wobble corners and a small shadow. Works on `<a>`, `<button>` and `<label>` |
| `hui-option__icon` | The icon on the left (`1.6rem`) |
| `hui-option__body` | The text column. Takes the free space and may shrink |
| `hui-option__title` | The bold first line |
| `hui-option__meta` | A small muted second line |
| `hui-option__action` | A small dashed circle on the right for a download, add or go icon. It fills and turns solid when you hover the option |
| `is-selected` | Marks the option as chosen, when you cannot use an attribute |

A radio button or checkbox placed directly inside `hui-option` is hidden, but stays focusable.

## Tones

When it is chosen, the card is filled with `--hui-tone-fill`, or the brand fill without a tone. The tone class goes on the option itself.

## States

| State | Look |
|---|---|
| hover | Lifts by 2px and the shadow grows |
| chosen: `aria-pressed="true"`, `aria-current="true"`, `.is-selected` or a checked input inside | Filled with the tone |
| keyboard focus on the hidden input | A 3px blue ring around the whole option |

## Accessibility

- A group of exclusive choices is best made with `<label class="hui-option">` around a real radio button, as in the third card. You get arrow-key movement, a shared `name` and form submission for free.
- A toggle is a `<button aria-pressed="true|false">`. A link to the current item gets `aria-current`.
- If you use `<a>` or `<button>`, keep your own code in charge of the chosen state: HappyUI does not toggle it.
- The icon is decoration: `aria-hidden="true"`. The title and meta text name the option.
- Do not rely on the fill color alone to show the choice. A checked radio is announced by the browser.

## Tips

- Put options in a `hui-grid` with `--hui-min`, so they fit side by side and stack on a phone.
- Use the `hui-option__action` circle only on options that start something (download, add), not on choices.
- Keep titles to one or two words and use the meta line for the detail.
- For small yes/no filters use a [chip](chip.md) instead.
