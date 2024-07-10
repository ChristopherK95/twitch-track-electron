import styled, { css, keyframes } from 'styled-components';

export const Container = styled.div<{ $visible: boolean }>`
  width: fit-content;
  height: fit-content;
  padding: 6px;
  max-width: 200px;
  border-radius: 3px;
  background-color: #262626;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 30px;
  left: 70px;
  visibility: ${(p) => (p.$visible ? 'visible' : 'hidden')};
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transform: ${(p) => (p.$visible ? 'translateY(0)' : 'translateY(30px)')};
  pointer-events: none;
  z-index: 1000;

  ${(p) => p.$visible && 'transition: opacity 0.2s ease 0.3s, transform 0.2s ease 0.3s;'}
`;

export const Category = styled.p`
  color: white;
  margin: 0;
  text-align: left;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

const slideHorizontal = (x: string) => keyframes`
  0% {
    transform : translateX(0)
  }
  70% {
    transform: translateX(${x});
  }
  80% {
    transform: translateX(${x});
  }
  90%{
    transform: translateX(0);
  }
  100%{
    transform: translateX(0);
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Title = styled.p<{
  $visible: boolean;
  $width: number;
  $textWidth: number;
}>`
  color: rgb(200, 200, 200);
  margin: 0;
  text-align: left;
  width: max-content;
  font-family: sans-serif;
  font-size: 11px;
  font-weight: 600;
  position: relative;
  animation: ${(p) =>
    p.$visible && p.$textWidth > p.$width
      ? css`
          ${slideHorizontal(`calc(-100% + ${p.$width}px - 20px)`)} ${p.$textWidth * 0.02}s linear 1s infinite
        `
      : ''};
`;
