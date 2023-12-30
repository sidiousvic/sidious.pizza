---
title: Phantom In The Machine
date: 2023-07-09
tags:
  - programming
  - computers
weblog: true
beta: true
draft: true
---

![A ghostly figure hovering through the void](/assets/images/phantom.gif){ optimize width=500 fetchpriority="high" }

This post is a test for the code font and highlighter.

```typescript
await Deno.mkdir("_temp/esnext", { recursive: true }).catch(() =>
  console.info(`_temp/esnext directory already exists. Ignoring...`)
);

await build({
  entryPoints: [file.path],
  outdir: "_temp/esnext",
  logLevel: "error",
  color: true,
  minify: true,
  bundle: true,
}).catch(console.error);

if (e.type === "beforeBuild") {
  console.log(`Compiled _esnext/${file.path.split("/").pop()}!`);
}

const bundledAndMinifiedBinary = await Deno.readFile(generatedFilePath)
  .then((binary) => binary)
  .catch(() => console.error(`[Deno] Error reading ${generatedFilePath}`));
```
