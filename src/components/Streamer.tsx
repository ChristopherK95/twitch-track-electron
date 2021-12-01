import React from "react";
import { StreamerResult, LiveStreamer } from "../interfaces/StreamerContext";
import Viewers from "../svg/Viewers.svg";
import "../styles/streamer.css";

export function Streamer(props: {
  streamer: StreamerResult;
  liveStreamer: LiveStreamer;
  context: (context: {
    show: boolean;
    name: string;
    pos: { x: number; y: number };
  }) => void;
}) {
  let time;

  if (props.liveStreamer !== undefined) {
    time = getTimeElapsed();
  }

  function getTimeElapsed() {
    const date = new Date();
    const duration = date.getTime() - Date.parse(props.liveStreamer.started);
    let minutes: number | string = Math.floor((duration / (1000 * 60)) % 60),
      hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = `${hours}`;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const timeElapsed = hours + "h " + minutes + "m";

    return { timeElapsed, hours, minutes };
  }

  function spawnContext(e: any) {
    let x = e.clientX;
    const y = e.clientY - 43;

    if (x + 100 > e.view.innerWidth) {
      x = x - 100;
    }

    props.context({
      show: true,
      name: props.streamer.name,
      pos: { x: x, y: y },
    });
  }

  return (
    <div
      className={`streamer ${
        props.liveStreamer !== undefined ? "live-border" : "offline-border"
      }`}
      onContextMenu={spawnContext}
    >
      <img src={props.streamer.imgUrl} alt="" />
      <div className="container">
        <h1 className="name">{props.streamer.name}</h1>
        <h2
          className="category"
          title={props.liveStreamer && props.liveStreamer.title}
        >
          {props.liveStreamer !== undefined
            ? props.liveStreamer.category
            : "Offline"}
        </h2>
      </div>
      <div className="status">
        <div
          style={{
            backgroundColor: `${
              props.liveStreamer !== undefined
                ? "rgb(255 86 56)"
                : "rgb(83 83 83)"
            }`,
          }}
          className="dot"
        ></div>
        <p className="viewers">
          {props.liveStreamer !== undefined ? props.liveStreamer.viewers : ""}
        </p>
        {props.liveStreamer !== undefined && (
          <i className="viewer-icon">
            <Viewers />
          </i>
        )}
      </div>
      {props.liveStreamer !== undefined && (
        <p
          className="time-streaming"
          title={`${props.streamer.name} has been live for ${time.hours} hours and ${time.minutes} minutes`}
        >
          {time.timeElapsed}
        </p>
      )}
    </div>
  );
}