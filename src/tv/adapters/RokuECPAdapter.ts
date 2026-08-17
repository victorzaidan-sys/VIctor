import { ITVAdapter, CommandResult } from './ITVAdapter';
import { TVDevice, TVCommand } from '../../types/tv';

export class RokuECPAdapter implements ITVAdapter {
  private device: TVDevice | null = null;

  async connect(device: TVDevice): Promise<boolean> {
    this.device = device;
    return true;
  }

  async disconnect(): Promise<void> {
    this.device = null;
  }

  async pairWithPin(): Promise<boolean> {
    return true;
  }

  async sendCommand(command: TVCommand, value?: string): Promise<CommandResult> {
    if (!this.device) {
      return { success: false, message: 'Nenhum dispositivo Roku conectado', latencyMs: 0 };
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
          protocol: 'roku_ecp',
          ipAddress: this.device.ipAddress,
        }),
      });
      const data = await res.json();
      const end = performance.now();

      return {
        success: data.success ?? true,
        message: data.message || `Roku ECP: ${command} enviado.`,
        latencyMs: Math.round(end - start),
      };
    } catch (err) {
      return {
        success: false,
        message: `Erro Roku ECP: ${(err as Error).message}`,
        latencyMs: 0,
      };
    }
  }

  getCapabilities() {
    return {
      touchpad: true,
      keyboard: true,
      appLauncher: true,
      pinPairing: false,
    };
  }
}
