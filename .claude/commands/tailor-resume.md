---
description: Tailor resume/resume.json to a pasted job scope
argument-hint: <paste job description>
---

Tailor `resume/resume.json` to the job scope below.

## Sources
- `resume/experience.md` is the master record. Every claim must come from it.
- `resume/resume.json` is the file to edit. Keep the existing schema and key names exactly:
  `basics`, `summary`, `skills[{category, items}]`, `experience[{company, companyLink, location, roles, from, to, bullets}]`, and the remaining sections.
- Ignore every `TODO` in `experience.md`. TODOs are unverified and internal. Never copy them into the resume.

## Steps
1. **Analyze the job scope.** List the must-have skills, nice-to-haves, seniority signals, domain, and keywords.
2. **Map to my record.** For each requirement, find the matching evidence in `experience.md`. Note the gaps.
3. **Edit `resume.json`:**
   - `basics.title`: adjust only if it is honest for the role (e.g. "Senior Frontend Engineer" vs "Senior Software Engineer").
   - `summary`: 2-3 sentences. Lead with the job's top requirement and mirror its keywords where they are true. Keep the years of experience accurate.
   - `skills`: order from best to neutral. Put the category with the job's most important keywords first, and within each category put must-have keywords before nice-to-haves and general skills. Drop irrelevant items. Add an item only if it appears in `experience.md`.
   - `projects`: order from best to neutral by relevance to the job. Drop the least relevant first if space is tight.
   - Keep `experience[]` companies, and each company's `roles`, in reverse chronological order. Best-to-neutral ordering applies to bullets, skills and projects, not companies, because reordering companies would misrepresent the career timeline.
   - `experience[].bullets`:
     - Keep 3-5 bullets for recent roles and 2-3 for older roles.
     - Order bullets from best to neutral within each role. First the bullet that best proves the job's top must-haves or shows the strongest verified impact and seniority, then supporting evidence for other requirements, and last the general but still true bullets. Place a merged bullet by its strongest part. Readers skim the top lines, so the best evidence goes first.
     - Reword bullets to use the job's terminology.
     - Each bullet is one to two lines: action verb + what + tech + outcome. Never more than two lines.
     - You may swap in other bullets from `experience.md`.
     - **Combine related bullets to save space** (see "Combining experience" below) before dropping any relevant content.
   - Do not change companies, titles, or dates.
4. **Keep it one page.** Cut the least relevant content before adding anything.
5. **Start the background review.** As soon as the edit in step 3 is done, launch the `resume-reviewer` subagent with the Agent tool and `run_in_background: true`. If that agent type isn't available in this session, use a `general-purpose` agent and give it the full contents of `.claude/agents/resume-reviewer.md` as its instructions. Pass it the complete job scope text. Don't wait for it: carry on with step 6 while it runs. Never fabricate its result; if it hasn't finished when you are ready to report, wait for its notification. If step 6 trims or changes `resume.json` after the review started, use SendMessage to tell the reviewer to re-read the file, so the score reflects the final resume.
6. **Verify the one-page fit (mandatory).** Never report done without a passing result. Don't just count PDF pages: `resume.css` prints a fixed A4 sheet with `overflow: hidden`, so a PDF is always 1 page even when content is silently cut off. Measure overflow instead:
   1. Serve the folder: `cd resume && python3 -m http.server 8765` (run in the background, kill it afterwards).
   2. Write a throwaway Playwright script in the scratchpad directory (not in the repo). Use the Playwright MCP browser tools if they are available; otherwise use `npx -y playwright` (if Chromium is missing, run `npx -y playwright install chromium` first). The script must:
      - open `http://localhost:8765/index.html` in a viewport at least 1200px wide (the A4 layout only applies above 840px) and wait for `document.fonts.ready` and for `#resume` to lose `aria-busy`;
      - read `#fit-status` text and whether `#resume` has the class `is-over`;
      - compute the true free space: `spare = A4 height px - (lastElementChild.bottom - #resume.top + #resume padding-bottom)`, where A4 height px is the rendered height of a `297mm` probe element. Do not use `scrollHeight`: `.page` has `min-height: 297mm`, so `scrollHeight` never drops below A4 height and hides how much room is left;
      - call `page.emulateMedia({ media: 'print' })`, repeat the `scrollHeight` measurement, and also run `page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true })`;
      - confirm the Inter web font actually loaded (`document.fonts.check('12px Inter')`). If it fell back to another font, say so, because the measurement is not reliable.
   3. **Pass criteria:** `#fit-status` reads "Fits on one A4 page", `is-over` is absent, and `spare >= 8px` in both screen and print media (the margin absorbs font-rendering differences between browsers).
   4. **If it fails:** first combine related bullets within a role (see "Combining experience"), then trim the least relevant content in `resume.json` (lowest-relevance bullets first, then skill items, then summary length), and re-run the check. Repeat up to 3 times.
   5. **Never fix overflow by editing CSS.** Don't shrink fonts, margins or line height, and don't touch `resume.css`, `resume.js` or `index.html`.
   6. If it still fails after 3 rounds, or the browser can't be run, stop and say so. Do not claim the resume fits.

