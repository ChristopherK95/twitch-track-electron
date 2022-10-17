import React, { useLayoutEffect, useRef } from 'react';
import { Streamer } from '../../interfaces/StreamerContext';
import { StyledContextMenu, Delete } from './Styles';

const ContextMenu = (props: {
  context: { show: boolean; name: string; pos: { x: number; y: number } };
  setContext: (context: { show: boolean; name: string; pos: { x: number; y: number } }) => void;
  streamers: Streamer[];
  setStreamers: React.Dispatch<React.SetStateAction<Streamer[]>>;
}) => {
  const { context, setContext, setStreamers, streamers } = props;
  const contextRef = useRef({} as HTMLDivElement);

  function deleteStreamer() {
    // Checks if streamer is currently live and removes them from liveStreamers first if true.
    setStreamers(streamers.filter((streamer) => streamer.name !== context.name));
    const streamer = streamers.find((s) => s.name === context.name);

    window.api.deleteStreamer('deleteStreamer', streamer);
    setContext({ show: false, name: '', pos: { x: 0, y: 0 } });
  }

  useLayoutEffect(() => {
    contextRef.current.focus();
  }, [context]);

  return (
    <StyledContextMenu
      ref={contextRef}
      visible={context.show}
      x={context.pos.x}
      y={context.pos.y}
      tabIndex={0}
      onBlur={() => setContext({ show: false, name: '', pos: { x: 0, y: 0 } })}
    >
      <Delete onClick={deleteStreamer}>Delete User</Delete>
    </StyledContextMenu>
  );
};

export default ContextMenu;
