import lume from "lume/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import date from "lume/plugins/date.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import eta from "lume/plugins/eta.ts";
import extract_date from "lume/plugins/extract_date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import base_path from "lume/plugins/base_path.ts";
import check_urls from "lume/plugins/check_urls.ts";
import brotli from "lume/plugins/brotli.ts";
import markdown from "lume/plugins/markdown.ts";
import { optimizePics9000 } from "./processors/optimizePics9000.ts"

const site = lume();

site.ignore('README.md')

// Copy static assets
site.copy("_includes/fonts", "fonts");
site.copy("_includes/images", "images");
site.copy("_includes/styles", "styles");
site.copy("_includes/scripts", "scripts");


site.use(markdown());
site.use(attributes());
site.use(date());
site.use(code_highlight());
site.use(eta());
site.use(extract_date());
site.use(esbuild());
site.use(base_path());
site.use(check_urls());
site.use(brotli());

site.process([".md", ".eta"], optimizePics9000)

// Derive prev/next navigation for project chapters (novels, serials, etc.)
let postsCache: unknown[] = [];

site.preprocess([".md", ".eta"], (pages) => {
  const serialTypes = new Set(["project", "book"]);
  const projects = pages.filter((page) => serialTypes.has(page.data.type as string) && page.data.project);
  const grouped = new Map();

  for (const page of projects) {
    const key = page.data.project as string;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)?.push(page);
  }

  for (const group of grouped.values()) {
    group.sort((a, b) => {
      const ao = typeof a.data.order === "number" ? a.data.order : Number.MAX_SAFE_INTEGER;
      const bo = typeof b.data.order === "number" ? b.data.order : Number.MAX_SAFE_INTEGER;
      if (ao !== bo) return ao - bo;
      const ad = a.data.date instanceof Date ? a.data.date.getTime() : 0;
      const bd = b.data.date instanceof Date ? b.data.date.getTime() : 0;
      return ad - bd;
    });

    group.forEach((page, idx) => {
      const prev = group[idx - 1];
      const next = group[idx + 1];
      page.data.prev = prev ? { url: prev.data.url, title: prev.data.title } : null;
      page.data.next = next ? { url: next.data.url, title: next.data.title } : null;
    });
  }

  // Build the posts collection from page front matter so we don't maintain _data/posts.json manually.
  const postTypes = new Set(["observation", "project", "book"]);
  const posts = pages
    .filter((page) => postTypes.has(page.data.type as string))
    .map((page) => {
      const date =
        page.data.date instanceof Date
          ? page.data.date.toISOString().slice(0, 10)
          : page.data.date;
      const order = typeof page.data.order === "number" ? page.data.order : undefined;

      return {
        title: page.data.title,
        type: page.data.type,
        project: page.data.project,
        order,
        url: page.data.url,
        date,
        summary: page.data.summary,
        tags: Array.isArray(page.data.tags) ? page.data.tags : undefined,
      };
    })
    .filter((post) => post.title && post.type && post.url);

  if (posts.length) postsCache = posts;
  const postsData = postsCache;
  for (const page of pages) {
    page.data.posts = postsData;
  }
  site.data("posts", postsData);
});

export default site;
