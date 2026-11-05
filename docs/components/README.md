# HappyUI components

One page per component family. Each page has a copy-paste example, a table of every class, and notes on tones, states, JavaScript, accessibility and common mistakes. For colors, type, spacing and dark mode, read [Foundations](../foundations.md). To see everything live, open the [showcase](../index.html).

## Rules that work everywhere

- **Page setup.** Load Caveat and Shantell Sans, `happyui.css` and (optionally) `happyui.js`, then put `class="hui"` on `<body>`. See [Getting set up](../foundations.md#getting-set-up).
- **Names.** `hui-card` is a component, `hui-card__title` is a part of it and `hui-card--dashed` is a variant. `is-in`, `is-active`, `is-selected`, `is-off`, `is-num` and `is-leaving` are state classes.
- **Tones.** A color class (`hui-pink`, `hui-success`, `hui-brand` and so on) goes **on the component itself**. It does not inherit, so it never leaks into nested components. Each page says which shade its component uses. See [Tones and brand](../foundations.md#tones-and-brand).
- **Tilt.** Cards, notes, frames and friends read `--hui-tilt`. Use `hui-tilt-left`, `hui-tilt-right`, `hui-tilt-slight` or `hui-straight`. See [Tilt](../foundations.md#tilt).
- **Dark mode.** Put `data-theme="dark"` on `<html>` (or any element). Components follow through variables. See [Dark mode](../foundations.md#dark-mode).
- **JavaScript is optional.** Without `happyui.js` everything still renders and nothing is hidden. The script adds the behaviors in the table below.

## JavaScript at a glance

| Attribute or call | What it does | Page |
|---|---|---|
| `class="hui-reveal"`, `data-hui-stagger` | Blocks fade in on scroll, one after another | [motion](motion.md) |
| `data-hui-tabs` | Wires up tabs, panels and arrow keys | [tabs](tabs.md) |
| `data-hui-open`, `data-hui-close` | Opens and closes a `<dialog>` | [dialog](dialog.md) |
| `details.hui-menu`, `details.hui-nav__menu` | Closes menus on outside click, item click and Esc | [menu](menu.md), [nav](nav.md) |
| `data-hui-toast`, `data-hui-toast-title`, `data-hui-toast-tone`, `HappyUI.toast()` | Shows a toast | [toast](toast.md) |
| `data-hui-copy` | Copies text to the clipboard | [code](code.md) |
| `data-hui-theme-toggle`, `HappyUI.theme` | Switches and stores light and dark | [Foundations](../foundations.md#dark-mode) |
| `HappyUI.init(scope)`, `HappyUI.reveal(scope)` | Wires up markup added after load | [motion](motion.md) |

`data-hui-tooltip` and `data-hui-tooltip-pos` are pure CSS, see [tooltip](tooltip.md).

## Index

### Page and text

| Component | Main class | Page | Use it for |
|---|---|---|---|
| Layout | `hui-container`, `hui-stack`, `hui-grid` | [layout.md](layout.md) | Page structure, spacing, sections, split and hero layouts |
| Typography | `hui-display`, `hui-h1`, `hui-lede` | [typography.md](typography.md) | Titles, intro text, links and long reading |
| Icons | `hui-icon` | [icons.md](icons.md) | Outline SVG icons with an optional pastel splash |
| Motion | `hui-reveal` | [motion.md](motion.md) | Scroll reveal and small animations |

### Actions, labels and marks

| Component | Main class | Page | Use it for |
|---|---|---|---|
| Button | `hui-button` | [button.md](button.md) | Actions and call-to-action links |
| Chip | `hui-chip` | [chip.md](chip.md) | Filters, toggles and quick choices |
| Badge | `hui-badge` | [badge.md](badge.md) | Status labels, "new" stamps and counts |
| Code | `hui-code`, `hui-pre`, `hui-kbd` | [code.md](code.md) | Inline code, code blocks and keyboard keys |
| Ink | `hui-marker`, `hui-highlight`, `hui-doodle` | [ink.md](ink.md) | Highlights, underlines, strike-throughs, dividers and doodles |

### Paper

| Component | Main class | Page | Use it for |
|---|---|---|---|
| Card | `hui-card` | [card.md](card.md) | Features, products, posts and settings |
| Frame and tape | `hui-frame`, `hui-tape` | [frame-and-tape.md](frame-and-tape.md) | Screenshots and photos that look taped to the page |
| Note | `hui-note` | [note.md](note.md) | Sticky notes, tips and reminders |
| Callout and banner | `hui-callout`, `hui-banner` | [callout-and-banner.md](callout-and-banner.md) | One big call to action, and the "what's new" pill |
| Window | `hui-window` | [window.md](window.md) | Pretend app windows for demos and screenshots |
| Annotation | `hui-annotation` | [annotation.md](annotation.md) | Handwritten notes with a curved arrow |

### Forms

| Component | Main class | Page | Use it for |
|---|---|---|---|
| Forms | `hui-field`, `hui-input`, `hui-select` | [forms.md](forms.md) | Fields, labels, hints, errors, text inputs, selects and fieldsets |
| Choice controls | `hui-check`, `hui-radio`, `hui-switch`, `hui-range` | [choice-controls.md](choice-controls.md) | Checkboxes, radios, switches and sliders |
| Option | `hui-option` | [option.md](option.md) | "Pick one" cards for platforms, plans and sizes |

### Navigation

| Component | Main class | Page | Use it for |
|---|---|---|---|
| Nav, logo and footer | `hui-nav`, `hui-logo`, `hui-footer` | [nav.md](nav.md) | The sticky top bar, the mobile menu and the page footer |
| Tabs | `hui-tabs` | [tabs.md](tabs.md) | Switching between views of the same content |
| Menu | `hui-menu` | [menu.md](menu.md) | A dropdown of actions |
| Breadcrumb and pagination | `hui-breadcrumb`, `hui-pagination` | [breadcrumb-and-pagination.md](breadcrumb-and-pagination.md) | Showing where you are, and moving through pages |

### Feedback

| Component | Main class | Page | Use it for |
|---|---|---|---|
| Alert | `hui-alert` | [alert.md](alert.md) | Messages that stay in the page: success, info, warning, error |
| Toast | `hui-toast` | [toast.md](toast.md) | Short messages that slide in and leave |
| Tooltip | `data-hui-tooltip` | [tooltip.md](tooltip.md) | A small hint on hover and focus |
| Dialog | `hui-dialog` | [dialog.md](dialog.md) | A modal question or short form |
| Progress and loading | `hui-progress`, `hui-spinner`, `hui-skeleton` | [progress-and-loading.md](progress-and-loading.md) | Progress bars, waiting spinners and loading placeholders |
| Accordion | `hui-accordion` | [accordion.md](accordion.md) | FAQs and sections that open and close |

### Data and content

| Component | Main class | Page | Use it for |
|---|---|---|---|
| Table | `hui-table` | [table.md](table.md) | Rows and columns of data |
| Avatar | `hui-avatar` | [avatar.md](avatar.md) | People, as initials or photos, alone or in a group |
| Stat and steps | `hui-stat`, `hui-steps` | [stat-and-steps.md](stat-and-steps.md) | Big numbers, and a numbered path |
| Checklist | `hui-checklist` | [checklist.md](checklist.md) | Feature lists with hand-drawn ticks |
| Quote | `hui-quote` | [quote.md](quote.md) | Testimonials |
| Pricing | `hui-price` | [pricing.md](pricing.md) | Plan cards, with one featured |
| Empty state | `hui-empty` | [empty-state.md](empty-state.md) | What to show when there is nothing yet |
