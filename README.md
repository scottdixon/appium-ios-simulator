## appium-ios-simulator

[![NPM version](http://img.shields.io/npm/v/appium-ios-simulator.svg)](https://npmjs.org/package/appium-ios-simulator)
[![Downloads](http://img.shields.io/npm/dm/appium-ios-simulator.svg)](https://npmjs.org/package/appium-ios-simulator)
[![Dependency Status](https://david-dm.org/appium/appium-ios-simulator/master.svg)](https://david-dm.org/appium/appium-ios-simulator/master)
[![devDependency Status](https://david-dm.org/appium/appium-ios-simulator/master/dev-status.svg)](https://david-dm.org/appium/appium-ios-simulator/master#info=devDependencies)

[![Build Status](https://api.travis-ci.org/appium/appium-ios-simulator.png?branch=master)](https://travis-ci.org/appium/appium-ios-simulator)
[![Coverage Status](https://coveralls.io/repos/appium/appium-ios-simulator/badge.svg?branch=master)](https://coveralls.io/r/appium/appium-ios-simulator?branch=master)

Appium API for dealing with iOS simulators. Allows the user to find locations of directories and applications, gives access to settings in order to read from and write to simualtor plists, and allows control over starting and stopping simulators.


### Usage

The `appium-ios-simulator` exports four utility functions: `getSimulator`, `getDeviceString`, `killAllSimulators`, and `endAllSimulatorDaemons`. All of these are `async` functions, returning promises.

`async getSimulator(udid)`

This function takes the `udid` of a simulator, and returns a simulator object (see below) associated with that identifier.

```js
import { getSimulator } from 'appium-ios-simulator';

let sim = await getSimulator('DAE95172-0788-4A85-8D0D-5C85509109E1');
```


`async getDeviceString()`

Takes a set of options and finds the correct device string in order for Instruments to identify the correct simulator. The options available are:

- `deviceName` - a name for the device. If the given device name starts with `=`, the name, less the equals sign, is returned.
- `platformVersion` - the version of iOS to use. Defaults to the current Xcode's maximum SDK version.
- `forceIphone` - force the configuration of the device string to iPhone. Defaults to `false`.
- `forceIpad` - force the configuration of the device string to iPad. Defaults to `false`. If both `forceIphone` and `forceIpad` are true, the device will be forced to iPhone.

```js
import { getDeviceString } from 'appium-ios-simulator';

let deviceString = await getDeviceString({
  deviceName: 'iPhone 5',
  platformVersion: '8.4'
});
// 'iPhone 5 (8.4)' with Xcode 7+
// 'iPhone 5 (8.4 Simulator)' with Xcode 6+
```


`async killAllSimulators()`

Kills all running simulator processes.

```js
import { killAllSimulators } from 'appium-ios-simulator';

await killAllSimulators();
```


`async endAllSimulatorDaemons()`

Kills all running simulator daemon processes.

```js
import { endAllSimulatorDaemons } from 'appium-ios-simulator';

await endAllSimulatorDaemons();
```


#### Simulator object

The simulator object encapsulates the differences between simulators on Xcode 6 and 7, the two versions Appium currently supports (see below for details). All settings updates require the simulator to not be "fresh", so that the directories and setting preference files are all created, and the simulator must not be running (or the changes will not take effect until the simulator is restarted).

`constructor (udid, xcodeVersion)`

Constructs the object with the `udid` and version of Xcode. Use the exported `getSimulator(udid)` method instead.

`async getPlatformVersion ()`

Retrieve the platform version for the particular simulator.

`getRootDir ()`

Retrieve the base directory for the simulator.

`getLogDir ()`

Retrieve the directory in which logs are stored for the simulator.

`async getAppDataDir (id, subDir)`

Retrieve the directory for a particular application's data.

- `id` - the bundle id (for iOS 8+) or application name minus ".app" (for iOS 7.1).
- `subDir` - the sub-directory we expect to be within the application directory. Defaults tp "Data".

`async stat ()`

Retrieve state information about the simulator. Returns an object:

```js
{ name: 'iPhone 4s',
  udid: 'C09B34E5-7DCB-442E-B79C-AB6BC0357417',
  state: 'Shutdown',
  sdk: '8.3'
}
```

`async isFresh ()`

Query whether the simulator has been run before.

`async run ()`

Starts the simulator without any Instruments involvement, or application running.

`async clean ()`

Stops and releases the simulator.

`async launchAndQuit (safari)`

Launches the simualator and runs a blank Instruments test on a test app, waits for the file system to be updated, and then shuts down.

- `safari` - whether or not to launch the Safari simulator. Defaults to false.

`async endSimulatorDaemon ()`

Ends the process for the simulator daemon.

`async shutdown ()`

Shutdown the simulator.

`async delete ()`

Delete the simulator's directories.

`async updateSettings (plist, updates)`

Update the particular preference file with the given key/value pairs.

- `plist` - the preferences file to update.
- `updates` - the key/value pairs to update.

`async updateLocationSettings (bundleId, authorized)`

Authorize/de-authorize location settings for a particular application.

- `bundleId` - the application to update.
- `authorized` - whether or not to authorize.

`async updateSafariSettings (updates)`

Update the setting for Safari.

- `updates` - a hash of key/value pairs to update for Safari.

`async updateLocale (language, locale, calendarFormat)`

Update the locale for the simulator.

- `language` - the language for the simulator. E.g., `"fr_US"`.
- `locale` - the locale to set for the simulator. E.g., `"en"`.
- `calendarFormat` - the format of the calendar.

`async deleteSafari ()`

Delete the Safari application.

`async cleanSafari (keepPrefs = true)`

Clean up the directories for Safari.

`static async getDeviceString (opts)`

Static (class) method to get the particular device name string for Instruments to identify the device. Use exported `getDeviceString` method instead of this.


### Xcode and iOS versions

See [wikipedia](https://en.wikipedia.org/wiki/Xcode#Xcode_5.0_-_7.x_.28with_arm64_support.29) for details of builds for Xcode versions.

| iOS | Xcode 7.1 beta 3 | Xcode 7.0.1    | Xcode 6.4 | Xcode 6.3.2 | Xcode 6.2 | Xcode 6.1.1 | Xcode 6.0.1 |
|-----|------------------|----------------|-----------|-------------|-----------|-------------|-------------|
| 7.1 | 11D167           | n/a            | 11D167    | 11D167      | 11D167    | 11D167      | 11D167      |
| 8.0 | n/a              | n/a            | n/a       | n/a         | n/a       | n/a         | 12A365      |
| 8.1 | 12B411           | 12B411         | 12B411    | 12B411      | 12B411    | 12B411      | 12B411      |
| 8.2 | 12D508           | 12D508         | 12D508    | 12D508      | 12D508    | n/a         | n/a         |
| 8.3 | 12F70            | 12F70          | 12F70     | 12F69       | 12F70     | n/a         | n/a         |
| 8.4 | 12H141           | 12H141         | 12H141    | 12H141      | 12H141    | n/a         | n/a         |
| 9.0 | 13A344           | 13A340         | n/a       | n/a         | n/a       | n/a         | n/a         |
| 9.1 | 13B134           | n/a            | n/a       | n/a         | n/a       | n/a         | n/a         |


#### file locations

iOS 9.1, 9.0, 8.4, 8.3
  - base
    - ~/Library/Developer/CoreSimulator/Devices/[identifier]/data/
  - safari plists
    - [base]/Containers/Data/Application/[identifier]/<.com.apple.mobile_container_manager.metadata.plist, com.apple.mobilesafari>
  - locationd cache plists
    - [base]/Library/Caches/locationd/cache.plist
    - [base]/Library/Preferences/com.apple.locationd.plist
  - locationd clients plists
    - [base]/Library/Caches/locationd/clients.plist
  - user settings plists
    - [base]/Library/ConfigurationProfiles/UserSettings.plist
    - [base]/Library/ConfigurationProfiles/EffectiveUserSettings.plist
    - [base]/Library/ConfigurationProfiles/PublicInfo/PublicEffectiveUserSettings.plist
  - other plists
    - [base]/Library/Preferences
  - logs
    - ~/Library/Logs/CoreSimulator/[identifier]/
    - sym linked to [base]/Library/Logs

iOS 7.1
  - base
    - ~/Library/Developer/CoreSimulator/Devices/[identifier]/data/
  - safari
    - [base]/Applications/[identifier]/Library/Preferences/com.apple.mobilesafari.plist
  - locationCache
    - [base]/Library/Caches/locationd/cache.plist
    - [base]/Library/Preferences/com.apple.locationd.plist
  - locationClients
    - [base]/Library/Caches/locationd/clients.plist
  - userSettings
    - [base]/Library/ConfigurationProfiles/UserSettings.plist
    - [base]/Library/ConfigurationProfiles/EffectiveUserSettings.plist
    - [base]/Library/ConfigurationProfiles/PublicInfo/PublicEffectiveUserSettings.plist
  - other plists
    - [base]/Library/Preferences
  - logs
    - ~/Library/Logs/CoreSimulator/[identifier]/
    - sym linked to [base]/Library/Logs
