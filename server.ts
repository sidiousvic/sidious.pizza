import Server from "lume/core/server.ts";
import notFound from "lume/middlewares/not_found.ts";
import expires from "lume/middlewares/expires.ts";

const server = new Server({
  port: 8000,
  root: `${Deno.cwd()}/_site`,
});

server.use(
  notFound({
    root: `${Deno.cwd()}/_site`,
    page404: "404.html",
    directoryIndex: true,
  }),
  expires(),
);

server.start();
