import styled from 'styled-components';

export const StyledStreamersView = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  z-index: ${(p) => (p.visible ? 11 : 10)};
  background: #262626;
  transition: transform 0.5s ease, opacity 0.3s ease;
  transform: ${(p) => (p.visible ? 'scale(100%)' : 'scale(80%)')};
  opacity: ${(p) => (p.visible ? '1' : '0')};
  overflow-x: hidden;
`;

export const Misc = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 5%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  transition: background-color 0.3s;
  position: relative;
  margin-top: 15px;
  gap: 10px;
`;

export const TopbarBtn = styled.button`
  position: relative;
  border: none;
  border-radius: 3px;
  background-color: #626262;
  color: white;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 50%);
  font-family: system-ui;
  font-weight: bold;
  height: 25px;
  display: flex;
  align-items: center;
  padding-right: 25px;
  user-select: none;
  transition: background-color 0.3s ease;
  cursor: pointer;

  :hover {
    background-color: #464646;

    i {
      animation-play-state: running;
      fill: white;
    }
  }
`;

export const StyledCog = styled.i`
  position: absolute;
  right: 5px;
  width: 16px;
  height: 16px;
  fill: white;
  transition: fill 0.5s ease;
  animation: spin 2s linear infinite;
  animation-play-state: paused;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StyledBell = styled.i`
  position: absolute;
  right: 5px;
  width: 15px;
  height: 18px;
  fill: white;
  transition: fill 0.5s ease;
  animation: shake 1.2s ease infinite;
  animation-play-state: paused;

  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(10deg);
    }
    20% {
      transform: rotate(-10deg);
    }
    30% {
      transform: rotate(10deg);
    }
    40% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(10deg);
    }
    60%,
    100% {
      transform: rotate(0deg);
    }
  }
`;

