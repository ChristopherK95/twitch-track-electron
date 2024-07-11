import React from 'react';
import Viewers from '../../svg/Viewers';
import { Live, StyledStatus, StyledViewers, ViewersIcon } from './Styles';

const Status = (props: { viewers: string }) => {
  const { viewers } = props;

  return (
    <StyledStatus className="status">
      <Live />
      <StyledViewers className="viewers">{viewers}</StyledViewers>

      <ViewersIcon className="viewer-icon">
        <Viewers />
      </ViewersIcon>
    </StyledStatus>
  );
};

export default Status;
