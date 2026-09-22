/* ==========================================================
   JAVASCRIPT CODE START
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    // 2. Single Hero Section Model Auto-Switching every 6 seconds
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
            }, 500);
        }, 6000);
    }

    // 3. Project Filter Tabs Functionality
    const tabButtons = document.querySelectorAll('.filter-tab-btn');
    const projectBoxes = document.querySelectorAll('.project-box');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            projectBoxes.forEach(card => {
                card.style.display = (card.getAttribute('data-category') === filterValue) ? 'block' : 'none';
            });
        });
    });

    const activeTab = document.querySelector('.filter-tab-btn.active');
    if (activeTab) activeTab.click();

    // 4. Fullscreen Lightbox Modal
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.lightbox-close-btn');
    const prevArrow = document.getElementById('lightbox-prev');
    const nextArrow = document.getElementById('lightbox-next');
    let activeImageList = [], currentActiveIndex = 0;

    function refreshActiveImageList() {
        activeImageList = [];
        const currentCategory = document.querySelector('.filter-tab-btn.active').getAttribute('data-filter');
        document.querySelectorAll(`.project-box[data-category="${currentCategory}"] img`).forEach(img => activeImageList.push(img.src));
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

