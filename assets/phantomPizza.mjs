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
  launch,
  moveWithMouse,
  collide,
  draw,
  respawn,
  moveWithVelocity,
  switchSprite,
  bounce,
  updateValue,
  Phantom,
} from "./phantom.mjs";

const GAME_TITLE = "SIDIOUS.PIZZA";
const ENEMY_RANDOM_SPAWN_SPEEDS = [-5, -4, -3 - 2, 2, 3, 4, 5];
const DISPLAY_SCORE = true;
const SCORE_FONT = "Vastantonius";
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

const { sprites, score, sound, mouse, c } = launch({
  GAME_TITLE,
  DISPLAY_SCORE,
  SCORE_FONT,
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
  c,
};

requestAnimationFrame(() => {
  Engine(z)(
    (z) => (
      moveWithMouse(z.player)(z.mouse),
      collide(z.player)(z.swoosh)(() => updateValue(z.score)(SCORE_UPDATER)),
      draw(z.c)(z.player),
      collide(z.swoosh)(z.player)(
        () => (
          respawn(z.swoosh),
          z.sound.swoosh.play(),
          z.enemies.push(
            spawnRandom(Enemy)(SPRITE_DIMENSION)(ENEMY_RANDOM_SPAWN_SPEEDS)
          )
        )
      ),
      draw(z.c)(z.swoosh),
      z.enemies.map(
        (e) => (
          (z.enemy = e),
          collide(e)(z.player)(
            () => (
              respawn(z.swoosh),
              (z.score.value = 0),
              (z.enemies.length = 0),
              z.sound.death.play()
            )
          ),
          moveWithVelocity(e),
          switchSprite(e)(e.speed.x < 0 ? sprites.enemyL : sprites.enemyR),
          bounce(e)({ x: innerWidth, y: innerHeight }),
          draw(z.c)(e)
        )
      )
    )
  );
});
