/*
 *
 * Phantom Pizza
 *
 * A fun game to play while you wait for your pizza to be delivered.
 *
 * by @sidiousvic
 *
 */

import {
  Engine,
  moveWithMouse,
  collide,
  draw,
  respawn,
  moveWithVelocity,
  switchSprite,
  bounce,
  Phantom,
  updateScore,
  config,
  randomElement,
  randomSpawn,
} from "/@/phantom.mjs";

const ENEMY_RANDOM_SPAWN_SPEEDS = [-5, -4, -3 - 2, 2, 3, 4, 5];
const ZERO_SPEED = { x: 0, y: 0 };
const SPRITE_DIMENSION = 50;
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

const { sprites, score, sound, mouse, c } = config({
  GAME_TITLE: "SIDIOUS.PIZZA",
  DISPLAY_SCORE: true,
  START_SCREEN: true,
  SCORE_FONT: "Vastantonius, DotGothic16, monospace",
  BG_COLOR_HEX: "#0d1117",
  FG_COLOR_HEX: "#00ff2a",
  START_TEXT_A: "START",
  START_TEXT_B: "スタート",
  SPRITES: ["/@/enemyL.png", "/@/enemyR.png", "/@/swoosh.png", "/@/player.gif"],
  AUDIOS: [
    { url: "/@/swoosh.wav", volume: 0.3 },
    { url: "/@/death.wav", volume: 0.9 },
  ],
});

requestAnimationFrame(() => {
  const animationStyle = document.createElement("style");
  animationStyle.textContent = `
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
  document.head.appendChild(animationStyle);
});

innerWidth < 500 && (document.getElementById("score").style.fontSize = "2rem");

const z = {
  player: Phantom(mouse)(SPRITE_DIMENSION)(sprites.player)(ZERO_SPEED),
  swoosh: Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(
    sprites.swoosh
  )(ZERO_SPEED),
  enemies: [
    Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(sprites.enemyR)(
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
      moveWithMouse(u.player)(u.mouse),
      draw(c)(u.player),
      collide(u.swoosh)(u.player)(
        () => (
          updateScore(u.score)(SCORE_UPDATER),
          !(~~score.value % 3)
            ? ((document.getElementById("score").style.animation =
                "shake .5s infinite"),
              (score.sprite.innerHTML = randomElement(GAME_PROMPTS)))
            : (document.getElementById("score").style.animation = "none"),
          respawn(u.swoosh),
          u.sound.swoosh.play(),
          u.enemies.push(
            Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(
              sprites.enemyR
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
