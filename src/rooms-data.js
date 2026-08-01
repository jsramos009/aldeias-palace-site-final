// Aldeias Palace Hotel — dados das categorias de apartamento
//
// Fonte de preço: tabela impressa reajustada + esclarecimentos por telefone,
// confirmada por José em 27/07/2026 (ver memória do projeto,
// project_aldeias_precos.md). NÃO usar os preços que vieram embutidos nas
// imagens de referência em Categorias Quartos/1.png a 8.png, esses foram
// descartados a pedido do cliente.
//
// Campo `image.real`: true quando a foto é do hotel de verdade, false
// quando ainda é a imagem ilustrativa do modelo de referência (placeholder),
// até a fotografia profissional real ficar disponível.
//
// Em 01/08/2026 José adicionou fotos reais novas e duas categorias novas
// (Suíte Casal + Solteiro e Casal + Solteiro + Pet, ambas com diária ainda
// não definida — campo `diariaSobConsulta: true`). Também corrigiu que as
// fotos antes identificadas como "Suíte Simples" eram na verdade da
// categoria Casal; Suíte Simples voltou a usar só o placeholder até ter
// foto própria. O pet deixou de ser exclusividade de uma única categoria:
// agora Casal + Pet e Casal + Solteiro + Pet aceitam pet (campo
// `aceitaPet: true` nas duas, sem mais alegar exclusividade).

