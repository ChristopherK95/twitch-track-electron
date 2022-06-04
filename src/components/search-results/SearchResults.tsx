import React from "react";
import { State, StreamerResult } from "../../interfaces/StreamerContext";
import { SpinnerCircular } from "spinners-react";
import { Container } from "./Styles";
import { SearchResult } from "./SearchResult";
import { RootState } from "../../reduxStore";
import { useSelector } from "react-redux";

export function SearchResults(props: {
  searchResults: StreamerResult[];
  setArr: (arr: StreamerResult[]) => void;
  savedStreamers: StreamerResult[];
  saveStreamer: (arr: StreamerResult[]) => void;
  setSearch: (val: string) => void;
}) {
  const state = useSelector((state: RootState) => state.state.state);

  if (props.searchResults.length === 0 && state === State.search) {
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
      initial={{ height: 0 }}
      animate={{
        height: props.searchResults.length * 58,
      }}
      transition={{ type: "spring", stiffness: 110, duration: 1 }}
      visible={state === State.search}
    >
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
