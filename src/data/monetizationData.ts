import { SubscriptionPlan } from '../types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "plano_mensal",
    name: "Buscador da Luz",
    badge: "Mensal Recorrente",
    price: "R$ 29,90",
    period: "/mês",
    originalPrice: "R$ 39,90",
    description: "Ideal para iniciar sua caminhada diária de conexão e proteção espiritual com Arcanjo Miguel.",
    features: [
      "Acesso completo aos 21 Dias de Orações de Arcanjo Miguel",
      "Player de áudio com frequências Solfeggio (432Hz, 528Hz, 741Hz)",
      "Práticas diárias e decretos em texto",
      "Acompanhamento de streak e diário de luz pessoal",
      "Acesso à comunidade dos Buscadores da Luz",
      "Cancelamento simples a qualquer momento"
    ],
    popular: false
  },
  {
    id: "plano_anual",
    name: "Fraternidade Raio Solar",
    badge: "Mais Escolhido • 35% OFF",
    price: "R$ 19,90",
    period: "/mês (R$ 238,80/ano)",
    originalPrice: "R$ 358,80",
    description: "A assinatura definitiva para quem busca transformação contínua ao lado de Martha Vieira o ano todo.",
    features: [
      "TUDO do plano Buscador da Luz",
      "Desbloqueio prioritário dos Novos Portais após 21 dias",
      "Acesso ao Portal Saint Germain & Chama Violeta",
      "Sincronização em Nuvem com Google Drive (PDFs e áudios)",
      "Automação matinal via WhatsApp/Telegram (via n8n)",
      "2 Encontros mensais ao vivo com Martha Vieira",
      "Certificado Digital de Consagração dos Filhos da Luz",
      "2 meses inteiramente grátis"
    ],
    popular: true
  },
  {
    id: "plano_vitalicio",
    name: "Mestre Ascensionado",
    badge: "Acesso Perpétuo VIP",
    price: "R$ 497,00",
    period: "pagamento único (ou até 12x R$ 49,90)",
    originalPrice: "R$ 890,00",
    description: "Para guardiões e facilitadores que desejam imersão total e acesso perpétuo a todos os lançamentos futuros.",
    features: [
      "Acesso VITALÍCIO a todas as jornadas presentes e futuras",
      "Acesso imediato a todas as 6 janelas bloqueadas",
      "Livro de Decretos Sagrados da Fraternidade impresso enviado ao seu endereço",
      "Canal direto de oração com a equipe da Martha Vieira",
      "Selo dourado de Membro Fundador no perfil",
      "Garantia incondicional de 30 dias"
    ],
    popular: false
  }
];
