// Behavior tests for happyui.js in a real browser.
//   npm install   (once)
//   npm test
// Uses the Chrome or Edge you already have. Exits with 1 when a check fails.

import { chromium } from "playwright-core";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const showcase = pathToFileURL(join(root, "docs/index.html")).href;
const results = [];
const check = (name, ok, extra = "") => results.push({ name, ok: !!ok, extra });

async function launch() {
  for (const channel of ["chrome", "msedge", undefined]) {
    try {
      return await chromium.launch({ channel });
    } catch {
      /* try the next one */
    }
  }
  throw new Error("No Chrome or Edge found. Install one, or run: npx playwright install chromium");
}

const browser = await launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(showcase, { waitUntil: "networkidle" });
  const run = (fn, arg) => page.evaluate(fn, arg);

  check("adds hui-js to <html>", await run(() => document.documentElement.classList.contains("hui-js")));
  check("exposes window.HappyUI", await run(() => typeof window.HappyUI?.toast === "function"));

  // Tabs
  await page.click("#t-win");
  check("tabs: click selects and shows the panel", await run(() =>
    document.getElementById("t-win").getAttribute("aria-selected") === "true" &&
    !document.getElementById("p-win").hidden && document.getElementById("p-mac").hidden));
  await page.focus("#t-win");
  await page.keyboard.press("ArrowRight");
  check("tabs: ArrowRight moves to the next tab", await run(() => document.activeElement.id === "t-lin"));
  await page.keyboard.press("Home");
  check("tabs: Home goes to the first tab", await run(() => document.activeElement.id === "t-mac"));
  check("tabs: only the selected tab is in the tab order", await run(() =>
    document.getElementById("t-mac").tabIndex === 0 && document.getElementById("t-win").tabIndex === -1));

  // Dialog
  const open = () => page.click('[data-hui-open="#demo-dialog"]');
  const isOpen = () => run(() => document.getElementById("demo-dialog").open);
  await open();
  check("dialog: data-hui-open opens it", await isOpen());
  await page.click('#demo-dialog [data-hui-close][aria-label="Close"]');
  check("dialog: data-hui-close closes it", !(await isOpen()));
  await open();
  await page.mouse.click(10, 10);
  check("dialog: a backdrop click closes it", !(await isOpen()));
  await open();
  await page.keyboard.press("Escape");
  check("dialog: Escape closes it", !(await isOpen()));

  // Dropdown menu
  const menuOpen = () => run(() => document.querySelector("details.hui-menu").open);
  await page.click("details.hui-menu > summary");
  check("menu: opens", await menuOpen());
  await page.mouse.click(5, 450);
  check("menu: an outside click closes it", !(await menuOpen()));
  await page.click("details.hui-menu > summary");
  await page.keyboard.press("Escape");
  check("menu: Escape closes it", !(await menuOpen()));

  // Toast
  await page.click('[data-hui-toast="Your note is on the fridge."]');
  check("toast: appears", await run(() => !!document.querySelector(".hui-toast-region .hui-toast")));
  check("toast: region is a polite live region", await run(() =>
    document.querySelector(".hui-toast-region").getAttribute("aria-live") === "polite"));
  await page.click(".hui-toast-region .hui-toast__close");
  await page.waitForTimeout(400);
  check("toast: the close button removes it", await run(() => !document.querySelector(".hui-toast-region .hui-toast")));

  // Theme
  await page.click("[data-hui-theme-toggle]");
  check("theme: toggle switches to dark and saves it", await run(() =>
    document.documentElement.getAttribute("data-theme") === "dark" && localStorage.getItem("happyui-theme") === "dark"));
  check("theme: toggle reports aria-pressed", await run(() =>
    document.querySelector("[data-hui-theme-toggle]").getAttribute("aria-pressed") === "true"));
  await page.reload({ waitUntil: "networkidle" });
  check("theme: the choice survives a reload", await run(() => document.documentElement.getAttribute("data-theme") === "dark"));
  await run(() => HappyUI.theme.set("light"));

  // Reveal on scroll
  check("reveal: blocks below the fold wait", await run(() => {
    const el = document.querySelector("#data .hui-reveal");
    return !el.classList.contains("is-in") && getComputedStyle(el).opacity === "0";
  }));
  await run(() => document.querySelector("#data").scrollIntoView());
  await page.waitForTimeout(900);
  check("reveal: blocks show up when scrolled to", await run(() => document.querySelector("#data .hui-reveal").classList.contains("is-in")));

  // Keyboard focus
  await run(() => window.scrollTo(0, 0));
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const outline = await run(() => {
    const s = getComputedStyle(document.activeElement);
    return `${s.outlineStyle} ${s.outlineWidth}`;
  });
  check("focus: keyboard focus shows a 3px ring", /solid 3px/.test(outline), outline);

  check("no JavaScript errors on the page", errors.length === 0, errors.join(" | "));
} finally {
  await browser.close();
}

for (const r of results) console.log(`${r.ok ? "ok  " : "FAIL"} ${r.name}${r.extra ? `  (${r.extra})` : ""}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `\n${failed} check(s) failed.` : `\nAll ${results.length} checks pass.`);
process.exit(failed ? 1 : 0);
