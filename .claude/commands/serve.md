---
description: Serve the project with `npx serve .` and share the resume link
---

Serve this project locally and give me the link to the resume.

## Steps
1. From the repo root, check whether a `serve` process is already running (`lsof -iTCP -sTCP:LISTEN | grep -i node`, or check a previously started background task). If one is serving this repo, reuse it instead of starting a second server.
2. Otherwise start the server in the background with the Bash tool and `run_in_background: true`:
   `npx --yes serve .`
   (`--yes` stops npx from waiting on an install prompt.)
3. Read the server's startup output to get the real local address. `serve` defaults to port 3000 but picks another port if that one is busy, so never assume the port. If the output shows an error or no address, say so and show the error.
4. Confirm the resume page responds: `curl -s -o /dev/null -w "%{http_code}" <resume-url>` must return 200.

## Reply
Reply with the links, taken from the real port in the server output:
- **Resume:** `http://localhost:<port>/resume/` (the page is `resume/index.html`; there is no `resume.html`)
- **Portfolio:** `http://localhost:<port>/`

Tell me how to stop the server (stop the background task, or `pkill -f "serve ."`).

## Notes
- The resume loads `resume.json` over `fetch`, so it must be served over HTTP and won't work from `file://`.
- `serve` may drop `.html` and redirect (clean URLs); the `/resume/` link above is unaffected.
- This is local only. Don't expose the server beyond localhost and don't deploy anything.
