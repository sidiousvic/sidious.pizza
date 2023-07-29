/*
 *
 * Phantom
 *
 * A wicked HTML 2D Canvas game engine
 *
 * by @sidiousvic
 *
 */
const START_ANIMATION_INTERVAL = 2000;
const ARROW_SPEED = 20;
/**
 * @function compose
 * @returns function a composition of functions
 * @example
 * const addOne = (n) => n + 1;
 * const double = (n) => n * 2;
 * const addOneThenDouble = compose(double)(addOne);
 */
export const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);

/**
 * @function exec
 * @returns function execute a sequence of functions
 */
export const exec = (fn) => () => fn();

/**
 * @function debug
 * @alias console.log
 */
export const debug = console.log;

/**
 * @function distance
 * @returns distance in pixels between two points
 * @example distance({x: 1, y: 1})({x: 2, y: 2}) // 1.4142135623730951
 * @math 𝑑 = √( ( 𝑥2 - 𝑥1 )² + ( 𝑦2 - 𝑦1 )² )
 */
export const distance =
  ({ x, y }) =>
  ({ x: w, y: z }) =>
    Math.sqrt(Math.pow(w - x, 2) + Math.pow(z - y, 2));

/**
 * @function randomIntFromRange
 * @returns number random integer between min and max
 * @example randomIntFromRange(1)(10) // 3
 */
export const randomIntFromRange = (min) => (max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 * @function randomElement
 * @returns T random element from a list
 * @example randomElement([1, 2, 3]) // 2
 */
export const randomElement = (list) =>
  list[Math.floor(Math.random() * list.length)];

/**
 * @function negation
 * @returns number negation of a number
 * @example negation(1) // -1
 */
export const negation = (n) => -n;

/**
 * @function avg
 * @returns number average of two numbers
 * @example avg(1)(2) // 1.5
 */
export const avg = (x) => (y) => x + y / 2;

/**
 * @function divideByTwo
 * @returns number half of a number
 * @example divideByTwo(2) // 1
 */
export const divideByTwo = (n) => n / 2;

/**
 * @function hitbox
 * @returns number half of a game object's dimension
 * @example hitbox(player) // 25
 */
export const hitbox = (o) => divideByTwo(o.dimension);

/**
 * @function colliding
 * @returns boolean true if game objects a and b collide
 * @example colliding(player)(swoosh) // true
 */
export const colliding = (a) => (b) => distance(a)(b) <= hitbox(a) + hitbox(b);

/**
 * @function $collide
 * @$ideffect
 * fires function f when game objects a and b collide
 * @example collide(player)(swoosh)(() => calculateScore(score)(enemy));
 */
export const $collide = (a) => (b) => (f) => colliding(a)(b) && void f();

/**
 * @function $move
 * @$ideffect
 * moves game object o
 * @example move(enemy)
 */
export const $moveWithVelocity = (o) => (
  (o.x += o.speed.x), (o.y += o.speed.y)
);

/**
 * @function $moveWithMouse
 * @$ideffect
 * moves game object o with mouse
 * @example moveWithMouse(player)(mouse)
 */
export const $moveWithMouse = (o) => (m) => ((o.x = m.x), (o.y = m.y));

/**
 * @function $switchSprite
 * @$ideffect
 * switches game object o sprite (left and right) based on condition
 * @example switchSprite(player)(z.mouse.x < player.x);
 */
export const $switchSprite = (o) => (sprites) => (condition) =>
  condition ? (o.sprite = sprites.L) : (o.sprite = sprites.R);

/**
 * @function spawnRandom
 * retunrs a game object with a random spawn position and speed within screen bounds
 * @example spawnRandom(Enemy)([-5, -4, -3 - 2, 2, 3, 4, 5]])
 */
export const spawnRandom = (O) => (dimension) => (speeds) =>
  O(randomIntFromRange(dimension)(innerWidth - dimension))(
    randomIntFromRange(dimension)(innerHeight - dimension)
  )(dimension)(randomElement(speeds));

/**
 * @function respawn
 * @$ideffect
 * respawns game object o within screen bounds
 * @example respawn(coin)
 */
export const $respawn = (o) => (
  (o.x = randomIntFromRange(o.dimension)(innerWidth - o.dimension)),
  (o.y = randomIntFromRange(o.dimension)(innerHeight - o.dimension))
);

/**
 * @function
 * @$ideffect
 * sets game object value
 * @example $updateValue(score)(50)
 */
export const $updateValue = (object) => (amount) => (
  (object.value += amount), (object.sprite.innerHTML = ~~object.value)
);

/**
 * @function bounce
 * @$ideffect
 * bounces game object o within window bounds
 * @example bounce(enemy)({ x: 500, y: 800 }})
 */
export const $bounce = (object) => (bounds) =>
  /** bottom */
  distance(object)({
    x: object.x,
    y: bounds.y,
  }) <= object.dimension
    ? (object.speed.y = negation(object.speed.y))
    : /** top */
    distance(object)({
        x: object.x,
        y: bounds.y,
      }) -
        innerHeight >
      0
    ? (object.speed.y = negation(object.speed.y))
    : /** right */
    distance(object)({
        x: bounds.x,
        y: object.y,
      }) <= object.dimension
    ? (object.speed.x = negation(object.speed.x))
    : /** left */
    distance(object)({
        x: bounds.x,
        y: object.y,
      }) -
        innerWidth >
      0
    ? (object.speed.x = negation(object.speed.x))
    : void 0;

/**
 * @function draw
 * @$ideffect
 * draws game object o on canvas
 * @example draw(c)(player)
 */
export const draw =
  (c) =>
  ({ sprite, x, y, dimension }) =>
    c.ctx.drawImage(sprite, x, y, dimension, dimension);

export const Controlled = (x) => (y) => (dimension) => (sprite) => ({
  x,
  y,
  sprite,
  dimension,
});

/**
 * Automatic
 * An object with L and R sprites (for turning) and a speed at which it can move independently.
 */
export const Automatic = (x) => (y) => (dimension) => (sprite) => (speed) => ({
  x,
  y,
  sprite,
  dimension,
  speed: { x: speed, y: speed },
});

export const Engine = (z) => (rev) => (
  requestAnimationFrame(() => Engine(z)(rev)),
  z.c.ctx.clearRect(0, 0, z.c.width, z.c.height),
  rev(z)
);

export const launch = ({
  SCORE_FONT,
  START_TEXT_A,
  START_TEXT_B,
  DISPLAY_SCORE,
  GAME_TITLE,
  SPRITES,
  AUDIOS,
}) => {
  document.querySelector("main").innerHTML += `
<canvas>
  ${SPRITES.map(
    (sprite) =>
      `<img id="${
        sprite.split("/").pop().split(".")[0]
      }" width="0" height="0" src=${sprite} />`
  )}
