import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import postcss from "lume/plugins/postcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pageFind from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import lang from "./filters/lang.ts";

const site = lume({
  location: new URL("https://sidious.pizza/"),
});

site
  .ignore("README.md")
  .copy("assets")
  .copy("scripts")
  .use(postcss())
  .use(date())
  .use(codeHighlight())
  .use(basePath())
  .use(sitemap())
  .use(
    pageFind({
      ui: {
        resetStyles: false,
      },
    })
  )
  .use(slugifyUrls({ alphanumeric: false }))
  .use(
    feed({
      output: ["/feed.json", "/feed.xml"],
      query: "type=posts",
      info: {
        title: "=site.title",
        description: "=site.description",
      },
      items: {
        title: "=title",
        content: "$.post-body",
      },
    })
  )
  .use(resolveUrls())
  .filter("jp", (body: string) => lang(body, "jp"))
  .filter("en", (body: string) => lang(body, "en"));

export default site;
