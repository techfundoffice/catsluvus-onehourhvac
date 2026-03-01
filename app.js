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
  const header = document.querySelector('.site-header');
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
      const parentList = item.closest('.faq-list');
      // Close all in same list
      if (parentList) {
        parentList.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('open');
          const btn = i.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
      // Toggle current
      if (!wasOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
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

  // ---- Cost Estimator ----
  const calcBtn = document.getElementById('calcEstimate');
  if (calcBtn) {
    const calculateEstimate = () => {
      const suiteType = document.getElementById('estSuiteType');
      const nights = document.getElementById('estNights');
      const cats = document.getElementById('estCats');
      const grooming = document.getElementById('estGrooming');
      const totalEl = document.getElementById('estimateTotal');
      const breakdownEl = document.getElementById('estimateBreakdown');
      const discountEl = document.getElementById('estimateDiscount');

      if (!suiteType || !nights || !cats || !grooming || !totalEl) return;

      const suiteRate = parseInt(suiteType.value);
      const numNights = Math.max(1, parseInt(nights.value) || 1);
      const numCats = Math.min(parseInt(cats.value), 3);
      const groomingCost = parseInt(grooming.value);
      const suiteName = suiteRate === 45 ? 'Luxury Suite' : 'Standard Suite';

      let boardingTotal = suiteRate * numNights * numCats;
      let groomingTotal = groomingCost * numCats;
      let discount = 0;
      let discountText = '';

      // Long-term discount: 14+ nights
      if (numNights >= 14) {
        discount = Math.round(boardingTotal * 0.15);
        discountText = '15% long-term discount applied: -$' + discount;
      }

      const total = boardingTotal + groomingTotal - discount;
      let breakdown = suiteName + ' × ' + numNights + ' night' + (numNights > 1 ? 's' : '') + ' × ' + numCats + ' cat' + (numCats > 1 ? 's' : '') + ' = $' + boardingTotal;

      if (groomingTotal > 0) {
        const groomingName = groomingCost === 85 ? 'Full Grooming' : 'Bath & Brush';
        breakdown += ' + ' + groomingName + ' ($' + groomingCost + ' × ' + numCats + ') = $' + groomingTotal;
      }

      totalEl.textContent = '$' + total;
      breakdownEl.textContent = breakdown;

      if (discountText) {
        discountEl.textContent = discountText;
        discountEl.style.display = 'block';
      } else {
        discountEl.style.display = 'none';
      }
    };

    calcBtn.addEventListener('click', calculateEstimate);

    // Auto-calculate on any input change
    ['estSuiteType', 'estNights', 'estCats', 'estGrooming'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', calculateEstimate);
    });

    // Also on keyup for the nights input
    const nightsInput = document.getElementById('estNights');
    if (nightsInput) nightsInput.addEventListener('keyup', calculateEstimate);
  }

  // ---- Print / Save Button ----
  const printBtn = document.getElementById('printPage');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ---- Site Search ----
  const searchToggle = document.getElementById('searchToggle');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchForm = document.getElementById('siteSearchForm');
  const searchInput = document.getElementById('siteSearchInput');
  const searchResults = document.getElementById('searchResults');

  // Search data — all site pages
  const sitePages = [
    { title: 'Home', url: 'index.html', keywords: 'home boarding grooming daycare cat care laguna niguel' },
    { title: 'Cat Boarding Services', url: 'services-boarding.html', keywords: 'boarding overnight stay suites cat hotel' },
    { title: 'Standard Suite', url: 'services-boarding-standard.html', keywords: 'standard suite affordable boarding basic' },
    { title: 'Luxury Suite', url: 'services-boarding-luxury.html', keywords: 'luxury suite premium window perch upgrade' },
    { title: 'Long-Term Boarding', url: 'services-boarding-long-term.html', keywords: 'long term extended stay month discount' },
    { title: 'Cat Grooming Services', url: 'services-grooming.html', keywords: 'grooming bath brush haircut nail trim' },
    { title: 'Bath & Brush', url: 'services-grooming-bath.html', keywords: 'bath brush wash clean shampoo' },
    { title: 'Full Grooming', url: 'services-grooming-full.html', keywords: 'full grooming haircut styling lion cut' },
    { title: 'Cat Daycare', url: 'services-daycare.html', keywords: 'daycare day care play socialization' },
    { title: 'All Services', url: 'services.html', keywords: 'services overview all boarding grooming daycare' },
    { title: 'About Us - Our Story', url: 'about-us.html', keywords: 'about us story history family owned 1993' },
    { title: 'Our Guarantees', url: 'about-us-our-guarantees.html', keywords: 'guarantees satisfaction promise commitment' },
    { title: 'Code of Ethics', url: 'about-us-code-of-ethics.html', keywords: 'ethics values standards care principles' },
    { title: 'Club Membership', url: 'about-us-club-membership.html', keywords: 'membership club loyalty rewards discount' },
    { title: 'Reviews', url: 'reviews.html', keywords: 'reviews testimonials ratings google yelp' },
    { title: 'Contact Us / Book Now', url: 'contact.html', keywords: 'contact book reservation phone email address directions' },
    { title: 'Areas We Service', url: 'areas-we-service.html', keywords: 'areas locations service orange county laguna niguel dana point' },
    { title: 'Accessibility', url: 'accessibility.html', keywords: 'accessibility ada compliant' },
    { title: 'Privacy Policy', url: 'privacy-policy.html', keywords: 'privacy policy data' }
  ];

  if (searchToggle && searchModal) {
    searchToggle.addEventListener('click', () => {
      searchModal.classList.add('active');
      searchModal.setAttribute('aria-hidden', 'false');
      setTimeout(() => searchInput?.focus(), 200);
    });

    const closeSearch = () => {
      searchModal.classList.remove('active');
      searchModal.setAttribute('aria-hidden', 'true');
      if (searchResults) searchResults.innerHTML = '';
      if (searchInput) searchInput.value = '';
    };

    if (searchClose) searchClose.addEventListener('click', closeSearch);

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) closeSearch();
    });
  }

  if (searchForm && searchInput && searchResults) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.toLowerCase().trim();
      if (!query) return;

      const results = sitePages.filter(page => {
        return page.title.toLowerCase().includes(query) || page.keywords.includes(query);
      });

      if (results.length > 0) {
        searchResults.innerHTML = results.map(r =>
          '<a href="' + r.url + '">' + r.title + '</a>'
        ).join('');
      } else {
        searchResults.innerHTML = '<p class="search-no-results">No results found for "' + query + '". Try a different search term, or call us at <a href="tel:9495821732">(949) 582-1732</a>.</p>';
      }
    });

    // Live search on typing
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }
      const results = sitePages.filter(page => {
        return page.title.toLowerCase().includes(query) || page.keywords.includes(query);
      });
      if (results.length > 0) {
        searchResults.innerHTML = results.map(r =>
          '<a href="' + r.url + '">' + r.title + '</a>'
        ).join('');
      } else {
        searchResults.innerHTML = '<p class="search-no-results">No results found for "' + query + '"</p>';
      }
    });
  }

  // ---- TOC Active Highlight on Scroll ----
  const tocLinks = document.querySelectorAll('.toc__link');
  if (tocLinks.length > 0) {
    const sections = [];
    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const section = document.querySelector(href);
        if (section) sections.push({ el: section, link: link });
      }
    });

    if (sections.length > 0) {
      const highlightTOC = () => {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;

        let current = sections[0];
        for (const s of sections) {
          if (s.el.offsetTop - headerHeight - 100 <= scrollY) {
            current = s;
          }
        }

        tocLinks.forEach(l => l.classList.remove('active'));
        if (current) current.link.classList.add('active');
      };

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            highlightTOC();
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  }

  // ---- Download Checklist (simulated) ----
  document.querySelectorAll('.download-checklist').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Thank you! Your Boarding Preparation Checklist would download here. For now, call us at (949) 582-1732 and we\'ll email it to you!');
    });
  });

  // ---- Review Carousel Navigation ----
  const repTrack = document.getElementById('repTrack');
  const repPrev = document.getElementById('repPrev');
  const repNext = document.getElementById('repNext');
  if (repTrack && repPrev && repNext) {
    let scrollPos = 0;
    const scrollAmount = 340;
    repNext.addEventListener('click', () => {
      scrollPos = Math.min(scrollPos + scrollAmount, repTrack.scrollWidth - repTrack.clientWidth);
      repTrack.scrollTo({ left: scrollPos, behavior: 'smooth' });
    });
    repPrev.addEventListener('click', () => {
      scrollPos = Math.max(scrollPos - scrollAmount, 0);
      repTrack.scrollTo({ left: scrollPos, behavior: 'smooth' });
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
    .animate-in:nth-child(5) { transition-delay: .4s; }
    .animate-in:nth-child(6) { transition-delay: .5s; }
  `;
  document.head.appendChild(style);
});
