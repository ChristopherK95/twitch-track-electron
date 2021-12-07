import React from "react";
import { StreamerResult } from "../interfaces/StreamerContext";
import { SearchResult } from "./searchResult";
import "../styles/searchResults.css";

export function SearchResults(props: {
  searchResults: StreamerResult[];
  toggleSearch: boolean;
  setToggleSearch: (bool: boolean) => void;
  setArr: (arr: StreamerResult[]) => void;
  savedStreamers: StreamerResult[];
  saveStreamer: (arr: StreamerResult[]) => void;
  setSearch: (val: string) => void;
}) {
  function back() {
    props.setToggleSearch(false);
    props.setArr([]);
    props.setSearch("");
  }

  return (
    <div
      style={{ display: `${props.toggleSearch ? "flex" : "none"}` }}
      className="search-results"
    >
      <div className="util-bar">
        <p onClick={back}>Go back</p>
      </div>
      {props.searchResults.map((result: StreamerResult, index: number) => {
        return (
          <SearchResult
            key={index}
            result={result}
            savedStreamers={props.savedStreamers}
            saveStreamer={props.saveStreamer}
          />
        );
      })}
    </div>
  );
}
