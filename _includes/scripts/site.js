const THEME_KEY = "sidious-theme";
const mediaMobile = typeof window !== "undefined" && window.matchMedia
  ? window.matchMedia("(max-width: 720px)")
  : null;
const isMobile = Boolean(mediaMobile && mediaMobile.matches);

const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

function applyTheme(mode, toggle) {
  const dark = mode === "dark";
  document.documentElement.classList.toggle("theme-dark", dark);
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.querySelector("svg")?.setAttribute("data-mode", dark ? "dark" : "light");
  }
}

function initTheme() {
  const themeToggle = qs(".theme-toggle");
  const stored = window.localStorage?.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  let mode = stored || (prefersDark && prefersDark.matches ? "dark" : "light");

  applyTheme(mode, themeToggle);

  themeToggle?.addEventListener("click", () => {
    mode = mode === "dark" ? "light" : "dark";
    window.localStorage?.setItem(THEME_KEY, mode);
    applyTheme(mode, themeToggle);
  });

  if (prefersDark && prefersDark.addEventListener) {
    prefersDark.addEventListener("change", (event) => {
      if (window.localStorage?.getItem(THEME_KEY)) return;
      mode = event.matches ? "dark" : "light";
      applyTheme(mode, themeToggle);
    });
  }
}

function initMenu() {
  const menuOverlay = document.getElementById("menu-overlay");
  const menuTrigger = qs(".menu-trigger");

  const toggleMenu = (force) => {
    if (!menuOverlay) return;
    const open = typeof force === "boolean" ? force : !menuOverlay.classList.contains("is-open");
    menuOverlay.classList.toggle("is-open", open);
    menuOverlay.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
    if (menuTrigger) menuTrigger.setAttribute("aria-expanded", String(open));
  };

  menuTrigger?.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

  menuOverlay?.addEventListener("click", (e) => {
    const linkClicked = e.target && e.target.closest && e.target.closest("a");
    if (linkClicked) return;
    toggleMenu(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key && e.key.toLowerCase() === "t") {
      const next = document.documentElement.classList.contains("theme-dark") ? "light" : "dark";
      window.localStorage?.setItem(THEME_KEY, next);
      applyTheme(next, qs(".theme-toggle"));
    }
    if (e.key === "Escape") toggleMenu(false);
  });
}

function initActiveNav() {
  qsa(".menu-list a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href !== "/" && window.location.pathname.startsWith(href)) {
      link.classList.add("is-active");
      link.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
    }
  });
}

function initHeaderScroll() {
  const header = qs(".site-header");
  if (!header) return;

  const onScroll = () => {
    if (isMobile) {
      header.classList.remove("is-scrolled");
      document.body.classList.remove("body-tilt");
      return;
    }
    const scrolled = window.scrollY > 8;
    header.classList.toggle("is-scrolled", scrolled);
    document.body.classList.toggle("body-tilt", scrolled);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function init() {
  initTheme();
  initMenu();
  initActiveNav();
  initHeaderScroll();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
