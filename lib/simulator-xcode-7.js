import SimulatorXcode6 from './simulator-xcode-6';


class SimulatorXcode7 extends SimulatorXcode6 {
  // at the moment there is no difference
  constructor (udid, xcodeVersion) {
    super(udid, xcodeVersion);
  }

  static async _getDeviceStringVersionString (platformVersion) {
    let reqVersion = await this._getDeviceStringPlatformVersion(platformVersion);
    return `(${reqVersion})`;
  }

  static _getDeviceStringConfigFix () {
    return {
      'iPad Simulator (8.1)': 'iPad 2 (8.1)',
      'iPad Simulator (8.2)': 'iPad 2 (8.2)',
      'iPad Simulator (8.3)': 'iPad 2 (8.3)',
      'iPad Simulator (8.4)': 'iPad 2 (8.4)',
      'iPad Simulator (9.0)': 'iPad 2 (9.0)',
      'iPad Simulator (9.1)': 'iPad 2 (9.1)',
      'iPhone Simulator (8.1)': 'iPhone 6 (8.1)',
      'iPhone Simulator (8.2)': 'iPhone 6 (8.2)',
      'iPhone Simulator (8.3)': 'iPhone 6 (8.3)',
      'iPhone Simulator (8.4)': 'iPhone 6 (8.4)',
      // Fixing ambiguous device name by adding '[' at the end so intruments
      // correctly starts iPhone 6 [udid] and not the iPhone 6 (9.0) + Apple Watch
      // for ios9.0 and above; see #5619
      'iPhone Simulator (9.0)': 'iPhone 6 (9.0) [',
      'iPhone Simulator (9.1)': 'iPhone 6 (9.1) [',
      'iPhone 6 (9.0)': 'iPhone 6 (9.0) [',
      'iPhone 6 (9.1)': 'iPhone 6 (9.1) ['
    };
  }
}

export default SimulatorXcode7;
