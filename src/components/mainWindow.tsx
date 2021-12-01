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
import { SidePanel } from "./SidePanel";
import { TokenView } from "./TokenView";
import { VersionView } from "./VersionView";
import Logo from "../svg/TwitchTrackSVG.svg";
import Alert from "../svg/Alert.svg";

export function MainWindow() {
  const [sidePanel, setSidePanel] = useState<boolean>(true);
  const [resultArr, setResultArr] = useState<StreamerResult[]>([]);
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const [hideOffline, toggleOffline] = useState(false);
  const [savedStreamers, setSavedStreamers] = useState<StreamerResult[]>([]);
  const [liveStreamers, setLiveStreamers] = useState<LiveStreamer[]>([]);
  const [contextMenu, toggleContextMenu] = useState<{
    show: boolean;
    name: string;
    pos: { x: number; y: number };
  }>({ show: false, name: "", pos: { x: 0, y: 0 } });
  const [notifs, setNotifs] = useState<Notif[]>([]);
  const [showNotifications, toggleNotifications] = useState<boolean>(false);
  const [unseenNotif, setUnseenNotif] = useState<boolean>(false);
  const [tokenMissing, setTokenMissing] = useState<boolean>(false);
  const [showTokenView, toggleTokenView] = useState<boolean>(false);

  const [pages, setPages] = useState<Pages>({
    mainPage: true,
    notificationsPage: false,
    tokenPage: false,
    versionPage: false,
  });

  async function fetchStreamers(name: string) {
    const response = await window.api.fetchChannels("fetchChannels", name);
    setResultArr([]);
    setResultArr(response);
    setToggleSearch(true);
    // window.api.send("toMain", name);
  }

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
            <button
              id="showHideMenus"
              className="toggleButton"
              onClick={() => setSidePanel(!sidePanel)}
            >
              <div></div>
              <div></div>
              <div></div>
              {unseenNotif && (
                <i className="notif-bubble">
                  <Alert />
                </i>
              )}
            </button>
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
        <SidePanel
          sidePanel={sidePanel}
          setSidePanel={setSidePanel}
          showNotifications={showNotifications}
          toggleNotifications={toggleNotifications}
          unseenNotif={unseenNotif}
          showTokenView={showTokenView}
          toggleTokenView={toggleTokenView}
          setPages={setPages}
        />
        <div
          id="contentArea"
          style={{ borderTopLeftRadius: `${sidePanel ? "" : 0}` }}
        >
          {tokenMissing && !showTokenView && (
            <div
              onClick={() => toggleTokenView(true)}
              className="token-missing"
            >
              {`OAuth token is either empty or expired`}
            </div>
          )}
          <VersionView pages={pages} setPages={setPages} />
          <TokenView
            showTokenView={showTokenView}
            toggleTokenView={toggleTokenView}
            setTokenMissing={setTokenMissing}
            pages={pages}
            setPages={setPages}
          />
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
            <SearchBar
              fetch={fetchStreamers}
              setToggleSearch={setToggleSearch}
              hideOffline={hideOffline}
              toggleOffline={toggleOffline}
              show={showNotifications ? "right" : ""}
              tokenMissing={tokenMissing}
            />
            <StreamerContainer
              savedStreamers={savedStreamers}
              setSavedStreamers={setSavedStreamers}
              liveStreamers={liveStreamers}
              setLiveStreamers={setLiveStreamers}
              toggleSearch={toggleSearch}
              hideOffline={hideOffline}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
