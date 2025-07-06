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
  projectstate,
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
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 1.4rem;
      cursor: none !important;
    }
    #score {
      font-size: 1.7rem !important;
    }
  `;
  document.head.appendChild(styles);
}

const styles = document.createElement("style");
styles.textContent = `
  body {
    cursor: none !important;
  }
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
const ZERO_SPEED = 0;
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
  gameTitle: urlContainsPhantomPizza ? "PHANTOM PIZZA" : "SIDIOUS.PIZZA",
  displayScore: true,
  startScreen: true,
  startScreenTitleFont: "var(--font-family-title)",
  startScreenTextFont: "var(--font-family)",
  scoreFont: "var(--font-family-title)",
  bgColorHex: "#0d1117",
  fgColorHex: "var(--venom)",
  startTextA: isMobile
    ? "<em>TOUCH</em> TO START"
    : 'PRESS <em style="filter: var(--filter-invert)">START</em>',
  startTextB: '危険ゾーンに <em style="filter: var(--filter-invert)">投入</em>',
  sprites: [
    "/assets/images/enemyl.webp",
    "/assets/images/enemyr.webp",
    "/assets/images/swoosh.webp",
    "/assets/images/player.gif",
  ],
  audios: [
    { url: "/assets/music/swoosh.wav", volume: 0.3 },
    { url: "/assets/music/death.wav", volume: 0.9 },
    { url: "/assets/music/phantompizza.wav", volume: 0.8 },
  ],
});

type Phantoms = {
  player: Phantom;
  swoosh: Phantom;
  enemies: Phantom[];
};

const phantoms = {
  player: Phantom(mouse)(SPRITE_DIMENSION)(sprites.player)(ZERO_SPEED),
  swoosh: Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(
    sprites.swoosh
  )(ZERO_SPEED),
  enemies: [
    Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(sprites.enemyr)(
      randomElement(ENEMY_RANDOM_SPAWN_SPEEDS)
    ),
  ],
};

const z: projectstate<Phantoms> = {
  phantoms,
  sound,
  score,
  mouse,
};

requestAnimationFrame(() => {
  Engine<Phantoms>(c)(z)(
    (u) => (
      u.score.value === 0 &&
        ((document.getElementById("score")!.innerHTML = "START!"),
        u.sound.phantompizza.pause()),
      u.score.value > 1 && u.sound.phantompizza.play().catch(() => {}),
      moveWithMouse(u.phantoms.player)(u.mouse),
      draw(c)(u.phantoms.player),
      collide(u.phantoms.swoosh)(u.phantoms.player)(
        () => (
          updateScore(u.score)(SCORE_UPDATER),
          !(~~u.score.value % 3)
            ? ((document.getElementById("score")!.style.animation =
                "shake .5s infinite"),
              (score.sprite!.innerHTML =
                randomElement(GAME_PROMPTS).toUpperCase()))
            : (document.getElementById("score")!.style.animation = "none"),
          respawn(u.phantoms.swoosh),
          u.sound.swoosh.play().catch(() => {}),
          u.phantoms.enemies.push(
            Phantom(randomSpawn(SPRITE_DIMENSION))(SPRITE_DIMENSION)(
              sprites.enemyr
            )(randomElement(ENEMY_RANDOM_SPAWN_SPEEDS))
          )
        )
      ),
      draw(c)(u.phantoms.swoosh),
      u.phantoms.enemies.map(
        (e: Phantom) => (
          //@ts-ignore
          (u.enemy = e),
          collide(e)(u.phantoms.player)(
            () => (
              respawn(u.phantoms.swoosh),
              (u.score.value = 0),
              (u.phantoms.enemies.length = 0),
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
