import { SupportedLanguage } from './types';
import { ARCHANGEL_MICHAEL_INFO, THE_7_RAYS } from '../data/archangelData';
import { LOCKED_FEATURES_DATA } from '../data/lockedModulesData';
import { SUBSCRIPTION_PLANS } from '../data/monetizationData';
import { YOUTUBE_CHANNEL_DATA } from '../data/youtubeData';
import { LockedFeature, SubscriptionPlan } from '../types';

export function getLocalizedArchangelInfo(lang: SupportedLanguage) {
  if (lang === 'es') {
    return {
      ...ARCHANGEL_MICHAEL_INFO,
      name: "Arcángel Miguel (Lord Michael)",
      title: "Príncipe de los Arcángeles y Guardián de la Fe Cósmica",
      ray: "1º Rayo Cósmico - Llama Azul Cobalto",
      virtues: ["Voluntad Divina", "Fe Inquebrantable", "Protección Cósmica", "Poder Espiritual", "Liberación"],
      divineComplement: "Arcangelina Fe",
      chohan: "Maestro Ascendido El Morya",
      elohim: "Hércules y Amazonas",
      chakra: "Chakra Laríngeo (Vishuddha)",
      sacredDay: "29 de Septiembre - Celebración Planetaria de los Arcángeles",
      ethericRetreat: "Templo de la Fe y Protección, sobre Banff y Lago Louise, Canadá",
      symbol: "Espada de Llama Azul de la Verdad y Escudo Solar Dorado",
      description: `Dentro de las enseñanzas sagradas de la Gran Hermandad Blanca y de los Maestros Ascendidos transmitidas por Martha Vieira, el Arcángel Miguel es la suprema inteligencia cósmica encargada de la defensa de la Tierra y de la liberación de toda energía densa. Con su poderosa Espada de Luz Azul Zafiro, corta ataduras kármicas, desintegra el miedo, neutraliza influencias negativas y reconecta a los 'Hijos e Hijas de la Luz' con la Voluntad Suprema del Creador.`,
      callOfPresence: `"En nombre de la Amada Presencia de Dios YO SOY en nuestros corazones, invocamos al Amado Arcángel Miguel y a sus Legiones Celestiales de Luz Azul: ¡Seccionad! ¡Liberad! ¡Proteged nuestro campo energético, nuestras familias y nuestro sagrado propósito terrenal!"`
    };
  }
  if (lang === 'en') {
    return {
      ...ARCHANGEL_MICHAEL_INFO,
      name: "Archangel Michael (Lord Michael)",
      title: "Prince of the Archangels and Guardian of Cosmic Faith",
      ray: "1st Cosmic Ray - Cobalt Blue Flame",
      virtues: ["Divine Will", "Unshakeable Faith", "Cosmic Protection", "Spiritual Power", "Liberation"],
      divineComplement: "Archeia Faith",
      chohan: "Ascended Master El Morya",
      elohim: "Hercules and Amazonia",
      chakra: "Throat Chakra (Vishuddha)",
      sacredDay: "September 29 - Planetary Celebration of the Archangels",
      ethericRetreat: "Temple of Faith and Protection, over Banff and Lake Louise, Canada",
      symbol: "Blue Flame Sword of Truth and Golden Solar Shield",
      description: `Within the sacred teachings of the Great White Brotherhood and the Ascended Masters channeled by Martha Vieira, Archangel Michael is the supreme cosmic intelligence entrusted with the defense of Earth and liberation from all dense energy. With His mighty Sapphire Blue Sword of Light, He severs karmic ties, dissolves fear, neutralizes negative influences, and reconnects Children of Light with the Creator's Supreme Will.`,
      callOfPresence: `"In the name of the Beloved Presence of God I AM in our hearts, we invoke Beloved Archangel Michael and His Celestial Legions of Blue Light: Sever! Liberate! Protect our energetic field, our families, and our sacred earthly mission!"`
    };
  }
  if (lang === 'fr') {
    return {
      ...ARCHANGEL_MICHAEL_INFO,
      name: "Archange Michaël (Lord Michael)",
      title: "Prince des Archanges et Gardien de la Foi Cosmique",
      ray: "1er Rayon Cosmique - Flamme Bleu Cobalt",
      virtues: ["Volonté Divine", "Foi Inébranlable", "Protection Cosmique", "Pouvoir Spirituel", "Libération"],
      divineComplement: "Archangéline Foi",
      chohan: "Maître Ascensionné El Morya",
      chakra: "Chakra de la Gorge (Vishuddha)",
      symbol: "Épée de Flamme Bleue de Vérité et Bouclier Solaire Doré",
      description: `Selon les enseignements sacrés de la Grande Fraternité Blanche et des Maîtres Ascensionnés transmis par Martha Vieira, l'Archange Michaël est la suprême intelligence cosmique chargée de la défense de la Terre et de la libération de toute densité. Avec sa puissante Épée de Lumière Bleu Saphir, Il tranche les liens karmiques et rétablit la paix.`,
      callOfPresence: `"Au nom de la Bien-aimée Présence de Dieu JE SUIS dans nos cœurs, nous invoquons le Bien-aimé Archange Michaël et ses Légions Célestes de Lumière Bleue : Tranchez ! Libérez ! Protégez notre champ d'énergie, nos familles et notre mission sacrée !"`
    };
  }
  if (lang === 'de') {
    return {
      ...ARCHANGEL_MICHAEL_INFO,
      name: "Erzengel Michael (Lord Michael)",
      title: "Fürst der Erzengel und Hüter des Kosmischen Glaubens",
      ray: "1. Kosmischer Strahl - Kobaltblaue Flamme",
      virtues: ["Göttlicher Wille", "Unerschütterlicher Glaube", "Kosmischer Schutz", "Geistige Kraft", "Befreiung"],
      divineComplement: "Archeia Glaube",
      chohan: "Aufgestiegener Meister El Morya",
      chakra: "Halschakra (Vishuddha)",
      symbol: "Schwert aus blauer Flamme der Wahrheit und Goldener Sonnenschild",
      description: `In den heiligen Lehren der Großen Weißen Bruderschaft und der Aufgestiegenen Meister, übermittelt von Martha Vieira, ist Erzengel Michael die höchste kosmische Intelligenz zum Schutz der Erde. Mit Seinem Schwert trennt Er karmische Verstrickungen und löst Ängste auf.`,
      callOfPresence: `"Im Namen der geliebten Gegenwart Gottes ICH BIN in unseren Herzen rufen wir den geliebten Erzengel Michael und Seine himmlischen Legionen des Blauen Lichts an: Durchtrennt! Befreit! Schützt unser Energiefeld und unsere heilige Mission!"`
    };
  }
  return ARCHANGEL_MICHAEL_INFO;
}

