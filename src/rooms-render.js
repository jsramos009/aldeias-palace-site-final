// Aldeias Palace Hotel — carrossel de categorias de quarto (estilo
// "fileira Netflix"): uma trilha horizontal com todos os cards, setas
// laterais para navegar, sem paginação vertical em grid.
//
// Por pedido explícito do cliente (01/08/2026): a listagem mostra só foto
// e nome da categoria, sem diária/valor. O valor só aparece dentro do
// processo de reserva, não na vitrine. Ver ROOM_CATEGORIES em
// rooms-data.js — os campos de preço continuam lá (para uso futuro do
// sistema de reservas), só não são renderizados aqui nem na página de
// detalhe do quarto.

import { ROOM_CATEGORIES } from './rooms-data.js';

function renderCard(categoria) {
  const imagemPrincipal = categoria.imagens[0];

  const tagNova = categoria.novaCategoria
    ? `<span class="room-card__new-tag">Nova categoria</span>`
    : '';

  const petNote = categoria.aceitaPet
    ? `<span class="room-card__pet-tag">Aceita pet</span>`
    : '';

  return `
    <a class="room-card" href="quarto.html?id=${categoria.id}" data-categoria="${categoria.id}">
      <div class="room-card__media">
        <img src="${imagemPrincipal.src}" alt="${categoria.nome} — Aldeias Palace Hotel" loading="lazy" />
        <div class="room-card__scrim"></div>
        ${tagNova}
        <div class="room-card__tags">${petNote}</div>
        <div class="room-card__info">
          <h3 class="room-card__title">${categoria.nome}</h3>
          <span class="room-card__meta">${categoria.configuracao}</span>
        </div>
      </div>
    </a>
  `;
}

export function renderRoomsGrid(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.classList.add('rooms-carousel');
  container.innerHTML = `
    <div class="rooms-carousel__head">
      <div>
        <p class="rooms-carousel__eyebrow">Acomodações</p>
        <h2 class="rooms-carousel__title">Escolha sua categoria</h2>
      </div>
      <div class="rooms-carousel__arrows">
        <button type="button" class="rooms-carousel__arrow" data-dir="-1" aria-label="Categorias anteriores">‹</button>
        <button type="button" class="rooms-carousel__arrow" data-dir="1" aria-label="Próximas categorias">›</button>
      </div>
    </div>
    <div class="rooms-carousel__track-wrap">
      <div class="rooms-carousel__track">${ROOM_CATEGORIES.map(renderCard).join('')}</div>
    </div>
  `;

  const track = container.querySelector('.rooms-carousel__track');
  const arrows = container.querySelectorAll('.rooms-carousel__arrow');

  arrows.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = Number(btn.dataset.dir);
      const cardWidth = track.querySelector('.room-card')?.offsetWidth || 280;
      track.scrollBy({ left: dir * (cardWidth + 20) * 2, behavior: 'smooth' });
    });
  });
}
