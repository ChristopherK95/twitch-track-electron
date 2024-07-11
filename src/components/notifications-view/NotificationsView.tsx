import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../interfaces/StreamerContext';
import { RootState } from '../../reduxStore';
import {
  DeleteAll,
  Exit,
  Name,
  Notif,
  NotifHistory,
  NotifsContainer,
  Status,
  StyledNotificationsView,
  Date,
  Panel
} from './Styles';
import Back from '../../svg/Back';

const NotificationsView = () => {
  const state = useSelector((state: RootState) => state.state.state);
  const notifs = useSelector((state: RootState) => state.notifs.notifHistory);
  const dispatch = useDispatch();

  return (
    <StyledNotificationsView visible={state === State.notifications}>
      <Panel>
        <Exit onClick={() => dispatch({ type: 'changeState', payload: State.main })}>
          <Back />
        </Exit>
        <NotifHistory>Notifications</NotifHistory>
        <DeleteAll disabled={notifs.length === 0} onClick={() => dispatch({ type: 'deleteAllHistory' })}>
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
        </DeleteAll>
      </Panel>
      <NotifsContainer>
        {notifs.map((notif) => {
          return (
            <Notif live={notif.live} key={notif.id}>
              <Name>{notif.name}</Name>
              <Status>{notif.live ? 'Live' : 'Offline'}</Status>
              <Date className="date">{notif.time}</Date>
            </Notif>
          );
        })}
      </NotifsContainer>
    </StyledNotificationsView>
  );
};

export default NotificationsView;
