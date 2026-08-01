# Aldeias Palace Hotel — site final

Projeto Vite do site real do Aldeias Palace Hotel (Tucumã, PA). Esta pasta é a estrutura
definitiva do site, separada da proposta comercial que foi usada só para negociação
com o cliente — nenhum arquivo daqui vem daquele material.

## Como rodar

```
npm install
npm run dev
```

O terminal mostra um endereço tipo `http://localhost:5173/`. Abra esse endereço no
navegador. Nunca abra `index.html` ou `acomodacoes.html` direto (duplo clique):
como o projeto usa Vite, os caminhos de CSS/JS e os módulos importados só funcionam
com o servidor rodando.

Para ver a versão de produção (a que vai pro ar de verdade):

```
npm run build
npm run preview
```

## Páginas

- `index.html` — Home: hero com vídeo (scroll-scrub no desktop, autoplay/pause no
  mobile), seção de história, Acomodações, galeria em mosaico.
- `acomodacoes.html` — página isolada só com a grade de Acomodações, útil pra
  conferir o componente sozinho.

## Estrutura

- `src/rooms-data.js` — fonte de verdade dos preços, unidades, comodidades e fotos
  das 11 categorias de apartamento.
- `src/rooms-render.js` — monta os cartões de Acomodações a partir de `rooms-data.js`.
- `src/rooms.css` — estilo dos cartões, usa a paleta oficial (ver abaixo).
- `src/hero.js` / `src/hero.css` — comportamento e estilo do vídeo de entrada.
- `src/sections.css` — seção de história e galeria em mosaico.
- `src/main.js` — microinterações de botão com anime.js.
- `public/quartos/` — fotos das categorias (reais e ilustrativas).
- `public/video/` — vídeo de entrada (MP4 + WebM + poster).
- `public/gallery/` — fotos da galeria em mosaico da Home.

## Identidade visual

Paleta oficial: Terracota `#8A3A2A`, Dourado `#D4AF37`, Areia `#EADCC5`, Off White
`#F4F1EB`. Tipografia: Cinzel (títulos) e Montserrat (corpo). Fonte: pasta
"Mdelos da identidade visual" do projeto.

## Pendências conhecidas

- Preço e quantidade de unidades das categorias novas (Suíte Casal + Solteiro e
  Casal + Solteiro + Pet) ainda não definidos, aparecem como "Sob consulta".
- Quantidade de unidades da categoria Individual ainda não confirmada.
- Suíte Simples e Suíte + Solteiro ainda usam imagem ilustrativa, sem foto real
  própria.
- Domínio: hospedado por enquanto em subdomínio Vercel, domínio próprio a comprar
  depois.
- Sistema de reservas: botão simples redireciona para o sistema externo já usado
  presencialmente (Desbravador), sem iframe nem widget embutido.
- Páginas ainda não construídas: Sobre, Localização, Experiências, Reservar,
  Contato, Políticas.
