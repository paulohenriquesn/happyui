# Table

A plain data table on a sheet of paper: a sunken header, dashed row lines and a row that lights up under the pointer.

## Example

```html
<div class="hui-table-wrap">
  <table class="hui-table">
    <caption>Doodles this week</caption>
    <thead>
      <tr>
        <th scope="col">Artist</th>
        <th scope="col">Doodle</th>
        <th scope="col">Status</th>
        <th scope="col" class="is-num">Likes</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="hui-cluster" style="--hui-gap: 0.6rem"><span class="hui-avatar hui-avatar--sm hui-pink">A</span>Ana</span></td>
        <td>Cat in a hat</td>
        <td><span class="hui-badge hui-badge--dot hui-green">Live</span></td>
        <td class="is-num">128</td>
      </tr>
      <tr>
        <td><span class="hui-cluster" style="--hui-gap: 0.6rem"><span class="hui-avatar hui-avatar--sm hui-blue">J</span>Jo</span></td>
        <td>Rainy window</td>
        <td><span class="hui-badge hui-badge--dot hui-orange">Draft</span></td>
        <td class="is-num">64</td>
      </tr>
    </tbody>
  </table>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-table-wrap` | The sheet around the table: surface background, outline, small corners and a shadow. It scrolls sideways when the table is too wide |
| `hui-table` | The table itself: full width, small text, collapsed borders |
| `is-num` | On a `<th>` or `<td>` inside `hui-table`: right-aligned numbers with equal-width digits |

Styles that come with `hui-table`:

- `<caption>` is handwritten and aligned left, above the header.
- `<thead> th` is small, bold, uppercase and muted, on a sunken background with a line below it.
- Rows are separated by thin dashed lines. A row hover uses a soft brand tint.

## Accessibility

- Use real table markup: `<caption>` for the title, `<th scope="col">` for column headers and `<th scope="row">` for a row header.
- A table that scrolls sideways on small screens should be reachable with the keyboard. Add `tabindex="0"`, `role="region"` and an `aria-labelledby` or `aria-label` to the `hui-table-wrap`.
- The hover color is a hint, not information. Do not rely on it.
- Do not use a table for layout. Use [layout](layout.md) classes instead.

## Tips

- Align numbers to the right with `is-num` on both the header and the cells, so the column lines up.
- Keep a `hui-table-wrap` around every table. Without it a wide table breaks the page on a phone, and the sheet look goes away.
- The table takes no tone. Tone the things inside the cells, like the [badge](badge.md) and [avatar](avatar.md) above. The row hover uses `--hui-brand-soft`.
- Badges and avatars inside cells keep their size, so rows stay about 3rem tall.
- Sorting and filtering are up to you. Style a sort button as a small `hui-button--ghost` inside the `<th>`.
