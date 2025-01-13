import { sha256 } from "sha256/mod.ts";
import { bundleAsync } from "lightningcss-wasm";
import { Event } from "lume/core/events.ts";
import Site from "lume/core/site.ts";

export const bundleStyles =
  (options: {
    bundler?: {
      filename?: string;
      minify?: boolean;
      analyzeDependencies?: boolean;
    };
    target?: string;
  }) =>
  (site: Site) => {
    const defaultOptions = {
      bundler: {
        filename: "_includes/index.css",
        minify: true,
        analyzeDependencies: false,
      },
      target: "./_bundle.css",
    };

    async function bundleCSS(e: Event) {
      const { code: bundledAndMinifiedBinary } = await bundleAsync({
        ...defaultOptions.bundler,
        ...options.bundler,
      });

      const currChecksum = sha256(bundledAndMinifiedBinary);

      const previousChecksum = sha256(
        await Deno.readFile(defaultOptions.target || options.target || "")
      );

      if (e.type === "beforeBuild") {
        console.info(
          `⚡️ Bundling ${options.bundler?.filename} into ${
            defaultOptions.target || options.target
          } before build...`
        );

        await Deno.writeFile(
          defaultOptions.target || options.target || "",
          bundledAndMinifiedBinary
        );

        console.info(
          `😈 Bundled into ${
            defaultOptions.target || options.target
          } before build!`
        );
      }

      if (e.type === "afterUpdate") {
        if (previousChecksum.toString() === currChecksum.toString()) return;

        console.info(`⚡️ Bundling ${options.bundler?.filename}...`);

        await Deno.writeFile(
          defaultOptions.target || options.target || "",
          bundledAndMinifiedBinary
        );

        console.info(
          `😈 Bundled into ${defaultOptions.target || options.target}!`
        );
      }
    }

    site.addEventListener("beforeBuild", bundleCSS);
    site.addEventListener("afterUpdate", bundleCSS);
  };
