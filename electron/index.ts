import { app, BrowserWindow, ipcMain, shell } from 'electron';
import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';
import path from 'path';
import log from 'electron-log';
import AutoLaunch from 'auto-launch';
import {
  StreamerResult,
  ChannelResponse,
  Channel,
  StreamResponse,
  Settings,
  Platform,
  AppInfo,
  Streamer
} from './StreamerContext';
import { OAuth } from './OAuth';
import {
  AssureFileExists,
  AssureSettingsExists,
  CheckIfExists,
  LoadSettings,
  ReadFile,
  WriteToFile
} from './file-handler';

log.info(__dirname);

const autoLauncher = new AutoLaunch({
  name: 'TwitchTrack'
});

app.disableDomainBlockingFor3DAPIs();

if (process.platform === Platform.windows) {
  app.setAppUserModelId(app.name);
}

let mainWindow: BrowserWindow;
let splash: BrowserWindow;
let settings: Settings;
let APItoken = '';
const ClientID = 'p4dvj9r4r5jnih8uq373imda1n2v0j';
let fullPath: string;

if (process.platform === Platform.windows) {
  fullPath = path.join(process.env.APPDATA as string, '\\', 'TwitchTrack-elctrn');
}
if (process.platform === 'linux') {
  fullPath = `${app.getPath('appData')}/TwitchTrack-elctrn`;
}
const streamers: Streamer[] = [];

log.transports.file.level = 'info';
log.transports.file.resolvePath = () => path.join(fullPath, 'log.log');

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).

// Checks and makes sure that all necessary files are either present or created.
export function checkFiles() {
  if (!fs.existsSync(fullPath)) {
    fs.mkdir(fullPath, (err) => {
      if (err) {
        log.info('mkDirError:', err);
      }
    });
  }

  AssureFileExists('streamers.json');
  AssureSettingsExists();
  settings = LoadSettings();

  let updatedSettings = false;
  if (!settings.Token) {
    settings.Token = '';
    updatedSettings = true;
  }
  if (!settings.AutoStart) {
    settings.AutoStart = false;
    updatedSettings = true;
  }
  if (!settings.StartSize) {
    settings.StartSize = { x: 400, y: 600 };
    updatedSettings = true;
  }

  if (updatedSettings) {
    const json = JSON.stringify(settings);
    WriteToFile('settings.json', json);
  }

  APItoken = settings.Token;
  if (settings.AutoStart) {
    autoLauncher
      .isEnabled()
      .then((isEnabled) => {
        if (!isEnabled) autoLauncher.enable();
      })
      .catch((err) => {
        log.info('AutoLaunchError', err);
      });
  }
}

// Saves changes to settings (currently only APItoken).
export function saveSettings() {
  if (CheckIfExists('settings.json')) {
    WriteToFile('settings.json', JSON.stringify(settings));
  } else {
    const newSettings = { Token: '', AutoStart: false };
    const json = JSON.stringify(newSettings);
    WriteToFile('settings.json', json);
  }
}

const createWindow = (): void => {
  checkFiles();

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: settings.StartSize?.x ?? 400,
    height: settings.StartSize?.y ?? 600,
    minWidth: 400,
    minHeight: 600,
    maxWidth: 600,
    show: true,
    backgroundColor: '#262626',
    icon: path.join(__dirname, '../src/images/Logo.ico'),
    frame: process.platform === 'linux',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: app.isPackaged ? false : true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.removeMenu();

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.loadURL(!app.isPackaged ? 'http://localhost:3000/' : `file://${__dirname}/../src/out/index.html`);

  mainWindow.on('ready-to-show', () => {
    // splash.destroy();
    mainWindow.show();
    mainWindow.webContents.send('get-version', app.getVersion());
    mainWindow.webContents.send('os', process.platform);
  });

  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLocaleLowerCase() === 's') {
      const startSize = mainWindow.getSize();
      settings.StartSize = { x: startSize[0], y: startSize[1] };
      mainWindow.webContents.send('saved-size');
      saveSettings();
      event.preventDefault();
    }
    if (input.control && input.key.toLocaleLowerCase() === 'r') {
      app.relaunch();
      app.quit();
    }
  });
};

const createSplash = (): void => {
  splash = new BrowserWindow({
    width: 300,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: app.isPackaged,
      preload: path.join(__dirname, 'preload.ts')
    }
  });
  splash.loadURL(
    app.isPackaged ? `file://${__dirname}/../../dist-renderer/index.html` : 'http://localhost:1234/#/Splash'
  );

  if (app.isPackaged) {
    // autoUpdater.checkForUpdates();
    createWindow();
  } else {
    splash.webContents.openDevTools();
    setTimeout(() => {
      createWindow();
    }, 3000);
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createSplash();
  }
});

/*
 FUNCTIONS
*/

