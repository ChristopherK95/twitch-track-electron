import React, { useEffect } from 'react';
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
  const { searchResults, savedStreamers, saveStreamer, streamers } = props;
  const { mode } = useMode()
  useEffect(() => console.log('new arr'), [searchResults])

  return (
    <Container $visible={mode === State.search}>
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
