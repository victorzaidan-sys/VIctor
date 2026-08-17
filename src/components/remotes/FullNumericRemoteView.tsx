import React from 'react';
import {
  Play,
  Pause,
  Square,
  Rewind,
  FastForward,
  Hash,
  Power,
  Volume2,
  Volume1,
  ChevronUp,
  ChevronDown,
  VolumeX,
  Home,
  ArrowLeft,
  Menu,
  Radio
} from 'lucide-react';
import { TVCommand } from '../../types/tv';

interface FullNumericRemoteViewProps {
  onSendCommand: (command: TVCommand, value?: string) => void;
  disabled?: boolean;
}

export const FullNumericRemoteView: React.FC<FullNumericRemoteViewProps> = ({
  onSendCommand,
  disabled,
}) => {
  const numbers: { num: number; cmd: TVCommand }[] = [
    { num: 1, cmd: 'NUMBER_1' },
    { num: 2, cmd: 'NUMBER_2' },
    { num: 3, cmd: 'NUMBER_3' },
    { num: 4, cmd: 'NUMBER_4' },
    { num: 5, cmd: 'NUMBER_5' },
    { num: 6, cmd: 'NUMBER_6' },
    { num: 7, cmd: 'NUMBER_7' },
    { num: 8, cmd: 'NUMBER_8' },
    { num: 9, cmd: 'NUMBER_9' },
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col space-y-5">
      {/* Media Playback Controls */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-3 shadow-lg">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2 text-center">
          Mídia & Reprodução
        </p>
        <div className="grid grid-cols-5 gap-2">
          <button
            onClick={() => onSendCommand('REWIND')}
            disabled={disabled}
            className="py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 text-zinc-200 transition flex items-center justify-center"
            title="Voltar"
          >
            <Rewind className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSendCommand('PLAY')}
            disabled={disabled}
            className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-zinc-950 transition flex items-center justify-center font-bold"
            title="Reproduzir"
          >
            <Play className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={() => onSendCommand('PAUSE')}
            disabled={disabled}
            className="py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-zinc-950 transition flex items-center justify-center font-bold"
            title="Pausar"
          >
            <Pause className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={() => onSendCommand('STOP')}
            disabled={disabled}
            className="py-2.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white transition flex items-center justify-center"
            title="Parar"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={() => onSendCommand('FAST_FORWARD')}
            disabled={disabled}
            className="py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 text-zinc-200 transition flex items-center justify-center"
            title="Avançar"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Numeric 0-9 Keypad */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-zinc-300 flex items-center gap-1">
            <Hash className="w-3.5 h-3.5 text-emerald-400" /> Teclado Numérico
          </span>
          <span className="text-[10px] text-zinc-500">Seleção de Canais</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {numbers.map(({ num, cmd }) => (
            <button
              key={num}
              onClick={() => onSendCommand(cmd)}
              disabled={disabled}
              className="py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 active:text-white text-zinc-100 font-bold text-lg transition shadow active:scale-95 border border-zinc-700/50"
            >
              {num}
            </button>
          ))}

          {/* Bottom row: Input, 0, Mute */}
          <button
            onClick={() => onSendCommand('INPUT')}
            disabled={disabled}
            className="py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 text-zinc-300 font-semibold text-xs transition border border-zinc-700/50"
          >
            ENTRADA
          </button>
          <button
            onClick={() => onSendCommand('NUMBER_0')}
            disabled={disabled}
            className="py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 active:text-white text-zinc-100 font-bold text-lg transition shadow active:scale-95 border border-zinc-700/50"
          >
            0
          </button>
          <button
            onClick={() => onSendCommand('MUTE')}
            disabled={disabled}
            className="py-3.5 rounded-2xl bg-red-950/40 border border-red-800/40 hover:bg-red-800 text-red-400 hover:text-white font-semibold text-xs transition"
          >
            MUTE
          </button>
        </div>
      </div>

      {/* Auxiliary Nav Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onSendCommand('BACK')}
          disabled={disabled}
          className="py-3 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 transition flex items-center justify-center gap-1.5 text-xs font-medium border border-zinc-700/60"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" /> Voltar
        </button>
        <button
          onClick={() => onSendCommand('HOME')}
          disabled={disabled}
          className="py-3 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 transition flex items-center justify-center gap-1.5 text-xs font-medium border border-zinc-700/60"
        >
          <Home className="w-4 h-4 text-emerald-400" /> Home
        </button>
        <button
          onClick={() => onSendCommand('MENU')}
          disabled={disabled}
          className="py-3 rounded-2xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 transition flex items-center justify-center gap-1.5 text-xs font-medium border border-zinc-700/60"
        >
          <Menu className="w-4 h-4 text-emerald-400" /> Menu
        </button>
      </div>
    </div>
  );
};
