let data;

// ---- Score ----

const SCREEN_POINTS = {
  'screen-title':     100,
  'screen-quest':     250,
  'screen-stats':     300,
  'screen-inventory': 500,
  'screen-credits':   150,
};

const SCORE_STORAGE_KEY = 'fungus-scored-screens';

// Screens that have already awarded points. Saved so each screen scores
// only once, even across reloads.
const scoredScreens = new Set(readScoredScreens());
let currentScreen = 'screen-title';

function readScoredScreens() {
  try {
    const saved = JSON.parse(localStorage.getItem(SCORE_STORAGE_KEY));
    return Array.isArray(saved) ? saved.filter((id) => id in SCREEN_POINTS) : [];
  } catch (e) {
    return [];
  }
}

function saveScoredScreens() {
  try {
    localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify([...scoredScreens]));
  } catch (e) {
    // Storage unavailable (private mode, blocked): score still works for this visit.
  }
}

function renderScore() {
  let score = 0;
  scoredScreens.forEach((id) => { score += SCREEN_POINTS[id]; });
  const el = document.getElementById('hi-score');
  if (el) el.textContent = String(score).padStart(5, '0');
}

function addScore(screenId) {
  if (!(screenId in SCREEN_POINTS) || scoredScreens.has(screenId)) return;
  scoredScreens.add(screenId);
  saveScoredScreens();
  renderScore();
}

// ---- Screen Navigation ----

function showScreen(targetId) {
  if (targetId === currentScreen) return;

  const screens = document.querySelectorAll('.screen');
  const buttons = document.querySelectorAll('.nav-btn');

  screens.forEach((s) => s.classList.remove('active'));
  buttons.forEach((b) => b.classList.remove('active'));

  const targetScreen = document.getElementById(targetId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    if (targetId === 'screen-stats') animateStatBars();
  }

  const activeBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  currentScreen = targetId;
  addScore(targetId);
}

function initNav() {
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => showScreen(btn.dataset.target));
  });
}

// ---- Stat Bar Animation ----

function animateStatBars() {
  const fills = document.querySelectorAll('.stat-bar-fill');
  // Reset first so animation re-triggers on each visit
  fills.forEach((fill) => { fill.style.width = '0%'; });
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fills.forEach((fill) => {
        fill.style.width = (fill.dataset.value || 0) + '%';
      });
    });
  });
}

// ---- Data Loading ----

const loadJSON = (filepath) => {
  return new Promise((resolve, reject) => {
    const xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', filepath, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4) {
        if (xobj.status === 200 || xobj.status === 0) {
          try {
            resolve(JSON.parse(xobj.responseText));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error('Status: ' + xobj.status));
        }
      }
    };
    xobj.onerror = () => reject(new Error('Network error'));
    xobj.send(null);
  });
};

const loadExperience = () => {
  if (!data || !data.experience) return;

  const container = document.getElementById('experience-container');
  container.innerHTML = '';

  data.experience.forEach((exp) => {
    const dateFrom = new Date(exp.from);
    const dateTo = exp.to ? new Date(exp.to) : new Date();
    const timeString = timeSince(dateFrom, dateTo);
    const durationString =
      dateFrom.toLocaleDateString() + ' — ' +
      (exp.to ? dateTo.toLocaleDateString() : 'PRESENT');

    const card = document.createElement('article');
    card.className = 'experience-card';

    // Title row: job title + duration on same line
    const titleRow = document.createElement('div');
    titleRow.className = 'experience-title-row';

    const title = document.createElement('h2');
    title.className = 'experience-title';
    title.innerText = exp.content.title.toUpperCase();

    const timeDiv = document.createElement('span');
    timeDiv.className = 'second-text';
    timeDiv.innerHTML = `${timeString ? timeString + ' &mdash; ' : ''}${durationString}`;

    titleRow.appendChild(title);
    titleRow.appendChild(timeDiv);

    // Company row below
    const companyLink = document.createElement('a');
    companyLink.className = 'experience-company';
    companyLink.innerText = exp.content.company;
    if (exp.companyLink) {
      companyLink.href = exp.companyLink;
      companyLink.target = '_blank';
      companyLink.rel = 'noopener noreferrer';
    }

    const descList = document.createElement('ul');
    descList.className = 'experience-description';

    exp.description.forEach((d) => {
      const li = document.createElement('li');
      li.innerText = d;
      descList.appendChild(li);
    });

    card.appendChild(titleRow);
    card.appendChild(companyLink);
    card.appendChild(descList);
    container.appendChild(card);
  });
};

const createExternalLink = (className, href, text) => {
  const link = document.createElement('a');
  link.className = className;
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = text;
  return link;
};

// Builds the INVENTORY project cards. The featured donut card stays in index.html.
const loadProjects = () => {
  if (!data || !Array.isArray(data.projects)) return;

  const grid = document.getElementById('inventory-grid');
  if (!grid) return;
  grid.querySelectorAll('.item-slot--project').forEach((card) => card.remove());

  data.projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'item-slot item-slot--project';

    const tag = document.createElement('p');
    tag.className = 'item-tag';
    tag.textContent = project.tag;
    card.appendChild(tag);

    const name = document.createElement('p');
    name.className = 'item-name';
    if (project.liveUrl) {
      name.appendChild(createExternalLink('', project.liveUrl, project.name + ' ►'));
    } else {
      name.textContent = project.name;
    }
    card.appendChild(name);

    const desc = document.createElement('p');
    desc.className = 'item-desc';
    desc.textContent = project.description;
    card.appendChild(desc);

    if (Array.isArray(project.features) && project.features.length) {
      const list = document.createElement('ul');
      list.className = 'item-features';
      project.features.forEach((feature) => {
        const li = document.createElement('li');
        li.textContent = '▪ ' + feature;
        list.appendChild(li);
      });
      card.appendChild(list);
    }

    if (project.repoUrl) {
      card.appendChild(createExternalLink('item-link', project.repoUrl, '[ GITHUB ]'));
    }

    grid.appendChild(card);
  });
};

const loadData = async () => {
  try {
    data = await loadJSON('data/data.json');
    loadExperience();
    loadProjects();
  } catch (e) {
    console.error('Failed to load data:', e);
    data = {
      experience: [
        {
          content: { title: 'Software Engineer', company: 'Fallback Company' },
          description: ['Loaded from fallback due to error'],
          from: '2022-01-01',
          to: '2022-12-31',
          companyLink: '#',
        },
      ],
    };
    loadExperience();
  }
};

function timeSince(dateFrom, dateTo) {
  const seconds = Math.floor((dateTo - dateFrom) / 1000);
  let interval = seconds / 31536000;
  const modulus = seconds % 31536000;
  let tmp = '';
  if (interval >= 1) tmp += Math.floor(interval) + ' YRS';
  interval = modulus / 2592000;
  if (interval >= 1) {
    if (tmp) tmp += ' ';
    tmp += Math.floor(interval) + ' MO';
  }
  return tmp;
}

// ---- Init ----

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  renderScore();
  loadData();
});
