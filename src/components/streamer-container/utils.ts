import { Streamer } from '../../interfaces/StreamerContext';

export function wentLive(date: string) {
  const now = new Date().getTime();
  const start = new Date(date).getTime();

  // Return true if time since live is less than 1 minute.
  return (now - start) / 1000 / 60 < 1;
}

export function wentOffline(date?: number) {
  if (!date) {
    return false;
  }

  const now = new Date().getTime();

  // Return true if time since live is less than 1 minute.
  return (date - now) / 1000 / 60 < 1;
}

export const filterRecentlyLive = (streamers: Streamer[]) => streamers.filter((s) => s.live && wentLive(s.started));
export const filterRecentlyOffline = (streamers: Streamer[]) =>
  streamers.filter((s) => !s.live && wentOffline(s.ended));
export const filterLive = (streamers: Streamer[]) => streamers.filter((s) => s.live && !wentLive(s.started));
export const filterOffline = (streamers: Streamer[]) => streamers.filter((s) => !s.live && !wentOffline(s.ended));
