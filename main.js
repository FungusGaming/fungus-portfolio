let data;

// ---- Score ----

const SCREEN_POINTS = {
  'screen-title':     100,
  'screen-quest':     250,
  'screen-stats':     300,
  'screen-inventory': 500,
  'screen-credits':   150,
};

let score = 0;
let currentScreen = 'screen-title';

function addScore(screenId) {
  score += SCREEN_POINTS[screenId] || 100;
  const el = document.getElementById('hi-score');
  if (el) el.textContent = String(score).padStart(5, '0');
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

    const headerDiv = document.createElement('div');
    headerDiv.style.marginBottom = '12px';

    const title = document.createElement('h2');
    title.className = 'experience-title';
    title.innerText = exp.content.title.toUpperCase();

    const companyLink = document.createElement('a');
    companyLink.className = 'experience-company';
    companyLink.innerText = exp.content.company;
    if (exp.companyLink) {
      companyLink.href = exp.companyLink;
      companyLink.target = '_blank';
      companyLink.rel = 'noopener noreferrer';
    }

    const companyHeader = document.createElement('p');
    companyHeader.appendChild(companyLink);

    headerDiv.appendChild(title);
    headerDiv.appendChild(companyHeader);

    const timeDiv = document.createElement('div');
    timeDiv.className = 'second-text';
    timeDiv.innerHTML = `${timeString ? timeString + ' &mdash; ' : ''}${durationString}`;

    const descList = document.createElement('ul');
    descList.className = 'experience-description';

    exp.description.forEach((d) => {
      const li = document.createElement('li');
      li.innerText = d;
      descList.appendChild(li);
    });

    card.appendChild(headerDiv);
    card.appendChild(timeDiv);
    card.appendChild(descList);
    container.appendChild(card);
  });
};

const loadData = async () => {
  try {
    data = await loadJSON('data/data.json');
    loadExperience();
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
  loadData();
});
