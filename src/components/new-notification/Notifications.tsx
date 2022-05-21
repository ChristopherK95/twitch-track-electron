import React, { useEffect, useState } from "react";
import { Container } from "./Styles";
import Notification from "./Notification";

const Notifications = () => {
  const [notifs, setNotifs] = useState<{ name: string; online: boolean }[]>([
    { name: "Sodapoppin", online: true },
    { name: "Maya", online: false },
    { name: "NmpLol", online: true },
    { name: "Northernlion", online: false },
  ]);
  const [totalNotifs, setTotalNotifs] = useState<number>(0);

  useEffect(() => {
    setTotalNotifs(notifs.length);
    setTimeout(() => {
      for (let i = 0; i < notifs.length; i++) {
        setTimeout(() => {
          setTotalNotifs((total) => total - 1);
        }, 1500 * i);
      }
      setTimeout(() => {
        setNotifs([]);
      }, 1500 * notifs.length);
    }, 5000);
  }, [notifs]);

  return (
    <Container>
      {notifs.map((notif, index) => (
        <Notification
          key={index}
          name={notif.name}
          online={notif.online}
          index={index}
          total={totalNotifs}
        />
      ))}
    </Container>
  );
};

export default Notifications;
