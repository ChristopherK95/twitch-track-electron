import {
  LiveStreamer,
  State,
  StreamerResult,
} from "../../interfaces/StreamerContext";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxStore";
import { StyledStreamersView } from "./Styles";
import SearchBar from "../search-bar/SearchBar";
import { StreamerContainer } from "../streamerContainer";
import { SpinnerCircular } from "spinners-react";
import { SearchResults } from "../search-results/SearchResults";
import { ContextMenu } from "../ContextMenu";
import Cog from "../../svg/Cog.svg";
import Bell from "../../svg/Bell.svg";

const StreamersView = (props: {
  tokenMissing: boolean;
  hideSearchBar: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { hideSearchBar, search, setSearch, tokenMissing } = props;
  const state = useSelector((state: RootState) => state.state.state);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [resultArr, setResultArr] = useState<StreamerResult[]>([]);
  const [savedStreamers, setSavedStreamers] = useState<StreamerResult[]>([]);
  const [liveStreamers, setLiveStreamers] = useState<LiveStreamer[]>([]);
  const [hideOffline, toggleOffline] = useState(false);
  const [contextMenu, toggleContextMenu] = useState<{
    show: boolean;
    name: string;
    pos: { x: number; y: number };
  }>({ show: false, name: "", pos: { x: 0, y: 0 } });

  // Makes an API request to Twitch for channels/streamers that match given search param.
  const fetchStreamers = async (name: string) => {
    setResultArr([]);
    const response = await window.api.fetchChannels("fetchChannels", name);
    setResultArr(response);
  };

  useEffect(() => {
    window.api.loading("loading", (loading: boolean) => {
      setLoading(loading);
    });
  }, []);

  return (
    <StyledStreamersView
      visible={state === State.main || state === State.search}
    >
      <div className="misc">
        <i
          className="cog"
          onClick={() =>
            dispatch({ type: "changeState", payload: State.settings })
          }
        >
          <Cog />
        </i>
        <i
          className="bell"
          onClick={() => {
            dispatch({ type: "changeState", payload: State.notifications });
          }}
        >
          <Bell />
        </i>
      </div>
      <SearchBar
        fetch={fetchStreamers}
        tokenMissing={tokenMissing}
        hideSearchBar={hideSearchBar}
        search={search}
        setSearch={setSearch}
      />
      {isLoading && (
        <SpinnerCircular
          color={"#17d963"}
          secondaryColor={"#4D4D4D"}
          size={150}
        />
      )}
      {!isLoading && (
        <>
          <ContextMenu
            context={contextMenu}
            setContext={toggleContextMenu}
            setSavedStreamers={setSavedStreamers}
            savedStreamers={savedStreamers}
            liveStreamers={liveStreamers}
            setLiveStreamers={setLiveStreamers}
          />
          <StreamerContainer
            savedStreamers={savedStreamers}
            setSavedStreamers={setSavedStreamers}
            liveStreamers={liveStreamers}
            setLiveStreamers={setLiveStreamers}
            hideOffline={hideOffline}
            toggleOffline={toggleOffline}
            context={toggleContextMenu}
          />
          <SearchResults
            searchResults={resultArr}
            setArr={setResultArr}
            savedStreamers={savedStreamers}
            saveStreamer={setSavedStreamers}
            setSearch={setSearch}
          />
        </>
      )}
    </StyledStreamersView>
  );
};

export default StreamersView;
