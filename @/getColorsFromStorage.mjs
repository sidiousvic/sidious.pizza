const colors = ["zero", "venom", "fire", "void", "phantom"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
const color = localStorage.getItem("colors") ?? randomColor;
const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", `/css/themes/colors/${color}.css`);
const head = document.querySelector("head");
head.replaceChild(link, document.getElementById("colors"));
link.setAttribute("id", "colors");
