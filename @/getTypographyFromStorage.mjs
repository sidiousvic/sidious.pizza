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
const typography = localStorage.getItem("typography");
document.documentElement.classList.add(
  `typography-${typography ? typography : randomTypography}`
);
