import { getElementById } from "./domutils";
import { inject, isMobile, mutate, pipe } from "./utils";

type Config = {
  repoUrl: "https://api.github.com/repos/sidiousvic/sidious.pizza";
  dateTimeFormat: Intl.DateTimeFormat;
};

const config: Config = {
  repoUrl: "https://api.github.com/repos/sidiousvic/sidious.pizza",
  dateTimeFormat: new Intl.DateTimeFormat("en-US", {
    weekday: isMobile(navigator.userAgent) ? "short" : "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: isMobile(navigator.userAgent) ? false : true,
  }),
};

const fetchRepo = async (z: Config) => fetch(z.repoUrl).then((r) => r.json());

const updateLastUpdated = pipe(
  inject(config),
  fetchRepo,
  mutate(
    async (promise: Promise<{ pushed_at: string }>) =>
      ((
        getElementById("last-updated-datetime") as HTMLSpanElement
      ).innerText = `${config.dateTimeFormat.format(
        new Date((await promise).pushed_at)
      )} ${isMobile(navigator.userAgent) ? " Tokyo" : " Asia/Tokyo"}`)
  )
);

addEventListener("DOMContentLoaded", updateLastUpdated);
