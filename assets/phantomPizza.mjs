/*
 *
 * Phantom Pizza
 *
 * A fun game to play while you wait for your pizza to be delivered.
 *
 * by @sidiousvic
 *
 */

/*
 * Config
 */
const GAME_TITLE = "SIDIOUS.PIZZA";
const START_TEXT_EN = "PRESS START";
const START_TEXT_JP = "スタート";
const START_ANIMATION_INTERVAL = 2000;
const ENEMY_RANDOM_SPAWN_SPEEDS = [-5, -4, -3 - 2, 2, 3, 4, 5];
const SPRITE_DIMENSION = 50;
const DISPLAY_SCORE = false;
const SCORE_FONT = "Vastantonius";
/**
 * @constant
 * @type {number}
 * enemyArea / windowArea * 1000
 * The larger the window, the less points awarded
 */
const SCORE_UPDATER =
  (Math.pow(SPRITE_DIMENSION, 2) / (innerHeight * innerWidth)) * 1000;
const PLAYER_SPRITE_URL = "/assets/player.gif";
const ENEMY_SPRITE_URL = "/assets/enemy.png";
const ENEMY_SPRITE_R_URL = "/assets/enemyR.png";
const SWOOSH_SPRITE_URL = "/assets/swoosh.png";
const SWOOSH_AUDIO_SPRITE_URL = "/assets/swoosh.wav";
const DEATH_AUDIO_SPRITE_URL = "/assets/death.wav";
const ARROW_SPEED = 20;

/*
 *
 * HTML + CSS
 *
 */
document.querySelector("main").innerHTML += `
<canvas><img id="player" width="0" height="0" src=${PLAYER_SPRITE_URL} />
<img id="enemyR" width="0" height="0" src=${ENEMY_SPRITE_R_URL} />
<img id="enemy" width="0" height="0" src=${ENEMY_SPRITE_URL} />
<img id="swoosh" width="0" height="0" src=${SWOOSH_SPRITE_URL} />
</canvas>
<p id="score" ${DISPLAY_SCORE ? "visible" : "hidden"}>0</p>
<div id="start-screen"><h1>${GAME_TITLE}</h1><p id="press-start">${START_TEXT_EN}</p></div>
<style>
:root {--score-font-color: #00ff2a; }
html { height: 100%; }
body { background: transparent; cursor: none; }
nav { mix-blend-mode: difference; }
a { cursor: pointer; }
p { margin: 0; line-height: 30px; }
canvas { z-index: -1; position: absolute; top: 0; left: 0; cursor: none; }
#start-screen { top: 0;left: 0; background-color: var(--darkgray); display: flex; flex-direction: column; text-align: center; align-items: center; justify-content: center; position: absolute; height: 100vh; width: 100vw; z-index: 2; font-size: 30px; }
#score {position: absolute; font-size: 3rem; font-family: ${SCORE_FONT}, monospace; bottom: 50%; mix-blend-mode: difference; left: 50%; transform: translate(-50%, 50%); color: var(--score-font-color); }
img { mix-blend-mode: exclusion;image-rendering: pixelated; }
</style>`;

