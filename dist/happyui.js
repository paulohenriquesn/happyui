/*!
 * HappyUI · happyui.js
 * Tiny helpers for the parts CSS cannot do alone: scroll reveal, tabs,
 * dialogs, dropdown menus, toasts, copy buttons and the theme switch.
 * No dependencies. Works with plain HTML; call HappyUI.init(el) again
 * after you add new markup.
 * MIT License
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var THEME_KEY = "happyui-theme";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.classList.add("hui-js");

  function $all(sel, scope) {
    return Array.prototype.slice.call((scope || doc).querySelectorAll(sel));
  }

  function once(el, key) {
    var flag = "huiInit" + key;
    if (el.dataset[flag]) return false;
    el.dataset[flag] = "1";
    return true;
  }

  /* ---------- Reveal on scroll ---------- */
  var observer = null;

  function reveal(scope) {
    $all("[data-hui-stagger]", scope).forEach(function (group) {
      $all(":scope > .hui-reveal", group).forEach(function (child, i) {
        if (!child.style.getPropertyValue("--hui-i")) child.style.setProperty("--hui-i", String(i));
      });
    });

    var items = $all(".hui-reveal:not(.is-in)", scope);
    if (scope && scope.classList && scope.classList.contains("hui-reveal") && !scope.classList.contains("is-in")) items.push(scope);

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    }

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Tabs ---------- */
  function tabs(scope) {
    $all("[data-hui-tabs]", scope).forEach(function (box) {
      if (!once(box, "Tabs")) return;
      var list = $all('[role="tab"]', box);
      if (!list.length) return;

      function select(tab, focus) {
        list.forEach(function (t) {
          var on = t === tab;
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.tabIndex = on ? 0 : -1;
          var panel = doc.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
        box.dispatchEvent(new CustomEvent("hui:tab", { detail: { tab: tab }, bubbles: true }));
      }

      var current = list.filter(function (t) { return t.getAttribute("aria-selected") === "true"; })[0] || list[0];
      select(current, false);

      list.forEach(function (tab, i) {
        tab.addEventListener("click", function () { select(tab, false); });
        tab.addEventListener("keydown", function (e) {
          var next = null;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") next = list[(i + 1) % list.length];
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = list[(i - 1 + list.length) % list.length];
          if (e.key === "Home") next = list[0];
          if (e.key === "End") next = list[list.length - 1];
          if (next) { e.preventDefault(); select(next, true); }
        });
      });
    });
  }

  /* ---------- Dialogs ---------- */
  function dialogs(scope) {
    $all("[data-hui-open]", scope).forEach(function (btn) {
      if (!once(btn, "Open")) return;
      btn.addEventListener("click", function () {
        var dlg = doc.querySelector(btn.getAttribute("data-hui-open"));
        if (dlg && typeof dlg.showModal === "function") dlg.showModal();
      });
    });

    $all("dialog.hui-dialog", scope).forEach(function (dlg) {
      if (!once(dlg, "Dialog")) return;
      dlg.addEventListener("click", function (e) {
        if (e.target === dlg) dlg.close("backdrop");
        var closer = e.target.closest && e.target.closest("[data-hui-close]");
        if (closer && dlg.contains(closer)) dlg.close(closer.value || "close");
      });
    });
  }

  /* ---------- Dropdown menus built on <details> ---------- */
  var menuSel = "details.hui-menu, details.hui-nav__menu";

  function closeMenus(except) {
    $all(menuSel + "[open]").forEach(function (d) {
      if (d !== except) d.open = false;
    });
  }

  function menus(scope) {
    $all(menuSel, scope).forEach(function (d) {
      if (!once(d, "Menu")) return;
      d.addEventListener("toggle", function () { if (d.open) closeMenus(d); });
      d.addEventListener("click", function (e) {
        var item = e.target.closest && e.target.closest(".hui-menu__item, .hui-nav__link");
        if (item) d.open = false;
      });
    });
  }

  doc.addEventListener("click", function (e) {
    var inside = e.target.closest && e.target.closest(menuSel);
    closeMenus(inside || null);
  });

  doc.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    $all(menuSel + "[open]").forEach(function (d) {
      d.open = false;
      var s = d.querySelector("summary");
      if (s) s.focus();
    });
  });

  /* ---------- Toasts ---------- */
  var ICONS = {
    green: "✓", success: "✓",
    red: "!", danger: "!", orange: "!", warning: "!",
    blue: "i", info: "i",
    yellow: "★", brand: "★",
    purple: "✦", teal: "✦", pink: "♥"
  };

  function region() {
    var r = doc.querySelector(".hui-toast-region");
    if (!r) {
      r = doc.createElement("div");
      r.className = "hui-toast-region";
      r.setAttribute("role", "status");
      r.setAttribute("aria-live", "polite");
      doc.body.appendChild(r);
    }
    return r;
  }

  function dismiss(t) {
    if (!t || t.classList.contains("is-leaving")) return;
    t.classList.add("is-leaving");
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, reduceMotion ? 0 : 280);
  }

  function toast(message, opts) {
    opts = opts || {};
    var tone = opts.tone || "brand";
    var t = doc.createElement("div");
    t.className = "hui-toast hui-" + tone;

    var icon = doc.createElement("span");
    icon.className = "hui-toast__icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = opts.icon || ICONS[tone] || "★";

    var body = doc.createElement("div");
    body.className = "hui-toast__body";
    if (opts.title) {
      var title = doc.createElement("strong");
      title.className = "hui-toast__title";
      title.textContent = opts.title;
      body.appendChild(title);
    }
    body.appendChild(doc.createTextNode(message));

    var close = doc.createElement("button");
    close.type = "button";
    close.className = "hui-toast__close";
    close.setAttribute("aria-label", "Dismiss");
    close.textContent = "×";
    close.addEventListener("click", function () { dismiss(t); });

    t.appendChild(icon);
    t.appendChild(body);
    t.appendChild(close);
    region().appendChild(t);

    var timeout = opts.timeout === undefined ? 4500 : opts.timeout;
    if (timeout > 0) setTimeout(function () { dismiss(t); }, timeout);
    return t;
  }

  function toastButtons(scope) {
    $all("[data-hui-toast]", scope).forEach(function (btn) {
      if (!once(btn, "Toast")) return;
      btn.addEventListener("click", function () {
        toast(btn.getAttribute("data-hui-toast"), {
          title: btn.getAttribute("data-hui-toast-title") || undefined,
          tone: btn.getAttribute("data-hui-toast-tone") || undefined
        });
      });
    });
  }

  /* ---------- Copy to clipboard ---------- */
  function copyButtons(scope) {
    $all("[data-hui-copy]", scope).forEach(function (btn) {
      if (!once(btn, "Copy")) return;
      btn.addEventListener("click", function () {
        var value = btn.getAttribute("data-hui-copy");
        if (value.charAt(0) === "#") {
          var src = doc.querySelector(value);
          value = src ? src.textContent : "";
        }
        var done = function () { toast("Copied to your clipboard.", { tone: "green", title: "Got it!" }); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(done, function () {});
        }
      });
    });
  }

  /* ---------- Range sliders: share the filled part with CSS (Chrome and Safari) ---------- */
  function paintRange(input) {
    var min = input.min === "" ? 0 : parseFloat(input.min);
    var max = input.max === "" ? 100 : parseFloat(input.max);
    var pct = max > min ? ((parseFloat(input.value) - min) / (max - min)) * 100 : 0;
    input.style.setProperty("--hui-range-pct", pct + "%");
  }

  function ranges(scope) {
    $all("input.hui-range", scope).forEach(function (input) {
      paintRange(input);
      if (!once(input, "Range")) return;
      input.addEventListener("input", function () { paintRange(input); });
    });
  }

  /* ---------- Theme: light, dark or auto ---------- */
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var pageFixed = false; // true when the page wrote its own data-theme and nobody picked one yet

  function stored() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function resolve(mode) {
    if (mode === "dark" || mode === "light") return mode;
    return media && media.matches ? "dark" : "light";
  }

  function applyTheme(mode) {
    var actual = resolve(mode);
    root.setAttribute("data-theme", actual);
    $all("[data-hui-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-pressed", actual === "dark" ? "true" : "false");
    });
    return actual;
  }

  var theme = {
    get: function () { return root.getAttribute("data-theme") || "light"; },
    set: function (mode) {
      pageFixed = false;
      try {
        if (mode === "auto") localStorage.removeItem(THEME_KEY);
        else localStorage.setItem(THEME_KEY, mode);
      } catch (e) {}
      return applyTheme(mode);
    },
    toggle: function () { return theme.set(theme.get() === "dark" ? "light" : "dark"); }
  };

  if (media && media.addEventListener) {
    media.addEventListener("change", function () { if (!stored() && !pageFixed) applyTheme("auto"); });
  }

  function themeButtons(scope) {
    $all("[data-hui-theme-toggle]", scope).forEach(function (btn) {
      if (!once(btn, "Theme")) return;
      btn.setAttribute("aria-pressed", theme.get() === "dark" ? "true" : "false");
      btn.addEventListener("click", function () { theme.toggle(); });
    });
  }

  /* ---------- Boot ---------- */
  function init(scope) {
    scope = scope || doc;
    reveal(scope);
    tabs(scope);
    dialogs(scope);
    menus(scope);
    toastButtons(scope);
    copyButtons(scope);
    ranges(scope);
    themeButtons(scope);
  }

  // A saved choice wins. Then a data-theme written by the page. Then the system.
  if (stored()) applyTheme(stored());
  else if (root.hasAttribute("data-theme")) pageFixed = true;
  else applyTheme("auto");

  window.HappyUI = { init: init, toast: toast, theme: theme, reveal: reveal, version: "1.0.0" };

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", function () { init(doc); });
  else init(doc);
})();
