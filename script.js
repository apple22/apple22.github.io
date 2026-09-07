const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

const closeMenu = () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
};

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const filters = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');

filters.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach(item => item.classList.toggle('active', item === button));
    projectCards.forEach(card => {
      const visible = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !visible);
    });
  });
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));
document.getElementById('year').textContent = new Date().getFullYear();
