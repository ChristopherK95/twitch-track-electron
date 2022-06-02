import styled from "styled-components";

export const StyledCategory = styled.h2<{ offline?: boolean }>`
  margin: 0;
  padding: 0;
  text-align: left;
  font-size: ${(p) => (p.offline ? "14px" : "16px")};
  font-family: system-ui;
  color: ${(p) => (p.offline ? "rgb(92, 92, 92)" : "rgb(150, 150, 150)")};
  height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  cursor: default;
  transform-origin: left;
  transition: transform 0.5s ease, color 0.5s ease;
  user-select: none;
`;

export const StyledImg = styled.img`
  height: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  user-select: none;
`;
