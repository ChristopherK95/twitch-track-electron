import React from 'react';
import { StyledCategory } from './Styles';

type Props =
  | {
      live: true;
      category: string;
      categoryChanged: boolean;
      hover: (hover: boolean) => void;
    }
  | {
      live: false;
      category?: string;
      categoryChanged?: boolean;
      hover?: never;
    };

const Category = (props: Props) => {
  const { hover, live, category, categoryChanged } = props;

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
    <StyledCategory
      categoryChanged={categoryChanged}
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
    >
      {category}
    </StyledCategory>
  );
};

export default Category;
