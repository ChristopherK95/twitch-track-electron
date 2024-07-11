import React from 'react';
import { Container, Count, GuideDiv, Section, SectionContainer, StyledStreamerContainer, Text1, Text2 } from './Styles';
import WentOnline from '../WentOnline';
import WentOffline from '../WentOffline';
import Miscellaneous from '../../streamers-view/Misc';
import Streamer from '../../streamer/Streamer';
import { useStreamerContext } from '../../streamers-view/StreamerContext';
import { filterLive, filterOffline, filterRecentlyLive, filterRecentlyOffline } from '../utils';
import useMode from '../../../hooks/use-mode';
import { State } from '../../../interfaces/StreamerContext';

const ColumnLayout = () => {
  const { mode } = useMode();
  const { streamers, isFetching, deleteStreamer, getCount } = useStreamerContext();
  const recentlyLive = filterRecentlyLive(streamers);
  const recentlyOffline = filterRecentlyOffline(streamers);
  const live = filterLive(streamers);
  const offline = filterOffline(streamers);

  return (
    <StyledStreamerContainer $visible={mode === State.main}>
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
              <Miscellaneous fetching={isFetching} />
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
              Offline <Count>{`(${getCount('offline')})`}</Count>
            </Section>
            {offline.map((streamer) => (
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

export default ColumnLayout;
