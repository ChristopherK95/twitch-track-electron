import React from 'react';
import { StyledImg } from './Styles';

const Img = (props: { url: string }) => {
  const { url } = props;

  return <StyledImg src={url} />;
};

export default Img;
