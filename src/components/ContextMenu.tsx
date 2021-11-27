import React, { useEffect, useRef } from "react";
import { StreamerResult, LiveStreamer } from "../interfaces/StreamerContext";
import "../styles/contextMenu.css";

export function ContextMenu(props: {
  context: { show: boolean; name: string; pos: { x: number; y: number } };
  setContext: (context: {
    show: boolean;
    name: string;
    pos: { x: number; y: number };
  }) => void;
  setSavedStreamers: (arr: StreamerResult[]) => void;
  savedStreamers: StreamerResult[];
  liveStreamers: LiveStreamer[];
  setLiveStreamers: (streamers: LiveStreamer[]) => void;
}) {
  const contextRef = useRef(null);

  function deleteStreamer(e: any) {
    // Checks if streamer is currently live and removes them from liveStreamers first if true.
    if (
      props.liveStreamers.some(
        (streamer) =>
          streamer.name.toLowerCase() === props.context.name.toLowerCase()
      )
    ) {
      const liveArr: LiveStreamer[] = props.liveStreamers.filter(
        (streamer) =>
          streamer.name.toLowerCase() !== props.context.name.toLowerCase()
      );
      props.setLiveStreamers(liveArr);
    }

    const arr: StreamerResult[] = props.savedStreamers.filter(
      (streamer) => streamer.name !== props.context.name
    );
    const streamer = props.savedStreamers.find(
      (streamer) => streamer.name === props.context.name
    );
    props.setSavedStreamers(arr);

    window.api.deleteStreamer("deleteStreamer", streamer);
    props.setContext({ show: false, name: "", pos: { x: 0, y: 0 } });
  }

  useEffect(() => {
    contextRef.current.focus();
  }, [props.context]);

  return (
    <div
      ref={contextRef}
      style={{
        visibility: `${props.context.show ? "visible" : "hidden"}`,
        left: `${props.context.pos.x}px`,
        top: `${props.context.pos.y}px`,
      }}
      className="context-menu"
      tabIndex={1}
      onBlur={() =>
        props.setContext({ show: false, name: "", pos: { x: 0, y: 0 } })
      }
    >
      <p className="delete" onClick={deleteStreamer}>
        Delete User
      </p>
    </div>
  );
}
