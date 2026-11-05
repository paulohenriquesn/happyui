# HappyUI for React

An optional React layer for HappyUI. It is one file, `happyui.tsx`: thin, typed, dependency-free wrappers that
render the same HTML and BEM classes as the plain CSS kit. They add no styles of their own, so the look always
comes from `happyui.css`.

- **Needs only React** (18 or 19). No other runtime dependency.
- **Does not need `happyui.js`.** Tabs, menus, dialogs, toasts, the theme switch and reveal on scroll are done in
  React. Loading both is redundant.
- **SSR safe.** Nothing touches `window` or `document` while rendering, and hydration is clean.
- **Marked `"use client"`**, so it works in the Next.js App Router.
- **Tree-shakeable.** Importing only `Button` adds about 1.7 KB minified. The whole library is about 29 KB
  minified (9.5 KB gzip).

## Install

1. Copy `happyui.tsx` into your project, for example `components/happyui.tsx`. (Inside this repo you can also import
   `../react/happyui`.)
2. Import the stylesheet **once**, in your app root. It is `dist/happyui.css` (or `dist/happyui.min.css`) of the main
   HappyUI folder, so import it from wherever you keep it:

```tsx
import "./happyui.css";
```

3. Load the two fonts and put the `hui` class on `<body>`, or wrap your app in `<Root>`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap">
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import "./happyui.css";
import { ToastProvider } from "@/components/happyui";

const themeScript = `try{var t=localStorage.getItem("happyui-theme");if(t!=="dark"&&t!=="light"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the script below sets data-theme before React loads.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="hui">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
```

The `themeScript` is optional. It stops the flash of the wrong theme on first paint, and it reads and writes the same
`localStorage` key (`happyui-theme`) as the vanilla `happyui.js`.

Server Components can import and render every component, as long as handlers (`onClick`...) are written in a Client
Component. The helpers `useToast()` and `useTheme()` are hooks, so they only work in Client Components too.

### Vite, Remix, CRA

Import the CSS in your entry file, add the font link to `index.html`, and use the components. Nothing else.

## A quick tour

```tsx
import {
  Button, ButtonGroup, Card, CardIcon, CardTitle, CardText, Field, Input,
  Tabs, TabList, Tab, TabPanel, Menu, MenuItem, Dialog, useToast, Tooltip,
  ThemeToggle, useTheme, Reveal, Heading, Marker,
} from "./happyui";
```

**Buttons.** `href` makes it an `<a>`; otherwise it is a `<button type="button">`.

```tsx
<ButtonGroup>
  <Button variant="primary" size="lg" icon={<PlusIcon />} hint="takes ten seconds">Start</Button>
  <Button tone="pink">Pink</Button>
  <Button variant="ghost" busy>Saving</Button>
  <Button iconOnly aria-label="Add"><PlusIcon /></Button>
  <Button href="/docs" variant="ink">Docs</Button>
</ButtonGroup>
```

**Cards.** The parts are separate exports (no `Card.Title`), so Server Components can import them.

```tsx
<Card variant="dashed" tone="blue" tilt={-1.5}>
  <CardIcon symbol="i-camera" tone="pink" />
  <CardTitle>Camera sharing</CardTitle>
  <CardText>Use the other computer's camera in a window.</CardText>
</Card>
<Card href="/pricing" interactive>...</Card>   {/* a link card that lifts on hover */}
```

**Forms.** `Field` wires the label, hint and error to the control for you: `id`, `for`, `aria-describedby` and
`aria-invalid`. That works for `Input`, `Textarea`, `Select` and `Range`. `Checkbox`, `Radio` and `Switch` come in
groups and have their own label, so inside a `Field` they only get `aria-describedby` and `aria-invalid` (no
duplicate ids).

```tsx
<Field label="E-mail" aside="we never spam" hint="We only write when something good happens." error={error}>
  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
</Field>
```

**Tabs.** Controlled (`value` and `onValueChange`) or free (`defaultValue`). Arrow keys, Home and End work, the
selected tab is the only one in the tab order, and the ARIA roles and ids are wired for you.

