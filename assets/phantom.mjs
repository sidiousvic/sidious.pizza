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
 * @typedef {Object} Phantom
 * @description A game object.
 * @property {number} x The x coordinate of the game object.
 * @property {number} y The y coordinate of the game object.
 * @property {number} dimension The dimension of the game object. (width and height)
 * @property {HTMLImageElement} sprite The sprite of the game object.
 * @property {{x: number, y: number}} speed The speed of the game object.
 * @example { x: 0, y: 0, dimension: 50, sprite: HTMLImageElement }
 */

/**
 * @typedef {Object} Mouse
 * @description A game object representing the mouse coordinates.
 * @property {number} x The x coordinate of the game object.
 * @property {number} y The y coordinate of the game object.
 * @example { x: 0, y: 0 }
 */

/**
 * @typedef {Function} Mutation
 * @description A function that executes a void function (side effect)
 * @param {unknown} x The void to execute
 * @returns {void}
 */

/**
 * @typedef {Function} Mutator
 * @description A function that executes a mutation
 * @param {Mutation} m The mutation to execute
 * @returns {void}
 */

/**
 * Calculates the distance between two game objects (Phantoms).
 *
 * @param {Phantom} a The first game object
 * @returns {(b: Phantom) => number} (b: Phantom) => number
 * @param {Phantom} b The second game object
 * @returns distance Distance in pixels between two game objects
 * @description 𝑑 = √( ( 𝑥2 - 𝑥1 )² + ( 𝑦2 - 𝑦1 )² )
 * @example distance({x: 1, y: 1})({x: 2, y: 2}) ⚡︎1.414...
 */
export const distance = (a) => (b) =>
  Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

/**
 * Picks a random integer from a range.
 *
 * @param {number} min The lower end of the range
 * @returns {(max: number) => number} (max: number) => number
 * @param {number} max The upper end of the range
 * @returns {number} Random integer from a range
 * @example randomIntFromRange(1)(10) ⚡︎9
 */
export const randomIntFromRange = (min) => (max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Picks a random element from a list.
 *
 * @param {T[]} list The list to pick from
 * @returns {T} Random element from a list
 * @example randomElement([1, 2, 3, 4, 5]) ⚡︎3
 */
export const randomElement = (list) =>
  list[Math.floor(Math.random() * list.length)];

/**
 * Negates a number.
 *
 * @param {number} n The number to negate.
 * @returns {number} Negated number
 * @example negation(1) ⚡︎-1
 */
export const negation = (n) => -n;

/**
 * Averages two numbers.
 * @param {number} n The first number
 * @returns {(y: number) => number} (y: number) => number
 * @param {number} m The second number
 * @returns {number} Average of two numbers
 * @example avg(1)(2) ⚡︎1.5
 */
export const avg = (n) => (m) => n + m / 2;

/**
 * Divides a number by two.
 * @param {number} n The number to divide
 * @returns {number} Half of a number
 * @example divideByTwo(50) ⚡︎25
 */
export const divideByTwo = (n) => n / 2;

/**
 * Provides the hitbox, which is the radius (half-diagonal) of a game object.
 * @param {Phantom} o The game object
 * @returns {number} Hitbox of a game object
 * @example hitbox(50) ⚡︎25
 */
export const hitbox = (o) => divideByTwo(o.dimension);

/**
 * Verifies that two game objects are colliding.
 *
 * @param {Phantom} a The first game object
 * @returns {(b: Phantom) => boolean} (b: Phantom) => boolean
 * @param {Phantom} b The second game object
 * @returns {boolean} True if two game objects are colliding
 * @example colliding({x: 1, y: 1})({x: 2, y: 2}) ⚡︎false
 */
export const colliding = (a) => (b) => distance(a)(b) <= hitbox(a) + hitbox(b);

/**
 * Executes a mutation if two game objects are colliding.
 *
 * @param {Phantom} a The first game object
 * @returns {(b: Phantom) => Mutator} (b: Phantom) => (f: () => void) => void
 * @param {Phantom} b The second game object
 * @returns {Mutator} (f: () => void) => void
 * @param {Mutation} f The mutation to execute
 * @returns {void} Executes a mutation if two game objects are colliding
 * @example collide(player)(enemy)(() => sound.death.play()) ⚡︎
 */
export const collide = (a) => (b) => (f) => colliding(a)(b) && void f();

/**
 * Moves the game object according to their velocity.
 * @param {Phantom} o The game object
 * @returns {void} Moves the game object according to their velocity
 * @example moveWithVelocity(enemy) ⚡︎
 */
export const moveWithVelocity = (o) => ((o.x += o.speed.x), (o.y += o.speed.y));

/**
 * Moves the game object according to the mouse position.
 * @param {Phantom} o The game object
 * @returns {(m: Mouse) => void} (m: Mouse) => void
 * @param {Mouse} m The mouse position
 * @returns {void} Moves the game object according to the mouse position
 * @example moveWithMouse(player)(mouse) ⚡︎
 */
export const moveWithMouse = (o) => (m) => ((o.x = m.x), (o.y = m.y));

export const switchSprite = (o) => (sprites) => (condition) =>
  condition ? (o.sprite = sprites.L) : (o.sprite = sprites.R);

export const spawnRandom = (O) => (dimension) => (speeds) =>
  O(randomIntFromRange(dimension)(innerWidth - dimension))(
    randomIntFromRange(dimension)(innerHeight - dimension)
  )(dimension)(randomElement(speeds));

export const respawn = (o) => (
  (o.x = randomIntFromRange(o.dimension)(innerWidth - o.dimension)),
  (o.y = randomIntFromRange(o.dimension)(innerHeight - o.dimension))
);

export const updateValue = (object) => (amount) => (
  (object.value += amount), (object.sprite.innerHTML = ~~object.value)
);

export const bounce = (object) => (bounds) =>
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

export const draw =
  (c) =>
  ({ sprite, x, y, dimension }) =>
    c.ctx.drawImage(sprite, x, y, dimension, dimension);

export const Phantom = (x) => (y) => (dimension) => (sprite) => (speed) => ({
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
  //@ts-ignore
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
