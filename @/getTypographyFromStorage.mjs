const typographies = {
  nilheim: "nilheim",
  dexter: "dexter",
  doomed: "doomed",
  virgil: "virgil",
};

const typography = localStorage.getItem("typography") ?? typographies.nilheim;

const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", `/css/themes/typography/${typography}.css`);
const head = document.querySelector("head");
head.replaceChild(link, document.getElementById("typography"));
link.setAttribute("id", "typography");
