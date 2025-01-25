(() => {
  var p = (e) => (t) =>
      Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)),
    y = (e) => (t) => Math.floor(Math.random() * (t - e + 1) + e),
    u = (e) => e[Math.floor(Math.random() * e.length)],
    h = (e) => -e;
  var X = (e) => e / 2,
    I = (e) => X(e.dimension),
    J = (e) => (t) => p(e)(t) <= I(e) + I(t),
    E = (e) => (t) => (s) => J(e)(t) && void s(),
    z = (e) => ((e.x += e.speed.x), (e.y += e.speed.y)),
    R = (e) => (t) => ((e.x = t.x), (e.y = t.y)),
    C = (e) => (t) => (e.sprite = t),
    x = (e) => ({ x: y(e)(innerWidth - e), y: y(e)(innerHeight - e) }),
    w = (e) => (
      (e.x = y(e.dimension)(innerWidth - e.dimension)),
      (e.y = y(e.dimension)(innerHeight - e.dimension))
    ),
    k = (e) => (t) => (
      (e.value += t), (e.sprite.innerHTML = String(~~e.value))
    ),
    b = (e) => (t) =>
      p(e)({ x: e.x, y: t.y }) <= e.dimension ||
      p(e)({ x: e.x, y: t.y }) - t.y > 0
        ? (e.speed.y = h(e.speed.y))
        : (p(e)({ x: t.x, y: e.y }) <= e.dimension ||
            p(e)({ x: t.x, y: e.y }) - t.x > 0) &&
          (e.speed.x = h(e.speed.x)),
    g =
      (e) =>
      ({ sprite: t, x: s, y: a, dimension: m }) =>
        e?.getContext("2d")?.drawImage(t, s, a, m, m),
    d =
      ({ x: e, y: t }) =>
      (s) =>
      (a) =>
      (m) => ({ x: e, y: t, sprite: a, dimension: s, speed: { x: m, y: m } }),
    T = (e) => (t) => (s) => (
      requestAnimationFrame(() => T(e)(t)(s)),
      e?.getContext("2d")?.clearRect(0, 0, e.width, e.height),
      s(t)
    ),
    _ = ({
      scoreFont: e,
      startScreenTextFont: t,
      startScreenTitleFont: s,
      startTextA: a,
      startTextB: m,
      displayScore: B,
      gameTitle: F,
      sprites: S,
      filter: M,
      audios: U,
      startScreen: Z,
      bgColorHex: q,
      fgColorHex: V,
    }) => {
      document.body.innerHTML += `
<canvas>
  ${S.map(
    (n) =>
      `<img alt="an in-game sprite" id="${
        n.split("/").pop().split(".")[0]
      }" width="0" height="0" src=${n} />`
  )}
</canvas>

<p id="score" ${B ? "visible" : "hidden"}>0</p>

<div id="start-screen">
  <h1 id="start-screen-title">${F}</h1>
  <p id="start-screen-text">${a}</p>
</div>

<style>
  :root {
    --phantom-background-color: ${q};
    --phantom-foreground-color: ${V};
  }
  
  html { 
    height: 100%; 
  }
  
  body {
    background: transparent; 
    touch-action: none;
  }
  
  p { 
    margin: 0; 
    line-height: 30px;
  }
  
  canvas { 
    z-index: -1;  
    position: absolute; 
    top: 0; 
    left: 0; 
  }
  
  #start-screen { 
    display: ${Z ? "flex" : "none"};
    top: 0;
    left: 0; 
    background-color: var(--phantom-background-color); 
    color: var(--phantom-foreground-color);
    filter: ${M};
    flex-direction: column; 
    text-align: center; 
    align-items: center; 
    justify-content: center; 
    position: absolute; 
    height: 100vh; 
    width: 100vw; 
    z-index: 2; 
    font-size: 30px; 
    & > p {
      color: whitesmoke;
    }
  }
  
  #start-screen-title {
    font-family: ${s}, monospace; 
    font-size: 40px;
    font-weight: 100;
    filter: ${M};w
  }

  @media (max-width: 700px) {
    #start-screen-title {
      font-size: 30px;
    }
  }

  #start-screen-text {
    font-family: ${t}, monospace; 
    font-size: 20px;
  }


  #score { 
    position: absolute; 
    font-size: 3rem; 
    font-family: ${e}; 
    bottom: 50%; 
    left: 50%; 
    mix-blend-mode: difference;
    transform: translate(-50%, 50%); 
    color: var(--phantom-foreground-color); 
    width: 100%;
    text-align: center;
  }
  
  canvas > img { 
    mix-blend-mode: exclusion;
    image-rendering: pixelated; 
  }
