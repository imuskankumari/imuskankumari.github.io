document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    const heroSlides = document.querySelectorAll('.hero-slide-item');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideIntervalTime = 6000;

    function goToSlide(index) {
        heroSlides.forEach(s => s.classList.remove('active-slide'));
        dots.forEach(d => d.classList.remove('active-dot'));
        heroSlides[index].classList.add('active-slide');
        dots[index].classList.add('active-dot');
        currentSlide = index;
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % heroSlides.length);
    }

    let slideTimer = setInterval(nextSlide, slideIntervalTime);

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            clearInterval(slideTimer);
            goToSlide(idx);
            slideTimer = setInterval(nextSlide, slideIntervalTime);
        });
    });

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

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
});