export function getLocalized7Rays(lang: SupportedLanguage) {
  if (lang === 'es') {
    return [
      {
        ray: "1º Rayo",
        name: "Rayo Azul",
        virtues: "Voluntad de Dios, Fe, Poder, Protección y Determinación",
        masters: "Arcángel Miguel, Maestro El Morya, Elohim Hércules",
        color: "bg-blue-600",
        glow: "shadow-blue-500/50",
        border: "border-blue-400/40"
      },
      {
        ray: "2º Rayo",
        name: "Rayo Dorado / Amarillo",
        virtues: "Sabiduría Divina, Iluminación, Comprensión y Discernimiento",
        masters: "Arcángel Jofiel, Maestro Lanto, Elohim Casiopea",
        color: "bg-amber-400",
        glow: "shadow-amber-400/50",
        border: "border-amber-300/40"
      },
      {
        ray: "3º Rayo",
        name: "Rayo Rosa",
        virtues: "Amor Divino Incondicional, Adoración, Belleza y Tolerancia",
        masters: "Arcángel Chamuel, Maestra Rowena, Elohim Orión",
        color: "bg-pink-500",
        glow: "shadow-pink-500/50",
        border: "border-pink-300/40"
      },
      {
        ray: "4º Rayo",
        name: "Rayo Blanco Cristal",
        virtues: "Pureza, Ascensión, Esperanza, Resurrección y Armonía",
        masters: "Arcángel Gabriel, Maestro Serapis Bey, Elohim Claire",
        color: "bg-slate-100",
        glow: "shadow-slate-100/50",
        border: "border-white/50"
      },
      {
        ray: "5º Rayo",
        name: "Rayo Verde",
        virtues: "Sanación Emocional y Física, Verdad Cósmica, Ciencia y Consagración",
        masters: "Arcángel Rafael, Maestro Hilarión, Elohim Vista",
        color: "bg-emerald-500",
        glow: "shadow-emerald-500/50",
        border: "border-emerald-300/40"
      },
      {
        ray: "6º Rayo",
        name: "Rayo Rubí-Dorado",
        virtues: "Paz Profunda, Devoción, Gracia Divina y Ministración",
        masters: "Arcángel Uriel, Maestra Nada, Elohim Tranquilitas",
        color: "bg-rose-700",
        glow: "shadow-rose-600/50",
        border: "border-rose-400/40"
      },
      {
        ray: "7º Rayo",
        name: "Rayo Violeta",
        virtues: "Transmutación Alquímica, Perdón, Misericordia, Libertad y Llama Sagrada",
        masters: "Arcángel Zadquiel, Maestro Saint Germain, Elohim Arcturus",
        color: "bg-purple-600",
        glow: "shadow-purple-500/50",
        border: "border-purple-300/40"
      }
    ];
  }
  if (lang === 'en') {
    return [
      {
        ray: "1st Ray",
        name: "Blue Ray",
        virtues: "Will of God, Faith, Power, Protection, and Determination",
        masters: "Archangel Michael, Master El Morya, Elohim Hercules",
        color: "bg-blue-600",
        glow: "shadow-blue-500/50",
        border: "border-blue-400/40"
      },
      {
        ray: "2nd Ray",
        name: "Golden / Yellow Ray",
        virtues: "Divine Wisdom, Illumination, Comprehension, and Discernment",
        masters: "Archangel Jophiel, Master Lanto, Elohim Cassiopeia",
        color: "bg-amber-400",
        glow: "shadow-amber-400/50",
        border: "border-amber-300/40"
      },
      {
        ray: "3rd Ray",
        name: "Pink Ray",
        virtues: "Unconditional Divine Love, Adoration, Beauty, and Tolerance",
        masters: "Archangel Chamuel, Master Rowena, Elohim Orion",
        color: "bg-pink-500",
        glow: "shadow-pink-500/50",
        border: "border-pink-300/40"
      },
      {
        ray: "4th Ray",
        name: "Crystal White Ray",
        virtues: "Purity, Ascension, Hope, Resurrection, and Harmony",
        masters: "Archangel Gabriel, Master Serapis Bey, Elohim Claire",
        color: "bg-slate-100",
        glow: "shadow-slate-100/50",
        border: "border-white/50"
      },
      {
        ray: "5th Ray",
        name: "Green Ray",
        virtues: "Physical & Emotional Healing, Cosmic Truth, Science, and Consecration",
        masters: "Archangel Raphael, Master Hilarion, Elohim Vista",
        color: "bg-emerald-500",
        glow: "shadow-emerald-500/50",
        border: "border-emerald-300/40"
      },
      {
        ray: "6th Ray",
        name: "Ruby-Gold Ray",
        virtues: "Deep Peace, Devotion, Divine Grace, and Ministration",
        masters: "Archangel Uriel, Master Nada, Elohim Tranquilitas",
        color: "bg-rose-700",
        glow: "shadow-rose-600/50",
        border: "border-rose-400/40"
      },
      {
        ray: "7th Ray",
        name: "Violet Ray",
        virtues: "Alchemical Transmutation, Forgiveness, Mercy, Freedom, and Sacred Flame",
        masters: "Archangel Zadkiel, Master Saint Germain, Elohim Arcturus",
        color: "bg-purple-600",
        glow: "shadow-purple-500/50",
        border: "border-purple-300/40"
      }
    ];
  }
  if (lang === 'fr') {
    return [
      {
        ray: "1er Rayon",
        name: "Rayon Bleu",
        virtues: "Volonté Divine, Foi, Puissance, Protection et Détermination",
        masters: "Archange Michaël, Maître El Morya, Elohim Hercule",
        color: "bg-blue-600",
        glow: "shadow-blue-500/50",
        border: "border-blue-400/40"
      },
      {
        ray: "2e Rayon",
        name: "Rayon Jaune Or",
        virtues: "Sagesse Divine, Illumination, Compréhension et Discernement",
        masters: "Archange Jophiel, Maître Lanto, Elohim Cassiopée",
        color: "bg-amber-400",
        glow: "shadow-amber-400/50",
        border: "border-amber-300/40"
      },
      {
        ray: "7e Rayon",
        name: "Rayon Violet",
        virtues: "Transmutation Alchimique, Pardon, Miséricorde, Liberté et Flamme Sacrée",
        masters: "Archange Zadkiel, Maître Saint Germain, Elohim Arcturus",
        color: "bg-purple-600",
        glow: "shadow-purple-500/50",
        border: "border-purple-300/40"
      }
    ];
  }
  return THE_7_RAYS;
}

