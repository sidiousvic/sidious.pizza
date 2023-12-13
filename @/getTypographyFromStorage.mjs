const typographies = [
  "sinister",
  "dexter",
  "virgil",
  "nilheim",
  "doomed",
  "sidious",
];

const randomTypography =
  typographies[Math.floor(Math.random() * typographies.length)];

const typography = localStorage.getItem("typography") ?? randomTypography;
const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", `/css/themes/typography/${typography}.css`);
const head = document.querySelector("head");
head.replaceChild(link, document.getElementById("typography"));
link.setAttribute("id", "typography");
