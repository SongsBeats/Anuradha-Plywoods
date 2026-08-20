/**
 * ANURADHA PLYWOODS - Interactive Logic & Estimator Suite
 * Phone: +91 8247893728 | Sing Nager, Vijayawada
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCatalogFilters();
  initGalleryLightbox();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   1. NAVBAR & SCROLL INTERACTION
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   2. PRODUCT CATALOG TABS & FILTER
   ========================================================================== */
function initCatalogFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (filter === 'marine' && (category === 'marine' || category === 'bwp'))) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. AUTHENTIC GALLERY & LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!lightbox || !galleryItems.length) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || img.getAttribute('alt') || 'Anuradha Plywoods Warehouse Stock';
      
      lightboxImg.src = img.src;
      lightboxImg.alt = caption;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   5. FAQS ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isActive) {
        parent.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM & WHATSAPP INTEGRATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-quote-form');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const requirement = document.getElementById('form-requirement').value.trim();
    const location = document.getElementById('form-location').value.trim();

    if (!name || !phone || !requirement) {
      if (formStatus) {
        formStatus.textContent = 'Please enter your name, phone number, and requirements.';
        formStatus.style.color = '#ef4444';
      }
      return;
    }

    // Direct WhatsApp pre-filled link
    const waMsg = encodeURIComponent(
      `Hello Anuradha Plywoods (Vijayawada),\n\nMy Details:\n• Name: ${name}\n• Phone: ${phone}\n• Delivery Location: ${location || 'Vijayawada'}\n• Requirements: ${requirement}\n\nPlease share wholesale pricing and quotation.`
    );

    if (formStatus) {
      formStatus.textContent = 'Opening WhatsApp with your inquiry details...';
      formStatus.style.color = '#10b981';
    }

    setTimeout(() => {
      window.open(`https://wa.me/918247893728?text=${waMsg}`, '_blank');
      form.reset();
      if (formStatus) {
        formStatus.textContent = 'Inquiry sent! Our timber expert will connect with you shortly.';
      }
    }, 600);
  });
}
