---
layout: layouts/base.vto
title: meta
---

# Meta

<p class="terminal-prompt">cat /proc/website/info</p>

```
Generator: Lume Static Site Generator
Framework: Deno + TypeScript
Templating: Viento (.vto)
Styling: Vanilla CSS (terminal theme)
Font: JetBrains Mono
Hosting: TBD
Repository: TBD
```

<p class="terminal-prompt">grep -r "philosophy" ~/website/design/</p>

This website is designed to evoke the feeling of a terminal session - a place where ideas are explored through text, code, and structured thinking.

## Design Principles

- **Monochrome aesthetics**: Clean white text on dark background
- **Monospace typography**: Everything in JetBrains Mono for consistency
- **Terminal metaphors**: Commands, file listings, system outputs
- **Minimal interface**: Focus on content over decoration
- **Responsive design**: Works on all screen sizes

## Technical Details

Built with [Lume](https://lume.land/), a fast and flexible static site generator for Deno. All content is written in `.vto` (Viento) format, allowing for both Markdown-like simplicity and HTML flexibility.

The status bar shows real-time Tokyo time and maintains the terminal illusion with system-like information.

<p class="terminal-prompt">uptime</p>

```
Site last updated: {{ date | date('YYYY-MM-DD HH:mm:ss') }}
```

<p class="terminal-prompt">echo $MOTTO</p>

Simple tools, thoughtful design, authentic content.