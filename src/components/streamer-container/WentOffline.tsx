import { Streamer as Streamers } from '../../interfaces/StreamerContext';
import Streamer from '../streamer/Streamer';
import React from 'react';

const WentOffline = (props: { streamers: Streamers[] }) => {
  return (
    <>
      {props.streamers.map((s) => (
        <Streamer
          id={s.id}
          key={s.id}
          name={s.name}
          imgUrl={s.imgUrl}
          live={true}
          category={s.category}
          title={s.title}
          viewers={s.viewers}
          started={s.started}
        />
      ))}
    </>
  );
};

export default WentOffline;
