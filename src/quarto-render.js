// Aldeias Palace Hotel — página individual de categoria de quarto (produto)
// Lê o parâmetro ?id= da URL, busca em ROOM_CATEGORIES e monta a página.
//
// Por pedido do cliente (01/08/2026): nenhuma diária/valor aparece aqui.
// O preço só entra no fluxo de reserva em si. Esta página mostra galeria,
// configuração, descrição e comodidades, com uma chamada para reservar
// (sem número de R$ nenhum).

import { ROOM_CATEGORIES } from './rooms-data.js';
import { applyReservaState } from './config.js';

function getCategoriaFromURL() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return ROOM_CATEGORIES.find((c) => c.id === id) || null;
}

function galeriaHTML(categoria) {
  return categoria.imagens
    .map((img, i) => `
      <button class="quarto-gallery__thumb${i === 0 ? ' is-active' : ''}" data-src="${img.src}" data-index="${i}">
        <img src="${img.src}" alt="${categoria.nome} — foto ${i + 1}" loading="lazy" />
      </button>
    `)
    .join('');
}

function relacionadosHTML(categoriaAtual) {
  const outras = ROOM_CATEGORIES.filter((c) => c.id !== categoriaAtual.id).slice(0, 3);
  return outras
    .map((c) => `
      <a class="quarto-related__card" href="quarto.html?id=${c.id}">
        <img src="${c.imagens[0].src}" alt="${c.nome}" loading="lazy" />
        <span class="quarto-related__name">${c.nome}</span>
      </a>
    `)
    .join('');
}

export function renderQuartoPage(rootSelector = '#quarto-root') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const categoria = getCategoriaFromURL();

  if (!categoria) {
    root.innerHTML = `
      <div class="quarto-notfound">
        <h1>Categoria não encontrada</h1>
        <p>O link que você acessou não corresponde a nenhuma categoria de quarto do Aldeias Palace.</p>
        <a href="acomodacoes.html">Ver todas as acomodações</a>
      </div>
    `;
    return;
  }

  document.title = `${categoria.nome} — Aldeias Palace Hotel`;

  const amenidadesHTML = categoria.amenidades.map((a) => `<li>${a}</li>`).join('');
  const petNote = categoria.aceitaPet
    ? `<div class="quarto-price-box__pet">Aceita pet</div>`
    : '';
  const imagemPrincipal = categoria.imagens[0];

  root.innerHTML = `
    <section class="quarto-hero">
      <img id="quarto-hero-img" src="${imagemPrincipal.src}" alt="${categoria.nome} — Aldeias Palace Hotel" />
      <div class="quarto-hero__overlay">
        <p class="quarto-hero__eyebrow">Acomodações</p>
        <h1 class="quarto-hero__title">${categoria.nome}</h1>
      </div>
    </section>

    <div class="quarto-body">
      <div class="quarto-main">
        <div class="quarto-summary">
          <div><span class="quarto-summary__label">Configuração</span><span>${categoria.configuracao}</span></div>
          <div><span class="quarto-summary__label">Ocupação</span><span>${categoria.ocupacao}</span></div>
          ${categoria.metragem ? `<div><span class="quarto-summary__label">Metragem</span><span>${categoria.metragem} m²</span></div>` : ''}
        </div>

        <div class="quarto-gallery">
          <img id="quarto-gallery-main" class="quarto-gallery__main" src="${imagemPrincipal.src}" alt="${categoria.nome}" />
          <div class="quarto-gallery__thumbs">${galeriaHTML(categoria)}</div>
        </div>

        <p class="quarto-desc">${categoria.descricao}</p>

        <div class="quarto-amenities">
          <h2>Comodidades</h2>
          <ul>${amenidadesHTML}</ul>
        </div>
      </div>

      <aside class="quarto-price-box">
        <span class="quarto-price-box__label">Interessado nesta acomodação?</span>
        <p class="quarto-price-box__hint">Valores e disponibilidade são confirmados diretamente no processo de reserva.</p>
        ${petNote}
        <a class="quarto-price-box__cta js-reserva-cta" href="reserva.html">Consultar disponibilidade</a>
        <a class="quarto-price-box__back" href="acomodacoes.html">Ver todas as acomodações</a>
      </aside>
    </div>

    <section class="quarto-related">
      <h2>Outras acomodações</h2>
      <div class="quarto-related__grid">${relacionadosHTML(categoria)}</div>
    </section>
  `;

  const mainImg = document.getElementById('quarto-gallery-main');
  root.querySelectorAll('.quarto-gallery__thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      mainImg.src = thumb.dataset.src;
      root.querySelectorAll('.quarto-gallery__thumb').forEach((t) => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });

  applyReservaState();
}
