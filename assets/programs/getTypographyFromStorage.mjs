import { random, TYPOGRAPHIES } from "/assets/programs/utils.mjs";

const typography = localStorage.getItem("typography");

document.documentElement.classList.add(
  `typography-${typography ? typography : random(TYPOGRAPHIES)}`
);
