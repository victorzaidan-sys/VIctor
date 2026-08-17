import React from 'react';
import { Tv, ShieldCheck, Cpu, Wifi, Check, X, BookOpen, Layers } from 'lucide-react';
import { TV_COMPATIBILITY_DATABASE } from '../data/compatibilityDb';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Matriz de Compatibilidade & Especificações
          </div>
          <h2 className="text-xl font-bold text-white">Sobre o Controle Universal TV</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Arquitetura desacoplada com adaptadores de comunicação direta por fabricante.
          </p>
        </div>

        {/* Database List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1 my-4">
          {TV_COMPATIBILITY_DATABASE.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 transition space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-emerald-400 text-sm">
                    {item.manufacturer}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300">
                    {item.series}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                  {item.connectionMethod} (Porta {item.defaultPort})
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">{item.notes}</p>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-900">
                <span>Pareamento: {item.pairingType}</span>
                <span>Comandos Suportados: {item.supportedCommands.length} funções</span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Highlights */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
          <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-800 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-zinc-200">100% Offline e Local</p>
              <p className="text-[10px] text-zinc-500">Sem servidores externos na rota</p>
            </div>
          </div>

          <div className="bg-zinc-950 p-3 rounded-2xl border border-zinc-800 flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-teal-400 shrink-0" />
            <div>
              <p className="font-bold text-zinc-200">Latência Ultrabaixa</p>
              <p className="text-[10px] text-zinc-500">Comunicação direta via WebSockets / REST</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500">Engenharia de Software Clean Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-xs transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
