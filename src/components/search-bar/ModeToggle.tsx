import React from 'react';
import { ModeButton, ModeContainer } from './Styles';
import useMode from '../../hooks/use-mode';
import { State } from '../../interfaces/StreamerContext';
import Viewers from '../../svg/Viewers';
import Search from '../../svg/Search';

const ModeToggle = () => {
  const { mode, changeMode } = useMode();

  return (
    <ModeContainer>
      <ModeButton $toggled={mode === State.main} onClick={() => changeMode(State.main)}>
        <Viewers color={mode === State.main ? '#38ff9b' : '#1c1c1c'} />
      </ModeButton>
      <ModeButton $toggled={mode === State.search} onClick={() => changeMode(State.search)}>
        <Search color={mode === State.search ? '#ffffff' : '#1c1c1c'} />
      </ModeButton>
    </ModeContainer>
  );
};

export default ModeToggle;
