/*
 * Phantom
 *
 * A wicked HTML 2D Canvas game engine
 *
 * by @sidiousvic
 */
const START_ANIMATION_INTERVAL = 2000;
const ARROW_SPEED = 60;

export type Coordinates = {
  x: number;
  y: number;
};

export type Sprites = {
  [key: string]: HTMLImageElement | HTMLElement | null;
};

/**
 * The state of the game
 */
export type projectstate<Phantoms> = {
  // sprites: { [key: string]: HTMLImageElement };
  sound: { [key: string]: HTMLAudioElement };
  score: Score;
  mouse: Coordinates;
  // c: HTMLCanvasElement;
  phantoms: Phantoms;
};

/**
 * The user defined configuration constants
 */
export type GameConfig = {
  scoreFont: string;
  startScreenTitleFont: string;
  startScreenTextFont: string;
  startTextA: string;
  startTextB: string;
  startScreen: boolean;
  displayScore: boolean;
  gameTitle: string;
  sprites: string[];
  audios: { url: string; volume: number }[];
  cursor?: boolean;
  bgColorHex: string;
  fgColorHex: string;
  filter: string;
};

/**
 * A game object.
 */
export type Phantom = {
  x: number;
  y: number;
  dimension: number;
  sprite: HTMLImageElement | HTMLElement | null;
  speed: Coordinates;
};

/**
 * A numeric value to display visually
 */
export type Score = {
  value: number;
  sprite: HTMLImageElement | HTMLElement | null;
};

/**
 * A function that executes a side effect, updates the state of the game
 */
export type Mutation = (x?: unknown) => void;

/**
 * A function that executes a mutation
 */
export type Mutator = (m: Mutation) => void;

/**
 * Calculates the distance (in pixels) between two game objects (Phantoms).
 *
 * @description 𝑑 = √( ( 𝑥2 - 𝑥1 )² + ( 𝑦2 - 𝑦1 )² )
 * @example distance({x: 1, y: 1})({x: 2, y: 2}) ⚡︎1.414...
 */
export const distance = (a: Coordinates) => (b: Coordinates) =>
  Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

/**
 * Picks a random integer from a range.
 * @example randomIntFromRange(1)(10) ⚡︎9
 */
export const randomIntFromRange = (min: number) => (max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Picks a random element from a list.
 *
 * @example randomElement([1, 2, 3, 4, 5]) ⚡︎3
 */
export const randomElement = <T>(list: T[]) =>
  list[Math.floor(Math.random() * list.length)];

/**
 * Negates a number.
 *
 * @example negation(1) ⚡︎-1
 */
export const negation = (n: number) => -n;

/**
 * Averages two numbers.
 *
 * @example avg(1)(2) ⚡︎1.5
 */
export const avg = (n: number) => (m: number) => n + m / 2;

/**
 * Divides a number by two.
 *
 * @example divideByTwo(50) ⚡︎25
 */
export const divideByTwo = (n: number) => n / 2;

/**
 * Provides the hitbox, which is the radius (half-diagonal) of a game object.
 *
 * @example hitbox(50) ⚡︎25
 */
export const hitbox = (o: Phantom) => divideByTwo(o.dimension);

/**
 * Verifies that two game objects are colliding.
 *
 * @example colliding({x: 1, y: 1})({x: 2, y: 2}) ⚡︎false
 */
export const colliding = (a: Phantom) => (b: Phantom) =>
  distance(a)(b) <= hitbox(a) + hitbox(b);

/**
 * Executes a mutation if two game objects are colliding
 *
 * @example collide(player)(enemy)(() => sound.death.play()) ⚡︎
 */
export const collide = (a: Phantom) => (b: Phantom) => (f: Mutation) =>
  colliding(a)(b) && void f();

/**
 * Moves the game object according to their velocity
 *
 * @example moveWithVelocity(enemy) ⚡︎
 */
export const moveWithVelocity = (o: Phantom) => (
  (o.x += o.speed.x), (o.y += o.speed.y)
);

/**
 * Moves a game object according to the mouse position
 *
 * @example moveWithMouse(player)(mouse) ⚡︎
 */
export const moveWithMouse = (o: Phantom) => (m: Coordinates) => (
  (o.x = m.x), (o.y = m.y)
);

/**
 * Switches the sprite of a game object
 *
 * @example switchSprite(enemy)(enemy.speed.x < 0 ? spriteR : spriteL) ⚡︎
 */
export const switchSprite =
  (o: Phantom) => (sprite: HTMLImageElement | HTMLElement | null) =>
    (o.sprite = sprite);

/**
 * Returns a random spawn position for a game object within screen bounds
 *
 * @example randomSpawn(50) ⚡︎{x: 100, y: 100}
 */
export const randomSpawn = (dimension: number) => ({
  x: randomIntFromRange(dimension)(innerWidth - dimension),
  y: randomIntFromRange(dimension)(innerHeight - dimension),
});

/**
 * Respawns a game object at a random position within screen bounds
 *
 * @example respawn(enemy) ⚡︎
 */
export const respawn = (o: Phantom) => (
  (o.x = randomIntFromRange(o.dimension)(innerWidth - o.dimension)),
  (o.y = randomIntFromRange(o.dimension)(innerHeight - o.dimension))
);

/**
 * Updates the score
 *
 * @example updateScore(score)(1) ⚡︎
 */
export const updateScore = (score: Score) => (amount: number) => (
  (score.value += amount), (score.sprite!.innerHTML = String(~~score.value))
);

/**
 * Bounces a game object off the bounds of the screen using speed
 *
 * @example bounce(enemy)({x: innerWidth, y: innerHeight}) ⚡︎
 */
export const bounce = (object: Phantom) => (bounds: Coordinates) =>
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
 *
 * @example draw(c)(enemy) ⚡︎
 */
export const draw =
  (c: HTMLCanvasElement | null) =>
  ({ sprite, x, y, dimension }: Phantom) =>
    c
      ?.getContext("2d")
      ?.drawImage(sprite as CanvasImageSource, x, y, dimension, dimension);

/**
 * Creates a game object.
 */
export const Phantom =
  ({ x, y }) =>
  (dimension: number) =>
  (sprite: HTMLElement | HTMLElement | null) =>
  (speed: number) => ({
    x,
    y,
    sprite,
    dimension,
    speed: { x: speed, y: speed },
  });

/**
 * Runs a projectstate mutation at the current frame of the game and schedules the next frame
 */
export const Engine =
  <Phantoms>(c: HTMLCanvasElement | null) =>
  (z: projectstate<Phantoms>) =>
  (m: (z: projectstate<Phantoms>) => void) => (
    requestAnimationFrame(() => Engine(c)(z)(m as Mutation)),
    c?.getContext("2d")?.clearRect(0, 0, c.width, c.height),
    m(z)
  );

/**
 * Injects and configures the game elements into the DOM based on user defined constants
 */
export const config = ({
  scoreFont,
  startScreenTextFont,
  startScreenTitleFont,
  startTextA,
  startTextB,
  displayScore,
  gameTitle,
  sprites,
  filter,
  audios,
  startScreen,
  bgColorHex,
  fgColorHex,
}: GameConfig) => {
  document.body.innerHTML += `
<canvas>
  ${sprites.map(
    (sprite) =>
      `<img alt="an in-game sprite" id="${
        sprite.split("/").pop()!.split(".")[0]
      }" width="0" height="0" src=${sprite} />`
  )}
