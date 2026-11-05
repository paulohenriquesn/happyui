# Code

Three small pieces for technical text: a keyboard key, inline code and a code block.

## Example

```html
<p>
  Press <kbd class="hui-kbd">Ctrl</kbd> + <kbd class="hui-kbd">K</kbd>,
  then run <code class="hui-code">npm run build</code>.
</p>

<pre class="hui-pre"><code>&lt;button class="hui-button hui-button--primary"&gt;
  Hello!
&lt;/button&gt;</code></pre>

<pre class="hui-pre"><code id="build-cmd">node scripts/build.mjs</code></pre>
<button class="hui-button hui-button--sm" type="button" data-hui-copy="#build-cmd">Copy</button>
```

## Classes

| Class | What it does |
|---|---|
| `hui-kbd` | A keyboard key: a small key cap on the surface color with a thicker bottom edge, in monospace |
| `hui-code` | Inline code: monospace on a soft colored background that wraps cleanly across lines |
| `hui-pre` | A code block: sunken paper, 2px outline, small shadow, scrolls sideways, keeps spaces and tabs. Put a `<code>` inside |

Inside `hui-pre`, the nested `<code>` is reset (it inherits the font and loses its own background and padding), so it does not look like inline code.

## Tones

Only inline code reacts to a tone. Its background is `--hui-tone-fill`, or the brand fill if there is no tone: `<code class="hui-code hui-blue">`. `hui-kbd` and `hui-pre` stay neutral.

## JavaScript

The copy button is a behavior of `happyui.js`. Put `data-hui-copy` on any button:

| Attribute value | What gets copied |
|---|---|
| `data-hui-copy="#some-id"` | The text content of the element that matches the selector |
| `data-hui-copy="any other text"` | That exact text |

After copying, a green toast says "Got it!" with "Copied to your clipboard.". Those words are fixed in the script. The clipboard API only exists on secure pages (`https` or `localhost`). Elsewhere nothing happens.

## Accessibility

- Use real `<kbd>` and `<code>` elements, as above, so assistive tech knows what they are. A key combination is one `<kbd>` per key.
- A code block that scrolls sideways can be reached with the keyboard in most current browsers. To be sure in all of them, add `tabindex="0"` and an `aria-label` to the `<pre>`.
- Give the copy button a visible label ("Copy"). The toast confirms the action to everybody, because the region it appears in announces itself politely.

## Tips

- Escape `<`, `>` and `&` inside code blocks (`&lt;`, `&gt;`, `&amp;`).
- `hui-pre` has `position: relative`, so you can pin a copy button to its corner with your own CSS.
- A value that starts with `#` is always read as a selector. To copy a text that starts with `#`, put it in an element and point to it.
- Fonts: the mono stack starts with JetBrains Mono, which is not bundled. Without it the system monospace font is used.
