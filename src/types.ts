export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title: string; // 'Buscador(a) da Luz' | 'Filho(a) da Luz'
  subscriptionPlan: 'free' | 'raio_solar' | 'ascensionado';
  currentDay: number;
  completedDays: number[];
  streakDays: number;
  favoriteDays: number[];
  journalNotes: Record<number, string>;
  hasCompleted21Days: boolean;
  driveSyncEnabled: boolean;
  n8nAutomationEnabled: boolean;
  notificationTime: string;
}

export interface DayPrayer {
  day: number;
  title: string;
  subtitle: string;
  primaryBenefit: string;
  affirmation: string;
  reflectionText: string;
  prayerAudio: {
    title: string;
    duration: string;
    narrator: string;
    ambientFrequency: '432Hz' | '528Hz' | '741Hz';
    description: string;
  };
  prayerDecrees: string[];
  dailyPractice: {
    title: string;
    durationMinutes: number;
    steps: string[];
    sacredAction: string;
  };
}

export interface SpiritualBenefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
}

export interface LockedFeature {
  id: string;
  title: string;
  category: string;
  description: string;
  unlockCondition: string;
  estimatedRelease: string;
  icon: string;
  badge: string;
  accentColor: string;
  details: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  originalPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface IntegrationStatus {
  googleDrive: {
    connected: boolean;
    folderName: string;
    lastSync?: string;
    filesSynced: number;
  };
  n8nWebhook: {
    active: boolean;
    webhookUrl: string;
    channel: 'whatsapp' | 'telegram' | 'email';
    scheduleTime: string;
  };
  youtubeChannel: {
    handle: string;
    subscribers: string;
    videosCount: string;
  };
}
