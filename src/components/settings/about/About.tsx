import React, { useEffect, useState } from "react";
import { Icon, StyledAbout, UpdateBtn, Version } from "./Styles";
import Github from "../../../svg/Github.svg";
import { AppInfo } from "../../../interfaces/StreamerContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxStore";

const About = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [appInfo, setAppInfo] = useState<AppInfo>({
    currentVersion: "",
    latestVersion: "",
    availableVersion: false,
    os: "",
  });

  const getAppInfo = async () => {
    const response: AppInfo = await window.api.getAppInfo("getAppInfo");
    if (response.availableVersion) {
      dispatch({
        type: "addNotifs",
        payload: {
          name: `New update available - ${response.latestVersion}`,
          live: true,
        },
      });
    }
    setAppInfo(response);
  };

  useEffect(() => {
    getAppInfo();
  }, []);

  return (
    <StyledAbout>
      {appInfo.availableVersion && (
        <UpdateBtn onClick={() => window.api.update("update")}>
          Update
        </UpdateBtn>
      )}
      <Version>Current version | {appInfo.currentVersion}</Version>
      <Version>Latest version | {appInfo.latestVersion}</Version>
      <Version>Operating system | {appInfo.os}</Version>
      <Icon onClick={() => window.api.openRepo("openRepo")}>
        <Github />
      </Icon>
    </StyledAbout>
  );
};

export default About;
