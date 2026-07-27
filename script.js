/* ========================================
   CUSTOM CURSOR
   ======================================== */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Only run on non-touch devices
  if (!window.matchMedia('(pointer: fine)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot snaps instantly
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Ring follows with smooth lag
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover state on interactive elements
  const hoverTargets = 'a, button, [data-magnetic], .project-row, .stack-item, .contact-card, .modal-close';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.add('is-hovering');
      ring.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) {
      dot.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
    }
  });

  // Click state
  document.addEventListener('mousedown', () => {
    dot.classList.add('is-clicking');
    ring.classList.add('is-clicking');
  });
  document.addEventListener('mouseup', () => {
    dot.classList.remove('is-clicking');
    ring.classList.remove('is-clicking');
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();

/* ========================================
   GSAP + SCROLLTRIGGER SETUP
   ======================================== */
gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========================================
   PAGE LOADER
   ======================================== */
(function initLoader() {
  const loader = document.getElementById('pageLoader');
  const bar = loader ? loader.querySelector('.page-loader-bar') : null;
  if (!loader || !bar) return;

  const tl = gsap.timeline();

  tl
    // Bar fills across bottom
    .to(bar, {
      scaleX: 1,
      duration: 0.55,
      ease: 'power2.inOut',
    })
    // Whole loader slides up and out
    .to(loader, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        loader.style.display = 'none';
      },
    }, '+=0.1');
})();

/* ========================================
   CANVAS PARTICLE BACKGROUND
   ======================================== */
(function initParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || reducedMotion) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -9999, y: -9999 };
  const COUNT = 55;
  const MAX_DIST = 130;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,109,240,${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // mouse interaction
      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const md = Math.sqrt(dx * dx + dy * dy);
      if (md < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(124,109,240,${0.12 * (1 - md / 120)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      // particle-particle lines
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const ex = p.x - q.x, ey = p.y - q.y;
        const dist = Math.sqrt(ex * ex + ey * ey);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(124,109,240,${0.08 * (1 - dist / MAX_DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); });
  document.getElementById('hero').addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  document.getElementById('hero').addEventListener('mouseleave', () => {
    mouse.x = -9999; mouse.y = -9999;
  });

  resize();
  init();
  animate();
})();

/* ========================================
   HERO ANIMATIONS
   ======================================== */
if (!reducedMotion) {
  /* Set initial states */
  gsap.set('.hero-name-first', { opacity: 0, y: 24 });
  gsap.set('.hero-name-last', { opacity: 0, y: 24 });
  gsap.set('.hero-eyebrow-text', { opacity: 0, y: 10 });
  gsap.set('.hero-tagline', { opacity: 0, y: 20 });
  gsap.set('.hero-meta', { opacity: 0, y: 16 });
  gsap.set('.hero-actions', { opacity: 0, y: 20 });
  gsap.set('.hero-scroll', { opacity: 0 });

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.35 });

  heroTl
    .to('.hero-eyebrow-line', { scaleX: 1, duration: 0.5, ease: 'power2.out' })
    .to('.hero-eyebrow-text', { opacity: 1, y: 0, duration: 0.45 }, '-=0.2')
    .to('.hero-name-first', { opacity: 1, y: 0, duration: 0.55 }, '-=0.1')
    .to('.hero-name-last', { opacity: 1, y: 0, duration: 0.55 }, '-=0.35')
    .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .to('.hero-meta', { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.45 }, '-=0.3')
    .from('.hero-photo-wrap', { opacity: 0, y: 40, scale: 0.95, duration: 0.9, ease: 'power3.out' }, 0.15)
    .to('.hero-scroll', { opacity: 1, duration: 0.5 }, '-=0.2');
}

/* ========================================
   ABOUT SECTION SCROLL ANIMATIONS
   ======================================== */
