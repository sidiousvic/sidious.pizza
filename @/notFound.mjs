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
  draw,
  moveWithVelocity,
  bounce,
  Phantom,
  config,
  randomSpawn,
  switchSprite,
} from "/@/phantom.mjs";

const SPRITE_DIMENSION = 200;
(Math.pow(SPRITE_DIMENSION, 2) / (innerHeight * innerWidth)) * 1000;

const { sprites, c } = config({
  GAME_TITLE: "SIDIOUS.PIZZA",
  DISPLAY_SCORE: false,
  SCORE_FONT: "Vastantonius, DotGothic16, monospace",
  BG_COLOR_HEX: "#0d1117",
  FG_COLOR_HEX: "#00ff2a",
  CURSOR: true,
  START_SCREEN: false,
  SPRITES: ["/@/notFound404.png", "/@/sidiousvic404.png"],
  AUDIOS: [{ url: "/@/death.wav", volume: 0.9 }],
});

const z = {
  notFound: Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(
    sprites.notFound404
  )(2),
};

requestAnimationFrame(() => {
  Engine(c)(z)(
    (u) => (
      moveWithVelocity(u.notFound),
      bounce(u.notFound)({ x: innerWidth, y: innerHeight }),
      switchSprite(u.notFound)(
        u.notFound.speed.x < 0 ? sprites.sidiousvic404 : sprites.notFound404
      ),
      draw(c)({ ...u.notFound, h: 100, w: 200 })
    )
  );
});
