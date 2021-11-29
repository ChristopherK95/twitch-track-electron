import React, { useEffect, useState } from "react";
import "../styles/Splash.css";

export function Splash() {
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    window.api.splashUpdates("splash-update", (data: string) => {
      setLoadingText(data);
    });
  }, []);

  return (
    <div id="splash">
      <h1>TwitchTrack</h1>
      <div className="loading">
        <p className="loading-text">{loadingText}</p>
        <div className="bar"></div>
      </div>
    </div>
  );
}
