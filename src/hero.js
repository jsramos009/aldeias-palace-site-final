// Aldeias Palace Hotel — Hero de entrada
//
// Desktop (>= 769px): o vídeo fica pinado em tela cheia e o currentTime é
// controlado pela posição de rolagem dentro de .hero-scroll (300vh de
// altura, 200vh de curso de rolagem enquanto o vídeo fica fixo). Rolar
// para baixo "avança" o vídeo, simulando entrar no hotel.
//
// Mobile (< 769px): scroll-scrub é ruim na maioria dos navegadores móveis
// (jank, vídeo trava). Em vez disso, o vídeo toca normalmente assim que a
// seção entra na tela (IntersectionObserver) e pausa ao sair, reiniciando
// do começo para a próxima vez que o usuário rolar de volta.

const DESKTOP_QUERY = '(min-width: 769px)';

export function initHero(rootSelector = '.hero-scroll') {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const video = root.querySelector('.hero-video');
  const pin = root.querySelector('.hero-pin');
  if (!video || !pin) return;

  video.muted = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.playsInline = true;

  const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

  if (isDesktop()) {
    setupScrollScrub(root, video);
  } else {
    setupMobileAutoplay(pin, video);
  }
}

function setupScrollScrub(root, video) {
  video.pause();
  video.autoplay = false;
  video.loop = false;

  let duration = video.duration || 0;
  let ticking = false;

  // Em preload="auto" os metadados às vezes já chegam antes deste script
  // rodar, então o evento 'loadedmetadata' nunca dispara de novo e a
  // variável duration ficava travada em 0. Cobrindo os dois casos:
  // já carregado (readyState >= 1) e ainda por vir (listener).
  if (video.readyState >= 1 && video.duration) {
    duration = video.duration;
  }

  video.addEventListener('loadedmetadata', () => {
    duration = video.duration || 0;
    update();
  });

  function update() {
    ticking = false;
    if (!duration) return;

    const rect = root.getBoundingClientRect();
    const scrollRange = root.offsetHeight - window.innerHeight; // curso de rolagem útil
    if (scrollRange <= 0) return;

    // progresso 0→1 enquanto a seção passa pela tela
    const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
    const targetTime = progress * duration;

    // evita seeks minúsculos repetidos (custoso em alguns navegadores)
    if (Math.abs(video.currentTime - targetTime) > 0.03) {
      video.currentTime = targetTime;
    }
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

function setupMobileAutoplay(pin, video) {
  video.loop = false;

  // Observa .hero-pin (100vh, o que realmente aparece na tela), não
  // .hero-scroll (300vh, usado só como curso de rolagem no desktop). Ao
  // observar o elemento de 300vh, a proporção visível dele nunca passa de
  // ~33% mesmo no topo da página, então o threshold de 0.5 nunca disparava
  // e o vídeo nunca tocava.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay bloqueado pelo navegador — usuário ainda vê o poster */
          });
        } else {
          video.pause();
          video.currentTime = 0; // reinicia para a próxima vez que entrar na tela
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(pin);
}
