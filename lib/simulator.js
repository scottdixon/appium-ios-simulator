import SimulatorXcode6 from './simulator-xcode-6';
import SimulatorXcode7 from './simulator-xcode-7';
import xcode from 'appium-xcode';
import log from './logger';


function handleUnsupportedXcode (xcodeVersion) {
  if (xcodeVersion.major < 6) {
    throw new Error(`Tried to use an iOS simulator with xcode ` +
                    `version ${xcodeVersion.versionString} but only Xcode version ` +
                    `6.0.0 and up are supported`);
  } else if (xcodeVersion.major >= 8) {
    throw new Error(`Xcode version ${xcodeVersion} is ` +
                    `not yet supported`);
  }
}

async function getSimulator (udid) {
  let xcodeVersion = await xcode.getVersion(true);

  handleUnsupportedXcode(xcodeVersion);

  if (xcodeVersion.major === 7) {
    log.info(`Constructing iOS simulator for Xcode version ${xcodeVersion.versionString}`);
    return new SimulatorXcode7(udid, xcodeVersion);
  } else if (xcodeVersion.major === 6) {
    log.info(`Constructing iOS simulator for Xcode version ${xcodeVersion.versionString}`);
    return new SimulatorXcode6(udid, xcodeVersion);
  }
}

async function getDeviceString (opts) {
  let xcodeVersion = await xcode.getVersion(true);

  handleUnsupportedXcode(xcodeVersion);

  if (xcodeVersion.major === 7) {
    log.info(`Retrieving device name string for Xcode version ${xcodeVersion.versionString}`);
    return SimulatorXcode7.getDeviceString(opts);
  } else if (xcodeVersion.major === 6) {
    log.info(`Retrieving device name string for Xcode version ${xcodeVersion.versionString}`);
    return SimulatorXcode6.getDeviceString(opts);
  }
}

export { getSimulator, getDeviceString };
