/**
 * Home Nursing Services - Karachi, Pakistan
 * Main JavaScript Interactions Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurable WhatsApp Number for Production Replacement
  // REPLACE '+923000000000' WITH ACTUAL REGISTERED NURSE WHATSAPP NUMBER
  const WHATSAPP_NUMBER = '923000000000';
  const DEFAULT_WA_MESSAGE = 'Hello, I would like to inquire about professional home nursing services in Karachi.';

  /* ==========================================
     1. Sticky Navbar & Scroll Effects
     ========================================== */
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================
     2. Mobile Drawer Navigation
     ========================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerCloseBtn = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openMobileMenu() {
    mobileDrawer?.classList.add('active');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('active');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openMobileMenu);
  drawerCloseBtn?.addEventListener('click', closeMobileMenu);
  drawerOverlay?.addEventListener('click', closeMobileMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  /* ==========================================
     3. Active Nav Link Highlight
     ========================================== */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ==========================================
     4. FAQ Accordion Toggle
     ========================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerEl = item.querySelector('.faq-answer');

    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other active items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        if (answerEl) answerEl.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (answerEl) answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================
     5. Scroll Reveal Observer
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  /* ==========================================
     6. Contact Request Form & Demo Success Modal
     ========================================== */
  const contactForm = document.getElementById('nursingRequestForm');
  const demoModal = document.getElementById('demoSuccessModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic client validation
      const name = document.getElementById('fullName')?.value.trim();
      const phone = document.getElementById('phoneNum')?.value.trim();
      const service = document.getElementById('reqService')?.value;
      const area = document.getElementById('karachiArea')?.value.trim();

      if (!name || !phone || !service || !area) {
        alert('Please fill out all required fields marked with *');
        return;
      }

      // Show success demo modal
      if (demoModal) {
        demoModal.classList.add('active');
      }

      contactForm.reset();
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      demoModal?.classList.remove('active');
    });
  }

  demoModal?.addEventListener('click', (e) => {
    if (e.target === demoModal) {
      demoModal.classList.remove('active');
    }
  });

  /* ==========================================
     7. WhatsApp Quick Action Triggers
     ========================================== */
  const whatsappTriggers = document.querySelectorAll('[data-whatsapp-action]');

  whatsappTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customMsg = btn.getAttribute('data-whatsapp-msg') || DEFAULT_WA_MESSAGE;
      const encodedMsg = encodeURIComponent(customMsg);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    });
  });
});
