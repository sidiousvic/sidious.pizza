import { isMobile } from "/assets/programs/utils.mjs";
isMobile(navigator.userAgent) &&
  (document.querySelector(".navbar-links").style.display = "none");
