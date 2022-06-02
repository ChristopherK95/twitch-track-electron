import React from "react";
import { StyledCategory } from "./Styles";

const Category = (props: {
  category: string;
  offline: boolean;
  hover: (hover: boolean) => void;
}) => {
  if (props.offline) {
    return <StyledCategory offline>Offline</StyledCategory>;
  }

  if (!props.category) {
    return (
      <StyledCategory
        onMouseEnter={() => props.hover(true)}
        onMouseLeave={() => props.hover(false)}
      >
        No category
      </StyledCategory>
    );
  }

  return (
    <StyledCategory
      onMouseEnter={() => props.hover(true)}
      onMouseLeave={() => props.hover(false)}
    >
      {props.category}
    </StyledCategory>
  );
};

export default Category;
