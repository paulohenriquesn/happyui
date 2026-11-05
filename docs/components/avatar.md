# Avatar

A round badge for a person: initials, or a photo. Stack several in a group to show a team.

## Example

```html
<span class="hui-avatar hui-pink">A</span>
<span class="hui-avatar hui-avatar--lg hui-blue">JK</span>
<span class="hui-avatar hui-avatar--xl"><img src="ana.jpg" alt="Ana"></span>

<div class="hui-avatar-group" role="group" aria-label="Team members">
  <span class="hui-avatar hui-avatar--sm hui-pink">A</span>
  <span class="hui-avatar hui-avatar--sm hui-blue">J</span>
  <span class="hui-avatar hui-avatar--sm hui-green">K</span>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-avatar` | A 2.75rem circle with a 2px outline and a pastel fill. Initials are written in the handwriting font, sized to the circle. An `<img>` inside fills it |
| `hui-avatar--sm` | 2rem |
| `hui-avatar--lg` | 4rem |
| `hui-avatar--xl` | 5.5rem |
| `hui-avatar-group` | A row of avatars that overlap. Each one gets a paper-colored ring so the edges stay clear |

## Tones

The fill is `--hui-tone`, or the brand without a tone. The initials are the dark `--hui-on-pop`. Give each person a different tone so a row of initials is easy to tell apart.

## Accessibility

- Initials are text, so a screen reader reads "A". When the avatar sits next to the person's name, mark it `aria-hidden="true"`, so the name is not repeated.
- An avatar that stands alone needs a name: an `alt` on the photo, or `aria-label` on the initials (with `role="img"`).
- Name a group of avatars with `role="group"` and an `aria-label`, and say how many more there are if you hide some ("+3").
- Do not rely on tone alone to tell people apart.

## Tips

- Use one or two letters. More letters do not fit in a small circle.
- Photos are cropped to a circle (`object-fit: cover`). Use a square picture for the best result.
- In a `hui-avatar-group`, each avatar is drawn over the one before it and covers its right edge. The last avatar is fully visible, so put the person you most want to see last.
- Combine an avatar with a [badge](badge.md) `hui-badge--dot` or `hui-badge--count` to show presence or unread items. You place the badge yourself.
