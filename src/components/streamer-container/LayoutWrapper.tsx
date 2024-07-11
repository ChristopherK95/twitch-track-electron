import React from 'react';
import { match } from 'ts-pattern';
import ColumnLayout from './column-layout/ColumnLayout';

const LayoutWrapper = (props: { layout: 'column' | 'flow' }) => {
  return match(props.layout)
    .with('column', () => <ColumnLayout />)
    .with('flow', () => <></>)
    .exhaustive();
};

export default LayoutWrapper;
