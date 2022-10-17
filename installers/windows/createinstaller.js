/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

function getInstallerConfig() {
  console.log('creating windows installer');
  const rootPath = path.join('./');
  const outPath = path.join(rootPath, 'release-builds');

  return Promise.resolve({
    appDirectory: path.join(outPath, 'TwitchTrack-win32-x64/'),
    authors: 'Christopher Karlsson',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'TwitchTrack.exe',
    setupExe: 'TwitchTrackSetup.exe',
    loadingGif: 'InstallerGif.gif',
    setupIcon: path.join(rootPath, 'TwitchTrack64.ico'),
    iconUrl: 'https://github.com/ChristopherK95/twitch-track-electron/blob/main/images/TwitchTrack64.ico'
  });
}

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
