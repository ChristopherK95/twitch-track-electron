import styled from 'styled-components';

export const StyledContextMenu = styled.div<{
  visible: boolean;
  x: number;
  y: number;
}>`
  position: fixed;
  width: 100px;
  background: #3f3f40;
  padding: 10px 5px;
  color: white;
  z-index: 15;
  border-radius: 5px;
  box-shadow: 4px 4px 10px 3px rgb(0 0 0 / 30%);
  top: ${(p) => p.y}px;
  left: ${(p) => p.x}px;
  visibility: ${(p) => (p.visible ? 'visible' : 'hidden')};

  :focus {
    outline: none;
  }
`;

export const Delete = styled.p`
  color: white;
  font-family: system-ui;
  font-size: 14px;
  font-weight: bold;
  cursor: default;
  user-select: none;
  margin: 0 5px;
  padding: 5px;
  border-radius: 3px;
  text-align: left;

  :hover {
    background: #ce3434;
  }
`;
