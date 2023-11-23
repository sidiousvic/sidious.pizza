function liftSlowly() {
  const curtainElement = document.getElementById("curtain");
  setTimeout(() => (curtainElement.style.opacity = `0`), 0);
}

function liftOnLoad() {
  const curtainElement = document.getElementById("curtain");
  addEventListener("load", () => {
    curtainElement.style.opacity = `0`;
  });
}

document.querySelector(".post") ? liftSlowly() : liftOnLoad();
