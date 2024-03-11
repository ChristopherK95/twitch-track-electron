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

const StreamerContainer = (props: {
  hideOffline: boolean;
  toggleOffline: (hideOffline: boolean) => void;
  streamers: Streamers[];
  setStreamers: (s: Streamers[]) => void;
  fetching: boolean;
  toggleSearchBar: () => void;
  wentOnline: Streamers[];
  wentOffline: Streamers[];
}) => {
  const { hideOffline, toggleOffline, streamers, setStreamers, fetching, toggleSearchBar, wentOnline, wentOffline } =
    props;
  const state = useSelector((state: RootState) => state.state.state);

  const onToggleOffline = () => {
    toggleOffline(!hideOffline);
  };

  const getCount = (type: 'live' | 'offline') => {
    if (type === 'live') {
      let count = 0;
      for (let i = 0; i < streamers.length; i++) {
        if (streamers[i].live) {
          count++;
        }
      }
      return count;
    }

    let count = 0;
    for (let i = 0; i < streamers.length; i++) {
      if (!streamers[i].live) {
        count++;
      }
    }
    return count;
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
          {Boolean(wentOnline.length) && (
            <Container>
              <Section>
                Went Online <Count>{`(${wentOnline.length})`}</Count>
              </Section>

              <WentOnline streamers={wentOnline} />
            </Container>
          )}
          {Boolean(wentOffline.length) && (
            <Container>
              <Section>
                Went Offline <Count>{`(${wentOffline.length})`}</Count>
              </Section>

              <WentOffline streamers={wentOffline} />
            </Container>
          )}
          <Container>
            <Section>
              Online <Count>{`(${getCount('live')})`}</Count>
              <Miscellaneous fetching={fetching} toggleSearchBar={toggleSearchBar} />
            </Section>

            {streamers
              .filter((streamer) => streamer.live === true)
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
              streamers
                .filter((streamer: Streamers) => streamer.live === false)
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
