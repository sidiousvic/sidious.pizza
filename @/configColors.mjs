const colors = ["zero", "venom", "fire", "void", "phantom"];
export function configColors(color) {
  if (color === "random")
    color = colors[Math.floor(Math.random() * colors.length)];
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", `/css/themes/colors/${color}.css`);
  const head = document.querySelector("head");
  const curtain = document.getElementById("curtain");
  curtain.style.opacity = "1";
  setTimeout(() => {
    head.replaceChild(link, document.getElementById("colors"));
    curtain.style.opacity = "0";
  }, 800);
  link.setAttribute("id", "colors");
}