## Combining experience
Merge bullets to save space, but keep the result professional, effective and strictly true. Only combine within one role (one `experience[]` entry). Never merge across companies or roles, and never merge companies themselves: company names, titles and dates stay exactly as they are.

Merge a group of bullets only when they share a theme, such as the same product area, the same technology, or the same kind of work (for example, build tooling and CI/CD pipelines, or UI features and design collaboration).

How to merge well:
- Lead with the strongest action verb and the most job-relevant result. Fold the supporting details in as a clause, not a second sentence.
- Keep each fact attached to what it was true of. Don't let a technology, scale or outcome from one bullet attach itself to another activity.
- Keep the original qualifiers ("maintain", "contributed", "thousands of", "approximately"). Don't upgrade them: maintain is not own, contribute is not lead, and estimates stay approximate.
- Keep every merged bullet to two lines at most and readable at a glance: no run-on lists or stacked semicolons. If it needs more, split it back or cut the weakest clause.
- Keep the same tense as the role (present for the current job, past for old jobs).
- Don't combine just to fit in extra keywords. A merged bullet must still say something specific.

Example (true to `experience.md`): "Automate package bundling with Gulp and Webpack, and maintain Bamboo and Azure DevOps pipelines for iOS, Android and Electron builds." combines three build and CI/CD facts into one bullet. A bad merge pulls facts from different roles into one claim, such as crediting Kaodim's React Native work to Appspace.

For older roles that are short already (internships or one or two bullets), condense to one bullet that keeps the technologies and the role's scope. Don't pad it.

## Hard rules
- **Merging never adds claims.** After combining, every statement and every technology in a merged bullet must still be traceable to a single role in `experience.md`. If you can't trace a clause, remove it.
- **No fabrication.** Don't invent skills, metrics, tools, titles, or years. If the job asks for something I don't have, leave it out and list it as a gap. Don't stretch the truth.
- **Confidentiality.** This repo is public. Do not add internal details such as exact metrics, team size or structure, customer names, internal tools or URLs, or unreleased features. Keep to the level of detail on LinkedIn. Existing wording like "thousands of devices" and "millions of repeat downloads" is fine.
- **Keyword mirroring must be truthful.** Use the job's wording only when it describes something I actually did.
- Don't alter the JSON structure, and make sure the file is still valid JSON afterwards (`python3 -m json.tool resume/resume.json`).
- Don't touch other files unless I ask. The only files you may create are throwaway test scripts in the scratchpad directory.

## Output
1. Edit `resume.json` in place.
2. Then reply with:
   - **Score: X/10** (first line of the reply): the `resume-reviewer`'s score for the final `resume.json`, copied as given and not adjusted or inflated. Follow it with the reviewer's one-line verdict, its unsupported-claim and confidentiality flags (or "None"), and its top 3 improvements.
   - **Match summary:** the job's top 5 requirements and how the resume covers each.
   - **Changes:** a short list per section of what changed and why.
   - **Fit test:** the measured numbers (status text, spare px in screen and print media, font loaded yes/no, PDF page count, rounds of trimming). Say plainly if it did not pass.
   - **Gaps:** requirements I don't meet, to handle in a cover letter or interview.
   - **Questions:** anything you need me to confirm before it goes into the record.
   If the reviewer reports an unsupported claim or a confidentiality flag, fix `resume.json` first, re-run the fit test, and have the reviewer re-score before replying. If the reviewer couldn't run, write "Score: not available" and say why.

## Job scope
$ARGUMENTS
