const THEME_KEY = "sidious-theme";
const mediaMobile = typeof window !== "undefined" && window.matchMedia
  ? window.matchMedia("(max-width: 720px)")
  : null;
const isMobile = Boolean(mediaMobile && mediaMobile.matches);

const qs = (sel) => document.querySelector(sel);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));

function initLogoShuffle() {
  const siteTitle = qs(".site-title");
  if (!siteTitle) return;

  const isHome = siteTitle.getAttribute("data-is-home") === "true" || window.location.pathname === "/";
  if (isHome) return;

  const poolAttr = siteTitle.getAttribute("data-logo-pool");
  const logoEls = qsa(".site-title .site-logo");
  if (!logoEls.length) return;

  let pool = logoEls.map((img) => img.getAttribute("src")).filter(Boolean);

  if (poolAttr) {
    try {
      const parsed = JSON.parse(poolAttr);
      if (Array.isArray(parsed) && parsed.length) pool = parsed;
    } catch (err) {
      console.error("Logo pool parse failed", err);
    }
  }

  if (!pool.length) return;

  const choice = pool[Math.floor(Math.random() * pool.length)];
  logoEls[0].setAttribute("src", choice);
  logoEls.slice(1).forEach((img) => {
    img.setAttribute("aria-hidden", "true");
    img.setAttribute("tabindex", "-1");
    img.style.display = "none";
  });
}

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

const SUPPORTED_LANGS = ["en", "jp", "es"];

function initLangSwitch() {
  const langSwitch = qs(".lang-switch");
  if (!langSwitch) return;

  const langAttr = langSwitch.getAttribute("data-langs") || "";
  const configuredLangs = langAttr.split(",").map((l) => l.trim().toLowerCase()).filter(Boolean);
  const buttons = Array.from(langSwitch.querySelectorAll(".lang-btn"));
  if (!buttons.length) return;

  const presentLangs = configuredLangs.length ? configuredLangs : SUPPORTED_LANGS;
  const contentSections = Array.from(document.querySelectorAll("en, jp, es, [data-lang]")).filter((el) => {
    // Ignore the language switch controls themselves
    if (el.closest(".lang-switch")) return false;
    const tag = el.tagName.toLowerCase();
    const attr = el.getAttribute("data-lang");
    const code = attr || tag;
    return presentLangs.includes(code);
  });

  const defaultLang = langSwitch.getAttribute("data-default-lang") || presentLangs[0] || "en";
  let current = defaultLang;

  const setLang = (lang) => {
    current = lang;
    buttons.forEach((btn) => {
      const code = btn.getAttribute("data-lang");
      const active = code === lang;
      btn.style.display = "inline-flex";
      btn.style.removeProperty("display");
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    contentSections.forEach((el) => {
      const tag = el.tagName.toLowerCase();
      const dataLang = el.getAttribute("data-lang");
      const elLang = dataLang || tag;
      el.style.display = elLang === lang ? "" : "none";
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLang(btn.getAttribute("data-lang") || "en");
    });
  });

  setLang(current);

  return {
    getCurrent: () => current,
  };
}

const TTS_ENDPOINT = (() => {
  const meta = document.querySelector('meta[name="tts-endpoint"]')?.getAttribute("content");
  const global = typeof window !== "undefined" ? window.TTS_ENDPOINT : null;
  return global || meta || "/api/tts";
})();

function initTTS(langApi) {
  const trigger = qs(".tts-toggle");
  const stopBtn = qs(".tts-stop");
  if (!trigger || !stopBtn) return;

  const setState = (state) => {
    trigger.dataset.state = state;
  };

  const setStopVisible = (visible) => {
    stopBtn.classList.toggle("is-visible", visible);
  };

  const setStopText = (text) => {
    stopBtn.textContent = text;
  };

  const clearStopUnavailable = () => {
    stopBtn.classList.remove("is-unavailable");
    setStopText("Stop");
    setStopVisible(false);
  };

  let audio;
  let audioUrl;
  let controller;
  let isPlaying = false;
  let isLoading = false;

  const cleanupAudio = () => {
    if (audio) {
      audio.pause();
      audio = null;
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      audioUrl = null;
    }
    if (controller) controller.abort();
    controller = null;
    isPlaying = false;
    trigger.classList.remove("is-playing");
    clearStopUnavailable();
    setState("idle");
  };

  const getTextForCurrentLang = () => {
    const lang = (langApi && langApi.getCurrent ? langApi.getCurrent() : null) || qs(".lang-switch")?.getAttribute("data-default-lang") || "en";
    const target = document.querySelector(`section[data-lang="${lang}"]`) || document.querySelector(`[data-lang="${lang}"]`);
    const text = (target?.innerText || document.querySelector(".article")?.innerText || "").trim();
    return { lang, text };
  };

  const setLoading = (state) => {
    isLoading = state;
    trigger.classList.toggle("is-loading", state);
    trigger.disabled = state;
    if (state) setState("loading");
    if (!state) trigger.classList.remove("is-error");
  };

  stopBtn.addEventListener("click", () => {
    cleanupAudio();
  });

  trigger.addEventListener("click", async () => {
    if (isLoading) return;

    // Toggle pause/play if audio already loaded
    if (audio) {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        trigger.classList.remove("is-playing");
        setState("paused");
        setStopVisible(true);
      } else {
        await audio.play();
        isPlaying = true;
        trigger.classList.add("is-playing");
        setState("playing");
        setStopVisible(true);
      }
      return;
    }

    const { lang, text } = getTextForCurrentLang();
    if (!text) {
      setState("idle");
      showToastError("No text to read");
      return;
    }

    setLoading(true);
    setState("loading");
    controller = new AbortController();

    try {
      const res = await fetch(TTS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: text.slice(0, 4000),
          lang,
          format: "mp3",
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `TTS failed (${res.status})`);
      }

      const buf = await res.arrayBuffer();
      const blob = new Blob([buf], { type: "audio/mpeg" });
      audioUrl = URL.createObjectURL(blob);
      audio = new Audio(audioUrl);
      audio.addEventListener("ended", () => {
        isPlaying = false;
        trigger.classList.remove("is-playing");
        setState("idle");
        setStopVisible(false);
      });

      await audio.play();
      isPlaying = true;
      trigger.classList.add("is-playing");
      setState("playing");
      setStopVisible(true);
    } catch (err) {
      console.error(err);
      cleanupAudio();
      setState("idle");
      trigger.classList.add("is-error");
      setStopText("Unavailable");
      setStopVisible(false);
      stopBtn.classList.add("is-unavailable");
      setTimeout(() => {
        stopBtn.classList.remove("is-unavailable");
        clearStopUnavailable();
      }, 3200);
    } finally {
      setLoading(false);
    }
  });
}

function init() {
  initTheme();
  initMenu();
  initLogoShuffle();
  initActiveNav();
  initHeaderScroll();
  const langApi = initLangSwitch();
  initTTS(langApi);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
