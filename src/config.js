// Aldeias Palace Hotel — configuração central de links externos
//
// Preencha estes dois valores assim que tiver a informação real. Todos os
// botões de reserva e concierge do site inteiro leem daqui, então trocar o
// valor aqui atualiza o site inteiro, não precisa editar página por página.

// Link do sistema de reservas do hotel (Desbravador / Reservas Online).
// Ainda não confirmado — ver project_aldeias_reservas.md. Enquanto for null,
// o botão de reserva mostra um aviso pedindo para chamar no WhatsApp.
export const RESERVA_URL = null;

// Número de WhatsApp oficial do hotel, formato internacional sem símbolos,
// por exemplo '5594999999999'. Ainda não confirmado.
export const WHATSAPP_NUMERO = null;

export function linkWhatsApp(mensagem) {
  if (!WHATSAPP_NUMERO) return null;
  const texto = encodeURIComponent(mensagem || 'Olá! Gostaria de saber mais sobre o Aldeias Palace Hotel.');
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`;
}

// Desativa todo botão/link de reserva do site enquanto RESERVA_URL não
// estiver preenchido: o redirecionamento já está pronto (aponta pra
// reserva.html, que por sua vez lê RESERVA_URL), mas o botão fica
// visualmente presente e SEM clique até o link real chegar. Assim que
// RESERVA_URL for preenchido em cima, todo botão do site volta a
// funcionar sozinho, sem precisar mexer em cada página.
//
// Uso: chamar depois de qualquer render que crie elementos com a classe
// "js-reserva-cta" (header, rodapé, hero, CTA final, página de quarto).
export function applyReservaState(selector = '.js-reserva-cta') {
  document.querySelectorAll(selector).forEach((el) => {
    if (RESERVA_URL) {
      el.classList.remove('is-disabled');
      el.removeAttribute('aria-disabled');
      el.removeAttribute('title');
      if (!el.getAttribute('href')) el.setAttribute('href', 'reserva.html');
    } else {
      el.classList.add('is-disabled');
      el.setAttribute('aria-disabled', 'true');
      el.removeAttribute('href');
      el.title = 'Reservas online chegando em breve';
      el.addEventListener('click', (e) => e.preventDefault());
    }
  });
}
