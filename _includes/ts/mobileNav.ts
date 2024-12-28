window.addEventListener("DOMContentLoaded", () => {
  const navElement = document.querySelector("#navbar");
  const mobileNavButton = document.querySelector("#navbar-mobile-button");

  mobileNavButton?.addEventListener("click", () => {
    navElement?.classList.toggle("display");
  });
});
