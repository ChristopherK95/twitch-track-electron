import React from "react";
import {
  BackButton,
  Cross,
  Form,
  Input,
  SearchButton,
  SearchIcon,
  StyledSearchBar,
} from "./Styles";
import Search from "../../svg/Search.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxStore";
import { State } from "../../interfaces/StreamerContext";
import Back from "../../svg/Back.svg";

const SearchBar = (props: {
  hideSearchBar: boolean;
  search: string;
  setSearch: (search: string) => void;
  fetch: (name: string) => void;
  tokenMissing: boolean;
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.state.state);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    props.setSearch(e.currentTarget.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.search === "") return;
    props.fetch(props.search);
    if (state === State.main) {
      dispatch({ type: "changeState", payload: State.search });
    }
  };

  const back = () => {
    props.setSearch("");
    dispatch({ type: "changeState", payload: State.main });
  };

  return (
    <StyledSearchBar>
      <Form hide={props.hideSearchBar} onSubmit={submit}>
        <SearchButton type="submit" disabled={props.tokenMissing}>
          <SearchIcon>
            <Search />
          </SearchIcon>
        </SearchButton>
        <Input
          type="text"
          placeholder="Search"
          value={props.search}
          onChange={onChange}
          disabled={props.tokenMissing}
        />
        <Cross
          visible={props.search.length > 0}
          slide={state === State.search}
          onClick={() => props.setSearch("")}
        >
          <div></div>
          <div></div>
        </Cross>
        <BackButton visible={state === State.search} onClick={back}>
          <Back />
        </BackButton>
      </Form>
    </StyledSearchBar>
  );
};

export default SearchBar;
