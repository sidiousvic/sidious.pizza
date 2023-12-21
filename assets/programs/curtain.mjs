import { pipe, inject, mutate } from "/assets/programs/utils.mjs";

const z_0 = { curtainId: "curtain" };

const setCurtainOpacityToZero = mutate(
  ({ curtainId }) => (document.getElementById(curtainId).style.opacity = `0`)
);

const liftCurtain = pipe(inject(z_0), setCurtainOpacityToZero);

addEventListener("ready", liftCurtain);
