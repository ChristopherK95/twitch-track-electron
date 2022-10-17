import styled from 'styled-components';

export const StyledStreamerContainer = styled.div<{ visible: boolean }>`
  width: 100%;
  height: max-content;
  display: ${(p) => (p.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
`;

export const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 90%;
  overflow-x: clip;
  padding: 0 10px;
`;

export const Section = styled.h2`
  color: #ffffffb3;
  font-family: system-ui;
  font-size: 18px;
  text-align: left;
  width: max-content;
  position: relative;
  margin-bottom: 5px;
  margin-top: 10px;
  user-select: none;
`;

export const Count = styled.span`
  font-size: 14px;
  font-family: monospace;
  color: aquamarine;
  position: relative;
  cursor: pointer;
`;

export const Toggle = styled.i`
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translate(100%, -50%);
  cursor: pointer;
  width: 15px;
  height: 16px;
  color: rgba(255, 255, 255, 0.3);

  :hover {
    color: aquamarine;
  }
`;

export const GuideDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh;
  padding: 0 10px;
`;

export const Text1 = styled.p`
  font-family: sans-serif;
  font-weight: bold;
  color: #ffffff9c;
  margin: 0;
  font-size: 18px;
`;

export const Text2 = styled.p`
  font-family: sans-serif;
  color: #ffffff9c;
`;
