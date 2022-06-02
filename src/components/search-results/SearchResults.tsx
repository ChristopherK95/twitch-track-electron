import React from "react";
import { StreamerResult } from "../../interfaces/StreamerContext";
import { SpinnerCircular } from "spinners-react";
import { Container, StyledLabel, StyledUtilBar } from "./Styles";
import { SearchResult } from "./SearchResult";

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

  if (props.searchResults.length === 0 && props.toggleSearch) {
    return (
      <SpinnerCircular
        color={"#17d963"}
        secondaryColor={"#4D4D4D"}
        size={150}
        style={{ position: "relative", top: "150px" }}
      />
    );
  }

  return (
    <Container
      animate={{
        height: props.searchResults.length * 58,
      }}
      visible={props.toggleSearch}
    >
      <StyledUtilBar>
        <StyledLabel onClick={back}>Back</StyledLabel>
      </StyledUtilBar>
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
    </Container>
  );
}
