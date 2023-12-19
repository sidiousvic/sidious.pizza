import { pipe, inject, mutate, isMobile } from "/@/programs/utils.mjs";

const z_0 = {
  startScreenTitleId: "start-screen-title",
  startScreenTextId: "start-screen-text",
};

const changeStartScreenText = mutate(
  ({ startScreenTitleId }) =>
    (document.getElementById(startScreenTitleId).innerHTML = "PHANTOM PIZZA")
);

const hideStartScreenText = mutate(
  ({ startScreenTextId }) =>
    (document.getElementById(startScreenTextId).style.display = "none")
);

const changeStartScreenTextToSayOnlyPhantomPizza = pipe(
  inject(z_0),
  changeStartScreenText,
  hideStartScreenText
);

!isMobile(navigator.userAgent) &&
  document.addEventListener(
    "DOMContentLoaded",
    changeStartScreenTextToSayOnlyPhantomPizza
  );
