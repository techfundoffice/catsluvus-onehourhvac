/* ============================================================
   CATS LUV US BOARDING HOTEL — Site JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Mobile Menu ----
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
    });
    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // ---- Mobile dropdown toggles ----
  document.querySelectorAll('.nav__item').forEach(item => {
    const link = item.querySelector('.nav__link');
    const dropdown = item.querySelector('.nav__dropdown');
    if (link && dropdown) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('open');
        }
      });
    }
  });

  // ---- Header scroll effect ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Active nav detection ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__dropdown a, .sub-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Intersection Observer for fade-in animations ----
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

  // ---- Zip code form (just visual) ----
  document.querySelectorAll('.zip-bar__form, .hero-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.trim()) {
        alert('Thank you! We serve the ' + input.value + ' area. Please call us at (949) 582-1732 to book your cat\'s stay!');
        input.value = '';
      }
    });
  });

  // ---- Contact form (just visual) ----
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for your message! We\'ll get back to you within 24 hours. You can also call us directly at (949) 582-1732.');
      contactForm.reset();
    });
  }

  // ---- Scroll-reveal CSS ----
  const style = document.createElement('style');
  style.textContent = `
    .animate-in { opacity: 0; transform: translateY(24px); transition: opacity .6s cubic-bezier(.25,.46,.45,.94), transform .6s cubic-bezier(.25,.46,.45,.94); }
    .animate-in.visible { opacity: 1; transform: translateY(0); }
    .animate-in:nth-child(2) { transition-delay: .1s; }
    .animate-in:nth-child(3) { transition-delay: .2s; }
    .animate-in:nth-child(4) { transition-delay: .3s; }
  `;
  document.head.appendChild(style);
});
