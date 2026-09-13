// ==========================================
// PORTFOLIO TABS & INTERACTIVE SCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
  const tabContainers = document.querySelectorAll('.tab-content-container');

  // Tab Switching Logic
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // 2. Add active class to clicked button
      button.classList.add('active');

      // 3. Hide all tab content panes
      tabContainers.forEach(container => container.classList.remove('active'));

      // 4. Show the selected tab container
      const targetTab = button.getAttribute('data-tab');
      const activeContainer = document.getElementById(`tab-${targetTab}`);
      if (activeContainer) {
        activeContainer.classList.add('active');
      }

      // Pause all videos when switching away from animation tab
      if (targetTab !== 'animation') {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => video.pause());
      }
    });
  });

  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

