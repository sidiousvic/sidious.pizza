const colors = ["zero", "venom", "fire", "void", "phantom"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];
const color = localStorage.getItem("colors");
document.documentElement.classList.add(`colors-${color ? color : randomColor}`);
