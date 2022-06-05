import React, { useState, useEffect } from "react";
import "../styles/mainWindow.css";
import { Platform, State } from "../interfaces/StreamerContext";
import Logo from "../svg/TwitchTrackSVG.svg";
import Check from "../svg/Check.svg";
import Notifications from "./new-notification/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../reduxStore";
import { Settings } from "./settings/Settings";
import StreamersView from "./streamers-view/StreamersView";
import NotificationsView from "./notifications-view/NotificationsView";

export function MainWindow() {
  const state = useSelector((state: RootState) => state.state.state);
  const dispatch = useDispatch<AppDispatch>();

  // Boolean state for whether to show search results or not.
  const [hideOffline, toggleOffline] = useState<boolean>(false);
  const [tokenMissing, setTokenMissing] = useState<boolean>(false);
  const [hideSearchBar, toggleSearchBar] = useState<boolean>(false);
  const [savedSize, setSavedSize] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [platform, setPlatform] = useState<Platform>(Platform.windows);

  // Toggles the tokenMissing state if the current token is empty or expired.
  useEffect(() => {
    window.api.tokenMissing("tokenMissing", () => {
      setTokenMissing(true);
    });

    window.api.savedSize("saved-size", () => {
      setSavedSize(true);
      dispatch({ type: "addNotifs", name: "Saved windows size", live: true });

      setTimeout(() => {
        setSavedSize(false);
      }, 3000);
    });

    window.api.os("os", (os: Platform) => {
      setPlatform(os);
    });

    window.api.updateAvailable("update-available", (update: string) => {
      dispatch({
        type: "addNotifs",
        payload: { name: `Update ${update} available`, live: true },
      });
    });
  }, []);

  return (
    <div className="main-window">
      {platform === Platform.windows && (
        <div className="title">
          <div className="topBar">
            <div className="titleBar">
              <div className="handle">
                <i className="logo">
                  <Logo />
                </i>
                {savedSize && (
                  <div className="saved-size">
                    <p>Size saved</p>
                    <i className="check">
                      <Check />
                    </i>
                  </div>
                )}
              </div>
            </div>
            <div className="titleBarBtns">
              <button
                id="minimizeBtn"
                className="topBtn"
                onClick={() => window.api.minimizeApp("minimizeApp")}
              >
                <div></div>
              </button>
              <button
                id="closeBtn"
                className="topBtn"
                onClick={() => window.api.closeApp("closeApp")}
              >
                <div></div>
                <div></div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="main">
        <div id="contentArea">
          {tokenMissing && (
            <div
              onClick={() =>
                dispatch({ type: "changeState", payload: State.settings })
              }
              className="token-missing"
            >
              {"OAuth token is either empty or expired"}
            </div>
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
        </div>
      </div>
    </div>
  );
}
