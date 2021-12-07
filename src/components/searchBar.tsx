import React from "react";
import Search from "../svg/Search.svg";
import { LoadingBar } from "./LoadingBar";
import "../styles/searchBar.css";

export function SearchBar(props: {
  fetch: (name: string) => void;
  setToggleSearch: (bool: boolean) => void;
  hideOffline: boolean;
  toggleOffline: (bool: boolean) => void;
  show: string;
  tokenMissing: boolean;
  toggleSettings: (settings: boolean) => void;
  hideSearchBar: boolean;
  search: string;
  setSearch: (search: string) => void;
}) {
  function onChange(e: React.FormEvent<HTMLInputElement>) {
    props.setSearch(e.currentTarget.value);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (props.search === "") return;
    props.fetch(props.search);
  }

  return (
    <div className={`search-bar ${props.show}`}>
      <form
        style={{ display: `${props.hideSearchBar ? "none" : "flex"}` }}
        onSubmit={submit}
      >
        <button
          className="search-button"
          type="submit"
          disabled={props.tokenMissing}
        >
          <i>
            <Search />
          </i>
        </button>
        <input
          className="search"
          type="text"
          placeholder="Search"
          value={props.search}
          onChange={onChange}
          disabled={props.tokenMissing}
        />
        <div
          style={{
            visibility: `${props.search.length > 0 ? "visible" : "hidden"}`,
          }}
          className="cross"
          onClick={() => {
            props.setSearch("");
          }}
        >
          <div></div>
          <div></div>
        </div>
      </form>
      <LoadingBar />
    </div>
  );
}
