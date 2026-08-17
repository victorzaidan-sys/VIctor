import { TVDevice, TVCommand } from '../../types/tv';

export interface CommandResult {
  success: boolean;
  message: string;
  latencyMs: number;
}

export interface ITVAdapter {
  connect(device: TVDevice): Promise<boolean>;
  disconnect(): Promise<void>;
  pairWithPin(pin: string): Promise<boolean>;
  sendCommand(command: TVCommand, value?: string): Promise<CommandResult>;
  getCapabilities(): {
    touchpad: boolean;
    keyboard: boolean;
    appLauncher: boolean;
    pinPairing: boolean;
  };
}
