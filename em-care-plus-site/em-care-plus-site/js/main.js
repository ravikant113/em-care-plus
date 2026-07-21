// ===================== EM CARE PLUS — shared site script =====================
// This single file is loaded by every page (index.html, about.html, services.html,
// doctors.html, gallery.html, reviews.html, appointment.html, contact.html).
// Every block below checks the element exists first, since not every page has
// every element (e.g. only appointment.html has the booking form).

// Header scroll state
const header = document.getElementById('siteHeader');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// Mobile menu (simple toggle -> shows nav links as dropdown)
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    if (!links) return;
    const isShown = links.style.display === 'flex';
    links.style.display = isShown ? 'none' : 'flex';
    links.style.cssText += isShown ? '' : `
      position:fixed;top:70px;left:20px;right:20px;background:#fff;flex-direction:column;
      padding:20px;border-radius:18px;box-shadow:0 20px 40px rgba(0,20,60,0.2);gap:18px;z-index:99;`;
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// Animated counters
const counters = document.querySelectorAll('.counter');
if (counters.length) {
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const tick = () => {
          current += step;
          if (current >= target) { el.textContent = target + suffix; return; }
          el.textContent = current + suffix;
          requestAnimationFrame(tick);
        };
        tick();
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));
}

// Appointment form (front-end only demo) — only present on appointment.html
const apptForm = document.getElementById('apptForm');
if (apptForm) {
  apptForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.style.display = 'none';
    const success = document.getElementById('formSuccess');
    if (success) success.style.display = 'block';
  });
}
