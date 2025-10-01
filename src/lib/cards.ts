
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
  theme: "Medo",
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
  theme: "Perda",
  question: "Você perdeu um grande investimento financeiro.",
  answers: [
    { text: "Reavalia os erros e busca alternativas.", color: "azul" },
    { text: "Conversa com especialistas para melhorar.", color: "azul" },
    { text: "Se desespera e desiste de tentar novamente.", color: "vermelha" },
    { text: "Culpa todos à sua volta pela perda.", color: "vermelha" }
  ]
},
// FAMÍLIA
{
  theme: "Família",
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
  theme: "Ajuda",
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
  theme: "Traição",
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
  theme: "Superação",
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
  theme: "Vício",
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
  theme: "Injustiça",
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
  theme: "Liberdade",
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
  theme: "Doença",
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
  theme: "Culpa",
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
  theme: "Amizade",
  question: "Seu amigo não respondeu mensagens por dias.",
  answers: [
    { text: "Conversa para entender o que houve.", color: "azul" },
    { text: "Respeita o espaço e espera o momento certo.", color: "azul" },
    { text: "Fica com raiva e corta a amizade.", color: "vermelha" },
    { text: "Faz indiretas para provocar.", color: "vermelha" }
  ]
},
// ======== CARTAS NOVAS DIFERENTES ========

// TRABALHO
{
  theme: "Trabalho",
  question: "Seu chefe faz uma crítica em público sobre você.",
  answers: [
    { text: "Escuta e depois busca feedback construtivo.", color: "azul" },
    { text: "Pergunta calmamente como pode melhorar.", color: "azul" },
    { text: "Fica em silêncio e se sente humilhado.", color: "vermelha" },
    { text: "Responde na hora com agressividade.", color: "vermelha" }
  ]
},
// MEDO
{
  theme: "Medo",
  question: "Você precisa tomar uma decisão rápida e tem medo de errar.",
  answers: [
    { text: "Respira fundo e avalia o que pode ser controlado.", color: "azul" },
    { text: "Decide baseado em valores pessoais.", color: "azul" },
    { text: "Paralisa e deixa os outros decidirem.", color: "vermelha" },
    { text: "Escolhe qualquer opção só para acabar logo.", color: "vermelha" }
  ]
},
// PERDA
{
  theme: "Perda",
  question: "Você perdeu uma oportunidade de emprego.",
  answers: [
    { text: "Refaz seu currículo e continua tentando.", color: "azul" },
    { text: "Aprende com a experiência e se prepara melhor.", color: "azul" },
    { text: "Se culpa e pensa que não tem capacidade.", color: "vermelha" },
    { text: "Desiste de procurar novas vagas.", color: "vermelha" }
  ]
},
// FAMÍLIA
{
  theme: "Família",
  question: "Um parente sempre interfere nas suas escolhas.",
  answers: [
    { text: "Coloca limites com firmeza, mas respeito.", color: "azul" },
    { text: "Explica que precisa de autonomia.", color: "azul" },
    { text: "Aceita calado mesmo insatisfeito.", color: "vermelha" },
    { text: "Briga e rompe laços familiares.", color: "vermelha" }
  ]
},
// AJUDA
{
  theme: "Ajuda",
  question: "Você percebe alguém passando mal na rua.",
  answers: [
    { text: "Se aproxima e oferece ajuda imediata.", color: "azul" },
    { text: "Chama profissionais de socorro.", color: "azul" },
    { text: "Finge que não viu e segue.", color: "vermelha" },
    { text: "Filma a cena para postar em rede social.", color: "vermelha" }
  ]
},
// TRAIÇÃO
{
  theme: "Traição",
  question: "Você descobre que seu parceiro compartilhou segredos seus.",
  answers: [
    { text: "Conversa sobre como se sentiu traído.", color: "azul" },
    { text: "Define se ainda há confiança no relacionamento.", color: "azul" },
    { text: "Guarda rancor e planeja vingança.", color: "vermelha" },
    { text: "Expõe os segredos dele para se vingar.", color: "vermelha" }
  ]
},
// SUPERAÇÃO
{
  theme: "Superação",
  question: "Você falhou em uma meta pessoal.",
  answers: [
    { text: "Refaz seu planejamento e ajusta a estratégia.", color: "azul" },
    { text: "Procura inspiração em quem já conseguiu.", color: "azul" },
    { text: "Desiste e se sente incapaz.", color: "vermelha" },
    { text: "Culpa os outros por sua falha.", color: "vermelha" }
  ]
},
// VÍCIO
{
  theme: "Vício",
  question: "Você percebe que está gastando muito dinheiro em compras impulsivas.",
  answers: [
    { text: "Cria um limite de gastos e segue.", color: "azul" },
    { text: "Procura alternativas saudáveis para lidar com emoções.", color: "azul" },
    { text: "Continua comprando e se endividando.", color: "vermelha" },
    { text: "Esconde dívidas da família.", color: "vermelha" }
  ]
},
// INJUSTIÇA
{
  theme: "Injustiça",
  question: "Você vê um colega ser punido por algo que não fez.",
  answers: [
    { text: "Defende o colega com base na verdade.", color: "azul" },
    { text: "Leva o caso ao responsável justo.", color: "azul" },
    { text: "Fica quieto para não se envolver.", color: "vermelha" },
    { text: "Apoia a punição por conveniência.", color: "vermelha" }
  ]
},
// LIBERDADE
{
  theme: "Liberdade",
  question: "Um chefe tenta controlar até sua vida pessoal.",
  answers: [
    { text: "Mostra que sua vida pessoal é sua escolha.", color: "azul" },
    { text: "Busca apoio formal para colocar limites.", color: "azul" },
    { text: "Aceita e obedece sem questionar.", color: "vermelha" },
    { text: "Responde de forma explosiva.", color: "vermelha" }
  ]
},
// DOENÇA
{
  theme: "Doença",
  question: "Você precisa fazer um tratamento longo.",
  answers: [
    { text: "Segue corretamente as recomendações médicas.", color: "azul" },
    { text: "Mantém fé e motivação para se recuperar.", color: "azul" },
    { text: "Abandona o tratamento por preguiça.", color: "vermelha" },
    { text: "Nega a doença e não faz nada.", color: "vermelha" }
  ]
},
// CULPA
{
  theme: "Culpa",
  question: "Você falou algo sem pensar e magoou alguém.",
  answers: [
    { text: "Reconhece o erro e pede desculpa.", color: "azul" },
    { text: "Se compromete a agir diferente.", color: "azul" },
    { text: "Finge que nada aconteceu.", color: "vermelha" },
    { text: "Culpa a outra pessoa pela reação.", color: "vermelha" }
  ]
},
// AMIZADE
{
  theme: "Amizade",
  question: "Seu amigo pede algo que vai contra seus valores.",
  answers: [
    { text: "Explica seus valores e se mantém firme.", color: "azul" },
    { text: "Oferece uma alternativa saudável.", color: "azul" },
    { text: "Aceita para não perder a amizade.", color: "vermelha" },
    { text: "Cede e depois guarda rancor.", color: "vermelha" }
  ]
},
// ======== CARTAS PACOTE 4 – DIFERENTES ========

