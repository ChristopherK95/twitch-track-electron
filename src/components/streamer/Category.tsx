import React from 'react';
import { StyledCategory } from './Styles';

type Props =
  | {
      live: true;
      category: string;
      hover: (hover: boolean) => void;
    }
  | {
      live: false;
      category?: string;
      hover?: never;
    };

const Category = (props: Props) => {
  const { hover, live, category } = props;

  if (!live) {
    return <StyledCategory offline>Offline</StyledCategory>;
  }

  if (!category) {
    return (
      <StyledCategory onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
        No category
      </StyledCategory>
    );
  }

  return (
    <StyledCategory onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)}>
      {category}
    </StyledCategory>
  );
};

export default Category;
