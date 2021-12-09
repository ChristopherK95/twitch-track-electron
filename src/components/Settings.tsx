import React, { useEffect, useState } from "react";
import "../styles/settings.css";

export function Settings(props: {
  hideSearchBar: boolean;
  toggleSearchBar: (hideSearch: boolean) => void;
  hideOffline: boolean;
  toggleOffline: (hideOffline: boolean) => void;
  toggleSettings: (settings: boolean) => void;
  setTokenMissing: (bool: boolean) => void;
}) {
  const [token, setToken] = useState<string>("");

  // Opens Info window.
  function showInfo() {
    window.api.showInfo("showInfo");
  }

  async function getToken() {
    const response = await window.api.getNewToken("getNewToken");
    setToken(response);
    props.setTokenMissing(false);
  }

  async function aquireToken() {
    const res = await window.api.aquireToken("aquireToken");
    setToken(res);
    if (res === "") return;
    props.setTokenMissing(false);
  }

  useEffect(() => {
    aquireToken();
  }, []);

  return (
    <div className="settings" onBlur={() => props.toggleSettings(false)}>
      <div
        onClick={() => props.toggleSettings(false)}
        className="exit-settings"
      >
        <div></div>
        <div></div>
      </div>
      <h1>Settings</h1>
      <div className="setting">
        <p>Hide the search bar</p>
        <div
          onClick={() => props.toggleSearchBar(!props.hideSearchBar)}
          className={`checkbox ${props.hideSearchBar ? "enabled" : ""}`}
        >
          <div className={`switch ${props.hideSearchBar ? "enabled" : ""}`}>
            <svg>
              <path
                className={`switch-cross ${
                  props.hideSearchBar ? "path-check" : ""
                }`}
                d="M 5 5 L 15 15 M 15 5 L 5 15 C 2,18 2,5 6,9 L 9 12 L 15 6"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="setting">
        <p>Hide the streamers that are offline</p>
        <div
          onClick={() => props.toggleOffline(!props.hideOffline)}
          className={`checkbox ${props.hideOffline ? "enabled" : ""}`}
        >
          <div className={`switch ${props.hideOffline ? "enabled" : ""}`}>
            <svg>
              <path
                className={`switch-cross ${
                  props.hideOffline ? "path-check" : ""
                }`}
                d="M 5 5 L 15 15 M 15 5 L 5 15 C 2,18 2,5 6,9 L 9 12 L 15 6"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="setting">
        <p title="API token that is used to make API requests to Twitch">
          Token
        </p>
        <p className="token" onClick={getToken}>
          {token !== "" ? token : "Token not found"}
        </p>
      </div>
      <div className="info" onClick={showInfo}>
        Info
      </div>
    </div>
  );
}
