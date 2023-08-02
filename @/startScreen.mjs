const pressStart = document.getElementById("press-start");
setInterval(() => {
  if (pressStart.innerText === "PRESS START") pressStart.innerHTML = "スタート";
  else pressStart.innerHTML = "PRESS START";
}, 2000);
