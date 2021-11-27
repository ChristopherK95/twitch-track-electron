import React, { useEffect, useState } from "react";
import "../styles/tokenView.css";

export function TokenView(props: {
  showTokenView: boolean;
  toggleTokenView: (bool: boolean) => void;
  setTokenMissing: (bool: boolean) => void;
}) {
  const [token, setToken] = useState<string>("");

  function getToken() {
    window.api.getToken("getToken");
  }

  useEffect(() => {
    window.api.awaitToken("awaitToken", (event: string) => {
      setToken(event);
      props.setTokenMissing(false);
    });
  }, []);

  return (
    <div
      style={{ display: `${props.showTokenView ? "flex" : "none"}` }}
      className="token-view"
    >
      <div onClick={() => props.toggleTokenView(false)} className="exit">
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
