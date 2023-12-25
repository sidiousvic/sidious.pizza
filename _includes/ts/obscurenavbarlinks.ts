import { Try } from "./dontpanic.ts";
import { inject, mutate, pipe } from "./utils.ts";

type Config = { navbarLinksID: string };

const config: Config = { navbarLinksID: "navbar-links" };

type State = Config & Event;

const obscureNavbarLinksOnMobile = (z: State) =>
  Try(document.getElementById(z.navbarLinksID))(
    `ID ${z.navbarLinksID} not found.`,
  ).style.display = "none";

addEventListener(
  "DOMContentLoaded",
  pipe(inject(config), mutate(obscureNavbarLinksOnMobile)),
);
