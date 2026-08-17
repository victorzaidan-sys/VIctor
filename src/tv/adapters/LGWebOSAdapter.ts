import { ITVAdapter, CommandResult } from './ITVAdapter';
import { TVDevice, TVCommand } from '../../types/tv';

export class LGWebOSAdapter implements ITVAdapter {
  private device: TVDevice | null = null;
  private isConnected = false;

  async connect(device: TVDevice): Promise<boolean> {
    this.device = device;
    this.isConnected = true;
    return true;
  }

  async disconnect(): Promise<void> {
    this.isConnected = false;
    this.device = null;
  }

  async pairWithPin(pin: string): Promise<boolean> {
    if (!this.device) return false;
    try {
      const res = await fetch('/api/tv/pair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tvId: this.device.id, pin }),
      });
      const data = await res.json();
      return data.success;
    } catch {
      return false;
    }
  }

  async sendCommand(command: TVCommand, value?: string): Promise<CommandResult> {
    if (!this.device) {
      return { success: false, message: 'Nenhum dispositivo LG conectado', latencyMs: 0 };
    }

    try {
      const start = performance.now();
      const res = await fetch('/api/tv/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tvId: this.device.id,
          command,
          value,
          protocol: 'lg_webos',
          ipAddress: this.device.ipAddress,
        }),
      });
      const data = await res.json();
      const end = performance.now();

      return {
        success: data.success ?? true,
        message: data.message || `LG webOS: ${command} enviado.`,
        latencyMs: Math.round(end - start),
      };
    } catch (err) {
      return {
        success: false,
        message: `Falha na conexão LG webOS: ${(err as Error).message}`,
        latencyMs: 0,
      };
    }
  }

  getCapabilities() {
    return {
      touchpad: true,
      keyboard: true,
      appLauncher: true,
      pinPairing: true,
    };
  }
}
