const header = document.querySelector('.site-header');
const reveals = document.querySelectorAll('.reveal');
const heroCards = document.getElementById('hero-cards');

const onScroll = () => {
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

reveals.forEach((el) => observer.observe(el));

if (heroCards && window.matchMedia('(min-width: 861px)').matches) {
  const cards = heroCards.querySelectorAll('.floating-card');

  heroCards.addEventListener('mousemove', (event) => {
    const rect = heroCards.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    cards.forEach((card, index) => {
      const intensity = (index + 1) * 10;
      const moveX = x * intensity;
      const moveY = y * intensity;
      card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  });

  heroCards.addEventListener('mouseleave', () => {
    cards.forEach((card) => {
      card.style.transform = '';
    });
  });
}
