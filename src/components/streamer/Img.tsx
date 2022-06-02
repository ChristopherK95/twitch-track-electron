import React from "react";
import { StyledImg } from "./Styles";

const Img = (props: { url: string }) => {
  return (
    <>
      <StyledImg src={props.url} />
    </>
  );
};

export default Img;
