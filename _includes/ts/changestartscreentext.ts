import { getElementById } from "./domutils.ts";
import { inject, isMobile, mutate, pipe } from "./utils.ts";

type Config = {
  startScreenTitleId: string;
  startScreenTextId: string;
  newStartScreenText: string;
};

const config: Config = {
  startScreenTitleId: "start-screen-title",
  startScreenTextId: "start-screen-text",
  newStartScreenText: "PHANTOM PIZZA",
};

type State = Config & Event;

const changeStartScreenText = mutate(
  (
    z: State,
  ) => (getElementById(z.startScreenTitleId).innerHTML = z.newStartScreenText),
);

const hideStartScreenText = mutate(
  (
    z: State,
  ) => (getElementById(z.startScreenTextId).style.display = "none"),
);

const changeStartScreenTextToSayOnlyPhantomPizza = pipe(
  inject(config),
  changeStartScreenText,
  hideStartScreenText,
);

!isMobile(navigator.userAgent) &&
  document.addEventListener(
    "DOMContentLoaded",
    changeStartScreenTextToSayOnlyPhantomPizza,
  );
