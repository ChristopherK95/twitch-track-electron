import React, { useEffect, useState } from "react";
import { Container } from "./Styles";
import Notification from "./Notification";
import { Notif } from "../../interfaces/StreamerContext";
import { Action, createStore } from "redux";
import store from "src/reduxStore";

const Notifications = (props: {
  notifs: Notif[];
  destroyNotifs: () => void;
}) => {
  const { notifs, destroyNotifs } = props;
  const [totalNotifs, setTotalNotifs] = useState<number>(0);

  store.subscribe(() => console.log("update", store.getState()));

  useEffect(() => {
    setTotalNotifs(notifs.length);
    setTimeout(() => {
      for (let i = 0; i < notifs.length; i++) {
        setTimeout(() => {
          setTotalNotifs((total) => total - 1);
        }, 1500 * i);
      }
      setTimeout(() => {
        destroyNotifs();
      }, 1500 * notifs.length);
    }, 5000);
  }, [notifs]);

  return (
    <Container>
      {notifs.map((notif, index) => (
        <Notification
          key={index}
          name={notif.name}
          online={notif.live}
          index={index}
          total={totalNotifs}
        />
      ))}
    </Container>
  );
};

export default Notifications;
