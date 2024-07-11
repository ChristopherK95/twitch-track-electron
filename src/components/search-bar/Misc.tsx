import React from 'react';
import Cog from '../../svg/Cog';
import { MiscBtn, MiscContainer } from './Styles';
import useMode from '../../hooks/use-mode';
import { State } from '../../interfaces/StreamerContext';
import Bell from '../../svg/Bell';

const Misc = () => {
  const { changeMode } = useMode();

  return (
    <MiscContainer>
      <MiscBtn onClick={() => changeMode(State.settings)}>
        <Cog size={{ w: 20, h: 20 }} color="#bbbbbb" />
      </MiscBtn>
      <MiscBtn onClick={() => changeMode(State.notifications)}>
        <Bell size={{ w: 20, h: 20 }} color="#bbbbbb" />
      </MiscBtn>
    </MiscContainer>
  );
};

export default Misc;
