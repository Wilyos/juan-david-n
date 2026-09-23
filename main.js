/* ═══════════════════════════════════════════════════════
   JUAN DAVID NOREÑA — main.js
   Scroll animations · Navbar · Mobile menu · Active links
═══════════════════════════════════════════════════════ */

'use strict';

/* ── Navbar scroll ───────────────────────────────────── */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 40);
  lastScroll = y;
}, { passive: true });

/* ── Mobile menu ─────────────────────────────────────── */
const menuToggle = document.getElementById('menu-toggle');
const navLinks   = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

/* ── Active nav link on scroll ───────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

/* ── Scroll-reveal (IntersectionObserver) ───────────── */
function observeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

observeAnimations();

/* ── Smooth scroll for anchor links ──────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Bento card mouse-glow effect ───────────────────── */
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = ((e.clientX - rect.left) / rect.width)  * 100;
    const y      = ((e.clientY - rect.top)  / rect.height) * 100;
    const glow   = card.querySelector('.bento-glow');
    if (glow) {
      glow.style.background = `radial-gradient(ellipse at ${x}% ${y}%, rgba(140,200,75,0.12), transparent 60%)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    const glow = card.querySelector('.bento-glow');
    if (glow) glow.style.background = '';
  });
});

/* ── Scroll indicator hide on scroll ────────────────── */
const scrollIndicator = document.getElementById('scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    scrollIndicator.style.opacity = window.scrollY > 60 ? '0' : '1';
  }, { passive: true });
}

