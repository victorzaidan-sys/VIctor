import React, { useState } from 'react';
import {
  Tv,
  Hash,
  Sparkles,
  MousePointer,
  Keyboard,
  Wifi,
  AlertCircle,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { TVDevice, RemoteTab, TVCommand } from '../types/tv';
import { BasicRemoteView } from './remotes/BasicRemoteView';
import { FullNumericRemoteView } from './remotes/FullNumericRemoteView';
import { SmartRemoteView } from './remotes/SmartRemoteView';
import { TouchpadView } from './remotes/TouchpadView';
import { KeyboardInputView } from './remotes/KeyboardInputView';

interface RemoteControlContainerProps {
  device: TVDevice | null;
  onSendCommand: (command: TVCommand, value?: string) => Promise<void>;
  onReconnect: () => void;
  lastCommandFeedback: { message: string; latencyMs: number } | null;
}

export const RemoteControlContainer: React.FC<RemoteControlContainerProps> = ({
  device,
  onSendCommand,
  onReconnect,
  lastCommandFeedback,
}) => {
  const [activeTab, setActiveTab] = useState<RemoteTab>('basic');

  const tabs: { id: RemoteTab; label: string; icon: React.ReactNode }[] = [
    { id: 'basic', label: 'Básico', icon: <Tv className="w-4 h-4" /> },
    { id: 'numeric', label: 'Numérico', icon: <Hash className="w-4 h-4" /> },
    { id: 'smart', label: 'Smart Apps', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'touchpad', label: 'Touchpad', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'keyboard', label: 'Teclado', icon: <Keyboard className="w-4 h-4" /> },
  ];

  const isDisconnected = device?.status !== 'CONNECTED';

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-950 border border-zinc-800/90 rounded-3xl p-4 sm:p-5 shadow-2xl relative">
      {/* Top Remote Status & Feedback Bar */}
      <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 rounded-2xl px-3.5 py-2 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${isDisconnected ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
          <span className="font-bold text-zinc-200">
            {device ? device.name : 'Nenhuma TV Selecionada'}
          </span>
        </div>

        {lastCommandFeedback ? (
          <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md flex items-center gap-1 animate-fade-in">
            <CheckCircle2 className="w-3 h-3" />
            {lastCommandFeedback.latencyMs}ms
          </span>
        ) : (
          <span className="text-[11px] font-mono text-zinc-500">
            {device?.ipAddress || 'Wi-Fi'}
          </span>
        )}
      </div>

      {/* Disconnection Warning Banner */}
      {isDisconnected && (
        <div className="mb-4 bg-amber-950/60 border border-amber-800/60 text-amber-300 p-3 rounded-2xl text-xs flex items-center justify-between gap-2 shadow">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>TV desconectada ou em modo offline.</span>
          </div>
          <button
            onClick={onReconnect}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-[11px] transition shrink-0 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reconectar
          </button>
        </div>
      )}

      {/* Navigation Tabs Header */}
      <div className="flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800/80 mb-6 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-2.5 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-950/50 font-extrabold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Remote View */}
      <div className="py-2 min-h-[420px] flex items-center justify-center">
        {activeTab === 'basic' && (
          <BasicRemoteView onSendCommand={onSendCommand} disabled={false} />
        )}
        {activeTab === 'numeric' && (
          <FullNumericRemoteView onSendCommand={onSendCommand} disabled={false} />
        )}
        {activeTab === 'smart' && (
          <SmartRemoteView onSendCommand={onSendCommand} disabled={false} />
        )}
        {activeTab === 'touchpad' && (
          <TouchpadView onSendCommand={onSendCommand} disabled={false} />
        )}
        {activeTab === 'keyboard' && (
          <KeyboardInputView onSendCommand={onSendCommand} disabled={false} />
        )}
      </div>
    </div>
  );
};
