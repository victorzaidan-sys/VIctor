import React, { useState } from 'react';
import { Tv, Wifi, Search, Play, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Controle sua TV pelo celular',
      subtitle: 'Transforme seu smartphone em um controle remoto universal rápido, moderno e inteligente.',
      icon: <Tv className="w-16 h-16 text-emerald-400 stroke-[1.5]" />,
      detail: 'Compatível com LG webOS, Samsung Tizen, TCL Google TV, Sony Bravia, Panasonic, Roku, Toshiba e mais.',
    },
    {
      title: 'Conecte à mesma rede Wi-Fi',
      subtitle: 'Para um controle sem travamentos, certifique-se de que o celular e a Smart TV estão na mesma rede de casa.',
      icon: <Wifi className="w-16 h-16 text-teal-400 stroke-[1.5]" />,
      detail: 'Você também pode utilizar conexão Bluetooth em modelos de TV compatíveis.',
    },
    {
      title: 'Encontre sua TV automaticamente',
      subtitle: 'Nosso sistema de descoberta por rede local (SSDP/mDNS) localiza o televisor em poucos segundos.',
      icon: <Search className="w-16 h-16 text-emerald-300 stroke-[1.5]" />,
      detail: 'Basta confirmar o código PIN na tela caso o fabricante solicite autorização.',
    },
    {
      title: 'Tudo pronto para começar!',
      subtitle: 'Acesse o controle básico, teclado numérico, atalhos de apps e touchpad de alta precisão.',
      icon: <CheckCircle2 className="w-16 h-16 text-emerald-400 stroke-[1.5]" />,
      detail: 'Clique no botão abaixo para buscar sua Smart TV agora mesmo.',
    },
  ];

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between min-h-[480px] text-center">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === step
                  ? 'w-8 bg-emerald-500'
                  : idx < step
                  ? 'w-3 bg-emerald-800'
                  : 'w-3 bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Content Body */}
        <div className="my-auto py-6 flex flex-col items-center">
          <div className="p-5 rounded-3xl bg-zinc-800/80 border border-zinc-700/60 mb-6 shadow-inner">
            {current.icon}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
            {current.title}
          </h2>
          <p className="text-sm text-zinc-300 mb-4 leading-relaxed max-w-xs">
            {current.subtitle}
          </p>
          <div className="bg-zinc-950/80 border border-zinc-800 px-4 py-2.5 rounded-xl text-xs text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{current.detail}</span>
          </div>
        </div>

        {/* Action Button */}
        <div>
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-950/60 transition flex items-center justify-center gap-2"
            >
              <span>Próximo Passo</span>
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold py-3.5 px-6 rounded-2xl shadow-xl shadow-emerald-950/80 transition flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Começar Agora</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
