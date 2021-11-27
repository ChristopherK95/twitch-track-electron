import React, { useEffect, useState } from "react";
import { StreamerResult } from "../interfaces/StreamerContext";
import "../styles/searchResult.css";

export function SearchResult(props: {
  result: StreamerResult;
  savedStreamers: StreamerResult[];
  saveStreamer: (arr: StreamerResult[]) => void;
}) {
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
    <div className="search-result">
      <img src={props.result.imgUrl} alt="" />
      <h1>{props.result.name}</h1>
      <h2
        className={`${saved ? "saved" : "add"}`}
        onClick={() => {
          saveStreamer(props.result);
        }}
      >
        {saved ? "Added" : "Add"}
      </h2>
    </div>
  );
}
