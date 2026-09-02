/* ==========================================================
   TUNDEV MAIN SCRIPT — js/main.js
   Shared across all 5 pages. Each feature is guarded so it
   only runs when its elements exist on the current page.
   ========================================================== */
(function () {
  'use strict';

  const body = document.body;
  const html = document.documentElement;

  /* ---------- 1. DARK / LIGHT MODE (persisted) ---------- */
  const THEME_KEY = 'tundev-theme';

  function applyTheme(theme) {
    const dark = theme === 'dark';
    body.classList.toggle('dark', dark);
    html.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
  }
  // Restore saved preference, else follow the OS
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = body.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---------- 2. ACTIVE NAV LINK (based on current filename) ---------- */
  // "/resources.html" -> "resources", "/" or "/index.html" -> "home"
  const file = location.pathname.split('/').pop() || 'index.html';
  const route = file.replace('.html', '') === 'index' || file === '' ? 'home' : file.replace('.html', '');
  document.querySelectorAll('#mainNav .nav-link').forEach(link =>
    link.classList.toggle('active', link.dataset.route === route));

  // Auto-close the mobile menu after clicking a link
  const nav = document.getElementById('navContent');
  if (nav) {
    nav.addEventListener('click', e => {
      if (e.target.closest('.nav-link') && nav.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  }

  /* ---------- 3. SCROLL REVEAL ANIMATIONS ---------- */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

  /* ---------- 4. ANIMATED STAT COUNTERS (home page only) ---------- */
  const statsEl = document.getElementById('statsHome');
  if (statsEl) {
    const animateCounters = () => {
      document.querySelectorAll('.counter').forEach(el => {
        if (el.dataset.done) return;
        el.dataset.done = '1';
        const target = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const start = performance.now();
        (function step(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(step);
        })(start);
      });
    };
    const statsIO = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounters(); statsIO.disconnect(); } });
    }, { threshold: 0.3 });
    statsIO.observe(statsEl);
  }

  /* ---------- 5. RESOURCES: FILTER + SEARCH (resources page only) ---------- */
  const resFiltersEl = document.getElementById('resFilters');
  if (resFiltersEl) {
    const resItems = Array.from(document.querySelectorAll('.resource-item'));
    const resCount = document.getElementById('resCount');
    const noResults = document.getElementById('noResults');
    const resSearch = document.getElementById('resSearch');
    let activeCat = 'all';
    let query = '';

    function applyResFilters() {
      let visible = 0;
      resItems.forEach(item => {
        const catOK = activeCat === 'all' || item.dataset.category === activeCat;
        const haystack = (item.textContent + ' ' + (item.dataset.search || '')).toLowerCase();
        const qOK = query === '' || haystack.includes(query);
        const show = catOK && qOK;
        item.classList.toggle('d-none', !show);
        if (show) visible++;
      });
      resCount.textContent = visible;
      noResults.classList.toggle('d-none', visible !== 0);
    }

    resFiltersEl.addEventListener('click', e => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      resFiltersEl.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.filter;
      applyResFilters();
    });

    if (resSearch) {
      resSearch.addEventListener('input', () => {
        query = resSearch.value.trim().toLowerCase();
        applyResFilters();
      });
    }

    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (resSearch) resSearch.value = '';
        query = '';
        activeCat = 'all';
        resFiltersEl.querySelectorAll('.filter-pill').forEach(b =>
          b.classList.toggle('active', b.dataset.filter === 'all'));
        applyResFilters();
      });
    }
    applyResFilters(); // sync initial count
  }

  /* ---------- 6. TIPS & GUIDES: FILTERS (tips page only) ---------- */
  const tipFiltersEl = document.getElementById('tipFilters');
  if (tipFiltersEl) {
    const tipItems = Array.from(document.querySelectorAll('.tip-item'));
    const noTips = document.getElementById('noTips');

    tipFiltersEl.addEventListener('click', e => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      tipFiltersEl.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.tfilter;
      let visible = 0;
      tipItems.forEach(item => {
        const show = cat === 'all' || item.dataset.tcat === cat;
        item.classList.toggle('d-none', !show);
        if (show) visible++;
      });
      if (noTips) noTips.classList.toggle('d-none', visible !== 0);
    });
  }

  /* ---------- 7. NAVBAR SHADOW ON SCROLL ---------- */
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    window.addEventListener('scroll', () => {
      mainNav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---------- 8. BACK TO TOP ---------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- 9. RENDER LUCIDE ICONS ---------- */
  if (window.lucide) lucide.createIcons();
})();
