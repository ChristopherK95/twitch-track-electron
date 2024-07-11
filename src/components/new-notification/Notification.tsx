import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledNotification, StyledText } from './Styles';
import { deleteNotif } from '../../actions/notifActions';

const Notification = (props: { name: string; online: boolean; index: number; total: number; id: string }) => {
  const { name, online, index, total, id } = props;
  const [position, setPosition] = useState<number>(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    setPosition(index);
    for (let i = index; i >= 0; i--) {
      setTimeout(
        () => {
          setPosition(i - 1);
        },
        i > 0 ? 5000 + (index - i) * 1000 : 5000 + 1000 * index
      );
    }
    setTimeout(
      () => {
        dispatch(deleteNotif(id));
      },
      6000 + 1000 * index
    );
  }, []);

  return (
    <StyledNotification online={online} index={index} total={total} position={position}>
      <StyledText>{name}</StyledText>
    </StyledNotification>
  );
};

export default Notification;
