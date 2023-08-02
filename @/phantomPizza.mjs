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

const { sprites, score, sound, mouse, c } = config({
  GAME_TITLE: "SIDIOUS.PIZZA",
  DISPLAY_SCORE: true,
  SCORE_FONT: "Vastantonius",
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
      collide(u.player)(u.swoosh)(() => updateScore(u.score)(SCORE_UPDATER)),
      draw(c)(u.player),
      collide(u.swoosh)(u.player)(
        () => (
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
