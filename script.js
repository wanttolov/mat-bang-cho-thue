// ===== Image Slideshow =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 4000);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(i);
        startSlideshow();
    });
});

startSlideshow();

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.getAttribute('data-caption');
        lightboxImg.src = img.src;
        lightboxImg.alt = caption;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(
    '.detail-card, .gallery-item, .amenity-item, .location-card, .description-content, .contact-card'
).forEach(el => observer.observe(el));

// ===== Touch Swipe for Slideshow =====
let touchStartX = 0;
let touchEndX = 0;

const hero = document.getElementById('hero');

hero.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

hero.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        clearInterval(slideInterval);
        if (diff > 0) {
            // Swipe left - next
            goToSlide((currentSlide + 1) % slides.length);
        } else {
            // Swipe right - prev
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }
        startSlideshow();
    }
}

// ===== Floating button visibility =====
const floatingBtn = document.getElementById('floating-call-btn');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 300) {
        floatingBtn.style.opacity = '1';
        floatingBtn.style.pointerEvents = 'auto';
    } else {
        floatingBtn.style.opacity = '0';
        floatingBtn.style.pointerEvents = 'none';
    }
    lastScroll = currentScroll;
}, { passive: true });

// Initially hide floating button
floatingBtn.style.opacity = '0';
floatingBtn.style.pointerEvents = 'none';
floatingBtn.style.transition = 'all 0.3s ease';
