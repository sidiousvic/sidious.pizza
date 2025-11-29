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
    const label = toggle.querySelector("[data-theme-label]");
    if (label) label.textContent = dark ? "⽇" : "⽉";
  }
}

function initTheme() {
  const themeToggle = qs(".theme-toggle");
  const stored = window.localStorage?.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  let mode = stored || "dark";

  applyTheme(mode, themeToggle);

  themeToggle?.addEventListener("click", (e) => {
    if (themeToggle.tagName && themeToggle.tagName.toLowerCase() === "a") {
      e.preventDefault();
    }
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

  document.addEventListener("keydown", (e) => {
    if (e.key && e.key.toLowerCase() === "t") {
      const next = document.documentElement.classList.contains("theme-dark") ? "light" : "dark";
      window.localStorage?.setItem(THEME_KEY, next);
      applyTheme(next, themeToggle);
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

function initClock() {
  const clock = qs("[data-clock]");
  if (!clock) return;

  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chihuahua",
    hour: "2-digit",
    minute: "2-digit",
  });

  const tick = () => {
    try {
      clock.textContent = fmt.format(new Date());
    } catch (err) {
      console.error("Clock update failed", err);
    }
  };

  tick();
  setInterval(tick, 30_000);
}

function initDesktopLayout() {
  const container = qs(".desktop-icons");
  if (!container) return;
  const icons = qsa(".desktop-icons .desktop-icon");
  if (!icons.length) return;
  const aboutIcon = icons.find((icon) => icon.dataset.about === "true");

  const toGrid = () => {
    container.classList.add("desktop-grid");
    icons.forEach((icon) => {
      icon.style.removeProperty("left");
      icon.style.removeProperty("top");
      icon.style.removeProperty("position");
      icon.style.removeProperty("transform");
    });
  };

  const placeScatter = () => {
    container.classList.remove("desktop-grid");
    container.style.position = "relative";
    const pad = 24;
    const cw = container.clientWidth;
    const ch = Math.max(container.clientHeight, Math.round(window.innerHeight * 0.65));
    if (cw <= 0) return toGrid();

    const boxes = [];

    if (aboutIcon) {
      const rect = aboutIcon.getBoundingClientRect();
      const w = Math.min(rect.width || 128, cw - pad * 2);
      const h = Math.min(rect.height || 140, ch - pad * 2);
      if (w <= 0 || h <= 0) return toGrid();
      const x = Math.max(pad, cw - pad - w);
      const y = pad + 6;
      boxes.push({ x, y, w, h });
      aboutIcon.style.position = "absolute";
      aboutIcon.style.left = `${x}px`;
      aboutIcon.style.top = `${y}px`;
      aboutIcon.style.transform = "none";
    }

    const overlaps = (x, y, w, h) => boxes.some((b) => !(x + w <= b.x || b.x + b.w <= x || y + h <= b.y || b.y + b.h <= y));

    for (const icon of icons) {
      if (icon === aboutIcon) continue;
      const rect = icon.getBoundingClientRect();
      const iw = Math.min(rect.width || 128, cw - pad * 2);
      const ih = Math.min(rect.height || 140, ch - pad * 2);
      let placed = false;
      for (let attempt = 0; attempt < 160; attempt++) {
        const maxX = Math.max(8, cw - pad * 2 - iw);
        const maxY = Math.max(8, ch - pad * 2 - ih);
        const x = pad + Math.random() * maxX;
        const y = pad + Math.random() * maxY;
        if (!overlaps(x, y, iw, ih)) {
          boxes.push({ x, y, w: iw, h: ih });
          icon.style.position = "absolute";
          icon.style.left = `${x}px`;
          icon.style.top = `${y}px`;
          icon.style.transform = "none";
          placed = true;
          break;
        }
      }
      if (!placed) {
        return toGrid();
      }
    }
  };

  const applyLayout = () => {
    if (window.innerWidth < 900) {
      toGrid();
    } else {
      placeScatter();
    }
  };

  const debounced = (() => {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(applyLayout, 120);
    };
  })();

  applyLayout();
  window.addEventListener("resize", debounced);
}

function initTattsuGate() {
  const end = typeof window !== "undefined" && window.localStorage?.getItem("end") === "true";
  qsa('[data-requires-end="true"]').forEach((icon) => {
    if (end) {
      icon.classList.add("is-active");
      icon.style.removeProperty("display");
    } else {
      icon.remove();
    }
  });
}

function initDesktopModal() {
  const modal = qs("[data-modal]");
  if (!modal) return;
  const img = modal.querySelector("[data-modal-img]");
  const caption = modal.querySelector("[data-modal-caption]");
  let openSrc = "";

  const close = () => {
    modal.hidden = true;
    modal.classList.remove("is-open");
    if (img) img.src = "";
    openSrc = "";
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
  modal.addEventListener("click", close);

  qsa(".desktop-icon[data-modal-image]").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      const src = icon.getAttribute("data-modal-image");
      const title = icon.getAttribute("data-modal-title") || "";
      if (!src || !img) return;
      const cleanSrc = src.replace(/^\"|\"$/g, "");
      if (modal.classList.contains("is-open") && cleanSrc === openSrc) {
        close();
        return;
      }
      openSrc = cleanSrc;
      img.src = cleanSrc;
      img.alt = title || "Image";
      if (caption) {
        caption.textContent = title || "";
        caption.hidden = !Boolean(title && title.trim());
      }
      modal.hidden = false;
      modal.classList.add("is-open");
    });
  });
}

const SUPPORTED_LANGS = ["en", "jp", "es"];

function initLangSwitch() {
  const langSwitch = qs(".lang-switch");
  if (!langSwitch) return;
  const scope = langSwitch.closest(".article") || document;

  const langAttr = langSwitch.getAttribute("data-langs") || "";
  const configuredLangs = langAttr.split(",").map((l) => l.trim().toLowerCase()).filter(Boolean);
  const buttons = Array.from(langSwitch.querySelectorAll(".lang-btn"));
  if (!buttons.length) return;

  const presentLangs = configuredLangs.length ? configuredLangs : SUPPORTED_LANGS;
  const contentSections = Array.from(scope.querySelectorAll("en, jp, es, [data-lang]")).filter((el) => {
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

    const titleVariants = Array.from(document.querySelectorAll(".title-variant"));
    if (titleVariants.length) {
      let matched = false;
      titleVariants.forEach((span) => {
        const code = span.getAttribute("data-lang") || "";
        const show = code === lang;
        span.style.display = show ? "inline" : "none";
        if (show) matched = true;
      });
      if (!matched) {
        titleVariants.forEach((span) => {
          const code = span.getAttribute("data-lang") || "";
          if (!code || code === "en") span.style.display = "inline";
        });
      }
    }
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

  const ttsEnabled = document.querySelector("[data-tts-enabled='true']");
  if (!ttsEnabled) {
    trigger.style.display = "none";
    stopBtn.style.display = "none";
    return;
  }

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
  initHeaderScroll();
  initClock();
  initTattsuGate();
  initDesktopLayout();
  const tattsuEligible = typeof window !== "undefined" && window.localStorage?.getItem("end") === "true";
  if (tattsuEligible) {
    qsa('[data-requires-end="true"]').forEach((icon) => icon.classList.add("is-active"));
  }
  initDesktopModal();
  const langApi = initLangSwitch();
  initTTS(langApi);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
