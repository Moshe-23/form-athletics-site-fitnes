/* ============================================================
   FORM/ATHLETICS — interactions
   ============================================================ */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header state ---------- */

  const header = document.getElementById('header');

  const onScrollHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };

  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- mobile menu ---------- */

  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) burger.focus();
  };

  burger.addEventListener('click', () => {
    setMenu(!menu.classList.contains('is-open'));
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setMenu(false);
  });

  // close menu on escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMenu(false);
      document.documentElement.focus();
    }
  });

  /* ---------- scroll reveal ---------- */

  const revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-revealed'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- active nav link ---------- */

  const navLinks = document.querySelectorAll('.nav__link');
  const sectionIds = Array.from(navLinks)
    .map((a) => a.getAttribute('href'))
    .filter((h) => h && h.startsWith('#'))
    .map((h) => document.querySelector(h))
    .filter(Boolean);

  const scrollSpy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach((a) => {
          a.classList.toggle('is-current', a.getAttribute('href') === id);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sectionIds.forEach((sec) => scrollSpy.observe(sec));

  /* ---------- FAQ accordion ---------- */

  const faqButtons = document.querySelectorAll('.faq__q');

  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (!isOpen) {
        // close the others, keep one open
        faqButtons.forEach((other) => {
          other.setAttribute('aria-expanded', 'false');
        });
      }
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------- schedule ---------- */

  const DAYS = [
    { key: 'MON', full: 'Monday' },
    { key: 'TUE', full: 'Tuesday' },
    { key: 'WED', full: 'Wednesday' },
    { key: 'THU', full: 'Thursday' },
    { key: 'FRI', full: 'Friday' },
    { key: 'SAT', full: 'Saturday' },
    { key: 'SUN', full: 'Sunday' }
  ];

  const SCHEDULE = {
    0: [
      { t: '07:00', d: '60', type: 'strength', title: 'Lifting blocks', coach: 'Marcus Foley' },
      { t: '12:30', d: '60', type: 'strength', title: 'Lifting blocks', coach: 'Dana Keller' },
      { t: '18:00', d: '45', type: 'conditioning', title: 'Engine', coach: 'Marcus Foley' },
      { t: '19:30', d: '60', type: 'strength', title: 'Evening strength', coach: 'Dana Keller' }
    ],
    1: [
      { t: '07:00', d: '30', type: 'personal', title: '1:1 session', coach: 'Eli Vance' },
      { t: '12:30', d: '45', type: 'conditioning', title: 'Engine', coach: 'Marcus Foley' },
      { t: '18:00', d: '60', type: 'strength', title: 'Lifting blocks', coach: 'Dana Keller' },
      { t: '19:45', d: '45', type: 'conditioning', title: 'Sprint class', coach: 'Marcus Foley' }
    ],
    2: [
      { t: '07:00', d: '60', type: 'strength', title: 'Lifting blocks', coach: 'Dana Keller' },
      { t: '18:00', d: '60', type: 'strength', title: 'Evening strength', coach: 'Marcus Foley' },
      { t: '19:00', d: '45', type: 'conditioning', title: 'Engine', coach: 'Eli Vance' }
    ],
    3: [
      { t: '07:00', d: '45', type: 'conditioning', title: 'Sprint class', coach: 'Marcus Foley' },
      { t: '12:30', d: '30', type: 'personal', title: '1:1 session', coach: 'Eli Vance' },
      { t: '18:00', d: '60', type: 'strength', title: 'Lifting blocks', coach: 'Dana Keller' }
    ],
    4: [
      { t: '07:00', d: '60', type: 'strength', title: 'Lifting blocks', coach: 'Dana Keller' },
      { t: '17:30', d: '45', type: 'conditioning', title: 'Engine', coach: 'Marcus Foley' },
      { t: '19:00', d: '30', type: 'personal', title: '1:1 session', coach: 'Eli Vance' }
    ],
    5: [
      { t: '09:00', d: '60', type: 'strength', title: 'Sat morning strength', coach: 'Marcus Foley' },
      { t: '10:30', d: '45', type: 'conditioning', title: 'Engine', coach: 'Dana Keller' }
    ],
    6: null
  };

  const TYPE_LABEL = {
    strength: 'Strength',
    conditioning: 'Conditioning',
    personal: 'Personal'
  };

  const grid = document.getElementById('schedGrid');
  let currentFilter = 'all';

  const renderSchedule = () => {
    grid.innerHTML = '';

    DAYS.forEach((day, i) => {
      const dayEl = document.createElement('div');
      dayEl.className = 'sched__day';

      const sessions = (SCHEDULE[i] || []).filter(
        (s) => currentFilter === 'all' || s.type === currentFilter
      );

      const head = document.createElement('div');
      head.className = 'sched__day-head';
      head.innerHTML =
        '<span class="sched__day-name">' + day.key + '</span>' +
        '<span class="sched__day-count">' + (sessions.length || '—') + '</span>';
      dayEl.appendChild(head);

      const list = document.createElement('div');
      list.className = 'sched__day-body';

      if (sessions.length) {
        sessions.forEach((s, si) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'sess';
          btn.dataset.day = day.full;
          btn.dataset.time = s.t;
          btn.dataset.type = s.type;
          btn.dataset.title = s.title;
          btn.setAttribute('aria-label', 'Book ' + s.title + ' on ' + day.full + ' at ' + s.t);
          btn.style.setProperty('--sess-i', si);

          btn.innerHTML =
            '<span class="sess__time"><span>' + s.t + '</span><span class="sess__dur">' + s.d + 'MIN</span></span>' +
            '<span class="sess__title">' + s.title + '</span>' +
            '<span class="sess__coach">' + s.coach + ' · ' + TYPE_LABEL[s.type] + '</span>' +
            '<span class="sess__book">Book<span class="sess__book-arrow">→</span></span>';

          btn.addEventListener('click', () => bookFromSession(day, s));
          list.appendChild(btn);
        });
      } else {
        const empty = document.createElement('div');
        if (i === 6 && currentFilter === 'all') {
          empty.className = 'sched__open';
          empty.textContent = day.full + ' — managed open floor. No classes.';
        } else {
          empty.className = 'sess sess--empty';
          empty.textContent = 'No classes';
        }
        list.appendChild(empty);
      }

      dayEl.appendChild(list);
      grid.appendChild(dayEl);
    });
  };

  const bookFromSession = (day, session) => {
    const goal = document.getElementById('f-goal');
    const date = document.getElementById('f-date');
    const time = document.getElementById('f-time');

    if (goal) goal.value = session.type;
    if (time && session.t !== '12:30' && session.t !== '18:00') time.value = session.t;
    if (date) {
      const d = new Date();
      const dayIdx = DAYS.findIndex((entry) => entry.key === day.key);
      const daysAhead = ((7 + dayIdx + 1 - d.getDay()) % 7) + 7;
      d.setDate(d.getDate() + daysAhead);
      date.value = toISODate(d);
    }

    document.getElementById('booking').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    if (goal) goal.focus({ preventScroll: true });
  };

  const toISODate = (d) => {
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  };

  const filterButtons = document.querySelectorAll('.filter');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
      currentFilter = btn.dataset.filter;
      renderSchedule();
    });
  });

  renderSchedule();

  /* ---------- booking form ---------- */

  const form = document.getElementById('bookingForm');
  const successPanel = document.getElementById('formSuccess');
  const dateInput = document.getElementById('f-date');
  const fields = {
    name: document.getElementById('f-name'),
    email: document.getElementById('f-email'),
    phone: document.getElementById('f-phone'),
    goal: document.getElementById('f-goal'),
    date: document.getElementById('f-date')
  };

  const errors = {
    name: document.getElementById('e-name'),
    email: document.getElementById('e-email'),
    phone: document.getElementById('e-phone'),
    goal: document.getElementById('e-goal'),
    date: document.getElementById('e-date')
  };

  const today = new Date();
  if (dateInput) {
    dateInput.min = toISODate(today);
    if (!dateInput.value) dateInput.value = toISODate(today);
  }

  const setError = (key, message) => {
    const field = fields[key];
    const box = errors[key];
    if (!field || !box) return;
    field.closest('.form__field').classList.toggle('is-invalid', Boolean(message));
    box.textContent = message || '';
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  };

  const validators = {
    name: (v) => {
      if (!v.trim()) return 'Enter your name';
      if (v.trim().length < 2) return 'Name is too short';
      return '';
    },
    email: (v) => {
      if (!v.trim()) return 'Enter your email';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Enter a valid email';
      return '';
    },
    phone: (v) => {
      const digits = v.replace(/[^\d+]/g, '');
      if (!digits) return 'Enter your phone';
      if (digits.replace(/\D/g, '').length < 7) return 'Phone number is too short';
      return '';
    },
    goal: (v) => (v ? '' : 'Choose a goal'),
    date: (v) => {
      if (!v) return 'Pick a date';
      const chosen = new Date(v + 'T00:00:00');
      const todayD = new Date();
      todayD.setHours(0, 0, 0, 0);
      if (chosen < todayD) return "Date can't be in the past";
      return '';
    }
  };

  const validateField = (key) => {
    const field = fields[key];
    if (!field) return true;
    const message = validators[key](field.value);
    setError(key, message);
    return !message;
  };

  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (!field) return;
    field.addEventListener('blur', () => validateField(key));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let firstInvalid = null;
    Object.keys(fields).forEach((key) => {
      const ok = validateField(key);
      if (!ok && !firstInvalid) firstInvalid = fields[key];
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    form.hidden = true;
    successPanel.hidden = false;
    successPanel.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
  });

  document.getElementById('formReset').addEventListener('click', () => {
    form.reset();
    Object.keys(fields).forEach((key) => setError(key, ''));
    const todayD = new Date();
    if (dateInput) dateInput.value = toISODate(todayD);
    form.hidden = false;
    successPanel.hidden = true;
    fields.name.focus();
  });

  /* ---------- footer year ---------- */

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();