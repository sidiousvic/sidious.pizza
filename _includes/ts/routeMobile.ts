import { isMobile } from "./utils";

document.addEventListener("DOMContentLoaded", () => {
  if (isMobile(navigator.userAgent)) window.location.href = "/mobile";
});
