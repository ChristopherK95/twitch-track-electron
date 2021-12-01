import React, { useEffect, useState } from "react";
import "../styles/tokenView.css";
import { Pages } from "../interfaces/StreamerContext";

export function TokenView(props: {
  showTokenView: boolean;
  toggleTokenView: (bool: boolean) => void;
  setTokenMissing: (bool: boolean) => void;
  pages: Pages;
  setPages: (pages: Pages) => void;
}) {
  const [token, setToken] = useState<string>("");

  async function getToken() {
    // window.api.getToken("getToken");
    const response = await window.api.getNewToken("getNewToken");
    setToken(response);
  }

  async function aquireToken() {
    const res = await window.api.aquireToken("aquireToken");
    setToken(res);
  }

  useEffect(() => {
    // window.api.awaitToken("awaitToken", (event: string) => {
    //   setToken(event);
    //   props.setTokenMissing(false);
    // });

    aquireToken();
  }, []);

  return (
    <div
      // style={{ display: `${props.showTokenView ? "flex" : "none"}` }}
      className={`token-view ${
        props.pages.tokenPage ? "show-page" : "hide-page"
      }`}
    >
      <div
        onClick={() =>
          props.setPages({
            mainPage: true,
            notificationsPage: false,
            tokenPage: false,
            versionPage: false,
          })
        }
        className="exit"
      >
        <div></div>
        <div></div>
      </div>
      <div className="token-div">
        <h1>Current Token</h1>
        <p className="token" onClick={getToken}>
          {token}
        </p>
        <p className="hint">Click to get a new token</p>
      </div>
    </div>
  );
}
