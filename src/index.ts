import { app, BrowserWindow, ipcMain, autoUpdater } from "electron";
import fetch from "electron-fetch";
import {
  StreamerResult,
  ChannelResponse,
  Channel,
  StreamResponse,
} from "./interfaces/StreamerContext";
import { OAuth } from "./OAuth";
import https from "https";
import fs from "fs";
import path from "path";
import log from "electron-log";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

let mainWindow: BrowserWindow;
let splash: BrowserWindow;

if (app.isPackaged) {
  const server = "https://twitch-track-vercel.vercel.app";
  const url = `${server}/update/${process.platform}/${app.getVersion()}`;

  autoUpdater.setFeedURL({ url });

  autoUpdater.on("error", (err) => {
    log.info("autoUpdaterError:", err);
    createWindow();
  });

  autoUpdater.on("checking-for-update", () => {
    splash.webContents.send("looking-for-updates", "Looking for updates...");
  });

  autoUpdater.on("update-not-available", () => {
    createWindow();
  });

  autoUpdater.on("update-available", () => {
    splash.webContents.send("update-available", "New update found!");
  });

  autoUpdater.on("update-downloaded", () => {
    splash.webContents.send("update-completed", "Update completed!");
    autoUpdater.quitAndInstall();
  });
}

interface Settings {
  Token: string;
}

let Settings: Settings;
let APItoken = "";
const ClientID = "p4dvj9r4r5jnih8uq373imda1n2v0j";
const fullPath = path.join(process.env.APPDATA, "\\", "TwitchTrack-elctrn");
const streamers: StreamerResult[] = [];

log.transports.file.level = "info";
log.transports.file.resolvePath = () => path.join(fullPath, "log.log");

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    maxWidth: 600,
    minWidth: 400,
    minHeight: 600,
    show: false,
    backgroundColor: "#262626",
    icon: "../images/icon.png",
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  checkFiles();
  // and load the index.html of the app.
  mainWindow.loadURL(
    MAIN_WINDOW_WEBPACK_ENTRY + `${app.isPackaged ? "#/App" : "/#/App"}`
  );

  mainWindow.webContents.once("did-finish-load", () => {
    splash.destroy();
    mainWindow.show();
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
      devTools: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  splash.loadURL(
    MAIN_WINDOW_WEBPACK_ENTRY + `${app.isPackaged ? "#/Splash" : "/#/Splash"}`
  );

  if (app.isPackaged) {
    autoUpdater.checkForUpdates();
  } else {
    setTimeout(() => {
      createWindow();
    }, 4000);
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createSplash);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createSplash();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

function checkFiles() {
  if (!fs.existsSync(fullPath)) {
    fs.mkdir(fullPath, (err) => {
      if (err) {
        log.info("mkDirError:", err);
      }
    });
  }
  if (!fs.existsSync(path.join(fullPath, "\\", "streamers.json"))) {
    fs.writeFile(path.join(fullPath, "\\", "streamers.json"), "[]", (err) => {
      log.info("writeFileError:", err);
    });
  }

  if (!fs.existsSync(path.join(fullPath, "\\", "settings.json"))) {
    const json = JSON.stringify({ Token: "" });
    fs.writeFileSync(path.join(fullPath, "\\", "settings.json"), json);
  }
  Settings = JSON.parse(
    fs.readFileSync(path.join(fullPath, "\\", "settings.json"), "utf8")
  );
  APItoken = Settings.Token;
}

function saveSettings() {
  const settingsPath = path.join(fullPath, "\\", "settings.json");
  if (!fs.existsSync(settingsPath)) {
    const json = JSON.stringify({ Token: "" });
    fs.writeFileSync(settingsPath, json);
  }
  fs.writeFileSync(settingsPath, JSON.stringify(Settings));
}

// Updates streamers live status every minute.
async function continousUpdate() {
  setInterval(async () => {
    if (streamers.length === 0) return;
    const response: StreamResponse = await getStreamerStatus(streamers);
    if (response.data.length > 0) {
      mainWindow.webContents.send("awaitStatus", response);
    }
  }, 60000);
}

// Fetches an array of streamers related to the query in the URL.
async function fetchStreamers(name: string): Promise<ChannelResponse> {
  let result;
  await fetch("https://api.twitch.tv/helix/search/channels?query=" + name, {
    method: "GET",
    headers: {
      "client-id": ClientID,
      Authorization: "Bearer " + APItoken,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      result = res;
    })
    .catch((err) => {
      log.info("FetchStreamersError:", err);
    });

  return result;
}

// Fetches one or more streamers live status based on the given user-ids in the URL.
async function getStreamerStatus(
  arg: StreamerResult[] | StreamerResult
): Promise<StreamResponse> {
  let result;
  let url: string;
  if (Array.isArray(arg)) {
    url = `https://api.twitch.tv/helix/streams?user_id=${arg[0].id}`;
    if (arg.length > 1) {
      for (let i = 1; i < arg.length; i++) {
        url += `&user_id=${arg[i].id}`;
      }
    }
  } else {
    url = `https://api.twitch.tv/helix/streams?user_id=${arg.id}`;
  }

  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "client-id": ClientID,
        Authorization: "Bearer " + APItoken,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        result = res;
      })
      .catch((err) => {
        log.info("FetchError:", err);
      });
  } catch (error) {
    log.info("GetStreamerStatusError:", error);
  }

  return result;
}

