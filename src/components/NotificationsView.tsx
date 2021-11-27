import React, { useEffect, useState } from "react";
import { Notif } from "../interfaces/StreamerContext";
import "../styles/notificationsView.css";

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
    props.setUnseenNotif(true);
  }, [props.notifs]);

  // Checks if there are any unseen notifications when opening
  // the NotificationsView panel and clears the unseenNotifs array.
  useEffect(() => {
    if (newNotifs.length > 0) {
      props.setUnseenNotif(false);
      setNewNotifs([]);
    }
  }, [props.showNotifications]);

  return (
    <div
      className={`notifications-view ${props.showNotifications ? "show" : ""}`}
    >
      <p className="return" onClick={() => props.toggleNotifications(false)}>
        Back
      </p>
      <h1 className="notif-history">History</h1>
      {notifHistory.map((notif, index) => {
        return (
          <div
            key={index}
            className={`notif ${notif.live ? "live-bg" : "offline-bg"}`}
            onClick={() => deleteNotif(notif)}
          >
            <p className="name">{notif.name}</p>
            <p className="notif-h-status">{notif.live ? "Live" : "Offline"}</p>
            <p className="date">{notif.time}</p>
            <div className="hover">Click to delete</div>
          </div>
        );
      })}
    </div>
  );
}
