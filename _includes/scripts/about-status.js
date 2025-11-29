(() => {
  const textEl = document.getElementById("status-text");
  const ledEl = document.getElementById("status-led");
  if (!textEl || !ledEl) return;

  const baseStatus = () => {
    const hour = new Date().getHours();
    if ((hour >= 11 && hour < 14) || (hour >= 18 && hour < 22)) return "hungry";
    if (hour >= 0 && hour < 7) return "sleepy";
    return "sleepy"; // default baseline
  };

  const applyStatus = (status) => {
    const label = status === "hungry" ? "Hungry" : "Sleepy";
    textEl.textContent = label;
    ledEl.className = `status-led ${status === "hungry" ? "status-hungry" : "status-sleepy"}`;
  };

  const applyTransient = (status) => {
    const map = {
      scheming: { label: "Scheming...", cls: "status-scheming" },
      short: { label: "Short-circuiting...", cls: "status-short" },
      lost: { label: "Signal lost", cls: "status-lost" },
    };
    const entry = map[status];
    if (!entry) return null;
    textEl.textContent = entry.label;
    ledEl.className = `status-led ${entry.cls}`;
    return () => applyStatus(baseStatus());
  };

  applyStatus(baseStatus());

  const transientPool = ["scheming", "short", "lost"];
  let transientIndex = 0;

  setInterval(() => {
    const pick = transientPool[transientIndex % transientPool.length];
    transientIndex += 1;
    const restore = applyTransient(pick);
    if (restore) setTimeout(restore, 3000);
  }, 18_000);
})();
