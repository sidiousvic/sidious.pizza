window.addEventListener("keydown", (e) => {
  if (e.key === "x") {
    const body = document.querySelector("body");
    body?.classList.toggle("focus");
  }
});
