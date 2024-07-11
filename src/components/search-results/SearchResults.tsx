import React from 'react';
import { State, Streamer, StreamerResult } from '../../interfaces/StreamerContext';
import { Container } from './Styles';
import SearchResult from './SearchResult';
import useMode from '../../hooks/use-mode';

const SearchResults = (props: {
  searchResults: StreamerResult[];
  savedStreamers: StreamerResult[];
  saveStreamer: (arr: StreamerResult[]) => void;
  streamers: Streamer[];
}) => {
  const { searchResults, savedStreamers, saveStreamer } = props;
  const { mode } = useMode();

  return (
    <Container $visible={mode === State.search}>
      {searchResults.map((result: StreamerResult, index: number) => {
        return (
          <SearchResult
            key={index}
            result={result}
            added={Boolean(props.streamers.find((str) => str.id === result.id))}
            savedStreamers={savedStreamers}
            saveStreamer={saveStreamer}
          />
        );
      })}
    </Container>
  );
};

export default SearchResults;
