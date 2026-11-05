# Badge

A small label for status, news or a count: "New", "Beta", "Online", "3". Badges only label things. They are not buttons.

## Example

```html
<div class="hui-cluster">
  <span class="hui-badge">Default</span>
  <span class="hui-badge hui-yellow">Yellow</span>
  <span class="hui-badge hui-pink">Pink</span>
  <span class="hui-badge hui-badge--lg hui-blue">Large</span>
  <span class="hui-badge hui-badge--solid hui-red">New in 2.0</span>
  <span class="hui-badge hui-badge--dot hui-green">Online</span>
  <span class="hui-badge hui-badge--dot hui-orange">Away</span>
  <span class="hui-badge hui-badge--hand hui-purple">so cute!</span>
  <span class="hui-badge hui-badge--count">3</span>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-badge` | A small pill with a thin outline. Plain surface unless you add a tone |
| `hui-badge--solid` | A loud label, like a "NEW" stamp: a deep ink-colored fill, white (or dark) text, uppercase, with corners that alternate big and small |
| `hui-badge--dot` | No fill, with a colored dot in front |
| `hui-badge--hand` | A handwritten sticker: Caveat font, wobble corners, tilted by 2 degrees |
| `hui-badge--lg` | A bit bigger, with `--hui-text-sm` text |
| `hui-badge--count` | A round count bubble, at least 1.5em wide, with a paper-colored outline so it stands out from what it sits on. Red ink unless you add a tone |

## Tones

| Variant | Uses |
|---|---|
| `hui-badge` | Background `--hui-tone` (surface by default), text `--hui-tone-on` |
| `hui-badge--solid` | Background `--hui-tone-ink` (ink by default), text `--hui-on-solid` |
| `hui-badge--dot` | The dot is `--hui-tone-ink` (ink by default) |
| `hui-badge--hand` | Same as the plain badge |
| `hui-badge--count` | Background `--hui-tone-ink` (red ink by default), text `--hui-on-solid` |

## Accessibility

- A badge is plain text, so screen readers read it. Do not rely on color alone: the word ("Online", "Away") carries the meaning.
- Uppercase on `hui-badge--solid` is done with CSS, so screen readers still read the original text.
- A bare count means nothing out loud. Add context: `<span class="hui-badge hui-badge--count">3<span class="hui-sr-only"> unread messages</span></span>`.
- A badge that sits on top of a button should be described by the button's label, for example `aria-label="Notifications, 3 unread"`.

## Tips

- `hui-badge--count` is not positioned for you. To pin it to a corner of an icon or avatar, give the wrapper `position: relative` and the badge `position: absolute; top: -0.5rem; right: -0.5rem`.
- Badges do not wrap (`white-space: nowrap`). Keep them to one or two words.
- Use one `--solid` badge per area. Several loud stamps cancel each other out.
- Need something pressable? Use a [chip](chip.md) or a [button](button.md).
