import { contextBridge, ipcRenderer } from "electron";
import { StreamerResult } from "./interfaces/StreamerContext";

contextBridge.exposeInMainWorld("api", {
  send: (channel: string, data: string) => {
    const validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: any) => {
    const validChannels = ["fromMain"];
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
  askStatus: (channel: string, data: StreamerResult) => {
    const validChannels = ["askStatus"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  awaitStatus: (channel: string, func: any) => {
    const validChannels = ["awaitStatus"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  saveStreamer: (channel: string, data: StreamerResult[]) => {
    const validChannels = ["saveStreamer"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
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
  getToken: (channel: string) => {
    const validChannels = ["getToken"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel);
    }
  },
  awaitToken: (channel: string, func: any) => {
    const validChannels = ["awaitToken"];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
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
