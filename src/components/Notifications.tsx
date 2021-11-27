import React, { useEffect, useState } from "react";
import { Notif } from "../interfaces/StreamerContext";
import "../styles/notifications.css";

export function Notifications(props: {
  notifs: Notif[];
  setNotifs: (notifs: Notif[]) => void;
}) {
  const [show, setShow] = useState(false);
  const [containerRight, setContainerRight] = useState(0);
  const [notifCount, setNotifCount] = useState("");

  const containerAnim = {
    transform: `translateX(-${containerRight}vw)`,
  };

  useEffect(() => {
    if (props.notifs.length === 0) return;
    setTimeout(() => {
      setShow(true);
      setNotifCount(`1/${props.notifs.length}`);
    }, 100);
    for (let i = 0; i < props.notifs.length + 1; i++) {
      console.log("start");
      setTimeout(
        () => {
          if (i === props.notifs.length) {
            setShow(false);
            console.log("hide");
          } else {
            setContainerRight(100 * i);
            setNotifCount(`${i + 1}/${props.notifs.length}`);
          }
        },
        i === props.notifs.length ? 3000 * (i + 1) : 3000 * (i + 1)
      );
    }
    setTimeout(() => {
      props.setNotifs([]);
      setContainerRight(0);
    }, 3000 * (props.notifs.length + 1) + 800);
  }, [props.notifs]);

  return (
    <div
      data-title={notifCount}
      style={{ display: `${props.notifs.length > 0 ? "flex" : "none"}` }}
      className={`notifications ${show ? "notifications-enter" : ""}`}
    >
      <div
        style={containerAnim}
        className={`container ${show ? "notifications-enter" : ""}`}
      >
        {props.notifs.length > 0 &&
          props.notifs.map((notif: Notif, index: number) => {
            return (
              <div
                key={index}
                className={`notification ${
                  notif.live ? "live-bg" : "offline-bg"
                }`}
              >
                <div>
                  <p className="name">
                    {notif.name} went {notif.live ? "live" : "offline"}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
