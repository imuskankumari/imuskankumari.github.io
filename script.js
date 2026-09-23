/* ==========================================================
   JAVASCRIPT CODE START
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
        document.querySelectorAll('.nav-item, .footer-nav-links a').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    // 2. Hero Section Model Auto-Switching (Model 1 & Model 2) every 6 seconds
    const modelImg = document.getElementById('changing-model');
    if (modelImg) {
        const models = ['model1.png', 'model2.png'];
        let currentModelIdx = 0;
        setInterval(() => {
            modelImg.classList.remove('active-model');
            setTimeout(() => {
                currentModelIdx = (currentModelIdx + 1) % models.length;
                modelImg.src = models[currentModelIdx];
                modelImg.classList.add('active-model');
            }, 400);
        }, 6000);
    }

    // 3. View More Button Logic for Creative Design Section
    const viewMoreBtn = document.getElementById('view-more-btn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            document.querySelectorAll('.hidden-item').forEach(item => {
                item.style.display = 'block';
            });
            viewMoreBtn.style.display = 'none';
        });
    }

    // 4. Fullscreen Lightbox Modal
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.lightbox-close-btn');
    const prevArrow = document.getElementById('lightbox-prev');
    const nextArrow = document.getElementById('lightbox-next');
    let activeImageList = [], currentActiveIndex = 0;

    function refreshActiveImageList() {
        activeImageList = [];
        document.querySelectorAll('#design-grid .project-box img').forEach(img => {
            if (img.closest('.project-box').style.display !== 'none') {
                activeImageList.push(img.src);
            }
        });
    }

    document.querySelectorAll('.project-box img').forEach(img => {
        img.addEventListener('click', () => {
            refreshActiveImageList();
            currentActiveIndex = activeImageList.indexOf(img.src);
            if (currentActiveIndex !== -1) {
                modalImg.src = activeImageList[currentActiveIndex];
                modal.style.display = 'flex';
            }
        });
    });

    function showNextImage() {
        if (!activeImageList.length) return;
        currentActiveIndex = (currentActiveIndex + 1) % activeImageList.length;
        modalImg.src = activeImageList[currentActiveIndex];
    }
    function showPrevImage() {
        if (!activeImageList.length) return;
        currentActiveIndex = (currentActiveIndex - 1 + activeImageList.length) % activeImageList.length;
        modalImg.src = activeImageList[currentActiveIndex];
    }

    if (nextArrow) nextArrow.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });
    if (prevArrow) prevArrow.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });
    if (closeModal) closeModal.addEventListener('click', () => { modal.style.display = 'none'; });
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    document.addEventListener('keydown', (e) => {
        if (modal && modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'Escape') modal.style.display = 'none';
        }
    });

    // 5. Contact Form Submission Alert
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
});
/* ==========================================================
   JAVASCRIPT CODE END
   ========================================================== */
