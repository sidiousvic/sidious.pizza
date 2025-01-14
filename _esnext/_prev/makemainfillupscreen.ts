import { getElementById } from "./domutils.ts";
import { inject, mix, mutate, pipe } from "./utils.ts";

const MAIN_PADDING_PX = -20;

type Config = {
  footerId: string;
  mainId: string;
  screenDimensionsReadyEventName: string;
  computedMainHeight?: number;
};

const config: Config = {
  footerId: "footer",
  mainId: "main",
  screenDimensionsReadyEventName: "screenDimensionsReady",
};

type State = Config & Event;

const computeFooterMarginTop = (z: State) =>
  parseInt(
    window
      .getComputedStyle(getElementById(z.footerId))
      .getPropertyValue("margin-top")
  );

const computeFooterMarginBottom = (z: State) =>
  parseInt(
    window
      .getComputedStyle(getElementById(z.footerId))
      .getPropertyValue("margin-bottom")
  );

const computeFooterOffsetHeight = (z: State) =>
  getElementById(z.footerId).offsetHeight;

const computeMainPaddingTop = (z: State) =>
  parseInt(
    window
      .getComputedStyle(getElementById(z.mainId))
      .getPropertyValue("padding-top")
  );

const computeMainPaddingBottom = (z: State) =>
  parseInt(
    window
      .getComputedStyle(getElementById(z.mainId))
      .getPropertyValue("padding-bottom")
  );

const makeMainElementFillUpScreen = pipe(
  inject(config),
  mix((z: State) => console.log(z)),
  mix((z: State) => ({
    computedMainHeight:
      window.innerHeight -
      (computeFooterMarginTop(z) +
        computeFooterMarginBottom(z) +
        computeFooterOffsetHeight(z)) -
      computeMainPaddingTop(z) +
      computeMainPaddingBottom(z) +
      MAIN_PADDING_PX,
  })),
  mutate(
    (z: State) =>
      (getElementById(z.mainId).style.minHeight = `${z.computedMainHeight}px`)
  ),
  mutate((z: State) =>
    dispatchEvent(new CustomEvent(z.screenDimensionsReadyEventName))
  )
);

addEventListener("load", makeMainElementFillUpScreen);
addEventListener("resize", makeMainElementFillUpScreen);
