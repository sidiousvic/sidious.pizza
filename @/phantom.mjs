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
 * The state of the game
 * @typedef {Object} GameState
 * @property {Object.<string, HTMLImageElement>} sprites The sprites of the game
 * @property {Object.<string, HTMLAudioElement>} sound The sound effects of the game
 * @property {Numeric} score The score to display
 * @property {Coordinates} mouse The mouse coordinates
 * @property {HTMLCanvasElement} c The canvas
 */

/**
 * The user defined configuration constants
 * @typedef {Object} GameConfig
 * @property {string} SCORE_FONT The font of the score
 * @property {string} START_TEXT_A The first line of the start text
 * @property {string} START_TEXT_B The second line of the start text
 * @property {boolean} DISPLAY_SCORE Whether or not to display the score
 * @property {string} GAME_TITLE The title of the game
 * @property {string[]} SPRITES The sprites of the game as URLs
 * @property {string[]} AUDIOS The audios of the game as URLs
 * @property {string} BG_COLOR_HEX The background color of the game as a hex code
 * @property {string} FG_COLOR_HEX The foreground color of the game as a hex code
 */

/**
 * A game object.
 * @typedef {Object} Phantom
 * @property {number} x The x coordinate of the game object
 * @property {number} y The y coordinate of the game object
 * @property {number} dimension The dimension of the game object (width and height)
 * @property {HTMLImageElement} sprite The sprite of the game object
 * @property {{x: number, y: number}} speed The speed of the game object
 */

/**
 * A numeric value to display visually
 * @typedef {Object} Numeric
 * @property {number} value The numeric value to show on the element
 * @property {HTMLImageElement} sprite The sprite of the score object
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} x The x coordinate of the game object
 * @property {number} y The y coordinate of the game object
 */

/**
 * A function that executes a void function (side effect)
 * @typedef {Function} Mutation
 * @param {unknown} x The void to execute
 * @returns {void}
 */

/**
 * A function that executes a mutation
 * @typedef {Function} Mutator
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
 *
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
 *
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
 * Executes a mutation if two game objects are colliding
 *
 * @param {Phantom} a The first game object
 * @returns {(b: Phantom) => Mutator} (b: Phantom) => (f: () => void) => void
 * @param {Phantom} b The second game object
 * @returns {Mutator} (f: () => void) => void
 * @param {Mutation} f The mutation to execute
 * @returns {void}
 * @example collide(player)(enemy)(() => sound.death.play()) ⚡︎
 */
export const collide = (a) => (b) => (f) => colliding(a)(b) && void f();

/**
 * Moves the game object according to their velocity
 *
 * @param {Phantom} o The game object
 * @returns {void}
 * @example moveWithVelocity(enemy) ⚡︎
 */
export const moveWithVelocity = (o) => ((o.x += o.speed.x), (o.y += o.speed.y));

/**
 * Moves a game object according to the mouse position
 *
 * @param {Phantom} o The game object
 * @returns {(m: Coordinates) => void} (m: Coordinates) => void
 * @param {Coordinates} m The mouse position
 * @returns {void}
 * @example moveWithMouse(player)(mouse) ⚡︎
 */
export const moveWithMouse = (o) => (m) => ((o.x = m.x), (o.y = m.y));

/**
 * Switches the sprite of a game object
 *
 * @param {Phantom} o The game object
 * @returns {(sprite: HTMLElement) => void} (sprite: HTMLElement) => void
 * @param {HTMLElement} sprite The sprite to switch to
 * @returns {void}
 * @example switchSprite(enemy)(enemy.speed.x < 0 ? spriteR : spriteL) ⚡︎
 */
export const switchSprite = (o) => (sprite) => (o.sprite = sprite);

/**
 * Returns a random spawn position for a game object within screen bounds
 *
 * @param {number} dimension The dimension of the game object
 * @returns {Coordinates} Random spawn position
 * @example randomSpawn(50) ⚡︎{x: 100, y: 100}
 */
export const randomSpawn = (dimension) => ({
  x: randomIntFromRange(dimension)(innerWidth - dimension),
  y: randomIntFromRange(dimension)(innerHeight - dimension),
});

/**
 * Respawns a game object at a random position within screen bounds
 *
 * @param {Phantom} o The game object
 * @returns {void}
 * @example respawn(enemy) ⚡︎
 */
export const respawn = (o) => (
  (o.x = randomIntFromRange(o.dimension)(innerWidth - o.dimension)),
  (o.y = randomIntFromRange(o.dimension)(innerHeight - o.dimension))
);

/**
 * Updates the score
 *
 * @param {Score} score The score object
 * @returns {(amount: number) => void} (amount: number) => void
 * @param {number} amount The amount to update the score by
 * @returns {void} Updates the score
 * @example updateScore(score)(1) ⚡︎
 */
export const updateScore = (score) => (amount) => (
  (score.value += amount), (score.sprite.innerHTML = ~~score.value)
);

/**
 * Bounces a game object off the bounds of the screen using speed
 *
 * @param {Phantom} object The game object
 * @returns {(bounds: Coordinates) => void} (bounds: Coordinates) => void
 * @param {Coordinates} bounds The bounds of the screen
 * @returns {void} Bounces a game object off the bounds of the screen using speed
 * @example bounce(enemy)({x: innerWidth, y: innerHeight}) ⚡︎
 */
