// ===== Mobile nav toggle =====
const toggle = document.querySelector('.nav__toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.nav__links a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}

// ===== Animated counters =====
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const fmt = (n) => n.toLocaleString('en-CA');
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const dur = 1400; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const cio = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => cio.observe(c));
}
