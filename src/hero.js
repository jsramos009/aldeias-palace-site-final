// Aldeias Palace Hotel — Hero de entrada
//
// Desktop (>= 769px): o vídeo fica pinado em tela cheia e o currentTime é
// guiado pela posição de rolagem dentro de .hero-scroll. Em vez de setar
// video.currentTime direto a cada evento de scroll (o que trava/pisca em
// muitos navegadores, porque cada set força uma busca por keyframe), o
// valor alvo é interpolado suavemente a cada frame com um loop
// requestAnimationFrame contínuo (lerp), então o vídeo sempre "desliza"
// até a posição da rolagem em vez de saltar.
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
  let targetTime = 0;
  let renderedTime = 0;
  let rafId = null;

  if (video.readyState >= 1 && video.duration) {
    duration = video.duration;
  }

  video.addEventListener('loadedmetadata', () => {
    duration = video.duration || 0;
    computeTarget();
  });

  function computeTarget() {
    if (!duration) return;

    const rect = root.getBoundingClientRect();
    const scrollRange = root.offsetHeight - window.innerHeight;
    if (scrollRange <= 0) return;

    const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
    targetTime = progress * duration;
  }

  // Loop contínuo: a cada frame, a posição real do vídeo (renderedTime)
  // caminha uma fração da distância até o alvo (targetTime). Isso é o que
  // dá a sensação de deslize suave em vez de "travadinho" pulando de
  // keyframe em keyframe a cada pixel rolado.
  function tick() {
    const delta = targetTime - renderedTime;
    if (Math.abs(delta) > 0.015) {
      renderedTime += delta * 0.18;
      video.currentTime = renderedTime;
    } else if (renderedTime !== targetTime) {
      renderedTime = targetTime;
      video.currentTime = renderedTime;
    }
    rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', computeTarget, { passive: true });
  window.addEventListener('resize', computeTarget, { passive: true });
  computeTarget();
  renderedTime = targetTime;
  rafId = requestAnimationFrame(tick);

  // evita loop rodando pra sempre em segundo plano se a página for
  // escondida (aba trocada) — retoma ao voltar.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!document.hidden && !rafId) {
      rafId = requestAnimationFrame(tick);
    }
  });
}

function setupMobileAutoplay(pin, video) {
  video.loop = false;

  // Observa .hero-pin (100vh, o que realmente aparece na tela), não
  // .hero-scroll (300vh, usado só como curso de rolagem no desktop).
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* autoplay bloqueado pelo navegador — usuário ainda vê o poster */
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(pin);
}
