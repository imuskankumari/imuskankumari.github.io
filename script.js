document.addEventListener('DOMContentLoaded', () => {
  // Tabs Switcher
  const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
  const tabContainers = document.querySelectorAll('.tab-content-container');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContainers.forEach(container => container.classList.remove('active'));

      button.classList.add('active');
      const targetId = `tab-${button.getAttribute('data-tab')}`;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.add('active');
      }

      if (button.getAttribute('data-tab') !== 'animation') {
        document.querySelectorAll('video').forEach(video => video.pause());
      }
    });
  });

  // Lightbox Photo Popup
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.close-modal');

  document.querySelectorAll('.behance-card-container img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
