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
  const [saved, setSaved] = useState<boolean>(Boolean(streamers.find(str => str.id === result.id)));

  function handleSave() {
    if (saved) {
      return
    }
    const arr: StreamerResult[] = savedStreamers;
    arr.push(result);
    saveStreamer(arr);
    setSaved(true);
    window.api.saveStreamer('saveStreamer', savedStreamers);
    window.api.askStatus('askStatus', result);
  }

  useEffect(() => console.log(saved, result.id), [saved])
  useEffect(() => console.log('Update'), [])

  return (
    <StyledResult>
      <StyledImg src={result.imgUrl} alt="" />
      <StyledName>{result.name}</StyledName>
      <StyledAdd $saved={saved} onClick={handleSave}>
        {saved ? 'Added' : 'Add'}
      </StyledAdd>
    </StyledResult>
  );
};

export default SearchResult;
