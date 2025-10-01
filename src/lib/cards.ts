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
  }
];
