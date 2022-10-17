import styled from 'styled-components';

export const StyledMainWindow = styled.div`
  text-align: center;
  background-color: #121212;
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;

  body {
    margin: 0;
    overflow: hidden;
  }
`;

export const TopBar = styled.div`
  display: flex;
  height: 30px;
  background: #121212;
  position: relative;
  justify-content: space-between;
  z-index: 100;
`;

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  width: -webkit-fill-available;
`;

export const Handle = styled.div`
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
  position: relative;
  font-family: Iosevka;
  color: #c8c8c8;
  font-weight: bold;
  text-align: left;
  padding: 10px 0 0 10px;
`;

export const LogoIcon = styled.i`
  width: 20px;
  position: relative;
  left: 6px;
  top: 4px;
  display: flex;
`;

export const TitleBarBtns = styled.div`
  display: flex;

  button {
    height: 100%;
    width: 40px;
    border: none;
  }
`;

export const MinimizeBtn = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background: #474747;
  }

  div {
    width: 15px;
    height: 3px;
    background-color: white;
  }
`;

export const CloseBtn = styled.button`
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background: rgb(238, 38, 71);
  }

  div {
    width: 15px;
    height: 3px;
    background: white;
    transform: rotate(-45deg);
    position: absolute;

    :first-child {
      transform: rotate(45deg);
    }
  }
`;

export const Main = styled.div`
  display: flex;
  overflow-y: hidden;
  position: relative;
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: -webkit-fill-available;
  overflow-x: hidden;
  overflow-y: hidden;
  background: #262626;
  padding-right: 3px;
`;

export const MissingToken = styled.div`
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  z-index: 1000;
  width: 100vw;
  height: 50px;
  font-family: system-ui;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover {
    background-color: #111111e4;
  }
`;