requestAnimationFrame(() => {
  /*
   *
   * DOM elements
   *
   */

  const startScreen = document.getElementById("start-screen");
  const pressStart = document.getElementById("press-start");
  const canvasElement = document.querySelector("canvas");
  const scoreSprite = document.getElementById("score");
  const playerSprite = document.getElementById("player");
  const swooshSprite = document.getElementById("swoosh");
  const enemySprites = {
    R: document.getElementById("enemyR"),
    L: document.getElementById("enemy"),
  };
  const soundSprite = document.getElementById("sound");
  /*
   *
   * Utilities
   *
   */

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
   * Side effects
   */

  /**
   * @function $collide
   * @$ideffect
   * fires function f when game objects a and b collide
   * @example collide(player)(swoosh)(() => calculateScore(score)(enemy));
   */
  const $collide = (a) => (b) => (f) => colliding(a)(b) && f();

  /**
   * @function $move
   * @$ideffect
   * moves game object o
   * @example move(enemy)
   */
  const $moveWithVelocity = (o) => (
    (o.x += o.velocity.x), (o.y += o.velocity.y)
  );

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
  const $switchSprite = (o) => (condition) =>
    condition ? (o.sprite = o.sprites.L) : (o.sprite = o.sprites.R);

  /**
   * @function spawnRandomEnemy
   * retunrs a game object with a random spawn position and speed within screen bounds
   * @example spawnRandom(Enemy)
   */
  const spawnRandomEnemy = () =>
    Enemy(randomIntFromRange(SPRITE_DIMENSION)(innerWidth - SPRITE_DIMENSION))(
      randomIntFromRange(SPRITE_DIMENSION)(innerHeight - SPRITE_DIMENSION)
    )(SPRITE_DIMENSION)(enemySprites)(randomElement(ENEMY_RANDOM_SPAWN_SPEEDS));

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
   * @function draw
   * @$ideffect
   * draws game object o on canvas
   * @example draw(c)(player)
   */
  const draw =
    (c) =>
    ({ sprite, x, y, dimension }) =>
      c.ctx.drawImage(sprite, x, y, dimension, dimension);

  /*
   *
   * game objects
   *
   */

  const Player = (x) => (y) => (dimension) => (sprite) => ({
    x,
    y,
    sprite,
    dimension,
    update({ player, swoosh, score, mouse, c }) {
      $moveWithMouse(player)(mouse);
      $collide(player)(swoosh)(() => {
        $updateScore(score);
      });
      draw(c)(player);
    },
  });

  const Swoosh = (x) => (y) => (dimension) => (sprite) => ({
    x,
    y,
    sprite,
    dimension,
    update({ swoosh, player, sound, enemies, c }) {
      $collide(swoosh)(player)(() => {
        $respawn(swoosh);
        sound.swoosh.play();
        enemies.push(spawnRandomEnemy());
      });
      draw(c)(swoosh);
    },
  });

  const Enemy = (x) => (y) => (dimension) => (sprites) => (speed) => ({
    x,
    y,
    sprites,
    dimension,
    velocity: { x: speed, y: speed },
    update({ enemy, player, sound, swoosh, score, c, enemies }) {
      $collide(enemy)(player)(
        () => (
          $respawn(swoosh),
          $resetScore(score),
          (enemies.length = 0),
          sound.death.play()
        )
      );
      $moveWithVelocity(enemy);
      $switchSprite(enemy)(enemy.velocity.x < 0);

      /**@mechanic bounce enemy off walls */
      {
        const enemyDistanceFromBottom = distance(enemy)({
          x: enemy.x,
          y: innerHeight,
        });
        const enemyDistanceFromTop = enemyDistanceFromBottom - innerHeight;
        const enemyDistanceFromRight = distance(enemy)({
          x: innerWidth,
          y: enemy.y,
        });
        const enemyDistanceFromLeft = enemyDistanceFromRight - innerWidth;

        if (enemyDistanceFromBottom <= enemy.dimension)
          enemy.velocity.y = negation(enemy.velocity.y);

        if (enemyDistanceFromTop > 0)
          enemy.velocity.y = negation(enemy.velocity.y);

        if (enemyDistanceFromLeft > 0)
          enemy.velocity.x = negation(enemy.velocity.x);

        if (enemyDistanceFromRight <= enemy.dimension)
          enemy.velocity.x = negation(enemy.velocity.x);
      }

      draw(c)(enemy);
    },
  });

  const Score = (value) => (sprite) => ({ value, sprite });

  const Mouse = (c) => ({ x: c.width / 2, y: c.height / 2 });

  /*
   *
   * engine
   *
   */
  const Engine = (z) => {
    requestAnimationFrame(() => Engine(z));
    z.c.ctx.clearRect(0, 0, z.c.width, z.c.height);
    z.player.update(z);
    z.swoosh.update(z);
    z.enemies.map((e) => ((z.enemy = e), e.update(z)));
  };

  const Canvas = (c) => (w) => (h) => (
    (c.ctx = c.getContext("2d")), (c.width = w), (c.height = h), c
  );

  const launch = ({ Canvas, Mouse, Score, Player, Swoosh, Enemy }) => {
    const c = Canvas(canvasElement)(innerWidth)(innerHeight);
    const mouse = Mouse(c);
    const score = Score(0)(scoreSprite);
    const player = Player(mouse.x)(mouse.y)(SPRITE_DIMENSION)(playerSprite);
    const swoosh = Swoosh(
      randomIntFromRange(SPRITE_DIMENSION)(innerWidth - SPRITE_DIMENSION)
    )(randomIntFromRange(SPRITE_DIMENSION)(innerHeight - SPRITE_DIMENSION))(
      SPRITE_DIMENSION
    )(swooshSprite);
    let enemies = [spawnRandomEnemy(Enemy)];
    const audios = {
      swoosh: new Audio(SWOOSH_AUDIO_SPRITE_URL),
      death: new Audio(DEATH_AUDIO_SPRITE_URL),
    };
    audios.swoosh.volume = 0.07;
    audios.death.volume = 0.5;
    const sound = { ...audios, soundSprite };

    /*
     * @screenAnimation
     */
    setInterval(
      () =>
        (pressStart.innerText =
          pressStart.innerText === START_TEXT_EN
            ? START_TEXT_JP
            : START_TEXT_EN),
      START_ANIMATION_INTERVAL
    );

    /**@events */
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

  const z = launch({
    Canvas,
    Mouse,
    Score,
    Player,
    Swoosh,
    Enemy,
  });

  Engine(z);
});