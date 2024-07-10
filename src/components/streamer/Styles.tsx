import styled from 'styled-components';

export const StyledStreamer = styled.div`
  height: 60px;
  width: 100%;
  background-color: #181819;
  border-radius: 3px;
  position: relative;
  display: flex;
  margin-bottom: 10px;
  box-shadow: -4px 4px 10px 1px rgb(0 0 0 / 30%);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10px;
  max-width: 55%;
`;

export const Name = styled.h1`
  margin: 0;
  font-family: system-ui;
  color: rgb(200, 200, 200);
  font-size: 25px;
  text-align: left;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  cursor: pointer;
  width: fit-content;
  max-width: 100%;
  user-select: none;

  :hover {
    color: rgb(255, 255, 255);
  }
`;

export const TimeElapsed = styled.p`
  position: absolute;
  right: 10px;
  bottom: 5px;
  margin: 0;
  font-family: system-ui;
  font-weight: bold;
  color: #9f9f9f;
  font-size: 14px;
  cursor: default;
`;

export const StyledCategory = styled.h2<{ $offline?: boolean; $categoryChanged?: boolean }>`
  margin: 0;
  padding: 0;
  text-align: left;
  font-size: ${(p) => (p.$offline ? '14px' : '16px')};
  font-family: system-ui;
  color: ${(p) => (p.$offline ? 'rgb(92, 92, 92)' : 'rgb(150, 150, 150)')};
  height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  cursor: default;
  transform-origin: left;
  transition: transform 0.5s ease, color 0.5s ease;
  user-select: none;
  ${(p) => p.$categoryChanged && 'transform: scale(1.3); color: white;'}
`;

export const StyledImg = styled.img`
  height: 100%;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  user-select: none;
`;

export const StyledStatus = styled.div`
  display: flex;
  height: fit-content;
  align-items: center;
  flex-direction: row-reverse;
  position: absolute;
  right: 10px;
  top: 5px;
`;

export const Live = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-left: 5px;
  background-color: rgb(255, 86, 56);
`;

export const StyledViewers = styled.p`
  color: rgb(255, 86, 56);
  font-family: system-ui;
  margin: 0;
  font-weight: bold;
  cursor: default;
  font-size: 14px;
`;

export const ViewersIcon = styled.i`
  width: 10px;
  height: 16px;
  fill: rgb(255, 86, 56);
  margin-right: 3px;
`;

export const DeleteContainer = styled.div`
  position: absolute;
  right: 0;
  overflow: hidden;
  height: 100%;
  width: 180px;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
`;

export const Delete = styled.div<{ $visible: boolean }>`
  background-color: #ff3d3d;
  width: 100px;
  height: 100%;
  border-radius: 0 3px 3px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: ${(p) => (p.$visible ? 'translateX(0px)' : 'translateX(75px)')};
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  pointer-events: ${(p) => (p.$visible ? 'initial' : 'none')};
  transition: transform 0.2s ease, opacity 0.2s ease;
`;
