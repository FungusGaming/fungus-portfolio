let data;
let experienceIndent = 3;
const modelViewerPrompt = document.querySelector("#donut-model-viewer");

const loadJSON = (filepath) => {
  console.log('Loading JSON from:', filepath);
  return new Promise((resolve, reject) => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', filepath, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4) {
        // Status 0 is for local files (file://)
        if (xobj.status == "200" || xobj.status == 0) {
          try {
            console.log('JSON Loaded successfully');
            resolve(JSON.parse(xobj.responseText));
          } catch (e) {
            console.error('Error parsing JSON:', e);
            reject(e);
          }
        } else {
          console.error('Error loading JSON, status:', xobj.status);
          reject(new Error('Status: ' + xobj.status));
        }
      }
    }
    xobj.onerror = function () {
      console.error('Network error loading JSON');
      reject(new Error('Network error'));
    }
    xobj.send(null);
  })
}

const loadExperience = async () => {
  if (!data || !data.experience) {
    console.error('No experience data found');
    return;
  }
  console.log('Loading experience items:', data.experience.length);
  const experience = data.experience;
  const container = document.getElementById("experience-container");
  container.innerHTML = ''; // Clear existing content

  experience.forEach((exp) => {
    const dateFrom = new Date(exp.from);
    const dateTo = exp.to ? new Date(exp.to) : new Date();
    const timeString = timeSince(dateFrom, dateTo);
    const durationString = dateFrom.toLocaleDateString() + ' - ' + (exp.to ? dateTo.toLocaleDateString() : 'Present');

    const card = document.createElement('article');
    card.className = 'experience-card';

    const headerDiv = document.createElement('div');
    headerDiv.style.marginBottom = '20px';

    const title = document.createElement('h2');
    title.className = 'experience-title';
    title.innerText = exp.content.title;

    const companyLink = document.createElement('a');
    companyLink.className = 'experience-company';
    companyLink.innerText = exp.content.company;
    if (exp.companyLink) {
      companyLink.href = exp.companyLink;
      companyLink.target = '_blank';
    }

    const companyHeader = document.createElement('h4');
    companyHeader.appendChild(companyLink);

    headerDiv.appendChild(title);
    headerDiv.appendChild(companyHeader);

    const timeDiv = document.createElement('div');
    timeDiv.className = 'second-text';
    timeDiv.style.marginBottom = '20px';
    timeDiv.innerHTML = `<span>${timeString}</span> (<i>${durationString}</i>)`;

    const descList = document.createElement('ul');
    descList.className = 'experience-description';

    exp.description.forEach((d) => {
      let li = document.createElement('li');
      let p = document.createElement('p');
      p.innerText = d;
      li.appendChild(p);
      descList.appendChild(li);
    });

    card.appendChild(headerDiv);
    card.appendChild(timeDiv);
    card.appendChild(descList);
    container.appendChild(card);
  });
}

const loadData = async () => {
  try {
    data = await loadJSON('data/data.json');
    console.log('Data loaded:', data);
    loadExperience();
  } catch (e) {
    console.error('Failed to load data:', e);
    // Fallback data for testing if local loading fails completely
    console.log('Using fallback data');
    data = {
      experience: [
        {
          content: { title: "Software Engineer", company: "Fallback Company", duration: "2022" },
          description: ["Loaded from fallback due to error"],
          from: "2022-01-01",
          to: "2022-12-31",
          companyLink: "#"
        }
      ]
    };
    loadExperience();
  }
}

function timeSince(dateFrom, dateTo) {
  const seconds = Math.floor((dateTo - dateFrom) / 1000);

  let interval = seconds / 31536000;
  let modulus = seconds % 31536000;
  let tmp = ""
  if (interval > 1) {
    tmp += Math.floor(interval) + " years";
  }
  interval = modulus / 2592000;
  if (interval > 1) {
    if (tmp != "") tmp += " ";
    tmp += Math.floor(interval) + " months";
  }
  return tmp
}

// Initialize
loadData(experienceIndent);

// Scroll and Interaction Logic
// modern Chrome requires { passive: false } when adding event
var scrollHeight = 100;
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch (e) { }
let scrollCount = 0;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
let scrollTimeout;
var wheelOpt = supportsPassive ? { passive: false } : false;

// 3d model variable
let fingerFrame = 0;
const PROMT_MS = 500;
const DEFAULT_FINGER_VALUE = {
  x: {
    initialValue: 0.6,
    keyframes: [
      { frames: 1, value: 0.6 },
      { frames: 1, value: 0.6 },
    ]
  },
  y: {
    initialValue: 0.1,
    keyframes: [
      { frames: 1, value: 0.1 },
    ]
  }
};
let finger0 = DEFAULT_FINGER_VALUE;
let fingerDirection = 1;

function triggerInteract() {
  if (modelViewerPrompt && modelViewerPrompt.interact) {
      modelViewerPrompt.interact(PROMT_MS, finger0);
  }
}

window.addEventListener(wheelEvent, function (e) {
  if (e.deltaY < 0 && scrollCount > 50) {
    scrollCount -= scrollHeight;
    fingerFrame--;
    fingerDirection = -1;
  } else {
    scrollCount += scrollHeight;
    fingerFrame++;
    fingerDirection = 1;
  }
  // 3d model move

  finger0 = JSON.parse(JSON.stringify(DEFAULT_FINGER_VALUE));
  finger0.y.keyframes.push({ frames: 1, value: (100 + (fingerDirection * 9)) / 1000 })
  triggerInteract();
}, wheelOpt); // modern desktop

$(document).ready(function () {
  // Ready state
});
