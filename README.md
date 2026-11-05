<div align="center">

<img src="docs/screenshots/hero.png" alt="The HappyUI showcase: a big handwritten title underlined in red, pastel word highlights, a yellow button and a taped app window with a pink sticky note" width="100%">

# HappyUI

**A hand-drawn design system for the web.**<br>
Warm paper, pencil outlines, marker highlights and sticky notes, in one CSS file you can drop into any project.

`Plain CSS` · `Tiny optional JS` · `Any framework` · `Light and dark` · `MIT`

[Quick start](#quick-start) · [See it](#see-it) · [Components](#components) · [Theming](#theming) · [Claude skill](#use-it-as-a-claude-code-skill) · [Docs](docs/components/README.md)

</div>

---

## What you get

HappyUI makes a page look like someone drew it in a sketchbook. You write normal HTML with normal class names, and the CSS does the drawing.

- **One stylesheet, no build step.** Link it and start using classes like `hui-button` and `hui-card`.
- **Class names you can read.** They work in plain HTML, React, Vue, Svelte, Astro, Rails, Django or WordPress.
- **More than 50 components**, from buttons and forms to pricing cards, toasts, dialogs and sticky notes.
- **A light theme and a dark theme.** A script checks 140 text and background pairs against WCAG AA contrast.
- **Real HTML controls.** Buttons stay `<button>` and dialogs stay `<dialog>`, so keyboards and screen readers already know them.
- **A tiny script** (optional, no dependencies) for tabs, dialogs, toasts, menus, the theme switch and scroll animations.
- **A Claude Code skill.** Clone the repo into your skills folder and ask Claude for "a pricing page in HappyUI".

## See it

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/buttons.png" alt="Buttons in every kind, tone and size, plus chips and handwritten links"><br><sub><b>Buttons and chips.</b> Hover lifts them off the paper, a press pushes them in.</sub></td>
    <td width="50%"><img src="docs/screenshots/ink.png" alt="Marker strokes behind titles, word highlights, a red strike, badges, squiggly dividers and doodles"><br><sub><b>Ink effects.</b> Markers, highlights, strikes, badges, doodles and arrows.</sub></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/cards.png" alt="Feature cards with pastel icons and three tilted comic cards with picture areas"><br><sub><b>Cards.</b> Feature cards, dashed cards, toned cards and tilted picture cards.</sub></td>
    <td><img src="docs/screenshots/notes.png" alt="A frame held by tape, three sticky notes and a yellow callout box"><br><sub><b>Frames, tape, sticky notes and callouts.</b></sub></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/forms.png" alt="A form with inputs, a select, an error message, checkboxes, radios, switches and a slider"><br><sub><b>Forms.</b> Native inputs with handwritten placeholders and friendly errors.</sub></td>
    <td><img src="docs/screenshots/navigation.png" alt="Pill tabs, line tabs, breadcrumb, pagination, option cards and a dropdown button"><br><sub><b>Navigation.</b> Tabs, breadcrumbs, pages, pick-one cards and menus.</sub></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/feedback.png" alt="Success, info, warning and danger alerts, a toast, progress bars, spinners, a skeleton and an accordion"><br><sub><b>Feedback.</b> Alerts, toasts, progress, loading states and accordions.</sub></td>
    <td><img src="docs/screenshots/data.png" alt="A table, stats, numbered steps, a quote and pricing cards"><br><sub><b>Data and content.</b> Tables, stats, steps, quotes and pricing.</sub></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/colors.png" alt="Eight color tones, each with pop, fill, soft and mark shades"><br><sub><b>Eight tones</b>, five shades each.</sub></td>
    <td><img src="docs/screenshots/type.png" alt="Type specimen with Caveat titles and Shantell Sans text, plus paper, ink and shadow samples"><br><sub><b>Type, paper and shadows.</b> Caveat for titles, Shantell Sans for reading.</sub></td>
  </tr>
</table>

### A full landing page

Every block on this page is a HappyUI component. Source: [`examples/landing.html`](examples/landing.html).

<img src="docs/screenshots/landing.png" alt="Landing page for a made-up habit app called Tiny Wins, with a handwritten headline, highlighted words, download buttons and an app window held by tape" width="100%">

### An app screen

Stats, tabs, a table with row menus, a form and a sticky note. Source: [`examples/app.html`](examples/app.html).

<img src="docs/screenshots/app.png" alt="Dashboard with four stat cards, a habits table with progress bars and badges, a quick add form and a squad list" width="100%">

### Dark mode

The same sketchbook at night. One attribute switches it: `data-theme="dark"`.

<img src="docs/screenshots/landing-dark.png" alt="The landing page in the dark theme, with cream lines on a warm dark background" width="100%">

<table>
  <tr>
    <td width="33%"><img src="docs/screenshots/cards-dark.png" alt="Cards in the dark theme"></td>
    <td width="33%"><img src="docs/screenshots/forms-dark.png" alt="Forms in the dark theme"></td>
    <td width="33%"><img src="docs/screenshots/feedback-dark.png" alt="Alerts and progress in the dark theme"></td>
  </tr>
</table>

### On a phone

<p>
  <img src="docs/screenshots/mobile.png" alt="The landing page on a phone" width="300">
  &nbsp;&nbsp;
  <img src="docs/screenshots/mobile-app.png" alt="The app screen on a phone, in the dark theme" width="300">
</p>

## Quick start

**1. Add the fonts and HappyUI to your `<head>`**

```html
<!-- Two free fonts: Caveat (handwriting) and Shantell Sans (text) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap">

<!-- HappyUI: the styles, then the optional script -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/paulohenriquesn/happyui@v1.0.0/dist/happyui.min.css">
<script src="https://cdn.jsdelivr.net/gh/paulohenriquesn/happyui@v1.0.0/dist/happyui.js" defer></script>
```

**2. Put `class="hui"` on your `<body>`**

That one class gives the page its graph paper, its fonts and its colors.

**3. Use the components**

```html
<body class="hui">
  <main class="hui-container hui-section">
    <span class="hui-eyebrow">Hello there</span>
    <h1 class="hui-display">My <span class="hui-scribble">happy</span> page</h1>
    <p class="hui-lede">A paragraph with a <span class="hui-highlight hui-pink">pink</span> highlight.</p>

    <div class="hui-card hui-tilt-left">
      <h2 class="hui-card__title">A sheet of paper</h2>
      <p class="hui-card__text">Cards get a pencil outline and a hard shadow.</p>
      <button class="hui-button hui-button--primary" type="button">Click me</button>
    </div>
  </main>
</body>
```

Save it, open it in a browser, and you have a HappyUI page. To see every component at once, open [`docs/index.html`](docs/index.html), the showcase.

> [!TIP]
> The script hides `.hui-reveal` blocks until you scroll to them. Put `<script>document.documentElement.classList.add("hui-js")</script>` at the top of `<head>` and they will never flash in before the script loads.

## Install

| Option | What to do |
|---|---|
| **CDN** | Use the links above. `@v1.0.0` pins this version, `@main` follows the latest commit. |
| **Download** | Copy `dist/happyui.min.css` and `dist/happyui.js` into your project. |
| **npm** | `npm install github:paulohenriquesn/happyui`, then `import "happyui/css"` in your entry file. |
| **Pick and choose** | Take what you need from `src/`. Keep `tokens.css` and `base.css` first and `tones.css` last. |

With npm you can also import `happyui/css/min`, `happyui/js` and `happyui/tokens` (the JSON). For the fonts, `npm install @fontsource-variable/caveat @fontsource-variable/shantell-sans` and import both packages. HappyUI already knows their font names.

## How it works

Five ideas cover the whole system.

1. **Paper.** `class="hui"` on the body turns on the paper background, the two fonts and friendly defaults for plain tags like `h1`, `p`, `a` and `code`. The defaults use `:where()`, so any class of yours wins.
2. **Readable class names.** A component is a block (`hui-card`). Its parts are elements (`hui-card__title`). Its variations are modifiers (`hui-card--dashed`).
3. **Tones.** Add a color class next to a component: `hui-yellow`, `hui-orange`, `hui-red`, `hui-pink`, `hui-purple`, `hui-blue`, `hui-teal` or `hui-green`. Semantic names exist too: `hui-info`, `hui-success`, `hui-warning` and `hui-danger`. A tone paints the element you put it on and leaves the components inside it alone.
4. **Hand-made details.** A "wobble" border radius bends straight lines a little. Hard offset shadows look like pencil. `hui-tilt-left` and `hui-tilt-right` turn a card as if a person placed it. Tape, sticky notes and arrows finish the look.
5. **Motion with manners.** Blocks with `hui-reveal` rise in when you scroll to them, and markers draw themselves. Everything holds still for visitors who turn on reduced motion.

```html
<button class="hui-button">Default</button>
<button class="hui-button hui-button--primary">Primary (the brand yellow)</button>
<button class="hui-button hui-pink">Pink</button>
<div class="hui-card hui-blue hui-tilt-right">A blue card, slightly turned</div>
```

## Components

| Group | What is inside | Docs |
|---|---|---|
| Foundations | colors, paper, type scale, spacing, shadows, icons, layout, motion | [foundations](docs/foundations.md) · [typography](docs/components/typography.md) · [layout](docs/components/layout.md) · [icons](docs/components/icons.md) · [motion](docs/components/motion.md) |
| Actions | button, chip, handwritten link | [button](docs/components/button.md) · [chip](docs/components/chip.md) |
| Labels | badge, keyboard key, inline code, code block | [badge](docs/components/badge.md) · [code](docs/components/code.md) |
| Ink effects | highlight, marker, scribble underline, strike, circle, dividers, doodles | [ink](docs/components/ink.md) |
| Paper | card, frame, tape, sticky note, callout, banner, app window, annotation | [card](docs/components/card.md) · [frame and tape](docs/components/frame-and-tape.md) · [note](docs/components/note.md) · [callout and banner](docs/components/callout-and-banner.md) · [window](docs/components/window.md) · [annotation](docs/components/annotation.md) |
| Forms | field, label, hint, error, input, textarea, select, checkbox, radio, switch, range | [forms](docs/components/forms.md) · [choice controls](docs/components/choice-controls.md) |
| Navigation | nav bar, logo, footer, tabs, dropdown menu, breadcrumb, pagination | [nav](docs/components/nav.md) · [tabs](docs/components/tabs.md) · [menu](docs/components/menu.md) · [breadcrumb and pagination](docs/components/breadcrumb-and-pagination.md) |
| Feedback | alert, toast, tooltip, dialog, progress, spinner, skeleton, accordion | [alert](docs/components/alert.md) · [toast](docs/components/toast.md) · [tooltip](docs/components/tooltip.md) · [dialog](docs/components/dialog.md) · [progress and loading](docs/components/progress-and-loading.md) · [accordion](docs/components/accordion.md) |
| Data | table, avatar, stat, steps, checklist, quote, pricing card, option card, empty state | [table](docs/components/table.md) · [avatar](docs/components/avatar.md) · [stat and steps](docs/components/stat-and-steps.md) · [checklist](docs/components/checklist.md) · [quote](docs/components/quote.md) · [pricing](docs/components/pricing.md) · [option](docs/components/option.md) · [empty state](docs/components/empty-state.md) |

Each doc page shows the HTML, lists every class, and explains the states, the tones, the keyboard support and what screen readers hear.

## Theming

### Dark mode

```html
<html data-theme="dark">
```

Or let people choose with a button:

```html
<button class="hui-button hui-button--icon" type="button" data-hui-theme-toggle aria-label="Switch theme">🌙</button>
```

```js
HappyUI.theme.set("dark"); // "light", "dark" or "auto" (follows the system)
```

The script remembers the choice in `localStorage`. With no saved choice and no `data-theme` attribute, the page follows the system setting. You can also theme one part of a page: `<section data-theme="dark">`.

### Your brand color

Yellow is the brand tone out of the box. Point these five variables at another tone to change it everywhere:

```css
:root,
[data-theme] {
  --hui-brand: var(--hui-pink);
  --hui-brand-fill: var(--hui-pink-fill);
  --hui-brand-soft: var(--hui-pink-soft);
  --hui-brand-ink: var(--hui-pink-ink);
  --hui-brand-mark: var(--hui-pink-mark);
}
```

### Every other knob

Every color, font, size, radius, shadow and timing is a CSS variable in [`src/tokens.css`](src/tokens.css). The build also writes them to [`tokens/tokens.json`](tokens/tokens.json) for design tools, Style Dictionary or a Tailwind config. Each tone comes in five shades:

| Shade | Example | Used for |
|---|---|---|
| pop | `--hui-pink` | buttons, badges, highlights, sticky notes |
| fill | `--hui-pink-fill` | cards and other big surfaces |
| soft | `--hui-pink-soft` | alerts and quiet backgrounds |
| ink | `--hui-pink-ink` | colored text and icons |
| mark | `--hui-pink-mark` | the highlighter stroke behind titles |

## JavaScript

`dist/happyui.js` has no dependencies and starts on its own. You control it with HTML attributes:

| You want | Write |
|---|---|
| Tabs with arrow keys | `data-hui-tabs` on the wrapper, `role="tab"` and `role="tabpanel"` inside |
| A dialog | `<button data-hui-open="#hello">` and `<dialog class="hui-dialog" id="hello">` |
| A close button | `data-hui-close` on any button inside the dialog |
| A toast on click | `data-hui-toast="Saved!" data-hui-toast-tone="green"` |
| A copy button | `data-hui-copy="text to copy"` or `data-hui-copy="#element-id"` |
| A theme switch | `data-hui-theme-toggle` |
| Reveal on scroll | `class="hui-reveal"`, plus `data-hui-stagger` on a parent to bring the children in one by one |

Dropdown menus (`<details class="hui-menu">`) close when you click outside them or press Escape.

From your own code:

```js
HappyUI.toast("Your note is saved.", { title: "Done!", tone: "green" });
HappyUI.theme.toggle();
HappyUI.init(element); // call it after you add new HTML to the page
```

## React, Vue, Svelte and friends

HappyUI is CSS, so any framework can use it. In React you write `className`:

```jsx
<button className="hui-button hui-button--primary" onClick={save}>Save</button>
```

Prefer components? The [`react/`](react/README.md) folder has typed React wrappers (`<Button>`, `<Card>`, `<Tabs>`, `<Dialog>`, `useToast()` and more). Copy `react/happyui.tsx` into your project and import from it. The wrappers bring their own behavior, so they do not need `happyui.js`.

With Next.js or another server renderer, import the CSS in your root layout. If you use `happyui.js` too, load it on the client:

```js
// app/layout.tsx
import "happyui/css";

// any client component
useEffect(() => { import("happyui/js"); }, []);
```

## Use it as a Claude Code skill

This repo is also a skill for Claude Code. Install it and Claude learns the classes, the rules and the page recipes, then builds in this style when you ask.

```bash
# For all your projects
git clone https://github.com/paulohenriquesn/happyui ~/.claude/skills/happyui

# For one project only (run this inside the project)
git clone https://github.com/paulohenriquesn/happyui .claude/skills/happyui
```

Then ask for things like:

- "Build a landing page for my bakery with HappyUI."
- "Restyle this signup form in the happyui style."
- "Add a happyui pricing section with three plans."

Claude reads [`SKILL.md`](SKILL.md) first. It points to the doc for each component, so Claude loads only what the task needs. Working on HappyUI itself? [`AGENTS.md`](AGENTS.md) has the rules for the repo, and [`CLAUDE.md`](CLAUDE.md) loads it for Claude Code. Codex, Cursor and other agents read `AGENTS.md` directly.

## Accessibility

- Text and background pairs pass WCAG AA in both themes. Run `npm run check` to see all 140 ratios.
- Keyboard users get a thick blue focus ring on every control.
- Components sit on native elements (`button`, `a`, `input`, `dialog`, `details`, `progress`), which keyboards and screen readers already understand.
- Tabs follow the ARIA tabs pattern: arrow keys, Home and End.
- Buttons and inputs are 44 px tall by default, a comfortable size for fingers. The `--sm` sizes are for dense desktop screens.
- Animations stop for visitors who turn on reduced motion.

Your part: give icon-only buttons an `aria-label`, give every input a `<label>`, and keep the handwriting font for short titles. Long text reads best in Shantell Sans.

## Browser support

Current Chrome, Edge, Firefox and Safari. HappyUI uses `@property`, `:has()`, `color-mix()` and individual transform properties, which sets the minimum at Chrome and Edge 111, Safari 16.4 and Firefox 128.

## Project structure

```
happyui/
├── dist/              ready-to-use files: happyui.css, happyui.min.css, happyui.js
├── src/               the CSS source, one file per topic
│   ├── tokens.css     every variable: colors, fonts, sizes, shadows, motion
│   ├── base.css       paper background and defaults for plain HTML tags
│   ├── components/    buttons, cards, forms, navigation, feedback, data...
│   └── tones.css      the color classes (loaded last)
├── js/happyui.js      the optional script
├── tokens/            tokens.json, generated from src/tokens.css
├── react/             optional typed React components
├── docs/              showcase page, foundations, one doc per component, screenshots
├── examples/          a full landing page and an app screen
├── scripts/           build, contrast check and screenshots
├── SKILL.md           entry point for Claude Code
├── AGENTS.md          rules for AI agents and contributors
└── CLAUDE.md          loads AGENTS.md in Claude Code
```

## Development

You need Node 18 or newer.

```bash
npm install          # installs playwright-core (drives your own Chrome or Edge)
npm run build        # src/ to dist/, plus tokens/tokens.json
npm run check        # build, then test every color pair for contrast
npm test             # check, then click through tabs, dialogs, menus, toasts and the theme switch in a real browser
npm run screenshots  # build, then redo docs/screenshots
```

Open `docs/index.html` and the files in `examples/` straight from your disk. They need no server.

## Contributing

Issues and pull requests are welcome. Before you open a pull request:

1. Change the CSS in `src/` (never in `dist/`) and run `npm test`.
2. Show the change in `docs/index.html` and update the matching doc in `docs/components/`.
3. Look at it in the light and in the dark theme.

[`AGENTS.md`](AGENTS.md) lists the conventions.

## Credits and license

- Fonts: [Caveat](https://fonts.google.com/specimen/Caveat) by Pablo Impallari and [Shantell Sans](https://fonts.google.com/specimen/Shantell+Sans) by Shantell Martin, both under the SIL Open Font License.
- Made by [Paulo Henrique](https://github.com/paulohenriquesn) and released under the [MIT License](LICENSE).
