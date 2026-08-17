import { TVDevice, AppSettings, SystemLog } from '../types/tv';

const STORAGE_KEYS = {
  SAVED_TVS: 'controle_tv_saved_devices',
  ACTIVE_TV_ID: 'controle_tv_active_device_id',
  SETTINGS: 'controle_tv_settings',
  LOGS: 'controle_tv_logs',
  ONBOARDING_COMPLETED: 'controle_tv_onboarding_completed',
};

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  vibration: true,
  autoReconnect: true,
  autoDiscover: true,
  showTips: true,
  demoMode: false,
};

// Initial default sample TVs if empty
export const SAMPLE_SAVED_TVS: TVDevice[] = [
  {
    id: 'demo_living_room',
    name: 'TV da Sala (Demo)',
    manufacturer: 'LG',
    model: 'OLED55C3',
    ipAddress: '192.168.1.105',
    macAddress: 'AA:BB:CC:11:22:33',
    connectionType: 'wifi',
    protocol: 'lg_webos',
    deviceIdentifier: 'lg_webos_c3_demo',
    lastConnected: new Date().toISOString(),
    isFavorite: true,
    status: 'CONNECTED',
    signalStrength: 95,
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP', 'REWIND', 'FAST_FORWARD',
      'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME', 'APP_DISNEY', 'APP_SPOTIFY', 'APP_BROWSER', 'TEXT_INPUT'
    ],
    supportedFeatures: {
      touchpad: true,
      keyboard: true,
      appLauncher: true,
      pinPairing: true,
      bluetoothControl: true,
    },
  },
  {
    id: 'demo_bedroom',
    name: 'TV do Quarto (Demo)',
    manufacturer: 'Samsung',
    model: 'Crystal UHD 50"',
    ipAddress: '192.168.1.112',
    macAddress: 'DD:EE:FF:44:55:66',
    connectionType: 'wifi',
    protocol: 'samsung_tizen',
    deviceIdentifier: 'samsung_tizen_50_demo',
    lastConnected: new Date(Date.now() - 86400000).toISOString(),
    isFavorite: false,
    status: 'DISCONNECTED',
    signalStrength: 80,
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP', 'REWIND', 'FAST_FORWARD',
      'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME', 'APP_SPOTIFY', 'APP_BROWSER'
    ],
    supportedFeatures: {
      touchpad: true,
      keyboard: true,
      appLauncher: true,
      pinPairing: true,
      bluetoothControl: true,
    },
  },
  {
    id: 'demo_tcl_office',
    name: 'TV do Escritório',
    manufacturer: 'TCL',
    model: 'Google TV 43"',
    ipAddress: '192.168.1.120',
    connectionType: 'wifi',
    protocol: 'tcl_android',
    deviceIdentifier: 'tcl_gtv_demo',
    lastConnected: new Date(Date.now() - 360000000).toISOString(),
    isFavorite: true,
    status: 'DISCONNECTED',
    signalStrength: 70,
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP', 'REWIND', 'FAST_FORWARD',
      'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME', 'TEXT_INPUT'
    ],
    supportedFeatures: {
      touchpad: true,
      keyboard: true,
      appLauncher: true,
      pinPairing: true,
      bluetoothControl: true,
    },
  }
];

export function getSavedTVs(): TVDevice[] {
  if (typeof window === 'undefined') return SAMPLE_SAVED_TVS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_TVS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SAVED_TVS, JSON.stringify(SAMPLE_SAVED_TVS));
      return SAMPLE_SAVED_TVS;
    }
    return JSON.parse(data);
  } catch {
    return SAMPLE_SAVED_TVS;
  }
}

export function saveTVs(tvs: TVDevice[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_TVS, JSON.stringify(tvs));
  } catch (err) {
    console.error('Failed to save TVs to localStorage', err);
  }
}

export function getActiveTVId(): string | null {
  if (typeof window === 'undefined') return 'demo_living_room';
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_TV_ID) || 'demo_living_room';
  } catch {
    return 'demo_living_room';
  }
}

export function setActiveTVId(id: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TV_ID, id);
  } catch (err) {
    console.error('Failed to set active TV ID', err);
  }
}

export function getAppSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAppSettings(settings: AppSettings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings', err);
  }
}

export function getSystemLogs(): SystemLog[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOGS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addSystemLog(type: SystemLog['type'], message: string, details?: string) {
  const newLog: SystemLog = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toLocaleTimeString('pt-BR'),
    type,
    message,
    details,
  };
  if (typeof window === 'undefined') return;
  try {
    const logs = getSystemLogs();
    const updated = [newLog, ...logs].slice(0, 50); // Keep last 50 logs
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to add system log', err);
  }
}

export function isOnboardingCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED) === 'true';
}

export function setOnboardingCompleted(completed = true) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed ? 'true' : 'false');
}