// TRABALHO
{
  theme: "Trabalho",
  question: "Você recebe uma proposta de trabalho em outra cidade.",
  answers: [
    { text: "Analisa prós e contras antes de decidir.", color: "azul" },
    { text: "Conversa com a família sobre o impacto da mudança.", color: "azul" },
    { text: "Aceita imediatamente sem avaliar.", color: "vermelha" },
    { text: "Recusa por medo de sair da zona de conforto.", color: "vermelha" }
  ]
},
// MEDO
{
  theme: "Medo",
  question: "Você precisa falar em público para muitas pessoas.",
  answers: [
    { text: "Se prepara antes com treino e respiração.", color: "azul" },
    { text: "Encarar como oportunidade de crescimento.", color: "azul" },
    { text: "Finge uma desculpa para não ir.", color: "vermelha" },
    { text: "Fala correndo sem se preparar.", color: "vermelha" }
  ]
},
// PERDA
{
  theme: "Perda",
  question: "Um objeto de valor sentimental se perdeu.",
  answers: [
    { text: "Aceita a perda e guarda a lembrança afetiva.", color: "azul" },
    { text: "Cria novas memórias para substituir o vazio.", color: "azul" },
    { text: "Se apega e não consegue superar a perda.", color: "vermelha" },
    { text: "Culpa os outros por ter perdido.", color: "vermelha" }
  ]
},
// FAMÍLIA
{
  theme: "Família",
  question: "Seu irmão te pede ajuda em um problema difícil.",
  answers: [
    { text: "Escuta e busca soluções junto com ele.", color: "azul" },
    { text: "Oferece apoio sem julgamentos.", color: "azul" },
    { text: "Ignora e diz que não é problema seu.", color: "vermelha" },
    { text: "Zomba da dificuldade dele.", color: "vermelha" }
  ]
},
// AJUDA
{
  theme: "Ajuda",
  question: "Você é chamado para ajudar em um mutirão comunitário.",
  answers: [
    { text: "Participa ativamente para colaborar.", color: "azul" },
    { text: "Leva recursos ou doações.", color: "azul" },
    { text: "Arruma desculpa para não ir.", color: "vermelha" },
    { text: "Vai, mas não colabora de verdade.", color: "vermelha" }
  ]
},
// TRAIÇÃO
{
  theme: "Traição",
  question: "Você descobre que um amigo falou mal de você.",
  answers: [
    { text: "Conversa com ele para esclarecer.", color: "azul" },
    { text: "Avalia se a amizade ainda vale a pena.", color: "azul" },
    { text: "Fala mal dele também para se vingar.", color: "vermelha" },
    { text: "Se afasta sem explicar nada.", color: "vermelha" }
  ]
},
// SUPERAÇÃO
{
  theme: "Superação",
  question: "Você não conseguiu cumprir um desafio pessoal.",
  answers: [
    { text: "Revê os erros e cria um novo plano.", color: "azul" },
    { text: "Tenta novamente de forma gradual.", color: "azul" },
    { text: "Desiste e evita desafios.", color: "vermelha" },
    { text: "Culpa a má sorte pelo fracasso.", color: "vermelha" }
  ]
},
// VÍCIO
{
  theme: "Vício",
  question: "Você percebe que está exagerando no celular.",
  answers: [
    { text: "Cria horários específicos para uso.", color: "azul" },
    { text: "Troca o hábito por atividades saudáveis.", color: "azul" },
    { text: "Passa noites sem dormir rolando tela.", color: "vermelha" },
    { text: "Ignora alertas de tempo de uso.", color: "vermelha" }
  ]
},
// INJUSTIÇA
{
  theme: "Injustiça",
  question: "Você foi acusado injustamente no trabalho.",
  answers: [
    { text: "Mostra provas para se defender.", color: "azul" },
    { text: "Conversa diretamente com o responsável.", color: "azul" },
    { text: "Aceita a culpa mesmo sem ter feito.", color: "vermelha" },
    { text: "Se revolta sem apresentar argumentos.", color: "vermelha" }
  ]
},
// LIBERDADE
{
  theme: "Liberdade",
  question: "Seus pais não aprovam suas escolhas pessoais.",
  answers: [
    { text: "Explica seus motivos de forma respeitosa.", color: "azul" },
    { text: "Mostra que consegue ser responsável.", color: "azul" },
    { text: "Obedece sem questionar.", color: "vermelha" },
    { text: "Rompe relações por rebeldia.", color: "vermelha" }
  ]
},
// DOENÇA
{
  theme: "Doença",
  question: "Um amigo está doente e precisa de apoio.",
  answers: [
    { text: "Oferece ajuda e companhia.", color: "azul" },
    { text: "Incentiva a buscar tratamento.", color: "azul" },
    { text: "Se afasta para não lidar com a situação.", color: "vermelha" },
    { text: "Ignora dizendo que não tem tempo.", color: "vermelha" }
  ]
},
// CULPA
{
  theme: "Culpa",
  question: "Você esqueceu o aniversário de alguém importante.",
  answers: [
    { text: "Reconhece e pede desculpa sinceramente.", color: "azul" },
    { text: "Compensa com uma atitude especial.", color: "azul" },
    { text: "Finge que não se importa.", color: "vermelha" },
    { text: "Inventa uma desculpa falsa.", color: "vermelha" }
  ]
},
// AMIZADE
{
  theme: "Amizade",
  question: "Seu amigo te pede dinheiro emprestado.",
  answers: [
    { text: "Analisa se pode ajudar sem se prejudicar.", color: "azul" },
    { text: "Oferece outra forma de apoio se não puder emprestar.", color: "azul" },
    { text: "Empresta mesmo sabendo que vai se complicar.", color: "vermelha" },
    { text: "Recusa com rispidez.", color: "vermelha" }
  ]
},
// ======== CARTAS PACOTE 5 — DIFERENTES ========

