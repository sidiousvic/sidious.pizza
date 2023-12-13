import { configTypography } from "./configTypography.mjs";
import { configColors } from "./configColors.mjs";

const configButtons = document.querySelectorAll(".config-button");
[...configButtons].map((button) => {
  button.addEventListener("click", () => {
    const [config, value] = button.dataset.config.split("-");
    if (value === "random") localStorage.removeItem(config);
    else localStorage.setItem(config, value);
    switch (config) {
      case "colors":
        return configColors(value);
      case "typography":
        return configTypography(value);
      default:
        return;
    }
  });
});
