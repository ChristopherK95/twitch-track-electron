import { AppInfo, Platform, Streamer, StreamerResult, StreamResponse } from './interfaces/StreamerContext';

declare global {
  interface Window {
    api: {
      getSettings: (channel: string) => void;
      fetchChannels: (channel: string, arg: string) => void;
      getNewToken: (channel: string) => void;
      getAppInfo: (channel: string, args: AppInfo) => void;
      fetching: (channel: string, func: (isFetching: boolean) => void) => void;
      loading: (channel: string, func: (isLoading: boolean) => void) => void;
      savedSize: (channel: string, func: () => void) => void;
      splashUpdates: (channel: string, func: (data: string) => void) => void;
      progress: (channel: string, func: (event: { progress: number; max: number }) => void) => void;
      awaitStatus: (channel: string, func: (event: { tag: string; data: StreamResponse }) => void) => void;
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
      deleteStreamer: (channel: string, data: StreamerResult) => void;
      minimizeApp: (channel: string) => void;
      closeApp: (channel: string) => void;
    };
  }
}
export {};
