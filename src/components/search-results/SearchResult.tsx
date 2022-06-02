import React, { useEffect, useState } from "react";
import { StreamerResult } from "../../interfaces/StreamerContext";
import { StyledAdd, StyledImg, StyledName, StyledResult } from "./Styles";

export const SearchResult = (props: {
  result: StreamerResult;
  savedStreamers: StreamerResult[];
  saveStreamer: (arr: StreamerResult[]) => void;
}) => {
  const [saved, setSaved] = useState(false);

  function saveStreamer(streamer: StreamerResult) {
    const arr: StreamerResult[] = props.savedStreamers;
    arr.push(streamer);
    props.saveStreamer(arr);
    setSaved(true);
    window.api.saveStreamer("saveStreamer", props.savedStreamers);
    window.api.askStatus("askStatus", streamer);
  }

  useEffect(() => {
    if (
      props.savedStreamers.some((streamer) => streamer.id === props.result.id)
    ) {
      setSaved(true);
    }
  }, []);

  return (
    <StyledResult>
      <StyledImg src={props.result.imgUrl} alt="" />
      <StyledName>{props.result.name}</StyledName>
      <StyledAdd
        saved={saved}
        onClick={() => {
          !saved && saveStreamer(props.result);
        }}
      >
        {saved ? "Added" : "Add"}
      </StyledAdd>
    </StyledResult>
  );
};
