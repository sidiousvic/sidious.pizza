# sidious.pizza

Vic's cyber space.

![Preview of sidious.pizza, showing various of its screens.](assets/images/preview.gif)

## Develop

Install [Deno](https://deno.com/) and run `deno task serve` to launch watch mode.

Follow [Lume](https://lume.land/docs/overview/about-lume/) documentation to modify layouts, templates, processors, plugins and more.

<details>
  <summary>⚙️</summary>

### `CSS`

CSS stylesheets are bundled and minified with [LightningCSS](https://lightningcss.dev/) on build and [inlined with the base layout](_includes/layouts/base.vto).

The source `.css` files can be found in the [\_includes/css](_includes/css) directory. Bundled styles are generated as [\_bundle.css](_bundle.css#L20).

### `ESNext`

ESNEXT programs are compiled from Typescript into [ESNext](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview#standardization_process) on build, in order to be delivered inline from server with the document.

Source `.ts` files can be found in the [\_includes/ts](_includes/ts) folder. Compiled files are stored in the `_esnext` directory. [Here's an example of a layout using compiled files.](_includes/layouts/swims.vto#L5)

Programs are written in a functional dialect, using small utilities for piping lambdas and mutating state.

They might look a bit unlike typical DOM manipulators, but it works really well as a design constraint, making things easier to prove and to change. Also, they are fun to make! 😈

### Watch mode

The [compiler](plugins/compilePrograms.ts) and [bundler](plugins/bundleStyles.ts) plugins perform checksum comparisons to rerun on watch mode in order to reload changes live. In the compiled programs case, an untracked directory `_temp/esnext` is created as a part of this diffing process.

</details>

## Specification

The specification is will be available soon. Stay tuned.

## License

MIT License

Copyright (c) 2024 Victor René Molina Rodriguez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
