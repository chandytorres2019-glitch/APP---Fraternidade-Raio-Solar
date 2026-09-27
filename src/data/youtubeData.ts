export interface YouTubeItem {
  id: string;
  title: string;
  type: 'video' | 'short' | 'live';
  views: string;
  duration?: string;
  tag: string;
  description: string;
  url: string;
}

export const YOUTUBE_CHANNEL_DATA = {
  name: "Fraternidade Raio Solar",
  mentor: "Martha Vieira",
  subscribers: "88.400+ inscritos",
  channelUrl: "https://www.youtube.com/@FraternidadeRaioSolar/posts",
  avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
  bio: "Canal dedicado ao despertar espiritual, à Chama Violeta de Saint Germain, aos 7 Raios da Grande Fraternidade Branca, alinhamento dos Chakras, meditações canalizadas e cura emocional através da Luz Divina.",
  featuredPlaylists: [
    { name: "Chama Violeta & Saint Germain", count: "42 vídeos" },
    { name: "Arcanjo Miguel & Decretos de Proteção", count: "36 vídeos" },
    { name: "Os 7 Raios da Fraternidade Branca", count: "28 vídeos" },
    { name: "Cura Emocional e Alinhamento dos Chakras", count: "31 vídeos" },
    { name: "Orações Diárias para o Amanhecer", count: "54 vídeos" }
  ],
  recentVideos: [
    {
      id: "v1",
      title: "Poderosa Oração do Arcanjo Miguel: Cortando Toda Negatividade e Inveja",
      type: "video",
      views: "142 mil visualizações",
      duration: "18:42",
      tag: "Arcanjo Miguel",
      description: "Decreto canalizado por Martha Vieira para quebrar demandas espirituais e ancorar o Manto Azul de São Miguel.",
      url: "https://www.youtube.com/@FraternidadeRaioSolar"
    },
    {
      id: "v2",
      title: "Chama Violeta em Ação: Como Saint Germain Transmuta o Medo em Luz",
      type: "video",
      views: "98 mil visualizações",
      duration: "24:10",
      tag: "Chama Violeta",
      description: "Aprenda a invocar a Chama Sagrada para perdoar traumas e libertar sua linhagem de dores do passado.",
      url: "https://www.youtube.com/@FraternidadeRaioSolar"
    },
    {
      id: "v3",
      title: "Alinhamento dos 7 Chakras com as Hostes Angélicas e Sons Sagrados",
      type: "video",
      views: "76 mil visualizações",
      duration: "32:00",
      tag: "Chakras & Cura",
      description: "Meditação guiada para limpar bloqueios de escassez e cansaço nos 7 centros energéticos do corpo.",
      url: "https://www.youtube.com/@FraternidadeRaioSolar"
    },
    {
      id: "s1",
      title: "Decreto Rápido de São Miguel para quando sentir medo ou ansiedade!",
      type: "short",
      views: "64 mil visualizações",
      duration: "00:59",
      tag: "Shorts Luz",
      description: "Diga comigo: 'Arcanjo Miguel à minha frente, proteja minha alma!'",
      url: "https://www.youtube.com/@FraternidadeRaioSolar/shorts"
    },
    {
      id: "s2",
      title: "O que acontece quando você invoca o Raio Violeta antes de dormir?",
      type: "short",
      views: "112 mil visualizações",
      duration: "00:52",
      tag: "Chama Violeta",
      description: "Dica preciosa da Martha Vieira para um sono reparador no Retiro dos Mestres.",
      url: "https://www.youtube.com/@FraternidadeRaioSolar/shorts"
    }
  ] as YouTubeItem[]
};
