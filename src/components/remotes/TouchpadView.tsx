import React, { useState, useRef } from 'react';
import { MousePointer, ArrowLeft, Move, Sliders } from 'lucide-react';
import { TVCommand } from '../../types/tv';

interface TouchpadViewProps {
  onSendCommand: (command: TVCommand, value?: string) => void;
  disabled?: boolean;
}

export const TouchpadView: React.FC<TouchpadViewProps> = ({ onSendCommand, disabled }) => {
  const [sensitivity, setSensitivity] = useState(2);
  const [lastAction, setLastAction] = useState<string>('Deslize para navegar');
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 50 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointerPos({ x, y });
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !touchStartRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));
    setPointerPos({ x, y });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !touchStartRef.current) return;
    const deltaX = e.clientX - touchStartRef.current.x;
    const deltaY = e.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const threshold = 25 / sensitivity;

    if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
      // Tap detected -> OK / Click
      onSendCommand('OK');
      setLastAction('Clique / OK enviado');
    } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        onSendCommand('RIGHT');
        setLastAction('Deslize para a Direita ▶');
      } else {
        onSendCommand('LEFT');
        setLastAction('◀ Deslize para a Esquerda');
      }
    } else {
      if (deltaY > 0) {
        onSendCommand('DOWN');
        setLastAction('Deslize para Baixo ▼');
      } else {
        onSendCommand('UP');
        setLastAction('▲ Deslize para Cima');
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col space-y-4">
      {/* Touchpad Header */}
      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-900 px-4 py-2.5 rounded-2xl border border-zinc-800">
        <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
          <MousePointer className="w-4 h-4" /> Touchpad Virtual
        </span>
        <span className="font-mono text-[11px] text-zinc-300">{lastAction}</span>
      </div>

      {/* Main Touch Gesture Canvas */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative w-full h-72 rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 border-2 border-zinc-800 shadow-2xl flex flex-col items-center justify-center select-none touch-none overflow-hidden cursor-crosshair ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-emerald-500/50'
        }`}
      >
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

        {/* Dynamic Pointer Cursor Visual */}
        <div
          className="absolute w-8 h-8 rounded-full bg-emerald-500/30 border-2 border-emerald-400 -translate-x-1/2 -translate-y-1/2 transition-all duration-75 shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center justify-center pointer-events-none"
          style={{ left: `${pointerPos.x}%`, top: `${pointerPos.y}%` }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        {/* Center Instructions */}
        <div className="pointer-events-none text-center space-y-1.5 opacity-60">
          <Move className="w-8 h-8 mx-auto text-emerald-400 animate-pulse" />
          <p className="text-xs font-bold text-zinc-200">Deslize o dedo para navegar</p>
          <p className="text-[10px] text-zinc-400">Toque rápido para confirmar (OK)</p>
        </div>
      </div>

      {/* Mouse Buttons Bar */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            onSendCommand('BACK');
            setLastAction('Botão Voltar');
          }}
          disabled={disabled}
          className="py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 transition font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Botão Voltar</span>
        </button>

        <button
          onClick={() => {
            onSendCommand('OK');
            setLastAction('Clique Principal (OK)');
          }}
          disabled={disabled}
          className="py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-zinc-950 transition font-extrabold text-xs flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-emerald-950/60"
        >
          <MousePointer className="w-4 h-4 fill-current" />
          <span>Clique (OK)</span>
        </button>
      </div>

      {/* Sensitivity Adjustment Slider */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-3 flex items-center justify-between gap-3 text-xs">
        <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
          <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Sensibilidade:
        </span>
        <input
          type="range"
          min="1"
          max="4"
          step="0.5"
          value={sensitivity}
          onChange={(e) => setSensitivity(parseFloat(e.target.value))}
          className="accent-emerald-500 w-32 cursor-pointer"
        />
        <span className="font-mono text-emerald-400 font-bold w-6 text-right">
          {sensitivity}x
        </span>
      </div>
    </div>
  );
};
