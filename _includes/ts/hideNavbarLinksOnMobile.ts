import { Try } from "./dontpanic.ts";
import { isMobile, mutate, pipe } from "./utils.ts";

const Config = {
  navbarLinksID: "navbar-links",
};

isMobile(navigator.userAgent) && pipe(
  mutate((z: typeof Config) =>
    Try(document.getElementById(z.navbarLinksID))(
      `ID ${z.navbarLinksID} not found.`,
    ).style.display = "none"
  ),
)(Config);
