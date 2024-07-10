import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State, Streamer, StreamerResult } from '../../interfaces/StreamerContext';
import { RootState } from '../../reduxStore';
import { StyledStreamersView } from './Styles';
import SearchBar from '../search-bar/SearchBar';
import SearchResults from '../search-results/SearchResults';
import NotifFx from '../../audio/NotificationSound.wav';
import useNotify from '../../hooks/use-notify';
import StreamerContainer from '../streamer-container/StreamerContainer';

const StreamersView = (props: {
  tokenMissing: boolean;
  hideSearchBar: boolean;
  toggleSearchBar: () => void;
  search: string;
  setSearch: (s: string) => void;
}) => {
  const { hideSearchBar, toggleSearchBar, search, setSearch, tokenMissing } = props;
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [oldStreamers, setOldStreamers] = useState<Streamer[]>([]);
  const [fetching, setFetching] = useState(false);
  const { notify } = useNotify();
  const state = useSelector((state: RootState) => state.state.state);
  const [resultArr, setResultArr] = useState<StreamerResult[]>([]);
  const [savedStreamers, setSavedStreamers] = useState<StreamerResult[]>([]);
  const [hideOffline, toggleOffline] = useState<boolean>(false);
  const notifFx = new Audio(NotifFx);

  // Makes an API request to Twitch for channels/streamers that match given search param.
  const fetchStreamers = async (name: string) => {
    const response = await window.api.fetchChannels('fetchChannels', name);
    response.sort((a, b) => {
      if (a.name.toLowerCase() === name.toLowerCase()) {
        return -1
      }
      if (b.name.toLowerCase() === name.toLowerCase()) {
        return 1
      }

      return 0
    })
    setResultArr(response);
  };

  const nativeNotification = (live: boolean, name: string, imgUrl: string) => {
    if (live) {
      const notifNative = new Notification(name, {
        body: 'went live!',
        icon: imgUrl,
        silent: true
      });
      notifNative.onclick = (event) => {
        event.preventDefault();
        window.api.openStream('openStream', name);
      };
    } else {
      new Notification(name, {
        body: 'went offline',
        icon: imgUrl,
        silent: true
      });
    }
  };

  useEffect(() => {
    if (oldStreamers.length > 0) {
      const newArr = JSON.stringify(streamers);
      const oldArr = JSON.stringify(oldStreamers);
      if (newArr !== oldArr) {
        const newOnline = streamers.filter((streamer) => streamer.live === true);
        const newOffline = streamers.filter((streamer) => streamer.live === false);

        const notifyOnline = [];
        for (let i = 0; i < newOnline.length; i++) {
          const wentOnline = oldStreamers.find((old) => old.id === newOnline[i].id && old.live === false);
          if (wentOnline) {
            notifyOnline.push(wentOnline);
          }
        }
        const notifyOffline = [];
        for (let i = 0; i < newOffline.length; i++) {
          const wentOffline = oldStreamers.find((old) => old.id === newOffline[i].id && old.live === true);
          if (wentOffline) {
            notifyOffline.push(wentOffline);
          }
        }

        for (let i = 0; i < notifyOnline.length; i++) {
          notify(notifyOnline[i].name, true, true);
          nativeNotification(true, notifyOnline[i].name, notifyOnline[i].imgUrl);
        }
        for (let i = 0; i < notifyOffline.length; i++) {
          notify(notifyOffline[i].name, false, true);
          nativeNotification(false, notifyOffline[i].name, notifyOffline[i].imgUrl);
        }

        if (notifyOnline.length > 0 || notifyOffline.length > 0) {
          notifFx.play();
        }
      }
    }
    setOldStreamers(streamers);
  }, [streamers]);

  useEffect(() => {
    window.api.loadStreamers('loadStreamers', (data: Streamer[]) => {
      const wasOnline = streamers.filter(s => s.live).map(s => s.id)
      const updated: Streamer[] = data.map(s =>
        !s.live &&
          wasOnline.includes(s.id)
          ? ({ ...s, ended: new Date().getTime() }) : s)
      setStreamers(updated);

      setTimeout(() => {
        setFetching(false);
      }, 2000);
    });

    window.api.fetching('fetching', () => setFetching(true));

    window.api.rendererReady('rendererReady');
  }, []);

  return (
    <StyledStreamersView $visible={state === State.main || state === State.search}>
      <SearchBar
        fetch={fetchStreamers}
        tokenMissing={tokenMissing}
        hideSearchBar={hideSearchBar}
        search={search}
        setSearch={setSearch}
      />
      <>
        <StreamerContainer
          hideOffline={hideOffline}
          toggleOffline={toggleOffline}
          streamers={streamers}
          setStreamers={(s) => setStreamers(s)}
          fetching={fetching}
          toggleSearchBar={toggleSearchBar}
        />
        <SearchResults
          searchResults={resultArr}
          savedStreamers={savedStreamers}
          saveStreamer={setSavedStreamers}
          streamers={streamers}
        />
      </>
    </StyledStreamersView>
  );
};

export default StreamersView;
