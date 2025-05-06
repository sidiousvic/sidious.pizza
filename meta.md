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
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Mondwest', serif;
  margin-bottom: 2rem;
  color: var(--color-main);
  text-shadow: 0 0 12px rgba(var(--color-main-rgb), 0.7);
}

p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

ul, ol {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

pre {
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(0, 34, 0, 0.4);
  border-radius: 8px;
  overflow-x: auto;
}

table {
  margin: 2rem 0;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

table td, table th {
  padding: 1rem;
  border-bottom: 1px solid rgba(var(--color-main-rgb), 0.2);
}

table tr:last-child td {
  border-bottom: none;
}

table th {
  text-align: left;
  font-weight: normal;
  color: var(--color-main);
  text-shadow: 0 0 12px rgba(var(--color-main-rgb), 0.7);
  background: rgba(0, 34, 0, 0.4);
  font-family: 'Mondwest', serif;
}

table th:first-child {
  text-align: left;
}

table th:last-child {
  text-align: left;
}
</style>

<span style="font-family: var(--font-family-title);color:var(--venom)">SIDIOUS.PIZZA</span> is designed and built by [Vic](/vic), from a small apartment and various coffee and booze joints in Tokyo.

The website is built with web-performance, accessibility, and original internet **fun**<sup>`TM`</sup> as its core principles.

## Technologies used

| Area | Tech |
|------|------|
| _Runtime_     | [Deno](https://deno.com/) on [Deno Deploy](https://deno.com/deploy) |
| _Engine(s)_   | [Lume](https://lume.land/), Web APIs |
| _Compilation_ | [TS](https://www.typescriptlang.org/), [ESBuild](https://esbuild.github.io/) and [LightningCSS](https://lightningcss.dev/) |
| _Source_      | [GitHub](https://github.com/sidiousvic/sidious.pizza) |
| _Tooling_     | [NVIM](https://neovim.io/) with [lazygit](https://github.com/jesseduffield/lazygit) and [TMUX](https://github.com/tmux/tmux/wiki) on [Apple M2 Ultra](https://www.apple.com/jp/newsroom/2023/06/apple-introduces-m2-ultra/) (Bloostream alcohol 0.04% ~ 0.05%) |
| _Graphics_    | [DALL・E 2 by OpenAI](https://openai.com/dall-e-2) |

## Technical Features

### Performance Optimizations
- **CSS Optimization**: Using LightningCSS for minification and modern CSS features
- **JavaScript Bundling**: ESBuild for fast TypeScript compilation and tree-shaking
- **Font Loading**: Strategic font preloading with `font-display: swap` for optimal performance
- **Asset Optimization**: Images and fonts are optimized and served with appropriate caching headers

### Interactive Features
- **Grayscale Mode**: Press 'g' to toggle a grayscale filter (preference saved in localStorage)
- **Dynamic Navigation**: Responsive navigation with smooth transitions and mobile support
- **Scanline Effects**: CSS-based CRT scanline simulation with subtle animations
- **Keyboard Navigation**: Full keyboard support for accessibility and power users

### Design System
- **CSS Variables**: Comprehensive color and typography system using CSS custom properties
- **Responsive Design**: Mobile-first approach with carefully crafted breakpoints
- **Typography**: Custom font stack with fallbacks for optimal rendering
- **Animations**: Subtle animations and transitions for enhanced user experience

### Development Workflow
- **TypeScript**: Strong typing for better code quality and maintainability
- **Modular CSS**: Component-based CSS architecture with clear separation of concerns
- **Build Pipeline**: Automated build process with Deno and Lume
- **Version Control**: Git-based workflow with automated deployments

### Accessibility
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **ARIA Attributes**: Enhanced accessibility for interactive elements
- **Keyboard Navigation**: Full keyboard support throughout the site
- **Color Contrast**: Careful consideration of color contrast ratios

### Fun Features
- **Easter Eggs**: Hidden features and surprises throughout the site
- **Dynamic Effects**: Interactive hover states and animations
- **Custom Cursor**: Unique cursor interactions in certain sections
- **Theme Variations**: Multiple visual themes and effects

## Architecture

The website follows a modular architecture with clear separation of concerns:

```bash
sidious.pizza/
├── _includes/          # Reusable components and templates
│   ├── css/           # Stylesheets organized by feature
│   ├── ts/            # TypeScript source files
│   └── layouts/       # Page layout templates
├── _esnext/           # Compiled JavaScript
├── assets/            # Static assets (images, fonts)
├── processors/        # Custom Lume processors
└── filters/           # Template filters
```

Each component is self-contained with its own styles and functionality, making the codebase maintainable and scalable.
