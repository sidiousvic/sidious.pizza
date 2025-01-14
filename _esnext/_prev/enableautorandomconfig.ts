import { Guard, Try } from "./dontpanic.ts";
import {
  addEventListenerToClass,
  getClickedElementDatasetKey,
  removeClassContaining,
  removeStoredItem,
} from "./domutils.ts";
import { apply, inject, mutate, pipe, random } from "./utils.ts";
import { COLORS, TYPOGRAPHIES } from "./constants.ts";

type ConfigKey = "typography" | "colors";

type Config = {
  configAutoRandomSelectButtonID: string;
  selectedAutoRandomConfigType?: string;
};

const config: Config = {
  configAutoRandomSelectButtonID: ".config-auto-random",
};

type State = Config & MouseEvent;

const isConfigKey = (key?: string): key is ConfigKey =>
  key === "typography" || key === "colors";

const computeLoadingTime_ms = (
  type?: string,
) => (Guard(type)(isConfigKey)(
    `The config item ${type} is not recognized.`,
  ) === "typography"
  ? 1000
  : 0);

const setCurtainOpacity = (
  value: number,
) => (
  Try(document.getElementById("curtain"))(`ID ${"curtain"} not found`).style
    .opacity = value.toFixed()
);

const enableConfig = (type?: string) => (value?: string) =>
  document.documentElement.classList.add(
    `${
      Try(type)(`Unable to add configuration class. Config type is undefined.`)
    }-${
      Try(value)(
        `Unable to add configuration class. Config value is undefined.`,
      )
    }`,
  );

const randomizeConfig = (type?: string) =>
  type === "typography" ? random(TYPOGRAPHIES) : random(COLORS);

const switchSelectedConfig = pipe(
  inject(config),
  apply((z: State) => ({
    selectedAutoRandomConfigType: getClickedElementDatasetKey(z)("type"),
  })),
  mutate(
    (z: State) => (
      setCurtainOpacity(1),
        setTimeout(
          () => (
            removeClassContaining(z.selectedAutoRandomConfigType),
              removeStoredItem(z.selectedAutoRandomConfigType),
              enableConfig(z.selectedAutoRandomConfigType)(
                randomizeConfig(z.selectedAutoRandomConfigType),
              ),
              setCurtainOpacity(0)
          ),
          computeLoadingTime_ms(z.selectedAutoRandomConfigType),
        )
    ),
  ),
);

addEventListener(
  "DOMContentLoaded",
  () =>
    addEventListenerToClass("click")(config.configAutoRandomSelectButtonID)(
      switchSelectedConfig,
    ),
);
