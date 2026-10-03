/* ==========================================================
   Resume renderer — loads resume.json and builds the A4 page.
   Edit content in resume.json; this file only handles layout.
   ========================================================== */

'use strict';

const DATA_URL = 'resume.json';
const A4_LAYOUT_QUERY = '(min-width: 841px)';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const REQUIRED_KEYS = ['basics', 'summary', 'skills', 'experience', 'projects', 'education', 'languages'];

/* ---------- DOM helper ---------- */

/** Create an element; `children` may be strings, nodes, or null (skipped). */
function el(tag, attrs, children) {
  const node = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') node.setAttribute(key, value);
  });
  (children || [])
    .filter((child) => child !== null && child !== undefined && child !== '')
    .forEach((child) => node.append(child));
  return node;
}

function link(url, text) {
  if (!url) return text;
  return el('a', { href: url, target: '_blank', rel: 'noopener noreferrer' }, [text]);
}

/* ---------- Formatting ---------- */

/** "2022-07-15" -> "Jul 2022"; parsed manually to avoid timezone shifts. */
function formatMonth(isoDate) {
  const [year, month] = String(isoDate).split('-');
  const index = Number(month) - 1;
  return MONTHS[index] ? `${MONTHS[index]} ${year}` : year;
}

function formatRange(from, to) {
  const end = to ? formatMonth(to) : 'Present';
  return `${formatMonth(from)} – ${end}`;
}

/* ---------- Sections ---------- */

function section(title, content) {
  return el('section', { class: 'section', 'aria-label': title }, [
    el('h2', { class: 'section__heading' }, [title]),
    ...content,
  ]);
}

function entryHeader(primary, secondary, date) {
  return el('div', { class: 'entry__row' }, [
    el('div', {}, [
      el('span', { class: 'entry__primary' }, [primary]),
      secondary ? el('span', { class: 'entry__secondary' }, [` · ${secondary}`]) : null,
    ]),
    date ? el('span', { class: 'entry__date' }, [date]) : null,
  ]);
}

function bulletList(items) {
  return el('ul', { class: 'entry__bullets' }, items.map((item) => el('li', {}, [item])));
}

function renderHeader(basics) {
  const contacts = [
    basics.location,
    basics.workMode,
    basics.phone ? link(`tel:${basics.phone.replace(/\s+/g, '')}`, basics.phone) : null,
    link(`mailto:${basics.email}`, basics.email),
    ...basics.links.map((item) => link(item.url, item.label)),
  ].filter(Boolean);

  return el('header', { class: 'header' }, [
    el('h1', { class: 'header__name' }, [basics.name]),
    el('p', { class: 'header__title' }, [basics.title]),
    el('ul', { class: 'header__contact' }, contacts.map((item) => el('li', {}, [item]))),
  ]);
}

function renderSkills(skills) {
  const rows = skills.map((group) =>
    el('li', {}, [el('span', { class: 'label' }, [`${group.category}: `]), group.items.join(', ')])
  );
  return section('Skills', [el('ul', { class: 'skills' }, rows)]);
}

function renderExperienceEntry(job) {
  const [currentRole, ...previousRoles] = job.roles;
  const promotion = previousRoles.length
    ? `Promoted from ${previousRoles.map((role) => role.title).join(', ')}`
    : null;
  const companyLine = [job.company, job.location, promotion].filter(Boolean).join(' · ');

  return el('article', { class: 'entry' }, [
    entryHeader(currentRole.title, companyLine, formatRange(job.from, job.to)),
    bulletList(job.bullets),
  ]);
}

function renderProjectEntry(project) {
  return el('article', { class: 'entry' }, [
    entryHeader(link(project.url, project.name), project.tech.join(', '), null),
    el('p', { class: 'entry__detail' }, [project.description]),
  ]);
}

function renderEducationEntry(edu) {
  return el('article', { class: 'entry' }, [
    entryHeader(edu.degree, edu.school, formatRange(edu.from, edu.to)),
    el('p', { class: 'entry__detail' }, [edu.details.join(' · ')]),
  ]);
}

function renderLanguages(languages) {
  const text = languages.map((lang) => `${lang.name} (${lang.level})`).join(' · ');
  return section('Languages', [el('p', { class: 'languages' }, [text])]);
}

function renderResume(data) {
  return [
    renderHeader(data.basics),
    section('Summary', [el('p', { class: 'summary' }, [data.summary])]),
    renderSkills(data.skills),
    section('Experience', data.experience.map(renderExperienceEntry)),
    section('Projects', data.projects.map(renderProjectEntry)),
    section('Education', data.education.map(renderEducationEntry)),
    renderLanguages(data.languages),
  ];
}

/* ---------- Validation ---------- */

function validate(data) {
  const missing = REQUIRED_KEYS.filter((key) => !(key in (data || {})));
  if (missing.length) throw new Error(`resume.json is missing: ${missing.join(', ')}`);

  const badJob = data.experience.find((job) => !Array.isArray(job.roles) || job.roles.length === 0);
  if (badJob) throw new Error(`Experience "${badJob.company}" needs at least one role`);

  return data;
}

/* ---------- One-page fit check ---------- */

function measureA4HeightPx() {
  const probe = el('div', { style: 'position:absolute;visibility:hidden;height:var(--page-height)' });
  document.body.append(probe);
  const height = probe.getBoundingClientRect().height;
  probe.remove();
  return height;
}

function updateFitStatus(page, status) {
  if (!window.matchMedia(A4_LAYOUT_QUERY).matches) {
    status.textContent = '';
    status.className = 'toolbar__status';
    return;
  }

  const overflowPx = page.scrollHeight - measureA4HeightPx();
  const isOver = overflowPx > 1;
  page.classList.toggle('is-over', isOver);
  status.className = `toolbar__status ${isOver ? 'is-over' : 'is-ok'}`;
  status.textContent = isOver
    ? `Over one page by ~${Math.ceil(overflowPx)}px — trim content in resume.json`
    : 'Fits on one A4 page';
}

/* ---------- Boot ---------- */

async function loadData() {
  const response = await fetch(DATA_URL, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Could not load ${DATA_URL} (HTTP ${response.status})`);
  return validate(await response.json());
}

function showError(page, error) {
  console.error('[resume]', error);
  page.replaceChildren(
    el('p', { class: 'page__error' }, [
      `Unable to load the resume: ${error.message}. Serve this folder over HTTP (e.g. "npx serve .") rather than opening the file directly.`,
    ])
  );
}

async function init() {
  const page = document.getElementById('resume');
  const status = document.getElementById('fit-status');
  document.getElementById('print-button').addEventListener('click', () => window.print());

  try {
    const data = await loadData();
    page.replaceChildren(...renderResume(data));
    document.title = `${data.basics.name} — Resume`;
  } catch (error) {
    showError(page, error);
    return;
  } finally {
    page.removeAttribute('aria-busy');
  }

  const check = () => updateFitStatus(page, status);
  await document.fonts.ready;
  check();
  window.addEventListener('resize', check);
}

document.addEventListener('DOMContentLoaded', init);
