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
