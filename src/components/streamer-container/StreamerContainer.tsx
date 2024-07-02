import React from 'react';
import { useSelector } from 'react-redux';
import { State, Streamer as Streamers } from '../../interfaces/StreamerContext';
import Plus from '../../svg/Plus';
import Dash from '../../svg/Dash';
import { RootState } from '../../reduxStore';
import Streamer from '../streamer/Streamer';
import {
  StyledStreamerContainer,
  SectionContainer,
  Container,
  Section,
  Count,
  Toggle,
  GuideDiv,
  Text1,
  Text2
} from './Styles';
import Miscellaneous from '../streamers-view/Misc';
import WentOnline from './WentOnline';
import WentOffline from './WentOffline';

function wentLive(date: string) {
  const now = new Date().getTime()
  const start = new Date(date).getTime()

  // Return true if time since live is less than 1 minute.
  return ((now - start) / 1000 / 60) < 1
}

function wentOffline(date?: number) {
  if (!date) {
    return false
  }

  const now = new Date().getTime()

  // Return true if time since live is less than 1 minute.
  return ((date - now) / 1000 / 60) < 1
}

const StreamerContainer = (props: {
  hideOffline: boolean;
  toggleOffline: (hideOffline: boolean) => void;
  streamers: Streamers[];
  setStreamers: (s: Streamers[]) => void;
  fetching: boolean;
  toggleSearchBar: () => void;
}) => {
  const { hideOffline, toggleOffline, streamers, setStreamers, fetching, toggleSearchBar } =
    props;
  const state = useSelector((state: RootState) => state.state.state);
  const recentlyLive = streamers.filter(s => s.live && wentLive(s.started))
  const recentlyOffline = streamers.filter(s => !s.live && wentOffline(s.ended))
  const live = streamers.filter(s => s.live && !wentLive(s.started))
  const offline = streamers.filter(s => !s.live && !wentOffline(s.ended))

  const onToggleOffline = () => {
    toggleOffline(!hideOffline);
  };

  const getCount = (type: 'live' | 'offline') => {
    if (type === 'live') {
      return live.length + recentlyLive.length;
    }

    return offline.length + recentlyOffline.length;
  };

  const deleteStreamer = (id: string) => {
    // Checks if streamer is currently live and removes them from liveStreamers first if true.
    setStreamers(streamers.filter((streamer) => streamer.id !== id));
    const streamer = streamers.find((s) => s.id === id);
    if (streamer) {
      window.api.deleteStreamer('deleteStreamer', streamer);
    }
  };

  return (
    <StyledStreamerContainer visible={state === State.main}>
      {streamers.length > 0 ? (
        <SectionContainer>
          {Boolean(recentlyLive.length) && (
            <Container>
              <Section>
                Went Online <Count>{`(${recentlyLive.length})`}</Count>
              </Section>

              <WentOnline streamers={recentlyLive} />
            </Container>
          )}
          {Boolean(recentlyOffline.length) && (
            <Container>
              <Section>
                Went Offline <Count>{`(${recentlyOffline.length})`}</Count>
              </Section>

              <WentOffline streamers={recentlyOffline} />
            </Container>
          )}
          <Container>
            <Section>
              Online <Count>{`(${getCount('live')})`}</Count>
              <Miscellaneous fetching={fetching} toggleSearchBar={toggleSearchBar} />
            </Section>

            {live
              .sort((a, b) => {
                if (a.viewers && b.viewers) {
                  if (a.viewers < b.viewers) {
                    return 1;
                  }
                  if (a.viewers > b.viewers) {
                    return -1;
                  }
                }
                return 0;
              })
              .map((streamer) => {
                return (
                  <Streamer
                    id={streamer.id}
                    key={streamer.id}
                    name={streamer.name}
                    imgUrl={streamer.imgUrl}
                    live={true}
                    category={streamer.category}
                    title={streamer.title}
                    viewers={streamer.viewers}
                    started={streamer.started}
                    deleteStreamer={deleteStreamer}
                  />
                );
              })}
          </Container>
          <Container>
            <Section>
              Offline{' '}
              <Count onClick={onToggleOffline}>
                {`(${getCount('offline')})`}
                <Toggle>{hideOffline ? <Plus /> : <Dash />}</Toggle>
              </Count>
            </Section>
            {!hideOffline &&
              offline
                .map((streamer) => (
                  <Streamer
                    key={streamer.id}
                    id={streamer.id}
                    name={streamer.name}
                    imgUrl={streamer.imgUrl}
                    live={false}
                    deleteStreamer={deleteStreamer}
                  />
                ))}
          </Container>
        </SectionContainer>
      ) : (
        <GuideDiv>
          <Text1>This is where your favourite streamers will be shown once you have added them.</Text1>
          <Text2>
            Use the search box above to search for your streamers and add them to your selection of streamers to keep
            track of.
          </Text2>
        </GuideDiv>
      )}
    </StyledStreamerContainer>
  );
};

export default StreamerContainer;
