import React from 'react';
import {
  Tv,
  Globe,
  Settings,
  Search,
  ExternalLink,
  Film,
  Music,
  Play
} from 'lucide-react';
import { TVCommand } from '../../types/tv';

interface SmartRemoteViewProps {
  onSendCommand: (command: TVCommand, value?: string) => void;
  disabled?: boolean;
}

export const SmartRemoteView: React.FC<SmartRemoteViewProps> = ({ onSendCommand, disabled }) => {
  const apps = [
    {
      id: 'APP_NETFLIX',
      name: 'Netflix',
      color: 'from-red-600 to-rose-700',
      textColor: 'text-white',
      cmd: 'APP_NETFLIX' as TVCommand,
      badge: 'Filmes & Séries',
    },
    {
      id: 'APP_YOUTUBE',
      name: 'YouTube',
      color: 'from-red-500 to-red-600',
      textColor: 'text-white',
      cmd: 'APP_YOUTUBE' as TVCommand,
      badge: 'Vídeos',
    },
    {
      id: 'APP_PRIME',
      name: 'Prime Video',
      color: 'from-sky-600 to-blue-700',
      textColor: 'text-white',
      cmd: 'APP_PRIME' as TVCommand,
      badge: 'Amazon Prime',
    },
    {
      id: 'APP_DISNEY',
      name: 'Disney+',
      color: 'from-blue-700 to-indigo-900',
      textColor: 'text-white',
      cmd: 'APP_DISNEY' as TVCommand,
      badge: 'Disney & Marvel',
    },
    {
      id: 'APP_SPOTIFY',
      name: 'Spotify',
      color: 'from-emerald-500 to-green-600',
      textColor: 'text-zinc-950',
      cmd: 'APP_SPOTIFY' as TVCommand,
      badge: 'Músicas',
    },
    {
      id: 'APP_BROWSER',
      name: 'Navegador Web',
      color: 'from-zinc-700 to-zinc-800',
      textColor: 'text-zinc-100',
      cmd: 'APP_BROWSER' as TVCommand,
      badge: 'Internet',
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col space-y-5">
      {/* Smart Hub Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-zinc-900 border border-emerald-800/40 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Tv className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Smart Hub — Lançador de Apps</h3>
            <p className="text-xs text-zinc-400">Abra seus aplicativos favoritos diretamente na TV</p>
          </div>
        </div>
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-2 gap-3">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onSendCommand(app.cmd)}
            disabled={disabled}
            className={`p-4 rounded-3xl bg-gradient-to-br ${app.color} shadow-lg hover:brightness-110 active:scale-95 transition text-left flex flex-col justify-between h-28 relative overflow-hidden group border border-white/10`}
          >
            <div className="flex items-center justify-between w-full">
              <span className={`text-xs font-semibold ${app.textColor} opacity-90`}>
                {app.badge}
              </span>
              <ExternalLink className={`w-4 h-4 ${app.textColor} opacity-60 group-hover:opacity-100 transition`} />
            </div>

            <div>
              <h4 className={`text-lg font-black ${app.textColor} tracking-tight`}>
                {app.name}
              </h4>
              <p className={`text-[10px] ${app.textColor} opacity-80 mt-0.5 flex items-center gap-1`}>
                <Play className="w-2.5 h-2.5 fill-current" /> Abrir no televisor
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Quick Settings & Search Shortcuts */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 shadow-lg space-y-3">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
          Configurações Rápidas da TV
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSendCommand('MENU')}
            disabled={disabled}
            className="p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-2.5 text-xs font-medium border border-zinc-700/60"
          >
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>Configurações</span>
          </button>

          <button
            onClick={() => onSendCommand('HOME')}
            disabled={disabled}
            className="p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition flex items-center gap-2.5 text-xs font-medium border border-zinc-700/60"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Buscar na TV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
