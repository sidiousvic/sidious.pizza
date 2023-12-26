import { getElement } from "./domutils.ts";

addEventListener("DOMContentLoaded", () => {
  const pageInfoOverlay = getElement(".page-info-overlay") as HTMLDivElement;
  const pageInfoButton = getElement(".page-info-button") as HTMLButtonElement;
  const hideOverlay = () => (pageInfoOverlay.style.display = "none");
  const showOverlay = () => (pageInfoOverlay.style.display = "flex");
  pageInfoOverlay.addEventListener("click", hideOverlay),
    pageInfoButton.addEventListener("click", showOverlay),
    addEventListener(
      "keydown",
      (e) =>
        e.key === "Escape" &&
        hideOverlay(),
    ),
    pageInfoButton.addEventListener("keydown", (e) =>
      e.key === "Enter" &&
      showOverlay()),
    addEventListener("keydown", (e) => e.key === "i" && showOverlay()),
    addEventListener("keyup", (e) => e.key === "i" && hideOverlay());
});
