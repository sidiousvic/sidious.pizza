const navbar = document.getElementById("navbar");
const main = document.getElementById("main");

function computeNavbarHeight() {
  const navbarYPadding =
    parseInt(window.getComputedStyle(navbar).getPropertyValue("padding-top")) +
    parseInt(
      window.getComputedStyle(navbar).getPropertyValue("padding-bottom")
    );
  return navbar.offsetHeight + navbarYPadding;
}

function computeMainPadding() {
  return (
    parseInt(window.getComputedStyle(main).getPropertyValue("padding-top")) +
    parseInt(window.getComputedStyle(main).getPropertyValue("padding-bottom"))
  );
}

function computeMainHeight() {
  return window.innerHeight - computeNavbarHeight() - computeMainPadding();
}

addEventListener(
  "DOMContentLoaded",
  () => (main.style.height = `${computeMainHeight()}px`)
);

addEventListener("resize", () => {
  main.style.height = `${computeMainHeight()}px`;
});
