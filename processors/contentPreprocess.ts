import type { Site } from "lume/core/site.ts";
import type { Page } from "lume/core/file.ts";

// Builds language metadata, prev/next for serials, filters drafts (unless INCLUDE_DRAFTS),
// and populates the posts collection in site data and each page.
export function preprocessContent(pages: Page[]) {
  const includeDrafts = Deno.env.get("INCLUDE_DRAFTS") === "true";

  // Drop drafts unless explicitly included
  for (let i = pages.length - 1; i >= 0; i--) {
    const page = pages[i];
    const isDraft = page.data?.status === "draft" || page.data?.draft === true;
    if (isDraft && !includeDrafts) {
      pages.splice(i, 1);
    }
  }

  const serialTypes = new Set(["project", "book"]);
  const projects = pages.filter((page) => serialTypes.has(page.data.type as string) && page.data.project);
  const grouped = new Map<string, Page[]>();

  const detectLanguages = (content: unknown) => {
    if (typeof content !== "string") return [] as string[];
    const langs = new Set<string>();
    const regex = /<\s*(en|jp|es)(\s|>)/gi;
    const dataAttrRegex = /data-lang\s*=\s*["']\s*(en|jp|es)\s*["']/gi;
    let match;
    while ((match = regex.exec(content)) !== null) langs.add(match[1].toLowerCase());
    while ((match = dataAttrRegex.exec(content)) !== null) langs.add(match[1].toLowerCase());
    return Array.from(langs);
  };

  for (const page of pages) {
    const languages = detectLanguages(page.content ?? page.data.content);
    if (languages.length) {
      page.data.languages = languages;
      if (!page.data.lang && languages.length) page.data.lang = languages[0];
    }
  }

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
  const postTypes = new Set(["file", "project", "book", "haiku", "observation"]);
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
        logo: page.data.logo,
        tags: Array.isArray(page.data.tags) ? page.data.tags : undefined,
        featured: page.data.featured === true,
      };
    })
    .filter((post) => post.title && post.type && post.url);

  return { posts };
}

export function applyContentPreprocess(site: Site) {
  site.preprocess([".md", ".eta"], (pages) => {
    const { posts } = preprocessContent(pages);
    if (posts.length) {
      site.data("posts", posts);
      for (const page of pages) {
        page.data.posts = posts;
      }
    }
  });
}
