const curtainStyleElement = document.createElement("style");
const curtainElement = document.createElement("div");

curtainStyleElement.innerHTML = `
#curtain {
  position: fixed;
  opacity: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: #111;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: opacity 0.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}`;

curtainElement.innerHTML = `
<div id="curtain"></div>
`;

document.head.appendChild(curtainStyleElement);
document.body.appendChild(curtainElement);

addEventListener("load", () => {
  const curtainElement = document.getElementById("curtain");
  curtainElement.style.opacity = `0`;
});
