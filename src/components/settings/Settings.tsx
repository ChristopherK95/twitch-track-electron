import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Settings as SettingsType, State } from '../../interfaces/StreamerContext';
import {
  Checkbox,
  ExitSettings,
  Hint,
  HintTitle,
  Label,
  Setting,
  StyledSettings,
  Switch,
  Title,
  Token
} from './Styles';
import About from './about/About';
import Back from '../../svg/Back';

const Settings = (props: {
  hideSearchBar: boolean;
  toggleSearchBar: (hideSearch: boolean) => void;
  hideOffline: boolean;
  toggleOffline: (hideOffline: boolean) => void;
  setTokenMissing: (bool: boolean) => void;
  visible: boolean;
}) => {
  const { hideSearchBar, toggleSearchBar, hideOffline, toggleOffline, setTokenMissing, visible } = props;
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>('');
  const [autoStart, toggleAutoStart] = useState<boolean>(false);

  function setAutoStart(bool: boolean) {
    toggleAutoStart(bool);
    window.api.toggleAutoStart('toggleAutoStart');
  }

  async function getToken() {
    const response = await window.api.getNewToken('getNewToken');
    setToken(response);
    setTokenMissing(false);
  }

  async function getSettings() {
    const res: SettingsType = await window.api.getSettings('getSettings');
    setToken(res.Token);
    toggleAutoStart(res.AutoStart);
    if (res.Token === '') return;
    setTokenMissing(false);
  }

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <StyledSettings $visible={visible}>
      <ExitSettings onClick={() => dispatch({ type: 'changeState', payload: State.main })}>
        <Back />
      </ExitSettings>
      <Title>Settings</Title>
      <Setting>
        <Label>Hide the search bar</Label>
        <Checkbox $enabled={hideSearchBar} onClick={() => toggleSearchBar(!hideSearchBar)}>
          <Switch $enabled={hideSearchBar} />
        </Checkbox>
      </Setting>
      <Setting>
        <Label>Hide offline streamers</Label>
        <Checkbox $enabled={hideOffline} onClick={() => toggleOffline(!hideOffline)}>
          <Switch $enabled={hideOffline} />
        </Checkbox>
      </Setting>
      <Setting>
        <Label>Open on start-up</Label>
        <Checkbox onClick={() => setAutoStart(!autoStart)} $enabled={autoStart}>
          <Switch $enabled={autoStart} />
        </Checkbox>
      </Setting>
      <Setting>
        <Label title="API token that is used to make API requests to Twitch">Token</Label>
        <Token onClick={getToken}>{token === '' ? 'No OAuth token found' : token}</Token>
      </Setting>

      <HintTitle>Hint</HintTitle>
      <Hint>Ctrl + s to save current window size as start size</Hint>
      {/* <Info onClick={showInfo}>Info</Info> */}
      <About />
    </StyledSettings>
  );
};

export default Settings;
