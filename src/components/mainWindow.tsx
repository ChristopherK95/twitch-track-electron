import React, { useState, useEffect } from "react";
import { SearchBar } from "./searchBar";
// import { SearchResults } from "./searchResults";
import "../styles/mainWindow.css";
import {
  StreamerResult,
  Notif,
  LiveStreamer,
  Pages,
  Platform,
} from "../interfaces/StreamerContext";
import { StreamerContainer } from "./streamerContainer";
import { NotificationsView } from "./NotificationsView";
import { ContextMenu } from "./ContextMenu";
import { Settings } from "./Settings";
import Logo from "../svg/TwitchTrackSVG.svg";
import Cog from "../svg/Cog.svg";
import Bell from "../svg/Bell.svg";
import Check from "../svg/Check.svg";
import Notifications from "./new-notification/Notifications";
import { useDispatch } from "react-redux";
import { addNotif } from "../actions/notifActions";
import { SpinnerCircular } from "spinners-react";
import { SearchResults } from "./search-results/SearchResults";

export function MainWindow() {
  const dispatch = useDispatch();
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
  const [hideOffline, toggleOffline] = useState(false);
  const [showNotifications, toggleNotifications] = useState<boolean>(false);
  const [unseenNotif, setUnseenNotif] = useState<boolean>(false);
  const [tokenMissing, setTokenMissing] = useState<boolean>(false);
  const [hideSearchBar, toggleSearchBar] = useState<boolean>(false);
  const [settings, toggleSettings] = useState<boolean>(false);
  const [savedSize, setSavedSize] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [platform, setPlatform] = useState<Platform>(Platform.windows);

  // Makes an API request to Twitch for channels/streamers that match given search param.
  async function fetchStreamers(name: string) {
    setResultArr([]);
    setToggleSearch(true);
    const response = await window.api.fetchChannels("fetchChannels", name);
    setResultArr(response);
  }

  // Toggles the tokenMissing state if the current token is empty or expired.
  useEffect(() => {
    window.api.tokenMissing("tokenMissing", () => {
      setTokenMissing(true);
    });

    window.api.savedSize("saved-size", () => {
      setSavedSize(true);
      dispatch(addNotif({ name: "Saved windows size", live: true }));

      setTimeout(() => {
        setSavedSize(false);
      }, 3000);
    });

    window.api.os("os", (os: Platform) => {
      setPlatform(os);
    });
  }, []);

  useEffect(() => {
    console.log(savedStreamers);
  }, [savedStreamers]);

  return (
    <div className="main-window">
      {platform === "win32" && (
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
        {settings && <div className="shade"></div>}
        {settings && (
          <Settings
            hideSearchBar={hideSearchBar}
            toggleSearchBar={toggleSearchBar}
            hideOffline={hideOffline}
            toggleOffline={toggleOffline}
            toggleSettings={toggleSettings}
            setTokenMissing={setTokenMissing}
          />
        )}
        <div id="contentArea">
          {tokenMissing && (
            <div onClick={() => toggleSettings(true)} className="token-missing">
              {`OAuth token is either empty or expired`}
            </div>
          )}
          <Notifications />
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
          {/* <Notifications notifs={notifs} setNotifs={setNotifs} /> */}
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
                onClick={() => {
                  setPages({
                    mainPage: false,
                    notificationsPage: true,
                  });
                }}
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
            {savedStreamers ? (
              <>
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
              </>
            ) : (
              <SpinnerCircular
                color={"#17d963"}
                secondaryColor={"#4D4D4D"}
                size={150}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
