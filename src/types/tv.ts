export type TVManufacturer =
  | 'TCL'
  | 'LG'
  | 'Samsung'
  | 'SEMP'
  | 'Toshiba'
  | 'Sony'
  | 'Panasonic'
  | 'Roku'
  | 'AndroidTV'
  | 'GoogleTV'
  | 'FireTV'
  | 'Outra';

export type ConnectionType = 'wifi' | 'bluetooth' | 'demo';

export type TVProtocol =
  | 'lg_webos'
  | 'samsung_tizen'
  | 'tcl_android'
  | 'sony_bravia'
  | 'panasonic_viera'
  | 'roku_ecp'
  | 'semp_toshiba'
  | 'generic_http'
  | 'bluetooth_hid'
  | 'demo';

export type TVConnectionStatus =
  | 'CONNECTED'
  | 'CONNECTING'
  | 'DISCONNECTED'
  | 'RECONNECTING'
  | 'PAIRING'
  | 'ERROR'
  | 'UNSUPPORTED';

export type RemoteTab = 'basic' | 'numeric' | 'smart' | 'touchpad' | 'keyboard';

export type TVCommand =
  | 'POWER'
  | 'VOLUME_UP'
  | 'VOLUME_DOWN'
  | 'MUTE'
  | 'CHANNEL_UP'
  | 'CHANNEL_DOWN'
  | 'NUMBER_0'
  | 'NUMBER_1'
  | 'NUMBER_2'
  | 'NUMBER_3'
  | 'NUMBER_4'
  | 'NUMBER_5'
  | 'NUMBER_6'
  | 'NUMBER_7'
  | 'NUMBER_8'
  | 'NUMBER_9'
  | 'HOME'
  | 'BACK'
  | 'MENU'
  | 'INPUT'
  | 'UP'
  | 'DOWN'
  | 'LEFT'
  | 'RIGHT'
  | 'OK'
  | 'PLAY'
  | 'PAUSE'
  | 'STOP'
  | 'REWIND'
  | 'FAST_FORWARD'
  // Smart Apps
  | 'APP_NETFLIX'
  | 'APP_YOUTUBE'
  | 'APP_PRIME'
  | 'APP_DISNEY'
  | 'APP_SPOTIFY'
  | 'APP_BROWSER'
  | 'APP_SETTINGS'
  // Input
  | 'TEXT_INPUT';

export interface TVDevice {
  id: string;
  name: string;
  manufacturer: TVManufacturer;
  model: string;
  ipAddress: string;
  macAddress?: string;
  connectionType: ConnectionType;
  protocol: TVProtocol;
  deviceIdentifier: string;
  lastConnected?: string;
  isFavorite: boolean;
  pinRequired?: boolean;
  status: TVConnectionStatus;
  signalStrength?: number; // 0-100%
  supportedCommands: TVCommand[];
  supportedFeatures: {
    touchpad: boolean;
    keyboard: boolean;
    appLauncher: boolean;
    pinPairing: boolean;
    bluetoothControl: boolean;
  };
}

export interface TVState {
  powerState: 'ON' | 'STANDBY' | 'OFF';
  volume: number;
  isMuted: boolean;
  channel: number;
  channelName: string;
  inputSource: 'HDMI 1' | 'HDMI 2' | 'HDMI 3' | 'TV' | 'AV' | 'Streaming';
  currentApp?: string;
  screenMessage?: string;
  pinCode?: string;
}

export interface DiagnosticResult {
  wifiConnected: boolean;
  currentSSID: string;
  localIP: string;
  tvFound: boolean;
  tvIP: string;
  protocol: string;
  status: string;
  latencyMs: number;
  lastConnectionAttempt: string;
  errors: string[];
}

export interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  vibration: boolean;
  autoReconnect: boolean;
  autoDiscover: boolean;
  showTips: boolean;
  demoMode: boolean;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  type:
    | 'TV_DISCOVERY_STARTED'
    | 'TV_FOUND'
    | 'PAIRING_STARTED'
    | 'PAIRING_SUCCESS'
    | 'PAIRING_FAILED'
    | 'CONNECTION_STARTED'
    | 'CONNECTION_SUCCESS'
    | 'CONNECTION_FAILED'
    | 'COMMAND_SENT'
    | 'DISCONNECTED';
  message: string;
  details?: string;
}
