(() => {
  const ageEl = document.getElementById("age-live");
  if (!ageEl || typeof performance === "undefined") return;

  // Birth: 1991-09-24T11:58-06:00 -> 1991-09-24T23:58:00Z
  const birthMs = Date.parse("1991-09-24T23:58:00Z");
  const msPerYear = 365.2425 * 24 * 60 * 60 * 1000;
  const epochOffset = Date.now() - performance.now();

  const update = () => {
    const nowMs = epochOffset + performance.now();
    const years = (nowMs - birthMs) / msPerYear;
    ageEl.textContent = years.toFixed(12);
    requestAnimationFrame(update);
  };

  update();
})();