```tsx
<Tabs defaultValue="mac" variant="line" tone="blue">
  <TabList aria-label="Platforms">
    <Tab value="mac">macOS</Tab>
    <Tab value="win">Windows</Tab>
  </TabList>
  <TabPanel value="mac">Drag the app to Applications.</TabPanel>
  <TabPanel value="win">Run the installer.</TabPanel>
</Tabs>
```

**Menu.** Built on `<details>`. It closes on outside click, on Escape, and when an item is chosen. Arrow keys move
between items.

```tsx
<Menu trigger="Options" align="end">
  <MenuItem shortcut="E" onClick={edit}>Edit</MenuItem>
  <MenuItem href="/settings">Settings</MenuItem>
  <MenuItem danger onClick={remove}>Delete</MenuItem>
</Menu>
```

**Dialog.** A native `<dialog>` opened with `showModal()`, so the backdrop, focus trap and Escape come from the
browser. You own the `open` state; `onClose` fires on Escape, on a click on the backdrop and on the close button.

```tsx
<Dialog open={open} onClose={() => setOpen(false)} title="Delete this doodle?"
  description="This cannot be undone."
  actions={<Button tone="red" onClick={remove}>Delete</Button>} />
```

**Toasts.** Wrap the app in `ToastProvider` once. It renders the `.hui-toast-region` (`role="status"`,
`aria-live="polite"`).

```tsx
const toast = useToast();
toast("Your note is on the fridge.", { title: "Pinned!", tone: "green" });   // leaves after 4.5 s
toast("Sticky", { timeout: 0 });                                              // stays until dismissed
```

**Tooltip.** Pure CSS: it adds `data-hui-tooltip` to the child and shows on hover and on keyboard focus.

```tsx
<Tooltip content="I explain things!" position="bottom">
  <Button iconOnly aria-label="Help"><InfoIcon /></Button>
</Tooltip>
```

**Theme.**

```tsx
<ThemeToggle />                                  // an icon button, same behavior as the vanilla one
const { theme, setTheme, toggleTheme } = useTheme();   // setTheme("auto") follows the system again
```

**Reveal on scroll and ink effects.** Ink effects draw themselves when the block scrolls into view.

```tsx
<Reveal index={1}>
  <Heading>Make it <Marker tone="pink">hand-made</Marker></Heading>
</Reveal>
```

`Reveal` adds `hui-js` to `<html>` after hydration, exactly as `happyui.js` does. Before that, nothing is hidden, so
the page works without JavaScript.

## Conventions

- **`className` is merged** with the component's own classes, and every other prop goes to the native element.
  Refs are forwarded (to the `<input>` for form controls).
- **Controls with a wrapper** (`Select`, `Checkbox`, `Radio`, `Switch`, `OptionInput`, `Table`) put `className` and
  `style` on the outer element and everything else on the native one.
- **`tone`** adds the tone class (`hui-pink`). `Tone` is a string union: `yellow | orange | red | pink | purple |
  blue | teal | green | brand | paper | info | success | warning | danger`.
- **`tilt`** sets `--hui-tilt`. A number is degrees (`tilt={-1.5}`), a string is any CSS angle.
- **`gap`, `min` and `size`** on layout parts and doodles set `--hui-gap`, `--hui-min`, `--hui-doodle-size` and
  `--hui-spinner-size`. A number is pixels, a string is any CSS length.
- **Inline styles** are only used for those CSS variables the stylesheet already reads. You can still pass your own
  `style`.
- **`Input` has a `size` prop** (`sm | md | lg`) that replaces the native numeric `size` attribute.
- **Router links.** `href` renders a plain `<a>`. For client-side routing, render your router's link with the plain
  classes, for example `<NextLink href="/x" className="hui-button hui-button--primary">Go</NextLink>`.
- **Utility classes** (`hui-muted`, `hui-small`, `hui-tilt-left`, `hui-float`, `hui-sr-only`...) are plain CSS: put
  them in `className`.
- **Accessibility.** Icon-only buttons need an `aria-label`. Icons are hidden from screen readers unless you give
  them an `aria-label`. `Progress` needs an `aria-label`. Give a `TabList` an `aria-label`.

## Differences from the plain HTML kit

- `Quote` renders its words in a `<p class="hui-quote__text">`. The docs use a `<blockquote>` and reset its base
  styles inline; a `<p>` looks the same without inline styles.
