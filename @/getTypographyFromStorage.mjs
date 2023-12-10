const default_typography = "sidious";
const typography = localStorage.getItem("typography") ?? default_typography;
const link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", `/css/themes/typography/${typography}.css`);
const head = document.querySelector("head");
head.replaceChild(link, document.getElementById("typography"));
link.setAttribute("id", "typography");
