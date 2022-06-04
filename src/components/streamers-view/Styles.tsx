import styled from "styled-components";

export const StyledStreamersView = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  z-index: ${(p) => (p.visible ? 11 : 10)};
  background: #262626;
  transition: transform 0.5s ease, opacity 0.3s ease;
  transform: ${(p) => (p.visible ? "scale(100%)" : "scale(80%)")};
  opacity: ${(p) => (p.visible ? "1" : "0")};
  overflow-x: hidden;
`;