export const bounce = (object) => (bounds) =>
  /** bottom */
  distance(object)({ x: object.x, y: bounds.y }) <= object.dimension
    ? (object.speed.y = negation(object.speed.y))
    : /** top */
    distance(object)({ x: object.x, y: bounds.y }) - bounds.y > 0
    ? (object.speed.y = negation(object.speed.y))
    : /** right */
    distance(object)({ x: bounds.x, y: object.y }) <= object.dimension
    ? (object.speed.x = negation(object.speed.x))
    : /** left */
      distance(object)({ x: bounds.x, y: object.y }) - bounds.x > 0 &&
      (object.speed.x = negation(object.speed.x));

/**
 * Draws a game object on the canvas.
 * @param {Canvas} c The canvas
 * @returns {(o: Phantom) => void} (o: Phantom) => void
 * @param {Phantom} o The game object
 * @returns {void} Draws a game object on the canvas
 * @example draw(c)(enemy) ⚡︎
 */
export const draw =
  (c) =>
  ({ sprite, x, y, w, h, dimension }) =>
    c.ctx.drawImage(sprite, x, y, w ?? dimension, h ?? dimension);

/**
 * Creates a game object.
 */
export const Phantom =
  ({ x, y }) =>
  (dimension) =>
  (sprite) =>
  (speed) => ({
    x,
    y,
    sprite,
    dimension,
    speed: { x: speed, y: speed },
  });

/**
 * Runs a gamestate mutation at the current frame of the game and schedules the next frame
 * @param {Canvas} c The canvas
 * @returns {(z: GameState) => (rev: (z: GameState) => void) => void} 
 * (z: GameState) => (rev: (z: GameState) => void) => void
 * @param {GameState} z The game state
 * @returns {(m: (z: GameState) => void) => void} (m: (z: GameState) => void) => void
 * @param {(z: GameState) => void} m The gamestate mutation to run
 * @returns {void} 
 * @example
  Engine(c)(z)(
    (u) => (
      moveWithMouse(u.player)(u.mouse),
      collide(u.player)(u.swoosh)(() => updateScore(u.score)(SCORE_UPDATER)),
      draw(c)(u.player),
      collide(u.swoosh)(u.player)(
        () => (
          respawn(u.swoosh),
          u.sound.swoosh.play(),
          u.enemies.push(
            spawnRandom(Enemy)(SPRITE_DIMENSION)(ENEMY_RANDOM_SPAWN_SPEEDS)
          )
        )
      ),
      draw(c)(u.swoosh),
      u.enemies.map(
        (e) => (
          (u.enemy = e),
          collide(e)(u.player)(
            () => (
              respawn(u.swoosh),
              (u.score.value = 0),
              (u.enemies.length = 0),
              u.sound.death.play()
            )
          ),
          moveWithVelocity(e),
          switchSprite(e)(e.speed.x < 0 ? sprites.enemyL : sprites.enemyR),
          bounce(e)({ x: innerWidth, y: innerHeight }),
          draw(c)(e)
        )
      )
    )
  );
});
 * ⚡︎
 * @see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
 */
export const Engine = (c) => (z) => (m) => (
  requestAnimationFrame(() => Engine(c)(z)(m)),
  c.ctx.clearRect(0, 0, c.width, c.height),
  m(z)
);

/**
 * Injects and configures the game elements into the DOM based on user defined constants
 * @param {GameConfig} config The user defined configuration constants
 * @returns {GameState} The game state
 */
export const config = ({
  SCORE_FONT,
  START_SCREEN_TITLE_FONT,
  START_SCREEN_TEXT_FONT,
  START_TEXT_A,
  START_TEXT_B,
  DISPLAY_SCORE,
  GAME_TITLE,
  START_SCREEN,
  CURSOR,
  SPRITES,
  AUDIOS,
  BG_COLOR_HEX,
  FG_COLOR_HEX,
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
  <h1 id="start-screen-title">${GAME_TITLE}</h1>
  <p id="start-screen-text">${START_TEXT_A}</p>
</div>

<style>
  :root {
    --background-color: ${BG_COLOR_HEX};
    --foreground-color: ${FG_COLOR_HEX};
  }
  
  html { 
    height: 100%; 
  }
  
  body {
    background: transparent; 
    cursor: ${CURSOR ? "default" : "none"}; 
    touch-action: none;
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
    cursor: ${CURSOR ? "default" : "none"}; 
  }


  
  #start-screen { 
    display: ${START_SCREEN ? "flex" : "none"};
    top: 0;
    left: 0; 
    background-color: var(--background-color); 
    color: var(--foreground-color);
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
    font-family: ${START_SCREEN_TITLE_FONT}, monospace; 
    font-size: 40px;
    font-weight: 100;
  }

  #start-screen-text {
    font-family: ${START_SCREEN_TEXT_FONT}, monospace; 
    font-size: 24px;
  }


  #score { 
    position: absolute; 
    font-size: 3rem; 
    white-space: nowrap;
    font-family: ${SCORE_FONT}, monospace; 
    bottom: 50%; 
    mix-blend-mode: difference; 
    left: 50%; 
    transform: translate(-50%, 50%); 
    color: var(--foreground-color); 
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

  const startScreenText = document.getElementById("start-screen-text");

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
      (startScreenText.innerHTML =
        startScreenText.innerHTML === START_TEXT_A
          ? START_TEXT_B
          : START_TEXT_A),
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
    (e) => (
      (mouse.x = e.touches[0].clientX), (mouse.y = e.touches[0].clientY - 120)
    ),
    { passive: false }
  );
  addEventListener(
    "touchstart",
    (e) => ((mouse.x = e.touches[0].clientX), (mouse.y = e.touches[0].clientY)),
    { passive: false }
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

  return { c, mouse, sound, score, sprites };
};
