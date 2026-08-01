// Aldeias Palace Hotel — header e rodapé compartilhados
//
// Só lista aqui páginas que já existem de verdade no site. Não colocar link
// para Experiências, Destino, Gastronomia etc. até essas páginas existirem
// com conteúdo real — link morto quebra a credibilidade do site premium.

import { applyReservaState } from './config.js';

const NAV_LINKS = [
  { href: 'index.html', label: 'Início' },
  { href: 'acomodacoes.html', label: 'Acomodações' },
  { href: 'sobre.html', label: 'Sobre' }
];

function currentFile() {
  const path = window.location.pathname;
  const file = path.split('/').pop();
  return file === '' ? 'index.html' : file;
}

export function initHeader(rootSelector = '#site-header-root') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const current = currentFile();

  const linksHTML = NAV_LINKS.map((link) => {
    const isActive = link.href === current;
    return `<a class="site-header__link${isActive ? ' site-header__link--active' : ''}" href="${link.href}">${link.label}</a>`;
  }).join('');

  root.innerHTML = `
    <header class="site-header" id="site-header">
      <a class="site-header__brand" href="index.html">
        <img class="site-header__mark" src="/logo/mark-gold.png" alt="" />
        <span class="site-header__wordmark">Aldeias Palace</span>
      </a>
      <nav class="site-header__nav" id="site-header-nav">
        ${linksHTML}
        <a class="site-header__cta js-reserva-cta" href="reserva.html">Reservar</a>
      </nav>
      <button class="site-header__hamburger" id="site-header-hamburger" aria-label="Abrir menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </header>
  `;

  const header = document.getElementById('site-header');
  const nav = document.getElementById('site-header-nav');
  const hamburger = document.getElementById('site-header-hamburger');

  function updateSolid() {
    if (window.scrollY > 40) {
      header.classList.add('is-solid');
    } else {
      header.classList.remove('is-solid');
    }
  }
  updateSolid();
  window.addEventListener('scroll', updateSolid, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  applyReservaState();
}

export function initFooter(rootSelector = '#site-footer-root') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  root.innerHTML = `
    <footer class="site-footer">
      <p class="site-footer__wordmark">Aldeias Palace</p>
      <nav class="site-footer__nav">
        <a href="index.html">Início</a>
        <a href="acomodacoes.html">Acomodações</a>
        <a href="sobre.html">Sobre</a>
        <a class="js-reserva-cta" href="reserva.html">Reservar</a>
      </nav>
      <p class="site-footer__copy">Aldeias Palace Hotel — Tucumã, PA</p>
    </footer>
  `;

  applyReservaState();
}
