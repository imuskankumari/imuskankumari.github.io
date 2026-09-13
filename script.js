document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Functionality
    const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-item-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize Graphic Design tab on page load
    const activeTab = document.querySelector('.portfolio-tab-btn.active');
    if (activeTab) {
        activeTab.click();
    }

    // 2. Fullscreen Lightbox with Image Slide Support
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.lightbox-close-btn');
    const prevArrow = document.getElementById('lightbox-prev');
    const nextArrow = document.getElementById('lightbox-next');

    let activeImageList = [];
    let currentActiveIndex = 0;

    function refreshActiveImageList() {
        activeImageList = [];
        const currentCategory = document.querySelector('.portfolio-tab-btn.active').getAttribute('data-filter');
        document.querySelectorAll(`.portfolio-item-card[data-category="${currentCategory}"] img`).forEach(img => {
            activeImageList.push(img.src);
        });
    }

    document.querySelectorAll('.portfolio-item-card img').forEach(img => {
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

    // Keyboard Arrow Keys Support (Left/Right to slide, Esc to close)
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'Escape') modal.style.display = 'none';
        }
    });

    // 3. Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
});

