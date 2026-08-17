import React, { useEffect, useState } from 'react';
import {
  Tv,
  Volume2,
  VolumeX,
  Power,
  Wifi,
  Smartphone,
  CheckCircle2,
  Minimize2,
  Maximize2,
  RefreshCw
} from 'lucide-react';
import { TVDevice, TVState } from '../types/tv';

interface VirtualTVTargetProps {
  device: TVDevice | null;
  onStateUpdate?: (state: TVState) => void;
}

export const VirtualTVTarget: React.FC<VirtualTVTargetProps> = ({ device }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [tvState, setTvState] = useState<TVState>({
    powerState: 'ON',
    volume: 18,
    isMuted: false,
    channel: 5,
    channelName: 'Globo HD',
    inputSource: 'HDMI 1',
    currentApp: 'TV ao Vivo',
    screenMessage: 'Simulador Ativo — Pronto para Comandos',
    pinCode: '7492',
  });

  // Fetch emulator state periodically or on change
  const fetchState = async () => {
    try {
      const res = await fetch('/api/emulator/state');
      if (res.ok) {
        const data = await res.json();
        setTvState(data);
      }
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleResetEmulator = async () => {
    try {
      const res = await fetch('/api/emulator/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setTvState(data.state);
      }
    } catch {
      // Ignore
    }
  };

  const manufacturerName = device?.manufacturer || 'Smart TV';

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-40 bg-zinc-900/90 border border-emerald-500/40 text-emerald-400 px-3 py-2 rounded-full shadow-2xl flex items-center gap-2 hover:bg-zinc-800 transition text-xs font-mono"
        title="Expandir Tela da TV Virtual"
      >
        <Tv className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span>TV Simulada ({tvState.powerState})</span>
        <Maximize2 className="w-3.5 h-3.5 ml-1 text-zinc-400" />
      </button>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto my-4 bg-zinc-950/90 border border-zinc-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-800/60 text-xs">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${tvState.powerState === 'ON' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-red-500'}`} />
          <span className="font-semibold text-zinc-200">
            Tela da TV Simulada — {manufacturerName} {device?.model || ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetEmulator}
            className="text-zinc-400 hover:text-zinc-200 p-1 rounded transition"
            title="Reiniciar TV Simulada"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-zinc-400 hover:text-zinc-200 p-1 rounded transition"
            title="Minimizar"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Physical TV Display Frame */}
      <div className="relative aspect-video w-full bg-black rounded-lg border-4 border-zinc-800 shadow-inner overflow-hidden flex flex-col justify-between p-4 font-sans text-white">
        {/* Screen Content when ON */}
        {tvState.powerState === 'ON' ? (
          <>
            {/* Top Info Bar */}
            <div className="flex items-center justify-between text-xs text-zinc-300 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/10">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400 uppercase tracking-wide">
                  {tvState.inputSource}
                </span>
                <span className="text-zinc-500">•</span>
                <span>{tvState.currentApp}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-zinc-400 text-[10px]">192.168.1.105</span>
              </div>
            </div>

            {/* Middle Display Area */}
            <div className="my-auto text-center py-4 px-2">
              <div className="inline-block bg-zinc-900/90 border border-zinc-700/80 rounded-xl p-4 shadow-lg max-w-sm mx-auto">
                <p className="text-xs text-emerald-400 font-mono mb-1">PROGRAMAÇÃO ATIVA</p>
                <h4 className="text-lg font-bold text-white tracking-wide">
                  {tvState.channelName}
                </h4>
                {tvState.screenMessage && (
                  <p className="text-xs text-zinc-300 mt-2 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md inline-block">
                    {tvState.screenMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Overlay Info (Volume / Mute / PIN) */}
            <div className="flex items-end justify-between">
              {/* PIN Code Box */}
              <div className="bg-zinc-900/90 border border-amber-500/50 rounded-lg p-2 text-left">
                <p className="text-[10px] text-amber-400 font-medium uppercase">Código de Pareamento</p>
                <p className="text-base font-mono font-bold tracking-widest text-amber-300">
                  PIN: {tvState.pinCode}
                </p>
              </div>

              {/* Volume Indicator */}
              <div className="bg-black/80 backdrop-blur border border-zinc-700/80 px-3 py-1.5 rounded-lg flex items-center gap-2">
                {tvState.isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-semibold text-red-400">MUTO</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    <div className="w-20 bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-300"
                        style={{ width: `${tvState.volume}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{tvState.volume}</span>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Screen Content when OFF / STANDBY */
          <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600 space-y-2 py-8">
            <Power className="w-10 h-10 text-red-900/60" />
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
              TV em Modo de Espera (Standby)
            </p>
            <p className="text-[11px] text-zinc-600">Pressione LIGAR no controle para acordar o televisor</p>
          </div>
        )}
      </div>

      {/* TV Stand Base */}
      <div className="w-32 h-1.5 bg-zinc-800 mx-auto rounded-b-md shadow-md" />

      {/* Footer Info */}
      <div className="mt-2 text-center flex items-center justify-between text-[11px] text-zinc-400 px-1">
        <span className="flex items-center gap-1 text-emerald-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" /> Conexão Simulada em Tempo Real
        </span>
        <span className="text-zinc-500">Responde a todos os botões do controle</span>
      </div>
    </div>
  );
};