// TRABALHO
{
  theme: "Trabalho",
  question: "Um colega assume o crédito de uma ideia que foi sua.",
  answers: [
    { text: "Conversa com ele em particular para esclarecer.", color: "azul" },
    { text: "Leva o caso ao gestor com maturidade.", color: "azul" },
    { text: "Ignora e guarda rancor em silêncio.", color: "vermelha" },
    { text: "Expõe ele na frente de todos com raiva.", color: "vermelha" }
  ]
},
// MEDO
{
  theme: "Medo",
  question: "Você precisa viajar sozinho para um lugar desconhecido.",
  answers: [
    { text: "Planeja com antecedência e pesquisa o destino.", color: "azul" },
    { text: "Pede dicas a pessoas experientes.", color: "azul" },
    { text: "Desiste por medo do novo.", color: "vermelha" },
    { text: "Vai sem preparo e se arrisca desnecessariamente.", color: "vermelha" }
  ]
},
// PERDA
{
  theme: "Perda",
  question: "Você perdeu um objeto de valor no transporte público.",
  answers: [
    { text: "Aceita a perda e registra ocorrência.", color: "azul" },
    { text: "Aprende a cuidar mais dos pertences.", color: "azul" },
    { text: "Se desespera e culpa todos à sua volta.", color: "vermelha" },
    { text: "Passa dias remoendo sem agir.", color: "vermelha" }
  ]
},
// FAMÍLIA
{
  theme: "Família",
  question: "Um parente mais velho precisa de cuidados constantes.",
  answers: [
    { text: "Organiza a família para dividir responsabilidades.", color: "azul" },
    { text: "Oferece apoio emocional e presença.", color: "azul" },
    { text: "Ignora e finge que não é sua obrigação.", color: "vermelha" },
    { text: "Reclama constantemente sem ajudar de fato.", color: "vermelha" }
  ]
},
// AJUDA
{
  theme: "Ajuda",
  question: "Um desconhecido pede uma informação na rua.",
  answers: [
    { text: "Explica com calma ou indica no celular.", color: "azul" },
    { text: "Acompanha parte do caminho para facilitar.", color: "azul" },
    { text: "Ignora e segue sem responder.", color: "vermelha" },
    { text: "Responde de forma ríspida.", color: "vermelha" }
  ]
},
// TRAIÇÃO
{
  theme: "Traição",
  question: "Um colega de equipe compartilha dados confidenciais.",
  answers: [
    { text: "Confronta com firmeza e pede explicação.", color: "azul" },
    { text: "Relata a situação ao responsável com provas.", color: "azul" },
    { text: "Espalha fofocas sobre ele.", color: "vermelha" },
    { text: "Finge que não viu para evitar conflito.", color: "vermelha" }
  ]
},
// SUPERAÇÃO
{
  theme: "Superação",
  question: "Você não passou em um exame importante.",
  answers: [
    { text: "Analisa os erros e cria um novo plano de estudo.", color: "azul" },
    { text: "Mantém a disciplina e tenta novamente.", color: "azul" },
    { text: "Desiste achando que não tem capacidade.", color: "vermelha" },
    { text: "Culpa os outros por sua reprovação.", color: "vermelha" }
  ]
},
// VÍCIO
{
  theme: "Vício",
  question: "Você percebe que está dependente de café para funcionar.",
  answers: [
    { text: "Reduz o consumo e substitui por água/descanso.", color: "azul" },
    { text: "Procura alternativas saudáveis para manter energia.", color: "azul" },
    { text: "Ignora os efeitos e continua exagerando.", color: "vermelha" },
    { text: "Se gaba do excesso como se fosse algo bom.", color: "vermelha" }
  ]
},
// INJUSTIÇA
{
  theme: "Injustiça",
  question: "Seu colega foi promovido de forma desleal.",
  answers: [
    { text: "Conversa com o gestor sobre critérios de promoção.", color: "azul" },
    { text: "Busca melhorar seu desempenho e ser reconhecido.", color: "azul" },
    { text: "Se revolta e fala mal dele pelas costas.", color: "vermelha" },
    { text: "Desiste de se esforçar no trabalho.", color: "vermelha" }
  ]
},
// LIBERDADE
{
  theme: "Liberdade",
  question: "Você deseja seguir uma carreira diferente da esperada por sua família.",
  answers: [
    { text: "Explica sua escolha com maturidade.", color: "azul" },
    { text: "Mostra comprometimento com a nova carreira.", color: "azul" },
    { text: "Obedece apenas para agradar os outros.", color: "vermelha" },
    { text: "Se revolta e rompe relações sem diálogo.", color: "vermelha" }
  ]
},
// DOENÇA
{
  theme: "Doença",
  question: "Você recebe um diagnóstico difícil.",
  answers: [
    { text: "Segue o tratamento indicado.", color: "azul" },
    { text: "Busca apoio emocional e familiar.", color: "azul" },
    { text: "Nega a realidade e não faz nada.", color: "vermelha" },
    { text: "Se isola sem procurar ajuda.", color: "vermelha" }
  ]
},
// CULPA
{
  theme: "Culpa",
  question: "Você prometeu algo e não cumpriu.",
  answers: [
    { text: "Reconhece e pede desculpas.", color: "azul" },
    { text: "Compensa de outra forma.", color: "azul" },
    { text: "Finge que não aconteceu nada.", color: "vermelha" },
    { text: "Culpa a outra pessoa pelo erro.", color: "vermelha" }
  ]
},
// AMIZADE
{
  theme: "Amizade",
  question: "Seu amigo começou a agir de forma distante.",
  answers: [
    { text: "Conversa para entender o que está acontecendo.", color: "azul" },
    { text: "Mostra apoio mesmo à distância.", color: "azul" },
    { text: "Cria boatos achando que ele não gosta mais de você.", color: "vermelha" },
    { text: "Ignora e rompe a amizade sem diálogo.", color: "vermelha" }
  ]
}
];

    

    