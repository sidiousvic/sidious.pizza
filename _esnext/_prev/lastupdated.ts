import { getElementById } from "./domutils";
import { GitHubRateLimitExceededError } from "./errors";
import { error, inject, mutate, pipe } from "./utils";

type Config = {
  repoUrl: "https://api.github.com/repos/sidiousvic/sidious.pizza";
  dateTimeFormat: Intl.DateTimeFormat;
  isDevMode: boolean;
};

const config: Config = {
  repoUrl: "https://api.github.com/repos/sidiousvic/sidious.pizza",
  dateTimeFormat: new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
  isDevMode: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1",
};

const updateLastUpdated = pipe(
  inject(config),
  async (z: Config) => {
    if (z.isDevMode) {
      return { pushed_at: new Date().toISOString() };
    }
    return fetch(z.repoUrl).then(async (r) => {
      const data = await r.json();
      if (JSON.stringify(data).includes("rate limit"))
        error(GitHubRateLimitExceededError);
      return data;
    });
  },
  mutate(
    async (promise: Promise<{ pushed_at: string }>) =>
    (getElementById(
      "last-updated-datetime"
    ).innerText = `${config.dateTimeFormat.format(
      new Date((await promise)?.pushed_at || Date.now())
    )} TYO`)
  )
);

addEventListener("DOMContentLoaded", updateLastUpdated);
