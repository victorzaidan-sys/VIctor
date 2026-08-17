import { ITVAdapter } from './ITVAdapter';
import { LGWebOSAdapter } from './LGWebOSAdapter';
import { SamsungTizenAdapter } from './SamsungTizenAdapter';
import { TCLAndroidAdapter } from './TCLAndroidAdapter';
import { SonyBraviaAdapter } from './SonyBraviaAdapter';
import { PanasonicVieraAdapter } from './PanasonicVieraAdapter';
import { RokuECPAdapter } from './RokuECPAdapter';
import { SempToshibaAdapter } from './SempToshibaAdapter';
import { TVProtocol, TVManufacturer } from '../../types/tv';

export class TVAdapterFactory {
  static getAdapter(protocol: TVProtocol, manufacturer?: TVManufacturer): ITVAdapter {
    switch (protocol) {
      case 'lg_webos':
        return new LGWebOSAdapter();
      case 'samsung_tizen':
        return new SamsungTizenAdapter();
      case 'tcl_android':
        return new TCLAndroidAdapter();
      case 'sony_bravia':
        return new SonyBraviaAdapter();
      case 'panasonic_viera':
        return new PanasonicVieraAdapter();
      case 'roku_ecp':
        return new RokuECPAdapter();
      case 'semp_toshiba':
        return new SempToshibaAdapter();
      default:
        // Fallback by manufacturer if protocol is generic or demo
        if (manufacturer === 'LG') return new LGWebOSAdapter();
        if (manufacturer === 'Samsung') return new SamsungTizenAdapter();
        if (manufacturer === 'TCL') return new TCLAndroidAdapter();
        if (manufacturer === 'Sony') return new SonyBraviaAdapter();
        if (manufacturer === 'Panasonic') return new PanasonicVieraAdapter();
        if (manufacturer === 'Roku') return new RokuECPAdapter();
        if (manufacturer === 'SEMP' || manufacturer === 'Toshiba') return new SempToshibaAdapter();
        // Default LG webOS adapter for generic
        return new LGWebOSAdapter();
    }
  }
}
