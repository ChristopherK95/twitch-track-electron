import React, { useEffect, useState } from 'react';
import { Streamer, StreamerResult } from '../../interfaces/StreamerContext';
import { StyledAdd, StyledImg, StyledName, StyledResult } from './Styles';

const SearchResult = (props: {
  result: StreamerResult;
  added: boolean;
  savedStreamers: StreamerResult[];
  saveStreamer: (arr: StreamerResult[]) => void;
}) => {
  const { result, savedStreamers, saveStreamer, added } = props;

  function handleAdd() {
    if (added) {
      return;
    }
    const arr: StreamerResult[] = savedStreamers;
    arr.push(result);
    saveStreamer(arr);
    window.api.saveStreamer('saveStreamer', savedStreamers);
    window.api.askStatus('askStatus', result);
  }

  return (
    <StyledResult>
      <StyledImg src={result.imgUrl} alt="" />
      <StyledName>{result.name}</StyledName>
      <StyledAdd $saved={added} onClick={handleAdd}>
        {added ? 'Added' : 'Add'}
      </StyledAdd>
    </StyledResult>
  );
};

export default SearchResult;
