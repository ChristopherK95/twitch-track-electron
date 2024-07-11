import styled from 'styled-components';

export const StyledSplash = styled.div`
  margin: 5px;
  height: 290px;
  width: 290px;
  background: linear-gradient(131deg, #e7e7e7bd -71%, #1d2226eb 25%);
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px #0000008c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingText = styled.p`
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

export const LoadingBar = styled.div`
  width: 200px;
  height: 15px;
  border-radius: 10px;
  background-color: #141414;
  overflow: hidden;
  position: relative;

  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 30%;
    border-radius: 5px;
    animation: move 3s linear infinite;
    transform: translateX(-100%);
    background: linear-gradient(90deg, #0cff8a, #67ffb6);
  }

  @keyframes move {
    0% {
      left: 0;
    }
    70%,
    100% {
      left: 130%;
    }
  }
`;

export const Bubble = styled.g`
  animation: hover 3s linear infinite;

  @keyframes hover {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(30px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

export const EyeGroup = styled.g`
  animation: blink 2s linear infinite;
  transform-origin: center 35%;

  @keyframes blink {
    0%,
    30% {
      transform: scaleY(100%);
    }
    50% {
      transform: scaleY(10%);
    }
    70%,
    100% {
      transform: scaleY(100%);
    }
  }
`;
