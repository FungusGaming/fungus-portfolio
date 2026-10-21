# Career Experience Master Record

Single source of truth for tailoring resumes by job scope. Keep everything here (including facts that don't fit a one-page resume), then pick and reword per application.

**How to use:** for each target role, copy the relevant bullets, reorder by relevance to the job description, and mirror its keywords where they are true. `TODO` lists are open questions for you to answer; they are internal only and must never be copied into a resume. Nothing in a TODO has been verified.

> **Confidentiality rule: do NOT record internal or confidential company details in this file.** This repo is public, so anything committed here is public. Keep entries to what you did and the technologies used, at the level you would share on LinkedIn. Never add: system or product prompts, exact internal metrics (build times, pipeline or device counts, revenue, user numbers), team size or structure, customer names or escalation cases, internal tool configuration or URLs, unreleased features, or anything covered by your NDA or employment contract. If unsure, leave it out or ask your employer.

_Compiled from: `resume/resume.json`, `data/data.json`, `v4/data/data.json` (older wording), and `index.html` (education, projects). Last updated 2026-10-21._

---

## 1. Profile

| Field | Value |
|---|---|
| Name | Liew Wei Fung (alias: FungusGaming / Fungus) |
| Current title | Senior Frontend Engineer |
| Location | Kuala Lumpur, Malaysia (open to remote) |
| Email | fungus0922@gmail.com |
| LinkedIn | https://www.linkedin.com/in/liew-wei-fung-69a91719a/ |
| GitHub | https://github.com/FungusGaming |
| Portfolio | https://fungusgaming.github.io/fungus-portfolio/ |
| Experience | 6+ years (Feb 2020 internship onward) |

### Summary variants

- **Default:** Senior Frontend Engineer with 6+ years of experience building web and mobile applications with React, TypeScript and AngularJS. Partners with product and engineering teams to turn requirements into features for products used by millions of users. Adopts AI-assisted workflows to speed up code reviews, solution design and testing.
- **Frontend / React focus:** TODO (lead with React, TypeScript, component design, PWA performance)
- **Fullstack focus:** TODO (lead with ASP.NET C#, Node.js, MySQL, REST APIs plus frontend)
- **Mobile / cross-platform focus:** TODO (lead with React Native, Ionic, PWA)

---

## 2. Work Experience (reverse chronological)

### 2.1 Appspace (M) Sdn. Bhd. — Kuala Lumpur
https://www.appspace.com/ · Digital signage / workplace platform

| Role | From | To |
|---|---|---|
| Senior Software Engineer I | 2025-04 | Present |
| Software Engineer I | 2022-07-15 | 2025-03 |

**Stack:** React, TypeScript, AngularJS, C#, PWA / Service Workers, Bamboo (CI/CD), Azure Pipelines, Gulp, Webpack, iOS, Android, Electron, Prompt Engineering (Claude, Gemini, GPT), Git, Figma, Jira, Agile/Scrum, Claude Code, Cursor

**Responsibilities / scope**
- Lead feature delivery and own projects end to end, proposing solutions and driving technical and product discussions.
- Estimate effort and scope for assigned tasks to support efficient resource planning.
- Partner with major tech organisations (Microsoft, Neat, Google) to deliver tailored digital signage product features that meet client requirements.

**Achievements (resume-ready bullets)**
- Integrated the Appspace App with Microsoft Teams Rooms for digital signage playback, and maintained device integrations across 10+ platforms, including Google Chromebox and Neat devices.
- Implemented a PWA service-worker caching layer for assets and files on thousands of devices worldwide, avoiding millions of repeat downloads.
- Built signage template features and admin console improvements in React, TypeScript and AngularJS for clients.
- Use Claude Code and Cursor to speed up code reviews, solution design and unit-test generation.
- Delivered clean, readable, maintainable AngularJS, React TypeScript and C# code aligned with requirements and quality standards.
- Developed an AI-powered card feature that generates card layouts and designs from user prompts.
- Engineered and tuned prompts for different product requirements, and adapted them through successive Claude model upgrades as model behaviour changed.
- Maintained prompts across multiple LLM providers (Claude, Gemini and GPT), using regression testing and fine-tuning to keep output consistent with product requirements.
- Maintain the Bamboo CI/CD build pipelines across iOS, Android and Electron platforms.
- Improved the CI/CD build process by automating package bundling with Gulp and Webpack, reducing build times.
- Migrated card build pipelines from Bamboo to Azure DevOps Pipelines in partnership with DevOps, and create and maintain pipelines for new card projects.
- Carry out yearly Android and iOS maintenance to support new platform SDK releases and keep the apps compliant with store requirements.
- Work with Customer Care to investigate and resolve escalated customer issues.
- Align product requirements with Product Managers and UI/UX designers in Figma before implementation.
- Plan and track work on Jira boards within an Agile/Scrum workflow.

> **Resume note (AI card):** name LLM providers only (Claude, Gemini, GPT); never list model version numbers.
>
> **Resume note (Teams Rooms):** the integration is publicly marketed, so the bullet is fine to use. Keep it at feature level; no internal implementation detail.
>
> **Resume note (PWA caching):** "thousands of devices" and "millions of repeat downloads" are kept by your decision. They are estimates with no usage data behind them, so be ready to explain them as approximate if asked.

**TODO (open questions; internal only, NEVER copy these lines into a resume)**
- Release cadence, and any load-time change from the PWA caching.
- Any on-call, incident, or production-support work (yes/no is enough).

---

### 2.2 Kaodim Sdn. Bhd. — Kuala Lumpur
Services marketplace · No company link in the current data (v4 used https://www.kaodim.com/)

| Role | From | To |
|---|---|---|
| Software Engineer II | 2022-01-03 | 2022-06-30 |

**Stack:** React, React Native, CI/CD, Git, Agile

**Responsibilities / scope**
- Applied full SDLC best practices in React web and mobile development, working with product and QA in Agile.
- Contributed to process improvement through code reviews and CI/CD pipeline deployments.

**Achievements (resume-ready bullets)**
- Built a messaging and notification system in React and React Native for a services marketplace with thousands of users.
- Improved the booking-flow UI, translating UI/UX wireframes into reusable web and mobile components.
- Shipped monthly releases with product and QA through code reviews and CI/CD pipelines.
- Optimised frontend performance for scalable, fast web pages. (Older v4 wording; confirm it is still accurate before reuse.)

**TODO (open questions; internal only, NEVER copy these lines into a resume)**
- TODO: messaging and notification system: public-level feature types (push, in-app, real-time?) and technologies used
- TODO: CI/CD tooling used

---

### 2.3 EDESK Sdn. Bhd. — Kuala Lumpur
https://www.edesk.com.my/ · Finance and HR software

| Role | From | To |
|---|---|---|
| Application Developer | 2020-10-01 | 2021-12-31 |

**Stack:** ASP.NET, C#, Windows Forms, Kendo UI (from v4 wording), MySQL, HTML/CSS/JS

**Responsibilities / scope**
- Developed and maintained ASP.NET C# web applications and Windows Forms applications for finance and HR products.
- Built internal tools and services to improve production and workflow (v4 wording).
- Worked with stakeholders to align project goals and deliver on time.

**Achievements (resume-ready bullets)**
- Developed and maintained ASP.NET C# web and Windows Forms applications for finance and HR products.
- Redesigned web user interfaces to improve usability for day-to-day finance and HR users.
- Built .NET web applications with the Kendo framework for company projects and products. (v4 wording)

**TODO (open questions; internal only, NEVER copy these lines into a resume)**
- TODO: product areas worked on (payroll, leave, claims, accounting?), at a general level
- TODO: database work (MySQL queries, reports), if any
- TODO: tools and services built, and the time or effort they saved

---

### 2.4 Efichain Solution Sdn. Bhd. — Kuala Lumpur
https://www.efichain.com/

| Role | From | To |
|---|---|---|
| Fullstack Developer (Intern) | 2020-02-01 | 2020-07-31 |

**Stack:** React, React Native, Ionic, Framework7 (v4 wording)

**Responsibilities / scope**
- Built and maintained cross-platform applications with React, React Native and Ionic.
- Researched emerging technologies and frameworks to drive product improvement; acted on findings and tests (v4 wording).

**Achievements (resume-ready bullets)**
- Built cross-platform applications with React, React Native and Ionic.
- Researched and prototyped mobile applications on the latest frameworks, and adopted solutions based on testing results.

**TODO (open questions; internal only, NEVER copy these lines into a resume)**
- TODO: what the product was, what you shipped, and the backend side that made it "fullstack"

---

## 3. Projects

| Project | Type | Tech | Description | Link |
|---|---|---|---|---|
| Budget | Side project | Ionic React, PWA | Installable expense tracker: record daily expenses, current-month overview | https://budget-fung-public.web.app |
| Service Provider | Final-year project (UTeM) | Google Maps API, Geolocation | Location-based app to find and rate nearby service providers (geo-location search, rating system) | none |
| iRead | University workshop project | Fingerprint authentication, Bootstrap | Library system with fingerprint recognition and an enhanced borrow service. Won Silver at Workshop 2 (2018); confirm this is the same project | none |
| Strawberry Donut | Personal 3D art | Blender, glTF, `@google/model-viewer` | Donut modelled in Blender (following Blender Guru), shown in the portfolio's 3D viewer | in this repo (`assets/donut.gltf`) |
| This portfolio | Personal site | Vanilla HTML/CSS/JS, retro-arcade theme | Single-page arcade-cabinet UI, with JSON-driven timeline and a printable A4 resume | https://fungusgaming.github.io/fungus-portfolio/ |

TODO: tech details, your role, and outcomes for each (especially Budget and Service Provider).

---

## 4. Education

**Bachelor of Computer Science (Software Development)**
Universiti Teknikal Malaysia Melaka (UTeM) · Sep 2017 – Aug 2020 · CGPA 3.75 / 4.00

Awards and certificates
- Silver, Workshop 2 (2018)
- Bronze, UTeMEX 2019
- W3Schools HTML Developer Certificate

TODO: Dean's list or scholarships, relevant coursework, final-year project grade.

---

## 5. Skills (master list)

| Category | Items |
|---|---|
| Languages | JavaScript (ES6+), TypeScript, HTML5, CSS3, C# |
| Frameworks / libraries | React, AngularJS, React Native, Ionic, Node.js, ASP.NET, Framework7, Kendo UI, Bootstrap |
| Web platform | Progressive Web Apps (PWA), Service Workers, Responsive Design, REST APIs |
| Data | MySQL |
| Tools & process | Git, Bamboo, Azure, CI/CD, Agile/Scrum, Code review |
| AI-assisted dev | Claude Code, Cursor |
| Other | Google Maps API, Blender (3D modelling), glTF / model-viewer |

Self-rated levels shown on the portfolio's CHAR STATS screen (0–100, informal, not for resumes): HTML/CSS 90, JavaScript 85, React 75, Ionic 70, MySQL 65, .NET/C# 60.

### Skills by job scope (reorder per application)

- **Frontend / React:** React, TypeScript, JavaScript (ES6+), HTML5, CSS3, responsive design, PWA, Service Workers, REST APIs, performance optimisation, code review
- **Fullstack (.NET):** ASP.NET, C#, Windows Forms, Kendo UI, MySQL, REST APIs
- **Mobile / cross-platform:** React Native, Ionic, Framework7, PWA
- **Integration / platform:** device integrations (10+ platforms), Microsoft Teams Rooms, digital signage, Chromebox / Neat
- **Engineering process / leadership:** end-to-end project ownership, effort estimation, Agile/Scrum, Jira, Figma design handoff, customer escalation handling, cross-functional collaboration (Product, UI/UX, DevOps, Customer Care), CI/CD (Bamboo), code review, stakeholder collaboration
- **AI-assisted workflows:** Claude Code and Cursor for code review, solution design, unit-test generation
- **AI feature development:** LLM-powered features, prompt engineering, multi-provider LLM support (Claude, Gemini, GPT), prompt maintenance and output consistency
- **Build / release engineering:** Bamboo and Azure CI/CD (pipeline migration), Gulp, Webpack, multi-platform builds (iOS, Android, Electron), yearly SDK upgrades

---

## 6. Languages

| Language | Level |
|---|---|
| English | Professional |
| Mandarin | Native |
| Cantonese | Conversational |
| Malay | Conversational |

---

## 7. Timeline

```
2017-09  UTeM degree starts
2020-02  Efichain (Intern)            ──┐ 2020-07
2020-08  Degree completes
2020-10  EDESK (Application Developer) ─┐ 2021-12
2022-01  Kaodim (SW Engineer II)       ─┐ 2022-06
2022-07  Appspace (SW Engineer I)  ───────────────► Senior SW Engineer I (2025-04) ──► Present
```

---

## 8. Known inconsistencies to resolve

- `data/data.json` shows the Appspace `duration` as "Jan 2022 - Jun 2022" (a copy of the Kaodim dates); the real start is 2022-07-15 with no end date. The `duration` field in `data.json` is wrong for Appspace.
- `data/data.json` lists only "Software Engineer I" for Appspace, while `resume/resume.json` lists the Senior Software Engineer I promotion with empty dates. Promotion date is 2025-04; update both files.
- The v4 data lists Appspace's start as 2022-07-01; the current data says 2022-07-15. Confirm which is right.
- Kaodim: `companyLink` is empty in the current data but set in v4.
- The older v4 wording for Kaodim ("Optimised frontend performance") is not in the current bullets; keep it only if true.
- The summary claims "products used by millions of users" and "6+ years"; check that both stay accurate and can be defended in an interview.

---

## 9. Tailoring checklist

1. Pick the matching summary variant (section 1) and swap in keywords from the job description.
2. Order the experience bullets so the most relevant come first; keep 3–5 bullets for the current role and 1–3 for older roles.
3. Lead each bullet with a strong verb and end with an outcome or metric, wherever a number is available.
4. Choose the skill categories to match the role (section 5, "by job scope").
5. Include projects only if they strengthen the role (e.g. Budget for PWA, Service Provider for Maps/Geo).
6. Drop the Efichain internship and older projects if space is tight; keep the education line.
