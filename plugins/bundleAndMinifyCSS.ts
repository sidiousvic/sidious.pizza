import { bundleAsync } from "npm:lightningcss-wasm@1.22.1";
import { Page } from "lume/core/filesystem.ts";

export const bundleAndMinifyCSS =
  (options: {
    bundler?: {
      filename?: string;
      minify?: boolean;
      analyzeDependencies?: boolean;
    };
    target?: string;
  }) =>
  async (site) => {
    const defaultOptions = {
      bundler: {
        filename: "_includes/index.css",
        minify: true,
        analyzeDependencies: false,
      },
      target: "/bundle.css",
    };

    async function bundleAndMinifyCSS() {
      console.log(
        `⚡️ Bundling and minifying ${options.bundler?.filename}...\n`
      );
      const { code: bundledAndMinifiedBinary } = await bundleAsync({
        ...defaultOptions.bundler,
        ...options.bundler,
      });

      const bundledAndMinifiedCSS = Page.create(
        defaultOptions.target || options.target,
        bundledAndMinifiedBinary
      );

      await site.writer.savePage(bundledAndMinifiedCSS);
    }

    site.addEventListener("afterBuild", bundleAndMinifyCSS);
    site.addEventListener("afterUpdate", bundleAndMinifyCSS);
  };
