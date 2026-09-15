document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // 2. Tab Switching Functionality (Rounded Squares)
    const tabButtons = document.querySelectorAll('.filter-tab-btn');
    const projectBoxes = document.querySelectorAll('.project-box');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectBoxes.forEach(card => {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Default trigger Graphic Design tab on initial load
    const activeTab = document.querySelector('.filter-tab-btn.active');
    if (activeTab) {
        activeTab.click();
    }

    // 3. Fullscreen Lightbox with Image Slide Support
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.lightbox-close-btn');
    const prevArrow = document.getElementById('lightbox-prev');
    const nextArrow = document.getElementById('lightbox-next');

    let activeImageList = [];
    let currentActiveIndex = 0;

    function refreshActiveImageList() {
        activeImageList = [];
        const currentCategory = document.querySelector('.filter-tab-btn.active').getAttribute('data-filter');
        document.querySelectorAll(`.project-box[data-category="${currentCategory}"] img`).forEach(img => {
            activeImageList.push(img.src);
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
        if (activeImageList.length === 0) return;
        currentActiveIndex = (currentActiveIndex + 1) % activeImageList.length;
        modalImg.src = activeImageList[currentActiveIndex];
    }

    function showPrevImage() {
        if (activeImageList.length === 0) return;
        currentActiveIndex = (currentActiveIndex - 1 + activeImageList.length) % activeImageList.length;
        modalImg.src = activeImageList[currentActiveIndex];
    }

    if (nextArrow) nextArrow.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });
    if (prevArrow) prevArrow.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Keyboard support for Lightbox
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'Escape') modal.style.display = 'none';
        }
    });

    // 4. Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
});
