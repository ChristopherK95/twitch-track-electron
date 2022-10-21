import React from 'react';
import styled from 'styled-components';

const Animation = styled.svg`
  fill: #00ce67;
  animation: 0.7s linear 0ms infinite verticalAnim;

  @keyframes verticalAnim {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => {
  return (
    <Animation xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
      <g id="layer1" transform="translate(-84.508305,-127.45686)">
        <path
          id="path111"
          fill="#666666"
          strokeWidth="0.264583"
          d="m 102.26743,127.45763 a 17.759138,17.759138 0 0 0 -17.759124,17.75912 17.759138,17.759138 0 0 0 17.759124,17.75912 17.759138,17.759138 0 0 0 0.0961,-0.004 17.759138,17.759138 0 0 0 17.663,-17.75551 17.759138,17.759138 0 0 0 -17.663,-17.7555 17.759138,17.759138 0 0 0 -0.0961,-0.004 z m 0,5.36608 a 12.39331,12.39331 0 0 1 0.0961,0.005 12.39331,12.39331 0 0 1 12.29744,12.38839 12.39331,12.39331 0 0 1 -12.29744,12.39201 12.39331,12.39331 0 0 1 -0.0961,0.002 12.39331,12.39331 0 0 1 -12.393043,-12.39356 12.39331,12.39331 0 0 1 12.393043,-12.39304 z"
        />
        <path
          fill="#00ce67"
          fillOpacity="1"
          d="m 84.508305,145.21675 c 0,-8.65097 6.979053,-17.75989 17.759125,-17.75912 2.80376,0 2.80376,5.36608 0,5.36608 -6.903097,0 -12.393045,5.58554 -12.393043,12.39384 -2e-6,2.85609 -5.366082,2.80977 -5.366082,-8e-4 z"
          id="path1326"
        />
      </g>
    </Animation>
  );
};

export default Spinner;

