import React, { useState, useEffect } from 'react';
import {
  Search,
  Wifi,
  Bluetooth,
  RefreshCw,
  Tv,
  CheckCircle2,
  Plus,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { TVDevice, TVManufacturer } from '../types/tv';

interface TVDiscoveryScreenProps {
  onSelectTVToPair: (tv: TVDevice) => void;
  onClose: () => void;
}

export const TVDiscoveryScreen: React.FC<TVDiscoveryScreenProps> = ({
  onSelectTVToPair,
  onClose,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState<TVDevice[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [showManualIP, setShowManualIP] = useState(false);
  const [manualIP, setManualIP] = useState('');
  const [manualName, setManualName] = useState('');
  const [manualBrand, setManualBrand] = useState<TVManufacturer>('LG');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const startScan = async () => {
    setIsScanning(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/discovery');
      if (res.ok) {
        const data = await res.json();
        setDiscoveredDevices(data.devices || []);
      } else {
        setErrorMsg('Não foi possível realizar a busca na rede.');
      }
    } catch {
      setErrorMsg('Erro de conexão com o serviço de descoberta local.');
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    startScan();
  }, []);

  const handleAddManualDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualIP.trim()) return;

    const newDevice: TVDevice = {
      id: `manual_${Date.now()}`,
      name: manualName.trim() || `TV ${manualBrand} (${manualIP})`,
      manufacturer: manualBrand,
      model: 'Modelo Manual',
      ipAddress: manualIP.trim(),
      connectionType: 'wifi',
      protocol:
        manualBrand === 'LG'
          ? 'lg_webos'
          : manualBrand === 'Samsung'
          ? 'samsung_tizen'
          : manualBrand === 'TCL'
          ? 'tcl_android'
          : manualBrand === 'Sony'
          ? 'sony_bravia'
          : manualBrand === 'Roku'
          ? 'roku_ecp'
          : 'generic_http',
      deviceIdentifier: `manual_dev_${manualIP.replace(/\./g, '_')}`,
      isFavorite: false,
      status: 'DISCONNECTED',
      signalStrength: 90,
      supportedCommands: [
        'POWER', 'VOLUME_UP', 'VOLUME_DOWN', 'MUTE', 'CHANNEL_UP', 'CHANNEL_DOWN',
        'HOME', 'BACK', 'MENU', 'INPUT', 'UP', 'DOWN', 'LEFT', 'RIGHT', 'OK'
      ],
      supportedFeatures: {
        touchpad: true,
        keyboard: true,
        appLauncher: true,
        pinPairing: true,
        bluetoothControl: false,
      },
    };

    onSelectTVToPair(newDevice);
  };

  const filteredDevices = discoveredDevices.filter((dev) => {
    if (selectedBrand === 'ALL') return true;
    return dev.manufacturer.toUpperCase() === selectedBrand.toUpperCase();
  });

  const brandsList = ['ALL', 'LG', 'Samsung', 'TCL', 'Sony', 'Roku', 'SEMP', 'Toshiba'];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold mb-3">
            <Wifi className="w-3.5 h-3.5" /> Busca em Rede Local (SSDP / mDNS / Bluetooth)
          </div>
          <h2 className="text-xl font-bold text-white">Encontrar Minha TV</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Certifique-se de que a Smart TV está ligada e na mesma rede Wi-Fi do celular.
          </p>
        </div>

        {/* Scan Actions & Brand Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={startScan}
              disabled={isScanning}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-zinc-950 font-bold py-3 px-4 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 text-xs"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Procurando TVs na rede...' : 'Buscar TVs Novamente'}</span>
            </button>

            <button
              onClick={() => setShowManualIP(!showManualIP)}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-3 px-4 rounded-2xl border border-zinc-700/80 transition text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>IP Manual</span>
            </button>
          </div>

          {/* Manufacturer Chips Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] text-zinc-500 font-bold uppercase mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Filtrar:
            </span>
            {brandsList.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedBrand === brand
                    ? 'bg-emerald-500 text-zinc-950 shadow'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {brand === 'ALL' ? 'Todas as Marcas' : brand}
              </button>
            ))}
          </div>
        </div>

        {/* Manual IP Expansion Form */}
        {showManualIP && (
          <form
            onSubmit={handleAddManualDevice}
            className="mb-6 bg-zinc-950/80 border border-emerald-800/50 p-4 rounded-2xl space-y-3"
          >
            <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Conectar via Endereço IP Direto
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Endereço IP (Ex: 192.168.1.100)"
                value={manualIP}
                onChange={(e) => setManualIP(e.target.value)}
                required
                className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />

              <select
                value={manualBrand}
                onChange={(e) => setManualBrand(e.target.value as TVManufacturer)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="LG">LG webOS</option>
                <option value="Samsung">Samsung Tizen</option>
                <option value="TCL">TCL / Google TV</option>
                <option value="Sony">Sony Bravia</option>
                <option value="Roku">Roku TV</option>
                <option value="SEMP">SEMP / Toshiba</option>
                <option value="Panasonic">Panasonic</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-xl text-xs transition"
            >
              Adicionar e Conectar
            </button>
          </form>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 bg-red-950/80 border border-red-800/60 text-red-300 p-3 rounded-2xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Discovered TV Devices List */}
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {filteredDevices.length > 0 ? (
            filteredDevices.map((tv) => (
              <div
                key={tv.id}
                onClick={() => onSelectTVToPair(tv)}
                className="p-4 rounded-2xl bg-zinc-800/90 border border-zinc-700/60 hover:border-emerald-500/80 hover:bg-zinc-800 transition cursor-pointer flex items-center justify-between group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-700/80 text-emerald-400 group-hover:scale-105 transition">
                    <Tv className="w-6 h-6 stroke-[2]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition">
                        {tv.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-emerald-400 border border-emerald-900">
                        {tv.manufacturer}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-zinc-400 mt-1 font-mono">
                      <span className="flex items-center gap-1">
                        {tv.connectionType === 'wifi' ? (
                          <Wifi className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Bluetooth className="w-3 h-3 text-blue-400" />
                        )}
                        {tv.ipAddress}
                      </span>
                      <span>Sinal: {tv.signalStrength}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition">
                  <span>Conectar</span>
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-zinc-500 space-y-2 bg-zinc-950/40 rounded-2xl border border-zinc-800/60">
              <Search className="w-8 h-8 mx-auto text-zinc-600 animate-pulse" />
              <p className="text-xs font-semibold text-zinc-400">Nenhum dispositivo encontrado</p>
              <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                Verifique se a TV está ligada no mesmo Wi-Fi ou insira o IP manualmente.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Comunicação Direta sem Intermediários
          </span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white font-medium underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
