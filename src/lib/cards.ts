
import type { GameCard } from './types';

export const CARDS: GameCard[] = [
  // ================== TRABALHO ==================
  {
    theme: "Trabalho",
    question: "Seu chefe pede horas extras no fim de semana. O que faz?",
    answers: [
      { text: "Negocia prazos sem se sobrecarregar.", color: "azul" },
      { text: "Divide a tarefa para manter equilíbrio.", color: "azul" },
      { text: "Aceita tudo sem questionar.", color: "vermelha" },
      { text: "Ignora e não entrega nada.", color: "vermelha" }
    ]
  },
  {
    theme: "Trabalho",
    question: "Um colega tenta pegar crédito pelo seu trabalho.",
    answers: [
      { text: "Conversa direto com ele sobre a situação.", color: "azul" },
      { text: "Expõe calmamente ao chefe a verdade.", color: "azul" },
      { text: "Deixa passar para evitar conflito.", color: "vermelha" },
      { text: "Arma vingança contra o colega.", color: "vermelha" }
    ]
  },
  // ================== MEDO ==================
  {
    theme: "Medo",
    question: "Você precisa falar em público.",
    answers: [
      { text: "Se prepara antes e respira fundo.", color: "azul" },
      { text: "Aceita o desafio como oportunidade.", color: "azul" },
      { text: "Finge doença para evitar.", color: "vermelha" },
      { text: "Congela e não fala nada.", color: "vermelha" }
    ]
  },
  // ================== PERDA ==================
  {
    theme: "Perda",
    question: "Você perdeu um objeto de valor.",
    answers: [
      { text: "Aceita a perda e busca solução prática.", color: "azul" },
      { text: "Conversa para pedir apoio emocional.", color: "azul" },
      { text: "Se isola e se culpa pelo erro.", color: "vermelha" },
      { text: "Desconta a raiva nos outros.", color: "vermelha" }
    ]
  },
  // ================== FAMÍLIA ==================
  {
    theme: "Família",
    question: "Um parente critica suas escolhas.",
    answers: [
      { text: "Ouve e explica sua posição com calma.", color: "azul" },
      { text: "Mantém diálogo respeitoso mesmo discordando.", color: "azul" },
      { text: "Aceita calado mesmo discordando.", color: "vermelha" },
      { text: "Responde gritando e rompe a conversa.", color: "vermelha" }
    ]
  },
  // ================== AJUDA ==================
  {
    theme: "Ajuda",
    question: "Um amigo pede algo que você não pode oferecer.",
    answers: [
      { text: "Explica com sinceridade seus limites.", color: "azul" },
      { text: "Oferece outra forma de ajudar.", color: "azul" },
      { text: "Fala 'sim' e depois não cumpre.", color: "vermelha" },
      { text: "Ignora a pessoa sem responder.", color: "vermelha" }
    ]
  },
  // ================== TRAIÇÃO ==================
  {
    theme: "Traição",
    question: "Você descobre que foi traído por um amigo.",
    answers: [
      { text: "Conversa sobre a decepção diretamente.", color: "azul" },
      { text: "Decide se vale a pena perdoar.", color: "azul" },
      { text: "Finge que nada aconteceu.", color: "vermelha" },
      { text: "Se vinga da mesma forma.", color: "vermelha" }
    ]
  },
  // ================== SUPERAÇÃO ==================
  {
    theme: "Superação",
    question: "Você fracassa em um projeto importante.",
    answers: [
      { text: "Aprende com os erros e tenta de novo.", color: "azul" },
      { text: "Busca ajuda para melhorar.", color: "azul" },
      { text: "Desiste e nunca mais tenta.", color: "vermelha" },
      { text: "Culpa os outros pelo fracasso.", color: "vermelha" }
    ]
  },
  // ================== VÍCIO ==================
  {
    theme: "Vício",
    question: "Um hábito ruim está atrapalhando sua vida.",
    answers: [
      { text: "Procura apoio profissional.", color: "azul" },
      { text: "Cria estratégias para reduzir aos poucos.", color: "azul" },
      { text: "Nega que exista problema.", color: "vermelha" },
      { text: "Afunda mais no vício para esquecer.", color: "vermelha" }
    ]
  },
  // ================== INJUSTIÇA ==================
  {
    theme: "Injustiça",
    question: "Você é acusado injustamente.",
    answers: [
      { text: "Se defende com clareza e provas.", color: "azul" },
      { text: "Busca apoio de quem sabe da verdade.", color: "azul" },
      { text: "Aceita em silêncio sem reagir.", color: "vermelha" },
      { text: "Responde com agressividade.", color: "vermelha" }
    ]
  },
  // ================== LIBERDADE ==================
  {
    theme: "Liberdade",
    question: "Um amigo quer controlar suas escolhas.",
    answers: [
      { text: "Define limites com firmeza.", color: "azul" },
      { text: "Mantém sua autonomia com respeito.", color: "azul" },
      { text: "Se submete para agradar.", color: "vermelha" },
      { text: "Rompe agressivamente a amizade.", color: "vermelha" }
    ]
  },
  // ================== DOENÇA ==================
  {
    theme: "Doença",
    question: "Você descobre uma doença.",
    answers: [
      { text: "Procura tratamento e apoio emocional.", color: "azul" },
      { text: "Mantém hábitos saudáveis para ajudar.", color: "azul" },
      { text: "Esconde de todos e sofre sozinho.", color: "vermelha" },
      { text: "Se entrega e perde a esperança.", color: "vermelha" }
    ]
  },
  // ================== CULPA ==================
  {
    theme: "Culpa",
    question: "Você errou e prejudicou alguém.",
    answers: [
      { text: "Assume o erro e pede desculpa.", color: "azul" },
      { text: "Busca reparar o dano.", color: "azul" },
      { text: "Esconde o erro e finge normalidade.", color: "vermelha" },
      { text: "Culpa outra pessoa para se livrar.", color: "vermelha" }
    ]
  },
  // ================== AMIZADE ==================
  {
    theme: "Amizade",
    question: "Um amigo esqueceu seu aniversário.",
    answers: [
      { text: "Conversa sobre como se sentiu.", color: "azul" },
      { text: "Marca outro momento para comemorar.", color: "azul" },
      { text: "Fica magoado e se afasta.", color: "vermelha" },
      { text: "Revida esquecendo também datas dele.", color: "vermelha" }
    ]
  },
// ======== CARTAS NOVAS ========

// TRABALHO
{
  theme: "Trabalho",
  question: "Um colega assume o mérito de uma ideia sua em reunião.",
  answers: [
    { text: "Explica com calma que a ideia foi em conjunto.", color: "azul" },
    { text: "Chama o colega depois e pede para corrigir.", color: "azul" },
    { text: "Deixa passar com raiva guardada.", color: "vermelha" },
    { text: "Confronta publicamente em tom agressivo.", color: "vermelha" }
  ]
},
// MEDO
{
  tema: "Medo",
  question: "Você precisa encarar uma entrevista importante.",
  answers: [
    { text: "Treina antes e respira para se acalmar.", color: "azul" },
    { text: "Enxerga como oportunidade de crescimento.", color: "azul" },
    { text: "Fica obcecado com a possibilidade de falhar.", color: "vermelha" },
    { text: "Desiste e não comparece à entrevista.", color: "vermelha" }
  ]
},
// PERDA
{
  tema: "Perda",
  question: "Você perde um grande investimento financeiro.",
  answers: [
    { text: "Reavalia os erros e busca alternativas.", color: "azul" },
    { text: "Conversa com especialistas para melhorar.", color: "azul" },
    { text: "Se desespera e desiste de tentar novamente.", color: "vermelha" },
    { text: "Culpa todos à sua volta pela perda.", color: "vermelha" }
  ]
},
// FAMÍLIA
{
  tema: "Família",
  question: "Um parente pede dinheiro que você não pode emprestar.",
  answers: [
    { text: "Explica seus limites financeiros.", color: "azul" },
    { text: "Oferece ajuda de outra forma.", color: "azul" },
    { text: "Mente dizendo que não tem nada.", color: "vermelha" },
    { text: "Empresta mesmo sabendo que não pode.", color: "vermelha" }
  ]
},
// AJUDA
{
  tema: "Ajuda",
  question: "Um amigo pede ajuda para mudar de casa no mesmo dia que você tinha compromissos.",
  answers: [
    { text: "Explica que pode ajudar em outro horário.", color: "azul" },
    { text: "Arruma outra forma de apoiar (ex: emprestar carro).", color: "azul" },
    { text: "Ignora o pedido e inventa desculpas.", color: "vermelha" },
    { text: "Cancela tudo e vai contrariado.", color: "vermelha" }
  ]
},
// TRAIÇÃO
{
  tema: "Traição",
  question: "Você descobre que um colega escondeu informações para se beneficiar.",
  answers: [
    { text: "Confronta e pede transparência.", color: "azul" },
    { text: "Leva o assunto ao grupo de forma honesta.", color: "azul" },
    { text: "Se vinga escondendo informações também.", color: "vermelha" },
    { text: "Faz fofoca para prejudicá-lo.", color: "vermelha" }
  ]
},
// SUPERAÇÃO
{
  tema: "Superação",
  question: "Você não passou em uma prova importante.",
  answers: [
    { text: "Revê o conteúdo e tenta novamente.", color: "azul" },
    { text: "Busca apoio de quem já passou pela experiência.", color: "azul" },
    { text: "Se convence de que nunca terá capacidade.", color: "vermelha" },
    { text: "Desiste e critica o sistema.", color: "vermelha" }
  ]
},
// VÍCIO
{
  tema: "Vício",
  question: "Você percebe que está usando muito o celular e perdendo foco.",
  answers: [
    { text: "Define limites de tempo e cumpre.", color: "azul" },
    { text: "Troca o hábito por atividades saudáveis.", color: "azul" },
    { text: "Finge que não é problema e continua.", color: "vermelha" },
    { text: "Se isola ainda mais no celular.", color: "vermelha" }
  ]
},
// INJUSTIÇA
{
  tema: "Injustiça",
  question: "Um colega de equipe é elogiado pelo que você fez.",
  answers: [
    { text: "Mostra as evidências do seu esforço.", color: "azul" },
    { text: "Conversa em particular com o líder.", color: "azul" },
    { text: "Fica quieto e se sente injustiçado.", color: "vermelha" },
    { text: "Ataca o colega para desmerecer.", color: "vermelha" }
  ]
},
// LIBERDADE
{
  tema: "Liberdade",
  question: "Um parceiro tenta decidir todas as suas escolhas.",
  answers: [
    { text: "Mostra seus limites de forma firme.", color: "azul" },
    { text: "Busca diálogo sobre respeito mútuo.", color: "azul" },
    { text: "Aceita para não discutir.", color: "vermelha" },
    { text: "Rompe agressivamente sem diálogo.", color: "vermelha" }
  ]
},
// DOENÇA
{
  tema: "Doença",
  question: "Você está sentindo sintomas preocupantes.",
  answers: [
    { text: "Procura um médico imediatamente.", color: "azul" },
    { text: "Cuida do corpo com bons hábitos.", color: "azul" },
    { text: "Ignora os sintomas e espera passar.", color: "vermelha" },
    { text: "Se automedica sem orientação.", color: "vermelha" }
  ]
},
// CULPA
{
  tema: "Culpa",
  question: "Você esqueceu um compromisso importante.",
  answers: [
    { text: "Admite o erro e pede desculpas.", color: "azul" },
    { text: "Tenta remarcar e reparar a falha.", color: "azul" },
    { text: "Inventa uma desculpa para se justificar.", color: "vermelha" },
    { text: "Ignora e finge que não aconteceu.", color: "vermelha" }
  ]
},
// AMIZADE
{
  tema: "Amizade",
  question: "Seu amigo não respondeu mensagens por dias.",
  answers: [
    { text: "Conversa para entender o que houve.", color: "azul" },
    { text: "Respeita o espaço e espera o momento certo.", color: "azul" },
    { text: "Fica com raiva e corta a amizade.", color: "vermelha" },
    { text: "Faz indiretas para provocar.", color: "vermelha" }
  ]
}
];

    