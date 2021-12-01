import React from "react";
import "../styles/sidePanel.css";
import Bell from "../svg/Bell.svg";
import Alert from "../svg/Alert.svg";
import Token from "../svg/Token.svg";
import Info from "../svg/Info.svg";
import { Pages } from "../interfaces/StreamerContext";

export function SidePanel(props: {
  sidePanel: boolean;
  setSidePanel: (bool: boolean) => void;
  showNotifications: boolean;
  toggleNotifications: (bool: boolean) => void;
  unseenNotif: boolean;
  showTokenView: boolean;
  toggleTokenView: (bool: boolean) => void;
  setPages: (setPages: Pages) => void;
}) {
  // Opens the panel that displays all recent notifications.
  function showNotifications() {
    props.setPages({
      mainPage: false,
      notificationsPage: true,
      tokenPage: false,
      versionPage: false,
    });
  }

  function showTokenView() {
    props.setPages({
      mainPage: false,
      notificationsPage: false,
      tokenPage: true,
      versionPage: false,
    });
  }

  function showVersionView() {
    props.setPages({
      mainPage: false,
      notificationsPage: false,
      tokenPage: false,
      versionPage: true,
    });
  }

  return (
    <div className={`side-panel ${props.sidePanel ? "slide-in" : ""}`}>
      <div
        onClick={showNotifications}
        className="option"
        data-title="Notifications"
      >
        <i>
          <Bell />
          {props.unseenNotif && (
            <i className="notif-bubble">
              <Alert />
            </i>
          )}
        </i>
      </div>
      <div onClick={showTokenView} className="option" data-title="Token">
        <i>
          <Token />
        </i>
      </div>
      <div onClick={showVersionView} className="option" data-title="Version">
        <i id="info">
          <Info />
        </i>
      </div>
    </div>
  );
}
