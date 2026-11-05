# Tabs

Switch between views of the same content. Two looks: drawn tabs, and a lighter "line" style with a marker under the chosen word. Keyboard support and the panel switching come from `happyui.js`.

## Example

```html
<div class="hui-tabs" data-hui-tabs>
  <div class="hui-tabs__list" role="tablist" aria-label="Platforms">
    <button class="hui-tabs__tab" type="button" role="tab" id="t-mac" aria-controls="p-mac" aria-selected="true">macOS</button>
    <button class="hui-tabs__tab" type="button" role="tab" id="t-win" aria-controls="p-win">Windows</button>
    <button class="hui-tabs__tab" type="button" role="tab" id="t-lin" aria-controls="p-lin">Linux</button>
  </div>
  <div class="hui-tabs__panel" role="tabpanel" id="p-mac" aria-labelledby="t-mac" tabindex="0">
    <p>Drag the app to your Applications folder. That is it.</p>
  </div>
  <div class="hui-tabs__panel" role="tabpanel" id="p-win" aria-labelledby="t-win" tabindex="0" hidden>
    <p>Run the installer and say yes to the friendly popup.</p>
  </div>
  <div class="hui-tabs__panel" role="tabpanel" id="p-lin" aria-labelledby="t-lin" tabindex="0" hidden>
    <p>Grab the AppImage, make it executable, done.</p>
  </div>
</div>

<div class="hui-tabs hui-tabs--line hui-blue" data-hui-tabs>
  <div class="hui-tabs__list" role="tablist" aria-label="Sections">
    <button class="hui-tabs__tab" type="button" role="tab" id="t-a" aria-controls="p-a" aria-selected="true">Overview</button>
    <button class="hui-tabs__tab" type="button" role="tab" id="t-b" aria-controls="p-b">Activity</button>
  </div>
  <div class="hui-tabs__panel" role="tabpanel" id="p-a" aria-labelledby="t-a" tabindex="0">Overview content.</div>
  <div class="hui-tabs__panel" role="tabpanel" id="p-b" aria-labelledby="t-b" tabindex="0" hidden>Activity content.</div>
</div>
```

## Classes

| Class | What it does |
|---|---|
| `hui-tabs` | The container. Add `data-hui-tabs` to wire it up |
| `hui-tabs__list` | The row of tabs. It wraps on small screens |
| `hui-tabs__tab` | One tab, drawn like a small button with a hard shadow |
| `hui-tabs__panel` | The content shown for a tab |
| `hui-tabs--line` | The lighter style: no boxes, a dashed line under the list, and a marker under the chosen tab |

## Tones

The selected tab is filled with `--hui-tone` (the brand by default) in the box style. In the `--line` style the marker under the chosen word uses the same color. Put the tone class on the `hui-tabs` container, not on a single tab: `<div class="hui-tabs hui-blue" data-hui-tabs>`.

## States

| State | Look |
|---|---|
| hover | The tab lifts by 1px (box style) |
| `aria-selected="true"` | Filled with the tone and pressed in (box style), or a marker under the word (`--line`) |
| `:focus-visible` | The blue focus ring. Panels get a wider offset |

## JavaScript

Add `data-hui-tabs` to the container. The script finds the tabs by `role="tab"` and connects each one to its panel through `aria-controls`.

- On start it selects the tab that has `aria-selected="true"`, or the first one, and hides the other panels.
- Clicking a tab selects it. Only the selected tab is in the tab order (`tabindex` 0, the others -1).
- Keys on a tab: Right and Down arrows go to the next tab, Left and Up go to the previous one (both wrap around), Home goes to the first, End to the last.
- After each change the container fires a bubbling `hui:tab` event. `event.detail.tab` is the tab button.

```js
document.querySelector("[data-hui-tabs]").addEventListener("hui:tab", (event) => {
  console.log("Now showing", event.detail.tab.id);
});
```

For tabs added later, call `HappyUI.init(container)`. Without the script the tabs do not switch.

## Accessibility

- Roles: `role="tablist"` on the list (with an `aria-label`), `role="tab"` on each tab and `role="tabpanel"` on each panel.
- Each tab needs `aria-controls` (the panel's `id`), and each panel `aria-labelledby` (the tab's `id`).
- Panels have `tabindex="0"` so keyboard users can reach their content after a tab.
- Start with exactly one tab `aria-selected="true"`, and mark the other panels `hidden` so the page is right before the script runs.
- Tabs switch content on the same page. For links to other pages, use [nav](nav.md) links with `aria-current="page"`.

## Tips

- Write `type="button"` on the tab buttons, or a tab inside a `<form>` will submit it.
- Keep tab labels to one or two words. If you have more than five or six tabs, think about another pattern.
- The ids must be unique on the page and match exactly, or the script cannot find the panel.
