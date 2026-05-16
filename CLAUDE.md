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

**v6 Gaming Theme (Retro Arcade SPA):**

The root site is a single-page arcade cabinet experience with 5 screens navigable via a bottom menu bar. No traditional scrolling — navigation is screen-based with smooth transitions.

**Screens (via `showScreen()` in `main.js`):**
1. **PLAYER 1** (`#screen-title`) — Profile/intro with pixelated photo, name, class, blinking "SELECT MODE" prompt
2. **QUEST LOG** (`#screen-quest`) — Experience timeline (data-driven from `data.json`)
3. **CHAR STATS** (`#screen-stats`) — Education block + RPG-style skill stat bars with fill animation
4. **INVENTORY** (`#screen-inventory`) — Project grid + featured 3D donut model viewer
5. **CREDITS** (`#screen-credits`) — Bio + contact links

**Styling & Theme:**
- **Fonts**: Press Start 2P (headings, nav, pixel font) + VT323 (body, CRT terminal feel) from Google Fonts CDN
- **Color tokens**: `--border` (#39ff14 neon green), `--accent` (#ff2d78 hot pink), `--accent2` (#00e5ff cyan), `--accent3` (#f1fa3c neon yellow), `--cta` (#ff6600 neon orange), dark arcade theme
- **Glow effects**: `--glow-border`, `--glow-accent`, `--glow-yellow`, `--glow-cta` for neon styling
- **Effects**: CRT scanlines (fixed overlay), neon glow via box-shadow, blinking animations, pixel borders
- **Layout**: Flex-based screens filling viewport; `.screen.active` shown, others hidden; `@keyframes screenIn` for smooth fade/scale transitions

**Vanilla JS (no jQuery/Bootstrap):**
- `showScreen(id)` — toggle active screens and nav buttons; increments score based on screen visited (PLAYER 1: 100, QUEST LOG: 250, CHAR STATS: 300, INVENTORY: 500, CREDITS: 150), no repeat scoring
- `animateStatBars()` — re-trigger stat bar fill width on CHAR STATS activation
- `loadJSON()` / `loadData()` — async XHR to fetch `data.json`
- `loadExperience()` — build experience cards DOM from data; first card labeled "CURRENT QUEST" in neon yellow with yellow left border, others labeled "▶ QUEST" in dim text
- Nav buttons wired via `initNav()` event listeners
- Score display shows in-game hi-score at top of screen

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

**Dependencies:**
- `@google/model-viewer` (CDN) — 3D donut in Inventory screen
- Google Fonts (Press Start 2P, VT323) — no local font files needed
- No bundler, no framework, no build step

**Sub-pages (`3d/`, `3d-ecommerce/`, `neon/`)** are self-contained with their own assets — they do not share CSS or JS with the root.
