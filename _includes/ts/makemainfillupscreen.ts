import { Try } from "./dontpanic.ts";
import { inject, mix, mutate, pipe } from "./utils.ts";

const ROUNDING_ERROR = 10;

type Config = {
  navbarId: string;
  footerId: string;
  mainId: string;
  screenDimensionsReadyEventName: string;
  computedMainHeight?: number;
};

const config: Config = {
  navbarId: "navbar",
  footerId: "footer",
  mainId: "main",
  screenDimensionsReadyEventName: "screenDimensionsReady",
};

type State = Config & Event;

const computeNavbarOffsetHeight = (z: State) =>
  Try(document.getElementById(z.navbarId))(
    `ID ${config.navbarId} not found.`,
  ).offsetHeight;

const computeFooterMarginTop = (z: State) =>
  parseInt(
    window.getComputedStyle(
      Try(document.getElementById(z.footerId))(
        `ID ${config.footerId} not found.`,
      ),
    ).getPropertyValue("margin-top"),
  );

const computeFooterMarginBottom = (z: State) =>
  parseInt(
    window.getComputedStyle(
      Try(document.getElementById(z.footerId))(
        `ID ${config.footerId} not found.`,
      ),
    ).getPropertyValue("margin-bottom"),
  );

const computeMainPaddingTop = (z: State) =>
  parseInt(
    window.getComputedStyle(
      Try(document.getElementById(z.mainId))(
        `ID ${config.mainId} not found.`,
      ),
    ).getPropertyValue("padding-top"),
  );

const computeMainPaddingBottom = (z: State) =>
  parseInt(
    window.getComputedStyle(
      Try(document.getElementById(z.mainId))(
        `ID ${config.mainId} not found.`,
      ),
    ).getPropertyValue("padding-bottom"),
  );

const makeMainElementFillUpScreen = pipe(
  inject(config),
  mix((z: State) => ({
    computedMainHeight: window.innerHeight - computeNavbarOffsetHeight(z) -
      computeFooterMarginTop(z) - computeFooterMarginBottom(z) -
      computeMainPaddingTop(z) - computeMainPaddingBottom(z) - ROUNDING_ERROR,
  })),
  mutate((z: State) => (
    Try(document.getElementById(z.mainId))(`ID ${z.mainId} not found.`).style
      .minHeight = `${z.computedMainHeight}px`
  )),
  mutate((
    z: State,
  ) => (dispatchEvent(new CustomEvent(z.screenDimensionsReadyEventName)))),
);

addEventListener("load", makeMainElementFillUpScreen);
addEventListener("resize", makeMainElementFillUpScreen);
