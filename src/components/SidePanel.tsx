import React from "react";
import "../styles/sidePanel.css";
import Bell from "../svg/Bell.svg";
import Alert from "../svg/Alert.svg";
import Token from "../svg/Token.svg";

export function SidePanel(props: {
  sidePanel: boolean;
  setSidePanel: (bool: boolean) => void;
  showNotifications: boolean;
  toggleNotifications: (bool: boolean) => void;
  unseenNotif: boolean;
  showTokenView: boolean;
  toggleTokenView: (bool: boolean) => void;
}) {
  // Opens the panel that displays all recent notifications.
  function showNotifications() {
    props.toggleNotifications(!props.showNotifications);
    props.setSidePanel(false);
  }

  function showTokenView() {
    props.toggleTokenView(!props.showTokenView);
    props.setSidePanel(false);
  }

  return (
    <div className={`side-panel ${props.sidePanel ? "slide-in" : ""}`}>
      <div onClick={showNotifications} className="option">
        <i>
          <Bell />
          {props.unseenNotif && (
            <i className="notif-bubble">
              <Alert />
            </i>
          )}
        </i>
        <h2>Notifications</h2>
      </div>
      <div onClick={showTokenView} className="option">
        <i>
          <Token />
        </i>
        <h2>Token</h2>
      </div>
    </div>
  );
}
