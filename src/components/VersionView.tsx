import React, { useEffect, useState } from "react";
import { Pages } from "../interfaces/StreamerContext";
import "../styles/versionView.css";

export function VersionView(props: {
  pages: Pages;
  setPages: (pages: Pages) => void;
}) {
  const [version, setVersion] = useState<string>();

  useEffect(() => {
    window.api.getVersion("get-version", (ver: string) => {
      setVersion(ver);
    });
  }, []);

  return (
    <div
      className={`version-view ${
        props.pages.versionPage ? "show-page" : "hide-page"
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
      <h1 className="version-title">Current version</h1>
      <p className="version">v{version}</p>
    </div>
  );
}