export function getLocalizedLockedFeatures(lang: SupportedLanguage): LockedFeature[] {
  if (lang === 'es') {
    return LOCKED_FEATURES_DATA.map(f => {
      if (f.id === 'portal_saint_germain') {
        return {
          ...f,
          title: "Portal Saint Germain y Alquimia de la Llama Violeta",
          category: "Iniciación Hermética y Alquimia",
          description: "Inmersión profunda en los 7 aspectos de la Llama Violeta transmutadora con decretos secretos del Templo de Rakoczy y desprogramación de karmas de vidas pasadas.",
          unlockCondition: "Se desbloquea automáticamente tras completar los 21 días de San Miguel o con el Plan Maestro Ascendido.",
          estimatedRelease: "Disponible tras consagración de 21 días",
          badge: "Transmutación Alquímica",
          details: [
            "28 Decretos de Fuego Violeta para limpieza del árbol genealógico",
            "Sintonización con el Retiro Etérico de Saint Germain en Transilvania y Monte Shasta",
            "Meditación guiada de ruptura de votos de pobreza y soledad kármica",
            "Manual de Alquimia Espiritual en PDF descargable directamente a Google Drive"
          ]
        };
      }
      if (f.id === 'iniciacao_7_raios') {
        return {
          ...f,
          title: "Jornada de los 7 Rayos de la Gran Hermandad Blanca",
          category: "Maestría Cósmica",
          description: "Estudio diario y canalizado de cada uno de los 7 Rayos: Azul, Dorado, Rosa, Blanco, Verde, Rubí-Dorado y Violeta.",
          unlockCondition: "Se desbloquea en el Solsticio / Próximo Ciclo Solar (Requiere 21 Días)",
          estimatedRelease: "Fase 2 de la Hermandad",
          badge: "7 Maestros Ascendidos",
          details: [
            "Invocación a los 7 Chohans y Arcángeles regentes de cada día de la semana",
            "Cálculo del Rayo del Alma y Rayo de Personalidad",
            "Audios binaurales en las 7 frecuencias Solfeggio",
            "Ejercicios diarios de aplicación de las virtudes divinas"
          ]
        };
      }
      if (f.id === 'cura_7_chakras') {
        return {
          ...f,
          title: "Armonización y Alineación de los 7 Chakras",
          category: "Sanación Emocional y Bioenergética",
          description: "Escaneo bioenergético completo con cuencos de cristal de cuarzo y decretos de los Arcángeles Rafael y Gabriel para limpieza de miasmas y expansión del aura.",
          unlockCondition: "Disponible para Miembros del Plan Rayo Solar o Conclusión de 21 Días",
          estimatedRelease: "En fase final de grabación por Martha Vieira",
          badge: "Sanación Emocional",
          details: [
            "Meditación guiada de 30 minutos para desbloqueo del Chakra Cardíaco",
            "Alineación de vórtices inferiores para destrabar prosperidad y seguridad",
            "Trabajo de sanación del niño interior y perdón con la Maestra Kwan Yin",
            "Diagnóstico interactivo de alineación de centros energéticos"
          ]
        };
      }
      return f;
    });
  }
  if (lang === 'en') {
    return LOCKED_FEATURES_DATA.map(f => {
      if (f.id === 'portal_saint_germain') {
        return {
          ...f,
          title: "Saint Germain Portal & Violet Flame Alchemy",
          category: "Hermetic Initiation & Alchemy",
          description: "Deep immersion in the 7 aspects of the transmuting Violet Flame with secret decrees from the Rakoczy Temple and clearing of past life karma.",
          unlockCondition: "Unlocks automatically upon completing the 21 days of Archangel Michael or with the Ascended Master Plan.",
          estimatedRelease: "Available after 21-day consecration",
          badge: "Alchemical Transmutation",
          details: [
            "28 Violet Fire Decrees for family tree clearing",
            "Attunement with Saint Germain's Etheric Retreat in Transylvania and Mount Shasta",
            "Guided meditation breaking vows of poverty and karmic isolation",
            "Spiritual Alchemy PDF manual downloadable directly to Google Drive"
          ]
        };
      }
      if (f.id === 'iniciacao_7_raios') {
        return {
          ...f,
          title: "Journey of the 7 Rays of the Great White Brotherhood",
          category: "Cosmic Mastery",
          description: "Daily channeled study of each of the 7 Rays: Blue, Golden, Pink, White, Green, Ruby-Gold, and Violet.",
          unlockCondition: "Unlocks on Solstice / Next Solar Cycle (Requires 21 Days)",
          estimatedRelease: "Brotherhood Phase 2",
          badge: "7 Ascended Masters",
          details: [
            "Invocation to the 7 Chohans and Archangels of each weekday",
            "Calculation of Soul Ray and Personality Ray",
            "Binaural audios across the 7 Solfeggio frequencies",
            "Daily exercises for applying divine virtues"
          ]
        };
      }
      return f;
    });
  }
  return LOCKED_FEATURES_DATA;
}

