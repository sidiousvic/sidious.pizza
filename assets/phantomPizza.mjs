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
  spawnRandom,
  randomIntFromRange,
  Engine,
  prime,
  moveWithMouse,
  collide,
  draw,
  respawn,
  moveWithVelocity,
  switchSprite,
  bounce,
  Phantom,
  updateScore,
} from "./phantom.mjs";

const GAME_TITLE = "SIDIOUS.PIZZA";
const ENEMY_RANDOM_SPAWN_SPEEDS = [-5, -4, -3 - 2, 2, 3, 4, 5];
const DISPLAY_SCORE = true;
const SCORE_FONT = "Vastantonius";
const BG_COLOR_HEX = "#0d1117";
const FG_COLOR_HEX = "#00ff2a";
const SPRITE_DIMENSION = 50;
const SCORE_UPDATER =
  (Math.pow(SPRITE_DIMENSION, 2) / (innerHeight * innerWidth)) * 1000;
const START_TEXT_A = "START";
const START_TEXT_B = "スタート";
const SPRITES = [
  "/assets/player.gif",
  "/assets/enemyL.png",
  "/assets/enemyR.png",
  "/assets/swoosh.png",
];
const AUDIOS = [
  { url: "/assets/swoosh.wav", volume: 0.3 },
  { url: "/assets/death.wav", volume: 0.9 },
];

const { sprites, score, sound, mouse, c } = prime({
  GAME_TITLE,
  DISPLAY_SCORE,
  SCORE_FONT,
  BG_COLOR_HEX,
  FG_COLOR_HEX,
  START_TEXT_A,
  START_TEXT_B,
  SPRITES,
  AUDIOS,
});

const Player = (x) => (y) => (dimension) => (sprite) =>
  Phantom(x)(y)(dimension)(sprite)({ x: 0, y: 0 });

const Swoosh = (x) => (y) => (dimension) => (sprite) =>
  Phantom(x)(y)(dimension)(sprite)({ x: 0, y: 0 });

const Enemy = (x) => (y) => (dimension) => (speed) =>
  Phantom(x)(y)(dimension)(sprites.enemyR)(speed);

const z = {
  player: Player(mouse.x)(mouse.y)(SPRITE_DIMENSION)(sprites.player),
  swoosh: Swoosh(
    randomIntFromRange(SPRITE_DIMENSION)(innerWidth - SPRITE_DIMENSION)
  )(randomIntFromRange(SPRITE_DIMENSION)(innerHeight - SPRITE_DIMENSION))(
    SPRITE_DIMENSION
  )(sprites.swoosh),
  enemies: [spawnRandom(Enemy)(SPRITE_DIMENSION)(ENEMY_RANDOM_SPAWN_SPEEDS)],
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
