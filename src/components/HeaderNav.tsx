import React, { useState } from 'react';
import {
  Tv,
  Wifi,
  ChevronDown,
  Moon,
  Sun,
  Activity,
  Settings as SettingsIcon,
  PlusCircle,
  Check,
  Smartphone,
  Info
} from 'lucide-react';
import { TVDevice } from '../types/tv';

interface HeaderNavProps {
  activeTV: TVDevice | null;
  savedTVs: TVDevice[];
  onSelectTV: (tv: TVDevice) => void;
  onOpenDiscovery: () => void;
  onOpenMyTVs: () => void;
  onOpenDiagnostics: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  currentTheme: 'dark' | 'light' | 'system';
  onToggleTheme: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTV,
  savedTVs,
  onSelectTV,
  onOpenDiscovery,
  onOpenMyTVs,
  onOpenDiagnostics,
  onOpenSettings,
  onOpenAbout,
  currentTheme,
  onToggleTheme,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-md px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <Tv className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-zinc-100 tracking-tight leading-none">
              Controle Universal <span className="text-emerald-400">TV</span>
            </h1>
            <p className="text-[11px] text-zinc-400 font-medium">Wi-Fi & Bluetooth Remote</p>
          </div>
        </div>

        {/* Active Device Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-xl transition text-left"
          >
            <div className="relative">
              <Tv className="w-4 h-4 text-emerald-400" />
              <span
                className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                  activeTV?.status === 'CONNECTED'
                    ? 'bg-emerald-500 animate-pulse'
                    : 'bg-zinc-600'
                }`}
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-zinc-200 line-clamp-1">
                {activeTV ? activeTV.name : 'Nenhuma TV'}
              </p>
              <p className="text-[10px] text-emerald-400 font-mono">
                {activeTV?.status === 'CONNECTED' ? '● Conectada' : '○ Desconectada'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 ml-1" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 text-xs">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-3 py-1.5">
                Minhas Smart TVs
              </p>
              <div className="space-y-1 my-1 max-h-48 overflow-y-auto">
                {savedTVs.map((tv) => (
                  <button
                    key={tv.id}
                    onClick={() => {
                      onSelectTV(tv);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition ${
                      activeTV?.id === tv.id
                        ? 'bg-emerald-950/60 border border-emerald-800/60 text-emerald-300'
                        : 'hover:bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{tv.name}</p>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        {tv.manufacturer} • {tv.ipAddress}
                      </p>
                    </div>
                    {activeTV?.id === tv.id && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-2 mt-1 space-y-1">
                <button
                  onClick={() => {
                    onOpenDiscovery();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-emerald-400 hover:bg-zinc-800 rounded-xl transition font-medium"
                >
                  <PlusCircle className="w-4 h-4" /> Encontrar Nova TV
                </button>
                <button
                  onClick={() => {
                    onOpenMyTVs();
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-zinc-300 hover:bg-zinc-800 rounded-xl transition"
                >
                  <Smartphone className="w-4 h-4 text-zinc-400" /> Gerenciar Minhas TVs
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenDiagnostics}
            className="p-2 rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900 transition"
            title="Diagnóstico de Conexão"
          >
            <Activity className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition"
            title="Configurações"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 transition"
            title="Alternar Tema"
          >
            {currentTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={onOpenAbout}
            className="p-2 rounded-xl text-zinc-400 hover:text-blue-400 hover:bg-zinc-900 transition"
            title="Compatibilidade e Sobre"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
