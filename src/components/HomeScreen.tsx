import React from 'react';
import {
  Tv,
  Search,
  PlusCircle,
  Wifi,
  ChevronRight,
  Sparkles,
  MousePointer,
  Activity,
  Star,
  CheckCircle2
} from 'lucide-react';
import { TVDevice } from '../types/tv';

interface HomeScreenProps {
  savedTVs: TVDevice[];
  activeTV: TVDevice | null;
  onSelectTV: (tv: TVDevice) => void;
  onOpenDiscovery: () => void;
  onOpenMyTVs: () => void;
  onOpenDiagnostics: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  savedTVs,
  activeTV,
  onSelectTV,
  onOpenDiscovery,
  onOpenMyTVs,
  onOpenDiagnostics,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-zinc-900 to-zinc-950 border border-emerald-800/40 p-6 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
            <Wifi className="w-3.5 h-3.5" /> Controle por Wi-Fi & Bluetooth
          </div>

          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Controle sua TV pelo celular
            </h2>
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed max-w-md">
              Conecte-se instantaneamente a televisores LG, Samsung, TCL, Sony, Panasonic, Roku, Toshiba e SEMP na sua rede local.
            </p>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenDiscovery}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold py-3.5 px-6 rounded-2xl shadow-xl shadow-emerald-950/80 transition flex items-center justify-center gap-2 text-sm group"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition stroke-[2.5]" />
            <span>Encontrar minha TV</span>
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Saved TVs Section ("Minhas TVs") */}
      <div className="bg-zinc-900 border border-zinc-800/90 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Minhas TVs</h3>
          </div>
          <button
            onClick={onOpenMyTVs}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"
          >
            <span>Gerenciar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of Saved TVs */}
        <div className="space-y-2.5">
          {savedTVs.map((tv) => {
            const isActive = activeTV?.id === tv.id;
            return (
              <div
                key={tv.id}
                onClick={() => onSelectTV(tv)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between group shadow-md ${
                  isActive
                    ? 'bg-emerald-950/50 border-emerald-500/80'
                    : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-2xl border ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}
                  >
                    <Tv className="w-6 h-6 stroke-[2]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition">
                        {tv.name}
                      </h4>
                      {tv.isFavorite && (
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                      {tv.manufacturer} {tv.model} • {tv.ipAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold flex items-center gap-1 px-2.5 py-1 rounded-full border ${
                      isActive
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'
                      }`}
                    />
                    {isActive ? 'Conectada' : 'Desconectada'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Tools Bar */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenDiagnostics}
          className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition text-left space-y-2 group shadow-lg"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white group-hover:text-emerald-300">
              Diagnóstico de Conexão
            </h4>
            <p className="text-[10px] text-zinc-400 mt-0.5">Testar ping e velocidade de rede</p>
          </div>
        </button>

        <button
          onClick={onOpenDiscovery}
          className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition text-left space-y-2 group shadow-lg"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white group-hover:text-emerald-300">
              Cadastrar Nova TV
            </h4>
            <p className="text-[10px] text-zinc-400 mt-0.5">Buscar automaticamente na rede</p>
          </div>
        </button>
      </div>
    </div>
  );
};
