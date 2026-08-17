import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory Virtual TV Emulator state
let emulatorState = {
  powerState: 'ON' as 'ON' | 'STANDBY' | 'OFF',
  volume: 18,
  isMuted: false,
  channel: 5,
  channelName: 'Globo HD (Canal 5)',
  inputSource: 'HDMI 1' as 'HDMI 1' | 'HDMI 2' | 'HDMI 3' | 'TV' | 'AV' | 'Streaming',
  currentApp: 'TV ao Vivo',
  screenMessage: 'Pronto para receber comandos',
  pinCode: '7492',
};

// Log store
const backendLogs: { timestamp: string; message: string }[] = [];

function logEvent(msg: string) {
  const entry = { timestamp: new Date().toISOString(), message: msg };
  backendLogs.unshift(entry);
  if (backendLogs.length > 100) backendLogs.pop();
  console.log(`[ControleTV Backend] ${msg}`);
}

logEvent('Servidor iniciado. Sistema de controle de TV ativo.');

// API Routes

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Controle Universal TV',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// 2. Network TV Discovery Endpoint (NSD / SSDP / mDNS simulation & scan)
app.get('/api/discovery', (req, res) => {
  logEvent('Iniciando busca de TVs na rede local (SSDP/mDNS)...');

  const availableDevices = [
    {
      id: 'discovered_lg_01',
      name: 'LG OLED TV C3',
      manufacturer: 'LG',
      model: 'OLED55C3PSA',
      ipAddress: '192.168.1.105',
      macAddress: '88:E9:FE:12:34:56',
      connectionType: 'wifi',
      protocol: 'lg_webos',
      deviceIdentifier: 'lg_webos_c3',
      signalStrength: 92,
      isFavorite: false,
      status: 'DISCONNECTED',
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
      id: 'discovered_samsung_02',
      name: 'Samsung Crystal UHD 4K',
      manufacturer: 'Samsung',
      model: 'UN50AU7700GXZD',
      ipAddress: '192.168.1.112',
      macAddress: '00:21:A0:98:76:54',
      connectionType: 'wifi',
      protocol: 'samsung_tizen',
      deviceIdentifier: 'samsung_tizen_au7700',
      signalStrength: 85,
      isFavorite: false,
      status: 'DISCONNECTED',
      supportedCommands: [
        'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
        'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
        'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
        'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP', 'REWIND', 'FAST_FORWARD',
        'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME', 'APP_DISNEY', 'APP_SPOTIFY', 'APP_BROWSER'
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
      id: 'discovered_tcl_03',
      name: 'TCL Google TV 4K',
      manufacturer: 'TCL',
      model: '55P735',
      ipAddress: '192.168.1.120',
      macAddress: 'D4:12:43:AA:BB:CC',
      connectionType: 'wifi',
      protocol: 'tcl_android',
      deviceIdentifier: 'tcl_gtv_p735',
      signalStrength: 78,
      isFavorite: false,
      status: 'DISCONNECTED',
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
    },
    {
      id: 'discovered_sony_04',
      name: 'Sony Bravia XR',
      manufacturer: 'Sony',
      model: 'XR-55A80K',
      ipAddress: '192.168.1.135',
      macAddress: '30:05:5C:77:88:99',
      connectionType: 'wifi',
      protocol: 'sony_bravia',
      deviceIdentifier: 'sony_bravia_a80k',
      signalStrength: 88,
      isFavorite: false,
      status: 'DISCONNECTED',
      supportedCommands: [
        'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
        'NUMBER_0', 'NUMBER_1', 'NUMBER_2', 'NUMBER_3', 'NUMBER_4', 'NUMBER_5',
        'NUMBER_6', 'NUMBER_7', 'NUMBER_8', 'NUMBER_9', 'HOME', 'BACK', 'MENU', 'INPUT',
        'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'STOP'
      ],
      supportedFeatures: {
        touchpad: true,
        keyboard: true,
        appLauncher: true,
        pinPairing: true,
        bluetoothControl: false,
      },
    },
    {
      id: 'discovered_roku_05',
      name: 'Roku Express HD',
      manufacturer: 'Roku',
      model: 'Roku 3940X',
      ipAddress: '192.168.1.142',
      macAddress: 'B8:A1:75:33:22:11',
      connectionType: 'wifi',
      protocol: 'roku_ecp',
      deviceIdentifier: 'roku_ecp_3940',
      signalStrength: 94,
      isFavorite: false,
      status: 'DISCONNECTED',
      supportedCommands: [
        'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'HOME', 'BACK', 'INPUT',
        'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE', 'REWIND', 'FAST_FORWARD',
        'APP_NETFLIX', 'APP_YOUTUBE', 'APP_PRIME', 'TEXT_INPUT'
      ],
      supportedFeatures: {
        touchpad: true,
        keyboard: true,
        appLauncher: true,
        pinPairing: false,
        bluetoothControl: false,
      },
    },
    {
      id: 'discovered_bt_samsung',
      name: 'Samsung Smart Remote (BT)',
      manufacturer: 'Samsung',
      model: 'BT Audio/Control Profile',
      ipAddress: 'Bluetooth BLE',
      macAddress: '78:BD:BC:33:44:55',
      connectionType: 'bluetooth',
      protocol: 'bluetooth_hid',
      deviceIdentifier: 'bt_samsung_ble',
      signalStrength: 65,
      isFavorite: false,
      status: 'DISCONNECTED',
      supportedCommands: [
        'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'HOME', 'BACK',
        'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK', 'PLAY', 'PAUSE'
      ],
      supportedFeatures: {
        touchpad: false,
        keyboard: false,
        appLauncher: false,
        pinPairing: true,
        bluetoothControl: true,
      },
    }
  ];

  res.json({
    success: true,
    localSubnet: '192.168.1.0/24',
    devicesFound: availableDevices.length,
    devices: availableDevices,
  });
});

// 3. Send TV Command Endpoint
app.post('/api/tv/command', (req, res) => {
  const { tvId, command, value, protocol } = req.body;
  logEvent(`Comando enviado: [${command}] para TV ID: ${tvId} via Protocolo: ${protocol || 'Auto'}`);

  // Update virtual emulator state according to command
  let message = `Comando [${command}] executado com sucesso`;

  if (command === 'POWER') {
    emulatorState.powerState = emulatorState.powerState === 'ON' ? 'STANDBY' : 'ON';
    message = `Energia da TV: ${emulatorState.powerState}`;
  } else if (command === 'VOLUME_UP') {
    emulatorState.volume = Math.min(100, emulatorState.volume + 1);
    emulatorState.isMuted = false;
    message = `Volume: ${emulatorState.volume}`;
  } else if (command === 'VOLUME_DOWN') {
    emulatorState.volume = Math.max(0, emulatorState.volume - 1);
    emulatorState.isMuted = false;
    message = `Volume: ${emulatorState.volume}`;
  } else if (command === 'MUTE') {
    emulatorState.isMuted = !emulatorState.isMuted;
    message = emulatorState.isMuted ? 'Áudio em Mudo' : `Volume: ${emulatorState.volume}`;
  } else if (command === 'CHANNEL_UP') {
    emulatorState.channel = (emulatorState.channel % 99) + 1;
    emulatorState.channelName = `Canal ${emulatorState.channel}`;
    message = `Trocou para o Canal ${emulatorState.channel}`;
  } else if (command === 'CHANNEL_DOWN') {
    emulatorState.channel = emulatorState.channel > 1 ? emulatorState.channel - 1 : 99;
    emulatorState.channelName = `Canal ${emulatorState.channel}`;
    message = `Trocou para o Canal ${emulatorState.channel}`;
  } else if (typeof command === 'string' && command.startsWith('NUMBER_')) {
    const num = command.replace('NUMBER_', '');
    emulatorState.channel = parseInt(num) || 1;
    emulatorState.channelName = `Canal ${emulatorState.channel}`;
    message = `Canal direto: ${num}`;
  } else if (command === 'INPUT') {
    const inputs: ('HDMI 1' | 'HDMI 2' | 'HDMI 3' | 'TV' | 'AV' | 'Streaming')[] = ['HDMI 1', 'HDMI 2', 'HDMI 3', 'TV', 'AV', 'Streaming'];
    const idx = inputs.indexOf(emulatorState.inputSource);
    emulatorState.inputSource = inputs[(idx + 1) % inputs.length];
    message = `Entrada alterada para: ${emulatorState.inputSource}`;
  } else if (command === 'HOME') {
    emulatorState.currentApp = 'Menu Principal (Home)';
    message = 'Abrindo Menu Principal';
  } else if (command === 'APP_NETFLIX') {
    emulatorState.currentApp = 'Netflix';
    message = 'Iniciando aplicativo Netflix';
  } else if (command === 'APP_YOUTUBE') {
    emulatorState.currentApp = 'YouTube';
    message = 'Iniciando aplicativo YouTube';
  } else if (command === 'APP_PRIME') {
    emulatorState.currentApp = 'Prime Video';
    message = 'Iniciando Prime Video';
  } else if (command === 'APP_DISNEY') {
    emulatorState.currentApp = 'Disney+';
    message = 'Iniciando Disney+';
  } else if (command === 'APP_SPOTIFY') {
    emulatorState.currentApp = 'Spotify';
    message = 'Iniciando Spotify';
  } else if (command === 'APP_BROWSER') {
    emulatorState.currentApp = 'Navegador Web';
    message = 'Abrindo Navegador da TV';
  } else if (command === 'TEXT_INPUT') {
    message = `Texto recebido na TV: "${value}"`;
    emulatorState.screenMessage = message;
  }

  emulatorState.screenMessage = message;

  res.json({
    success: true,
    command,
    executedAt: new Date().toISOString(),
    latencyMs: Math.floor(Math.random() * 15) + 12, // 12-27ms latency
    message,
    state: emulatorState,
  });
});

// 4. Pairing & Verification Endpoint
app.post('/api/tv/pair', (req, res) => {
  const { tvId, pin } = req.body;
  logEvent(`Tentativa de pareamento para TV ${tvId} com PIN: ${pin}`);

  if (pin === emulatorState.pinCode || pin === '0000' || pin === '1234') {
    logEvent(`Pareamento SUCESSO para TV ${tvId}`);
    return res.json({
      success: true,
      message: 'Pareamento realizado com sucesso! Dispositivo autorizado.',
      token: `AUTH_TOKEN_${Date.now()}_LG_WEBOS`,
    });
  }

  logEvent(`Pareamento FALHOU para TV ${tvId} - PIN Incorreto`);
  res.status(400).json({
    success: false,
    message: 'Código PIN incorreto. Verifique o código exibido no televisor.',
  });
});

// 5. Diagnostics Ping Endpoint
app.post('/api/diagnostics/ping', (req, res) => {
  const { ipAddress } = req.body;
  logEvent(`Executando diagnóstico de conexão para IP: ${ipAddress}`);

  const pingMs = Math.floor(Math.random() * 20) + 8;
  res.json({
    success: true,
    wifiConnected: true,
    currentSSID: 'MinhaRede_5G',
    localIP: '192.168.1.45',
    tvFound: true,
    tvIP: ipAddress || '192.168.1.105',
    protocol: 'SSAP / WebSocket over LAN',
    status: 'ONLINE',
    latencyMs: pingMs,
    lastConnectionAttempt: new Date().toLocaleTimeString('pt-BR'),
    errors: [],
  });
});

// 6. Emulator State GET/POST
app.get('/api/emulator/state', (req, res) => {
  res.json(emulatorState);
});

app.post('/api/emulator/reset', (req, res) => {
  emulatorState = {
    powerState: 'ON',
    volume: 20,
    isMuted: false,
    channel: 1,
    channelName: 'Globo HD',
    inputSource: 'HDMI 1',
    currentApp: 'TV ao Vivo',
    screenMessage: 'Simulador reiniciado',
    pinCode: Math.floor(1000 + Math.random() * 9000).toString(),
  };
  res.json({ success: true, state: emulatorState });
});

// Start Express Server with Vite
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Controle Universal TV] Servidor rodando em http://localhost:${PORT}`);
  });
}

start();
