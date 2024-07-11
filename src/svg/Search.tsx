import React from 'react';

const Icon = (props: { color: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.6 143.17">
      <path
        fill="none"
        stroke={props.color}
        strokeLinejoin="round"
        strokeWidth="11"
        d="M402.46 172.39l3.682-3.547 38.713 40.185-3.682 3.547zm.802-76.709a50.019 50.019 0 01-1.32 70.725 50.019 50.019 0 01-70.724-1.32 50.019 50.019 0 011.32-70.725 50.019 50.019 0 0170.724 1.32z"
        paintOrder="stroke fill markers"
        transform="translate(-311.75 -74.901)"
      />
    </svg>
  );
};

export default Icon;
