import styled from 'styled-components';

export const StyledStreamersView = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  transition: background-color 0.3s;
  position: absolute;
  top: 0px;
  right: 0px;
  gap: 5px;
`;

export const TopbarBtn = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  font-family: system-ui;
  font-weight: bold;
  height: 24px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  z-index: 100;

  :hover {
    i {
      animation-play-state: running;
      fill: white;
      transform: scale(1.1);
    }
  }
`;

export const StyledSearch = styled.i`
  position: relative;
  display: flex;
  width: 16px;
  height: 24px;
  fill: #aaaaaa;
  transition: stroke 0.3s ease, transform 0.3s ease;

  :hover {
    svg {
      path {
        stroke: white;
      }
    }
  }
`;

export const StyledCog = styled.i`
  position: relative;
  display: flex;
  width: 16px;
  height: 24px;
  fill: #aaaaaa;
  transition: fill 0.3s ease, transform 0.3s ease;
`;

export const StyledBell = styled.i`
  position: relative;
  display: flex;
  width: 15px;
  height: 24px;
  fill: #aaaaaa;
  transition: fill 0.3s ease, transform 0.3s ease;
`;

export const StyledAddButton = styled.button`
  width: 45px;
  height: 45px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #303030;
  border: none;

  &:hover {
    background-color: #505050;
  }
`
