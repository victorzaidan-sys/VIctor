import React from 'react';
import {
  Power,
  Volume2,
  VolumeX,
  Volume1,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  ArrowLeft,
  Menu,
  Tv,
  Radio
} from 'lucide-react';
import { TVCommand } from '../../types/tv';

interface RemoteViewProps {
  onSendCommand: (command: TVCommand, value?: string) => void;
  disabled?: boolean;
}

export const BasicRemoteView: React.FC<RemoteViewProps> = ({ onSendCommand, disabled }) => {
  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center space-y-6">
      {/* Top Controls: Power & Input */}
      <div className="w-full flex items-center justify-between px-2">
        <button
          onClick={() => onSendCommand('POWER')}
          disabled={disabled}
          className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 hover:bg-red-600 hover:text-white transition active:scale-95 shadow-lg shadow-red-950/40 flex items-center justify-center disabled:opacity-50"
          title="Ligar / Desligar TV"
        >
          <Power className="w-7 h-7 stroke-[2.5]" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSendCommand('INPUT')}
            disabled={disabled}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700/80 text-zinc-200 hover:bg-zinc-700 transition active:scale-95 flex items-center gap-1.5 text-xs font-semibold shadow-md"
            title="Selecionar Entrada (HDMI/TV)"
          >
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Entrada</span>
          </button>
        </div>
      </div>

      {/* D-Pad Navigation Circle */}
      <div className="relative w-64 h-64 rounded-full bg-zinc-900 border-2 border-zinc-800 shadow-2xl p-3 flex items-center justify-center">
        {/* UP */}
        <button
          onClick={() => onSendCommand('UP')}
          disabled={disabled}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-16 rounded-t-full bg-zinc-800/80 hover:bg-zinc-700/80 active:bg-emerald-600 active:text-white text-zinc-300 transition flex items-center justify-center pt-2"
        >
          <ChevronUp className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* LEFT */}
        <button
          onClick={() => onSendCommand('LEFT')}
          disabled={disabled}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-16 h-20 rounded-l-full bg-zinc-800/80 hover:bg-zinc-700/80 active:bg-emerald-600 active:text-white text-zinc-300 transition flex items-center justify-center pl-2"
        >
          <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* CENTER OK */}
        <button
          onClick={() => onSendCommand('OK')}
          disabled={disabled}
          className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-zinc-950 font-extrabold text-base shadow-xl active:scale-95 hover:brightness-110 transition flex items-center justify-center z-10 border-2 border-emerald-300/40"
        >
          OK
        </button>

        {/* RIGHT */}
        <button
          onClick={() => onSendCommand('RIGHT')}
          disabled={disabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-20 rounded-r-full bg-zinc-800/80 hover:bg-zinc-700/80 active:bg-emerald-600 active:text-white text-zinc-300 transition flex items-center justify-center pr-2"
        >
          <ChevronRight className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* DOWN */}
        <button
          onClick={() => onSendCommand('DOWN')}
          disabled={disabled}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-16 rounded-b-full bg-zinc-800/80 hover:bg-zinc-700/80 active:bg-emerald-600 active:text-white text-zinc-300 transition flex items-center justify-center pb-2"
        >
          <ChevronDown className="w-7 h-7 stroke-[2.5]" />
        </button>
      </div>

      {/* Middle Bar: Back, Home, Menu */}
      <div className="w-full grid grid-cols-3 gap-3 px-2">
        <button
          onClick={() => onSendCommand('BACK')}
          disabled={disabled}
          className="flex flex-col items-center justify-center py-3 rounded-2xl bg-zinc-800/90 border border-zinc-700/60 hover:bg-zinc-700 text-zinc-300 transition active:scale-95 shadow-md"
        >
          <ArrowLeft className="w-5 h-5 mb-1 text-emerald-400" />
          <span className="text-[10px] font-semibold">Voltar</span>
        </button>

        <button
          onClick={() => onSendCommand('HOME')}
          disabled={disabled}
          className="flex flex-col items-center justify-center py-3 rounded-2xl bg-zinc-800/90 border border-zinc-700/60 hover:bg-zinc-700 text-zinc-300 transition active:scale-95 shadow-md"
        >
          <Home className="w-5 h-5 mb-1 text-emerald-400" />
          <span className="text-[10px] font-semibold">Home</span>
        </button>

        <button
          onClick={() => onSendCommand('MENU')}
          disabled={disabled}
          className="flex flex-col items-center justify-center py-3 rounded-2xl bg-zinc-800/90 border border-zinc-700/60 hover:bg-zinc-700 text-zinc-300 transition active:scale-95 shadow-md"
        >
          <Menu className="w-5 h-5 mb-1 text-emerald-400" />
          <span className="text-[10px] font-semibold">Menu</span>
        </button>
      </div>

      {/* Rockers: Volume & Channel */}
      <div className="w-full grid grid-cols-2 gap-4 px-2 pt-2">
        {/* Volume Rocker */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-2.5 flex flex-col items-center justify-between shadow-lg">
          <button
            onClick={() => onSendCommand('VOLUME_UP')}
            disabled={disabled}
            className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 active:text-white transition flex items-center justify-center text-zinc-200"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <div className="my-2 text-center">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">VOL</span>
            <button
              onClick={() => onSendCommand('MUTE')}
              disabled={disabled}
              className="mt-1 block mx-auto text-red-400 hover:text-red-300 transition text-[10px] font-medium"
            >
              MUTE
            </button>
          </div>
          <button
            onClick={() => onSendCommand('VOLUME_DOWN')}
            disabled={disabled}
            className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 active:text-white transition flex items-center justify-center text-zinc-200"
          >
            <Volume1 className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Rocker */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-2.5 flex flex-col items-center justify-between shadow-lg">
          <button
            onClick={() => onSendCommand('CHANNEL_UP')}
            disabled={disabled}
            className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 active:text-white transition flex items-center justify-center text-zinc-200"
          >
            <ChevronUp className="w-6 h-6 stroke-[2.5]" />
          </button>
          <div className="my-2 text-center">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">CANAL</span>
            <Tv className="w-3.5 h-3.5 mx-auto mt-1 text-emerald-400" />
          </div>
          <button
            onClick={() => onSendCommand('CHANNEL_DOWN')}
            disabled={disabled}
            className="w-full py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:bg-emerald-600 active:text-white transition flex items-center justify-center text-zinc-200"
          >
            <ChevronDown className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
