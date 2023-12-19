import { bundleAsync } from "npm:lightningcss-wasm@1.22.1";

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
      target: "./_bundle.css",
    };

    async function bundleAndMinifyCSS() {
      console.info(
        `⚡️ Bundling and minifying ${options.bundler?.filename}...\n`
      );

      const { code: bundledAndMinifiedBinary } = await bundleAsync({
        ...defaultOptions.bundler,
        ...options.bundler,
      });

      await Deno.writeFile(
        defaultOptions.target || options.target,
        bundledAndMinifiedBinary
      );

      console.info(
        `✅ Bundled and minified into ${
          defaultOptions.target || options.target
        }!\n`
      );
    }

    site.addEventListener("beforeBuild", bundleAndMinifyCSS);
    site.addEventListener("beforeUpdate", bundleAndMinifyCSS);
  };
