import { Try } from "./dontpanic.ts";
import { inject, mutate, pipe } from "./utils.ts";

type Config = { navbarId: string };

const config: Config = { navbarId: "navbar" };

type State = Config & Event;

const obscureNavbarLinks = (z: State) =>
  (Try(document.getElementById(z.navbarId))(
    `ID ${z.navbarId} not found.`
  ).style.display = "none");

const makeGridSingleColumn = () =>
  (document.body.style.gridTemplateColumns = "100vw");

const makeGridSingleArea = () =>
  (document.body.style.gridTemplateAreas = '"main"');

addEventListener(
  "DOMContentLoaded",
  pipe(
    inject(config),
    mutate(obscureNavbarLinks),
    mutate(makeGridSingleColumn),
    mutate(makeGridSingleArea)
  )
);
