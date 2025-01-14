import { TYPOGRAPHIES } from "./constants.ts";
import { inject, mix, mutate, pipe, random } from "./utils.ts";

type Config = {
  typographyKey: string;
  userStoredTypography?: string | null;
  randomTypography: string;
};

type State = Config & Event;

const config: Config = {
  typographyKey: "typography",
  randomTypography: random(TYPOGRAPHIES),
};

const registerStoredTypography = (
  z: State,
): Pick<Config, "userStoredTypography"> => ({
  userStoredTypography: localStorage.getItem(z.typographyKey),
});

const applyStoredOrRandomTypography = (z: State) =>
  document.documentElement.classList.add(
    `typography-${
      z.userStoredTypography ? z.userStoredTypography : z.randomTypography
    }`,
  );

const getTypographyFromStorage = pipe(
  inject(config),
  mix(registerStoredTypography),
  mutate(applyStoredOrRandomTypography),
);

document.addEventListener("DOMContentLoaded", getTypographyFromStorage);