</style>
`;
      let A = S.reduce(
          (n, r) => ({
            ...n,
            [r.split("/").pop().split(".")[0]]: document.getElementById(
              r.split("/").pop().split(".")[0]
            ),
          }),
          { score: document.getElementById("score") }
        ),
        f = document.getElementById("start-screen"),
        L = document.getElementById("start-screen-text"),
        l = document.querySelector("canvas");
      (l.width = innerWidth), (l.height = innerHeight);
      let o = { x: l.width / 2, y: l.height / 2 },
        G = { value: 0, sprite: A.score },
        Y = U.reduce((n, r) => {
          let H = new Audio(r.url);
          return (
            (H.volume = r.volume),
            { ...n, [r.url.split("/").pop().split(".")[0]]: H }
          );
        }, {});
      return (
        setInterval(() => (L.innerHTML = L.innerHTML === a ? m : a), 2e3),
        addEventListener(
          "resize",
          () => ((l.width = innerWidth), (l.height = innerHeight))
        ),
        addEventListener(
          "mousemove",
          ({ clientX: n, clientY: r }) => ((o.x = n), (o.y = r))
        ),
        addEventListener(
          "touchmove",
          (n) => (
            (o.x = n.touches[0].clientX - 17), (o.y = n.touches[0].clientY - 90)
          ),
          { passive: !1 }
        ),
        addEventListener(
          "touchstart",
          (n) => ((o.x = n.touches[0].clientX), (o.y = n.touches[0].clientY)),
          { passive: !1 }
        ),
        addEventListener("keydown", (n) => n.key === "Enter" && f.remove()),
        addEventListener("keydown", (n) => n.key === "ArrowUp" && (o.y -= 60)),
        addEventListener(
          "keydown",
          (n) => n.key === "ArrowRight" && (o.x += 60)
        ),
        addEventListener(
          "keydown",
          (n) => n.key === "ArrowDown" && (o.y += 60)
        ),
        addEventListener(
          "keydown",
          (n) => n.key === "ArrowLeft" && (o.x -= 60)
        ),
        addEventListener("click", () => f.remove()),
        addEventListener("touchstart", () => f.remove()),
        { c: l, mouse: o, sound: Y, score: G, sprites: A }
      );
    };
  var P = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (P) {
    let e = document.createElement("style");
    (e.textContent = `
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 1.4rem;
      cursor: none !important;
    }
    #score {
      font-size: 1.7rem !important;
    }
  `),
      document.head.appendChild(e);
  }
  var O = document.createElement("style");
  O.textContent = `
  body {
    cursor: none !important;
  }
  #score { 
    animation: shake .5s infinite;
  }
  @keyframes shake {
      0%, 100% {
      transform: translate(calc(-50%), 50%);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translate(calc(-50% - 2px), 50%);
    }
    20%, 40%, 60%, 80% {
      transform: translate(-50%, calc(50% + 2px));
    }
  }

