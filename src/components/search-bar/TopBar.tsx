import React from 'react';
import { Cross, Form, Input, StyledTopBar } from './Styles';
import { State } from '../../interfaces/StreamerContext';
import LoadingBar from '../loading-bar/LoadingBar';
import useMode from '../../hooks/use-mode';
import ModeToggle from './ModeToggle';
import Misc from './Misc';

const TopBar = (props: {
  hideSearchBar: boolean;
  search: string;
  setSearch: (search: string) => void;
  fetch: (name: string) => void;
  tokenMissing: boolean;
}) => {
  const { hideSearchBar, search, setSearch, fetch, tokenMissing } = props;
  const { mode } = useMode();

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === '') return;
    fetch(search);
  };

  return (
    <StyledTopBar>
      <div style={{ display: 'flex', gap: '10px' }}>
        <ModeToggle />
        {mode === State.search && (
          <Form $hide={hideSearchBar} onSubmit={submit}>
            <Input type="text" placeholder="Search ..." value={search} onChange={onChange} disabled={tokenMissing} />
            <Cross $visible={search.length > 0} $slide={mode === State.search} onClick={() => setSearch('')}>
              <div />
              <div />
            </Cross>
            <LoadingBar />
          </Form>
        )}
      </div>
      <Misc />
    </StyledTopBar>
  );
};

export default TopBar;
