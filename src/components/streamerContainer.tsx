import React, { useEffect, useState } from "react";
import {
  StreamerResult,
  LiveStreamer,
  StreamResponse,
  Notif,
} from "../interfaces/StreamerContext";
import { Streamer } from "./Streamer";
import "../styles/streamerContainer.css";
import NotifFx from "../audio/NotificationSound.wav";
import Plus from "../svg/Plus.svg";
import Dash from "../svg/Dash.svg";

export function StreamerContainer(props: {
  savedStreamers: StreamerResult[];
  setSavedStreamers: (streamers: StreamerResult[]) => void;
  liveStreamers: LiveStreamer[];
  setLiveStreamers: (streamers: LiveStreamer[]) => void;
  toggleSearch: boolean;
  hideOffline: boolean;
  toggleOffline: (hideOffline: boolean) => void;
  context: (context: {
    show: boolean;
    name: string;
    pos: { x: number; y: number };
  }) => void;
  setNotifs: (notifs: Notif[]) => void;
  show: string;
}) {
  const [updatedStreamers, setUpdatedStreamers] = useState<LiveStreamer[]>([]);
  const [started, setStarted] = useState(false);
  const [notify, toggleNotify] = useState(false);
  const notifFx = new Audio(NotifFx);

  function getDiff() {
    const onlineDiff = updatedStreamers.filter(
      (x) => !props.liveStreamers.some((y) => y.id === x.id)
    );
    const offlineDiff = props.liveStreamers.filter(
      (x) => !updatedStreamers.some((y) => y.id === x.id)
    );
    const notifArr = [];
    for (let i = 0; i < onlineDiff.length; i++) {
      const notif = { name: onlineDiff[i].name, live: true };
      notifArr.push(notif);
    }
    for (let i = 0; i < offlineDiff.length; i++) {
      const notif = { name: offlineDiff[i].name, live: false };
      notifArr.push(notif);
    }
    if (notifArr.length === 0) return;
    notifFx.play();
    props.setNotifs(notifArr);
  }

  function hideOffline() {
    props.toggleOffline(!props.hideOffline);
  }

  useEffect(() => {
    if (notify) {
      if (props.liveStreamers.length === 0 && updatedStreamers.length === 0)
        return;
      getDiff();
      const sortedArr = updatedStreamers.sort((a, b) => b.viewers - a.viewers);
      props.setLiveStreamers(sortedArr);
      toggleNotify(false);
    } else {
      const sortedArr = updatedStreamers.sort((a, b) => b.viewers - a.viewers);
      props.setLiveStreamers(sortedArr);
    }
  }, [updatedStreamers]);

  useEffect(() => {
    window.api.awaitStatus(
      "awaitStatus",
      (event: { tag: string; data: StreamResponse }) => {
        const arr: LiveStreamer[] = [];
        for (let i = 0; i < event.data.data.length; i++) {
          const streamer: LiveStreamer = {
            id: event.data.data[i].user_id,
            name: event.data.data[i].user_login,
            category: event.data.data[i].game_name,
            title: event.data.data[i].title,
            started: event.data.data[i].started_at,
            viewers: event.data.data[i].viewer_count,
          };
          arr.push(streamer);
        }
        if (event.tag === "update") {
          toggleNotify(true);
        }
        setUpdatedStreamers(arr);
      }
    );

    window.api.loadStreamers("loadStreamers", (event: StreamerResult[]) => {
      props.setSavedStreamers(event);
    });

    window.api.rendererReady("rendererReady");
  }, []);

  return (
    <div
      style={{ display: `${!props.toggleSearch ? "flex" : "none"}` }}
      className={`streamer-container ${props.show}`}
    >
      <div className="online">
        <h2 className="section">
          Online{" "}
          <span className="count">{`(${props.liveStreamers.length})`}</span>
        </h2>
        {props.liveStreamers.length > 0 &&
          props.liveStreamers.map((streamer: LiveStreamer, index: number) => {
            return (
              <Streamer
                key={index}
                streamer={props.savedStreamers.find(
                  (item) => item.id === streamer.id
                )}
                liveStreamer={streamer}
                context={props.context}
              />
            );
          })}
      </div>
      <div className="offline">
        <h2 className="section">
          Offline{" "}
          <span className="count" onClick={hideOffline}>
            {`(${props.savedStreamers.length - props.liveStreamers.length})`}
            <i className="toggle">{props.hideOffline ? <Plus /> : <Dash />}</i>
          </span>
        </h2>
        {!props.hideOffline &&
          props.savedStreamers.map(
            (streamer: StreamerResult, index: number) => {
              if (
                !props.liveStreamers.some((live) => live.id === streamer.id)
              ) {
                return (
                  <Streamer
                    key={index}
                    streamer={streamer}
                    liveStreamer={props.liveStreamers.find(
                      (item) => item.id === streamer.id
                    )}
                    context={props.context}
                  />
                );
              }
            }
          )}
      </div>
    </div>
  );
}