`;
  document.head.appendChild(O);
  var $ = [-5, -4, -5, 2, 3, 4, 5],
    W = 0,
    i = P ? 30 : 50,
    K = (Math.pow(i, 2) / (innerHeight * innerWidth)) * 1e3,
    Q = [
      "Wicked<i>\uFF01</i>",
      "Pie-wack<i>\uFF01</i>",
      "Slice 'n' dice<i>\uFF01</i>",
      "Mamma mia<i>\uFF01</i>",
      "Pizza-boo<i>\uFF01</i>",
      "Sizzle and fizzle<i>\uFF01</i>",
      "Pie 'n' die<i>\uFF01</i>",
      "\u30D1\u30A4\u3084\u3070\u3063<i>\uFF01</i>",
      "\u51C4\u8155\u30D4\u30B6<i>\uFF01</i>",
      "\u9003\u3052\u308D\u30FC<i>\uFF01</i>",
      "\u30D1\u30A4\u9003\u907F<i>\uFF01</i>",
    ],
    j = /phantompizza/i.test(location.href),
    {
      sprites: c,
      score: D,
      sound: ee,
      mouse: N,
      c: v,
    } = _({
      gameTitle: j ? "PHANTOM PIZZA" : "SIDIOUS.PIZZA",
      displayScore: !0,
      startScreen: !0,
      startScreenTitleFont: "var(--font-family-title)",
      startScreenTextFont: "var(--font-family)",
      scoreFont: "var(--font-family-title)",
      bgColorHex: "#0d1117",
      fgColorHex: "var(--venom)",
      filter: "var(--filter-invert)",
      startTextA: P
        ? "<em>TOUCH</em> TO START"
        : 'PRESS <em style="filter: var(--filter-invert)">START</em>',
      startTextB:
        '\u5371\u967A\u30BE\u30FC\u30F3\u306B <em style="filter: var(--filter-invert)">\u6295\u5165</em>',
      sprites: [
        "/assets/images/enemyl.webp",
        "/assets/images/enemyr.webp",
        "/assets/images/swoosh.webp",
        "/assets/images/player.gif",
      ],
      audios: [
        { url: "/assets/music/swoosh.wav", volume: 0.3 },
        { url: "/assets/music/death.wav", volume: 0.9 },
        { url: "/assets/music/phantompizza.wav", volume: 0.8 },
      ],
    }),
    te = {
      player: d(N)(i)(c.player)(W),
      swoosh: d(x(i))(i)(c.swoosh)(W),
      enemies: [d(x(i))(i)(c.enemyr)(u($))],
    },
    ne = { phantoms: te, sound: ee, score: D, mouse: N };
  requestAnimationFrame(() => {
    T(v)(ne)(
      (e) => (
        e.score.value === 0 &&
          ((document.getElementById("score").innerHTML = "START!"),
          e.sound.phantompizza.pause()),
        e.score.value > 1 && e.sound.phantompizza.play().catch(() => {}),
        R(e.phantoms.player)(e.mouse),
        g(v)(e.phantoms.player),
        E(e.phantoms.swoosh)(e.phantoms.player)(
          () => (
            k(e.score)(K),
            ~~e.score.value % 3
              ? (document.getElementById("score").style.animation = "none")
              : ((document.getElementById("score").style.animation =
                  "shake .5s infinite"),
                (D.sprite.innerHTML = u(Q).toUpperCase())),
            w(e.phantoms.swoosh),
            e.sound.swoosh.play().catch(() => {}),
            e.phantoms.enemies.push(d(x(i))(i)(c.enemyr)(u($)))
          )
        ),
        g(v)(e.phantoms.swoosh),
        e.phantoms.enemies.map(
          (t) => (
            (e.enemy = t),
            E(t)(e.phantoms.player)(
              () => (
                w(e.phantoms.swoosh),
                (e.score.value = 0),
                (e.phantoms.enemies.length = 0),
                e.sound.death.play().catch(() => {})
              )
            ),
            z(t),
            C(t)(t.speed.x < 0 ? c.enemyl : c.enemyr),
            b(t)({ x: innerWidth, y: innerHeight }),
            g(v)(t)
          )
        )
      )
    );
  });
})();
