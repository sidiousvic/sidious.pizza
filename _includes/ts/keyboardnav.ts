[
  (e: KeyboardEvent) => e.key === "h" && location.assign("/"),
  (e: KeyboardEvent) => e.key === "k" && location.assign("/config"),
  (e: KeyboardEvent) => e.key === "w" && location.assign("/weblog"),
  (e: KeyboardEvent) => e.key === "s" && location.assign("/sitemap"),
  (e: KeyboardEvent) => e.key === "v" && location.assign("/about"),
  (e: KeyboardEvent) => e.key === "p" && location.assign("/projects"),
  (e: KeyboardEvent) => e.key === "m" && location.assign("/meta"),
].map((f) => window.addEventListener("keydown", f));
