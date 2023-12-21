import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pageFind from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import lang from "$/filters/lang.ts";
import terser from "lume/plugins/terser.ts";
import inline from "lume/plugins/inline.ts";
import { bundleCSS } from "./plugins/bundleAndMinifyCSS.ts";
import { optimizeMdPics9000 } from "./processors/optimizeMdPics9000.ts";

const site = lume({
  location: new URL("https://sidious.pizza/"),
});

site
  .ignore("README.md")
  .copy("assets")
  .use(inline({ extensions: [".mjs", ".html", ".css"] }))
  .use(bundleCSS({ bundler: { filename: "_includes/css/styles.css" } }))
  .use(terser({ extensions: [".mjs"] }))
  .use(date())
  .use(codeHighlight())
  .use(basePath())
  .use(sitemap())
  .use(pageFind({ ui: { resetStyles: false } }))
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
  .process([".md"], optimizeMdPics9000)
  .filter("jp", (body: string) => lang(body, "jp"))
  .filter("en", (body: string) => lang(body, "en"));

export default site;
