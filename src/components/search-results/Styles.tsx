import styled from 'styled-components';

export const Container = styled.div<{ $visible: boolean }>`
  width: 100%;
  height: calc(100% - 70px);
  display: ${(p) => (p.$visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 10px;
  overflow-y: auto;
  box-sizing: border-box;
`;

/*
// SEARCHRESULT //
*/

export const StyledResult = styled.div`
  display: flex;
  width: 90%;
  height: 50px;
  background-color: #181819;
  border-radius: 5px;
  margin-bottom: 8px;
  align-items: center;
  transition: 0.3s ease-out;
  position: relative;
  box-shadow: 5px 5px 10px 1px rgb(0 0 0 / 30%);

  :hover {
    background-color: #2e2e2e;
  }
`;

export const StyledImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 3px 0 0 3px;
  margin-right: 15px;
`;

export const StyledName = styled.h1`
  color: #dddddd;
  font-size: 25px;
  font-family: system-ui;
  pointer-events: none;
  max-width: 60%;
  overflow-x: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;

export const StyledAdd = styled.h2<{ $saved: boolean }>`
  color: ${(p) => (p.$saved ? '#00ef76' : '#dddddd')};
  font-size: 18px;
  font-family: system-ui;
  position: absolute;
  right: 15px;
  cursor: ${(p) => (p.$saved ? 'default' : 'pointer')};
  user-select: none;

  :hover {
    color: white;
  }
`;
