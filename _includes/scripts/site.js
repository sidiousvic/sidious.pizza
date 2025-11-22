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

function initGrain() {
  if (isMobile) return;

  const start = () => {
    const canvas = document.createElement("canvas");
    canvas.className = "grain-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;

    const vertSrc = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragSrc = `
      precision mediump float;
      uniform vec2 u_res;
      uniform float u_time;
      float rand(vec2 st) {
        return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453123);
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        float n = rand(uv + vec2(u_time * 0.55, u_time * 0.97));
        float tone = 0.35 + (n - 0.5) * 0.3;
        gl_FragColor = vec4(vec3(tone), 0.23);
      }
    `;

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vert = compile(gl.VERTEX_SHADER, vertSrc);
    const frag = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, "u_res");
    const timeLoc = gl.getUniformLocation(program, "u_time");

    let w = 0;
    let h = 0;
    let dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const nextDpr = window.devicePixelRatio || 1;
      if (nextDpr !== dpr) dpr = nextDpr;
      const nw = Math.floor(window.innerWidth * dpr);
      const nh = Math.floor(window.innerHeight * dpr);
      if (nw === w && nh === h) return;
      w = nw;
      h = nh;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      gl.viewport(0, 0, w, h);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const render = (t) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resLoc, w, h);
      gl.uniform1f(timeLoc, t * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  };

  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });

  window.setTimeout(() => {
    document.body.classList.add("grain-on");
  }, 1000);
}

function init() {
  initTheme();
  initMenu();
  initActiveNav();
  initHeaderScroll();
  initGrain();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