- The selected `Tab` gets `tabindex="0"` and the others `-1` right away (the vanilla script does it after load).
- `Alert` and the toasts show a small default character in their round icon by tone, when you pass no `icon`.
  Pass `icon={false}` to `Alert` to hide it.
- `Menu`, `NavMenu` and `Dialog` do their own closing in React (outside click, Escape, backdrop), so they need no
  script on the page.

## Components

| Group | Components and main props |
|---|---|
| Layout | `Root` (plain, theme) `Container` (narrow) `Stack` `Cluster` (gap) `Grid` (cols, min, gap) `Section` (tight) `SectionHead` `Split` (reverse, even) `Hero` `HeroCopy` `HeroMedia` |
| Type | `Display` `Heading` (as, size) `Eyebrow` (tone) `Lede` `Prose` |
| Icon | `Icon` (symbol, size, tone) |
| Buttons | `Button` (variant, size, tone, block, iconOnly, busy, icon, hint, href) `ButtonGroup` `Chip` (pressed, tone, icon, href) `Link` (tone, back, href) |
| Small things | `Badge` (variant, size, tone) `Kbd` `Code` (tone) `Pre` |
| Ink | `Highlight` `Marker` `Scribble` `Strike` `Circled` (tone) `Divider` (label, dashed) `Doodle` (shape, tone, size) `Annotation` (direction, tone, tilt) |
| Paper | `Card` (variant, size, row, interactive, tone, tilt, as, href) with `CardIcon` `CardTitle` `CardText` `CardMeta` `CardBody` `CardFooter` `CardMedia`; `Frame` (bare, tone, tilt) `Tape` (corner, tone) `Note` (by, tone, tilt) `Callout` (title, tone, tilt) `Banner` (tone, tilt, href) `Window` (title, night, tilt, bodyPadding) |
| Forms | `Field` (label, aside, hint, error, id) `Label` `Hint` `FieldError` `Input` (size) `Textarea` `Select` `InputGroup` `Checkbox` (tone, indeterminate) `Radio` `Switch` `Range` (tone) `Fieldset` (legend) |
| Navigation | `Nav` `NavLinks` `NavLink` (current) `NavActions` `NavMenu` (label, icon) `Logo` (mark, tone, href) `Tabs` (value, defaultValue, onValueChange, variant, tone) `TabList` `Tab` (value, icon) `TabPanel` (value) `Breadcrumb` `BreadcrumbItem` (href, current) `Pagination` `PaginationItem` (current, disabled, href) `PaginationGap` `Menu` (trigger, triggerLabel, variant, size, tone, iconOnly, align, open, defaultOpen, onOpenChange) `MenuItem` (danger, icon, shortcut, href) `MenuLabel` `MenuSeparator` `Footer` `FooterMain` `FooterBrand` `FooterColumns` `FooterColumn` (title) `FooterBottom` |
| Feedback | `Alert` (tone, title, icon, onClose) `ToastProvider` (timeout, dismissLabel) `useToast()` `Tooltip` (content, position) `Dialog` (open, onClose, title, description, actions, hideCloseButton) `Progress` (value, max, tone) `Spinner` (tone, size, label) `Skeleton` (variant) `Accordion` `AccordionItem` (title, open, defaultOpen, onOpenChange) |
| Data | `Table` (caption, tableClassName) `Th` `Td` (numeric) `Avatar` (size, tone, src, alt, name) `AvatarGroup` `Stat` (value, label, delta, deltaTone) `Steps` (vertical, tone, columns) `Step` (title) `Checklist` (inline, tone) `ChecklistItem` (off) `Quote` (name, detail, avatar, tone, tilt) `Price` (name, amount, period, description, flag, featured, tone, tilt) `Option` (title, meta, icon, action, tone, selected, href) `OptionInput` (type, name...) `EmptyState` (art, title, description) |
| Motion and theme | `Reveal` (as, index) `ThemeToggle` (lightIcon, darkIcon) `useTheme()` |

Every props interface is exported (`ButtonProps`, `CardProps`, ...), and so are the types `Tone`, `Tilt`, `Length`,
`ThemeName` and `ThemeMode`.

## Try it and check the types

`example.tsx` is one small screen that uses most of the components. It is also the type check of the library:

```sh
npm install
npx tsc -p tsconfig.json    # no output means no errors
```