// Downloads streamers thumbnail images in base64 format.
function getImages(url: string) {
  return new Promise((resolve) => {
    return https.get(url, (res) => {
      res.setEncoding("base64");
      let data = "data:" + res.headers["content-type"] + ";base64,";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });
  });
}

//*************************************** //
// ----------> IPCMAIN EVENTS <---------- //
//*************************************** //

ipcMain.on("toMain", async (event, data) => {
  const result: ChannelResponse = await fetchStreamers(data);
  const streamerArr: StreamerResult[] = [];

  let currentProgress = 1;
  const max = result.data.length;
  const responses = await Promise.all(
    result.data.map((streamer: Channel) => {
      return getImages(streamer.thumbnail_url).then((res) => {
        event.reply("progress", { progress: currentProgress++, max: max });
        return Promise.resolve(res);
      });
    })
  );
  responses.forEach((res: any, index) => {
    const streamer: StreamerResult = {
      id: result.data[index].id,
      name: result.data[index].display_name,
      imgUrl: res.body,
    };
    streamerArr.push(streamer);
  });
  event.reply("fromMain", streamerArr);
});

ipcMain.on("saveStreamer", async (event, data: StreamerResult[]) => {
  if (!fs.existsSync(fullPath)) {
    fs.mkdir(fullPath, (err) => {
      if (err) {
        log.info("makeDirError:", err);
      }
    });
  }
  streamers.push(data[data.length - 1]);
  const response = await getStreamerStatus(streamers);
  mainWindow.webContents.send("awaitStatus", response);

  const json = JSON.stringify(data);

  fs.writeFile(path.join(fullPath, "\\", "streamers.json"), json, (err) => {
    if (err) {
      log.info("writeFileError:", err);
    }
  });
});

ipcMain.on("deleteStreamer", async (event, data: StreamerResult) => {
  for (let i = 0; i < streamers.length; i++) {
    if (streamers[i].id === data.id) {
      streamers.splice(i, 1);
    }
  }

  const json = JSON.stringify(streamers);

  fs.writeFile(path.join(fullPath, "\\", "streamers.json"), json, (err) => {
    if (err) {
      log.info("writeFileError:", err);
    }
  });
});

ipcMain.on("getToken", async (event) => {
  APItoken = await OAuth();
  console.log("Token", APItoken);
  Settings.Token = APItoken;
  saveSettings();
  event.reply("awaitToken", APItoken);
  if (streamers.length > 0) {
    const response = await getStreamerStatus(streamers);
    response.data.length > 0 &&
      mainWindow.webContents.send("awaitStatus", response);
  }

  continousUpdate();
});

// Waits for the renderer to call it. Then loads saved streamers and
// fetches their live status which are then sent to the renderer.
ipcMain.on("rendererReady", async () => {
  const data = fs.readFileSync(
    path.join(fullPath, "\\", "streamers.json"),
    "utf8"
  );
  const arr: StreamerResult[] = JSON.parse(data);
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      streamers.push(arr[i]);
    }
    mainWindow.webContents.send("loadStreamers", streamers);
    const response: any = await getStreamerStatus(streamers).catch((err) => {
      log.info("FetchError:", err);
    });

    if (response.status && response.status === 401) {
      mainWindow.webContents.send("tokenMissing");
      return;
    }
    if (response.data.length > 0) {
      mainWindow.webContents.send("awaitStatus", response);
    }
  }
  if (APItoken === "") {
    mainWindow.webContents.send("tokenMissing");
  }
  continousUpdate();
});

ipcMain.on("minimizeApp", () => {
  mainWindow.minimize();
});

ipcMain.on("closeApp", () => {
  mainWindow.close();
});