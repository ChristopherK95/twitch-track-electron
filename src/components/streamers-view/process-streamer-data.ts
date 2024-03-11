import { Streamer } from '../../interfaces/StreamerContext';

export default (streamers: Streamer[], newStreamerData: Streamer[]) => {
  const online = newStreamerData.filter((data) => data.live && !streamers.find((s) => s.id === data.id));
  const offline = streamers.filter((s) => !newStreamerData.find((data) => data.id === s.id));

  return {
    online,
    offline
  };
};
