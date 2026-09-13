document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Filtering (Graphic Design, AI Visuals, AI Animation)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Default trigger for Graphic Design on initial load
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        activeTab.click();
    }

    // 2. Fullscreen Lightbox with Next / Previous Image Navigation
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.modal-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let currentImages = [];
    let currentIdx = 0;

    function updateImageList() {
        currentImages = [];
        const currentCategory = document.querySelector('.tab-btn.active').getAttribute('data-filter');
        document.querySelectorAll(`.project-card[data-category="${currentCategory}"] img`).forEach(img => {
            currentImages.push(img.src);
        });
    }

    document.querySelectorAll('.project-card img').forEach(img => {
        img.addEventListener('click', () => {
            updateImageList();
            currentIdx = currentImages.indexOf(img.src);
            if (currentIdx !== -1) {
                modalImg.src = currentImages[currentIdx];
                modal.style.display = 'flex';
            }
        });
    });

    function nextImage() {
        if (currentImages.length === 0) return;
        currentIdx = (currentIdx + 1) % currentImages.length;
        modalImg.src = currentImages[currentIdx];
    }

    function prevImage() {
        if (currentImages.length === 0) return;
        currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
        modalImg.src = currentImages[currentIdx];
    }

    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

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
