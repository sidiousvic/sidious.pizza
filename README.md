# sidious.pizza

Vic's cyber space.

<img width="400" alt="Screenshot 2024-12-27 at 10 31 52 p m" src="https://github.com/user-attachments/assets/46046032-21ff-46be-bf83-57ee90bb949b" /><img width="400" alt="Screenshot 2024-12-27 at 10 26 23 p m" src="https://github.com/user-attachments/assets/29f08917-9f4c-4289-a942-4e93486354af" />
<img width="400" alt="Screenshot 2024-12-27 at 10 30 47 p m" src="https://github.com/user-attachments/assets/a5ddef61-1841-4df5-bab4-6ffc6f198e84" /><img width="400" alt="Screenshot 2024-12-27 at 10 31 59 p m" src="https://github.com/user-attachments/assets/4509ec38-6198-4b43-a287-96c9d1875b20" />


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
