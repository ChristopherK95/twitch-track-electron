import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 200px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: end;
  z-index: 20;
  gap: 10px;
`;

export const StyledNotification = styled.div<{
  online: boolean;
  index: number;
  total: number;
  position: number;
}>`
  position: absolute;
  top: ${(p) => (p.position === -1 ? 0 : p.position * 45)}px;
  right: ${(p) => (p.position === -1 ? 'calc(-100% - 50px)' : 0)};
  display: flex;
  width: fit-content;
  height: 35px;
  background-color: ${(p) => (p.online ? '#00c368' : '#606362')};
  border-radius: 3px;
  color: white;
  box-shadow: 0 0 10px 4px rgb(0 0 0 / 50%);
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-content: flex-start;
  transition:
    top 0.5s ease 0.3s,
    right 0.3s ease 0.2s;
`;

export const StyledText = styled.p`
  color: white;
  font-size: 14px;
  font-family: system-ui;
  font-weight: bold;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;
