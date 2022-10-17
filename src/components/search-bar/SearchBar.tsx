import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton, Cross, Form, Input, SearchButton, SearchIcon, StyledSearchBar } from './Styles';
import Search from '../../svg/Search';
import { RootState } from '../../reduxStore';
import { State } from '../../interfaces/StreamerContext';
import Back from '../../svg/Back';
import LoadingBar from '../loading-bar/LoadingBar';

const SearchBar = (props: {
  hideSearchBar: boolean;
  search: string;
  setSearch: (search: string) => void;
  fetch: (name: string) => void;
  tokenMissing: boolean;
}) => {
  const { hideSearchBar, search, setSearch, fetch, tokenMissing } = props;
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.state.state);
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
    if (state === State.main) {
      dispatch({ type: 'changeState', payload: State.search });
    }
  };

  const back = () => {
    setSearch('');
    dispatch({ type: 'changeState', payload: State.main });
  };

  useEffect(() => {
    window.api.progress('progress', (p: { progress: number; max: number }) => {
      setProgress((p.progress / p.max) * 100);
    });
  }, []);

  return (
    <StyledSearchBar>
      <Form hide={hideSearchBar} onSubmit={submit}>
        <SearchButton type="submit" disabled={tokenMissing}>
          <SearchIcon>
            <Search />
          </SearchIcon>
        </SearchButton>
        <Input type="text" placeholder="Search" value={search} onChange={onChange} disabled={tokenMissing} />
        <Cross visible={search.length > 0} slide={state === State.search} onClick={() => setSearch('')}>
          <div />
          <div />
        </Cross>
        <BackButton visible={state === State.search} onClick={back}>
          <Back />
        </BackButton>
      </Form>
      <LoadingBar progress={progress} clearProgress={clearProgress} />
    </StyledSearchBar>
  );
};

export default SearchBar;
