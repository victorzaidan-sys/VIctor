import React, { useState } from 'react';
import { KeyRound, ShieldAlert, CheckCircle2, X, RefreshCw } from 'lucide-react';
import { TVDevice } from '../types/tv';

interface PairingModalProps {
  device: TVDevice;
  onConfirmPairing: (pin: string) => Promise<boolean>;
  onClose: () => void;
}

export const PairingModal: React.FC<PairingModalProps> = ({
  device,
  onConfirmPairing,
  onClose,
}) => {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    const success = await onConfirmPairing(pin.trim());
    setIsLoading(false);

    if (!success) {
      setErrorMsg('Código PIN incorreto. Verifique o número que apareceu na tela da TV.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 mx-auto flex items-center justify-center mb-4 shadow-lg">
          <KeyRound className="w-8 h-8 stroke-[2]" />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">Confirmação de Pareamento</h3>
        <p className="text-xs text-zinc-300 max-w-xs mx-auto mb-4">
          Digite o código de autorização PIN exibido na tela da sua TV{' '}
          <strong className="text-emerald-400">{device.name}</strong>.
        </p>

        {/* Demo Hint Banner */}
        <div className="bg-amber-950/40 border border-amber-800/40 text-amber-300 p-3 rounded-2xl text-xs mb-4 text-left">
          <p className="font-bold flex items-center gap-1.5 mb-0.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Dica de Teste Rápido:
          </p>
          <p className="text-[11px] text-amber-200/90">
            Veja o PIN exibido no painel da TV Simulada (ex: <strong>7492</strong> ou <strong>0000</strong>).
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-950/80 border border-red-800/60 text-red-300 p-3 rounded-2xl text-xs mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Ex: 7492"
            autoFocus
            className="w-full bg-zinc-950 border-2 border-zinc-800 focus:border-amber-500 rounded-2xl py-3.5 text-center text-2xl font-mono tracking-widest font-bold text-amber-400 placeholder-zinc-700 focus:outline-none transition shadow-inner"
          />

          <button
            type="submit"
            disabled={isLoading || !pin.trim()}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-extrabold py-3.5 px-6 rounded-2xl shadow-xl transition flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Validando PIN...</span>
              </>
            ) : (
              <span>Confirmar e Conectar TV</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
