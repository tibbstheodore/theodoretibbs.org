/* ── Mobile Nav ──────────────────────────────────── */
function toggleNav() {
  var nav  = document.getElementById('navLinks');
  var icon = document.getElementById('navIcon');
  nav.classList.toggle('open');
  icon.className = nav.classList.contains('open') ? 'fas fa-x' : 'fas fa-bars';
}

function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navIcon').className = 'fas fa-bars';
}

/* ── Timeline: Filter ────────────────────────────── */
function filterTimeline(type, el) {
  document.querySelectorAll('.tl-filter').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.tl-item').forEach(item => {
    if (type === 'all' || item.dataset.type === type) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

/* ── Timeline: Expand on click ───────────────────── */
document.querySelectorAll('.tl-item').forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('expanded');
    document.querySelectorAll('.tl-item').forEach(i => i.classList.remove('expanded'));
    if (!isOpen) item.classList.add('expanded');
  });
});

/* ── Scroll Progress Bar ─────────────────────────── */
const progressBar = document.getElementById('scroll-progress');

function updateProgress() {
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}

/* ── Back to Top ─────────────────────────────────── */
const backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
  if (document.documentElement.scrollTop > 200) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

/* ── Active Nav Highlight ────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  let current = '';

  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 120;
    const sectionBottom = sectionTop + sec.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      current = sec.getAttribute('id');
    }
  });

  if (scrollY + windowHeight >= docHeight - 40) {
    current = sections[sections.length - 1].getAttribute('id');
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ── Scroll Reveal ───────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

function updateReveal() {
  revealEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

/* ── Single scroll listener ──────────────────────── */
window.addEventListener('scroll', () => {
  updateProgress();
  updateBackToTop();
  updateActiveNav();
  updateReveal();
}, { passive: true });

updateProgress();
updateBackToTop();
updateActiveNav();
updateReveal();

/* ── Hero Dot Canvas ─────────────────────────────── */
(function () {
  const canvas = document.getElementById('dot-canvas');
  const ctx    = canvas.getContext('2d');
  const SPACING = 36;
  const RADIUS  = 1.2;
  const COLOR   = '13, 148, 136';

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cols = Math.ceil(canvas.width  / SPACING) + 1;
    const rows = Math.ceil(canvas.height / SPACING) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.arc(c * SPACING, r * SPACING, RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR}, 0.55)`;
        ctx.fill();
      }
    }
  }

  window.addEventListener('resize', resize);
  resize();
})();

/* ── Typed.js ────────────────────────────────────── */
var typed = new Typed('.auto-type', {
  strings: ['CS Student.', 'Software Developer.', 'Aspiring Network Engineer.'],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
  backDelay: 1800
});

/* ── Contact Card Reveal ─────────────────────────── */
const cardTrigger = document.getElementById('cardTrigger');
const contactCard = document.getElementById('contactCard');
const cardClose   = document.getElementById('cardClose');

cardTrigger.addEventListener('click', () => {
  contactCard.classList.add('visible');
  cardTrigger.classList.add('hidden');
  // on mobile, scroll hero into view so the full card is reachable
  if (window.innerWidth <= 680) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

cardClose.addEventListener('click', () => {
  contactCard.classList.remove('visible');
  cardTrigger.classList.remove('hidden');
});
