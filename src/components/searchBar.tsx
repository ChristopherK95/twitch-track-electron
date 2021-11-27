import React, { useState, useRef } from "react";
import Search from "../svg/Search.svg";
import Cog from "../svg/Cog.svg";
import { LoadingBar } from "./LoadingBar";
import "../styles/searchBar.css";

export function SearchBar(props: {
  fetch: (name: string) => void;
  setToggleSearch: (bool: boolean) => void;
  hideOffline: boolean;
  toggleOffline: (bool: boolean) => void;
  show: string;
  tokenMissing: boolean;
}) {
  const [search, setSearch] = useState("");
  const [hideSearch, toggleHideSearch] = useState(false);
  const [showMisc, toggleShowMisc] = useState(false);
  const dropDown = useRef(null);

  function onChange(e: React.FormEvent<HTMLInputElement>) {
    setSearch(e.currentTarget.value);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (search === "") return;
    props.fetch(search);
  }

  function toggleMisc() {
    toggleShowMisc(!showMisc);
  }

  function toggleSearch() {
    toggleHideSearch(!hideSearch);
  }

  function toggleOffline() {
    props.toggleOffline(!props.hideOffline);
  }

  return (
    <div className={`search-bar ${props.show}`}>
      <div className="misc" onClick={toggleMisc}>
        <i>
          <Cog />
        </i>
        {/* <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div> */}
      </div>
      <div className={`settings ${showMisc ? "show" : ""}`}>
        <div>
          <label className="toggle-button">Hide search</label>
          <input
            className="skewed"
            type="checkbox"
            name="hide-search"
            id="hide-search"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleSearch}
          />
        </div>
        <div>
          <label className="toggle-button">Hide offline</label>
          <input
            className="skewed"
            type="checkbox"
            name="hide-search"
            id="hide-search"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleOffline}
          />
        </div>
      </div>
      {/* <div
        // style={{ visibility: `${showMisc ? "visible" : "hidden"}` }}
        className={`drop-down ${showMisc ? "drop-down-enter" : ""}`}
        ref={dropDown}
        tabIndex={0}
      >
        <div>
          <label className="toggle-button">Hide search</label>
          <input
            className="skewed"
            type="checkbox"
            name="hide-search"
            id="hide-search"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleSearch}
          />
        </div>
        <div>
          <label className="toggle-button">Hide offline</label>
          <input
            className="skewed"
            type="checkbox"
            name="hide-search"
            id="hide-search"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleOffline}
          />
        </div>
      </div> */}
      <form
        style={{ display: `${hideSearch ? "none" : "flex"}` }}
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
          value={search}
          onChange={onChange}
          disabled={props.tokenMissing}
        />
        <div
          style={{ visibility: `${search.length > 0 ? "visible" : "hidden"}` }}
          className="cross"
          onClick={() => {
            setSearch("");
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
