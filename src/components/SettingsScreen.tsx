import React from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Vibrate,
  RefreshCw,
  Search,
  ShieldCheck,
  Tv,
  X,
  Check
} from 'lucide-react';
import { AppSettings } from '../types/tv';

interface SettingsScreenProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onClose: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const handleToggle = (key: keyof AppSettings) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleThemeChange = (theme: 'dark' | 'light' | 'system') => {
    onUpdateSettings({
      ...settings,
      theme,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold mb-3">
            <SettingsIcon className="w-3.5 h-3.5" /> Preferências do App
          </div>
          <h2 className="text-xl font-bold text-white">Configurações</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Ajuste a aparência e o comportamento do controle remoto universal.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4 my-4 text-xs">
          {/* Theme Selector */}
          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl space-y-2">
            <p className="font-bold text-zinc-200 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" /> Tema de Cores
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              {(['dark', 'light', 'system'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => handleThemeChange(t)}
                  className={`py-2 px-3 rounded-xl font-semibold capitalize transition flex items-center justify-center gap-1.5 border ${
                    settings.theme === t
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  {t === 'dark' ? 'Escuro' : t === 'light' ? 'Claro' : 'Sistema'}
                  {settings.theme === t && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Vibration Feedback Toggle */}
          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Vibrate className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-bold text-zinc-200">Vibração ao Tocar (Haptics)</p>
                <p className="text-[11px] text-zinc-500">Feedback tátil suave ao pressionar os botões</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('vibration')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.vibration ? 'bg-emerald-500' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  settings.vibration ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Auto Reconnect Toggle */}
          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-teal-400" />
              <div>
                <p className="font-bold text-zinc-200">Reconexão Automática</p>
                <p className="text-[11px] text-zinc-500">Reconecta à última TV utilizada ao abrir o app</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('autoReconnect')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.autoReconnect ? 'bg-emerald-500' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  settings.autoReconnect ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Auto Discover Toggle */}
          <div className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="font-bold text-zinc-200">Busca Automática de TVs</p>
                <p className="text-[11px] text-zinc-500">Procura dispositivos na rede ao iniciar</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('autoDiscover')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.autoDiscover ? 'bg-emerald-500' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  settings.autoDiscover ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Demo Mode Toggle */}
          <div className="bg-zinc-950/80 border border-amber-800/40 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tv className="w-5 h-5 text-amber-400" />
              <div>
                <p className="font-bold text-amber-300">Modo Demonstração</p>
                <p className="text-[11px] text-amber-200/80">
                  Simula uma TV ativa sem necessitar de um aparelho físico
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('demoMode')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings.demoMode ? 'bg-amber-500' : 'bg-zinc-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                  settings.demoMode ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Privacy & Version footer */}
        <div className="pt-4 border-t border-zinc-800 text-center text-[11px] text-zinc-500 space-y-1">
          <p className="flex items-center justify-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Nenhum dado de navegação ou senha de Wi-Fi é armazenado.
          </p>
          <p>Controle Universal TV — Versão 1.0.0 (Build 2026)</p>
        </div>
      </div>
    </div>
  );
};
