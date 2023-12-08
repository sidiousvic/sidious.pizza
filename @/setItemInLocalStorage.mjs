import { configTheme } from "./configTheme.mjs";

const builtInSetItem = localStorage.setItem;

localStorage.setItem = function (key, value) {
  builtInSetItem.apply(this, arguments);
  switch (key) {
    case "theme":
      return configTheme(value);
    default:
      return;
  }
};
