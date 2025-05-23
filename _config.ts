import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import basePath from "lume/plugins/base_path.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pageFind from "lume/plugins/pagefind.ts";
import sitemap from "lume/plugins/sitemap.ts";
import lang from "$/filters/lang.ts";
import terser from "lume/plugins/terser.ts";
import inline from "lume/plugins/inline.ts";
import { bundleStyles } from "$/plugins/bundleStyles.ts";
import { optimizePics9000 } from "$/processors/optimizePics9000.ts";
import readInfo from "lume/plugins/reading_info.ts";
import { compilePrograms } from "$/plugins/compilePrograms.ts";
import katex from "lume/plugins/katex.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import purgecss from "lume/plugins/purgecss.ts";
import brotli from "lume/plugins/brotli.ts";

if (!(Deno.env.get("LOG_LEVEL") === "DEBUG")) console.debug = () => { };

const site = lume({
  location: new URL("https://sidious.pizza/"),
  watcher: { ignore: ["_esnext/_prev"] },
});

site
  .ignore("README.md")
  .copy("assets")
  .copy("spacephantom/game")
  .use(inline({ extensions: [".mjs", ".html", ".css", ".js"] }))
  .use(purgecss())
  .use(bundleStyles({ bundler: { filename: "_includes/css/main.css" } }))
  .use(compilePrograms({ dirname: "_includes/ts" }))
  .use(minifyHTML({ options: { minify_js: false, keep_comments: true } }))
  .use(terser({ extensions: [".mjs"] }))
  .use(date())
  .use(codeHighlight())
  .use(katex({ options: { displayMode: true } }))
  .use(basePath())
  .use(sitemap())
  .use(pageFind({ ui: { resetStyles: false } }))
  .use(slugifyUrls({ alphanumeric: false }))
  .use(readInfo())
  .use(resolveUrls())
  .process([".md"], optimizePics9000)
  .use(brotli())
  .filter("jp", (body: string) => lang(body, "jp"))
  .filter("en", (body: string) => lang(body, "en"));

export default site;
