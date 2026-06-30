/* main.js — Case study accordion toggle */
function toggleCard(id) {
  const card = document.getElementById(id);
  const isOpen = card.classList.contains('open');
  // Close all open cards first
  document.querySelectorAll('.case-card').forEach(c => c.classList.remove('open'));
  if (!isOpen) {
    card.classList.add('open');
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }
}
// 3D Perspective Tilt for hero photo
document.addEventListener('DOMContentLoaded', () => {
  const photo = document.querySelector('.hero-photo img');
  if (!photo) return;
  
  const container = photo.parentElement;
  
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation up to 15 degrees
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    photo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    photo.style.transition = 'transform 0.1s ease-out';
  });
  
  container.addEventListener('mouseleave', () => {
    photo.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    photo.style.transition = 'transform 0.5s ease-out';
  });
});

/* ── Stat count-up animation ──
   Triggers once when .stats-grid scrolls into view.
   Reads data-target, optional data-prefix and data-suffix on each .stat-value.
   Handles "18%" and "£382M+" cleanly, and respects reduced-motion. */
(function () {
  const stats = document.querySelectorAll('.stat-value[data-target]');
  if (!stats.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Compose the display string: prefix + integer + suffix
  const render = (el, value) => {
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    return prefix + Math.round(value).toLocaleString('en-GB') + suffix;
  };

  // Smooth deceleration so the number eases into its final value
  const easeOutExpo = t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  const countUp = (el, duration = 1500) => {
    const target = parseFloat(el.dataset.target);
    if (isNaN(target)) return;

    if (reduceMotion) {        // accessibility: skip the animation
      el.textContent = render(el, target);
      return;
    }

    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = render(el, target * easeOutExpo(progress));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = render(el, target); // snap to the exact final value
      }
    };
    requestAnimationFrame(tick);
  };

  const runAll = () => stats.forEach(el => countUp(el));

  const grid = document.querySelector('.stats-grid');

  // Fallback for very old browsers: just show the final numbers
  if (!grid || !('IntersectionObserver' in window)) {
    runAll();
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runAll();
        obs.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.3 });

  observer.observe(grid);
})();
