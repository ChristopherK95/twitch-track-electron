import React from "react";
import { StyledNotification, StyledText } from "./Styles";

const Notification = (props: {
  name: string;
  online: boolean;
  index: number;
  total: number;
}) => {
  return (
    <StyledNotification
      online={props.online}
      index={props.index}
      total={props.total}
    >
      <StyledText>{props.name}</StyledText>
    </StyledNotification>
  );
};

export default Notification;
