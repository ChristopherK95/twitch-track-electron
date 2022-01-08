import React, { useEffect, useState } from "react";
import { Notif, Pages } from "../interfaces/StreamerContext";
import "../styles/notificationsView.css";
import Trash from "../svg/Trash.svg";

interface SavedNotif {
  name: string;
  live: boolean;
  time: string;
}

export function NotificationsView(props: {
  notifs: Notif[];
  showNotifications: boolean;
  toggleNotifications: (bool: boolean) => void;
  unseenNotif: boolean;
  setUnseenNotif: (bool: boolean) => void;
  pages: Pages;
  setPages: (pages: Pages) => void;
}) {
  const [notifHistory, setNotifHistory] = useState<SavedNotif[]>([]);
  const [onStartUp, setOnStartUp] = useState(true);
  const [newNotifs, setNewNotifs] = useState<SavedNotif[]>([]);

  function deleteNotif(notif: SavedNotif) {
    const arr: SavedNotif[] = [...notifHistory];
    const newArr = arr.filter(
      (item) => !(item.name === notif.name && item.time === notif.time)
    );
    setNotifHistory(newArr);
  }

  // When a streamer/streamers go live/offline this function triggers after the notification is created.
  // The function then goes through the recent recent notifications and adds them to the
  // notifHistory array as well as the newNotifs array, then sets the unseenNotif boolean to true.
  useEffect(() => {
    if (onStartUp) {
      setOnStartUp(false);
      return;
    }
    const date = new Date();
    const arr: SavedNotif[] = notifHistory;
    const newNotifArr: SavedNotif[] = newNotifs;
    for (let i = 0; i < props.notifs.length; i++) {
      const min = date.getMinutes();
      const notif: SavedNotif = {
        name: props.notifs[i].name,
        live: props.notifs[i].live,

        time: date.getHours() + ":" + (min < 10 ? "0" + min : min),
      };
      arr.push(notif);
      newNotifArr.push(notif);
    }
    setNotifHistory(arr);
    setNewNotifs(newNotifArr);
    if (document.hidden && props.notifs.length > 0) {
      props.setUnseenNotif(true);
    }
  }, [props.notifs]);

  // Checks if there are any unseen notifications when opening
  // the NotificationsView panel and clears the unseenNotifs array.
  useEffect(() => {
    if (newNotifs.length > 0) {
      props.setUnseenNotif(false);
      setNewNotifs([]);
    }
  }, [props.pages.notificationsPage]);

  return (
    <div
      className={`notifications-view ${
        props.pages.notificationsPage ? "show-page" : "hide-page"
      }`}
    >
      <div
        onClick={() =>
          props.setPages({
            mainPage: true,
            notificationsPage: false,
          })
        }
        className="exit"
      >
        <div></div>
        <div></div>
      </div>
      <h1 className="notif-history">History</h1>
      <i
        className={`delete-all ${notifHistory.length === 0 ? "disable" : ""}`}
        onClick={() => setNotifHistory([])}
      >
        <svg viewBox="0 0 118.3328 135.47548">
          <defs id="defs2" />
          <g id="layer1" transform="translate(-42.939969,-60.305797)">
            <g id="base">
              <path d="m 60.709344,172.46969 c 0,5.63086 4.564713,10.19556 10.19557,10.19556 H 132.0783 c 5.63086,0 10.19557,-4.5647 10.19557,-10.19556 V 101.10071 H 60.709344 Z m 57.774876,-54.37636 c 0.006,-4.52553 6.79121,-4.52553 6.79703,0 v 47.57931 c -0.006,4.52553 -6.79121,4.52553 -6.79703,0 z m -20.391131,0 c 0.0076,-4.52373 6.789411,-4.52373 6.797031,0 v 47.57931 c -0.007,4.52373 -6.789415,4.52373 -6.797031,0 z m -20.391132,0 c 0,-4.53136 6.797045,-4.53136 6.797045,0 v 47.57931 c 0,4.53136 -6.797045,4.53136 -6.797045,0 z" />
            </g>
            <g id="lid">
              <path d="m 146.16234,82.671553 -25.48891,10e-7 -1.99663,-3.972023 c -0.86271,-1.732093 -2.63172,-2.82641 -4.56677,-2.825022 l -24.278182,10e-7 c -1.931409,-0.0074 -3.697079,1.08993 -4.545524,2.82502 l -1.99663,3.972024 H 57.800777 c -1.876954,3e-6 -3.398518,1.521569 -3.398518,3.398521 v 6.797045 c 2e-6,1.876951 1.521564,3.39852 3.39852,3.398522 l 88.361561,10e-7 c 1.87695,-3e-6 3.39852,-1.521574 3.39852,-3.398524 v -6.797044 c 0,-1.87695 -1.52158,-3.398521 -3.39852,-3.398522 z" />
            </g>
          </g>
        </svg>
      </i>
      <div className="notifs-container">
        {notifHistory.map((notif, index) => {
          return (
            <div
              key={index}
              className={`notif ${notif.live ? "live-bg" : "offline-bg"}`}
            >
              <p className="name">{notif.name}</p>
              <p className="notif-h-status">
                {notif.live ? "Live" : "Offline"}
              </p>
              <p className="date">{notif.time}</p>
              <div className="hover" onClick={() => deleteNotif(notif)}>
                Click to delete
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
