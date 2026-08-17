import React, { useState, useEffect } from 'react';
import {
  TVDevice,
  TVCommand,
  AppSettings,
  SystemLog
} from './types/tv';
import {
  getSavedTVs,
  saveTVs,
  getActiveTVId,
  setActiveTVId,
  getAppSettings,
  saveAppSettings,
  getSystemLogs,
  addSystemLog,
  isOnboardingCompleted,
  setOnboardingCompleted
} from './utils/storage';
import { triggerHaptic } from './utils/haptics';
import { playClickSound } from './utils/audio';
import { TVAdapterFactory } from './tv/adapters/TVAdapterFactory';
import { HeaderNav } from './components/HeaderNav';
import { HomeScreen } from './components/HomeScreen';
import { RemoteControlContainer } from './components/RemoteControlContainer';
import { VirtualTVTarget } from './components/VirtualTVTarget';
import { TVDiscoveryScreen } from './components/TVDiscoveryScreen';
import { PairingModal } from './components/PairingModal';
import { MyTVsScreen } from './components/MyTVsScreen';
import { DiagnosticsScreen } from './components/DiagnosticsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { AboutModal } from './components/AboutModal';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Tv, Home, Smartphone, RefreshCw } from 'lucide-react';

export default function App() {
  const [savedTVs, setSavedTVs] = useState<TVDevice[]>([]);
  const [activeTV, setActiveTV] = useState<TVDevice | null>(null);
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());
  const [logs, setLogs] = useState<SystemLog[]>([]);

  // Navigation & Modal States
  const [viewMode, setViewMode] = useState<'home' | 'remote'>('remote');
  const [showOnboarding, setShowOnboarding] = useState(!isOnboardingCompleted());
  const [showDiscovery, setShowDiscovery] = useState(false);
  const [pairingDevice, setPairingDevice] = useState<TVDevice | null>(null);
  const [showMyTVs, setShowMyTVs] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const [lastCommandFeedback, setLastCommandFeedback] = useState<{
    message: string;
    latencyMs: number;
  } | null>(null);

  // Initialize data on mount
  useEffect(() => {
    const loadedTVs = getSavedTVs();
    setSavedTVs(loadedTVs);

    const activeId = getActiveTVId();
    const found = loadedTVs.find((t) => t.id === activeId) || loadedTVs[0] || null;
    if (found) {
      setActiveTV({ ...found, status: 'CONNECTED' });
    }

    setLogs(getSystemLogs());
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  // Handle Selecting a TV Device
  const handleSelectTV = (tv: TVDevice) => {
    const updated = { ...tv, status: 'CONNECTED' as const, lastConnected: new Date().toISOString() };
    setActiveTV(updated);
    setActiveTVId(tv.id);

    // Save to storage
    const updatedList = savedTVs.map((item) => (item.id === tv.id ? updated : item));
    setSavedTVs(updatedList);
    saveTVs(updatedList);

    addSystemLog('CONNECTION_SUCCESS', `Conectado à TV: ${tv.name} (${tv.ipAddress})`);
    setLogs(getSystemLogs());
  };

  // Handle Pairing Popup Trigger
  const handleStartPairing = (tv: TVDevice) => {
    setShowDiscovery(false);
    if (tv.pinRequired || tv.protocol === 'lg_webos' || tv.protocol === 'samsung_tizen' || tv.protocol === 'tcl_android') {
      setPairingDevice(tv);
    } else {
      // Connect directly without PIN
      handleSelectTV(tv);
    }
  };

  // Handle PIN Confirmation
  const handleConfirmPairing = async (pin: string): Promise<boolean> => {
    if (!pairingDevice) return false;

    const adapter = TVAdapterFactory.getAdapter(pairingDevice.protocol, pairingDevice.manufacturer);
    await adapter.connect(pairingDevice);

    const success = await adapter.pairWithPin(pin);
    if (success) {
      // Save device if new
      const exists = savedTVs.some((t) => t.id === pairingDevice.id);
      const newTVList = exists
        ? savedTVs.map((t) => (t.id === pairingDevice.id ? { ...pairingDevice, status: 'CONNECTED' as const } : t))
        : [{ ...pairingDevice, status: 'CONNECTED' as const }, ...savedTVs];

      setSavedTVs(newTVList);
      saveTVs(newTVList);
      handleSelectTV(pairingDevice);
      setPairingDevice(null);
      return true;
    }
    return false;
  };

  // Handle Command Sending Strategy
  const handleSendCommand = async (command: TVCommand, value?: string) => {
    if (settings.vibration) triggerHaptic(25);
    playClickSound(true);

    if (!activeTV) {
      setShowDiscovery(true);
      return;
    }

    const adapter = TVAdapterFactory.getAdapter(activeTV.protocol, activeTV.manufacturer);
    await adapter.connect(activeTV);

    const result = await adapter.sendCommand(command, value);

    setLastCommandFeedback({
      message: result.message,
      latencyMs: result.latencyMs,
    });

    addSystemLog('COMMAND_SENT', `Comando [${command}] enviado para ${activeTV.name}`, `Resposta: ${result.message}`);
    setLogs(getSystemLogs());

    // Auto clear feedback toast
    setTimeout(() => {
      setLastCommandFeedback(null);
    }, 2500);
  };

  // Update Saved TV Settings
  const handleUpdateTV = (updatedTV: TVDevice) => {
    const updatedList = savedTVs.map((t) => (t.id === updatedTV.id ? updatedTV : t));
    setSavedTVs(updatedList);
    saveTVs(updatedList);
    if (activeTV?.id === updatedTV.id) {
      setActiveTV(updatedTV);
    }
  };

  // Delete TV Device
  const handleDeleteTV = (id: string) => {
    const filtered = savedTVs.filter((t) => t.id !== id);
    setSavedTVs(filtered);
    saveTVs(filtered);
    if (activeTV?.id === id) {
      setActiveTV(filtered[0] || null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-zinc-950 pb-20">
      {/* Top Header Navigation */}
      <HeaderNav
        activeTV={activeTV}
        savedTVs={savedTVs}
        onSelectTV={handleSelectTV}
        onOpenDiscovery={() => setShowDiscovery(true)}
        onOpenMyTVs={() => setShowMyTVs(true)}
        onOpenDiagnostics={() => setShowDiagnostics(true)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenAbout={() => setShowAbout(true)}
        currentTheme={settings.theme}
        onToggleTheme={() => {
          const next = settings.theme === 'dark' ? 'light' : 'dark';
          const newSettings = { ...settings, theme: next as 'dark' | 'light' };
          setSettings(newSettings);
          saveAppSettings(newSettings);
        }}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Interactive Virtual TV Screen Simulator */}
        <VirtualTVTarget device={activeTV} />

        {/* View Switcher Bar (Início vs Controle) */}
        <div className="flex items-center justify-center gap-2 max-w-xs mx-auto bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 shadow-lg">
          <button
            onClick={() => setViewMode('remote')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              viewMode === 'remote'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tv className="w-4 h-4" /> Controle Remoto
          </button>
          <button
            onClick={() => setViewMode('home')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              viewMode === 'home'
                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" /> Início / Dashboard
          </button>
        </div>

        {/* Primary View Mode */}
        {viewMode === 'remote' ? (
          <RemoteControlContainer
            device={activeTV}
            onSendCommand={handleSendCommand}
            onReconnect={() => {
              if (activeTV) handleSelectTV(activeTV);
            }}
            lastCommandFeedback={lastCommandFeedback}
          />
        ) : (
          <HomeScreen
            savedTVs={savedTVs}
            activeTV={activeTV}
            onSelectTV={(tv) => {
              handleSelectTV(tv);
              setViewMode('remote');
            }}
            onOpenDiscovery={() => setShowDiscovery(true)}
            onOpenMyTVs={() => setShowMyTVs(true)}
            onOpenDiagnostics={() => setShowDiagnostics(true)}
          />
        )}
      </main>

      {/* Modals & Dialog Views */}
      {showOnboarding && (
        <OnboardingFlow
          onComplete={() => {
            setShowOnboarding(false);
            setOnboardingCompleted(true);
            setShowDiscovery(true);
          }}
        />
      )}

      {showDiscovery && (
        <TVDiscoveryScreen
          onSelectTVToPair={handleStartPairing}
          onClose={() => setShowDiscovery(false)}
        />
      )}

      {pairingDevice && (
        <PairingModal
          device={pairingDevice}
          onConfirmPairing={handleConfirmPairing}
          onClose={() => setPairingDevice(null)}
        />
      )}

      {showMyTVs && (
        <MyTVsScreen
          savedTVs={savedTVs}
          activeTV={activeTV}
          onSelectTV={handleSelectTV}
          onUpdateTV={handleUpdateTV}
          onDeleteTV={handleDeleteTV}
          onOpenDiscovery={() => setShowDiscovery(true)}
          onClose={() => setShowMyTVs(false)}
        />
      )}

      {showDiagnostics && (
        <DiagnosticsScreen
          activeTV={activeTV}
          logs={logs}
          onClose={() => setShowDiagnostics(false)}
        />
      )}

      {showSettings && (
        <SettingsScreen
          settings={settings}
          onUpdateSettings={(newSettings) => {
            setSettings(newSettings);
            saveAppSettings(newSettings);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}
