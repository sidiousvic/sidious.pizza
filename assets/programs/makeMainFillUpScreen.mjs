const ROUNDING_ERROR = 10;

function computeNavbarHeight() {
  const navbar = document.getElementById("navbar");
  return navbar.offsetHeight;
}

function computeFooterMargin() {
  const footer = document.getElementById("footer");
  const footerYMargin =
    parseInt(window.getComputedStyle(footer).getPropertyValue("margin-top")) +
    parseInt(window.getComputedStyle(footer).getPropertyValue("margin-bottom"));
  return footer.offsetHeight + footerYMargin;
}

function computeMainPadding() {
  const main = document.getElementById("main");
  return (
    parseInt(window.getComputedStyle(main).getPropertyValue("padding-top")) +
    parseInt(window.getComputedStyle(main).getPropertyValue("padding-bottom"))
  );
}

function computeMainHeight() {
  return (
    window.innerHeight -
    computeNavbarHeight() -
    computeFooterMargin() -
    computeMainPadding() -
    ROUNDING_ERROR
  );
}

addEventListener("load", () => {
  const main = document.getElementById("main");
  main.style.minHeight = `${computeMainHeight()}px`;
  dispatchEvent(new CustomEvent("screenDimensionsReady"));
});

addEventListener("resize", () => {
  const main = document.getElementById("main");
  main.style.minHeight = `${computeMainHeight()}px`;
});
