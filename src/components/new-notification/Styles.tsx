import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 135px;
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
}>`
  position: absolute;
  top: 0;
  right: ${(p) => (p.index + p.total - 4 < 0 ? -180 : 0)}px;
  transform: translateY(
    ${(p) => (p.index + p.total - 4 < 0 ? 0 : 45 * (p.index + p.total - 4))}px
  );
  display: flex;
  width: 100%;
  height: 35px;
  background-color: ${(p) => (p.online ? "#00c368" : "#606362")};
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
  transition: transform 0.6s ease 0.6s, right 0.3s ease 0.3s;
`;

export const StyledText = styled.p`
  color: white;
  font-size: 18px;
  font-family: system-ui;
  font-weight: bold;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;
