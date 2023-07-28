/*
 *
 * Phantom Pizza
 *
 * A fun game to play while you wait for your pizza to be delivered.
 *
 * by @sidiousvic
 *
 */
const GAME_TITLE = "SIDIOUS.PIZZA";
const START_TEXT_EN = "PRESS START";
const START_TEXT_JP = "スタート";
const START_ANIMATION_INTERVAL = 2000;
const ENEMY_RANDOM_SPAWN_SPEEDS = [-5, -4, -3 - 2, 2, 3, 4, 5];
const SPRITE_DIMENSION = 50;
const DISPLAY_SCORE = true;
const SCORE_FONT = "Vastantonius";
const SCORE_UPDATER =
  (Math.pow(SPRITE_DIMENSION, 2) / (innerHeight * innerWidth)) * 1000;
const PLAYER_SPRITE_URL = "/assets/player.gif";
const ENEMY_SPRITE_URL = "/assets/enemy.png";
const ENEMY_SPRITE_R_URL = "/assets/enemyR.png";
const SWOOSH_SPRITE_URL = "/assets/swoosh.png";
const SWOOSH_AUDIO_SPRITE_URL = "/assets/swoosh.wav";
const DEATH_AUDIO_SPRITE_URL = "/assets/death.wav";
const ARROW_SPEED = 20;