export function getLocalizedPlans(lang: SupportedLanguage): SubscriptionPlan[] {
  if (lang === 'es') {
    return [
      {
        id: "plano_mensal",
        name: "Buscador de la Luz",
        badge: "Mensual Recurrente",
        price: "$ 5,90 USD",
        period: "/mes",
        originalPrice: "$ 9,90 USD",
        description: "Ideal para iniciar tu camino diario de conexión y protección espiritual con el Arcángel Miguel.",
        features: [
          "Acceso completo a los 21 Días de Oraciones del Arcángel Miguel",
          "Reproductor de audio con frecuencias Solfeggio (432Hz, 528Hz, 741Hz)",
          "Prácticas diarias y decretos en texto",
          "Seguimiento de racha y diario de luz personal",
          "Acceso a la comunidad de los Buscadores de la Luz",
          "Cancelación simple en cualquier momento"
        ],
        popular: false
      },
      {
        id: "plano_anual",
        name: "Hermandad Rayo Solar",
        badge: "Más Elegido • 35% OFF",
        price: "$ 3,90 USD",
        period: "/mes ($ 46,80/año)",
        originalPrice: "$ 72,00 USD",
        description: "La membresía definitiva para quien busca transformación continua junto a Martha Vieira todo el año.",
        features: [
          "TODO lo del plan Buscador de la Luz",
          "Desbloqueo prioritario de los Nuevos Portales tras 21 días",
          "Acceso al Portal Saint Germain y Llama Violeta",
          "Sincronización en la Nube con Google Drive (PDFs y audios)",
          "Automatización matutina vía WhatsApp/Telegram (vía n8n)",
          "2 Encuentros mensuales en vivo con Martha Vieira",
          "Certificado Digital de Consagración de los Hijos de la Luz",
          "2 meses enteramente gratis"
        ],
        popular: true
      },
      {
        id: "plano_vitalicio",
        name: "Maestro Ascendido",
        badge: "Acceso Perpetuo VIP",
        price: "$ 97,00 USD",
        period: "pago único",
        originalPrice: "$ 180,00 USD",
        description: "Para guardianes y facilitadores que desean inmersión total y acceso perpetuo a todos los lanzamientos futuros.",
        features: [
          "Acceso VITALICIO a todas las jornadas presentes y futuras",
          "Acceso inmediato a todas las 6 ventanas bloqueadas",
          "Libro de Decretos Sagrados de la Hermandad impreso",
          "Canal directo de oración con el equipo de Martha Vieira",
          "Sello dorado de Miembro Fundador en tu perfil",
          "Garantía incondicional de 30 días"
        ],
        popular: false
      }
    ];
  }
  if (lang === 'en') {
    return [
      {
        id: "plano_mensal",
        name: "Seeker of Light",
        badge: "Monthly Recurring",
        price: "$ 5.90 USD",
        period: "/month",
        originalPrice: "$ 9.90 USD",
        description: "Ideal to begin your daily journey of spiritual connection and protection with Archangel Michael.",
        features: [
          "Full access to the 21 Days of Archangel Michael Prayers",
          "Audio player with Solfeggio frequencies (432Hz, 528Hz, 741Hz)",
          "Daily practices and sacred decree texts",
          "Streak tracking and personal light journal",
          "Access to the community of Seekers of Light",
          "Easy cancellation anytime"
        ],
        popular: false
      },
      {
        id: "plano_anual",
        name: "Solar Ray Brotherhood",
        badge: "Most Popular • 35% OFF",
        price: "$ 3.90 USD",
        period: "/month ($ 46.80/year)",
        originalPrice: "$ 72.00 USD",
        description: "The definitive membership for continuous transformation alongside Martha Vieira year-round.",
        features: [
          "EVERYTHING in the Seeker of Light plan",
          "Priority unlocking of New Portals after 21 days",
          "Access to Saint Germain & Violet Flame Portal",
          "Cloud Sync with Google Drive (PDFs and audios)",
          "Morning automation via WhatsApp/Telegram (via n8n)",
          "2 Monthly live gatherings with Martha Vieira",
          "Digital Consecration Certificate of Children of Light",
          "2 months completely free"
        ],
        popular: true
      },
      {
        id: "plano_vitalicio",
        name: "Ascended Master",
        badge: "Lifetime VIP Access",
        price: "$ 97.00 USD",
        period: "one-time payment",
        originalPrice: "$ 180.00 USD",
        description: "For guardians and guides desiring total immersion and lifetime access to all future releases.",
        features: [
          "LIFETIME access to all present and future journeys",
          "Immediate access to all 6 locked portals",
          "Printed Sacred Decrees Book of the Brotherhood",
          "Direct prayer line with Martha Vieira's team",
          "Golden Founding Member badge on your profile",
          "30-day unconditional guarantee"
        ],
        popular: false
      }
    ];
  }
  return SUBSCRIPTION_PLANS;
}

