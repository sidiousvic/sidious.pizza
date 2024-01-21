/*
 * Phantom Pizza
 *
 * A fun game to play while you wait for your pizza to be delivered.
 *
 * by @sidiousvic
 */

import {
  bounce,
  collide,
  config,
  draw,
  Engine,
  moveWithMouse,
  moveWithVelocity,
  Phantom,
  randomElement,
  randomSpawn,
  respawn,
  switchSprite,
  updateScore,
} from "./phantom.js";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  const styles = document.createElement("style");
  styles.textContent = `
    #main {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 1.4rem;
    }
    #score {
      font-size: 1.7rem !important;
    }
  `;
  document.head.appendChild(styles);
}

const styles = document.createElement("style");
styles.textContent = `
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
document.head.appendChild(styles);

const ENEMY_RANDOM_SPAWN_SPEEDS = [-5, -4, -3 - 2, 2, 3, 4, 5];
const ZERO_SPEED = { x: 0, y: 0 };
const SPRITE_DIMENSION = isMobile ? 30 : 50;
const SCORE_UPDATER =
  (Math.pow(SPRITE_DIMENSION, 2) / (innerHeight * innerWidth)) * 1000;
const GAME_PROMPTS = [
  "Wicked<i>！</i>",
  "Pie-wack<i>！</i>",
  "Slice 'n' dice<i>！</i>",
  "Mamma mia<i>！</i>",
  "Pizza-boo<i>！</i>",
  "Sizzle and fizzle<i>！</i>",
  "Pie 'n' die<i>！</i>",
  "パイやばっ<i>！</i>",
  "凄腕ピザ<i>！</i>",
  "逃げろー<i>！</i>",
  "パイ逃避<i>！</i>",
];

const urlContainsPhantomPizza = /phantompizza/i.test(location.href);

const { sprites, score, sound, mouse, c } = config({
  GAME_TITLE: urlContainsPhantomPizza ? "PHANTOM PIZZA" : "SIDIOUS.PIZZA",
  DISPLAY_SCORE: true,
  START_SCREEN: true,
  START_SCREEN_TITLE_FONT: "var(--font-family-title)",
  START_SCREEN_TEXT_FONT: "var(--font-family)",
  SCORE_FONT: "var(--font-family-title)",
  BG_COLOR_HEX: "#0d1117",
  FG_COLOR_HEX: "var(--venom)",
  FILTER: "var(--filter-invert)",
  START_TEXT_A: isMobile
    ? "<em>TOUCH</em> TO START"
    : '<em style="filter: var(--filter-invert)">ENTER</em> AT YOUR OWN PERIL',
  START_TEXT_B:
    '危険ゾーンに <em style="filter: var(--filter-invert)">投入</em>',
  SPRITES: [
    "/assets/images/enemyl.webp",
    "/assets/images/enemyr.webp",
    "/assets/images/swoosh.webp",
    "/assets/images/player.gif",
  ],
  AUDIOS: [
    { url: "/assets/music/swoosh.wav", volume: 0.3 },
    { url: "/assets/music/death.wav", volume: 0.9 },
    { url: "/assets/music/phantompizza.wav", volume: 0.8 },
  ],
});

const z = {
  player: Phantom(mouse)(SPRITE_DIMENSION)(sprites.player)(ZERO_SPEED),
  swoosh: Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(
    sprites.swoosh
  )(ZERO_SPEED),
  enemies: [
    Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(sprites.enemyr)(
      randomElement(ENEMY_RANDOM_SPAWN_SPEEDS)
    ),
  ],
  sound,
  score,
  mouse,
};

requestAnimationFrame(() => {
  Engine(c)(z)(
    (u) => (
      u.score.value === 0 &&
        ((document.getElementById("score").innerHTML = "START!"),
        u.sound.phantompizza.pause()),
      u.score.value > 1 && u.sound.phantompizza.play().catch(() => {}),
      moveWithMouse(u.player)(u.mouse),
      draw(c)(u.player),
      collide(u.swoosh)(u.player)(
        () => (
          updateScore(u.score)(SCORE_UPDATER),
          !(~~u.score.value % 3)
            ? ((document.getElementById("score").style.animation =
                "shake .5s infinite"),
              (score.sprite.innerHTML =
                randomElement(GAME_PROMPTS).toUpperCase()))
            : (document.getElementById("score").style.animation = "none"),
          respawn(u.swoosh),
          u.sound.swoosh.play().catch(() => {}),
          u.enemies.push(
            Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(
              sprites.enemyr
            )(randomElement(ENEMY_RANDOM_SPAWN_SPEEDS))
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
              u.sound.death.play().catch(() => {})
            )
          ),
          moveWithVelocity(e),
          switchSprite(e)(e.speed.x < 0 ? sprites.enemyl : sprites.enemyr),
          bounce(e)({ x: innerWidth, y: innerHeight }),
          draw(c)(e)
        )
      )
    )
  );
});
