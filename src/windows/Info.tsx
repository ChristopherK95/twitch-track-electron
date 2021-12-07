import React, { useEffect, useState } from "react";
import "../styles/info.css";

export function Info() {
  const [version, setVersion] = useState<string>();

  function openVersion() {
    window.api.openVersion("openVersion");
  }

  useEffect(() => {
    window.api.getVersion("get-version", (ver: string) => {
      setVersion(ver);
    });
  }, []);

  return (
    <div className="Info">
      <p className="version-title">Version</p>
      <p className="version">
        TwitchTrack {version}{" "}
        <span className="release" onClick={openVersion}>
          (release)
        </span>
      </p>
    </div>
  );
}
