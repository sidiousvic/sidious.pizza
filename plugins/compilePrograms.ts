import { build } from "esbuild/mod.js";
import { Event } from "lume/core/events.ts";
import { sha256 } from "sha256/mod.ts";
import Site from "lume/core/site.ts";
import { walkSync } from "lume/deps/fs.ts";

/**
 * Compiles TypeScript programs in _includes/ts to JavaScript.
 */
export const compilePrograms =
  (options: { dirname?: string }) => (site: Site) => {
    const defaultOptions = {
      dirname: ".",
    };

    async function compilePrograms(e: Event) {
      console.log(`🏭 Compiling programs in _includes/ts...`);

      const tsFiles = await Promise.all(
        Array.from(
          walkSync(
            Deno.cwd() + "/" + (options.dirname || defaultOptions.dirname),
            { includeDirs: false, includeFiles: true }
          )
        )
          .filter((entry) => entry.isFile)
          .map(async (entry) => ({
            path: entry.path,
            binary: await Deno.readFile(entry.path)
              .then((binary) => binary)
              .catch(() => new Uint8Array([0])),
          }))
      );

      [...tsFiles].map(async (file) => {
        const generatedFilePath =
          "_temp/esnext/" + file.path.split("/").pop()?.replace(".ts", ".js");

        const previousChecksum = sha256(
          await Deno.readFile(generatedFilePath)
            .then((binary) => binary)
            .catch(() => new Uint8Array([0]))
        );

        await Deno.remove(Deno.cwd() + "_temp/esnext", {
          recursive: true,
        }).catch(() => "🛃 No _temp/esnext directory found. Creating one...");

        if (e.type === "beforeBuild") {
          console.debug(
            `🛠️  Compiling _includes/ts/${file.path.split("/").pop()}...`
          );
        }

        await Deno.mkdir(Deno.cwd() + "/_temp/esnext", {
          recursive: true,
        }).catch(() =>
          console.debug(`🛃 _temp/esnext directory already exists. Ignoring...`)
        );

        await build({
          entryPoints: [file.path],
          outdir: "_temp/esnext",
          logLevel: "error",
          color: true,
          minify: true,
          bundle: true,
        }).catch(console.error);

        if (e.type === "beforeBuild")
          console.debug(`🏭 Compiled _esnext/${file.path.split("/").pop()}!`);

        const bundledAndMinifiedBinary = await Deno.readFile(generatedFilePath)
          .then((binary) => binary)
          .catch(() =>
            console.error(`🚨 [Deno] Error reading ${generatedFilePath}`)
          );

        const currChecksum = sha256(
          (bundledAndMinifiedBinary as Uint8Array) || new Uint8Array([0])
        ).toString();

        if (previousChecksum.toString() === currChecksum.toString()) return;

        await Deno.writeFile(
          generatedFilePath.replace("_temp/esnext", "_esnext"),
          bundledAndMinifiedBinary as Uint8Array
        ).catch(() =>
          console.error(
            `🚨 [Deno] Error writing ${generatedFilePath.replace(
              "_temp/esnext",
              "_esnext"
            )}`
          )
        );

        if (e.type === "afterUpdate")
          console.debug(
            `♻️  Recompiled _esnext/${file.path
              .split("/")
              .pop()
              ?.replace("ts", "js")}!`
          );
      });

      if (e.type === "beforeBuild")
        console.log(`🌈 Compiled all files into _esnext/ts!`);

      if (e.type === "afterUpdate")
        console.log(`♻️  Recompiled updated files into _esnext/ts!`);
    }

    site.addEventListener("beforeBuild", compilePrograms);
    site.addEventListener("afterUpdate", compilePrograms);
  };
