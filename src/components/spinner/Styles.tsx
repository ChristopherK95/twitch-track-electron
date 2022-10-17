import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Bar = styled.div<{ delay: number }>`
  width: 15px;
  height: 45px;
  background-color: #00ce67;
  animation: 1.3s ease ${(p) => p.delay * 300}ms infinite verticalAnim;
  transform-origin: bottom;

  @keyframes verticalAnim {
    0% {
      transform: scaleY(0);
    }
    50% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0);
    }
  }
`;
