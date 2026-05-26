// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

function toggleMenu() {
  mobileMenu.classList.toggle('hidden');
  const isHidden = mobileMenu.classList.contains('hidden');
  menuIcon.setAttribute('d', isHidden ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12');
}

if (menuBtn) {
  menuBtn.addEventListener('click', toggleMenu);
}

// Navbar scroll response
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.classList.add('bg-white', 'shadow-md', 'border-b', 'border-burgundy-100');
    nav.classList.remove('bg-white/90');
  } else {
    nav.classList.add('bg-white/90');
    nav.classList.remove('bg-white', 'shadow-md');
  }
});

// Scroll Reveal Observer
const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => observer.observe(el));

// Product Slider Control
const slider = document.getElementById('product-slider');
function scrollSlider(direction) {
  if (!slider) return;
  const scrollAmt = slider.clientWidth;
  slider.scrollBy({
    left: direction === 'left' ? -scrollAmt : scrollAmt,
    behavior: 'smooth'
  });
}

// Modal management
const modal = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const selectedProdInput = document.getElementById('selected-product');

function openModal(productName = '') {
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (productName) {
    modalTitle.textContent = `Inquire: ${productName}`;
    selectedProdInput.value = productName;
  } else {
    modalTitle.textContent = 'Request Export Quote';
    selectedProdInput.value = 'General Inquiry';
  }
}

function closeModal() {
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// Close modal on background click
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}



// Form Handlers
function handleInquiry(e) {
  e.preventDefault();
  alert('Thank you for contacting Vihaan Agro Overseas! Our trade desk representative will reach out to you within 24 hours.');
  e.target.reset();
}

function handleModalSubmit(e) {
  e.preventDefault();
  alert('Your custom quote request has been received. A proforma invoice draft will be sent to your email.');
  closeModal();
  e.target.reset();
}

// Active page link highlighting
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('#navbar nav a, #mobile-menu a');
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.className = link.className.replace(/hover:text-gold-600|text-burgundy-950\/80/g, '') + ' text-gold-600 font-bold';
    }
  });
});

// Image Gallery thumbnail switcher
function switchImage(cardId, src, btnElement) {
  const mainImg = document.getElementById('main-img-' + cardId);
  if (!mainImg) return;
  mainImg.src = src;
  
  // Update borders of thumbnails in the same card
  const container = btnElement.parentElement;
  if (container) {
    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.classList.remove('border-gold-500', 'ring-2', 'ring-gold-500/50');
      btn.classList.add('border-white/30');
    });
  }
  btnElement.classList.add('border-gold-500', 'ring-2', 'ring-gold-500/50');
  btnElement.classList.remove('border-white/30');
}
