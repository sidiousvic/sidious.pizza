import { random } from "./utils.mjs";
import { TYPOGRAPHIES } from "./constants.mjs";

const typography = localStorage.getItem("typography");

document.documentElement.classList.add(
  `typography-${typography ? typography : random(TYPOGRAPHIES)}`
);
