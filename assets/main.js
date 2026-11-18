'use strict';

document.documentElement.classList.add('js');

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
if (menu && nav) {
  function setMenu(open) {
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  });
}

const publicationTools = document.querySelector('.publication-tools');
if (publicationTools) {
  const filters = [...publicationTools.querySelectorAll('[data-filter]')];
  const papers = [...document.querySelectorAll('.paper-entry[data-category]')];
  const count = publicationTools.querySelector('#publication-count');

  function filterPapers(category) {
    for (const button of filters) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === category));
    }
    let visible = 0;
    for (const paper of papers) {
      paper.hidden = category !== 'all' && paper.dataset.category !== category;
      if (!paper.hidden) visible++;
    }
    count.textContent = visible + (visible === 1 ? ' publication' : ' publications');
  }
  for (const button of filters) {
    button.addEventListener('click', () => filterPapers(button.dataset.filter));
  }
  window.addEventListener('hashchange', () => {
    const paper = document.getElementById(location.hash.slice(1));
    if (paper && paper.matches('.paper-entry[hidden]')) {
      filterPapers('all');
      paper.scrollIntoView();
    }
  });
  filterPapers('all');
  publicationTools.hidden = false;
}

const settings = window.PROFILE_LINKS || {};
for (const [key, selector] of [['github', '[data-github-link]'], ['scholar', '[data-scholar-link]']]) {
  const link = document.querySelector(selector);
  if (!link || !settings[key]) continue;
  try {
    const url = new URL(settings[key]);
    if (url.protocol === 'https:') {
      link.href = url.href;
      if (key === 'scholar') link.closest('li').hidden = false;
    }
  } catch {
    // Keep the default link when an optional configured URL is invalid.
  }
}

document.querySelectorAll('[data-current-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});
document.querySelector('[data-print]')?.addEventListener('click', () => window.print());
