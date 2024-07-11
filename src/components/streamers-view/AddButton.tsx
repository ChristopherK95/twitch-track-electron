import React from 'react';
import { StyledAddButton } from './Styles';
import useMode from '../../hooks/use-mode';
import { State } from '../../interfaces/StreamerContext';
import Plus from '../../svg/Plus';

const AddButton = () => {
  const { changeMode } = useMode();

  const onClick = () => {
    changeMode(State.search);
  };

  return (
    <StyledAddButton onClick={onClick}>
      <Plus color="#bbbbbb" />
    </StyledAddButton>
  );
};

export default AddButton;
