import React, { useState } from 'react';
import { Keyboard, Send, Delete, CornerDownLeft, CheckCircle2 } from 'lucide-react';
import { TVCommand } from '../../types/tv';

interface KeyboardInputViewProps {
  onSendCommand: (command: TVCommand, value?: string) => void;
  disabled?: boolean;
}

export const KeyboardInputView: React.FC<KeyboardInputViewProps> = ({
  onSendCommand,
  disabled,
}) => {
  const [inputText, setInputText] = useState('');
  const [sentMessage, setSentMessage] = useState<string | null>(null);

  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || disabled) return;

    onSendCommand('TEXT_INPUT', inputText.trim());
    setSentMessage(`"${inputText.trim()}" enviado para a TV!`);
    setInputText('');
    setTimeout(() => setSentMessage(null), 3000);
  };

  const quickTexts = [
    'Filmes de Ação',
    'Futebol ao Vivo',
    'Notícias',
    'Desenhos',
    'Músicas Relaxantes',
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col space-y-4">
      {/* Keyboard Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 to-zinc-900 border border-emerald-800/40 rounded-3xl p-4 shadow-xl flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
          <Keyboard className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Teclado Virtual Smart TV</h3>
          <p className="text-xs text-zinc-400">Digite no celular e envie direto para buscas da TV</p>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendText} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={disabled}
            placeholder="Digite aqui (ex: Nome do filme ou canal)..."
            className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-emerald-500 rounded-2xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition shadow-inner pr-12"
          />
          {inputText && (
            <button
              type="button"
              onClick={() => setInputText('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 p-1"
            >
              <Delete className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="submit"
            disabled={!inputText.trim() || disabled}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-zinc-950 font-extrabold rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 text-xs"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
            <span>Enviar Texto</span>
          </button>

          <button
            type="button"
            onClick={() => onSendCommand('OK')}
            disabled={disabled}
            className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold rounded-2xl transition flex items-center justify-center gap-2 text-xs border border-zinc-700/60"
          >
            <CornerDownLeft className="w-4 h-4 text-emerald-400" />
            <span>Enter (OK)</span>
          </button>
        </div>
      </form>

      {/* Success Banner */}
      {sentMessage && (
        <div className="bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{sentMessage}</span>
        </div>
      )}

      {/* Quick Search Chips */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 shadow-lg">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
          Atalhos de Busca Rápida
        </p>
        <div className="flex flex-wrap gap-2">
          {quickTexts.map((text) => (
            <button
              key={text}
              type="button"
              onClick={() => {
                setInputText(text);
                onSendCommand('TEXT_INPUT', text);
                setSentMessage(`"${text}" enviado para a TV!`);
                setTimeout(() => setSentMessage(null), 3000);
              }}
              disabled={disabled}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded-xl border border-zinc-700/50 transition active:scale-95"
            >
              + {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
