import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CloseBtn,
  ContentArea,
  Handle,
  Main,
  MinimizeBtn,
  MissingToken,
  StyledMainWindow,
  TitleBar,
  TitleBarBtns,
  TopBar
} from './Styles';
import { RootState } from '../../reduxStore';
import { Platform, State } from '../../interfaces/StreamerContext';
import Notifications from '../new-notification/Notifications';
import Settings from '../settings/Settings';
import NotificationsView from '../notifications-view/NotificationsView';
import StreamersView from '../streamers-view/StreamersView';
import useNotify from '../../hooks/use-notify';
import useMode from '../../hooks/use-mode';

const MainWindow = () => {
  const state = useSelector((state: RootState) => state.state.state);
  const { notify } = useNotify();
  const { changeMode } = useMode();

  // Boolean state for whether to show search results or not.
  const [hideOffline, toggleOffline] = useState<boolean>(false);
  const [tokenMissing, setTokenMissing] = useState<boolean>(false);
  const [hideSearchBar, toggleSearchBar] = useState<boolean>(false);
  // const [savedSize, setSavedSize] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [platform, setPlatform] = useState<Platform>(Platform.windows);

  // Toggles the tokenMissing state if the current token is empty or expired.
  useEffect(() => {
    window.api.tokenMissing('tokenMissing', () => {
      setTokenMissing(true);
    });

    window.api.savedSize('saved-size', () => {
      notify('Saved windows size', true, false);
    });

    window.api.os('os', (os: Platform) => {
      setPlatform(os);
    });

    window.api.updateAvailable('update-available', (update: string) => {
      notify(`Update ${update} available`, true, false);
    });
  }, []);

  return (
    <StyledMainWindow>
      {platform === Platform.windows && (
        <TopBar>
          <TitleBar>
            <Handle>TwitchTrack</Handle>
          </TitleBar>
          <TitleBarBtns>
            <MinimizeBtn onClick={() => window.api.minimizeApp('minimizeApp')}>
              <div />
            </MinimizeBtn>
            <CloseBtn onClick={() => window.api.closeApp('closeApp')}>
              <div />
              <div />
            </CloseBtn>
          </TitleBarBtns>
        </TopBar>
      )}
      <Main>
        <ContentArea>
          {tokenMissing && state === State.main && (
            <MissingToken onClick={() => changeMode(State.settings)}>
              OAuth token is either empty or expired
            </MissingToken>
          )}
          <Notifications />
          <Settings
            hideSearchBar={hideSearchBar}
            toggleSearchBar={toggleSearchBar}
            hideOffline={hideOffline}
            toggleOffline={toggleOffline}
            setTokenMissing={setTokenMissing}
            visible={state === State.settings}
          />
          <NotificationsView />
          <StreamersView
            hideSearchBar={hideSearchBar}
            search={search}
            setSearch={setSearch}
            tokenMissing={tokenMissing}
          />
        </ContentArea>
      </Main>
    </StyledMainWindow>
  );
};

export default MainWindow;
