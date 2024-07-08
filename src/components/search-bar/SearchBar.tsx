import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BackButton, Cross, Form, Input, StyledSearchBar } from './Styles';
import { RootState } from '../../reduxStore';
import { State } from '../../interfaces/StreamerContext';
import Back from '../../svg/Back';
import LoadingBar from '../loading-bar/LoadingBar';
import AddButton from '../streamers-view/AddButton';
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
  const {mode, changeMode } = useMode()
  const [progress, setProgress] = useState<number>();

  const clearProgress = () => {
    setProgress(undefined);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === '') return;
    setProgress(0);
    fetch(search);
  };

  const back = () => {
    setSearch('');
    changeMode(State.main);
  };

  useEffect(() => {
    window.api.progress('progress', (p: { progress: number; max: number }) => {
      setProgress((p.progress / p.max) * 100);
    });
  }, []);

  return (
    <StyledSearchBar>
      <ModeToggle />
      { mode === State.search && (<Form hide={hideSearchBar} onSubmit={submit}>
        <Input type="text" placeholder="Search ..." value={search} onChange={onChange} disabled={tokenMissing} />
        <Cross visible={search.length > 0} slide={mode === State.search} onClick={() => setSearch('')}>
          <div />
          <div />
        </Cross>
      </Form>) }
      <LoadingBar progress={progress} clearProgress={clearProgress} />
    </StyledSearchBar>
  );
};

export default SearchBar;
