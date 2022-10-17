import { contextBridge, ipcRenderer } from 'electron';
import { AppInfo, Platform, Streamer, StreamerResult, StreamResponse } from './StreamerContext';

contextBridge.exposeInMainWorld('api', {
  /*
  // Invoke functions. //
  */

  getSettings: (channel: string) => {
    return ipcRenderer.invoke(channel);
  },
  fetchChannels: async (channel: string, arg: string) => {
    return ipcRenderer.invoke(channel, arg);
  },
  getNewToken: async (channel: string) => {
    return ipcRenderer.invoke(channel);
  },

  getAppInfo: async (channel: string, args: AppInfo) => {
    return ipcRenderer.invoke(channel, args);
  },

  /*
  // On functions. //
  */

  loading: (channel: string, func: (isLoading: boolean) => void) => {
    const validChannels = ['loading'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_, args) => func(args));
    }
  },

  savedSize: (channel: string, func: () => void) => {
    const validChannels = ['saved-size'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, () => func());
    }
  },

  splashUpdates: (channel: string, func: (data: string) => void) => {
    const validChannels = ['splash-update'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_, args) => func(args));
    }
  },

  progress: (channel: string, func: (event: { progress: number; max: number }) => void) => {
    const validChannels = ['progress'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_, args) => func(args));
    }
  },

  awaitStatus: (channel: string, func: (event: { tag: string; data: StreamResponse }) => void) => {
    const validChannels = ['awaitStatus'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_, args) => func(args));
    }
  },

  loadStreamers: (channel: string, func: (event: Streamer[]) => void) => {
    const validChannels = ['loadStreamers'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (_, args) => func(args));
    }
  },

  tokenMissing: (channel: string, func: () => void) => {
    const validChannels = ['tokenMissing'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, () => func());
    }
  },

  // awaitToken: (channel: string, func: any) => {
  //   const validChannels = ["awaitToken"];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }
  // },

  /*
  // Once functions. //
  */

  getVersion: (channel: string, func: (ver: string) => void) => {
    const validChannels = ['get-version'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (_, args) => func(args));
    }
  },

  os: (channel: string, func: (os: Platform) => void) => {
    const validChannels = ['os'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (_, args) => func(args));
    }
  },

  updateAvailable: (channel: string, func: (update: string) => void) => {
    const validChannels = ['update-available'];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (_, update: string) => func(update));
    }
  },

  /*
  // Send functions. //
  */

  update: (channel: string) => {
    const validChannels = ['update'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },

  toggleAutoStart: (channel: string) => {
    const validChannels = ['toggleAutoStart'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },

  openVersion: (channel: string) => {
    const validChannels = ['openVersion'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },

  openRepo: (channel: string) => {
    const validChannels = ['openRepo'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },

  showInfo: (channel: string) => {
    const validChannels = ['showInfo'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },

  openStream: (channel: string, data: string) => {
    const validChannels = ['openStream'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  askStatus: (channel: string, data: StreamerResult) => {
    const validChannels = ['askStatus'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  saveStreamer: (channel: string, data: StreamerResult[]) => {
    const validChannels = ['saveStreamer'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },

  getToken: (channel: string) => {
    const validChannels = ['getToken'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },

  rendererReady: (channel: string) => {
    const validChannels = ['rendererReady'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },
  deleteStreamer: (channel: string, data: StreamerResult) => {
    const validChannels = ['deleteStreamer'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  minimizeApp: (channel: string) => {
    const validChannels = ['minimizeApp'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },
  closeApp: (channel: string) => {
    const validChannels = ['closeApp'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  }
});
