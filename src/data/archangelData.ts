import { SpiritualBenefit } from '../types';

export const ARCHANGEL_MICHAEL_INFO = {
  name: "Arcanjo Miguel (Lord Michael)",
  title: "Príncipe dos Arcanjos e Guardião da Fé Cósmica",
  ray: "1º Raio Cósmico - Chama Azul Cobalto",
  virtues: ["Vontade Divina", "Fé Inabalável", "Proteção Cósmica", "Poder Espiritual", "Libertação"],
  divineComplement: "Arcangelina Fé",
  chohan: "Mestre Ascensionado El Morya",
  elohim: "Hércules e Amazonas",
  chakra: "Chakra Laríngeo (Vishuddha)",
  sacredDay: "29 de Setembro - Celebração Planetária dos Arcanjos",
  ethericRetreat: "Templo da Fé e Proteção, sobre Banff e Lago Louise, Canadá",
  symbol: "Espada de Chama Azul da Verdade e Escudo Solar Dourado",
  description: `Dentro dos ensinamentos sagrados da Grande Fraternidade Branca e dos Mestres Ascensionados transmitidos por Martha Vieira, o Arcanjo Miguel é a suprema inteligência cósmica encarregada da defesa da Terra e da libertação de toda energia densa. Com sua poderosa Espada de Luz Azul-Safira, Ele corta amarras cármicas, desintegra o medo, neutraliza influências negativas e reconecta os 'Filhos e Filhas da Luz' à Vontade Suprema do Criador.`,
  callOfPresence: `"Em nome da Amada Presença de Deus EU SOU em nossos corações, invocamos o Amado Arcanjo Miguel e suas Legiões Celestes de Luz Azul: Seccionai! Libertai! Protegei o nosso campo energético, nossas famílias e nosso sagrado propósito terrestre!"`
};

export const SPIRITUAL_BENEFITS: SpiritualBenefit[] = [
  {
    id: "fe_confianca",
    title: "Fortalecimento da Fé e Confiança",
    description: "Restauração profunda da certeza no plano superior divino, dissolvendo dúvidas e incertezas sobre o seu caminho.",
    iconName: "ShieldCheck",
    color: "from-blue-600 to-indigo-900"
  },
  {
    id: "coragem_determinacao",
    title: "Coragem e Determinação",
    description: "Ativação da força do Guerreiro da Luz para agir com firmeza, quebrar inércias e superar qualquer desafio com dignidade.",
    iconName: "Flame",
    color: "from-amber-500 to-orange-700"
  },
  {
    id: "libertacao_medos",
    title: "Libertação de Medos e Bloqueios",
    description: "Corte com a Espada de Luz de cordões energéticos tóxicos, fobias, ansiedades e padrões de autossabotagem herdados.",
    iconName: "Scissors",
    color: "from-sky-500 to-blue-700"
  },
  {
    id: "alinhamento_luz",
    title: "Alinhamento com a Luz Divina",
    description: "Sintonia direta com a Chama Trina no coração e recepção contínua da emanação solar da Fraternidade Branca.",
    iconName: "Sun",
    color: "from-amber-400 to-yellow-600"
  },
  {
    id: "transformacao_emocional",
    title: "Transformação Emocional",
    description: "Alquimia sagrada que transmuta angústias e mágoas em perdão, serenidade e equilíbrio através do Raio Violeta associado.",
    iconName: "Sparkles",
    color: "from-purple-600 to-violet-900"
  },
  {
    id: "desenvolvimento_intuicao",
    title: "Desenvolvimento da Intuição",
    description: "Abertura do 3º olho e alinhamento com a sabedoria superior, aprendendo a discernir a voz da Alma da voz do ego.",
    iconName: "Eye",
    color: "from-indigo-500 to-purple-800"
  },
  {
    id: "protecao_familiar",
    title: "Proteção Familiar e Harmonia no Lar",
    description: "Criação de um domo protetor de luz azul sobre sua residência e blindagem de seus entes queridos contra baixas vibrações.",
    iconName: "Home",
    color: "from-blue-500 to-cyan-700"
  },
  {
    id: "paz_bem_estar",
    title: "Sentimento de Paz e Bem-Estar",
    description: "Instauração de calma inabalável na mente e no corpo, promovendo sono reparador e sensação acolhedora de amparo celeste.",
    iconName: "HeartHandshake",
    color: "from-emerald-500 to-teal-800"
  },
  {
    id: "despertar_universal",
    title: "Despertar da Espiritualidade Universal",
    description: "Consciência viva de pertencer aos Filhos da Luz, alinhando sua missão terrena ao florescimento do Raio Solar na Terra.",
    iconName: "Compass",
    color: "from-amber-500 to-purple-800"
  }
];

export const THE_7_RAYS = [
  {
    ray: "1º Raio",
    name: "Raio Azul",
    virtues: "Vontade de Deus, Fé, Poder, Proteção e Determinação",
    masters: "Arcanjo Miguel, Mestre El Morya, Elohim Hércules",
    color: "bg-blue-600",
    glow: "shadow-blue-500/50",
    border: "border-blue-400/40"
  },
  {
    ray: "2º Raio",
    name: "Raio Dourado / Amarelo",
    virtues: "Sabedoria Divina, Iluminação, Compreensão e Discernimento",
    masters: "Arcanjo Jofiel, Mestre Lanto, Elohim Cassiopéia",
    color: "bg-amber-400",
    glow: "shadow-amber-400/50",
    border: "border-amber-300/40"
  },
  {
    ray: "3º Raio",
    name: "Raio Rosa",
    virtues: "Amor Divino Incondicional, Adoração, Beleza e Tolerância",
    masters: "Arcanjo Chamuel, Mestra Rowena, Elohim Orion",
    color: "bg-pink-500",
    glow: "shadow-pink-500/50",
    border: "border-pink-300/40"
  },
  {
    ray: "4º Raio",
    name: "Raio Branco Cristal",
    virtues: "Pureza, Ascensão, Esperança, Ressurreição e Harmonia",
    masters: "Arcanjo Gabriel, Mestre Serapis Bey, Elohim Claire",
    color: "bg-slate-100",
    glow: "shadow-slate-100/50",
    border: "border-white/50"
  },
  {
    ray: "5º Raio",
    name: "Raio Verde",
    virtues: "Cura Emocional e Física, Verdade Cósmica, Ciência e Consagração",
    masters: "Arcanjo Rafael, Mestre Hilarion, Elohim Vista",
    color: "bg-emerald-500",
    glow: "shadow-emerald-500/50",
    border: "border-emerald-300/40"
  },
  {
    ray: "6º Raio",
    name: "Raio Rubi-Dourado",
    virtues: "Paz Profunda, Devoção, Graça Divina e Ministração",
    masters: "Arcanjo Uriel, Mestra Nada, Elohim Tranquilitas",
    color: "bg-rose-700",
    glow: "shadow-rose-600/50",
    border: "border-rose-400/40"
  },
  {
    ray: "7º Raio",
    name: "Raio Violeta",
    virtues: "Transmutação Alquímica, Perdão, Misericórdia, Liberdade e Chama Sagrada",
    masters: "Arcanjo Zadkiel, Mestre Saint Germain, Elohim Arcturus",
    color: "bg-purple-600",
    glow: "shadow-purple-500/50",
    border: "border-purple-300/40"
  }
];
