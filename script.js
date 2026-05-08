/* ─────────────────────────────────────────────────────────
   Alliance Productions India LLP — site script
   Hero rotator, search overlay, mobile nav, scroll reveal
   ───────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // Resolve asset/page paths whether we're at the site root
  // or inside a subfolder like /films/tipppsy/.
  const ROOT_NAME = 'alliance-productions-india';
  const path = window.location.pathname;
  let PREFIX = '';
  if (path.includes('/' + ROOT_NAME + '/')) {
    const parts = path.split('/' + ROOT_NAME + '/');
    PREFIX = parts[0] + '/' + ROOT_NAME + '/';
  } else {
    // depth from root: count slashes after the leading /
    const trimmed = path.replace(/\/$/, '');
    const segs = trimmed.split('/').filter(Boolean);
    // index.html or root → 0
    const last = segs[segs.length - 1] || '';
    const isFile = /\.[a-z]+$/.test(last);
    const depth = Math.max(0, segs.length - (isFile ? 1 : 0));
    PREFIX = depth ? '../'.repeat(depth) : './';
  }

  /* ─── Search index ─────────────────────────────────── */
  const SEARCH_INDEX = [
    { title: 'Tipppsy', meta: 'Film · Director', href: 'films/tipppsy/', img: 'assets/films/tipppsy-w800.jpg' },
    { title: 'Tom, Dick and Harry 2', meta: 'Film · Director', href: 'films/tom-dick-and-harry-2/', img: 'assets/films/tom-dick-and-harry-2-w800.jpg' },
    { title: 'Do Lafzon Ki Kahani', meta: 'Film · Director, Producer', href: 'films/do-lafzon-ki-kahani/', img: 'assets/films/do-lafzon-ki-kahani-w800.jpg' },
    { title: 'Fox', meta: 'Film · Director, Producer', href: 'films/fox/', img: 'assets/films/fox-w800.jpg' },
    { title: 'Tom, Dick, and Harry', meta: 'Film · Director', href: 'films/tom-dick-and-harry/', img: 'assets/films/tom-dick-and-harry-w800.jpg' },
    { title: 'Fareb', meta: 'Film · Director', href: 'films/fareb/', img: 'assets/films/fareb-w800.jpg' },
    { title: 'Khamoshh… Khauff Ki Raat', meta: 'Film · Director, Producer', href: 'films/khamoshh-khauff-ki-raat/', img: 'assets/films/khamoshh-w800.jpg' },
    { title: 'Oops!', meta: 'Film · Director, Producer', href: 'films/oops/', img: 'assets/films/oops-w800.jpg' },
    { title: 'Tom, Dick and Harry 3', meta: 'Upcoming · In development', href: 'upcoming/', img: 'assets/films/tom-dick-and-harry-2-w800.jpg' },
    { title: 'Misfired — Bali 9', meta: 'Upcoming · In development', href: 'upcoming/', img: 'assets/films/fareb-w800.jpg' },
    { title: 'Australia International Feature', meta: 'Upcoming · Pre-production', href: 'upcoming/', img: 'assets/films/do-lafzon-ki-kahani-w800.jpg' },
    { title: 'Deepak Tijori', meta: 'Managing Director', href: 'people/deepak-tijori/', img: 'assets/people/deepak-tijori-w800.jpg' },
    { title: 'Snehal Kulshreshtha', meta: 'Director · PR & Global Outreach', href: 'people/snehal-kulshreshtha/', img: 'assets/people/snehal-kulshreshtha-w800.jpg' },
    { title: 'Anita Sharma', meta: 'Co-Producer · Music Director', href: 'people/anita-sharma/', img: 'assets/people/anita-sharma-w800.jpg' },
    { title: 'Mandeep Kaur Tijori', meta: 'Director · Producer · Actor', href: 'people/mandeep-kaur-tijori/', img: 'assets/people/mandeep-kaur-tijori-w800.jpg' },
  ];

  /* ─── Hero rotator ─────────────────────────────────── */
  function initHero() {
    const slidesWrap = document.querySelector('.hero__slides');
    if (!slidesWrap) return;
    const slides = Array.from(slidesWrap.querySelectorAll('.hero__slide'));
    const titles = Array.from(document.querySelectorAll('.hero__copy[data-slide]'));
    const dotsWrap = document.querySelector('.hero__dots');
    const counter = document.querySelector('.hero__counter');
    if (!slides.length) return;

    let idx = 0;
    let timer;

    function paintCounter() {
      if (!counter) return;
      counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    }

    function go(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
      titles.forEach((t, i) => { t.style.display = i === idx ? '' : 'none'; });
      if (dotsWrap) dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('is-active', i === idx));
      paintCounter();
    }

    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join('');
      dotsWrap.querySelectorAll('button').forEach((b, i) => b.addEventListener('click', () => { go(i); restart(); }));
    }

    function restart() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 6000); }
    go(0);
    restart();
  }

  /* ─── Search overlay ───────────────────────────────── */
  function initSearch() {
    const overlay = document.querySelector('.search-overlay');
    if (!overlay) return;
    const openBtns = document.querySelectorAll('[data-search]');
    const closeBtn = overlay.querySelector('.search-overlay__close');
    const input = overlay.querySelector('input');
    const results = overlay.querySelector('.search-results');

    function open() { overlay.classList.add('is-open'); requestAnimationFrame(() => input.focus()); }
    function close() { overlay.classList.remove('is-open'); input.value = ''; results.innerHTML = ''; }
    openBtns.forEach(b => b.addEventListener('click', open));
    if (closeBtn) closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open(); }
    });

    function render(q) {
      if (!q || q.length < 2) { results.innerHTML = ''; return; }
      const ql = q.toLowerCase();
      const hits = SEARCH_INDEX.filter(r => r.title.toLowerCase().includes(ql) || r.meta.toLowerCase().includes(ql)).slice(0, 8);
      results.innerHTML = hits.map(r => `
        <a href="${PREFIX}${r.href}">
          <img src="${PREFIX}${r.img}" alt="" loading="lazy" onerror="this.style.opacity='.2'">
          <div>
            <div class="r-title">${r.title}</div>
            <div class="r-meta">${r.meta}</div>
          </div>
        </a>
      `).join('') || '<p class="muted" style="font-size:14px">No matches.</p>';
    }
    input.addEventListener('input', (e) => render(e.target.value));
  }

  /* ─── Mobile nav ───────────────────────────────────── */
  function initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }));
  }

  /* ─── Scroll reveal ────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ─── Auto-set active nav ──────────────────────────── */
  function initActiveNav() {
    const p = window.location.pathname;
    document.querySelectorAll('.main-nav a[data-key]').forEach(a => {
      const key = a.getAttribute('data-key');
      if (key && p.indexOf('/' + key + '/') !== -1) a.classList.add('is-active');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initSearch();
    initMobileNav();
    initReveal();
    initActiveNav();
  });
})();
