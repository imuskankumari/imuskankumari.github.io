document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
  const tabContainers = document.querySelectorAll('.tab-content-container');

  // Tab Filtering
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove active status
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContainers.forEach(container => container.classList.remove('active'));

      // 2. Activate clicked tab
      button.classList.add('active');
      const targetId = `tab-${button.getAttribute('data-tab')}`;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.add('active');
      }

      // 3. Pause videos on other tabs
      if (button.getAttribute('data-tab') !== 'animation') {
        document.querySelectorAll('video').forEach(video => video.pause());
      }
    });
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
