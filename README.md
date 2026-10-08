# Ahron — Creative portfolio

A responsive static portfolio for development, videography, and video editing. Open `dist/index.html` in a browser, or run `node preview.mjs` and visit the printed local address.

## Personalize before sharing

- Set your display name and hiring email in `dist/content.js`. Until an email is supplied, inquiries can only be downloaded as project briefs; nothing is sent.
- Add future projects by editing their visible cards in `dist/index.html` and detail content in `dist/content.js`.
- Current work includes two published editing reels and three public GitHub projects.
- Update the biography, page title, description, and copyright name as needed.

The inquiry form opens the visitor’s email application when configured. It has no database or server-side submission service.

## Files

- `dist/index.html`: page structure and content
- `dist/styles.css`: responsive design
- `dist/content.js`: personal details and project descriptions
- `dist/app.js`: filters, accessible dialogs, and inquiry behavior

All `dist` files can be hosted by a static website provider. The font stylesheet uses Google Fonts with local system fallbacks.
