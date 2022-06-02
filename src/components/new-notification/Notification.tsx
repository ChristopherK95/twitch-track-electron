import React, { useEffect, useState } from "react";
import { StyledNotification, StyledText } from "./Styles";
import { useDispatch } from "react-redux";
import { deleteNotif } from "../../actions/notifActions";

const Notification = (props: {
  name: string;
  online: boolean;
  index: number;
  total: number;
  id: string;
}) => {
  const [position, setPosition] = useState<number>(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    setPosition(props.index);
    for (let i = props.index; i >= 0; i--) {
      setTimeout(
        () => {
          setPosition(i - 1);
        },
        i > 0 ? 5000 + (props.index - i) * 1000 : 5000 + 1000 * props.index
      );
    }
    setTimeout(() => {
      dispatch(deleteNotif(props.id));
    }, 6000 + 1000 * props.index);
  }, []);

  return (
    <StyledNotification
      online={props.online}
      index={props.index}
      total={props.total}
      position={position}
    >
      <StyledText>{props.name}</StyledText>
    </StyledNotification>
  );
};

export default Notification;
