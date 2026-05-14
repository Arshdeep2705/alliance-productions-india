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
    { title: 'Echoes of Us', meta: 'Festival short · 88+ international laurels', href: 'films/echoes-of-us/', img: 'assets/films/echoes-of-us-poster-w800.jpg' },
    { title: 'Tipppsy', meta: 'Film · Director · ★★★★ Bhavikk Sangghvi', href: 'films/tipppsy/', img: 'assets/films/tipppsy-w800.jpg' },
    { title: 'Do Lafzon Ki Kahani', meta: 'Film · Director, Producer · Randeep Hooda', href: 'films/do-lafzon-ki-kahani/', img: 'assets/films/do-lafzon-ki-kahani-w800.jpg' },
    { title: 'Fox', meta: 'Film · Director, Producer', href: 'films/fox/', img: 'assets/films/fox-w800.jpg' },
    { title: 'Tom, Dick, and Marry', meta: 'Film · Director', href: 'films/tom-dick-and-harry/', img: 'assets/films/tom-dick-and-harry-w800.jpg' },
    { title: 'Fareb', meta: 'Film · Director', href: 'films/fareb/', img: 'assets/films/fareb-w800.jpg' },
    { title: 'Khamoshh… Khauff Ki Raat', meta: 'Film · Director, Producer', href: 'films/khamoshh-khauff-ki-raat/', img: 'assets/films/khamoshh-w800.jpg' },
    { title: 'Oops!', meta: 'Film · Director, Producer', href: 'films/oops/', img: 'assets/films/oops-w800.jpg' },
    // Upcoming
    { title: 'Kabuliwala', meta: 'Upcoming international · Atiq Rahimi', href: 'upcoming/', img: 'assets/films/kabuliwala-poster-w800.jpg' },
    { title: 'Misfired', meta: 'Upcoming international · Pre-production', href: 'upcoming/', img: 'assets/films/misfired-bali-9-w800.svg' },
    { title: 'Defiant Nadia', meta: 'Upcoming international · In development', href: 'upcoming/', img: 'assets/films/defiant-nadia-w800.svg' },
    { title: 'Tom, Dick & Marry 3', meta: 'Upcoming national · Deepak Tijori', href: 'upcoming/', img: 'assets/films/tom-dick-and-harry-3-w800.svg' },
    { title: 'Khoj', meta: 'Upcoming national · In development', href: 'upcoming/', img: 'assets/films/khoj-w800.svg' },
    // People
    { title: 'Deepak Tijori', meta: 'Founder · Dadasaheb Phalke 2024', href: 'people/deepak-tijori/', img: 'assets/people/deepak-tijori-2026-formal-w1200.jpg' },
    { title: 'Mandeep Kaur Tijori', meta: 'Director · Producer · Actor', href: 'people/mandeep-kaur-tijori/', img: 'assets/people/mandeep-kaur-tijori-w800.jpg' },
    { title: 'Arshdeep Singh', meta: 'Managing Director · Alliance Media Pty Ltd · Melbourne', href: 'people/arshdeep-singh/', img: 'assets/people/arshdeep-singh-w800.jpg' },
    { title: 'Snehal Kulshreshtha', meta: 'Director · PR & Global Outreach', href: 'people/snehal-kulshreshtha/', img: 'assets/people/snehal-kulshreshtha-w800.jpg' },
    { title: 'Anita Sharma', meta: 'Co-Producer · Music Director', href: 'people/anita-sharma/', img: 'assets/people/anita-sharma-w800.jpg' },
    { title: 'Ramesh Sharma', meta: 'Co-Producer · Echoes of Us', href: 'people/ramesh-sharma/', img: 'assets/people/ramesh-sharma-w800.jpg' },
  ];

  /* ─── Hero rotator ─────────────────────────────────── */
  function initHero() {
    const slidesWrap = document.querySelector('.hero__slides');
    if (!slidesWrap) return;
    const slides = Array.from(slidesWrap.querySelectorAll('.hero__slide'));
    const titles = Array.from(document.querySelectorAll('.hero__copy[data-slide]'));
    const quoteChips = Array.from(document.querySelectorAll('.hero__quote-chip[data-slide-quote]'));
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
      // Quote chips: only some slides have one — hide all, then show the one matching this slide (if exists)
      if (quoteChips.length) {
        quoteChips.forEach(c => { c.style.display = 'none'; });
        const match = quoteChips.find(c => parseInt(c.getAttribute('data-slide-quote'), 10) === idx);
        if (match) {
          // Force a reflow so animation restarts
          match.style.display = '';
          void match.offsetWidth;
          match.style.animation = 'none';
          requestAnimationFrame(() => { match.style.animation = ''; });
        }
      }
      if (dotsWrap) dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('is-active', i === idx));
      paintCounter();
    }

    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join('');
      dotsWrap.querySelectorAll('button').forEach((b, i) => b.addEventListener('click', () => { go(i); restart(); }));
    }

    function restart() {
      clearInterval(timer);
      // Honour reduced-motion: hold on slide 1 instead of auto-cycling
      if (prefersReducedMotion) return;
      timer = setInterval(() => go(idx + 1), 6000);
    }
    go(0);
    restart();
  }

  /* ─── Form validation (Submit + Contact) ───────────── */
  function initForms() {
    const forms = document.querySelectorAll('form.pitch-form');
    if (!forms.length) return;

    forms.forEach(form => {
      const status = form.querySelector('.form-status') || (() => {
        const el = document.createElement('div');
        el.className = 'form-status';
        el.setAttribute('role', 'status');
        el.setAttribute('aria-live', 'polite');
        form.appendChild(el);
        return el;
      })();

      function validateField(field) {
        const wrap = field.closest('label') || field.parentElement;
        let err = wrap.querySelector('.field-error');
        const validity = field.validity;
        let msg = '';

        if (validity.valueMissing) msg = 'This field is required.';
        else if (validity.typeMismatch && field.type === 'email') msg = 'Please enter a valid email address.';
        else if (validity.tooShort) msg = 'Please add a little more detail.';
        else if (!validity.valid) msg = field.validationMessage || 'Please check this field.';

        if (msg) {
          field.setAttribute('aria-invalid', 'true');
          if (!err) {
            err = document.createElement('div');
            err.className = 'field-error';
            err.setAttribute('role', 'alert');
            wrap.appendChild(err);
          }
          err.textContent = msg;
          err.classList.add('is-shown');
          return false;
        } else {
          field.removeAttribute('aria-invalid');
          if (err) err.classList.remove('is-shown');
          return true;
        }
      }

      // Validate on blur (skill rule: inline-validation on blur, not keystroke)
      form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => {
          if (field.value || field.required) validateField(field);
        });
        field.addEventListener('input', () => {
          // Clear error as soon as the user starts fixing it
          if (field.getAttribute('aria-invalid') === 'true' && field.validity.valid) {
            field.removeAttribute('aria-invalid');
            const wrap = field.closest('label') || field.parentElement;
            const err = wrap.querySelector('.field-error');
            if (err) err.classList.remove('is-shown');
          }
        });
      });

      form.addEventListener('submit', function (e) {
        // Client-side validation only — if all fields valid, let the form post natively to Formsubmit.
        let firstInvalid = null;
        form.querySelectorAll('input, select, textarea').forEach(field => {
          // Skip Formsubmit's hidden control fields (names prefixed with _)
          if (field.name && field.name.charAt(0) === '_') return;
          if (!validateField(field) && !firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
          e.preventDefault();
          status.className = 'form-status is-error';
          status.textContent = 'Please correct the highlighted fields and try again.';
          firstInvalid.focus();
          return;
        }

        // Honeypot anti-bot guard (Formsubmit also enforces server-side)
        const honey = form.querySelector('input[name="_honey"]');
        if (honey && honey.value) {
          e.preventDefault();
          status.className = 'form-status is-error';
          status.textContent = 'Submission blocked.';
          return;
        }

        // Show in-flight message; the browser will redirect to Formsubmit's thank-you page.
        status.className = 'form-status is-success';
        status.textContent = 'Sending your message — please wait…';
        // Disable the submit button to prevent double-posting
        const btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        // Native submit proceeds.
      });
    });
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

  /* ─── Trailer modal (mi-amor style click-to-play) ──── */
  function initTrailerModal() {
    const modal = document.getElementById('trailerModal');
    if (!modal) return;
    const embed = document.getElementById('trailerEmbed');

    function open(videoId) {
      // Strip YouTube branding/related-videos as much as the embed API allows.
      // youtube-nocookie.com = privacy-enhanced mode (no tracking cookies until play)
      // rel=0 disables the related-videos grid at end (Same-channel only since 2018)
      // modestbranding=1 hides the YouTube wordmark on the control bar
      // iv_load_policy=3 hides video annotations
      // playsinline=1 prevents iOS forced full-screen takeover
      // color=white = white progress bar instead of red
      // disablekb=0 keeps keyboard shortcuts
      const params = 'autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&color=white&fs=1';
      embed.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + videoId + '?' + params +
        '" title="Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      embed.innerHTML = '';   // stops the video
      document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-trailer]').forEach(btn => {
      btn.addEventListener('click', () => open(btn.getAttribute('data-trailer')));
    });
    modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  /* ─── Mobile nav (a11y + iOS-safe scroll-lock) ─────── */
  function initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    // Make sure nav has an id so aria-controls works
    if (!nav.id) nav.id = 'primary-nav';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');

    let savedScrollY = 0;

    function open() {
      savedScrollY = window.scrollY;
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      // iOS-safe scroll-lock — prevents rubber-band
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + savedScrollY + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      // Move focus into the nav for keyboard users
      const firstLink = nav.querySelector('a');
      if (firstLink) requestAnimationFrame(() => firstLink.focus());
    }

    function close(returnFocus) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      // Release scroll-lock
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, savedScrollY);
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) close(true); else open();
    });

    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => close(false)));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) close(true);
    });
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
    let matched = false;
    document.querySelectorAll('.main-nav a[data-key]').forEach(a => {
      const key = a.getAttribute('data-key');
      if (key && key !== 'home' && p.indexOf('/' + key + '/') !== -1) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
        matched = true;
      }
    });
    // Home is the active page only when nothing else matched and we're at the site root
    if (!matched) {
      const homeLink = document.querySelector('.main-nav a[data-key="home"]');
      if (homeLink) {
        homeLink.classList.add('is-active');
        homeLink.setAttribute('aria-current', 'page');
      }
    }
  }

  /* ─── Reduced-motion detection ─────────────────────── */
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Image fallback for any broken poster/portrait ── */
  function initImageFallbacks() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function () {
        this.classList.add('is-missing');
        this.removeAttribute('src');           // stop browser's broken-image icon
        this.setAttribute('alt', 'Image unavailable');
      }, { once: true });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initSearch();
    initTrailerModal();
    initMobileNav();
    initReveal();
    initActiveNav();
    initForms();
    initImageFallbacks();
  });
})();
