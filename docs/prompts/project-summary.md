# Project summary prompt

Use this to get card info for a project that lives in another repo, so it can be added to the **INVENTORY** screen (`index.html`, `#screen-inventory`).

## How to use

1. Open Claude Code (or any AI agent with file access) in the other project's repo.
2. Paste the prompt below. Before you send it, replace `<EXISTING_CARDS>` with the names and live URLs of the cards already in the inventory, so the agent can tell whether this is a new project or an update to an existing one.
3. Paste the reply into a Claude session in this repo and ask it to add or update the inventory card.

Cards come from the `projects` array in `data/data.json` and are listed in array order, so put the newest first. The length limits match the inventory card layout: Press Start 2P / VT323 fonts on narrow `.item-slot` cards. Reply fields map to JSON keys like this:

| Reply field | `projects[]` key | On the card |
|---|---|---|
| `TAG` | `tag` | small label at the top |
| `NAME` | `name` | title |
| `LIVE_URL` | `liveUrl` | links the title with `►`; leave as `""` for no link |
| `TAGLINE` | `description` | one-line description |
| `FEATURES` | `features` | 3 bullets (`▪`) |
| `REPO_URL` | `repoUrl` | `[ GITHUB ]` link; leave as `""` when the repo is private |

## Prompt

````text
Read this repository and write a summary of the project for a card in my portfolio. Work out every answer from the code, config and docs (README, package.json, app manifest, deploy/hosting config, git remote, recent git log). Don't guess. If you can't confirm something, write UNKNOWN and say what you checked.

My portfolio repo is public, so leave out secrets, API keys, private URLs, internal or customer names, and anything that isn't meant to be public.

Reply with exactly this block and nothing before it:

NAME: <the project's name as users see it, ≤ 16 characters>
TAG: <one of: SIDE PROJECT / FINAL YEAR PROJECT / UNIVERSITY WORKSHOP / OPEN SOURCE / FREELANCE / other short label>
TAGLINE: <one sentence on what it does for the user, ≤ 50 characters, no buzzwords>
FEATURES:
- <the main stack, e.g. "Ionic React (PWA)", ≤ 24 characters>
- <the most useful thing a user can do, ≤ 24 characters>
- <the next most useful thing a user can do, ≤ 24 characters>
LIVE_URL: <public deployed URL, or NONE>
REPO_URL: <public GitHub URL from the git remote, or PRIVATE if the repo isn't public, or NONE>
STATUS: <active / maintained / archived, based on the git log dates>
LAST_UPDATED: <date of the latest commit, YYYY-MM-DD>
MATCHES_EXISTING: <the name of the existing card this project is the same as or a new version of, or NONE; say why in one line. Existing cards: <EXISTING_CARDS>>

EXTRA_FEATURES:
- <up to 3 more user-facing features worth showing, ≤ 24 characters each>

NOTES:
<2–4 lines: anything that would make the card better or that I should decide, e.g. a screenshot or icon in the repo I could use, a project name that differs between the README and the app, or a live URL that looks down.>

Rules: each feature names something a user can do or see, not something internal ("Monthly budget limits", not "Redux store"). Stick to the character limits; they're for a small pixel-font card.
````

### Example `<EXISTING_CARDS>` value (as of 2026-11)

```text
"Budget" (https://budget-fung-public.web.app), "Service Provider" (no live URL), "iRead" (no live URL)
```
