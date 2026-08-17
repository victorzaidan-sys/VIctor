import { TVManufacturer, TVProtocol, TVCommand } from '../types/tv';

export interface CompatibilityEntry {
  manufacturer: TVManufacturer;
  series: string;
  protocol: TVProtocol;
  connectionMethod: 'Wi-Fi' | 'Bluetooth' | 'Wi-Fi / Bluetooth';
  defaultPort: number;
  pairingType: 'PIN no Screen' | 'Confirm popup on TV' | 'Token / Key' | 'Nenhum';
  supportedCommands: TVCommand[];
  notes: string;
}

export const TV_COMPATIBILITY_DATABASE: CompatibilityEntry[] = [
  {
    manufacturer: 'LG',
    series: 'webOS (2014-2026 OLED/NanoCell/QNED/UHD)',
    protocol: 'lg_webos',
    connectionMethod: 'Wi-Fi',
    defaultPort: 3000,
    pairingType: 'PIN no Screen',
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP', 'REWIND', 'FAST_FORWARD',
      'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME', 'APP_DISNEY', 'APP_SPOTIFY', 'APP_BROWSER', 'TEXT_INPUT'
    ],
    notes: 'Suporta protocolo WebOS SSAP com WebSocket e pareamento via PIN exibido na tela.'
  },
  {
    manufacturer: 'Samsung',
    series: 'Tizen OS (2016-2026 QLED/Neo QLED/Crystal UHD)',
    protocol: 'samsung_tizen',
    connectionMethod: 'Wi-Fi / Bluetooth',
    defaultPort: 8001,
    pairingType: 'Confirm popup on TV',
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP', 'REWIND', 'FAST_FORWARD',
      'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME', 'APP_DISNEY', 'APP_SPOTIFY', 'APP_BROWSER'
    ],
    notes: 'Comunicação via WebSocket seguro (Porta 8002/8001) com chave de autorização no primeiro acesso.'
  },
  {
    manufacturer: 'TCL',
    series: 'Google TV / Android TV / Roku Edition',
    protocol: 'tcl_android',
    connectionMethod: 'Wi-Fi / Bluetooth',
    defaultPort: 6466,
    pairingType: 'PIN no Screen',
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP', 'REWIND', 'FAST_FORWARD',
      'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME', 'APP_DISNEY', 'APP_SPOTIFY', 'TEXT_INPUT'
    ],
    notes: 'Suporta protocolo Android TV v2 / Google TV Remote via rede local.'
  },
  {
    manufacturer: 'SEMP',
    series: 'Smart TV Android / Roku / Linux',
    protocol: 'semp_toshiba',
    connectionMethod: 'Wi-Fi',
    defaultPort: 8080,
    pairingType: 'Token / Key',
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP'
    ],
    notes: 'Compartilha os protocolos de rede com a Toshiba para Smart TVs conectadas.'
  },
  {
    manufacturer: 'Toshiba',
    series: 'VIDAA / Android TV / Smart TV',
    protocol: 'semp_toshiba',
    connectionMethod: 'Wi-Fi',
    defaultPort: 8080,
    pairingType: 'Nenhum',
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP'
    ],
    notes: 'Comandos REST e sockets de baixa latência.'
  },
  {
    manufacturer: 'Sony',
    series: 'Bravia Android / Google TV (2015-2026)',
    protocol: 'sony_bravia',
    connectionMethod: 'Wi-Fi',
    defaultPort: 80,
    pairingType: 'PIN no Screen',
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP', 'REWIND', 'FAST_FORWARD',
      'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME'
    ],
    notes: 'Utiliza API IRCC (Infrared Remote Control Code over HTTP) e JSON-RPC Bravia.'
  },
  {
    manufacturer: 'Panasonic',
    series: 'Viera Smart TV / My Home Screen',
    protocol: 'panasonic_viera',
    connectionMethod: 'Wi-Fi',
    defaultPort: 55000,
    pairingType: 'Nenhum',
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
      'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
      'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP'
    ],
    notes: 'Utiliza requisições SOAP HTTP na porta 55000 para controle remoto de funções.'
  },
  {
    manufacturer: 'Roku',
    series: 'Roku TV / Express / Premiere',
    protocol: 'roku_ecp',
    connectionMethod: 'Wi-Fi',
    defaultPort: 8060,
    pairingType: 'Nenhum',
    supportedCommands: [
      'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'HOME', 'BACK', 'INPUT',
      'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'REWIND', 'FAST_FORWARD',
      'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME', 'TEXT_INPUT'
    ],
    notes: 'Usa o protocolo oficial ECP (External Control Protocol) via requisições HTTP POST.'
  }
];
