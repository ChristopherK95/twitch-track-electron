import React, { useEffect, useState } from 'react';
import { Bar } from './Styles';

const LoadingBar = () => {
  const [progress, setProgress] = useState<number>();

  useEffect(() => {
    const updateProgress = () => {
      window.api.progress('progress', (p: { progress: number; max: number }) => {
        const percentage = (p.progress / p.max) * 100
        if (percentage === 100) {
          setProgress(100)
          setTimeout(() => setProgress(0), 500)
        } else {
          setProgress(percentage);
        }
      })
    };

    return updateProgress()
  }, []);

  if (!progress) {
    return null;
  }

  //useEffect(() => {
  //  if (progress === 100) {
  //    console.log('done')
  //    clearProgress();
  //  }
  //}, [progress])

  return <Bar $progress={progress} />;
};

export default LoadingBar;
