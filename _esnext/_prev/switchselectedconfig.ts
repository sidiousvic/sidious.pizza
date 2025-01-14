import { Guard, Try } from "./dontpanic.ts";
import {
  addEventListenerToClass,
  getClickedElementDatasetKey,
  getStoredItem,
  removeClassContaining,
  removeStoredItem,
} from "./domutils.ts";
import { apply, inject, mutate, pipe } from "./utils.ts";
import { COLORS } from "./constants.js";

type ConfigKey = "typography" | "colors";

type Config = {
  configSelectButtonID: string;
  user: {
    stored?: { key?: string; value?: string };
    selected: { key?: string; value?: string };
  };
};

const config: Config = {
  configSelectButtonID: ".config-select",
  user: {
    stored: undefined,
    selected: {
      key: undefined,
      value: undefined,
    },
  },
};

type State = Config & MouseEvent;

const isConfigKey = (key?: string): key is ConfigKey =>
  key === "typography" || key === "colors";

const computeLoadingTime_ms = (type?: string) =>
  Guard(type)(isConfigKey)(`The config item ${type} is not recognized.`) ===
  "typography"
    ? 1000
    : 0;

const setCurtainOpacity = (value: number) =>
  (Try(document.getElementById("curtain"))(
    `ID ${"curtain"} not found`
  ).style.opacity = value.toFixed());

const enableSelectedConfig = (type?: string) => (value?: string) =>
  document.documentElement.classList.add(
    `${Try(type)(
      `Unable to add configuration class. Config type is undefined.`
    )}-${Try(value)(
      `Unable to add configuration class. Config value is undefined.`
    )}`
  );

const storeSelectedConfig = (type?: string) => (value?: string) =>
  localStorage.setItem(
    Try(type)(`Unable to store configuration. Config type is undefined.`),
    Try(value)(`Unable to store configuration. Config value is undefined.`)
  );

const resolveNextConfig = (active?: string) =>
  COLORS[(COLORS.indexOf(active ?? "") + 1) % COLORS.length];

const switchSelectedConfig = pipe(
  inject(config),
  apply((z: State) => ({
    user: {
      stored: {
        key: getClickedElementDatasetKey(z)("type"),
        value: getStoredItem(getClickedElementDatasetKey(z)("type")),
      },
      selected: {
        key: getClickedElementDatasetKey(z)("type"),
        value: getClickedElementDatasetKey(z)("value"),
      },
    },
  })),
  apply((z: State) => ({
    user: {
      selected: {
        key: z.user.selected.key,
        value:
          z.user.selected.value === "toggle"
            ? resolveNextConfig(z.user.stored?.value)
            : z.user.selected.value,
      },
    },
  })),
  mutate(
    (z: State) => (
      console.log(z.user.selected),
      setCurtainOpacity(1),
      setTimeout(
        () => (
          removeClassContaining(z.user.selected.key),
          removeStoredItem(z.user.selected.key),
          enableSelectedConfig(z.user.selected.key)(z.user.selected.value),
          storeSelectedConfig(z.user.selected.key)(z.user.selected.value),
          setCurtainOpacity(0)
        ),
        computeLoadingTime_ms(z.user.selected.key)
      )
    )
  )
);

addEventListener("DOMContentLoaded", () =>
  addEventListenerToClass("click")(config.configSelectButtonID)(
    switchSelectedConfig
  )
);
