import React, { useRef } from "react";
import { Category, Container, Title, TitleContainer } from "./Styles";

const Tooltip = (props: {
  category: string;
  title: string;
  visible: boolean;
}) => {
  const tooltipRef = useRef<HTMLDivElement>();
  const titleRef = useRef<HTMLParagraphElement>();

  return (
    <Container ref={tooltipRef} visible={props.visible}>
      <Category>{props.category}</Category>
      <TitleContainer>
        <Title
          ref={titleRef}
          visible={props.visible}
          width={tooltipRef.current?.offsetWidth}
          textWidth={titleRef.current?.offsetWidth}
        >
          {props.title ?? "No title"}
        </Title>
      </TitleContainer>
    </Container>
  );
};

export default Tooltip;
