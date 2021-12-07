import React, { useState, useEffect } from "react";
import { SearchBar } from "./searchBar";
import { SearchResults } from "./searchResults";
import "../styles/mainWindow.css";
import {
  StreamerResult,
  Notif,
  LiveStreamer,
  Pages,
} from "../interfaces/StreamerContext";
import { StreamerContainer } from "./streamerContainer";
import { NotificationsView } from "./NotificationsView";
import { ContextMenu } from "./ContextMenu";
import { Notifications } from "./Notifications";
import { Settings } from "./Settings";
import Logo from "../svg/TwitchTrackSVG.svg";
import Cog from "../svg/Cog.svg";
import Bell from "../svg/Bell.svg";

export function MainWindow() {
  // Array that contains all the results when searching for streamers to add.
  const [resultArr, setResultArr] = useState<StreamerResult[]>([]);
  // Array that contains all saved streamers.
  const [savedStreamers, setSavedStreamers] = useState<StreamerResult[]>([]);
  // Array that contains all saved streamers that are currenlty live.
  const [liveStreamers, setLiveStreamers] = useState<LiveStreamer[]>([]);
  // Array that contains all notifications
  const [notifs, setNotifs] = useState<Notif[]>([]);
  // The state for the contextMenu.
  const [contextMenu, toggleContextMenu] = useState<{
    show: boolean;
    name: string;
    pos: { x: number; y: number };
  }>({ show: false, name: "", pos: { x: 0, y: 0 } });
  // The state for what page to show, mainPage being default.
  const [pages, setPages] = useState<Pages>({
    mainPage: true,
    notificationsPage: false,
  });
  // Boolean state for whether to show search results or not.
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  // Boolean state for whether the offline streamers should be visible or not.
  const [hideOffline, toggleOffline] = useState(false);
  // Boolean state for whether the notifications should should be visible or not.
  const [showNotifications, toggleNotifications] = useState<boolean>(false);
  // Boolean state for whether there are notifications that happened when the app was not visible.
  const [unseenNotif, setUnseenNotif] = useState<boolean>(false);
  // Boolean state for whether the API Token is expired or missing.
  const [tokenMissing, setTokenMissing] = useState<boolean>(false);
  // Boolean state for whether the search bar should be visible or not.
  const [hideSearchBar, toggleSearchBar] = useState(false);
  // Boolean state for whether to show the settings window.
  const [settings, toggleSettings] = useState(false);
  // State for the search bar value.
  const [search, setSearch] = useState("");

  // Makes an API request to Twitch for channels/streamers that match given search param.
  async function fetchStreamers(name: string) {
    const response = await window.api.fetchChannels("fetchChannels", name);
    setResultArr([]);
    setResultArr(response);
    setToggleSearch(true);
  }

  // Toggles the tokenMissing state if the current token is empty or expired.
  useEffect(() => {
    window.api.tokenMissing("tokenMissing", () => {
      setTokenMissing(true);
    });
  }, []);

  return (
    <div className="main-window">
      <div className="title">
        <div className="topBar">
          <div className="titleBar">
            <div className="handle">
              <i className="logo">
                <Logo />
              </i>
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
      <div className="main">
        {settings && <div className="shade"></div>}
        {settings && (
          <Settings
            hideSearchBar={hideSearchBar}
            toggleSearchBar={toggleSearchBar}
            hideOffline={hideOffline}
            toggleOffline={toggleOffline}
            toggleSettings={toggleSettings}
          />
        )}
        <div id="contentArea">
          {tokenMissing && (
            <div onClick={() => toggleSettings(true)} className="token-missing">
              {`OAuth token is either empty or expired`}
            </div>
          )}
          <NotificationsView
            notifs={notifs}
            showNotifications={showNotifications}
            toggleNotifications={toggleNotifications}
            unseenNotif={unseenNotif}
            setUnseenNotif={setUnseenNotif}
            pages={pages}
            setPages={setPages}
          />
          <ContextMenu
            context={contextMenu}
            setContext={toggleContextMenu}
            setSavedStreamers={setSavedStreamers}
            savedStreamers={savedStreamers}
            liveStreamers={liveStreamers}
            setLiveStreamers={setLiveStreamers}
          />
          <Notifications notifs={notifs} setNotifs={setNotifs} />
          <div
            className={`main-page ${
              pages.mainPage ? "show-page" : "hide-page"
            }`}
          >
            <div className="misc">
              <i className="cog" onClick={() => toggleSettings(true)}>
                <Cog />
              </i>
              <i
                className="bell"
                onClick={() =>
                  setPages({
                    mainPage: false,
                    notificationsPage: true,
                  })
                }
              >
                <Bell />
              </i>
            </div>
            <SearchBar
              fetch={fetchStreamers}
              setToggleSearch={setToggleSearch}
              hideOffline={hideOffline}
              toggleOffline={toggleOffline}
              show={showNotifications ? "right" : ""}
              tokenMissing={tokenMissing}
              toggleSettings={toggleSettings}
              hideSearchBar={hideSearchBar}
              search={search}
              setSearch={setSearch}
            />
            <StreamerContainer
              savedStreamers={savedStreamers}
              setSavedStreamers={setSavedStreamers}
              liveStreamers={liveStreamers}
              setLiveStreamers={setLiveStreamers}
              toggleSearch={toggleSearch}
              hideOffline={hideOffline}
              toggleOffline={toggleOffline}
              context={toggleContextMenu}
              setNotifs={setNotifs}
              show={showNotifications ? "right" : ""}
            />
            <SearchResults
              searchResults={resultArr}
              toggleSearch={toggleSearch}
              setToggleSearch={setToggleSearch}
              setArr={setResultArr}
              savedStreamers={savedStreamers}
              saveStreamer={setSavedStreamers}
              setSearch={setSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
