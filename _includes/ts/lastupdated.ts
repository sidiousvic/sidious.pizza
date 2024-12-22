import { getElementById } from "./domutils";
import { inject, mutate, pipe } from "./utils";

type Config = {
  repoUrl: "https://api.github.com/repos/sidiousvic/sidious.pizza";
  dateTimeFormat: Intl.DateTimeFormat;
};

const config: Config = {
  repoUrl: "https://api.github.com/repos/sidiousvic/sidious.pizza",
  dateTimeFormat: new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
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
      )} Asia/Pacific (Tokyo)`)
  )
);

addEventListener("DOMContentLoaded", updateLastUpdated);
