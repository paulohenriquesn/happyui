// Contrast check for the color tokens (WCAG 2.x ratios).
//   npm run check
// Reads tokens/tokens.json (made by the build) and tests the pairs that the
// components really use, in the light and in the dark theme.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens/tokens.json"), "utf8"));
const TONES = ["yellow", "orange", "red", "pink", "purple", "blue", "teal", "green"];

function parse(value) {
  const v = value.trim();
  let m = v.match(/^#([0-9a-f]{6})$/i);
  if (m) {
    const n = parseInt(m[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
  }
  m = v.match(/^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([\d.]+))?\s*\)$/i);
  if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
  throw new Error(`Cannot read color: ${value}`);
}

function over(top, bottom) {
  const a = top.a;
  return { r: top.r * a + bottom.r * (1 - a), g: top.g * a + bottom.g * (1 - a), b: top.b * a + bottom.b * (1 - a), a: 1 };
}

function luminance({ r, g, b }) {
  const f = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function ratio(fg, bg) {
  const [l1, l2] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

let failures = 0;
const rows = [];

for (const theme of ["light", "dark"]) {
  const t = tokens[theme];
  const color = (name) => parse(t[`--hui-${name}`]);
  const paper = color("paper");
  const surface = color("surface");

  const test = (label, fg, bg, min) => {
    const r = ratio(fg.a < 1 ? over(fg, bg) : fg, bg.a < 1 ? over(bg, paper) : bg);
    const ok = r >= min;
    if (!ok) failures++;
    rows.push(`${ok ? "ok  " : "FAIL"} ${theme.padEnd(5)} ${label.padEnd(34)} ${r.toFixed(2).padStart(5)} (needs ${min})`);
  };

  test("ink on paper", color("ink"), paper, 7);
  test("ink on surface", color("ink"), surface, 7);
  test("ink-soft on paper", color("ink-soft"), paper, 4.5);
  test("ink-soft on surface", color("ink-soft"), surface, 4.5);
  test("ink-faint on surface", color("ink-faint"), surface, 4.5);
  test("focus ring on paper", color("focus"), paper, 3);

  for (const tone of TONES) {
    test(`on-pop on ${tone}`, color("on-pop"), color(tone), 4.5);
    test(`ink on ${tone}-fill`, color("ink"), color(`${tone}-fill`), 4.5);
    test(`ink-soft on ${tone}-fill`, color("ink-soft"), color(`${tone}-fill`), 4.5);
    test(`ink on ${tone}-soft`, color("ink"), color(`${tone}-soft`), 4.5);
    test(`${tone}-ink on paper`, color(`${tone}-ink`), paper, 4.5);
    test(`${tone}-ink on surface`, color(`${tone}-ink`), surface, 4.5);
    test(`on-solid on ${tone}-ink`, color("on-solid"), color(`${tone}-ink`), 4.5);
    test(`ink over ${tone}-mark`, color("ink"), over(color(`${tone}-mark`), paper), 4.5);
  }
}

console.log(rows.join("\n"));
console.log(failures ? `\n${failures} pair(s) below the minimum.` : `\nAll ${rows.length} pairs pass.`);
process.exit(failures ? 1 : 0);
