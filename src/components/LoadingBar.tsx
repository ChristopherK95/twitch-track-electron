import React, { useEffect, useState } from "react";
import "../styles/loadingBar.css";

export function LoadingBar() {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.api.progress(
      "progress",
      (event: { progress: number; max: number }) => {
        if (!loading) {
          setLoading(true);
        }
        setProgress((event.progress / event.max) * 100);
        if (event.progress / event.max === 1) {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      }
    );
  }, []);

  const progressBar = {
    height: "100%",
    width: loading ? progress + "%" : "0%",
    borderRadius: "5px",
    backgroundColor: "aquamarine",
    opacity: `${loading ? "1" : "0"}`,
    transition: "width 0.3s linear",
  };

  return (
    <div className="loading-bar">
      <div style={progressBar}></div>
    </div>
  );
}
