import styled from 'styled-components';

export const Bar = styled.div<{ progress: number }>`
  position: absolute;
  border-radius: 0 0 2px 2px;
  width: 100%;
  height: 4px;
  background-color: #373737;
  z-index: 1;
  margin: 0 auto;
  left: 0%;
  top: 0px;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 4px;
    border-radius: 0 0 2px 2px;
    background-color: #29db64;
    transform: scaleX(${(p) => p.progress}%);
    transform-origin: left;
    transition: transform 0.2s linear;
    box-shadow: 0 0 10px 1px #11e758;
  }
`;

export const Ball = styled.div<{ progress: number }>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: #29db64;
  box-shadow: 0 0 2px 2px #29db64b0;
  top: -2px;
  left: ${(p) => p.progress}%;
  position: absolute;
  transition: left 0.2s linear;
`;
