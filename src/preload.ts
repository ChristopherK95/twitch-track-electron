import { contextBridge, ipcRenderer } from "electron";
import { StreamerResult } from "./interfaces/StreamerContext";

contextBridge.exposeInMainWorld("api", {
  ///////////////////////
  // Invoke functions. //
  ///////////////////////

  aquireToken: async (channel: string) => {
    const validChannels = ["aquireToken"];
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel);
    }
  },
  fetchChannels: async (channel: string, arg: string) => {
    const validChannels = ["fetchChannels"];
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, arg);
    }
  },
  getNewToken: async (channel: string) => {
    const validChannels = ["getNewToken"];
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel);
    }
  },

  ///////////////////
  // On functions. //
  ///////////////////

  splashUpdates: (channel: string, func: any) => {
    const validChannels = ["splash-update"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  progress: (channel: string, func: any) => {
    const validChannels = ["progress"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  awaitStatus: (channel: string, func: any) => {
    const validChannels = ["awaitStatus"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  loadStreamers: (channel: string, func: any) => {
    const validChannels = ["loadStreamers"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  tokenMissing: (channel: string, func: any) => {
    const validChannels = ["tokenMissing"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  awaitToken: (channel: string, func: any) => {
    const validChannels = ["awaitToken"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },

  /////////////////////
  // Once functions. //
  /////////////////////

  getVersion: (channel: string, func: (...ver: string[]) => void) => {
    const validChannels = ["get-version"];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (_, ...args) => func(...args));
    }
  },

  /////////////////////
  // Send functions. //
  /////////////////////

  openStream: (channel: string, data: string) => {
    const validChannels = ["openStream"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  askStatus: (channel: string, data: StreamerResult) => {
    const validChannels = ["askStatus"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  saveStreamer: (channel: string, data: StreamerResult[]) => {
    const validChannels = ["saveStreamer"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  getToken: (channel: string) => {
    const validChannels = ["getToken"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },

  rendererReady: (channel: string) => {
    const validChannels = ["rendererReady"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },
  deleteStreamer: (channel: string, data: StreamerResult) => {
    const validChannels = ["deleteStreamer"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  minimizeApp: (channel: string) => {
    const validChannels = ["minimizeApp"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },
  closeApp: (channel: string) => {
    const validChannels = ["closeApp"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },
});