export function getLocalizedYouTube(lang: SupportedLanguage) {
  if (lang === 'es') {
    return {
      ...YOUTUBE_CHANNEL_DATA,
      subscribers: "88.400+ suscriptores",
      bio: "Canal dedicado al despertar espiritual, la Llama Violeta de Saint Germain, los 7 Rayos de la Gran Hermandad Blanca, alineación de Chakras, meditaciones canalizadas y sanación emocional a través de la Luz Divina.",
      featuredPlaylists: [
        { name: "Llama Violeta y Saint Germain", count: "42 videos" },
        { name: "Arcángel Miguel y Decretos de Protección", count: "36 videos" },
        { name: "Los 7 Rayos de la Hermandad Blanca", count: "28 videos" },
        { name: "Sanación Emocional y Alineación de Chakras", count: "31 videos" },
        { name: "Oraciones Diarias para el Amanecer", count: "54 videos" }
      ],
      recentVideos: [
        {
          id: "v1",
          title: "Poderosa Oración del Arcángel Miguel: Cortando Toda Negatividad y Envidia",
          type: "video" as const,
          views: "142 mil visualizaciones",
          duration: "18:42",
          tag: "Arcángel Miguel",
          description: "Decreto canalizado por Martha Vieira para quebrar demandas espirituales y anclar el Manto Azul de San Miguel.",
          url: "https://www.youtube.com/@FraternidadeRaioSolar"
        },
        {
          id: "v2",
          title: "Llama Violeta en Acción: Cómo Saint Germain Transmuta el Miedo en Luz",
          type: "video" as const,
          views: "98 mil visualizaciones",
          duration: "24:10",
          tag: "Llama Violeta",
          description: "Aprende a invocar la Llama Sagrada para perdonar traumas y liberar tu linaje de dolores pasados.",
          url: "https://www.youtube.com/@FraternidadeRaioSolar"
        },
        {
          id: "v3",
          title: "Alineación de los 7 Chakras con las Huestes Angélicas y Sonidos Sagrados",
          type: "video" as const,
          views: "76 mil visualizaciones",
          duration: "32:00",
          tag: "Chakras y Sanación",
          description: "Meditación guiada para limpiar bloqueos de escasez y cansancio en los 7 centros energéticos del cuerpo.",
          url: "https://www.youtube.com/@FraternidadeRaioSolar"
        }
      ]
    };
  }
  if (lang === 'en') {
    return {
      ...YOUTUBE_CHANNEL_DATA,
      subscribers: "88,400+ subscribers",
      bio: "Channel dedicated to spiritual awakening, Saint Germain's Violet Flame, the 7 Rays of the Great White Brotherhood, Chakra alignment, channeled meditations, and emotional healing through Divine Light.",
      featuredPlaylists: [
        { name: "Violet Flame & Saint Germain", count: "42 videos" },
        { name: "Archangel Michael & Protection Decrees", count: "36 videos" },
        { name: "The 7 Rays of the White Brotherhood", count: "28 videos" },
        { name: "Emotional Healing & Chakra Alignment", count: "31 videos" },
        { name: "Daily Dawn Prayers", count: "54 videos" }
      ],
      recentVideos: [
        {
          id: "v1",
          title: "Powerful Archangel Michael Prayer: Severing All Negativity and Envy",
          type: "video" as const,
          views: "142k views",
          duration: "18:42",
          tag: "Archangel Michael",
          description: "Decree channeled by Martha Vieira to dissolve spiritual blockages and anchor Michael's Blue Cloak.",
          url: "https://www.youtube.com/@FraternidadeRaioSolar"
        },
        {
          id: "v2",
          title: "Violet Flame in Action: How Saint Germain Transmutes Fear into Light",
          type: "video" as const,
          views: "98k views",
          duration: "24:10",
          tag: "Violet Flame",
          description: "Learn to invoke the Sacred Flame to forgive trauma and release your ancestral lineage.",
          url: "https://www.youtube.com/@FraternidadeRaioSolar"
        }
      ]
    };
  }
  return YOUTUBE_CHANNEL_DATA;
}
