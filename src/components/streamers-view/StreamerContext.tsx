import { createContext, useContext, useEffect, useState } from "react";
import { Streamer } from "../../interfaces/StreamerContext";
import React from "react";

interface IStreamerContext {
  streamers: Streamer[]
  isFetching: boolean
  deleteStreamer: (id: string) => void
  getCount: (type: 'live' | 'offline') => number
}

const StreamerContext = createContext<IStreamerContext>({
  streamers: [],
  isFetching: false,
  deleteStreamer: () => { },
  getCount: () => 0
})

export const StreamerContextProvider = (props: { children: React.ReactNode }) => {
  const [streamers, setStreamers] = useState<Streamer[]>([])
  const [isFetching, setFetching] = useState<boolean>(false)

  const deleteStreamer = (id: string) => {
    // Checks if streamer is currently live and removes them from liveStreamers first if true.
    setStreamers(streamers.filter((streamer) => streamer.id !== id));
    const streamer = streamers.find((s) => s.id === id);
    if (streamer) {
      window.api.deleteStreamer('deleteStreamer', streamer);
    }
  };

  const getCount = (type: 'live' | 'offline') => 
    streamers.filter(s => type === 'live' ? s.live : !s.live).length

  useEffect(() => {
    window.api.loadStreamers('loadStreamers', (data: Streamer[]) => {
      const wasOnline = streamers.filter((s) => s.live).map((s) => s.id);
      const updated: Streamer[] = data.map((s) =>
        !s.live && wasOnline.includes(s.id) ? { ...s, ended: new Date().getTime() } : s
      );
      setStreamers(updated);

      setTimeout(() => {
        setFetching(false);
      }, 2000);
    });

    window.api.fetching('fetching', () => setFetching(true));

    window.api.rendererReady('rendererReady');
  }, []);

  return <StreamerContext.Provider value={{
    streamers,
    isFetching,
    deleteStreamer,
    getCount,
  }}>{props.children}</StreamerContext.Provider>
}

export const useStreamerContext = () => {
  const context = useContext(StreamerContext)

  return context
}
