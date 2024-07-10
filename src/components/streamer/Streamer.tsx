import React, { useEffect, useState } from 'react';
import Trashcan from '../../svg/Trashcan';
import Tooltip from '../tooltip/Tooltip';
import Category from './Category';
import Img from './Img';
import Status from './Status';
import { StyledStreamer, Container, Name, TimeElapsed, Delete, DeleteContainer } from './Styles';

type LiveProps =
  | {
      live: true;
      started: string;
      viewers: number;
      category: string;
      title: string;
    }
  | {
      live: false;
      started?: never;
      viewers?: never;
      category?: never;
      title?: never;
    };

const Streamer = (
  props: {
    id: string;
    name: string;
    imgUrl: string;
    deleteStreamer?: (id: string) => void;
  } & LiveProps
) => {
  const { id, name, imgUrl, started, viewers, live, category, title, deleteStreamer } = props;
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [deleteHover, setDeleteHover] = useState<boolean>(false);
  const [prevCategory, setPrevCategory] = useState<string>(category ?? '');

  const getTimeElapsed = (started: string) => {
    const date = new Date();
    const duration = date.getTime() - Date.parse(started);
    const minutes: number | string = Math.floor((duration / (1000 * 60)) % 60);
    const hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const timeElapsed = `${hours}h ${minutes}m`;

    return { timeElapsed, hours, minutes };
  };

  const openStream = () => {
    window.api.openStream('openStream', name);
  };

  if (live) {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [liveViewers, setLiveViewers] = useState<string>('');
    const time = getTimeElapsed(started);

    const toggleTooltip = (hover: boolean) => {
      setShowTooltip(hover);
    };

    useEffect(() => {
      if (viewers > 999) {
        let string = `${viewers / 1000}`;
        const decimals = string.split('.')[1];
        string = string.replace('.', ',');
        if (string.includes(',')) {
          setLiveViewers(`${string.slice(0, string.length - (decimals.length - 1))}k`);
        } else {
          setLiveViewers(`${string}k`);
        }
      } else {
        setLiveViewers(`${viewers}`);
      }
      // if (prevCategory !== "" && props.liveStreamer.category !== prevCategory) {
      //   toggleChangedCategory(true);
      //   setTimeout(() => {
      //     toggleChangedCategory(false);
      //   }, 1000);
      // }
      // setPrevCategory(props.liveStreamer.category);
    }, [viewers, category, title]);

    useEffect(() => {
      setTimeout(() => setPrevCategory(category), 3000);
    }, [category]);

    return (
      <StyledStreamer onContextMenu={() => setShowDelete((show: boolean) => !show)}>
        <Img url={imgUrl} />
        <Container>
          <Name onClick={openStream}>{name}</Name>
          <Category hover={toggleTooltip} category={category} live={true} categoryChanged={prevCategory !== category} />
          {title && <Tooltip category={category} title={title} visible={showTooltip} />}
        </Container>
        <>
          <Status viewers={liveViewers.toString()} />
          <TimeElapsed title={`${name} has been live for ${time.hours} hours and ${time.minutes} minutes`}>
            {time.timeElapsed}
          </TimeElapsed>
        </>
        {deleteStreamer && (
          <DeleteContainer>
            <Delete
              $visible={showDelete}
              onClick={() => deleteStreamer(id)}
              onMouseEnter={() => setDeleteHover(true)}
              onMouseLeave={() => setDeleteHover(false)}
            >
              <Trashcan tooltipText={'Delete'} hover={deleteHover} style={{ position: 'static', fill: 'white' }} />
            </Delete>
          </DeleteContainer>
        )}
      </StyledStreamer>
    );
  }

  return (
    <StyledStreamer onContextMenu={() => setShowDelete((show: boolean) => !show)}>
      <Img url={imgUrl} />
      <Container>
        <Name onClick={openStream}>{name}</Name>
        <Category live={false} />
      </Container>
      {deleteStreamer && (
        <DeleteContainer>
          <Delete
            onClick={() => deleteStreamer(id)}
            $visible={showDelete}
            onMouseEnter={() => setDeleteHover(true)}
            onMouseLeave={() => setDeleteHover(false)}
          >
            <Trashcan tooltipText={'Delete'} hover={deleteHover} style={{ position: 'static', fill: 'white' }} />
          </Delete>
        </DeleteContainer>
      )}
    </StyledStreamer>
  );
};

export default Streamer;
