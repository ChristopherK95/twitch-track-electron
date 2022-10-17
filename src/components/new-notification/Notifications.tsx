import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from './Styles';
import Notification from './Notification';
import { RootState } from '../../reduxStore';

const Notifications = () => {
  const notifs = useSelector((state: RootState) => state.notifs.notifs);

  return (
    <Container>
      {notifs.map((notif, i) => (
        <Notification
          key={notif.id}
          name={notif.name}
          online={notif.live}
          index={i}
          total={notifs.length}
          id={notif.id}
        />
      ))}
    </Container>
  );
};

export default Notifications;
