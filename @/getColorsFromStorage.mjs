const default_color = "phantom";
const color = localStorage.getItem("colors") ?? default_color;
const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", `/css/themes/colors/${color}.css`);
const head = document.querySelector("head");
head.replaceChild(link, document.getElementById("colors"));
link.setAttribute("id", "colors");