// async function checkNewVersion() {
//   const res = await fetch(
//     "https://api.github.com/repos/ChristopherK95/twitch-track-electron/releases/latest",
//     {
//       method: "GET",
//     }
//   );
//   if (res) {
//     const { tag_name } = (await res.json()) as { tag_name: string };
//     const version = tag_name.replace("v", "");
//     if (app.getVersion() !== version) {
//       mainWindow.webContents.send("updateAvailable", version);
//     }
//   }
// }

// Fetches one or more streamers live status based on the given user-ids in the URL.
async function getStreamerStatus(arg: Streamer[] | Streamer): Promise<StreamResponse> {
  let url: string;
  if (Array.isArray(arg) && arg.length) {
    url = `https://api.twitch.tv/helix/streams?user_id=${arg[0].id}`;
    if (arg.length > 1) {
      for (let i = 1; i < arg.length; i++) {
        url += `&user_id=${arg[i].id}`;
      }
    }
  } else if (!Array.isArray(arg)) {
    url = `https://api.twitch.tv/helix/streams?user_id=${arg.id}`;
  } else {
    return { data: [] };
  }

  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'client-id': ClientID,
      Authorization: `Bearer ${APItoken}`
    }
  });
  if (data.ok) {
    const res = (await data.json()) as StreamResponse;
    return { data: res.data };
  }

  log.info(`getStreamerStatus unable to fetch data - ${data.status}`);
  mainWindow.webContents.send('tokenMissing');
  return { data: [] };
}

let interval: NodeJS.Timer;
// Updates streamers live status every minute.
async function continousUpdate() {
  clearInterval(interval);

  interval = setInterval(async () => {
    if (streamers.length === 0) return;
    mainWindow.webContents.send('fetching');
    const response = await getStreamerStatus(streamers);

    for (let i = 0; i < streamers.length; i++) {
      streamers[i].title = '';
      streamers[i].category = '';
      streamers[i].started = '';
      streamers[i].viewers = undefined;
      streamers[i].live = false;
    }
    for (let i = 0; i < response.data.length; i++) {
      const index = streamers.findIndex((streamer) => streamer.id === response.data[i].user_id);
      streamers[index].title = response.data[i].title;
      streamers[index].category = response.data[i].game_name;
      streamers[index].started = response.data[i].started_at;
      streamers[index].viewers = response.data[i].viewer_count;
      streamers[index].live = true;
    }

    mainWindow.webContents.send('loadStreamers', streamers);
  }, 60000);
}

// Fetches an array of streamers related to the query in the URL.
async function fetchStreamers(name: string): Promise<ChannelResponse> {
  mainWindow.webContents.send('loading', true);
  const result = await fetch(`https://api.twitch.tv/helix/search/channels?query=${name}`, {
    method: 'GET',
    headers: {
      'client-id': ClientID,
      Authorization: `Bearer ${APItoken}`
    }
  });
  const data = (await result.json()) as ChannelResponse;
  mainWindow.webContents.send('loading', false);

  return { data: data.data };
}

// Downloads streamers thumbnail images in base64 format.
async function getImages(url: string) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-promise-executor-return
    return https.get(url, (res) => {
      res.setEncoding('base64');
      let data = `data: ${res.headers['content-type']} ;base64,`;
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
  });
}

/*
// ----------> IPCMAIN EVENTS <---------- //
*/

/*
// Handle events. //
*/

ipcMain.handle('getSettings', async () => {
  return settings;
});

ipcMain.handle('fetchChannels', async (_, data) => {
  const result: ChannelResponse = await fetchStreamers(data);
  const streamerArr: StreamerResult[] = [];
  let currentProgress = 1;
  const max = result.data.length;
  const responses = await Promise.all(
    result.data.map(async (streamer: Channel) => {
      const res = await getImages(streamer.thumbnail_url);
      mainWindow.webContents.send('progress', {
        progress: currentProgress++,
        max
      });
      return Promise.resolve(res);
    })
  );
  // let i = 0;
  for (let i = 0; i < responses.length; i++) {
    const imgData = responses[i] as { body: string };
    const streamer: StreamerResult = {
      id: result.data[i].id,
      name: result.data[i].display_name,
      imgUrl: imgData.body
    };
    streamerArr.push(streamer);
  }
  // responses.forEach((res: { body: string }, index) => {
  //   const streamer: StreamerResult = {
  //     id: result.data[index].id,
  //     name: result.data[index].display_name,
  //     imgUrl: res.body,
  //   };
  //   streamerArr.push(streamer);
  // });

  return streamerArr;
});

ipcMain.handle('getNewToken', async () => {
  APItoken = await OAuth();
  settings.Token = APItoken;
  saveSettings();
  // if (streamers.length > 0) {
  //   const response = await getStreamerStatus(streamers);
  //   if (response.data.length > 0) {
  //     mainWindow.webContents.send('awaitStatus', {
  //       tag: '!update',
  //       data: response
  //     });
  //   }
  // }

  const response = await getStreamerStatus(streamers);

  for (let i = 0; i < response.data.length; i++) {
    const index = streamers.findIndex((streamer) => streamer.id === response.data[i].user_id);
    streamers[index].title = response.data[i].title;
    streamers[index].category = response.data[i].game_name;
    streamers[index].started = response.data[i].started_at;
    streamers[index].viewers = response.data[i].viewer_count;
    streamers[index].live = true;
  }

  mainWindow.webContents.send('loadStreamers', streamers);

  continousUpdate();
  return APItoken;
});

