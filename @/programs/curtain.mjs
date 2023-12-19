import { pipe, inject, mutate } from "../utils";

const z_0 = { curtainId: "curtain" };

const setCurtainOpacityToZero = mutate(
  ({ curtainId }) => (document.getElementById(curtainId).style.opacity = `0`)
);

const liftCurtain = pipe(inject(z_0), setCurtainOpacityToZero);

addEventListener("DOMContentLoaded", liftCurtain);
