import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5%;
  z-index: 1000;
  width: 24px;
  height: 20px;
`;

export const Bar = styled.div<{ delay: number }>`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: 2px solid #00ce67;
  animation: 1.3s ease ${(p) => p.delay * 300}ms infinite verticalAnim;
  transform-origin: bottom;

  @keyframes verticalAnim {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360);
    }
  }
`;