ipcMain.handleOnce('getAppInfo', async () => {
  const info: AppInfo = {
    currentVersion: app.getVersion(),
    latestVersion: '',
    availableVersion: false
  };
  const res = await fetch('https://api.github.com/repos/ChristopherK95/twitch-track-electron/releases/latest', {
    method: 'GET'
  });
  // eslint-disable-next-line camelcase
  const { tag_name } = (await res.json()) as { tag_name: string };
  // eslint-disable-next-line camelcase
  const version = tag_name.replace('v', '');
  info.latestVersion = version;
  const latestVersionSplit = version.split('.');
  const appVersionSplit = app.getVersion().split('.');
  for (let i = 0; i < latestVersionSplit.length; i++) {
    if (latestVersionSplit[i] > appVersionSplit[i]) {
      info.availableVersion = true;
      break;
    }
    if (latestVersionSplit[i] < appVersionSplit[i]) {
      break;
    }
  }

  return info;
});

/*
// On events. //
*/

ipcMain.on('update', () => {
  shell.openExternal('https://github.com/ChristopherK95/twitch-track-electron/releases/latest');
});

ipcMain.on('toggleAutoStart', () => {
  settings.AutoStart = !settings.AutoStart;
  if (settings.AutoStart) {
    autoLauncher.enable();
  } else {
    autoLauncher.disable();
  }
  saveSettings();
});

ipcMain.on('openVersion', () => {
  shell.openExternal(`https://github.com/ChristopherK95/twitch-track-electron/releases/tag/v${app.getVersion()}`);
});

ipcMain.on('openRepo', () => {
  shell.openExternal('https://github.com/ChristopherK95/twitch-track-electron');
});

ipcMain.on('openStream', (_, name: string) => {
  shell.openExternal(`https://twitch.tv/${name}`);
});

ipcMain.on('saveStreamer', async (_, data: Streamer[]) => {
  if (!fs.existsSync(fullPath)) {
    fs.mkdir(fullPath, (err) => {
      if (err) {
        log.info('makeDirError:', err);
      }
    });
  }

  streamers.push(data[data.length - 1]);
  for (let i = 0; i < streamers.length; i++) {
    streamers[i].title = '';
    streamers[i].category = '';
    streamers[i].started = '';
    streamers[i].viewers = undefined;
    streamers[i].live = false;
  }

  const response = await getStreamerStatus(streamers);

  for (let i = 0; i < response.data.length; i++) {
    const index = streamers.findIndex((streamer) => streamer.id === response.data[i].user_id);
    streamers[index].title = response.data[i].title;
    streamers[index].category = response.data[i].game_name;
    streamers[index].started = response.data[i].started_at;
    streamers[index].viewers = response.data[i].viewer_count;
    streamers[index].live = true;
  }

  mainWindow.webContents.send('loadStreamers', streamers);

  const json = JSON.stringify(
    streamers.map(
      (streamer) =>
        ({
          id: streamer.id,
          name: streamer.name,
          imgUrl: streamer.imgUrl
        } as StreamerResult)
    )
  );

  WriteToFile('streamers.json', json);
});

ipcMain.on('deleteStreamer', async (_, data: Streamer) => {
  for (let i = 0; i < streamers.length; i++) {
    if (streamers[i].id === data.id) {
      streamers.splice(i, 1);
    }
  }

  const json = JSON.stringify(streamers);
  WriteToFile('streamers.json', json);
});

// Waits for the renderer to call it. Then loads saved streamers and
// fetches their live status which are then sent to the renderer.
ipcMain.once('rendererReady', async () => {
  const data = ReadFile('streamers.json');
  const arr: StreamerResult[] = JSON.parse(data);

  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      streamers.push({
        id: arr[i].id,
        name: arr[i].name,
        imgUrl: arr[i].imgUrl,
        category: '',
        title: '',
        started: '',
        viewers: undefined,
        live: false
      } as Streamer);
    }

    const response = await getStreamerStatus(streamers);

    for (let i = 0; i < response.data.length; i++) {
      const index = streamers.findIndex((streamer) => streamer.id === response.data[i].user_id);
      streamers[index].title = response.data[i].title;
      streamers[index].category = response.data[i].game_name;
      streamers[index].started = response.data[i].started_at;
      streamers[index].viewers = response.data[i].viewer_count;
      streamers[index].live = true;
    }
    mainWindow.webContents.send('loadStreamers', streamers);
  }
  if (APItoken === '') {
    mainWindow.webContents.send('tokenMissing');

    return;
  }

  continousUpdate();
});

ipcMain.on('minimizeApp', () => {
  mainWindow.minimize();
});

ipcMain.on('closeApp', () => {
  mainWindow.close();
  app.quit();
});
