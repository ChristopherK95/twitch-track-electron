import React from "react";
import { StreamerResult } from "../interfaces/StreamerContext";
import { SearchResult } from "./searchResult";
import "../styles/searchResults.css";
import { SpinnerCircular } from "spinners-react";

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

  if (props.searchResults.length === 0) {
    console.log("yo");

    return (
      <SpinnerCircular
        color={"#17d963"}
        secondaryColor={"#4D4D4D"}
        size={150}
      />
    );
  }

  return (
    <div
      style={{ display: `${props.toggleSearch ? "flex" : "none"}` }}
      className="search-results"
    >
      <div className="util-bar">
        <p onClick={back}>Back</p>
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
