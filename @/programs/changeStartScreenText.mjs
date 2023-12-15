document.addEventListener("DOMContentLoaded", () => {
  if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    (document.querySelector("#start-screen-title").innerHTML = "PHANTOM PIZZA"),
      (document.querySelector("#start-screen-text").style.display = "none");
});
