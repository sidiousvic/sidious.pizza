import { random } from "./utils.mjs";
import { COLORS } from "./constants.mjs";

const color = localStorage.getItem("colors");

document.documentElement.classList.add(
  `colors-${color ? color : random(COLORS)}`
);
