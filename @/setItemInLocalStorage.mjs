import { configTypography } from "./configTypography.mjs";
import { configColors } from "./configColors.mjs";

const builtInSetItem = localStorage.setItem;

localStorage.setItem = function (key, value) {
  builtInSetItem.apply(this, arguments);
  switch (key) {
    case "colors":
      return configColors(value);
    case "typography":
      return configTypography(value);
    default:
      return;
  }
};