if (!reducedMotion) {
  ScrollTrigger.batch('.about .about-top, .about-stack', {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }),
    once: true,
  });

  /* ========================================
     PROJECTS SECTION
     ======================================== */
  ScrollTrigger.batch('#projects .section-eyebrow', {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }),
    once: true,
  });

  ScrollTrigger.batch('.project-row', {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.18, duration: 0.7, ease: 'power3.out' }),
    once: true,
  });

  /* ========================================
     BACKGROUND SECTION
     ======================================== */
  ScrollTrigger.batch('#background .section-eyebrow, #background .section-heading', {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }),
    once: true,
  });

  ScrollTrigger.create({
    trigger: '.bg-exp-card',
    start: 'top 78%',
    once: true,
    onEnter: () => {
      gsap.to('.bg-exp-card', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        onComplete: () => {
          gsap.from('.bg-contrib-item', { opacity: 0, x: -20, stagger: 0.1, duration: 0.4, ease: 'power3.out' });
          gsap.from('.bg-exp-tags span', { opacity: 0, y: 10, stagger: 0.06, duration: 0.3, ease: 'power3.out' });
        },
      });
    },
  });

  ScrollTrigger.batch('.bg-edu-card', {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power3.out' }),
    once: true,
  });

  /* ========================================
     CONTACT SECTION
     ======================================== */
  ScrollTrigger.batch('#contact .section-eyebrow, #contact .section-heading, .contact-subtext', {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }),
    once: true,
  });

  ScrollTrigger.create({
    trigger: '.contact-primary',
    start: 'top 78%',
    once: true,
    onEnter: () => {
      gsap.to('.contact-primary', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    },
  });

  ScrollTrigger.batch('.contact-card--secondary', {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }),
    once: true,
  });

  ScrollTrigger.batch('.contact-footer-note', {
    onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' }),
    once: true,
  });
} else {
  document.querySelectorAll('.anim-item, .about-label').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  document.querySelectorAll('.hero-tagline, .hero-meta, .hero-actions, .hero-eyebrow-text').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  document.querySelectorAll('.hero-char').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  const eyebrowLine = document.querySelector('.hero-eyebrow-line');
  if (eyebrowLine) eyebrowLine.style.transform = 'scaleX(1)';
}

/* ========================================
   FLOATING NAV — SHOW/HIDE
   ======================================== */
const nav = document.getElementById('floatingNav');
const hero = document.getElementById('hero');

function updateNav() {
  const heroBottom = hero.offsetTop + hero.offsetHeight;
  if (window.scrollY > heroBottom * 0.5) {
    nav.classList.add('visible');
  } else {
    nav.classList.remove('visible');
  }
}
window.addEventListener('scroll', updateNav, { passive: true });

/* ========================================
   ACTIVE NAV LINK + SLIDING PILL
   ======================================== */
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const activePill = document.getElementById('navActivePill');

function moveActivePill(link) {
  if (!activePill || !link) return;
  const pillRect = link.closest('.nav-pill').getBoundingClientRect();
  const linkRect = link.getBoundingClientRect();
  activePill.style.width = linkRect.width + 'px';
  activePill.style.transform = `translateX(${linkRect.left - pillRect.left - 8}px)`;
}

function updateActiveLink() {
  const scrollY = window.scrollY + window.innerHeight / 3;
  let currentLink = null;
  sections.forEach(section => {
    const top = section.offsetTop, height = section.offsetHeight, id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
          currentLink = link;
        }
      });
    }
  });
  if (currentLink) moveActivePill(currentLink);
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

const navObserver = new MutationObserver(() => {
  if (nav.classList.contains('visible')) {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) moveActivePill(activeLink);
  }
});
navObserver.observe(nav, { attributes: true, attributeFilter: ['class'] });

/* ========================================
   PROJECT MODALS
   ======================================== */
const projectRows = document.querySelectorAll('.project-row[data-modal]');
const modals = document.querySelectorAll('.modal-overlay');
let activeModal = null;

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  activeModal = modal;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!activeModal) return;
  activeModal.classList.remove('active');
  document.body.style.overflow = '';
  activeModal = null;
}

projectRows.forEach(row => {
  row.addEventListener('click', e => { e.preventDefault(); openModal(row.dataset.modal); });
  row.style.cursor = 'pointer';
});

document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeModal));
modals.forEach(overlay => overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ========================================
   PROJECT HOVER PREVIEW
   ======================================== */
const preview = document.getElementById('projectPreview');
const previewImg = document.getElementById('projectPreviewImg');

if (preview && previewImg) {
  let mouseX = 0, mouseY = 0, previewX = 0, previewY = 0, rafId = null;
  const lerp = (a, b, t) => a + (b - a) * t;

  function animatePreview() {
    previewX = lerp(previewX, mouseX, 0.12);
    previewY = lerp(previewY, mouseY, 0.12);
    preview.style.left = previewX + 'px';
    preview.style.top = previewY + 'px';
    rafId = requestAnimationFrame(animatePreview);
  }

  projectRows.forEach(row => {
    const src = row.dataset.preview;
    if (!src) return;
    row.addEventListener('mouseenter', () => {
      previewImg.src = src;
      preview.classList.add('active');
      if (!rafId) rafId = requestAnimationFrame(animatePreview);
    });
    row.addEventListener('mousemove', e => { mouseX = e.clientX + 20; mouseY = e.clientY - 100; });
    row.addEventListener('mouseleave', () => {
      preview.classList.remove('active');
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    });
  });
}

/* ========================================
   LIGHTBOX
   ======================================== */
(function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Attach to all modal cover images
  document.querySelectorAll('.modal-cover img, .modal-cover-double img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();

/* ========================================
   FOOTER YEAR
   ======================================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ========================================
   SMOOTH SCROLL
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
