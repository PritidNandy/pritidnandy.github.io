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
