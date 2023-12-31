# sidious.pizza

Vic's personal cyber space.

![Preview of sidious.pizza, showing various of its screens.](assets/images/preview.gif)

## Develop

Install [Deno](https://deno.com/) and run `deno task serve` to launch watch mode.

## Content

Content can be edited directly in the appropriate `.md` files.

## Static Site Generation

Follow [Lume](https://lume.land/docs/overview/about-lume/) documentation to modify layouts, templates, processors, plugins and more.

## `CSS`

CSS stylesheets are bundled and minified with [LightningCSS](https://lightningcss.dev/) on build and [inlined with the base layout](_includes/layouts/base.vto).

The source `.css` files can be found in the [\_includes/css](_includes/css) directory. Bundled styles are generated as [\_bundle.css](_bundle.css#L20).

## `ESNext`

ESNEXT programs are compiled from Typescript into [ESNext](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview#standardization_process) on build, in order to be delivered inline from server with the document.

Source `.ts` files can be found in the [\_includes/ts](_includes/ts) folder. Compiled files are stored in the `_esnext` directory. [Here's an example of a layout using compiled files.](_includes/layouts/swims.vto#L5)

The programs themselves are mostly written in a functional style, using small utilities for piping lambdas and mutating state.

```ts
const getColorsFromStorage = pipe(
  inject(config),
  mix(registerStoredColor),
  mutate(applyStoredOrRandomColor)
);

document.addEventListener("DOMContentLoaded", getColorsFromStorage);
```

They might look a bit unlike typical DOM manipulators, but it works really well as a design constraint, making things easier to prove and to change. Also, they are fun to make! 😈

## Watch-mode compilation and bundling

The [compiler](plugins/compilePrograms.ts) and [bundler](plugins/bundleStyles.ts) plugins perform checksum comparisons to rerun on watch mode in order to reload changes live. In the compiled programs case, an untracked directory `_temp/esnext` is created as a part of this diffing process.

There might be slight bugs with this feature (cache invalidation is hard). Please report [as an issue](https://github.com/sidiousvic/sidious.pizza/issues).

## Optimizations

Processors are used to perform web optimizations on build.

For example, [this is a processor](processors/optimizePics9000.ts) to process `{ optimize }` suffixed images with HTML attributes such as `preload` and `fetchpriority` automatically.

## License

No-bullsh\*t universal use allowed. If you somehow manage to make any money with anything found here, won't say no to a beer.
