import styled from 'styled-components';

export const StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100vw;
  padding: 0 15px;
  box-sizing: border-box;
`;

export const Version = styled.p`
  font-family: sans-serif;
  font-size: 14px;
  color: #9b9b9b;
  margin: 0;
  user-select: none;
`;

export const Icon = styled.i`
  width: 20px;
  height: 20px;
  fill: #9b9b9b;
  margin-top: 5px;
  cursor: pointer;

  :hover {
    fill: white;
  }
`;

export const UpdateBtn = styled.button`
  position: absolute;
  right: 15px;
  top: 20px;
  border-radius: 3px;
  background-color: #545454;
  border: none;
  box-shadow: -2px 2px 3px rgb(0 0 0 / 50%);
  font-size: 14px;
  font-family: system-ui;
  font-weight: bold;
  padding: 5px 10px;
  color: white;
  cursor: pointer;

  :hover {
    background-color: #616161;
  }
`;
