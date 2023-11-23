const whenToLift = document.querySelector(".post")
  ? "DOMContentLoaded"
  : "load";

console.log(`whenToLift: ${whenToLift}`);

addEventListener(whenToLift, () => {
  const curtainElement = document.getElementById("curtain");
  curtainElement.style.opacity = `0`;
});
