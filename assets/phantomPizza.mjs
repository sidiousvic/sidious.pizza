/*
 *
 * Phantom Pizza
 * by @sidiousvic
 *
 */

/*
 *
 * HTML
 *
 */
document.querySelector(
  "main"
).innerHTML += `<canvas><img id="player" width="0" height="0" src="/assets/player.gif" /><img id="enemyR" width="0" height="0" src="/assets/enemyR.png" /><img id="enemy" width="0" height="0" src="/assets/enemy.png" /><img id="swoosh" width="0" height="0" src="/assets/swoosh.png" /></canvas><p id="score" hidden>0</p><div id="start-screen"><h1>SIDIOUS.PIZZA</h1><p id="press-start">PRESS START</p></div><style>html {height: 100%;}body {background: transparent;cursor: none;}nav {mix-blend-mode: difference;}a {cursor: pointer;}p {margin: 0;line-height: 30px;}canvas {z-index: -1;position: absolute;top: 0;left: 0;cursor: none;}#start-screen {top: 0;left: 0;background-color: var(--darkgray);display: flex;flex-direction: column;text-align: center;align-items: center;justify-content: center;position: absolute;height: 100vh;width: 100vw;z-index: 2;font-size: 30px;}#score {position: absolute;font-family: var(--font-family-delight);bottom: 10;left: 10;color: var(--venom);}:root {--bg: rgb(28, 31, 7);--fg: rgb(0, 179, 116);}img {mix-blend-mode: exclusion;image-rendering: pixelated;}</style>`;

requestAnimationFrame(() => {
  /*
   *
   * HTML elements
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
   * Start screen
   *
   */

  setInterval(() => {
    if (pressStart.innerText === "PRESS START")
      pressStart.innerHTML = "スタート";
    else pressStart.innerHTML = "PRESS START";
  }, 2000);

  /*
   *
   * utilities
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
   * @returns distance between two points
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
   * @function collide
   * fires function f when game objects a and b collide
   * @example collide(player)(swoosh)(() => score.up(z));
   */
  const collide = (a) => (b) => (f) => {
    const hitboxA = divideByTwo(a.dimension);
    const hitboxB = divideByTwo(b.dimension);
    const distanceAToB = distance(a)(b);
    distanceAToB <= hitboxA + hitboxB && f();
  };

  /**
   * @function move
   * moves game object o
   * @example move(enemy)
   */
  const move = (o) => ((o.x += o.velocity.x), (o.y += o.velocity.y));

  const utils = {
    distance,
    randomIntFromRange,
    negation,
    avg,
    divideByTwo,
    collide,
    move,
  };

  /*
   *
   * objects
   *
   */
  const Player = (x) => (y) => (dimension) => (sprite) => ({
    x,
    y,
    sprite,
    dimension,
    moveWithMouse({ player, mouse }) {
      player.x = mouse.x;
      player.y = mouse.y;
    },
    draw({ player, swoosh, score, collide, c }) {
      /**@mechanic move player with mouse*/
      player.moveWithMouse(z);

      /**@mechanic increase score when colliding with swoosh */
      collide(player)(swoosh)(() => score.up(z));

      c.draw(player);
    },
  });

  const Coin = (x) => (y) => (dimension) => (sprite) => ({
    x,
    y,
    sprite,
    dimension,
    respawn({ swoosh, randomIntFromRange }) {
      swoosh.x = randomIntFromRange(50)(innerWidth - 50);
      swoosh.y = randomIntFromRange(50)(innerHeight - 50);
    },
    draw({ swoosh, player, sound, enemies, collide, c }) {
      /**@mechanic play swoosh sound when colliding with player */
      /**@mechanic respawn swoosh when colliding with player */
      /**@mechanic spawn new enemy when colliding with player */
      collide(swoosh)(player)(() => {
        sound.swoosh.play();
        swoosh.respawn(z);
        enemies.spawn(z);
      });

      c.draw(swoosh);
    },
  });

  const Enemy =
    (x) =>
    (y) =>
    (dimension) =>
    ({ ...sprites }) =>
    (speed) => ({
      x,
      y,
      sprite: sprites.L,
      spriteR: sprites.R,
      spriteL: sprites.L,
      dimension,
      velocity: {
        x: speed,
        y: speed,
      },
      switchSprite({ enemy }) {
        if (enemy.velocity.x < 0) enemy.sprite = enemy.spriteL;
        else enemy.sprite = enemy.spriteR;
      },
      draw({ enemy, player, sound, over, collide, move, c }) {
        /**@mechanic game over when colliding with player */
        /**@mechanic play death sound when colliding with player */
        collide(enemy)(player)(() => {
          over(z);
          sound.death.play();
        });

        /**@mechanic move enemy */
        move(enemy);

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

        /**@mechanic switch sprite l <--> r */
        enemy.switchSprite(z);

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
    (sprite) => ({
      ...audios,
      sprite,
      mute({ sound }) {
        (sound.death.muted = true), (sound.swoosh.muted = true);
      },
      unmute({ sound }) {
        (sound.death.muted = false), (sound.swoosh.muted = false);
      },
    });

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
    /**@mechanic initialize canvas context*/
    const c = canvas(canvasElement)(innerWidth)(innerHeight);

    /**@mechanic create mouse*/
    const mouse = Mouse(c);

    /**@mechanic create score*/
    const score = Score(0)(scoreSprite);

    /**@mechanic create player*/
    const player = Player(mouse.x)(mouse.y)(50)(playerSprite);

    /**@mechanic create swoosh*/
    const randomCoinX = randomIntFromRange(50)(innerWidth - 50);
    const randomCoinY = randomIntFromRange(50)(innerHeight - 50);

    const swoosh = Coin(randomCoinX)(randomCoinY)(50)(swooshSprite);

    /**@mechanic create enemies */
    const enemies = [];
    enemies.spawn = ({ enemies }) => {
      const randomEnemyX = randomIntFromRange(50)(innerWidth - 50);
      const randomEnemyY = randomIntFromRange(50)(innerHeight - 50);
      const randomSpeed = randomIntFromRange(-5)(4); // -5 -4 -3 -2 -1 0 1 2 3 4
      const randomSpeedNotZero = randomSpeed === 0 ? 5 : randomSpeed; // -5 -4 -3 -2 -1 5 1 2 3 4
      const spawnedEnemy =
        Enemy(randomEnemyX)(randomEnemyY)(50)(enemySprites)(randomSpeedNotZero);
      enemies.push(spawnedEnemy);
    };

    /**@mechanic create sound */
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
      collide,
      move,
      over,
      ...utils,
    };

    /**@inits */
    enemies.spawn(z);

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

  const over = (z) => {
    const { swoosh, score, enemies } = z;
    swoosh.respawn(z);
    score.reset(z);
    enemies.length = 0;
  };

  const z = launch({
    canvas,
    Mouse,
    Score,
    Player,
    Coin,
    Enemy,
    Sound,
    ...utils,
  });

  Engine(z);
});
