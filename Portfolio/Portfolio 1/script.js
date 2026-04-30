/* ============================================================
   DAVINDA RAVISHKA – PORTFOLIO JAVASCRIPT
   Scroll animations · Navbar · Mobile nav · Contact form
   ============================================================ */

'use strict';

/* ---- Navbar: scroll shadow + active link highlight ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');
  const links  = document.querySelectorAll('.nav-link:not(.nav-cta)');

  /* Scroll shadow */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    /* Scroll-to-top button */
    const scrollBtn = document.getElementById('scrollTopBtn');
    scrollBtn.classList.toggle('visible', window.scrollY > 300);

    /* Active nav link */
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.id;
    });
    links.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active-link', href === current);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu toggle */
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close menu on link click */
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close on outside click */
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ---- Scroll-to-top button ---- */
document.getElementById('scrollTopBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Intersection Observer for reveal-section ---- */
(function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const sections = document.querySelectorAll('.reveal-section');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ---- Contact form ---- */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submit  = document.getElementById('contactSubmit');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Basic validation */
    const name    = form.querySelector('#contactName').value.trim();
    const email   = form.querySelector('#contactEmailField').value.trim();
    const message = form.querySelector('#contactMessage').value.trim();

    if (!name || !email || !message) {
      shakeBtn();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      shakeBtn();
      return;
    }

    /* Simulate sending (no backend) */
    submit.disabled = true;
    submit.textContent = 'Sending…';

    setTimeout(() => {
      form.reset();
      success.classList.add('visible');
      submit.disabled = false;
      submit.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        Send Message`;
      setTimeout(() => success.classList.remove('visible'), 6000);
    }, 1000);
  });

  function shakeBtn() {
    submit.style.animation = 'none';
    submit.offsetHeight; // reflow
    submit.style.animation = 'shake 0.4s ease';
  }
})();

/* ---- Typed animation on hero heading ---- */
(function initTyped() {
  const accentEl = document.querySelector('.hero-heading .text-accent');
  if (!accentEl) return;

  const fullText = 'Davinda Ravishka';
  accentEl.textContent = '';
  let i = 0;

  function typeChar() {
    if (i < fullText.length) {
      accentEl.textContent += fullText[i++];
      setTimeout(typeChar, 70);
    }
  }

  /* Start after a short delay */
  setTimeout(typeChar, 500);
})();

/* ---- Smooth counter animation for stats ---- */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num, .mini-stat-num');
  if (!statNums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim();
      const num = parseInt(raw);
      if (isNaN(num) || raw.includes('∞')) return;

      const suffix = raw.replace(/[0-9]/g, '');
      let count = 0;
      const step = Math.ceil(num / 30);
      const timer = setInterval(() => {
        count = Math.min(count + step, num);
        el.textContent = count + suffix;
        if (count >= num) clearInterval(timer);
      }, 40);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
})();

/* ---- Add active-link CSS ---- */
(function addActiveLinkStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .active-link {
      background: var(--blue-50);
      color: var(--accent) !important;
    }
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%,60% { transform: translateX(-5px); }
      40%,80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
})();