</canvas>

<p id="score" ${displayScore ? "visible" : "hidden"}>0</p>

<div id="start-screen">
  <h1 id="start-screen-title">${gameTitle}</h1>
  <p id="start-screen-text">${startTextA}</p>
</div>

<style>
  :root {
    --phantom-background-color: ${bgColorHex};
    --phantom-foreground-color: ${fgColorHex};
  }
  
  html { 
    height: 100%; 
  }
  
  body {
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
    display: ${startScreen ? "flex" : "none"};
    top: 0;
    left: 0; 
    background-color: var(--phantom-background-color); 
    color: var(--phantom-foreground-color);
    filter: ${filter};
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
    font-family: ${startScreenTitleFont}, monospace; 
    font-size: 40px;
    font-weight: 100;
    filter: ${filter};w
  }

  @media (max-width: 700px) {
    #start-screen-title {
      font-size: 30px;
    }
  }

  #start-screen-text {
    font-family: ${startScreenTextFont}, monospace; 
    font-size: 20px;
  }


  #score { 
    position: absolute; 
    font-size: 3rem; 
    font-family: ${scoreFont}; 
    bottom: 50%; 
    left: 50%; 
    mix-blend-mode: difference;
    transform: translate(-50%, 50%); 
    color: var(--phantom-foreground-color); 
    width: 100%;
    text-align: center;
  }
  
  img { 
    mix-blend-mode: exclusion;
    image-rendering: pixelated; 
  }
</style>
`;

  const _sprites = sprites.reduce<Sprites>(
    (acc, sprite) => ({
      ...acc,
      [sprite.split("/").pop()!.split(".")[0]]: document.getElementById(
        sprite.split("/").pop()!.split(".")[0]
      ),
    }),
    { score: document.getElementById("score") }
  );

  const _startScreen = document.getElementById("start-screen");

  const startScreenText = document.getElementById("start-screen-text");

  const c = document.querySelector("canvas");

  c!.width = innerWidth;
  c!.height = innerHeight;

  const mouse = { x: c!.width / 2, y: c!.height / 2 };

  const score = { value: 0, sprite: _sprites.score };

  const sound = audios.reduce((acc, audio) => {
    const a = new Audio(audio.url);
    a.volume = audio.volume;
    return { ...acc, [audio.url.split("/").pop()!.split(".")[0]]: a };
  }, {});

  setInterval(
    () =>
      (startScreenText!.innerHTML =
        startScreenText!.innerHTML === startTextA ? startTextB : startTextA),
    START_ANIMATION_INTERVAL
  );

  addEventListener(
    "resize",
    () => ((c!.width = innerWidth), (c!.height = innerHeight))
  );
  addEventListener(
    "mousemove",
    ({ clientX, clientY }) => ((mouse.x = clientX), (mouse.y = clientY))
  );
  addEventListener(
    "touchmove",
    (e) => (
      (mouse.x = e.touches[0].clientX - 17),
      (mouse.y = e.touches[0].clientY - 90)
    ),
    { passive: false }
  );
  addEventListener(
    "touchstart",
    (e) => ((mouse.x = e.touches[0].clientX), (mouse.y = e.touches[0].clientY)),
    { passive: false }
  );
  addEventListener(
    "keydown",
    (e) => e.key === "Enter" && _startScreen!.remove()
  );
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
  addEventListener("click", () => _startScreen!.remove());
  addEventListener("touchstart", () => _startScreen!.remove());

  return { c, mouse, sound, score, sprites: _sprites };
};
