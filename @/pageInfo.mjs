const pageInfoButton = document.querySelector(".page-info-button");
const pageInfoOverlay = document.querySelector(".page-info-overlay");

pageInfoOverlay.addEventListener("click", () => {
  pageInfoOverlay.style.display = "none";
});

pageInfoButton.addEventListener("click", () => {
  console.log("lol");
  pageInfoOverlay.style.display = "flex";
});
