import { COLORS } from "./constants.ts";
import { TryOr } from "./dontpanic.ts";
import { inject, mix, mutate, pipe, random } from "./utils.ts";

type Config = {
  colorsKey: string;
  userStoredColor?: string;
  randomColor: string;
};

type State = Config & Event;

const config: Config = {
  colorsKey: "colors",
  randomColor: random(COLORS),
};

const registedStoredColor = (z: State) => ({
  userStoredColor: localStorage.getItem(z.colorsKey),
});

const defaultToRandomColor = (z: State) =>
  TryOr(z.userStoredColor)(() =>
    localStorage.setItem(z.colorsKey, z.randomColor)
  );

const applyStoredOrRandomColor = (z: State) =>
  document.documentElement.classList.add(
    `colors-${z.userStoredColor ? z.userStoredColor : z.randomColor}`,
  );

const getColorsFromStorage = pipe(
  inject(config),
  mix(registedStoredColor),
  mutate(defaultToRandomColor),
  mutate(applyStoredOrRandomColor),
);

document.addEventListener("DOMContentLoaded", getColorsFromStorage);
