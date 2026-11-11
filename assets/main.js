'use strict';
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
function closeMenu() { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); }
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); } });
document.addEventListener('click', event => { if (nav && menu && !nav.contains(event.target) && !menu.contains(event.target)) closeMenu(); });
const filters = [...document.querySelectorAll('[data-filter]')];
const papers = [...document.querySelectorAll('.publication')];
const initialCount = document.querySelector('#publication-count');
if (initialCount) initialCount.textContent = `${papers.length} publication${papers.length === 1 ? '' : 's'}`;
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(other => { const chosen = other === button; other.classList.toggle('selected', chosen); other.setAttribute('aria-pressed', String(chosen)); });
  let visible = 0;
  papers.forEach(paper => { const show = button.dataset.filter === 'all' || button.dataset.filter === paper.dataset.category; paper.hidden = !show; if (show) visible++; });
  document.querySelector('#publication-count').textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
}));
if ('IntersectionObserver' in window && nav) {
  const sections = [...document.querySelectorAll('main > section[id]')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) nav.querySelectorAll('a').forEach(link => {
      const active = link.getAttribute('href') === '#' + entry.target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
const settings = window.PROFILE_LINKS || {};
for (const [key, selector] of [['github', '[data-github-link]'], ['scholar', '[data-scholar-link]']]) {
  if (!settings[key]) continue;
  try {
    const url = new URL(settings[key]);
    if (url.protocol !== 'https:') continue;
    document.querySelectorAll(selector).forEach(link => { link.href = url.href; link.hidden = false; });
  } catch (_) { /* Missing or invalid optional links remain hidden. */ }
}
document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
