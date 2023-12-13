const typographies = [
  "sinister",
  "dexter",
  "virgil",
  "nilheim",
  "doomed",
  "sidious",
];

export function configTypography(typography) {
  if (typography === "random")
    typography = typographies[Math.floor(Math.random() * typographies.length)];
  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", `/css/themes/typography/${typography}.css`);
  const head = document.querySelector("head");
  const curtain = document.getElementById("curtain");
  curtain.style.opacity = "1";
  setTimeout(() => {
    head.replaceChild(link, document.getElementById("typography"));
    curtain.style.opacity = "0";
  }, 1000);
  link.setAttribute("id", "typography");
}
