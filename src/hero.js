/* Aldeias Palace Hotel — Hero com vídeo de entrada
   Desktop: vídeo pinado, currentTime controlado pela rolagem (efeito
   "entrando no hotel" conforme o usuário rola a página).
   Mobile: vídeo toca automaticamente ao entrar na tela, pausa ao sair. */

.hero-scroll {
  position: relative;
  height: 300vh; /* espaço de rolagem que alimenta o scrub do vídeo */
  background: #1a1310;
}

.hero-pin {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.62);
}

.hero-copy {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #F4F1EB;
  padding: 0 24px;
}

.hero-copy__eyebrow {
  font-family: var(--rc-body-font, 'Montserrat', sans-serif);
  font-size: 12.5px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #D4AF37;
  margin: 0 0 18px;
}

.hero-copy__title {
  font-family: var(--rc-title-font, 'Cinzel', serif);
  font-size: clamp(40px, 8vw, 84px);
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.03em;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
}

.hero-copy__subtitle {
  font-family: var(--rc-body-font, 'Montserrat', sans-serif);
  font-size: clamp(15px, 2vw, 20px);
  font-weight: 400;
  margin: 18px 0 0;
  color: #EADCC5;
}

.hero-copy__ctas {
  margin-top: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

.hero-copy__cta-primary {
  background: var(--rc-gold, #D4AF37);
  color: #2A1710;
  text-decoration: none;
  font-family: var(--rc-body-font, 'Montserrat', sans-serif);
  font-weight: 700;
  font-size: 14.5px;
  padding: 14px 28px;
  border-radius: 10px;
}

.hero-copy__cta-primary:hover {
  background: #c49f30;
}

.hero-copy__cta-secondary {
  color: #F4F1EB;
  text-decoration: underline;
  text-underline-offset: 4px;
  font-family: var(--rc-body-font, 'Montserrat', sans-serif);
  font-size: 13.5px;
}

.hero-copy__scroll-hint {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--rc-body-font, 'Montserrat', sans-serif);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #EADCC5;
  opacity: 0.75;
}

/* No mobile não há scroll-scrub (o vídeo só toca/pausa conforme entra e
   sai da tela), então os 300vh de curso de rolagem do desktop não fazem
   sentido aqui: forçariam uma rolagem vazia enorme antes do resto da
   página aparecer. */
@media (max-width: 768px) {
  .hero-scroll {
    height: 100vh;
  }
}
