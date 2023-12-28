import { getElementById } from "./domutils";

const REPO_URL = "https://api.github.com/repos/sidiousvic/sidious.pizza";

const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

addEventListener("DOMContentLoaded", () =>
  fetch(REPO_URL)
    .then((r) => r.json())
    .then(
      ({ pushed_at }) =>
        ((
          getElementById("last-updated-datetime") as HTMLSpanElement
        ).innerText = dateTimeFormat.format(new Date(pushed_at)))
    )
);
