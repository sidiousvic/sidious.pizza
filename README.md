# sidious.pizza

Vic's cyber space.

![Preview of sidious.pizza, showing various of its screens.](assets/images/preview.gif)

## Develop

Install [Deno](https://deno.com/) and run `deno task serve` to launch watch mode.

Follow [Lume](https://lume.land/docs/overview/about-lume/) documentation to modify layouts, templates, processors, plugins and more.

### `CSS`

CSS stylesheets are bundled and minified with [LightningCSS](https://lightningcss.dev/) on build and [inlined with the base layout](_includes/layouts/base.vto).

The source `.css` files can be found in the [\_includes/css](_includes/css) directory. Bundled styles are generated as [\_bundle.css](_bundle.css#L20).

### `ESNext`

ESNEXT programs are compiled from Typescript into [ESNext](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview#standardization_process) on build, in order to be delivered inline from server with the document.

Source `.ts` files can be found in the [\_includes/ts](_includes/ts) folder. Compiled files are stored in the `_esnext` directory. [Here's an example of a layout using compiled files.](_includes/layouts/swims.vto#L5)

Programs are written in a functional dialect and might look a bit unlike typical DOM manipulators, but they work really well making things easier to prove and to change. Also, they are fun to make. 😈

### Watch mode

The [compiler](plugins/compilePrograms.ts) and [bundler](plugins/bundleStyles.ts) plugins perform checksum comparisons to rerun on watch mode in order to reload changes live. In the compiled programs case, an untracked directory `_temp/esnext` is created as a part of this diffing process.

</details>

## License

MIT License

Copyright (c) 2024 Victor René Molina Rodriguez
