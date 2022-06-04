import React, { useEffect, useState } from "react";
import "../../styles/settings.css";
import { Settings, State } from "../../interfaces/StreamerContext";
import {
  Checkbox,
  ExitSettings,
  Hint,
  HintTitle,
  Info,
  Label,
  Setting,
  StyledSettings,
  Switch,
  SwitchCross,
  Title,
  Token,
} from "./Styles";
import { useDispatch } from "react-redux";

export function Settings(props: {
  hideSearchBar: boolean;
  toggleSearchBar: (hideSearch: boolean) => void;
  hideOffline: boolean;
  toggleOffline: (hideOffline: boolean) => void;
  setTokenMissing: (bool: boolean) => void;
  visible: boolean;
}) {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>("");
  const [autoStart, toggleAutoStart] = useState<boolean>();

  // Opens Info window.
  function showInfo() {
    window.api.showInfo("showInfo");
  }

  function setAutoStart(bool: boolean) {
    toggleAutoStart(bool);
    window.api.toggleAutoStart("toggleAutoStart");
  }

  async function getToken() {
    const response = await window.api.getNewToken("getNewToken");
    setToken(response);
    props.setTokenMissing(false);
  }

  async function getSettings() {
    const res: Settings = await window.api.getSettings("getSettings");
    setToken(res.Token);
    toggleAutoStart(res.AutoStart);
    if (res.Token === "") return;
    props.setTokenMissing(false);
  }

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <StyledSettings visible={props.visible}>
      <ExitSettings
        onClick={() => dispatch({ type: "changeState", payload: State.main })}
      >
        <div></div>
        <div></div>
      </ExitSettings>
      <Title>Settings</Title>
      <Setting>
        <Label>Hide the search bar</Label>
        <Checkbox
          enabled={props.hideSearchBar}
          onClick={() => props.toggleSearchBar(!props.hideSearchBar)}
        >
          <Switch enabled={props.hideSearchBar}>
            <svg>
              <SwitchCross
                enabled={props.hideSearchBar}
                d="M 5 5 L 15 15 M 15 5 L 5 15 C 2,18 2,5 6,9 L 9 12 L 15 6"
              />
            </svg>
          </Switch>
        </Checkbox>
      </Setting>
      <Setting>
        <Label>Hide the streamers that are offline</Label>
        <Checkbox
          enabled={props.hideOffline}
          onClick={() => props.toggleOffline(!props.hideOffline)}
        >
          <Switch enabled={props.hideOffline}>
            <svg>
              <SwitchCross
                enabled={props.hideOffline}
                d="M 5 5 L 15 15 M 15 5 L 5 15 C 2,18 2,5 6,9 L 9 12 L 15 6"
              />
            </svg>
          </Switch>
        </Checkbox>
      </Setting>
      <Setting>
        <Label>Open on start-up</Label>
        <Checkbox onClick={() => setAutoStart(!autoStart)} enabled={autoStart}>
          <Switch enabled={autoStart}>
            <svg>
              <SwitchCross
                enabled={autoStart}
                d="M 5 5 L 15 15 M 15 5 L 5 15 C 2,18 2,5 6,9 L 9 12 L 15 6"
              />
            </svg>
          </Switch>
        </Checkbox>
      </Setting>
      <Setting>
        <Label title="API token that is used to make API requests to Twitch">
          Token
        </Label>
        <Token onClick={getToken}>
          {token === "" ? "No OAuth token found" : token}
        </Token>
      </Setting>

      <HintTitle>Hint</HintTitle>
      <Hint>Ctrl + s to save current window size as start size</Hint>
      <Info onClick={showInfo}>Info</Info>
    </StyledSettings>
  );
}
