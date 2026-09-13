
document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Filtering (Graphic Design, AI Visuals, AI Animation)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const behanceCards = document.querySelectorAll('.behance-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const categoryFilter = btn.getAttribute('data-filter');

            behanceCards.forEach(card => {
                const itemCategory = card.getAttribute('data-category');
                if (itemCategory === categoryFilter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Set Graphic Design active on load
    const initialActive = document.querySelector('.filter-btn.active');
    if (initialActive) {
        initialActive.click();
    }

    // 2. Fullscreen Lightbox with Next / Previous Image Navigation
    const lightbox = document.getElementById('behance-lightbox');
    const lightboxImg = document.getElementById('lightbox-active-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let visibleImgList = [];
    let currentIdx = 0;

    function refreshVisibleImages() {
        visibleImgList = [];
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        document.querySelectorAll(`.behance-card[data-category="${activeCategory}"] img`).forEach(img => {
            visibleImgList.push(img.src);
        });
    }

    document.querySelectorAll('.behance-card img').forEach(img => {
        img.addEventListener('click', () => {
            refreshVisibleImages();
            currentIdx = visibleImgList.indexOf(img.src);
            if (currentIdx !== -1) {
                lightboxImg.src = visibleImgList[currentIdx];
                lightbox.style.display = 'flex';
            }
        });
    });

    function showNext() {
        if (visibleImgList.length === 0) return;
        currentIdx = (currentIdx + 1) % visibleImgList.length;
        lightboxImg.src = visibleImgList[currentIdx];
    }

    function showPrev() {
        if (visibleImgList.length === 0) return;
        currentIdx = (currentIdx - 1 + visibleImgList.length) % visibleImgList.length;
        lightboxImg.src = visibleImgList[currentIdx];
    }

    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

    if (closeBtn) closeBtn.addEventListener('click', () => { lightbox.style.display = 'none'; });
    if (lightbox) lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.style.display = 'none';
    });

    // 3. Contact Form Submission
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
});
