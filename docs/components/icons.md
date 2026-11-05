# Icons

HappyUI does not ship an icon set. It styles any outline icon (Lucide, Tabler, Phosphor or your own) so it matches the pencil look: same stroke, rounded ends, and an optional pastel splash that follows the tone.

## Example

An SVG sprite, defined once per page, then used with `<use>`:

```html
<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="i-heart" viewBox="0 0 24 24"><path style="fill:var(--hui-icon-accent,none)" d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></symbol>
</svg>

<svg class="hui-icon" aria-hidden="true"><use href="#i-plus"/></svg>
<svg class="hui-icon hui-icon--lg hui-pink" aria-hidden="true"><use href="#i-heart"/></svg>
```

Or inline, with a `viewBox`:

```html
<button class="hui-button hui-button--icon" type="button" aria-label="Add">
  <svg class="hui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
</button>
```

## Classes

| Class | What it does |
|---|---|
| `hui-icon` | Sizes the SVG to `1.5em`, removes fill, strokes with `currentColor` (2 wide, round caps and joins) and aligns it with the text baseline |
| `hui-icon--sm` | `1.15em` |
| `hui-icon--lg` | `2em` |
| `hui-icon--xl` | `2.75em` |

Parts of other components size their own icons, and they win over the modifiers above: `hui-button__icon` (`1.25em`), `hui-card__icon` (`2rem`), `hui-option__icon` (`1.6rem`) and `hui-empty__art` (`5rem`). Use `hui-icon--sm` and friends for icons that stand on their own or sit inside a button without `hui-button__icon`.

## Variables

| Variable | What it does |
|---|---|
| `--hui-icon-size` | The icon's width and height. The size modifiers just set this. Default `1.5em` |
| `--hui-icon-accent` | The splash fill. Set by `hui-icon` to `--hui-tone` when the SVG has a tone class, otherwise to `none`. Shapes that use `fill: var(--hui-icon-accent, none)` get it |

## Tones

Mark the shapes you want filled in your SVG: `style="fill:var(--hui-icon-accent,none)"`. Then add a tone class **on the `<svg>` itself**: `<svg class="hui-icon hui-pink">`. The shapes get the tone's pop color, and the outline stays `currentColor`. Without a tone class the shapes stay empty, so one sprite serves plain and colored icons.

Tone variables do not inherit, so an icon inside a pink button does not turn pink. Put the tone class on the icon.

## Accessibility

- Decorative icons (next to a text label) get `aria-hidden="true"`.
- An icon-only button needs an accessible name: `aria-label="Add"` on the `<button>`, with the icon `aria-hidden`.
- An icon that carries meaning on its own, outside a button or link, needs `role="img"` and an `aria-label` (or a `<title>` inside the SVG).
- Icons are drawn with `currentColor`, so they follow the text color and keep contrast in both themes.

## Tips

- The sprite's `<symbol>` needs a `viewBox`. Inline SVGs need one too.
- Keep the stroke look: use outline icons with a 24-unit grid and no fills of their own. Filled icons look out of place next to the 2px pencil outlines.
- Want a hand-drawn shape that is not an SVG? See the doodles in [ink](ink.md): they are CSS masks you color with a tone.
- Hide the sprite with `position:absolute;width:0;height:0`, as above. In some browsers `display:none` can break gradients, masks and clip paths used inside a sprite.