document.querySelector("main").innerHTML += `
<canvas>
  <img id="player" width="0" height="0" src=${PLAYER_SPRITE_URL} />
  <img id="enemyR" width="0" height="0" src=${ENEMY_SPRITE_R_URL} />
  <img id="enemy" width="0" height="0" src=${ENEMY_SPRITE_URL} />
  <img id="swoosh" width="0" height="0" src=${SWOOSH_SPRITE_URL} />
</canvas>

<p id="score" ${DISPLAY_SCORE ? "visible" : "hidden"}>0</p>

<div id="start-screen">
  <h1>${GAME_TITLE}</h1>
  <p id="press-start">${START_TEXT_EN}</p>
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

requestAnimationFrame(() => {
  const startScreen = document.getElementById("start-screen");
  const pressStart = document.getElementById("press-start");
  const canvasElement = document.querySelector("canvas");
  const scoreSprite = document.getElementById("score");
  const playerSprites = {
    R: document.getElementById("player"),
    L: document.getElementById("player"),
  };
  const swooshSprites = {
    R: document.getElementById("swoosh"),
    L: document.getElementById("swoosh"),
  };
  const enemySprites = {
    R: document.getElementById("enemyR"),
    L: document.getElementById("enemy"),
  };
  const soundSprite = document.getElementById("sound");

  /**
   * @function compose
   * @returns function a composition of functions
   * @example
   * const addOne = (n) => n + 1;
   * const double = (n) => n * 2;
   * const addOneThenDouble = compose(double)(addOne);
   */
  const compose =
    (...fns) =>
    (x) =>
      fns.reduceRight((v, f) => f(v), x);

  /**
   * @function exec
   * @returns function execute a sequence of functions
   */
  const exec = (fn) => () => fn();

  /**
   * @function debug
   * @alias console.log
   */
  const debug = console.log;

  /**
   * @function distance
   * @returns distance in pixels between two points
   * @example distance({x: 1, y: 1})({x: 2, y: 2}) // 1.4142135623730951
   * @math 𝑑 = √( ( 𝑥2 - 𝑥1 )² + ( 𝑦2 - 𝑦1 )² )
   */
  const distance =
    ({ x, y }) =>
    ({ x: w, y: z }) =>
      Math.sqrt(Math.pow(w - x, 2) + Math.pow(z - y, 2));

  /**
   * @function randomIntFromRange
   * @returns number random integer between min and max
   * @example randomIntFromRange(1)(10) // 3
   */
  const randomIntFromRange = (min) => (max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  /**
   * @function randomElement
   * @returns T random element from a list
   * @example randomElement([1, 2, 3]) // 2
   */
  const randomElement = (list) => list[Math.floor(Math.random() * list.length)];

  /**
   * @function negation
   * @returns number negation of a number
   * @example negation(1) // -1
   */
  const negation = (n) => -n;

  /**
   * @function avg
   * @returns number average of two numbers
   * @example avg(1)(2) // 1.5
   */
  const avg = (x) => (y) => x + y / 2;

  /**
   * @function divideByTwo
   * @returns number half of a number
   * @example divideByTwo(2) // 1
   */
  const divideByTwo = (n) => n / 2;

  /**
   * @function hitbox
   * @returns number half of a game object's dimension
   * @example hitbox(player) // 25
   */
  const hitbox = (o) => divideByTwo(o.dimension);

  /**
   * @function colliding
   * @returns boolean true if game objects a and b collide
   * @example colliding(player)(swoosh) // true
   */
  const colliding = (a) => (b) => distance(a)(b) <= hitbox(a) + hitbox(b);

  /**
   * @function $collide
   * @$ideffect
   * fires function f when game objects a and b collide
   * @example collide(player)(swoosh)(() => calculateScore(score)(enemy));
   */
  const $collide = (a) => (b) => (f) => colliding(a)(b) && void f();

  /**
   * @function $move
   * @$ideffect
   * moves game object o
   * @example move(enemy)
   */
  const $moveWithVelocity = (o) => ((o.x += o.speed.x), (o.y += o.speed.y));

  /**
   * @function $moveWithMouse
   * @$ideffect
   * moves game object o with mouse
   * @example moveWithMouse(player)(mouse)
   */
  const $moveWithMouse = (o) => (m) => ((o.x = m.x), (o.y = m.y));

  /**
   * @function $switchSprite
   * @$ideffect
   * switches game object o sprite (left and right) based on condition
   * @example switchSprite(player)(z.mouse.x < player.x);
   */
  const $switchSprite = (o) => (sprites) => (condition) =>
    condition ? (o.sprite = sprites.L) : (o.sprite = sprites.R);

  /**
   * @function spawnRandomEnemy
   * retunrs a game object with a random spawn position and speed within screen bounds
   * @example spawnRandom(Enemy)
   */
  const spawnRandomEnemy = () =>
    Enemy(randomIntFromRange(SPRITE_DIMENSION)(innerWidth - SPRITE_DIMENSION))(
      randomIntFromRange(SPRITE_DIMENSION)(innerHeight - SPRITE_DIMENSION)
    )(SPRITE_DIMENSION)(randomElement(ENEMY_RANDOM_SPAWN_SPEEDS));

  /**
   * @function respawn
   * @$ideffect
   * respawns game object o within screen bounds
   * @example respawn(coin)
   */
  const $respawn = (o) => (
    (o.x = randomIntFromRange(SPRITE_DIMENSION)(innerWidth - SPRITE_DIMENSION)),
    (o.y = randomIntFromRange(SPRITE_DIMENSION)(innerHeight - SPRITE_DIMENSION))
  );

  /**
   * @function
   * @$ideffect
   * sets game object score value based on screen dimensions
   * @example scoreBasedOnScreenDimensions(score)(enemy)
   */
  const $updateScore = (score) => (
    (score.value += SCORE_UPDATER), (score.sprite.innerHTML = ~~score.value)
  );

  /**
   * @function resetScore
   * @$ideffect
   * resets game object score value to 0
   * @example resetScore(score)
   */
  const $resetScore = (score) => (score.value = 0);

  /**
   * @function bounce
   * @$ideffect
   * bounces game object o within window bounds
   * @example bounce(enemy)({ x: 500, y: 800 }})
   */
  const $bounce = (object) => (bounds) =>
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
  const draw =
    (c) =>
    ({ sprite, x, y, dimension }) =>
      c.ctx.drawImage(sprite, x, y, dimension, dimension);

  const Controlled = (x) => (y) => (dimension) => (sprite) => ({
    x,
    y,
    sprite,
    dimension,
  });

  const Player = (x) => (y) => (dimension) => (sprite) =>
    Controlled(x)(y)(dimension)(sprite);

  const Swoosh = (x) => (y) => (dimension) => (sprite) =>
    Controlled(x)(y)(dimension)(sprite);

  /**
   * Automatic
   * An object with L and R sprites (for turning) and a speed at which it can move independently.
   */
  const Automatic = (x) => (y) => (dimension) => (sprite) => (speed) => ({
    x,
    y,
    sprite,
    dimension,
    speed: { x: speed, y: speed },
  });

  const Enemy = (x) => (y) => (dimension) => (speed) =>
    Automatic(x)(y)(dimension)(enemySprites.R)(speed);

  const Score = (value) => (sprite) => ({ value, sprite });

  const Mouse = (c) => ({ x: c.width / 2, y: c.height / 2 });

  const Engine = (z) => (
    requestAnimationFrame(() => Engine(z)),
    z.c.ctx.clearRect(0, 0, z.c.width, z.c.height),
    $moveWithMouse(z.player)(z.mouse),
    $collide(z.player)(z.swoosh)(() => $updateScore(z.score)),
    draw(z.c)(z.player),
    $collide(z.swoosh)(z.player)(
      () => (
        $respawn(z.swoosh),
        z.sound.swoosh.play(),
        z.enemies.push(spawnRandomEnemy())
      )
    ),
    draw(z.c)(z.swoosh),
    z.enemies.map(
      (e) => (
        (z.enemy = e),
        $collide(e)(z.player)(
          () => (
            $respawn(z.swoosh),
            $resetScore(z.score),
            (z.enemies.length = 0),
            z.sound.death.play()
          )
        ),
        $moveWithVelocity(e),
        $switchSprite(e)(enemySprites)(e.speed.x < 0),
        $bounce(e)({ x: innerWidth, y: innerHeight }),
        draw(z.c)(e)
      )
    )
  );

  const Canvas = (c) => (w) => (h) => (
    (c.ctx = c.getContext("2d")), (c.width = w), (c.height = h), c
  );

  const launch = ({ Canvas, Mouse, Score, Player, Swoosh, Enemy }) => {
    const c = Canvas(canvasElement)(innerWidth)(innerHeight);
    const mouse = Mouse(c);
    const score = Score(0)(scoreSprite);
    const player = Player(mouse.x)(mouse.y)(SPRITE_DIMENSION)(playerSprites.R);
    const swoosh = Swoosh(
      randomIntFromRange(SPRITE_DIMENSION)(innerWidth - SPRITE_DIMENSION)
    )(randomIntFromRange(SPRITE_DIMENSION)(innerHeight - SPRITE_DIMENSION))(
      SPRITE_DIMENSION
    )(swooshSprites.R);
    let enemies = [spawnRandomEnemy(Enemy)];
    const audios = {
      swoosh: new Audio(SWOOSH_AUDIO_SPRITE_URL),
      death: new Audio(DEATH_AUDIO_SPRITE_URL),
    };
    audios.swoosh.volume = 0.07;
    audios.death.volume = 0.5;
    const sound = { ...audios, soundSprite };

    setInterval(
      () =>
        (pressStart.innerText =
          pressStart.innerText === START_TEXT_EN
            ? START_TEXT_JP
            : START_TEXT_EN),
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
    addEventListener(
      "keydown",
      (e) => e.key === "Enter" && startScreen.remove()
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
    addEventListener("click", () => startScreen.remove());
    addEventListener("touchstart", () => startScreen.remove());

    /**@gamestate */
    return { c, player, swoosh, enemies, score, sound, mouse };
  };

  const z = launch({ Canvas, Mouse, Score, Player, Swoosh, Enemy });

  Engine(z);
});
