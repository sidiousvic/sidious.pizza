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
 * Constants
 */
const START_TEXT_EN = "PRESS START";
const START_TEXT_JP = "スタート";
const START_ANIMATION_INTERVAL = 2000;

/*
 *
 * HTML + CSS
 *
 */
document.querySelector(
  "main"
).innerHTML += `<canvas><img id="player" width="0" height="0" src="/assets/player.gif" /><img id="enemyR" width="0" height="0" src="/assets/enemyR.png" /><img id="enemy" width="0" height="0" src="/assets/enemy.png" /><img id="swoosh" width="0" height="0" src="/assets/swoosh.png" /></canvas><p id="score" hidden>0</p><div id="start-screen"><h1>SIDIOUS.PIZZA</h1><p id="press-start">PRESS START</p></div><style>html {height: 100%;}body {background: transparent;cursor: none;}nav {mix-blend-mode: difference;}a {cursor: pointer;}p {margin: 0;line-height: 30px;}canvas {z-index: -1;position: absolute;top: 0;left: 0;cursor: none;}#start-screen {top: 0;left: 0;background-color: var(--darkgray);display: flex;flex-direction: column;text-align: center;align-items: center;justify-content: center;position: absolute;height: 100vh;width: 100vw;z-index: 2;font-size: 30px;}#score {position: absolute;font-family: var(--font-family-delight);bottom: 10;left: 10;color: var(--venom);}:root {--bg: rgb(28, 31, 7);--fg: rgb(0, 179, 116);}img {mix-blend-mode: exclusion;image-rendering: pixelated;}</style>`;

// Wait for next frame to make sure HTML and CSS have rendered.
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
   * Start screen animation
   *
   */

  setInterval(
    () =>
      (pressStart.innerText =
        pressStart.innerText === START_TEXT_EN ? START_TEXT_JP : START_TEXT_EN),
    START_ANIMATION_INTERVAL
  );

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
   * @example collide(player)(swoosh)(() => score.up(z));
   */
  const $collide = (a) => (b) => (f) => colliding(a)(b) && f();

  /**
   * @function $move
   * @$ideffect
   * moves game object o
   * @example move(enemy)
   */
  const $move = (o) => ((o.x += o.velocity.x), (o.y += o.velocity.y));

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
   * @function spawnRandom
   * retunrs a game object with a random spawn position within screen bounds
   * @example spawnRandom(Enemy)
   */
  const spawnRandom = (O) =>
    O(randomIntFromRange(50)(innerWidth - 50))(
      randomIntFromRange(50)(innerHeight - 50)
    )(50)(enemySprites)(randomIntFromRange(-5)(-4) || 5);

  /**
   * @function respawn
   * @$ideffect
   * respawns game object o within screen bounds
   * @example respawn(coin)
   */
  const $respawn = (o) => (
    (o.x = randomIntFromRange(50)(innerWidth - 50)),
    (o.y = randomIntFromRange(50)(innerHeight - 50))
  );

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
    draw({ player, swoosh, score, mouse, c }) {
      $moveWithMouse(player)(mouse);
      $collide(player)(swoosh)(() => score.up(z));
      c.draw(player);
    },
  });

  const Coin = (x) => (y) => (dimension) => (sprite) => ({
    x,
    y,
    sprite,
    dimension,
    draw({ swoosh, player, sound, enemies, c }) {
      $collide(swoosh)(player)(() => {
        $respawn(swoosh);
        sound.swoosh.play();
        enemies.push(spawnRandom(Enemy));
      });
      c.draw(swoosh);
    },
  });

  const Enemy = (x) => (y) => (dimension) => (sprites) => (speed) => ({
    x,
    y,
    sprites,
    dimension,
    velocity: { x: speed, y: speed },
    draw({ enemy, player, sound, swoosh, c, enemies }) {
      $collide(enemy)(player)(() => {
        $respawn(swoosh);
        enemies.length = 0;
        sound.death.play();
      });
      $move(enemy);
      $switchSprite(z.enemy)(z.enemy.velocity.x < 0);

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

      c.draw(enemy);
    },
  });

  const Score = (value) => (sprite) => ({
    value,
    sprite,
    up({ score, enemy }) {
      const enemyArea = Math.pow(enemy.dimension, 2),
        windowArea = innerHeight * innerWidth,
        enemyPercentage = enemyArea / windowArea;
      score.value += enemyPercentage * 1000;
      score.sprite.innerHTML = ~~score.value;
    },
    reset({ score }) {
      score.value = 0;
    },
  });

  const Sound =
    ({ ...audios }) =>
    (sprite) => ({ ...audios, sprite });

  const Mouse = (c) => ({
    x: c.width / 2,
    y: c.width / 2,
  });

  /*
   *
   * engine
   *
   */
  const Engine = (z) => {
    const { player, swoosh, enemies, c } = z;

    requestAnimationFrame(() => Engine(z));
    c.ctx.clearRect(0, 0, c.width, c.height);

    player.draw(z);
    swoosh.draw(z);
    enemies.map((enemy) => ((z.enemy = enemy), enemy.draw(z)));
  };

  const canvas = (c) => (w) => (h) => {
    c.ctx = c.getContext("2d");
    c.draw = ({ sprite, x, y, dimension }) =>
      c.ctx.drawImage(sprite, x, y, dimension, dimension);
    c.width = w;
    c.height = h;
    return c;
  };

  const launch = ({ canvas, Mouse, Score, Player, Coin, Enemy, Sound }) => {
    const c = canvas(canvasElement)(innerWidth)(innerHeight);
    const mouse = Mouse(c);
    const score = Score(0)(scoreSprite);
    const player = Player(mouse.x)(mouse.y)(50)(playerSprite);
    const randomCoinX = randomIntFromRange(50)(innerWidth - 50);
    const randomCoinY = randomIntFromRange(50)(innerHeight - 50);
    const swoosh = Coin(randomCoinX)(randomCoinY)(50)(swooshSprite);
    let enemies = [spawnRandom(Enemy)];

    const audios = {
      swoosh: new Audio("/assets/swoosh.wav"),
      death: new Audio("/assets/death.wav"),
    };
    audios.swoosh.volume = 0.07;
    audios.death.volume = 1;
    const sound = Sound(audios)(soundSprite);

    /**@gamestate */
    const z = {
      c,
      player,
      swoosh,
      enemies,
      score,
      sound,
      mouse,
    };

    /**@sideffects */
    addEventListener("resize", ({ target: { innerWidth, innerHeight } }) => {
      (c.width = innerWidth), (c.height = innerHeight);
    });

    addEventListener("mousemove", ({ clientX, clientY }) => {
      mouse.x = clientX;
      mouse.y = clientY;
    });

    addEventListener("touchmove", ({ touches }) => {
      mouse.x = touches[0].clientX;
      mouse.y = touches[0].clientY - 120;
    });

    addEventListener("touchstart", ({ touches }) => {
      mouse.x = touches[0].clientX;
      mouse.y = touches[0].clientY;
    });

    addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        startScreen.remove();
      }
    });

    addEventListener("click", () => {
      startScreen.remove();
    });

    addEventListener("touchstart", () => {
      startScreen.remove();
    });

    return z;
  };

  const z = launch({
    canvas,
    Mouse,
    Score,
    Player,
    Coin,
    Enemy,
    Sound,
  });

  Engine(z);
});
