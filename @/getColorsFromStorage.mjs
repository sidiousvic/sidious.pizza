const colors = {
  venom: "venom",
  fire: "fire",
  ghost: "ghost",
};

const color = localStorage.getItem("colors") ?? colors.venom;

const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", `/css/themes/colors/${color}.css`);
const head = document.querySelector("head");
head.replaceChild(link, document.getElementById("colors"));
link.setAttribute("id", "colors");
