import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State, Streamer, StreamerResult } from '../../interfaces/StreamerContext';
import { RootState } from '../../reduxStore';
import { Misc, StyledBell, StyledCog, StyledStreamersView, TopbarBtn } from './Styles';
import SearchBar from '../search-bar/SearchBar';
import SearchResults from '../search-results/SearchResults';
import Cog from '../../svg/Cog';
import Bell from '../../svg/Bell';
import NotifFx from '../../audio/NotificationSound.wav';
import useNotify from '../../hooks/use-notify';
import useMode from '../../hooks/use-mode';
import StreamerContainer from '../streamer-container/StreamerContainer';
import Spinner from '../spinner/Spinner';

const StreamersView = (props: {
  tokenMissing: boolean;
  hideSearchBar: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [oldStreamers, setOldStreamers] = useState<Streamer[]>([]);
  const [fetching, setFetching] = useState(false);
  const { notify } = useNotify();
  const { changeMode } = useMode();

  const { hideSearchBar, search, setSearch, tokenMissing } = props;
  const state = useSelector((state: RootState) => state.state.state);
  const [resultArr, setResultArr] = useState<StreamerResult[]>([]);
  const [savedStreamers, setSavedStreamers] = useState<StreamerResult[]>([]);
  const [hideOffline, toggleOffline] = useState<boolean>(false);
  const notifFx = new Audio(NotifFx);

  // Makes an API request to Twitch for channels/streamers that match given search param.
  const fetchStreamers = async (name: string) => {
    const response = await window.api.fetchChannels('fetchChannels', name);
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
      setStreamers(data);
      setTimeout(() => {
        setFetching(false);
      }, 2000);
    });

    window.api.fetching('fetching', () => setFetching(true));

    window.api.rendererReady('rendererReady');
  }, []);

  return (
    <StyledStreamersView visible={state === State.main || state === State.search}>
      <Misc>
        <TopbarBtn onClick={() => changeMode(State.settings)}>
          Settings
          <StyledCog>
            <Cog />
          </StyledCog>
        </TopbarBtn>
        <TopbarBtn onClick={() => changeMode(State.notifications)}>
          Notifications
          <StyledBell>
            <Bell />
          </StyledBell>
        </TopbarBtn>
        {fetching && <Spinner />}
      </Misc>
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

