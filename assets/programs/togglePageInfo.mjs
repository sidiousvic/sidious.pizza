const pageInfoOverlay = document.querySelector(".page-info-overlay");
const pageInfoButton = document.querySelector(".page-info-button");
const hideOverlay = () => (pageInfoOverlay.style.display = "none");
const showOverlay = () => (pageInfoOverlay.style.display = "flex");
pageInfoOverlay.addEventListener("click", hideOverlay);
pageInfoButton.addEventListener("click", showOverlay);