</canvas>

<p id="score" ${DISPLAY_SCORE ? "visible" : "hidden"}>0</p>

<div id="start-screen">
  <h1>${GAME_TITLE}</h1>
  <p id="press-start">${START_TEXT_A}</p>
</div>

<style>
  :root {
    --background-color: #0d1117;
    --score-font-color: #00ff2a;
  }
  
  html { 
    height: 100%; 
  }
  
  body {
    background: transparent; 
    cursor: none; 
  }
  
  nav { 
    mix-blend-mode: difference; 
  }
  
  a { 
    cursor: pointer; 
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
    cursor: none; 
  }
  
  #start-screen { 
    top: 0;
    left: 0; 
    background-color: var(--background-color); 
    display: flex; 
    flex-direction: column; 
    text-align: center; 
    align-items: center; 
    justify-content: center; 
    position: absolute; 
    height: 100vh; 
    width: 100vw; 
    z-index: 2; 
    font-size: 30px; 
  }
  
  #score { 
    position: absolute; 
    font-size: 3rem; 
    font-family: ${SCORE_FONT}, monospace; 
    bottom: 50%; 
    mix-blend-mode: difference; 
    left: 50%; 
    transform: translate(-50%, 50%); 
    color: var(--score-font-color); 
  }
  
  img { 
    mix-blend-mode: exclusion;
    image-rendering: pixelated; 
  }
</style>
`;

  const sprites = SPRITES.reduce(
    (acc, sprite) => ({
      ...acc,
      [sprite.split("/").pop().split(".")[0]]: document.getElementById(
        sprite.split("/").pop().split(".")[0]
      ),
    }),
    { score: document.getElementById("score") }
  );

  const startScreen = document.getElementById("start-screen");
  const pressStart = document.getElementById("press-start");
  const c = document.querySelector("canvas");
  c.ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;
  const mouse = { x: c.width / 2, y: c.height / 2 };
  const score = { value: 0, sprite: sprites.score };
  const sound = AUDIOS.reduce((acc, audio) => {
    const a = new Audio(audio.url);
    a.volume = audio.volume;
    return { ...acc, [audio.url.split("/").pop().split(".")[0]]: a };
  }, {});

  setInterval(
    () =>
      (pressStart.innerText =
        pressStart.innerText === START_TEXT_A ? START_TEXT_B : START_TEXT_A),
    START_ANIMATION_INTERVAL
  );

  addEventListener(
    "resize",
    () => ((c.width = innerWidth), (c.height = innerHeight))
  );
  addEventListener(
    "mousemove",
    ({ clientX, clientY }) => ((mouse.x = clientX), (mouse.y = clientY))
  );
  addEventListener(
    "touchmove",
    ({ touches }) => (
      (mouse.x = touches[0].clientX), (mouse.y = touches[0].clientY - 120)
    )
  );
  addEventListener(
    "touchstart",
    ({ touches }) => (
      (mouse.x = touches[0].clientX), (mouse.y = touches[0].clientY)
    )
  );
  addEventListener("keydown", (e) => e.key === "Enter" && startScreen.remove());
  addEventListener(
    "keydown",
    (e) => e.key === "ArrowUp" && (mouse.y -= ARROW_SPEED)
  );
  addEventListener(
    "keydown",
    (e) => e.key === "ArrowRight" && (mouse.x += ARROW_SPEED)
  );
  addEventListener(
    "keydown",
    (e) => e.key === "ArrowDown" && (mouse.y += ARROW_SPEED)
  );
  addEventListener(
    "keydown",
    (e) => e.key === "ArrowLeft" && (mouse.x -= ARROW_SPEED)
  );
  addEventListener("click", () => startScreen.remove());
  addEventListener("touchstart", () => startScreen.remove());
  return {
    pressStart,
    c,
    mouse,
    sound,
    score,
    sprites,
  };
};
