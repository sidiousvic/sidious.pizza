# Maintenance Notes

## Structure
- Pages use `layout: base.eta`; article pages extend `article.eta` (thin wrapper that renders the article header and content). Project/book index pages use `book_index.eta` and `project_index.eta`, also on top of `base.eta`.
- Shared assets live in `_includes/{styles,scripts,fonts,images}` and are copied to `styles/` and `scripts/` at build time via `_config.ts`.
- Client behavior is centralized in `/scripts/site.js` (theme toggle, menu overlay, header state, nav highlighting).
- Styling is consolidated in `/styles/styles.css`; design tokens live in the `:root` variables at the top of the file.

## Recent Refactors
- Extracted all inline layout scripts into `/scripts/site.js` for easier maintenance and to keep the layouts declarative.
- Consolidated article layout to inherit from `base.eta` (shared header/footer/scripts), removing duplicated chrome.
- Cleaned unused styles (e.g., `menu-notch`), removed stray inline console logging, and added a dedicated `home-shell` class for homepage spacing.
- Adjusted mobile UX defaults: no sticky header, no body blur, and no overscroll containment on small screens.
- Grain effect has been removed for now to avoid scroll jitter across devices.

## Conventions
- Prefer adding page-specific structure via `shellClass` and styling in `styles.css` rather than inline styles.
- Keep new client logic in `/scripts/site.js` or a sibling module instead of embedding scripts in templates.
- Use the design tokens (`:root` variables) for colors, spacing, and typography; avoid one-off inline values.

## Follow-ups
- If mobile scroll jitter ever returns, consider simplifying layout (e.g., drop `.page` flex on mobile) as a first debug step.
- Consider splitting `styles.css` into tokens/layout/components if it keeps growing.
