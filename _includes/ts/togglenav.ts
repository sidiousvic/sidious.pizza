window.addEventListener("keydown", (e) => {
  if (e.key === "z") {
    const body = document.querySelector("body");
    body?.classList.toggle("focus");
  }
});
