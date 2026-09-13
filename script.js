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

    // Default trigger for Graphic Design tab on page load
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        activeTab.click();
    }

    // 2. Click to open Image in Fullscreen Modal
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.modal-close');

    projectCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            card.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = img.src;
            });
        }
    });

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

    // 3. Contact Form Submission Alert
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
});
