---
layout: layouts/post.vto
title: META
templateClass: tmpl-post
order: 2
---

<style>
table, h2, p {
  align-self: baseline;
}

thead {
  font-family: var(--font-family-tertiary);
  color: var(--venom);
  text-transform: uppercase;
}

</style>

## Engineering

This website was designed and programmed by [Vic Sidious](/about), alias _@sidiousvic_. It is updated by directly modifying the [source code](https://github.com/sidiousvic/sidious.pizza). It is updated and engineered in Tokyo, Japan.

UI programs are written in a [web-friendly functional paradigm](https://github.com/sidiousvic/sidious.pizza/blob/9c3eb45f1d5c7c6483636e9fe23b54ecc3e20dd5/_includes/ts/playback.ts#L31C3-L31C3) dialect, compiled and bundled serverside into [ESNext](https://developer.mozilla.org/en-US/docs/Web/JavaScript/JavaScript_technologies_overview#standardization_process), and delivered inline with each document. Raw CSS is also bundled, minified and inlined on delivery.

Pages are composed in [.vto](vento.js.org) and [.md](https://en.wikipedia.org/wiki/Markdown) formats.

## Technologies used

|               |                                                                                                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Runtime_     | [Deno](https://deno.com/) on [Deno Deploy](https://deno.com/deploy)                                                                                                                                                        |
| _Engine(s)_   | [Lume](https://lume.land/), Web APIs                                                                                                                                                                                       |
| _Compilation_ | [TS](https://www.typescriptlang.org/), [ESBuild](https://esbuild.github.io/) and [LightningCSS](https://lightningcss.dev/)                                                                                                 |
| _Source_      | [GitHub](https://github.com/sidiousvic/sidious.pizza)                                                                                                                                                                      |
| _Development_ | [Vim](https://neovim.io/) with [lazygit](https://github.com/jesseduffield/lazygit) and [TMUX](https://github.com/tmux/tmux/wiki) on [Apple M2 Ultra](https://www.apple.com/jp/newsroom/2023/06/apple-introduces-m2-ultra/) |

## Design Principles

|           |                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------- |
| _0_&nbsp; | Use native web technologies                                                                        |
| _1_&nbsp; | Design _=_ \{ _..._, _Performance_, _Accessibility_ \}                                             |
| _2_&nbsp; | Fun to make _=_ fun to visit                                                                       |
| _3_&nbsp; | Be like [Curve Space](https://geocities.restorativland.org/ResearchTriangle/Forum/1545/index.html) |
