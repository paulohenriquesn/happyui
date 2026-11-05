// Regenerates the pictures in docs/screenshots (used by the README).
//   npm install        (only playwright-core, no browser download)
//   npm run screenshots
// It drives the Chrome or Edge you already have installed.

import { chromium } from "playwright-core";
import { mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "docs/screenshots");
mkdirSync(out, { recursive: true });
const url = (rel) => pathToFileURL(join(root, rel)).href;

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

async function open(browser, rel, { width = 1280, height = 900, theme = "light", mobile = false } = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    colorScheme: theme,
    isMobile: mobile,
    hasTouch: mobile,
  });
  await context.addInitScript((t) => {
    try { localStorage.setItem("happyui-theme", t); } catch { /* ignore */ }
  }, theme);
  const page = await context.newPage();
  await page.goto(url(rel), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Show every reveal block and let the markers draw themselves.
  await page.evaluate(() => document.querySelectorAll(".hui-reveal").forEach((el) => el.classList.add("is-in")));
  await page.waitForTimeout(2200);
  return { context, page };
}

function report(file) {
  const kb = (statSync(join(out, file)).size / 1024).toFixed(0);
  console.log(`docs/screenshots/${file}  ${kb} KB`);
}

// The top of the page, exactly as a visitor sees it.
async function viewport(browser, rel, file, opts) {
  const { context, page } = await open(browser, rel, opts);
  await page.screenshot({ path: join(out, file) });
  report(file);
  await context.close();
}

// One block of the page (marked with data-shot="name"), with some paper around it.
async function blocks(browser, rel, names, { theme = "light", suffix = "", pad = 32 } = {}) {
  const { context, page } = await open(browser, rel, { theme, height: 1000 });
  const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  for (const name of names) {
    const box = await page.locator(`[data-shot="${name}"]`).first().boundingBox();
    if (!box) throw new Error(`No [data-shot="${name}"] in ${rel}`);
    const x = Math.max(0, box.x - pad);
    const y = Math.max(0, box.y - pad);
    const width = Math.min(pageWidth - x, box.width + pad * 2);
    const file = `${name}${suffix}.png`;
    await page.screenshot({ path: join(out, file), clip: { x, y, width, height: box.height + pad * 2 }, fullPage: true });
    report(file);
  }
  await context.close();
}

const browser = await launch();
try {
  await viewport(browser, "docs/index.html", "hero.png", { width: 1280, height: 860 });
  await viewport(browser, "examples/landing.html", "landing.png", { width: 1280, height: 900 });
  await viewport(browser, "examples/landing.html", "landing-dark.png", { width: 1280, height: 900, theme: "dark" });
  await viewport(browser, "examples/app.html", "app.png", { width: 1280, height: 1290 });
  await viewport(browser, "examples/landing.html", "mobile.png", { width: 390, height: 844, mobile: true });
  await viewport(browser, "examples/app.html", "mobile-app.png", { width: 390, height: 844, mobile: true, theme: "dark" });
  await blocks(browser, "docs/index.html", ["colors", "type", "buttons", "ink", "cards", "notes", "forms", "navigation", "feedback", "data"]);
  await blocks(browser, "docs/index.html", ["cards", "forms", "feedback"], { theme: "dark", suffix: "-dark" });
} finally {
  await browser.close();
}
