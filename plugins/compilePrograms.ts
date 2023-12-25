import { build } from "https://deno.land/x/esbuild@v0.19.9/mod.js";
import { sha256 } from "https://denopkg.com/chiefbiiko/sha256@v1.0.0/mod.ts";
import Site from "lume/core/site.ts";
import { walkSync } from "lume/deps/fs.ts";

export const compilePrograms = (options: {
  dirname?: string;
}) =>
(site: Site) => {
  const defaultOptions = {
    dirname: ".",
  };

  async function compilePrograms(e) {
    const tsFiles = await Promise.all(
      Array.from(
        walkSync(
          Deno.cwd() + "/" + (options.dirname || defaultOptions.dirname),
          { includeDirs: false, includeFiles: true },
        ),
      )
        .filter((entry) => entry.isFile)
        .map(async (entry) => ({
          path: entry.path,
          binary: await Deno.readFile(entry.path),
        })),
    );

    [...tsFiles].map(async (file) => {
      const generatedFilePath = "_temp/esnext/" +
        file.path.split("/").pop()?.replace(".ts", ".js");

      const previousChecksum = sha256(
        await Deno.readFile(
          generatedFilePath,
        ).catch(() => new Uint8Array([])),
      );

      await Deno.remove("_temp/esnext", { recursive: true });
      await Deno.mkdir("_temp/esnext", { recursive: true });

      const { warnings, errors } = await build({
        entryPoints: [file.path],
        outdir: "_temp/esnext",
        logLevel: "error",
        minify: true,
        bundle: true,
      });

      if (errors.length) {
        console.error(`[esbuild] Errors: \n${errors.join("\n")}`);
      }

      if (warnings.length) {
        console.warn(
          `[esbuild] Warnings: \n${warnings.join("\n")}`,
        );
      }

      const bundledAndMinifiedBinary = await Deno.readFile(generatedFilePath);

      const currChecksum = sha256(
        bundledAndMinifiedBinary,
      );

      if (previousChecksum.toString() === currChecksum.toString()) return;

      await Deno.writeFile(
        generatedFilePath.replace(
          "_temp/esnext",
          "_esnext",
        ),
        bundledAndMinifiedBinary,
      );
    });
  }

  site.addEventListener("beforeBuild", compilePrograms);
  site.addEventListener("afterUpdate", compilePrograms);
};
