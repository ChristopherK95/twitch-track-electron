import React, { useEffect, useState } from 'react';
import { Streamer, StreamerResult } from '../../interfaces/StreamerContext';
import { StyledAdd, StyledImg, StyledName, StyledResult } from './Styles';

const SearchResult = (props: {
  result: StreamerResult;
  savedStreamers: StreamerResult[];
  saveStreamer: (arr: StreamerResult[]) => void;
  streamers: Streamer[];
}) => {
  const { result, savedStreamers, saveStreamer, streamers } = props;
  const [saved, setSaved] = useState(false);

  function handleSave(streamer: StreamerResult) {
    const arr: StreamerResult[] = savedStreamers;
    arr.push(streamer);
    saveStreamer(arr);
    setSaved(true);
    window.api.saveStreamer('saveStreamer', savedStreamers);
    window.api.askStatus('askStatus', streamer);
  }

  useEffect(() => {
    if (streamers.find((streamer) => streamer.id === result.id)) {
      setSaved(true);
    } else setSaved(false);
  }, [result]);

  return (
    <StyledResult>
      <StyledImg src={result.imgUrl} alt="" />
      <StyledName>{result.name}</StyledName>
      <StyledAdd saved={saved} onClick={() => !saved && handleSave(result)}>
        {saved ? 'Added' : 'Add'}
      </StyledAdd>
    </StyledResult>
  );
};

export default SearchResult;
