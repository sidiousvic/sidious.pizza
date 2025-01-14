import { getElementById } from "./domutils";
import { GitHubRateLimitExceededError } from "./errors";
import { error, inject, mutate, pipe } from "./utils";

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

const updateLastUpdated = pipe(
  inject(config),
  async (z: Config) =>
    fetch(z.repoUrl).then(async (r) => {
      const data = await r.json();
      if (JSON.stringify(data).includes("rate limit"))
        error(GitHubRateLimitExceededError);
      return data;
    }),
  mutate(
    async (promise: Promise<{ pushed_at: string }>) =>
      (getElementById(
        "last-updated-datetime"
      ).innerText = `${config.dateTimeFormat.format(
        new Date((await promise)?.pushed_at || Date.now())
      )} Asia/Pacific (Tokyo)`)
  )
);

addEventListener("DOMContentLoaded", updateLastUpdated);
