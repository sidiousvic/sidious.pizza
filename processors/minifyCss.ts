import type { RawData } from "lume/core/file.ts";

// Lightweight CSS minifier to trim payload without extra dependencies.
export function minifyCss(files: RawData[]) {
  for (const file of files) {
    if (typeof file.content !== "string") continue;
    let css = file.content;

    // Drop comments.
    css = css.replace(/\/\*[\s\S]*?\*\//g, "");
    // Trim space around common separators.
    css = css.replace(/\s*([{}:;,>])\s*/g, "$1");
    // Collapse remaining whitespace.
    css = css.replace(/\s+/g, " ");
    // Remove unnecessary semicolons before closing braces.
    css = css.replace(/;}/g, "}");

    file.content = css.trim();
  }
}