export const ROOM_CATEGORIES = [
  {
    id: 'individual',
    nome: 'Individual',
    configuracao: '1 cama de casal',
    ocupacao: 'Ocupação individual',
    metragem: null, // não informado, não inventar
    diaria: 276,
    imagens: [
      { src: '/quartos/individual-real-1.jpg', real: true, nota: 'Foto real do hotel. Mapeamento tentativo a partir do arquivo "Quarto simples", a confirmar com a Mábila se é de fato a categoria Individual.' },
      { src: '/quartos/individual-placeholder.jpg', real: false }
    ],
    descricao: 'Conforto e praticidade para sua estadia. Ideal para viagens a trabalho ou momentos de descanso com toda a comodidade que você merece.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'casal',
    nome: 'Casal',
    configuracao: '1 cama de casal',
    ocupacao: 'Até 2 hóspedes',
    metragem: null,
    diaria: 345,
    imagens: [
      { src: '/quartos/casal-real-1.jpg', real: true },
      { src: '/quartos/casal-real-2.jpg', real: true },
      { src: '/quartos/casal-placeholder.jpg', real: false }
    ],
    descricao: 'Conforto e praticidade para sua estadia. Ideal para casais que buscam relaxamento e bem-estar.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'casal-solteiro',
    nome: 'Casal + Solteiro',
    configuracao: '1 cama de casal + 1 solteiro',
    ocupacao: 'Até 3 hóspedes',
    metragem: null,
    diaria: 442,
    imagens: [
      { src: '/quartos/casal-solteiro-real-1.jpg', real: true },
      { src: '/quartos/casal-solteiro-real-2.jpg', real: true },
      { src: '/quartos/casal-placeholder.jpg', real: false }
    ],
    descricao: 'Conforto e praticidade para sua estadia. Ideal para famílias ou pequenos grupos que precisam de espaço extra.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'casal-pet',
    nome: 'Casal + Pet',
    configuracao: '1 cama de casal',
    ocupacao: 'Até 2 hóspedes + pet',
    metragem: null,
    diaria: 395, // 345 (categoria Casal) + 50 de taxa pet
    diariaDetalhe: 'Diária de R$345 + taxa de R$50 para pet',
    aceitaPet: true,
    imagens: [
      { src: '/quartos/casal-pet-real-1.jpg', real: true },
      { src: '/quartos/casal-pet-real-2.jpg', real: true },
      { src: '/quartos/casal-pet-placeholder.jpg', real: false }
    ],
    descricao: 'Ambiente acolhedor e funcional para quem viaja acompanhado do pet.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'casal-solteiro-pet',
    nome: 'Casal + Solteiro + Pet',
    configuracao: '1 cama de casal + 1 solteiro',
    ocupacao: 'Até 3 hóspedes + pet',
    metragem: null,
    diaria: null,
    diariaSobConsulta: true,
    diariaDetalhe: 'Valor da diária ainda não definido, consultar disponibilidade.',
    aceitaPet: true,
    novaCategoria: true,
    imagens: [
      { src: '/quartos/casal-solteiro-pet-real-1.jpg', real: true },
      { src: '/quartos/casal-solteiro-pet-real-2.jpg', real: true }
    ],
    descricao: 'A opção com mais espaço para famílias que viajam com pet, unindo cama de casal e cama de solteiro.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'duplo',
    nome: 'Duplo',
    configuracao: '2 camas de solteiro',
    ocupacao: 'Até 2 hóspedes',
    metragem: null,
    diaria: 360,
    imagens: [
      { src: '/quartos/duplo-real-1.jpg', real: true },
      { src: '/quartos/duplo-real-2.jpg', real: true },
      { src: '/quartos/duplo-placeholder.jpg', real: false }
    ],
    descricao: 'Conforto e praticidade para sua estadia. Ideal para quem viaja acompanhado e prefere camas separadas.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'triplo',
    nome: 'Triplo',
    configuracao: '3 camas de solteiro',
    ocupacao: 'Até 3 hóspedes',
    metragem: null,
    diaria: 496,
    imagens: [
      { src: '/quartos/triplo-real-1.jpg', real: true },
      { src: '/quartos/triplo-real-2.jpg', real: true },
      { src: '/quartos/triplo-placeholder.jpg', real: false }
    ],
    descricao: 'Conforto e praticidade para sua estadia. Ideal para famílias ou grupos, com espaço aconchegante para todos.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'suite-simples',
    nome: 'Suíte Simples',
    configuracao: '1 cama de casal',
    ocupacao: 'Até 2 hóspedes',
    metragem: null,
    diaria: 414,
    imagens: [
      { src: '/quartos/suite-simples-placeholder.jpg', real: false, nota: 'As fotos que chegaram identificadas como "Suíte Simples" eram na verdade da categoria Casal (correção do José em 01/08/2026). Ainda sem foto real própria desta categoria.' }
    ],
    descricao: 'Conforto e praticidade para sua estadia. Ideal para casais que buscam uma experiência mais completa.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'suite-solteiro',
    nome: 'Suíte + Solteiro',
    configuracao: '1 cama de casal + 1 solteiro',
    ocupacao: 'Até 3 hóspedes',
    metragem: null,
    diaria: 538,
    imagens: [
      { src: '/quartos/suite-solteiro-placeholder.jpg', real: false }
    ],
    descricao: 'Conforto e praticidade para sua estadia. Ideal para famílias ou grupos, com espaço aconchegante para todos.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'suite-casal-solteiro',
    nome: 'Suíte Casal + Solteiro',
    configuracao: '1 cama de casal + 1 solteiro',
    ocupacao: 'Até 3 hóspedes',
    metragem: null,
    diaria: null,
    diariaSobConsulta: true,
    diariaDetalhe: 'Valor da diária ainda não definido, consultar disponibilidade.',
    novaCategoria: true,
    imagens: [
      { src: '/quartos/suite-casal-solteiro-real-1.jpg', real: true },
      { src: '/quartos/suite-casal-solteiro-real-2.jpg', real: true }
    ],
    descricao: 'Versão mais espaçosa da Casal + Solteiro, com banheiro próprio e acabamento de suíte.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar']
  },
  {
    id: 'suite-master',
    nome: 'Suíte Master',
    configuracao: 'Cama de casal',
    ocupacao: 'Até 2 hóspedes',
    metragem: null,
    diaria: 510,
    destaque: true,
    imagens: [
      { src: '/quartos/suite-master-real-1.jpg', real: true },
      { src: '/quartos/suite-master-real-2.jpg', real: true },
      { src: '/quartos/suite-master-placeholder.jpg', real: false }
    ],
    descricao: 'O máximo de conforto e sofisticação para uma experiência inesquecível. Banheira de hidromassagem e acabamentos premium.',
    amenidades: ['Wi-Fi gratuito', 'Ar-condicionado', 'TV Smart', 'Frigobar', 'Banheira de hidromassagem']
  }
];
