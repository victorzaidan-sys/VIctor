import { ITVAdapter, CommandResult } from './ITVAdapter';
import { TVDevice, TVCommand } from '../../types/tv';

export class TCLAndroidAdapter implements ITVAdapter {
  private device: TVDevice | null = null;

  async connect(device: TVDevice): Promise<boolean> {
    this.device = device;
    return true;
  }

  async disconnect(): Promise<void> {
    this.device = null;
  }

  async pairWithPin(pin: string): Promise<boolean> {
    return pin.length >= 4;
  }

  async sendCommand(command: TVCommand, value?: string): Promise<CommandResult> {
    if (!this.device) {
      return { success: false, message: 'Nenhuma TV TCL / Google TV conectada', latencyMs: 0 };
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
          protocol: 'tcl_android',
          ipAddress: this.device.ipAddress,
        }),
      });
      const data = await res.json();
      const end = performance.now();

      return {
        success: data.success ?? true,
        message: data.message || `TCL Google TV: ${command} enviado.`,
        latencyMs: Math.round(end - start),
      };
    } catch (err) {
      return {
        success: false,
        message: `Erro TCL Android Protocol: ${(err as Error).message}`,
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
