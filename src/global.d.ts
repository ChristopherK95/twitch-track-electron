import { AppInfo, Platform, Settings, Streamer, StreamerResult } from './interfaces/StreamerContext';

declare global {
  interface Window {
    api: {
      getSettings: (channel: string) => Settings;
      fetchChannels: (channel: string, arg: string) => StreamerResult[];
      getNewToken: (channel: string) => string;
      getAppInfo: (channel: string) => Promise<AppInfo>;
      fetching: (channel: string, func: (isFetching: boolean) => void) => void;
      savedSize: (channel: string, func: () => void) => void;
      splashUpdates: (channel: string, func: (data: string) => void) => void;
      progress: (channel: string, func: (event: { progress: number; max: number }) => void) => void;
      loadStreamers: (channel: string, func: (event: Streamer[]) => void) => void;
      tokenMissing: (channel: string, func: () => void) => void;
      getVersion: (channel: string, func: (ver: string) => void) => void;
      os: (channel: string, func: (os: Platform) => void) => void;
      updateAvailable: (channel: string, func: (update: string) => void) => void;
      update: (channel: string) => void;
      toggleAutoStart: (channel: string) => void;
      openVersion: (channel: string) => void;
      openRepo: (channel: string) => void;
      showInfo: (channel: string) => void;
      openStream: (channel: string, data: string) => void;
      askStatus: (channel: string, data: StreamerResult) => void;
      saveStreamer: (channel: string, data: StreamerResult[]) => void;
      getToken: (channel: string) => void;
      rendererReady: (channel: string) => void;
      deleteStreamer: (channel: string, data: Streamer) => void;
      minimizeApp: (channel: string) => void;
      closeApp: (channel: string) => void;
    };
  }
}
export {};
