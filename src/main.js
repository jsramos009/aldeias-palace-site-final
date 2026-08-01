// Aldeias Palace Hotel — camada de animação (anime.js v4)
//
// three.js está instalado como dependência (ver package.json), mas
// propositalmente NÃO está importado aqui ainda. A recomendação registrada
// no projeto é reservar three.js para um único momento de destaque visual
// (provável hero da Home, a confirmar na Fase Design), carregado por
// import dinâmico separado, para não engordar o bundle principal do site
// com uma biblioteca de renderização 3D que a maioria das páginas não usa.
// Ver: memória do projeto, arquivo project_aldeias_bibliotecas.md.

import { animate, stagger } from 'animejs';

function microinteracaoBotoes() {
  const alvos = document.querySelectorAll('.btn-primary, .btn-ghost, .cta');

  alvos.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      animate(el, {
        scale: 1.03,
        duration: 220,
        ease: 'outQuad'
      });
    });

    el.addEventListener('mouseleave', () => {
      animate(el, {
        scale: 1,
        duration: 220,
        ease: 'outQuad'
      });
    });

    el.addEventListener('mousedown', () => {
      animate(el, {
        scale: 0.97,
        duration: 90,
        ease: 'outQuad'
      });
    });

    el.addEventListener('mouseup', () => {
      animate(el, {
        scale: 1.03,
        duration: 140,
        ease: 'outElastic(1, .6)'
      });
    });
  });
}

// Reforço sutil no reveal de seções que já existe no HTML (classe .reveal),
// aplicando um leve stagger de opacidade/translação quando o bloco entra
// na tela. Isso é aditivo: não substitui a lógica de reveal já existente
// no script inline do index.html, só adiciona uma variação mais suave em
// elementos com o atributo [data-anime-stagger].
function staggerSuave() {
  const grupos = document.querySelectorAll('[data-anime-stagger]');

  grupos.forEach((grupo) => {
    const itens = grupo.children;
    if (!itens.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animado) {
            entry.target.dataset.animado = '1';
            animate(entry.target.children, {
              opacity: [0, 1],
              translateY: [12, 0],
              delay: stagger(70),
              duration: 500,
              ease: 'outQuad'
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(grupo);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  microinteracaoBotoes();
  staggerSuave();
});
