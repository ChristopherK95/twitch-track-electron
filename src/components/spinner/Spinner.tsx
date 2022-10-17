import React from 'react';
import { Bar, Container } from './Styles';

const Spinner = () => {
  return (
    <Container>
      <Bar delay={0} />
      <Bar delay={1} />
      <Bar delay={2} />
    </Container>
  );
};

export default Spinner;
