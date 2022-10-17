import React from 'react';
import { useSelector } from 'react-redux';
import { State, Streamer, StreamerResult } from '../../interfaces/StreamerContext';
import { Container } from './Styles';
import SearchResult from './SearchResult';
import { RootState } from '../../reduxStore';

const SearchResults = (props: {
  searchResults: StreamerResult[];
  savedStreamers: StreamerResult[];
  saveStreamer: (arr: StreamerResult[]) => void;
  streamers: Streamer[];
}) => {
  const { searchResults, savedStreamers, saveStreamer, streamers } = props;
  const state = useSelector((state: RootState) => state.state.state);

  return (
    <Container visible={state === State.search}>
      {searchResults.map((result: StreamerResult, index: number) => {
        return (
          <SearchResult
            key={index}
            result={result}
            savedStreamers={savedStreamers}
            saveStreamer={saveStreamer}
            streamers={streamers}
          />
        );
      })}
    </Container>
  );
};

export default SearchResults;
