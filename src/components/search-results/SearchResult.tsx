import React from 'react';
import { StreamerResult } from '../../interfaces/StreamerContext';
import { StyledAdd, StyledImg, StyledName, StyledResult } from './Styles';
import Check from '../../svg/Check';

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
        {added ? (
          <Check size={{ w: 20, h: 20 }} color={'rgb(56,255,155)'} style={{ marginRight: '5px' }} />
        ) : (
          'Add to list'
        )}
      </StyledAdd>
    </StyledResult>
  );
};

export default SearchResult;
