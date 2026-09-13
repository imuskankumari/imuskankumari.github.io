document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive 3D Model Automatic Motion & Hover Engine
  const model = document.getElementById('interactiveModel');
  const glow = document.getElementById('modelGlow');
  
  if (model) {
    let step = 0;
    // Automatic 3D breathing & turning animation loop
    setInterval(() => {
      step++;
      const yShift = Math.sin(step * 0.05) * 16;
      const rotY = Math.cos(step * 0.04) * 10;
      const rotX = Math.sin(step * 0.03) * 5;
      const scale = 1 + Math.sin(step * 0.04) * 0.02;

      model.style.transform = `translateY(${-yShift}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`;
      
      if (glow) {
        glow.style.transform = `scale(${1 + Math.sin(step * 0.05) * 0.15})`;
        glow.style.opacity = `${0.4 + Math.sin(step * 0.05) * 0.25}`;
      }
    }, 40);

    // Mouse movement interactive 3D parallax on desktop
    document.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      model.style.filter = `drop-shadow(${-x}px ${20 - y}px 30px rgba(0, 0, 0, 0.85))`;
    });
  }

  // 2. Tab Filtering Logic
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

      // Pause videos if leaving video tab
      if (button.getAttribute('data-tab') !== 'animation') {
        document.querySelectorAll('video').forEach(video => video.pause());
      }
    });
  });

  // 3. Click to Zoom Lightbox (Photo Pop-up)
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.close-modal');

  document.querySelectorAll('.behance-card-item img').forEach(img => {
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

  // 4. Smooth Navigation Scroll
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
