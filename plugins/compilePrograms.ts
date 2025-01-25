import { build, stop } from "esbuild/mod.js";
import { Event } from "lume/core/events.ts";
import { sha256 } from "sha256/mod.ts";
import Site, { SiteEventMap } from "lume/core/site.ts";
import { walkSync } from "lume/deps/fs.ts";

/**
 * Compiles TypeScript programs in directory to JavaScript using ESBuild.
 * It compares the checksum of the compiled file to the previous checksum to determine if the file should be recompiled when in dev mode.
 *
 * @param options.dirname The directory to compile TypeScript programs from.
 * @param site The site to compile TypeScript programs for.
 *
 * @bug ESBuild is loaded through WASM, and there is a bug where process doesn't exit after compilation. An escape hatch is set to exit after 1 second if the process hangs.
 */
export const compilePrograms =
  (options: { dirname?: string }) => (site: Site) => {
    const defaultOptions = {
      dirname: ".",
    };

    async function compilePrograms(e: Event) {
      console.time(`🌈 Compiled programs`);
      console.log(`🏭 Compiling programs in _includes/ts...`);

      const tsFiles = await Promise.all(
        [
          ...walkSync(
            Deno.cwd() + "/" + (options.dirname || defaultOptions.dirname),
            { includeDirs: false, includeFiles: true }
          ),
        ]
          .filter((entry) => entry.isFile)
          .map(async (entry) => ({
            path: entry.path,
            binary: await Deno.readFile(entry.path)
              .then((binary) => binary)
              .catch(() => new Uint8Array([0])),
          }))
      );

      await Promise.all(
        [...tsFiles].map(async (file) => {
          const fileName = file.path.split("/").pop();
          const prevDirSlug = "/_prev/";
          const prevFilePath = Deno.cwd() + "/_esnext" + prevDirSlug + fileName;
          const finalFilePath =
            Deno.cwd() + "/_esnext/" + fileName?.replace(".ts", ".js");
          const defaultFileBinary = new Uint8Array([0]);

          console.debug({
            filePath: file.path,
            prevFilePath,
            finalFilePath,
          });

          await Deno.mkdir(Deno.cwd() + "_esnext" + prevDirSlug, {
            recursive: true,
          }).catch(() =>
            console.debug(
              `🛃t ${prevDirSlug} directory already exists. Ignoring...`
            )
          );

          await Deno.mkdir(Deno.cwd() + "/_esnext" + prevDirSlug, {
            recursive: true,
          }).catch(() =>
            console.debug(
              `🛃t ${prevDirSlug} directory already exists. Ignoring...`
            )
          );

          const previousChecksum = sha256(
            await Deno.readFile(prevFilePath)
              .then((binary) => binary)
              .catch(() => {
                console.debug(
                  `🛃 No previous checksum found for ${prevFilePath}.`
                );
                return defaultFileBinary;
              })
          );

          const currChecksum = sha256(
            await Deno.readFile(file.path)
              .then((binary) => binary)
              .catch(() => {
                console.error(`🚨 [Deno] Error reading ${file.path}`);
                return defaultFileBinary;
              })
          );

          if (previousChecksum.toString() === currChecksum.toString()) return;

          console.log(`🔨 Compiling ${fileName}...`);

          await Deno.remove(prevDirSlug, {
            recursive: true,
          }).catch(() =>
            console.debug(
              `🛃  No ${prevDirSlug} directory found. Creating one...`
            )
          );

          await build({
            entryPoints: [file.path],
            outdir: "_esnext",
            logLevel: "error",
            color: true,
            minify: true,
            bundle: true,
          })
            .then(() => console.log(`🔨 Compiled ${file.path}!`))
            .catch((e) => {
              console.error(`🚨 [esbuild] Error compiling ${file.path}!`);
              if (e instanceof Error) console.error(e.message);
            });

          // Workaround for WASM bug where ESBuild process doesn't exit
          // https://esbuild.github.io/getting-started/#deno
          const escapeHatchTimeoutMs = 4000;
          setTimeout(() => {
            console.log(`⚠️ [esbuild] Process hanging. Exiting...`);
            stop();
          }, escapeHatchTimeoutMs);

          await Deno.remove(prevFilePath);
          await Deno.copyFile(file.path, prevFilePath).catch(() =>
            console.error(`🚨 [Deno] Error writing ${finalFilePath}`)
          );

          if (e.type === "beforeBuild")
            console.debug(
              `✅ Copied ${finalFilePath
                .split("/")
                .pop()
                ?.replace("ts", "js")}!`
            );

          if (e.type === "afterUpdate")
            console.debug(
              `♻️ Recompiled ${finalFilePath
                .split("/")
                .pop()
                ?.replace("ts", "js")}!`
            );
        })
      );

      console.timeEnd(`🌈 Compiled programs`);

      if (e.type === "afterUpdate")
        console.log(`♻️ Recompiled updated files into _esnext!`);
    }

    const isDevMode = Deno.args.includes("-s");

    console.log(
      `🔧 Programs will be compiled in ${
        isDevMode ? "DEVELOPMENT" : "PRODUCTION"
      } mode.`
    );

    if (isDevMode)
      ["beforeBuild", "afterUpdate"].map((event) =>
        site.addEventListener(event as keyof SiteEventMap, compilePrograms)
      );
    else {
      compilePrograms({ type: "beforeBuild" });
    }
  };
