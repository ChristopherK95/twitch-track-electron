import React, { useEffect, useState } from 'react';
import { Icon, StyledAbout, UpdateBtn, Version } from './Styles';
import Github from '../../../svg/Github';
import { AppInfo } from '../../../interfaces/StreamerContext';
import useNotify from '../../../hooks/use-notify';

const About = () => {
  const { notify } = useNotify();
  const [appInfo, setAppInfo] = useState<AppInfo>({
    currentVersion: '',
    latestVersion: '',
    availableVersion: false
  });

  const getAppInfo = async () => {
    const response: AppInfo = await window.api.getAppInfo('getAppInfo');
    if (response.availableVersion) {
      notify(`New update available - ${response.latestVersion}`, true, false);
    }
    setAppInfo(response);
  };

  useEffect(() => {
    getAppInfo();
  }, []);

  return (
    <StyledAbout>
      {appInfo.availableVersion && <UpdateBtn onClick={() => window.api.update('update')}>Update</UpdateBtn>}
      <Version>Current version | {appInfo.currentVersion}</Version>
      <Version>Latest version | {appInfo.latestVersion}</Version>
      <Icon onClick={() => window.api.openRepo('openRepo')}>
        <Github />
      </Icon>
    </StyledAbout>
  );
};

export default About;
