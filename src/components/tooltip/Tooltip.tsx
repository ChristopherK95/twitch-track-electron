import React, { useRef } from 'react';
import { Category, Container, Title, TitleContainer } from './Styles';

const Tooltip = (props: { category: string; title: string; visible: boolean }) => {
  const { category, title, visible } = props;
  const tooltipRef = useRef({} as HTMLDivElement);
  const titleRef = useRef({} as HTMLParagraphElement);

  return (
    <Container ref={tooltipRef} visible={visible}>
      <Category>{category}</Category>
      <TitleContainer>
        <Title
          ref={titleRef}
          visible={visible}
          width={tooltipRef.current?.offsetWidth}
          textWidth={titleRef.current?.offsetWidth}
        >
          {title ?? 'No title'}
        </Title>
      </TitleContainer>
    </Container>
  );
};

export default Tooltip;
