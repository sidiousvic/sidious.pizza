import { COLORS, random } from "/assets/programs/utils.mjs";

const color = localStorage.getItem("colors");

document.documentElement.classList.add(
  `colors-${color ? color : random(COLORS)}`,
);
