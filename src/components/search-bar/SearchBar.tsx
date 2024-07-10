import React, { useEffect, useState } from 'react';
import { Cross, Form, Input, StyledSearchBar } from './Styles';
import { State } from '../../interfaces/StreamerContext';
import LoadingBar from '../loading-bar/LoadingBar';
import useMode from '../../hooks/use-mode';
import ModeToggle from './ModeToggle';

const SearchBar = (props: {
  hideSearchBar: boolean;
  search: string;
  setSearch: (search: string) => void;
  fetch: (name: string) => void;
  tokenMissing: boolean;
}) => {
  const { hideSearchBar, search, setSearch, fetch, tokenMissing } = props;
  const { mode } = useMode();

  //const clearProgress = () => {
  //  setProgress(undefined);
  //};

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === '') return;
    fetch(search);
  };

  return (
    <StyledSearchBar>
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
    </StyledSearchBar>
  );
};

export default SearchBar;
