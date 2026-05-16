# v6 Gaming Theme — Retro Arcade Portfolio

## Context
The current portfolio is a standard scrollable single-page site. The goal is to redesign the root-level `index.html`, `source.css`, and `main.js` into an interactive retro arcade experience. Instead of scrolling, the whole page becomes one "game screen" and users navigate between sections by clicking arcade-style menu buttons — like switching screens in a classic arcade game. This makes the portfolio memorable and reflects the user's identity as a gamer-developer.

---

## Design Direction: Retro Arcade / Pixel

### Color Palette
| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#0a0a0a` | Page background (near-black) |
| `--screen-bg` | `#0d1117` | Content screen background |
| `--border` | `#39ff14` | Neon green — primary border/glow |
| `--accent` | `#ff2d78` | Hot pink — interactive highlights |
| `--accent2` | `#00e5ff` | Cyan — secondary accent |
| `--text` | `#e0e0e0` | Body text |
| `--text-dim` | `#888` | Secondary text |

### Typography
- **Press Start 2P** (Google Fonts) — headings, labels, nav items (classic arcade pixel font)
- **VT323** (Google Fonts) — body text, descriptions, timeline entries (CRT terminal feel, very readable at body sizes)
- Drop BungeeHairline in favor of these two

### Visual Effects
- CRT scanline overlay (repeating-linear-gradient pseudo-element on the screen)
- Neon glow on borders and active states (`box-shadow` with green/pink)
- Blinking cursor animation on the title screen
- Pixel-style borders using box-shadow stacking
- Screen transition: brief `opacity` fade + `scale(0.98)` on screen swap

---

## Architecture: Single-Screen SPA

### Concept
The entire page is one viewport. A fixed "arcade cabinet" frame wraps a content area. Menu navigation (styled as arcade buttons or a game menu list) swaps which "screen" is visible using a `data-active` class toggle in JS. No full-page scroll.

### Screen Map
| Screen ID | Arcade Label | Content |
|-----------|-------------|---------|
| `screen-title` | PLAYER 1 | Profile photo, name, title, blinking "SELECT MODE ▼" |
| `screen-quest` | QUEST LOG | Work experience timeline (data-driven from `data.json`) |
| `screen-stats` | CHAR STATS | Education + skills stat bars |
| `screen-inventory` | INVENTORY | Project cards + 3D donut model viewer |
| `screen-credits` | CREDITS | About me + contact links |

### Navigation
Fixed bottom bar with 5 buttons styled as arcade menu items:
```
[ PLAYER 1 ]  [ QUEST LOG ]  [ CHAR STATS ]  [ INVENTORY ]  [ CREDITS ]
```
Active button gets neon green glow + `▶` prefix. Clicking fires `showScreen(id)`.

---

## File Changes

### `index.html`
- Replace all sections with `<div class="screen" id="screen-*">` wrappers
- Add `<nav class="arcade-nav">` with 5 buttons
- Add Google Fonts import for Press Start 2P + VT323
- Wrap everything in `<div class="arcade-cabinet">`
- CRT scanline overlay via `<div class="scanlines"></div>`
- Keep `<model-viewer>` in the Inventory screen
- Keep `#experience-container` div (main.js targets this)

### `source.css`
- Full rewrite: dark theme, CSS variables, arcade styling
- `.arcade-cabinet` — full viewport frame
- `.screen` — `display: none` by default; `.screen.active` — `display: block` (or flex)
- `.arcade-nav` — fixed bottom bar with flex button row
- `.nav-btn` — pixel-bordered buttons with hover/active neon states
- `.stat-bar` — RPG-style progress bar for skills
- `.quest-card` — styled experience card (replaces plain `.experience-card`)
- CRT scanline pseudo-element on `.arcade-cabinet::before`
- Screen transition keyframes (`@keyframes screenIn`)

### `main.js`
- Add `showScreen(id)` function — removes `.active` from all screens, adds to target
- Wire nav button click events to `showScreen()`
- Default: show `screen-title` on load
- `loadExperience()` unchanged — still builds DOM from `data.json`
- Remove jQuery dependency (use vanilla `DOMContentLoaded`)

---

## Screen Details

### PLAYER 1 (Title Screen)
```
┌─────────────────────────────────────┐
│  ██ LIEW WEI FUNG                   │
│     FRONTEND DEVELOPER              │
│     MALAYSIAN                       │
│                                     │
│  [profile photo — pixel-bordered]   │
│                                     │
│  ▶ SELECT MODE ▼  (blinking)        │
└─────────────────────────────────────┘
```

### QUEST LOG (Experience)
- Each job = a "quest card" with neon border
- Header: `▶ QUEST: Software Engineer I`
- Sub: company name + duration badge
- Body: bullet list of achievements

### CHAR STATS (Education + Skills)
- Education block at top
- Skill stat bars (HTML/CSS/JS/React etc.) with fill animation on screen activation
- Values hardcoded in HTML (static content)

### INVENTORY (Projects + 3D Donut)
- Grid of project cards styled as "item slots"
- 3D donut `<model-viewer>` shown as a special featured item card
- Hover: neon border glow

### CREDITS (About + Contact)
- Short bio text
- Contact links styled as retro menu items with `>` prefix

---

## Verification
1. Open `index.html` via local HTTP server (`npx serve .`)
2. Confirm default screen is PLAYER 1 on load
3. Click each nav button — verify screen switches with transition, no layout breaks
4. Confirm experience cards render from `data/data.json`
5. Confirm 3D donut loads in INVENTORY screen
6. Test on mobile (375px) — nav should stack or scroll horizontally
7. Check font loading (Press Start 2P + VT323 from Google Fonts CDN)

---

## Implementation Status: Complete ✓

**Completed 2025-05-16:**

- `index.html` — Full rewrite as retro arcade SPA with 5 game screens and bottom navigation bar
- `source.css` — Complete redesign with dark arcade theme, CRT scanlines, neon glows, CSS variables, screen transitions
- `main.js` — Vanilla JS implementation: `showScreen()` screen switching, `animateStatBars()` for stat fill animation, nav wiring, data loading
- **Fonts**: Integrated Press Start 2P + VT323 from Google Fonts CDN
- **Removed dependencies**: Bootstrap 5, jQuery, Font Awesome, custom scroll handlers
- **Verified**: All 5 screens render, navigation functions, experience cards load from data.json, 3D donut displays, stat bars animate on activation

The portfolio is now a memorable retro arcade gaming experience reflecting FungusGaming's identity as a gamer-developer.
