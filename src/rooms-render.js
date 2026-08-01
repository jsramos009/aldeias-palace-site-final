// Aldeias Palace Hotel — renderização dos cartões de categoria de quarto
// Consome ROOM_CATEGORIES (rooms-data.js) e monta o grid de Acomodações.
// Este é o componente que deve ser usado dentro do site real (página
// /acomodacoes), não uma peça de apresentação avulsa.

import { ROOM_CATEGORIES } from './rooms-data.js';

function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
}

function renderCard(categoria) {
  const imagemPrincipal = categoria.imagens[0];

  const amenidadesHTML = categoria.amenidades
    .map((a) => `<li>${a}</li>`)
    .join('');

  const tagReal = imagemPrincipal.real
    ? `<span class="room-card__real-tag">Foto real</span>`
    : `<span class="room-card__placeholder-tag">Imagem ilustrativa</span>`;

  const tagNova = categoria.novaCategoria
    ? `<span class="room-card__new-tag">Categoria nova</span>`
    : '';

  const precoDetalhe = categoria.diariaDetalhe
    ? `<div class="room-card__price-detail">${categoria.diariaDetalhe}</div>`
    : '';

  const petNote = categoria.aceitaPet
    ? `<div class="room-card__pet-note">Aceita pet</div>`
    : '';

  const precoHTML = categoria.diariaSobConsulta
    ? `<div class="room-card__price room-card__price--consulta">Sob consulta</div>`
    : `<div class="room-card__price">R$ ${formatBRL(categoria.diaria)} <span>/ diária</span></div>`;

  return `
    <article class="room-card" data-categoria="${categoria.id}">
      <div class="room-card__media">
        <img src="${imagemPrincipal.src}" alt="${categoria.nome} — Aldeias Palace Hotel" loading="lazy" />
        <span class="room-card__badge">${categoria.ocupacao}</span>
        ${tagReal}
        ${tagNova}
      </div>
      <div class="room-card__body">
        <h3 class="room-card__title">${categoria.nome}</h3>
        <div class="room-card__meta">${categoria.configuracao}${categoria.metragem ? ` &nbsp;|&nbsp; ${categoria.metragem} m²` : ''}</div>
        <p class="room-card__desc">${categoria.descricao}</p>
        <ul class="room-card__amenities">${amenidadesHTML}</ul>
        ${petNote}
        <div class="room-card__footer">
          <div>
            <span class="room-card__price-label">A partir de</span>
            ${precoHTML}
            ${precoDetalhe}
          </div>
          <a class="room-card__cta" href="quarto.html?id=${categoria.id}">Ver detalhes</a>
        </div>
      </div>
    </article>
  `;
}

export function renderRoomsGrid(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.classList.add('rooms-grid');
  container.innerHTML = ROOM_CATEGORIES.map(renderCard).join('');
}
