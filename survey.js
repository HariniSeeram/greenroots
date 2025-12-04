// NAVIGATION: show one section at a time
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const nav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('data-section');

    // active link
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // show correct section
    sections.forEach(sec => sec.classList.remove('active'));
    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.add('active');

    // close mobile menu
    nav.classList.remove('open');
  });
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// HOME: Start Tour button = go to Seeds section
const startTourBtn = document.getElementById('startTourBtn');
if (startTourBtn) {
  startTourBtn.addEventListener('click', () => {
    const seedsLink = document.querySelector('.nav-link[data-section="seeds"]');
    if (seedsLink) seedsLink.click();
  });
}

// SEEDS: Filter by type chips
const seedFilterBtns = document.querySelectorAll('[data-seed-filter]');
const seedCards = document.querySelectorAll('.seed-card');

seedFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-seed-filter');

    seedFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    seedCards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      if (type === 'all' || cardType.includes(type)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// SEEDS: Recommendation based on space
const spaceRadios = document.querySelectorAll('input[name="space"]');
const spaceReco = document.getElementById('spaceReco');

function updateSpaceReco() {
  const selected = document.querySelector('input[name="space"]:checked');
  if (!selected) return;
  const value = selected.value;

  if (value === 'small') {
    spaceReco.textContent =
      'Recommended: Spinach, Coriander, Fenugreek – all grow well in small pots and trays.';
  } else if (value === 'medium') {
    spaceReco.textContent =
      'Recommended: Tomato, Brinjal, Okra + a few leafy greens for a mixed kitchen garden.';
  } else {
    spaceReco.textContent =
      'Recommended: Beans, Bitter Gourd on climbers + multiple pots of leafy and fruit vegetables.';
  }
}
spaceRadios.forEach(r => r.addEventListener('change', updateSpaceReco));
updateSpaceReco();

// COMPOST: checklist progress
const compostSteps = document.querySelectorAll('.compost-step');
const compostProgress = document.getElementById('compostProgress');
const compostStatus = document.getElementById('compostStatus');

function updateCompostProgress() {
  const total = compostSteps.length;
  let done = 0;
  compostSteps.forEach(step => {
    if (step.checked) done++;
  });
  const percent = Math.round((done / total) * 100);
  compostProgress.style.width = percent + '%';

  if (percent === 0) {
    compostStatus.textContent = 'Start checking steps to see progress.';
  } else if (percent < 50) {
    compostStatus.textContent = `Good start! You are ${percent}% ready with compost setup.`;
  } else if (percent < 100) {
    compostStatus.textContent = `Great! You are ${percent}% done. Keep going!`;
  } else {
    compostStatus.textContent = 'Excellent! Your compost setup is complete. Now just wait for it to mature.';
  }
}
compostSteps.forEach(step => step.addEventListener('change', updateCompostProgress));
updateCompostProgress();

// COMPOST: days range label
const daysRange = document.getElementById('daysRange');
const daysLabel = document.getElementById('daysLabel');

if (daysRange && daysLabel) {
  daysRange.addEventListener('input', () => {
    const days = daysRange.value;
    let stage = '';
    if (days <= 20) {
      stage = 'Very early stage – waste will just start breaking down.';
    } else if (days <= 30) {
      stage = 'Half ready – material will start turning dark and crumbly.';
    } else {
      stage = 'Almost ready – can be used for plants after checking smell and texture.';
    }
    daysLabel.textContent = `Around ${days} days – ${stage}`;
  });
}

// SURVEY: mini interactive summary
const miniSurvey = document.getElementById('miniSurvey');
const surveyResult = document.getElementById('surveyResult');

if (miniSurvey) {
  miniSurvey.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(miniSurvey);
    let yesCount = 0;
    let total = 0;
    for (const [key, value] of formData.entries()) {
      total++;
      if (value === 'yes') yesCount++;
    }
    if (total < 5) {
      surveyResult.textContent = 'Please answer all 5 questions to see your summary.';
      return;
    }

    const percent = Math.round((yesCount / 5) * 100);
    if (percent >= 80) {
      surveyResult.textContent =
        `Your score is ${percent}%. You are highly ready for organic gardening. Start today!`;
    } else if (percent >= 50) {
      surveyResult.textContent =
        `Your score is ${percent}%. You are somewhat ready. With small guidance, you can easily begin.`;
    } else {
      surveyResult.textContent =
        `Your score is ${percent}%. You need more awareness, but you can still start with one simple pot.`;
    }
  });
}

// SUPPLIERS: filter
const suppFilterBtns = document.querySelectorAll('[data-supp-filter]');
const supplierCards = document.querySelectorAll('.supplier-card');

suppFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-supp-filter');

    suppFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    supplierCards.forEach(card => {
      const cardTypes = card.getAttribute('data-type'); // e.g., "seeds compost"
      if (type === 'all' || cardTypes.includes(type)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// CONTACT form: simple fake submit
const contactForm = document.getElementById('contactForm');
const statusMsg = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    if (!name) return;

    statusMsg.textContent = `Thank you, ${name}! Your message has been noted.`;
    contactForm.reset();

    setTimeout(() => {
      statusMsg.textContent = '';
    }, 4000);
  });
}