import React from 'react';
import { Bar } from './Styles';

const LoadingBar = (props: { progress: number | undefined; clearProgress: () => void }) => {
  const { progress, clearProgress } = props;

  if (!progress) {
    return null;
  }

  if (progress === 100) {
    setTimeout(() => {
      clearProgress();
    }, 500);
  }

  return <Bar progress={progress} />;
};

export default LoadingBar;
