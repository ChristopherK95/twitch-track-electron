import styled, { css, keyframes } from "styled-components";

export const Container = styled.div<{ visible: boolean }>`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  max-width: 200px;
  border-radius: 5px;
  background-color: #3b3b3b;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 35px;
  left: 50px;
  visibility: ${(p) => (p.visible ? "visible" : "hidden")};
  pointer-events: none;
  z-index: 1000;

  ::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 15px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #3b3b3b;
  }
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
  visible: boolean;
  width: number;
  textWidth: number;
}>`
  color: rgb(200, 200, 200);
  margin: 0;
  text-align: left;
  width: max-content;
  font-family: sans-serif;
  font-size: 11px;
  position: relative;
  animation: ${(p) =>
    p.visible && p.textWidth > p.width
      ? css`
          ${slideHorizontal(
            `calc(-100% + ${p.width}px - 20px)`
          )} ${p.textWidth * 0.02}s linear 1s infinite
        `
      : ""};
`;
