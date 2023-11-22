import Server from "lume/core/server.ts";
import expires from "lume/middlewares/expires.ts";
import cache_busting from "lume/middlewares/cache_busting.ts";
import notFound from "lume/middlewares/not_found.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

const HOUR = 3600000;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

server.use(
  expires({
    defaultDuration: WEEK,
    durations: {
      "text/html": 0,
      "application/json": 0,
      "application/xml": 0,
    },
  }),
  cache_busting()
);

server.use(
  notFound({
    root: `${Deno.cwd()}/_site`,
    page404: "/404.html",
  })
);

server.start();

console.log("Listening on http://localhost:8000");
