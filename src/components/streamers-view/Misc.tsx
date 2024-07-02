import React from 'react';
import { State } from '../../interfaces/StreamerContext';
import Search from '../../svg/Search';
import Bell from '../../svg/Bell';
import Cog from '../../svg/Cog';
import Spinner from '../spinner/Spinner';
import { Misc, StyledBell, StyledCog, StyledSearch, TopbarBtn } from './Styles';
import useMode from '../../hooks/use-mode';

const Miscellaneous = (props: { fetching: boolean; toggleSearchBar: () => void }) => {
  const { fetching, toggleSearchBar } = props;
  const { changeMode } = useMode();

  return (
    <Misc>
      {fetching && <Spinner />}
      <TopbarBtn onClick={() => toggleSearchBar()}>
        <StyledSearch>
          <Search />
        </StyledSearch>
      </TopbarBtn>
      <TopbarBtn onClick={() => changeMode(State.settings)}>
        <StyledCog>
          <Cog />
        </StyledCog>
      </TopbarBtn>
      <TopbarBtn onClick={() => changeMode(State.notifications)}>
        <StyledBell>
          <Bell />
        </StyledBell>
      </TopbarBtn>
    </Misc>
  );
};

export default Miscellaneous;
