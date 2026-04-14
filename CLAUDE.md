# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML/CSS/JS personal portfolio for Liew Wei Fung (FungusGaming), hosted at https://fungusgaming.github.io/fungus-portfolio/. No build system, bundler, or package manager — open files directly in a browser or serve with any static file server.

## Running Locally

```bash
# Any static server works, e.g.:
npx serve .
# or
python -m http.server 8080
```

The root `index.html` is the live production page. Data is loaded at runtime via XHR from `data/data.json` — this requires an HTTP server (not `file://` protocol) for CORS-free loading.

## Repository Structure

The repo contains the live site at root plus several experimental sub-pages:

| Path | Purpose |
|------|---------|
| `index.html` / `main.js` / `source.css` | Live portfolio (root) |
| `data/data.json` | Experience timeline data consumed by `main.js` |
| `v4/` | Earlier version of the portfolio (static snapshot) |
| `3d/` | Standalone 3D donut viewer using `@google/model-viewer` |
| `3d-ecommerce/` | Product card concept using `@google/model-viewer` |
| `neon/` | Neon-styled resume variant |

## Architecture

**Root site (`index.html` + `main.js`):**
- Experience timeline is data-driven: add/edit entries in `data/data.json` only — the DOM is built entirely by `loadExperience()` in `main.js`
- The 3D donut hero uses `@google/model-viewer` and responds to scroll events via a custom `finger0` interaction object passed to `modelViewerPrompt.interact()`
- Dependencies loaded from CDN: Bootstrap 5, jQuery, Font Awesome, `@google/model-viewer`

**Data schema (`data/data.json`):**
```json
{
  "experience": [{
    "content": { "title": "", "company": "" },
    "description": ["bullet 1", "bullet 2"],
    "companyLink": "https://...",
    "from": "YYYY-MM-DD",
    "to": "YYYY-MM-DD"   // empty string = Present
  }]
}
```

**Sub-pages (`3d/`, `3d-ecommerce/`, `neon/`)** are self-contained with their own assets — they do not share CSS or JS with the root.
