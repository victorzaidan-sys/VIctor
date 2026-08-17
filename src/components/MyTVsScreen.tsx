import React, { useState } from 'react';
import {
  Tv,
  Star,
  Trash2,
  Edit2,
  Check,
  PlusCircle,
  Wifi,
  Bluetooth,
  Activity,
  X,
  Smartphone
} from 'lucide-react';
import { TVDevice } from '../types/tv';

interface MyTVsScreenProps {
  savedTVs: TVDevice[];
  activeTV: TVDevice | null;
  onSelectTV: (tv: TVDevice) => void;
  onUpdateTV: (tv: TVDevice) => void;
  onDeleteTV: (id: string) => void;
  onOpenDiscovery: () => void;
  onClose: () => void;
}

export const MyTVsScreen: React.FC<MyTVsScreenProps> = ({
  savedTVs,
  activeTV,
  onSelectTV,
  onUpdateTV,
  onDeleteTV,
  onOpenDiscovery,
  onClose,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleStartEdit = (tv: TVDevice) => {
    setEditingId(tv.id);
    setEditName(tv.name);
  };

  const handleSaveEdit = (tv: TVDevice) => {
    if (editName.trim()) {
      onUpdateTV({ ...tv, name: editName.trim() });
    }
    setEditingId(null);
  };

  const handleToggleFavorite = (tv: TVDevice) => {
    onUpdateTV({ ...tv, isFavorite: !tv.isFavorite });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold mb-3">
            <Smartphone className="w-3.5 h-3.5" /> Dispositivos Salvos
          </div>
          <h2 className="text-xl font-bold text-white">Minhas Smart TVs</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Gerencie e escolha rapidamente qual televisor deseja controlar.
          </p>
        </div>

        {/* Saved TVs List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1 my-4">
          {savedTVs.map((tv) => {
            const isActive = activeTV?.id === tv.id;
            return (
              <div
                key={tv.id}
                className={`p-4 rounded-2xl border transition shadow-lg ${
                  isActive
                    ? 'bg-emerald-950/40 border-emerald-500/80'
                    : 'bg-zinc-800/80 border-zinc-700/60 hover:border-zinc-600'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-2xl border ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      <Tv className="w-6 h-6 stroke-[2]" />
                    </div>

                    <div>
                      {editingId === tv.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="bg-zinc-950 border border-emerald-500 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveEdit(tv)}
                            className="p-1.5 bg-emerald-500 text-zinc-950 rounded-lg hover:bg-emerald-400"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{tv.name}</h4>
                          <button
                            onClick={() => handleStartEdit(tv)}
                            className="text-zinc-500 hover:text-zinc-300 p-0.5"
                            title="Editar Nome Customizado"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1 font-mono">
                        <span>{tv.manufacturer}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          {tv.connectionType === 'wifi' ? (
                            <Wifi className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Bluetooth className="w-3 h-3 text-blue-400" />
                          )}
                          {tv.ipAddress}
                        </span>
                        <span>•</span>
                        <span
                          className={`font-semibold ${
                            tv.status === 'CONNECTED' ? 'text-emerald-400' : 'text-zinc-500'
                          }`}
                        >
                          {tv.status === 'CONNECTED' ? '● Conectada' : '○ Desconectada'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFavorite(tv)}
                      className={`p-2 rounded-xl transition ${
                        tv.isFavorite
                          ? 'text-amber-400 bg-amber-500/10'
                          : 'text-zinc-500 hover:text-amber-400 hover:bg-zinc-800'
                      }`}
                      title={tv.isFavorite ? 'Remover dos Favoritos' : 'Favoritar TV'}
                    >
                      <Star className={`w-4 h-4 ${tv.isFavorite ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => {
                        onSelectTV(tv);
                        onClose();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow ${
                        isActive
                          ? 'bg-emerald-500 text-zinc-950'
                          : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
                      }`}
                    >
                      {isActive ? 'Ativa' : 'Conectar'}
                    </button>

                    {savedTVs.length > 1 && (
                      <button
                        onClick={() => onDeleteTV(tv.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-xl transition"
                        title="Remover Dispositivo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenDiscovery();
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-bold rounded-2xl transition text-xs shadow-lg shadow-emerald-950/60"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Adicionar Nova TV</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold rounded-2xl transition text-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
