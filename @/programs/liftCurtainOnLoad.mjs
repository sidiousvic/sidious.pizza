import { pipe, inject, mutate } from "/@/programs/utils.mjs";

const z_0 = { curtainId: "curtain" };

const setCurtainOpacityToZero = mutate(
  ({ curtainId }) => (document.getElementById(curtainId).style.opacity = `0`)
);

const hideCurtain = pipe(inject(z_0), setCurtainOpacityToZero);

addEventListener("load", hideCurtain);
