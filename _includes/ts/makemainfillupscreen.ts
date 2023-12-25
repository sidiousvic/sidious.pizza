import { getElementById } from "./domutils.ts";
import { inject, mix, mutate, pipe } from "./utils.ts";

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
  getElementById(z.navbarId).offsetHeight;

const computeNavbarPaddingTop = (z: State) =>
  parseInt(
    window.getComputedStyle(
      getElementById(z.navbarId),
    ).getPropertyValue("padding-top"),
  );

const computeNavbarPaddingBottom = (z: State) =>
  parseInt(
    window.getComputedStyle(
      getElementById(z.navbarId),
    ).getPropertyValue("padding-bottom"),
  );

const computeFooterMarginTop = (z: State) =>
  parseInt(
    window.getComputedStyle(
      getElementById(z.footerId),
    ).getPropertyValue("margin-top"),
  );

const computeFooterMarginBottom = (z: State) =>
  parseInt(
    window.getComputedStyle(
      getElementById(z.footerId),
    ).getPropertyValue("margin-bottom"),
  );

const computeFooterOffsetHeight = (z: State) =>
  getElementById(z.footerId).offsetHeight;

const computeMainPaddingTop = (z: State) =>
  parseInt(
    window.getComputedStyle(
      getElementById(z.mainId),
    ).getPropertyValue("padding-top"),
  );

const computeMainPaddingBottom = (z: State) =>
  parseInt(
    window.getComputedStyle(
      getElementById(z.mainId),
    ).getPropertyValue("padding-bottom"),
  );

const makeMainElementFillUpScreen = pipe(
  inject(config),
  mix((z: State) => ({
    computedMainHeight: window.innerHeight -
      (computeNavbarPaddingTop(z) + computeNavbarPaddingBottom(z) +
        computeNavbarOffsetHeight(z)) -
      (computeFooterMarginTop(z) + computeFooterMarginBottom(z) +
        computeFooterOffsetHeight(z)) -
      computeMainPaddingTop(z) + computeMainPaddingBottom(z),
  })),
  mutate((z: State) => (
    getElementById(z.mainId).style.minHeight = `${z.computedMainHeight}px`
  )),
  mutate((
    z: State,
  ) => (dispatchEvent(new CustomEvent(z.screenDimensionsReadyEventName)))),
);

addEventListener("load", makeMainElementFillUpScreen);
addEventListener("resize", makeMainElementFillUpScreen);
