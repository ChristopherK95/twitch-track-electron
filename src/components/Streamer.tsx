import React, { useEffect, useState, useRef } from "react";
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
  const [viewers, setViewers] = useState<string>();
  const [prevCategory, setPrevCategory] = useState<string>("");
  const [changedCategory, toggleChangedCategory] = useState<boolean>();
  const tooltipRef = useRef(null);
  const titleRef = useRef(null);

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
    console.log(titleRef);
    props.context({
      show: true,
      name: props.streamer.name,
      pos: { x: x, y: y },
    });
  }

  function openStream() {
    window.api.openStream("openStream", props.streamer.name);
  }

  useEffect(() => {
    if (props.liveStreamer === undefined) return;
    if (props.liveStreamer.viewers > 999) {
      let string = `${props.liveStreamer.viewers / 1000}`;
      const decimals = string.split(".")[1];
      string = string.replace(".", ",");
      if (string.includes(",")) {
        setViewers(
          string.slice(0, string.length - (decimals.length - 1)) + "k"
        );
      } else {
        setViewers(string + "k");
      }
    } else {
      setViewers(`${props.liveStreamer.viewers}`);
    }
    if (prevCategory !== "" && props.liveStreamer.category !== prevCategory) {
      toggleChangedCategory(true);
      setTimeout(() => {
        toggleChangedCategory(false);
      }, 1000);
    }
    setPrevCategory(props.liveStreamer.category);
  }, [props.liveStreamer]);

  return (
    <div
      className={`streamer ${
        props.liveStreamer !== undefined ? "live-border" : "offline-border"
      }`}
      onContextMenu={spawnContext}
    >
      <img src={props.streamer.imgUrl} alt="" />
      <div className="container">
        <h1 className="name" onClick={openStream}>
          {props.streamer.name}
        </h1>
        <h2 className={`category ${changedCategory ? "category-changed" : ""}`}>
          {props.liveStreamer !== undefined
            ? props.liveStreamer.category
            : "Offline"}
        </h2>
        {props.liveStreamer && (
          <div ref={tooltipRef} className="tooltip">
            <p className="t-category">
              {props.liveStreamer && props.liveStreamer.category}
            </p>
            <div
              className="marquee"
              style={{
                animation: `marquee ${
                  props.liveStreamer.title.length * 0.14
                }s linear infinite alternate`,
              }}
            >
              <p
                ref={titleRef}
                className="t-title"
                style={{
                  animation: `marquee-content ${
                    props.liveStreamer.title.length * 0.14
                  }s linear infinite alternate`,
                }}
              >
                {props.liveStreamer && props.liveStreamer.title}
              </p>
            </div>
          </div>
        )}
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
        <p className="viewers">{viewers !== undefined ? viewers : ""}</p>
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
